export async function getRelease() {
  const response = await fetch(
    "https://api.github.com/repos/ehsan18t/easy-mingw-installer/releases/latest"
  );
  const release = await response.json();

  return {
    tagName: release.tag_name,
    name: release.name,
    description: release.body,
    url: release.html_url,
  };
}
