import { marked } from "marked";

const formatDate = (date: string) => {
  const releaseDate = new Date(date);
  return `${releaseDate.getDate()} ${releaseDate.toLocaleString("default", {
    month: "long",
  })} ${releaseDate.getFullYear()}`;
};

// GitHub repository URL
const repoUrl = "https://github.com/ehsan18t/easy-mingw-installer/commit/";

async function fetchRelease() {
  await fetch(
    "https://api.github.com/repos/ehsan18t/easy-mingw-installer/releases/latest",
  )
    .then((response) => response.json())
    .then(async (data) => {
      // Update Download Links
      document
        .getElementById("btn-dl-64")
        ?.setAttribute(
          "href",
          data.assets.find((asset: any) => asset.name.includes("64-bit"))
            .browser_download_url,
        );
      document
        .getElementById("btn-dl-32")
        ?.setAttribute(
          "href",
          data.assets.find((asset: any) => asset.name.includes("32-bit"))
            .browser_download_url,
        );

      // Update Release Markdown
      document.getElementById("release-version")!.innerHTML =
        `Release v${data.tag_name}`;

      // Update Latest Version Hero
      document.getElementById("latest-version")!.innerHTML =
        `v${data.tag_name}`;

      // Preproces  s Markdown to replace commit hashes with links
      // Process Markdown for changelog
      const processedMarkdown = data.body.replace(
        /```[\s\S]*?```|`[^`]+`|([a-f0-9]{40})/g,
        (match: any, hash: string) => {
          // If it's a full hash and not inside a code block or inline code
          if (hash) {
            return `<a href="${repoUrl}${hash}" class="commit-link" target="_blank">${hash.slice(
              0,
              7,
            )}</a>`;
          }
          // Return code blocks or inline code unchanged
          return match;
        },
      );

      // Parse the processed Markdown and add it to the page
      document.getElementById("release")!.innerHTML =
        await marked.parse(processedMarkdown);

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
