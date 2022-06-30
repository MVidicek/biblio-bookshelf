import {
  Card,
  Group,
  Image,
  Text,
  useMantineTheme,
  Badge,
  Button,
  MediaQuery,
} from '@mantine/core';
import { PersonIcon, CalendarIcon } from '@radix-ui/react-icons';

export default function BookItem({ book }) {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ width: 340, margin: 'auto' }}>
      <Card shadow='sm' p='md' withBorder>
        <Card.Section>
          <a
            href={book.volumeInfo.previewLink}
            rel='noreferrer'
            target='_blank'
          >
            <Image
              p='md'
              fit='contain'
              src={book.volumeInfo.imageLinks.smallThumbnail}
              height={300}
              alt={book.volumeInfo.title}
              withPlaceholder
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
          {book.volumeInfo.title}
        </Text>
        <Group
          position='center'
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Badge
            color='tael'
            sx={{ paddingLeft: 3 }}
            variant={theme.colorScheme === 'dark' ? 'outline' : 'light'}
            leftSection={<PersonIcon style={{ paddingTop: 4 }} />}
          >
            {book.volumeInfo.authors[0]}
          </Badge>
          <Badge
            color='cyan'
            sx={{ paddingLeft: 3 }}
            variant={theme.colorScheme === 'dark' ? 'outline' : 'light'}
            leftSection={<CalendarIcon style={{ paddingTop: 4 }} />}
          >
            {book.volumeInfo.publishedDate}
          </Badge>
        </Group>

        <Text
          size='xs'
          lineClamp={3}
          style={{ color: secondaryColor, lineHeight: 1.5 }}
        >
          {book.searchInfo.textSnippet}
        </Text>

        <Button
          variant={theme.colorScheme === 'dark' ? 'outline' : 'filled'}
          color='teal'
          fullWidth
          style={{ marginTop: 14 }}
        >
          Details
        </Button>
      </Card>
    </div>
  );
}
