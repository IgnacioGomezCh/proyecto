import React from "react";

const InputPassword = ({ name, label, error, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input {...rest} name={name} id={name} className="form-control" type="password" />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default InputPassword;