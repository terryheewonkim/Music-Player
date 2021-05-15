import React from "react";

const LibrarySong = ({
  song,
  songs,
  currentSong,
  setCurrentSong,
  setLibraryStatus,
}) => {
  const songSelectHandler = () => {
    setCurrentSong(song);
    setLibraryStatus(false);
  };

  return (
    <div
      className={`library-song ${song.id === currentSong.id ? "selected" : ""}`}
      onClick={songSelectHandler}
    >
      <img src={song.cover} alt={"album cover for" + song.name}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
