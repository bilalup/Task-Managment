import { useState } from 'react';
// eslint-disable-next-line
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const statusColors = {
    todo: 'bg-gray-200',
    'in-progress': 'bg-blue-200',
    done: 'bg-green-200'
  };

  const priorityColors = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600'
  };

  const handleUpdate = () => {
    onUpdate(task._id, editedTask);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-lg shadow-md ${statusColors[task.status]} transition-all`}
    >
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full px-2 py-1 border rounded"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full px-2 py-1 border rounded"
            rows="2"
          />
          <select
            value={editedTask.status}
            onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
            className="w-full px-2 py-1 border rounded"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <select
            value={editedTask.priority}
            onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
            className="w-full px-2 py-1 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{task.title}</h3>
          {task.description && <p className="text-gray-700">{task.description}</p>}
          <div className="flex justify-between items-center">
            <span className={`text-sm font-semibold ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            <span className="text-sm capitalize">{task.status}</span>
          </div>
          {task.dueDate && (
            <p className="text-sm text-gray-500">
              Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </p>
          )}
          <div className="flex justify-end space-x-2 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 bg-blue-500 text-white text-sm rounded"
            >
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(task._id)}
              className="px-2 py-1 bg-red-500 text-white text-sm rounded"
            >
              Delete
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TaskItem;