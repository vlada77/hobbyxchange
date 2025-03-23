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
    }, [auth.currentUser?.uid]);

    const handleLogout = async () => {
        await logOut();
        router.replace("/signInScreen");
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.activityindicator} />;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} >
            {userData ? (
                <>

                    <View style={styles.profileContainer}>
                        {userData.profilePic ? (
                            <Image source={{ uri: userData.profilePic }} style={styles.image} ></Image>
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
                        <OutlinedButton label="Edit Profile" width={320} onPress={() => router.push(`/editProfileScreen`)}></OutlinedButton>
                    </View>

                    <View style={styles.messageContainer}>
                        <Text style={styles.personalMessage}> {userData.biomessage}</Text>
                    </View>

                    <View style={styles.interestsContainer}>
                        <Text style={styles.textLabel}>My Interests</Text>
                        <View style={styles.interestsBubbles}>
                            {userData.interests.map((interest: string, index: number) => (
                                <InterestButton key={index} label={interest.trim()} />
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

                    <View style={styles.myHobby}>
                        <Text style={styles.textLabel}>My Hobby:</Text>
                        <View style={styles.hobbyimagecontainer}>
                            {userData.hobbyImage ? (
                                <View style={styles.mainImageContainer}>
                                    <Image source={{ uri: userData.hobbyImage }} style={styles.mainPic} />
                                </View>

                            ) : (
                                <Text style={styles.infodetails}>Edit profile to add an image that best represents your personality or hobby! </Text>

                            )}

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
    activityindicator: {
        marginTop: 40,
    },
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
        padding: 5,
        fontSize: 14,
        color: '#919191',
        fontWeight: '400',
        marginVertical: 5,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    mainText: {
        fontWeight: '500',
        fontSize: 18,
        marginBottom: 15,
    },
    myHobby: {
        width: 320,
        alignItems: 'flex-start',
        marginTop: 15,
    }



});