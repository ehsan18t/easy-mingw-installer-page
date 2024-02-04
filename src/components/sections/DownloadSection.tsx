'use client';

import { useEffect, useState } from 'react';

import Downloads from './downloads/Downloads';
import ReleaseNotes from './downloads/ReleaseNotes';

const DownloadSection = () => {
  const repo = 'ehsan18t/easy-mingw-installer';
  const [latestReleases, setLatestReleases] = useState([]);
  // fetch from github api
  // https://api.github.com/repos/ehsan18t/easy-mingw-installer/releases/latest

  useEffect(() => {
    // Fetch latest releases from GitHub API
    fetch(`https://api.github.com/repos/${repo}/releases/latest`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response provides download URLs for different platforms
        // Modify this according to the actual structure of the GitHub API response

        //   save names as well
        const latestLinks = {
          description: data.body,
          published_at: data.published_at,
          version: data.tag_name,
          win64: data.assets.find((asset) => asset.name.includes('64-bit')).browser_download_url,
          win32: data.assets.find((asset) => asset.name.includes('32-bit')).browser_download_url,
        };

        setLatestReleases(latestLinks);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div id="download-section" className="mb-8">
      <Downloads latestReleases={latestReleases} />
      <ReleaseNotes repo={repo} latestRelease={latestReleases} />
    </div>
  );
};

export default DownloadSection;
