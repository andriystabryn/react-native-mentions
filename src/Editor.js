import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TextInput
} from "react-native";
import PropTypes from "prop-types";
import MentionsTextInput from "./MentionsTextInput";

import styles from "./EditorStyle";

export default class Editor extends React.Component {
  constructor() {
    super();

    this.state = {
      inputText: "",
      formattedText: "",
      contentOffset: 0,
      textInputHeight: 0,
      keyword: "",
      triggerIndex: -1
    };
    this.reqTimer = 0;

    this.renderSuggestionsRow = this.renderSuggestionsRow.bind(this);
    this.onScrollTextInput = this.onScrollTextInput.bind(this);
    this.triggerCallback = this.triggerCallback.bind(this);
  }

  componentWillMount() {
    const { inputValue, textInputHeight } = this.props;
    this.setState({
      inputText: inputValue,
      textInputHeight: textInputHeight
    });
    this.handleChangeText(inputValue);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.inputText !== nextProps.inputValue) {
      this.setState({
        inputText: nextProps.inputValue
      });
    }
  }

  renderSuggestionsRow({ item }, hidePanel, textInput) {
    return (
      <TouchableOpacity
        onPress={() => this.onSuggestionTap(item, hidePanel, textInput)}
      >
        <View style={styles.suggestionsRowContainer}>
          <View style={styles.userIconBox}>
            <Text style={styles.usernameInitials}>
              {!!item.name && item.name.substring(0, 2).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userDetailsBox}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.usernameText}>@{item.id}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  triggerCallback(keyword, triggerIndex) {
    if (this.reqTimer) {
      clearTimeout(this.reqTimer);
    }
    this.setState({
      triggerIndex
    });
    this.reqTimer = setTimeout(() => {
      this.setState({
        keyword
      });
      this.props.triggerCallback[triggerIndex](keyword);
    }, 200);
  }

  onSuggestionTap(user, hidePanel, textInput) {
    hidePanel();
    let inputText = this.state.inputText.slice(0, -this.state.keyword.length);
    switch (this.props.triggerMock[this.state.triggerIndex]) {
      case "@NAME":
        inputText += "@" + user.name;
        break;
      case "NAME":
        inputText += user.name;
        break;
      case "@ID":
        inputText += "@" + user.id;
        break;
      case "ID":
        inputText += user.id;
        break;

      default:
        break;
    }
    this.setState({
      inputText,
      keyword: "",
      triggerIndex: -1
    });

    this.handleChangeText(inputText);
  }

  handleChangeText = inputText => {
    const lines = inputText.split(/\n/);

    const formattedText = [];
    lines.forEach((line, index) => {
      line.split(/ /).forEach((word, index) => {
        if (!word.startsWith("@")) return formattedText.push(word, " ");
        const mention = (
          <Text
            key={word + index}
            style={[
              styles.mention,
              { backgroundColor: this.props.mentionColor }
            ]}
          >
            {word}
          </Text>
        );
        formattedText.push(mention, " ");
      });
      formattedText.push("\n");
    });
    this.setState({ inputText, formattedText });
    if (this.props.onChange) this.props.onChange(inputText);
  };

  onScrollTextInput(event) {
    this.refs.scrollView.scrollTo({
      y: event.nativeEvent.contentOffset.y,
      animated: false
    });
  }

  onLayout = event => {
    if (this.state.textInputHeight) return;
    const { height } = event.nativeEvent.layout;
    this.setState({ textInputHeight: height });
  };

  render() {
    const { borderColor } = this.props;

    const renderSuggestionsRow =
      this.props.renderSuggestionsRow &&
      this.props.renderSuggestionsRow.length > 0
        ? this.props.renderSuggestionsRow
        : [this.renderSuggestionsRow];
    const wrapperStyle = [styles.wrapper, { borderColor: borderColor }];
    if (this.props.textInputHeight)
      wrapperStyle.push({ height: this.state.textInputHeight });

    return (
      <View style={wrapperStyle} onLayout={this.onLayout}>
        <View style={styles.innerWrapper}>
          <ScrollView
            ref="scrollView"
            style={styles.textScrollView}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={[
                styles.text,
                {
                  fontSize: this.props.fontSize
                }
              ]}
            >
              {this.state.formattedText}
            </Text>
          </ScrollView>
          <View style={styles.inputWrapper}>
            <MentionsTextInput
              multiline
              onScroll={this.onScrollTextInput}
              underlineColorAndroid="transparent"
              mentionDisplayMode={"popup"}
              textInputStyle={{
                padding: 0,
                margin: 0,
                justifyContent: "flex-start",
                width: "100%",
                textAlignVertical: "top",
                fontSize: this.props.fontSize
              }}
              suggestionsPanelStyle={{
                backgroundColor: "rgba(100,100,100,0.1)"
              }}
              loadingComponent={() => (
                <View
                  style={{
                    flex: 1,
                    width,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <ActivityIndicator />
                </View>
              )}
              trigger={this.props.trigger}
              textInputMinHeight={this.state.textInputHeight - 10}
              textInputMaxHeight={this.state.textInputHeight - 10}
              triggerLocation={this.props.triggerLocation}
              inputValue={this.state.inputText}
              onChangeText={this.handleChangeText}
              triggerCallback={this.triggerCallback}
              renderSuggestionsRow={renderSuggestionsRow}
              suggestionsData={this.props.suggestionsData}
              keyExtractor={(item, index) => item.id}
              suggestionRowHeight={45}
              horizontal={false}
              MaxVisibleRowCount={this.props.MaxVisibleRowCount}
            />
          </View>
        </View>
      </View>
    );
  }
}

Editor.propTypes = {
  fontSize: PropTypes.number,
  mentionColor: PropTypes.string,
  trigger: PropTypes.array.isRequired,
  triggerLocation: PropTypes.oneOf(["new-word-only", "anywhere"]).isRequired,
  inputValue: PropTypes.string.isRequired,
  triggerCallback: PropTypes.array.isRequired,
  suggestionsData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    )
  ).isRequired,
  MaxVisibleRowCount: PropTypes.number.isRequired,
  borderColor: PropTypes.string,
  onChange: PropTypes.func,
  textInputHeight: PropTypes.number,
  triggerMock: PropTypes.arrayOf(
    PropTypes.oneOf(["@NAME", "NAME", "@ID", "ID"])
  ).isRequired
};

Editor.defaultProps = {
  fontSize: 13,
  mentionColor: "#ccc",
  borderColor: "#ccc"
};
