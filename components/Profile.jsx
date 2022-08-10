import { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  TextInput,
  Badge,
  Stack,
  Avatar,
  useMantineTheme,
  Container,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { showNotification } from "@mantine/notifications";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { PersonIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";

export default function Profile() {
  const [changeDetails, setChangeDetails] = useState(false);

  const theme = useMantineTheme();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: auth?.currentUser.displayName,
      email: auth?.currentUser.email,
    },
  });

  const avatar = (
    <Avatar
      alt="Avatar for badge"
      size={24}
      mr={5}
      src="https://cdn-icons-png.flaticon.com/512/560/560216.png"
    />
  );

  const onLogout = () => {
    auth.signOut();

    router.push("/");
    showNotification({
      title: "Logged out",
      message: "You have been logged out",
      color: "yellow",
      icon: <InfoCircledIcon />,
    });
  };

  return (
    <Container size={500} pt="md">
      <Badge
        sx={{ paddingLeft: 0 }}
        size="lg"
        radius="sm"
        leftSection={avatar}
        variant="default"
        color="gray"
        mb="1rem"
        style={{ fontWeight: 600 }}
      >
        {form.values.name}
      </Badge>
      <Stack
        spacing="md"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        })}
        mb="1rem"
      >
        <TextInput
          icon={<PersonIcon />}
          placeholder={form.values.name}
          rightSectionWidth={70}
          styles={{ rightSection: { pointerEvents: "none" } }}
          rightSection={
            <Badge variant="dot" color="teal" style={{ fontWeight: 400 }}>
              Name
            </Badge>
          }
        />
        <TextInput
          icon={<EnvelopeClosedIcon />}
          placeholder={form.values.email}
          rightSectionWidth={70}
          styles={{ rightSection: { pointerEvents: "none" } }}
          rightSection={
            <Badge variant="dot" color="teal" style={{ fontWeight: 400 }}>
              Email
            </Badge>
          }
        />
      </Stack>
      <Button
        onClick={onLogout}
        variant={theme.colorScheme === "dark" ? "light" : "filled"}
        color="teal"
        style={{ fontWeight: 400 }}
      >
        Log Out
      </Button>
    </Container>
  );
}
