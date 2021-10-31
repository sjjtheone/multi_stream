import React, { Fragment, useRef } from "react";
import ReactPlayer from "react-player";

const Player = (props: { url: string; playState: boolean }) => {

  return (
    <Fragment>
      <ReactPlayer
        url={props.url}
        playing={props.playState}
        config={{
          youtube: {
            playerVars: { showinfo: 0, controls: 0, disablekb: 1 },
          },
        }}
      />
      ;
    </Fragment>
  );
};

export default Player;
