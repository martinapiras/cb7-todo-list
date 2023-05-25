import { darkModeBtnEl, darkModeImgEl } from "./script.js";

export const getList = async () => {
  const res = await fetch("https://dummyjson.com/todos");
  try {
    if (res.ok) {
      const listData = await res.json();

      return listData;
    }
    throw new Error("(GET) Controlla l'indirizzo");
  } catch (err) {
    console.error(err);
    const listData = {
      todos: [
        {
          id: 1,
          todo: "Make my bed",
          completed: true,
        },
        {
          id: 2,
          todo: "Walk the dog",
          completed: false,
        },
      ],
    };

    return listData;
  }
};

export const createListItem = (todos) => {
  const listItemEl = document.createElement("li");
  listItemEl.className = "todo";
  listItemEl.textContent = todos.todo;
  listItemEl.id = todos.id;

  if (todos.completed) {
    listItemEl.classList.add("completed");
  }

  return listItemEl;
};

export const createNewTodoForm = () => {
  const addTodoEl = document.createElement("form");
  const labelEl = document.createElement("label");
  const inputEl = document.createElement("input");
  const submitEl = document.createElement("input");

  addTodoEl.className = "addTodo";
  labelEl.className = "newTodoLabel";
  labelEl.setAttribute("for", "newTodo");
  labelEl.textContent = "Add something else:";
  inputEl.className = "newTodo";
  inputEl.setAttribute("type", "text");
  submitEl.className = "newTodoSubmit";
  submitEl.setAttribute("type", "submit");
  submitEl.setAttribute("value", "Add to list");

  addTodoEl.append(labelEl, inputEl, submitEl);

  darkModeBtnEl.addEventListener("click", () => {
    addTodoEl.classList.toggle("darkMode-active");
    labelEl.classList.toggle("darkMode-active");
    inputEl.classList.toggle("darkMode-active");
    submitEl.classList.toggle("darkMode-active");
  });

  return document.body.appendChild(addTodoEl);
};

export const createNewTodo = (newTodo) => {
  const listItemEl = document.createElement("li");
  listItemEl.className = "todo-new";
  listItemEl.textContent = newTodo;
  listItemEl.id = Math.floor(Math.random() * (1500 - 151) + 151);

  if (darkModeImgEl.classList.contains("darkMode-active")) {
    listItemEl.classList.toggle("darkMode-active");
  }

  listItemEl.addEventListener("click", (e) => {
    e.target.classList.toggle("completed");

    if (e.target.classList.contains("completed") == false) {
      deleteTodo(`${e.target.id}`);
    }
  });

  return listItemEl;
};

export const postTodo = async (todoText) => {
  const res = await fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo: todoText,
      completed: false,
      userId: parseInt(Math.floor(Math.random() * 100)),
      id: Math.floor(Math.random() * (1500 - 151) + 151),
    }),
  });

  try {
    const data = await res.json();
    console.log("POST successful: ");
    return console.log(data);
  } catch (error) {
    console.error("Some parameters may be missing");
  }
};

export const deleteTodo = async (todoId) => {
  const res = await fetch(`https://dummyjson.com/todos/${todoId}`, {
    method: "DELETE",
  });
  try {
    if (todoId <= 150) {
      alert("Deleted successfully");
      const data = await res.json();
      return console.log(data);
    }
    throw new Error(`Couldn't find any elements with id ${todoId}`);
  } catch (error) {
    return console.error(error);
  }
};
