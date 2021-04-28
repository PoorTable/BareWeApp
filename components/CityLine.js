import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons";

const CityLine = (props) => {
  if (props.DH) {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.Name}>{props.name}</Text>
          <Text style={styles.temperature}>
            {Math.round(props.temp) >= 0 ? "+" : ""}
            {Math.round(props.temp)} C
          </Text>
        </View>

        <Fontisto
          style={styles.valign}
          name={props.wicon}
          size={40}
          color="black"
        />
      </View>
    );
  } else {
    return (
      <TouchableOpacity style={styles.container} onPress={props.onClick}>
        <View>
          <Text style={styles.Name}>{props.name}</Text>
          <Text style={styles.temperature}>
            {Math.round(props.temp) > 0 ? "+" : ""}
            {Math.round(props.temp)} C
          </Text>
        </View>

        <Fontisto
          name={props.wicon}
          style={styles.valign}
          size={40}
          color="black"
        />
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  valign: {
    paddingTop: 5,
  },
  container: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centred: {
    flex: 1,
    height: 50,
  },
  Name: {
    paddingVertical: 5,
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: 'Roboto-LightItalic',
    fontWeight: "bold",
  },
  temperature: {
    fontSize: 17,
    fontFamily: 'Roboto-LightItalic',
    fontWeight: "bold"
  },
});

export default CityLine;
