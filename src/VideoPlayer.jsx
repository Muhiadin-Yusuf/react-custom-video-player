import { useRef, useState } from "react";
const VIDEO_URL =
  "https://ik.imagekit.io/zgpbjaqlp/How%20to%20Understand%20English%20Movies%20Without%20Subtitles.mp4";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function togglePlay() {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }
  return (
    <div>
      <video
        src={VIDEO_URL}
        width={640}
        controls
        ref={videoRef}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      ></video>

      <div>
        <button onClick={togglePlay}>{playing ? "Pause" : "Play"}</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
