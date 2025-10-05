console.log("✅ blog-list.js loaded");

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("posts");
  if (!container) return console.error("❌ 未找到 #posts 容器");

  const username = "zhouzhen705";        // 👈 你的 GitHub 用户名
  const repo = "zhouzhen705.github.io";  // 👈 仓库名
  const path = "posts";                  // 👈 目标目录
  const api = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;

  try {
    console.log("📡 获取文章列表:", api);
    const res = await fetch(api);
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const files = await res.json();

    // 过滤 .md 文件
    const posts = files.filter(f => f.name.endsWith(".md"));

    if (!posts.length) {
      container.innerHTML = `<p class="muted">暂无文章。</p>`;
      return;
    }

    // 遍历生成卡片
    for (const post of posts) {
      const id = post.name.replace(".md", "");
      const contentRes = await fetch(`/posts/${post.name}`);
      const text = await contentRes.text();
      const preview = text.split("\n")[0].replace(/^#\s*/, ""); // 取首行标题

      const article = document.createElement("article");
      article.className = "card post";
      article.innerHTML = `
        <h3><a href="post.html?id=${id}">${preview || id}</a></h3>
        <p class="muted">${text.slice(0, 120).replace(/\n/g, " ")}...</p>
      `;
      container.appendChild(article);
    }

    console.log(`✅ 成功加载 ${posts.length} 篇文章`);

  } catch (err) {
    console.error("💥 加载文章列表失败:", err);
    container.innerHTML = `<p style='color:red;'>加载失败: ${err.message}</p>`;
  }
});
