// src/app/profile/page.tsx

import { redirect } from 'next/navigation';
import { auth } from '@/utils/auth';
import HomePage from '@/components/Home';

const ProfilePage = async () => {
  const session = await auth();

  if (!session) {
    console.log('No session found, redirecting to login');
    redirect('/auth/signin');
  }

  return (
    <div>
      <HomePage />
    </div>
  );
};

export default ProfilePage;
