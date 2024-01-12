import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "../../Button";
import s from "../todolist/Todolist.module.css";

export type AddItemFormProps = {
    callBack:(title:string)=>void
}
export const AddItemForm:React.FC<AddItemFormProps> = (props) => {
    let{callBack,...rest}=props

    let[error,setError]=useState<string|null>(null)
    let[newTask,setNewTask]=useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        setNewTask(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        if(newTask.trim() !== '') {
            callBack(newTask.trim())
            setNewTask('')
        }
        else {
            setError('Error')
        }
    }

    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>)=> {
        setError(null)
        if(e.key === 'Enter') {addTaskHandler()}
    }


    return (
        <div>
            <input
                value={newTask}
                onChange={onChangeHandler}
                className={error ? s.errorBorder : ''}
                onKeyDown={onKeyDownHandler}
            />
            <Button
                name={'+'}
                callback={addTaskHandler}
            />
            {error && <div className={s.errorText}>{'Text is not valid'}</div>}
        </div>
    );
};

