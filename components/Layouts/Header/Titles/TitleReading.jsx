import {
  Badge,
  Text,
  Transition,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function TitleReading({ readingOpened }) {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Transition
      mounted={readingOpened}
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
            <Badge color="blue" radius="sm" size="xl" variant="outline">
              <Text
                size="xl"
                weight={200}
                color={
                  colorScheme === "dark"
                    ? theme.colors.gray[0]
                    : theme.colors.gray[8]
                }
              >
                Reading
              </Text>
            </Badge>
          </div>
        </div>
      )}
    </Transition>
  );
}
