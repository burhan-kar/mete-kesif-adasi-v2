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
function preload(){this.load.svg('puppy','assets/puppy.svg',{width:560,height:560});this.load.svg('salon','assets/salon.svg',{width:960,height:600})}
function add(o){ui.push(o);return o}
function clear(){ui.forEach(o=>{if(o&&o.active)o.destroy()});ui=[];choiceButtons=[];animal=null}
function rect(x,y,w,h,c,r=20,alpha=1){let g=scene.add.graphics();g.fillStyle(c,alpha);g.fillRoundedRect(x-w/2,y-h/2,w,h,r);add(g);return g}
function stroke(x,y,w,h,c,r=20,width=4){let g=scene.add.graphics();g.lineStyle(width,c,1);g.strokeRoundedRect(x-w/2,y-h/2,w,h,r);add(g)}
function ellipse(x,y,w,h,c,a=1){return add(scene.add.ellipse(x,y,w,h,c,a))}
function text(x,y,str,size=24,color=C.ink){return add(scene.add.text(x,y,str,{fontFamily:'Arial, sans-serif',fontSize:size+'px',fontStyle:'bold',color,align:'center',stroke:'#fff8e9',strokeThickness:size>25?4:2,wordWrap:{width:880}}).setOrigin(.5))}
function emoji(x,y,s,size=48){return text(x,y,s,size)}
function button(x,y,w,h,color,icon,title,fn){rect(x+3,y+6,w,h,0x8c5a54,19,.25);rect(x,y,w,h,color,19);stroke(x,y,w,h,0xffffff,19,5);let a=text(x,y-13,icon,34),b=text(x,y+28,title,18,'#234961');const zone=add(scene.add.zone(x,y,w,h).setInteractive({useHandCursor:true}));zone.on('pointerdown',()=>{scene.tweens.add({targets:[a,b],scale:.91,duration:95,yoyo:true});fn()});return zone}
function head(title){rect(480,35,960,70,0xffffff,20,.77);text(455,33,title,30,'#19708b');rect(854,34,165,52,0xffffff,19,.94);starsText=text(854,34,'⭐ '+progress.stars,25,'#a36a20')}
function award(key,amount=1){progress.stars+=amount;progress.completed[key]=(progress.completed[key]||0)+1;save();if(starsText&&starsText.active)starsText.setText('⭐ '+progress.stars)}
function toast(str){if(feedback&&feedback.active)feedback.destroy();feedback=text(480,552,str,21,'#875438');scene.tweens.add({targets:feedback,alpha:0,delay:1500,duration:700})}
function pop(x,y,icon='✨',n=13){for(let i=0;i<n;i++){let e=emoji(x+Phaser.Math.Between(-55,55),y+Phaser.Math.Between(-35,35),icon,Phaser.Math.Between(19,32));scene.tweens.add({targets:e,x:e.x+Phaser.Math.Between(-95,95),y:e.y-Phaser.Math.Between(60,155),alpha:0,duration:Phaser.Math.Between(750,1300),onComplete:()=>e.destroy()})}}
function backdrop(){rect(480,300,960,600,0xb2eafa,0);ellipse(480,590,1120,420,0x74cfa0);ellipse(480,530,900,235,0x9ce0a5);for(let i=0;i<9;i++){const x=(i*121+65)%960;ellipse(x,105+(i%3)*30,110,30,0xffffff,.38)}}
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
toast(msgs[kind]);pop(480,300,icons[kind],kind==='wash'?25:16);
scene.tweens.add({targets:animal,angle:5,duration:160,repeat:2,yoyo:true,onComplete:()=>animal.setAngle(0)});
}
function farmWorld(){frame('🐮 ÇİFTLİK ARKADAŞLARIMIZ');emoji(480,205,'🏡',112);text(480,320,'Hangi hayvan “MÖÖ” der?',28,'#774e39');const opts=[['🐮','İNEK'],['🐔','TAVUK'],['🐑','KOYUN']];opts.forEach((o,i)=>button(240+i*240,423,205,105,[0xffc16b,0x8ddac7,0xc5b1f7][i],o[0],o[1],()=>{if(i===0){award('farm');toast('Doğru! İnek möö der!');pop(480,320,'⭐')}else toast('Bir daha deneyelim!')}))}
function forestWorld(){frame('🦊 ORMAN KAŞİFLERİ');emoji(480,205,'🌳',115);text(480,320,'Hangi hayvan ormanda yaşar?',28,'#774e39');const opts=[['🦊','TİLKİ'],['🐬','YUNUS'],['🐠','BALIK']];opts.forEach((o,i)=>button(240+i*240,423,205,105,[0x8ed6a2,0x7bc9f3,0xf8be83][i],o[0],o[1],()=>{if(i===0){award('forest');toast('Harika! Tilkiyi buldun!');pop(480,315,'🍃')}else toast('Tekrar düşün!')}))}
function seaWorld(){frame('🐬 DENİZ DÜNYASI');ellipse(480,255,600,260,0x5dc9e7,.78);emoji(480,236,'🐬',105);text(480,350,'Denizde yaşayan canlıyı seç!',27,'#276e85');const opts=[['🐬','YUNUS'],['🐮','İNEK'],['🐓','HOROZ']];opts.forEach((o,i)=>button(240+i*240,430,205,100,[0x61cdeb,0xffc780,0xa6dba1][i],o[0],o[1],()=>{if(i===0){award('sea');toast('Doğru! Yunuslar denizde yaşar!');pop(480,265,'🫧')}else toast('Bir daha dene!')}))}
function vetWorld(){frame('🐰 VETERİNER KLİNİĞİ');emoji(480,218,'🐰',108);text(480,322,'Tavşanı dinlemek için ne kullanırız?',25,'#774e39');const opts=[['🩺','STETOSKOP'],['🧼','SABUN'],['🥕','HAVUÇ']];opts.forEach((o,i)=>button(240+i*240,427,210,103,[0x88c7ef,0xffa7c5,0xffd08c][i],o[0],o[1],()=>{if(i===0){award('vet');toast('Aferin! Kalp sesini dinledin!');pop(480,280,'💗')}else toast('Bu kez olmadı, tekrar dene!')}))}
