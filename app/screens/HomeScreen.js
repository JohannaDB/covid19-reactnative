import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet, Text, Button } from "react-native";
import NumberFormat from "react-number-format";

function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log('Page loaded');
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/covid-19.png")} />
      <Text style={styles.title}>COVID-19</Text>
      <Text style={styles.normalText}>Worldwide</Text>
      <View style={{ flexDirection: "row", paddingLeft: 16, paddingRight: 16 }}>
        <View style={{ flex: 3 }}>
          <Text style={styles.normalText}>Cases:</Text>
          <Text style={styles.normalText}>Deaths:</Text>
          <Text style={styles.normalText}>Recovered:</Text>
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <NumberFormat
            value={data.cases}
            displayType="text"
            thousandSeparator=" "
            renderText={(value) => (
              <Text style={styles.normalText}>{value}</Text>
            )}
          />
          <NumberFormat
            value={data.deaths}
            displayType="text"
            thousandSeparator=" "
            renderText={(value) => (
              <Text style={styles.normalText}>{value}</Text>
            )}
          />
          <NumberFormat
            value={data.recovered}
            displayType="text"
            thousandSeparator=" "
            renderText={(value) => (
              <Text style={styles.normalText}>{value}</Text>
            )}
          />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Button
          color={"#e7305b"}
          title={"List of countries"}
          onPress={() => navigation.navigate("Countries")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fc5b54",
    marginBottom: 30,
    marginTop: 10,
  },
  normalText: {
    fontSize: 16,
  },
});

export default HomeScreen;
