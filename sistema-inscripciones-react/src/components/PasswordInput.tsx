"use client";

import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useTheme } from "@/context/ThemeContext"; 

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { darkMode } = useTheme(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className={`w-full p-1.5 mb-4 border border-[#1034FF] rounded-md focus:outline-none ${
          darkMode
            ? "bg-gray-800 text-white focus:ring-2 focus:ring-blue-400"
            : "bg-white text-black focus:ring-2 focus:ring-blue-500"
        }`}
        placeholder="Enter your password"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className={`absolute right-2 top-3 ${
          darkMode
            ? "text-white hover:text-gray-300"
            : "text-[#1034FF] hover:text-[#0D47A1]"
        }`}
      >
        {showPassword ? <HiEyeOff /> : <HiEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
