import React from 'react';
import * as dns from "dns";

export  type ButtonProps = {
    callback:()=>void
    name:string
    className?:string
}
export const Button = (props:ButtonProps) => {

    const onClickHandler = ()=> {
        props.callback()
    }
    return (
        <button className={props.className} onClick={onClickHandler}>{props.name}</button>
    );
};

