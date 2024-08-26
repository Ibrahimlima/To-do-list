let tasks = [
    {id: 1 , description: 'comprar pão', check: false},
    {id: 2 , description: 'comprar suprimentos para o almoço', check: false},
    {id: 3 , description: 'fazer o almoço', check: false},
]

const checkBoxInput = ({id, description, checked}) => {
    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    const wrapper = document.createElement('div');
    const checkBoxId = `${id}-checkbox`

    checkBox.type = 'checkbox';
    checkBox.id = checkBoxId;
    checkBox.checked = checked;

    label.textContent = description;
    label.htmlFor = checkBoxId;

    wrapper.className = 'checkbox-label'

    wrapper.appendChild(checkBox)
    wrapper.appendChild(label)

    return wrapper;
}

window.onload = function(){
    tasks.forEach((task) =>{
        const checkb = checkBoxInput(task) 
        const list = document.getElementById('todoList');
        const toDo = document.createElement('li');
        //const button = document.createElement('button')

        toDo.id = task.id;
        toDo.appendChild(checkb);
        //toDo.appendChild(button)
        toDo.classList.add('task');

        list.appendChild(toDo)
    })
}