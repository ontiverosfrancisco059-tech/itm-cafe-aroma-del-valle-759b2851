const WA_NUMBER = "528112345678";
const MENU = [
 {id:"latte-aroma",name:"Latte Aroma de la Casa",desc:"Espresso doble, leche cremosa y latte art. El favorito del Valle.",price:65,cat:"bebidas",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=6a8996e6-e2ce-473c-b45a-f9d8ef2d9ca5",tag:"⭐ Más pedido"},
 {id:"capuchino",name:"Capuchino Clásico",desc:"Espresso, leche vaporizada y espuma densa con cacao.",price:60,cat:"bebidas",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=d18438c6-9d62-4551-8b85-8c607fa4b947",tag:"☕ Clásico"},
 {id:"pour-over",name:"Pour Over Origen (V60)",desc:"Chiapas, Oaxaca o Veracruz. Notas florales y dulces.",price:75,cat:"bebidas",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4c34b17a-580b-4ada-aa77-c538ec0db4cc",tag:"🫗 Método"},
 {id:"cold-brew",name:"Cold Brew 18h",desc:"Extracción en frío, dulce natural. Con naranja o leche.",price:70,cat:"bebidas",img:"https://8f785f4a.itm-void-excepcional.pages.dev/api/itm-project-assets?file=e10d7c70-3fc3-4cae-8dee-23ba30b5ed49",tag:"❄️ Frío"},
 {id:"chilaquiles",name:"Chilaquiles Verdes + Café",desc:"Totopos, salsa verde, crema, queso y huevo. Incluye americano.",price:135,cat:"desayunos",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=ee3d98af-9adb-4d76-9c01-5e8f0b47ce57",tag:"🍳 Desayuno"},
 {id:"molletes",name:"Molletes Valle",desc:"Pan de masa madre, frijoles, queso gratinado y pico de gallo.",price:95,cat:"desayunos",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4a40467c-8717-4b0f-994e-df0ed84c121d",tag:"🍳 Desayuno"},
 {id:"croissant",name:"Croissant Mantequilla",desc:"Hojaldre francés horneado cada mañana.",price:55,cat:"panaderia",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4a40467c-8717-4b0f-994e-df0ed84c121d",tag:"🥐 Pan"},
 {id:"vitrina",name:"Selección Vitrina (2 pzas)",desc:"Concha, rol de canela, muffin o galleta. Pregunta lo del día.",price:70,cat:"panaderia",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=be5dd427-9355-4c82-8a78-1943d4a0c821",tag:"🥐 Horneado"},
 {id:"bowl-veg",name:"Bowl Vegano Breakfast",desc:"Granola, plátano, berries y crema de cacahuate.",price:110,cat:"vegano",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=a599b91a-a465-4595-8264-1552299a7720",tag:"🌱 Vegano",veg:true},
 {id:"acai",name:"Açaí Bowl + Granola",desc:"Açaí, frutas frescas y granola artesanal.",price:125,cat:"vegano",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=79455095-fa5d-47f5-8d58-bb03013393f0",tag:"🌱 Vegano",veg:true},
 {id:"tofu",name:"Tofu Scramble + Pan Integral",desc:"Tofu con vegetales, cúrcuma y pan integral tostado.",price:115,cat:"vegano",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=435575ff-8529-4fc0-b84f-02cf22dfd14d",tag:"🌱 Vegano",veg:true},
 {id:"grano",name:"Bolsa Grano Origen 500g",desc:"Chiapas / Oaxaca / Veracruz. Molido gratis al momento.",price:240,cat:"grano",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=17eb13cb-a7ee-49a7-a109-41243b6ce3ab",tag:"🫘 Para casa"},
];
let cart = JSON.parse(localStorage.getItem("aroma_cart")||"{}");
let activeCat="all", orderType="domicilio";
const $=s=>document.querySelector(s);
const money=n=>"$"+n.toLocaleString("es-MX");

function renderMenu(){
 const q=($("#menuSearch").value||"").toLowerCase();
 const vegOnly=$("#vegOnly").checked;
 const grid=$("#menuGrid"); grid.innerHTML="";
 const items=MENU.filter(m=>(activeCat==="all"||m.cat===activeCat)&&(!vegOnly||m.veg)&&(!q||(m.name+" "+m.desc).toLowerCase().includes(q)));
 if(!items.length){grid.innerHTML='<p class="muted center">Sin resultados. Prueba “latte” o “vegano”.</p>';return;}
 items.forEach(m=>{
  const qty=cart[m.id]||0;
  const el=document.createElement("article"); el.className="dish";
  el.innerHTML=`<div class="ph"><img loading="lazy" src="${m.img}" alt="${m.name}"><span class="tag ${m.veg?'veg':''}">${m.tag}</span><span class="price">${money(m.price)}</span></div>
  <div class="bd"><h3>${m.name}</h3><p>${m.desc}</p>
  <div class="add-row"><div class="qty"><button data-dec="${m.id}" aria-label="Quitar">−</button><strong>${qty}</strong><button data-inc="${m.id}" aria-label="Agregar">+</button></div>
  <button class="add" data-add="${m.id}">Agregar</button></div></div>`;
  grid.appendChild(el);
 });
}
function save(){localStorage.setItem("aroma_cart",JSON.stringify(cart));renderMenu();renderCart();}
function cartList(){return Object.entries(cart).map(([id,qty])=>({...MENU.find(m=>m.id===id),qty})).filter(x=>x.name&&x.qty>0);}
function totals(){const sub=cartList().reduce((a,i)=>a+i.price*i.qty,0);const ship=orderType==="recoger"?0:(sub===0?0:(sub>=299?0:29));return{sub,ship,total:sub+ship};}
function renderCart(){
 const items=cartList(); const box=$("#cartItems");
 const count=items.reduce((a,i)=>a+i.qty,0);
 $("#cartCount").textContent=count; $("#cartCount2").textContent=count?`(${count})`:"";
 if(!items.length){box.innerHTML='<div class="empty">🧺 Tu carrito está vacío.<br>Agrega un latte y un pan calientito.</div>';}
 else box.innerHTML=items.map(i=>`<div class="ci"><img src="${i.img}" alt="${i.name}"><div class="n"><strong>${i.name}</strong><span>${money(i.price)} c/u · ${money(i.price*i.qty)}</span></div><div class="q"><button data-dec="${i.id}">−</button><strong>${i.qty}</strong><button data-inc="${i.id}">+</button></div></div>`).join("");
 const t=totals();
 $("#subTotal").textContent=money(t.sub); $("#shipCost").textContent=t.ship===0?(items.length?"Gratis":"$0"):money(t.ship); $("#grandTotal").textContent=money(t.total);
 $("#shipNote").textContent=orderType==="recoger"?"Recoges en barra · Valle, Monterrey":"Envío $29 · Gratis desde $299";
}
function openCart(){$("#cart").classList.add("open");$("#overlay").classList.add("show");}
function closeCart(){$("#cart").classList.remove("open");$("#overlay").classList.remove("show");}
document.addEventListener("click",e=>{
 const inc=e.target.closest("[data-inc]"),dec=e.target.closest("[data-dec]"),add=e.target.closest("[data-add]");
 if(inc){const id=inc.dataset.inc;cart[id]=(cart[id]||0)+1;save();}
 if(dec){const id=dec.dataset.dec;cart[id]=(cart[id]||0)-1;if(cart[id]<=0)delete cart[id];save();}
 if(add){const id=add.dataset.add;cart[id]=(cart[id]||0)+1;save();openCart();}
});
$("#cats").addEventListener("click",e=>{const b=e.target.closest(".cat");if(!b)return;document.querySelectorAll(".cat").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeCat=b.dataset.cat;renderMenu();});
$("#menuSearch").addEventListener("input",renderMenu);
$("#vegOnly").addEventListener("change",renderMenu);
$("#openCartBtn").addEventListener("click",openCart);
$("#closeCart").addEventListener("click",closeCart);
$("#overlay").addEventListener("click",closeCart);
document.querySelectorAll(".cart-type button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".cart-type button").forEach(x=>x.classList.remove("active"));b.classList.add("active");orderType=b.dataset.t;renderCart();}));
$("#clearBtn").addEventListener("click",()=>{cart={};save();});
$("#checkoutBtn").addEventListener("click",()=>{
 const items=cartList();
 if(!items.length){alert("Agrega algo del menú primero ☕");return;}
 const name=$("#fName").value.trim(),addr=$("#fAddr").value.trim(),notes=$("#fNotes").value.trim();
 if(!name){alert("Escribe tu nombre para el pedido");$("#fName").focus();return;}
 if(orderType==="domicilio"&&!addr){alert("Escribe tu dirección de entrega");$("#fAddr").focus();return;}
 const t=totals();
 let msg=`Hola Café Aroma Del Valle ☕%0AQuiero hacer un pedido:%0A`;
 items.forEach(i=>{msg+=`%0A• ${i.qty}x ${i.name} — $${i.price*i.qty}`;});
 msg+=`%0A%0ASubtotal: $${t.sub}%0AEnvío: ${t.ship===0?"Gratis":"$"+t.ship}%0ATotal: $${t.total}%0A`;
 msg+=`%0ANombre: ${encodeURIComponent(name)}%0ATipo: ${orderType}%0A`;
 if(addr)msg+=`Dirección: ${encodeURIComponent(addr)}%0A`;
 if(notes)msg+=`Notas: ${encodeURIComponent(notes)}`;
 window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`,"_blank");
});
// horario abierto/cerrado
function checkOpen(){
 const d=new Date();const day=d.getDay(),h=d.getHours()+d.getMinutes()/60;
 let open=false;
 if(day>=1&&day<=5)open=h>=7&&h<21; else if(day===6)open=h>=8&&h<22; else open=h>=9&&h<15;
 const b=$("#openBadge");b.classList.add(open?"open":"closed");b.textContent=open?"● Abierto ahora":"● Cerrado ahora";
}
// header scroll + mobile nav
window.addEventListener("scroll",()=>{$("#header").style.boxShadow=scrollY>10?"0 6px 24px #0002":"none";});
$("#menuToggle").addEventListener("click",()=>$("#nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>$("#nav").classList.remove("open")));
// galeria lightbox
const lb=$("#lightbox"),lbImg=$("#lbImg");
$("#gallery").addEventListener("click",e=>{const b=e.target.closest(".g");if(!b)return;lbImg.src=b.dataset.full;lb.classList.add("show");});
$("#lbClose").addEventListener("click",()=>lb.classList.remove("show"));
lb.addEventListener("click",e=>{if(e.target===lb)lb.classList.remove("show");});
// reviews rotator
let ri=0;const revs=document.querySelectorAll(".rev"),dots=document.querySelectorAll("#revDots button");
setInterval(()=>{ri=(ri+1)%revs.length;revs.forEach((r,i)=>r.classList.toggle("active",i===ri));dots.forEach((d,i)=>d.classList.toggle("active",i===ri));},4500);
dots.forEach((d,i)=>d.addEventListener("click",()=>{ri=i;revs.forEach((r,j)=>r.classList.toggle("active",j===ri));dots.forEach((x,j)=>x.classList.toggle("active",j===ri));}));
// contadores
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,end=+el.dataset.count;let n=0;const t=setInterval(()=>{n++;el.textContent=n;if(n>=end)clearInterval(t);},80);io.unobserve(el);}));
document.querySelectorAll("[data-count]").forEach(el=>io.observe(el));
renderMenu();renderCart();checkOpen();
