import{a as D,i as x,b as I,c as U}from"./isResponseError-eh5yk8Zt.js";import{f as p,e as h,i as C,r as O}from"./isUserAuth-DfdnJVv7.js";import{S as A,d as b}from"./displayError-qDOzf5us.js";const P="https://hjort-backend.azurewebsites.net/api",j=P;class w{constructor(e=j){this.apiUrl=e}async getAllCourseMenues(){return await p(`${this.apiUrl}/public/course-menu`,{method:"GET",headers:{Authorization:"Bearer "+localStorage.getItem("token")}})}async getAllCoursesByMenuId(e){return await p(`${this.apiUrl}/public/course/${e}`,{method:"GET",headers:{Authorization:"Bearer "+localStorage.getItem("token")}})}async updateCourseMenu(e,t){const r={method:"PUT",headers:{Authorization:"Bearer "+localStorage.getItem("token"),"Content-Type":"application/json"},body:JSON.stringify(t)};await p(`${this.apiUrl}/protected/course-menu/${e}`,r)}async insertCourse(e){const t={method:"POST",headers:{Authorization:"Bearer "+localStorage.getItem("token"),"Content-Type":"application/json"},body:JSON.stringify(e)};await p(`${this.apiUrl}/protected/course`,t)}async updateCourse(e,t){const r={method:"PUT",headers:{Authorization:"Bearer "+localStorage.getItem("token"),"Content-Type":"application/json"},body:JSON.stringify(t)};await p(`${this.apiUrl}/protected/course/${e}`,r)}async deleteCourse(e){const t={method:"DELETE",headers:{Authorization:"Bearer "+localStorage.getItem("token")}};await p(`${this.apiUrl}/protected/course/${e}`,t)}}const q="https://hjort-backend.azurewebsites.net/api",z=q;class S{constructor(e=z){this.apiUrl=e}async getAllDrinkMenues(){return await p(`${this.apiUrl}/public/drink-menu`,{method:"GET",headers:{Authorization:"Bearer "+localStorage.getItem("token")}})}async getAllDrinksByMenuId(e){return await p(`${this.apiUrl}/public/drink/${e}`,{method:"GET",headers:{Authorization:"Bearer "+localStorage.getItem("token")}})}async updateDrinkMenu(e,t){const r={method:"PUT",headers:{Authorization:"Bearer "+localStorage.getItem("token"),"Content-Type":"application/json"},body:JSON.stringify(t)};await p(`${this.apiUrl}/protected/drink-menu/${e}`,r)}async insertDrink(e){const t={method:"POST",headers:{Authorization:"Bearer "+localStorage.getItem("token"),"Content-Type":"application/json"},body:JSON.stringify(e)};await p(`${this.apiUrl}/protected/drink`,t)}async updateDrink(e,t){const r={method:"PUT",headers:{Authorization:"Bearer "+localStorage.getItem("token"),"Content-Type":"application/json"},body:JSON.stringify(t)};await p(`${this.apiUrl}/protected/drink/${e}`,r)}async deleteDrink(e){const t={method:"DELETE",headers:{Authorization:"Bearer "+localStorage.getItem("token")}};await p(`${this.apiUrl}/protected/drink/${e}`,t)}}async function F(){const n=await H();return await Promise.all(n.map(async t=>{const r=await N(t.id);return{courseMenu:t,courses:r}}))}async function H(){try{return await new w().getAllCourseMenues()}catch(n){return console.error(n),[]}}async function N(n){try{return await new w().getAllCoursesByMenuId(n)}catch(e){return console.error(e),[]}}function _(n){const e=document.createDocumentFragment();return n.forEach(t=>{const r=t.courseMenu,i=t.courses,o=document.createElement("form");o.dataset.id=r.id,o.innerHTML=`
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
                  type="number"
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
    `;const d=o.querySelectorAll(".input-box-wrapper"),c=o.querySelectorAll("button.add-course");i.forEach(a=>{const s=L(a.name,a.type,"none",a.id),l=s.querySelector("input:nth-child(1)"),m=s.querySelector("input:nth-child(2)");l.addEventListener("input",()=>{f(m,"update")});const u=s.querySelector("button.delete");u.addEventListener("click",()=>{u.classList.toggle("to-be-deleted"),u.classList.contains("to-be-deleted")?(f(m,"delete"),l.classList.add("delete")):(f(m,"none"),l.classList.remove("delete"))}),T(d,c,s,a.type)}),c.forEach(a=>{a.addEventListener("click",()=>{const s=a.dataset.type,l=L("",s,"add");T(d,c,l,s)})}),o.addEventListener("submit",R),e.appendChild(o)}),e}async function R(n){var c;n.preventDefault();const e=n.submitter,t=new A(e),r=n.target,i=new FormData(r),o=new w,d={title:String(i.get("title")),priceTot:Number(i.get("priceTot"))};document.body.classList.remove("validation-error"),(c=document.querySelector(".error"))==null||c.classList.add("hide"),setTimeout(()=>{var a;(a=document.querySelector(".error"))==null||a.remove()},200),t.disable(),t.showLoader(),setTimeout(async()=>{try{await o.updateCourseMenu(r.dataset.id,d);const a=i.getAll("course"),s=i.getAll("id&type&op");await Promise.all(a.map(async(l,m)=>{const u=String(l),y=String(s[m]).split("&"),[g,k,B]=y;switch(B){case"add":await o.insertCourse({courseMenuId:r.dataset.id,name:u,type:k});break;case"update":await o.updateCourse(g,{name:u,type:k});break;case"delete":await o.deleteCourse(g);break;default:break}})),setTimeout(()=>{window.alert("Updateringen är färdig!"),location.reload()},1),t.enable(),t.hideLoader()}catch(a){t.enable(),t.hideLoader(),D(a[0])?["title","priceTot","name","type","courseMenuId"].includes(a[0].field)?b(document.body,a[0].message):a[0].field==="network"?b(document.body,"Det uppstod ett nätverksfel. Kontrollera din internetanslutning."):b(document.body,"Det uppstod ett oväntat fel. Vänligen uppdatera sidan."):b(document.body,"Unexpected app error")}},400)}function f(n,e){let[t,r,i]=n.value.split("&");i=e,n.value=[t,r,i].join("&")}function L(n,e,t,r=""){const i=document.createElement("div");return i.classList.add("input-box"),r.length!==0?i.innerHTML=`
                <input
                  type="text"
                  name="course"
                  value="${h(n)}"
                  aria-labelledby="${e}-title"
                />
                <input
                  type="hidden"
                  name="id&type&op"
                  value="${r}&${e}&${t}"
                />
                <button
                  type="button"
                  class="delete"
                  aria-label="Ta bort maträtt"
                >
                  <img src="../trash.svg" alt="Skräpkorg ikon" />
                </button>
    `:i.innerHTML=`
                <input
                  type="text"
                  name="course"
                  value="${h(n)}"
                  aria-labelledby="${e}-title"
                />
                <input
                  type="hidden"
                  name="id&type&op"
                  value="null&${e}&${t}"
                />
    `,i}function T(n,e,t,r){r==="starter"?n[1].insertBefore(t,e[0]):r==="main"?n[2].insertBefore(t,e[1]):n[3].insertBefore(t,e[2])}function $(n){const e=".form-container",t=document.querySelector(e);x(t,e)&&t.appendChild(n)}async function J(){const n=await G();return await Promise.all(n.map(async t=>{const r=await K(t.id);return{drinkMenu:t,drinks:r}}))}async function G(){try{return await new S().getAllDrinkMenues()}catch(n){return console.error(n),[]}}async function K(n){try{return await new S().getAllDrinksByMenuId(n)}catch(e){return console.error(e),[]}}function V(n){const e=document.createDocumentFragment();return n.forEach((t,r)=>{const i=t.drinkMenu,o=t.drinks,d=document.createElement("form");d.dataset.id=i.id,d.innerHTML=`
              <form>
            <div class="input-box-wrapper">
              <h2 id="drink-menu-title">Rubrik för dryckeslista ${r+1}</h2>
              <div class="input-box">
                <input
                  type="text"
                  name="title"
                  value="${h(i.title)}"
                  aria-labelledby="drink-menu-title"
                />
              </div>
            </div>
            <div class="input-box-wrapper">
              <h3 id="drink-menu-subtitle">Listans underrubrik</h3>
              <div class="input-box">
                <input
                  type="text"
                  name="subtitle"
                  value="${h(i.subtitle)}"
                  aria-labelledby="drink-menu-subtitle"
                />
              </div>
            </div>
            <div class="input-box-wrapper">
              <h3 id="drinks-title">Drycker</h3>
              <button
                type="button"
                class="add-drink"
                aria-label="Lägg till en dryck"
              >
                <img src="../plus.svg" alt="Plus ikon" />
              </button>
            </div>
            <div class="input-box-wrapper">
              <h3 id="price-title">Pris (kr)</h3>
              <div class="input-box">
                <input
                  type="number"
                  name="priceTot"
                  value="${i.priceTot}"
                  aria-labelledby="price-title"
                />
              </div>
            </div>
            <button type="submit" class="update" aria-label="Uppdatera meny">
              <img src="../refresh.svg" alt="Uppdatera ikon" />
              <p>Uppdatera</p>
            </button>
          </form>
    `;const c=d.querySelector(".input-box-wrapper:nth-child(3)"),a=d.querySelector("button.add-drink");o.forEach(s=>{const l=M(s.name,"none",s.id),m=l.querySelector("input:nth-child(1)"),u=l.querySelector("input:nth-child(2)");m.addEventListener("input",()=>{v(u,"update")});const y=l.querySelector("button.delete");y.addEventListener("click",()=>{y.classList.toggle("to-be-deleted"),y.classList.contains("to-be-deleted")?(v(u,"delete"),m.classList.add("delete")):(v(u,"none"),m.classList.remove("delete"))}),E(c,a,l)}),a.addEventListener("click",()=>{const s=M("","add");E(c,a,s)}),d.addEventListener("submit",Q),e.appendChild(d)}),e}async function Q(n){var c;n.preventDefault();const e=n.submitter,t=new A(e),r=n.target,i=new FormData(r),o=new S,d={title:String(i.get("title")),subtitle:String(i.get("subtitle")),priceTot:Number(i.get("priceTot"))};document.body.classList.remove("validation-error"),(c=document.querySelector(".error"))==null||c.classList.add("hide"),setTimeout(()=>{var a;(a=document.querySelector(".error"))==null||a.remove()},200),t.disable(),t.showLoader(),setTimeout(async()=>{try{await o.updateDrinkMenu(r.dataset.id,d);const a=i.getAll("drink"),s=i.getAll("id&op");await Promise.all(a.map(async(l,m)=>{const u=String(l),y=String(s[m]).split("&"),[g,k]=y;switch(k){case"add":await o.insertDrink({drinkMenuId:r.dataset.id,name:u});break;case"update":await o.updateDrink(g,{name:u});break;case"delete":await o.deleteDrink(g);break;default:break}})),setTimeout(()=>{window.alert("Updateringen är färdig!"),location.reload()},1),t.enable(),t.hideLoader()}catch(a){t.enable(),t.hideLoader(),D(a[0])?["title","subtitle","priceTot","name","drinkMenuId"].includes(a[0].field)?b(document.body,a[0].message):a[0].field==="network"?b(document.body,"Det uppstod ett nätverksfel. Kontrollera din internetanslutning."):b(document.body,"Det uppstod ett oväntat fel. Vänligen uppdatera sidan."):b(document.body,"Unexpected app error")}},400)}function v(n,e){let[t,r]=n.value.split("&");r=e,n.value=[t,r].join("&")}function M(n,e,t=""){const r=document.createElement("div");return r.classList.add("input-box"),t.length!==0?r.innerHTML=`
                <input
                  type="text"
                  name="drink"
                  value="${h(n)}"
                  aria-labelledby="drinks-title"
                />
                <input
                  type="hidden"
                  name="id&op"
                  value="${t}&${e}"
                />
                <button
                  type="button"
                  class="delete"
                  aria-label="Ta bort dryck"
                >
                  <img src="../trash.svg" alt="Skräpkorg ikon" />
                </button>
    `:r.innerHTML=`
                <input
                  type="text"
                  name="drink"
                  value="${h(n)}"
                  aria-labelledby="drinks-title"
                />
                <input
                  type="hidden"
                  name="id&op"
                  value="null&${e}"
                />
    `,r}function E(n,e,t){n.insertBefore(t,e)}async function W(){await C()||window.location.replace("/hjort-cms/"),I(),U();const[n,e]=await Promise.all([F(),J()]),t=_(n),r=V(e);O(),$(t),$(r)}W();
