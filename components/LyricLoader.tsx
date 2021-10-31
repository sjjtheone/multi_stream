import React from "react";
import { Lrc, LyricLine } from "react-lrc";
import { StyleSheet } from "react-native";
import { Text } from "../components/Themed";

const lineRenderer = (lyricObj: {
  index: number;
  active: boolean;
  line: LyricLine;
}) => {
  return (
    <div>
      {lyricObj.active ? (
        <Text style={styles.highlighted}>{lyricObj.line.content}</Text>
      ) : (
        <Text>{`${lyricObj.line.content}`}</Text>
        
      )}
    </div>
  );
};

const LyricLoader = (props: { curLyrics: string; curMill: number }) => {
  return <Lrc
    lrc={props.curLyrics}
    lineRenderer={lineRenderer}
    autoScroll={true}
    style={{ overflow: "hidden !important", height: 90, color: "white" }}
    intervalOfRecoveringAutoScrollAfterUserScroll={0}
    currentMillisecond={props.curMill}
  />;
};

export default LyricLoader;

const styles = StyleSheet.create({
    highlighted: {
        textShadowColor: "red",
        color: "red",
        fontWeight: "bold"
    },
  });
