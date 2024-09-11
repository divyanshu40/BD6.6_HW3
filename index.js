let express = require("express");
let cors = require("cors");
let { getAllBooks, getBookById } = require("./controllers");
let app = express();
app.use(cors());
app.use(express.json());

// Exercise 1: Retrieve All Books
app.get("/books", async (req, res) => {
  try {
    let result = await getAllBooks();
    if (result.length === 0) {
      return res.status(404).json({ error: "No books found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error"});
  }
});
// Exercise 2: Retrieve Book by ID
app.get("/books/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let result = await getBookById(id);
    if (! result) {
      return res.status(404).json({ error: "Book not found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error"});
  }
});
module.exports = { app };