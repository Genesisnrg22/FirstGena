'use strict'

function addTasks(event){

    event.preventDefault();

    if(input.value ===''){
        alert("Por favor ingresa una tarea xD");
        return;
    }else{
        
        task1.push({
            task: input.value,
            done: false,
        });         
    }

    let li = document.createElement("li");
    li.classList.add('task', 'roundBorder');
    let p = document.createElement("p");
    let txt = document.createTextNode(input.value);
    let span = document.createElement("SPAN");
    let txt2 = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt2);
    p.appendChild(txt);
    li.appendChild(p);
    li.appendChild(span);
    ul.appendChild(li);

    localStorage.setItem('task', JSON.stringify(task1));

    document.getElementById("taskInput").value="";

    jsConfetti.addConfetti();
}

function MostrarTask() { 
    
    for(var i in task1){
        let li = document.createElement("li");
        li.classList.add('task', 'roundBorder');
        let p = document.createElement("p");
        let txt = document.createTextNode(task1[i].task);
        let done = task1[i].done;
        if(done == true){
            li.classList.toggle('done');
        }
        p.appendChild(txt);
        li.appendChild(p);
        let span = document.createElement("SPAN");
        let txt2 = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt2)
        li.appendChild(span);
        ul.appendChild(li);

    }  
    
}

function ubicarTask(txt){

    task1.map(function(task){
        if (task.task == txt){
            if(task.done == true){
                task.done = false;
            }else{
                task.done = true;
            }
        }
        return task;
    });
    
    localStorage.setItem('task', JSON.stringify(task1));
    
}

function borrarTask(txt){

    var index = task1.findIndex((t) => t.task == txt);

    //console.log(index);
    
    task1.splice(index, 1);


    localStorage.setItem('task', JSON.stringify(task1));
    
}

function deleteAll(){

    localStorage.removeItem('task');

    let nodo = document.getElementById("lista");
    nodo.remove();
    location.reload();
    
}

function OrderTask(){

    task1.sort(((a, b) => a.done - b.done));

    //console.log(task1);

    localStorage.setItem('task', JSON.stringify(task1));

    location.reload();

    
}




if(JSON.parse(localStorage.getItem("task")) == null){
    var task1 = [];
}else{ 
    var task1 = JSON.parse(localStorage.getItem("task"));
}


const input = document.querySelector('#taskInput'); 
var ul = document.querySelector('#lista');
var tareas = JSON.parse(localStorage.getItem("task"));


//Task Container

// MostrarTask();     
MostrarTask();

//cambio de estado

var list = document.querySelector(".list-tasks > ul");

list.addEventListener('click', function(ev){
    if(ev.target.tagName === 'LI'){
        ev.target.classList.toggle('done');
        let txt = ev.target.firstChild.innerHTML;
        console.log(txt);
        ubicarTask(txt);
    }else if(ev.target.tagName === 'P'){
        ev.target.parentNode.classList.toggle('done');
        let txt = ev.target.innerHTML;
        console.log(txt);
        ubicarTask(txt);
    }
});

const jsConfetti = new JSConfetti();

var x = document.querySelector(".list-tasks > ul");

x.addEventListener('click', function(ev){
    if(ev.target.tagName === 'SPAN'){
        let txt = ev.target.previousSibling.innerHTML;
        let nodo = ev.target.parentNode;

        nodo.remove();
                
        borrarTask(txt);
    }
})


list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.add('checked');
    }
    }, false);

//info date
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear= document.getElementById('dateYear');

const setDate= () => {
    const date= new Date();
    dateNumber.textContent = date.toLocaleString('es', {day: 'numeric'});
    dateText.textContent= date.toLocaleString('es', {weekday: 'long'});
    dateMonth.textContent= date.toLocaleString('es', {month: 'short'});
    dateYear.textContent= date.toLocaleString('es', {year: 'numeric'});
};

setDate();
