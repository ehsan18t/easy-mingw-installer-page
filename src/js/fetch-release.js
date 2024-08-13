import './marked.min.js';

const formatDate = (date) => {
  const releaseDate = new Date(date);
  return `${releaseDate.getDate()} ${releaseDate.toLocaleString('default', {
    month: 'long',
  })} ${releaseDate.getFullYear()}`;
};

async function fetchRelease () {
  await fetch('https://api.github.com/repos/ehsan18t/easy-mingw-installer/releases/latest')
    .then(response => response.json())
    .then(data => {
      // Download Links
      document.getElementById('btn-dl-64').setAttribute('href', data.assets.find((asset) => asset.name.includes('64-bit')).browser_download_url);
      document.getElementById('btn-dl-32').setAttribute('href', data.assets.find((asset) => asset.name.includes('32-bit')).browser_download_url);

      // Release Markdown
      document.getElementById('release-version').innerHTML = `Release v${data.tag_name}`;
      document.getElementById('release').innerHTML = marked.parse(data.body);
      document.getElementById('release-date').innerHTML = 'Released on ' + formatDate(data.published_at);
    })
    .catch(error => {
      console.error('Error:', error);
      return '# Error: ' + error.message;
    });
}

await fetchRelease();
