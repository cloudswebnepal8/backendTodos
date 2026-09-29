const express = require("express")
const router = express.Router()
const todo = require("../controllers/todoController")

const auth = require("../middleware/auth")

router.post("/add", auth, todo.addTodo)
router.get("/", auth, todo.getTodos)

router.delete("/:id", auth, todo.deleteTodo)
router.put("/:id", auth, todo.updateTodo)

module.exports = router;
