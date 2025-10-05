// 博客容器
const container = document.getElementById("posts");

// 文章列表（可以继续扩展）
const posts = [
  { id: "test", file: "test.md" },
];

// 加载每篇文章标题（从 Markdown 第一行提取）
posts.forEach(post => {
  // ✅ 改为从根目录加载（解决 404 问题）
  fetch(`./posts/${post.file}`)
    .then(res => {
      if (!res.ok) throw new Error(`无法加载 ${post.file}`);
      return res.text();
    })
    .then(md => {
      const title = md.match(/^# (.*)/)?.[1] || "未命名文章";
      const summary = md.split("\n")[2] || "";
      const card = document.createElement("article");
      card.className = "card post";
      card.innerHTML = `
        <a href="post.html?id=${post.id}">
          <h3>${title}</h3>
        </a>
        <p class="muted">${summary}</p>
      `;
      container.appendChild(card);
    })
    .catch(err => {
      console.error(err);
      const errorMsg = document.createElement("p");
      errorMsg.textContent = "⚠️ 文章加载失败：" + err.message;
      container.appendChild(errorMsg);
    });
});
