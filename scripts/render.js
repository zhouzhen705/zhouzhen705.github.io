console.log("✅ render.js loaded");

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.body.innerHTML = "<p style='color:red;text-align:center;'>❌ 无效的文章链接。</p>";
    return;
  }

  const filePath = `/posts/${id}.md`;
  console.log("📄 正在加载文章:", filePath);

  try {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();

    // 转换 Markdown → HTML
    const html = marked.parse(text);

    document.title = `Blog — ${id} | Kim`;
    document.getElementById("content").innerHTML = html;
    console.log("✅ 渲染完成");

  } catch (err) {
    console.error("💥 加载失败:", err);
    document.getElementById("content").innerHTML = `<p style='color:red;'>加载文章失败: ${err.message}</p>`;
  }
});
