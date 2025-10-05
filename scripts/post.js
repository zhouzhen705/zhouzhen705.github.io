// scripts/post.js
console.log("✅ post.js loaded");

function getPostId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadPost() {
  const id = getPostId();
  if (!id) {
    document.getElementById("content").innerHTML = "<h2>❌ 未找到文章 ID。</h2>";
    return;
  }

  const filePath = `posts/${id}.md`;
  console.log(`🔍 Fetching: ${filePath}`);

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error("文章不存在或路径错误");

    const markdown = await response.text();
    const html = marked.parse(markdown);
    document.getElementById("content").innerHTML = html;

    // 更新标题
    document.title = `${id} — Kim`;

  } catch (error) {
    console.error("❌ 加载失败:", error);
    document.getElementById("content").innerHTML = "<h2>文章加载失败，请检查路径或文件名。</h2>";
  }
}

loadPost();
