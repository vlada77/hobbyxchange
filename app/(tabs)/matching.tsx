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
                        user.uid !== auth.currentUser?.uid &&
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
        if (!randomUser) return;

        const chatId = [currentUserId, randomUser.uid].sort().join("_");

        const chatRef = doc(db, "chats", chatId);
        const chatSnap = await getDoc(chatRef);

        if (!chatSnap.exists()) {
            await setDoc(chatRef, {
                userIds: [currentUserId, randomUser.uid],
                lastMessage: "",
                timestamp: new Date(),
            });
        }

        router.push(`/chat/${chatId}`);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {randomUser ? (
                <View style={styles.profileContainer}>
                    <ProfileInfo avatarSource={randomUser.profilePic} name={randomUser.name} />
                    <View style={styles.imageContainer}>
                        {randomUser?.mainImage && (
                            <ImageViewer imgSource={randomUser.mainImage} />
                        )}
                    </View>

                    <View style={styles.interestsContainer}>
                        <Text style={styles.textLabel}>My Interests</Text>
                        <View style={styles.interestsBubbles}>
                            {randomUser?.interests.map((interest: string, index: number) => (
                                <InterestButton key={index} label={interest} />
                            ))}

                            {randomUser?.interests.map((interest: string, index: number) => (
                                <InterestButton key={index} label={interest} />
                            ))}
                        </View>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <OutlinedButton label="View full profile" width={220} onPress={() => alert('You pressed a button.')} />
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
        flexDirection: 'row',
        marginTop: 10,
    },
});