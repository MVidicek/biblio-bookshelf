import { useState } from "react";
import Head from "next/head";
import Lottie from "lottie-react";
import bookAnimation from "../assets/Lottie/header-books.json";
import {
  Button,
  createStyles,
  Group,
  Modal,
  Text,
  useMantineTheme,
} from "@mantine/core";
import LogInLayout from "../components/Layouts/LogInLayout";
import LogIn from "../components/Security/LogIn";
import SignUp from "../components/Security/SignUp";

const useStyles = createStyles((theme, _params, getRef) => ({
  main: {
    minHeight: "85vh",
    padding: "2rem 0",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      [`& .${getRef("child")}`]: {
        fontSize: theme.fontSizes.xs,
      },
    },
  },

  footer: {
    display: "flex",
    flex: 1,
    padding: "1rem 0",
    borderTop: "1px solid #eaeaea",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "lighter",
  },
}));

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [modalType, setModalType] = useState("login");

  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <div style={{ padding: "0 2rem" }}>
      <Head>
        <title>Biblio</title>
        <meta name="description" content="Online Bookshelf" />
        <link rel="icon" href="images/favicon.ico" />
      </Head>

      <main className={classes.main}>
        <Lottie
          animationData={bookAnimation}
          loop={false}
          initialSegment={[0, 110]}
          style={{
            maxWidth: "1024px",
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
            border: "1px solid",
            borderColor: theme.colors.teal[4],
            borderRadius: "50px",
          }}
        />
        <Text
          align="center"
          variant="gradient"
          gradient={
            theme.colorScheme === "dark"
              ? {
                  from: theme.colors.gray[0],
                  to: theme.colors.gray[4],
                  deg: 45,
                }
              : {
                  from: theme.colors.teal[4],
                  to: theme.colors.blue[3],
                  deg: 45,
                }
          }
          weight={700}
          style={{ fontFamily: "Greycliff CF, sans-serif", fontSize: "4rem" }}
          mt="4rem"
        >
          BIBLIO
        </Text>
        <Modal
          size="sm"
          opened={opened}
          onClose={() => setOpened(false)}
          centered
          title={modalType === "login" ? "Log In" : "Sign Up"}
          overlayColor={
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2]
          }
          overlayOpacity={0.55}
          overlayBlur={3}
          transition="slide-up"
          transitionDuration={400}
          transitionTimingFunction="ease"
        >
          {modalType === "login" ? <LogIn /> : <SignUp />}
        </Modal>

        <Group position="center">
          <Button
            color={theme.colorScheme === "dark" ? "gray" : "teal"}
            onClick={() => {
              setOpened(true);
              setModalType("login");
            }}
            variant={theme.colorScheme === "dark" ? "light" : "filled"}
          >
            Log In
          </Button>
          <Button
            color={theme.colorScheme === "dark" ? "gray" : "teal"}
            variant={theme.colorScheme === "dark" ? "light" : "filled"}
            onClick={() => {
              setOpened(true);
              setModalType("signup");
            }}
          >
            Sign Up
          </Button>
        </Group>
      </main>

      <footer className={classes.footer}>
        <p id="bottom">Copyright &copy; 2022, Marko Vidiček</p>
      </footer>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <LogInLayout>{page}</LogInLayout>;
};
