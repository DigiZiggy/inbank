import React from "react";
import "./TextInput.less";

interface Props {
    label: string;
    errorMessage?: string;
    required?: boolean;
    pattern?: string;
    value: string;
    onChange: (value?: any) => void;
}

export const TextInput = ({label, errorMessage, required, pattern, value, onChange}: Props) => {
    return (
        <div className="text-input mb-3 row">
            <div className="form-floating">
                <input className="form-control" id="inputPersonalCode"
                       type="text"
                       value={value}
                       required={required}
                       pattern={pattern}
                       onChange={(e) => onChange(e.target.value)}/>
                <label htmlFor="inputPersonalCode">{label}</label>
                {!!errorMessage && <div className="invalid-feedback">
                    {errorMessage}
                </div>}
            </div>
        </div>
    )
}