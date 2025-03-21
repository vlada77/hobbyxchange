import { View, Text, StyleSheet } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
    avatarSource: ImageSource;
    name: string;
};

export default function ProfileInfo({ avatarSource, name }: Props) {
    return (
        <View style={styles.avatarContainer}>
            <Image source={avatarSource} style={styles.avatarPicture} />
            <Text style={styles.profileName}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 150,
    },

    avatarPicture: {
        width: 40,
        height: 40,
        borderRadius: 25,
        margin: 5,
        marginRight: 15,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
});