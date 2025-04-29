import { StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";
import { db, auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc} from "firebase/firestore";

const CreateAccount = () => {
    const [emailFromUI, setEmailFromUI] = useState("");
    const [passwordFromUI, setPasswordFromUI] = useState("");
    
    const [secPasswordFromUI, setSecPasswordFromUI] = useState("");
    const [shortPassword, setShortPassword] = useState(false);
    const [misMatchPasswords, setMisMatchPasswords] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

    const createAccount = async ()=> {
        
        if (!emailFromUI.includes("@")){
            console.log("did not enter a valid email");
            setInvalidEmail(true);
        } else if (passwordFromUI.length < 8 || secPasswordFromUI.length < 8) {
            console.log("Password too short");
            setShortPassword(true);
            setInvalidEmail(false);
            return;
        } else if (passwordFromUI != secPasswordFromUI && (passwordFromUI.length>= 8)){
            console.log("Passwords do not match");
            setShortPassword(false);
            setMisMatchPasswords(true);
            return;
        } else {
            setShortPassword(false);
            setMisMatchPasswords(false);
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, emailFromUI, passwordFromUI);
                console.log("User email: " + userCredential.user.email);
                console.log("user id: " + userCredential.user.uid);
                
                const newUser = {
                    Email: userCredential.user.email,
                }

                await setDoc(doc(db, "Users", userCredential.user.uid), newUser);
                
    
    
            } catch (error){
                console.log("Error when creating the user");
                console.log(`Error code: ${error.code}`);
                console.log(`Error message: ${error.message}`)
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{fontWeight: "bold", fontSize:30, marginBottom: 15}}>Create an Account</Text>
            <TextInput
                placeholder="OliverLopez@gmail.com"
                style={styles.input}
                value={emailFromUI}
                onChangeText={setEmailFromUI}
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
                value={passwordFromUI}
                onChangeText={setPasswordFromUI}
            />
            <TextInput
                placeholder="Re-enter password"
                style={styles.input}
                value={secPasswordFromUI}
                onChangeText={setSecPasswordFromUI}
            />
            {
                (shortPassword)&& 
                    <View style={{flexDirection: "row", alignItems: 'center'}}>
                        <AntDesign name="closecircleo" size={24} color="red" />
                        <Text style={{color: 'red', marginLeft: 10}}>Password must be more than 8 characters</Text>
                    </View>
            }
            {
                (misMatchPasswords) &&
                    <View style={{flexDirection: 'row'}}>
                        <AntDesign name="closecircleo" size={24} color="red" />
                        <Text style={{color: 'red', marginLeft: 10}}>Passwords must match</Text>
                    </View> 
            }
            {
                (invalidEmail) &&
                    <View style={{flexDirection: 'row'}}>
                        <AntDesign name="closecircleo" size={24} color="red" />
                        <Text style={{color: 'red', marginLeft: 10}}>Please enter a valid email</Text>
                    </View> 
            }

            <TouchableOpacity style={styles.nextBtn} onPress={createAccount}>
                <Text style={{color: 'white'}}>Continue</Text>
                <MaterialIcons name="navigate-next" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    nextBtn: {
        flexDirection: "row", 
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        paddingVertical: 12,
        borderRadius: 20,
        marginTop: 20,
        backgroundColor: "#cbb2ff",
        marginBottom: 10,
    }
})

export default CreateAccount