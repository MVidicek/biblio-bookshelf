import Lottie from 'lottie-react';
import girlReading from '../assets/books-reading.json';

export default function Reading() {
  return (
    <div>
      <Lottie
        animationData={girlReading}
        loop={false}
        style={{
          maxWidth: '260px',
        }}
      />
    </div>
  );
}
