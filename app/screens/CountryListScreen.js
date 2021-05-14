import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import NumberFormat from "react-number-format";
import Moment from "moment";
import moment from "moment";

function CountryListScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedSorting, setSelectedSorting] = useState("alphabetic");
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((json) => {
        var test = json.filter((element) => element.continent != "");
        setData(test);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => <Item item={item} />;

  const Item = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => itemClick(item)}>
      <View elevation={5} style={styles.item}>
        <View
          style={{
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 16,
          }}
        >
          <Image
            style={{
              width: "100%",
              height: 70,
            }}
            source={{
              uri: item.countryInfo.flag,
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.country}>{item.country}</Text>
          <Text style={styles.continent}>{item.continent}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.countryinfo}>Cases: </Text>
            <NumberFormat
              value={item.cases}
              displayType="text"
              thousandSeparator=" "
              renderText={(value) => (
                <Text style={styles.normalText}>{value}</Text>
              )}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.countryinfo}>Deaths: </Text>
            <NumberFormat
              value={item.deaths}
              displayType="text"
              thousandSeparator=" "
              renderText={(value) => (
                <Text style={styles.normalText}>{value}</Text>
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  function itemClick(item) {
    navigation.navigate("CountryDetails", { country: item.country });
  }

  function sortList(sorting) {
    switch (sorting) {
      case "alphabetic":
        console.log(sorting);
        setData(
          data.sort((a, b) => {
            return a.country.localeCompare(b.country);
          })
        );
        break;
      case "cases":
        setData(
          data.sort((a, b) => {
            return b.cases - a.cases;
          })
        );
        break;
      case "deaths":
        setData(
          data.sort((a, b) => {
            return b.deaths - a.deaths;
          })
        );
        break;
      case "continent":
        console.log(sorting);
        setData(
          data.sort((a, b) => {
            return a.continent.localeCompare(b.continent);
          })
        );
        break;
    }
  }

  return (
    <View style={styles.view}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>Sort the list of countries: </Text>
            <Picker
              style={{ width: 150, height: 20 }}
              mode={"dropdown"}
              selectedValue={selectedSorting}
              accessibilityLabel="Basic Picker Accessibility Label"
              onValueChange={(itemValue, itemIndex) => {
                setSelectedSorting(itemValue), sortList(itemValue);
              }}
            >
              <Picker.Item label="Alphabetic" value="alphabetic" />
              <Picker.Item label="Continent" value="continent" />
              <Picker.Item label="Cases" value="cases" />
              <Picker.Item label="Deaths" value="deaths" />
            </Picker>
          </View>
          <View style={{ alignItems: "center", marginBottom: 5 }}>
            <Text>Updated on {Moment(date).format("Do MMMM - kk:mm")}</Text>
          </View>
          <View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.country}
              renderItem={renderItem}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1, padding: 16 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 6,
    flexDirection: "row",
    borderRadius: 5,
  },
  country: {
    fontSize: 20,
    fontWeight: "bold",
  },
  countryinfo: {
    fontSize: 16,
  },
  continent: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e7305b",
  },
  normalText: {
    fontSize: 16,
    alignItems: "flex-end",
  },
});

export default CountryListScreen;
