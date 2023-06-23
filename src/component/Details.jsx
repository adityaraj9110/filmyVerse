import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import {  db } from "../firebase/firebase";
import {  doc, getDoc } from "firebase/firestore";
import { ThreeDots, ThreeCircles } from "react-loader-spinner";
import Review from "./Review";
const Details = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    title: "",
    year: "",
    img: "",
    description: "",
    rating:0,
    rated:0,
  });
  useEffect(() => {
    async function getData() {
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="p-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center mt-4">
      {loading === true ? (
        <div className="h-96 w-full flex justify-center items-center">
          <ThreeCircles color="red" height={40} />
        </div>
      ) : (
        <>
          <img className="h-96 block md:sticky top-24" src={data?.img} alt="" />
          <div className="md:ml-4 ml-0 mt-3 md:mt-0 md:w-1/2 w-full">
            <h1 className="text-2xl font-bold text-gray-500">
              {data.title} <span className="text-xl">({data.year})</span>
            </h1>
            <ReactStars size={20} half={true} value={data.rating/data.rated} edit={false} />
            <p className="mt-2">{data.description}</p>
            <Review id={id} prevRating={data.rating} rate={data.rated}/>
          </div>
          
        </>
      )}
    </div>
  );
};

export default Details;
