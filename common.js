// 年份
const y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();

// 订阅弹层逻辑（仅在页面存在时运行）
const sub = document.getElementById('subscribe');
const openSub = document.getElementById('open-sub');
const closeSub = document.getElementById('close-sub');

if (sub && closeSub) {
  if (openSub) {
    openSub.addEventListener('click', (e)=>{ 
      e.preventDefault(); 
      sub.hidden = false; 
      window.location.hash = 'subscribe';
    });
  }
  closeSub.addEventListener('click', ()=>{ 
    sub.hidden = true; 
    history.pushState("", document.title, window.location.pathname + window.location.search);
  });
}

// 联系表单
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault(); 
    alert('已收到，你可以在此接入表单服务或邮箱转发。'); 
  });
}

// 订阅表单
const subForm = document.getElementById('sub-form');
if (subForm && sub) {
  subForm.addEventListener('submit', (e)=>{
    e.preventDefault(); 
    alert('订阅成功（演示）。'); 
    sub.hidden = true;
  });
}

// 博客筛选（仅 blog 页面存在时生效）
const tagBtns = document.querySelectorAll('.tag');
const posts = document.querySelectorAll('#posts .post');
const search = document.getElementById('search');

let activeTag = 'all';
function applyFilter(){
  if (!posts.length) return;
  const q = (search && search.value ? search.value : '').toLowerCase();
  posts.forEach(p=>{
    const inTag = activeTag==='all' || (p.dataset.tags||'').includes(activeTag);
    const inSearch = !q || p.textContent.toLowerCase().includes(q);
    p.style.display = (inTag && inSearch) ? '' : 'none';
  });
}

if (tagBtns.length) {
  tagBtns.forEach(t=>{
    t.addEventListener('click', ()=>{
      tagBtns.forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      activeTag = t.dataset.tag;
      applyFilter();
    });
  });
}

if (search) search.addEventListener('input', applyFilter);


// 动态加载 Header 和 Footer
async function loadPartial(id, file) {
  try {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch (err) {
    console.error(`加载 ${file} 失败：`, err);
  }
}

loadPartial('site-header', 'header.html');
loadPartial('site-footer', 'footer.html');


// 自动高亮当前导航项
function highlightActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll("nav.menu a");

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (current === href || (current === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// 延迟执行，等待 header 加载完成
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(highlightActiveNav, 100);
});

