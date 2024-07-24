"use client"
import React, { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import logo from "@/public/OPTIWASTE.png";
import { registerUser } from "@/apis/api";
import { SharedSignUpForm } from "../shared-signup-form";

interface FormData {
  name: string;
  email: string;
  password: string;
  address: string;
  mobile: string;
  // terms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  mobile?: string;
  // terms?: string;
  form?: string;
}

export default function RegistrationPage(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    address: "",
    mobile: "",
    // terms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    // if (!formData.terms) newErrors.terms = "You must agree to the terms and conditions";
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      // Include role in the registration data
      const registrationData = {
        ...formData,
        role: 'user' as const // Setting default role to 'user'
      };
      const response = await registerUser(registrationData);
      console.log("registration response:", response);
      if (response.status === 201) {
        setSuccessMessage("Account created successfully. Redirecting to login page...");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setErrors({ form: "Registration failed. Please try again." });
      }
    } catch (error) {
      setErrors({ form: (error as Error).message || "Registration failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh]">
      <div className="hidden lg:block lg:w-1/2 bg-[url('/waste-truck.svg')] bg-cover bg-center" />
      <div className="flex flex-col justify-between w-full lg:w-1/2 p-6 md:p-10 lg:p-12 xl:p-16 mx-auto max-w-md">
        <div className="flex flex-col items-center">
          <Image src={logo} alt="logo" height={150} width={150} className="mb-6" />
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Create User account</h1>
            <p className="text-muted-foreground md:text-xl">Get started with our platform today.</p>
          </div>
        </div>
        <div className="flex flex-col items-start gsp-6">
          {successMessage && <div className="text-green-600">{successMessage}</div>}
          {errors.form && <div className="text-red-600">{errors.form}</div>}
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <SharedSignUpForm
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <div className="w-full text-center mt-4">

            <Link href="/login" className="text-primary hover:underline">Already have an account?{" "} Log in</Link>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">&copy; 2024 OptiWaste. All rights reserved.</div>
      </div>
    </div>
  );
}