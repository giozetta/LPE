import { useState, useEffect } from 'react';
import PrediosContext from './PrediosContext';
import Tabela from './Tabela';
import Form from './Form';

function Predio() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({codigo:"", nome:"", descricao:"", sigla:""});

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => setAlerta({"status":"error","message":err}))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";

        try{
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios`,{
                method : metodo,
                headers : {"Content-Type":"application/json"},
                body:JSON.stringify(objeto)
            }).then(response => response.json())
            .then(json=>{
                setAlerta({status:json.status, message:json.message});
                setObjeto(json.objeto);
                if(!editar){
                    setEditar(true);
                }
            })
        }catch(err){
            setAlerta({"status":"error","message":err});
        }
        recuperaPredios();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    const recuperaPredios = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => setAlerta({"status":"error","message":err}))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ "status": json.status, "message": json.message }))
                recuperaPredios();
            } catch (err) {
                setAlerta({"status":"error", "message":err})
            }
        }
    }

    useEffect(() => {
        recuperaPredios();
    }, []);

    return (
        <PrediosContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,               
                recuperaPredios,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar,
                handleChange
            }
        }>
            <Tabela />
            <Form />
        </PrediosContext.Provider>
    );
}

export default Predio;
