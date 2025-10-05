const container = document.getElementById("posts");

const posts = [
  { id: "test", file: "test.md" },
];

posts.forEach(post => {
  fetch(`./posts/${post.file}`)
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
    })
    .catch(err => {
      console.error("无法加载文章:", post.file, err);
    });
});
