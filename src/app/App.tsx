import {AddItemForm} from "../components/addItemForm/AddItemForm";
import {Todolist} from "../components/todolist/Todolist";

import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import {Menu} from "@mui/icons-material";
import {UseApp} from "../hooks/UseApp";
import {ErrorSnackbar} from "../components/ErrorSnackbar";


function App() {

    const { todolist, addNewTodo,status} = UseApp()

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
            {
                status === 'loading' && <LinearProgress />
            }
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
                                            todolist={tl}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
