import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col justify-end p-6 bg-white pb-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
        Welcome to PopX
      </h1>
      <p className="text-gray-500 text-[15px] mb-8 leading-relaxed">
        Lorem ipsum dolor sit amet,<br />
        consectetur, adipisicing elit.
      </p>

      <div className="flex flex-col gap-3">
        <Link
          to="/create-account"
          className="w-full bg-[#6C25FF] text-white py-3.5 rounded-md font-semibold text-center text-sm transition-colors hover:bg-purple-800"
        >
          Create Account
        </Link>
        <Link
          to="/login"
          className="w-full bg-[#CEB2FF] text-[#1D2226] py-3.5 rounded-md font-semibold text-center text-sm transition-colors hover:bg-[#bfa0fc]"
        >
          Already Registered? Login
        </Link>
      </div>
    </div>
  );
}
