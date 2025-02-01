import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
    const [location, setLocation] = useState(null);
    const [markers, setMarkers] = useState([]);


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("error");
                return;
            }

            let userLocation = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            });
        })();
    }, []);

    const handleLongPress = (event) => {
        const newMarker = event.nativeEvent.coordinate;
        setMarkers([...markers, newMarker]);
    };

    return (
        <View style={styles.container}>
            {location ? (
                <MapView
                    style={styles.map}
                    initialRegion={location}
                    onLongPress={handleLongPress}
                    showsUserLocation={true}
                >
                    {markers.map((marker, index) => (
                        <Marker key={index} coordinate={marker} />
                    ))}
                </MapView>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
});
