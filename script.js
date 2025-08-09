// Interactive envelope + MCQ flow
document.addEventListener('DOMContentLoaded', ()=> {
  const envelopeBtn = document.getElementById('envelopeBtn');
  const letterCard = document.getElementById('letterCard');
  const nextBtn = document.getElementById('nextBtn');
  const questionCard = document.getElementById('questionCard');
  const opts = Array.from(document.querySelectorAll('.opt'));
  const tryMsg = document.getElementById('tryMsg');
  const finalCard = document.getElementById('finalCard');
  const forgiveBtn = document.getElementById('forgiveBtn');
  const thanksCard = document.getElementById('thanksCard');

  // 1) Open envelope -> show letter
  envelopeBtn.addEventListener('click', ()=> {
   
document.getElementById("bgMusic").play();

    envelopeBtn.classList.add('open'); // flap animation
    // small delay then reveal letter
    
    setTimeout(()=> {
      envelopeBtn.style.display = 'none';
      letterCard.classList.remove('hidden');
      letterCard.setAttribute('aria-hidden','false');
      // gentle scale-in
      letterCard.style.transform = 'translateY(-6px) scale(1)';
    }, 900);
  });

  // 2) Next -> MCQ
  nextBtn.addEventListener('click', ()=> {
    letterCard.classList.add('hidden');
    questionCard.classList.remove('hidden');
    questionCard.setAttribute('aria-hidden','false');
    tryMsg.textContent = '';
  });

  // 3) MCQ logic
  opts.forEach(btn => {
    btn.addEventListener('click', ()=> {
      const correct = btn.getAttribute('data-correct') === 'true';
      if(correct){
        // success animation & go to final
        btn.style.background = '#e8ffef';
        btn.style.borderColor = '#9de6b3';
        setTimeout(()=> {
          questionCard.classList.add('hidden');
          finalCard.classList.remove('hidden');
          finalCard.setAttribute('aria-hidden','false');
        }, 1000);
      } else {
        // wrong message -> allow retry
        tryMsg.textContent = "Try again… tne khbr che real answer su che to please ej select kr";
        // small shake
        questionCard.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}], {duration:420, iterations:1});
        // optionally flash the wrong button
        btn.animate([{background:'#ffdfe5'},{background:'#fff'}], {duration:420});
      }
    });
  });

  // 4) Forgive button -> show thank you + confetti
  forgiveBtn.addEventListener('click', ()=> {
    finalCard.classList.add('hidden');
    thanksCard.classList.remove('hidden');
    thanksCard.setAttribute('aria-hidden','false');
    // confetti simple
    launchConfetti();
    // change text to warm message (optional extra)
    setTimeout(()=> {
      // nothing extra required
    }, 800);
  });
  nextBtn.addEventListener("click", () => {
  letterScreen.classList.add("fade-out");
  setTimeout(() => {
    letterScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
    questionScreen.classList.add("fade-in");
  }, 800);
});




  // --- confetti function (small) ---
  function launchConfetti(){
    const count = 40;
    for(let i=0;i<count;i++){
      const el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.left = (50 + (Math.random()*60-30)) + '%';
      el.style.top = (30 + Math.random()*20) + '%';
      el.style.width = '10px';
      el.style.height = '14px';
      el.style.background = ['#FFB6C1','#BFEAF5','#FFF3C4'][Math.floor(Math.random()*3)];
      el.style.borderRadius = '3px';
      el.style.transform = `rotate(${Math.random()*360}deg)`;
      el.style.zIndex = 9999;
      document.body.appendChild(el);
      const dur = 1200 + Math.random()*900;
      const dx = (Math.random()*160 - 80);
      const dy = 300 + Math.random()*200;
      el.animate([
        { transform: `translate(0,0) rotate(${Math.random()*360}deg)`, opacity:1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${Math.random()*720}deg)`, opacity:0.04 }
      ], { duration: dur, easing: 'cubic-bezier(.2,.8,.2,1)', iterations:1 });
      setTimeout(()=> el.remove(), dur + 40);
    }
  }
});
