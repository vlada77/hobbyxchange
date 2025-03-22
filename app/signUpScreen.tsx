import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Pressable } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import FilledButton from "@/components/FilledButton";
import { uploadImage } from '@/utils/uploadImage';
import * as FileSystem from "expo-file-system";


export default function SignUpScreen() {
    const router = useRouter();
    const storage = getStorage();
    const DEFAULT_PROFILE_PIC = require('@/assets/images/default-profile-pic.jpg')

    // Form State
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
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [error, setError] = useState("");


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

    const uploadProfilePic = async (userId: string) => {
        if (!profilePic) return null;

        const profilePicUrl = await uploadImage(profilePic);
        return profilePicUrl;
    };


    const handleCreateAccount = async () => {
        console.log("handleCreateAccount called");
        try {
            console.log("Creating account...");
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Account created for:", user.uid);


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
                interests: interests.split(","),
                hobbyImage: profilePic || DEFAULT_PROFILE_PIC,
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
        <View style={styles.container}>
            <Text style={styles.title}>Create Your Account</Text>


            <TouchableOpacity onPress={pickImage}>
                {profilePic ? (
                    <Image source={{ uri: profilePic }} style={styles.profileImage} />
                ) : (
                    <View style={styles.profilePlaceholder}>
                        <Text style={styles.pictext}> Tap to Add Picture </Text>
                    </View>

                )}
            </TouchableOpacity>


            <TextInput placeholder="Full Name" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Occupation" value={occupation} onChangeText={setOccupation} style={styles.input} />
            <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
            <TextInput placeholder="Age" value={age} onChangeText={setAge} style={styles.input} />
            <TextInput placeholder="What I Want" value={whatIWant} onChangeText={setWhatIWant} style={styles.input} />
            <TextInput placeholder="What I Offer" value={whatIOffer} onChangeText={setWhatIOffer} style={styles.input} />
            <TextInput placeholder="Interests (comma separated)" value={interests} onChangeText={setInterests} style={styles.input} />
            <TextInput placeholder="Bio Message" value={biomessage} onChangeText={setbiomessage} style={styles.input} />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.logininput} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.logininput} secureTextEntry />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.createAccount}>
                <FilledButton label="Create Account" width={320} onPress={handleCreateAccount}></FilledButton>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        backgroundColor: "#fff"
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

    createAccount: {
        marginTop: 20,
    },


    error:
    {
        color: "red",
        marginTop: 10
    },

});