import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'react-router-dom'
import axios from 'axios'


const DisplaySongs = () => {
  const [songs, updateSong] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/songs')
      console.log(data)
      updateSong(data)
    }
    fetchData()
  }, [])
  return (
    <div className="container">
      <div>
        <select>
          <option value>Song</option>
          <option value>{console.log('hello')}</option>
          <option value>Song</option>
          <option value>Song</option>
        </select>
      </div>
      <div className="song-card">
        {songs.map((song, index) => {
          return <div key={index}>
            <h2>{song.title}</h2>
            <a href={song.src}> Click here to listen to this Song</a>
          </div>
        })}
      </div>

    </div>
  )
}

export default DisplaySongs