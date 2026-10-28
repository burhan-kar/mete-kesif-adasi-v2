/**
 * Pati v0.1: 100% free, deterministic glTF 2.0 GLB test mascot.
 * Procedural round forms, simple skeletal rig (rigid joint weights), seven
 * animation tracks. This is genuine skinned 3D but NOT finished sculpted art.
 * npm dependencies: none. Run: node scripts/generate-pati-glb.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const output = process.argv[2] || 'assets/characters/pati/pati_v01.glb';
const gltf = {asset:{version:'2.0',generator:'Mete Game Studio - original, dependency-free procedural model v0.1'},
 scenes:[{nodes:[0,11]}],scene:0,nodes:[],meshes:[],skins:[],animations:[],
 accessors:[],bufferViews:[],buffers:[{byteLength:0}],materials:[],textures:[],samplers:[],images:[]};
const bytes=[];let offset=0;
function chunk(data,target){const input=Buffer.isBuffer(data)?data:Buffer.from(data.buffer,data.byteOffset,data.byteLength);
 const pad=(4-offset%4)%4;if(pad){bytes.push(Buffer.alloc(pad));offset+=pad;}
 const n=gltf.bufferViews.length;gltf.bufferViews.push({...target&&{target},buffer:0,byteOffset:offset,byteLength:input.length});bytes.push(input);offset+=input.length;return n;}
function acc(data,type,componentType,opts={}){
 const view=chunk(data,opts.target);const i=gltf.accessors.length;
 const item={bufferView:view,byteOffset:0,componentType,count:data.length/({SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT4:16}[type]),type};
 if(opts.min)item.min=opts.min;if(opts.max)item.max=opts.max;
 gltf.accessors.push(item);return i;
}
const joints=[
 {name:'Root',t:[0,0,0],parent:-1},
 {name:'Body',t:[0,1.05,0],parent:0},
 {name:'Head',t:[0,.68,.44],parent:1},
 {name:'EarL',t:[-.59,.40,-.1],parent:2},
 {name:'EarR',t:[.59,.40,-.1],parent:2},
 {name:'Tail',t:[0,.22,-.80],parent:1},
 {name:'FrontL',t:[-.43,-.46,.47],parent:1},
 {name:'FrontR',t:[.43,-.46,.47],parent:1},
 {name:'BackL',t:[-.43,-.44,-.53],parent:1},
 {name:'BackR',t:[.43,-.44,-.53],parent:1},
 {name:'Jaw',t:[0,-.29,.48],parent:2}
];
for(const bone of joints){bone.global=bone.parent===-1?[...bone.t]:bone.t.map((v,k)=>v+joints[bone.parent].global[k]);gltf.nodes.push({name:bone.name,translation:bone.t,children:[]});}
for(let i=0;i<joints.length;i++){if(joints[i].parent>=0)gltf.nodes[joints[i].parent].children.push(i);}
// A single skinned mesh is kept separate from the joint hierarchy.
gltf.nodes.push({name:'Pati_Skinned_Mesh',mesh:0,skin:0});
const colors={gold:[.956,.671,.355],goldLight:[.995,.79,.495],darkGold:[.72,.37,.20],cream:[1,.941,.805],earPink:[.945,.55,.49],eye:[.175,.09,.085],nose:[.24,.15,.16],white:[1,1,.98],collar:[.18,.70,.73],tongue:[.94,.32,.38]};
function pngTexture(){const w=32,h=32;let seed=104729;const data=Buffer.alloc(h*(1+w*4));
 for(let y=0;y<h;y++){data[y*(1+4*w)]=0;for(let x=0;x<w;x++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const v=233+(seed%23);const p=y*(1+4*w)+1+x*4;data[p]=data[p+1]=data[p+2]=v;data[p+3]=255;}}
 const makeChunk=(type,b)=>{const n=Buffer.alloc(8);n.writeUInt32BE(b.length,0);n.write(type,4);const crc=crc32(Buffer.concat([n.subarray(4),b]));const c=Buffer.alloc(4);c.writeUInt32BE(crc>>>0);return Buffer.concat([n,b,c]);};
 const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(w,0);ihdr.writeUInt32BE(h,4);ihdr[8]=8;ihdr[9]=6;
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),makeChunk('IHDR',ihdr),makeChunk('IDAT',zlib.deflateSync(data,{level:9})),makeChunk('IEND',Buffer.alloc(0))]);}
function crc32(buf){let crc=0xffffffff;for(const b of buf){crc^=b;for(let i=0;i<8;i++)crc=(crc>>>1)^(0xedb88320&-(crc&1));}return (crc^0xffffffff)>>>0;}
const png=pngTexture(),pngView=chunk(png);
gltf.images.push({bufferView:pngView,mimeType:'image/png',name:'Soft_fur_noise_procedural'});
gltf.samplers.push({magFilter:9729,minFilter:9987,wrapS:10497,wrapT:10497});
gltf.textures.push({sampler:0,source:0});
for(const [name,col] of Object.entries(colors))gltf.materials.push({name,pbrMetallicRoughness:{baseColorFactor:[...col,1],baseColorTexture:{index:0},metallicFactor:0,roughnessFactor:name==='eye'||name==='nose'?.33:.89},doubleSided:false});
const materialNames=Object.keys(colors),geo=new Map(materialNames.map(k=>[k,{p:[],n:[],uv:[],j:[],w:[],idx:[]}])) ;
// Center and dimensions in bind-pose world space; joint ownership is explicit.
function ball(mat,center,radii,joint,angleX=0,angleZ=0){const g=geo.get(mat),start=g.p.length/3;const rings=10,cols=16;
 const sx=Math.sin(angleX),cx=Math.cos(angleX),sz=Math.sin(angleZ),cz=Math.cos(angleZ);
 const rotate=([x,y,z])=>{const a=[x,y*cx-z*sx,y*sx+z*cx];return [a[0]*cz-a[1]*sz,a[0]*sz+a[1]*cz,a[2]];};
 for(let lat=0;lat<=rings;lat++){
  const theta=Math.PI*lat/rings;
  for(let lon=0;lon<=cols;lon++){
   const phi=2*Math.PI*lon/cols, unit=[Math.sin(theta)*Math.cos(phi),Math.cos(theta),Math.sin(theta)*Math.sin(phi)];
   const v=rotate(unit.map((t,k)=>t*radii[k]));g.p.push(v[0]+center[0],v[1]+center[1],v[2]+center[2]);
   const nr=rotate(unit.map((t,k)=>t/radii[k]));const len=Math.hypot(...nr);g.n.push(...nr.map(v=>v/len));
   g.uv.push(lon/cols,lat/rings);g.j.push(joint,0,0,0);g.w.push(1,0,0,0);
  }
 }
 for(let lat=0;lat<rings;lat++)for(let lon=0;lon<cols;lon++){const a=start+lat*(cols+1)+lon,b=a+(cols+1);g.idx.push(a,b,a+1,b,b+1,a+1);}
}
// Body, fluffy chest, head, muzzle and ears: original round preschool mascot.
ball('gold',[0,1.14,-.05],[.66,.64,.82],1);
ball('goldLight',[0,1.22,.47],[.48,.54,.38],1);
ball('cream',[0,1.06,.67],[.34,.43,.19],1);
ball('gold',[0,1.85,.51],[.72,.71,.64],2);
ball('goldLight',[0,2.29,.67],[.53,.23,.44],2);
ball('darkGold',[-.63,2.05,.38],[.23,.49,.27],3,0,-.22);
ball('goldLight',[.63,2.05,.38],[.23,.49,.27],4,0,.22);
ball('earPink',[-.65,2.07,.56],[.115,.32,.09],3,0,-.22);
ball('earPink',[.65,2.07,.56],[.115,.32,.09],4,0,.22);
ball('cream',[0,1.53,1.03],[.48,.31,.33],10);
ball('cream',[-.28,1.59,.98],[.26,.26,.24],10);
ball('cream',[.28,1.59,.98],[.26,.26,.24],10);
ball('nose',[0,1.65,1.34],[.20,.135,.12],10);
ball('eye',[-.26,1.97,1.06],[.145,.205,.10],2);
ball('eye',[.26,1.97,1.06],[.145,.205,.10],2);
ball('white',[-.31,2.045,1.15],[.047,.063,.027],2);
ball('white',[.21,2.045,1.15],[.047,.063,.027],2);
ball('earPink',[-.50,1.64,.96],[.12,.075,.05],2);
ball('earPink',[.50,1.64,.96],[.12,.075,.05],2);
ball('tongue',[0,1.36,1.19],[.12,.08,.06],10);
// Tail follows its own articulated joint; tip remains cream from every angle.
ball('gold',[0,1.44,-1.18],[.22,.24,.59],5,-.57);
ball('cream',[0,1.72,-1.52],[.20,.205,.24],5);
for(const [index,x,z] of [[6,-.43,.50],[7,.43,.50],[8,-.43,-.53],[9,.43,-.53]]){
  ball('gold',[x,.57,z],[.24,.43,.26],index);
  ball('goldLight',[x,.255,z+.15],[.29,.22,.34],index);
  for(const delta of [-.12,0,.12])ball('cream',[x+delta,.23,z+.40],[.055,.075,.045],index);
}
ball('collar',[0,1.44,.0],[.59,.095,.65],1);
ball('collar',[0,1.48,.59],[.18,.11,.12],1);
const prim=[];
for(const [materialName,g] of geo){if(!g.p.length)continue;
 const attributes={POSITION:acc(new Float32Array(g.p),'VEC3',5126,{target:34962}),NORMAL:acc(new Float32Array(g.n),'VEC3',5126,{target:34962}),TEXCOORD_0:acc(new Float32Array(g.uv),'VEC2',5126,{target:34962}),JOINTS_0:acc(new Uint16Array(g.j),'VEC4',5123,{target:34962}),WEIGHTS_0:acc(new Float32Array(g.w),'VEC4',5126,{target:34962})};
 const indices=acc(new Uint16Array(g.idx),'SCALAR',5123,{target:34963});
 const a=gltf.accessors[attributes.POSITION];a.min=[Math.min(...g.p.filter((_,i)=>i%3===0)),Math.min(...g.p.filter((_,i)=>i%3===1)),Math.min(...g.p.filter((_,i)=>i%3===2))];
 a.max=[Math.max(...g.p.filter((_,i)=>i%3===0)),Math.max(...g.p.filter((_,i)=>i%3===1)),Math.max(...g.p.filter((_,i)=>i%3===2))];
 prim.push({attributes,indices,material:materialNames.indexOf(materialName),mode:4});
}
gltf.meshes.push({name:'Pati_Procedural_Skinned',primitives:prim});
const ibm=[];for(const bone of joints){ibm.push(1,0,0,0,0,1,0,0,0,0,1,0,-bone.global[0],-bone.global[1],-bone.global[2],1);}
gltf.skins.push({name:'PatiRig',joints:joints.map((_,i)=>i),skeleton:0,inverseBindMatrices:acc(new Float32Array(ibm),'MAT4',5126)});
function quat(x=0,y=0,z=0){const qx=Math.sin(x/2),qy=Math.sin(y/2),qz=Math.sin(z/2),cx=Math.cos(x/2),cy=Math.cos(y/2),cz=Math.cos(z/2);
 return [qx*cy*cz+cx*qy*qz,cx*qy*cz-qx*cy*qz,cx*cy*qz+qx*qy*cz,cx*cy*cz-qx*qy*qz];}
function clip(name,duration,entries){const channels=[],samplers=[];for(const [boneName,path,frames] of entries){
  const index=joints.findIndex(j=>j.name===boneName);if(index<0)throw Error('Unknown bone '+boneName);
  const time=frames.map(([t])=>t);const vals=frames.flatMap(([t,v])=>v);
  const ty=path==='rotation'?'VEC4':'VEC3';
  const input=acc(new Float32Array(time),'SCALAR',5126,{min:[0],max:[duration]});
  const output=acc(new Float32Array(vals),ty,5126);
  const sampler=samplers.length;samplers.push({input,output,interpolation:'LINEAR'});
  channels.push({sampler,target:{node:index,path}});
 }
 gltf.animations.push({name,samplers,channels});
}
const R=(angles)=>angles.map(a=>[a[0],quat(...a[1])]);
const Y=(values)=>values.map(([t,y])=>[t,[0,y,0]]);
clip('Idle',3.2,[
 ['Body','rotation',R([[0,[0,0,0]],[.8,[.018,0,0]],[1.6,[0,0,0]],[2.4,[-.018,0,0]],[3.2,[0,0,0]]])],
 ['Head','rotation',R([[0,[0,0,0]],[1,[0,.07,.015]],[2.1,[0,-.06,-.015]],[3.2,[0,0,0]]])],
 ['Tail','rotation',R([[0,[0,-.23,0]],[.8,[0,.22,0]],[1.6,[0,-.23,0]],[2.4,[0,.22,0]],[3.2,[0,-.23,0]]])]
]);
clip('Happy',1.4,[
 ['Root','translation',Y([[0,0],[.28,.23],[.53,0],[.78,.14],[1.1,0],[1.4,0]])],
 ['Tail','rotation',R([[0,[0,0,0]],[.28,[0,.50,0]],[.55,[0,-.45,0]],[.85,[0,.52,0]],[1.15,[0,-.34,0]],[1.4,[0,0,0]]])],
 ['Head','rotation',R([[0,[0,0,0]],[.45,[-.10,0,.1]],[1.4,[0,0,0]]])]
]);
clip('Wash',1.8,[
 ['Body','rotation',R([[0,[0,0,0]],[.35,[0,0,.15]],[.7,[0,0,-.15]],[1.05,[0,0,.15]],[1.4,[0,0,-.09]],[1.8,[0,0,0]]])],
 ['EarL','rotation',R([[0,[0,0,0]],[.45,[.1,0,-.24]],[.95,[-.1,0,.18]],[1.8,[0,0,0]]])],
 ['EarR','rotation',R([[0,[0,0,0]],[.45,[.1,0,.24]],[.95,[-.1,0,-.18]],[1.8,[0,0,0]]])]
]);
clip('Feed',2,[
 ['Head','rotation',R([[0,[0,0,0]],[.45,[.42,0,0]],[.9,[.22,0,0]],[1.25,[.40,0,0]],[1.65,[.12,0,0]],[2,[0,0,0]]])],
 ['Jaw','rotation',R([[0,[0,0,0]],[.5,[.10,0,0]],[.9,[-.10,0,0]],[1.25,[.12,0,0]],[2,[0,0,0]]])],
 ['Tail','rotation',R([[0,[0,0,0]],[.5,[0,.20,0]],[1,[0,-.15,0]],[2,[0,0,0]]])]
]);
clip('Pet',1.7,[
 ['Head','rotation',R([[0,[0,0,0]],[.5,[0,0,-.19]],[1.0,[-.13,.07,.15]],[1.7,[0,0,0]]])],
 ['Tail','rotation',R([[0,[0,0,0]],[.35,[0,.48,0]],[.7,[0,-.45,0]],[1.1,[0,.4,0]],[1.7,[0,0,0]]])]
]);
clip('Celebrate',2.4,[
 ['Root','translation',Y([[0,0],[.35,.38],[.66,0],[1.03,.46],[1.4,0],[1.85,.25],[2.4,0]])],
 ['Head','rotation',R([[0,[0,0,0]],[.4,[-.12,.12,.12]],[1,[.08,-.12,-.12]],[1.75,[-.13,.1,.13]],[2.4,[0,0,0]]])],
 ['Tail','rotation',R([[0,[0,-.3,0]],[.3,[0,.48,0]],[.6,[0,-.49,0]],[.9,[0,.48,0]],[1.2,[0,-.49,0]],[1.5,[0,.48,0]],[1.8,[0,-.49,0]],[2.4,[0,-.3,0]]])],
 ['EarL','rotation',R([[0,[0,0,0]],[.6,[0,0,-.22]],[1.2,[0,0,.12]],[2.4,[0,0,0]]])],
 ['EarR','rotation',R([[0,[0,0,0]],[.6,[0,0,.22]],[1.2,[0,0,-.12]],[2.4,[0,0,0]]])]
]);
const bin=Buffer.concat(bytes),pad4=(n)=>(4-n%4)%4;
gltf.buffers[0].byteLength=bin.length;
const j=Buffer.from(JSON.stringify(gltf),'utf8'),jp=Buffer.alloc(pad4(j.length),32),bp=Buffer.alloc(pad4(bin.length));
const out=Buffer.alloc(12),jsonHead=Buffer.alloc(8),binHead=Buffer.alloc(8);
out.write('glTF',0);out.writeUInt32LE(2,4);out.writeUInt32LE(12+8+j.length+jp.length+8+bin.length+bp.length,8);
jsonHead.writeUInt32LE(j.length+jp.length,0);jsonHead.write('JSON',4);
binHead.writeUInt32LE(bin.length+bp.length,0);binHead.write('BIN\0',4);
fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,Buffer.concat([out,jsonHead,j,jp,binHead,bin,bp]));
console.log(JSON.stringify({output,bytes:fs.statSync(output).size,joints:joints.length,animations:gltf.animations.map(a=>a.name),vertices:[...geo.values()].reduce((a,g)=>a+g.p.length/3,0),triangles:[...geo.values()].reduce((a,g)=>a+g.idx.length/3,0),texture:png.length}));
