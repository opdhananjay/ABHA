const Footer = () => {
  return (
    <footer className="w-full border-t bg-white text-gray-600 text-sm">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2">

        {/* Left */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} ABDM. All rights reserved.
        </p>

        {/* Right */}
        <p className="text-center md:text-right text-gray-500">
          Ayushman Bharat Digital Mission
        </p>

      </div>

    </footer>
  );
};

export default Footer;