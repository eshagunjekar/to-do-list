let todoItemsContainerEl = document.getElementById('todoItemsContainer');
let addTodoButton = document.getElementById("addToDoButton");
let saveTodoButton = document.getElementById("saveTodoButton");


function getTodoListFromLocalStroage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStroage();

let todoListCount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function todoCheckStatus(labelElId, listElId) {
    let labelElement = document.getElementById(labelElId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let tofindIndex = "listEl" + eachTodo.uniqueNo;
        if (tofindIndex === listElId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function onDeleteToDo(listElId) {
    let listElement = document.getElementById(listElId);
    todoItemsContainerEl.removeChild(listElement);
    let deletedTodoItemIndex = todoList.findIndex(function(eachItem) {
        let eachTodoId = "listEl" + eachItem.uniqueNo;
        if (eachTodoId === listElId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deletedTodoItemIndex, 1);
}

function createAndAppendTodo(todo) {
    let inputElId = "inputEl" + todo.uniqueNo;
    let labelElId = "labelEl" + todo.uniqueNo;
    let listElId = "listEl" + todo.uniqueNo;

    let listEl = document.createElement("li");
    listEl.setAttribute("id", listElId);
    listEl.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainerEl.appendChild(listEl);

    let inputEl = document.createElement('input');
    inputEl.setAttribute("id", inputElId);
    inputEl.setAttribute("type", "checkbox");
    inputEl.classList.add("checkbox-input");
    inputEl.checked = todo.isChecked;
    inputEl.onclick = function() {
        todoCheckStatus(labelElId, listElId);
    };
    listEl.appendChild(inputEl);

    let labelContainerEl = document.createElement("div");
    labelContainerEl.setAttribute("id", labelElId);
    labelContainerEl.classList.add("label-container", "d-flex", "flex-row");
    listEl.appendChild(labelContainerEl);

    let labelEl = document.createElement("label");
    labelEl.classList.add("checkbox-label");
    labelEl.setAttribute("for", inputElId);
    labelEl.textContent = todo.text;
    if (todo.isChecked === true) {
        labelEl.classList.add("checked");
    }
    labelContainerEl.appendChild(labelEl);


    let delContainer = document.createElement("div");
    delContainer.classList.add("delete-icon-container");
    labelContainerEl.appendChild(delContainer);

    let deleteEl = document.createElement("i");
    deleteEl.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteEl.onclick = function() {
        onDeleteToDo(listElId);
    };
    delContainer.appendChild(deleteEl);
}

for (let i = 0; i < todoListCount; i++) {
    createAndAppendTodo(todoList[i]);
}

function onAddTodo() {
    todoListCount = todoListCount + 1;
    let addElement = document.getElementById("todoUserInput");
    let userInputElement = addElement.value;

    if (userInputElement === "") {
        alert("Enter a Valid Text!");
        return;
    }

    let newToDo = {
        text: userInputElement,
        uniqueNo: todoListCount,
        isChecked: false
    };
    todoList.push(newToDo);

    createAndAppendTodo(newToDo);
    addElement.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
}