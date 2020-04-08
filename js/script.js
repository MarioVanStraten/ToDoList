const addTasksToTaskList = async () => {
    // Await results from API
    const result = await getAllTasksFromAPI()
    // Remap Object to clean array
    let tasks = Object.keys(result).map(key => ({
        id: key,
        description: result[key].description,
        done: result[key].done
    }))
    // DOM: Clear current content in the task list
    const taskList = document.querySelector('.task-list')
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // DOM: Create new task-row for each task in array
    tasks.forEach(task => {
        // Create task-row
        const taskRow = document.createElement('div')
        taskRow.classList.add('task-row')
        // Add task ID to data attribute
        taskRow.setAttribute('data-id', task.id)
        // Create checkbox
        const checkbox = document.createElement('input')
        checkbox.classList.add('checkbox')
        checkbox.type = 'checkbox'
        // Set checkbox status depending on API status
        task.done === true ? checkbox.setAttribute('checked','checked') : ''
        // Create editable div with task description
        const taskDescription = task.description
        const div = document.createElement('div')
        div.classList.add('task-description')
        div.setAttribute('contenteditable', true)
        div.append(taskDescription)
        // Set description styling depending on API status
        task.done === true ? div.classList.add('line-through') : ''
        // Create update button
        const updateButton = document.createElement('i')
        updateButton.classList.add('fas','fa-sync-alt', 'updateTask')
        updateButton.title = 'Update'
        // Create delete button
        const deleteButton = document.createElement('i')
        deleteButton.classList.add('fas','fa-trash-alt', 'deleteTask')
        deleteButton.title = 'Delete'
        // Add elements to the task-row
        taskRow.append(checkbox, div, updateButton, deleteButton)
        // Add task-row to the task list
        const taskList = document.querySelector('.task-list')
        taskList.append(taskRow)
    })
    // Call functions when dinamic elements are done
    deleteTask()
    updateTaskDescription()
    toggleTaskStatus()
}

const submitNewTask = () => {
    // Select inputfield and 'add task' button
    const inputField = document.querySelector('.new-task');
    const submitButton = document.querySelector('.btn-add-task');
    // Add eventlistner to 'add task' button
    submitButton.addEventListener('click', () => {
        // Check if inputfield is not empty
        let newTask = inputField.value
        if(newTask !== '' && newTask !== null){
            // Call API function -> post new task
            postNewTaskToAPI(newTask)
        }
        // Empty the inputfield
        inputField.value = ''
    })
}

const deleteTask = () => {
    // Select all delete buttons 
    const deleteButtons = document.querySelectorAll('.deleteTask')
    deleteButtons.forEach(deleteButton => {
        // Add eventlistner to all delete buttons
        deleteButton.addEventListener('click', (event) => {
            const clickedButton = event.target
            // Get task ID from parent data attribute
            const taskID = clickedButton.parentElement.dataset.id
            // Call API function -> delete task
            deleteTaskFromAPI(taskID)
        })
    }) 
}

const updateTaskDescription = () => {
    // Select all update buttons
    const updateButtons = document.querySelectorAll('.updateTask')
    updateButtons.forEach(updateButton => {
        // Add eventlistner to all update buttons
        updateButton.addEventListener('click', (event) => {
            const clickedButton = event.target
            // Get task ID from parent data attribute
            const taskID = clickedButton.parentElement.dataset.id
            // Select description text in 'this' row
            const taskDescription = document.querySelector(`div[data-id="${taskID}"] > .task-description`).innerText
            // Call API function -> put description
            putTaskDescriptionToAPI(taskID,taskDescription)
        })
    }) 
}

const toggleTaskStatus = () => {
    // Select all checkboxes
    const checkboxes = document.querySelectorAll('.checkbox')
    checkboxes.forEach(checkbox => {
        // Add eventlistner to all checkboxes
        checkbox.addEventListener('click', (event) => {
            const clickedCheckbox = event.target
            // Get task ID from parent data attribute
            const taskID = clickedCheckbox.parentElement.dataset.id
            // Check the current status of the checkbox for toggling
            const statusCheckbox = clickedCheckbox.getAttribute('checked')
            statusCheckbox==='checked' ? setStauts = false : setStauts = true
            // Call API function -> put status
            putTaskStatusToAPI(taskID,setStauts)
        })
    }) 
}

// Initial function calls on page load
addTasksToTaskList()
submitNewTask()