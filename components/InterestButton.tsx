import { StyleSheet, View, Text } from 'react-native';

type Props = {
    label: string;
    onPress?: () => void;
};

export default function InterestButton({ label, onPress }: Props) {
    return (
        <View style={styles.interestBubble}>
            <Text style={styles.interestText}>{label}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    interestBubble: {
        height: 35,
        backgroundColor: '#ECE6F0',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        margin: 7,

        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    },
    interestText: {
        color: '#333',
        fontSize: 14,
    },
});