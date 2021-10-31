import * as React from "react";
import { Button, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Picker } from "@react-native-picker/picker";
import Player from "../components/Player";
import { BLUE_JP } from "../assets/lyrics/BLUE_JP";
import { BLUE } from "../assets/lyrics/Blue";
import { RGB_JP } from "../assets/lyrics/RGB_JP";
import { MONSTER_JP } from "../assets/lyrics/MONSTER_JP";
import LyricLoader from "../components/LyricLoader";

const songList = ["群青|Blue", "怪獣|Monster", "三原色|RGB"];
const JPLyricList = [BLUE_JP, MONSTER_JP, RGB_JP];
const ENLyricList = [BLUE, '', ''];
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

export default function TabOneScreen() {
  const [playState, setPlayState] = React.useState(false);
  const [curList, setCurList] = React.useState(2);
  const [curJPUrl, setCurJPUrl] = React.useState(songUrlJP[curList]);
  const [curENUrl, setCurENUrl] = React.useState(songUrlEN[curList]);
  const [curLyrics, setCurLyrics] = React.useState(JPLyricList[curList]);
  const [curMill, setCurMill] = React.useState(0);

  const onCallBack = (milliseconds: number) => {
    setCurMill(milliseconds);
  };

  const onPlayPressed = () => {
    setPlayState(true);
  };

  const onPausePressed = () => {
    setPlayState(false);
  };

  const onSelChanged = (value: number) => {
    setCurList(value);
    setCurJPUrl(songUrlJP[value]);
    setCurENUrl(songUrlEN[value]);
    setCurLyrics(JPLyricList[value]);
    setPlayState(false);
    setCurMill(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Multi Stream Viewer</Text>
      <View style={styles.fixToText}>
        <Player
          url={curJPUrl}
          playState={playState}
          id={1}
          callBack={onCallBack}
        />
        <Player url={curENUrl} playState={playState} id={2} />
      </View>
      <Text style={styles.title}>{`Current Track : ${songList[curList]}`}</Text>
      <View style={styles.lyricCenter}>
        <LyricLoader curLyrics={curLyrics} curMill={curMill} />
      </View>
      <Picker
        selectedValue={curList}
        style={{ height: 40, width: 180 }}
        onValueChange={onSelChanged}
      >
        {songList.map((val, idx) => {
          return <Picker.Item label={val} value={idx} key={idx} />;
        })}
      </Picker>
      <View>
        <View style={styles.fixToText}>
          <Button onPress={onPlayPressed} title="Play" />
          <Button onPress={onPausePressed} title="Pause" />
        </View>
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
  lyricCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
});
