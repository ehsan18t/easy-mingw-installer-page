import React from 'react'
import Footer from './components/sections/Footer'
import Hero from './components/sections/Hero'
import Section from './components/sections/Section'
import Features from './components/sections/Features'
import DownloadSection from './components/sections/DownloadSection'

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Section
        title="Introduction"
        content="I have created this project with the aim of providing an installer for MinGW, as I have observed that many people struggle with the setup and configuration of the MinGW environment. Often, newcomers give up at this stage due to its complexity. The purpose of this installer is to simplify the process and create a fully functional environment with the latest version of GCC and other essential packages for production."
        backgroundColor="bg-gray-100"
        textColor="text-gray-800"
      />
      <Features />
      <DownloadSection />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  )
}

export default App
