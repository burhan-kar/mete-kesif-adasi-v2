// Mete'nin Keşif Adası 2.0 • Illustrated pet salon / Phaser 3
const W=960,H=600;let game=new Phaser.Game({type:Phaser.AUTO,parent:'game',backgroundColor:'#b8edfa',scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER,width:W,height:H},scene:{preload,create}});
let dog,face,tail,scoreText,message,stars=0,care={wash:false,feed:false,love:false},busy=false;
function preload(){this.load.svg('salon','assets/salon.svg',{width:960,height:600});this.load.svg('puppy','assets/puppy.svg',{width:560,height:560})}
function text(s,x,y,t,size=22,color='#39516d'){return s.add.text(x,y,t,{fontFamily:'Arial',fontSize:size+'px',fontStyle:'bold',color,stroke:'#fff9ee',strokeThickness:4,align:'center'}).setOrigin(.5)}
function create(){
const s=this;s.add.image(480,300,'salon');s.add.rectangle(480,35,960,70,0xffffff,.68);
text(s,470,33,"METE'NİN KEŞİF ADASI 2.0",31,'#21778c');
s.add.ellipse(480,503,290,45,0x6e4841,.16);
dog=s.add.image(480,306,'puppy').setDisplaySize(415,415).setInteractive({useHandCursor:true});
dog.on('pointerdown',()=>careAction(s,'love'));
s.tweens.add({targets:dog,y:297,scaleY:dog.scaleY*1.015,duration:1300,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
s.add.rectangle(480,565,580,52,0xffffff,.88).setStrokeStyle(3,0xffd5a4);
message=text(s,480,565,'Köpeğe dokun, sev ve bakımını yap!',20,'#915d42');
s.add.rectangle(840,33,180,53,0xffffff,.82);scoreText=text(s,840,33,'⭐ 0',27,'#9c7025');
makeButton(s,115,260,'🧼','YIKA',0x70d9e7,'wash');makeButton(s,845,260,'🥕','BESLE',0xffc678,'feed');
makeButton(s,115,410,'💗','SEV',0xffa8c7,'love');makeButton(s,845,410,'🎉','KUTLA',0xb6a5fa,'party');
for(let i=0;i<7;i++){const dot=s.add.circle(Phaser.Math.Between(20,940),Phaser.Math.Between(90,390),Phaser.Math.Between(3,7),0xffffff,.45);s.tweens.add({targets:dot,y:dot.y-45,alpha:.1,duration:Phaser.Math.Between(2000,3800),yoyo:true,repeat:-1})}
}
function makeButton(s,x,y,emoji,name,color,kind){
const shadow=s.add.rectangle(x+5,y+7,175,105,0x775e62,.18);
const bg=s.add.rectangle(x,y,175,105,color).setStrokeStyle(6,0xffffff);
const e=text(s,x,y-17,emoji,35);const t=text(s,x,y+29,name,20,'#35556b');
bg.setInteractive({useHandCursor:true}).on('pointerdown',()=>{s.tweens.add({targets:[bg,e,t],scaleX:.94,scaleY:.94,duration:90,yoyo:true});careAction(s,kind)})}
function sparkle(s,emoji,n=15,x=480,y=310){for(let i=0;i<n;i++){let a=text(s,x+Phaser.Math.Between(-120,120),y+Phaser.Math.Between(-45,60),emoji,Phaser.Math.Between(19,34));s.tweens.add({targets:a,x:a.x+Phaser.Math.Between(-110,110),y:a.y-Phaser.Math.Between(75,210),alpha:0,scale:1.35,duration:Phaser.Math.Between(750,1500),onComplete:()=>a.destroy()})}}
function reward(){stars++;scoreText.setText('⭐ '+stars)}
function careAction(s,kind){
if(busy)return;
if(kind==='party'){if(care.wash&&care.feed&&care.love){message.setText('Harikasın Mete! Görevi tamamladın!');sparkle(s,'🌟',28);sparkle(s,'🎉',12);care={wash:false,feed:false,love:false};s.cameras.main.flash(220,255,240,175)}else{message.setText('Önce yıka, besle ve sev!');sparkle(s,'✨',8)}return}
const messages={wash:'Mis gibi oldu! Köpükler uçuşuyor!',feed:'Afiyet olsun! Çok lezzetli!',love:'Sevilmek onu çok mutlu etti!'};
const emoji={wash:'🫧',feed:'🥕',love:'💗'};message.setText(messages[kind]);care[kind]=true;reward();sparkle(s,emoji[kind],kind==='wash'?27:14);
busy=true;s.tweens.add({targets:dog,angle:kind==='love'?5:0,scaleX:dog.scaleX*1.06,duration:180,yoyo:true,repeat:3,onComplete:()=>{dog.setAngle(0);busy=false}});
}
