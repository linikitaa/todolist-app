import {addTodoAC, TodolistDomainType, todolistsReducer} from "../reducers/todolists-reducer";
import {tasksReducer, TasksStateType} from "../reducers/tasks-reducer";
import {v1} from "uuid";

// test('ids should be equals', () => {
//     const startTasksState: TasksStateType = {}
//     const startTodolistsState: Array<TodolistDomainType> = []
//     let newTodoId = v1()
//     const action = addTodoAC('new todolist',newTodoId)
//
//     const endTasksState = tasksReducer(startTasksState, action)
//     const endTodolistsState = todolistsReducer(startTodolistsState, action)
//
//     const keys = Object.keys(endTasksState)
//     const idFromTasks = keys[0]
//     const idFromTodolists = endTodolistsState[0].id
//
//     expect(idFromTasks).toBe(action.payload.item.id)
//     expect(idFromTodolists).toBe(action.payload.item.id)
// })
