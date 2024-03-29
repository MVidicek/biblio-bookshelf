import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import { Button, TextInput, Box, Group, useMantineTheme } from "@mantine/core";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { showNotification } from "@mantine/notifications";
import {
  CheckIcon,
  Cross1Icon,
  EnvelopeClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import OAuth from "./OAuth";
import PasswordStrength from "./PasswordStrength";

function SignUp() {
  const theme = useMantineTheme();

  const [password, setPassword] = useState("");
  const form = useForm({
    initialValues: { name: "", email: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
    },
  });

  const router = useRouter();

  const handleSubmit = async (values) => {
    const { name, email } = values;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, { displayName: name });

      const formData = { ...values };
      formData.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formData);
      router.push("/dashboard");
      showNotification({
        title: "Welcome",
        message: "You have successfully signed up",
        color: "teal",
        icon: <CheckIcon />,
      });
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Something went wrong",
        color: "pink",
        icon: <Cross1Icon />,
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 350 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group mb="1rem">
          <TextInput
            {...form.getInputProps("name")}
            placeholder="Username"
            icon={<PersonIcon />}
            required
          />
        </Group>
        <TextInput
          {...form.getInputProps("email")}
          mb="1rem"
          placeholder="Email"
          description="Your Email address wont be shared with anyone (You can even use a fake one but you won't be able to reset your password)"
          label="Email"
          icon={<EnvelopeClosedIcon />}
          required
        />
        <PasswordStrength password={password} setPassword={setPassword} />

        <Group position="center" mt="1.5rem">
          <Button
            type="submit"
            color={theme.colorScheme === "dark" ? "gray" : "teal"}
            variant={theme.colorScheme === "dark" ? "light" : "filled"}
          >
            Sign Up
          </Button>
          <OAuth></OAuth>
        </Group>
      </form>
    </Box>
  );
}

export default SignUp;
