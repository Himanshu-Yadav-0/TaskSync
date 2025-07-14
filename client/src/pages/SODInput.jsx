import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SODInput = ({ selectedDate }) => {
  const [tasks, setTasks] = useState([{ task: '', description: '' }]);
  const [loading, setLoading] = useState(false);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [showPending, setShowPending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for pending tasks from yesterday (unchanged)
    const checkPendingTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks/yesterday-pending');
        if (response.data.length > 0) {
          setPendingTasks(response.data);
          setShowPending(true);
        }
      } catch (error) {
        console.error('Error fetching pending tasks:', error);
      }
    };
    checkPendingTasks();
  }, [selectedDate]);

  const addTask = () => {
    setTasks([...tasks, { task: '', description: '' }]);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index, field, value) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  const includePendingTasks = () => {
    const pendingTaskObjects = pendingTasks.map(task => ({
      task: task.task,
      description: task.description
    }));
    setTasks([...tasks, ...pendingTaskObjects]);
    setShowPending(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Save tasks for the selected date
      await axios.post('http://localhost:5000/api/tasks', {
        tasks,
        type: 'sod',
        date: selectedDate
      });
      // Send SOD email
      await axios.post('http://localhost:5000/api/send-sod-email', { tasks });
      alert('SOD tasks saved and email sent successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save tasks or send email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-[#2d261c]/95 rounded-3xl shadow-2xl p-12 border border-[#3a3326] w-full flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-[#f5eee6] mb-10 tracking-tight drop-shadow-lg text-center">Start of Day Tasks</h2>
        <form onSubmit={handleSubmit} className="space-y-10 w-full">
          {showPending && (
            <div className="bg-[#3a3326] p-6 rounded-2xl mb-8 border border-[#bfae99] flex flex-col items-center">
              <p className="text-[#bfae99] mb-4 text-lg text-center">
                You have {pendingTasks.length} pending tasks from yesterday.
              </p>
              <button
                type="button"
                onClick={includePendingTasks}
                className="bg-[#a3b18a] text-[#23201a] px-8 py-4 rounded-2xl text-xl font-bold hover:bg-[#bfae99] focus:ring-4 focus:ring-[#a3b18a] transition-all duration-200 shadow-md"
              >
                Include Pending Tasks
              </button>
            </div>
          )}
          {tasks.map((task, index) => (
            <div key={index} className="bg-[#23201a] rounded-2xl p-6 border border-[#3a3326] mb-6 flex flex-col gap-4 shadow-md">
              <div className="flex justify-between items-start gap-4">
                <input
                  type="text"
                  value={task.task}
                  onChange={(e) => updateTask(index, 'task', e.target.value)}
                  placeholder="Enter task"
                  className="flex-1 border-2 border-[#bfae99] rounded-2xl px-6 py-4 text-xl focus:ring-4 focus:ring-[#a3b18a] focus:border-[#a3b18a] text-[#f5eee6] bg-[#23201a] placeholder-[#bfae99] mr-2 shadow-sm"
                  required
                />
                {tasks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTask(index)}
                    className="ml-2 text-[#bfae99] hover:text-[#a3b18a] focus:ring-2 focus:ring-[#a3b18a] transition-colors text-3xl rounded-full p-2"
                    aria-label="Remove task"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
              <textarea
                value={task.description}
                onChange={(e) => updateTask(index, 'description', e.target.value)}
                placeholder="Add a note (optional)"
                className="w-full border-2 border-[#bfae99] rounded-2xl px-6 py-4 text-xl focus:ring-4 focus:ring-[#a3b18a] focus:border-[#a3b18a] text-[#f5eee6] bg-[#23201a] placeholder-[#bfae99] shadow-sm"
                rows="2"
              />
            </div>
          ))}
          <div className="flex flex-col md:flex-row justify-between pt-6 gap-6 w-full">
            <button
              type="button"
              onClick={addTask}
              className="flex-1 py-5 bg-[#bfae99] text-[#23201a] rounded-2xl text-xl font-bold hover:bg-[#a3b18a] focus:ring-4 focus:ring-[#bfae99] transition-all duration-200 shadow-lg"
            >
              Add Task
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-5 bg-[#a3b18a] text-[#23201a] rounded-2xl text-xl font-bold hover:bg-[#bfae99] focus:ring-4 focus:ring-[#a3b18a] transition-all duration-200 shadow-lg disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save & Send Email'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SODInput; 