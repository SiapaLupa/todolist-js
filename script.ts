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
  if (typeof storageItem !== "string") return;
  let items: Array<string> = storageItem.split(separator);
  clearData(table);
  items.filter((item) => item.includes(filter)).forEach((item: string, index: number) => {
    let tableRow = document.createElement("tr") as HTMLTableRowElement;
    let number = document.createElement("td") as HTMLTableCellElement;
    let todo = document.createElement("td") as HTMLTableCellElement;
    todo.innerText = item;
    number.innerText = String(index + 1).concat(".");
    tableRow.appendChild(number);
    tableRow.appendChild(todo);
    table.appendChild(tableRow);
  });
}

function clearData(table: HTMLTableElement): void {
  Array.from(table.children).forEach((child) => child.remove());
}
