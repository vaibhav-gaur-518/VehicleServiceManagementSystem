function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-center p-6 text-gray-400 md:flex md:items-center md:justify-between md:px-10">
      <p className="text-sm md:text-base">&copy; {currentYear} Vehicle Service System. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
