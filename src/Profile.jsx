import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    
    if (!storedData || isLoggedIn !== "true") {
      navigate('/');
    } else {
      setUserData(JSON.parse(storedData));
    }
  }, [navigate]);

  if (!userData) return null;

  return (
    <div className="flex-1 flex flex-col bg-[#F7F8F9] w-full h-full relative">
      <div className="bg-white p-4 h-16 shadow-sm flex items-center mb-6">
        <h1 className="text-[17px] font-semibold text-[#1D2226]">Account Settings</h1>
      </div>

      <div className="px-5">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-[76px] h-[76px]">
            <div className="w-full h-full rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-[#6C25FF] p-1.5 rounded-full text-white border-2 border-white flex items-center justify-center">
              <Camera size={12} strokeWidth={3} />
            </button>
          </div>

          <div className="pt-2">
            <h2 className="text-[15px] font-bold text-[#1D2226] leading-tight mb-1">{userData.fullName}</h2>
            <p className="text-gray-500 text-[14px] leading-tight">{userData.email}</p>
          </div>
        </div>

        <p className="text-[#1D2226] text-[15px] leading-relaxed mb-6 font-medium">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
        </p>

        <div className="w-full border-t-[1.5px] border-dashed border-[#CBCBCB]"></div>
      </div>
      
      <div className="flex-1 bg-[#F7F8F9]"></div>

      <button onClick={() => {
        sessionStorage.removeItem("isLoggedIn");
        navigate('/');
      }} className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-red-500 text-white py-3 rounded-md font-semibold text-sm transition-colors hover:bg-red-600 mb-4 shadow-lg text-center">
        Log Out
      </button>

    </div>
  );
}
