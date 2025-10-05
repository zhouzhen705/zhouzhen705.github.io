// 从 URL 读取参数 ?id=test 
const params = new URLSearchParams(window.location.search);
const id = params.get("id") || "test"; // 默认加载 test.md
const contentEl = document.getElementById("content");

// 从 posts 文件夹加载 Markdown 文件
fetch(`posts/${id}.md`)
  .then(res => {
    if (!res.ok) throw new Error("文章不存在或路径错误");
    return res.text();
  })
  .then(md => {
    // 使用 marked.js 解析 Markdown → HTML
    contentEl.innerHTML = marked.parse(md);
  })
  .catch(err => {
    contentEl.innerHTML = `<h2>未找到该文章</h2><p>${err.message}</p>`;
  });
