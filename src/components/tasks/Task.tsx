import React from 'react';
import {SuperCheckbox} from "../SuperCheckbox";
import {EditableSpan} from "../EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {TasksType} from "../../types/types";
import {useTasks} from "../../hooks/useTasks";

type TasksProps = {
    tasksForTodolist: TasksType[]
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
                    return <div key={t.taskId}
                                id={t.taskId}>
                        <SuperCheckbox
                            checked={t.isDone}
                            callback={(checked) => {
                                onChangeStatusHandler(todoId, t.taskId, checked)
                            }}/>
                        <EditableSpan
                            title={t.title}
                            onChange={(newValue: string) => {
                                onChangeTaskTitle(todoId, t.taskId, newValue)
                            }}/>
                        <IconButton
                            size='small'
                            onClick={() => {
                                removeTaskHandler(todoId, t.taskId)
                            }}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </div>
    );
};

