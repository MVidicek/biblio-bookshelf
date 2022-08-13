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
  ArchiveIcon,
  CalendarIcon,
  BarChartIcon,
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
    icon: ArchiveIcon,
    title: "Manage your Books",
    description:
      "Keep track of the books you are reading, finished, or want to read.",
  },
  {
    icon: CalendarIcon,
    title: "Challenge yourself",
    description: "Create challenges to keep yourself motivated.",
  },
  {
    icon: BarChartIcon,
    title: "Progress Tracking",
    description: "See how you are doing over time and other useful insights.",
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
