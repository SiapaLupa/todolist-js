var todo = document.getElementById("todo");
var submit = document.getElementById("submit");
var table = document.getElementById("table");
var info = document.getElementById("info");
var search = document.getElementById("search");
var intervalId = undefined;
var separator = "$$";
var key = "todo";
renderData(table);
search.onkeyup = (event) => {
    renderData(this.table, event.target.value);
};
submit.onclick = () => {
    if (todo.value.length <= 0)
        return invalidInput();
    let prevData = window.localStorage.getItem(key);
    let data = typeof prevData !== "string"
        ? todo.value
        : [prevData, todo.value].join(separator);
    todo.value = "";
    insertInfo("Success!", "green");
    window.localStorage.setItem(key, data);
    renderData(this.table);
};
function invalidInput() {
    clearTimeout(window.intervalId);
    insertInfo("Cannot add empty todo!");
}
function insertInfo(text, color = "red") {
    const initialTextColor = "red";
    info.innerText = text;
    info.style.setProperty("--text-color", color);
    window.intervalId = setTimeout(() => {
        info.innerText = "";
        info.style.setProperty("--text-color", initialTextColor);
    }, 1000);
}
function renderData(table, filter = "") {
    let storageItem = window.localStorage.getItem(key);
    if (typeof storageItem !== "string")
        return clearData(table);
    let items = storageItem.split(separator);
    clearData(table);
    items.filter((item) => item.includes(filter)).forEach((item, index) => {
        let tableRow = document.createElement("tr");
        let number = document.createElement("td");
        let form = document.createElement("form");
        let editTodo = document.createElement("input");
        let submitEditTodo = document.createElement("input");
        let todoCell = document.createElement("td");
        let checkCell = document.createElement("td");
        let trashCell = document.createElement("td");
        let checklist = document.createElement("input");
        let trash = document.createElement("button");
        trash.innerText = "x";
        trash.onclick = () => {
            destroyData(items, index, table);
        };
        checklist.type = "checkbox";
        // trash.style.visibility = "hidden"
        // checklist.style.visibility = "hidden"
        submitEditTodo.type = "submit";
        editTodo.value = item;
        form.onsubmit = (e) => e.preventDefault();
        number.innerText = String(index + 1).concat(".");
        form.appendChild(editTodo);
        todoCell.appendChild(form);
        checkCell.appendChild(checklist);
        trashCell.appendChild(trash);
        tableRow.appendChild(number);
        tableRow.appendChild(todoCell);
        tableRow.appendChild(checkCell);
        tableRow.appendChild(trashCell);
        table.appendChild(tableRow);
    });
}
function clearData(table) {
    Array.from(table.children).forEach((child) => child.remove());
}
function destroyData(items, index, table) {
    if (items.length <= 1) {
        window.localStorage.removeItem(key);
        return renderData(table);
    }
    items.splice(index, 1);
    let dataAfterDestroy = items.join(separator);
    window.localStorage.setItem(key, dataAfterDestroy);
    return renderData(table);
}
