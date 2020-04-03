const addTasksToTaskList = async () => {
    // Await results from API
    const result = await getAllTasksFromAPI()
    // Remap Object to clean array
    let tasks = Object.keys(result).map(key => ({
        id: key,
        description: result[key].description,
        done: result[key].done
    }))
    // DOM: Clear current content in task list
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
        const checkBox = document.createElement('input')
        checkBox.classList.add('checkbox')
        checkBox.type = 'checkbox'
        // Set checkbox status depending on DB status
        if(task.done === true){
            checkBox.setAttribute('checked','checked')
        }
        // Create editable div with task description
        const taskDescription = task.description
        const div = document.createElement('div')
        div.classList.add('task-description')
        div.setAttribute('contenteditable', true)
        div.append(taskDescription)
        // Set task description styling depending on DB status
        if(task.done === true){
            div.classList.add('line-through')
        }
        // Create update button
        const updateTask = document.createElement('i')
        updateTask.classList.add('fas','fa-sync-alt', 'updateTask')
        // Create delete button
        const deleteTask = document.createElement('i')
        deleteTask.classList.add('fas','fa-trash-alt', 'deleteTask')
        // Add elements to task-row
        taskRow.append(checkBox, div, updateTask, deleteTask)
        // Add task-row to task list
        const taskList = document.querySelector('.task-list')
        taskList.append(taskRow)
    })
    // Call functions when dinamic elements are done
    deleteTask()
    updateTaskDescription()
    toggleTaskStatus()
}

const submitNewTask = () => {
    const inputField = document.querySelector('.new-task');
    const submitButton = document.querySelector('.btn-add-task');
    // Add eventlistner to 'add task' button
    submitButton.addEventListener('click', () => {
        let newTask = inputField.value
        // Check is inputfieled is not empty
        if(newTask !== '' && newTask !== null){
            // Call API function -> submit new task
            postNewTaskToAPI(newTask)
        }
        // Empty the inputfield
        inputField.value = ''
    })
}

const deleteTask = () => {
    const deleteButtons = document.querySelectorAll('.deleteTask');
    deleteButtons.forEach(deleteButton => {
        // Add eventlistner to all delete buttons
        deleteButton.addEventListener('click', (event) => {
            const clickedButton = event.target
            // Get task ID from parent data attribute
            const taskRowID = clickedButton.parentElement.dataset.id
            // Call API function -> delete task
            deleteTaskFromAPI(taskRowID)
        })
    }) 
}

const updateTaskDescription = () => {
    const updateButtons = document.querySelectorAll('.updateTask')
    updateButtons.forEach(updateButton => {
        // Add eventlistner to all update buttons
        updateButton.addEventListener('click', (event) => {
            const clickedButton = event.target
            // Get task ID from parent data attribute
            const taskRowID = clickedButton.parentElement.dataset.id
            // Select task description text in this row
            const taskDescriopton = document.querySelector(`div[data-id="${taskRowID}"] > .task-description`).innerText
            // Call API function -> update description
            updateTaskDescriptionOnAPI(taskRowID,taskDescriopton)
        })
    }) 
}

const toggleTaskStatus = () => {
    const checkBoxes = document.querySelectorAll('.checkbox')
    checkBoxes.forEach(checkBox => {
        // Add eventlistner to all checkboxes
        checkBox.addEventListener('click', (event) => {
            const clickedCheckBox = event.target
            // Get task ID from parent data attribute
            const taskRowID = clickedCheckBox.parentElement.dataset.id
            const statusCheck = clickedCheckBox.getAttribute('checked')
            // Check the current status of the checkbox for toggele
            if(statusCheck==='checked'){
                setStauts = false
            } else {
                setStauts = true
            }
            // Call API function -> update status
            toggleTaskStatusOnAPI(taskRowID,setStauts)
        })
    }) 
}

// Initial function calls on page load
addTasksToTaskList()
submitNewTask()