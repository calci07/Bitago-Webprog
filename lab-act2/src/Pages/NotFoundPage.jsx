import React from 'react';
import Button from '../components/Button';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center pt-32 px-4 text-center">
      <h1 className="text-8xl font-extrabold text-[#5D8A37] mb-4">404</h1>
      <h2 className="text-4xl font-bold text-zinc-900 mb-6">Swamp Not Found</h2>
      <p className="text-lg text-zinc-600 max-w-lg mb-8">
        Oops! It looks like you've wandered into the wrong part of the swamp. The page you are looking for doesn't exist or has been moved.
      </p>
      <Button to="/" variant="primary">
        Return Home
      </Button>
    </div>
  );
}

export default NotFoundPage;