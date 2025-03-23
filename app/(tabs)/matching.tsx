import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { db, auth } from '@/firebase/firebaseConfig';
import { doc, getDoc, setDoc, collection, getDocs, query, addDoc, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import ImageViewer from '@/components/ImageViewer';
import OutlinedButton from '@/components/OutlinedButton';
import FilledButton from '@/components/FilledButton';
import InterestButton from '@/components/InterestButton';
import ProfileInfo from '@/components/ProfileInfo';
import { Alert } from 'react-native';

import { ActivityIndicator } from 'react-native';


export default function MatchingPage() {
    const [randomUser, setRandomUser] = useState<any>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const currentUserId = auth.currentUser?.uid;
    const currentUser = auth.currentUser;

    if (!currentUserId) {
        console.error("User is not authenticated");
        return;
    }


    const [displayedUserIds, setDisplayedUserIds] = useState<string[]>([]);


    const handleNextMatch = async () => {
        if (auth.currentUser) {
            try {
                const currentUserRef = doc(db, "users", auth.currentUser.uid);
                const currentUserSnap = await getDoc(currentUserRef);

                if (!currentUserSnap.exists()) {
                    console.error("Current user not found in Firestore.");
                    return;
                }

                const currentUserData = currentUserSnap.data();
                const currentUserLocation = currentUserData.location;
                const currentUserInterests = currentUserData.interests || [];

                const usersRef = collection(db, "users");
                const querySnapshot = await getDocs(usersRef);

                const allUsers = querySnapshot.docs.map(doc => doc.data());


                const filteredUsers = allUsers.filter(user =>
                    user.id !== auth.currentUser?.uid &&
                    !displayedUserIds.includes(user.id)
                );

                for (const user of filteredUsers) {
                    console.log("Filetered users", user.name)
                };

                const matchingUsers = filteredUsers.filter((user: any) =>
                    user.location === currentUserLocation ||
                    user.interests.some((interest: string) =>
                        currentUserInterests
                            .map((currentInterest: string) => currentInterest.toLowerCase())
                            .includes(interest.toLowerCase())
                    )
                );

                for (const user of matchingUsers) {
                    console.log("Matching users", user.name)
                }

                if (matchingUsers.length > 0) {

                    const randomUser = matchingUsers[Math.floor(Math.random() * matchingUsers.length)];
                    setRandomUser(randomUser);
                    setDisplayedUserIds(prevIds => [...prevIds, randomUser.id]);
                } else {

                    showRandomUser(filteredUsers);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
    };


    const showRandomUser = (filteredUsers: any[]) => {
        const remainingUsers = filteredUsers.filter(user => !displayedUserIds.includes(user.id));

        if (remainingUsers.length > 0) {
            const randomUser = remainingUsers[Math.floor(Math.random() * remainingUsers.length)];
            setRandomUser(randomUser);
            setDisplayedUserIds(prevIds => [...prevIds, randomUser.id]);
        } else {
            setLoading(true);
            setDisplayedUserIds([]);
            setRandomUser(null);

            Alert.alert("No more users left, starting over...");
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (auth.currentUser) {
                    const currentUserRef = doc(db, "users", auth.currentUser.uid);
                    const currentUserSnap = await getDoc(currentUserRef);

                    if (!currentUserSnap.exists()) {
                        console.error("Current user not found in Firestore.");
                        return;
                    }

                    const currentUserData = currentUserSnap.data();
                    const currentUserLocation = currentUserData.location;
                    const currentUserInterests = currentUserData.interests || [];

                    const usersRef = collection(db, "users");
                    const querySnapshot = await getDocs(usersRef);

                    const allUsers = querySnapshot.docs.map(doc => doc.data());

                    const filteredUsers = allUsers.filter(user =>
                        user.id !== auth.currentUser?.uid &&
                        !displayedUserIds.includes(user.id)
                    );

                    const matchingUsers = filteredUsers.filter((user: any) =>
                        user.location === currentUserLocation ||
                        user.interests.some((interest: string) =>
                            currentUserInterests
                                .map((currentInterest: string) => currentInterest.toLowerCase())
                                .includes(interest.toLowerCase())
                        )
                    );

                    for (const user of matchingUsers) {
                        console.log("Matching users", user.name)
                    };

                    if (matchingUsers.length > 0) {
                        const randomUser = matchingUsers[Math.floor(Math.random() * matchingUsers.length)];
                        setRandomUser(randomUser);
                        setDisplayedUserIds(prevIds => [...prevIds, randomUser.id]);
                    } else {
                        showRandomUser(filteredUsers);
                    }
                }
                setLoading(false);

            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };


        if (!randomUser) {
            fetchUsers();
        }
    }, [auth.currentUser, displayedUserIds, randomUser]);


    const handleChat = async () => {
        if (!randomUser || !auth.currentUser) {
            console.log("No random user or no current user");
            return;
        }

        const currentUserId = auth.currentUser.uid;
        const randomUserId = randomUser?.id;

        if (!currentUserId || !randomUserId) {
            console.log("One of the user IDs is undefined.");
            return;
        }

        const chatId = [currentUserId, randomUserId].sort().join("_");

        const chatRef = doc(db, "chats", chatId);

        try {
            const chatSnap = await getDoc(chatRef);
            console.log("chatSnap exists:", chatSnap.exists());

            if (!chatSnap.exists()) {
                console.log("Creating new chat...");


                const currentUserRef = doc(db, "users", currentUserId);
                const randomUserRef = doc(db, "users", randomUserId);

                const [currentUserSnap, randomUserSnap] = await Promise.all([
                    getDoc(currentUserRef),
                    getDoc(randomUserRef),
                ]);

                if (currentUserSnap.exists() && randomUserSnap.exists()) {
                    const currentUserData = currentUserSnap.data();
                    const randomUserData = randomUserSnap.data();

                    try {
                        await setDoc(chatRef, {
                            userIds: [currentUserId, randomUserId],
                            lastMessage: "",
                            timestamp: serverTimestamp(),
                            user1: {
                                id: currentUserId,
                                name: currentUserData.name,
                                profilePic: currentUserData.profilePic || null,
                            },
                            user2: {
                                id: randomUserId,
                                name: randomUserData.name,
                                profilePic: randomUserData.profilePic || null,
                            },
                        });

                        console.log("Chat successfully created!");
                    } catch (error) {
                        console.error("Error creating chat:", error);
                    }
                } else {
                    console.log("One or both users do not exist.");
                }
            } else {
                console.log("Chat already exists.");
            }

            router.push(`/chat/${chatId}`);
        } catch (error) {
            console.error("Error fetching chat document:", error);
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

            {randomUser ? (
                <View style={styles.container}>

                    <View style={styles.profileContainer}>
                        {randomUser.profilePic ? (
                            <TouchableOpacity onPress={() => router.push(`/fullprofile/${randomUser.id}`)}>
                                <ProfileInfo avatarSource={{ uri: randomUser.profilePic }} name={randomUser.name} />
                            </TouchableOpacity>

                        ) : (
                            <TouchableOpacity onPress={() => router.push(`/fullprofile/${randomUser.id}`)}>
                                <ProfileInfo avatarSource={require('@/assets/images/default-profile-pic.jpg')} name={randomUser.name} />
                            </TouchableOpacity>
                        )}
                        <OutlinedButton icon="refresh" label="Next" height={34} width={100} onPress={handleNextMatch} />

                    </View>

                    <View style={styles.imageContainer}>
                        {randomUser?.hobbyImage && (
                            <ImageViewer imgSource={randomUser.hobbyImage} />
                        )}
                    </View>

                    <View style={styles.tradeContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.textLabel}>What I Want:</Text>
                            <View style={styles.textValue}>
                                <Text style={styles.text}>{randomUser.whatIWant}</Text>
                            </View>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textLabel}>What I Offer:</Text>
                            <View style={styles.textValue}>
                                <Text style={styles.text}>{randomUser.whatIOffer}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.interestsContainer}>
                        <Text style={styles.textLabel}>My Interests</Text>
                        <View style={styles.interestsBubbles}>
                            {randomUser?.interests.map((interest: string, index: number) => (
                                <InterestButton key={index} label={interest} />
                            ))}
                        </View>
                    </View>

                    <View style={styles.buttonsContainer}>

                        <FilledButton icon="comment" label="Start Chat" width={320} onPress={handleChat} />
                    </View>


                </View>
            ) : (
                <ActivityIndicator size="large" color="#0000ff" />
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
        padding: 20,
        alignItems: 'center',
    },

    container: {
        width: 320,
        alignItems: 'center',
    },

    nextbutton: {
        padding: 0,
        marginTop: 10,
        width: 340,
        alignItems: 'flex-end',

    },

    profileContainer: {
        alignItems: 'center',
        width: 320,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },



    imageContainer: {
        alignItems: 'center',
        marginTop: 10,
    },


    tradeContainer: {
        width: 320,
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 10,
    },

    textContainer: {
        flexDirection: 'column',
    },
    textLabel: {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: '600',
    },
    textValue: {
        width: 150,
        height: 60,
        paddingVertical: 2,
        borderRadius: 2,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: 5,
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
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },


    buttonsContainer: {
        width: 320,
        alignItems: 'flex-end',
        marginTop: 15,
    },
});