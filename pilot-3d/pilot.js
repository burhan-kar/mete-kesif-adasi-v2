/** Pati pilot: original skinned GLB, Three.js MIT. No data collection or paid APIs. */
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
window.__patiPilotModuleReady=true;
const $=id=>document.getElementById(id),buttons=[...document.querySelectorAll('[data-task]')];
const tasks=[['Wash',"Pati'yi yıkayalım!",'Pati tertemiz oldu!'],['Feed',"Pati'ye mama verelim!",'Pati karnını doyurdu!'],['Pet',"Pati'yi sevelim!",'Pati sevgini hissetti!']];
let step=0,busy=false,mixer,actions={},active,model,camera,renderer,scene,clock,soundOff=true,ctx;
const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
function speak(t){if(soundOff||!('speechSynthesis' in window))return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='tr-TR';u.rate=.86;u.volume=.65;speechSynthesis.speak(u)}catch{}}
function tone(){if(soundOff)return;try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;ctx??=new AC();if(ctx.state==='suspended')ctx.resume();const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=600;g.gain.setValueAtTime(.0001,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.035,ctx.currentTime+.02);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.2);o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.21)}catch{}}
function state(){const done=step===tasks.length;$('score').textContent='⭐ '+step+'/3';$('mission').textContent=done?'Yaşasın! Pati mutlu!':tasks[step][1];$('help').textContent=done?'Tüm bakım görevleri tamamlandı.': 'Bir sonraki bakım aracını seç.';
buttons.forEach((b,i)=>{b.disabled=busy||i!==step||done;b.classList.toggle('done',i<step)});}
function play(name,loop=false){if(!actions[name])return 0;active?.fadeOut(.16);const a=actions[name];a.reset().setLoop(loop?THREE.LoopRepeat:THREE.LoopOnce,loop?Infinity:1);a.clampWhenFinished=!loop;a.fadeIn(.15).play();active=a;return a.getClip().duration;}
function doTask(name){if(busy||step>=3||name!==tasks[step][0])return;busy=true;state();tone();speak(tasks[step][2]);$('notice').textContent=tasks[step][2];const t=play(name);setTimeout(()=>{step++;busy=false;state();if(step===3){$('notice').textContent='🎉 Üç görevi de tamamladın!';play('Celebrate')}else play('Idle',true)},Math.max(600,t*1000));}
buttons.forEach(b=>b.addEventListener('click',()=>doTask(b.dataset.task)));
$('sound').addEventListener('click',()=>{soundOff=!soundOff;$('sound').textContent=soundOff?'🔇 Ses kapalı':'🔊 Ses açık';$('sound').setAttribute('aria-pressed',String(!soundOff));if(soundOff){try{speechSynthesis.cancel()}catch{}}else speak($('mission').textContent)});
$('repeat').addEventListener('click',()=>speak($('mission').textContent));
function fallback(){const f=$('fallback');f.classList.add('visible');f.style.zIndex='2';$('notice').textContent='2D görünümde bakım yapabilirsin.';}
async function init(){state();const root=$('viewport');try{
const canvas=document.createElement('canvas');if(!canvas.getContext('webgl2')&&!canvas.getContext('webgl'))throw Error('WebGL unavailable');
renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));root.appendChild(canvas);
scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(36,1,.1,80);camera.position.set(3,2.8,5.7);camera.lookAt(0,1.33,0);
scene.add(new THREE.HemisphereLight(0xfff9e8,0x6cafad,2.0));const key=new THREE.DirectionalLight(0xffffff,2.6);key.position.set(-3,6,5);scene.add(key);const rim=new THREE.DirectionalLight(0xffd8a0,.85);rim.position.set(3,4,-4);scene.add(rim);
const gltf=await new GLTFLoader().loadAsync('../assets/characters/pati/pati_v01.glb');model=gltf.scene;scene.add(model);
const clips=new Map(gltf.animations.map(c=>[c.name,c]));for(const n of ['Idle','Happy','Wash','Feed','Pet','Celebrate'])if(!clips.has(n))throw Error('Missing animation: '+n);
mixer=new THREE.AnimationMixer(model);mixer.addEventListener('finished',()=>{if(!busy&&step<3)play('Idle',true)});for(const [n,clip] of clips)actions[n]=mixer.clipAction(clip);play('Idle',true);clock=new THREE.Clock();
const resize=()=>{const w=root.clientWidth,h=root.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);};resize();new ResizeObserver(resize).observe(root);
const raycaster=new THREE.Raycaster(),p=new THREE.Vector2();root.addEventListener('pointerup',e=>{if(!model||busy||step>=3)return;const box=canvas.getBoundingClientRect();p.set((e.clientX-box.left)/box.width*2-1,-(e.clientY-box.top)/box.height*2+1);raycaster.setFromCamera(p,camera);if(raycaster.intersectObject(model,true).length){if(tasks[step][0]==='Pet')doTask('Pet');else $('notice').textContent='Önce aşağıdaki bakım aracını seç.'}});
function tick(){requestAnimationFrame(tick);if(document.hidden)return;const delta=Math.min(clock.getDelta(),.05);mixer.update(reduced?0:delta);renderer.render(scene,camera)}tick();
document.addEventListener('visibilitychange',()=>{if(!document.hidden)clock.getDelta()});
}catch(e){console.warn('Pati 3D pilot uses 2D fallback:',e);fallback()}}
init();
