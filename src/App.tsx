import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './components/todolist/Todolist';
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
    changeFilterAC,
    changeTodoTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./reducers/todolists-reducer";
import {
    addTaskAC,
    changeStatusAC,
    removeTaskAC,
    tasksReducer
} from "./reducers/tasks-reducer";

export type TodolistType = {
    todoId: string
    title: string
    filter: FilterValuesType
}
export type TasksType = {
    taskId: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TasksType[]
}

export type FilterValuesType = "all" | "active" | "completed";


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
        {todoId: todolistId1, title: "What to learn", filter: "all"},
        {todoId: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {taskId: v1(), title: "HTML&CSS", isDone: true},
            {taskId: v1(), title: "JS", isDone: false},
            {taskId: v1(), title: "WB", isDone: true},
        ],
        [todolistId2]: [
            {taskId: v1(), title: "Milk", isDone: false},
            {taskId: v1(), title: "React Book", isDone: true},
            {taskId: v1(), title: "Beer", isDone: false},
        ]
    });

    function removeTask(taskId: string, todoId: string) {
        dispatchTasks(removeTaskAC(taskId,todoId))
        // setTasks({...tasks, [todoId]: tasks[todoId].filter(el => el.taskId !== taskId)})
    }

    function addTask(todoId: string, title: string) {
        dispatchTasks(addTaskAC(todoId,title))
        // let newTask = {taskId: v1(), title, isDone: false}
        // setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]})
    }

    function changeStatus(todoId: string, taskId: string, isDone: boolean) {
        // setTasks({
        //     ...tasks, [todolistId]: tasks[todolistId].map(el => el.taskId === taskId
        //         ? {...el, isDone: !isDone}
        //         : el)
        // })
        dispatchTasks(changeStatusAC(todoId,taskId,isDone))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        // setTodolists(todolists.map(el => el.todoId === todolistId ? {...el, filter: value} : el))
        dispatchTodolists(changeFilterAC(value,todolistId))
    }

    function removeTodolist(todolistId: string) {
        // setTodolists([...todolists.filter(el => el.todoId !== todolistId)])
        delete tasks[todolistId]
        dispatchTodolists(removeTodolistAC(todolistId))
    }

    function addNewTodo(title: string) {
        // let newTodo: TodolistType = {todoId: v1(), title, filter: "all"}
        // setTodolists([newTodo, ...todolists])
        // setTasks({...tasks, [newTodo.todoId]: []})
        let todoListId=v1()
        dispatchTodolists(addNewTodoAC(title,todoListId))
        dispatchTasks(addNewTodoAC(title, todoListId))
    }

    function changeTaskTitle(todoId: string, taskId: string, newValue: string) {
        // setTasks({...tasks,[todolistId]:{...tasks[todolistId].map(el=>el.taskId === taskId ? {...el, title: newValue}:el)}})
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(el => el.taskId === taskId ? {...el, title: newValue} : el)
        // })
        // dispatchTasks(changeTaskTitleAC(todoId,taskId,newValue))
    }

    function changeTodoTitle(todolistId: string, title: string) {
        dispatchTodolists(changeTodoTitleAC(todolistId,title))
        // setTodolists([...todolists.map(el=> el.todoId === todolistId ? {...el, title:newValue} :el)])
        // setTodolists(todolists.map(todo => (todo.todoId === todolistId ? {...todo, title: newValue} : todo)));
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
                            let tasksForTodolist = tasks[tl.todoId]
                            if (tl.filter == "completed") {
                                tasksForTodolist = tasks[tl.todoId].filter(el => el.isDone)
                            }
                            if (tl.filter == "active") {
                                tasksForTodolist = tasks[tl.todoId].filter(el => !el.isDone)
                            }
                            return (
                                <Grid item>
                                    <Paper style={{padding:'10px'}}>
                                        <Todolist
                                            key={tl.todoId}
                                            id={tl.todoId}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            changeFilter={changeFilter}
                                            removeTodolist={removeTodolist}
                                            filter={tl.filter}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoTitle={changeTodoTitle}
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
