import "https://cdn.jsdelivr.net/npm/marked/marked.min.js";

async function fetchRelease() {
    await fetch("https://api.github.com/repos/ehsan18t/easy-mingw-installer/releases/latest")
        .then(response => response.json())
        .then(data => {
            document.getElementById('release').innerHTML = marked.parse(data.body);
        })
        .catch(error => {
            console.error('Error:', error)
            return "# Error: " + error.message;
        });
}

await fetchRelease();
