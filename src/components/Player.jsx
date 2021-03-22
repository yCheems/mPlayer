import React,{useEffect} from 'react'
import styled from "styled-components"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlay,faCaretLeft,faCaretRight,faPause} from "@fortawesome/free-solid-svg-icons"

function Player ({isPlaying,setIsPlaying,audioRef,songInfo,setSongInfo,songs,currentSong,setCurrentSong,setSongs}){
    function dragHandler (e){
        audioRef.current.currentTime = e.target.value;
        setSongInfo({currentTime: e.target.value, duration: e.target.duration,percent: e.target.currentTime*100/e.target.duration});
    }
    function playSongHandler(){
        if(!isPlaying) {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
        else {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }
    };
    function formatTime (time) {
        return(Math.floor(time/60)+":"+("0"+Math.floor(time%60)).slice(-2))
    };
    function changeSongHandler(direction){
        let index = songs.findIndex((s) => s.id === currentSong.id);
        if(direction === "next") {
            setCurrentSong(songs[(index+1)%songs.length]);
            if(isPlaying) 
            if(audioRef.current.play() !== undefined)
                audioRef.current.play().then(() => { audioRef.current.play()});
        }
        else {
            if (index === 0) return
            else
            {
                setCurrentSong(songs[(index-1)%songs.length]);
                if(isPlaying) 
                if(audioRef.current.play() !== undefined)
                    audioRef.current.play().then(() => { audioRef.current.play()});
            }
        }
    };

    useEffect(() =>{
        const songsUpdate = songs.map((s) => {
            if(s.id === currentSong.id) return{
                ...s,
                active: true
            };
            else{
                return{
                    ...s,
                    active:false
                };
            }
        })
        setSongs(songsUpdate);
    },[currentSong]);

    return(
        <PlayerDiv>
            <ControllerDiv id="active">
                <FontAwesomeIcon id="active" style={{color: "#3a9931"}} size="2x" icon={faCaretLeft} onClick={() => changeSongHandler("prev")}/>
                <FontAwesomeIcon  id="active" style={{color: "#3a9931"}} onClick={playSongHandler} size="2x" icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon  id="active" style={{color: "#3a9931"}} size="2x" icon={faCaretRight} onClick={() => changeSongHandler("next")}/>
            </ControllerDiv>
            <TimeDiv> 
                <TimeP>{formatTime(songInfo.currentTime)}</TimeP>
                <FullTrack>
                    <TimeInput onChange={dragHandler} min={0} max={songInfo.duration} value={songInfo.currentTime} type="range" id="active"></TimeInput>
                    <PastTrack percent={songInfo.percent}></PastTrack>
                </FullTrack>
                <TimeP>{formatTime(songInfo.duration - songInfo.currentTime)}</TimeP>
            </TimeDiv>
    
        </PlayerDiv>
    )
}

const PlayerDiv = styled.div`
    min-height: 24 vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #9ede9e;
`
const TimeDiv = styled.div`
    display: flex;
    width:50%;
`

const FullTrack = styled.div`
    background-color: white;
    border-radius: 10px;
    width: 100%;
    height: 1rem;
    padding: 0;
    margin-top: 3.2rem;
    position: relative;
    overflow: hidden;
`

const PastTrack = styled.div`
    background-color: #3a9931;
    height: 100%;
    left: 0;
    width:${props => props.percent}%;
    top:0;
    border-radius: 10px;
    position: absolute;
    pointer-events: none;
`

const TimeInput = styled.input`
    width: 100%;
    -webkit-appearance: none;
    background: transparent;
    cursor: pointer;
    outline: none;
    margin: 0;
    height: 1rem;
    &::-webkit-slider-thumb{
        margin: 0;
        -webkit-appearance: none;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
`

const TimeP = styled.p`
    padding: 2rem 0.5rem;
    width: 4rem;
    text-align: center;
`
const ControllerDiv = styled.div`
    width: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
`

export default Player;
