import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { collection, doc, getDoc, updateDoc, getDocs, addDoc, orderBy, query, onSnapshot, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import FilledButton from '@/components/FilledButton';
import OutlinedButton from '@/components/OutlinedButton';
import ProfileInfo from '@/components/ProfileInfo';
import { ImageSource } from 'expo-image';
import { useLayoutEffect } from "react";

export default function ChatScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { chatId } = params;
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Chat",
            headerBackTitle: "Messages", // Only changes back button title in this screen
        });
    }, [navigation]);

    type Message = {
        id: string;
        senderId: string;
        text: string;
        timestamp: any;
    };

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [otherUser, setOtherUser] = useState<any>(null);

    useEffect(() => {
        const fetchChatData = async () => {
            if (typeof chatId !== 'string') {
                console.error("chatId is not a string:", chatId);
                return;
            }

            const chatRef = doc(db, "chats", chatId);
            const chatSnap = await getDoc(chatRef);

            if (chatSnap.exists()) {
                const chatData = chatSnap.data();
                const currentUserId = auth.currentUser?.uid;

                const otherUserData = chatData.userIds.find((id: string) => id !== currentUserId);

                if (otherUserData) {
                    const otherUser = currentUserId === chatData.user1?.id ? chatData.user2 : chatData.user1;

                    setOtherUser(otherUser);
                }
            }
        };

        fetchChatData();
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

        if (typeof chatId !== 'string') {
            console.error("chatId is not a string:", chatId);
            return;
        }

        const chatRef = doc(db, "chats", chatId);

        await updateDoc(chatRef, {
            lastMessage: newMessage,
            timestamp: serverTimestamp(),
        });

        setNewMessage("");
    };

    return (
        <View style={styles.container}>

            {otherUser ? (
                <View>
                    <View style={styles.profileContainer}>
                        {otherUser.profilePic ? (
                            <TouchableOpacity onPress={() => router.push(`/fullprofile/${otherUser.id}`)}>
                                <ProfileInfo avatarSource={{ uri: otherUser.profilePic }} name={otherUser.name} />

                            </TouchableOpacity>

                        ) : (
                            <ProfileInfo avatarSource={require('@/assets/images/default-profile-pic.jpg')} name={otherUser.name} />
                        )}
                        <OutlinedButton icon="flag-o" label="Report" height={34} borderColor="#993333" color="#A65A5A" onPress={() => alert("You pressed a button.")} />
                    </View>


                    <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false} >
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

            ) : (
                <Text>Loading...</Text>
            )
            }
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
    },


    profileContainer: {
        width: 320,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    chatContainer: {
        width: 320,
        flexGrow: 1,
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

    otherMessage: {
        alignItems: 'flex-start',
    },
    myMessage: {
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