import React, {useState, useEffect, useRef} from 'react';
import {Animated, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Font from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP} from '../../config/helpers/dimention.ts';
import {colors} from '../../config/constant/colors.ts';

const AnimatedSkeleton = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#f5f5f5'],
  });

  return <Animated.View style={[styles.skeleton, {backgroundColor}]} />;
};

const SkeletonCard = () => (
  <View style={styles.card}>
    <AnimatedSkeleton />
    <AnimatedSkeleton />
    <AnimatedSkeleton />
  </View>
);

// @ts-ignore
const HomeCard = ({item, loading}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  if (loading) {
    return <SkeletonCard />;
  }
  return (
    <Pressable
      style={styles.card}
      onPress={() => console.log('Pressed', item.name_en)}>
      {/* Restaurant Image */}
      <Image
        source={{
          uri:
            item.picture ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s',
        }}
        style={styles.image}
      />

      <View style={styles.trapezoidContainer}>
        <Text style={styles.trapezoidText}>Available Offer</Text>
      </View>

      {/* Favorite Icon */}
      <Pressable
        onPress={() => setIsFavorite(!isFavorite)}
        style={styles.favoriteIcon}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={30}
          color={colors.primary}
        />
      </Pressable>

      <View style={styles.info}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.name_en}</Text>
          <Text style={styles.delivery}>
            <Font name={'motorcycle'} color={colors.primary} />{' '}
            {item.price_per_km} DT | {item.preparation_time}
          </Text>
        </View>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>
            {item.restaurant_rating.toFixed(1)}{' '}
            <Ionicons name={'star'} color={colors.primary} />
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative',
    width: widthPercentageToDP(90),
    margin: 10,
    paddingBottom: 20,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  trapezoidContainer: {
    position: 'absolute',
    bottom: 78,
    left: 20,
    height: 40,
    width: 100,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    zIndex: 1,
    transform: [{perspective: 10}, {rotateX: '3deg'}],
    paddingTop: 20,
  },
  trapezoidText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  infoContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  availability: {
    fontSize: 14,
    color: '#666',
  },
  delivery: {
    fontSize: 14,
    color: '#444',
  },
  time: {
    fontSize: 14,
    color: '#777',
  },
  ratingBadge: {
    backgroundColor: 'rgba(52, 209, 27, 0.2)',
    borderColor: colors.primary,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  skeleton: {width: 120, height: 20, marginBottom: 6, borderRadius: 5},
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: widthPercentageToDP(88),
    paddingHorizontal: widthPercentageToDP(1),
    marginTop: 10,
  },
});

export default HomeCard;
