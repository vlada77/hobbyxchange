import { Text, View, StyleSheet, ScrollView } from 'react-native';
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

                    const usersRef = collection(db, "users");
                    const querySnapshot = await getDocs(usersRef);

                    const allUsers = querySnapshot.docs.map(doc => doc.data());

                    const users = allUsers.filter(user =>
                        user.id !== auth.currentUser?.uid &&
                        user.location === currentUserLocation

                    );

                    if (users.length > 0) {
                        const randomUser = users[Math.floor(Math.random() * users.length)];
                        setRandomUser(randomUser);
                    }
                    else {
                        console.log("No users found...");
                    }
                }
                setLoading(false);

            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [currentUserId]);


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
        console.log("Generated Chat ID:", chatId);

        const chatRef = doc(db, "chats", chatId);
        console.log("chatRef path:", chatRef.path);

        try {
            // Attempt to get the chat document
            const chatSnap = await getDoc(chatRef);
            console.log("chatSnap exists:", chatSnap.exists());

            if (!chatSnap.exists()) {
                console.log("Creating new chat...");

                // Get current user and random user data (name, profilePic)
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
                            userIds: [currentUserId, randomUserId], // Array of user IDs
                            lastMessage: "",  // Initially no message
                            timestamp: serverTimestamp(),  // Firestore timestamp
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
                <View style={styles.profileContainer}>
                    {randomUser?.profilePic ? (
                        <ProfileInfo avatarSource={randomUser.profilePic} name={randomUser.name} />
                    ) : (
                        <ProfileInfo avatarSource={require('@/assets/images/default-profile-pic.jpg')} name={randomUser.name} />

                    )}
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
                        <OutlinedButton label="View full profile" width={210} onPress={() => alert('You pressed a button.')} />
                        <FilledButton icon="comment" label="Chat" onPress={handleChat} />
                    </View>
                </View>
            ) : (
                <Text>Loading...</Text>
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
        alignItems: 'flex-start',
        marginTop: 10,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
});