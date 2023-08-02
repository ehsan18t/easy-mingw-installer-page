import React, { useState, useEffect, useRef } from 'react'

const Accordion = ({ title, children }) => {
  const [active, setActive] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const contentRef = useRef(null)

  const toggleAccordion = () => {
    setActive((prevActive) => !prevActive)
  }

  useEffect(() => {
    setContentHeight(active ? contentRef.current.scrollHeight : 0)
  }, [active])

  return (
    <div className="max-w-full">
      <div className="bg-[#F5F5F5] rounded-lg accordion">
        <button onClick={toggleAccordion} className="accordion-button">
          {title}
          <svg
            className={`w-4 h-4 inline-block ml-2 transform transition-transform duration-200 ${
              active ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        <div
          className="accordion-content"
          style={{ maxHeight: `${contentHeight}px` }}
          ref={contentRef}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Accordion
