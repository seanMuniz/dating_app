import { StyleSheet, 
        Text,
        Pressable,
        View,
        TextInput,
        TouchableOpacity } from "react-native";

const Login = ({navigation}) => {

    const createAccount = () => {
        navigation.navigate("Create Account");
    }

    return(
        <View style={styles.container}>
            <Text style={styles.signInText}>Welcome to Cupid</Text>
            <TextInput
                placeholder="User Name"
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
            />
            <TouchableOpacity>
                <Text style={styles.underlineText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={[styles.btnText, {color: 'white'}]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createAccountBtn} onPress={createAccount}>
                <Text style={styles.btnText}>Create an account</Text>
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
    loginBtn: {
        width: "100%",
        paddingVertical: 12,
        borderRadius: 20,
        marginTop: 20,
        backgroundColor: "#cbb2ff",
        marginBottom: 10
    },
    btnText: {
        textAlign: "center",
    },
    signInText: {
        padding: 20,
        fontSize: 20
    },
    underlineText: {
        color: 'blue', 
        textDecorationLine: 'underline'
    },
    createAccountBtn: {
        borderWidth: 1,
        width: "100%",
        borderRadius: 20,
        paddingVertical: 12,
        borderColor: "#bbbbbb"
    }
})

export default Login