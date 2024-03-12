import {EditableSpan} from "../EditableSpan";
import {AddItemForm} from "../addItemForm/AddItemForm";

import s from "./Todolist.module.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";


import {Task} from "../tasks/Task";
import {FilterValuesType} from "../../state/todolists-reducer";
import {memo} from "react";
import {UseTodolist} from "../../hooks/useTodolist";

type TodolistWithReduxProps = {
    todoId: string
    title: string
    filter: FilterValuesType

}

export const Todolist = memo(({
                                                 todoId,
                                                 title,
                                                 filter,
                                             }: TodolistWithReduxProps) => {

    const {
        tasksForTodolist,
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
        addNewTask,
        onChangeTodoTitle,
        removeTodolistHandler
    } = UseTodolist(todoId, filter)


    return (
        <div className={s.todolist}>
            <h3><EditableSpan
                title={title}
                onChange={onChangeTodoTitle}/>
                <IconButton
                    color="error"
                    onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callBack={addNewTask}/>
            <Task tasksForTodolist={tasksForTodolist}
                  todoId={todoId}
            />
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
                    onClick={onCompletedClickHandler}>Completed
                </Button>

            </div>
        </div>
    )
})


