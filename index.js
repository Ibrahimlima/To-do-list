let tasks = [
    {id: 1 , description: 'comprar pão', check: false},
    {id: 1 , description: 'comprar suprimentos para o almoço', check: false},
    {id: 1 , description: 'fazer o almoço', check: false},
]


window.onload = function(){
    tasks.forEach((task) =>{
        const list = document.getElementById('todoList');
        const toDo = document.createElement('li');


        toDo.textContent = task.description;
        toDo.classList.add('task');

        list.appendChild(toDo)
    })
}