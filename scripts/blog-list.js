// 博客容器
const container = document.getElementById("posts");

// 手动列出文章（也可以改成自动 fetch JSON）
const posts = [
  { id: "test", file: "test.md" },
  // 未来每篇文章在这里加一行，如：
  // { id: "orderflow-mindset", file: "orderflow-mindset.md" },
];

// 加载每篇文章标题（从 Markdown 第一行提取）
posts.forEach(post => {
  fetch(`posts/${post.file}`)
    .then(res => res.text())
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
    });
});
