import{i as s,a as p,T as m,b as g,c as h}from"./isResponseError-D5BMWoZH.js";const a=n=>n.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;").replace('"',"&quot;").replace("'","&#039;");function f(){const n=".loader-wrapper",e=document.querySelector(n);s(e,n)&&e.classList.add("remove")}async function w(){try{return(await fetch("https://hjort-backend.azurewebsites.net/api/auth",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}})).ok}catch(n){return console.log("Unexpected app error:",n),!1}}async function d(n,e={}){try{const t=await fetch(n,e);if(!t.ok){const o=await t.json();throw Array.isArray(o)&&o.every(r=>p(r))?o:p(o)?[o]:[{field:"unknown",message:"Unknown error"}]}return t.status===200?await t.json():void 0}catch(t){throw t instanceof TypeError?[{field:"network",message:"Could not connect to service."}]:t instanceof SyntaxError?[{field:"internal",message:"Failed to parse the response body. The response may be empty or the route may not be returning JSON as expected."}]:t}}class u{constructor(e="https://hjort-backend.azurewebsites.net/api/protected"){this.apiUrl=e}async getAll(){return await d(`${this.apiUrl}/reservations`,{method:"GET",headers:{Authorization:"Bearer "+localStorage.getItem("token")}})}async delete(e){const t={method:"DELETE",headers:{Authorization:"Bearer "+localStorage.getItem("token")}};await d(`${this.apiUrl}/reservations/${e}`,t)}}async function v(){try{return await new u().getAll()}catch(n){console.error(n)}}async function y(n){const e=document.createDocumentFragment();return await Promise.all(n.map(async t=>{const o=document.createElement("article");o.dataset.id=t.id;const r=document.createElement("button");r.classList.add("toggle-content"),r.setAttribute("aria-controls","content"),r.innerHTML=`
          <img src="../chevron.svg" alt="Pil ikon" />
          <p>Visa</p>`;const c=new m(r);r.addEventListener("click",()=>E(c,o));const i=document.createElement("button");i.classList.add("cancel"),i.innerText="Avboka",i.addEventListener("click",async()=>{await k(o)}),o.innerHTML=`
    <div class="top-card-info">
      <div class="col-1">
        <h3>${a(t.firstName)} ${a(t.lastName)}</h3>
        <div class="wrapper-container">
          <span>●</span>
          <div class="guest-amount-wrapper wrapper">
            <img src="../users.svg" alt="Gäster ikon" />
            <p>${a(String(t.guestAmount))}</p>
          </div>
          <div class="booking-date-wrapper wrapper">
            <img src="../calendar.svg" alt="Kalender ikon" />
            <p>${new Date(a(t.reservationDate)).toLocaleDateString("sv-SE")}</p>
          </div>
          <div class="booking-time-wrapper wrapper">
            <img src="../clock.svg" alt="Klocka ikon" />
            <p>${new Date(a(t.reservationDate)).toLocaleTimeString("sv-SE",{hour:"2-digit",minute:"2-digit"})}</p>
          </div>
        </div>
      </div>
      <div class="col-2">
      </div>
    </div>
    <div id="content">
      <p class="message">${a(t.message)}</p>
      <div class="phone-number-wrapper wrapper">
        <img src="../phone.svg" alt="Telefon ikon" />
        <p>${a(t.phoneNumber)}</p>
      </div>
      <div class="email-cancel-button-container">
        <p>
          <a href="mailto:${a(t.email)}">${a(t.email)}</a>
        </p>
      </div>
    </div>
  `,t.message.length===0&&o.setAttribute("contains-message","true"),o.querySelector(".col-2").appendChild(r),o.querySelector(".email-cancel-button-container").appendChild(i),o.style.maxHeight=await T(o.querySelector(".top-card-info"))+"px",e.appendChild(o)})),e}function E(n,e){const t="#content",o=e.querySelector(t),r=".toggle-content p",c=e.querySelector(r),i=".top-card-info",l=e.querySelector(i);s(o,t)&&s(c,r)&&s(l,i)&&(e.style.maxHeight=e.classList.toggle("expanded")?(l.scrollHeight+o.scrollHeight)/10+"rem":l.scrollHeight/10+"rem",n.toggleOpen(),c.innerText=o.classList.toggle("show")?"Dölj":"Visa")}async function T(n){const e=document.createElement("article");return e.innerHTML=n.outerHTML,e.style.position="absolute",e.style.pointerEvents="none",e.style.visibility="hidden",document.body.appendChild(e),await new Promise(t=>{setTimeout(()=>{t(e.offsetHeight),document.body.removeChild(e)},100)})}async function k(n){if(confirm("Vill du verkligen avboka den här reserveringen?")){const e=new u;try{await e.delete(n.dataset.id),n.remove()}catch(t){console.error(t)}}}function S(n){const e="section",t=document.querySelector(e);s(t,e)&&t.appendChild(n)}async function b(){await w()||window.location.replace("/hjort-cms/"),g(),h();const n=await v();if(!n)return;const e=await y(n);S(e),f()}b();
