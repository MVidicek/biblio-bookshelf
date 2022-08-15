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
import { TrashIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import removeDocument from "../../functions/helpers/remove-document";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor: theme.fn.rgba(theme.colors.teal[9], 0.2),
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

  const mediaMd = useMediaQuery("(min-width: 1400px)");
  const mediaSm = useMediaQuery("(min-width: 1200px)");
  const mediaXs = useMediaQuery("(min-width: 950px)");

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
            color="teal"
          />
        </td>
        <td>
          <Avatar size="lg" src={item.imageLinks} radius={6} />
        </td>
        <td>
          <Text
            color={theme.colorScheme === "dark" ? "white" : "dark"}
            size="sm"
            weight={400}
            inline
          >
            {item.title}
          </Text>
        </td>
        {mediaXs && (
          <td>
            <Badge
              radius="sm"
              color={item.averageRating > 3 ? "teal" : "red"}
              variant="light"
            >
              {item.averageRating}
            </Badge>
          </td>
        )}
        <td>
          <Text size="xs" weight={600}>
            {item.authors.join(", ")}
          </Text>
        </td>
        {mediaMd && <td> {item.publisher}</td>}
        {mediaXs && <td>{item.publishedDate}</td>}
        {mediaSm && (
          <td>
            <Badge radius="sm" color="gray" variant="light">
              {item.categories}
            </Badge>
          </td>
        )}
        {mediaXs && <td>{format(item.createdAt.toDate(), "MMM do, yy")}</td>}
        <td>
          <Button
            color="pink"
            redius="sm"
            compact
            variant={theme.colorScheme === "dark" ? "light" : "filled"}
            type="button"
            onClick={handleRemove}
          >
            <TrashIcon />
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea className={classes.scrollArea}>
      <Table horizontalSpacing="xs" className={classes.wrapper} fontSize="xs">
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
                color="teal"
              />
            </th>
            <th></th>
            <th>Title</th>
            {mediaXs && <th></th>}
            <th>Authors</th>
            {mediaMd && <th> Publisher</th>}
            {mediaXs && <th>Year</th>}
            {mediaSm && <th>Categories</th>}
            {mediaXs && <th>Added</th>}
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
