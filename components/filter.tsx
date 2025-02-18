"use client";
import { useState } from "react";
import { ArrowDown } from "lucide-react";

const categories = ["Africa", "America", "Asia", "Europe", "Oceania"];
interface FilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const FilterDropdown = ({
  selectedCategory,
  setSelectedCategory,
}: FilterProps) => {
  const [isOpen, setOpen] = useState(false);

  const toggleCategories = () => {
    setOpen(!isOpen);
  };
  return (
    <div className="relative w-full md:w-[200px] z-100">
      <div className="w-full h-[48px] md:h-[56px] shadow-md bg-white flex justify-between items-center px-[24px] py-[14px] md:py-[18px] rounded-md dark:bg-dark-header">
        <p className="text-[12px] md:text-[14px] text-dark dark:text-white">
          {selectedCategory === "All" ? "Filter by Region" : selectedCategory}
        </p>
        <ArrowDown
          size={15}
          className="text-black dark:text-white cursor-pointer"
          onClick={toggleCategories}
        />
      </div>
      {isOpen && (
        <div className="absolute w-full shadow-md md:w-[200px] mt-[5px] bg-white dark:bg-dark-header pt-[16px] pl-[24px] rounded-md">
          {categories.map((category, idx) => {
            return (
              <p
                key={idx}
                className="pb-[16px] text-[12px] md:text-[14px] text-dark dark:text-white cursor-pointer"
                onClick={() => {
                  setSelectedCategory(category);
                  setOpen(!isOpen);
                }}
              >
                {category}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
