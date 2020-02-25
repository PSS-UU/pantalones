import React from "react";
import PropTypes from "prop-types";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { StyleSheet, Text, View, Animated, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcons);

const CardActionIcon = ({ color, dragX, icon, onPress }) => {
  const scale = dragX.interpolate({
    inputRange: [-120, 0],
    outputRange: [1.3, 0],
    extrapolate: "clamp"
  });
  return (
    <RectButton style={styles.rightAction} onPress={onPress}>
      <AnimatedIcon
        name={icon}
        size={28}
        color={color}
        style={[
          styles.actionIcon,
          {
            transform: [{ scale: scale }]
          }
        ]}
      />
    </RectButton>
  );
};

CardActionIcon.propTypes = {
  color: PropTypes.string,
  dragX: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export const SwipeableCard = ({ rightActions, children }) => {
  let swipeableRef = null;

  const close = () => {
    if (swipeableRef) swipeableRef.close();
  };

  const renderRightActions = (progress, dragX) => {
    if (!rightActions) return null;

    return (
      <View style={{ width: rightActions.length * 64, flexDirection: "row" }}>
        {rightActions.map((action, index) => (
          <CardActionIcon
            key={action.icon}
            color={action.color}
            icon={action.icon}
            x={(index + 1) * 64}
            progress={progress}
            dragX={dragX}
            onPress={() => { action.onPress && action.onPress(close) }}
          />
        ))}
      </View>
    );
  };

  return (
    <Swipeable
      ref={ref => (swipeableRef = ref)}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={renderRightActions}
    >
      {children}
    </Swipeable>
  );
};

SwipeableCard.propTypes = {};

const styles = StyleSheet.create({
  leftAction: {
    justifyContent: "center"
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10
  },
  actionText: {
    fontSize: 16,
    padding: 10
  },
  rightAction: {
    alignItems: "center",
    justifyContent: "center"
  }
});
