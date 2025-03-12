import { StyleSheet } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
    imgSource: ImageSource;
    style?: object;
};

export default function ImageViewer({ imgSource, style }: Props) {
    return <Image source={imgSource} style={[styles.image, style]} />;
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 320,
        borderRadius: 18,
        margin: 5,
    },
});