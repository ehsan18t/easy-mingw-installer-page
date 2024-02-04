import DownloadLink from './DownloadLink';

const Downloads = ({ latestReleases }) => {
  return (
    <div>
      <h2 className="mb-12 mt-12 text-center text-3xl font-semibold">Downloads</h2>
      <div className="mb-10 flex w-full flex-col justify-center">
        <div className="-mx-4 flex flex-col flex-wrap justify-center gap-4 md:-mx-2 md:gap-6 lg:flex-row">
          <DownloadLink platform="Windows 64-bit" link={latestReleases.win64} />
          <DownloadLink platform="Windows 32-bit" link={latestReleases.win32} />
        </div>
      </div>
    </div>
  );
};

export default Downloads;
