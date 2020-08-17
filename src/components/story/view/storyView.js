import React, { Component, Fragment } from "react";
import { View } from "react-native";
import Modal from "react-native-modalbox";

// Components
import { StoryList, Stories } from "../../../components";

import styles from "./storyStyles";

class StoryListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      orderedStories: null,
      selectedStory: null
    };
  }

  // Component Life Cycles

  // Component Functions
  _handleStoryItemPress = (item, index) => {
    const { stories } = this.props;

    this.setState({ selectedStory: item });

    const _stories = Array.from(stories);

    const rest = _stories.splice(index);
    const first = _stories;

    const orderedStories = rest.concat(first);

    this.setState({ orderedStories });
    this.setState({ isModalOpen: true });
  };

  render() {
    const {
      stories,
      footerComponent,
      unPressedBorderColor,
      pressedBorderColor,
      handleStoryItemPress,
      hasNotClickedRecommendation
    } = this.props;
    const { isModalOpen, orderedStories, selectedStory } = this.state;

    return (
      <Fragment>
        <View style={{...styles.storyListContainer, display:"flex", flexDirection:"row",backgroundColor: '#fff', marginTop:0, marginBottom: 0,paddingTop:0, paddingBottom: 10}}>
          <StoryList
            hasNotClickedRecommendation={hasNotClickedRecommendation}
            handleStoryItemPress={handleStoryItemPress}
            stories={stories}
            unPressedBorderColor={unPressedBorderColor}
            pressedBorderColor={pressedBorderColor}
          />
        </View>
      </Fragment>
    );
  }
}

export default StoryListView;
