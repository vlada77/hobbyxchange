import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import ImageViewer from '@/components/ImageViewer';
import OutlinedButton from '@/components/OutlinedButton';
import FilledButton from '@/components/FilledButton';
import InterestButton from '@/components/InterestButton';
import ProfileInfo from '@/components/ProfileInfo';
import CommunityInfo from '@/components/CommunityInfo';


const profiles = [
    {
        id: '1',
        name: 'Andrew Newman',
        avatar: require('@/assets/images/profile-photo9.jpg'),
    },
    {
        id: '2',
        name: 'John Doe',
        avatar: require('@/assets/images/profile-photo2.jpg'),
    },
    {
        id: '3',
        name: 'Creed Neilan',
        avatar: require('@/assets/images/profile-photo8.jpg'),
    },
    {
        id: '4',
        name: 'Sara Guilar',
        avatar: require('@/assets/images/profile-photo6.jpg'),
    },
    {
        id: '5',
        name: 'Sarah Pickle',
        avatar: require('@/assets/images/profile-photo5.jpg'),
    },
];


export default function musicCommunity() {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.communityNameContainer}>
                <CommunityInfo avatarSource={require('@/assets/images/music-community.jpg')} name={"Music"} />
            </View>

            <View style={styles.postContainer}>
                <View style={styles.authorContainer}>
                    <ProfileInfo avatarSource={profiles[0].avatar} name={profiles[0].name} />
                </View>


                <View style={styles.imageContainer}>
                    <ImageViewer imgSource={require('@/assets/images/band-create.jpg')} style={styles.mainImage} />
                </View>

                <View style={styles.postTextContainer}>
                    <Text style={styles.postTitle}>Guitarist for Live Band</Text>
                    <Text style={styles.postDescription}>Hi Everyone! I have a band and our guitarist can't make it to our live band! We are looking for another guitarist to join our team! </Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <View style={styles.iconsContainer}>
                        <FontAwesome name="heart" size={20} color="#ccc" />
                        <FontAwesome name="plus-circle" size={20} color="#ccc" />
                        <FontAwesome name="comment" size={20} color="#ccc" />

                    </View>
                    <View style={styles.chatbutton}>

                        <FilledButton icon="comment" label="Chat" onPress={() => alert('You pressed a button.')} />

                    </View>


                </View>

            </View>

            <View style={styles.postContainer}>
                <View style={styles.authorContainer}>
                    <ProfileInfo avatarSource={profiles[1].avatar} name={profiles[1].name} />
                </View>


                <View style={styles.imageContainer}>
                    <ImageViewer imgSource={require('@/assets/images/concert.jpg')} style={styles.mainImage} />
                </View>

                <View style={styles.postTextContainer}>
                    <Text style={styles.postTitle}>Lana del Rey Concert</Text>
                    <Text style={styles.postDescription}>Hello! Is there anyone a fan of Lana del Rey! I want to go to her concert this Saturday and want to meet up with a group of people that want to party together! </Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <View style={styles.iconsContainer}>
                        <FontAwesome name="heart" size={20} color="#ccc" />
                        <FontAwesome name="plus-circle" size={20} color="#ccc" />
                        <FontAwesome name="comment" size={20} color="#ccc" />

                    </View>
                    <View style={styles.chatbutton}>

                        <FilledButton icon="comment" label="Chat" onPress={() => alert('You pressed a button.')} />

                    </View>


                </View>



            </View>

            <View style={styles.postContainer}>
                <View style={styles.authorContainer}>
                    <ProfileInfo avatarSource={profiles[2].avatar} name={profiles[2].name} />
                </View>


                <View style={styles.imageContainer}>
                    <ImageViewer imgSource={require('@/assets/images/live-band.jpg')} style={styles.mainImage} />
                </View>

                <View style={styles.postTextContainer}>
                    <Text style={styles.postTitle}>Live Band Tonight!</Text>
                    <Text style={styles.postDescription}>We are performing tonight at Live Music Bar! Come along and come meet us! </Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <View style={styles.iconsContainer}>
                        <FontAwesome name="heart" size={20} color="#ccc" />
                        <FontAwesome name="plus-circle" size={20} color="#ccc" />
                        <FontAwesome name="comment" size={20} color="#ccc" />

                    </View>
                    <View style={styles.chatbutton}>

                        <FilledButton icon="comment" label="Chat" onPress={() => alert('You pressed a button.')} />

                    </View>


                </View>
            </View>

            <View style={styles.postContainer}>
                <View style={styles.authorContainer}>
                    <ProfileInfo avatarSource={profiles[3].avatar} name={profiles[3].name} />
                </View>


                <View style={styles.imageContainer}>
                    <ImageViewer imgSource={require('@/assets/images/song-feedback.jpg')} style={styles.mainImage} />
                </View>

                <View style={styles.postTextContainer}>
                    <Text style={styles.postTitle}>Song feedback</Text>
                    <Text style={styles.postDescription}>Hi Everyone! I made a song and would love to listen to your feedback, here is the link: ...... ! </Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <View style={styles.iconsContainer}>
                        <FontAwesome name="heart" size={20} color="#ccc" />
                        <FontAwesome name="plus-circle" size={20} color="#ccc" />
                        <FontAwesome name="comment" size={20} color="#ccc" />

                    </View>
                    <View style={styles.chatbutton}>

                        <FilledButton icon="comment" label="Chat" onPress={() => alert('You pressed a button.')} />

                    </View>
                </View>

            </View>

        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    communityNameContainer: {
        width: 320,
        alignItems: 'flex-start',
        marginTop: 20,
    },


    postContainer: {
        backgroundColor: '#F0EDF0',
        width: 330,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 15,
        marginBottom: 15,
    },
    authorContainer: {
        width: 300,
        alignItems: 'flex-start',
        marginTop: 10,
    },


    imageContainer: {
        width: 300,
        alignItems: 'center',
        marginTop: 5,
    },
    mainImage: {
        width: 300,
        height: 200,

    },

    postTextContainer: {
        width: 300,
        alignItems: 'flex-start',
        marginTop: 5,
        padding: 5,
    },
    postTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    postDescription: {
        fontSize: 13,
        marginTop: 5,
        fontWeight: '300',
        fontStyle: 'italic',
    },



    buttonsContainer: {
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10,
    },

    iconsContainer: {

        flexDirection: 'row',
        width: 100,
        justifyContent: 'space-evenly',
    },
    chatbutton: {

    }
});