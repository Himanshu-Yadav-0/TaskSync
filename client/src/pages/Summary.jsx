import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Summary = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks/today');
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/eod');
  };

  const handleNewDay = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="text-center">
        <p>Loading summary...</p>
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.status === 'completed');
  const incompleteTasks = tasks.filter(task => task.status !== 'completed');

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">EOD Summary</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-green-600 mb-2">
            ✅ Completed Tasks
          </h3>
          {completedTasks.length === 0 ? (
            <p className="text-gray-500">No completed tasks</p>
          ) : (
            <ul className="list-disc list-inside space-y-1">
              {completedTasks.map(task => (
                <li key={task.id} className="text-gray-700">
                  {task.task}
                  {task.description && (
                    <span className="text-gray-500 text-sm ml-2">
                      ({task.description})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-red-600 mb-2">
            ❌ Incomplete Tasks
          </h3>
          {incompleteTasks.length === 0 ? (
            <p className="text-gray-500">No incomplete tasks</p>
          ) : (
            <ul className="list-disc list-inside space-y-1">
              {incompleteTasks.map(task => (
                <li key={task.id} className="text-gray-700">
                  {task.task}
                  {task.description && (
                    <span className="text-gray-500 text-sm ml-2">
                      ({task.description})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Tasks
          </button>
          <button
            onClick={handleNewDay}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Start New Day
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary; 