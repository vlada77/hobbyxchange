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
        name: 'Alice Noah',
        avatar: require('@/assets/images/profile-photo1.jpg'),
    },
    {
        id: '2',
        name: 'Andrea Polins',
        avatar: require('@/assets/images/profile-photo7.jpg'),
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


export default function artCommunity() {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.communityNameContainer}>
                <CommunityInfo avatarSource={require('@/assets/images/art-community.jpg')} name={"Art"} />
            </View>

            <View style={styles.postContainer}>
                <View style={styles.authorContainer}>
                    <ProfileInfo avatarSource={profiles[0].avatar} name={profiles[0].name} />
                </View>


                <View style={styles.imageContainer}>
                    <ImageViewer imgSource={require('@/assets/images/sip-and-paint.jpg')} style={styles.mainImage} />
                </View>

                <View style={styles.postTextContainer}>
                    <Text style={styles.postTitle}>Sip and Paint meet-up</Text>
                    <Text style={styles.postDescription}>Hi Everyone! I am an IT consultant, so I am working full-time in the office! I would really love if someone would like to meet up for a Sip and Paint evening! We could go to this cozy and chill cafe that allows people painting and meet ups for creatives ! </Text>
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
                    <ImageViewer imgSource={require('@/assets/images/art-picnic.jpg')} style={styles.mainImage} />
                </View>

                <View style={styles.postTextContainer}>
                    <Text style={styles.postTitle}>Artsy Picnic</Text>
                    <Text style={styles.postDescription}>Hi Everyone! I am organising a meet-up in Central Park today! React to this post if you are interested in coming to paint along! </Text>
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
                    <ImageViewer imgSource={require('@/assets/images/life-drawing.jpg')} style={styles.mainImage} />
                </View>

                <View style={styles.postTextContainer}>
                    <Text style={styles.postTitle}>Life Drawing</Text>
                    <Text style={styles.postDescription}>Hi Everyone! I am thinking of going to this Life Drawing session but I am afraid of going along! Anyone interested? </Text>
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
                    <ImageViewer imgSource={require('@/assets/images/paint-model.jpg')} style={styles.mainImage} />
                </View>

                <View style={styles.postTextContainer}>
                    <Text style={styles.postTitle}>Meet and paint each other</Text>
                    <Text style={styles.postDescription}>Hi Everyone! I am looking for a model that would like to sit for me while I paint! Would love to connect while I paint you! </Text>
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