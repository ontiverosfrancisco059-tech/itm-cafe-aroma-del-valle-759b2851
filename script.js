const WA_NUMBER = "528112345678";
const MENU = [
 {id:"cafe1",cat:"cafe",name:"Espresso Doble",desc:"Tueste claro Chiapas, notas cacao y piloncillo.",price:45,img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=6a8996e6-e2ce-473c-b45a-f9d8ef2d9ca5",tag:"Casa"},
 {id:"cafe2",cat:"cafe",name:"Latte Aroma",desc:"Espresso + leche cremosa, latte art de la casa.",price:65,img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=d18438c6-9d62-4551-8b85-8c607fa4b947",tag:"Más pedido"},
 {id:"cafe3",cat:"cafe",name:"Pour Over Origen",desc:"V60 con grano Oaxaca lavado. Floral y dulce.",price:85,img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4c34b17a-580b-4ada-aa77-c538ec0db4cc",tag:"Especialidad"},
 {id:"combo1",cat:"cafe",name:"Combo Chilaquiles + Latte",desc:"Chilaquiles rojos o verdes + latte 12oz. Lun-Vie.",price:159,img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=ee3d98af-9adb-4d76-9c01-5e8f0b47ce57",tag:"Combo"},
 {id:"des1",cat:"desayuno",name:"Chilaquiles Valle",desc:"Salsa roja, crema, queso, frijoles + café americano.",price:135,img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=ee3d98af-9adb-4d76-9c01-5e8f0b47ce57",tag:"Desayuno"},
 {id:"veg2",cat:"desayuno",name:"Tofu Scramble",desc:"Tofu, pimiento, champiñón, pan integral tostado.",price:125,img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=435575ff-8529-4fc0-b84f-02cf22dfd14d",tag:"Vegano"},
 {id:"veg1",cat:"vegano",name:"Bowl Açaí Valle",desc:"Açaí, granola casa, plátano, fresa y miel.",price:120,img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=79455095-fa5d-47f5-8d58-bb03013393f0",tag:"Vegano"},
 {id:"veg3",cat:"vegano",name:"Bowl Breakfast Vegano",desc:"Quinoa, aguacate, pico de gallo y aderezo limón.",price:115,img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=a599b91a-a465-4595-8264-1552299a7720",tag:"Vegano"},
 {id:"pan1",cat:"panaderia",name:"Croissant Mantequilla",desc:"Hojaldre francés, horneado 7am.",price:45,img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4a40467c-8717-4b0f-994e-df0ed84c121d",tag:"Horneado hoy"},
 {id:"pan2",cat:"panaderia",name:"Caja Oficina 6 pzas",desc:"Surtido pan dulce + salado para compartir.",price:249,img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=be5dd427-9355-4c82-8a78-1943d4a0c821",tag:"Para llevar"},
 {id:"beb1",cat:"bebida",name:"Cold Brew Naranja",desc:"Cold brew 12h + twist naranja, mucho hielo.",price:75,img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4c34b17a-580b-4ada-aa77-c538ec0db4cc",tag:"Fría"},
 {id:"beb2",cat:"bebida",name:"Matcha Latte / Chai",desc:"Matcha ceremonial o chai especiado con avena.",price:78,img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=6a8996e6-e2ce-473c-b45a-f9d8ef2d9ca5",tag:"Fría/Caliente"},
 {id:"post1",cat:"postre",name:"Rol de Canela + Café",desc:"Rol tibio con glaseado + americano.",price:89,img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4a40467c-8717-4b0f-994e-df0ed84c121d",tag:"Postre"},
 {id:"post2",cat:"postre",name:"Galleta Masa Madre",desc:"Chocolate 70% + flor de sal. Paquete 2 pzas.",price:60,img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=be5dd427-9355-4c82-8a78-1943d4a0c821",tag:"Postre"},
];
let cart = JSON.parse(localStorage.getItem("aroma_cart")||"{}");
let activeFilter="all";
const grid=document.getElementById("menuGrid");
function money(n){return "$"+n.toLocaleString("es-MX")}
function renderMenu(){
 const items=MENU.filter(m=>activeFilter==="all"||m.cat===activeFilter);
 grid.innerHTML=items.map(m=>`<article class="menu-card"><img loading="lazy" src="${m.img}" alt="${m.name}"><div class="menu-card-body"><span class="tag">${m.tag}</span><h3>${m.name}</h3><p>${m.desc}</p><div class="price-row"><strong>${money(m.price)}</strong><button class="btn btn-small" data-add="${m.id}">Agregar +</button></div></div></article>`).join("");
}
function save(){localStorage.setItem("aroma_cart",JSON.stringify(cart));renderCart()}
function addToCart(id){
 cart[id]=(cart[id]||0)+1;save();toast("Agregado al pedido ✓");openCartDrawer();
}
function renderCart(){
 const box=document.getElementById("cartItems");
 const ids=Object.keys(cart).filter(k=>cart[k]>0);
 document.getElementById("cartCount").textContent=ids.reduce((a,k)=>a+cart[k],0);
 if(!ids.length){box.innerHTML="<p style='color:#7A6557'>Tu carrito está vacío.<br>Agrega un latte, unos chilaquiles o pan calientito. ☕</p>";document.getElementById("cartTotal").textContent="$0";return}
 let total=0;
 box.innerHTML=ids.map(id=>{
  const m=MENU.find(x=>x.id===id); if(!m) return "";
  total+=m.price*cart[id];
  return `<div class="cart-item"><img src="${m.img}" alt="${m.name}"><div><h4>${m.name}</h4><small>${money(m.price)} c/u</small></div><div class="qty"><button data-dec="${id}">−</button><strong>${cart[id]}</strong><button data-inc="${id}">+</button></div></div>`
 }).join("");
 document.getElementById("cartTotal").textContent=money(total);
}
function buildWAMessage(){
 const ids=Object.keys(cart).filter(k=>cart[k]>0);
 const name=document.getElementById("custName").value||"—";
 const type=document.getElementById("orderType").value;
 const notes=document.getElementById("orderNotes").value||"—";
 let total=0; let lines=ids.map(id=>{const m=MENU.find(x=>x.id===id);total+=m.price*cart[id];return `• ${cart[id]}x ${m.name} — ${money(m.price*cart[id])}`});
 if(!lines.length) lines=["(carrito vacío, quiero información)"];
 const msg=`Hola Café Aroma Del Valle ☕%0AQuiero hacer un pedido:%0A${encodeURIComponent(lines.join("\n"))}%0A%0ATotal: ${encodeURIComponent(money(total))}%0ANombre: ${encodeURIComponent(name)}%0ATipo: ${encodeURIComponent(type)}%0ANotas: ${encodeURIComponent(notes)}`;
 return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}
function toast(t){const el=document.getElementById("toast");el.textContent=t;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),1800)}
function openCartDrawer(){document.getElementById("cart").classList.add("open");document.getElementById("cartOverlay").classList.add("open")}
function closeCartDrawer(){document.getElementById("cart").classList.remove("open");document.getElementById("cartOverlay").classList.remove("open")}
document.addEventListener("click",e=>{
 const add=e.target.closest("[data-add]"); if(add){addToCart(add.dataset.add);return}
 const inc=e.target.closest("[data-inc]"); if(inc){cart[inc.dataset.inc]++;save();return}
 const dec=e.target.closest("[data-dec]"); if(dec){cart[dec.dataset.dec]--;if(cart[dec.dataset.dec]<=0)delete cart[dec.dataset.dec];save();return}
});
document.getElementById("filters").addEventListener("click",e=>{
 const b=e.target.closest("button"); if(!b)return;
 document.querySelectorAll("#filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");
 activeFilter=b.dataset.filter;renderMenu();
});
document.getElementById("openCart").onclick=openCartDrawer;
document.getElementById("closeCart").onclick=closeCartDrawer;
document.getElementById("cartOverlay").onclick=closeCartDrawer;
document.getElementById("clearCart").onclick=()=>{cart={};save()};
document.getElementById("checkoutWA").onclick=()=>{window.open(buildWAMessage(),"_blank")};
document.getElementById("orderForm").addEventListener("submit",e=>{e.preventDefault();window.open(buildWAMessage(),"_blank")});
document.getElementById("menuToggle").onclick=()=>document.getElementById("nav").classList.toggle("open");
document.querySelectorAll(".nav a").forEach(a=>a.onclick=()=>document.getElementById("nav").classList.remove("open"));
// Reveal
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("visible");io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
// Horario abierto/cerrado
(function(){
 const now=new Date(); const d=now.getDay(); const h=now.getHours()+now.getMinutes()/60;
 let open=false;
 if(d>=1&&d<=5) open=h>=7&&h<21; else if(d===6) open=h>=8&&h<22; else open=h>=9&&h<15;
 document.getElementById("openStatus").textContent=open?"● Abierto ahora · te esperamos":"○ Cerrado ahora · pero puedes pedir por WhatsApp para mañana";
})();
renderMenu();renderCart();
