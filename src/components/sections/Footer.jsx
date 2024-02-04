const Footer = () => {
  return (
    <div className="bottom-0 w-full">
      <div className="flex justify-center border-t-[1px] border-gray-200 bg-white p-4 text-gray-700">
        <p className="text-xs">
          &copy; 2023 Easy MinGW Installer | Created by{' '}
          <a
            target="_blank"
            className="text-xs text-emerald-600"
            href="https://github.com/ehsan18t"
            rel="noreferrer">
            Ehsan Khan
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
