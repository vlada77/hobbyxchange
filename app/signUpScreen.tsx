import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import FilledButton from "@/components/FilledButton";
import { uploadImage } from '@/utils/uploadImage';
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import { useLayoutEffect } from 'react';
import { useNavigation } from 'expo-router';

export default function SignUpScreen() {

    const DEFAULT_PROFILE_PIC = require('@/assets/images/default-profile-pic.jpg');
    const DEFAULT_HOBBY_PIC = require('@/assets/images/default_hobby.jpg');

    const router = useRouter();

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Sign Up",
        });
    }, [navigation]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [occupation, setOccupation] = useState("");
    const [biomessage, setbiomessage] = useState("");
    const [location, setLocation] = useState("");
    const [whatIWant, setWhatIWant] = useState("");
    const [whatIOffer, setWhatIOffer] = useState("");
    const [interests, setInterests] = useState("");
    const [hobbyImage, sethobbyImage] = useState<string | null>(null);
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [error, setError] = useState("");

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
            setProfilePic(imageUrl);
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
            setProfilePic(imageUrl);
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
            sethobbyImage(imageUrl);
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
            sethobbyImage(hobbyimageUrl);
        }
    };


    const handleCreateAccount = async () => {

        if (!name || !occupation || !location || !email || !password || !age || !biomessage || !whatIWant || !whatIOffer || !interests) {
            setError("All fields are required!");
            return;
        }


        try {
            console.log("Creating account...");
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;


            await setDoc(doc(db, "users", user.uid), {
                id: user.uid,
                email,
                name,
                occupation,
                age,
                location,
                biomessage,
                whatIWant,
                whatIOffer,
                interests: interests.split(",").map(interest => interest.trim()),
                hobbyImage: hobbyImage || null,
                profilePic: profilePic || null,
                isProfileComplete: true,
                createdAt: new Date(),
            });

            console.log("Profile created in Firestore!");

            router.replace("/(tabs)/matching");
        } catch (error: any) {
            setError(error.message);
            console.error("Error creating account:", error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.container}>


                <TouchableOpacity onPress={selectProfileImage}>
                    {profilePic ? (
                        <Image source={{ uri: profilePic }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.profilePlaceholder}>
                            <Text style={styles.pictext}> Tap to Add Picture </Text>
                        </View>
                    )}
                </TouchableOpacity>


                <TextInput placeholder="Full Name" placeholderTextColor="#6E6E6E" value={name} onChangeText={setName} style={styles.input} />
                <TextInput placeholder="Occupation" placeholderTextColor="#6E6E6E" value={occupation} onChangeText={setOccupation} style={styles.input} />
                <TextInput placeholder="Location" placeholderTextColor="#6E6E6E" value={location} onChangeText={setLocation} style={styles.input} />
                <TextInput placeholder="Age" placeholderTextColor="#6E6E6E" value={age} onChangeText={setAge} style={styles.input} />
                <TextInput placeholder="What I Want (ex. dance classes)" placeholderTextColor="#6E6E6E" value={whatIWant} onChangeText={setWhatIWant} style={styles.input} />
                <TextInput placeholder="What I Offer (ex. french classes)" placeholderTextColor="#6E6E6E" value={whatIOffer} onChangeText={setWhatIOffer} style={styles.input} />
                <TextInput placeholder="Interests (comma separated)" placeholderTextColor="#6E6E6E" value={interests} onChangeText={setInterests} style={styles.input} />
                <TextInput placeholder="Bio Message" placeholderTextColor="#6E6E6E" value={biomessage} onChangeText={setbiomessage} style={styles.input} />


                <TextInput placeholder="Email" placeholderTextColor="#6E6E6E" value={email} onChangeText={setEmail} style={styles.logininput} />
                <TextInput placeholder="Password" placeholderTextColor="#6E6E6E" value={password} onChangeText={setPassword} style={styles.logininput} secureTextEntry />


                <TouchableOpacity onPress={selectHobbyImage}>
                    {hobbyImage ? (
                        <View style={styles.hobbyContainer}>
                            <Text style={styles.hobbyText}> Change Main Picture </Text>
                            <Image source={{ uri: hobbyImage }} style={styles.hobbyImage} />

                        </View>

                    ) : (
                        <View style={styles.hobbyContainer}>
                            <Text style={styles.hobbyText}> Choose Main Picture </Text>
                            <View style={styles.hobbyImagePlaceholder}>
                                <MaterialIcons name="photo-library" size={18} color="#9A9A9A" />
                            </View>
                        </View>
                    )}
                </TouchableOpacity>


                {error ? <Text style={styles.error}>{error}</Text> : null}

                <View style={styles.createAccount}>
                    <FilledButton label="Create Account" width={320} onPress={handleCreateAccount}></FilledButton>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
    },

    title:
    {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 15,
    },

    profileImage:
    {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },

    profilePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderColor: "#3f3f3f",
        borderWidth: 0.7,
        backgroundColor: "#E0E0E0",
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginBottom: 20,
    },
    pictext: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '200'
    },

    input: {
        width: 320,
        marginBottom: 8,
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


    logininput: {
        marginTop: 10,
        width: 320,
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderColor: '#65558F',
        borderWidth: 1.2,
        backgroundColor: '#fff',
        fontSize: 14,

        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },


    hobbyContainer: {
        marginTop: 15,
        flexDirection: 'row',
        width: 320,
        marginLeft: 5,
        alignItems: 'center',

    },

    hobbyImage: {
        width: 30,
        height: 30,
        borderRadius: 5,
        alignItems: 'center',
        marginLeft: 70,

    },

    hobbyImagePlaceholder: {
        width: 30,
        height: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#3f3f3f",
        borderWidth: 0.7,
        backgroundColor: "#E0E0E0",
        marginLeft: 70,
    },

    hobbyText: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        color: '#6E6E6E',
        textAlign: 'center',
    },


    createAccount: {
        marginTop: 20,
        marginBottom: 20,
    },


    error:
    {
        color: "red",
        marginTop: 10
    },

});