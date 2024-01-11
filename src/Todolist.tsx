import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TasksType} from './App';
import {Button} from "./Button";
import s from './Todolist.module.css'

type TodolistProps = {
    id: string
    title: string
    tasks: TasksType[]
    removeTask: (taskId: string, todoId: string) => void
    addTask: (todoId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter:string
}

export const Todolist: React.FC<TodolistProps> = (props) => {
    let {id, title, tasks, removeTask,addTask,changeStatus,changeFilter,removeTodolist,filter, ...res} = props

    let[error,setError]=useState<string|null>(null)
    let[newTask,setNewTask]=useState('')
    const removeTaskHandler = (taskId: string) => {
        removeTask(taskId, id)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        setNewTask(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        if(newTask.trim() !== '') {
            addTask(id, newTask.trim())
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

    const onChangeStatusHandler = (taskId:string, isDone:boolean) => {
        changeStatus(id,taskId,isDone)
    }

    const onAllClickHandler = () => {
        changeFilter("all", id)
    }
    const onActiveClickHandler = () => {
        changeFilter("active", id)
    }
    const onCompletedClickHandler = () => {
        changeFilter("completed", id)
    }

    const removeTodolistHandler = () => {
        removeTodolist(id)
    }
    return (
        <div className={s.todolist}>
            <h3> {title}
                <Button callback={removeTodolistHandler} name={'X'}/>
            </h3>
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
            <div>
                {
                    tasks.map(t => {

                        return <div id={t.taskId}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={()=> {onChangeStatusHandler(t.taskId,t.isDone)}}
                            />
                            <span>{t.title}</span>
                            <Button
                                callback={() => {
                                    removeTaskHandler(t.taskId)
                                }}
                                name={'X'}/>
                        </div>
                    })
                }
            </div>
            <div className={s.filterWrap}>
                <Button
                    className={filter==='all' ? s.filterActive : ''}
                    callback={onAllClickHandler} name={'All'}/>
                <Button
                    className={filter==='active' ? s.filterActive : ''}
                    callback={onActiveClickHandler} name={'Active'}/>
                <Button
                    className={filter==='completed' ? s.filterActive : ''}
                    callback={onCompletedClickHandler} name={'Completed'}/>

            </div>
        </div>
    )
}

