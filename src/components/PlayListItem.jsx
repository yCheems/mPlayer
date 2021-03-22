import React from "react"
import styled from "styled-components"

function PlayListItem ({songs,song,setCurrentSong,isPlaying,audioRef,setSongs}) {
    function songSelectHandler (){
        const selectedSong = songs.filter((state) => state.id === song.id)[0];
        setCurrentSong(selectedSong);
        if(isPlaying) 
            if(audioRef.current.play() !== undefined)
                audioRef.current.play().then(() => { audioRef.current.play()});        
    }
    return(
        <ItemDiv id="active" Active={song.active ? {bgimg:'url(https://i.pinimg.com/originals/c1/e1/ff/c1e1ff8208e945762889f35010e395be.gif)',width:'100%',anim:'float 3s infinite'} : {width:'90%'}}
        isPlaying={isPlaying ? 'running' : 'paused'}
        onClick={songSelectHandler}
        >
            <ItemImg id="active" alt={song.name} src={song.cover}/>
            <NameAndArtistDiv id="active">
                <h3 id="active">{song.name}</h3>
                <h4 id="active" style={{marginTop:"5px"}}>{song.artist}</h4>
            </NameAndArtistDiv>
        </ItemDiv>
    );
};

const ItemDiv = styled.div`
    display: flex;
    flex-direction: row;
    width:${props => props.Active.width};
    margin: 10px;
    transition: width 0.2s cubic-bezier(0, 0, 1, 1) 100ms;
    &:hover{
        width: 100%;
        background-color: #37874d;
    }
    background-image: ${props => props.Active.bgimg || 'none'};
    background-size: cover;
    transform: translatey(0px);
	animation: ${props => props.Active.anim || 'none'};
    animation-play-state: ${props => props.isPlaying};
    @keyframes float {
	0% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
	50% {
		box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
		transform: translatey(-10px);
	}
	100% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
}
`;
const NameAndArtistDiv = styled.div`
    display: block;
    margin-left: 5px;
`;
const ItemImg = styled.img`
    width: 40%;
    border-radius: 50%;
`;

export default PlayListItem;