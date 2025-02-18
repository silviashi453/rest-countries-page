"use client";
import Input from "@/components/input";
import FilterDropdown from "@/components/filter";
import CountryBox from "@/components/countryBox";
import { Country } from "@/types/country";
import { Key, useState, useEffect, useMemo } from "react";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        let url =
          "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cioc";

        if (selectedCategory != "All") {
          url = `https://restcountries.com/v3.1/region/${selectedCategory.toLowerCase()}?fields=name,flags,population,region,capital,cioc`;
        }
        const res = await fetch(url);

        setCountries(await res.json());
      } catch (e) {
        console.error("Error fetching countries: ", e);
      }
    };

    fetchCountries();
  }, [selectedCategory]);

  const filteredCountries = useMemo(() => {
    return countries.filter((country: Country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, countries]);

  if (!countries) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ClipLoader color="#3498db" size={50} />
      </div>
    );
  }
  return (
    <div className="px-[16px] md:px-[80px] md:pb-[80px] pb-[65px]">
      <div
        className="flex flex-col md:py-[48px] py-[24px] md:flex-row items-center 
      md:justify-between justify-center gap-y-[40px]"
      >
        <Input query={query} setQuery={setQuery} />
        <FilterDropdown
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="pt-[24px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[75px] place-items-center">
        {filteredCountries.map(
          (country: Country, idx: Key | null | undefined) => {
            return <CountryBox key={idx} country={country} />;
          }
        )}
      </div>
    </div>
  );
}
