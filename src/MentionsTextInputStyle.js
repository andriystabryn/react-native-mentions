import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  searchWrapper: {},
  searchIcon: {
    padding: 10,
    alignSelf: "center"
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "white",
    color: "#424242"
  },
  suggestionsPanelStylePopup: {
    position: "absolute",
    backgroundColor: "white",
    top: 0,
    width: "100%",
    left: 0,
    zIndex: 99999
  }
});
