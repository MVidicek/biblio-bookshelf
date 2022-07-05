import Lottie from 'lottie-react';
import bookmarkedBook from '../assets/bookmarked.book.json';

export default function Bookmarked() {
  return (
    <div>
      <Lottie
        animationData={bookmarkedBook}
        loop={false}
        initialSegment={[0, 70]}
        style={{
          maxWidth: '340px',
        }}
      />
    </div>
  );
}
