import React from 'react';
import {FilterValuesType, TasksType} from '../../App';
import {Button} from "../../Button";
import s from './Todolist.module.css'
import {AddItemForm} from "../addItemForm/AddItemForm";

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

    const removeTaskHandler = (taskId: string) => {
        removeTask(taskId, id)
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

    const addNewTask =(title: string)=> {
        addTask(id, title)
    }
    return (
        <div className={s.todolist}>
            <h3> {title}
                <Button callback={removeTodolistHandler} name={'X'}/>
            </h3>
            <AddItemForm callBack={addNewTask}/>
            <div>
                {
                    tasks.map(t => {
                        return <div id={t.taskId}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={()=> {onChangeStatusHandler(t.taskId,t.isDone)}}
                            />
                            <EditableSpan title={t.title}/>
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


type EditableSpanProps = {
    title:string
}
function EditableSpan (props:EditableSpanProps) {
    return (
        <span>{props.title}</span>
    )
}