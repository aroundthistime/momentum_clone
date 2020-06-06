const body = document.querySelector("body");

function doneLoading(event){
    body.style.display = "block";
}

function init(){
    const img = new Image();
    // img.src = "black.png";
    img.src = "https://source.unsplash.com/1600x900/?landscape";
    img.classList.add("bgImage");
    body.appendChild(img);
    img.addEventListener("load", doneLoading);
    // img.addEventListener("loadend", doneLoading); ->doens't work ㅠㅠ
    
}

init();