import React, {ReactNode} from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import Spacer from '../spacer/spacer.tsx';
import {heightPercentageToDP} from '../../config/helpers/dimention.ts';
import {colors} from '../../config/constant/colors.ts';

export interface BaseViewModel {
  withSpacing?: boolean;
  backgroundColor?: string;
  children: ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
  withScrollView?: boolean;
}

const BaseView: React.FC<BaseViewModel> = ({
  withSpacing,
  backgroundColor,
  children,
  onRefresh,
  withScrollView = true,
  refreshing,
}) => {
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: 'white'}]}>
      <Pressable onPress={Keyboard.dismiss} style={styles.pressable}>
        {withSpacing && (
          <View
            style={{
              backgroundColor: backgroundColor,
            }}>
            <Spacer height={heightPercentageToDP(2.5)} />
          </View>
        )}
        {withScrollView ? (
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            refreshControl={
              onRefresh && refreshing !== undefined ? (
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                />
              ) : undefined
            }>
            {children}
          </ScrollView>
        ) : (
          <View style={styles.scrollViewContent}>{children}</View>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export default BaseView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pressable: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
});
