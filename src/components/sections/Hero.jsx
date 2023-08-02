import React from 'react'

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-teal-900 to-blue-600 py-20 text-white">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          Easy MinGW Installer
        </h1>
        <p className="text-lg mb-8 max-w-lg mx-auto">
          Simplify your MinGW setup with a seamless two-click installation
          experience.
        </p>
        <a
          href="#download-section"
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-8 rounded-full shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Download Now
        </a>
      </div>
    </div>
  )
}

export default Hero
