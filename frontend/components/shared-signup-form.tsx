import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

interface SharedFormData {
  name: string;
  email: string;
  password: string;
  address: string;
  mobile: string;
  terms: boolean;
}

interface SharedFormErrors {
  name?: string;
  email?: string;
  password?: string;
  mobile?: string;
  terms?: string;
}

interface SharedSignUpFormProps {
  formData: SharedFormData;
  errors: SharedFormErrors;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (checked: boolean) => void;
}

export const SharedSignUpForm: React.FC<SharedSignUpFormProps> = ({
  formData,
  errors,
  handleInputChange,
  handleCheckboxChange
}) => {
  return (
    <>
      <div className="grid gap-2">
        <Input 
          id="name" 
          name="name"
          type="text" 
          placeholder="John Doe" 
          value={formData.name}
          onChange={handleInputChange}
          required 
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      </div>
      <div className="grid gap-2">
        <Input 
          id="email" 
          name="email"
          type="email" 
          placeholder="m@example.com" 
          value={formData.email}
          onChange={handleInputChange}
          required 
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
      </div>
      <div className="grid gap-2">
        <Input 
          id="password" 
          name="password"
          type="password" 
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
      </div>
      <div className="grid gap-2">
        <Input 
          id="address" 
          name="address"
          type="text" 
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2">
        <Input 
          id="mobile" 
          name="mobile"
          type="tel" 
          placeholder="Mobile number"
          value={formData.mobile}
          onChange={handleInputChange}
          required
        />
        {errors.mobile && <p className="text-red-600 text-sm">{errors.mobile}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Checkbox 
          id="terms" 
          name="terms"
          checked={formData.terms}
          onCheckedChange={handleCheckboxChange}
          required 
        />
        <Label htmlFor="terms" className="text-sm text-muted-foreground">
          I agree to the{" "}
          <Link href="#" className="underline underline-offset-2" prefetch={false}>
            terms and conditions
          </Link>
        </Label>
      </div>
      {errors.terms && <p className="text-red-600 text-sm">{errors.terms}</p>}
    </>
  );
};