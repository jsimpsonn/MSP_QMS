'use client';

import React, { useState } from 'react';

const SettingsPage: React.FC = () => {
    const [username, setUsername] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

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
                alert('Settings updated successfully!');
            } else {
                alert('Failed to update settings.');
            }
        } catch (error) {
            console.error('Error updating settings:', error);
            alert('Error updating settings.');
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

export default SettingsPage;