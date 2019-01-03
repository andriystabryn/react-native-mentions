import React from "react";
import {
  AppRegistry,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from "react-native";
import Editor from "react-native-mentions";

import { getUserSuggestions } from "./service";

export default class sampleApp extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      mentions: []
    };
    this.mentionCallback = this.mentionCallback.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({ value, mentions: [] });
  }

  mentionCallback(keyword) {
    const mention = getUserSuggestions(keyword);
    this.setState({
      mentions: [...mention]
    });
  }

  render() {
    return (
      <View
        style={{
          marginTop: 30,
          marginLeft: 5,
          marginRight: 5,
          width: "90%",
          alignSelf: "center",
          flex: 1
        }}
      >
        <Editor
          inputValue={this.state.value}
          trigger={["@"]}
          triggerMock={["NAME"]}
          triggerCallback={[this.mentionCallback]}
          suggestionsData={[this.state.mentions]}
          triggerLocation={"new-word-only"} // 'new-word-only', 'anywhere'
          onChange={this.onChange}
          MaxVisibleRowCount={3}
          fontSize={13}
          mentionColor="#ccc"
          borderColor="#ccc"
        />
      </View>
    );
  }
}

AppRegistry.registerComponent("sample", () => sampleApp);
