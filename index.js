const form = document.getElementById('main-form');
const todolist = document.getElementById('todo-list');
const input= document.getElementById('todo');

const todos = loadTodolist();

form.addEventListener('submit', function (event) {
    event.preventDefault()
    // pegando o dado inserido e limpando os espaços nas laterais
    const value = input.value.trim();
    // adiciona o todo no array 
    todos.push(value)
    // limpo meu formulario para poder inserir outros todos
    input.value = '';


    renderTodos()
});

function renderTodos() {

/* <li>
    <strong>My todo</strong>  
    <button type="button">X</button>
</li> */
// limpando minha lista de todos
todolist.innerHTML = '';

for (let index = 0; index < todos.length; index +=1) {
    // pegando o todo do loop atual
    const todoItem = todos[index]
    console.log(todoItem);

    // criamos nosso botão de remover
    const removeButton = document.createElement('button');
    // atribuimos o atributo de tipo de botão
    removeButton.setAttribute('type','button');
    // inserimos um X dentro do botão
    removeButton.innerText = 'X';
    
    // criamoso texto do todo
    const todoText = document.createElement('strong')
    // inserimos o texto armazenado no array de todos 
    todoText.innerText = todoItem 

    // criamos o item de lista que vai conter o texto e o botão
    const todoLisItem = document.createElement('li')
   // inserindo o texto e o botõa dentro do li 
   todoLisItem.append(todoText, removeButton)

   // inserindo o li dentro do ul
    todolist.append(todoLisItem)

  // adicionando o evento para remover o item
  removeButton.addEventListener('click',function() {
      if (window.confirm('deseja deletar esta tarefa?')) {
        console.log('remove este item na posição: ', index)
      todos.splice(index, 1)
      renderTodos()
      }
      
  });
 }
  saveTodolist()
}

function saveTodolist() {
    const todoString = JSON.stringify(todos)
    localStorage.setItem('todolist', todoString )

}

function loadTodolist() {
    if (localStorage.getItem('todolist') === null) {
        return [];
    }

    const todoString = localStorage.getItem('todolist');
    const todolist = JSON.parse(todoString)

    return todolist;

}

renderTodos()