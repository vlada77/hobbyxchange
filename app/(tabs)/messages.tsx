import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { db, auth } from '@/firebase/firebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';
import { fetchUserChats } from "@/utils/fetchUserChats";
import ProfileInfo from '@/components/ProfileInfo';
export default function Messages() {
    const router = useRouter();
    const [chats, setChats] = useState<any[]>([]);

    useEffect(() => {
        const loadChats = async () => {
            const chatData = await fetchUserChats();
            setChats(chatData);
        };

        loadChats();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} >
            {chats.length === 0 ? (
                <View style={{ marginTop: 150, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('@/assets/images/waiting.jpg')} style={{ width: 180, height: 180, padding: 20, marginVertical: 10, borderRadius: 50, }}></Image>
                    <Text style={{ textAlign: 'center', fontWeight: '200', fontSize: 16, }}> No conversations yet... Start chatting with someone!</Text>
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
                                <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
        width: 320,
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