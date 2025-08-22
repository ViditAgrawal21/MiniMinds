import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackPress = (handler) => {
  useEffect(() => {
    const backAction = () => {
      if (handler) {
        return handler();
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [handler]);
};

export default useBackPress;
