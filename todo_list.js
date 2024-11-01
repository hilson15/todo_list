let tasks = [];

// Function to add a new task object to the tasks array.
function addTasks(task, date, priority) {
    tasks.push({ text: task, completed: false, dueDate: date, priority: priority }); 
    const messageDiv = document.getElementById('alertDisplay');
    messageDiv.textContent = 'Task added successfully'

    setTimeout(() => {
        messageDiv.style.display = 'none';

    }, 3000);
}

function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed; 
}

function deleteTask(index) {
    tasks.splice(index, 1); 
}

// Function to remove active class from all filter buttons
function removeActiveClasses() {
    const buttons = document.querySelectorAll('#subSection button');
    buttons.forEach(button => {
        button.classList.remove('active'); // Remove active class
    });
}

function renderTasks(filter = 'All') {
    const taskList = document.getElementById('taskList'); // Get the UL element for tasks.
    taskList.innerHTML = ""; // Clear the current list.

    let filteredTasks;
    if (filter === 'All') {
        filteredTasks = tasks;
    } else if (filter === 'Completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'Pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'Today') {
        const today = new Date().toISOString().split('T')[0]; 
        filteredTasks = tasks.filter(task => task.dueDate === today);
    } else {
        filteredTasks = tasks.filter(task => task.priority === filter);
    }

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('listElement')
        li.textContent = `${task.text} (Due: ${task.dueDate}, Priority: ${task.priority})`;

        // div for buttons
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button-container');

        // Text input for editing the task
        const taskInput = document.createElement('input');
        taskInput.type = 'text';
        taskInput.value = task.text;
        taskInput.style.display = 'none'; // Hide it initially

        const toggleButton = document.createElement('button');
        toggleButton.textContent = task.completed ? 'Undo' : 'Complete'; 
        toggleButton.classList.add('toggleBtn');
        toggleButton.addEventListener('click', () => {
            toggleTaskStatus(index); 
            renderTasks(filter); 
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deletingBtn');
        deleteButton.textContent = 'Delete'; 
        deleteButton.addEventListener('click', () => {
            deleteTask(index); 
            renderTasks(filter); 
        });

        const toggleEdit = document.createElement('button');
        toggleEdit.textContent = 'Edit';
        toggleEdit.classList.add('editingBtn');
        toggleEdit.addEventListener('click', () => {
            if (toggleEdit.textContent === 'Edit') {
                taskInput.style.display = 'inline'; // Show the input
                toggleEdit.textContent = 'Save'; // Change button text
            } else {
                tasks[index].text = taskInput.value; // Update the task text
                taskInput.style.display = 'none'; // Hide the input again
                toggleEdit.textContent = 'Edit'; // Change button text back
                renderTasks(filter); // Refresh the task list
            }
        });

        // Append buttons to the buttonDiv
    buttonDiv.appendChild(toggleButton);
    buttonDiv.appendChild(deleteButton);
    buttonDiv.appendChild(toggleEdit);
    
    li.appendChild(taskInput); // Append task input
    li.appendChild(buttonDiv); // Append the button container
    taskList.appendChild(li);

    });
}

// Event listener for the Add Task button
document.getElementById('addBtn').addEventListener('click', () => {
    const userTaskInput = document.getElementById('taskInput'); 
    const taskText = userTaskInput.value.trim(); 
    const dueDate = document.getElementById('dateInput').value;
    const priorityInput = document.getElementById('priorityInput').value;
    
    if (taskText && dueDate && priorityInput !== 'Select Priority') {
        addTasks(taskText, dueDate, priorityInput); 
        userTaskInput.value = ""; 
        document.getElementById('dateInput').value = "";
        document.getElementById('priorityInput').selectedIndex = 0; 
        renderTasks(); 
    }
});

// Adding event listeners for the filter buttons
document.getElementById('allBtn').addEventListener('click', () => {
    removeActiveClasses();
    document.getElementById('allBtn').classList.add('active');
    renderTasks('All');
});

document.getElementById('completedBtn').addEventListener('click', () => {
    removeActiveClasses();
    document.getElementById('completedBtn').classList.add('active');
    renderTasks('Completed');
});

document.getElementById('pendingBtn').addEventListener('click', () => {
    removeActiveClasses();
    document.getElementById('pendingBtn').classList.add('active');
    renderTasks('Pending');
});

document.getElementById('byDate').addEventListener('click', () => {
    removeActiveClasses();
    document.getElementById('byDate').classList.add('active');
    renderTasks('Today'); // Use a string to match the renderTasks function
});

// Priority filter dropdown listener
document.getElementById('priorityFilter').addEventListener('change', () => {
    const priorityInput = document.getElementById('priorityFilter').value;
    removeActiveClasses();
    const buttons = document.querySelectorAll('#subSection button');
    buttons.forEach(button => {
        if (button.textContent === priorityInput) {
            button.classList.add('active');
        }
    });
    renderTasks(priorityInput);
});
