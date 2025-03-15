import {Pressable} from 'react-native';
import React from 'react';
export interface SpacerModel {
    height?: number;
    width?: number;
}

const Spacer: React.FC<SpacerModel> = ({height = 10, width}) => {
    return <Pressable style={{height, width}} />;
};
export default Spacer;
