"use client";
import { Country } from "@/types/country";
import { useRouter } from "next/navigation";

interface CountryBoxProps {
  country: Country;
}

const CountryBox = ({ country }: CountryBoxProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/countries/${country.name.common}`);
  };
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-full md:w-[267px] h-[336px] bg-white dark:bg-dark-header shadow-md flex flex-col rounded-md"
    >
      <div
        className={`w-full h-[160px] rounded-t-md bg-no-repeat bg-cover bg-center`}
        style={{ backgroundImage: `url(${country.flags.svg})` }}
      >
        {/* <img
          src={country.flags.svg}
          alt="Flag"
          className="w-full h-full rounded-md"
          // className="h-[160px] w-[267px]"
        /> */}
      </div>
      <div className="pt-[24px] pl-[24px] pb-[46px] text-black dark:text-white">
        <h2 className="font-extrabold text-[18px] leading-[26px] mb-[16px]">
          {country.name.common}
        </h2>
        <div className="flex flex-col gap-y-[8px] text-[14px]">
          <p>
            <span className="font-semibold">Population: </span>
            {country.population}
          </p>
          <p>
            <span className="font-semibold">Region: </span>
            {country.region}
          </p>
          <p>
            <span className="font-semibold">Capital: </span>
            {country.capital[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryBox;
