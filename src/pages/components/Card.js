import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, YellowBox} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from '../../utils/firebase';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../commons/AppContext';


export default function Home(props, {navigation}) {

    const [ coffe, setCoffe ] = useState(props.content.coffe);

    const { user } = useContext(AppContext);

    const useNavigate = useNavigation();
    
    let ref1 = db.collection('posts').doc(props.content.id);

    function addCoffe() {
        setCoffe(coffe+1);
        //TODO: Adicionar like ao firebase
        ref1.update({coffe: coffe+1}).then(()=>console.log("coffe atualizado"));
    }

    function remove(){
        ref1.delete()
            .then(()=>
               props.onPress())
            .catch(e=>
                console.log("Erro: "+e)
            );
    }

    return (
        
            
        <View key={props.content.id} style={[styles.card, {backgroundColor: props.content.color==null ? "#FF7A00" : props.content.color,}]}>
            <MenuProvider>
            <View style={{flexDirection: 'row', justifyContent:"space-between", paddingTop: 11}}>
                <View style={{flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='account' color='white' size={20}/>
                    <Text style={styles.text}>
                        @{props.content.user}
                    </Text>
                </View> 
                { props.content.user == user.user.email && 
                
                <Menu onSelect={value => alert(`You Clicked : ${value}`)}>
                <MenuTrigger>
                    <Icon name="dots-vertical" color='white' size={20}/>
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption value={"edit"} >
                        <TouchableOpacity
                            style={{flexDirection: 'row', alignItems: 'center' }} 
                            onPress={() => {useNavigate.navigate('Posting',{ post: props.content })}}
                        >
                            <Icon name="pencil" color='#0786CE' size={20}/>
                            <Text style={styles.menuContent}>Editar</Text>
                        </TouchableOpacity>
                        
                    </MenuOption>
                    <MenuOption value={"remove"}>
                        <TouchableOpacity
                            style={{flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => remove()}
                        >
                            <Icon name="trash-can" color='#0786CE' size={20}/>
                            <Text style={styles.menuContent}>Remover</Text>
                        </TouchableOpacity>
                        
                    </MenuOption>
                </MenuOptions>
                </Menu>
                }        
            </View>
                        
            <View>
                <Text style={{
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: 40,
                    lineHeight: 47,
                    paddingTop: 12
                }}>
                    {props.content.title}
                </Text>

                <Text style={{
                    color: 'black', 
                    fontWeight: 'bold',
                    fontSize: 18,
                    lineHeight: 21,
                    paddingTop: 12,
                }}>
                    {props.content.content}
                </Text>
            </View>
            </MenuProvider>

            <View style={{flexDirection: 'row', justifyContent:"space-between", paddingVertical: 12}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=>addCoffe()}>
                        <Icon name="coffee-outline" color='white' size={20}/>
                    </TouchableOpacity>
                    <Text style={styles.text}>
                        {coffe}
                    </Text>
                </View>
                <Icon name="export-variant" color='white' size={20}/>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        width:"100%",
        height: 197,
        paddingHorizontal: 24,
        borderRadius: 11,
        marginBottom: 17,
        alignContent: 'space-around',
        flex: 1,
        elevation: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 11
    },

    text: {
        color: 'white', 
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 14,
        paddingLeft: 4
    },
    menuContent: {
        color: "#0786CE",
        fontWeight: "bold",
        padding: 2,
        fontSize: 12,
    }
});