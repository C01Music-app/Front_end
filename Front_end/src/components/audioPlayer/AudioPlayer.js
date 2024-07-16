import "./AudioPlayer.css";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaRandom,
  FaRedo,
} from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import TimeSlider from "react-input-slider";
import { descSongs } from "../../service/SongsService";

const AudioPlayer = () => {
  const audioRef = useRef();
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setPlay] = useState(false);
  const [isRandom, setRandom] = useState(false);
  const [isRedo, setRedo] = useState(false);
  const [volume, setVolume] = useState(1);
  const [songs, setSongs] = useState([]);

  const getSongs = async () => {
    try {
      const res = await descSongs();
      setSongs(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSongs();
  }, []);

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (isPlay) audioRef.current.play().catch((error) => console.log(error));
  };

  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => console.log(error));
    }
    setPlay(!isPlay);
  };

  const handleTimeSliderChange = ({ x }) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!isPlay) {
      setPlay(true);
      audioRef.current.play().catch((error) => console.log(error));
    }
  };

  const handleVolumeChange = ({ x }) => {
    const newVolume = Math.min(Math.max(x, 0), 1);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleSongs = () => {
    if (isRedo) {
      audioRef.current.play().catch((error) => console.log(error));
    } else if (isRandom) {
      setAudioIndex(Math.floor(Math.random() * songs.length));
    } else {
      setAudioIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % songs.length;
        return nextIndex;
      });
    }
  };

  const handleRandomClick = () => {
    setRandom(!isRandom);
    if (isRedo) setRedo(false); // Tắt Redo nếu Random được bật
  };

  const handleRedoClick = () => {
    setRedo(!isRedo);
    if (isRandom) setRandom(false); // Tắt Random nếu Redo được bật
  };

  useEffect(() => {
    if (audioRef.current && songs.length > 0) {
      audioRef.current.play().catch((error) => console.log(error));
    }
  }, [audioIndex, songs]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (songs.length == 0) {
    return <></>;
  }

  return (
    <div className="">
      <div className="container">
        <div className="song-info">
          {/* {songs.length > 0 && (
            <>
              <h2 className="Song-Title">{songs[audioIndex]?.title}</h2>
              <p className="Singer">{songs[audioIndex]?.artist}</p>
            </>
          )} */}
        </div>
        <div className="song-control">
          <div className="Control-Button-Group">
            <div
              className={`Random-Button ${isRandom ? "active" : ""}`}
              onClick={handleRandomClick}
            >
              <FaRandom />
            </div>
            <div
              className="Prev-Button"
              onClick={() =>
                setAudioIndex((audioIndex - 1 + songs.length) % songs.length)
              }
            >
              <FaBackward />
            </div>
            <div className="Pause-Play-Button" onClick={handlePausePlayClick}>
              {isPlay ? <FaPause /> : <FaPlay />}
            </div>
            <div
              className="Next-Button"
              onClick={() => setAudioIndex((audioIndex + 1) % songs.length)}
            >
              <FaForward />
            </div>
            <div
              className={`Redo-Button ${isRedo ? "active" : ""}`}
              onClick={handleRedoClick}
            >
              <FaRedo />
            </div>
          </div>
          <div className="timeSliderCustom">
            <div className="time-display">
              <span className="time1">{formatTime(currentTime)}</span>
              <TimeSlider
                axis="x"
                xmax={duration}
                x={currentTime}
                onChange={handleTimeSliderChange}
                styles={{
                  track: {
                    backgroundColor: "#e3e3e3",
                    height: "3px",
                  },
                  active: {
                    backgroundColor: "#333",
                    height: "3px",
                  },
                  thumb: {
                    marginTop: "-1.5px",
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#333",
                    borderRadius: 50,
                  },
                }}
              />

              <span className="time2">{formatTime(duration)}</span>
              <TimeSlider
                axis="x"
                xmax={1}
                x={volume}
                onChange={handleVolumeChange}
                styles={{
                  track: {
                    backgroundColor: "#e3e3e3",
                    height: "3px",
                    width: "100px",
                    marginLeft: "10px",
                  },
                  active: {
                    backgroundColor: "#89878d",
                    height: "3px",
                  },
                  thumb: {
                    marginTop: "-1.5px",
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#a5a3a3",
                    borderRadius: 50,
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {songs.length > 0 && (
        <audio
          ref={audioRef}
          src={songs[audioIndex]?.lyrics}
          onLoadedData={handleLoadedData}
          onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
          onEnded={handleSongs}
        />
      )}
    </div>
  );
};

export default AudioPlayer;
