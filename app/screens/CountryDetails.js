import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
} from "react-native";
import NumberFormat from "react-number-format";

function CountryDetails({ route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const country = route.params.country;
  const url = "https://disease.sh/v3/covid-19/countries/" + country;
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView>
      <View>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            <View>
              {console.log('Country loaded')}

              </View>
            <View style={{ padding: 16 }}>
              <Text
                style={{
                  color: "#fc5b54",
                  fontSize: 32,
                  fontWeight: "bold",
                  marginBottom: 6,
                }}
              >
                {data.country}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={styles.countryinfo}>Continent:</Text>
                  <Text style={styles.normalText}>{data.continent}</Text>
                  <Text style={styles.countryinfo}>Population:</Text>
                  <Text style={styles.normalText}>{data.population}</Text>
                  <Text style={styles.countryinfo}>Abbreviation:</Text>
                  <Text style={styles.normalText}>{data.countryInfo.iso2}</Text>
                </View>
                <Image
                  style={{
                    width: "50%",
                    height: 140,
                  }}
                  source={{
                    uri: data.countryInfo.flag,
                  }}
                />
              </View>
            </View>
            <View style={{ backgroundColor: "#fc5b54", padding: 16 }}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                Today
              </Text>
            </View>
            <View style={{ flexDirection: "row", padding: 16 }}>
              <View style={{ flex: 3 }}>
                <Text style={styles.boldText}>Cases:</Text>
                <Text style={styles.boldText}>Deaths:</Text>
                <Text style={styles.boldText}>Recovered:</Text>
              </View>
              <View
                style={{
                  flex: 3,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <NumberFormat
                  value={data.todayCases}
                  displayType="text"
                  thousandSeparator=" "
                  renderText={(value) => (
                    <Text style={styles.normalText}>{value}</Text>
                  )}
                />
                <NumberFormat
                  value={data.todayDeaths}
                  displayType="text"
                  thousandSeparator=" "
                  renderText={(value) => (
                    <Text style={styles.normalText}>{value}</Text>
                  )}
                />
                <NumberFormat
                  value={data.todayRecovered}
                  displayType="text"
                  thousandSeparator=" "
                  renderText={(value) => (
                    <Text style={styles.normalText}>{value}</Text>
                  )}
                />
              </View>
            </View>
            <View style={{ backgroundColor: "#fc5b54", padding: 16 }}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                Overview
              </Text>
            </View>
            <View style={{ flexDirection: "row", padding: 16 }}>
              <View style={{ flex: 3 }}>
                <Text style={styles.boldText}>Total cases:</Text>
                <Text style={styles.boldText}>Total deaths:</Text>
                <Text style={styles.boldText}>Total recovered:</Text>
                <Text style={styles.boldText}>Tests:</Text>
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
                <NumberFormat
                  value={data.tests}
                  displayType="text"
                  thousandSeparator=" "
                  renderText={(value) => (
                    <Text style={styles.normalText}>{value}</Text>
                  )}
                />
              </View>
            </View>
            <View style={{ backgroundColor: "#fc5b54", padding: 16 }}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                Data per one million
              </Text>
            </View>
            <View style={{ flexDirection: "row", padding: 16 }}>
              <View style={{ flex: 4 }}>
                <Text style={styles.boldText}>Cases per one million:</Text>
                <Text style={styles.boldText}>Deaths per one million:</Text>
                <Text style={styles.boldText}>Recovered per one million:</Text>
                <Text style={styles.boldText}>Tests per one million:</Text>
              </View>
              <View
                style={{
                  flex: 2,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <NumberFormat
                  value={data.casesPerOneMillion}
                  displayType="text"
                  thousandSeparator=" "
                  renderText={(value) => (
                    <Text style={styles.normalText}>{value}</Text>
                  )}
                />
                <NumberFormat
                  value={data.deathsPerOneMillion}
                  displayType="text"
                  thousandSeparator=" "
                  renderText={(value) => (
                    <Text style={styles.normalText}>{value}</Text>
                  )}
                />
                <NumberFormat
                  value={data.recoveredPerOneMillion}
                  displayType="text"
                  thousandSeparator=" "
                  renderText={(value) => (
                    <Text style={styles.normalText}>{value}</Text>
                  )}
                />
                <NumberFormat
                  value={data.testsPerOneMillion}
                  displayType="text"
                  thousandSeparator=" "
                  renderText={(value) => (
                    <Text style={styles.normalText}>{value}</Text>
                  )}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1, padding: 16 },
  container: {
    flex: 1,
    paddingTop: 24,
  },
  countryinfo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e7305b",
  },
  normalText: {
    fontSize: 16,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CountryDetails;
