import React from 'react';
import {SuperCheckbox} from "../SuperCheckbox";
import {EditableSpan} from "../EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {useTasks} from "../../hooks/useTasks";
import {TaskType} from "../../api/todolistss-api";

type TasksProps = {
    tasksForTodolist: TaskType[]
    todoId:string
}
export const Task = ({tasksForTodolist,todoId}: TasksProps) => {

    const {
        onChangeTaskTitle,
        onChangeStatusHandler,
        removeTaskHandler
    } = useTasks()

    return (
        <div>
            {
                tasksForTodolist.map(t => {
                    return <div key={t.id}
                                id={t.id}>
                        <SuperCheckbox
                            callback={(status) => {
                                onChangeStatusHandler(todoId, t.id,status)
                            }}/>
                        <EditableSpan
                            title={t.title}
                            onChange={(newValue: string) => {
                                onChangeTaskTitle(todoId, t.id, newValue)
                            }}/>
                        <IconButton
                            size='small'
                            onClick={() => {
                                removeTaskHandler(todoId, t.id)
                            }}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </div>
    );
};

