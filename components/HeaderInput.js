import React from "react";
import {
  TextInput,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { EvilIcons, Ionicons } from "@expo/vector-icons";

const HeaderInput = (props) => {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View>
        <EvilIcons
          style={styles.TextIcon}
          name="search"
          size={40}
          color="black"
        />
      </View>
      <TextInput
        {...props}
        style={styles.input}
        editable
        maxLength={20}
        placeholder="Enter city here..."
      />
      <TouchableOpacity onPress={props.onClick}>
        {props.isEmpty ? (
          <Ionicons
            name="close-circle-outline"
            size={25}
            style={{ ...props.style }}
          />
        ) : (
          <Ionicons
            name="close-circle-outline"
            size={25}
            style={{ ...props.style, ...styles.back }}
          />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flexDirection: "row",
    
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 5,
    width: "90%",
    maxHeight: 50,
  },
  input: {
    fontSize: 20,
    width: "75%",
    height: 50,
  },
  back: {
    opacity: 0,
  },
});

export default HeaderInput;
