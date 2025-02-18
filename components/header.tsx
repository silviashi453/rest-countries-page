"use client";
import { Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [theme, setTheme] = useState("light");
  const router = useRouter();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.add(storedTheme);
    }
  }, []);

  const handleHome = () => {
    router.push("/");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="bg-white shadow-lg dark:bg-dark-header px-[16px] md:px-[81px] py-[30px] md:py-[24px] flex flex-row justify-between items-center">
      <h1
        onClick={handleHome}
        className="cursor-pointer text-[14px] md:text-[24px] font-extrabold leading-[20px] text-black dark:text-white"
      >
        Where in the world
      </h1>
      <div className="flex gap-x-[8px] items-center" onClick={toggleTheme}>
        <Moon
          color={theme === "light" ? "black" : "white"}
          fill="white"
          className="cursor-pointer w-[16px] h-[16px] md:w-[20px] md:h-[20px] "
        />
        <p className="font-semibold text-[12px] md:text-[16px] text-black dark:text-white cursor-pointer">
          Dark Mode
        </p>
      </div>
    </div>
  );
};

export default Header;
