var counter = 0;
var div = [];
var positions = JSON.parse(localStorage.getItem("jPositions"));
console.log(positions)
if(positions != null){
  for(var i=0; i<positions.length;i++){
    createNodes(positions[i]);
  }
}
document.getElementById("create").onclick = createNodes;
document.getElementById("save").onclick = saveNodes;

function saveNodes(){
  var pos = [];
  for(var i=0; i<div.length; i++){
    pos[i] = {top: div[i].style.top, left: div[i].style.left};
  }
  localStorage.setItem("jPositions", JSON.stringify(pos));
  console.log(pos);
}

function createNodes(pos = {top: "0px", left: "0px"}){
  div[counter] = document.createElement("div");
  div[counter].style.top = pos.top;
  div[counter].style.left = pos.left;
  div[counter].style.padding = "30px 30px";
  div[counter].style.backgroundColor = "rgba(50, 100, 130, 0.35)"
  div[counter].style.width = "100px";
  div[counter].style.margin = "5px";
  div[counter].style.position = "relative";
  div[counter].style.cursor = "move";
  div[counter].style.border = "1px solid #d3d3d3";
  div[counter].style.textAlign = "center";
  div[counter].classList.add("draggable");

  var node = document.createTextNode("new div");
  div[counter].appendChild(node);
  var element = document.getElementById("border");
  element.appendChild(div[counter]);

  // Dragfunction aufrufen
  dragElement(document.getElementsByClassName("draggable")[counter], counter);
  console.log(document.getElementsByClassName("draggable")[counter]);
  counter++;
}

function dragElement(elmnt, index) {
  var elemX = 0, elemY = 0, mouseX = 0, mouseY = 0;

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    mouseX = e.clientX;
    mouseY = e.clientY;

    console.log(index);

    elemX = ExtractNumber(elmnt.style.left);
    elemY = ExtractNumber(elmnt.style.top);

    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;

    document.body.focus();

    document.onselectstart = function () { return false; };
    // prevent IE from trying to drag an image
    elmnt.ondragstart = function() { return false; };
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    /*elemX = pos3 - e.clientX;
    elemY = pos4 - e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;*/
    // set the element's new position:
    elmnt.style.left = (elemX + e.clientX - mouseX) + "px";
    elmnt.style.top = (elemY + e.clientY - mouseY) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function ExtractNumber(value)
  {
    var n = parseInt(value);

    return n == null || isNaN(n) ? 0 : n;
  }

// this is simply a shortcut for the eyes and fingers
  function $(id)
  {
    return document.getElementById(id);
  }
}
