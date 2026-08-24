"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsController = exports.SettingsController = void 0;
// In-Memory store for Admin Settings persistence
let adminSettingsStore = {
    notificationSoundEnabled: true,
    selectedNotificationSound: 'notification-sound-1',
    notificationVolume: 0.7,
    updatedAt: new Date().toISOString()
};
class SettingsController {
    getSettings(req, res) {
        res.json({
            success: true,
            data: adminSettingsStore
        });
    }
    updateSettings(req, res) {
        try {
            const { notificationSoundEnabled, selectedNotificationSound, notificationVolume } = req.body;
            if (typeof notificationSoundEnabled === 'boolean') {
                adminSettingsStore.notificationSoundEnabled = notificationSoundEnabled;
            }
            if (selectedNotificationSound) {
                adminSettingsStore.selectedNotificationSound = selectedNotificationSound;
            }
            if (typeof notificationVolume === 'number') {
                adminSettingsStore.notificationVolume = Math.max(0, Math.min(1, notificationVolume));
            }
            adminSettingsStore.updatedAt = new Date().toISOString();
            res.json({
                success: true,
                message: 'Admin notification settings saved successfully.',
                data: adminSettingsStore
            });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}
exports.SettingsController = SettingsController;
exports.settingsController = new SettingsController();
