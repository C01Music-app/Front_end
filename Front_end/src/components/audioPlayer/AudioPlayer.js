import "./AudioPlayer.css"
import { FaPlay, FaPause, FaForward, FaBackward, FaRandom, FaRedo } from 'react-icons/fa';
import audios from "../../audios"
import React, { useRef, useState } from "react";
import TimeSlider from "react-input-slider";

const AudioPlayer = () => {
    const audioRef = useRef();
    const [audioIndex, setAudioIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlay, setPlay] = useState(false);
    const [isRandom, setRandom] = useState(false);
    const [isRedo, setRedo] = useState(false);

    const handleLoadedData = () => {
        setDuration(audioRef.current.duration);
        if (isPlay) audioRef.current.play();
    };

    const handlePausePlayClick = () => {
        if (isPlay) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlay(!isPlay);
    };

    const handleTimeSliderChange = ({ x }) => {
        audioRef.current.currentTime = x;
        setCurrentTime(x);

        if (!isPlay) {
            setPlay(true);
            audioRef.current.play();
        }
    };

    const handleSongs = () => {
        if (isRedo) {
            audioRef.current.play();
        } else if (isRandom) {
            setAudioIndex(Math.floor(Math.random() * audios.length));
        } else {
            setAudioIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % audios.length;
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

    React.useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }, [audioIndex]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="AudioPlayer">
            <div className="container">
                <div className="song-info">
                    {/*<img className="Song-Thumbnail" src="img/images.png" alt="tet" />*/}
                    <h2 className="Song-Title">{audios[audioIndex].title}</h2>
                    <p className="Singer">{audios[audioIndex].artist}</p>
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
                            onClick={() => setAudioIndex((audioIndex - 1 + audios.length) % audios.length)}
                        >
                            <FaBackward />
                        </div>
                        <div className="Pause-Play-Button" onClick={handlePausePlayClick}>
                            {isPlay ? <FaPause /> : <FaPlay />}
                        </div>
                        <div
                            className="Next-Button"
                            onClick={() => setAudioIndex((audioIndex + 1) % audios.length)}
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
                        </div>
                    </div>
                </div>
            </div>
            <audio
                ref={audioRef}
                src={audios[audioIndex].src}
                onLoadedData={handleLoadedData}
                onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
                onEnded={handleSongs}
            />
        </div>
    );
};

export default AudioPlayer;
