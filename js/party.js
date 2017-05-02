var height = 400;
var width = 1200;


function addMore(){

  let addMore = document.createElement('img');
  let randomSrc = Math.floor(Math.random()*3);

  if (randomSrc == 0){
    addMore.setAttribute('src', './images/m1.png');
    addMore.setAttribute('width', '310');
    addMore.setAttribute('height', '380');
  }
  
  else if (randomSrc == 1){
    addMore.setAttribute('src', './images/f1.png');
    addMore.setAttribute('width', '280');
    addMore.setAttribute('height', '340');
  }

  else{
    addMore.setAttribute('src', './images/junkook.png');
    addMore.setAttribute('width', '310');
    addMore.setAttribute('height', '380');
  }

  addMore.setAttribute('class', 'dragme');
  addMore.setAttribute('onmousedown', 'mouseDown()')
  addMore.style.cssText = "opacity:1;";
  document.body.appendChild(addMore);
}


function mouseDown(){
  let add = document.createElement('img');
  add.setAttribute('src', 'images/party.png');
  add.setAttribute('class', 'party1');

  if (Math.random()* 10 < 5){
  	width += Math.random()*1000;
  	height += Math.random()*40;
  }

  else{
  	width -= Math.random()*1000;
  	height += Math.random()*40;

  }

  add.setAttribute('width', width);
  add.setAttribute('height', height);
  add.style.cssText = "opacity: 0.5;";
  document.body.appendChild(add);


  let number = document.body.getElementsByTagName('img');
  if (number.length > 30){
  	location.href = "./study.html";
  }
}

function hoveron(element){
  let status = document.body.querySelector(".light");
  if(status.getAttribute('src') == './images/disco8.gif'){
  	element.style.cssText = "opacity:1;";
  }

}

function unhoveron(element){
  element.style.cssText = "opacity:0;";
}


function hover(element) {
  if (element.getAttribute('src') == "./images/disco.gif"){
  	element.setAttribute('src', './images/disco8.gif');

  	var people = document.body.querySelector('.party1');
  	people.style.cssText ='opacity:0.7;';

    let leftButton = document.body.querySelector('.button');
    leftButton.style.cssText = "opacity:1;";

  	var backgroundVideo =  document.createElement('video');
  	backgroundVideo.setAttribute('id', 'bg-video');
  	backgroundVideo.setAttribute('width', '2048');
  	backgroundVideo.setAttribute('height', '1080');

  	var backgroundSrc = document.createElement('source');
  	backgroundSrc.setAttribute('src', "media/clubbing.mp4");
  	backgroundSrc.setAttribute('type', "video/mp4");

  	backgroundVideo.appendChild(backgroundSrc);
    document.body.appendChild(backgroundVideo);

  }

  else{
  	location.reload();
  }



}


function move(evt) {

    if (!evt) {
        var evt = window.event;
    }
    var target = evt.target;
    if (target.className != 'dragme') {
      return
    };
    offsetX = evt.clientX;
    offsetY = evt.clientY;

    if(!target.style.left) { 
      target.style.left='0px';
    };
    if (!target.style.top) { 
      target.style.top='0px';
    };


    posx = parseInt(target.style.left);
    posy = parseInt(target.style.top);
    drag = true;


    document.onmousemove=selectDiv;
    return false;

}
function selectDiv(evt) {
    if (!drag) {
      return
    };
    if (!evt) {
      var evt = window.event
    };
    var target =evt.target;
    target.style.left=posx+evt.clientX-offsetX+'px';
    target.style.top=posy+evt.clientY-offsetY+'px';
    return false;
}
function release() {
    drag=false;
}
window.onload = function() {
    document.onmousedown = move;
    document.onmouseup = release;
}
