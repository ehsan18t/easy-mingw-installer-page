'use client';

import { useEffect, useState } from 'react';

import { Loading } from '@/components';

import Downloads from './downloads/Downloads';
import ReleaseNotes from './downloads/ReleaseNotes';

const DownloadSection = () => {
  const repo = 'ehsan18t/easy-mingw-installer';
  const [latestReleases, setLatestReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch from github api
  // https://api.github.com/repos/ehsan18t/easy-mingw-installer/releases/latest
  useEffect(() => {
    // Fetch latest releases from GitHub API
    fetch(`https://api.github.com/repos/${repo}/releases/latest`)
      .then((response) => response.json())
      .then((data) => {
        const latestLinks = {
          description: data.body,
          published_at: data.published_at,
          version: data.tag_name,
          win64: data.assets.find((asset) => asset.name.includes('64-bit')).browser_download_url,
          win32: data.assets.find((asset) => asset.name.includes('32-bit')).browser_download_url,
        };

        setLatestReleases(latestLinks);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <section id="download-section" className="mb-8">
      <h2 className="mb-12 mt-12 text-center text-3xl font-semibold">Downloads</h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Downloads latestReleases={latestReleases} />
          <ReleaseNotes repo={repo} latestRelease={latestReleases} />
        </>
      )}
    </section>
  );
};

export default DownloadSection;
