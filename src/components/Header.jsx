import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-700 to-slate-700 text-white py-4 shadow-md rounded-lg">
      <div className="container mx-auto flex items-center justify-center px-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wide drop-shadow-lg">
          RockOrbit
        </h1>
      </div>
    </header>
  );
};

export default Header;
