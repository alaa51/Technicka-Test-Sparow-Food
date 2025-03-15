import {Dimensions, PixelRatio, Platform, StatusBar} from 'react-native';
export const screenHeight: number =
    Platform.OS === 'android'
        ? Dimensions.get('window').height + (StatusBar?.currentHeight || 0)
        : Dimensions.get('window').height;
export const screenWidth: number = Dimensions.get('window').width;

export const fontValue = (
    fontSize: number,
    standardScreenHeight: number = 814,
): number => {
    const heightPercent = (fontSize * screenHeight) / standardScreenHeight;
    return PixelRatio.roundToNearestPixel(heightPercent);
};
export const widthPercentageToDP = (widthPercent: number): number => {
    return PixelRatio.roundToNearestPixel((screenWidth * widthPercent) / 100);
};

export const heightPercentageToDP = (heightPercent: number): number => {
    return PixelRatio.roundToNearestPixel((screenHeight * heightPercent) / 100);
};

export const vw = screenWidth / 100;
export const vh = screenHeight / 100;

const { width, height } = Dimensions.get('window');
export const isTablet = Math.min(width, height) >= 600;
