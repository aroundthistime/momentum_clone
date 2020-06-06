const title = document.querySelector(".title");
// title.style.color = "green";
document.title = "forPratice";

function changeTitleColor(){
    if (title.style.color === "gray"){
        title.style.color = "black";
    }
    else{
        title.style.color = "gray";
    }
}

title.addEventListener("click",changeTitleColor);