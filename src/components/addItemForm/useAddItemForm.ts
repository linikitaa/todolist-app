import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItemForm = (callBack:(title:string)=>void) => {
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
        if (error !== null) { setError(null) }
        if(e.key === 'Enter') {addTaskHandler()}
    }

    return {
        newTask,
        onChangeHandler,
        error,
        onKeyDownHandler,
        addTaskHandler
    }
}