import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import {
  Button,
  TextInput,
  Box,
  Group,
  PasswordInput,
  useMantineTheme,
} from "@mantine/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { showNotification } from "@mantine/notifications";
import {
  CheckIcon,
  Cross1Icon,
  LockClosedIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import OAuth from "./OAuth";

function LogIn() {
  const theme = useMantineTheme();
  const router = useRouter();

  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        router.push("/dashboard");
        showNotification({
          title: "Welcome",
          message: "You have successfully logged in",
          color: "teal",
          icon: <CheckIcon />,
        });
      }
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Invalid email or password",
        color: "pink",
        icon: <Cross1Icon />,
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 350 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          mb="1rem"
          placeholder="Email"
          label="Email"
          required
          {...form.getInputProps("email")}
          icon={<EnvelopeClosedIcon />}
        />

        <PasswordInput
          placeholder="Password"
          label="Password"
          description="Password must include at least one letter, number and special character"
          required
          {...form.getInputProps("password")}
          icon={<LockClosedIcon />}
        />

        <Group position="center" mt="1.5rem">
          <Button
            type="submit"
            color={theme.colorScheme === "dark" ? "gray" : "teal"}
            variant={theme.colorScheme === "dark" ? "light" : "filled"}
          >
            Log In
          </Button>{" "}
          <OAuth></OAuth>
        </Group>
      </form>
    </Box>
  );
}

export default LogIn;
