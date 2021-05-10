import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleRight,
  faAngleLeft,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  songs,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
}) => {
  // Ref
  const audioRef = useRef(null);

  // State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  // Effect
  useEffect(() => {
    var playPromise = audioRef.current[isPlaying ? "play" : "pause"]();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {});
    }
  }, [isPlaying, currentSong]);

  // Event handlers

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration || 0;
    // Calculate percentage of song for slider animation
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  const formatTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    } else {
      setCurrentSong(songs[(currentIndex - 1 + songs.length) % songs.length]);
    }
  };

  // Slider animation style
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{formatTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{formatTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={() => setIsPlaying(!isPlaying)}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        ref={audioRef}
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        onEnded={() => skipTrackHandler("skip-forward")}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
