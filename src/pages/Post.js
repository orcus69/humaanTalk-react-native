import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView,TextInput,  TouchableOpacity} from 'react-native';
import { AppContext } from '../commons/AppContext';
import { db } from '../utils/firebase';

export default function Poster({route, navigation}) {


  const {post} = route?.params;
  
  console.log(post)
  
  const useNavigate = useNavigation();
  const [title, onChangeTitle] = useState(post.title || '');
  const [text, onChangeText] = useState(post.content || '');
  const [color, onChangeColor] = useState(post.color || '');

  const { user } = useContext(AppContext);

  console.log(user.user.email)

  let ref1 = db.collection('posts').doc(post.id == '' ? undefined :  post.id);

  function addPost (){

    if(title != '' && text != '' && color != ''){
      ref1.set({
        title: title,
        content: text,
        coffe: 0,
        color: color,
        user: user.user.email
      }).then(()=>useNavigate.goBack()).catch(
        (e)=>console.log(e)
      )
    }else{
      console.log("Preencha todos os campos")
    }


  }
  
  return (
    <ScrollView style={{ padding: 28 }}>
      <View style={styles.container}>
        <Text style={styles.text}>Fale alguma coisa também!</Text>
        <StatusBar style="auto" />
      </View>

      <View style={[styles.box]}>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                placeholder="Titulo"
                value={title}
              />
                <TextInput
                style={{fontSize: 18, color: '#615B57', lineHeight: 21, height: 90}}
                onChangeText={onChangeText}
                placeholder="Lança a braba..."
                value={text}
                multiline = {true}
                numberOfLines={5}
                underlineColorAndroid="transparent"
              />
            </View>
        </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 48, paddingLeft: 1}}>
          <Text style={{fontWeight: 'bold', fontSize: 24, lineHeight: 28, color: '#615B57'}}>Escolhe a cor aí!</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity 
                style={[styles.card, {backgroundColor: '#FF7A00' , borderWidth: color != '#FF7A00' ? 0 : 2, borderColor: 'blue'}]}
                onPress={()=>onChangeColor('#FF7A00')}
              />
              <TouchableOpacity 
                style={[styles.card, {backgroundColor: '#19B200', borderWidth: color != '#19B200' ? 0 : 2, borderColor: 'blue'}]}
                onPress={()=>onChangeColor('#19B200')}
              />
              <TouchableOpacity 
              
                style={[styles.card, {backgroundColor: '#00C2FF', borderWidth: color != '#00C2FF' ? 0 : 2, borderColor: 'blue'}]}
                onPress={()=>onChangeColor('#00C2FF')}
              />
          </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => addPost()}
      >
        <Text style={{
          color: 'white', 
          fontWeight: 'bold',
          fontSize: 18,
          lineHeight: 21,
        }}>Postar</Text>
        
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 63,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: 32
  },
  input: {
    color: '#615B57', 
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: 47,
    paddingTop: 12,
    paddingBottom: 2,
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#8A8888',
  },
  text: {
    color: '#FF7A00',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: 47,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#FF7A00',
    borderRadius: 15,
    height: 58,
  },
  card: {
    width: 46,
    height: 43,
    borderRadius: 11,
    marginBottom: 4,
    marginHorizontal: 2,
    elevation: 2,
    shadowColor: '#171717',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 11
  },
  box: {
    backgroundColor: '#f8f8f8',
    width: "100%",
    paddingHorizontal: 24,
    borderRadius: 11,
    marginBottom: 17,
    alignContent: 'space-around',
    elevation: 20,
    shadowColor: '#171717',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 11
},
});
