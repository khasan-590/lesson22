'use strict';


  class Todo {
    constructor(headerInput, todoControl, todoList, todoCompleted, todoContainer) {
        this.headerInput = document.querySelector(headerInput);
        this.todoControl = document.querySelector(todoControl);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoContainer = document.querySelector(todoContainer);
        this.todo = new Map();
        this.init();

    }



    generateKey(){
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }


    init() {
        this.getFromStorage();
        this.render();
        this.handler();
    }
    add(value){
        if (value){
            let newToDo = {
                key: this.generateKey(),
                value: value,
                completed: false
            };
            this.todo.set(newToDo.key, newToDo);
            this.addToStorage();
            this.render();
        }
    }
    
    delete(element) {
        //удаляем элемент по индексу
        if(element){
            this.todo.delete(element.key);
            this.addToStorage();        
            this.render();             
        }
    }

    getFromStorage() {
        if (localStorage.todoList){
            this.todo = new Map(JSON.parse(localStorage.getItem('todoList')));
        }
    }
   
    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todo]));
    }
   
    render () {
        this.todoCompleted.innerHTML = '';
        this.todoList.innerHTML = '';
        this.todo.forEach( (item) => {
            let li = document.createElement('li');
            li.classList.add('todo-item');
            li.key = item.key;
            li.innerHTML = `<span class="text-todo">${item.value}</span>` +     
                `<div class="todo-buttons">` +
                `<button class="todo-remove"></button>` +
                `<button class="todo-complete"></button>` +
                `</div>`;
            if(item.completed){
                this.todoCompleted.append(li);
            } else {
                this.todoList.append(li);
            }
        });
    }

    completedItem(item){
        item.completed = !item.completed;
        this.render();
        this.addToStorage();
    }

    handler(){
        this.todoControl.addEventListener('submit', (event) => {
          event.preventDefault();
            let elem = this.headerInput.value;
            if(elem){
                todo.add(elem);
            }else {
                alert("Вы не ввели  значение в поле!");
            }
            this.headerInput.value = '';
        });
        this.todoContainer.addEventListener('click', (event) => {
            let target = event.target;
            let elemLi = target.closest('.todo-item');
            if(target.matches('.todo-remove')){
                this.delete(this.todo.get(elemLi.key));
            }
            if(target.matches('.todo-complete')){
                this.completedItem(this.todo.get(elemLi.key));
            }
        });
    }
}

const todo = new Todo('.header-input','.todo-control', '.todo-list', '.todo-completed', '.todo-container');

