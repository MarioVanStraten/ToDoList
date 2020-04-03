const getAllTasksFromAPI = async () => {
    try {
        const apiURL = `https://wincacademydatabase.firebaseio.com/mario/tasks.json`
        const result = await fetch(apiURL,{
            method: 'GET'
        })
        const data = await result.json()
        return data
    } catch (err){
        console.log(err)
    }    
}

const postNewTaskToAPI = async (taskDesription) => {
    try{
        const apiURL = `https://wincacademydatabase.firebaseio.com/mario/tasks.json`
        const data = {description: taskDesription, done: false}
        await fetch(apiURL,{
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
    try{
        const apiURL = `https://wincacademydatabase.firebaseio.com/mario/tasks/${taskID}.json`
        await fetch(apiURL,{
            method: 'DELETE',
        })
        // Call DOM function -> refresh task list
        addTasksToTaskList()
    } catch (err){
        console.log(err)
    }
}

const updateTaskDescriptionOnAPI = async (taskID,taskDesription) => {
    try{
        const apiURL = `https://wincacademydatabase.firebaseio.com/mario/tasks/${taskID}/description.json`
        await fetch(apiURL,{
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

const toggleTaskStatusOnAPI = async (taskID,status) => {
    try{
        const apiURL = `https://wincacademydatabase.firebaseio.com/mario/tasks/${taskID}/done.json`
        await fetch(apiURL,{
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