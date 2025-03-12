import ImageViewer from '@/components/ImageViewer';
import OutlinedButton from '@/components/OutlinedButton';
import { Text, View, StyleSheet } from 'react-native';

export default function CommunitiesScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.communitiesContainer}>
                <Text style={styles.textLabel}>My Communities</Text>
                <View style={styles.communitiesGallery}>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Art</Text>
                    </View>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Crafts</Text>
                    </View>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Painting</Text>
                    </View>

                </View>
            </View>
            <View style={styles.viewAllButtonContainer}>
                <OutlinedButton label="View All" width={150}></OutlinedButton>
            </View>



            <View style={styles.communitiesContainer}>
                <Text style={styles.textLabel}>Explore Communities</Text>
                <View style={styles.communitiesGallery}>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Art</Text>
                    </View>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Crafts</Text>
                    </View>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Painting</Text>
                    </View>

                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Art</Text>
                    </View>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Crafts</Text>
                    </View>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Painting</Text>
                    </View>

                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Art</Text>
                    </View>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Crafts</Text>
                    </View>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Painting</Text>
                    </View>
                </View>
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

    textLabel: {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: '400',
        marginVertical: 5,

    },

    communitiesContainer: {
        width: 320,
        marginTop: 10,
    },

    communitiesGallery: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    communityDetails: {
        margin: 3,
        marginVertical: 6,
        flexDirection: 'column',
        alignItems: 'center',
    },
    imageStyle: {
        width: 90,
        height: 90,
    },
    communityName: {
        fontWeight: 300,
    },
    viewAllButtonContainer: {
        width: 320,
        alignItems: 'flex-start',
        marginVertical: 10,
    }


});