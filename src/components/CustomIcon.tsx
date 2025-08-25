import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

export type IconType = 
  | 'AD'   // AntDesign
  | 'EN'   // Entypo
  | 'EI'   // EvilIcons
  | 'FE'   // Feather
  | 'FA'   // FontAwesome
  | 'FA5'  // FontAwesome5
  | 'FA6'  // FontAwesome6
  | 'FO'   // Foundation
  | 'IO'   // Ionicons
  | 'MI'   // MaterialIcons
  | 'MCI'  // MaterialCommunityIcons
  | 'OCT'  // Octicons
  | 'SLI'  // SimpleLineIcons
  | 'ZO';  // Zocial

interface CustomIconProps {
  type: IconType;
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle | TextStyle;
  onPress?: () => void;
}

const CustomIcon: React.FC<CustomIconProps> = ({
  type,
  name,
  size = 24,
  color = '#000000',
  style,
  onPress,
}) => {
  const iconProps = {
    name,
    size,
    color,
    style,
    onPress,
  };

  switch (type) {
    case 'AD':
      return <AntDesign {...iconProps} />;
    case 'EN':
      return <Entypo {...iconProps} />;
    case 'EI':
      return <EvilIcons {...iconProps} />;
    case 'FE':
      return <Feather {...iconProps} />;
    case 'FA':
      return <FontAwesome {...iconProps} />;
    case 'FA5':
      return <FontAwesome5 {...iconProps} />;
    case 'FA6':
      return <FontAwesome6 {...iconProps} />;
    case 'FO':
      return <Foundation {...iconProps} />;
    case 'IO':
      return <Ionicons {...iconProps} />;
    case 'MI':
      return <MaterialIcons {...iconProps} />;
    case 'MCI':
      return <MaterialCommunityIcons {...iconProps} />;
    case 'OCT':
      return <Octicons {...iconProps} />;
    case 'SLI':
      return <SimpleLineIcons {...iconProps} />;
    case 'ZO':
      return <Zocial {...iconProps} />;
    default:
      // Fallback to MaterialIcons if type is not recognized
      return <MaterialIcons {...iconProps} />;
  }
};

export default CustomIcon;
