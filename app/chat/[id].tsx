import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import FilledButton from '@/components/FilledButton';
import OutlinedButton from '@/components/OutlinedButton';
import ProfileInfo from '@/components/ProfileInfo';


const profiles = [
    {
        id: '1',
        name: 'Alice Noah',
        avatar: require('@/assets/images/profilephoto.jpg'),
        mainImage: require('@/assets/images/art-hobby.jpg'),
        whatIWant: 'Dance Classes',
        whatIOffer: 'Graphic Design',
        interests: ['Art', 'Design', 'Technology'],
    },
    {
        id: '2',
        name: 'John Doe',
        avatar: require('@/assets/images/profilephoto2.jpg'),
        mainImage: require('@/assets/images/music-hobby.jpg'),
        whatIWant: 'Piano Lessons',
        whatIOffer: 'Photography',
        interests: ['Music', 'Photography', 'Gaming'],
    },
];

const chatData: { [key: number]: { sender: string; message: string }[] } = {
    1: [
        { sender: 'Alice', message: 'Hey, let’s connect!' },
        { sender: 'You', message: 'Sure, looking forward to it!' },
    ],
    2: [
        { sender: 'John', message: 'Are you free tomorrow?' },
        { sender: 'You', message: 'Yes, I am! What’s up?' },
    ],
};


export default function ChatPage() {
    const { id } = useLocalSearchParams();
    const numericId = Number(id);
    const nameOfChat = profiles[numericId - 1].name;
    const imgOfChat = profiles[numericId - 1].avatar;

    const [messages, setMessages] = useState(chatData[numericId]);

    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = { sender: 'You', message: message.trim() };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage('');
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <ProfileInfo avatarSource={imgOfChat} name={nameOfChat} />
                <OutlinedButton icon="flag-o" label=" Report" height={34} borderColor="#993333" color="#A65A5A" onPress={() => alert('You pressed a button.')} />

            </View>

            <ScrollView style={styles.chatContainer}>
                {messages.map((msg, index) => (
                    <View
                        key={index}
                        style={[
                            styles.messageContainer,
                            msg.sender === 'You' ? styles.otherMessage : styles.myMessage,
                        ]}
                    >
                        <Text style={styles.messageSender}>{msg.sender}:</Text>
                        <Text style={styles.messageText}>{msg.message}</Text>
                    </View>
                ))}
            </ScrollView>


            {/* Message input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    value={message}
                    onChangeText={setMessage}
                />

                <FilledButton icon="share" label="Send" onPress={handleSendMessage} />

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