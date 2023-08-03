import React from 'react'
import { FaCheckCircle, FaCode, FaBoxOpen } from 'react-icons/fa'

const Feature = ({ title, description, icon }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="p-4 bg-blue-500 rounded-full text-white text-2xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  )
}

const Features = () => {
  return (
    <div className="flex flex-col justify-between mb-6 mt-6">
      <h2 className="text-3xl font-semibold text-center mb-8">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Feature
          title="Easy Installation"
          description="Simplify the process of setting up MinGW with just two clicks."
          icon={<FaCheckCircle />}
        />
        <Feature
          title="Latest GCC Version"
          description="Get access to the latest version of GCC for enhanced development."
          icon={<FaCode />}
        />
        <Feature
          title="Essential Packages"
          description="Included essential packages to kickstart your production environment."
          icon={<FaBoxOpen />}
        />
        {/* Add more Feature components here */}
      </div>
    </div>
  )
}

export default Features
