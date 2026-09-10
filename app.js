const WA_NUMBER = "528112345678";
const MENU = [
 // CAFES
 {cat:"cafes", name:"Latte Aroma insignia", price:65, desc:"Doble espresso Veracruz honey + leche cremosa + arte de la casa.", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=6a8996e6-e2ce-473c-b45a-f9d8ef2d9ca5", tags:["estrella"]},
 {cat:"cafes", name:"Capuchino Valle", price:65, desc:"Espresso Chiapas, espuma densa y toque de cacao.", img:"", tags:[]},
 {cat:"cafes", name:"Pour Over Oaxaca V60", price:85, desc:"Filtrado floral de frutos rojos. Taza limpia y dulce.", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4c34b17a-580b-4ada-aa77-c538ec0db4cc", tags:["origen"]},
 {cat:"cafes", name:"Espresso doble", price:45, desc:"Chiapas lavado, crema avellana, final a piloncillo.", img:"", tags:[]},
 {cat:"cafes", name:"Mocha de la casa", price:75, desc:"Espresso + chocolate oaxaqueño + leche + crema.", img:"", tags:[]},
 {cat:"cafes", name:"Cold Brew 12h", price:70, desc:"Infusión en frío, servido en hielo con naranja.", img:"", tags:["frio"]},
 {cat:"cafes", name:"Chai latte / Matcha latte", price:72, desc:"Chai especiado o matcha ceremonial con tu leche favorita.", img:"", tags:["veg-op"]},
 {cat:"cafes", name:"Café de olla refill", price:55, desc:"Olla tradicional con canela y piloncillo. Rellenable en local.", img:"", tags:[]},
 // DESAYUNOS
 {cat:"desayunos", name:"Chilaquiles + Café", price:135, desc:"Verdes o rojos, pollo o huevo, crema, queso, frijoles + café.", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=ee3d98af-9adb-4d76-9c01-5e8f0b47ce57", tags:["estrella"]},
 {cat:"desayunos", name:"Molletes Valle", price:95, desc:"Pan masa madre, frijoles, queso gratinado y pico de gallo.", img:"", tags:["veg-op"]},
 {cat:"desayunos", name:"Omelette de la casa", price:120, desc:"3 huevos, champiñón, espinaca y queso + pan tostado.", img:"", tags:[]},
 {cat:"desayunos", name:"Hotcakes masa madre", price:110, desc:"Con miel de agave, frutos rojos y mantequilla.", img:"", tags:[]},
 {cat:"desayunos", name:"Bowl Açaí energía", price:125, desc:"Açaí, granola artesanal, plátano, fresa y miel.", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=79455095-fa5d-47f5-8d58-bb03013393f0", tags:["veg-op"]},
 // PANADERIA
 {cat:"panaderia", name:"Croissant mantequilla", price:55, desc:"Hojaldre francés, horneado cada mañana.", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=4a40467c-8717-4b0f-994e-df0ed84c121d", tags:[]},
 {cat:"panaderia", name:"Rol de canela", price:55, desc:"Brioche suave, glaseado de queso y mucha canela.", img:"", tags:["estrella"]},
 {cat:"panaderia", name:"Concha vainilla / chocolate", price:35, desc:"Receta de abuela, migajón esponjoso.", img:"", tags:[]},
 {cat:"panaderia", name:"Pan masa madre 500g", price:85, desc:"Fermentación 48h para llevar a casa.", img:"", tags:["vegano"]},
 {cat:"panaderia", name:"Vitrina del día (2 pzas)", price:79, desc:"Elige 2 piezas de vitrina + café americano chico.", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=be5dd427-9355-4c82-8a78-1943d4a0c821", tags:[]},
 // VEGANO
 {cat:"vegano", name:"Tofu scramble + pan integral", price:125, desc:"Tofu sazonado, vegetales asados y pan integral.", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=435575ff-8529-4fc0-b84f-02cf22dfd14d", tags:["vegano"]},
 {cat:"vegano", name:"Bowl vegano breakfast", price:115, desc:"Quinoa, aguacate, pico, frijoles y aderezo limón.", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=a599b91a-a465-4595-8264-1552299a7720", tags:["vegano"]},
 {cat:"vegano", name:"Brownie vegano + latte avena", price:99, desc:"Brownie cacao 70% sin lácteos + latte leche avena.", img:"", tags:["vegano","estrella"]},
 {cat:"vegano", name:"Latte avena / almendra", price:75, desc:"Espresso origen + leche vegetal a elegir.", img:"", tags:["vegano"]},
 // POSTRES
 {cat:"postres", name:"Pastel zanahoria", price:75, desc:"Con betún de queso y nuez tostada. Receta insignia.", img:"", tags:["estrella"]},
 {cat:"postres", name:"Galleta chispas + espresso", price:69, desc:"Galleta tibia recién horneada + espresso doble.", img:"", tags:[]},
 {cat:"postres", name:"Affogato vainilla", price:80, desc:"Helado vainilla ahogado en espresso caliente.", img:"", tags:[]},
 {cat:"postres", name:"Bolsa Café Origen 250g", price:180, desc:"Chiapas / Oaxaca / Veracruz en grano o molido.", img:"https://itm-void-excepcional.pages.dev/api/itm-project-assets?file=17eb13cb-a7ee-49a7-a109-41243b6ce3ab", tags:["para-llevar"]},
];
let activeCat="cafes", cart=JSON.parse(localStorage.getItem("aroma_cart")||"[]"), fulfill="A domicilio";
const $=s=>document.querySelector(s);
const money=n=>"$"+n.toLocaleString("es-MX");
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove("show"),2200)}
function renderMenu(){
 const q=($("#menu-search").value||"").toLowerCase(), vegOnly=$("#veg-only").checked;
 const grid=$("#menu-grid"); grid.innerHTML="";
 const items=MENU.filter(i=>i.cat===activeCat)
   .filter(i=>!q||(i.name+i.desc).toLowerCase().includes(q))
   .filter(i=>!vegOnly||i.tags.includes("vegano")||i.tags.includes("veg-op"));
 if(!items.length){grid.innerHTML="<p class='muted'>Sin resultados. Prueba con otra palabra o quita el filtro vegano.</p>";return}
 items.forEach(it=>{
  const el=document.createElement("article");el.className="card";
  const pills=[it.tags.includes("vegano")?"<span class='pill veg'>🌱 vegano</span>":"",it.tags.includes("veg-op")?"<span class='pill veg'>🌱 op. vegana</span>":"",it.tags.includes("estrella")?"<span class='pill star'>★ favorito</span>":""].join("");
  el.innerHTML=(it.img?`<img src="${it.img}" alt="${it.name}" loading="lazy">`:"")+`<div class="card-body"><h3>${it.name} <span class="price">${money(it.price)}</span></h3><p>${it.desc}</p><div class="card-meta">${pills}</div><div class="add-row"><button class="add-btn" data-name="${it.name}" data-price="${it.price}">Agregar · ${money(it.price)}</button></div></div>`;
  grid.appendChild(el);
 });
 grid.querySelectorAll(".add-btn").forEach(b=>b.onclick=()=>addToCart(b.dataset.name, +b.dataset.price));
}
function saveCart(){localStorage.setItem("aroma_cart",JSON.stringify(cart));renderCart()}
function addToCart(name,price){
 const f=cart.find(i=>i.name===name);
 if(f)f.qty++;else cart.push({name,price,qty:1});
 saveCart();toast(`Agregado: ${name}`);openCart();
}
function renderCart(){
 const box=$("#cart-items");const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
 $("#cart-count").textContent=cart.reduce((s,i)=>s+i.qty,0);
 $("#cart-total").textContent=money(total);
 if(!cart.length){box.innerHTML="<div class='cart-empty'>☕<br>Tu carrito está vacío.<br>Agrega algo rico del menú.</div>";return}
 box.innerHTML=cart.map((i,idx)=>`<div class="ci"><div><strong>${i.name}</strong><br><small>${money(i.price)} c/u · ${money(i.price*i.qty)}</small></div><div class="ci-controls"><button data-a="dec" data-i="${idx}">−</button><span>${i.qty}</span><button data-a="inc" data-i="${idx}">+</button></div></div>`).join("");
 box.querySelectorAll("button").forEach(b=>b.onclick=()=>{
  const idx=+b.dataset.i;
  if(b.dataset.a==="inc")cart[idx].qty++;
  else{cart[idx].qty--;if(cart[idx].qty<=0)cart.splice(idx,1)}
  saveCart();
 });
}
function openCart(){$("#cart").classList.add("open");$("#overlay").classList.add("show")}
function closeCart(){$("#cart").classList.remove("open");$("#overlay").classList.remove("show")}
function sendWA(){
 if(!cart.length){toast("Agrega algo al carrito primero");return}
 const name=$("#c-name").value.trim(), addr=$("#c-addr").value.trim(), notes=$("#c-notes").value.trim();
 const lines=cart.map(i=>`• ${i.qty}x ${i.name} — ${money(i.price*i.qty)}`).join("\n");
 const total=money(cart.reduce((s,i)=>s+i.price*i.qty,0));
 const msg=`Hola Café Aroma Del Valle ☕\nQuiero hacer un pedido:\n${lines}\nTotal: ${total}\nTipo: ${fulfill}\nNombre: ${name||"-"}\n${fulfill==="A domicilio"?"Dirección: "+(addr||"-")+"\n":""}Notas: ${notes||"-"}`;
 window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank");
}
// events
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));t.classList.add("active");activeCat=t.dataset.cat;renderMenu()});
$("#menu-search").oninput=renderMenu;$("#veg-only").onchange=renderMenu;
$("#open-cart").onclick=openCart;$("#open-cart-2").onclick=openCart;$("#close-cart").onclick=closeCart;$("#overlay").onclick=closeCart;
$("#clear-cart").onclick=()=>{cart=[];saveCart()};
$("#send-wa").onclick=sendWA;
document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>{const[n,p]=b.dataset.add.split("|");addToCart(n,+p)});
document.querySelectorAll("#fulfill-seg button").forEach(b=>b.onclick=()=>{document.querySelectorAll("#fulfill-seg button").forEach(x=>x.classList.remove("active"));b.classList.add("active");fulfill=b.dataset.f;$("#addr-wrap").style.display=fulfill==="A domicilio"?"block":"none"});
$("#quick-order").onsubmit=e=>{e.preventDefault();const w=$("#q-what").value,n=$("#q-name").value;window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola Café Aroma Del Valle ☕\nSoy ${n}\nQuiero pedir: ${w}`)}`,"_blank")};
$("#menu-toggle").onclick=()=>$("#mobile-menu").classList.toggle("show");
document.querySelectorAll("#mobile-menu a").forEach(a=>a.onclick=()=>$("#mobile-menu").classList.remove("show"));
// open/closed status
(function(){
 const now=new Date();const d=now.getDay(),h=now.getHours()+now.getMinutes()/60;
 let open=false;
 if(d>=1&&d<=5)open=h>=7&&h<21;else if(d===6)open=h>=8&&h<22;else open=h>=9&&h<15;
 const el=$("#open-status");el.textContent=open?"● Abierto ahora · Pide por WhatsApp":"● Cerrado ahora · Te esperamos en horario";
 el.style.color=open?"#7DFFA8":"#FFB3B3";
})();
renderMenu();renderCart();
