import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';


type Props = {
    label?: string;
    icon?: keyof typeof FontAwesome.glyphMap;
    onPress?: () => void;
    color?: string;
    height?: number;
};

export default function FilledButton({ label, icon, color = '#65558F', height, onPress }: Props) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable
                style={[styles.button, { backgroundColor: color, height }]}
                onPress={onPress}>
                {label && <Text style={styles.buttonLabel}>{label}</Text>}
                {icon && <FontAwesome name={icon} size={16} color="#fff" style={styles.buttonIcon} />}
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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 18,
    },
    buttonIcon: {
        paddingLeft: 10,
        opacity: 0.9,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 14,
    },
});