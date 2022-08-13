import { useRouter } from "next/router";
import {
  Button,
  TextInput,
  Badge,
  Stack,
  Avatar,
  useMantineTheme,
  Container,
  createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { auth } from "../../../firebase.config";
import { showNotification } from "@mantine/notifications";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { PersonIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    marginTop: "10vh",
    borderRadius: theme.spacing.sm,
    backgroundColor: theme.colorScheme === "dark" ? "" : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3]
    }`,
    padding: theme.spacing.lg,
  },
}));

export default function Profile() {
  const { classes } = useStyles();
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
    <Container className={classes.wrapper}>
      <Badge
        sx={{ paddingLeft: 0, fontWeight: 600, marginBottom: "1rem" }}
        size="lg"
        radius="sm"
        leftSection={avatar}
        variant="default"
        color="gray"
      >
        {form.values.name}
      </Badge>
      <Stack spacing="md" mb="1rem">
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
