document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('create-post');
    const postsList = document.getElementById('posts-list');

    let posts = [];

    postForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('post-title').value;
        const description = document.getElementById('post-description').value;
        const images = document.getElementById('post-images').files;

        if (images.length > 3) {
            alert('Solo puedes subir un máximo de 3 imágenes.');
            return;
        }

        const post = {
            id: Date.now(),
            title,
            description,
            images: [],
            comments: []
        };

        for (let i = 0; i < images.length; i++) {
            const reader = new FileReader();
            reader.onload = function (e) {
                post.images.push(e.target.result);
                if (post.images.length === images.length) {
                    savePost(post);
                }
            };
            reader.readAsDataURL(images[i]);
        }
    });

    function savePost(post) {
        posts.push(post);
        renderPosts();
        postForm.reset();
    }

    function renderPosts() {
        postsList.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <div class="images">
                    ${post.images.map(image => `<img src="${image}" alt="Imagen de la mascota">`).join('')}
                </div>
                <button onclick="editPost(${post.id})">Editar</button>
                <button onclick="deletePost(${post.id})">Eliminar</button>
                <div class="comments">
                    ${post.comments.map(comment => `
                        <div class="comment">
                            <p>${comment.text}</p>
                            <button onclick="deleteComment(${post.id}, ${comment.id})">Eliminar</button>
                        </div>
                    `).join('')}
                </div>
                <form class="comment-form" onsubmit="addComment(event, ${post.id})">
                    <input type="text" placeholder="Añadir un comentario" required>
                    <button type="submit">Comentar</button>
                </form>
            `;
            postsList.appendChild(postElement);
        });
    }

    window.editPost = function (postId) {
        const post = posts.find(p => p.id === postId);
        if (post) {
            document.getElementById('post-title').value = post.title;
            document.getElementById('post-description').value = post.description;
            deletePost(postId);
        }
    };

    window.deletePost = function (postId) {
        posts = posts.filter(p => p.id !== postId);
        renderPosts();
    };

    window.addComment = function (event, postId) {
        event.preventDefault();
        const commentText = event.target.querySelector('input').value;
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.comments.push({
                id: Date.now(),
                text: commentText
            });
            renderPosts();
        }
    };

    window.deleteComment = function (postId, commentId) {
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.comments = post.comments.filter(c => c.id !== commentId);
            renderPosts();
        }
    };
});