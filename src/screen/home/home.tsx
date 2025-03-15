import React, {useState, useEffect, useRef} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Animated,
  TextInput,
  Image,
} from 'react-native';
import BaseView from '../../componets/base-view/base-view.tsx';
import HomeCard from '../../componets/home-card/home-card.tsx';
import {getRestaurantService} from '../../service/home-service.ts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const DATA = Array(6).fill({});

const Home = () => {
  const [data, setData] = useState(DATA);
  const [loading, setLoading] = useState(true);

  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0); // Track last scroll position
  const [headerVisible, setHeaderVisible] = useState(true); // Track header visibility

  useEffect(() => {
    getRestaurantService().then(res => {
      setData(res.data);
      setTimeout(() => {
        setLoading(false);
      });
    });
  }, []);

  useEffect(() => {
    const listener = scrollY.addListener(({value}) => {
      if (value > lastScrollY.current && value > 50) {
        setHeaderVisible(false);
      } else if (value < lastScrollY.current && value < 50) {
        setHeaderVisible(true);
      }
      lastScrollY.current = value;
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY]);

  return (
    <BaseView withSpacing={true} withScrollView={false}>
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerVisible ? 1 : 0,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 150],
                  outputRange: [0, -300],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: 'https://as1.ftcdn.net/v2/jpg/04/43/94/64/1000_F_443946404_7GUoIGZeyx7R7ymCicI3k0xPnrMoKDek.jpg',
            }}
            style={styles.avatar}
          />
          <View style={styles.info}>
            <Text style={styles.name}>Restaurant Name</Text>
            <Text style={styles.address}>Restaurant Address</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.searchBar,
          {
            opacity: scrollY.interpolate({
              inputRange: [0, 150],
              outputRange: [1, 1],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 150],
                  outputRange: [0, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput placeholder="Search" style={styles.searchInput} />
      </Animated.View>

      {/* FlatList */}
      <AnimatedFlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <HomeCard item={item} loading={loading} />}
        contentContainerStyle={{paddingTop: 100}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
      />
    </BaseView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    elevation: 5,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  info: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
  },
  searchBar: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Home;
