(function(){
  var header=document.getElementById('header');
  var toggle=document.getElementById('menuToggle');
  var nav=document.getElementById('mainNav');
  var tabs=document.querySelectorAll('.menu-tab');
  var cards=document.querySelectorAll('.menu-card');

  // Header scroll effect
  window.addEventListener('scroll',function(){
    header.classList.toggle('scrolled',window.scrollY>40);
  });

  // Mobile menu toggle
  toggle.addEventListener('click',function(){
    toggle.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // Close mobile nav on link click
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      toggle.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  // Menu tabs filter
  tabs.forEach(function(tab){
    tab.addEventListener('click',function(){
      tabs.forEach(function(t){t.classList.remove('active')});
      tab.classList.add('active');
      var filter=tab.getAttribute('data-tab');
      cards.forEach(function(card){
        if(filter==='all'||card.getAttribute('data-category')===filter){
          card.style.display='';
          card.style.opacity='0';
          card.style.transform='translateY(12px)';
          requestAnimationFrame(function(){
            card.style.transition='opacity .35s,transform .35s';
            card.style.opacity='1';
            card.style.transform='translateY(0)';
          });
        }else{
          card.style.display='none';
        }
      });
    });
  });

  // Scroll reveal
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  },{threshold:0.1});

  document.querySelectorAll('.nosotros-img,.menu-card,.info-card,.gallery-item,.cta-content').forEach(function(el){
    el.style.opacity='0';
    el.style.transform='translateY(20px)';
    observer.observe(el);
  });

  var style=document.createElement('style');
  style.textContent='.revealed{opacity:1!important;transform:translateY(0)!important;transition:opacity .6s ease,transform .6s ease!important}';
  document.head.appendChild(style);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var target=document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth'});
      }
    });
  });
})();