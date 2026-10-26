// Mete'nin Kesif Adasi 2.0 — playable island prototype
// Phaser 3.90; no external paid dependencies.
const WIDTH=960,HEIGHT=600;
const SAVE_KEY='mete-kesif-v2-progress';
let progress={stars:0,completed:{}};
try{const saved=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');if(saved&&typeof saved.stars==='number')progress=saved}catch(e){}
function save(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(progress))}catch(e){}}
const C={sky:0xa5e9ff,cream:0xfff8e8,brown:'#7c4b31',ink:'#254d67'};
const worlds=[
{id:'pet',name:'Hayvan Bakım',sub:'Merkezi',icon:'🐶',color:0x43bce9,x:173,y:267},
{id:'farm',name:'Çiftlik',sub:'Arkadaşlarımız',icon:'🐮',color:0xf4b24c,x:476,y:208},
{id:'forest',name:'Orman',sub:'Kaşifleri',icon:'🦊',color:0x71c97c,x:774,y:260},
{id:'sea',name:'Deniz',sub:'Dünyası',icon:'🐬',color:0x55c9d6,x:300,y:445},
{id:'vet',name:'Veteriner',sub:'Kliniği',icon:'🐰',color:0xd7a0ec,x:668,y:450}
];
const game=new Phaser.Game({type:Phaser.AUTO,parent:'game',backgroundColor:'#a5e9ff',scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER,width:WIDTH,height:HEIGHT},scene:{preload,create}});
let scene,ui=[],active='map',starsText,feedback,animal,actionCount=0,missionCount=0,choiceButtons=[],state={};
let soundOn=true,audioContext=null;
try{soundOn=localStorage.getItem('mete-sound')!=='off'}catch(e){}
function playTone(type='tap'){
 if(!soundOn)return;
 try{
  const AC=window.AudioContext||window.webkitAudioContext;
  if(!AC)return;
  if(!audioContext)audioContext=new AC();
  if(audioContext.state==='suspended')audioContext.resume();
  const now=audioContext.currentTime;
  const notes=type==='win'?[523,659,784,1046]:type==='wrong'?[310,260]:type==='care'?[440,550,660]:[560];
  notes.forEach((hz,i)=>{
   const osc=audioContext.createOscillator(),gain=audioContext.createGain();
   osc.type=type==='wrong'?'triangle':'sine';
   osc.frequency.setValueAtTime(hz,now+i*.105);
   gain.gain.setValueAtTime(.0001,now+i*.105);
   gain.gain.exponentialRampToValueAtTime(.09,now+i*.105+.018);
   gain.gain.exponentialRampToValueAtTime(.0001,now+i*.105+.19);
   osc.connect(gain);gain.connect(audioContext.destination);
   osc.start(now+i*.105);osc.stop(now+i*.105+.2);
  });
 }catch(e){}
}
function soundControl(){
 const x=46,y=35;
 rect(x,y,64,51,0xffffff,17,.93);
 const t=text(x,y,soundOn?'🔊':'🔇',26,'#315a72');
 add(scene.add.zone(x,y,64,52).setInteractive({useHandCursor:true})).on('pointerdown',()=>{
 soundOn=!soundOn;t.setText(soundOn?'🔊':'🔇');
 try{localStorage.setItem('mete-sound',soundOn?'on':'off')}catch(e){}
 if(soundOn)playTone('tap');
 });
}
function preload(){this.load.svg('cow','assets/cow-character.svg',{width:480,height:480});this.load.svg('dolphin','assets/dolphin-character.svg',{width:480,height:480});this.load.svg('rabbit','assets/rabbit-character.svg',{width:480,height:480});this.load.svg('fox','assets/fox-character.svg',{width:480,height:480});this.load.svg('puppy','assets/puppy.svg',{width:560,height:560});this.load.svg('salon','assets/salon.svg',{width:960,height:600})}
function add(o){ui.push(o);return o}
function clear(){ui.forEach(o=>{if(o&&o.active)o.destroy()});ui=[];choiceButtons=[];animal=null}
function rect(x,y,w,h,c,r=20,alpha=1){let g=scene.add.graphics();g.fillStyle(c,alpha);g.fillRoundedRect(x-w/2,y-h/2,w,h,r);add(g);return g}
function stroke(x,y,w,h,c,r=20,width=4){let g=scene.add.graphics();g.lineStyle(width,c,1);g.strokeRoundedRect(x-w/2,y-h/2,w,h,r);add(g)}
function ellipse(x,y,w,h,c,a=1){return add(scene.add.ellipse(x,y,w,h,c,a))}
function text(x,y,str,size=24,color=C.ink){return add(scene.add.text(x,y,str,{fontFamily:'Arial, sans-serif',fontSize:size+'px',fontStyle:'bold',color,align:'center',stroke:'#fff8e9',strokeThickness:size>25?4:2,wordWrap:{width:880}}).setOrigin(.5))}
function emoji(x,y,s,size=48){return text(x,y,s,size)}
function button(x,y,w,h,color,icon,title,fn){rect(x+3,y+6,w,h,0x8c5a54,19,.25);rect(x,y,w,h,color,19);stroke(x,y,w,h,0xffffff,19,5);let a=text(x,y-13,icon,34),b=text(x,y+28,title,18,'#234961');const zone=add(scene.add.zone(x,y,w,h).setInteractive({useHandCursor:true}));zone.on('pointerdown',()=>{scene.tweens.add({targets:[a,b],scale:.91,duration:95,yoyo:true});playTone('tap');fn()});return zone}
function head(title){rect(480,35,960,70,0xffffff,20,.77);text(455,33,title,30,'#19708b');rect(854,34,165,52,0xffffff,19,.94);starsText=text(854,34,'⭐ '+progress.stars,25,'#a36a20');soundControl()}
function award(key,amount=1){playTone('win');progress.stars+=amount;progress.completed[key]=(progress.completed[key]||0)+1;save();if(starsText&&starsText.active)starsText.setText('⭐ '+progress.stars)}
function toast(str){if(feedback&&feedback.active)feedback.destroy();feedback=text(480,552,str,21,'#875438');scene.tweens.add({targets:feedback,alpha:0,delay:1500,duration:700})}
function pop(x,y,icon='✨',n=13){for(let i=0;i<n;i++){let e=emoji(x+Phaser.Math.Between(-55,55),y+Phaser.Math.Between(-35,35),icon,Phaser.Math.Between(19,32));scene.tweens.add({targets:e,x:e.x+Phaser.Math.Between(-95,95),y:e.y-Phaser.Math.Between(60,155),alpha:0,duration:Phaser.Math.Between(750,1300),onComplete:()=>e.destroy()})}}
// Layered illustrated environments: custom vector scenery, animated clouds,
// ornamental foliage and island landmarks. All graphics generated at runtime.
function artShape(draw){const g=scene.add.graphics();draw(g);add(g);return g}
function artCloud(x,y,scale=1){
const g=artShape(p=>{p.fillStyle(0x8abbd1,.22);p.fillEllipse(5,13,148,39);p.fillStyle(0xffffff,.94);p.fillEllipse(0,0,130,39);p.fillCircle(-39,-10,28);p.fillCircle(-5,-22,36);p.fillCircle(36,-12,28)});
g.setPosition(x,y).setScale(scale);scene.tweens.add({targets:g,x:x+30,duration:4200+Math.random()*1700,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
}
function artPalm(x,y,scale=1){
const g=artShape(p=>{p.lineStyle(15,0x9b6744,1);p.beginPath();p.moveTo(0,80);p.lineTo(10,-25);p.strokePath();p.lineStyle(4,0xd6a16e,1);for(let i=0;i<5;i++){p.beginPath();p.moveTo(0,50-i*17);p.lineTo(9,46-i*17);p.strokePath()}for(let i=0;i<7;i++){const a=(-Math.PI*.93)+i*Math.PI/6;p.fillStyle(i%2?0x4abf79:0x2eaa75);p.fillEllipse(10+Math.cos(a)*43,-26+Math.sin(a)*28,92,23);p.fillStyle(0x76db89,.45);p.fillEllipse(10+Math.cos(a)*40,-29+Math.sin(a)*25,65,7)}p.fillStyle(0xe1a263);p.fillCircle(10,-26,10)});g.setPosition(x,y).setScale(scale);
}
function artFlower(x,y,c=0xffa8c9,s=1){
const g=artShape(p=>{p.lineStyle(3,0x368c4f);p.lineBetween(0,7,0,20);for(let i=0;i<5;i++){const a=i*Math.PI*2/5;p.fillStyle(c);p.fillCircle(Math.cos(a)*7,Math.sin(a)*7,6)}p.fillStyle(0xffd75a);p.fillCircle(0,0,5)});g.setPosition(x,y).setScale(s);
}
function artHill(x,y,w,h,color){artShape(p=>{p.fillStyle(color);p.fillEllipse(x,y,w,h);p.fillStyle(0xffffff,.10);p.fillEllipse(x-35,y-12,w*.75,h*.43)})}
function backdrop(){
rect(480,300,960,600,0x9fe6fa,0);
artShape(p=>{p.fillStyle(0xffefaa,.45);p.fillCircle(795,88,92);p.fillStyle(0xfff2b1);p.fillCircle(795,88,57);p.fillStyle(0x48c7e0);p.fillRect(0,365,960,235);p.fillStyle(0x78dfe9,.45);for(let i=0;i<15;i++)p.fillEllipse(i*76,410+(i%3)*34,84,7)});
artCloud(125,104,.9);artCloud(450,78,.75);artCloud(775,148,.64);
artHill(175,375,540,230,0x69c9a0);artHill(755,382,590,235,0x77d19b);
artHill(475,485,1060,340,0xf2d58d);artHill(475,463,1015,325,0x80d48b);
artHill(480,483,885,275,0x9bdf9c);
artPalm(45,285,.9);artPalm(902,303,.82);
for(let i=0;i<26;i++){const x=75+(i*137)%810,y=340+(i*71)%190;artFlower(x,y,[0xff9fbd,0xffe18a,0xe0a6f5,0xffffff][i%4],.65+(i%3)*.18)}
}
function create(){scene=this;showMap()}
function showMap(){clear();active='map';backdrop();ellipse(480,395,830,360,0xeed18b);ellipse(480,380,800,340,0x8cda85);ellipse(480,390,730,260,0xb2e59c);ellipse(485,570,890,120,0x31c9e0,.65);
head("METE'NİN KEŞİF ADASI 2.0");text(480,89,'Bugün hangi dünyayı keşfedeceğiz?',22,'#5a7152');
for(let i=0;i<worlds.length;i++){const w=worlds[i];ellipse(w.x,w.y+46,194,50,0x385d41,.17);rect(w.x,w.y,193,125,w.color,24);stroke(w.x,w.y,193,125,0xffffff,24,6);emoji(w.x,w.y-28,w.icon,52);text(w.x,w.y+19,w.name,21,'#583d31');text(w.x,w.y+45,w.sub,18,'#583d31');const z=add(scene.add.zone(w.x,w.y,195,130).setInteractive({useHandCursor:true}));z.on('pointerdown',()=>openWorld(w.id));scene.tweens.add({targets:z,scale:1.03,duration:1200,repeat:-1,yoyo:true})}
text(480,583,'Bir dünyaya dokun ve oyuna başla!',18,'#286c78')}
function openWorld(id){if(id==='pet')petWorld();if(id==='farm')farmWorld();if(id==='forest')forestWorld();if(id==='sea')seaWorld();if(id==='vet')vetWorld()}
function frame(title){clear();active=title;backdrop();head(title);button(78,105,115,58,0x65c7ef,'⬅️','HARİTA',showMap);rect(480,530,610,76,0xffffff,20,.9)}
function petWorld(){
frame('🐾 HAYVAN BAKIM MERKEZİ');
const bg=add(scene.add.image(480,310,'salon').setDisplaySize(960,520));bg.setDepth(-1);
animal=add(scene.add.image(480,296,'puppy').setDisplaySize(335,335));
scene.tweens.add({targets:animal,y:291,duration:1150,repeat:-1,yoyo:true});
state={wash:false,feed:false,love:false};missionCount=0;
text(480,112,'Eşyaları köpeğin üzerine sürükle!',22,'#7c4b31');
const makeTool=(x,y,symbol,title,color,kind)=>{
rect(x,y+3,152,110,color,22);stroke(x,y+3,152,110,0xffffff,22,5);
text(x,y+34,title,19,'#35536b');
const tool=emoji(x,y-16,symbol,43);
tool.setInteractive({useHandCursor:true,draggable:true});
tool.setData('originX',x);tool.setData('originY',y-16);
scene.input.setDraggable(tool);
tool.on('drag',(pointer,dragX,dragY)=>{tool.x=dragX;tool.y=dragY;tool.setScale(1.22)});
tool.on('dragend',()=>{const hit=Math.abs(tool.x-animal.x)<175&&Math.abs(tool.y-animal.y)<175;
if(hit)petAct(kind);
scene.tweens.add({targets:tool,x:x,y:y-16,scale:1,duration:280,ease:'Back.easeOut'});
});
};
makeTool(114,255,'🧽','SÜNGER',0x65d4e6,'wash');
makeTool(846,255,'🥕','MAMA',0xffc46b,'feed');
makeTool(114,396,'💗','SEVGİ',0xffa3c8,'love');
button(846,396,160,93,0xb4a0f5,'🎉','KUTLA',()=>petAct('party'));
text(480,525,'Üç bakım görevini tamamla ve kutla!',19,'#8b563d');
animal.setInteractive({useHandCursor:true}).on('pointerdown',()=>petAct('love'));
}
function petAct(kind){
if(kind==='party'){if(state.wash&&state.feed&&state.love){award('pet');toast('Harikasın Mete! Köpeğimiz çok mutlu!');pop(480,290,'⭐',22);state={wash:false,feed:false,love:false}}else toast('Önce yıka, besle ve sev!');return}
if(state[kind]){toast('Bu görevi zaten yaptın!');return}
state[kind]=true;
let icons={wash:'🫧',feed:'🥕',love:'💗'},msgs={wash:'Tertemiz oldu!',feed:'Afiyet olsun!',love:'Çok mutlu oldu!'};
playTone('care');toast(msgs[kind]);pop(480,300,icons[kind],kind==='wash'?25:16);
scene.tweens.add({targets:animal,angle:5,duration:160,repeat:2,yoyo:true,onComplete:()=>animal.setAngle(0)});
}
// Three-round learning adventures: each world presents fresh questions,
// celebrates correct answers and awards a star only after finishing.
const questionSets={
farm:[
{q:'Hangi hayvan “MÖÖ” der?',opts:[['🐮','İNEK'],['🐔','TAVUK'],['🐑','KOYUN']],right:0},
{q:'Hangi hayvan yumurtlar?',opts:[['🐴','AT'],['🐔','TAVUK'],['🐄','İNEK']],right:1},
{q:'Hangi hayvan “MEE” der?',opts:[['🐤','CİVCİV'],['🐷','DOMUZ'],['🐑','KOYUN']],right:2}
],
forest:[
{q:'Hangi hayvan ormanda yaşar?',opts:[['🦊','TİLKİ'],['🐬','YUNUS'],['🐠','BALIK']],right:0},
{q:'Hangi hayvan ağaçlara tırmanır?',opts:[['🐳','BALİNA'],['🐿️','SİNCAP'],['🐙','AHTAPOT']],right:1},
{q:'Hangisi orman kuşudur?',opts:[['🦀','YENGEÇ'],['🐡','BALON BALIĞI'],['🦉','BAYKUŞ']],right:2}
],
sea:[
{q:'Denizde yaşayan canlıyı seç!',opts:[['🐬','YUNUS'],['🐮','İNEK'],['🐓','HOROZ']],right:0},
{q:'Hangi hayvanın sekiz kolu vardır?',opts:[['🐟','BALIK'],['🐙','AHTAPOT'],['🦆','ÖRDEK']],right:1},
{q:'Denizde kabuğuyla gezen hangisi?',opts:[['🦊','TİLKİ'],['🐥','CİVCİV'],['🐢','KAPLUMBAĞA']],right:2}
],
vet:[
{q:'Tavşanın kalbini neyle dinleriz?',opts:[['🩺','STETOSKOP'],['🧼','SABUN'],['🥕','HAVUÇ']],right:0},
{q:'Ellerimizi temizlemek için ne kullanırız?',opts:[['🧸','OYUNCAK'],['🧼','SABUN'],['🎈','BALON']],right:1},
{q:'Tavşan hangi yiyeceği sever?',opts:[['🍭','ŞEKER'],['🍫','ÇİKOLATA'],['🥕','HAVUÇ']],right:2}
]};
const quizTitles={farm:'🐮 ÇİFTLİK ARKADAŞLARIMIZ',forest:'🦊 ORMAN KAŞİFLERİ',sea:'🐬 DENİZ DÜNYASI',vet:'🐰 VETERİNER KLİNİĞİ'};
const quizMascots={farm:['🐮','🐔','🐑'],forest:['🦊','🐿️','🦉'],sea:['🐬','🐙','🐢'],vet:['🐰','🩺','🥕']};
function quizWorld(id,round=0){
frame(quizTitles[id]);const data=questionSets[id][round];const theme={farm:0xffe4a2,forest:0xbcebb6,sea:0xa5e9f4,vet:0xf3d5fa}[id];
ellipse(480,240,555,255,theme,.92);
const mascotKey={farm:'cow',forest:'fox',sea:'dolphin',vet:'rabbit'}[id];const mascot=add(scene.add.image(480,217,mascotKey).setDisplaySize(230,230));scene.tweens.add({targets:mascot,y:210,angle:3,duration:1150,repeat:-1,yoyo:true,ease:'Sine.easeInOut'});
text(480,331,data.q,27,'#774e39');
text(480,112,'GÖREV '+(round+1)+' / 3',22,'#6b7750');
data.opts.forEach((o,i)=>button(240+i*240,429,205,104,[0xffc16b,0x8ddac7,0xc5b1f7][i],o[0],o[1],()=>{
if(state.quizBusy)return;
if(i!==data.right){playTone('wrong');toast('Bir daha dene! 🌟');return}
state.quizBusy=true;playTone('care');pop(480,300,'⭐',14);
if(round===2){award(id);toast('Üç görevi de başardın! ⭐');scene.time.delayedCall(1200,()=>{if(active===quizTitles[id])showMap()})}
else{toast('Doğru bildin! 🎉');scene.time.delayedCall(950,()=>{if(active===quizTitles[id])quizWorld(id,round+1)})}
}));
state.quizBusy=false;
}
function farmWorld(){quizWorld('farm')}
function forestWorld(){quizWorld('forest')}
function seaWorld(){quizWorld('sea')}
function vetWorld(){quizWorld('vet')}
