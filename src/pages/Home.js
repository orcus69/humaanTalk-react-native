import { StatusBar } from 'expo-status-bar';
import React,{ useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, View, SafeAreaView, TouchableOpacity, ActivityIndicator,
  FlatList
} from 'react-native';
import Card from './components/Card'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from '../utils/firebase';
import { Posts } from '../models/Posts';
import { useIsFocused } from '@react-navigation/native';


export default function Home({navigation}) {
    const [posts, setPost] = useState(null);
    const [queryString, setQueryString] = useState('');
    const [load,setLoad] = useState(true)
    const isFocused = useIsFocused();

    useEffect(() => {
        loadPosts();
    }, [isFocused]);

    
    async function loadPosts() {
      const postsList = [];
      db.collection('posts').get().then(querySnapshot => {
          querySnapshot.docs.forEach(posts => {
            postsList.push(new Posts(posts.data(), posts.id));
          });
          setPost(postsList);
      });
      
  }


  return (
    <>
    <SafeAreaView style={{ padding: 28 }}>
      <View style={styles.container}>
        <Text style={styles.text}>Humanos estão</Text> 
        <Text style={styles.text}>falando...</Text>
        <StatusBar style="auto" />
      </View>

      <View>
        {
          posts != null ?
          <FlatList
            data={posts.filter(p => p.title.toLowerCase().includes(queryString.toLowerCase()))}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
            
              <Card 
                content={item}
                onPress={loadPosts}
              />
            }
          />
          :
          <View sFtyle={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>Carregando dados...</Text>
              <ActivityIndicator size="large" />
          </View>
        }
      </View>

      
    </SafeAreaView>
    <TouchableOpacity
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      position: 'absolute',
      bottom: 10,
      right: 10,
      height: 60,
      backgroundColor: '#FF7A00',
      borderRadius: 100,
    }}
    onPress={() => navigation.navigate('Posting', {post: new Posts('','',0, '', '', '')})}
  >
    <Icon name='shape-square-plus' size={24} color='white' />
  </TouchableOpacity></>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 63,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: 32
  },

  text: {
    color: '#FF7A00',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: 47,
  },
});
