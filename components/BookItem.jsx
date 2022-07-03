import {
  Card,
  Group,
  Image,
  Text,
  useMantineTheme,
  Badge,
  Button,
  ActionIcon,
  Grid,
} from '@mantine/core';
import { PersonIcon, CalendarIcon, BookmarkIcon } from '@radix-ui/react-icons';

export default function BookItem({ book }) {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ width: 340, margin: 'auto' }}>
      <Card shadow='sm' p='md' withBorder>
        <Card.Section>
          <a
            href={book.volumeInfo?.previewLink}
            rel='noreferrer'
            target='_blank'
          >
            <Image
              p='md'
              fit='contain'
              withPlaceholder
              src={book.volumeInfo?.imageLinks?.thumbnail}
              height={300}
              alt={book.volumeInfo?.title}
            />
          </a>
        </Card.Section>
        <Text
          style={{
            marginBottom: 5,
            textAlign: 'center',
          }}
          weight={500}
        >
          {book.volumeInfo?.title}
        </Text>
        <Group
          position='center'
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Badge
            color='blue'
            sx={{ paddingLeft: 3 }}
            variant={theme.colorScheme === 'dark' ? 'outline' : 'light'}
            leftSection={<PersonIcon style={{ paddingTop: 4 }} />}
          >
            {book.volumeInfo?.authors[0]}
          </Badge>
          <Badge
            color='gray'
            sx={{ paddingLeft: 3 }}
            variant={theme.colorScheme === 'dark' ? 'outline' : 'light'}
            leftSection={<CalendarIcon style={{ paddingTop: 4 }} />}
          >
            {book.volumeInfo?.publishedDate}
          </Badge>
        </Group>

        <Text
          size='xs'
          lineClamp={3}
          style={{ color: secondaryColor, lineHeight: 1.5, marginTop: 10 }}
        >
          {book.searchInfo?.textSnippet}
        </Text>
        <Grid columns={12}>
          <Grid.Col span={3}>
            <Button
              variant={theme.colorScheme === 'dark' ? 'outline' : 'filled'}
              color='teal'
              style={{ marginTop: 14 }}
            >
              Info
            </Button>
          </Grid.Col>
          <Grid.Col span={7}>
            <Button
              variant={theme.colorScheme === 'dark' ? 'outline' : 'filled'}
              color='teal'
              style={{ marginTop: 14 }}
            >
              Summary
            </Button>
          </Grid.Col>
          <Grid.Col span={2}>
            <ActionIcon
              color='gray'
              variant={theme.colorScheme === 'dark' ? 'outline' : 'default'}
              size={36}
              style={{ marginTop: 14 }}
            >
              <BookmarkIcon />
            </ActionIcon>
          </Grid.Col>
        </Grid>
      </Card>
    </div>
  );
}
