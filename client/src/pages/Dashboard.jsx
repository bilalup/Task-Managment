import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const serverApi = import.meta.env.VITE_SERVER_API;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(`${serverApi}/api/tasks/all-tasks`, {
          withCredentials: true,
        });
        setTasks(data.tasks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);

        // Redirect to login if unauthorized
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchTasks();
    // eslint-disable-next-line
  }, [navigate]);
  
  // ... rest of your code unchanged
  const addTask = async (task) => {
    try {
      const { data } = await axios.post(`${serverApi}/api/tasks`, task, {
        withCredentials: true,
      });
      setTasks([...tasks, data]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const { data } = await axios.put(`${serverApi}/api/tasks/${id}`, updatedTask, {
        withCredentials: true,
      });
      setTasks(tasks.map(task => (task._id === id ? data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${serverApi}/api/tasks/${id}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TaskForm onAdd={addTask} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {tasks.length === 0 ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500">
              No tasks yet. Add your first task!
            </motion.p>
          ) : (
            tasks.map(task => (
              <TaskItem key={task._id} task={task} onUpdate={updateTask} onDelete={deleteTask} />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
