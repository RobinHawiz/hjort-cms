import{i as l,T as m,b as g,c as u}from"./isResponseError-BKjdF__d.js";import{f as d,e as i,i as h,r as v}from"./isUserAuth-Dtue0U77.js";class p{constructor(e="https://hjort-backend.azurewebsites.net/api/protected"){this.apiUrl=e}async getAll(){return await d(`${this.apiUrl}/reservations`,{method:"GET",headers:{Authorization:"Bearer "+localStorage.getItem("token")}})}async delete(e){const t={method:"DELETE",headers:{Authorization:"Bearer "+localStorage.getItem("token")}};await d(`${this.apiUrl}/reservations/${e}`,t)}}async function f(){try{return await new p().getAll()}catch(n){return console.error(n),[]}}async function w(n){const e=document.createDocumentFragment();return await Promise.all(n.map(async t=>{const a=document.createElement("article");a.dataset.id=t.id;const o=document.createElement("button");o.classList.add("toggle-content"),o.setAttribute("aria-controls","content"),o.innerHTML=`
          <img src="../chevron.svg" alt="Pil ikon" />
          <p>Visa</p>`;const c=new m(o);o.addEventListener("click",()=>y(c,a));const s=document.createElement("button");s.classList.add("cancel"),s.innerText="Avboka",s.addEventListener("click",async()=>{await T(a)});const r=new Date(i(t.reservationDate));a.innerHTML=`
    <div class="top-card-info">
      <div class="col-1">
        <h3>${i(t.firstName)} ${i(t.lastName)}</h3>
        <div class="wrapper-container">
          <span>●</span>
          <div class="guest-amount-wrapper wrapper">
            <img src="../users.svg" alt="Gäster ikon" />
            <p>${i(String(t.guestAmount))}</p>
          </div>
          <div class="booking-date-wrapper wrapper">
            <img src="../calendar.svg" alt="Kalender ikon" />
            <p>${r.toLocaleDateString("sv-SE")}</p>
          </div>
          <div class="booking-time-wrapper wrapper">
            <img src="../clock.svg" alt="Klocka ikon" />
            <p>${r.toLocaleTimeString("sv-SE",{hour:"2-digit",minute:"2-digit"})}</p>
          </div>
        </div>
      </div>
      <div class="col-2">
      </div>
    </div>
    <div id="content">
      <p class="message">${i(t.message)}</p>
      <div class="phone-number-wrapper wrapper">
        <img src="../phone.svg" alt="Telefon ikon" />
        <p>${i(t.phoneNumber)}</p>
      </div>
      <div class="email-cancel-button-container">
        <p>
          <a href="mailto:${i(t.email)}">${i(t.email)}</a>
        </p>
      </div>
    </div>
  `,t.message.length===0&&a.setAttribute("contains-message","true"),a.querySelector(".col-2").appendChild(o),a.querySelector(".email-cancel-button-container").appendChild(s),a.style.maxHeight=await E(a.querySelector(".top-card-info"))+"px",e.appendChild(a)})),e}function y(n,e){const t="#content",a=e.querySelector(t),o=".toggle-content p",c=e.querySelector(o),s=".top-card-info",r=e.querySelector(s);l(a,t)&&l(c,o)&&l(r,s)&&(e.style.maxHeight=e.classList.toggle("expanded")?(r.scrollHeight+a.scrollHeight)/10+"rem":r.scrollHeight/10+"rem",n.toggleOpen(),c.innerText=a.classList.toggle("show")?"Dölj":"Visa")}async function E(n){const e=document.createElement("article");return e.innerHTML=n.outerHTML,e.style.position="absolute",e.style.pointerEvents="none",e.style.visibility="hidden",document.body.appendChild(e),await new Promise(t=>{setTimeout(()=>{t(e.offsetHeight),document.body.removeChild(e)},100)})}async function T(n){if(confirm("Vill du verkligen avboka den här reserveringen?")){const e=new p;try{await e.delete(n.dataset.id),n.remove()}catch(t){console.error(t)}}}function S(n){const e="section",t=document.querySelector(e);l(t,e)&&t.appendChild(n)}async function b(){await h()||window.location.replace("/hjort-cms/"),g(),u();const n=await f(),e=await w(n);S(e),v()}b();
