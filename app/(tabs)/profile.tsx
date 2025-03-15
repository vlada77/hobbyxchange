import ImageViewer from '@/components/ImageViewer';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import InterestButton from '@/components/InterestButton';
import OutlinedButton from '@/components/OutlinedButton';

export default function ProfileScreen() {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} >

            <View style={styles.profileContainer}>
                <Image source={require('@/assets/images/profilephoto.jpg')} style={styles.image} ></Image>
                <View style={styles.profileInfoContainer}>
                    <Text style={styles.profileName}>Ana Brudgerton</Text>
                    <Text style={styles.profileDetails}>Occupation: Graphic Designer</Text>
                    <Text style={styles.profileDetails}>Location: London</Text>
                    <Text style={styles.profileDetails}>Age: 26</Text>
                </View>
            </View>
            <View style={styles.editButtonContainer}>
                <OutlinedButton label="Edit Profile" width={320}></OutlinedButton>
            </View>

            <View style={styles.messageContainer}>
                <Text style={styles.personalMessage}>I am really adenturous and spontaneous! Very easygoing I am looking for someone that wants to spend quality time doing crafts together! </Text>
            </View>

            <View style={styles.interestsContainer}>
                <Text style={styles.textLabel}>My Interests</Text>
                <View style={styles.interestsBubbles}>
                    <InterestButton label="Art" />
                    <InterestButton label="Salsa dancing" />
                    <InterestButton label="Gym" />
                </View>
            </View>


            <View style={styles.tradeContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.textLabel}>What I Want:</Text>
                    <View style={styles.textValue}>
                        <Text style={styles.text}>Salsa Classes</Text>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textLabel}>What I Offer:</Text>
                    <View style={styles.textValue}>
                        <Text style={styles.text}>Art classes or artworks</Text>
                    </View>
                </View>
            </View>

            <View style={styles.galleryContainer}>
                <Text style={styles.textLabel}>Gallery</Text>
                <View style={styles.photoGallery}>
                    <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                    <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                    <ImageViewer imgSource={require('@/assets/images/art-hobby.jpg')} style={styles.imageStyle}></ImageViewer>
                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
    },
    profileContainer: {
        width: 320,
        flexDirection: 'row',
        marginTop: 10,
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 200,
        margin: 5,
        marginRight: 20,
    },

    profileInfoContainer: {
        flexDirection: 'column',
        marginTop: 10,
    },

    profileName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,

    },
    profileDetails: {
        fontSize: 14,
        marginBottom: 2,
        fontWeight: 200,
    },
    editButtonContainer: {
        width: 320,

    },

    messageContainer: {
        width: 320,
        alignItems: 'center',
        backgroundColor: '#F0EDF0',
        margin: 5,
        marginTop: 15,
        padding: 12,
    },
    personalMessage: {
        fontStyle: 'italic',
        fontWeight: 200,
    },


    tradeContainer: {
        marginTop: 5,
        width: 320,
        alignItems: 'flex-start',
        flexDirection: 'column',
    },

    textContainer: {
        flexDirection: 'column',
        marginVertical: 5,
    },
    textLabel: {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 5,
    },
    textValue: {
        width: 320,
        paddingVertical: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#F0EDF0',
    },
    text: {
        margin: 10,
        textAlign: 'left',
        fontSize: 14,
        color: '#333',

    },

    interestsContainer: {
        width: 320,
        alignItems: 'flex-start',
        marginTop: 10,
    },

    interestsBubbles: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },

    galleryContainer: {
        width: 320,
        marginTop: 10,
    },

    photoGallery: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imageStyle: {
        width: 90,
        height: 90,
        margin: 8,
    }



});