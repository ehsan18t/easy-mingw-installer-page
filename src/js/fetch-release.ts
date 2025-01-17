import { marked } from "marked";

const formatDate = (date: string) => {
  const releaseDate = new Date(date);
  return `${releaseDate.getDate()} ${releaseDate.toLocaleString("default", {
    month: "long",
  })} ${releaseDate.getFullYear()}`;
};

// Your GitHub repository URL
const repoUrl = "https://github.com/ehsan18t/easy-mingw-installer/commit/";

// Function to convert commit hashes in the Markdown to clickable links
function convertCommitHashesToLinks(markdown: string): string {
  const hashRegex = /\b([a-f0-9]{40})\b/g; // Matches 40-character commit hashes
  return markdown.replace(hashRegex, (hash) => {
    return `[${hash}](${repoUrl}${hash})`;
  });
}

async function fetchRelease() {
  await fetch(
    "https://api.github.com/repos/ehsan18t/easy-mingw-installer/releases/latest"
  )
    .then((response) => response.json())
    .then(async (data) => {
      // Update Download Links
      document
        .getElementById("btn-dl-64")
        ?.setAttribute(
          "href",
          data.assets.find((asset: any) => asset.name.includes("64-bit"))
            .browser_download_url
        );
      document
        .getElementById("btn-dl-32")
        ?.setAttribute(
          "href",
          data.assets.find((asset: any) => asset.name.includes("32-bit"))
            .browser_download_url
        );

      // Update Release Markdown
      document.getElementById(
        "release-version"
      )!.innerHTML = `Release v${data.tag_name}`;
      // Preprocess Markdown to replace commit hashes with links
      const processedMarkdown = data.body.replace(
        /\b([a-f0-9]{40})\b/g,
        (hash: string) =>
          `<a href="${repoUrl}${hash}" class="commit-link" target="_blank">${hash.slice(
            0,
            7
          )}</a>`
      );

      // Parse the processed Markdown and add it to the page
      document.getElementById("release")!.innerHTML = await marked.parse(
        processedMarkdown
      );

      // document.getElementById('release')!.innerHTML = await marked.parse(data.body);
      document.getElementById("release-date")!.innerHTML =
        "Released on " + formatDate(data.published_at);

      // Remove Loading
      document.getElementById("loading")?.remove();

      // Visible Download Button & Release Notes
      document.getElementById("downloads")?.classList.remove("hidden");
    })
    .catch((error) => {
      console.error("Error:", error);
      return "# Error: " + error.message;
    });
}

await fetchRelease();
