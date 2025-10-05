// scripts/blog-list.js
console.log("✅ blog-list.js loaded");

// 获取容器
const container = document.getElementById("posts");

if (container) {
  fetch("posts/index.json")
    .then(res => {
      if (!res.ok) throw new Error("无法加载 index.json");
      return res.json();
    })
    .then(posts => {
      if (!Array.isArray(posts) || posts.length === 0) {
        container.innerHTML = "<p class='muted'>暂无文章。</p>";
        return;
      }

      posts.forEach(post => {
        const el = document.createElement("article");
        el.className = "card post";
        el.innerHTML = `
          <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
          <p class="muted">${post.desc}</p>
          <div class="aph">${post.tag ? `标签：${post.tag}` : "点击阅读全文 →"}</div>
        `;
        container.appendChild(el);
      });
    })
    .catch(err => {
      console.error("❌ 加载文章列表失败:", err);
      container.innerHTML = "<p class='muted'>无法加载文章列表，请检查 index.json 路径。</p>";
    });
}
