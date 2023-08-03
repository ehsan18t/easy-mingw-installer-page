import React from 'react'
import { FaDownload } from 'react-icons/fa'

const DownloadLink = ({ platform, link }) => {
  return (
    <a
      target="_blank"
      href={link}
      className="w-full lg:w-2/5 remove-underline px-4 md:px-0"
    >
      <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white flex items-center justify-center">
          <FaDownload className="text-4xl" />
        </div>
        <div className="p-6 bg-white">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            {platform}
          </h3>
          <p className="text-gray-600 mb-2">Click to download</p>
        </div>
      </div>
    </a>
  )
}

export default DownloadLink
