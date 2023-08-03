import React from 'react'

const Section = ({ title, content, backgroundColor, textColor }) => {
  const sectionStyle = {
    backgroundColor: backgroundColor || 'bg-gray-100',
    color: textColor || 'text-gray-700',
  }

  return (
    <div
      className={`py-10 px-6 border border-gray-300 ${sectionStyle.backgroundColor}`}
    >
      <div className="flex flex-col gap-3 justify-center items-center">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <p className={`text-lg text-justify ${sectionStyle.color}`}>
          {content}
        </p>
      </div>
    </div>
  )
}

export default Section
