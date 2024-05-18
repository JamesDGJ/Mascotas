// Función para publicar un nuevo post
function publicarPost() {
  const postContent = document.getElementById("postContent").value.trim();
  const fileInput = document.getElementById("imageUpload");
  const imageFile = fileInput.files[0];
  const location = document.getElementById("locationInput").value.trim();

  if (postContent === "" && !imageFile) {
    alert("Por favor, escribe algo o selecciona una imagen antes de publicar.");
    return;
  }

  const newPost = document.createElement("div");
  newPost.className = "post";

  const timestamp = new Date().toLocaleString();
  newPost.dataset.timestamp = timestamp;

  if (postContent !== "") {
    const postText = document.createElement("p");
    postText.textContent = postContent;
    newPost.appendChild(postText);
  }

  if (imageFile) {
    const postImage = document.createElement("img");
    postImage.src = URL.createObjectURL(imageFile);
    postImage.style.maxWidth = "100%";
    newPost.appendChild(postImage);
  }

  if (location !== "") {
    const postLocation = document.createElement("p");
    postLocation.textContent = `Ubicación: ${location}`;
    newPost.appendChild(postLocation);
  }

  const postTimestamp = document.createElement("p");
  postTimestamp.textContent = `Publicado el: ${timestamp}`;
  newPost.appendChild(postTimestamp);

  const likeButton = document.createElement("span");
  likeButton.className = "like-btn";
  likeButton.textContent = "Me gusta";
  likeButton.onclick = function () {
    this.textContent = this.textContent === "Me gusta" ? "Ya no me gusta" : "Me gusta";
  };
  newPost.appendChild(likeButton);

  const commentButton = document.createElement("span");
  commentButton.className = "comment-btn";
  commentButton.textContent = "Comentar";
  commentButton.onclick = function () {
    const commentText = prompt("Escribe tu comentario:");
    if (commentText) {
      const comment = document.createElement("div");
      comment.className = "comment";
      comment.textContent = commentText;
      newPost.querySelector(".comments").appendChild(comment);
    }
  };
  newPost.appendChild(commentButton);

  const deleteButton = document.createElement("span");
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Eliminar";
  deleteButton.onclick = function () {
    eliminarPost(this);
  };
  newPost.appendChild(deleteButton);

  const commentsContainer = document.createElement("div");
  commentsContainer.className = "comments";
  newPost.appendChild(commentsContainer);

  const postsContainer = document.getElementById("postsContainer");
  postsContainer.appendChild(newPost);

  document.getElementById("postContent").value = "";
  document.getElementById("locationInput").value = "";
  fileInput.value = "";
}

function eliminarPost(element) {
  const post = element.parentNode;
  post.parentNode.removeChild(post);
}

// Inicializar la carga de publicaciones (dummy posts)
document.addEventListener('DOMContentLoaded', () => {
  loadDummyPosts();
});

function loadDummyPosts() {
  
  dummyPosts.forEach(post => {
    const newPost = document.createElement("div");
    newPost.className = "post";

    const postText = document.createElement("p");
    postText.textContent = post.content;
    newPost.appendChild(postText);

    if (post.imageUrl) {
      const postImage = document.createElement("img");
      postImage.src = post.imageUrl;
      postImage.style.maxWidth = "100%";
      newPost.appendChild(postImage);
    }

    const postLocation = document.createElement("p");
    postLocation.textContent = `Ubicación: ${post.location}`;
    newPost.appendChild(postLocation);

    const postTimestamp = document.createElement("p");
    postTimestamp.textContent = `Publicado el: ${post.timestamp}`;
    newPost.appendChild(postTimestamp);

    const likeButton = document.createElement("span");
    likeButton.className = "like-btn";
    likeButton.textContent = "Me gusta";
    likeButton.onclick = function () {
      this.textContent = this.textContent === "Me gusta" ? "Ya no me gusta" : "Me gusta";
    };
    newPost.appendChild(likeButton);

    const commentButton = document.createElement("span");
    commentButton.className = "comment-btn";
    commentButton.textContent = "Comentar";
    commentButton.onclick = function () {
      const commentText = prompt("Escribe tu comentario:");
      if (commentText) {
        const comment = document.createElement("div");
        comment.className = "comment";
        comment.textContent = commentText;
        newPost.querySelector(".comments").appendChild(comment);
      }
    };
    newPost.appendChild(commentButton);

    const deleteButton = document.createElement("span");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Eliminar";
    deleteButton.onclick = function () {
      eliminarPost(this);
    };
    newPost.appendChild(deleteButton);

    const commentsContainer = document.createElement("div");
    commentsContainer.className = "comments";
    newPost.appendChild(commentsContainer);

    const postsContainer = document.getElementById("postsContainer");
    postsContainer.appendChild(newPost);

  

  });
}
