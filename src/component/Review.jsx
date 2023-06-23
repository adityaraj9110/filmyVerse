import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { db, reviewsRef } from "../firebase/firebase";
import {
  addDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { AppState } from "../App";
import { Navigate, useNavigate } from "react-router-dom";
const Review = ({ id, prevRating, rate }) => {
  const useAppState = useContext(AppState);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [though, setThough] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [newReview,setNewReview] = useState(false);
  const sendReview = async () => {
    if (useAppState.login) {
      try {
        if (though === "") {
          swal({
            title: "Please provide your valuable thought",
            icon: "error",
            buttons: false,
            timer: 3000,
          });
        } else {
          setLoading(true);
          await addDoc(reviewsRef, {
            movieid: id,
            name: useAppState.userName,
            rating: rating,
            though: though,
            timestamp: new Date().getTime(),
          });
          const ref = doc(db, "movies", id);
          await updateDoc(ref, {
            rating: prevRating + rating,
            rated: rate + 1,
          });
          swal({
            title: "Review Shared",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          setThough("");
          setRating(0);
          setLoading(false);
          setNewReview(true)
        }
      } catch (error) {
        swal({
          title: error.message,
          icon: "error",
          buttons: false,
          timer: 3000,
        });
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    async function getData() {
      setReviewLoading(true);
      try {
        setData([])
        let quer = query(reviewsRef, where("movieid", "==", id));
        // console.log(quer)
        const querySnapShot = await getDocs(quer);
        console.log(querySnapShot);
        querySnapShot.forEach((doc) => {
          setData((prev) => [...prev, doc.data()]);
        });
      } catch (error) {
        console.log(error.message);
      }
      setReviewLoading(false);
    }
    getData();
  }, [newReview]);

  return (
    <div className="mt-4 w-full  border-t-2 border-gray-700 w-full">
      <ReactStars
        size={35}
        half={true}
        edit={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input
        className="w-full p-2 outline-none header"
        placeholder="Share your thoughts..."
        value={though}
        onChange={(e) => setThough(e.target.value)}
      />
      <button
        className="bg-red-500 p-2 w-1/4 mt-2 hover:bg-red-700 rounded-sm flex justify-center items-center"
        onClick={sendReview}
      >
        {loading === true ? <TailSpin height={25} color="white" /> : "Share"}
      </button>

      {reviewLoading ? (
        <div className="mt-5 flex justify-center">
          <ThreeDots height={20} color="white" />
        </div>
      ) : (
        <div className="mt-4">
          {data.map((e, i) => {
            return (
              <div
                className="bg-gray-900 mt-2 w-full border-b header border-gray-600 "
                key={i}
              >
                <div className="flex items-center">
                  <p className="text-red-500">{e.name}</p>
                  <p className="ml-3 text-xs">
                    ({new Date(e.timestamp).toLocaleString()})
                  </p>
                </div>
                <ReactStars
                  size={15}
                  half={true}
                  edit={false}
                  value={e.rating}
                />
                <p>{e.though}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Review;
