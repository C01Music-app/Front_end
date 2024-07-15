
import "./AudioPlayer.css"
import PrevIcon from "./icons/PrevIcon";
import NextIcon from "./icons/NextIcon";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import audios from "../../audios"
import React, {useRef, useState} from "react";
import TimeSlider from "react-input-slider";


const AudioPlayer = () => {
    const audioRef = useRef();
    const [audioIndex, setAudioIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlay, setPlay] = useState(false);

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
    const handleSongs = () =>{
        setAudioIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % audios.length;
            return nextIndex;
        });
    };
    React.useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }, [audioIndex]);

    return (
        <div className="AudioPlayer">
            <div className="song-info">
            <img className="Song-Thumbnail" src="img/images.png" alt="tet" />
            <h2 className="Song-Title">{audios[audioIndex].title}</h2>
            <p className="Singer">{audios[audioIndex].artist}</p>
            </div>
            <div className="song-control">
            <div className="Control-Button-Group">
                <div
                    className="Prev-Button"
                    onClick={() => setAudioIndex((audioIndex - 1) % audios.length)}
                >
                    <PrevIcon />
                </div>
                <div className="Pause-Play-Button" onClick={handlePausePlayClick}>
                    {isPlay ? <PauseIcon /> : <PlayIcon />}
                </div>
                <div
                    className="Next-Button"
                    onClick={() => setAudioIndex((audioIndex + 1) % audios.length)}
                >
                    <NextIcon />
                </div>
            </div>
            <div className="timeSliderCustom">
            <TimeSlider
                axis="x"
                xmax={duration}
                x={currentTime}
                onChange={handleTimeSliderChange}
                styles={{
                    track: {
                        backgroundColor: "#e3e3e3",
                        height: "2px",
                    },
                    active: {
                        backgroundColor: "#333",
                        height: "2px",
                    },
                    thumb: {
                        marginTop: "-3px",
                        width: "1px",
                        height: "8px",
                        backgroundColor: "#333",
                        borderRadius: 0,
                    },
                }}
            />
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