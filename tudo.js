/*
--setTimeout
--localStorage
--array
--mapping
--dom manipulation
--event listeners

step1:create the html basic structure
step2:style html elements
step3:find all the html elementsand add listeners
step4:add todo
step5:showmessage
step6:Add to local Storage
step7:delete todo
step8:read todo
*/

//find the elements
const container = document.querySelector('.container');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#inputTodo');
const todoAddButton = document.querySelector('#todoAddButton');
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");


//Show message
const showMessage = (text, status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);

    setTimeout(() => {
        messageElement.textContent = "";
        messageElement.classList.remove(`bg-${status}`);

    }, 1000)
};

//--------createTodo
const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style")
    todoElement.innerHTML = `
    <span> ${todoValue} </span>
    <span> <button class="btn" id="deleteButton">
   <i class="fa fa-trash"></i> </button> </span>
    `;

    todoLists.appendChild(todoElement);

    const deleteButton =todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click", deleteTodo);
    // localStorage.setItem("mytodos", JSON.stringify(todos));
     
}

//delete todo 
const deleteTodo = (event) => {
    // console.log("delete todo");
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    // console.log(selecteTodo);
    todoLists.removeChild(selectedTodo);
    showMessage("today to deleted", "danger");

    // const todoId= selectedTodo.id();

    let todos=getTodosFormLocalStorage();
    todos=todos.filter((todo) => todo.todoId === selectedTodo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));
     

};


//getTodosFormLocalStorage
getTodosFormLocalStorage = () => {
   return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
}

//-------add toDo
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value;
    // console.log(todoInput.value);


    //------unique id
    const todoId = Date.now().toString();
    // console.log(todoId);

    createTodo(todoId, todoValue);
    showMessage("todo is added", "success");

    //add todo to localStorage
    const todos =getTodosFormLocalStorage();
    todos.push(todoId, todoValue);
    localStorage.setItem("mytodos", JSON.stringify(todos));
    todoInput.value = "";
};


//load todos
const  loadTodos = () => {
    // console.log("loaded");

    const todos=getTodosFormLocalStorage();
    todos.map((todo) => createTodo(todo.todoId, todo.todoValue));
}


//--------Adding listener
todoForm.addEventListener("submit", addTodo);
 window.addEventListener("DOMContentLoaded", loadTodos);



