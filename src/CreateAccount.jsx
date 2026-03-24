import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';

const schema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phoneNumber: z.string().min(10, "Valid phone is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password > 5 chars"),
  companyName: z.string().optional(),
  isAgency: z.enum(["yes", "no"], { required_error: "Please select one" }),
});

export default function CreateAccount() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { isAgency: "yes" }
  });

  const onSubmit = (data) => {
    sessionStorage.setItem("userData", JSON.stringify(data));
    sessionStorage.setItem("isLoggedIn", "true");
    toast.success("Account created successfully", { icon: "🎉" });
    navigate('/profile');
  };

  return (
    <div className="flex-1 flex flex-col p-5 bg-white overflow-hidden justify-between">
      <h1 className="text-[22px] font-bold text-gray-900 mb-3 mt-1 leading-tight">
        Create your<br />PopX account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 flex flex-col">
        <fieldset className="border border-gray-300 rounded-md px-3 pb-1 relative">
          <legend className="text-[11px] font-semibold text-[#6C25FF] px-1 translate-y-[4px]">
            Full Name <span className="text-red-500">*</span>
          </legend>
          <input
            type="text"
            placeholder="Marry Doe"
            {...register("fullName")}
            className="w-full bg-transparent outline-none text-[13px] font-medium text-gray-800 placeholder:text-gray-400 placeholder:font-normal mt-1"
          />
        </fieldset>
        {errors.fullName && <p className="text-red-500 text-[10px] -mt-1">{errors.fullName.message}</p>}

        <fieldset className="border border-gray-300 rounded-md px-3 pb-1 relative">
          <legend className="text-[11px] font-semibold text-[#6C25FF] px-1 translate-y-[4px]">
            Phone number <span className="text-red-500">*</span>
          </legend>
          <input
            type="tel"
            placeholder="Marry Doe"
            {...register("phoneNumber")}
            className="w-full bg-transparent outline-none text-[13px] font-medium text-gray-800 placeholder:text-gray-400 placeholder:font-normal mt-1"
          />
        </fieldset>
        {errors.phoneNumber && <p className="text-red-500 text-[10px] -mt-1">{errors.phoneNumber.message}</p>}

        <fieldset className="border border-gray-300 rounded-md px-3 pb-1 relative">
          <legend className="text-[11px] font-semibold text-[#6C25FF] px-1 translate-y-[4px]">
            Email address <span className="text-red-500">*</span>
          </legend>
          <input
            type="email"
            placeholder="Marry Doe"
            {...register("email")}
            className="w-full bg-transparent outline-none text-[13px] font-medium text-gray-800 placeholder:text-gray-400 placeholder:font-normal mt-1"
          />
        </fieldset>
        {errors.email && <p className="text-red-500 text-[10px] -mt-1">{errors.email.message}</p>}

        <fieldset className="border border-gray-300 rounded-md px-3 pb-1 relative">
          <legend className="text-[11px] font-semibold text-[#6C25FF] px-1 translate-y-[4px]">
            Password <span className="text-red-500">*</span>
          </legend>
          <input
            type="password"
            placeholder="Marry Doe"
            {...register("password")}
            className="w-full bg-transparent outline-none text-[13px] font-medium text-gray-800 placeholder:text-gray-400 placeholder:font-normal mt-1"
          />
        </fieldset>
        {errors.password && <p className="text-red-500 text-[10px] -mt-1">{errors.password.message}</p>}

        <fieldset className="border border-gray-300 rounded-md px-3 pb-1 relative">
          <legend className="text-[11px] font-semibold text-gray-400 px-1 translate-y-[4px]">
            Company name
          </legend>
          <input
            type="text"
            placeholder="Marry Doe"
            {...register("companyName")}
            className="w-full bg-transparent outline-none text-[13px] font-medium text-gray-800 placeholder:text-gray-400 placeholder:font-normal mt-1"
          />
        </fieldset>

        <div className="pt-1">
          <label className="block text-[12px] mb-2 text-gray-900">
            Are you an Agency? <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-5 items-center">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="yes"
                {...register("isAgency")}
                className="w-4 h-4 accent-[#6C25FF]"
              />
              <span className="text-[13px] text-gray-900 font-medium">Yes</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="no"
                {...register("isAgency")}
                className="w-4 h-4 accent-[#6C25FF]"
              />
              <span className="text-[13px] text-gray-900 font-medium">No</span>
            </label>
          </div>
        </div>

        <div className="h-4" />

        <button
          type="submit"
          className="w-full bg-[#6C25FF] text-white py-2.5 rounded-md font-semibold text-[13px] transition-colors hover:bg-purple-800"
        >
          Create Account
        </button>
        <p className="text-center text-[12px] text-gray-500 mt-2">
          Already have an account? <Link to="/login" className="text-[#6C25FF] font-semibold hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
