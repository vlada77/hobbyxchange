import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Pressable, Image } from "react-native";
import { signUp, signIn, logOut } from "@/services/authService";
import { router } from "expo-router";
import FilledButton from "@/components/FilledButton";

export default function SignInScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState("");

    const handleSignUp = async () => {
        router.push("/signUpScreen");
    };

    const handleSignIn = async () => {
        try {
            const loggedInUser = await signIn(email, password);
            setUser(loggedInUser);
            router.replace("/(tabs)/matching");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleLogOut = async () => {
        await logOut();
        setUser(null);
    };

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text>Welcome, {user.email}!</Text>
                    <Button title="Log Out" onPress={handleLogOut} />
                </>
            ) : (
                <>

                    <Image source={require('@/assets/images/temp-logo.jpg')} style={styles.image}></Image>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <View style={styles.buttonsContainer}>
                        <FilledButton label="Log In" width={320} onPress={handleSignIn} />

                        {error ? <Text style={styles.error}>{error}</Text> : null}

                        <View style={styles.signUpContainer}>
                            <Text style={styles.text}>Don't have an account?</Text>
                            <Pressable style={styles.button} onPress={handleSignUp}>
                                <Text style={styles.buttonLabel}>Sign Up</Text>
                            </Pressable>

                        </View>

                    </View>


                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },

    image: {
        width: 200,
        height: 200,
        marginBottom: 50,
    },
    input: {
        width: 320,
        marginBottom: 10,
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderColor: '#65558F',
        borderWidth: 1,
        backgroundColor: '#fff',
        fontSize: 14,
        color: '#65558F',

        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },

    buttonsContainer: {
        width: 320,
        marginTop: 15,
        alignItems: 'center',
        flexDirection: 'column',
    },


    signUpContainer: {
        alignItems: 'center',
        marginTop: 50,

    },
    text: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 300,
    },
    button: {
        marginTop: 5,
    },
    buttonLabel: {
        color: '#4F378A',
        fontSize: 16,
        fontWeight: 400,
        textDecorationLine: 'underline',

    },
    error: {
        marginTop: 10,
        color: "red"
    }
});