import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/todolist/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/addItemForm/AddItemForm";

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
    let todoId1 = v1();
    let todoId2 = v1();

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {todoId: todoId1, title: "What to learn", filter: "all"},
        {todoId: todoId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoId1]: [
            {taskId: v1(), title: "HTML&CSS", isDone: true},
            {taskId: v1(), title: "JS", isDone: false},
            {taskId: v1(), title: "WB", isDone: true},
        ],
        [todoId2]: [
            {taskId: v1(), title: "Milk", isDone: false},
            {taskId: v1(), title: "React Book", isDone: true},
            {taskId: v1(), title: "Beer", isDone: false},
        ]
    });

    function removeTask(taskId: string, todoId: string) {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(el => el.taskId !== taskId)})
    }

    function addTask(todoId: string, title: string) {
        let newTask = {taskId: v1(), title, isDone: false}
        setTasks({...tasks, [todoId]: [newTask,...tasks[todoId]]})
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(el => el.taskId === taskId
                ? {...el, isDone: !isDone}
                : el)
        })
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(el => el.todoId === todolistId ? {...el, filter: value} : el))
    }

    function removeTodolist(todolistId: string) {
        setTodolists([...todolists.filter(el=>el.todoId !== todolistId)])
    }

    function addNewTodo (title:string) {
        let newTodo:TodolistType = {todoId: v1(), title, filter: "all"}
        setTodolists([newTodo,...todolists])
        setTasks({...tasks,[newTodo.todoId]:[]})
    }

    function changeTaskTitle (todolistId: string, taskId: string, newValue: string) {
        // setTasks({...tasks,[todolistId]:{...tasks[todolistId].map(el=>el.taskId === taskId ? {...el, title: newValue}:el)}})
        setTasks({...tasks,[todolistId]:tasks[todolistId].map(el=>el.taskId === taskId ? {...el, title:newValue}:el)})
    }

    function changeTodoTitle (todolistId: string, newValue: string) {
        // setTodolists([...todolists.map(el=> el.todoId === todolistId ? {...el, title:newValue} :el)])
        setTodolists(todolists.map(todo => (todo.todoId === todolistId ? { ...todo, title: newValue } : todo)));
    }

    return (
        <div className="App">
            <AddItemForm callBack={addNewTodo}/>
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasks[tl.todoId]
                    if (tl.filter == "active") {
                        tasksForTodolist = tasks[tl.todoId].filter(el=>el.isDone)
                    }
                    if (tl.filter == "completed") {
                        tasksForTodolist = tasks[tl.todoId].filter(el=>!el.isDone)
                    }
                        return <Todolist
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
                })
            }

        </div>
    );
}

export default App;
