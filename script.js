
document.addEventListener("DOMContentLoaded",()=>{
  const menu=document.querySelector(".menu-btn"), nav=document.querySelector(".nav-links");
  if(menu) menu.addEventListener("click",()=>{nav.classList.toggle("open");menu.setAttribute("aria-expanded",nav.classList.contains("open"))});
  document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>nav?.classList.remove("open")));
  const current=location.pathname.split("/").pop()||"index.html";
  document.querySelectorAll(".nav-links a").forEach(a=>{
    const target=a.getAttribute("href")?.split("/").pop();
    if(target===current || (current===""&&target==="index.html")) a.classList.add("active");
  });
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
  document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
  const top=document.querySelector(".back-top");
  window.addEventListener("scroll",()=>top?.classList.toggle("show",scrollY>500));
  top?.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
  document.querySelectorAll("[data-filter]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.querySelectorAll("[data-filter]").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
      const filter=btn.dataset.filter;
      document.querySelectorAll("[data-category]").forEach(card=>card.style.display=(filter==="all"||card.dataset.category===filter)?"":"none");
    });
  });
  const form=document.querySelector("#contactForm");
  form?.addEventListener("submit",e=>{
    e.preventDefault();
    const name=form.querySelector("[name=name]").value.trim();
    const email=form.querySelector("[name=email]").value.trim();
    const subject=form.querySelector("[name=subject]").value.trim()||"Website enquiry";
    const message=form.querySelector("[name=message]").value.trim();
    const body=`Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
    window.location.href=`mailto:tmwbzbenson@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  });
});
