import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

function ProfilePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {/* Personal Information */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        
        {/* Profile Picture */}
        <div className="mb-4">
          <label className="block mb-1">Profile Picture</label>
          <Input type="file" className="w-full" />
        </div>
        
        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <Input type="text" className="w-full" placeholder="Full Name" />
        </div>
        
        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <Input type="email" className="w-full" placeholder="Email Address" />
        </div>
        
        {/* Phone Number */}
        <div className="mb-4">
          <label className="block mb-1">Phone Number</label>
          <Input type="tel" className="w-full" placeholder="Phone Number" />
        </div>
      </section>

      {/* Job Information */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Job Information</h2>
        
        {/* Job Title */}
        <div className="mb-4">
          <label className="block mb-1">Job Title</label>
          <Input type="text" className="w-full" placeholder="Job Title" />
        </div>
        
        {/* Department */}
        <div className="mb-4">
          <label className="block mb-1">Department</label>
          <Input type="text" className="w-full" placeholder="Department" />
        </div>
        
        {/* Manager */}
        <div className="mb-4">
          <label className="block mb-1">Manager</label>
          <Input type="text" className="w-full" placeholder="Manager" />
        </div>
      </section>

      {/* Contact Information */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        
        {/* Address */}
        <div className="mb-4">
          <label className="block mb-1">Address</label>
          <Input type="text" className="w-full" placeholder="Address" />
        </div>
        
        {/* Emergency Contact */}
        <div className="mb-4">
          <label className="block mb-1">Emergency Contact</label>
          <Input type="text" className="w-full" placeholder="Emergency Contact" />
        </div>
      </section>

      {/* Preferences */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Preferences</h2>
        
        {/* Preferred Communication Method */}
        <div className="mb-4">
          <label className="block mb-1">Preferred Communication Method</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                {/* Add more options */}
              </SelectContent>
            </SelectTrigger>
          </Select>
        </div>
        
        {/* Subscription Preferences */}
        <div className="flex items-center mb-4">
          <label className="block mb-1 flex-1">Newsletter Subscription</label>
          <Switch className="mr-2" />
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
