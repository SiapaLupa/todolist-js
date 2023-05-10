var _this = this;
var todo = document.getElementById("todo");
var submit = document.getElementById("submit");
var table = document.getElementById("table");
var info = document.getElementById("info");
var search = document.getElementById("search");
var intervalId = undefined;
var separator = "$$";
var key = "todo";
renderData(table);
search.onkeyup = function (event) {
    renderData(_this.table, event.target.value);
};
submit.onclick = function () {
    if (todo.value.length <= 0)
        return invalidInput();
    var prevData = window.localStorage.getItem(key);
    var data = typeof prevData !== "string"
        ? todo.value
        : [prevData, todo.value].join(separator);
    todo.value = "";
    insertInfo("Success!", "green");
    window.localStorage.setItem(key, data);
    renderData(_this.table);
};
function invalidInput() {
    clearTimeout(window.intervalId);
    insertInfo("Cannot add empty todo!");
}
function insertInfo(text, color) {
    if (color === void 0) { color = "red"; }
    var initialTextColor = "red";
    info.innerText = text;
    info.style.setProperty("--text-color", color);
    window.intervalId = setTimeout(function () {
        info.innerText = "";
        info.style.setProperty("--text-color", initialTextColor);
    }, 1000);
}
function renderData(table, filter) {
    if (filter === void 0) { filter = ""; }
    var storageItem = window.localStorage.getItem(key);
    if (typeof storageItem !== "string")
        return;
    var items = storageItem.split(separator);
    clearData(table);
    items.filter(function (item) { return item.includes(filter); }).forEach(function (item, index) {
        var tableRow = document.createElement("tr");
        var number = document.createElement("td");
        var todo = document.createElement("td");
        var checkCell = document.createElement("td");
        ;
        var checklist = document.createElement("input");
        checklist.type = "checkbox";
        todo.innerText = item;
        number.innerText = String(index + 1).concat(".");
        checkCell.appendChild(checklist);
        tableRow.appendChild(number);
        tableRow.appendChild(todo);
        tableRow.appendChild(checkCell);
        table.appendChild(tableRow);
    });
}
function clearData(table) {
    Array.from(table.children).forEach(function (child) { return child.remove(); });
}
