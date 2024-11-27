const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files from the "public" folder

// In-memory database for posts
let posts = [];

// Routes

// Get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Create a new post
app.post("/posts", (req, res) => {
  const { title, author, description } = req.body;

  if (!title || !author || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newPost = { id: Date.now(), title, author, description };
  posts.push(newPost);

  res.status(201).json(newPost);
});

// Get a single post by ID
app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id == id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
});

// Update a post
app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, author, description } = req.body;

  const postIndex = posts.findIndex((p) => p.id == id);

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts[postIndex] = { ...posts[postIndex], title, author, description };

  res.json(posts[postIndex]);
});

// Delete a post
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  const postIndex = posts.findIndex((p) => p.id == id);

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts.splice(postIndex, 1);

  res.status(204).send(); // No content response
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
