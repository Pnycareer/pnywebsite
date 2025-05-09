'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import parse, { domToReact } from "html-react-parser";
import gif from '../../../assets/image/gif.gif';
import CityList from "@/app/Components/Citylist/Citylist";

const PearsonTest1 = () => {

  const [data, setData] = useState({});
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchdatacitywise = async () => {
      setIsLoading(true);
      try {
        let response = await axios.get(
          `https://www.admin777.pny-trainings.com/api/city/specialpage/${'pearson-english-test-in-rawalpindi'}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) { }
    };
    fetchdatacitywise();

  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('https://www.admin777.pny-trainings.com/api/city/all');
        const data = await response.json();
        // Assuming the data structure is similar to the one you've provided
        setCities(data.cities);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };

    fetchCities();

  }, []);

  const parsedDescription = data.special_page
    ? parse(data.special_page.description, {
      replace: (domNode) => {
        let isFirstH2 = true;

        if (domNode.type === "tag") {
          // For example, add a class to all <p> elements
          if (domNode.name === "p") {
            const props = { className: "p-5  text-justify" };
            return <p {...props}>{domToReact(domNode.children)}</p>;
          }
          if (domNode.name === "h3") {
            const props = { className: "p-5 text-lg " };
            return <p {...props}>{domToReact(domNode.children)}</p>;
          }
          if (domNode.name === "ul") {
            const props = { className: "p-5 " };
            return <p {...props}>{domToReact(domNode.children)}</p>;
          }
          if (domNode.name === "h2" && isFirstH2) {
            const props = {
              className: "text-[#013E6D] p-5 font-bold text-4xl ",
            };
            isFirstH2 = false; // Update the flag after processing the first h2
            return <h2 {...props}>{domToReact(domNode.children)}</h2>;
          }
        }
      },
    })
    : null;

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        {/* Semi-transparent background */}
        <div className="loader-overlay"></div>
        {/* Loader */}
        <div className="loaderContainer">
          {/* Use the gif as a loader */}
          <Image className="w-52 h-52" src={gif} alt="Loading..." />
        </div>
      </div>
    );
  }


  return (
    <>

      <section className="lg:h-[254px] bg-[#152438;] text-white flex flex-col justify-center items-center max-sm:p-5">
        <div className="text-[48px] max-sm:text-[24px] max-sm:text-center font-semibold">
          {data.special_page.name}
        </div>
      </section>

      <div className="container mx-auto px-4 mt-10 max-sm:mt-0 bg-white text-black">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {/* Left side: Image and Content */}
          <div className="md:col-span-2 lg:col-span-3">
            <img
              src={data.special_page?.spage_image}
              alt="Content"
              className="w-full max-sm:mt-5"
            />
            <div className="mt-4">
              {data.special_page ? parsedDescription : <p>Loading...</p>}{" "}
              {/* Or an error message */}
            </div>
          </div>

          <CityList />


        </div>
      </div>
    </>
  );
};

export default PearsonTest1;
