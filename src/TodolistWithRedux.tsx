import React from 'react';
import s from "./components/todolist/Todolist.module.css";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import {SuperCheckbox} from "./components/SuperCheckbox";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeFilterAC, changeTodoTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {addTaskAC, changeStatusAC, changeTaskNameAC, removeTaskAC} from "./state/tasks-reducer";

type TodolistWithReduxProps = {
    id: string
    title: string
    filter: string
}
export type TasksType = {
    taskId: string
    title: string
    isDone: boolean
}
export const TodolistWithRedux = (props:TodolistWithReduxProps) => {

    let tasks = useSelector<AppRootStateType , TasksType[]>(state=> state.tasks[props.id])
    const dispatch = useDispatch()


    const removeTaskHandler = (taskId: string) => {
        dispatch(removeTaskAC(taskId, props.id))
    }
    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(props.id))
    }
    const addNewTask = (title: string) => {
        dispatch(addTaskAC(props.id,title))
    }
    const onChangeTaskTitle = (taskId: string, newValue: string) => {
        dispatch(changeTaskNameAC(props.id, taskId, newValue))
    }
    const onChangeTodoTitle = (newValue: string) => {
        dispatch(changeTodoTitleAC(props.id, newValue))
    }
    const onChangeStatusHandler = (taskId: string, checked: boolean) => {
        dispatch(changeStatusAC(props.id,taskId, checked))
    }

    let tasksForTodolist = tasks
    if (props.filter === "completed") { tasksForTodolist = tasks.filter(el => el.isDone) }
    if (props.filter === "active") { tasksForTodolist = tasks.filter(el => !el.isDone) }

    const onAllClickHandler = () => dispatch(changeFilterAC("all", props.id))
    const onActiveClickHandler = () => dispatch(changeFilterAC("active", props.id))
    const onCompletedClickHandler = () => dispatch(changeFilterAC("completed", props.id))


    return (
        <div className={s.todolist}>
            <h3><EditableSpan
                title={props.title}
                onChange={onChangeTodoTitle}/>
                <IconButton
                    color="error"
                    onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton >
            </h3>
            <AddItemForm callBack={addNewTask}/>
            <div>
                {
                    tasksForTodolist.map(t => {
                        return <div id={t.taskId}>
                            <SuperCheckbox checked={t.isDone}
                                           callback={(checked) => {
                                               onChangeStatusHandler(t.taskId,checked)
                                           }}/>
                            <EditableSpan
                                title={t.title}
                                onChange={(newValue: string) => {
                                    onChangeTaskTitle(t.taskId, newValue)
                                }}/>
                            <IconButton
                                size='small'
                                onClick={() => {
                                    removeTaskHandler(t.taskId)
                                }}>
                                <Delete/>
                            </IconButton >
                        </div>
                    })
                }
            </div>
            <div className={s.filterWrap}>
                <Button
                    color={"info"}
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={"success"}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={'warning'}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler} >Completed
                </Button>

            </div>
        </div>
    )
};


