import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SODInput from './pages/SODInput';
import EODReview from './pages/EODReview';
import { DateProvider, useDate } from './context/DateContext';
import './App.css';

function Home({ onModeSelect }) {
  const { selectedDate, setSelectedDate } = useDate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#23201a] to-[#2d261c]">
      <div className="max-w-md w-full bg-[#2d261c]/95 rounded-3xl shadow-2xl p-12 border border-[#3a3326] flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-center text-[#f5eee6] mb-12 tracking-tight drop-shadow-lg">
          Task Tracker
        </h1>
        <div className="mb-12 w-full flex flex-col items-center">
          <label className="mb-4 font-semibold text-[#bfae99] text-xl">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="border-2 border-[#bfae99] rounded-2xl px-8 py-4 text-2xl bg-[#23201a] text-[#f5eee6] placeholder-[#bfae99] focus:ring-4 focus:ring-[#a3b18a] focus:border-[#a3b18a] transition w-full shadow-md"
            style={{ minWidth: 0 }}
          />
        </div>
        <div className="flex flex-col gap-6 w-full">
          <button
            onClick={() => onModeSelect('sod')}
            className="w-full py-5 px-8 bg-gradient-to-r from-[#a3b18a] to-[#bfae99] text-[#23201a] rounded-2xl font-bold shadow-xl text-2xl hover:from-[#bfae99] hover:to-[#a3b18a] focus:ring-4 focus:ring-[#a3b18a] transition-all duration-200"
          >
            Start of Day (SOD)
          </button>
          <button
            onClick={() => onModeSelect('eod')}
            className="w-full py-5 px-8 bg-gradient-to-r from-[#bfae99] to-[#a3b18a] text-[#23201a] rounded-2xl font-bold shadow-xl text-2xl hover:from-[#a3b18a] hover:to-[#bfae99] focus:ring-4 focus:ring-[#bfae99] transition-all duration-200"
          >
            End of Day (EOD)
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [selectedMode, setSelectedMode] = useState(null);
  const navigate = useNavigate();
  const { selectedDate } = useDate();

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    navigate(mode === 'sod' ? '/' : '/eod');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#23201a] to-[#2d261c]">
      <div className="container mx-auto px-4 py-12">
        {!selectedMode ? (
          <Home onModeSelect={handleModeSelect} />
        ) : (
          <Routes>
            <Route path="/" element={<SODInput selectedDate={selectedDate} />} />
            <Route path="/eod" element={<EODReview selectedDate={selectedDate} />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

// Wrap App with Router and DateProvider
const AppWithRouter = () => (
  <DateProvider>
    <Router>
      <App />
    </Router>
  </DateProvider>
);

export default AppWithRouter;
