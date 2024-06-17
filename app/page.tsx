// app/page.tsx

import { redirect } from 'next/navigation';  // Importing redirect function from next/navigation to handle redirection
import { auth } from '@/utils/auth';  // Importing auth function from the custom auth utility
import HomePage from '@/components/Home';  // Importing the HomePage component

// Async function component for the Profile page
const ProfilePage = async () => {
  const session = await auth();  // Calling the auth function to get the session

  // If no session is found, redirect to the sign-in page
  if (!session) {
    console.log('No session found, redirecting to login');  // Logging for debugging
    redirect('/auth/signin');
  }

  return (
    <div>
      <HomePage />
    </div>
  );
};

export default ProfilePage;  // Exporting the ProfilePage component as default
