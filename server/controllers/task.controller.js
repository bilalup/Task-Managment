import Task from "../models/Task.js";

// GET ALL TASKS
export const AllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId });
        res.json(tasks);
      } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ADD A TASK
export const AddTask = async (req, res) => {
    try {
    const task = new Task({ ...req.body, user: req.userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// UPDATE A TASK
export const UpdateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.userId }, req.body, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).json({ success: false,message: error.message });
    }
}

// DELETE A TASK
export const DeleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}