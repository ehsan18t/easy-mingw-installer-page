import React, { useState, useEffect } from 'react'
import { FaDownload } from 'react-icons/fa'

const DownloadLink = ({ platform, link }) => {
  return (
    <a target="_blank" href={link} className="w-full md:w-1/2 lg:w-1/3 m-4">
      <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white flex items-center justify-center">
          <FaDownload className="text-4xl" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            {platform}
          </h3>
          <p className="text-gray-600 mb-2">Click to download</p>
        </div>
      </div>
    </a>
  )
}

const DownloadSection = () => {
  const repo = 'ehsan18t/easy-mingw-installer'
  const [latestReleases, setLatestReleases] = useState([])
  // fetch from github api
  // https://api.github.com/repos/ehsan18t/easy-mingw-installer/releases/latest

  useEffect(() => {
    // Fetch latest releases from GitHub API
    fetch(`https://api.github.com/repos/${repo}/releases/latest`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response provides download URLs for different platforms
        // Modify this according to the actual structure of the GitHub API response

        //   save names as well
        const latestLinks = {
          version: data.tag_name,
          win64: data.assets.find((asset) => asset.name.includes('64-bit'))
            .browser_download_url,
          win32: data.assets.find((asset) => asset.name.includes('32-bit'))
            .browser_download_url,
        }

        setLatestReleases(latestLinks)
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  return (
    <div id="download-section" className="bg-gray-100">
      <div className="mx-12">
        <h2 className="text-3xl font-semibold text-center mb-8">Downloads</h2>
        <div className="flex flex-wrap -mx-4 justify-center">
          <div className="w-full mb-8">
            <div className="flex flex-wrap -mx-4 justify-center">
              <DownloadLink
                platform="Windows 64-bit"
                link={latestReleases.win64}
              />
              <DownloadLink
                platform="Windows 32-bit"
                link={latestReleases.win32}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-semibold">Current Version:</span> v
              {latestReleases.version}
              <br />
              <span className="font-semibold">Older Versions:</span> Check on{' '}
              <a
                target="_blank"
                href={`https://github.com/${repo}/releases`}
                className="text-blue-500 hover:underline"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadSection
