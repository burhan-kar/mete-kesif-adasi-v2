/** Original glTF 2.0 GLB structural checks; no paid packages required. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
const file=fs.readFileSync(process.argv[2]||'assets/characters/pati/pati_v01.glb');
assert.equal(file.toString('utf8',0,4),'glTF');
assert.equal(file.readUInt32LE(4),2);
assert.equal(file.readUInt32LE(8),file.length);
assert.equal(file.toString('utf8',16,20),'JSON');
const len=file.readUInt32LE(12),doc=JSON.parse(file.toString('utf8',20,20+len));
const at=20+len;assert.equal(file.toString('utf8',at+4,at+8),'BIN\0');
const binary=file.readUInt32LE(at);assert(at+8+binary<=file.length);
assert(doc.meshes?.length===1&&doc.scenes?.length===1);
const skin=doc.skins?.[0];assert(skin?.joints?.length>=10,'missing articulated skeleton');
assert(Number.isInteger(skin.inverseBindMatrices));
const prim=doc.meshes[0].primitives;assert(prim.length>=5,'real primitives');
for(const p of prim){
 for(const key of ['POSITION','NORMAL','TEXCOORD_0','JOINTS_0','WEIGHTS_0'])
 assert(Number.isInteger(p.attributes[key]),'attribute '+key);
 assert(Number.isInteger(p.indices));
}
assert(doc.images?.some(i=>i.mimeType==='image/png'&&Number.isInteger(i.bufferView)),'embedded texture');
const names=doc.animations?.map(a=>a.name)||[];
for(const name of ['Idle','Happy','Wash','Feed','Pet','Celebrate'])assert(names.includes(name),'animation '+name);
for(const clip of doc.animations){assert(clip.channels.length);
 for(const c of clip.channels)assert(skin.joints.includes(c.target.node),'animation joint');}
for(const v of doc.bufferViews)assert(v.byteOffset%4===0&&v.byteOffset+v.byteLength<=binary,'bufferView bounds');
console.log('PASS',JSON.stringify({bytes:file.length,joints:skin.joints.length,animations:names,materials:doc.materials.length,primitives:prim.length}));
