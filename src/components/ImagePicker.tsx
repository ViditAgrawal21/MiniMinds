import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';

interface ImagePickerOptions {
  mediaType?: MediaType;
  includeBase64?: boolean;
  maxHeight?: number;
  maxWidth?: number;
  quality?: number;
  selectionLimit?: number;
}
import CustomIcon from './CustomIcon';

export interface ImagePickerProps {
  /**
   * Callback function when an image is selected
   */
  onImageSelected: (imageUri: string, imageData?: ImagePickerResponse) => void;
  /**
   * Placeholder image URI to display when no image is selected
   */
  placeholder?: string;
  /**
   * Current image URI to display
   */
  imageUri?: string;
  /**
   * Custom style for the container
   */
  containerStyle?: object;
  /**
   * Custom style for the image
   */
  imageStyle?: object;
  /**
   * Allow camera capture
   */
  allowCamera?: boolean;
  /**
   * Allow gallery selection
   */
  allowGallery?: boolean;
  /**
   * Image quality (0-1)
   */
  quality?: number;
  /**
   * Maximum width for the image
   */
  maxWidth?: number;
  /**
   * Maximum height for the image
   */
  maxHeight?: number;
  /**
   * Media type to pick
   */
  mediaType?: MediaType;
  /**
   * Custom button text
   */
  buttonText?: string;
  /**
   * Show image preview
   */
  showPreview?: boolean;
  /**
   * Custom placeholder component
   */
  placeholderComponent?: React.ReactNode;
  /**
   * Disable the picker
   */
  disabled?: boolean;
  /**
   * Border color for the image container
   */
  borderColor?: string;
  /**
   * Background color for the edit icon
   */
  editIconColor?: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  onImageSelected,
  placeholder,
  imageUri,
  containerStyle,
  imageStyle,
  allowCamera = true,
  allowGallery = true,
  quality = 0.8,
  maxWidth = 800,
  maxHeight = 800,
  mediaType = 'photo',
  buttonText = 'Select Image',
  showPreview = true,
  placeholderComponent,
  disabled = false,
  borderColor = '#FF8C00',
  editIconColor = '#FF8C00',
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(imageUri || null);

  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to camera to take photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const getImagePickerOptions = () => ({
    mediaType: mediaType as MediaType,
    includeBase64: false,
    maxHeight,
    maxWidth,
    quality: quality as any,
    selectionLimit: 1,
  });

  const handleImageResponse = (response: ImagePickerResponse) => {
    if (response.didCancel || response.errorCode) {
      return;
    }

    if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      if (asset.uri) {
        setSelectedImage(asset.uri);
        onImageSelected(asset.uri, response);
      }
    }
  };

  const showImagePicker = () => {
    if (disabled) return;

    const options: any[] = [];
    
    if (allowCamera) {
      options.push({ text: 'TAKE PHOTO', onPress: selectFromCamera });
    }
    
    if (allowGallery) {
      options.push({ text: 'CHOOSE FROM GALLERY', onPress: selectFromGallery });
    }
    
    options.push({ text: 'CANCEL', style: 'cancel' });

    if (options.length === 2) {
      // Only one option available (plus cancel), execute directly
      if (allowGallery && !allowCamera) {
        selectFromGallery();
      } else if (allowCamera && !allowGallery) {
        selectFromCamera();
      }
    } else {
      Alert.alert('Select Image', 'Choose an option', options);
    }
  };

  const selectFromGallery = () => {
    launchImageLibrary(getImagePickerOptions(), handleImageResponse);
  };

  const selectFromCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      launchCamera(getImagePickerOptions(), handleImageResponse);
    } else {
      Alert.alert(
        'Permission Denied',
        'Camera permission is required to take photos.',
      );
    }
  };

  const currentImageUri = selectedImage || imageUri;

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.imageContainer,
          { borderColor: disabled ? '#999' : borderColor },
          disabled && styles.disabledContainer,
        ]}
        onPress={showImagePicker}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <View style={styles.imageWrapper}>
          {currentImageUri && showPreview ? (
            <Image
              source={{ uri: currentImageUri }}
              style={[styles.image, imageStyle]}
              resizeMode="cover"
            />
          ) : placeholderComponent ? (
            placeholderComponent
          ) : (
            <View style={styles.placeholderContainer}>
              {placeholder ? (
                <Image
                  source={{ uri: placeholder }}
                  style={[styles.image, imageStyle]}
                  resizeMode="cover"
                />
              ) : (
                <>
                  <CustomIcon
                    type="MCI"
                    name="camera-plus"
                    size={40}
                    color={disabled ? '#999' : '#FF8C00'}
                  />
                  <Text style={[
                    styles.placeholderText,
                    disabled && styles.disabledText
                  ]}>
                    {buttonText}
                  </Text>
                </>
              )}
            </View>
          )}
        </View>
        
        {/* Always show pencil icon */}
        <View style={[styles.editIconContainer, { backgroundColor: disabled ? '#999' : editIconColor }]}>
          <CustomIcon
            type="MCI"
            name="pencil"
            size={16}
            color="#fff"
          />
        </View>
      </TouchableOpacity>
      
      {!showPreview && (
        <TouchableOpacity
          style={[
            styles.button,
            disabled && styles.disabledButton,
          ]}
          onPress={showImagePicker}
          disabled={disabled}
        >
          <Text style={[
            styles.buttonText,
            disabled && styles.disabledButtonText,
          ]}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE4CC',
    position: 'relative',
  },
  disabledContainer: {
    borderColor: '#999',
    backgroundColor: '#f5f5f5',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 57,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  placeholderText: {
    marginTop: 8,
    fontSize: 12,
    color: '#FF8C00',
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  disabledText: {
    color: '#999',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF8C00',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#FF8C00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  disabledButtonText: {
    color: '#ccc',
  },
});

export default ImagePicker;
