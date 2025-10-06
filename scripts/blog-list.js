fetch('posts/index.json')
  .then(res => res.json())
  .then(posts => {
    const container = document.getElementById('posts');
    const buttons = document.querySelectorAll('.tag');

    renderPosts(posts); // 初始渲染

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tag = btn.getAttribute('data-tag');
        if (tag === 'all') {
          renderPosts(posts);
        } else {
          const filtered = posts.filter(p => p.tag === tag);
          renderPosts(filtered);
        }
      });
    });

    function renderPosts(list) {
      container.innerHTML = '';
      list.forEach(post => {
        const card = document.createElement('article');
        card.className = 'card post';
        card.innerHTML = `
          <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
          <p class="muted">${post.desc}</p>
        `;
        container.appendChild(card);
      });
    }
  })
  .catch(err => console.error('加载文章列表失败:', err));
