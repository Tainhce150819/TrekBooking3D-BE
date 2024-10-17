/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, FormEvent } from "react";
import "../../../public/css/authen.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import authenticateService from "../services/authenticateService";
import { toast } from "react-toastify";
const signUpClient = () => {
  const [isPassword, setIsPassword] = useState(true);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [roleId, setRoleId] = useState(2);
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => {
    setIsPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await authenticateService.signUpSupplier({
        email,
        supplierName,
        password,
        roleId,
      });
      toast.success("Sign up successfully!");
      setTimeout(() => {
        router.push("/login_supplier");
      }, 2000);
    } catch (error) {
      toast.error("Sign up unsuccessful!");
    }
  };
  return (
    <div>
      <div className="image-bk">
        <div className="login">
          <div className="text-login">
            <h3 className="text-center font-bold color-black text-xl">Sign up to be a Supplier</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="text-input relative">
              <p className="color-black m-0 pt-2 pb-1">Enter your email</p>
              <input
                className="input-text"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="color-black m-0 pt-2 pb-1">Enter your supplier name</p>
              <input
                className="input-text"
                type="text"
                placeholder="UserName"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                required
              />
              <p className="m-0 pt-4 pb-1">Enter your password</p>
              <input
                className="input-text"
                type={isPassword ? "password" : "text"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
                src="/image/hide.png"
                className="inout-hide cursor-pointer"
                onClick={togglePasswordVisibility}
                alt=""
              />

              <p className="m-0 pt-4 pb-1">Enter your confirm password</p>
              <input
                className="input-text"
                type={isPassword ? "password" : "text"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
                src="/image/hide.png"
                className="input-hide cursor-pointer"
                onClick={togglePasswordVisibility}
                alt=""
              />
              <div className="flex justify-center">
                <button
                    className="w-4/5 text-xl text-white button-text mt-4"
                    style={{ backgroundColor: "#305A61", borderRadius: "20px" }}
                  >
                    Continue
                  </button>
              </div>
                

              <div className="nav-sign flex justify-between">
                <Link
                  className="pt-2 text-right text-base cursor-pointer text-decoration"
                 
                  href="login_supplier"
                >
                  You have a account?
                </Link>
                
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default signUpClient;
