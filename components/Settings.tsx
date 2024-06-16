// app/settings/page.tsx

'use client';

import React, { useState } from 'react';  // Importing React and useState hook

// Functional component for the Settings page
const SettingsPage: React.FC = () => {
    const [username, setUsername] = useState('');  // State to manage the username input

    // Handler for username input change
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    // Handler for form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/update-settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });
            if (response.ok) {
                alert('Settings updated successfully!');  // Alert success message
            } else {
                alert('Failed to update settings.');  // Alert failure message
            }
        } catch (error) {
            console.error('Error updating settings:', error);
            alert('Error updating settings.');  // Alert error message
        }
    };

    return (
        <div>
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default SettingsPage;  // Exporting the SettingsPage component as default
