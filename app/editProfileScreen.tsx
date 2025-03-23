import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { auth, db, storage } from "@/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import FilledButton from "@/components/FilledButton";
import { uploadImage } from '@/utils/uploadImage';
import * as FileSystem from "expo-file-system";
import { useLayoutEffect } from 'react';
import { useNavigation } from 'expo-router';

export default function EditProfileScreen() {
    const router = useRouter();
    const userId = auth.currentUser?.uid;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Edit Profile",
        });
    }, [navigation]);


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

    const handleChange = (field: string, value: string) => {
        setUserData((prevData) => ({
            ...prevData,
            [field]: field === "interests"
                ? value.split(",").map((interest) => interest.trim())  // Trim spaces from each interest
                : value.trim()
        }));
    };


    const selectProfileImage = async () => {
        const options = ["Take Photo", "Choose from Gallery", "Cancel"];

        Alert.alert("Upload Image", "Choose an option", [
            { text: options[0], onPress: takeProfilePhoto },
            { text: options[1], onPress: pickImage },
            { text: options[2], style: "cancel" },
        ]);
    };

    const requestCameraPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Denied", "We need camera access to take a photo.");
            return false;
        }
        return true;
    };


    const takeProfilePhoto = async () => {

        console.log("Checking camera permissions...");
        const hasPermission = await requestCameraPermissions();
        if (!hasPermission) {
            console.log("Camera permission denied.");
            return;
        }

        console.log("Launching camera...");

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;

            const base64Image = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const fullBase64 = `data:image/jpeg;base64,${base64Image}`;

            const imageUrl = await uploadImage(fullBase64);
            setUserData((prev) => ({ ...prev, profilePic: imageUrl }));
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;

            const base64Image = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const fullBase64 = `data:image/jpeg;base64,${base64Image}`;

            const imageUrl = await uploadImage(fullBase64);
            setUserData((prev) => ({ ...prev, profilePic: imageUrl }));
        }
    };


    const selectHobbyImage = async () => {
        const options = ["Take Photo", "Choose from Gallery", "Cancel"];

        Alert.alert("Upload Image", "Choose an option", [
            { text: options[0], onPress: takeHobbyPhoto },
            { text: options[1], onPress: pickHobbyImage },
            { text: options[2], style: "cancel" },
        ]);
    };

    const takeHobbyPhoto = async () => {
        console.log("Checking camera permissions...");
        const hasPermission = await requestCameraPermissions();
        if (!hasPermission) {
            console.log("Camera permission denied.");
            return;
        }

        console.log("Launching camera...");

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;

            const base64Image = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const fullBase64 = `data:image/jpeg;base64,${base64Image}`;

            const imageUrl = await uploadImage(fullBase64);
            setUserData((prev) => ({ ...prev, hobbyImage: imageUrl }));
        }
    };


    const pickHobbyImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });


        if (!result.canceled) {
            const hobbyimageUri = result.assets[0].uri;

            const hobbybase64Image = await FileSystem.readAsStringAsync(hobbyimageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const fullBase64 = `data:image/jpeg;base64,${hobbybase64Image}`;

            const hobbyimageUrl = await uploadImage(fullBase64);
            setUserData((prev) => ({ ...prev, hobbyImage: hobbyimageUrl }));
        }
    };

    const saveChanges = async () => {
        if (!userId) return;
        try {
            const userRef = doc(db, "users", userId);
            let updatedData = { ...userData };

            if (userData.profilePic) {
                updatedData.profilePic = userData.profilePic;
            }
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

            <TouchableOpacity onPress={pickImage}>
                {userData.profilePic ? (
                    <Image source={{ uri: userData.profilePic }} style={styles.profilePic} />
                ) : (
                    <Image source={require("@/assets/images/default-profile-pic.jpg")} style={styles.profilePic} />
                )}
            </TouchableOpacity>
            <Button title="Change Profile Picture" onPress={selectProfileImage} />

            <View style={styles.infocontainer}>
                <Text style={styles.textLabel}>Name:</Text>

                <TextInput placeholder="Name" placeholderTextColor="#6E6E6E" value={userData.name} onChangeText={(text) => handleChange("name", text)} style={styles.input} />

                <Text style={styles.textLabel}>Age:</Text>

                <TextInput placeholder="Age" placeholderTextColor="#6E6E6E" value={userData.age} onChangeText={(text) => handleChange("age", text)} style={styles.input} />

                <Text style={styles.textLabel}>Occupation:</Text>

                <TextInput placeholder="Occupation" placeholderTextColor="#6E6E6E" value={userData.occupation} onChangeText={(text) => handleChange("occupation", text)} style={styles.input} />

                <Text style={styles.textLabel}>Location:</Text>

                <TextInput placeholder="Location" placeholderTextColor="#6E6E6E" value={userData.location} onChangeText={(text) => handleChange("location", text)} style={styles.input} />

                <Text style={styles.textLabel}>Bio Message:</Text>

                <TextInput placeholder="Bio" placeholderTextColor="#6E6E6E" value={userData.biomessage} onChangeText={(text) => handleChange("biomessage", text)} style={styles.input} />

                <Text style={styles.textLabel}>What I Want:</Text>

                <TextInput placeholder="What I Want" placeholderTextColor="#6E6E6E" value={userData.whatIWant} onChangeText={(text) => handleChange("whatIWant", text)} style={styles.input} />

                <Text style={styles.textLabel}>What I Offer:</Text>

                <TextInput placeholder="What I Offer" placeholderTextColor="#6E6E6E" value={userData.whatIOffer} onChangeText={(text) => handleChange("whatIOffer", text)} style={styles.input} />

                <Text style={styles.textLabel}>Interests (comma separated):</Text>

                <TextInput
                    placeholder="Interests (comma separated)" placeholderTextColor="#6E6E6E"
                    value={userData.interests.length > 0 ? userData.interests.join(", ") : ""}
                    onChangeText={(text) => handleChange("interests", text)}  // Use handleChange directly
                    style={styles.input}
                />


            </View>


            <View style={styles.hobbyimagecontainer}>
                <TouchableOpacity onPress={selectHobbyImage}>
                    {userData.hobbyImage ? (
                        <View style={styles.mainImageContainer}>

                            <Image source={{ uri: userData.hobbyImage }} style={styles.mainPic} />
                            <Pressable style={styles.button} onPress={selectHobbyImage}>
                                <Text style={styles.buttonLabel}>Change Main Image</Text>
                            </Pressable>

                        </View>

                    ) : (
                        <View style={styles.mainImageContainer}>
                            <Pressable style={styles.button} onPress={selectHobbyImage}>
                                <Text style={styles.buttonLabel}>Add Main Image</Text>
                            </Pressable>
                            <Text style={styles.infodetails}>Choose an image that best represents your personality or hobby! </Text>


                        </View>

                    )}
                </TouchableOpacity>




            </View>

            <FilledButton label="Save Changes" width={160} onPress={saveChanges} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
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
        fontSize: 22,
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
        marginTop: 10,
        alignItems: 'center',
        width: 320,
        textAlign: 'center',
        marginBottom: 30,
        paddingVertical: 30,
        backgroundColor: '#F0EDF0',
        borderRadius: 10,

    },
    mainImageContainer: {
        alignItems: 'center',
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