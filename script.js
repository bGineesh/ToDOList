const inputTask = document.querySelector('#input');
const taskList = document.getElementById('list');
const count = document.getElementById('taskCount');


let toDoList = [];

document.addEventListener('click', handler);

function handler(e) {
  const target = e.target;
  if (target.className == 'fa fa-plus-circle add') {
    subButton();
  }
  if (target.className === 'fa fa-trash-o') {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    alert('Task deleted!');
    return;
  }
  else if (target.className === 'check') {
    const taskId = target.id;
    alert('Task completed!');
    markDone(taskId);
    return;
  } else if (target.className === 'completedAll') {
    if (toDoList.length == 0) {
      alert('Sorry! no tasks');
      return;
    }
    for (let i = 0; i < toDoList.length; i++) {
      toDoList[i].done = true
    }
    Data();
    alert('you have completed all task.')

  } else if (target.className === 'completed') {
    if (toDoList.length == 0) {
      alert('Sorry! no tasks');
      return;
    }
    for (let i = 0; i < toDoList.length; i++) {
      toDoList[i].done = false
    }
    Data();
    alert('incomplete')

  }
  else if (target.className === 'deltAll') {
    if (toDoList.length == 0) {
      alert('Sorry, no tasks or trashed .');
      return;
    }
    const newTasks = []
    toDoList = newTasks;
    Data();
  }
}

function subButton() {
  let value = inputTask.value;
  if (value === '') {
    alert('Enter the task');
    return;
  }
  const task = {
    name: value,
    id: Date.now().toString(),
    done: false
  }
  addTask(task);
  inputTask.value = '';
}

function addTask(task) {
  if (task) {
    toDoList.push(task);
    Data();
    alert("Task added.")
    return;
  }
  else {
    alert("Task Not added!");
  }
}

function Data() {
  taskList.innerHTML = '';
  if (toDoList.length == 0) {
    alert("All tasks are completed and trashed.")
  }
  for (let i = 0; i < toDoList.length; i++) {
    renderList(toDoList[i]);
  }
  count.innerHTML = toDoList.length;
}

function renderList(task) {
  const li = document.createElement('li');

  li.setAttribute('class', 'task');
  li.setAttribute('data-key', task.id);

  if (task.done === true) {
    li.classList.add('checked');
  }

  li.innerHTML = `<input type="checkbox" class="check" id="${task.id}" ${task.done ? 'checked' : null}>
  <label for="${task.id}">${task.name}</label>
  <input type="date">
  <button class="but">
    <i class="fa fa-trash-o" aria-hidden="true" data-id="${task.id}"></i>
  </button>`
  taskList.append(li);
}

function deleteTask(id) {
  const newTasks = toDoList.filter(function (task) {
    return task.id !== id
  })
  toDoList = newTasks;
  Data();
}

function markDone(id) {
  const task = toDoList.filter(function (task) {
    return task.id === id
  });
  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.done = !currentTask.done;
    Data();
    return;
  }
}
