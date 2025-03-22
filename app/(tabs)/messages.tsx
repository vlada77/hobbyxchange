import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { db, auth } from '@/firebase/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fetchUserChats } from "@/utils/fetchUserChats";
import ProfileInfo from '@/components/ProfileInfo';
import { doc, getDoc, updateDoc, onSnapshot, orderBy } from "firebase/firestore";

export default function Messages() {
    const router = useRouter();
    const [chats, setChats] = useState<any[]>([]);

    useEffect(() => {
        if (!auth.currentUser) return;

        const chatRef = collection(db, "chats");

        const q = query(chatRef, where("userIds", "array-contains", auth.currentUser.uid), orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedChats = snapshot.docs.map((docSnapshot) => {
                const chatData = docSnapshot.data();
                const currentUserId = auth.currentUser?.uid;

                const otherUserId = chatData.userIds.find((id: string) => id !== currentUserId);

                const otherUser = currentUserId === chatData.user1?.id ? chatData.user2 : chatData.user1;

                return {
                    chatId: docSnapshot.id,
                    lastMessage: chatData.lastMessage || "No messages yet",
                    timestamp: chatData.timestamp,
                    otherUser,
                };
            });

            setChats(fetchedChats.filter(Boolean));
        });

        return () => unsubscribe();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {chats.length === 0 ? (
                <View style={{ marginTop: 150, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('@/assets/images/waiting.jpg')}
                        style={{ width: 180, height: 180, padding: 20, marginVertical: 10, borderRadius: 50 }}
                    />
                    <Text style={{ textAlign: 'center', fontWeight: '200', fontSize: 16 }}>
                        No conversations yet... Start chatting with someone!
                    </Text>
                </View>
            ) : (
                chats.map((chat) => (
                    <TouchableOpacity
                        key={chat.chatId}
                        style={styles.conversationItem}
                        onPress={() => router.push(`/chat/${chat.chatId}`)}
                    >
                        <View style={styles.conversationContent}>
                            <View style={styles.textContainer}>
                                <ProfileInfo avatarSource={chat.otherUser.profilePic} name={chat.otherUser.name} />
                                {chat.lastMessage ? (
                                    <Text style={styles.lastMessage}>Last Message: {chat.lastMessage}</Text>
                                ) : (
                                    <Text style={styles.lastMessage}>No Messages yet!</Text>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
    },

    conversationItem: {
        marginTop: 10,
        flexDirection: 'row',
        width: 320,
        alignItems: 'flex-start',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#65558F',
        paddingBottom: 15,
    },

    conversationContent: {
        width: 320,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    textContainer: {
        width: 320,
        alignItems: 'flex-start',
        flexDirection: 'column',
        fontSize: 14,
    },

    lastMessage: {
        margin: 5,
        width: 320,
        alignItems: 'center',
        marginTop: 5,
        color: '#888',
        fontSize: 14,
    },
});