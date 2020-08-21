import React, { Component } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";

// Constants
import DEFAULT_AVATAR from "../../../assets/avatars/no_avatar.png";

// Components
import styles from "./storyListItemStyles";
import FastImage from "react-native-fast-image";
import { Badge } from "react-native-elements";
import theme from "../../../../../../src/config/theme";

class StoryListItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false
    };
  }

  // Component Life Cycles

  // Component Functions
  _handleItemPress = item => {
    const { handleStoryItemPress } = this.props;

    if (handleStoryItemPress) handleStoryItemPress(item);

    this.setState({ isPressed: true });
  };



  render() {
    const { item, unPressedBorderColor, pressedBorderColor, hasNotClickedRecommendation } = this.props;
    const { isPressed } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._handleItemPress(item)}
          style={[
            styles.avatarWrapper,
            !isPressed
              ? {
                borderColor: unPressedBorderColor
                  ? unPressedBorderColor
                  : "#e95950",
              }
              : {
                borderColor: pressedBorderColor
                  ? pressedBorderColor
                  : "#ebebeb",

              }
          ]}
        >
          <FastImage
            style={styles.avatar}
            source={{
              uri: item.picture ? item.picture : item.backdrop_path ? `https://image.tmdb.org/t/p/original/${item.backdrop_path}` : ((item.photos || []).length > 0) ? item.photos[0] : item.image_url,
              priority: FastImage.priority.high,
            }}
          />

          <View style={styles.overlay} />
          <Text style={{ ...styles.itemText, fontSize: 10, textTransform: 'capitalize', fontWeight: "800", color: "#fff", position: "absolute", top: 50, padding: 5 }}>{item.title ? item.title : item.name}</Text>

          {this.props.isHostedInChat === true && <Badge
            status="error"
            value={this.props.index + 1}
            textStyle={{ fontWeight: "800" }}
            badgeStyle={{ width: 25, height: 25, borderRadius: 20, backgroundColor: theme.COLORS.LINKMOOD, borderWidth: 0 }}
            containerStyle={{ position: 'absolute', top: -5, right: -5 }}
          />}
        </TouchableOpacity>
      </View>
    );
  }
}

export default StoryListItemView;
