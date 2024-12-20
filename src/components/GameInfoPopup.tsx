import React from 'react'

const GameInfoPopup = ({ data }: {data: string}) => {
  return (
    <div style={{
      position: "fixed",
      top: "100px",
      left: "100px",
      width: "200px",
      height: "180px",
      backgroundColor: "#eee",
      border: "2px solid #333"
    }}>{data}</div>
  )
}

export default GameInfoPopup;