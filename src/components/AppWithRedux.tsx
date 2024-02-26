import React from 'react';
import {AddItemForm} from "./addItemForm/AddItemForm";
import {TodolistWithRedux} from "./todolist/TodolistWithRedux";
import {useAppWithRedux} from "../hooks/useAppWithRedux";

import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import {Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";



function AppWithRedux() {

    const { todolist, addNewTodo} = useAppWithRedux()


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
                        todolist.map(tl => {

                            return (
                                <Grid item key={tl.todoId}>
                                    <Paper style={{padding:'10px'}}>
                                        <TodolistWithRedux
                                            todoId={tl.todoId}
                                            title={tl.title}
                                            filter={tl.filter}
                                        />
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
