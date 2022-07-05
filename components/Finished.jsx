import Lottie from 'lottie-react';
import bookAppear from '../assets/books-appearing.json';

export default function Finished() {
  return (
    <div>
      <Lottie
        animationData={bookAppear}
        loop={false}
        initialSegment={[4]}
        style={{
          width: '350px',
        }}
      />
    </div>
  );
}
