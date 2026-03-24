import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './LandingPage';
import CreateAccount from './CreateAccount';
import Login from './Login';
import Profile from './Profile';
import ScrollToTop from './ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, ChevronLeft, ChevronRight } from 'lucide-react';

const routesList = [
  '/',
  '/login',
  '/create-account',
  '/profile'
];

function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentIndex = routesList.indexOf(location.pathname) !== -1 ? routesList.indexOf(location.pathname) : 0;

  const handleHome = () => navigate('/');
  const handlePrev = () => {
    if (currentIndex > 0) navigate(routesList[currentIndex - 1]);
  };
  const handleNext = () => {
    if (currentIndex < routesList.length - 1) navigate(routesList[currentIndex + 1]);
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-6 text-gray-400">
      <button onClick={handleHome} className="hover:text-gray-800 transition-colors">
        <Home size={18} />
      </button>
      <button onClick={handlePrev} className={`hover:text-gray-800 transition-colors ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}>
        <ChevronLeft size={20} />
      </button>
      <span className="text-[13px] font-medium tracking-wide text-gray-500">
        {currentIndex + 1} of {routesList.length}
      </span>
      <button onClick={handleNext} className={`hover:text-gray-800 transition-colors ${currentIndex === routesList.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}>
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative">
      <BrowserRouter>
        <ScrollToTop />
        <div className="w-full max-w-[375px] h-[812px] max-h-[85vh] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-y-auto relative flex flex-col hide-scrollbar mb-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <BottomNavigation />
      </BrowserRouter>
      <ToastContainer position="top-right" />
    </div>
  );
}
