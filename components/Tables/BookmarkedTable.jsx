import { useState } from "react";
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  Button,
  useMantineTheme,
  Badge,
  SimpleGrid,
} from "@mantine/core";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export function BookmarkedTable({ data }) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const [selection, setSelection] = useState(["1"]);
  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.bookId)
    );

  const rows = data.map((item) => {
    const selected = selection.includes(item.bookId);
    return (
      <tr key={item.bookId} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.bookId)}
            onChange={() => toggleRow(item.bookId)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Avatar size={52} src={item.imageLinks} radius={6} />
            <Text size="sm" weight={500}>
              {item.title}
            </Text>
          </Group>
        </td>
        <td>{item.authors.join(", ")}</td>
        <td>{item.publisher}</td>
        <td>{item.publishedDate}</td>
        <td>{item.averageRating}</td>
        <td>
          <SimpleGrid cols={item.categories.length}>
            {item.categories &&
              item.categories.map((category) => {
                return (
                  <Badge key={category} radius="sm" color="teal" variant="dot">
                    {category}
                  </Badge>
                );
              })}
          </SimpleGrid>
        </td>
        <td>{format(item.createdAt.toDate(), "dd-MM-yy")}</td>
        <td>
          <Button
            color="grape"
            compact
            variant={theme.colorScheme === "dark" ? "light" : "filled"}
            style={{ width: 50 }}
            type="button"
          >
            <BookmarkFilledIcon />
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
                transitionDuration={0}
              />
            </th>
            <th>Title</th>
            <th>Authors</th>
            <th>Publisher</th>
            <th>Year</th>
            <th>Rating</th>
            <th>Categories</th>
            <th>Added</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
