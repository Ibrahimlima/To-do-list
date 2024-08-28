let tasks = [
    {id: 1 , description: 'comprar pão', check: false},
    {id: 2 , description: 'comprar suprimentos para o almoço', check: false},
    {id: 3 , description: 'fazer o almoço', check: false},  
]

const removeTaskItem = (taskId) => {
    tasks = tasks.filter(({ id }) => parseInt(id) !== parseInt(taskId));

    document.getElementById("todoList").removeChild(document.getElementById(taskId))

}

const createTaskListItem = (task, checkBox) => {
    const list = document.getElementById('todoList');
    const toDo = document.createElement('li');

    const removeTaskButton = document.createElement('button');
    removeTaskButton.textContent = 'X';
    removeTaskButton.ariaLabel = 'Remover Tarefa';

    removeTaskButton.onclick = () => removeTaskItem(task.id);

    toDo.id = task.id;
    toDo.appendChild(checkBox);
    toDo.appendChild(removeTaskButton)
    list.appendChild(toDo);

    return toDo
}

const checkBoxInput = ({id, description, checked}) => {
    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    const wrapper = document.createElement('div');
    const checkBoxId = `${id}-checkbox`

    checkBox.type = 'checkbox';
    checkBox.id = checkBoxId;
    checkBox.checked = checked || false;

    label.textContent = description;
    label.htmlFor = checkBoxId;

    wrapper.className = 'checkbox-label'

    wrapper.appendChild(checkBox)
    wrapper.appendChild(label)

    return wrapper;
}

const newTaskId = () =>{     
    const lastIdTasks = tasks[tasks.length -1]?.id;
    return lastIdTasks ? lastIdTasks + 1 : 1;
}

const newTaskInfo = (event) =>{
    const description = event.target.elements.description.value;
    const id = newTaskId();

    return {description, id};
}

const createTask = (event) => {
    event.preventDefault();

   const newTask = newTaskInfo(event) 
   const check = checkBoxInput(newTask) 
   createTaskListItem(newTask, check)

   tasks = [
        ...tasks,
        {id: newTaskId.id, description: newTask.description, checked: false}
   ]     
}

window.onload = function(){

    const form = document.getElementById('todo-form');
    form.addEventListener('submit', createTask);    

    tasks.forEach((task) =>{
        const checkb = checkBoxInput(task); 
        createTaskListItem(task, checkb)  
    })
}