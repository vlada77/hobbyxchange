import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { auth, db, storage } from "@/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import FilledButton from "@/components/FilledButton";

export default function EditProfileScreen() {
    const router = useRouter();
    const userId = auth.currentUser?.uid;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [userData, setUserData] = useState({
        email: "",
        name: "",
        age: "",
        occupation: "",
        biomessage: "",
        location: "",
        whatIWant: "",
        whatIOffer: "",
        interests: [] as string[],
        hobbyImage: null as string | null,
        profilePic: null as string | null,
        gallery: [] as string[],
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;
            try {
                const userRef = doc(db, "users", userId);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setUserData(userSnap.data() as any);
                } else {
                    console.log("User data not found.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [userId]);

    const handleChange = (field: string, value: string | string[]) => {
        setUserData((prevData) => ({
            ...prevData,
            [field]: typeof value === "string" ? value : value.join(", ")
        }));
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setUserData((prevData) => ({ ...prevData, profilePic: result.assets[0].uri }));
        }
    };

    const pickHobbyImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setUserData((prev) => ({ ...prev, hobbyImage: result.assets[0].uri }));
        }
    };

    const saveChanges = async () => {
        if (!userId) return;
        try {
            const userRef = doc(db, "users", userId);
            let updatedData = { ...userData };

            if (userData.hobbyImage) {
                updatedData.hobbyImage = userData.hobbyImage;
            }

            await updateDoc(userRef, updatedData);
            router.push("/profile");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (loading) return <Text>Loading...</Text>;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Edit Profile</Text>

            <TouchableOpacity onPress={pickImage}>
                {userData.profilePic ? (
                    <Image source={{ uri: userData.profilePic }} style={styles.profilePic} />
                ) : (
                    <Image source={require("@/assets/images/default-profile-pic.jpg")} style={styles.profilePic} />
                )}
            </TouchableOpacity>
            <Button title="Change Profile Picture" onPress={pickImage} />

            <View style={styles.infocontainer}>
                <Text style={styles.textLabel}>Name:</Text>

                <TextInput placeholder="Name" value={userData.name} onChangeText={(text) => handleChange("name", text)} style={styles.input} />

                <Text style={styles.textLabel}>Age:</Text>

                <TextInput placeholder="Age" value={userData.age} onChangeText={(text) => handleChange("age", text)} style={styles.input} />

                <Text style={styles.textLabel}>Occupation:</Text>

                <TextInput placeholder="Occupation" value={userData.occupation} onChangeText={(text) => handleChange("occupation", text)} style={styles.input} />
                <Text style={styles.textLabel}>Location:</Text>

                <TextInput placeholder="Location" value={userData.location} onChangeText={(text) => handleChange("location", text)} style={styles.input} />
                <Text style={styles.textLabel}>Bio Message:</Text>
                <TextInput placeholder="Bio" value={userData.biomessage} onChangeText={(text) => handleChange("biomessage", text)} style={styles.input} />
                <Text style={styles.textLabel}>What I Want:</Text>
                <TextInput placeholder="What I Want" value={userData.whatIWant} onChangeText={(text) => handleChange("whatIWant", text)} style={styles.input} />
                <Text style={styles.textLabel}>What I Offer:</Text>
                <TextInput placeholder="What I Offer" value={userData.whatIOffer} onChangeText={(text) => handleChange("whatIOffer", text)} style={styles.input} />
                <Text style={styles.textLabel}>Interests (comma separated):</Text>
                <TextInput
                    placeholder="Interests (comma separated)"
                    value={userData.interests.length > 0 ? userData.interests.join(", ") : ""}
                    onChangeText={(text) => setUserData(prev => ({
                        ...prev,
                        interests: text ? text.split(",").map(i => i.trim()) : [],
                    }))} style={styles.input}
                />



            </View>


            <View style={styles.hobbyimagecontainer}>
                <TouchableOpacity onPress={pickHobbyImage}>
                    {userData.hobbyImage ? (
                        <Image source={{ uri: userData.hobbyImage }} style={styles.mainPic} />
                    ) : (
                        <Image source={require("@/assets/images/art-hobby.jpg")} style={styles.mainPic} />
                    )}
                </TouchableOpacity>
                <Pressable style={styles.button} onPress={pickHobbyImage}>
                    <Text style={styles.buttonLabel}>Change Main Image</Text>
                </Pressable>
                <Text style={styles.infodetails}>Choose an image that best represents your personality or hobby! </Text>


            </View>

            <FilledButton label="Save Changes" width={160} onPress={saveChanges} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20, alignItems: "center"
    },
    input: {
        width: 320,
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderColor: '#919191',
        borderWidth: 0.7,
        backgroundColor: '',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    infocontainer: {
        width: 320,
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    textLabel: {
        marginLeft: 5,
        fontSize: 14,
        color: '#919191',
        fontWeight: '400',
        marginVertical: 5,
    },
    button: {
        marginTop: 5,
    },
    buttonLabel: {
        color: '#007AFF',
        fontSize: 24,
        fontWeight: 400,

    },
    sectionText:
    {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,

    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10
    },
    hobbyimagecontainer: {
        alignItems: 'center',
        width: 320,
        textAlign: 'center',
        marginBottom: 30,

    },
    mainPic: {
        width: 250,
        height: 250,
        margin: 5,
        borderRadius: 10
    },
    infodetails:
    {
        fontSize: 14,
        color: '#919191',
        fontWeight: '400',
        marginVertical: 5,
        fontStyle: 'italic',
        textAlign: 'center',
    }
});