const getAllTasksFromAPI = async () => {
    try {
        const endpoint = `https://wincacademydatabase.firebaseio.com/mario/tasks.json`
        const result = await fetch(endpoint,{
            method: 'GET'
        })
        const data = await result.json()
        return data
    } catch (err){
        console.log(err)
    }    
}

const postNewTaskToAPI = async (taskDesription) => {
    try {
        const endpoint = `https://wincacademydatabase.firebaseio.com/mario/tasks.json`
        const data = {description: taskDesription, done: false}
        await fetch(endpoint,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        // Call DOM function -> refresh task list
        addTasksToTaskList()
    } catch (err){
        console.log(err)
    }    
}

const deleteTaskFromAPI = async (taskID) => {
    try {
        const endpoint = `https://wincacademydatabase.firebaseio.com/mario/tasks/${taskID}.json`
        await fetch(endpoint,{
            method: 'DELETE',
        })
        // Call DOM function -> refresh task list
        addTasksToTaskList()
    } catch (err){
        console.log(err)
    }
}

const putTaskDescriptionToAPI = async (taskID,taskDesription) => {
    try {
        const endpoint = `https://wincacademydatabase.firebaseio.com/mario/tasks/${taskID}/description.json`
        await fetch(endpoint,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(taskDesription)
        })
        // Call DOM function -> refresh task list
        addTasksToTaskList()
    } catch (err){
        console.log(err)
    }
}

const putTaskStatusToAPI = async (taskID,status) => {
    try {
        const endpoint = `https://wincacademydatabase.firebaseio.com/mario/tasks/${taskID}/done.json`
        await fetch(endpoint,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: status
        })
        // Call DOM function -> refresh task list
        addTasksToTaskList()
    } catch (err){
        console.log(err)
    }
}