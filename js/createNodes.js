document.getElementById("create").onclick = createNodes;
var counter = 0;
function createNodes(){
  var div = document.createElement("div");
  div.style.padding = "30px 30px";
  div.style.backgroundColor = "rgba(50, 100, 130, 0.35)"
  div.style.width = "100px";
  div.style.margin = "5px";
  div.style.position = "relative";
  div.style.cursor = "move";
  div.style.border = "1px solid #d3d3d3";
  div.style.textAlign = "center";
  div.classList.add("draggable");

  var node = document.createTextNode("new div");
  div.appendChild(node);
  var element = document.getElementById("border");
  element.appendChild(div);

  // Dragfunction aufrufen
  dragElement(document.getElementsByClassName("draggable")[counter]);
  console.log(document.getElementsByClassName("draggable")[counter]);
  counter++;
}

function dragElement(elmnt) {
  var elemX = 0, elemY = 0, mouseX = 0, mouseY = 0;

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    mouseX = e.clientX;
    mouseY = e.clientY;

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
