// components/Footer.jsx

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="mb-2">
          © {new Date().getFullYear()} My Website. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="/about" className="hover:text-gray-400">
            About
          </a>
          <a href="/services" className="hover:text-gray-400">
            Services
          </a>
          <a href="/contact" className="hover:text-gray-400">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
