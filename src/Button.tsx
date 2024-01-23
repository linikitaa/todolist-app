import React from 'react';

export  type ButtonProps = {
    callback:()=>void
    name:string
    className?:string
}
export const MyButton = (props:ButtonProps) => {

    const onClickHandler = ()=> {
        props.callback()
    }
    return (
        <button className={props.className} onClick={onClickHandler}>{props.name}</button>
    );
};

