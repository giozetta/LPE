import { useContext } from "react";
import Alerta from "../../Alerta";
import PrediosContext from "./PrediosContext";
import CampoEntrada from "../../comuns/campoEntrada";
import Dialogo from "../../comuns/dialogo";

function Form() {
    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(PrediosContext);

    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (
        <Dialogo id="modalEdicao" titulo="Prédio" idform="formulario" acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="codigo" tipo="number" name="codigo" value={objeto.codigo}
                onchange={handleChange} requerido={false} readonly={true} tamanho={5}
                msgvalido="CODIGO OBRIGATORIO" msginvalido="CODIGO OK" />

            <CampoEntrada id="txtNome" label="nome" tipo="text" name="nome" value={objeto.name}
                onchange={handleChange} requerido={true} readonly={false} tamanho={40}
                msgvalido="NOME OBRIGATORIO" msginvalido="NOME OK" />

            <CampoEntrada id="txtDescricao" label="descricao" tipo="text" name="descricao" value={objeto.descricao}
                onchange={handleChange} requerido={true} readonly={false} tamanho={40}
                msgvalido="DESCRICAO OBRIGATORIO" msginvalido="DESCRICAO OK" />

            <CampoEntrada id="txtSigla" label="sigla" tipo="text" name="sigla" value={objeto.sigla}
                onchange={handleChange} requerido={true} readonly={false} tamanho={4}
                msgvalido="SIGLA OBRIGATORIO" msginvalido="SIGLA OK" />
        </Dialogo>
    )
}

export default Form;