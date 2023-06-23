import { getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { moviesRef } from "../firebase/firebase";
import { Link } from "react-router-dom";
const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        setData((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      });
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="flex flex-wrap justify-center md:justify-between px-3 mt-2">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          <ThreeDots height={40} color="white" />
        </div>
      ) : (
        data.map((item, i) => {
          return (
            <Link to={`/details/${item.id}`}>
              <div
                key={i}
                className="card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500 w-64 "
              >
                <img
                  className="h-40 md:h-72 w-full md:w-full"
                  src={item.img}
                  alt=""
                />
                <h1>
                  <span className="text-red-500">Name:</span> {item.title}
                </h1>
                <h1 className="flex items-center">
                  <span className="text-red-500 mr-1">Rating:</span>
                  <ReactStars
                    size={20}
                    count={5}
                    value={item.rating / item.rated}
                    edit={false}
                    half={true}
                  />
                </h1>
                <h1>
                  <span className="text-red-500">Year:</span> {item.year}
                </h1>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;
