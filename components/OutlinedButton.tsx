import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
    label: string;
    icon?: keyof typeof FontAwesome.glyphMap;
    width?: number; // Custom width
    height?: number;
    borderColor?: string;
    color?: string;
    onPress?: () => void;

};

export default function OutlinedButton({ label, icon, width, height, borderColor, color, onPress }: Props) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable
                style={[styles.button, { width, height, borderColor }]}
                onPress={onPress}>
                <Text style={[styles.buttonLabel, { color }]}>{label}</Text>
                {icon && <FontAwesome name={icon} size={16} color={color} style={styles.buttonIcon} />}
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
        borderWidth: 1,
        borderColor: '#65558F',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonLabel: {
        color: '#65558F',
        fontSize: 14,
    },
    buttonIcon: {
        paddingLeft: 10,
        opacity: 0.9,
    },
});