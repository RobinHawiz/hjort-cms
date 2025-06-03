import{a as k,i as L,b as M,c as T}from"./isResponseError-BKjdF__d.js";import{f as d,e as h,i as $,r as A}from"./isUserAuth-Dtue0U77.js";import{S as x,d as y}from"./displayError-qDOzf5us.js";class g{constructor(t="http://localhost:4000/api"){this.apiUrl=t}async getAllCourseMenues(){return await d(`${this.apiUrl}/public/course-menu`,{method:"GET",headers:{Authorization:"Bearer "+localStorage.getItem("token")}})}async getAllCoursesByMenuId(t){return await d(`${this.apiUrl}/public/course/${t}`,{method:"GET",headers:{Authorization:"Bearer "+localStorage.getItem("token")}})}async updateCourseMenu(t,e){const r={method:"PUT",headers:{Authorization:"Bearer "+localStorage.getItem("token"),"Content-Type":"application/json"},body:JSON.stringify(e)};await d(`${this.apiUrl}/protected/course-menu/${t}`,r)}async insertCourse(t){const e={method:"POST",headers:{Authorization:"Bearer "+localStorage.getItem("token"),"Content-Type":"application/json"},body:JSON.stringify(t)};await d(`${this.apiUrl}/protected/course`,e)}async updateCourse(t,e){const r={method:"PUT",headers:{Authorization:"Bearer "+localStorage.getItem("token"),"Content-Type":"application/json"},body:JSON.stringify(e)};await d(`${this.apiUrl}/protected/course/${t}`,r)}async deleteCourse(t){const e={method:"DELETE",headers:{Authorization:"Bearer "+localStorage.getItem("token")}};await d(`${this.apiUrl}/protected/course/${t}`,e)}}async function B(){const a=await I();return await Promise.all(a.map(async e=>{const r=await U(e.id);return{courseMenu:e,courses:r}}))}async function I(){try{return await new g().getAllCourseMenues()}catch(a){return console.error(a),[]}}async function U(a){try{return await new g().getAllCoursesByMenuId(a)}catch(t){return console.error(t),[]}}async function O(a){const t=document.createDocumentFragment();return a.forEach(e=>{const r=e.courseMenu,n=e.courses,i=document.createElement("form");i.dataset.id=r.id,i.innerHTML=`
              <form>
            <div class="input-box-wrapper">
              <h2 id="menu-title">Meny huvudrubrik</h2>
              <div class="input-box">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value="${h(r.title)}"
                  aria-labelledby="menu-title"
                />
              </div>
            </div>
            <div class="input-box-wrapper">
              <h3 id="starter-title">Förrätter</h3>
              <button
                type="button"
                data-type="starter"
                class="add-course"
                aria-label="Lägg till en maträtt"
              >
                <img src="../plus.svg" alt="Plus ikon" />
              </button>
            </div>
            <div class="input-box-wrapper">
              <h3 id="main-title">Huvudrätter</h3>
              <button
                type="button"
                data-type="main"
                class="add-course"
                aria-label="Lägg till en maträtt"
              >
                <img src="../plus.svg" alt="Plus ikon" />
              </button>
            </div>
            <div class="input-box-wrapper">
              <h3 id="dessert-title">Efterrätter</h3>
              <button
                type="button"
                data-type="dessert"
                class="add-course"
                aria-label="Lägg till en maträtt"
              >
                <img src="../plus.svg" alt="Plus ikon" />
              </button>
            </div>
            <div class="input-box-wrapper">
              <h3 id="price-title">Pris (kr)</h3>
              <div class="input-box">
                <input
                  type="text"
                  name="priceTot"
                  value="${r.priceTot}"
                  aria-labelledby="price-title"
                />
              </div>
            </div>
            <button type="submit" class="update" aria-label="Uppdatera meny">
              <img src="../refresh.svg" alt="Uppdatera ikon" />
              <p>Uppdatera</p>
            </button>
          </form>
    `;const m=i.querySelectorAll(".input-box-wrapper"),u=i.querySelectorAll("button.add-course");n.forEach(o=>{const s=w(o.name,o.type,"none",o.id),l=s.querySelector("input:nth-child(1)"),p=s.querySelector("input:nth-child(2)");l.addEventListener("input",()=>{b(p,"update")});const c=s.querySelector("button.delete");c.addEventListener("click",()=>{c.classList.toggle("to-be-deleted"),c.classList.contains("to-be-deleted")?(b(p,"delete"),l.classList.add("delete")):(b(p,"none"),l.classList.remove("delete"))}),S(m,u,s,o.type)}),u.forEach(o=>{o.addEventListener("click",()=>{const s=o.dataset.type,l=w("",s,"add");S(m,u,l,s)})}),i.addEventListener("submit",P),t.appendChild(i)}),t}async function P(a){var u;a.preventDefault();const t=a.submitter,e=new x(t),r=a.target,n=new FormData(r),i=new g,m={title:String(n.get("title")),priceTot:Number(n.get("priceTot"))};document.body.classList.remove("validation-error"),(u=document.querySelector(".error"))==null||u.classList.add("hide"),setTimeout(()=>{var o;(o=document.querySelector(".error"))==null||o.remove()},200),e.disable(),e.showLoader(),setTimeout(async()=>{try{await i.updateCourseMenu(r.dataset.id,m);const o=n.getAll("course"),s=n.getAll("id&type&op");await Promise.all(o.map(async(l,p)=>{const c=String(l),C=String(s[p]).split("&"),[f,v,E]=C;switch(E){case"add":await i.insertCourse({courseMenuId:r.dataset.id,name:c,type:v});break;case"update":await i.updateCourse(f,{name:c,type:v});break;case"delete":await i.deleteCourse(f);break;default:break}})),setTimeout(()=>{window.alert("Updateringen är färdig!"),location.reload()},1),e.enable(),e.hideLoader()}catch(o){e.enable(),e.hideLoader(),k(o[0])?(console.log(o),o[0].field==="name"?y(document.body,"Ett inmatningsfält är tomt. Alla fält måste vara ifyllda om du vill lägga till eller uppdatera maträtter."):o[0].field==="network"?y(document.body,"Det uppstod ett nätverksfel. Kontrollera din internetanslutning."):y(document.body,"Det uppstod ett oväntat fel. Vänligen uppdatera sidan.")):y(document.body,"Unexpected app error")}},400)}function b(a,t){let[e,r,n]=a.value.split("&");n=t,a.value=[e,r,n].join("&")}function w(a,t,e,r=""){const n=document.createElement("div");return n.classList.add("input-box"),r.length!==0?n.innerHTML=`
                <input
                  type="text"
                  name="course"
                  value="${h(a)}"
                  aria-labelledby="${t}-title"
                />
                <input
                  type="hidden"
                  name="id&type&op"
                  value="${r}&${t}&${e}"
                />
                <button
                  type="button"
                  class="delete"
                  aria-label="Ta bort maträtt"
                >
                  <img src="../trash.svg" alt="Skräpkorg ikon" />
                </button>
    `:n.innerHTML=`
                <input
                  type="text"
                  name="course"
                  value="${h(a)}"
                  aria-labelledby="${t}-title"
                />
                <input
                  type="hidden"
                  name="id&type&op"
                  value="null&${t}&${e}"
                />
    `,n}function S(a,t,e,r){r==="starter"?a[1].insertBefore(e,t[0]):r==="main"?a[2].insertBefore(e,t[1]):a[3].insertBefore(e,t[2])}function D(a){const t=".form-container",e=document.querySelector(t);L(e,t)&&e.appendChild(a)}async function q(){await $()||window.location.replace("/hjort-cms/"),M(),T(),A();const a=await B(),t=await O(a);D(t)}q();
