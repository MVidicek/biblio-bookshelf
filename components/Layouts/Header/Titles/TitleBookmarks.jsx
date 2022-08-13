import {
  Badge,
  Text,
  Transition,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import params from "./params";

export default function TitleBookmarks({ bookmarksOpened }) {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Transition
      mounted={bookmarksOpened}
      transition={params.transition}
      duration={params.duration}
      timingFunction="ease"
    >
      {(styles) => (
        <div
          style={
            isMobile
              ? { marginLeft: "auto", marginRight: "30px" }
              : { marginLeft: "auto", marginRight: "80px" }
          }
        >
          <div style={styles}>
            <Badge color="grape" radius="sm" size="xl" variant="outline">
              <Text
                size="xl"
                weight={params.font_weight}
                color={
                  colorScheme === "dark"
                    ? theme.colors.gray[0]
                    : theme.colors.gray[8]
                }
              >
                Bookmarks
              </Text>
            </Badge>
          </div>
        </div>
      )}
    </Transition>
  );
}
