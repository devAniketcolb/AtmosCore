import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        {/* Child routes (pages) will be rendered here */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;