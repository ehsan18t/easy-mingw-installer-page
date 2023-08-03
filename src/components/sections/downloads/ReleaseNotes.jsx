import React from 'react'

const ReleaseNotes = ({ repo, version }) => {
  return (
    <div className="flex flex-col mt-2 px-1">
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Current Version:</span> v{version}{' '}
      </p>

      <p className="text-sm text-gray-600">
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
  )
}

export default ReleaseNotes
