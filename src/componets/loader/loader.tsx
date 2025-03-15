import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store.ts';
import {colors} from '../../config/constant/colors.ts';

const Loader = () => {
    const isLoading = useSelector((state: RootState) => state.loader.isLoading);

    if (!isLoading) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default Loader;
