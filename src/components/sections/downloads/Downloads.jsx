import React from 'react'
import DownloadLink from './DownloadLink'

const Downloads = ({ latestReleases }) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mb-12 mt-12">
        Downloads
      </h2>
      <div className="flex flex-col justify-center w-full mb-10">
        <div className="flex flex-wrap flex-col lg:flex-row gap-4 md:gap-6 -mx-4 md:-mx-2 justify-center">
          <DownloadLink platform="Windows 64-bit" link={latestReleases.win64} />
          <DownloadLink platform="Windows 32-bit" link={latestReleases.win32} />
        </div>
      </div>
    </div>
  )
}

export default Downloads
