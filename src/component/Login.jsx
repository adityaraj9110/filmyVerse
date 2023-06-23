import { getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { usersRef } from "../firebase/firebase";
import bcrypt from "bcryptjs";
import { AppState } from "../App";

const Login = () => {
  const useAppState = useContext(AppState);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (form.mobile.trim() === "" || form.password.trim() === "") {
      swal({
        title: "Fill all the given filled",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    } else {
      setLoading(true);
      try {
        const quer = query(usersRef, where("mobile", "==", form.mobile));
        const querySnapShot = await getDocs(quer);
        if (querySnapShot.empty) {
          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000,
          });
        } else {
          querySnapShot.forEach((doc) => {
            const _data = doc.data();
            const isUser = bcrypt.compareSync(form.password, _data.password);
            if (isUser) {
              useAppState.setLogin(true);
              useAppState.setUserName(_data.name);

              swal({
                title: "Login",
                icon: "success",
                buttons: false,
                timer: 3000,
              });
              let localData = [true,_data.name]
              localStorage.setItem("isLogin", JSON.stringify(localData));
              navigate("/");
            } else {
              swal({
                title: "Invalid Credentials",
                icon: "error",
                buttons: false,
                timer: 3000,
              });
            }
          });
        }
      } catch (error) {
        swal({
          title: error.message,
          icon: "success",
          buttons: false,
          timer: 3000,
        });
      }
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col mt-4 items-center justify-center">
      <h1 className="text-xl font-bold">Login</h1>

      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="name" class="leading-7 text-sm text-gray-300">
            Mobile No.
          </label>
          <input
            required
            type="number"
            id="name"
            name="name"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            class="w-full bg-white  rounded border border-gray-300 focus:border-red-500 header focus:ring-2 focus:ring-red-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="name" class="leading-7 text-sm text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="name"
            name="name"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            class="w-full bg-white  rounded border border-gray-300 focus:border-red-500  focus:ring-2 focus:ring-red-200 header text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div class="p-2 w-full">
        <button
          onClick={login}
          class="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-700 rounded text-lg"
        >
          {loading ? <TailSpin height={25} color="white" /> : "Login"}
        </button>
      </div>

      <div>
        <p>
          Do not have account ?{" "}
          <Link to={"/signup"}>
            <span className="text-red-500 cursor-pointer">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
