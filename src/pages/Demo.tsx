import React from 'react';

const videoUrl =
'https://pub-98c0b493be9947fc9aa35fc3e0dc8e0b.r2.dev/demo.mp4';

export default function Demo() {
return (
<div className="min-h-screen bg-gray-50 flex flex-col">

  {/* Header */}
  <header className="w-full border-b bg-white">
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-900">
        BIS <span className="text-blue-600">NIDAAN</span>
      </h1>

      <a
        href="/"
        className="text-sm text-gray-600 hover:text-blue-600 transition"
      >
        ← Back to Home
      </a>
    </div>
  </header>

  {/* Main */}
  <main className="flex-1 flex flex-col items-center justify-center px-5 py-12">

    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900">
        Project Demo
      </h2>

      <p className="text-gray-500 mt-2">
        Watch the BIS NIDAAN platform demonstration.
      </p>
    </div>

    {/* Video Player */}
    <div className="w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-lg">
      <video
        className="w-full aspect-video"
        src={videoUrl}
        controls
        playsInline
        preload="metadata"
      >
        Your browser does not support HTML5 video.
      </video>
    </div>

  </main>

  {/* Footer */}
  <footer className="text-center py-5 border-t bg-white">
    <p className="text-sm text-gray-500">
      © {new Date().getFullYear()} BIS NIDAAN. All rights reserved.
    </p>
  </footer>

</div>

);
}
