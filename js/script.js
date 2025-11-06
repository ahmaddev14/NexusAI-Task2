const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearBtn = document.getElementById('clearBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.done ? 'task done' : 'task';
    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggle(${index})">
        <span class="task-text">${task.text}</span>
      </div>
      <div class="task-btns">
        <button class="edit" onclick="edit(${index})">Edit</button>
        <button class="delete" onclick="remove(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  const active = tasks.filter(t => !t.done).length;
  taskCount.textContent = `${active} ${active === 1 ? 'task' : 'tasks'}`;
}

function add() {
  const text = taskInput.value.trim();
  if (text === '') {
    alert('Please enter a task');
    return;
  }
  tasks.push({ text: text, done: false });
  save();
  render();
  taskInput.value = '';
}

function toggle(index) {
  tasks[index].done = !tasks[index].done;
  save();
  render();
}

function edit(index) {
  const newText = prompt('Edit task:', tasks[index].text);
  if (newText && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    save();
    render();
  }
}

function remove(index) {
  if (confirm('Delete this task?')) {
    tasks.splice(index, 1);
    save();
    render();
  }
}

function clearDone() {
  if (confirm('Clear all completed tasks?')) {
    tasks = tasks.filter(t => !t.done);
    save();
    render();
  }
}

addBtn.addEventListener('click', add);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') add();
});
clearBtn.addEventListener('click', clearDone);

render();