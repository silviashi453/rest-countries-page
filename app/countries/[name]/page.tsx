"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { Country } from "@/types/country";
import { useQuery } from "@tanstack/react-query";

const fetchCountry = async (name: string): Promise<Country | null> => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const data = await res.json();
  return data?.length > 0 ? data[0] : null;
};

const fetchBorders = async (borders: string[]): Promise<Country[]> => {
  if (borders.length === 0) return [];
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${borders.join(",")}`
  );
  return res.json();
};

const CountryPage = () => {
  const router = useRouter();
  const { name } = useParams();

  // Fetch country data
  const {
    data: country,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["country", name],
    queryFn: () => fetchCountry(name as string),
    staleTime: 1000 * 60 * 5, // Cache selama 5 menit
  });

  // Fetch border countries
  const { data: borders = [] } = useQuery({
    queryKey: ["borders", country?.borders],
    queryFn: () => fetchBorders(country?.borders || []),
    enabled: !!country?.borders, // Hanya fetch jika ada borders
  });

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <ClipLoader color="#3498db" size={50} />
      </div>
    );

  if (isError || !country) {
    return <div className="items-center text-red-500">Country not found</div>;
  }

  return (
    <div className="flex flex-col px-[28px] xl:px-[80px] py-[40px] xl:py-[80px] text-black dark:text-white">
      <button
        onClick={handleBack}
        className="mb-[64px] xl:mb-[80px] shadow-md bg-white dark:bg-dark-header
      rounded-md w-[136px] h-[40px] flex justify-center items-center gap-x-[5px] cursor-pointer"
      >
        <ArrowLeft size={20} />
        <p>Back</p>
      </button>
      <div className="flex flex-col xl:flex-row items-center gap-y-[44px] lg:gap-x-[140px] xl:gap-x-[100px]">
        <img
          src={country.flags.svg}
          alt={"Country picture"}
          className="xl:w-[560px] md:h-[401px] w-full h-[230px] shadow-md rounded-md"
        />
        <div className="flex flex-col items-start xl:w-[560px] w-full">
          <h1 className="font-extrabold text-[22px] mb-[16px]">
            {country.name ? country.name.official : ""}
          </h1>
          <div className="flex xl:flex-row flex-col gap-y-[32px] xl:justify-between lg:gap-x-[100px] mb-[32px]">
            <div className="text-[14px] flex flex-col gap-y-[16px]">
              <p>
                <span className="font-semibold">Native Name: </span>
                {country.name.nativeName
                  ? Object.values(country.name.nativeName)[0].official
                  : ""}
              </p>
              <p>
                <span className="font-semibold">Population: </span>
                {country.population ? country.population : ""}
              </p>
              <p>
                <span className="font-semibold">Region: </span>
                {country.region ? country.region : ""}
              </p>
              <p>
                <span className="font-semibold">Sub Region: </span>
                {country.subregion ? country.subregion : ""}
              </p>
              <p>
                <span className="font-semibold">Capital: </span>
                {country.capital?.length > 0 ? country.capital[0] : ""}
              </p>
            </div>
            <div className="text-[14px] flex flex-col gap-y-[16px]">
              <p>
                <span className="font-semibold">Top Level Domain: </span>
                {country.tld?.length > 0 ? country.tld[0] : ""}
              </p>
              <p>
                <span className="font-semibold">Currencies: </span>
                {country.currencies
                  ? Object.values(country.currencies)[0]?.name
                  : ""}
              </p>
              <p>
                <span className="font-semibold">Languages: </span>
                {country.languages
                  ? Object.values(country.languages)
                      .map((lang) => lang)
                      .join(", ")
                  : ""}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold mb-[16px]">
              Border Countries:
            </h2>
            <div className="flex flex-row gap-x-2 w-full flex-wrap gap-y-2">
              {borders
                ? borders.map((border, id) => {
                    console.log("Border ", border);
                    return (
                      <div
                        onClick={() => {
                          router.push(`/countries/${border.name.common}`);
                        }}
                        key={id}
                        className="cursor-pointer min-w-[96px] h-[28px] flex justify-center px-2 
                        items-center shadow-md rounded-md text-[12px] bg-white dark:bg-dark-header"
                      >
                        {border.name.common}
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
