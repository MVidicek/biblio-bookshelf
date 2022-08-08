import {
  createStyles,
  Title,
  SimpleGrid,
  Text,
  ThemeIcon,
  Stack,
} from "@mantine/core";
import {
  MagnifyingGlassIcon,
  ReaderIcon,
  CheckCircledIcon,
  BookmarkIcon,
} from "@radix-ui/react-icons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl}px`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 36,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

const features = [
  {
    icon: MagnifyingGlassIcon,
    title: "Discover Books",
    description:
      "Google Books API is used to search for books that you want to read.",
  },
  {
    icon: ReaderIcon,
    title: "Manage your Reading Progress",
    description:
      "Keep track of your reading progress and organize the books you are reading.",
  },
  {
    icon: CheckCircledIcon,
    title: "Organize the Books you have Read",
    description: "Keep track of your finished books and organize them.",
  },
  {
    icon: BookmarkIcon,
    title: "Bookmark the Books you wish to read",
    description:
      "Keep track of the books you wish to read and easily access them later.",
  },
];

export function Hero() {
  const { classes } = useStyles();

  const items = features.map((feature) => (
    <div key={feature.title}>
      <Text size="lg" mt="sm" weight={500}>
        <ThemeIcon
          size={30}
          radius="sm"
          variant="gradient"
          mr="1rem"
          mb="0.5rem"
          gradient={{ deg: 133, from: "teal", to: "cyan" }}
        >
          <feature.icon />
        </ThemeIcon>
        {feature.title}
      </Text>
      <Text color="dimmed" size="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <div className={classes.wrapper}>
      <Stack>
        <Title className={classes.title} order={2}>
          Welcome to Biblio
        </Title>

        <SimpleGrid
          cols={2}
          spacing={30}
          breakpoints={[{ maxWidth: "md", cols: 1 }]}
        >
          {items}
        </SimpleGrid>
      </Stack>
    </div>
  );
}
