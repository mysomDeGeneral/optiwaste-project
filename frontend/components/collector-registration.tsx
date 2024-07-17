"use client"
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/public/OPTIWASTE.png";
import { registerCollector } from "@/apis/api";
import { SharedSignUpForm } from "./shared-signup-form";
import Link from "next/link";

interface CollectorFormData {
  name: string;
  email: string;
  password: string;
  address: string;
  mobile: string;
//   terms: boolean;
  nationalId: string;
  licenseId: string;
  dob: string;
  digitalAddress: string;
  wasteTypes: string[];
}

interface CollectorFormErrors {
  name?: string;
  email?: string;
  password?: string;
  mobile?: string;
//   terms?: string;
  nationalId?: string;
  licenseId?: string;
  dob?: string;
  digitalAddress?: string;
  wasteTypes?: string;
  form?: string;
}

export default function CollectorSignUpPage(): JSX.Element {
  const [formData, setFormData] = useState<CollectorFormData>({
    name: "",
    email: "",
    password: "",
    address: "",
    mobile: "",
    // terms: false,
    nationalId: "",
    licenseId: "",
    dob: "",
    digitalAddress: "",
    wasteTypes: [],
  });
  const [errors, setErrors] = useState<CollectorFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

//   const handleCheckboxChange = (checked: boolean) => {
//     setFormData(prev => ({ ...prev, terms: checked }));
//   };

  const validateForm = (): CollectorFormErrors => {
    const newErrors: CollectorFormErrors = {};
    // ... (add validation for collector-specific fields)
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
      const response = await registerCollector(formData);
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
      <div className="flex flex-col justify-between w-full lg:w-1/2 p-6 md:p-10 lg:p-12 xl:p-16">
        <div className="flex flex-col items-center">
          <Image src={logo} alt="logo" width={150} height={150} className="mb-6" />
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Create Collector Account</h1>
            <p className="text-muted-foreground md:text-xl">Join our waste collection network today.</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-6">
          {successMessage && <div className="text-green-600 w-full text-center">{successMessage}</div>}
          {errors.form && <div className="text-red-600 w-full text-center">{errors.form}</div>}
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <SharedSignUpForm 
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
            //   handleCheckboxChange={handleCheckboxChange}
            />
            {/* Additional Collector-specific fields */}
            <Input 
              id="nationalId" 
              name="nationalId"
              type="text" 
              placeholder="National ID"
              value={formData.nationalId}
              onChange={handleInputChange}
              required
            />
            <Input 
              id="licenseId" 
              name="licenseId"
              type="text" 
              placeholder="License ID"
              value={formData.licenseId}
              onChange={handleInputChange}
              required
            />
            <Input 
              id="dob" 
              name="dob"
              type="date" 
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
            <Input 
              id="digitalAddress" 
              name="digitalAddress"
              type="text" 
              placeholder="Digital Address"
              value={formData.digitalAddress}
              onChange={handleInputChange}
              required
            />
            {/* You might want to add a multi-select or checkbox group for wasteTypes */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Collector Account..." : "Create Collector Account"}
            </Button>
          </form>
          <div className="w-full text-center mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
        </div>
        <div className="text-xs text-muted-foreground text-center">&copy; 2024 OptiWaste. All rights reserved.</div>
      </div>
    </div>
  );
}