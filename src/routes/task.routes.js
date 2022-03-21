const router = require("express").Router();
const Task = require("../models/Task");

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

//unique task
router.get("/:id", async (req, res) => {
  const oneTask = await Task.findById(req.params.id);
  res.json(oneTask);
});

//save task
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({ title, description });
  await newTask.save();
  res.json({ status: "Task saved" });
});

//edit task
router.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  await Task.findByIdAndUpdate(req.params.id, { title, description });
  res.json({ status: "Task updated" });
});

//delete task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ status: "Task deleted" });
});

module.exports = router;
