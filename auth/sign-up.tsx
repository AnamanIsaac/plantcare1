import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [name, setName] = React.useState(""); // <-- Add state for name
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <View style={styles.signUpBox}>
          <Text style={styles.title}>Verify your email</Text>
          <TextInput
            value={code}
            placeholder="Enter your verification code"
            style={styles.input}
            onChangeText={setCode}
          />
          <TouchableOpacity style={styles.button} onPress={onVerifyPress}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.signUpBox}>
        <Text style={styles.title}>Join PlantCare Today</Text>
        <Text style={styles.subtitle}>Create Your PlantCare Account</Text>

        <TextInput
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={emailAddress}
          onChangeText={setEmailAddress}
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#aaa"
        />

        <View style={styles.switchTextRow}>
          <Text style={styles.switchText}>Already have an account?</Text>
          <Link href="./sign-in">
            <Text style={styles.linkText}> Log in</Text>
          </Link>
        </View>

        <Text style={styles.or}>or</Text>

        <TouchableOpacity style={styles.socialButton}>
          <MaterialCommunityIcons name="google" size={24} color="black" />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <MaterialCommunityIcons name="facebook" size={24} color="black" />
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3e7e2",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  signUpBox: {
    backgroundColor: "#e0efe2",
    borderRadius: 25,
    padding: 24,
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
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    marginBottom: 16,
    borderWidth: 0,
    fontSize: 16,
    color: "#222",
  },
  switchTextRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  switchText: {
    color: "#222",
    fontSize: 15,
  },
  linkText: {
    color: "#1db954",
    fontWeight: "bold",
    fontSize: 15,
  },
  or: {
    textAlign: "center",
    marginVertical: 10,
    color: "#888",
    fontSize: 16,
  },
  socialButton: {
    backgroundColor: "#fff",
    borderWidth: 0,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  socialIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  socialText: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#16a34a",
    paddingVertical: 16,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
