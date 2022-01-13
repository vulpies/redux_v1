import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import {
    titleChanged,
    taskDeleted,
    completeTask,
    loadTasks,
    getTasks,
    createdTask,
    getTasksLoadingStatus,
} from "./store/task"
import configureStore from "./store/store"
import { Provider } from "react-redux"
import { useSelector, useDispatch } from "react-redux"
import { getError } from "./store/errors"

const store = configureStore()

const App = () => {
    const state = useSelector(getTasks())
    const isLoading = useSelector(getTasksLoadingStatus())
    const error = useSelector(getError())
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTasks())
    }, [])

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId))
    }
    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId))
    }
    const createTask = () => {
        const newtit = "New title"
        dispatch(createdTask(newtit))
    }

    if (isLoading) {
        return <h1>Loading</h1>
    }
    if (error) {
        return <p>{error}</p>
    }

    return (
        <>
            <h1> App</h1>
            <button onClick={() => createTask()}>Create task</button>
            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p> {`Completed: ${el.completed}`}</p>
                        <button onClick={() => dispatch(completeTask(el.id))}>
                            Complete
                        </button>
                        <button onClick={() => changeTitle(el.id)}>
                            Change title
                        </button>
                        <button onClick={() => deleteTask(el.id)}>
                            Delete
                        </button>

                        <hr />
                    </li>
                ))}
            </ul>
        </>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
)
