import {
  getList,
  createListItem,
  createNewTodoForm,
  postTodo,
  createNewTodo,
  deleteTodo,
} from "./fn.js";

const listWrapperEl = document.createElement("div");
const listEl = document.createElement("ul");
export const darkModeBtnEl = document.querySelector(".darkMode");
export const darkModeImgEl = document.querySelector(".darkMode-icon");
const titleEl = document.querySelector("h1");

listWrapperEl.className = "listWrapper";
listEl.className = "list";

listWrapperEl.appendChild(listEl);
document.body.appendChild(listWrapperEl);

/////////////////////////////////////
// APPENDS TO-DO LIST FROM DUMMYJSON
getList().then((listData) => {
  listData.todos.forEach((todo) => listEl.append(createListItem(todo)));

  const allTodos = document.querySelectorAll(".todo");

  allTodos.forEach((todo) =>
    todo.addEventListener("click", (e) => {
      e.target.classList.toggle("completed");

      if (e.target.classList.length >= 2) {
        deleteTodo(`${e.target.id}`);
      }
    })
  );

  // TOGGLES LIGHT/DARK MODE
  darkModeBtnEl.addEventListener("click", () => {
    allTodos.forEach((todo) => todo.classList.toggle("darkMode-active"));
  });
});

// APPENDS NEW TO-DO FORM
createNewTodoForm();
export const todoFormEl = document.querySelector(".addTodo");

// ADDS A NEW TO-DO
todoFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target[0].value.length >= 1) {
    let newTodo = e.target[0].value;
    listEl.append(createNewTodo(`${newTodo}`));
    e.target[0].value = "";
    postTodo(`${newTodo}`);
  }

  const allTodos = document.querySelectorAll(".todo-new");

  darkModeBtnEl.addEventListener("click", () => {
    allTodos.forEach((todo) => todo.classList.toggle("darkMode-active"));
  });
});

// TOGGLES LIGHT/DARK MODE
darkModeBtnEl.addEventListener("click", () => {
  document.body.classList.toggle("darkMode-active");
  document.querySelector("h1").classList.toggle("darkMode-active");
  darkModeImgEl.classList.toggle("darkMode-active");
  listWrapperEl.classList.toggle("darkMode-active");
});
