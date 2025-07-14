import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EODReview = ({ selectedDate }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [newTask, setNewTask] = useState({ task: '', description: '' });
  const [adding, setAdding] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [selectedDate]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks/by-date', {
        params: { date: selectedDate }
      });
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
        status: newStatus
      });
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task status. Please try again.');
    }
  };

  const handleSendEOD = async () => {
    setSending(true);
    try {
      await axios.post('http://localhost:5000/api/send-eod-email', { date: selectedDate });
      alert('EOD email sent successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error sending EOD email:', error);
      alert('Failed to send EOD email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleAddUnplannedTask = async (e) => {
    e.preventDefault();
    if (!newTask.task.trim()) return;
    setAdding(true);
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', {
        tasks: [{ task: newTask.task, description: newTask.description }],
        type: 'eod',
        date: selectedDate
      });
      // Mark as completed by default
      const addedTask = { ...response.data[0], status: 'completed' };
      setTasks([addedTask, ...tasks]);
      setNewTask({ task: '', description: '' });
    } catch (error) {
      alert('Failed to add unplanned task.');
    } finally {
      setAdding(false);
    }
  };

  const handleClearCompleted = () => {
    setHideCompleted(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a3b18a]"></div>
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.status === 'completed');
  const incompleteTasks = tasks.filter(task => task.status !== 'completed');
  const visibleTasks = hideCompleted ? tasks.filter(task => task.status !== 'completed') : tasks;

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-[#2d261c]/95 rounded-3xl shadow-2xl p-12 border border-[#3a3326] w-full flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-[#f5eee6] mb-10 tracking-tight drop-shadow-lg text-center">End of Day Review</h2>

        {/* Add Unplanned Task Form */}
        <form onSubmit={handleAddUnplannedTask} className="mb-12 flex flex-col md:flex-row gap-6 items-center w-full">
          <input
            type="text"
            value={newTask.task}
            onChange={e => setNewTask({ ...newTask, task: e.target.value })}
            placeholder="Add unplanned task (completed)"
            className="flex-1 border-2 border-[#bfae99] rounded-2xl px-6 py-4 text-xl bg-[#23201a] text-[#f5eee6] placeholder-[#bfae99] focus:ring-4 focus:ring-[#a3b18a] focus:border-[#a3b18a] shadow-sm"
            required
          />
          <input
            type="text"
            value={newTask.description}
            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Note (optional)"
            className="flex-1 border-2 border-[#bfae99] rounded-2xl px-6 py-4 text-xl bg-[#23201a] text-[#f5eee6] placeholder-[#bfae99] focus:ring-4 focus:ring-[#a3b18a] focus:border-[#a3b18a] shadow-sm"
          />
          <button
            type="submit"
            disabled={adding}
            className="px-8 py-4 bg-[#a3b18a] text-[#23201a] rounded-2xl text-xl font-bold hover:bg-[#bfae99] focus:ring-4 focus:ring-[#a3b18a] transition-all duration-200 shadow-lg disabled:opacity-50"
          >
            {adding ? 'Adding...' : 'Add Task'}
          </button>
        </form>

        {tasks.length === 0 ? (
          <p className="text-[#bfae99] text-center py-8 text-lg">No tasks found for this date.</p>
        ) : (
          <div className="space-y-10 w-full">
            <div className="space-y-6">
              {visibleTasks.map(task => (
                <div
                  key={task.id}
                  className="bg-[#23201a] rounded-2xl p-6 border border-[#3a3326] flex items-start justify-between mb-2 shadow-sm"
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.status === 'completed'}
                        onChange={(e) => updateTaskStatus(task.id, e.target.checked ? 'completed' : 'pending')}
                        className="h-7 w-7 text-[#a3b18a] rounded border-[#bfae99] focus:ring-[#a3b18a] mr-3"
                      />
                      <h3 className={`text-2xl font-semibold ${task.status === 'completed' ? 'line-through text-[#bfae99]' : 'text-[#f5eee6]'}`}>{task.task}</h3>
                    </div>
                    {task.description && (
                      <p className="text-[#bfae99] mt-2 ml-10 text-lg">{task.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-[#3a3326] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-xl text-[#bfae99]">
                <span className="text-[#a3b18a] font-bold">{completedTasks.length}</span> completed,{' '}
                <span className="text-[#bfae99] font-bold">{incompleteTasks.length}</span> pending
              </div>
              <div className="flex gap-6">
                <button
                  onClick={handleSendEOD}
                  disabled={sending}
                  className="px-8 py-4 bg-[#a3b18a] text-[#23201a] rounded-2xl text-xl font-bold hover:bg-[#bfae99] focus:ring-4 focus:ring-[#a3b18a] transition-all duration-200 shadow-lg disabled:opacity-50"
                >
                  {sending ? 'Sending...' : 'Send EOD Email'}
                </button>
                {completedTasks.length > 0 && !hideCompleted && (
                  <button
                    onClick={handleClearCompleted}
                    type="button"
                    className="px-8 py-4 bg-[#bfae99] text-[#23201a] rounded-2xl text-xl font-bold hover:bg-[#a3b18a] focus:ring-4 focus:ring-[#bfae99] transition-all duration-200 shadow-lg"
                  >
                    Clear Completed Tasks
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EODReview; 