import { marked } from "marked";

// Type definitions for better type safety
interface GitHubAsset {
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
}

interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  assets: GitHubAsset[];
}

// Configuration
const CONFIG = {
  repoOwner: "ehsan18t",
  repoName: "easy-mingw-installer",
  cacheExpiry: 5 * 60 * 1000, // 5 minutes in milliseconds
};

// Helper functions
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;
};

const formatFileSize = (bytes: number): string => {
  return (bytes / 1024 / 1024).toFixed(2);
};

class ReleaseManager {
  private repoUrl: string;

  constructor() {
    this.repoUrl = `https://github.com/${CONFIG.repoOwner}/${CONFIG.repoName}/commit/`;
  }

  /**
   * Fetch releases from GitHub or cache
   */
  async getReleases(): Promise<GitHubRelease[]> {
    // Check for cached data
    const cachedData = this.getCachedReleases();
    if (cachedData) {
      return cachedData;
    }

    // Fetch fresh data
    const apiUrl = `https://api.github.com/repos/${CONFIG.repoOwner}/${CONFIG.repoName}/releases`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const releases = (await response.json()) as GitHubRelease[];

    if (!releases || !Array.isArray(releases) || releases.length === 0) {
      throw new Error("No releases found");
    }

    // Cache the releases
    this.cacheReleases(releases);
    return releases;
  }

  /**
   * Get cached releases if available and not expired
   */
  private getCachedReleases(): GitHubRelease[] | null {
    try {
      const cacheItem = localStorage.getItem(
        `${CONFIG.repoOwner}_${CONFIG.repoName}_releases`,
      );
      if (!cacheItem) return null;

      const { timestamp, data } = JSON.parse(cacheItem);
      const now = new Date().getTime();

      // Check if cache is expired
      if (now - timestamp > CONFIG.cacheExpiry) {
        return null;
      }

      return data as GitHubRelease[];
    } catch (error) {
      // If there's any error reading cache, ignore and fetch fresh data
      return null;
    }
  }

  /**
   * Cache releases in localStorage
   */
  private cacheReleases(releases: GitHubRelease[]): void {
    try {
      const cacheItem = {
        timestamp: new Date().getTime(),
        data: releases,
      };
      localStorage.setItem(
        `${CONFIG.repoOwner}_${CONFIG.repoName}_releases`,
        JSON.stringify(cacheItem),
      );
    } catch (error) {
      // Ignore cache errors - not critical
      console.warn("Could not cache releases:", error);
    }
  }

  /**
   * Calculate total downloads across all releases
   */
  calculateTotalDownloads(releases: GitHubRelease[]): number {
    return releases.reduce((total, release) => {
      if (!release.assets || !Array.isArray(release.assets)) return total;

      return (
        total +
        release.assets.reduce((assetTotal, asset) => {
          return assetTotal + (asset.download_count || 0);
        }, 0)
      );
    }, 0);
  }

  /**
   * Process release body markdown to convert commit hashes to links
   */
  processReleaseMarkdown(body: string): string {
    return body.replace(
      /```[\s\S]*?```|`[^`]+`|([a-f0-9]{40})/g,
      (match: string, hash?: string) => {
        if (hash) {
          return `<a href="${this.repoUrl}${hash}" class="commit-link" target="_blank" rel="noreferrer">${hash.slice(0, 7)}</a>`;
        }
        return match;
      },
    );
  }

  /**
   * Update UI elements with release data
   */
  updateUI(releases: GitHubRelease[]): void {
    // Get elements from DOM once to improve performance
    const elements = {
      downloadCount: document.getElementById("download-count"),
      btn64: document.getElementById("btn-dl-64"),
      btn32: document.getElementById("btn-dl-32"),
      fileSize64: document.getElementById("file-size-64-bit"),
      fileSize32: document.getElementById("file-size-32-bit"),
      release: document.getElementById("release"),
      releaseDate: document.getElementById("release-date"),
      loading: document.getElementById("loading"),
      downloads: document.getElementById("downloads"),
      versionElements: document.querySelectorAll(".version"),
    };

    // The latest release is the first one
    const latestRelease = releases[0];

    // Update total downloads
    const totalDownloads = this.calculateTotalDownloads(releases);
    const formattedDownloads = new Intl.NumberFormat().format(totalDownloads);

    if (elements.downloadCount) {
      elements.downloadCount.textContent = `${formattedDownloads} downloads`;
    }

    // Find assets for download links
    if (latestRelease.assets && Array.isArray(latestRelease.assets)) {
      const asset64bit = latestRelease.assets.find((asset) =>
        asset.name.includes("64-bit"),
      );
      const asset32bit = latestRelease.assets.find((asset) =>
        asset.name.includes("32-bit"),
      );

      // Update download URLs
      if (asset64bit && elements.btn64) {
        elements.btn64.setAttribute("href", asset64bit.browser_download_url);
      }

      if (asset32bit && elements.btn32) {
        elements.btn32.setAttribute("href", asset32bit.browser_download_url);
      }

      // Update file sizes
      if (asset64bit && elements.fileSize64) {
        elements.fileSize64.textContent = `${formatFileSize(asset64bit.size)} MB`;
      }

      if (asset32bit && elements.fileSize32) {
        elements.fileSize32.textContent = `${formatFileSize(asset32bit.size)} MB`;
      }
    }

    // Update version display
    elements.versionElements.forEach((el) => {
      el.textContent = `v${latestRelease.tag_name}`;
    });

    // Update release content
    if (elements.release) {
      // Use createDocumentFragment for better performance when adding multiple elements
      const renderMarkdown = async () => {
        const processedMarkdown = this.processReleaseMarkdown(
          latestRelease.body,
        );
        const parsedHTML = await marked.parse(processedMarkdown);
        if (elements.release) {
          elements.release.innerHTML = parsedHTML;
        }
      };

      // Use requestAnimationFrame to optimize rendering
      window.requestAnimationFrame(() => {
        renderMarkdown().catch(console.error);
      });
    }

    // Update release date
    if (elements.releaseDate) {
      elements.releaseDate.textContent =
        "Released on " + formatDate(latestRelease.published_at);
    }

    // Remove loading indicator
    if (elements.loading) {
      elements.loading.remove();
    }

    // Show downloads section if hidden
    if (elements.downloads?.classList.contains("hidden")) {
      elements.downloads.classList.remove("hidden");
    }
  }

  /**
   * Display error message in the UI
   */
  showError(error: Error): void {
    console.error("Error fetching releases:", error);

    const elements = {
      release: document.getElementById("release"),
      loading: document.getElementById("loading"),
      downloads: document.getElementById("downloads"),
    };

    if (elements.release) {
      elements.release.innerHTML = `
        <div class="bg-red-50 border-l-4 border-red-500 p-4 my-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Error loading release data</h3>
              <div class="mt-2 text-sm text-red-700">
                <p>${error.message || "Unable to fetch releases from GitHub. Please try again later."}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // Clean up even on error
    if (elements.loading) {
      elements.loading.remove();
    }

    if (elements.downloads?.classList.contains("hidden")) {
      elements.downloads.classList.remove("hidden");
    }
  }
}

// Main function
async function initializeReleaseInfo() {
  const manager = new ReleaseManager();

  try {
    const releases = await manager.getReleases();
    manager.updateUI(releases);
  } catch (error) {
    manager.showError(
      error instanceof Error ? error : new Error("Unknown error occurred"),
    );
  }
}

// Initialize the release information
initializeReleaseInfo();
