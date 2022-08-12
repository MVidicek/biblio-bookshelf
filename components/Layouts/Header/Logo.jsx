import { Text, ThemeIcon, useMantineTheme, createStyles } from "@mantine/core";
import { BookmarkIcon } from "@radix-ui/react-icons";
import React from "react";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",

    // Media query with value from theme
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: "none",
    },
  },
}));

export default function Logo() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  return (
    <div className={classes.container}>
      <ThemeIcon
        mr="xs"
        size={29}
        color="teal"
        variant={theme.colorScheme === "dark" ? "outline" : "filled"}
      >
        <BookmarkIcon />
      </ThemeIcon>
      <Text
        size="lg"
        color={
          theme.colorScheme === "dark"
            ? theme.colors.dark[0]
            : theme.colors.teal[4]
        }
        weight={400}
      >
        BIBLIO
      </Text>
    </div>
  );
}
