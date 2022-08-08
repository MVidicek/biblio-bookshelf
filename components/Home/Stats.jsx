import {
  createStyles,
  Progress,
  Box,
  Text,
  Group,
  Paper,
  SimpleGrid,
  ThemeIcon,
} from "@mantine/core";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

const useStyles = createStyles((theme) => ({
  progressLabel: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
  },

  card: {
    position: "relative",
    overflow: "visible",
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
    height: 202,
    alignSelf: "end",
  },

  statCount: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.3,
  },

  diff: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },
  iconTop: {
    position: "absolute",
    top: -ICON_SIZE / 3,
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
  },
}));

const ICON_SIZE = 60;

export function Stats({ total, diff, data }) {
  const { classes } = useStyles();

  const segments = data.map((segment) => ({
    value: segment.part,
    color: segment.color,
    label: segment.part > 10 ? `${segment.part}%` : undefined,
  }));

  const descriptions = data.map((stat) => (
    <Box key={stat.label}>
      <Text transform="uppercase" size="xs" color={stat.color} weight={700}>
        {stat.label}
      </Text>
    </Box>
  ));

  return (
    <Paper withBorder p="md" radius="md" className={classes.card}>
      <ThemeIcon
        color="teal"
        className={classes.iconTop}
        size={ICON_SIZE}
        radius={ICON_SIZE}
      >
        <ArrowTopRightIcon />
      </ThemeIcon>
      <Group position="apart" mt="1rem">
        <Group align="flex-end" spacing="xs">
          <Text size="xl" weight={700}>
            {total}
          </Text>
          <Text color="teal" className={classes.diff} size="sm" weight={700}>
            <span>{diff}</span>
            <ArrowTopRightIcon />
          </Text>
        </Group>
      </Group>

      <Text color="dimmed" size="sm">
        Books read compared to last year
      </Text>
      <SimpleGrid cols={3} mt="xl">
        {descriptions}
      </SimpleGrid>
      <Progress
        sections={segments}
        size={34}
        classNames={{ label: classes.progressLabel }}
        mt={12}
      />
    </Paper>
  );
}
