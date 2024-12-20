import React from 'react'

const GamePopup = ({title, onClose}: {title: string, onClose: () => void}) => {
  return (
    <div style={{
      position: "fixed",
      top: "10px",
      left: "10px",
      width: "90vw",
      height: "90vh",
      backgroundColor: "#eee",
      border: "2px solid #333"
    }}>{title}
      <button onClick={() => {onClose()}} style={{
        width: "30px",
        height: "30px",
        position: "absolute",
        top: "2px",
        right: "2px",
        padding: "0"
      }}>
        <img src="/Images/Icons/icon_close.png" alt="" style={{
          width: "100%",
          height: "100%"
        }} />
      </button>
    </div>
  )
}

export default GamePopup