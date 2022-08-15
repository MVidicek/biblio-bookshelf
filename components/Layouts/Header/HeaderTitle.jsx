import {
  Badge,
  Text,
  Transition,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function HeaderTitle({ transitionOpened, page }) {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const isMobile = useMediaQuery("(max-width: 768px)");

  let color = "";
  let title = "";

  switch (page) {
    case "home":
      color = "gray";
      title = "Home";
      break;
    case "reading":
      color = "cyan";
      title = "Reading";
      break;
    case "finished":
      color = "teal";
      title = "Finished";
      break;
    case "bookmarks":
      color = "grape";
      title = "Bookmarks";
      break;
    default:
      title = "Account";
      color = "teal";
  }

  return (
    <Transition
      mounted={transitionOpened}
      transition="slide-up"
      duration={400}
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
            <Badge
              color={color}
              radius="sm"
              size="xl"
              variant={page === "profile" ? "dot" : "outline"}
            >
              <Text
                size="xl"
                weight={200}
                color={
                  colorScheme === "dark"
                    ? theme.colors.gray[0]
                    : theme.colors.gray[8]
                }
              >
                {title}
              </Text>
            </Badge>
          </div>
        </div>
      )}
    </Transition>
  );
}
