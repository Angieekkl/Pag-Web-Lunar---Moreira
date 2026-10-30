(() => {
const $=id=>document.getElementById(id);
const questions=[
["¿Cómo se llama la fase en la que la parte iluminada de la Luna parece crecer?","Luna Creciente","lunacreciente.jpg"],
["¿Cómo se llama la fase en la que la parte iluminada de la Luna parece disminuir?","Luna Menguante","lunamenguante.jpg"],
["¿Cómo se llama la fase en la que casi no podemos ver la parte iluminada de la Luna desde la Tierra?","Luna Nueva","lunanueva.jpg"],
["¿Cómo se llama la fase en la que vemos la Luna completamente iluminada?","Luna Llena","lunallena.jpg"],
["¿Cuántos días tarda aproximadamente la Luna en completar su ciclo de fases?","29 días",null],
["¿La Luna produce su propia luz?","No, refleja la luz del sol",null],
["¿Qué significa la palabra «menguante» cuando hablamos de la Luna?","La parte iluminada parece disminuir",null],
["¿Qué significa la palabra «creciente» cuando hablamos de la Luna?","La parte iluminada parece aumentar",null],
["¿Es verdad que la Luna está hecha de queso?","No, está hecha de rocas y minerales","superficielunar.jpg"],
["Según la leyenda... ¿Qué monstruo aparece cuando hay Luna Llena?","El hombre lobo","hombrelobo.gif"]
];
const answers=questions.map(q=>q[1]);
const colors=['#A9D8FF','#C9B8FF','#FFE39A','#FFC6D9','#B7E4C7','#F5C2E7','#BDE0FE','#D8C4FF','#F9D5A7','#CDEAC0'];
const music=new Audio('Assets/halloween-music-1.mp3');music.loop=true;music.volume=.38;
const wolf=new Audio('Assets/growl.mp3');let order=[],index=0,score=0,locked=false,timer=null,growlCount=0;
function shuffle(a){for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function show(screen){['start-screen','play-screen','end-screen'].forEach(id=>$(id).classList.toggle('hidden',id!==screen));}
function start(){clearTimeout(timer);order=shuffle([...Array(10).keys()]);index=0;score=0;locked=false;music.currentTime=0;music.play().catch(()=>{});show('play-screen');next();}
function progress(){ $('counter').textContent=index<10?`PREGUNTA ${index+1} DE 10`:'MISIÓN COMPLETADA';$('progress').innerHTML='';for(let i=0;i<10;i++){const s=document.createElement('i');if(i<index)s.className='done';$('progress').append(s);}}
function next(){locked=false;const q=questions[order[index]];$('question').textContent=q[0];$('feedback').textContent='Elegí la respuesta que te parezca correcta.';$('feedback').style.color='#d8e1ff';$('quiz-image').innerHTML='<div class="moon-mark hint-moon"></div>';progress();
const options=shuffle([...answers]);$('answers').innerHTML='';options.forEach((a,i)=>{const b=document.createElement('button');b.className='quiz-btn';b.textContent=a;b.style.background=colors[i];b.addEventListener('click',()=>answer(b,a,q));$('answers').append(b);});}
function answer(button,value,q){if(locked)return;locked=true;const ok=value===q[1];if(ok){score++;$('feedback').textContent='¡CORRECTO!  ✦  ¡Muy bien!';$('feedback').style.color='#66D98A';button.style.background='#66D98A';}else{$('feedback').textContent=`¡CASI! La respuesta correcta era:\n${q[1]}`;$('feedback').style.color='#FF7185';button.style.background='#FF7185';[...$('answers').children].forEach(b=>{if(b.textContent===q[1])b.style.background='#66D98A';});}
[...$('answers').children].forEach(b=>b.disabled=true);
if(q[2]){const im=document.createElement('img');im.src='Assets/'+q[2];im.alt='Imagen relacionada con la respuesta';im.onerror=()=>{im.remove();};$('quiz-image').innerHTML='';$('quiz-image').append(im);}else{$('quiz-image').innerHTML='<div class="moon-mark hint-moon"></div>';}
if(order[index]===9){wolf.currentTime=0;wolf.play().catch(()=>{});wolf.onended=()=>{if(growlCount<1){growlCount++;wolf.currentTime=0;wolf.play().catch(()=>{});}};growlCount=0;}
index++;progress();const wait=order[index-1]===9?8000:3000;
$('feedback').textContent+=index===10?`\n\n¡Misión completada! Tu resultado aparecerá en ${wait/1000} segundos.`:`\n\nSiguiente pregunta en ${wait/1000} segundos...`;
timer=setTimeout(()=>{if(index===10)finish();else next();},wait);}
function finish(){music.pause();wolf.pause();show('end-screen');$('score').textContent=`${score} DE 10`;let msg=score===10?'¡Increíble! Sos un gran explorador lunar.':score>=7?'¡Excelente misión! Sabés mucho sobre la Luna.':score>=4?'¡Buen trabajo! Seguí explorando el universo.':'¡Toda misión enseña algo nuevo! Volvé a intentarlo.';$('score-message').textContent=msg;}
$('start-btn').addEventListener('click',start);$('again-btn').addEventListener('click',start);show('start-screen');
})();