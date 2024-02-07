import React from 'react';
import './App.css';
import {v1} from 'uuid';
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import {Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addNewTodoAC,
} from "./state/todolists-reducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./TodolistWithRedux";
import {TasksType} from "./App";

export type TodolistType = {
    todoId: string
    title: string
    filter: FilterValuesType
}


export type TasksStateType = {
    [key: string]: TasksType[]
}

export type FilterValuesType = "all" | "active" | "completed";


function AppWithRedux() {

    let todolists = useSelector<AppRootStateType , Array<TodolistType>>(state=> state.todolists)
    // let tasks = useSelector<AppRootStateType , TasksStateType>(state=> state.tasks)
    const dispatch = useDispatch()

    function addNewTodo(title: string) {
        let todoListId=v1()
        dispatch(addNewTodoAC(title,todoListId))

    }


    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography>
                        News
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:'20px 0 20px 0'}}>
                    <AddItemForm callBack={addNewTodo} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {

                            return (
                                <Grid item key={tl.todoId}>
                                    <Paper style={{padding:'10px'}}>
                                        <TodolistWithRedux
                                            id={tl.todoId}
                                            title={tl.title}
                                            filter={tl.filter}
                                        />
                                        {/*<Todolist*/}
                                        {/*    key={tl.todoId}*/}
                                        {/*    id={tl.todoId}*/}
                                        {/*    title={tl.title}*/}
                                        {/*    tasks={tasksForTodolist}*/}
                                        {/*    removeTask={removeTask}*/}
                                        {/*    addTask={addTask}*/}
                                        {/*    changeStatus={changeStatus}*/}
                                        {/*    changeFilter={changeFilter}*/}
                                        {/*    removeTodolist={removeTodolist}*/}
                                        {/*    filter={tl.filter}*/}
                                        {/*    changeTaskTitle={changeTaskTitle}*/}
                                        {/*    changeTodoTitle={changeTodoTitle}*/}
                                        {/*/>*/}
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
