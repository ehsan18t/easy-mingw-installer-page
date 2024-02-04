import { MdNewReleases } from 'react-icons/md';

import Markdown from '@/components/markdown/Markdown';
import { Release } from '@/types/Release.interface';

type ReleaseNotesProps = {
  repo: string;
  latestRelease: Release;
};

const ReleaseNotes = ({ repo, latestRelease }: ReleaseNotesProps) => {
  const releaseDate = new Date(latestRelease.published_at);
  const formattedDate = `${releaseDate.getDate()} ${releaseDate.toLocaleString('default', {
    month: 'long',
  })} ${releaseDate.getFullYear()}`;

  return (
    <div className='md:4 lg:6 rounded-lg bg-white p-2 shadow-md'>
      <h1 className='flex items-center gap-3 text-3xl'>
        <MdNewReleases className='text-4xl text-green-500' /> Release v{latestRelease.version}
      </h1>
      <p className='px-3 text-gray-600 md:px-6 lg:px-10'>Released on {formattedDate}</p>
      <Markdown className='markdown mx-3 md:mx-6 lg:mx-10' markdown={latestRelease.description} />
      <p className='mx-3 mb-8 mt-8 rounded-xl border-[1px] border-l-8 border-green-500 p-4 text-slate-600 md:mx-6 lg:mx-10'>
        <span className='font-semibold'>Older Releases: </span>
        Check on{' '}
        <a
          target='_blank'
          href={`https://github.com/${repo}/releases`}
          className='text-blue-500 hover:underline'
          rel='noreferrer'>
          GitHub
        </a>
      </p>
    </div>
  );
};

export default ReleaseNotes;
