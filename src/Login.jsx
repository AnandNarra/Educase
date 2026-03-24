import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const storedData = sessionStorage.getItem("userData");
    if (!storedData) {
      toast.error("No account found! Please register first.");
      return;
    }

    const parsedUser = JSON.parse(storedData);
    if (data.email === parsedUser.email && data.password === parsedUser.password) {
      sessionStorage.setItem("isLoggedIn", "true");
      toast.success("Login successful!");
      navigate('/profile');
    } else {
      toast.error("Invalid credentials.");
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto w-full h-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-4 leading-tight">
        Signin to your<br />PopX account
      </h1>
      <p className="text-gray-500 text-[15px] mb-8 w-[90%] font-medium">
        Lorem ipsum dolor sit amet,<br />
        consectetur adipisicing elit.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex-1 flex flex-col w-full">
        <fieldset className="border border-gray-300 rounded-md px-3 pb-2 relative">
          <legend className="text-[13px] font-semibold text-[#6C25FF] px-1 translate-y-[2px]">
            Email Address
          </legend>
          <input
            type="email"
            placeholder="Enter email address"
            {...register("email")}
            className="w-full bg-transparent outline-none text-[15px] font-medium text-gray-800 placeholder:text-gray-400 placeholder:font-normal mt-1"
          />
        </fieldset>
        {errors.email && <p className="text-red-500 text-xs -mt-3">{errors.email.message}</p>}

        <fieldset className="border border-gray-300 rounded-md px-3 pb-2 relative">
          <legend className="text-[13px] font-semibold text-[#6C25FF] px-1 translate-y-[2px]">
            Password
          </legend>
          <input
            type="password"
            placeholder="Enter password"
            {...register("password")}
            className="w-full bg-transparent outline-none text-[15px] font-medium text-gray-800 placeholder:text-gray-400 placeholder:font-normal mt-1"
          />
        </fieldset>
        {errors.password && <p className="text-red-500 text-xs -mt-3">{errors.password.message}</p>}

        <button
          type="submit"
          className="w-full bg-[#CBCBCB] text-white py-3.5 rounded-md font-semibold text-sm transition-colors hover:bg-gray-400 mb-4"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-500 mt-2">
          New here? <Link to="/create-account" className="text-[#6C25FF] font-semibold hover:underline">Create Account</Link>
        </p>
      </form>
    </div>
  );
}
