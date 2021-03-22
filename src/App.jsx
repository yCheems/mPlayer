import { useState,useRef } from 'react'
import styled from 'styled-components'
import Player from "./components/Player"
import Song from "./components/Song"
import data from "./music"
import Playlist from "./components/Playlist"


function App() {
  const [songs,setSongs] = useState(data());
  const [currentSong,setCurrentSong] = useState(songs[0]);
  const [isPlaying,setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [playlistIsOpened,setPlaylistIsOpened] = useState(false);
  const [songInfo,setSongInfo] = useState({
    currentTime: 0,
    duration: null,
    percent: 0
});
function timeUpdateHandler (e){
    setSongInfo({currentTime: e.target.currentTime, duration: e.target.duration,percent: e.target.currentTime*100/e.target.duration});
};
function closePlaylist(e){
  if(playlistIsOpened && e.target.id !== "active" && e.target.tagName !== "path"){
    setPlaylistIsOpened(!playlistIsOpened);
  } 
}
  return (
    <AppDiv onClick={closePlaylist}>
      <Song currentSong={currentSong} playlistIsOpened={playlistIsOpened} setPlaylistIsOpened={setPlaylistIsOpened} audioRef={audioRef}/>
      <Player 
      currentSong={currentSong}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      audioRef={audioRef}
      songInfo={songInfo}
      setSongInfo={setSongInfo}
      songs={songs}
      setCurrentSong={setCurrentSong}
      setSongs={setSongs}
      />
      <Playlist 
      setCurrentSong={setCurrentSong} 
      songs={songs} 
      isPlaying={isPlaying} 
      audioRef={audioRef}
      setSongs={setSongs}
      playlistIsOpened={playlistIsOpened}
      />
      <audio ref={audioRef} src={currentSong.audio} onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler}/>
    </AppDiv>
  );
}

const AppDiv = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  margin: -10px;
  padding: 0;
  box-sizing: border-box;
  background-color: #9ede9e;
  font-family: 'Quicksand', sans-serif;
`
export default App;
