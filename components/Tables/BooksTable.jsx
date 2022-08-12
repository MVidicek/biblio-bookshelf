import { useState } from "react";
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Avatar,
  Text,
  Button,
  useMantineTheme,
  Badge,
} from "@mantine/core";
import { Cross2Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import removeDocument from "../../utils/remove-document";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export function BooksTable({ data, setLoading, collection }) {
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
    const handleRemove = () => {
      removeDocument(item, collection);
      setLoading(true);
    };
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
          <Avatar size="lg" src={item.imageLinks} radius={6} />
        </td>
        <td>
          <Badge radius="sm" color="blue" variant="dot">
            <Text size="xs" weight={400}>
              {item.title}
            </Text>
          </Badge>
        </td>
        <td>
          <Badge
            radius="sm"
            color={item.averageRating > 3 ? "green" : "red"}
            variant={theme.colorScheme === "dark" ? "light" : "filled"}
          >
            {item.averageRating}
          </Badge>
        </td>
        <td>
          <Text size="sm" weight={500}>
            {item.authors.join(", ")}
          </Text>
        </td>
        <td>{item.publisher}</td>
        <td>{item.publishedDate}</td>
        <td>
          <Badge
            radius="sm"
            color="gray"
            variant={theme.colorScheme === "dark" ? "light" : "outline"}
          >
            {item.categories}
          </Badge>
        </td>
        <td>{format(item.createdAt.toDate(), "MMM do, yy")}</td>
        <td>
          <Button
            color="pink"
            redius="sm"
            compact
            variant={theme.colorScheme === "dark" ? "light" : "filled"}
            type="button"
            onClick={handleRemove}
          >
            <Cross2Icon />
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
            <th></th>
            <th>Title</th>
            <th></th>
            <th>Authors</th>
            <th>Publisher</th>
            <th>Year</th>
            <th>Categories</th>
            <th>Added</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
