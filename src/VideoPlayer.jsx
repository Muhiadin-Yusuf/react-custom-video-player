import { useRef, useState } from "react";

const VIDEO_URL =
  "https://ik.imagekit.io/zgpbjaqlp/How%20to%20Understand%20English%20Movies%20Without%20Subtitles.mp4";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${minutes}:${String(secs).padStart(2, "0")}`;
};
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const VideoPlayer = () => {
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleSeek = (event) => {
    const time = Number(event.currentTarget.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleLoadedMetadata = (event) => {
    setDuration(event.currentTarget.duration);
  };

  const handleTimeUpdate = (event) => {
    setCurrentTime(event.currentTarget.currentTime);
  };
  const handleSpeed = (e) => {
    const rate = Number(e.target.value);
    videoRef.current.playbackRate = rate;
    setSpeed(rate);
  };
  return (
    <div>
      <video
        ref={videoRef}
        src={VIDEO_URL}
        width={640}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      />

      <div>
        <button onClick={togglePlay}>{playing ? "Pause" : "Play"}</button>

        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
        />

        <span>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <select value={speed} onChange={handleSpeed}>
          {SPEEDS.map((s) => (
            <option key={s} value={s}>
              {s}x
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VideoPlayer;
