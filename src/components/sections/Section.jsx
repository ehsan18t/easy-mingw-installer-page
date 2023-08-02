import React from 'react'

const Section = ({ title, content, backgroundColor, textColor }) => {
  const sectionStyle = {
    backgroundColor: backgroundColor || 'bg-gray-100',
    color: textColor || 'text-gray-700',
  }

  return (
    <div
      className={`py-12 px-6 shadow-md border border-gray-300 ${sectionStyle.backgroundColor}`}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl mb-2 font-semibold">{title}</h2>
        <p className={`text-lg text-justify ${sectionStyle.color}`}>
          {content}
        </p>
      </div>
    </div>
  )
}

export default Section
