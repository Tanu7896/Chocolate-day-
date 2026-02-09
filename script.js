const pages=document.querySelectorAll('.page');
const music=document.getElementById('bgMusic');

function goTo(id){
  pages.forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* START */
document.getElementById("start").onclick=()=>{
  music.play().catch(()=>{});
  goTo("chocolate");
};

/* CHOCOLATE BREAK */
function breakChocolate(){
  document.querySelector(".drip").classList.add("active");
  document.getElementById("chocoMsg").classList.remove("hidden");
  setTimeout(()=>goTo("notes"),3000);
}

/* NOTES */
const notes=[
  "Sweet is good, but you’re better.",
  "Even chocolate envies your warmth.",
  "Some cravings aren’t about taste — they’re about you.",
  "You make every moment melt softly.",
  "Love, like chocolate, is best when shared.",
  "You’re my favorite indulgence."
];

const notesBox=document.querySelector("#notes .cards");
notes.forEach(t=>{
  const c=document.createElement("div");
  c.className="card";
  c.innerText="🍫";
  c.onclick=()=>{
    c.innerText="🤎";
    c.title=t;
  };
  notesBox.appendChild(c);
});

/* 🍫 MELT GAME */
let level=0, holding=false;
const fill=document.getElementById("meterFill");
const choco=document.getElementById("meltChoco");

function update(){
  if(holding && level<100) level+=0.5;
  if(!holding && level>0) level-=0.3;
  fill.style.width=level+"%";
  choco.style.transform=`scale(${1+level/500})`;
  if(level>=100){
    confetti();
    setTimeout(()=>goTo("final"),1500);
  }
  requestAnimationFrame(update);
}
update();

choco.addEventListener("mousedown",()=>holding=true);
choco.addEventListener("mouseup",()=>holding=false);
choco.addEventListener("touchstart",()=>holding=true);
choco.addEventListener("touchend",()=>holding=false);

/* CONFETTI */
function confetti(){
  for(let i=0;i<40;i++){
    const c=document.createElement("span");
    c.className="confetti";
    c.innerText=Math.random()>.5?"🍫":"💖";
    c.style.left=Math.random()*100+"vw";
    c.style.animationDuration=2+Math.random()*2+"s";
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),4000);
  }
}

/* RESTART */
function restart(){
  level=0;
  fill.style.width="0%";
  goTo("start");
  music.currentTime=0;
}
