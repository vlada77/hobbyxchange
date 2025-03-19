import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { collection, doc, getDoc, getDocs, addDoc, orderBy, query, onSnapshot, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import FilledButton from '@/components/FilledButton';
import OutlinedButton from '@/components/OutlinedButton';
import ProfileInfo from '@/components/ProfileInfo';
import { ImageSource } from 'expo-image';

export default function ChatScreen() {
    const { chatId } = useLocalSearchParams();

    type Message = {
        id: string;
        senderId: string;
        text: string;
        timestamp: any;
    };

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [otherUser, setOtherUser] = useState<{ name: string; profilePic: ImageSource } | null>(null);

    useEffect(() => {
        const fetchOtherUser = async () => {
            if (typeof chatId !== 'string') {
                console.error("chatId is not a string:", chatId);
                return;
            }
            const chatRef = doc(db, "chats", chatId);
            const chatSnap = await getDoc(chatRef);

            if (chatSnap.exists()) {
                const chatData = chatSnap.data();
                const otherUserId = chatData.userIds.find((id: string) => id !== auth.currentUser?.uid);

                if (otherUserId) {
                    const userRef = doc(db, "users", otherUserId);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        setOtherUser({
                            name: userSnap.data().name,
                            profilePic: userSnap.data().profilePic,
                        });
                    }
                }
            }
        };

        fetchOtherUser();
    }, [chatId]);


    useEffect(() => {
        const messagesRef = collection(db, `chats/${chatId}/messages`);
        const q = query(messagesRef, orderBy("timestamp"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages: Message[] = snapshot.docs.map((msgDoc) => ({
                id: msgDoc.id,
                senderId: msgDoc.data().senderId || "",
                text: msgDoc.data().text || "",
                timestamp: msgDoc.data().timestamp || null,
            }));
            setMessages(fetchedMessages);
        });

        return () => unsubscribe();
    }, [chatId]);


    const sendMessage = async () => {
        if (!auth.currentUser || !newMessage.trim()) return;

        await addDoc(collection(db, `chats/${chatId}/messages`), {
            senderId: auth.currentUser.uid,
            text: newMessage,
            timestamp: serverTimestamp(),
        });

        setNewMessage("");
    };
    return (
        <View style={styles.container}>

            <View style={styles.profileContainer}>
                {otherUser ? (
                    <ProfileInfo avatarSource={otherUser.profilePic} name={otherUser.name} />
                ) : (
                    <Text>Loading...</Text>
                )}
                <OutlinedButton icon="flag-o" label=" Report" height={34} borderColor="#993333" color="#A65A5A" onPress={() => alert("You pressed a button.")} />
            </View>


            <ScrollView style={styles.chatContainer}>
                {messages.map((msg) => (
                    <View
                        key={msg.id}
                        style={[
                            styles.messageContainer,
                            msg.senderId === auth.currentUser?.uid ? styles.myMessage : styles.otherMessage,
                        ]}
                    >
                        <Text style={styles.messageSender}>
                            {msg.senderId === auth.currentUser?.uid ? "You" : otherUser?.name}
                        </Text>
                        <Text style={styles.messageText}>{msg.text}</Text>
                    </View>
                ))}
            </ScrollView>


            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                />
                <FilledButton icon="share" label="Send" onPress={sendMessage} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
    },
    profileContainer: {
        width: 320,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    chatContainer: {
        width: 320,
        flex: 1,
        marginBottom: 20,
    },

    messageContainer: {
        width: 320,
        marginBottom: 10,
    },

    messageSender: {
        fontWeight: 500,
        fontSize: 18,
        marginBottom: 10,
    },

    myMessage: {
        alignItems: 'flex-start',
    },
    otherMessage: {
        alignItems: 'flex-end',
    },
    messageText: {
        color: '#333',
        backgroundColor: '#F0EDF0',
        borderRadius: 5,
        width: 190,
        padding: 10,
        fontSize: 14,
    },


    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    input: {
        margin: 5,
        flex: 1,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#65558F',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        paddingHorizontal: 30,
        backgroundColor: '#fff',
        fontSize: 14,
        color: '#65558F',
    },
});