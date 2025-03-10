import { StyleSheet, View, Pressable, Text } from 'react-native';

type Props = {
    label: string;
    width: number; // Custom width
    onPress?: () => void;
};

export default function OutlinedButton({ label, width, onPress }: Props) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable
                style={[styles.button, { width }]}
                onPress={onPress}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    buttonContainer: {
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    button: {
        borderRadius: 100,
        height: 40,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#65558F',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonLabel: {
        color: '#65558F',
        fontSize: 16,
    },
});