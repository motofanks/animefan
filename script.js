document.addEventListener('DOMContentLoaded', () => {
    const homeBtn = document.getElementById('homeBtn');
    const profileBtn = document.getElementById('profileBtn');
    const homeSection = document.getElementById('home');
    const profileSection = document.getElementById('profile');
    const postForm = document.getElementById('postForm');
    const postContent = document.getElementById('postContent');
    const postsContainer = document.getElementById('posts');

    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    function showHome() {
        homeSection.style.display = 'block';
        profileSection.style.display = 'none';
        renderPosts();
    }

    function showProfile() {
        homeSection.style.display = 'none';
        profileSection.style.display = 'block';
    }

    function addPost(content) {
        const post = {
            id: Date.now(),
            content: content,
            timestamp: new Date().toLocaleString()
        };
        posts.unshift(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
    }

    function renderPosts() {
        postsContainer.innerHTML = posts.map(post => `
            <div class="post">
                <p>${post.content}</p>
                <small>${post.timestamp}</small>
            </div>
        `).join('');
    }

    homeBtn.addEventListener('click', showHome);
    profileBtn.addEventListener('click', showProfile);

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (postContent.value.trim()) {
            addPost(postContent.value);
            postContent.value = '';
            showHome();
        }
    });

    showHome(); // 初期表示
});
