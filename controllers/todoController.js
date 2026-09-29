const Todo = require("../models/Todo")

exports.addTodo = async (req, res) => {
    const { title, description } = req.body;

    const todo = await Todo.create({
        title,
        description,
        userId: req.user.id
    });
    res.json(todo)
}

exports.getTodos = async (req, res) => {
    const todos = await Todo.find({
        userId: req.user.id
    })
    res.json(todos)

}

exports.deleteTodo = async (req, res) => {
    await Todo.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id
    })
    res.json({
        message: "Deleted Successfully"
    })
}

exports.updateTodo = async (req, res) => {
    const { title, description } = req.body;
    const todo = await Todo.findOneAndUpdate(
        {
            _id: req.params.id,
            userId: req.user.id
        },
        {
            title,
            description
        },
        {
            new: true
        }
    )
    res.json(todo)
}

