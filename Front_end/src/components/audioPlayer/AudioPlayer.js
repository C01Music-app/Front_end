import React, {useEffect, useRef, useState} from "react";
import "./AudioPlayer.css";
import {FaPlay, FaPause, FaForward, FaBackward, FaRandom, FaRedo} from "react-icons/fa";
import TimeSlider from "react-input-slider";
import {useSelector, useDispatch} from "react-redux";
import {selectIndex} from "../../redux/action";
import {IConSoundOff, IConSoundOn} from "./IConAudio";

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const currentIndexSong = useSelector((state) => state.currentSongIndex);
  const songList = useSelector((state) => state.songs);
  const audioRef = useRef();
  const [audioIndex, setAudioIndex] = useState(currentIndexSong);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setPlay] = useState(false);
  const [isRandom, setRandom] = useState(false);
  const [isRedo, setRedo] = useState(false);
  const [volume, setVolume] = useState(parseFloat(localStorage.getItem("volume")) || 0.5);
  const [songs, setSongs] = useState(songList);

  useEffect(() => {
    const savedIsPlay = localStorage.getItem("isPlaying");
    const savedCurrentTime = parseFloat(localStorage.getItem("currentTime"));
    setCurrentTime(savedCurrentTime);
    setPlay(savedIsPlay);

    if (audioRef.current) {
      audioRef.current.currentTime = savedCurrentTime;
      audioRef.current.volume = volume;

      if (savedIsPlay) {
        audioRef.current.play().catch((err) => {
          console.log(err);
        });
      }
    }

    const updateCurrentTime = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        localStorage.setItem("currentTime", audioRef.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(updateCurrentTime);
  }, []);

  useEffect(() => {
    localStorage.setItem("isPlaying", isPlay);
    localStorage.setItem("volume", volume);
  }, [isPlay, volume]);

  useEffect(() => {
    setSongs(songList);
    localStorage.removeItem("isPlaying");
    localStorage.removeItem("currentIndexSong")
    }, [songList]);

  useEffect(() => {
    const savedIndex = localStorage.getItem("currentIndexSong");
    if (savedIndex !== null) {
      dispatch(selectIndex(parseInt(savedIndex, 10)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("currentIndexSong", currentIndexSong);
    setAudioIndex(currentIndexSong);
    if (audioRef.current && songs.length > 0) {
      // audioRef.current.src = songs[currentIndexSong]?.lyrics || "";
      // audioRef.current.play().catch((error) => console.log(error));
      setPlay(false);
    }
  }, [currentIndexSong, songs]);

  const handleLoadedData = () => {
    setDuration(audioRef.current?.duration || 0);
    if (isPlay) audioRef.current?.play().catch((error) => console.log(error));
    setPlay(true)
  };
  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch((error) => console.log(error));
    }
    setPlay(!isPlay);
  };

  const handleTimeSliderChange = ({ x }) => {
    if (audioRef.current) {
      audioRef.current.currentTime = x;
      setCurrentTime(x);
    }
  };

  const handleVolumeChange = ({x}) => {
    const newVolume = Math.min(Math.max(x, 0), 1);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    localStorage.setItem("volume", newVolume);
  };

  const handleSongs = () => {
    if (isRedo) {
      audioRef.current?.play().catch((error) => console.log(error));
    } else if (isRandom) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      dispatch(selectIndex(randomIndex));
    } else {
      const nextIndex = (audioIndex + 1) % songs.length;
      dispatch(selectIndex(nextIndex));
    }
  };

  const handleRandomClick = () => {
    setRandom(!isRandom);
    if (isRedo) setRedo(false);
  };

  const handleRedoClick = () => {
    setRedo(!isRedo);
    if (isRandom) setRandom(false);
  };

  const handleSound = () => {
    if (volume === 0) {
      const savedVolume = parseFloat(localStorage.getItem("volume")) || 0.5;
      setVolume(savedVolume);
      if (audioRef.current) {
        audioRef.current.volume = savedVolume;
      }
    } else {
      localStorage.setItem("volume", volume);
      setVolume(0);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }
  };

  useEffect(() => {
    if (audioRef.current && songs[audioIndex]) {
      audioRef.current.src = songs[audioIndex].lyrics;
      // audioRef.current.play().catch((error) => console.log(error));
      setPlay(true);
    }
  }, [audioIndex, songs]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
      <div className="">
        <div className="container-audio col-12">
          <div className="song-info col-3">
            {songs[audioIndex] && (
                <>
                  <h2 className="Song-Title">{songs[audioIndex].title}</h2>
                  <p className="Singer">{songs[audioIndex].artist}</p>
                </>
            )}
          </div>
          <div className="song-control col-6">
            <div className="Control-Button-Group">
              <div
                  className={`Random-Button ${isRandom ? "active" : ""}`}
                  onClick={handleRandomClick}
              >
                <FaRandom/>
              </div>
              <div
                  className="Prev-Button"
                  onClick={() =>
                      dispatch(selectIndex((audioIndex - 1 + songs.length) % songs.length))
                  }
              >
                <FaBackward/>
              </div>
              <div className="Pause-Play-Button" onClick={handlePausePlayClick}>
                {isPlay ? <FaPause/> : <FaPlay/>}
              </div>
              <div
                  className="Next-Button"
                  onClick={() => dispatch(selectIndex((audioIndex + 1) % songs.length))}
              >
                <FaForward/>
              </div>
              <div
                  className={`Redo-Button ${isRedo ? "active" : ""}`}
                  onClick={handleRedoClick}
              >
                <FaRedo/>
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
              </div>
            </div>
            <div/>
          </div>
          <div className="sound-control d-flex justify-content-end col-3">
            <div className="sound-icon" onClick={handleSound} style={{position:'absolute', left:'110px', top: '41px'}}>
              {volume === 0 ? <IConSoundOff/> : <IConSoundOn/>}
            </div>
            <div className="sound-bar" style={{width:'35px'}}>
              <TimeSlider
                  axis="x"
                  xmax={1}
                  xmin={0}
                  xstep={0.01}
                  x={volume}
                  onChange={handleVolumeChange}
                  styles={{
                    track: {
                      backgroundColor: "#e3e3e3",
                      height: "3px",
                      width:'100px',
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

        <audio
            ref={audioRef}
            src={songs[audioIndex]?.lyrics}
            onLoadedData={handleLoadedData}
            onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
            onEnded={handleSongs}
        />
      </div>
  );
};

export default AudioPlayer;
