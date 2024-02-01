import React from 'react';
import {FilterValuesType, TasksType} from '../../App';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import s from './Todolist.module.css'
import {AddItemForm} from "../addItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan";
import {Delete} from '@mui/icons-material'
import {SuperCheckbox} from "../SuperCheckbox";


type TodolistProps = {
    id: string
    title: string
    tasks: TasksType[]
    removeTask: (taskId: string, todoId: string) => void
    addTask: (todoId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: string
    changeTaskTitle: (todolistId: string, taskId: string, newValue: string) => void
    changeTodoTitle: (todolistId: string, newValue: string) => void
}

export const Todolist: React.FC<TodolistProps> = (props) => {
    let {id, title, tasks,
        removeTask, addTask, changeStatus, changeFilter, removeTodolist,
        filter,changeTaskTitle,changeTodoTitle, ...rest} = props

    const removeTaskHandler = (taskId: string) => {
        removeTask(taskId, id)
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

    const addNewTask = (title: string) => {
        addTask(id, title)
    }

    const onChangeTaskHandler = (id: string, taskId: string, newValue: string) => {
       changeTaskTitle(id, taskId, newValue)
    }
    const onChangeTitleHandler = (newValue: string) => {
        changeTodoTitle(id, newValue)
    }
    const onChangeStatusHandler = (taskId: string, checked: boolean) => {
        changeStatus(id, taskId, checked)
    }

    return (
        <div className={s.todolist}>
            <h3><EditableSpan
                title={title}
                onChange={onChangeTitleHandler}/>
                <IconButton
                    color="error"
                    onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton >
                {/*<Button callback={removeTodolistHandler} name={'X'}/>*/}
            </h3>
            <AddItemForm callBack={addNewTask}/>
            <div>
                {
                    tasks.map(t => {
                        return <div id={t.taskId}>
                            <SuperCheckbox checked={t.isDone}
                                           callback={(checked) => {
                                onChangeStatusHandler(t.taskId,checked)
                            }}/>
                            {/*<Checkbox*/}
                            {/*    size={'small'}*/}
                            {/*    checked={t.isDone}*/}
                            {/*    onChange={() => {*/}
                            {/*        onChangeStatusHandler(t.taskId, t.isDone)*/}
                            {/*    }}*/}
                            {/*/>*/}
                            {/*<input*/}
                            {/*    type="checkbox"*/}
                            {/*    checked={t.isDone}*/}
                            {/*    onChange={() => {*/}
                            {/*        onChangeStatusHandler(t.taskId, t.isDone)*/}
                            {/*    }}*/}
                            {/*/>*/}
                            <EditableSpan
                                title={t.title}
                                onChange={(newValue: string) => {
                                    onChangeTaskHandler(props.id, t.taskId, newValue)
                                }}/>
                            <IconButton
                                size='small'
                                onClick={() => {
                                    removeTaskHandler(t.taskId)
                                }}>
                                <Delete/>
                            </IconButton >
                            {/*<MyButton*/}
                            {/*    callback={() => {*/}
                            {/*        removeTaskHandler(t.taskId)*/}
                            {/*    }}*/}
                            {/*    name={'X'}/>*/}
                        </div>
                    })
                }
            </div>
            <div className={s.filterWrap}>
                <Button
                    color={"info"}
                    variant={filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={"success"}
                    variant={filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={'warning'}
                    variant={filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler} >Completed
                </Button>

            </div>
        </div>
    )
}


