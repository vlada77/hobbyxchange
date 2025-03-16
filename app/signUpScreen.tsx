import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

export default function ProfileSetupScreen() {
    const router = useRouter();
    const user = auth.currentUser; // Get logged-in user

    // Form State
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [location, setLocation] = useState("");
    const [whatIWant, setWhatIWant] = useState("");
    const [whatIOffer, setWhatIOffer] = useState("");
    const [interests, setInterests] = useState("");

    // Handle Profile Save
    const handleSaveProfile = async () => {
        if (!user) return;

        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                name,
                age,
                location,
                whatIWant,
                whatIOffer,
                interests: interests.split(","), // Convert to array
                isProfileComplete: true, // Mark profile as completed
            });

            // Redirect to Matching Page
            router.replace("/(tabs)/matching");

        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Complete Your Profile</Text>

            <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Age" value={age} onChangeText={setAge} style={styles.input} />
            <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
            <TextInput placeholder="What I Want" value={whatIWant} onChangeText={setWhatIWant} style={styles.input} />
            <TextInput placeholder="What I Offer" value={whatIOffer} onChangeText={setWhatIOffer} style={styles.input} />
            <TextInput placeholder="Interests (comma separated)" value={interests} onChangeText={setInterests} style={styles.input} />

            <Button title="Save Profile" onPress={handleSaveProfile} />
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: "center", backgroundColor: "#fff" },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
    input: { width: "100%", borderBottomWidth: 1, marginBottom: 15, padding: 10 },
});