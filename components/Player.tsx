import React, { Fragment, useRef } from "react";
import ReactPlayer from "react-player";

const Player = (props: { url: string; playState: boolean; id: number; callBack?:Function }) => {
  const onply = (obj: any) => {
    if(props.callBack) {
      props.callBack(obj.playedSeconds*1000);
    }
  };

  return (
    <Fragment>
      <ReactPlayer
        onProgress={onply}
        key={props.id}
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
