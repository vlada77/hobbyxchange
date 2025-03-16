import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { logOut } from "@/services/authService";
import { useRouter } from "expo-router";
import OutlinedButton from "@/components/OutlinedButton";
import InterestButton from "@/components/InterestButton";
import ImageViewer from "@/components/ImageViewer";
import FilledButton from "@/components/FilledButton";

export default function ProfileScreen() {
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser) {
                const userRef = doc(db, "users", auth.currentUser.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setUserData(userSnap.data());
                } else {
                    console.log("No user data found!");
                }
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        await logOut();
        router.replace("/signInScreen");  // Redirect to sign-in screen after logout
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} >
            {userData ? (
                <>

                    <View style={styles.profileContainer}>
                        {userData.profilePic ? (
                            <Image source={userData.profilePic} style={styles.image} ></Image>
                        ) : (
                            <Image source={require('@/assets/images/default-profile-pic.jpg')} style={styles.image} ></Image>

                        )}
                        <View style={styles.profileInfoContainer}>
                            <Text style={styles.profileName}>{userData.name}</Text>
                            <Text style={styles.profileDetails}>Occupation: {userData.occupation}</Text>
                            <Text style={styles.profileDetails}>Location: {userData.location}</Text>
                            <Text style={styles.profileDetails}>Age: {userData.age}</Text>
                        </View>
                    </View>
                    <View style={styles.editButtonContainer}>
                        <OutlinedButton label="Edit Profile" width={320}></OutlinedButton>
                    </View>

                    <View style={styles.messageContainer}>
                        <Text style={styles.personalMessage}> {userData.biomessage}</Text>
                    </View>

                    <View style={styles.interestsContainer}>
                        <Text style={styles.textLabel}>My Interests</Text>
                        <View style={styles.interestsBubbles}>
                            {userData.interests.map((interest: string, index: number) => (
                                <InterestButton key={index} label={interest} />
                            ))}
                        </View>
                    </View>


                    <View style={styles.tradeContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.textLabel}>What I Want:</Text>
                            <View style={styles.textValue}>
                                <Text style={styles.text}>{userData.whatIWant}</Text>
                            </View>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textLabel}>What I Offer:</Text>
                            <View style={styles.textValue}>
                                <Text style={styles.text}>{userData.whatIOffer}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.galleryContainer}>
                        <Text style={styles.textLabel}>Gallery</Text>
                        <View style={styles.photoGallery}>
                            <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                            <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                            <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                        </View>
                    </View>

                    <FilledButton label="Log out" width={160} onPress={handleLogout}></FilledButton>
                </>
            ) : (
                <Text>No user data found</Text>
            )}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
    },
    profileContainer: {
        width: 320,
        flexDirection: 'row',
        marginTop: 10,
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 200,
        margin: 5,
        marginRight: 20,
    },

    profileInfoContainer: {
        flexDirection: 'column',
        marginTop: 10,
    },

    profileName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,

    },
    profileDetails: {
        fontSize: 14,
        marginBottom: 2,
        fontWeight: 200,
    },
    editButtonContainer: {
        width: 320,

    },

    messageContainer: {
        width: 320,
        alignItems: 'center',
        backgroundColor: '#F0EDF0',
        margin: 5,
        marginTop: 15,
        padding: 12,
    },
    personalMessage: {
        fontStyle: 'italic',
        fontWeight: 200,
    },


    tradeContainer: {
        marginTop: 5,
        width: 320,
        alignItems: 'flex-start',
        flexDirection: 'column',
    },

    textContainer: {
        flexDirection: 'column',
        marginVertical: 5,
    },
    textLabel: {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 5,
    },
    textValue: {
        width: 320,
        paddingVertical: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#F0EDF0',
    },
    text: {
        margin: 10,
        textAlign: 'left',
        fontSize: 14,
        color: '#333',

    },

    interestsContainer: {
        width: 320,
        alignItems: 'flex-start',
        marginTop: 10,
    },

    interestsBubbles: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },

    galleryContainer: {
        width: 320,
        marginTop: 10,
        marginBottom: 30,
    },

    photoGallery: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imageStyle: {
        width: 90,
        height: 90,
        margin: 8,
    }



});