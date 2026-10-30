import React from 'react';

const videoUrl =
  'https://pub-98c0b493be9947fc9aa35fc3e0dc8e0b.r2.dev/demo.mp4';

const Demo: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-black">
      <video
        className="w-full h-full object-contain"
        src={videoUrl}
        controls
        playsInline
        preload="metadata"
        autoPlay
        muted
      >
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
};

export default Demo;
