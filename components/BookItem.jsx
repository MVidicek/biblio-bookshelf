import {
  Card,
  Group,
  Image,
  Text,
  useMantineTheme,
  Badge,
  Button,
} from '@mantine/core';

export default function BookItem({ book }) {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ width: 340, margin: 'auto' }}>
      <Card shadow='sm' p='lg'>
        <Card.Section>
          <Image
            src={book.volumeInfo.imageLinks.smallThumbnail}
            height={160}
            alt='Book Thumbnail'
          />
        </Card.Section>
        <Text
          style={{
            marginBottom: 5,
            marginTop: theme.spacing.sm,
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
          <Badge color='tael' variant='light'>
            {book.volumeInfo.authors[0]}
          </Badge>
          <Badge color='cyan' variant='light'>
            {book.volumeInfo.publishedDate}
          </Badge>
        </Group>

        <Text size='sm' style={{ color: secondaryColor, lineHeight: 1.5 }}>
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
