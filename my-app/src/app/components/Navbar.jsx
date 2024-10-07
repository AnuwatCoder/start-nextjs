// components/Navbar.jsx

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-lg font-bold">My Website</div>
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white">
            About
          </Link>
          <Link href="/announcement" className="text-gray-300 hover:text-white">
            Announcement
          </Link>
          <Link href="/posts" className="text-gray-300 hover:text-white">
            Posts
          </Link>
          <Link href="/services" className="text-gray-300 hover:text-white">
            Services
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
