import React, { useState } from 'react'
import styled from "styled-components"
import {faVolumeUp} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Song ({currentSong,playlistIsOpened,setPlaylistIsOpened,audioRef}) {
    const [songVolume,setSongVolume] = useState(100);
    function openPlaylist(){
        setPlaylistIsOpened(!playlistIsOpened);
    }
    function changeVolumeHandler(e){
        audioRef.current.volume = e.target.value/100;
        setSongVolume(e.target.value);
    }
    return(
        <SongDiv>
            <VolumeDiv>
                <FullVolume>
                    <VolumeInput min={0} max={100} type="range" value={0} id="active" onChange={changeVolumeHandler}></VolumeInput>
                    <CurrentVolume Value={songVolume}></CurrentVolume>
                </FullVolume>
                <FontAwesomeIcon icon={faVolumeUp}/>
            </VolumeDiv>
            <Button onClick={openPlaylist}>Playlist</Button>
            <CoverImg alt={currentSong.name} src={currentSong.cover}/>
            <h2 >{currentSong.name}</h2>
            <h3 style={{marginTop:"5px"}}>{currentSong.artist}</h3>
        </SongDiv>
    )
}

const VolumeDiv = styled.div`
    position: absolute;
    left:0;
    margin: 5vh 10vh;
    width: 10rem;
    height: 1rem;
    display: flex;
`
const FullVolume = styled.div`
    margin-right: 5px;
    background-color: white;
    border-radius: 10px;
    padding: 0;
    overflow: hidden;
    position: relative;
`
const CurrentVolume = styled.div`
    background-color: #3a9931;
    height: 100%;
    left: 0;
    width:${props => props.Value}%;
    top:0;
    border-radius: 10px;
    position: absolute;
    pointer-events: none;
`
const VolumeInput = styled.input`
    width: 100%;
    -webkit-appearance: none;
    background: transparent;
    cursor: pointer;
    outline: none;
    margin: 0;
    height: 1rem;
    &::-webkit-slider-thumb{
        margin: 0 -5px;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
`

const SongDiv = styled.div`
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CoverImg = styled.img`
    height: 60vh;
    border-radius: 10%;
`

const Button = styled.button`
    position: absolute;
    right:0;
    margin: 5vh 10vh;
    height: 5rem;
    width:10rem;
    border-color: #3e9931;
    border-radius: 5px;
    background-color: #3e9931;
    color: white;
    font-size: 24px;
`
export default Song;