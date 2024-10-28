// Creating array to store the tasks. setting it to be empty at first
let tasks = [];

//a function to Add a new task object to the tasks array.
function addTasks(task) {
    tasks.push({ text: task, completed: false}); 
}

// function to Toggle the completed status of the task at the specified index.
function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed; 
}


// Remove the task from the tasks array at the given index.

function deleteTask(index) {
    tasks.splice(index, 1); 
}
// Function to filter tasks based on the selected filter
function filterTasks(filter) {
    if (filter === 'All') return tasks; // Return all tasks if the filter is 'All'.
    return tasks.filter(task => (filter === 'Completed' ? task.completed : !task.completed)); // Filter by completion status.
}

// Event listener for the Add Task button
document.getElementById('addBtn').addEventListener('click', () => {
    const userTaskInput = document.getElementById('taskInput'); // Get the input field.
    const taskText = userTaskInput.value.trim(); // Get and trim the input value.
    // const taskDate = document.getElementById('taskDate').value;
    // const userDate = parseInt(taskDate);
    if (taskText) { // Check if the input is not empty.
        addTasks(taskText); // Add the task to the tasks array.
        userTaskInput.value = ""; // Clear the input field.
        // taskDate.value = "";
        renderTasks(); // Refresh the task list to display the new task.
    }
});

// Adding event listeners for the filter buttons
document.getElementById('allBtn').addEventListener('click', () => renderTasks('All'));
document.getElementById('completedBtn').addEventListener('click', () => renderTasks('Completed'));
document.getElementById('pendingBtn').addEventListener('click', () => renderTasks('Pending'));

// Function to render tasks based on the current filter
function renderTasks(filter = 'All') {
    const taskList = document.getElementById('taskList'); // Get the UL element for tasks.
    taskList.innerHTML = ""; // Clear the current list.

    const filteredTasks = filterTasks(filter); // Get the tasks based on the current filter.
    filteredTasks.forEach((task, index) => { // Loop through each filtered task.
        const li = document.createElement('li'); // Create a new list item for the task.
        li.textContent = task.text; // Set the text of the list item to the task's text.

        // Create a button to toggle completion
        const toggleButton = document.createElement('button');
        toggleButton.style.backgroundColor = 'green';
        toggleButton.style.color = 'white';
        toggleButton.style.border = 'none';
        toggleButton.style.padding = '8px';
        toggleButton.style.width = '100px';
        toggleButton.textContent = task.completed ? 'Undo' : 'Complete'; // Change button text based on completion status.
        toggleButton.addEventListener('click', () => {
            toggleTaskStatus(index); // Toggle the task's completion status.
            renderTasks(filter); // Refresh the task list to show updated status.
        });

        // Create a button to delete the task
        const deleteButton = document.createElement('button');
        deleteButton.style.backgroundColor = 'red';
        deleteButton.style.border = 'none';
        deleteButton.style.padding = '8px';
        deleteButton.style.width = '100px';
        deleteButton.style.color = 'white';
        deleteButton.textContent = 'Delete'; // Set text for the delete button.
        deleteButton.addEventListener('click', () => {
            deleteTask(index); // Delete the task at the given index.
            renderTasks(filter); // Refresh the task list after deletion.
        });

        // const decision = document.getElementById('decision');
        // decision.appendChild(toggleButton);
        // Append buttons to the list item
        li.appendChild(toggleButton);
        toggleButton.style.marginTop = '20px';
        toggleButton.style.marginLeft = '50px';
         // Add the toggle button to the list item.
        //  decision.appendChild(deleteButton);
        li.appendChild(deleteButton); 
        deleteButton.style.marginLeft = '20px';
        // Add the delete button to the list item.
        taskList.appendChild(li); // Append the list item to the task list.
        // li.appendChild(userDate);
    });
}
