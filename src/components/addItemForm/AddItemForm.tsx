import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import {TextField} from "@mui/material";
import { AddCircleOutline } from '@mui/icons-material';

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
            setError('Text is not valid')
        }
    }

    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>)=> {
        setError(null)
        if(e.key === 'Enter') {addTaskHandler()}
    }


    return (
        <div>
            <TextField
                size={"small"}
                label={'Type value'}
                value={newTask}
                onChange={onChangeHandler}
                error={!!error}
                onKeyDown={onKeyDownHandler}
                helperText={error}
            />
            {/*<input*/}
            {/*    value={newTask}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    className={error ? s.errorBorder : ''}*/}
            {/*    onKeyDown={onKeyDownHandler}*/}
            {/*/>*/}
            {/*<MyButton*/}
            {/*    name={'+'}*/}
            {/*    callback={addTaskHandler}*/}
            {/*/>*/}
            <IconButton
                color={"primary"}
                size={'medium'}
                onClick={addTaskHandler}
            ><AddCircleOutline/></IconButton>
            {/*{error && <div className={s.errorText}>{'Text is not valid'}</div>}*/}
        </div>
    );
};

