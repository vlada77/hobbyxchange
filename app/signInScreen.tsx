import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { signUp, signIn, logOut } from "@/services/authService";

export default function SignInScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState("");

    const handleSignUp = async () => {
        try {
            const newUser = await signUp(email, password);
            setUser(newUser);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleSignIn = async () => {
        try {
            const loggedInUser = await signIn(email, password);
            setUser(loggedInUser);
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
                    <Button title="Sign Up" onPress={handleSignUp} />
                    <Button title="Log In" onPress={handleSignIn} />
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10 },
    error: { color: "red" }
});