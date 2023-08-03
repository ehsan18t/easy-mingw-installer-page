import React from 'react'
import DownloadLink from './DownloadLink'

const Downloads = ({ latestReleases }) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mb-8">Downloads</h2>
      <div className="flex flex-col justify-center w-full mb-8">
        <div className="flex flex-wrap -mx-4 justify-center">
          <DownloadLink platform="Windows 64-bit" link={latestReleases.win64} />
          <DownloadLink platform="Windows 32-bit" link={latestReleases.win32} />
        </div>
      </div>
    </div>
  )
}

export default Downloads
