import { useSignIn, useAuth } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React from "react";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { signOut } = useAuth(); // Add this line
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/home");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Add sign out handler
  const onSignOutPress = async () => {
    try {
      await signOut();
      router.replace("/(auth)/sign-in");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1haXplfGVufDB8fDB8fHww",
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.signInBox}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to your PlantCare account</Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email"
          onChangeText={setEmailAddress}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TextInput
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View style={styles.switchTextRow}>
          <Text style={styles.switchText}>Don't have an account?</Text>
          <Link href="./sign-up">
            <Text style={styles.linkText}> Sign up</Text>
          </Link>
        </View>
        {/* Sign Out Button removed */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  image: {
    width: "100%",
    height: 300,
    padding: "65%",
    borderRadius: 200,
  },
  signInBox: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 40,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#E5E4E2",
    borderRadius: 15,
    padding: 12,
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    fontSize: 16,
    color: "#222",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  switchTextRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 12,
  },
  switchText: {
    color: "#222",
    fontSize: 15,
  },
  linkText: {
    color: "#4CAF50",
    fontWeight: "bold",
    fontSize: 15,
  },
});
