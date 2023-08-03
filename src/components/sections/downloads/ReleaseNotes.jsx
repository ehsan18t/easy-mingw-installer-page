import React from 'react'
import Markdown from '../../markdown/Markdown'

const ReleaseNotes = ({ repo, latestRelease }) => {
  const releaseDate = new Date(latestRelease.published_at)
  const formattedDate = `${releaseDate.getDate()} ${releaseDate.toLocaleString(
    'default',
    { month: 'long' }
  )} ${releaseDate.getFullYear()}`

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-semibold">
        Release v{latestRelease.version}
      </h1>
      <p className="text-gray-600 pl-4">Released on {formattedDate}</p>
      <Markdown
        className="mx-10 markdown"
        markdown={latestRelease.description}
      />
    </div>
  )
}

export default ReleaseNotes
