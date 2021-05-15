import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, currentSong, setCurrentSong, libraryStatus, setLibraryStatus }) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            songs={songs}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            setLibraryStatus={setLibraryStatus}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
