import React from "react";

const InputPassword = ({ name, label, error, ...rest }) => {
    return (
        <div className="form-group row">
            <div className="col-sm-2">
                <label htmlFor={name}>{label}</label>
                <input {...rest} name={name} id={name} className="form-control" type="password" />
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

export default InputPassword;