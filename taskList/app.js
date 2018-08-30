//define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
var newTask;

//load all event listeners
loadEventListeners();

function loadEventListeners(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', (event) => {
        addTask(event, true, null);
    });
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear tasks event
    clearButton.addEventListener('click', clearTasks);
    //filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

//get tasks from local storage
function getTasks(){
    let tasks = checkForTasks();
    tasks.forEach(task => addTask(null, false, task))
}

//add task function
function addTask(event, newTask, task){
    if(newTask && taskInput.value === ''){
        alert('Add a task');
    }else{
        //create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        //Create text node and append to li
        if(newTask){
            li.appendChild(document.createTextNode(taskInput.value));
        }else{
            li.appendChild(document.createTextNode(task));
        }
        //create link element
        const link = document.createElement('a');
        link.className = 'deleteItem secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append link to li
        li.appendChild(link);
        //append li to list
        taskList.appendChild(li);
    
        //store task in localStorage
        if(newTask){
            storeTaskInLocalStorage(taskInput.value);
        }
        //clear input
        taskInput.value = '';
    }
    if(event != null){
        event.preventDefault();
    }
}

//remove task function
function removeTask(event){
    if(event.target.parentElement.classList.contains('deleteItem')){
        if(confirm('Are you sure?')){
            let taskElement = event.target.parentElement.parentElement;
            taskElement.remove();
            removeTaskFromLocalStorage(taskElement);
        }
    }
}

//clear tasks function
function clearTasks(event){
    //clear task list
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}

//filter tasks function
function filterTasks(event){
    let text = event.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(task => {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
    console.log(text);
}

//store task in local storage
function storeTaskInLocalStorage(task){
    //check if any tasks are in local storage
    let tasks = checkForTasks();

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task from local storage
function removeTaskFromLocalStorage(taskElement){
    console.log('removing from ls');
    let tasks = checkForTasks();
    tasks.forEach((task, index) => {
        if(taskElement.textContent === task){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//check if task is in local storage
function checkForTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}