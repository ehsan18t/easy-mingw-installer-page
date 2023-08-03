import React from 'react'
import { FaGithub, FaDownload } from 'react-icons/fa'

const Hero = () => {
  const jumpTo = (id) => {
    const relevantElement = document.getElementById(id)
    relevantElement.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-gradient-to-r from-teal-900 to-blue-600 py-20 text-white">
      <div className="mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          Easy MinGW Installer
        </h1>
        <p className="text-lg mb-8 max-w-lg mx-auto">
          Simplify your MinGW setup with a seamless two-click installation
          experience.
        </p>
        <div className="flex flex-col md:flex-row gap-2 justify-center mx-8">
          <button
            onClick={() => jumpTo('download-section')}
            className="inline-flex gap-2 items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-8 rounded-full shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <FaDownload className="text-xl" />
            Download Now
          </button>
          <a
            href="https://github.com/ehsan18t/easy-mingw-installer"
            target="_blank"
            rel="noopener noreferrer"
            className="remove-underline inline-flex gap-2 items-center justify-center bg-gradient-to-r from-gray-700 to-slate-800 text-white py-3 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <FaGithub className="text-xl" />
            View Project on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero
