"use client";

import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      
      {!isEditing && (
        <Button onClick={handleEditToggle} className="mb-4">
          Edit Settings
        </Button>
      )}

      {isEditing && (
        <Button onClick={handleEditToggle} className="mb-4">
          Save Settings
        </Button>
      )}

      {/* General Settings */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">General Settings</h2>
        
        {/* Language Preferences */}
        <div className="mb-4">
          <label className="block mb-1">Language</label>
          {isEditing ? (
            <Select>
              <SelectTrigger className="w-full">
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  {/* Add more languages */}
                </SelectContent>
              </SelectTrigger>
            </Select>
          ) : (
            <p>English</p> // Default or selected language in read-only mode
          )}
        </div>
        
        {/* Date & Time Format */}
        <div className="mb-4">
          <label className="block mb-1">Date & Time Format</label>
          {isEditing ? (
            <Select>
              <SelectTrigger className="w-full">
                <SelectContent>
                  <SelectItem value="mmddyyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="ddmmyyyy">DD/MM/YYYY</SelectItem>
                  {/* Add more formats */}
                </SelectContent>
              </SelectTrigger>
            </Select>
          ) : (
            <p>MM/DD/YYYY</p> // Default or selected format in read-only mode
          )}
        </div>
      </section>

      {/* Theme Settings */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Theme Settings</h2>
        
        {/* Theme Selection */}
        <div className="mb-4">
          <label className="block mb-1">Theme</label>
          {isEditing ? (
            <Select>
              <SelectTrigger className="w-full">
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </SelectTrigger>
            </Select>
          ) : (
            <p>System</p> // Default or selected theme in read-only mode
          )}
        </div>
      </section>

      {/* Notification Settings */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Notification Settings</h2>
        
        {/* Email Notifications */}
        <div className="flex items-center mb-4">
          <label className="block mb-1 flex-1">Email Notifications</label>
          {isEditing ? (
            <Switch className="mr-2" />
          ) : (
            <p>Enabled</p> // Default or selected status in read-only mode
          )}
        </div>
        
        {/* Push Notifications */}
        <div className="flex items-center mb-4">
          <label className="block mb-1 flex-1">Push Notifications</label>
          {isEditing ? (
            <Switch className="mr-2" />
          ) : (
            <p>Enabled</p> // Default or selected status in read-only mode
          )}
        </div>
      </section>

      {/* Account Settings */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
        
        {/* Change Password */}
        <div className="mb-4">
          <label className="block mb-1">Change Password</label>
          {isEditing ? (
            <>
              <Input type="password" className="w-full" placeholder="New Password" />
              <Button className="mt-2">Change Password</Button>
            </>
          ) : (
            <p>********</p> // Masked password in read-only mode
          )}
        </div>
        
        {/* Two-Factor Authentication */}
        <div className="flex items-center mb-4">
          <label className="block mb-1 flex-1">Two-Factor Authentication</label>
          {isEditing ? (
            <Switch className="mr-2" />
          ) : (
            <p>Enabled</p> // Default or selected status in read-only mode
          )}
        </div>
      </section>
    </div>
  );
}

export default SettingsPage;
