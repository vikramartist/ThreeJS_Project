import * as THREE from 'three';
import "./style.css"
import { gsap } from 'gsap';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3,64,64);

const material = new THREE.MeshStandardMaterial({
  color:"#00ff85",
  roughness:0.2
})

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const sizes = {
  width:window.innerWidth,
  height:window.innerHeight,
}

const light = new THREE.PointLight(0xffffff,100,100);
light.position.set(0,10,10)
scene.add(light)

const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,100);
camera.position.z = 25;
scene.add(camera);

const canvas = document.querySelector('.webgl');
const render = new THREE.WebGL1Renderer({canvas});
render.setSize(sizes.width,sizes.height);
render.setPixelRatio(2)
render.render(scene,camera);

const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5

window.addEventListener('resize',()=>{
  sizes.width = window.innerWidth;
  sizes.height =window.innerHeight;

  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  render.setSize(sizes.width,sizes.height);
})

const loop = ()=>{
  controls.update();
  render.render(scene,camera);
  window.requestAnimationFrame(loop);
}
loop();

const t1 = gsap.timeline({defaults:{duration:1}})
t1.fromTo(mesh.scale, {z:0,x:0,y:0},{z:1,x:1,y:1})
t1.fromTo("nav",{y:"-100%"},{y:"0%"})
t1.fromTo(".title",{opacity:0},{opacity:1})

let rgb = [];

let mouseDown = false;
window.addEventListener('mousedown',()=>{
  mouseDown = true;
})
window.addEventListener('mouseup',()=>{
  mouseDown = false;
})

window.addEventListener("mousemove",(e)=>{
  if(mouseDown){
    rgb = [
      Math.round((e.pageX/sizes.width)*255),
      Math.round((e.pageY/sizes.height)*255),
      150
    ]
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`);
    gsap.to(mesh.material.color,{r:newColor.r,g:newColor.g,b:newColor.b})
  }
})