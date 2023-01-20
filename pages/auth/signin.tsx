import React, { useState } from "react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  UserIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
// tự chế
import type { AppProviders } from "next-auth/providers";

import { getProviders, signIn } from "next-auth/react";
import Router from "next/router";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const SignIn: NextPage<{ providers: AppProviders }> = (props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [enteredValue, setEnteredValue] = useState<{
    name: string;
    email: string;
    password: string;
  }>({ name: "", email: "", password: "" });

  const changeFormHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setErrorMessage((prevState) => "");
    setIsLoginForm((prevState) => !prevState);
  };

  const inputNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage((prevState) => "");
    setEnteredValue((state) => {
      return {
        name: e.target.value,
        email: state.email,
        password: state.password,
      };
    });
  };

  const inputEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage((prevState) => "");
    setEnteredValue((state) => {
      return {
        name: state.name,
        email: e.target.value,
        password: state.password,
      };
    });
  };

  const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage((prevState) => "");
    setEnteredValue((state) => {
      return {
        name: state.name,
        email: state.email,
        password: e.target.value,
      };
    });
  };

  const submitAuthFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // validate
    if (
      !enteredValue.email.includes("@") ||
      enteredValue.email.trim().length < 6 ||
      !enteredValue.password ||
      enteredValue.password.trim().length < 6
    ) {
      setErrorMessage((prevState) => "6 characters length required");
      console.log("email and password must be greater than 6 characters");
      return;
    }

    if (isLoginForm) {
      // login
      setIsLoading(true);
      const signInResult = await signIn("credentials", {
        redirect: false,
        // callbackUrl: "/",
        email: enteredValue.email,
        password: enteredValue.password,
      });

      setIsLoading(false);
      if (signInResult?.error) {
        setErrorMessage((prevState) => {
          return signInResult.error || "";
        });
        console.log(signInResult.error);
      } else {
        setErrorMessage((prevState) => "login successfully!!!");
      }
    } else {
      // signup

      if (!enteredValue.name || enteredValue.name.trim().length < 6) {
        setErrorMessage((prevState) => "6 characters length required");
        console.log("email and password must be greater than 6 characters");
        return;
      }
      setIsLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          name: enteredValue.name,
          email: enteredValue.email,
          password: enteredValue.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);

      const data = await response.json();
      // also successful message
      setErrorMessage((prevState) => data.message);

      if (response.ok) {
        setEnteredValue({
          name: "",
          email: "",
          password: "",
        });
      }
    }
  };

  const signInWithGoogle = async (e: React.FormEvent) => {
      const signInResult = await signIn("google", {
        // redirect: false,
        callbackUrl: "/",
        // email: enteredValue.email,
        // password: enteredValue.password,
      });
  };

  if (status === "loading") {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "authenticated") {
    router.replace("/");
  }

  return (
    <div className="bg-[url('https://static.vecteezy.com/system/resources/previews/007/164/537/original/fingerprint-identity-sensor-data-protection-system-podium-hologram-blue-light-and-concept-free-vector.jpg')] bg-cover w-full h-screen grid grid-cols-8">
      {/* content */}
      <div className="flex flex-col my-[46px] col-start-5 col-span-2 bg-white rounded-lg py-9 pl-11 pr-11">
        {/* title */}
        <h3 className="text-gray-800 font-bold text-3xl text-center mb-9">
          {isLoginForm ? "Login" : "Sign Up"}
        </h3>
        {/* form */}
        <form onSubmit={submitAuthFormHandler}>
          {!isLoginForm && (
            <div className="flex flex-col ">
              <label className="text-gray-800" htmlFor="name">
                Username
              </label>
              <div className="flex items-center border-b-2 border-gray-300">
                <UserIcon className="ml-3 h-4 text-gray-400" />
                <input
                  value={enteredValue.name}
                  onChange={inputNameHandler}
                  type="text"
                  id="name"
                  placeholder="Type your name"
                  className="flex-1 py-3 outline-none focus:ring-0 border-none text-sm "
                ></input>
              </div>
            </div>
          )}
          <div className="flex flex-col mt-3">
            <label className="text-gray-800" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border-b-2 border-gray-300">
              <UserIcon className="ml-3 h-4 text-gray-400" />
              <input
                value={enteredValue.email}
                onChange={inputEmailHandler}
                type="email"
                id="email"
                placeholder="Type your email"
                className="flex-1 py-3 outline-none focus:ring-0 border-none text-sm "
              ></input>
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <label className="text-gray-800" htmlFor="email">
              Password
            </label>
            <div className="flex items-center border-b-2 border-gray-300">
              <LockClosedIcon className="ml-3 h-4 text-gray-400" />
              <input
                value={enteredValue.password}
                onChange={inputPasswordHandler}
                type="password"
                id="password"
                placeholder="Type your password"
                className="flex-1 py-3 outline-none focus:ring-0 border-none text-sm input:text-black "
              ></input>
            </div>
          </div>
          {errorMessage && (
            <p className="text-sm italic text-red-500 text-right mt-3">
              {errorMessage}
            </p>
          )}
          <button
            disabled={isLoading}
            className="mt-6 flex items-center justify-center w-full text-center bg-gradient-to-r from-cyan-300 via-pink-300 to-purple-500 rounded-full py-2 font-base text-white uppercase disabled:pointer-events-none disabled:cursor-not-allowed"
            type="submit"
          >
            {isLoading ? <LoadingSpinner /> : isLoginForm ? "Login" : "Sign Up"}
          </button>
        </form>
        {/* sign in with other methods */}
        {isLoginForm && (
          <div className="text-center mt-4">
            <h5 className="text-gray-600 text-base mb-4">Or Sign In Using</h5>
            <div className="flex items-center justify-center space-x-3" onClick={signInWithGoogle}>
              <Image
                src="https://theplace2b.com.au/wp-content/uploads/2020/09/178-1783296_g-transparent-circle-google-logo-768x768.png"
                width={40}
                height={40}
                alt="img"
              />
            </div>
          </div>
        )}
        {/* switch to sign up/in */}
        <div className="mt-auto text-center">
          {isLoginForm && <h5>Or Sign Up Using</h5>}
          <button
            disabled={isLoading}
            onClick={changeFormHandler}
            type="button"
            className="mt-1 text-gray-900 text-base font-medium uppercase disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            {isLoginForm ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default SignIn;

/*
 {Object.values(props.providers).map((provider) => {
            return (
              <button
                key={provider.id}
                onClick={signInHandler.bind(null, provider.id)}
                className="sign-in-button"
              >
                Sign in with {provider.name}
              </button>
            );
          })}
*/
