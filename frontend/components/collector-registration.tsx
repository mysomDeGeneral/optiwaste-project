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
  nationalId?: string;
  licenseId?: string;
  dob?: string;
  digitalAddress?: string;
  wasteTypes?: string;
  form?: string;
}

interface wasteTypeOption {
  value: string;
  label: string;
}

const wasteTypeOptions: wasteTypeOption[] = [
  { value: "plastic", label: "Plastic" },
  { value: "paper", label: "Paper" },
  { value: "glass", label: "Glass" },
  { value: "metal", label: "Metal" },
  { value: "domestic", label: "Domestic" },
  { value: "e-waste", label: "E-Waste" },
  { value: "hazardous", label: "Hazardous" },
  { value: "construction", label: "Construction" },
];

export default function CollectorSignUpPage(): JSX.Element {
  const [formData, setFormData] = useState<CollectorFormData>({
    name: "",
    email: "",
    password: "",
    address: "",
    mobile: "",
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

const handleWasteTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { value, checked } = e.target;
  setFormData((prev) => ({
    ...prev,
    wasteTypes: checked
      ? [...prev.wasteTypes, value]
      : prev.wasteTypes.filter((type) => type !== value),
  }));
};

  const validateForm = (): CollectorFormErrors => {
    const newErrors: CollectorFormErrors = {};
    if(formData.wasteTypes.length === 0) {
      newErrors.wasteTypes = "Please select at least one waste type.";
    }
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
      <div className="flex flex-col justify-between w-full lg:w-1/2 p-6 md:p-10 lg:p-12 xl:p-16 mx-auto max-w-md">
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
              placeholder="Date of Birth(mmddyyyy)"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
        
             <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Waste Types (Select all that apply)
      </label>
      <div className="grid grid-cols-2 gap-2">
        {wasteTypeOptions.map((type) => (
          <div key={type.value} className="flex items-center">
            <input
              type="checkbox"
              id={`wasteType-${type.value}`}
              name="wasteTypes"
              value={type.value}
              checked={formData.wasteTypes.includes(type.value)}
              onChange={handleWasteTypeChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor={`wasteType-${type.value}`}
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {type.label}
            </label>
          </div>
        ))}
      </div>
    </div>
    {errors.wasteTypes && (
              <p className="text-red-500 text-xs italic">{errors.wasteTypes}</p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Collector Account..." : "Create Collector Account"}
            </Button>
          </form>
          <div className="w-full text-center mt-4">
            
            <Link href="/login" className="text-primary hover:underline">
             Already have an account?{" "} Log in
            </Link>
          </div>
        </div>
        <div className="text-xs text-muted-foreground text-center">&copy; 2024 OptiWaste. All rights reserved.</div>
      </div>
    </div>
  );
}