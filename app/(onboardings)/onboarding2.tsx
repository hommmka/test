import { useRouter } from "expo-router";
import React from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const AsyncStorage = require('@react-native-async-storage/async-storage').default;

const { width } = Dimensions.get("window");

export default function Onboarding2() {

    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.center}>
                <Image
                    source={{
                        uri: "https://i.pinimg.com/1200x/55/4f/e4/554fe4866c281439345b98c9af5851c1.jpg",
                    }}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.title}>Найди твой город</Text>
                <Text style={styles.subtitle}>Когда и где хочешь</Text>
            </View>

            <View style={styles.footer}>
                <View style={styles.pagination}>
                    <View style={styles.dot} />
                    <View style={[styles.dot, styles.dotActive]} />
                    <View style={styles.dot} />
                </View>

                <View style={[styles.actions, { flexDirection: "column" }]}>
                    <TouchableOpacity
                        style={[
                            styles.continueBtn,
                            {
                                marginRight: 0,
                                marginBottom: 12,
                                width: "100%",
                                flex: 0,
                                justifyContent: "center",
                            },
                        ]}
                        activeOpacity={0.8}
                        onPress={() => {
                            router.push("/onboarding3");
                        }}
                    >
                        <Text style={[styles.continueText, { textTransform: "none" }]}>Продолжить</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.skipBtn,
                            {
                                marginLeft: 0,
                                width: "100%",
                                flex: 0,
                                justifyContent: "center",
                            },
                        ]}
                        activeOpacity={0.8}
                        onPress={async () => {
                            try {
                                await AsyncStorage.setItem('hasSeenOnboarding', 'true');
                            } catch (e) {
                                console.warn('Failed to save onboarding state', e);
                            } finally {
                                router.push("/");
                            }
                        }}
                    >
                        <Text style={[styles.skipText, { textTransform: "none" }]}>Пропустить</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const DOT_SIZE = 10;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    image: {
        width: Math.min(300, width - 80),
        height: Math.min(300, width - 80),
        marginBottom: 24,
    },
    title: {
        fontSize: 36,
        fontWeight: "700",
        color: "#111",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        paddingHorizontal: 12,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 18,
    },
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        borderWidth: 1,
        borderColor: "#111",
        marginHorizontal: 6,
        backgroundColor: "transparent",
    },
    dotActive: {
        backgroundColor: "#111",
        borderColor: "#111",
    },
    actions: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    continueBtn: {
        flex: 1,
        backgroundColor: "#111",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginRight: 8,
    },
    continueText: {
        color: "#fff",
        fontWeight: "600",
        textTransform: "lowercase",
        fontSize: 16,
    },
    skipBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginLeft: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
    },
    skipText: {
        color: "#111",
        fontWeight: "600",
        textTransform: "lowercase",
        fontSize: 16,
    },
});