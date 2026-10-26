/* Mete'nin Keşif Adası 2.0 — Phaser 3, ilk oynanabilir prototip */
const W=960,H=600;
new Phaser.Game({type:Phaser.AUTO,parent:'game',backgroundColor:'#a5e9ff',scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER,width:W,height:H},scene:{create}});
let dog,eyes=[],tail,status,score,stars=0;
function txt(s,x,y,value,size=24,color='#214460'){return s.add.text(x,y,value,{fontFamily:'Arial',fontSize:size+'px',color,fontStyle:'bold',align:'center',stroke:'#ffffff',strokeThickness:3}).setOrigin(.5)}
function create(){
const s=this;
s.add.rectangle(480,300,960,600,0xb4eaff);
for(let i=0;i<11;i++){const c=s.add.ellipse(Phaser.Math.Between(0,960),Phaser.Math.Between(20,250),Phaser.Math.Between(80,170),32,0xffffff,.5);s.tweens.add({targets:c,x:c.x+65,duration:Phaser.Math.Between(5000,12000),yoyo:true,repeat:-1})}
s.add.ellipse(480,575,1060,280,0x7ad9a4);
s.add.ellipse(480,530,800,155,0xa4e5b7);
s.add.rectangle(480,310,600,405,0xfff5dd).setStrokeStyle(9,0xffffff);
s.add.rectangle(480,318,545,345,0xffdfb8);
txt(s,480,37,"METE'NİN KEŞİF ADASI",35,'#12617d');
txt(s,480,82,'🐾 Hayvan Bakım Merkezi',28,'#804b36');
s.add.ellipse(480,430,350,60,0x9d785c,.35);
dog=s.add.container(480,300);
tail=s.add.ellipse(123,91,100,34,0xd08b4d).setAngle(-25);
const body=s.add.ellipse(0,72,245,205,0xf3b66e).setStrokeStyle(4,0xd28d50);
const ears=[s.add.ellipse(-91,-47,85,142,0xc78949).setAngle(-24),s.add.ellipse(91,-47,85,142,0xc78949).setAngle(24)];
const head=s.add.ellipse(0,-8,225,190,0xf7c683).setStrokeStyle(4,0xd89b5a);
const muzzle=s.add.ellipse(0,42,112,70,0xffebc9);
const nose=s.add.ellipse(0,16,30,22,0x453a3b);
const mouth=s.add.arc(0,53,20,0,180,false,0x794d40).setStrokeStyle(3,0x794d40);
eyes=[s.add.circle(-46,-28,13,0x31353d),s.add.circle(46,-28,13,0x31353d)];
dog.add([tail,body,...ears,head,muzzle,nose,mouth,...eyes]);
s.tweens.add({targets:dog,y:295,duration:1250,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
s.tweens.add({targets:tail,angle:30,duration:280,yoyo:true,repeat:-1});
s.time.addEvent({delay:2700,loop:true,callback:()=>{eyes.forEach(e=>e.setScale(1,.13));s.time.delayedCall(160,()=>eyes.forEach(e=>e.setScale(1,1)))}});
function button(x,y,emoji,name,color,fn){const b=s.add.container(x,y);const bg=s.add.rectangle(0,0,160,88,color).setStrokeStyle(5,0xffffff);b.add([bg,txt(s,0,-12,emoji,32),txt(s,0,26,name,19,'#23465b')]);bg.setInteractive({useHandCursor:true}).on('pointerdown',()=>{s.tweens.add({targets:b,scale:.9,duration:100,yoyo:true});fn(s)});}
button(114,275,'🧼','Yıka',0x6ed7e6,wash);
button(846,275,'🥕','Besle',0xffc46e,feed);
button(114,397,'💗','Sev',0xffa7c6,pat);
button(846,397,'⭐','Kutla',0xb8a4ff,celebrate);
status=txt(s,480,478,'Bir bakım görevi seç!',23,'#754a36');
score=txt(s,828,42,'⭐ 0',28,'#78501d');
txt(s,480,552,'Köpeğe dokunarak da sevebilirsin!',18,'#26637c');
dog.setSize(230,270).setInteractive(new Phaser.Geom.Rectangle(-115,-110,230,270),Phaser.Geom.Rectangle.Contains).on('pointerdown',()=>pat(s));
}
function burst(s,emoji,n){for(let i=0;i<n;i++){let t=txt(s,480+Phaser.Math.Between(-90,90),290+Phaser.Math.Between(-30,50),emoji,Phaser.Math.Between(18,32));s.tweens.add({targets:t,x:t.x+Phaser.Math.Between(-110,110),y:t.y-Phaser.Math.Between(70,190),alpha:0,scale:1.5,duration:Phaser.Math.Between(700,1400),onComplete:()=>t.destroy()})}}
function reward(){stars++;score.setText('⭐ '+stars)}
function wash(s){status.setText('Mis gibi tertemiz! 🫧');burst(s,'🫧',20);reward()}
function feed(s){status.setText('Afiyet olsun! 🥕');burst(s,'🥕',8);s.tweens.add({targets:dog,scaleX:1.07,scaleY:.94,duration:160,yoyo:true,repeat:2});reward()}
function pat(s){status.setText('Çok mutlu oldu! 💗');burst(s,'💗',12);s.tweens.add({targets:dog,angle:5,duration:170,yoyo:true,repeat:3});reward()}
function celebrate(s){status.setText(stars>=3?'Harikasın Mete! 🎉':'Önce köpeğimizle ilgilen!');burst(s,stars>=3?'⭐':'✨',18)}
