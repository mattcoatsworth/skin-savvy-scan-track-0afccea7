import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        if (index === 2) {
          // Central + button
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.plusButton}
              onPress={() => alert('Quick Action!')}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={36} color="#fff" />
            </TouchableOpacity>
          );
        }
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        let iconName;
        if (route.name === 'Home') iconName = 'home-outline';
        else if (route.name === 'Skin') iconName = 'color-palette-outline';
        else if (route.name === 'Products') iconName = 'cube-outline';
        else if (route.name === 'Profile') iconName = 'person-outline';
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tab}
          >
            <Ionicons name={iconName} size={24} color={isFocused ? '#007AFF' : 'gray'} />
            <Text style={{ color: isFocused ? '#007AFF' : 'gray', fontSize: 12 }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  plusButton: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -32 }],
    bottom: Platform.OS === 'ios' ? 10 : 14,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 10,
  },
}); 