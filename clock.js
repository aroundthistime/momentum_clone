const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

const TIME_LS = "period";

function formatTime(time){
    return time < 10 ? `0${time}` : time;
}

function getTime(){
    const date = new Date();
    const hours = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());
    clockTitle.innerText = `${hours}:${minutes}:${seconds}`;
    numberedHour = parseInt(hours);
    if (numberedHour >= 6 && numberedHour< 12){
        localStorage.setItem(TIME_LS,"morning");
    }else if(numberedHour>= 12 && numberedHour< 18){
        localStorage.setItem(TIME_LS, "afternoon");
    }else if(numberedHour>= 18 && numberedHour<21){
        localStorage.setItem(TIME_LS,"evening");
    }else{
        localStorage.setItem(TIME_LS,"night");
    }
}

function init(){
    getTime();
    setInterval(getTime,1000);
}

init();