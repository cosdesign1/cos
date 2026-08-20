
document.addEventListener('DOMContentLoaded',()=>{
  const body=document.body;
  const intro=document.getElementById('siteIntro');
  if(intro){
    const hideIntro=()=>{intro.classList.add('is-hidden');body.classList.remove('intro-active');setTimeout(()=>intro.remove(),650)};
    setTimeout(hideIntro,1150)
  }
  const page=body.dataset.page;
  document.querySelectorAll('.nav a').forEach(a=>{if(a.dataset.page===page)a.classList.add('active')});
  const toggle=document.querySelector('.menu-toggle');
  if(toggle){toggle.addEventListener('click',()=>{const open=body.classList.toggle('nav-open');toggle.setAttribute('aria-expanded',String(open));});}
  document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>body.classList.remove('nav-open')));

  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals=document.querySelectorAll('.reveal');
  if(reduced||!('IntersectionObserver'in window)){reveals.forEach(e=>e.classList.add('visible'));}
  else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.07});reveals.forEach(e=>io.observe(e));}

  document.querySelectorAll('.form-next').forEach(input=>{try{input.value=new URL('dziekujemy.html',window.location.href).href}catch(e){}});

  document.querySelectorAll('.show-project').forEach(btn=>btn.addEventListener('click',()=>{
    const section=document.querySelector(`[data-project-section="${btn.dataset.project}"]`);if(!section)return;
    const open=section.classList.toggle('is-open');
    btn.textContent=open?'Pokaż mniej':`Zobacz cały projekt (${section.querySelectorAll('.gallery-item').length})`;
    if(open)section.querySelectorAll('.project-extra.reveal').forEach(e=>e.classList.add('visible'));
  }));

  const lb=document.getElementById('lightbox'),lbImg=document.getElementById('lightboxImage'),close=document.getElementById('lightboxClose'),prev=document.getElementById('lightboxPrev'),next=document.getElementById('lightboxNext');
  let current=[],index=0;
  const setImage=()=>{if(current.length&&lbImg){const item=current[index];lbImg.src=item.dataset.src;lbImg.alt=item.querySelector('img')?.alt||'Projekt wnętrza';}};
  document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{
    if(!lb)return;current=[...document.querySelectorAll(`.gallery-item[data-gallery="${item.dataset.gallery}"]`)];index=current.indexOf(item);setImage();lb.classList.add('active');lb.setAttribute('aria-hidden','false');body.style.overflow='hidden';
  }));
  const closeLb=()=>{if(!lb)return;lb.classList.remove('active');lb.setAttribute('aria-hidden','true');body.style.overflow='';if(lbImg)lbImg.src='';};
  close?.addEventListener('click',closeLb);prev?.addEventListener('click',()=>{index=(index-1+current.length)%current.length;setImage()});next?.addEventListener('click',()=>{index=(index+1)%current.length;setImage()});
  lb?.addEventListener('click',e=>{if(e.target===lb)closeLb()});
  document.addEventListener('keydown',e=>{if(!lb?.classList.contains('active'))return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft'){index=(index-1+current.length)%current.length;setImage()}if(e.key==='ArrowRight'){index=(index+1)%current.length;setImage()}});

  const questionSets=[
    {el:document.getElementById('rotatingQuestion'),dots:[...document.querySelectorAll('.rotating-question-v7 + .question-dots i, .survey-question-v7 .question-dots i')]},
    {el:document.getElementById('homeRotatingQuestion'),dots:[...document.querySelectorAll('.home-question-dots i')]}
  ];
  const questions=['Chcesz stworzyć z nami DOM?','Potrzebujesz pomocy z doborem pakietu?','Zastanawiasz się nad współpracą?'];
  if(!reduced){
    questionSets.forEach(({el,dots})=>{
      if(!el)return;let qi=0;
      setInterval(()=>{el.classList.add('swap-out');setTimeout(()=>{qi=(qi+1)%questions.length;el.textContent=questions[qi];dots.forEach((d,i)=>d.classList.toggle('active',i===qi));el.classList.remove('swap-out');el.classList.add('swap-in');requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.remove('swap-in')));},340);},3000);
    });
  }

  const heroSlides=[...document.querySelectorAll('.hero-slide')];
  if(heroSlides.length>1&&!reduced){let hs=0;setInterval(()=>{heroSlides[hs].classList.remove('is-active');hs=(hs+1)%heroSlides.length;heroSlides[hs].classList.add('is-active');},5200);}
});

// V5 header state: transparent at the very top, off-white after the first scroll.
(()=>{
  const header=document.querySelector('.site-header');
  if(!header)return;
  const syncHeader=()=>header.classList.toggle('is-scrolled',window.scrollY>18);
  syncHeader();
  window.addEventListener('scroll',syncHeader,{passive:true});
})();
