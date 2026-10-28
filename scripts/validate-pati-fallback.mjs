/** Offline-mode flow regression. Real device/browser test is still required. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const html=fs.readFileSync('pilot-3d/index.html','utf8');
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
assert.equal(scripts.length,1,'Expected one offline fallback script');
const fn=new vm.Script(scripts[0],{filename:'fallback-inline.js'});
function element(){
 return {textContent:'',style:{},disabled:false,events:{},
 classList:{add(){},toggle(){}},
 addEventListener(type,cb){this.events[type]=cb},
 setAttribute(){},
 click(){if(!this.disabled)this.events.click?.()}};
}
const elements=Object.fromEntries(['fallback','score','mission','help','notice','sound','repeat'].map(x=>[x,element()]));
const buttons=[element(),element(),element()];
const ctx={window:{},document:{getElementById:id=>elements[id],querySelectorAll:()=>buttons},
 setTimeout:fn=>fn(),console};
fn.runInNewContext(ctx);
assert.equal(ctx.window.__patiFallbackActive,true);
assert.equal(elements.score.textContent,'⭐ 0/3');
assert.deepEqual(buttons.map(b=>b.disabled),[false,true,true]);
buttons[0].click();assert.equal(elements.score.textContent,'⭐ 1/3');
assert.deepEqual(buttons.map(b=>b.disabled),[true,false,true]);
buttons[1].click();assert.equal(elements.score.textContent,'⭐ 2/3');
buttons[2].click();assert.equal(elements.score.textContent,'⭐ 3/3');
assert(buttons.every(b=>b.disabled));
assert.equal(typeof elements.repeat.events.click,'function');
assert.equal(typeof elements.sound.events.click,'function');
assert(/role="status"/.test(html)&&/aria-live="polite"/.test(html),'accessible fallback');
assert(/min-height:64px/.test(html),'large audio controls');
console.log('PASS: offline 2D fallback, three guided care tasks, 3-star progress, audio controls, keyboard-ready buttons.');
