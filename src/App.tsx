import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

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

// export type TasksStateType = {
//     [key: string]: TasksType[]
// }

export type FilterValuesType = "all" | "active" | "completed";


function App() {
    let todoId1 = v1();
    let todoId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {todoId: todoId1, title: "What to learn", filter: "all"},
        {todoId: todoId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState({
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

    // const todoFromServer=[
    //     {
    //         title: "What to learn",
    //         filter: "all",
    //         tasks: [
    //             {taskId: v1(), title: "HTML&CSS", isDone: true},
    //             {taskId: v1(), title: "JS", isDone: true}
    //         ],
    //         students: [
    //             'Rick Kane',
    //             'Finnlay Bentley',
    //             'Samia North',
    //             'Isaac Morton',
    //             'Lily-Ann Clifford',
    //             'Thalia Park',
    //             'Sapphire Cruz',
    //             'Cieran Vazquez',
    //             'Anya Estes',
    //             'Dominika Field',
    //             'Rosanna Chung',
    //             'Safiyah Davey',
    //             'Ryley Beasley',
    //             'Kalvin Trejo',
    //             'Evie-Mae Farrell',
    //             'Juliet Valencia',
    //             'Astrid Austin',
    //             'Lyle Montgomery',
    //             'Nisha Mora',
    //             'Kylie Callaghan',
    //             'Star Wilks',
    //             'Marissa Colley',
    //             'Asa Fuller',
    //             'Leigh Kemp',
    //             'Avleen Dawson',
    //             'Sammy Bonilla',
    //             'Acacia Becker',
    //             'Coral Shepherd',
    //             'Melina Molina',
    //             'Kiran Bailey',
    //             'Clara Escobar',
    //             'Alexandru Horn',
    //             'Brandon-Lee Mercado',
    //             'Elouise Weston',
    //             'King Long',
    //             'Kerri Searle',
    //             'Kanye Hamer',
    //             'Elwood Benitez',
    //             'Mikail Whitaker',
    //             'Bobby Hardy',
    //             'Talha Ferry',
    //             'Priscilla Landry',
    //             'Olivia-Grace Cain',
    //             'Kiaan Wallace',
    //             'Wesley Padilla90',
    //             'Ella-Grace Wooten91',
    //             'Kaif Molloy92',
    //             'Kamal Broadhurst93',
    //             'Bianca Ferrell94',
    //             'Micheal Talbot95',
    //         ]
    //     },
    //     {
    //         title: "What to do",
    //         filter: "all",
    //         tasks: [
    //             {taskId: v1(), title: "HTML&CSS2", isDone: true},
    //             {taskId: v1(), title: "JS2", isDone: true}
    //         ],
    //         students: [
    //             'Jago Wormald1',
    //             'Saul Milne2',
    //             'Aariz Hester3',
    //             'Dion Reeve4',
    //             'Anisa Ortega5',
    //             'Blade Cisneros6',
    //             'Malaikah Phelps7',
    //             'Zeeshan Gallagher8',
    //             'Isobella Vo9',
    //             'Rizwan Mathis10',
    //             'Menaal Leach11',
    //             'Kian Walton12',
    //             'Orion Lamb13',
    //             'Faizah Huynh14',
    //             'Crystal Vaughan15',
    //             'Vivien Hickman16',
    //             'Stuart Lu17',
    //             'Karol Davison18',
    //             'Dario Burns19',
    //             'Chloe Rich20',
    //             'Martyna Felix',
    //             'Nida Glass',
    //             'Maeve Miles',
    //             'Hasnain Puckett',
    //             'Ayman Cano',
    //             'Safwan Perry',
    //             'Fox Kelly',
    //             'Louise Barlow',
    //             'Malaki Mcgill',
    //             'Leanna Cline',
    //             'Willard Hodge',
    //             'Amelia Dorsey',
    //             'Kiah Porter',
    //             'Jeanne Daly',
    //             'Mohsin Armstrong',
    //             'Laurie Rangel',
    //             'Princess Tierney',
    //             'Kasim Kendall',
    //             'Darryl Cope',
    //             'Elysha Ray',
    //             'Liyana Harris',
    //             'Kashif Blackburn',
    //             'Atif Zimmerman',
    //             'Sila Hartley',
    //             'Ralphie Hebert',
    //         ]
    //     }
    // ]
    //


    function removeTask(taskId: string, todoId: string) {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(el => el.taskId !== taskId)})
    }

    function addTask(todoId: string, title: string) {
        let newTask = {taskId: v1(), title, isDone: false}
        setTasks({...tasks, [todoId]: [...tasks[todoId], newTask]})
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

    return (
        <div className="App">
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
                        />
                })
            }

        </div>
    );
}

export default App;
