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
    },

    avatarPicture: {
        width: 30,
        height: 30,
        borderRadius: 25,
        margin: 5,
        marginRight: 10,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});