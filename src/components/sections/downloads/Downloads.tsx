import { DownloadLink } from '@/components';

type DownloadsProps = {
  latestReleases: {
    win64: string;
    win32: string;
  };
};

const Downloads = ({ latestReleases }: DownloadsProps) => {
  return (
    <div className='mb-10 flex w-full flex-col justify-center'>
      <div className='-mx-4 flex flex-col flex-wrap justify-center gap-4 md:-mx-2 md:gap-6 lg:flex-row'>
        <DownloadLink platform='Windows 64-bit' link={latestReleases.win64} />
        <DownloadLink platform='Windows 32-bit' link={latestReleases.win32} />
      </div>
    </div>
  );
};

export default Downloads;
