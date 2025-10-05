console.log("✅ blog-list.js loaded");

// 等待 DOM 完全加载后再执行
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("posts");
  if (!container) {
    console.error("❌ 没找到 id='posts' 的容器，检查 blog.html 是否一致");
    return;
  }

  try {
    console.log("📄 正在尝试加载 Markdown: ./posts/test.md");

    const res = await fetch("./posts/test.md");
    console.log("🔢 fetch status:", res.status);
    const text = await res.text();
    console.log("📜 读取的前100字符:", text.slice(0, 100));

    // 如果成功读取文件，就生成卡片
    if (res.ok) {
      const article = document.createElement("article");
      article.className = "card post";
      article.innerHTML = `
        <h3><a href="post.html?id=test">测试文章</a></h3>
        <p class="muted">${text.slice(0, 120)}...</p>
      `;
      container.appendChild(article);
      console.log("✅ 成功添加测试文章卡片");
    } else {
      console.warn("⚠️ 没找到 ./posts/test.md 文件");
    }

  } catch (err) {
    console.error("💥 加载博客列表失败:", err);
  }
});
