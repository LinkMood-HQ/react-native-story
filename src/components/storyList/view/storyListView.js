import React, { Component } from "react";
import { View, FlatList, Text, TouchableOpacity, Dimensions } from "react-native";
// Components
import { StoryListItem } from "../../../components";
import styles from "./storyListStyles";

import _ from 'lodash';
const {width} = Dimensions.get('window')
class StoryListView extends Component {

  state = {
    stories: [],
    offset: 9
  };

  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.stories != null && _.isArray(props.stories) && props.stories !== state.stories) {     
      return {
        stories: props.isSearching ? Object.keys(props.stories) : Object.keys(props.stories.sort((a,b) => (a.ranking > b.ranking) ? 1 : ((b.ranking > a.ranking) ? -1 : 0)).reverse()).slice(0,30)
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.stories != nextProps.stories;
  }

  updateOffset() {
    this.setState({
      offset: this.state.offset === 49 ? 49 : this.state.offset + 10
    });
  }

  renderLoadMore() {
    return (this.state.offset < 29 && this.state.stories.length > 10) && (
      <TouchableOpacity
        style={{ paddingVertical: 60, paddingHorizontal: 5 }}
        onPress={this.updateOffset.bind(this)}>
        <Text style={styles.loadMoreText}>
          More...
        </Text>
      </TouchableOpacity>
    );
  }

  renderNoResults() {
    return (
      <View style={{ paddingVertical: 60, flexDirection: "row", flex: 1, paddingHorizontal: width/3}}>
        <Text style={styles.noResultsText}>
          No Results Found.
        </Text>
      </View>
    );
  }

  render() {
    const {
      stories,
      handleStoryItemPress,
      unPressedBorderColor,
      pressedBorderColor,
      hasNotClickedRecommendation,
      isSearching,
      isHostedInChat
    } = this.props;

    return (
      <View>
        <FlatList
          contentContainerStyle={{minWidth: width}}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${stories[item].name}-${index}`}
          data={this.state.stories.slice(0, this.state.offset)}
          ListEmptyComponent={this.renderNoResults.bind(this)}
          ListFooterComponent={this.renderLoadMore.bind(this)}
          renderItem={({ item, index }) => {
            return (
              <StoryListItem
                id={`${stories[item].name}-${index}`} //instead of key
                hasNotClickedRecommendation={hasNotClickedRecommendation}
                handleStoryItemPress={() =>
                  handleStoryItemPress && handleStoryItemPress(stories[item], index)
                }
                isHostedInChat={isHostedInChat}
                index={index}
                isFirst={index === 0}
                unPressedBorderColor={unPressedBorderColor}
                pressedBorderColor={pressedBorderColor}
                item={stories[item]}
                title={item}
              />
            )
          }}
        />
      </View>
    );
  }
}

export default StoryListView;
