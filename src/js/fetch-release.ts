import { marked } from "marked";

const formatDate = (date: string) => {
  const releaseDate = new Date(date);
  return `${releaseDate.getDate()} ${releaseDate.toLocaleString("default", {
    month: "long",
  })} ${releaseDate.getFullYear()}`;
};

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
      document.getElementById("release")!.innerHTML = await marked.parse(
        data.body
      );
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
