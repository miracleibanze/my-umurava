import React, { useEffect } from "react";
import Link from "next/link";
import { FC, useState } from "react";
import { jobTitles } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { registerUser, User } from "@redux/slices/userSlice";

const Register: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const isRedirect = searchParams.get("redirect");

  const [formData, setFormData] = useState<User>({
    names: "",
    email: "",
    password: "",
    title: "",
    phoneNumber: "",
    role: "",
  });
  const [isPasswordVissible, setIsPasswordVissible] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [stepToRegister, setStepToRegister] = useState<number>(0);
  const handleVisibility = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordVissible(e.target.checked);
  };
  const [validation, setValidation] = useState<{
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  }>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [passwordTest, setPasswordTest] = useState<string>("");

  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target; // Extract name and value directly

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordTest(value);

    setValidation({
      length: value.length >= 6,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };
  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      dispatch(registerUser(formData)); // Store full user data in Redux
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setIsRegistering(false);
    }
  };

  useEffect(() => {
    if (status === "succeeded") router.push(redirectTo);
  }, [status]);

  return (
    <>
      {stepToRegister === 0 && (
        <>
          <h3 className="h3 font-semibold">Register Now</h3>
          <p className="body-2 text-zinc-600 mb-6">
            Create a new account to continue to you UMURAVA,
            <br className="max-md:hidden" /> or already have account ?.{" "}
            <Link
              href={isRedirect ? `/login?redirect=${isRedirect}` : "/login"}
              className="text-primary"
            >
              Login
            </Link>
          </p>
          <label
            htmlFor="names"
            className="flex flex-col w-full mx-auto text-start mb-2"
          >
            <span className="text-sm text-zinc-600 translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
              Names
            </span>
            <input
              type="text"
              className="input placeholder-[10px]"
              id="names"
              name="names"
              placeholder="Enter your full names"
              required
              onChange={handleData}
            />
          </label>
          <label
            htmlFor="email"
            className="flex flex-col w-full mx-auto text-start mb-4"
          >
            <span className="text-sm text-zinc-600 translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
              Email
            </span>
            <input
              type="text"
              className="input placeholder-[10px]"
              id="email"
              name="email"
              placeholder="Enter your Email"
              onChange={handleData}
            />
          </label>

          <label
            htmlFor="phoneNumber"
            className="flex flex-col w-full mx-auto text-start mb-2"
          >
            <span className="text-sm text-zinc-600 translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
              Telephone
            </span>
            <input
              type="text"
              className="input placeholder-[10px]"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter you Phone number"
              onChange={handleData}
              required
            />
          </label>
          <div className="w-full flex justify-end">
            <button
              className="button bg-primary text-white"
              onClick={() => setStepToRegister(1)}
            >
              Next
            </button>
          </div>
        </>
      )}
      {stepToRegister === 1 && (
        <>
          <button
            className="button float-left bg-zinc-200 hover:bg-zinc-300 max-w-max mb-4"
            onClick={() => setStepToRegister(0)}
          >
            <i className="fas fa-arrow-left "></i>
          </button>
          <p className="block body-2 text-start">
            Continue by choosing a strong password.
          </p>
          <label
            htmlFor="passwordCheck"
            className="flex flex-col w-full mx-auto text-start"
          >
            <span className="text-sm text-zinc-600 translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
              Password
            </span>
            <input
              type={isPasswordVissible ? "text" : "password"}
              className="input placeholder-[10px]"
              id="passwordCheck"
              name="passwordCheck"
              placeholder="Enter your Password"
              onChange={handlePasswordChange}
            />
          </label>
          <label
            htmlFor="show"
            className="flex items-center w-full mx-auto text-start py-2 px-2 gap-2"
          >
            <input
              type="checkbox"
              id="show"
              name="show"
              onChange={handleVisibility}
              className="h-max"
            />
            <span className="text-sm text-zinc-600">Show password</span>
          </label>
          <div className="slide-in space-y-1 text-sm px-2">
            <p className="text-zinc-600">
              <i
                className={`fas pr-2 ${
                  validation.length
                    ? "fa-check text-green-500"
                    : "fa-times text-red-500"
                }`}
              ></i>{" "}
              Minimum 6 characters
            </p>
            <p className="text-zinc-600">
              <i
                className={`fas pr-2 ${
                  validation.uppercase
                    ? "fa-check text-green-500"
                    : "fa-times text-red-500"
                }`}
              ></i>{" "}
              At least one uppercase letter
            </p>
            <p className="text-zinc-600">
              <i
                className={`fas pr-2 ${
                  validation.lowercase
                    ? "fa-check text-green-500"
                    : "fa-times text-red-500"
                }`}
              ></i>{" "}
              At least one lowercase letter
            </p>
            <p className="text-zinc-600">
              <i
                className={`fas pr-2 ${
                  validation.number
                    ? "fa-check text-green-500"
                    : "fa-times text-red-500"
                }`}
              ></i>{" "}
              At least one number
            </p>
            <p className="text-zinc-600 mb-4">
              <i
                className={`fas pr-2 ${
                  validation.special
                    ? "fa-check text-green-500"
                    : "fa-times text-red-500"
                }`}
              ></i>{" "}
              At least one special character
            </p>
          </div>
          <label
            htmlFor="password"
            className="flex flex-col w-full mx-auto text-start mb-4"
          >
            <span className="text-sm text-zinc-600 z-[10] translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
              Confirm Password:
            </span>
            <div className="flex relative">
              <input
                type={isPasswordVissible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleData}
                placeholder="Enter your password to comfirm"
                className="input placeholder-[10px] border-e-0"
              />
              <span className="absolute right-1 top-0 bottom-0 flex items-center justify-center p-1">
                <i
                  className={`fas border-dashed border-2 rounded-full text-lg px-1 py-0.5 flex items-center justify-center ${
                    formData.password === passwordTest
                      ? formData.password !== "" &&
                        "fa-check text-green-500 border-green-700"
                      : "fa-times text-red-500 border-red-700"
                  }`}
                ></i>
              </span>
            </div>
          </label>
          <div className="w-full flex justify-end">
            <button
              className="button bg-primary text-white"
              onClick={() => setStepToRegister(2)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {stepToRegister === 2 && (
        <>
          <button
            className="button float-left bg-zinc-200 hover:bg-zinc-300 max-w-max mb-4"
            onClick={() => setStepToRegister(1)}
          >
            <i className="fas fa-arrow-left "></i>
          </button>
          <p className="body-2 text-zinc-700">
            Last step to create your UMURAVA account,
          </p>
          <label
            htmlFor="role"
            className="flex flex-col w-full mx-auto text-start mb-2"
          >
            <span className="text-sm text-zinc-600 translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
              Role
            </span>
            <select
              id="role"
              name="role"
              className="input"
              onChange={handleData}
            >
              <option value="">- Select role -</option>
              <option value="talent">Talent</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <label
            htmlFor="title"
            className="flex flex-col w-full mx-auto text-start mb-2"
          >
            <span className="text-sm text-zinc-600 translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
              Title
            </span>
            <select
              id="title"
              name="title"
              className="input"
              onChange={handleData}
            >
              <option value="">- Select title -</option>
              {jobTitles?.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <p className="slide-in text-sm text-gray-600 mb-6">
            By clicking <strong>Register</strong>, you confirm that you have
            read and agree to our{" "}
            <a
              href="/terms"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Privacy Policy
            </a>
            .
          </p>
          <button
            className="button bg-primary text-white mx-auto px-12"
            onClick={handleRegister}
          >
            Register
          </button>
        </>
      )}
      {stepToRegister === 3 && (
        <>
          <h4 className="h4 font-semibold text-center mb-2">
            Account created successfully
          </h4>
          <p className="body-2 text-zinc-600 text-center mb-6 leading-tight">
            Your account has been created, tap <strong>Get started</strong> to
            continue to {formData.role} dashboard
          </p>
          <button
            className={`button max-w-max mx-auto ${
              isRegistering ? "bg-zinc-400" : "bg-primary text-white"
            }`}
            onClick={handleRegister}
            disabled={isRegistering}
          >
            Get started
          </button>
        </>
      )}
    </>
  );
};

export default Register;
