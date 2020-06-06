const form = document.querySelector(".js-form-greeting"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(currentUser){
    localStorage.setItem(USER_LS,currentUser);
}

function showGreeting(currentUser){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    const period = localStorage.getItem(TIME_LS);
    greeting.innerText = `Good ${period} ${currentUser} !`;
}

function handleSubmit(event){
    event.preventDefault();
    currentUser = input.value;
    showGreeting(currentUser);
    saveName(currentUser);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function init(){
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser == null){
        askForName();
    }
    else{
        showGreeting(currentUser);
    }
}

init();