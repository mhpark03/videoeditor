// Local File API for Video Editor (Standalone Mode)
// This version works without backend/S3 connection

/**
 * Local Video API
 * Handles local file operations without backend server
 */
class VideoAPI {
  constructor() {
    console.log('[VideoAPI] Initialized in local mode');
  }

  // Get all videos from local storage (not implemented - use file browser)
  async getAllVideos() {
    console.log('[VideoAPI] Local mode - use file browser to select videos');
    return [];
  }

  // Get video by ID (not applicable in local mode)
  async getVideoById(videoId) {
    console.log('[VideoAPI] Local mode - video lookup not available');
    return null;
  }

  // Download video - not needed in local mode, files are already local
  async downloadVideo(videoId, savePath) {
    console.log('[VideoAPI] Local mode - download not needed for local files');
    return savePath;
  }

  // Upload/Save video to local file
  async uploadVideo(filePath, metadata) {
    console.log('[VideoAPI] Local mode - saving video locally');

    try {
      const result = await window.electronAPI.saveFileDialog({
        title: '영상 저장',
        defaultPath: metadata.title || 'video.mp4',
        filters: [{ name: 'Videos', extensions: ['mp4', 'webm', 'avi'] }]
      });

      if (result.canceled) {
        return { success: false, cancelled: true };
      }

      // Copy file to new location
      const copyResult = await window.electronAPI.copyFile({
        sourcePath: filePath,
        destPath: result.filePath
      });

      return {
        success: copyResult.success,
        filePath: result.filePath
      };
    } catch (error) {
      console.error('[VideoAPI] Save failed:', error);
      throw error;
    }
  }

  // Update video metadata (not applicable in local mode)
  async updateVideoMetadata(videoId, metadata) {
    console.log('[VideoAPI] Local mode - metadata update not available');
    return null;
  }

  // Get videos by kiosk (not applicable in local mode)
  async getVideosByKiosk(kioskId) {
    console.log('[VideoAPI] Local mode - kiosk videos not available');
    return [];
  }

  // Assign video to kiosk (not applicable in local mode)
  async assignVideoToKiosk(kioskId, videoId) {
    console.log('[VideoAPI] Local mode - kiosk assignment not available');
    return null;
  }
}

// Export API instance
const videoAPI = new VideoAPI();

// Make it available globally
if (typeof window !== 'undefined') {
  window.videoAPI = videoAPI;
}

// For Node.js module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VideoAPI;
}
