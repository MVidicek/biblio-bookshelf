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
import { useMediaQuery } from "@mantine/hooks";
import { Cross2Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import removeDocument from "../../functions/helpers/remove-document";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  scrollArea: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    borderRadius: theme.spacing.sm,
  },
}));

export function BooksTable({ data, setLoading, collection }) {
  const [selection, setSelection] = useState(["1"]);

  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  const matchesMedium = useMediaQuery("(min-width: 1600px)");
  const matchesSmall = useMediaQuery("(min-width: 1500px)");

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
          <Badge radius="sm" color="blue" variant="default">
            <Text size="xs" weight={400}>
              {item.title}
            </Text>
          </Badge>
        </td>
        <td>
          <Badge
            radius="sm"
            color={item.averageRating > 3 ? "green" : "gray"}
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
        {matchesMedium && <td> {item.publisher}</td>}
        <td>{item.publishedDate}</td>
        {matchesSmall && (
          <td>
            <Badge
              radius="sm"
              color="gray"
              variant={theme.colorScheme === "dark" ? "light" : "outline"}
            >
              {item.categories}
            </Badge>
          </td>
        )}
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
    <ScrollArea className={classes.scrollArea}>
      <Table
        sx={{ minWidth: 800 }}
        verticalSpacing="sm"
        className={classes.wrapper}
      >
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
            {matchesMedium && <th> Publisher</th>}
            <th>Year</th>
            {matchesSmall && <th>Categories</th>}
            <th>Added</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
