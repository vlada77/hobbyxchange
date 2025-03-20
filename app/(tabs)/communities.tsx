import ImageViewer from '@/components/ImageViewer';
import OutlinedButton from '@/components/OutlinedButton';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";

export default function CommunitiesScreen() {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} >
            <View style={styles.communitiesContainer}>
                <Text style={styles.textLabel}>My Communities</Text>
                <View style={styles.communitiesGallery}>

                    <View style={styles.communityDetails}>
                        <TouchableOpacity onPress={() => router.push("/artCommunity")}>
                            <ImageViewer imgSource={require('@/assets/images/art-community.jpg')} style={styles.imageStyle}></ImageViewer>
                            <Text style={styles.communityName}>Art</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/sport-community.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Sport</Text>
                    </View>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/music-community.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Music</Text>
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
                        <ImageViewer imgSource={require('@/assets/images/art-community.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Art</Text>
                    </View>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-community.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Crafts</Text>
                    </View>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-community.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Painting</Text>
                    </View>

                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-community.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Art</Text>
                    </View>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-community.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Crafts</Text>
                    </View>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-community.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Painting</Text>
                    </View>

                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-community.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Art</Text>
                    </View>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-community.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Crafts</Text>
                    </View>
                    <View style={styles.communityDetails}>
                        <ImageViewer imgSource={require('@/assets/images/art-community.jpg')} style={styles.imageStyle}></ImageViewer>
                        <Text style={styles.communityName}>Painting</Text>
                    </View>
                </View>
            </View>

        </ScrollView >
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
    },

    textLabel: {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: '500',
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