
var objects = []
var books = []
var button;
var posx = 10;
var posy =390;
function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('#gradient');
  cursor = loadImage('./images/cursor.png');

  var buttons = document.body.getElementsByTagName('img');
  for (var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function clicked(button){
      button = this.getAttribute('class');
      if (button == 'book'){
        var recepter = document.getElementsByClassName(button);
        recepter[0].addEventListener('click', function clicked(evt){
          booksrc = './images/book.png'
          BookObject = loadImage(booksrc);


          for (var i = 0; i < 1; i++){
            books.push(new addBook(posx, posy));
            posy -= 160;
            if(posy < -200){
              posy = 550;
              posx += 140;
            }
          }
        })
      } 
      else{


        var loader = document.getElementsByClassName(button);

        loader[0].addEventListener('click', function clicked(evt){

          src = loader[0].getAttribute('src');
          object = loadImage(src);
          for (var i = 0; i < 100; i++){
            var x = random(windowWidth);
            var y = random(windowHeight);
            objects.push(new Bubble(x, y));
          }

        })
      } 
    })
  }




}

function draw() {
  var tmp = document.body.getElementsByClassName('boom');
  var tmp1 = document.body.getElementsByClassName('boom1');

  clear();

  if (objects.length > 1000 && objects.length < 2000){
    tmp[0].setAttribute('style', 'display: none')
    for (var i = 0; i < objects.length; i ++){
      objects[i].move();
      objects[i].displayAfter();
    }

  }

  else if (objects.length >= 2000){
    tmp[0].setAttribute('style', 'display: block')
    tmp[0].addEventListener('click', function clicked(){
    location.reload();
    })
  }

  else{
    tmp[0].setAttribute('style', 'display: none')
    for (var i = 0; i < objects.length; i ++){
    objects[i].move();
    objects[i].display();
    }
  }


  if (books.length< 55){
      tmp1[0].setAttribute('style', 'display: none')
      for (var z = 0; i < books.length; i++){
            books[i].display();
            console.log(books[i]);
      }
  }
  else {
    tmp1[0].setAttribute('style', 'display: block');
    tmp1[0].addEventListener('click', function clicked(){
    location.href = './dream.html';
    })
  }
}

function addBook(x, y){
  this.x = x;
  this.y = y;
  this.display = function(){
    image(BookObject, this.x, this.y,200, 200)
  }
}


function Bubble(x, y){
  this.x = x;
  this.y = y

  this.display = function (){
    image(object, this.x, this.y, 50, 50);
  }
  this.displayAfter = function(){image(object, this.x, this.y, 70, 70);}
  this.move = function(){
    this.x = this.x + random(-3, 3);
    this.y = this.y + random(-3, 3);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}





