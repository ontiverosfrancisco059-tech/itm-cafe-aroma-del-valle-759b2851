const WA_NUMBER = "528112345678";
const MENU = [
  {id:"latte", name:"Latte Aroma", desc:"Espresso doble + leche sedosa con arte. Caliente o frío.", price:65, cat:"cafes", veg:false, tag:"El favorito", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=6a8996e6-e2ce-473c-b45a-f9d8ef2d9ca5"},
  {id:"v60", name:"Pour Over V60 Origen", desc:"Chiapas u Oaxaca, notas a chocolate y cítricos. 340 ml.", price:75, cat:"cafes", veg:true, tag:"De origen", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4c34b17a-580b-4ada-aa77-c538ec0db4cc"},
  {id:"capuchino", name:"Capuchino Clásico", desc:"Espuma densa, cacao espolvoreado y canela.", price:60, cat:"cafes", veg:false, tag:"Clásico", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=d18438c6-9d62-4551-8b85-8c607fa4b947"},
  {id:"chilaquiles", name:"Chilaquiles Regios", desc:"Rojos o verdes, pollo o huevo, crema, queso y frijoles.", price:129, cat:"desayunos", veg:false, tag:"Más pedido", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=ee3d98af-9adb-4d76-9c01-5e8f0b47ce57"},
  {id:"bowl-veg", name:"Breakfast Bowl Vegano", desc:"Granola, fruta de temporada, crema de cacahuate y miel de agave.", price:115, cat:"vegano", veg:true, tag:"Vegano", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=a599b91a-a465-4595-8264-1552299a7720"},
  {id:"acai", name:"Açaí Bowl + Granola", desc:"Açaí, plátano, fresas, granola artesanal y coco.", price:125, cat:"vegano", veg:true, tag:"Vegano", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=79455095-fa5d-47f5-8d58-bb03013393f0"},
  {id:"tofu", name:"Tofu Scramble + Pan Integral", desc:"Tofu con cúrcuma, vegetales salteados y pan de masa madre.", price:119, cat:"vegano", veg:true, tag:"Vegano", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=435575ff-8529-4fc0-b84f-02cf22dfd14d"},
  {id:"pan", name:"Panadería del Día (2 pzas)", desc:"Concha, rol de canela, croissant o masa madre. Recién horneado.", price:55, cat:"panaderia", veg:false, tag:"Horneado hoy", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4a40467c-8717-4b0f-994e-df0ed84c121d"},
  {id:"vitrina", name:"Caja Familiar de Pan (6 pzas)", desc:"Surtido de la vitrina para llevar a casa u oficina.", price:149, cat:"panaderia", veg:false, tag:"Para llevar", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=be5dd427-9355-4c82-8a78-1943d4a0c821"},
  {id:"granos", name:"Bolsa de Café en Grano 250g", desc:"Chiapas o Oaxaca, tueste medio. Molido si lo pides.", price:185, cat:"postres-bebidas", veg:true, tag:"Para casa", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=17eb13cb-a7ee-49a7-a109-41243b6ce3ab"},
  {id:"matcha", name:"Matcha Latte / Chai", desc:"Matcha ceremonial o chai con leche de avena o entera.", price:72, cat:"postres-bebidas", veg:true, tag:"Frío o caliente", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=68c3f11c-a2a3-4164-8db7-9b88d57aa328"},
  {id:"combo1", name:"Chilaquiles Regios + Café", desc:"Combo desayuno: chilaquiles + americano incluido.", price:149, cat:"desayunos", veg:false, tag:"Combo", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=ee3d98af-9adb-4d76-9c01-5e8f0b47ce57"},
];
const COMBO_PRICES = {"Chilaquiles Regios + Café":149,"Combo Pour Over + Pan":129,"Combo Bowl Verde + Matcha":159};
let cart = JSON.parse(localStorage.getItem("aroma_cart")||"[]");
let activeCat = "todos";

const $ = s=>document.querySelector(s);
const money = n=>"$"+n.toLocaleString("es-MX");

function save(){localStorage.setItem("aroma_cart",JSON.stringify(cart));renderCart();}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove("show"),2200);}

function filtered(){
  const q=($("#menuSearch").value||"").toLowerCase().trim();
  const vegOnly=$("#vegOnly").checked;
  return MENU.filter(m=>{
    if(activeCat!=="todos" && m.cat!==activeCat) return false;
    if(vegOnly && !m.veg) return false;
    if(q && !(m.name+" "+m.desc).toLowerCase().includes(q)) return false;
    return true;
  });
}
function renderMenu(){
  const grid=$("#menuGrid");const items=filtered();
  if(!items.length){grid.innerHTML="<p class='muted'>Sin resultados. Prueba con otra búsqueda o escríbenos por WhatsApp y lo preparamos.</p>";return;}
  grid.innerHTML=items.map(m=>`
    <article class="card reveal visible">
      <img src="${m.img}" alt="${m.name}" loading="lazy">
      <div class="card-body">
        <div class="card-tags"><span class="tag">${m.tag}</span>${m.veg?'<span class="tag veg">🌱 Vegano</span>':""}</div>
        <h3>${m.name}</h3><p>${m.desc}</p>
        <div class="card-foot"><span class="price">${money(m.price)}</span><button class="add" data-id="${m.id}">Agregar +</button></div>
      </div>
    </article>`).join("");
}
function cartQty(){return cart.reduce((a,c)=>a+c.qty,0);}
function cartTotal(){return cart.reduce((a,c)=>a+c.qty*c.price,0);}
function renderCart(){
  $("#cartCount").textContent=cartQty();
  $("#cartTotal").textContent=money(cartTotal());
  $("#checkoutTotal").textContent=money(cartTotal());
  const box=$("#cartItems");
  if(!cart.length){box.innerHTML="<p class='muted'>Tu carrito está vacío.<br>Agrega un latte y un panecito 🥐</p>";}
  else box.innerHTML=cart.map(c=>`
    <div class="cart-row">
      <img src="${c.img||''}" alt="" onerror="this.style.display='none'">
      <div><strong>${c.name}</strong><br><small class="muted">${money(c.price)} c/u</small>
        <div class="qty"><button data-dec="${c.id}">−</button><span>${c.qty}</span><button data-inc="${c.id}">+</button></div>
      </div>
      <strong>${money(c.price*c.qty)}</strong>
    </div>`).join("");
  const cl=$("#checkoutList");
  if(!cart.length) cl.innerHTML="<p class='muted'>Tu carrito está vacío. Agrega algo rico del menú ☝️</p>";
  else cl.innerHTML=cart.map(c=>`<div class="checkout-row"><span>${c.qty}× ${c.name}</span><strong>${money(c.price*c.qty)}</strong></div>`).join("");
}
function addById(id){
  const m=MENU.find(x=>x.id===id);if(!m)return;
  const f=cart.find(x=>x.id===id);if(f)f.qty++;else cart.push({id:m.id,name:m.name,price:m.price,img:m.img,qty:1});
  save();toast(m.name+" agregado ☕");
}
function addCombo(name){
  const price=COMBO_PRICES[name]||129;
  const f=cart.find(x=>x.id==="combo-"+name);if(f)f.qty++;else cart.push({id:"combo-"+name,name,price,img:"",qty:1});
  save();toast(name+" agregado 🎉");openCart();
}
function buildWaLink(){
  const name=$("#custName").value.trim()||"Cliente";
  const type=$("#orderType").value;
  const addr=$("#custAddr").value.trim();
  const notes=$("#custNotes").value.trim();
  let lines=[`Hola Café Aroma Del Valle ☕, soy ${name}`,`Quiero hacer un pedido (${type}):`,""];
  cart.forEach(c=>lines.push(`• ${c.qty}x ${c.name} — ${money(c.price*c.qty)}`));
  lines.push("",`Total estimado: ${money(cartTotal())}`);
  if(type==="Entrega a domicilio"&&addr)lines.push(`Dirección: ${addr}`);
  if(notes)lines.push(`Notas: ${notes}`);
  lines.push("Gracias!");
  return `https://wa.me/${WA_NUMBER}?text=`+encodeURIComponent(lines.join("\n"));
}
// events
document.addEventListener("click",e=>{
  const add=e.target.closest("[data-id]");if(add){addById(add.dataset.id);return;}
  const cb=e.target.closest("[data-add]");if(cb){addCombo(cb.dataset.add);return;}
  const inc=e.target.closest("[data-inc]");if(inc){const it=cart.find(x=>x.id===inc.dataset.inc);if(it){it.qty++;save();}return;}
  const dec=e.target.closest("[data-dec]");if(dec){const it=cart.find(x=>x.id===dec.dataset.dec);if(it){it.qty--;if(it.qty<=0)cart=cart.filter(x=>x.id!==it.id);save();}return;}
  const f=e.target.closest(".filter");if(f){document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));f.classList.add("active");activeCat=f.dataset.cat;renderMenu();return;}
});
$("#menuSearch").addEventListener("input",renderMenu);
$("#vegOnly").addEventListener("change",renderMenu);
function openCart(){$("#cartDrawer").classList.add("open");$("#overlay").classList.add("show");}
function closeCart(){$("#cartDrawer").classList.remove("open");$("#overlay").classList.remove("show");}
$("#openCartBtn").addEventListener("click",openCart);
$("#closeCartBtn").addEventListener("click",closeCart);
$("#overlay").addEventListener("click",closeCart);
$("#drawerReviewBtn").addEventListener("click",closeCart);
function checkout(){
  if(!cart.length){toast("Agrega algo del menú primero 🙂");return;}
  window.open(buildWaLink(),"_blank");
}
$("#sendOrderBtn").addEventListener("click",checkout);
$("#drawerCheckoutBtn").addEventListener("click",()=>{closeCart();document.querySelector("#visitanos").scrollIntoView({behavior:"smooth"});if(!cart.length)toast("Agrega algo del menú primero 🙂");});
// mobile nav
$("#burger").addEventListener("click",()=>{const m=$("#mobileNav");m.style.display=m.style.display==="flex"?"none":"flex";});
document.querySelectorAll("#mobileNav a").forEach(a=>a.addEventListener("click",()=>$("#mobileNav").style.display="none"));
// active nav on scroll
const secs=["inicio","menu","nosotros","galeria","visitanos"];
window.addEventListener("scroll",()=>{
  $("#header").style.boxShadow=window.scrollY>10?"0 6px 20px rgba(0,0,0,.08)":"none";
  let cur="inicio";secs.forEach(id=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<160)cur=id;});
  document.querySelectorAll(".nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+cur));
},{passive:true});
// open-now status
(function(){
  const now=new Date();const d=now.getDay();const h=now.getHours()+now.getMinutes()/60;
  let open=false,label="";
  if(d>=1&&d<=5){open=h>=7&&h<21;label="Lun a Vie 7:00 - 21:00";}
  else if(d===6){open=h>=8&&h<22;label="Sáb 8:00 - 22:00";}
  else{open=h>=9&&h<15;label="Dom 9:00 - 15:00";}
  $("#open-status-dot").style.background=open?"#25D366":"#ff6b6b";
  $("#open-status-text").textContent=open?("Abierto ahora · "+label):("Cerrado ahora · "+label);
  const th=$("#todayHours");if(th)th.textContent=(open?"Abierto · ":"Cerrado · ")+label;
})();
// reveal
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("visible");io.unobserve(x.target);}}),{threshold:.12});
document.querySelectorAll(".card,.combo,.info-card").forEach(el=>{el.classList.add("reveal");io.observe(el);});

renderMenu();renderCart();
