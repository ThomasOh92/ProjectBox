// pages/index.tsx
import React from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1>Welcome to Project Box!</h1>
      <Link href="/projectboard">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            New Project
        </button>
      </Link>
    </div>
  );
};

export default Home;
