var todo = document.getElementById("todo") as HTMLInputElement;
var submit = document.getElementById("submit") as HTMLInputElement;
var table = document.getElementById("table") as HTMLTableElement;
var info = document.getElementById("info") as HTMLParagraphElement;
var search = document.getElementById("search") as HTMLInputElement;
var intervalId: undefined | number = undefined;
var separator: string = "$$";
var key: string = "todo";

renderData(table);

search.onkeyup = (event: KeyboardEvent) => {
  renderData(this.table, (event.target as HTMLInputElement).value);
};

submit.onclick = () => {
  if (todo.value.length <= 0) return invalidInput();
  let prevData: string | null = window.localStorage.getItem(key);
  let data: string = typeof prevData !== "string"
    ? todo.value
    : [prevData, todo.value].join(separator);
  todo.value = "";
  insertInfo("Success!", "green");
  window.localStorage.setItem(key, data);
  renderData(this.table);
};

function invalidInput(): void {
  clearTimeout(window.intervalId);
  insertInfo("Cannot add empty todo!");
}

function insertInfo(text: string, color: string = "red"): void {
  const initialTextColor: string = "red";
  info.innerText = text;
  info.style.setProperty("--text-color", color);
  window.intervalId = setTimeout(() => {
    info.innerText = "";
    info.style.setProperty("--text-color", initialTextColor);
  }, 1000);
}

function renderData(table: HTMLTableElement, filter: string = ""): void {
  let storageItem: string | null = window.localStorage.getItem(key);
  if (typeof storageItem !== "string") return clearData(table);
  let items: Array<string> = storageItem.split(separator);
  clearData(table);
  items.filter((item) => item.includes(filter)).forEach(
    (item: string, index: number) => {
      let tableRow = document.createElement("tr") as HTMLTableRowElement;
      let number = document.createElement("td") as HTMLTableCellElement;
      let form = document.createElement("form") as HTMLFormElement;
      let editTodo = document.createElement("input") as HTMLInputElement;
      let submitEditTodo = document.createElement("input") as HTMLInputElement;
      let todoCell = document.createElement("td") as HTMLTableCellElement;
      let checkCell = document.createElement("td") as HTMLTableCellElement;
      let trashCell = document.createElement("td") as HTMLTableCellElement;
      let checklist = document.createElement("input") as HTMLInputElement;
      let trash = document.createElement("button") as HTMLButtonElement;
      trash.innerText = "x";
      trash.onclick = () => {
        destroyData(items, index, table);
      };
      checklist.type = "checkbox";
      // trash.style.visibility = "hidden"
      // checklist.style.visibility = "hidden"
      submitEditTodo.type = "submit";
      editTodo.value = item;
      form.onsubmit = (e: Event) => e.preventDefault();
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
    },
  );
}

function clearData(table: HTMLTableElement): void {
  Array.from(table.children).forEach((child) => child.remove());
}

function destroyData(
  items: Array<string>,
  index: number,
  table: HTMLTableElement,
): void {
  if (items.length <= 1) {
    window.localStorage.removeItem(key);
    return renderData(table);
  }
  items.splice(index, 1);
  let dataAfterDestroy = items.join(separator);
  window.localStorage.setItem(key, dataAfterDestroy);
  return renderData(table);
}
