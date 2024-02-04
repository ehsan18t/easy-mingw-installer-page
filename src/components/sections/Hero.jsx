import { FaDownload, FaGithub } from 'react-icons/fa';

const Hero = () => {
  const jumpTo = (id) => {
    const relevantElement = document.getElementById(id);
    relevantElement.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-r from-teal-900 to-blue-600 py-20 text-white">
      <div className="mx-auto text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight">Easy MinGW Installer</h1>
        <p className="mx-auto mb-8 max-w-lg text-lg">
          Simplify your MinGW setup with a seamless two-click installation experience.
        </p>
        <div className="mx-8 flex flex-col justify-center gap-2 md:flex-row">
          <button
            onClick={() => jumpTo('download-section')}
            className="inline-flex transform items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 text-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg">
            <FaDownload className="text-xl" />
            Download Now
          </button>
          <a
            href="https://github.com/ehsan18t/easy-mingw-installer"
            target="_blank"
            rel="noopener noreferrer"
            className="remove-underline inline-flex transform items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gray-700 to-slate-800 px-6 py-3 text-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg">
            <FaGithub className="text-xl" />
            View Project on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
