// TODO: Replace with your actual YouTube demo video ID.
const videoId = 'dQw4w9WgXcQ';

export default function Demo() {
  return (
    <div className="w-screen h-screen bg-black">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title="BIS NIDAAN Demo"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
