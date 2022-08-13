import {
  createStyles,
  ThemeIcon,
  Progress,
  Text,
  Group,
  Badge,
  Paper,
} from "@mantine/core";
import { CalendarIcon } from "@radix-ui/react-icons";

const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "visible",
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
  },

  icon: {
    position: "absolute",
    top: -ICON_SIZE / 3,
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

export function ReadingChallenge() {
  const { classes } = useStyles();

  return (
    <Paper radius="md" withBorder className={classes.card} mt={ICON_SIZE / 3}>
      <ThemeIcon
        color="teal"
        className={classes.icon}
        size={ICON_SIZE}
        radius={ICON_SIZE}
      >
        <CalendarIcon />
      </ThemeIcon>

      <Text align="center" weight={700} className={classes.title}>
        Reading challenge
      </Text>
      <Text color="dimmed" align="center" size="sm">
        12 books / year
      </Text>

      <Group position="apart" mt="xs">
        <Text size="sm" color="dimmed">
          Progress
        </Text>
        <Text size="sm" color="dimmed">
          50%
        </Text>
      </Group>

      <Progress value={50} mt={5} color="teal" />

      <Group position="apart" mt="md">
        <Text size="sm">6 / 12 Books</Text>
        <Badge color="teal" size="sm">
          214 days left
        </Badge>
      </Group>
    </Paper>
  );
}
