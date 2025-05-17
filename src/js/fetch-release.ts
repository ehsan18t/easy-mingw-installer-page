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

interface ProcessedReleaseData {
  latestVersion: string;
  latestReleaseDate: string;
  processedReleaseHTML: string;
  totalDownloads: number;
  asset64bit?: {
    downloadUrl: string;
    fileSize: string;
  };
  asset32bit?: {
    downloadUrl: string;
    fileSize: string;
  };
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
    this.repoUrl = `https://github.com/${CONFIG.repoOwner}/${CONFIG.repoName}/`;
  }

  /**
   * Extract and process only the needed information from releases
   */
  private async processReleaseData(
    releases: GitHubRelease[],
  ): Promise<ProcessedReleaseData> {
    const latestRelease = releases[0];
    const totalDownloads = this.calculateTotalDownloads(releases);

    // Only import marked when needed
    const { marked } = await import("marked");

    // Process markdown to HTML immediately
    const processedMarkdown = this.processReleaseMarkdown(latestRelease.body);
    const processedReleaseHTML = await marked.parse(processedMarkdown);

    const processedData: ProcessedReleaseData = {
      latestVersion: latestRelease.tag_name,
      latestReleaseDate: formatDate(latestRelease.published_at),
      processedReleaseHTML, // Store pre-processed HTML
      totalDownloads,
    };

    // Find and process assets
    if (latestRelease.assets && Array.isArray(latestRelease.assets)) {
      const asset64bit = latestRelease.assets.find((asset) =>
        asset.name.includes("64-bit"),
      );

      const asset32bit = latestRelease.assets.find((asset) =>
        asset.name.includes("32-bit"),
      );

      if (asset64bit) {
        processedData.asset64bit = {
          downloadUrl: asset64bit.browser_download_url,
          fileSize: `${formatFileSize(asset64bit.size)} MB`,
        };
      }

      if (asset32bit) {
        processedData.asset32bit = {
          downloadUrl: asset32bit.browser_download_url,
          fileSize: `${formatFileSize(asset32bit.size)} MB`,
        };
      }
    }

    return processedData;
  }

  /**
   * Get cached processed release data if available and not expired
   */
  private getCachedReleaseData(): ProcessedReleaseData | null {
    try {
      const cacheKey = `${CONFIG.repoOwner}_${CONFIG.repoName}_processed_data`;
      const cacheItem = localStorage.getItem(cacheKey);
      if (!cacheItem) return null;

      const { timestamp, data } = JSON.parse(cacheItem);
      const now = new Date().getTime();

      // Check if cache is expired
      if (now - timestamp > CONFIG.cacheExpiry) {
        return null;
      }

      return data as ProcessedReleaseData;
    } catch (error) {
      // If there's any error reading cache, ignore and fetch fresh data
      return null;
    }
  }

  /**
   * Cache processed release data in localStorage
   */
  private cacheProcessedData(data: ProcessedReleaseData): void {
    try {
      const cacheItem = {
        timestamp: new Date().getTime(),
        data,
      };

      const cacheKey = `${CONFIG.repoOwner}_${CONFIG.repoName}_processed_data`;
      localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
    } catch (error) {
      // Ignore cache errors - not critical
      console.warn("Could not cache release data:", error);
    }
  }

  /**
   * Get release data - either from cache or from API
   */
  async getReleaseData(): Promise<ProcessedReleaseData> {
    // Check for cached processed data
    const cachedData = this.getCachedReleaseData();
    if (cachedData) {
      return cachedData;
    }

    // Fetch and process fresh data
    const apiUrl = `https://api.github.com/repos/${CONFIG.repoOwner}/${CONFIG.repoName}/releases`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const releases = (await response.json()) as GitHubRelease[];

    if (!releases || !Array.isArray(releases) || releases.length === 0) {
      throw new Error("No releases found");
    }

    // Process and cache the data
    const processedData = await this.processReleaseData(releases);
    this.cacheProcessedData(processedData);

    return processedData;
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
          // Fix URL construction to properly format commit links
          return `<a href="${this.repoUrl}commit/${hash}" class="commit-link" target="_blank" rel="noreferrer">${hash.slice(0, 7)}</a>`;
        }
        return match;
      },
    );
  }

  /**
   * Update UI elements with processed release data
   */
  updateUI(data: ProcessedReleaseData): void {
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

    // Update total downloads
    const formattedDownloads = new Intl.NumberFormat().format(
      data.totalDownloads,
    );
    if (elements.downloadCount) {
      elements.downloadCount.textContent = `${formattedDownloads} downloads`;
    }

    // Update download URLs and file sizes
    if (data.asset64bit && elements.btn64) {
      elements.btn64.setAttribute("href", data.asset64bit.downloadUrl);
      if (elements.fileSize64) {
        elements.fileSize64.textContent = data.asset64bit.fileSize;
      }
    }

    if (data.asset32bit && elements.btn32) {
      elements.btn32.setAttribute("href", data.asset32bit.downloadUrl);
      if (elements.fileSize32) {
        elements.fileSize32.textContent = data.asset32bit.fileSize;
      }
    }

    // Update version display
    elements.versionElements.forEach((el) => {
      el.textContent = `v${data.latestVersion}`;
    });

    // Update release content
    if (elements.release) {
      // No need to process the markdown again - just insert the pre-processed HTML
      elements.release.innerHTML = data.processedReleaseHTML;
    }

    // Update release date
    if (elements.releaseDate) {
      elements.releaseDate.textContent =
        "Released on " + data.latestReleaseDate;
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
      const errorContainer = document.getElementById("fetched-data");
      if (errorContainer) {
        errorContainer.innerHTML = `
        <div class="bg-red-50 border-l-4 border-red-500 p-4 my-10">
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
    const releaseData = await manager.getReleaseData();
    manager.updateUI(releaseData);
  } catch (error) {
    manager.showError(
      error instanceof Error ? error : new Error("Unknown error occurred"),
    );
  }
}

// Initialize the release information
initializeReleaseInfo();
