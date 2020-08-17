import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginVertical: 0
  },
  unPressedAvatar: {
    borderColor: "#e95950"
  },
  pressedAvatar: {
    borderColor: "#ebebeb"
  },
  avatarWrapper: {
    // borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#e95950",
    margin: 8,
    borderRadius: 20,
    height: 135,
    width: 90
  },
  avatar: {
    height: 135,
    width: 90,
    borderRadius: 20,
    backgroundColor:"#000"
  },
  itemText: {
    textAlign: "center",
    fontSize: 9
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius:20
  }
});
