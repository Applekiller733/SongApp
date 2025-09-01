import type Song from "../../models/song";
import ReactPlayer from 'react-player';

import "./song.css";

export default function VideoWidget(song: Song){

    // ENSURE VIDEO ONLY PLAYS DEPENDING ON A STATE / refer to audio widget
    return (
    <div className="videowidget">
        <ReactPlayer src={song.video} controls={true}></ReactPlayer>
    </div>
    );
}