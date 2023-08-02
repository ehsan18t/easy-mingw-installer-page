import React from 'react'

const Footer = () => {
  return (
    <div className="bottom-0 w-full">
      <div className="flex justify-center bg-gray-200/70 p-4">
        <p className="text-xs">
          &copy; 2023 Easy MinGW Installer | Created by{' '}
          <a
            target="_blank"
            className="text-xs text-emerald-600"
            href="https://github.com/ehsan18t"
          >
            Ehsan Khan
          </a>
        </p>
      </div>
    </div>
  )
}

export default Footer
