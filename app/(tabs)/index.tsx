import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import ImageViewer from '@/components/ImageViewer';
import OutlinedButton from '@/components/OutlinedButton';
import FilledButton from '@/components/FilledButton';
import InterestButton from '@/components/InterestButton';
import ProfileInfo from '@/components/ProfileInfo';

const profiles = [
  {
    id: '1',
    name: 'Alice Noah',
    avatar: require('@/assets/images/profilephoto.jpg'),
    mainImage: require('@/assets/images/art-hobby.jpg'),
    whatIWant: 'Dance Classes',
    whatIOffer: 'Graphic Design',
    interests: ['Art', 'Design', 'Technology'],
  },
  {
    id: '2',
    name: 'John Doe',
    avatar: require('@/assets/images/profilephoto2.jpg'),
    mainImage: require('@/assets/images/music-hobby.jpg'),
    whatIWant: 'Piano Lessons',
    whatIOffer: 'Photography',
    interests: ['Music', 'Photography', 'Gaming'],
  },
];


export default function Index() {
  const router = useRouter();
  const profile = profiles[0];

  return (
    <View style={styles.container}>

      <View style={styles.profileContainer}>
        <ProfileInfo avatarSource={profile.avatar} name={profile.name} />
      </View>


      <View style={styles.imageContainer}>
        <ImageViewer imgSource={profile.mainImage} />
      </View>

      <View style={styles.interestsContainer}>
        <Text style={styles.textLabel}>My Interests</Text>
        <View style={styles.interestsBubbles}>
          {profile.interests.map((interest, index) => (
            <InterestButton key={index} label={interest} />
          ))}
        </View>
      </View>


      <View style={styles.tradeContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textLabel}>What I Want:</Text>
          <View style={styles.textValue}>
            <Text style={styles.text}>{profile.whatIWant}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textLabel}>What I Offer:</Text>
          <View style={styles.textValue}>
            <Text style={styles.text}>{profile.whatIOffer}</Text>
          </View>
        </View>
      </View>


      <View style={styles.buttonsContainer}>
        <OutlinedButton label="View full profile" width={220} onPress={() => alert('You pressed a button.')} />

        <FilledButton icon="comment" label="Chat" onPress={() => router.push(`/chat/${profile.id}`)} />

      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },


  profileContainer: {
    marginTop: 10,
    width: 320,
    alignItems: 'flex-start',
  },


  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },


  tradeContainer: {
    width: 320,
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 20,
  },

  textContainer: {
    flexDirection: 'column',
  },
  textLabel: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: '600',
  },
  textValue: {
    width: 150,
    height: 35,
    paddingVertical: 20,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 5,
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
    marginTop: 15,
  },

  interestsBubbles: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },


  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
});