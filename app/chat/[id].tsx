import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import FilledButton from '@/components/FilledButton';

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
            <Text style={styles.header}>Chat with {numericId}</Text>

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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
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