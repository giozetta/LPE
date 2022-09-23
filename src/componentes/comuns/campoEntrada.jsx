function CampoEntrada({ id, label, tipo, name, value, onchange, requerido, readonly, tamanho, msgvalido, msginvalido }) {
    return (
        <div className="form-group">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
                type={tipo}
                className="form-control"
                id={id}
                name={name}
                value={value}
                onChange={onchange}
                required={requerido}
                readOnly={readonly}
                maxLength={tamanho}
            />
            <div className="valid-feedback">
                {msgvalido}
            </div>
            <div className="invalid-feedback">
                {msginvalido}
            </div>
        </div>
    )
}

export default CampoEntrada;