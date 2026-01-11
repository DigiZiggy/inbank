import React from "react";
import "./Loader.less";
import {BrandIcon} from "components/atoms/icons/BrandIcon";

export const Loader = () => {
    return (
        <div className="loader">
            <BrandIcon/>
            <div className="loader-dots"><span>.</span><span>.</span><span>.</span></div>
        </div>
    )
}