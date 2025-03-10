import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// Sample conversation data
const conversations = [
    { id: '1', name: 'Alice Noah', lastMessage: 'Hey, let’s connect!', profileImage: require('@/assets/images/profilephoto.jpg') },
    { id: '2', name: 'Bob Smith', lastMessage: 'Are you free tomorrow?', profileImage: require('@/assets/images/profilephoto2.jpg') },
    // More conversations can go here
];

export default function Messages() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Messages</Text>

            {conversations.map((conversation) => (
                <TouchableOpacity
                    key={conversation.id}
                    style={styles.conversationItem}
                    onPress={() => router.push(`/chat/${conversation.id}`)} // Navigate to the individual chat
                >
                    <View style={styles.conversationContent}>
                        <View style={styles.textContainer}>
                            <Text style={styles.conversationName}>{conversation.name}</Text>
                            <Text style={styles.lastMessage}>{conversation.lastMessage}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    conversationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    conversationContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flexDirection: 'column',
    },
    conversationName: {
        fontWeight: 'bold',
    },
    lastMessage: {
        color: '#888',
    },
});