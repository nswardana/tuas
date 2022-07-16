import React, { FC } from 'react'
import { Sigma as sigma } from 'react-sigma'
import { BsZoomIn, BsZoomOut } from 'react-icons/bs'
import { BiRadioCircleMarked } from 'react-icons/bi'

const ZoomButtons = () => {
  function zoom(ratio) {
    if (sigma) {
      if (!ratio) {
        sigma.getCamera().animatedReset({ duration: 100 })
      } else if (ratio > 0) {
        sigma.getCamera().animatedZoom({ duration: 100, factor: 1.5 })
      } else if (ratio < 0) {
        sigma.getCamera().animatedUnzoom({ duration: 100, factor: 1.5 })
      }
    }
  }

  return (
    <>
      <button
        type="button"
        className="ico"
        onClick={() => zoom(1)}
        title="Zoom In"
      >
        <BsZoomIn />
      </button>
      <button
        type="button"
        className="ico"
        onClick={() => zoom(-1)}
        title="Zoom Out"
      >
        <BsZoomOut />
      </button>
      <button
        type="button"
        className="ico"
        onClick={() => zoom()}
        title="See whole graph"
      >
        <BiRadioCircleMarked />
      </button>
    </>
  )
}

export default ZoomButtons
