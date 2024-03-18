import {EditableSpan} from "../EditableSpan";
import {AddItemForm} from "../addItemForm/AddItemForm";

import s from "./Todolist.module.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";


import {Task} from "../tasks/Task";
import {TodolistDomainType} from "../../state/reducers/todolists-reducer";
import {memo} from "react";
import {UseTodolist} from "../../hooks/useTodolist";

type TodolistWithReduxProps = {
    todolist:TodolistDomainType
}

export const Todolist = memo(({
                                  todolist
                              }: TodolistWithReduxProps) => {

    const {
        tasksForTodolist,
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
        addNewTask,
        onChangeTodoTitle,
        removeTodolistHandler
    } = UseTodolist(todolist.id, todolist.filter)


    return (
        <div className={s.todolist}>
            <h3><EditableSpan
                title={todolist.title}
                onChange={onChangeTodoTitle}/>
                <IconButton
                    color="error"
                    onClick={removeTodolistHandler}
                    disabled={todolist.entityStatus === 'loading'}
                >
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callBack={addNewTask}/>
            <Task tasksForTodolist={tasksForTodolist}
                  todoId={todolist.id}
            />
            <div className={s.filterWrap}>
                <Button
                    color={"info"}
                    variant={todolist.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={"success"}
                    variant={todolist.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={'warning'}
                    variant={todolist.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>

            </div>
        </div>
    )
})


