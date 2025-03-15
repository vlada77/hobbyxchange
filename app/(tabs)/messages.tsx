import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import ProfileInfo from '@/components/ProfileInfo';

// Sample conversation data
const conversations = [
    { id: '1', name: 'Alice Noah', lastMessage: 'Hey, let’s connect!', profileImage: require('@/assets/images/profilephoto.jpg') },
    { id: '2', name: 'Bob Smith', lastMessage: 'Are you free tomorrow?', profileImage: require('@/assets/images/profilephoto2.jpg') },
    // More conversations can go here
];

export default function Messages() {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} >

            {conversations.map((conversation) => (
                <TouchableOpacity
                    key={conversation.id}
                    style={styles.conversationItem}
                    onPress={() => router.push(`/chat/${conversation.id}`)}
                >
                    <View style={styles.conversationContent}>
                        <View style={styles.textContainer}>
                            <ProfileInfo avatarSource={conversation.profileImage} name={conversation.name} />
                            <Text style={styles.lastMessage}>{conversation.lastMessage}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
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