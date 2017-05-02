var myCamera, scene, renderer, controls;
var geometry, material, mesh;
var light1, light2, light3, light4, light5, light6, word;
var obj1, obj2, obj3, obj4;
var clock = new THREE.Clock();
var mouse = { x: 0, y: 0 , clicked: false};
var width = window.innerWidth;
var height = window.innerHeight;
var projector;
var mouse = { x: 0, y: 0 , clicked: false};
var spheres = [];
var lights = [];



var container = document.getElementById('symbol');



function resetAll (){
  sphere.forEach( function(obj){
    obj.material.color.setHex(0xffff00);

  })
}

function getRandomColor() {
  var letters = '0123456789abdcef';
  var color = '0x';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function updateColor(){
  var dates = new Date();
  var timer = dates.getTime() * 0.0002;

  var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
   projector.unprojectVector( vector, myCamera );
  var ray = new THREE.Raycaster( myCamera.position, 
  vector.sub( myCamera.position ).normalize() );
  var clicks = ray.intersectObjects(spheres);



  if (mouse.clicked)  {
    mouse.clicked = false;
    if (clicks[0]){
      let tmpColor = getRandomColor();
      clicks[0].object.material.color.setHex(tmpColor);
      clicks[0].object.material.transparent = true;

      let opac =  1- Math.random();
      clicks[0].object.material.opacity = opac;

      let randomLarge = Math.floor(Math.random() * 4);
      let randomExplode = Math.floor(Math.random()*10+2) * 100;
    

      lights[randomLarge].scale.set(randomExplode, randomExplode, randomExplode);

    }
  }
}

function init() {
  scene = new THREE.Scene();
  // skybox files
  var path = "./skybox/";
  var format = ".jpg";
  var urls = [
    path + 'pos-x' + format, path + 'neg-x' + format,
    path + 'pos-y' + format, path + 'neg-y' + format,
    path + 'pos-z' + format, path + 'neg-z' + format
  ];


  scene.background = new THREE.CubeTextureLoader().load(urls);
  
  myCamera = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000);
  myCamera.position.set(0, 200, 700)
  scene.add(myCamera);

  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1); 
  scene.add(light);

  material = new THREE.MeshPhongMaterial({ color: 0xFFB6C1, specular: 0x111111, shininess: 100 });


  var loader = new THREE.BufferGeometryLoader();
  loader.load("./json/human.json", function(geometry){
    mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(100, 100, 100);
    mesh.position.y = -150;
    spheres.push(mesh);
    lights.push(mesh)
    scene.add(mesh);
  })


 

  loader.load("./json/clown.json", function(geometry){
      light1 = new THREE.PointLight( 0xff0040, 5, 1000 );
      light1.scale.set(400,400,400);
      obj1 = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial( { color: 0xff0040 } ) );
      light1.add( obj1);
      spheres.push(obj1);
      lights.push(light1);
      scene.add( light1 );

      light2 = new THREE.PointLight( 0x0040ff, 5, 1000 );
      light2.scale.set(500,500,500);
      obj2 = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial( { color: 0x0040ff } ) ) ;
      light2.add(obj2);
      spheres.push(obj2);
      lights.push(light2)
      scene.add( light2 );



  })

    loader.load("./json/tomato.json", function(geometry){
          light3 = new THREE.PointLight( 0x80ff80, 5, 1000 );
          light3.scale.set(600,600,600);
          obj3 = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial( { color: 0x80ff80} ) );
          light3.add(obj3);
          spheres.push(obj3);
          lights.push(light3)
          scene.add( light3 );

          light4 = new THREE.PointLight( 0xffaa00, 5, 1000 );
          light4.scale.set(500,500,500);
          obj4 = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial( { color: 0xffaa00} ) );
          light4.add(obj4);
          spheres.push(obj4);
          lights.push(light4)
          scene.add( light4 );

  })
  var material3  = new THREE.MeshNormalMaterial({color: 0xFFB6C1})
  loader.load("./json/words.json", function(geometry){
    word = new THREE.Mesh(geometry, material3);
    word.scale.set(200, 200, 200);
    word.position.y = 200;
    word.position.x = 10;
    word.rotation.x = -80;

    scene.add(word);
  });
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;

  controls = new THREE.OrbitControls(myCamera, renderer.domElement);
  controls.addEventListener( 'change', updateColor );
  container.appendChild(renderer.domElement);

  window.addEventListener( 'resize', onWindowResize, false );
}



function onWindowResize() {

  myCamera.aspect = window.innerWidth / window.innerHeight;
  myCamera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
  requestAnimationFrame(animate);

  var date = new Date();
  var time = date.getTime() * 0.0002;

  var delta = clock.getDelta();

  if (mesh) mesh.rotation.y -= 0.5 * delta;

  if (light1 && light2 && light3 && light4){
    light1.rotation.y -= Math.sin( time * 0.7 ) * delta;
    light1.rotation.z -= Math.sin( time * 0.5 ) * delta;



    light2.rotation.y -= Math.sin( time * 0.2 ) * delta;
    light2.rotation.z -= Math.sin( time * 0.9 ) * delta;


    light3.rotation.y -= Math.sin( time * 0.3 ) * delta;
    light3.rotation.z -= Math.sin( time * 0.1 ) * delta;


    light4.rotation.y -= Math.sin( time * 0.5 ) * delta;
    light4.rotation.z -= Math.sin( time * 0.8 ) * delta;

    light1.position.x = Math.sin( time * 0.7 ) * 500;
    light1.position.y = Math.cos( time * 0.5 ) * 1000;
    light1.position.z = Math.cos( time * 0.3 ) * 500;

    light2.position.x = Math.cos( time * 0.3 ) * 500;
    light2.position.y = Math.sin( time * 0.5 ) * 1000;
    light2.position.z = Math.sin( time * 0.7 ) * 1000;

    light3.position.x = Math.sin( time * 0.7 ) * 1000;
    light3.position.y = Math.cos( time * 0.5 ) * 500;
    light3.position.z = Math.sin( time * 0.5 ) * 500;

    light4.position.x = Math.sin( time * 0.3 ) * 1000;
    light4.position.y = Math.cos( time * 0.7 ) * 500;
    light4.position.z = Math.sin( time * 0.5 ) * 1000;



  }

  renderer.render(scene, myCamera);
  updateColor();
  controls.update();
}



function onDocumentMouseMove(event) {
  mouse.x = (event.clientX / width) * 2 -1;
  mouse.y = -(event.clientY / height) * 2 + 1;
}

function onDocumentMouseDown(event) {
  mouse.x = ( event.clientX / width ) * 2 - 1;
  mouse.y = - ( event.clientY / height ) * 2 + 1;
  mouse.clicked = true;

}


projector = new THREE.Projector();
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  

init();
animate();



