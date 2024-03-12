import {AddItemForm} from "./addItemForm/AddItemForm";
import {Todolist} from "./todolist/Todolist";

import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import {Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {UseApp} from "../hooks/UseApp";


function App() {

    const { todolist, addNewTodo} = UseApp()

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
                                <Grid item key={tl.id}>
                                    <Paper style={{padding:'10px'}}>
                                        <Todolist
                                            todoId={tl.id}
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

export default App;
