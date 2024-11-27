const apiUrl = "/posts"; // Backend API endpoint

// Fetch and display all posts
async function fetchPosts() {
  const response = await fetch(apiUrl);
  const posts = await response.json();

  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = posts.map(post => `
    <div class="post">
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <small>By: ${post.author}</small>
      <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>
      <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
    </div>
  `).join("");
}

// Handle form submission to create a new post
document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("postId").value;
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const description = document.getElementById("description").value;

  if (!title || !author || !description) {
    alert("All fields are required.");
    return;
  }

  const method = id ? "PUT" : "POST";
  const endpoint = id ? `${apiUrl}/${id}` : apiUrl;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, description }),
  });

  if (response.ok) {
    alert("Post created successfully!");
    document.getElementById("postForm").reset();
    fetchPosts();
  } else {
    alert("Failed to create post. Try again.");
  }
});
async function editPost(id) {
  const response = await fetch(`${apiUrl}/${id}`);
  const post = await response.json();

  document.getElementById("postId").value = post.id;
  document.getElementById("title").value = post.title;
  document.getElementById("author").value = post.author;
  document.getElementById("description").value = post.description;

  document.querySelector("button[type='submit']").innerText = "Update Post";
}

// Delete a post
async function deletePost(id) {
  if (confirm("Are you sure you want to delete this post?")) {
    const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

    if (response.ok) {
      alert("Post deleted successfully!");
      fetchPosts();
    } else {
      alert("Failed to delete the post. Try again.");
    }
  }
}
// Load all posts on page load
fetchPosts();
