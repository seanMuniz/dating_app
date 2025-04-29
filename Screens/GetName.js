import { StyleSheet, View, Text, TextInput } from "react-native";
import NextBtn from "../Components/NextBtn";
import { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import {doc, updateDoc} from 'firebase/firestore'
import { db } from "../firebaseConfig";

const GetName = ({route}) => {

    const [firstNameUI, setFirstNameUI] = useState("");
    const [lastNameUI, setlastNameUI] = useState("");

    const [incompleteName, setIncompleteName] = useState(false);

    const createName = async () => {
        if (firstNameUI.length == 0 || lastNameUI.length == 0){
            console.log("Please enter your first and last name");
            setIncompleteName(true)
        } else {
            try{
                console.log(route.params.db_id)
                setIncompleteName(false);
    
                // creating an embedded document within the user document in db
                const nameObj = {
                    name:{
                        firstName: firstNameUI,
                        lastName: lastNameUI
                    }
                }
    
                await updateDoc(doc(db,"Users", route.params.db_id), nameObj)

            } catch (error){
                console.log(error);
            }

        }
    }

    return (
        <View style={styles.container}>
            <Text style={{fontWeight: "bold", fontSize: 24, marginBottom: 20}}>Let's get to know you</Text>
            <Text style={{width: "100%" }}>First Name</Text>
            <TextInput
                placeholder="Andrea"
                style={styles.input}
                value={firstNameUI}
                onChangeText={setFirstNameUI}
            />
            <Text style={{width: "100%"}}>Last Name</Text>
            <TextInput
                placeholder="Chen"
                style={styles.input}
                value={lastNameUI}
                onChangeText={setlastNameUI}
            />
            {
                (incompleteName) &&
                <View style={{flexDirection: "row", alignItems: 'center'}}>
                    <AntDesign name="closecircleo" size={24} color="red" />
                    <Text style={{color: 'red', marginLeft: 10}}>Please enter your first name</Text>
                </View>
            }

            <NextBtn onPress={createName}/>


        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 24
    },
    input: {
        borderWidth: 1,
        width: "100%",
        marginBottom: 10,
        paddingVertical: 12,
        borderRadius: 10,
        paddingHorizontal: 15,
        borderColor: "#bbbbbb",
    },
})

export default GetName;