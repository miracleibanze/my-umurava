"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { loginUser } from "@redux/slices/userSlice";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { status, user } = useSelector((state: RootState) => state.user);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const isRedirect = searchParams.get("redirect");
  interface LoginForm {
    email: string;
    password: string;
    data?: string;
  }

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<LoginForm>({
    email: "",
    password: "",
    data: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const handleVisibility = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordVisible(e.target.checked);
  };

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({ email: "", password: "" });
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,}$/;

  const handleSubmit = async (e?: React.FormEvent) => {
    setIsLoggingIn(true);
    if (e) e.preventDefault(); // Prevent default form submission

    const trimmedEmail = formData.email.trim().toLowerCase();

    if (!emailRegex.test(trimmedEmail)) {
      setError((prevError) => ({
        ...prevError,
        email: "Please enter a valid email",
      }));
      return;
    }

    if (!formData.password.trim()) {
      setError((prevError) => ({
        ...prevError,
        password: "Please enter your password",
      }));
      return;
    }

    try {
      dispatch(loginUser(formData));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoggingIn(false);
    }
  };
  useEffect(() => {
    if (status === "succeeded" && user?.names) {
      router.push(redirectTo);
    } else if (status === "succeeded" && !user?.names) {
      setError({ ...error, data: "invalid email or password" });
    }
  }, [status]);

  return (
    <>
      <h3 className="h3 font-semibold">Welcome back</h3>
      <p className="body-2 text-zinc-600 mb-6">
        Sign in to continue to your UMURAVA dashboard,{" "}
        <br className="max-md:hidden" />
        or don't have an account?{" "}
        <Link
          href={isRedirect ? `/register?redirect=${isRedirect}` : "/register"}
          className="text-primary"
        >
          Sign up
        </Link>
      </p>

      {error.data !== "" && (
        <span className="text-sm text-red-600 px-4">{error.data}</span>
      )}
      <form onSubmit={handleSubmit} className="w-full flex flex-col ">
        <label
          htmlFor="email"
          className="flex flex-col w-full mx-auto text-start mb-2"
        >
          <span className="text-sm text-zinc-600 translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
            Email
          </span>
          <input
            type="text"
            className="input bg-transparent placeholder-[10px]"
            id="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleData}
          />
          {error.email !== "" && (
            <span className="text-sm text-red-600 px-4">{error.email}</span>
          )}
        </label>

        <label
          htmlFor="password"
          className="flex flex-col w-full mx-auto text-start"
        >
          <span className="text-sm text-zinc-600 translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
            Password
          </span>
          <input
            type={isPasswordVisible ? "text" : "password"}
            className="input bg-transparent placeholder-[10px]"
            id="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleData}
          />
          {error.password !== "" && (
            <span className="text-sm text-red-600 px-4">{error.password}</span>
          )}
        </label>

        <label
          htmlFor="show"
          className="flex items-center w-full mx-auto text-start py-2 px-2 gap-2"
        >
          <input
            type="checkbox"
            id="show"
            onChange={handleVisibility}
            className="h-max"
          />
          <span className="text-sm text-zinc-600">Show password</span>
        </label>

        <div className="w-full flex justify-end">
          <Link href="" className="text-sm text-primary mb-6 ">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className={`button mx-auto px-12 ${
            isLoggingIn ? "bg-zinc-400" : "bg-primary text-white"
          }`}
          disabled={isLoggingIn}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
