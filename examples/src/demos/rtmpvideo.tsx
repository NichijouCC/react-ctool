import React from "react";
import { RtmpVideoPlayer } from '../../../src/rtmpvideo/rtmpVideo'
export default class RtmpVideo_demo extends React.Component {
    render() {
        return (
            <div>
                <RtmpVideoPlayer source="rtmp://58.200.131.2:1935/livetv/hunantv" style={{ width: "400px", height: "300px" }}></RtmpVideoPlayer>
            </div>)
    }
}