const WA_NUMBER = "528112345678";
const MENU = [
  {group:"Cafés de especialidad", id:"cafes", items:[
    {id:"espresso",name:"Espresso doble",desc:"Shot doble de origen Chiapas, tueste medio.",price:55,cat:"cafes",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=6a8996e6-e2ce-473c-b45a-f9d8ef2d9ca5"},
    {id:"latte-aroma",name:"Latte Aroma",desc:"Doble espresso + leche cremosa. Avena/almendra +$10.",price:68,cat:"cafes",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=d18438c6-9d62-4551-8b85-8c607fa4b947"},
    {id:"capuchino",name:"Capuchino",desc:"Clásico italiano, espuma densa y cacao.",price:65,cat:"cafes",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=6a8996e6-e2ce-473c-b45a-f9d8ef2d9ca5"},
    {id:"v60",name:"V60Origen invitado",desc:"Filtrado limpio y floral. Chiapas / Oaxaca rotativo.",price:75,cat:"cafes",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4c34b17a-580b-4ada-aa77-c538ec0db4cc"},
    {id:"aeropress",name:"Aeropress",desc:"Dulce, intenso, con notas a piloncillo.",price:78,cat:"cafes",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4c34b17a-580b-4ada-aa77-c538ec0db4cc"},
    {id:"mocha",name:"Mocha Valle",desc:"Espresso + chocolate 70% + leche. Con crema.",price:78,cat:"cafes",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=6a8996e6-e2ce-473c-b45a-f9d8ef2d9ca5"},
    {id:"cold",name:"Cold brew + naranja",desc:"Extracción 18h, toque cítrico, muy refrescante.",price:72,cat:"cafes",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4c34b17a-580b-4ada-aa77-c538ec0db4cc"},
    {id:"americano",name:"Americano",desc:"Largo y balanceado. Refill $25 en tienda.",price:50,cat:"cafes",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=6a8996e6-e2ce-473c-b45a-f9d8ef2d9ca5"},
  ]},
  {group:"Desayunos", id:"desayunos", items:[
    {id:"chilaquiles",name:"Chilaquiles del Valle",desc:"Salsa roja asada, pollo o huevo, frijoles. Incluye americano.",price:135,cat:"desayunos",tag:"Más pedido",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=ee3d98af-9adb-4d76-9c01-5e8f0b47ce57"},
    {id:"molletes",name:"Molletes masa madre",desc:"Frijol, queso gratinado, pico de gallo y salsa.",price:98,cat:"desayunos",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4a40467c-8717-4b0f-994e-df0ed84c121d"},
    {id:"huevos",name:"Huevos al gusto + pan",desc:"Rancheros, a la mexicana o estrellados con pan de masa madre.",price:115,cat:"desayunos",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=ee3d98af-9adb-4d76-9c01-5e8f0b47ce57"},
    {id:"croissant",name:"Croissant relleno",desc:"Jamón y queso o caprese. Hojaldre con mantequilla.",price:89,cat:"desayunos",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4a40467c-8717-4b0f-994e-df0ed84c121d"},
    {id:"hotcakes",name:"Hotcakes de avena + café",desc:"Miel, frutos rojos y mantequilla. Incluye americano chico.",price:110,cat:"desayunos",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4a40467c-8717-4b0f-994e-df0ed84c121d"},
  ]},
  {group:"Panadería artesanal", id:"panaderia", items:[
    {id:"concha",name:"Concha de vainilla",desc:"Receta de la casa, horneada cada mañana.",price:28,cat:"panaderia",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4a40467c-8717-4b0f-994e-df0ed84c121d"},
    {id:"rol",name:"Rol de canela",desc:"Glaseado de queso crema y nuez.",price:55,cat:"panaderia",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=be5dd427-9355-4c82-8a78-1943d4a0c821"},
    {id:"croissant-m",name:"Croissant mantequilla",desc:"Hojaldre francés 27 capas.",price:48,cat:"panaderia",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=be5dd427-9355-4c82-8a78-1943d4a0c821"},
    {id:"banano",name:"Panqué de plátano",desc:"Con nuez y toque de café. Rebanada generosa.",price:52,cat:"panaderia",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=be5dd427-9355-4c82-8a78-1943d4a0c821"},
    {id:"masa",name:"Hogaza masa madre 600g",desc:"Para llevar. Fermentación 24h.",price:95,cat:"panaderia",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4a40467c-8717-4b0f-994e-df0ed84c121d"},
  ]},
  {group:"Vegano / ligero", id:"vegano", items:[
    {id:"acai",name:"Açaí Bowl Valle",desc:"Açaí, granola, plátano, fresa, agave.",price:128,cat:"vegano",tag:"Vegano",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=79455095-fa5d-47f5-8d58-bb03013393f0"},
    {id:"bowl-veg",name:"Bowl vegano breakfast",desc:"Quinoa, aguacate, pico de gallo y aderezo.",price:125,cat:"vegano",tag:"Vegano",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=a599b91a-a465-4595-8264-1552299a7720"},
    {id:"tofu",name:"Tofu scramble + pan integral",desc:"Vegetales asados, cúrcuma y pan integral.",price:118,cat:"vegano",tag:"Vegano",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=435575ff-8529-4fc0-b84f-02cf22dfd14d"},
    {id:"matcha",name:"Matcha latte (avena)",desc:"Matcha ceremonial + leche de avena.",price:82,cat:"vegano",tag:"Vegano",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4c34b17a-580b-4ada-aa77-c538ec0db4cc"},
  ]},
  {group:"Postres y otras bebidas", id:"postres", items:[
    {id:"pastel",name:"Rebanada pastel del día",desc:"Zanahoria, chocolate o limón según vitrina.",price:68,cat:"postres",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=be5dd427-9355-4c82-8a78-1943d4a0c821"},
    {id:"galleta",name:"Galleta chispas + espresso",desc:"Horneada aquí, centro suave.",price:42,cat:"postres",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=be5dd427-9355-4c82-8a78-1943d4a0c821"},
    {id:"chocolate",name:"Chocolate oaxaqueño",desc:"Con agua o leche, toque de canela.",price:65,cat:"postres",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=6a8996e6-e2ce-473c-b45a-f9d8ef2d9ca5"},
    {id:"chai",name:"Chai latte",desc:"Especias de la casa, opción vegana.",price:72,cat:"postres",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=6a8996e6-e2ce-473c-b45a-f9d8ef2d9ca5"},
    {id:"jugo",name:"Jugo verde / naranja",desc:"Recién exprimido.",price:58,cat:"postres",img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=79455095-fa5d-47f5-8d58-bb03013393f0"},
  ]},
];
const ALL = MENU.flatMap(g=>g.items.map(i=>({...i,group:g.group})));
const byId = Object.fromEntries(ALL.map(i=>[i.id,i]));
let cart = {};
try{ cart = JSON.parse(localStorage.getItem("aroma_cart")||"{}"); }catch(e){ cart={}; }
let mode = "recoger";
let activeFilter = "all", query = "";

const $ = s=>document.querySelector(s);
const money = n=>"$"+n.toLocaleString("es-MX");

function renderMenu(){
  const box = $("#menuGroups"); box.innerHTML="";
  MENU.forEach(g=>{
    const items = g.items.filter(it=>{
      const okF = activeFilter==="all" || it.cat===activeFilter || (activeFilter==="vegano"&&it.cat==="vegano");
      const okQ = !query || (it.name+" "+it.desc).toLowerCase().includes(query);
      return okF && okQ;
    });
    if(!items.length) return;
    const div = document.createElement("div");
    div.className="menu-group";
    div.innerHTML = `<h3>${g.group} <span class="muted small">· ${items.length}</span></h3>`;
    items.forEach(it=>{
      const el=document.createElement("div");
      el.className="menu-item";
      el.innerHTML=`<img src="${it.img}" alt="${it.name}" loading="lazy">
        <div><h4>${it.name}${it.tag?`<span class="tag">${it.tag}</span>`:""}</h4><p>${it.desc}</p><strong>${money(it.price)}</strong></div>
        <div class="item-add"><button class="qty-btn" data-add="${it.id}" type="button">Añadir +</button></div>`;
      div.appendChild(el);
    });
    box.appendChild(div);
  });
  if(!box.children.length) box.innerHTML=`<p class="muted">Sin resultados para “${query}”. Prueba con “latte”, “vegano” o “pan”.</p>`;
}

function save(){ localStorage.setItem("aroma_cart", JSON.stringify(cart)); }
function count(){ return Object.values(cart).reduce((a,b)=>a+b,0); }
function subtotal(){ return Object.entries(cart).reduce((a,[id,q])=>a+(byId[id]?byId[id].price*q:0),0); }

function renderCart(){
  $("#cartCount").textContent = count();
  const box=$("#cartItems"); box.innerHTML="";
  const ids=Object.keys(cart).filter(id=>cart[id]>0&&byId[id]);
  if(!ids.length){ box.innerHTML=`<div class="cart-empty">☕<p>Tu carrito está vacío.<br>Añade un latte, unos chilaquiles o un rol de canela.</p><a class="btn btn-primary" href="#menu" id="emptyGo">Ver menú</a></div>`;
    const g=$("#emptyGo"); if(g) g.addEventListener("click",closeCart);
  }
  ids.forEach(id=>{
    const it=byId[id], q=cart[id];
    const d=document.createElement("div"); d.className="ci";
    d.innerHTML=`<div><strong>${it.name}</strong><br><small>${money(it.price)} c/u · ${money(it.price*q)}</small></div>
    <div class="ci-controls"><button data-dec="${id}" type="button">−</button><strong>${q}</strong><button data-inc="${id}" type="button">+</button></div>`;
    box.appendChild(d);
  });
  const st=subtotal();
  const ship = ids.length ? (mode==="domicilio"?39:0) : 0;
  $("#subtotal").textContent=money(st);
  $("#shipping").textContent= ids.length ? (mode==="domicilio"?money(ship):"Gratis (recoger)") : "—";
  $("#grandTotal").textContent=money(st+ship);
  $("#cartSubtitle").textContent = ids.length ? `${count()} productos · ${mode==="domicilio"?"Entrega a domicilio":"Recoger en tienda"}` : "Añade algo rico del menú";
}

function add(id){ cart[id]=(cart[id]||0)+1; save(); renderCart(); openCart(); }
function openCart(){ $("#cartDrawer").classList.add("open"); $("#overlay").hidden=false; $("#cartDrawer").setAttribute("aria-hidden","false"); document.body.style.overflow="hidden"; }
function closeCart(){ $("#cartDrawer").classList.remove("open"); $("#overlay").hidden=true; $("#cartDrawer").setAttribute("aria-hidden","true"); document.body.style.overflow=""; }

function sendOrder(){
  const ids=Object.keys(cart).filter(id=>cart[id]>0);
  if(!ids.length){ alert("Añade al menos un producto al carrito."); return; }
  const name=$("#custName").value.trim();
  const notes=$("#custNotes").value.trim();
  const st=subtotal(), ship=mode==="domicilio"?39:0;
  let msg=`Hola Café Aroma del Valle, quiero hacer un pedido:%0A`;
  ids.forEach(id=>{ const it=byId[id]; msg+=`• ${cart[id]}x ${it.name} — ${money(it.price*cart[id])}%0A`; });
  msg+=`%0ASubtotal: ${money(st)}%0AEnvío: ${mode==="domicilio"?money(ship):"Recoger (gratis)"}%0ATotal aprox: ${money(st+ship)}%0A`;
  msg+=`Modo: ${mode==="domicilio"?"Entrega a domicilio":"Recoger en tienda"}%0A`;
  if(name) msg+=`Nombre: ${encodeURIComponent(name)}%0A`;
  if(notes) msg+=`Notas: ${encodeURIComponent(notes)}%0A`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`,"_blank");
}

document.addEventListener("click",e=>{
  const a=e.target.closest("[data-add]"); if(a){ add(a.dataset.add); return; }
  const inc=e.target.closest("[data-inc]"); if(inc){ cart[inc.dataset.inc]++; save(); renderCart(); return; }
  const dec=e.target.closest("[data-dec]"); if(dec){ const id=dec.dataset.dec; cart[id]--; if(cart[id]<=0) delete cart[id]; save(); renderCart(); return; }
  const f=e.target.closest("[data-filter]"); if(f){ document.querySelectorAll("[data-filter]").forEach(b=>b.classList.remove("active")); f.classList.add("active"); activeFilter=f.dataset.filter; renderMenu(); return; }
  const s=e.target.closest("[data-mode]"); if(s){ document.querySelectorAll("[data-mode]").forEach(b=>b.classList.remove("active")); s.classList.add("active"); mode=s.dataset.mode; renderCart(); return; }
});
$("#menuSearch").addEventListener("input",e=>{ query=e.target.value.trim().toLowerCase(); renderMenu(); });
$("#openCartBtn").addEventListener("click",openCart);
$("#closeCartBtn").addEventListener("click",closeCart);
$("#overlay").addEventListener("click",closeCart);
$("#sendOrderBtn").addEventListener("click",sendOrder);
$("#sideOrderBtn").addEventListener("click",openCart);
$("#ctaOrderBtn").addEventListener("click",()=>{ document.querySelector("#menu").scrollIntoView({behavior:"smooth"}); setTimeout(openCart,600); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeCart(); });

// nav mobile + header shadow + open badge
const nav=$("#mobileNav"), tog=$("#navToggle");
tog.addEventListener("click",()=>{ const o=nav.classList.toggle("open"); tog.setAttribute("aria-expanded",o); });
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
window.addEventListener("scroll",()=>{ $("#topbar").style.boxShadow = window.scrollY>10 ? "0 6px 24px rgba(0,0,0,.08)" : "none"; },{passive:true});

(function openBadge(){
  const d=new Date(), day=d.getDay(), mins=d.getHours()*60+d.getMinutes();
  // Lun-Vie 7-21, Sab 8-22, Dom 9-15
  let open=false;
  if(day>=1&&day<=5) open=mins>=420&&mins<1260;
  else if(day===6) open=mins>=480&&mins<1320;
  else open=mins>=540&&mins<900;
  const b=$("#openBadge");
  b.textContent = open ? "● Abierto ahora" : "● Cerrado ahora";
  b.style.color = open ? "#1FA855" : "#B4551F";
})();

renderMenu(); renderCart();
