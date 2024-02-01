import {addNewTodoAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []
    let newTodoId = v1()
    const action = addNewTodoAC('new todolist',newTodoId)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].todoId

    expect(idFromTasks).toBe(action.payload.todoId)
    expect(idFromTodolists).toBe(action.payload.todoId)
})
