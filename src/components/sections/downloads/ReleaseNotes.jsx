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
      <p className="ml-12 mt-5 p-4 text-slate-600 border-[1px] border-green-500 border-l-8 rounded-xl">
        <span className="font-semibold">Older Releases: </span>
        Check on{' '}
        <a
          target="_blank"
          href={`https://github.com/${repo}/releases`}
          className="text-blue-500 hover:underline"
        >
          GitHub
        </a>
      </p>
    </div>
  )
}

export default ReleaseNotes
