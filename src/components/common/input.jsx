import React from "react";

const Input = ({ name, label, error, ...rest }) => {
    return (
        <div className="form-group row">
            <div className="col-sm-2">
                <label htmlFor={name}>{label}</label>
                <input {...rest} name={name} id={name} className="form-control" />
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

export default Input;