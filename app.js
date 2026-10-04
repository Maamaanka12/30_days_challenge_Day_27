/* Shared logic for the Somali Jobs multi-page site. */
const JOBS=[
 {t:"Frontend Developer Intern",c:"Hormuud Telecom",l:"Mogadishu",y:"Internship",p:450,s:"6 mo · React + CSS",col:"#24473A",d:"Ship real pages with the web team. Mentor plus stipend."},
 {t:"Junior UI Designer",c:"Beco Energy",l:"Hybrid",y:"Full-time",p:900,s:"Figma · Design systems",col:"#C65D3B",d:"Own landing pages and dashboards from sketch to ship."},
 {t:"Customer Support (Remote)",c:"Salaam Bank",l:"Remote",y:"Part-time",p:600,s:"Evenings · English + Somali",col:"#8A5A00",d:"Help customers over chat. Laptop and training provided."},
 {t:"Data Entry Assistant",c:"Dahabshiil",l:"Hargeisa",y:"Contract",p:550,s:"3 mo · Excel",col:"#5B4A8A",d:"Keep transfer records spotless. Fast typing wins."},
 {t:"Delivery Operations",c:"Wabi Logistics",l:"Mogadishu",y:"Full-time",p:700,s:"Ops · Field",col:"#1F6E6B",d:"Coordinate riders and keep parcels moving on time."},
 {t:"Barista — Weekends",c:"Café Arax",l:"Mogadishu",y:"Part-time",p:300,s:"Sat–Sun · Training",col:"#7C3F21",d:"Pull shots, learn latte art, keep the morning rush happy."},
 {t:"Junior Backend (Node.js)",c:"Sahal Tech",l:"Remote",y:"Full-time",p:1200,s:"Node · Postgres",col:"#1E2B23",d:"Build APIs for fintech tools used across the region."},
 {t:"Social Media Assistant",c:"Somtel",l:"Nairobi",y:"Contract",p:650,s:"Content · CapCut",col:"#A33A5B",d:"Shoot, cut, and post daily stories people watch."},
 {t:"IT Support Technician",c:"Univ. Helpdesk",l:"Hargeisa",y:"Internship",p:350,s:"On-site · Entry level",col:"#4E6B2A",d:"Fix laptops, reset networks, save the day daily."}
];
const COMPS=[
 {n:"Hormuud Telecom",m:"142 open roles · Telecom · Mogadishu",d:"The country's largest carrier — big engineering crew, fast promotions."},
 {n:"Salaam Bank",m:"86 open roles · Fintech · Remote-first",d:"Modern banking tools with a friendly support-first culture."},
 {n:"Sahal Tech",m:"24 open roles · Startup · Remote",d:"Small senior team shipping fintech APIs. Learn a ton, quickly."},
 {n:"Beco Energy",m:"41 open roles · Energy · Hybrid",d:"Design-led utility bringing reliable power to more homes."},
 {n:"Dahabshiil",m:"63 open roles · Finance · Hargeisa",d:"Global transfers with rigorous ops — a great first office job."},
 {n:"Wabi Logistics",m:"37 open roles · Logistics · Mogadishu",d:"Field-heavy ops crew. Perfect if you like moving things."}
];
let filter="All",sort="new",q="",loc="",typ="";
let saved=new Set(JSON.parse(localStorage.getItem("sb_v3")||"[]"));
const $=id=>document.getElementById(id);
function money(n){return "$"+n.toLocaleString()+"/mo";}
function initials(n){return n.split(" ").map(w=>w[0]).slice(0,2).join("");}
function toast(m){const t=$("toast");if(!t)return;t.textContent=m;t.classList.add("show");clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove("show"),2200);}
function filtered(){let r=JOBS.map((j,i)=>({...j,i}));if(filter!=="All")r=r.filter(j=>j.y===filter);if(typ)r=r.filter(j=>j.y===typ);if(loc)r=r.filter(j=>j.l===loc);if(q)r=r.filter(j=>(j.t+" "+j.c+" "+j.s+" "+j.d).toLowerCase().includes(q));r.sort((a,b)=>sort==="pay"?b.p-a.p:a.i-b.i);return r;}
function renderJobs(){
 const grid=$("jobGrid");if(!grid){updateSaved();return;}
 const r=filtered();
 const rl=$("resultLine");if(rl)rl.textContent=r.length+" of "+JOBS.length+" roles shown";
 grid.innerHTML=r.length?r.map(j=>`
  <article class="jobrow">
   <div><h3>${j.t}</h3><div class="co">${j.c} · ${j.l} · ${j.s}</div>
   <p class="desc">${j.d}</p></div>
   <div class="side"><span class="pay">${money(j.p)}</span><span class="type">${j.y}</span>
   <div class="rowactions"><button class="apply" data-apply="${j.i}">Apply</button>
   <button class="saveb ${saved.has(j.i)?"kept":""}" data-save="${j.i}">${saved.has(j.i)?"Saved":"Save"}</button></div></div>
  </article>`).join(''):`<div class="empty">No roles match these filters. <button class="chip" id="reset">Reset</button></div>`;
 const rs=$("reset");
 if(rs)rs.onclick=()=>{q="";loc="";typ="";filter="All";["q","loc","typ"].forEach(id=>{const el=$(id);if(el)el.value="";});document.querySelectorAll('.chip[data-f]').forEach(c=>c.classList.toggle("on",c.dataset.f==="All"));renderJobs();};
 updateSaved();
}
function updateSaved(){
 const a=$("savedCount"),b=$("savedCount2");if(a)a.textContent=saved.size;if(b)b.textContent=saved.size;
 const sl=$("savedList");if(!sl)return;
 sl.innerHTML=saved.size?[...saved].map(i=>{const j=JOBS[i];return `<div style="border:1px solid var(--line);border-radius:8px;padding:12px;background:#fff"><b>${j.t}</b><div style="font-size:12.5px;color:var(--muted)">${j.c} · ${money(j.p)}</div><div style="display:flex;gap:8px;margin-top:8px"><button class="apply" data-apply="${i}">Apply</button><button class="saveb" data-save="${i}">Remove</button></div></div>`;}).join(''):'<p style="color:var(--muted);font-size:14px">No saved roles yet.</p>';
 try{localStorage.setItem("sb_v3",JSON.stringify([...saved]));}catch(e){}
}
function renderComps(){
 const g=$("compGrid");if(!g)return;
 g.innerHTML=COMPS.map(c=>`<div class="comprow"><span class="cinit">${initials(c.n)}</span><div class="grow"><h3>${c.n}</h3><div class="m">${c.m}</div><p>${c.d}</p></div><button class="saveb" data-follow="${c.n}">Follow</button></div>`).join('');
}
document.addEventListener("click",e=>{
 const s=e.target.closest("[data-save]");
 if(s){const i=+s.dataset.save;saved.has(i)?(saved.delete(i),toast("Removed from saved")):(saved.add(i),toast("Saved — see Saved"));renderJobs();return;}
 const a=e.target.closest("[data-apply]");
 if(a){openModal(+a.dataset.apply);return;}
 const c=e.target.closest(".chip[data-f]");
 if(c){filter=c.dataset.f;document.querySelectorAll('.chip[data-f]').forEach(x=>x.classList.toggle("on",x===c));renderJobs();return;}
 const f=e.target.closest("[data-follow]");
 if(f){toast("Following "+f.dataset.follow+" — we will ping you");return;}
 const cat=e.target.closest("[data-cat]");
 if(cat){try{localStorage.setItem("sb_prefilter",cat.dataset.cat);}catch(e){} location.href="jobs.html";return;}
});
function bindControls(){
 const form=$("searchForm");
 if(form)form.addEventListener("submit",e=>{e.preventDefault();q=($("q").value||"").trim().toLowerCase();loc=$("loc").value;typ=$("typ").value;
   if(form.dataset.goto==="jobs"){try{localStorage.setItem("sb_q",q);localStorage.setItem("sb_loc",loc);localStorage.setItem("sb_typ",typ);}catch(e){} location.href="jobs.html";return;}
   if(typ){filter=typ;document.querySelectorAll('.chip[data-f]').forEach(x=>x.classList.toggle("on",x.dataset.f===typ));}
   renderJobs();const j=$("jobsTitle");if(j)j.scrollIntoView({behavior:"smooth"});});
 const qi=$("q");if(qi&&!form?.dataset.goto)qi.addEventListener("input",e=>{q=e.target.value.trim().toLowerCase();renderJobs();});
 const lo=$("loc");if(lo&&!form?.dataset.goto)lo.addEventListener("change",e=>{loc=e.target.value;renderJobs();});
 const ty=$("typ");if(ty&&!form?.dataset.goto)ty.addEventListener("change",e=>{typ=e.target.value;if(typ){filter=typ;document.querySelectorAll('.chip[data-f]').forEach(x=>x.classList.toggle("on",x.dataset.f===typ));}renderJobs();});
 const so=$("sort");if(so)so.addEventListener("change",e=>{sort=e.target.value;renderJobs();});
 const fa=$("followAll");if(fa)fa.addEventListener("click",()=>toast("Following all 6 companies ✓"));
}
// restore prefilter on jobs page
try{
 const pf=localStorage.getItem("sb_prefilter");
 if(pf&&$("jobGrid")){filter=pf;localStorage.removeItem("sb_prefilter");}
 const sq=localStorage.getItem("sb_q"),sl=localStorage.getItem("sb_loc"),st=localStorage.getItem("sb_typ");
 if($("jobGrid")&&(sq||sl||st)){q=sq||"";loc=sl||"";typ=st||"";if(typ)filter=typ;["sb_q","sb_loc","sb_typ"].forEach(k=>localStorage.removeItem(k));}
}catch(e){}
// drawer + modal + burger
let applying=null;
function openDrawer(){const d=$("drawer"),s=$("scrim");if(d)d.classList.add("open");if(s)s.classList.add("show");}
function closeAll(){["drawer","modal"].forEach(id=>{const el=$(id);if(el)el.classList.remove("open","show");});const s=$("scrim");if(s)s.classList.remove("show");}
function openModal(i){applying=i;$("modalTitle").textContent="Apply — "+JOBS[i].t;$("modal").classList.add("show");$("scrim").classList.add("show");setTimeout(()=>$("aname").focus(),60);}
document.addEventListener("DOMContentLoaded",()=>{
 bindControls();
 if($("jobGrid")){
   const qi=$("q"),lo=$("loc"),ty=$("typ");
   if(qi)qi.value=q;if(lo)lo.value=loc;if(ty)ty.value=typ;
   document.querySelectorAll('.chip[data-f]').forEach(x=>x.classList.toggle("on",x.dataset.f===filter));
 }
 renderJobs();renderComps();
 const os=$("openSaved"),cs=$("closeSaved"),sc=$("scrim"),cm=$("closeModal"),af=$("applyForm"),bg=$("burger");
 if(os)os.onclick=openDrawer;if(cs)cs.onclick=closeAll;if(sc)sc.onclick=closeAll;if(cm)cm.onclick=closeAll;
 if(af)af.onsubmit=e=>{e.preventDefault();closeAll();toast("Application sent to "+JOBS[applying].c+" ✓");e.target.reset();};
 if(bg)bg.onclick=()=>{const n=$("mobileNav");if(n)n.style.display=n.style.display==="flex"?"none":"flex";};
 document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAll();});
});
