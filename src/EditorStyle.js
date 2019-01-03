import { StyleSheet, Dimensions } from "react-native";

export default (styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    borderWidth: 1,
    borderColor: "red",
    alignSelf: "center",
    alignItems: "flex-start",
    padding: 5
  },
  innerWrapper: {
    position: "relative"
  },
  inputWrapper: {
    position: "absolute",
    top: 0,
    width: "100%"
  },
  input: {
    fontSize: 18,
    width: "100%",
    padding: 0,
    margin: 0,
    justifyContent: "flex-start",
    textAlignVertical: "top"
  },
  textScrollView: {
    position: "absolute",
    top: 0
  },
  text: {
    fontSize: 18,
    color: "transparent",
    marginTop: 2,
    marginLeft: 1
  },
  mention: {},
  suggestionsRowContainer: {
    flexDirection: "row"
  },
  userAvatarBox: {
    width: 35,
    paddingTop: 2
  },
  userIconBox: {
    height: 45,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#54c19c"
  },
  usernameInitials: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14
  },
  userDetailsBox: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 15
  },
  displayNameText: {
    fontSize: 13,
    fontWeight: "500"
  },
  usernameText: {
    fontSize: 12,
    color: "rgba(0,0,0,0.6)"
  }
}));
