import {
  Badge,
  Text,
  Transition,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import params from "./params";

export default function TitleProfile({ profileOpened }) {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Transition
      mounted={profileOpened}
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
            <Badge color="teal" radius="sm" size="xl" variant="dot">
              <Text
                size="xl"
                weight={params.font_weight}
                color={
                  colorScheme === "dark"
                    ? theme.colors.gray[0]
                    : theme.colors.gray[8]
                }
              >
                Account
              </Text>
            </Badge>
          </div>
        </div>
      )}
    </Transition>
  );
}
