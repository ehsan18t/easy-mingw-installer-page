import { FaDownload } from 'react-icons/fa';

const DownloadLink = ({ platform, link }) => {
  return (
    <a
      target="_blank"
      href={link}
      className="remove-underline w-full px-4 md:px-0 lg:w-2/5"
      rel="noreferrer">
      <div className="transform overflow-hidden rounded-lg border shadow-md transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
        <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 p-6 text-white">
          <FaDownload className="text-4xl" />
        </div>
        <div className="bg-white p-6">
          <h3 className="mb-2 text-xl font-semibold text-gray-800">{platform}</h3>
          <p className="mb-2 text-gray-600">Click to download</p>
        </div>
      </div>
    </a>
  );
};

export default DownloadLink;
