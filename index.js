const tasksStorage = () =>{
    const localTasks = JSON.parse(window.localStorage.getItem('tasks'))

    return localTasks ? localTasks : [];

}

const removeTaskItem = (taskId) => {
    const tasks = tasksStorage();
    const updatedTasks = tasks.filter(({ id }) => parseInt(id) !== parseInt(taskId));
    saveTasks(updatedTasks);

    document.getElementById("todoList").removeChild(document.getElementById(taskId))

}

const removeDoneTasks = () => {
    const tasks = tasksStorage();
    const tasksToRemove = tasks
            .filter(({checked}) => checked)
            .map(({id}) => id)



    const updatedTasks = tasks.filter(({checked}) => !checked)
    saveTasks(updatedTasks);

    tasksToRemove.forEach((tasksToRemove) =>{
        document.getElementById("todoList").removeChild(document.getElementById(tasksToRemove))
    })

}



const saveTasks = (tasks) => {
    window.localStorage.setItem('tasks', JSON.stringify(tasks))

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

const onCheckboxClick = (event) => {
    const [id] = event.target.id.split('-');

    const tasks = tasksStorage();
    
    
    const updatedTasks = tasks.map((task) => {
        return parseInt(task.id) === parseInt(id)
            ? { ...task, checked: event.target.checked} : task  
    })

    saveTasks(updatedTasks)
}

const checkBoxInput = ({id, description, checked}) => {
    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    const wrapper = document.createElement('div');
    const checkBoxId = `${id}-checkbox`

    checkBox.type = 'checkbox';
    checkBox.id = checkBoxId;
    checkBox.checked = checked || false;
    checkBox.addEventListener('change', onCheckboxClick)

    label.textContent = description;
    label.htmlFor = checkBoxId;

    wrapper.className = 'checkbox-label'

    wrapper.appendChild(checkBox)
    wrapper.appendChild(label)

    return wrapper;
}

const newTaskId = () =>{  
    const tasks = tasksStorage();   
    const lastIdTasks = tasks[tasks.length -1]?.id;
    return lastIdTasks ? lastIdTasks + 1 : 1;
}

const newTaskInfo = (event) =>{
    const description = event.target.elements.description.value;
    const id = newTaskId();

    return {description, id};
}

const createTaskInfo = (event) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(newTaskInfo(event))
    }, 600)
})

const createTask = async (event) => {
    event.preventDefault();

    document.getElementById('task-btn').setAttribute('disabled', true)

   const newTask = await createTaskInfo(event) 
   const check = checkBoxInput(newTask) 
   createTaskListItem(newTask, check)

   const tasks = tasksStorage();
   const updatedTasks = [
        ...tasks,
        {id: newTask.id, description: newTask.description, checked: false}
   ]   
   saveTasks(updatedTasks)  

   document.getElementById('description').value = ''
   document.getElementById('task-btn').removeAttribute('disabled')
}

window.onload = function(){

    const form = document.getElementById('todo-form');
    form.addEventListener('submit', createTask);    

    const tasks = tasksStorage()
    tasks.forEach((task) =>{
        const checkb = checkBoxInput(task); 
        createTaskListItem(task, checkb)  
    })
}