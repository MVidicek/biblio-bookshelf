import {
  Container,
  createStyles,
  Text,
  Title,
  Button,
  useMantineTheme,
} from "@mantine/core";
import Lottie from "lottie-react";
import astronautAnimation from "../../assets/Lottie/astronaut.json";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing.xl * 2,
    paddingTop: 0,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: theme.spacing.xl,
      paddingTop: 0,
    },
  },

  image: {
    width: "100%",
    marginTop: 256,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      marginTop: 64,
    },
  },

  body: {
    padding: theme.spacing.xl,
    backgroundColor: theme.colorScheme === "dark" ? "" : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,
    borderRadius: theme.spacing.sm,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    marginTop: theme.spacing.xl,
  },
}));

export default function NoBooksAdded({ setPage }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Container>
      <div className={classes.wrapper}>
        <div className={classes.body}>
          <Title className={classes.title}>
            Hmm... looks like you haven&apos;t added anything here yet.
          </Title>
          <Text weight={500} size="lg" mb={5}>
            Go to the Discover tab and find some books.
          </Text>
          <Text size="sm" color="dimmed">
            Then come back here.
          </Text>

          <div className={classes.controls}>
            <Button
              leftIcon={<MagnifyingGlassIcon />}
              color="teal"
              variant={theme.colorScheme === "dark" ? "light" : "filled"}
              onClick={() => setPage("discover")}
            >
              Search for books
            </Button>
          </div>
        </div>
        <Lottie animationData={astronautAnimation} className={classes.image} />
      </div>
    </Container>
  );
}
