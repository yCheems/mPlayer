import React from "react"
import PlayListItem from "./PlayListItem"
import styled from "styled-components"

function Playlist ({songs,setCurrentSong,isPlaying,audioRef,setSongs,playlistIsOpened}){
    return(
        <PLDiv id="active" isOpened={playlistIsOpened ? "" : "translateX(100%)"}>
            <HeadDiv>
            <h2 id="active" style={{marginRight: "20px"}}>Playlist</h2>
            </HeadDiv>
            <SongsDiv id="active">
                {songs.map(song => (<PlayListItem 
                songs={songs} 
                song={song} 
                setCurrentSong={setCurrentSong} 
                isPlaying={isPlaying} 
                audioRef={audioRef}
                setSongs={setSongs}
                key={song.id}
                />))}
            </SongsDiv>
        </PLDiv>
    );
};

const HeadDiv = styled.div`
    display:block;
    z-index: 10;
    width: 20rem;
    background-color: #3f9957;
`
const PLDiv = styled.div`
    top:0;
    right:0;
    position:fixed;
    width: 20rem;
    height: 100%;
    box-shadow: 4px 4px 40px gray;
    padding: 10px;
    background-color: #3f9957;
    color: white;
    border-radius: 5px;
    overflow: scroll;
    direction: rtl;
    transform: ${props => props.isOpened};
    transition: all ease 1s;
    &::-webkit-scrollbar{
        width: 8px;
        background-color: #3f9957;
    }
    &::-webkit-scrollbar-thumb {
        background-color: white;
        border-radius: 5px;
    }
`;

const SongsDiv = styled.div`
    display:block;
`;

export default Playlist;
