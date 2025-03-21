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
        name: 'John Doe',
        avatar: require('@/assets/images/profile-photo2.jpg'),
    },
    {
        id: '2',
        name: 'Alice Noah',
        avatar: require('@/assets/images/profile-photo1.jpg'),
    },
    {
        id: '3',
        name: 'Alicia Smith',
        avatar: require('@/assets/images/profile-photo3.jpg'),
    },
    {
        id: '4',
        name: 'Adriana Joseph',
        avatar: require('@/assets/images/profile-photo4.jpg'),
    },
    {
        id: '5',
        name: 'Sarah Pickle',
        avatar: require('@/assets/images/profile-photo5.jpg'),
    },
];


export default function SportCommunity() {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.communityHeader}>

                <CommunityInfo avatarSource={require('@/assets/images/sport-community.jpg')} name={"Sports"} />

                <OutlinedButton label="Join" width={80} onPress={() => alert("You pressed a button.")} />

            </View>

            <View style={styles.postContainer}>
                <View style={styles.authorContainer}>
                    <ProfileInfo avatarSource={profiles[0].avatar} name={profiles[0].name} />
                </View>


                <View style={styles.imageContainer}>
                    <ImageViewer imgSource={require('@/assets/images/boxing.jpg')} style={styles.mainImage} />
                </View>

                <View style={styles.postTextContainer}>
                    <Text style={styles.postTitle}>Boxing buddy!</Text>
                    <Text style={styles.postDescription}>Would anyone be up for booking a room at a gym and practice sparring?! </Text>
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
                    <ImageViewer imgSource={require('@/assets/images/gym-buddy.jpg')} style={styles.mainImage} />
                </View>

                <View style={styles.postTextContainer}>
                    <Text style={styles.postTitle}>Looking for a gym buddy!</Text>
                    <Text style={styles.postDescription}>Hi everyone! Is anyone else literally terrified by gym? I am so anxious going alone! Does anyone want to go together? </Text>
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
                    <ImageViewer imgSource={require('@/assets/images/running-club.jpg')} style={styles.mainImage} />
                </View>

                <View style={styles.postTextContainer}>
                    <Text style={styles.postTitle}>Running meet-up: Central Park</Text>
                    <Text style={styles.postDescription}>Hi! We're having our weekly running club gathering on Tuesday. Meet up-point: Central Park! Hope to see many of you there! </Text>
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


    communityHeader: {
        width: 320,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
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