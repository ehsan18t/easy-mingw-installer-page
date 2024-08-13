import 'https://cdn.jsdelivr.net/npm/marked/marked.min.js'

const formatDate = (date) => {
  const releaseDate = new Date(date)
  return `${releaseDate.getDate()} ${releaseDate.toLocaleString('default', {
    month: 'long',
  })} ${releaseDate.getFullYear()}`
}

async function fetchRelease () {
  await fetch('https://api.github.com/repos/ehsan18t/easy-mingw-installer/releases/latest')
    .then(response => response.json())
    .then(data => {
      document.getElementById('release-version').innerHTML = `Released on ${data.tag_name}`
      document.getElementById('release').innerHTML = marked.parse(data.body)
      document.getElementById('release-date').innerHTML = 'Released on ' + formatDate(data.published_at)
    })
    .catch(error => {
      console.error('Error:', error)
      return '# Error: ' + error.message
    })
}

await fetchRelease()
