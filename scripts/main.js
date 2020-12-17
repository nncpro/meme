var canvas = document.createElement("canvas");
canvas.width=480;
canvas.height=640;
var context = canvas.getContext("2d");

var drawArea = document.querySelector("#draw");
drawArea.appendChild(canvas);

var file = document.querySelector("#file");
var top_line = document.querySelector("#top_line");
var bottom_line = document.querySelector("#bottom_line");

var btnSave = document.querySelector("#btn");


var top_text="";
var bottom_text="";
var image;

var top_color = "white";
var bottom_color = "white";

file.onchange=function(event){
    var imgfile = event.target.files[0];
    image = new Image;
    image.onload= function(e){
        document.querySelector("#err").innerText = ""
        draw();
    }
    image.src = URL.createObjectURL(imgfile);
}
top_line.onkeyup = function(event){
    if(check()) return;
    document.querySelector("#err").innerText = ""
    top_text = top_line.value;
    draw();
}
bottom_line.onkeyup= function(event){
    if(check()) return;
    document.querySelector("#err").innerText = ""
    bottom_text = bottom_line.value;


    draw();
}

btnSave.onclick = function(event){
    if(top_text.trim()=="" && bottom_text.trim()=="")
    {
        alert("Không viết gì thì chế  meme làm gì anh em?");
        return;
    }
    savedImage = canvas.toDataURL("image/jpeg",1.0);
    console.log(savedImage);
    link = document.querySelector("#link");
    link.href = savedImage;
    link.download="untitled.jpeg";
    link.click();
}

function draw(){
    context.clearRect(0,0,canvas.width,canvas.height);
    context.drawImage(image,0,0,canvas.width,canvas.height);
    context.font="35px Tahoma Bolder";
    context.fillStyle=top_color;
    // context.strokeStyle="black";
    context.textAlign ="center";
    context.fillText(top_text,canvas.width/2,40);
    // context.strokeText(top_text,canvas.width/2,40);
    context.fillStyle=bottom_color;
    context.fillText(bottom_text,canvas.width/2,590);
    // context.strokeText(bottom_text,canvas.width/2,590);
}
function setTopColor(event){
    top_color = event.target.value;
    if(check()) return;
    draw();
}
function setBottomColor(event){
    bottom_color = event.target.value;
    if(check()) return;
    draw();
}

function check(){
    if(image ==null){
        document.querySelector("#err").innerText = "Lên chọn ảnh trước đi anh em!"
        return true;
    }
    return false;
}