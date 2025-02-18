"use client";
import { Search } from "lucide-react";

interface InputProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<InputProps> = ({ query, setQuery }) => {
  return (
    <div className="relative w-full md:w-[350px] lg:w-[480px]">
      <Search
        size={20}
        className="absolute top-1/2 transform -translate-y-1/2 left-[32px] text-[#848484] dark:text-white"
      />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a country..."
        type="text"
        className="pl-[74px] w-full appearance-none focus:outline-none  focus:ring-2 focus:ring-blue-500 h-[48px] md:h-[56px] rounded-md 
      shadow-md bg-white dark:bg-dark-header text-[#848484] dark:text-white text-[12px] md:text-[14px]"
      />
    </div>
  );
};

export default Input;
