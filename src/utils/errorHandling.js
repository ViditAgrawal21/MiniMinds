import { Alert } from 'react-native';

// Alert utilities
export const showAlert = (title, message, buttons = []) => {
  const defaultButtons = [
    {
      text: 'OK',
      style: 'default',
    },
  ];

  Alert.alert(title, message, buttons.length > 0 ? buttons : defaultButtons);
};

export const showConfirmAlert = (title, message, onConfirm, onCancel) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: onCancel,
      },
      {
        text: 'Confirm',
        style: 'default',
        onPress: onConfirm,
      },
    ]
  );
};

export const showErrorAlert = (message) => {
  showAlert('Error', message);
};

export const showSuccessAlert = (message) => {
  showAlert('Success', message);
};

// Error handling utilities
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    const message = data?.message || `Server error (${status})`;
    showErrorAlert(message);
    return message;
  } else if (error.request) {
    // Network error
    const message = 'Network error. Please check your connection.';
    showErrorAlert(message);
    return message;
  } else {
    // Other error
    const message = error.message || 'An unexpected error occurred.';
    showErrorAlert(message);
    return message;
  }
};

// Logging utilities
export const logError = (error, context = '') => {
  console.error(`[ERROR] ${context}:`, error);
  
  // In production, you might want to send errors to a logging service
  // like Sentry, Crashlytics, etc.
};

export const logInfo = (message, data = null) => {
  console.log(`[INFO] ${message}`, data);
};

export const logWarning = (message, data = null) => {
  console.warn(`[WARNING] ${message}`, data);
};
