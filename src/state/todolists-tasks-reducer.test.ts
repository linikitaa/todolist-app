import {addNewTodoAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";

test('is should be equals',()=> {
    const startTasksState: TasksStateType = {}
    const startTodolistState: TodolistDomainType[] = []
    //
    // // const action = addNewTodoAC('XXX')
    // const endTasksState = tasksReducer(startTasksState,action)
    // const endTodolistState = todolistsReducer(startTodolistState, action)
    //
    // const keys = Object.keys(endTasksState)
    // const idFormTasks = keys[0]
    // const idFormTodolists = endTodolistState[0].todoId
    //
    // expect(idFormTasks).toBe(action.todoId)
    // expect(idFormTodolists).toBe(action.todoId)
})