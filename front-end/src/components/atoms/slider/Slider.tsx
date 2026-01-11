import React from "react";
import "./Slider.less";

interface Props {
    className?: string;
    label: string;
    max: string;
    min: string;
    step: number;
    value: number;
    unit: string;
    onChange: (value?: any) => void;
}

export const Slider = ({className = "", label, max, min, step, value, unit, onChange}: Props) => {
    return (
        <div className={`${className} slider row`}>
            <div className="col-8">
                <input type="range" className="form-range"
                       value={value}
                       min={min}
                       max={max}
                       step={step}
                       onChange={(e) => onChange(Number(e.target.value))}/>
                <div className="range-min-max-labels">
                    <div>{min} {unit}</div>
                    <div>{max} {unit}</div>
                </div>
            </div>
            <div className="col-4 form-floating">
                <input type="number"
                       className="form-control"
                       value={value}
                       min={min}
                       max={max}
                       onChange={(e) => onChange(Number(e.target.value))}
                       id="sliderInputValue"/>
                <label htmlFor="sliderInputValue">{label}</label>
            </div>
        </div>
    )
}