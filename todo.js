const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    clearCount = document.querySelector(".todo-success-count"),
    toDoWarning = document.querySelector(".warning");

const TODOS_LS = "toDos",
    CLEAR_LS = "clear";
let TODOS_LIST = [];
const fullStar = "⭐",
    emptyStar = "✰";

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanTODOS_LIST = TODOS_LIST.filter(function(toDo){
        return toDo.id != li.id;
    });
    TODOS_LIST = cleanTODOS_LIST;
    saveToDos();
}

function clearToDo(event){
    event.preventDefault();
    const btn = event.target;
    const li = btn.parentNode;
    const span = li.querySelector("span");
    span.classList.add("cleared")
    setTimeout(function(){
        clear = bringClear();
        localStorage.setItem(CLEAR_LS,parseInt(clear)+1);
        clearCount.innerText = parseInt(clearCount.innerText) + 1;
        deleteToDo(event);
    },600);
    
}

function bringClear(){
    let clear = localStorage.getItem(CLEAR_LS);
    if (clear === null){
        clear = 0;
    }
    return clear
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(TODOS_LIST));
}

function switchStar(event){
    const btn = event.target;
    const li = btn.parentNode;
    if (btn.innerText === fullStar){
        btn.innerText = emptyStar;
        for (let i = 0; i < TODOS_LIST.length; i++){
            if (TODOS_LIST[i].id == li.id){
                TODOS_LIST[i].isImportant = !(TODOS_LIST[i].isImportant);
                break;
            }
        }
    }
    else{
        btn.innerText = fullStar
        for (let i = 0; i < TODOS_LIST.length; i++){
            if (TODOS_LIST[i].id == li.id){
                TODOS_LIST[i].isImportant = !(TODOS_LIST[i].isImportant);
                break;
            }
        }
    }
    saveToDos();
}

function showToDo(text, newId, isImportant){
    const li = document.createElement("li");
    const importantBtn = document.createElement("button")
    const span = document.createElement("span");
    const btns = document.createElement("div");
    const clearBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    if (isImportant === undefined){
        isImportant = false;
    }
    if (isImportant){
        importantBtn.innerText=fullStar;
    }else{
        importantBtn.innerText=emptyStar;
    }
    if (newId === undefined){
        newId = Date.now();
    }
    span.innerText = text;
    clearBtn.innerText="✔";    
    clearBtn.classList.add("clearBtn");
    clearBtn.classList.add("btn");
    delBtn.classList.add("delBtn");
    delBtn.classList.add("btn");
    importantBtn.classList.add("starBtn");
    importantBtn.classList.add("btn");
    delBtn.innerText = "✖";
    clearBtn.addEventListener("click",clearToDo);
    delBtn.addEventListener("click",deleteToDo);
    importantBtn.addEventListener("click",switchStar);
    li.id = newId;
    li.appendChild(importantBtn);
    li.appendChild(span);
    li.appendChild(clearBtn);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    toDoObj = {
        text : text,
        id : newId,
        isImportant : isImportant
    };
    TODOS_LIST.push(toDoObj);
    saveToDos();
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            showToDo(toDo.text, toDo.id, toDo.isImportant);
        });
    }
}

function handleSubmit(event){
    event.preventDefault();
    if (TODOS_LIST.length < 11){
        currentValue = toDoInput.value;
        if (currentValue !== ""){
            showToDo(currentValue);
            toDoInput.value = "";
        }
    } else{
        toDoWarning.classList.add("showing");
        setTimeout(function(){
            toDoWarning.classList.remove("showing");
        },2000);
    }
}

function init(){
    loadToDos();
    clearCount.innerText = bringClear();
    toDoForm.addEventListener("submit",handleSubmit);
}

init()