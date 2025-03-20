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
        avatar: require('@/assets/images/profilephoto.jpg'),
    },
    {
        id: '2',
        name: 'John Doe',
        avatar: require('@/assets/images/profilephoto2.jpg'),
    },
];


export default function Index() {
    const router = useRouter();
    const profile = profiles[0];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.communityNameContainer}>
                <CommunityInfo avatarSource={require('@/assets/images/art-community.jpg')} name={"Art"} />
            </View>

            <View style={styles.postContainer}>
                <View style={styles.authorContainer}>
                    <ProfileInfo avatarSource={profile.avatar} name={profile.name} />
                </View>


                <View style={styles.imageContainer}>
                    <ImageViewer imgSource={require('@/assets/images/art-community.jpg')} style={styles.mainImage} />
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
                    <ProfileInfo avatarSource={profile.avatar} name={profile.name} />
                </View>


                <View style={styles.imageContainer}>
                    <ImageViewer imgSource={require('@/assets/images/art-community.jpg')} style={styles.mainImage} />
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
                    <ProfileInfo avatarSource={profile.avatar} name={profile.name} />
                </View>


                <View style={styles.imageContainer}>
                    <ImageViewer imgSource={require('@/assets/images/art-community.jpg')} style={styles.mainImage} />
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

            <View style={styles.communityNameContainer}>
                <CommunityInfo avatarSource={require('@/assets/images/art-community.jpg')} name={"Art"} />
            </View>

            <View style={styles.postContainer}>
                <View style={styles.authorContainer}>
                    <ProfileInfo avatarSource={profile.avatar} name={profile.name} />
                </View>


                <View style={styles.imageContainer}>
                    <ImageViewer imgSource={require('@/assets/images/art-community.jpg')} style={styles.mainImage} />
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

        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
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