import { DownloadLink } from '@/components';

const Downloads = ({ latestReleases, isLoading }) => {
  return (
    <div className='mb-10 flex w-full flex-col justify-center'>
      <div className='-mx-4 flex flex-col flex-wrap justify-center gap-4 md:-mx-2 md:gap-6 lg:flex-row'>
        <DownloadLink platform='Windows 64-bit' isLoading={isLoading} link={latestReleases.win64} />
        <DownloadLink platform='Windows 32-bit' isLoading={isLoading} link={latestReleases.win32} />
      </div>
    </div>
  );
};

export default Downloads;
