// Modular Audio Service for GSF Admin Notifications

export const SOUND_OPTIONS = [
  {
    id: 'notification-sound-1',
    name: 'Sound 1 (Soft Chime 1)',
    file: '/sounds/notification-sound-1.mp3',
    format: 'audio/mpeg'
  },
  {
    id: 'notification-sound-2',
    name: 'Sound 2 (Soft Chime 2)',
    file: '/sounds/notification-sound-2.mp3',
    format: 'audio/mpeg'
  },
  {
    id: 'notification-sound-3',
    name: 'Sound 3 (Gentle Bell)',
    file: '/sounds/notification-sound-3.mp3',
    format: 'audio/mpeg'
  },
  {
    id: 'notification-sound-4',
    name: 'Sound 4 (Modern Alert)',
    file: '/sounds/notification-sound-4.mp3',
    format: 'audio/mpeg'
  },
  {
    id: 'notification-sound-5',
    name: 'Sound 5 (Video Game Tone)',
    file: '/sounds/notification-sound-5.wav',
    format: 'audio/wav'
  },
  {
    id: 'notification-sound-6',
    name: 'Sound 6 (Confirmation Tone)',
    file: '/sounds/notification-sound-6.wav',
    format: 'audio/wav'
  }
];

let activeAudioInstance = null;
let activePreviewSoundId = null;

export const notificationSoundService = {
  getSoundById(soundId) {
    return SOUND_OPTIONS.find((s) => s.id === soundId) || SOUND_OPTIONS[0];
  },

  /**
   * Plays selected notification sound at configured volume (0.0 to 1.0)
   */
  playNotificationSound(soundId = 'notification-sound-1', volume = 0.7) {
    try {
      this.stopPreview();

      const sound = this.getSoundById(soundId);
      const audio = new Audio(sound.file);
      audio.volume = Math.max(0, Math.min(1, volume));

      activeAudioInstance = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Audio playback restricted by browser policy:', error);
        });
      }
    } catch (err) {
      console.error('Error playing notification sound:', err);
    }
  },

  /**
   * Previews a specific sound option. Stops any currently playing audio.
   */
  previewNotificationSound(soundId, volume = 0.7, onEndedCallback) {
    try {
      this.stopPreview();

      const sound = this.getSoundById(soundId);
      const audio = new Audio(sound.file);
      audio.volume = Math.max(0, Math.min(1, volume));

      activeAudioInstance = audio;
      activePreviewSoundId = soundId;

      audio.onended = () => {
        activeAudioInstance = null;
        activePreviewSoundId = null;
        if (onEndedCallback) onEndedCallback();
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Preview playback restricted by browser policy:', error);
          activeAudioInstance = null;
          activePreviewSoundId = null;
          if (onEndedCallback) onEndedCallback();
        });
      }
    } catch (err) {
      console.error('Error previewing sound:', err);
    }
  },

  /**
   * Halts any active audio or preview immediately
   */
  stopPreview() {
    if (activeAudioInstance) {
      activeAudioInstance.pause();
      activeAudioInstance.currentTime = 0;
      activeAudioInstance = null;
    }
    activePreviewSoundId = null;
  },

  getActivePreviewSoundId() {
    return activePreviewSoundId;
  }
};
