import * as React from "react";
import { Button, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Picker } from "@react-native-picker/picker";
import Player from "../components/Player";
import { BLUE_JP } from "../assets/lyrics/BLUE_JP";
import { BLUE } from "../assets/lyrics/Blue";
import { RGB_JP } from "../assets/lyrics/RGB_JP";
import { MONSTER_JP } from "../assets/lyrics/MONSTER_JP";
import { Lrc, LyricLine } from "react-lrc";
import styled from "styled-components";

const songList = ["群青|Blue", "怪獣|Monster", "三原色|RGB"];
const songUrlJP = [
  "https://www.youtube.com/watch?v=Y4nEEZwckuU",
  "https://www.youtube.com/watch?v=dy90tA3TT1c",
  "https://www.youtube.com/watch?v=nhOhFOoURnE",
];
const songUrlEN = [
  "https://www.youtube.com/watch?v=L8hMN2UAPxs",
  "https://www.youtube.com/watch?v=Eoe5IZHbarQ",
  "https://www.youtube.com/watch?v=BS5YyieaXgc",
];

let startTime: number = Date.now();
const timer = (state: boolean) => {
  if (state) {
    startTime = Date.now();
    return Date.now() - startTime;
  } else {
    startTime = 0;
    return 0;
  }
};

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [playState, setPlayState] = React.useState(false);
  const [curList, setCurList] = React.useState(2);
  const [curJPUrl, setCurJPUrl] = React.useState(songUrlJP[curList]);
  const [curENUrl, setCurENUrl] = React.useState(songUrlEN[curList]);
  const [curLyrics, setCurLyrics] = React.useState("RGB_JP");
  const [curMill, setCurMill] = React.useState(0);

  const onPlayPressed = () => {
    setPlayState(true);
    setCurMill(timer(playState));
  };

  const onPausePressed = () => {
    setPlayState(false);
  };

  const onSelChanged = (value: number) => {
    setCurList(value);
    setCurJPUrl(songUrlJP[value]);
    setCurENUrl(songUrlEN[value]);
    setPlayState(false);
  };

  React.useEffect(() => {
    console.log('effect','running')
    setCurMill(timer(playState));
  });

  const LrcLine = styled.div`
    font-size: 16px;
    padding: 5px 20px;
    color: white;
  `;

  const lineRenderer = ({ line }: { line: LyricLine }) => (
    <LrcLine>{line.content}</LrcLine>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Multi Stream Viewer</Text>
      <View style={styles.fixToText}>
        <Player url={curJPUrl} playState={playState} />
        <Player url={curENUrl} playState={playState} />
      </View>
      <Text style={styles.title}>{`Current Track | Time : ${curMill}`}</Text>
      <Lrc
        lrc={RGB_JP}
        lineRenderer={lineRenderer}
        autoScroll={true}
        style={{ overflow: "hidden !important" }}
        intervalOfRecoveringAutoScrollAfterUserScroll={0}
        currentMillisecond={curMill}
      />
      <Picker
        selectedValue={curList}
        style={{ height: 40, width: 180 }}
        onValueChange={onSelChanged}
      >
        {songList.map((val, idx) => {
          return <Picker.Item label={val} value={idx} key={idx} />;
        })}
      </Picker>
      <View style={styles.fixToText}>
        <Button onPress={onPlayPressed} title="Play" /> &nbsp;&nbsp;
        <Button onPress={onPausePressed} title="Pause" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
});
