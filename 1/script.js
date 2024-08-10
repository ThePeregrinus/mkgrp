const todos = JSON.parse(localStorage.getItem("todos")) || [];

const todoForm = document.querySelector(".todo-form");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const statusText = document.getElementById("statusText");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    if (todo.done) {
      li.classList.add("completed");
    }

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = todo.done;
    cb.addEventListener("change", () => toggleDone(todo.id));

    li.appendChild(cb);

    const span = document.createElement("span");
    span.textContent = todo.text;

    li.appendChild(span);

    const btn = document.createElement('img');
    btn.src ='./assets/trash.svg';
    btn.classList.add("remove-button");
    btn.addEventListener("click", () => removeTodo(todo.id));
    li.appendChild(btn);
    todoList.appendChild(li);
  });

  showStatus();
}

renderTodos();

function showStatus() {
  if (!todos.length) {
    statusText.textContent = "Нет задач";
    return;
  }

  const pending = todos.filter((todo) => !todo.done).length;
  if (pending === 0) {
    statusText.textContent = "Все выполнено";
  } else {
    statusText.textContent = `Осталось задач ${pending} / ${todos.length}`;
  }
}

function addTodo() {
  const newTodoText = todoInput.value.trim();
  if (!newTodoText) {
    alert("Введите значение");
    return;
  }

  const newTodo = {
    id: todos.length + 1,
    text: newTodoText,
    done: false,
  };

  todos.unshift(newTodo);

  saveTodos();
  renderTodos();

  todoInput.value = "";
}

function toggleDone(id) {
  const todo = todos.find((todo) => todo.id === id);
  todo.done = !todo.done;

  saveTodos();
  renderTodos();
}

function removeTodo(id) {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos.splice(todoIndex, 1);

  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
