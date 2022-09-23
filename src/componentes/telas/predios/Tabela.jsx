import { useContext } from "react";
import PrediosContext from "./PrediosContext";
import Alerta from "../../Alerta";

function Tabela() {

    const { setObjeto, alerta, setAlerta, listaObjetos, remover, setEditar, recuperar } = useContext(PrediosContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Prédios</h1>
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao" onClick={() => {
                setObjeto({
                    codigo:0,
                    nome:"",
                    descricao:"",
                    sigla:""
                });
                setEditar(false);
                setAlerta({ status: "", message: "" });
            }}>
                <i className="bi bi-file-earmark-plus"></i> Novo
            </button>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhum prédio encontrada</h1>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Descricao</th>
                            <th scope="col">Sigla</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>
                                <td align="center">
                                    <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#modalEdicao" onClick={() => {
                                        recuperar(objeto.codigo);
                                        setEditar(true);
                                        setAlerta({ status: "", message: "" });
                                    }}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.descricao}</td>
                                <td>{objeto.sigla}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Tabela;
