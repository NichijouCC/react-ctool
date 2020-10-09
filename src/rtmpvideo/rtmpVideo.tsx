/* eslint-disable no-return-assign */
import React, { ReactType, ReactNode } from "react";
import videoSwf from "./video-js.swf";
import videojs from "video.js";

interface Iprops {
    source: string,
    onloading?: ReactNode,
    style?: React.CSSProperties,
    autoReconnect?: boolean
}

interface Istate {
    beloading: boolean,
    id: string,

}

export class RtmpVideoPlayer extends React.Component<Iprops> {
    state: Istate = {
        beloading: true,
        id: RtmpVideoPlayer.nextId()
    }

    private static playerCount = 0;
    private static nextId() {
        return "player-" + (RtmpVideoPlayer.playerCount++);
    }

    render() {
        return (<div style={{ ...defaultCssStyle, ...this.props.style }} key={this.state.id} >
            {
                this.state.id ? <RtmpVideo source={this.props.source} id={this.state.id} autoreconnect={this.props.autoReconnect ?? true}
                    onfailed={() => { this.setState({ id: RtmpVideoPlayer.nextId() }); }}
                    onsuccess={() => this.setState({ beloading: false })} /> : null
            }
            {this.state.beloading ? this.props.onloading : null}
        </div >);
    }
}

interface IrtmpProps {
    source: string,
    id: string,
    autoreconnect: boolean;
    onfailed?: () => void,
    onsuccess?: () => void
}

class RtmpVideo extends React.Component<IrtmpProps,
    {
        beloading: boolean,
    }> {
    private player: any;
    private videoNode: HTMLVideoElement;
    bemount: boolean = true;
    constructor(props: any) {
        super(props);

        this.state = {
            beloading: true
        };
    }

    async componentDidMount() {
        await import("./videojs-flash.es.js");
        (videojs.options as any).flash.swf = videoSwf;

        if (this.props.autoreconnect) {
            let lastTime = Date.now();
            let totalTime = 0;
            this.bemount = true;

            const loop = () => {
                if (this.player && this.bemount) {
                    const currentState = this.player.readyState();
                    if (currentState == 0) { // 没有数据
                        // 记录时间
                        const currentTime = Date.now();
                        const waittime = currentTime - lastTime;
                        totalTime += waittime;

                        if (totalTime > 2000 && this.state.beloading == false) {
                            this.setState({ beloading: true });
                        }
                        if (totalTime > 20000) {
                            // 长时间没播放
                            totalTime = 0;
                            this.props.onfailed?.();
                        }
                        // console.log(`source：${this.props.source},totaltime:${totalTime}`);
                    } else if (currentState == 4) {
                        if (this.state.beloading) {
                            this.setState({ beloading: false });
                        }
                        totalTime = 0;
                    }
                }
                lastTime = Date.now();
                requestAnimationFrame(loop);
            };
            loop();
        }
        this.player = this.createPlayer();
    }

    private createPlayer() {
        // console.log("@@-----createPlayer");
        const player: any = videojs(this.videoNode, {
            preload: "auto", // 预加载
            muted: true, // 是否静音
            loop: false, // 是否循环播放
            autoplay: false, // 是否自动播放
            techOrder: ["flash"], // 设置flash播放
            language: "zh-CN"
        }, null);
        player.on("ready", () => {
            player.play();
        });
        // attachEvent(player, "@");
        return player;
    }

    componentWillUnmount() {
        this.bemount = false;
        if (this.player) {
            this.player.dispose();
        }
    }

    render() {
        return (
            <video
                key={this.props.id}
                ref={node => this.videoNode = node}
                style={{
                    width: "100%",
                    height: "100%"
                }}
                className={"video-js"}
            >
                <source src={this.props.source} type="rtmp/mp4"></source>
            </video>
        );
    }
}

const defaultCssStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "black",
    overflow: "hidden"
};

// function attachEvent(player: any, tag: any) {
//     player.on("loadstart", function (e) {
//         console.log("开始请求数据 ", tag);
//     });
//     player.on("progress", function (e) {
//         console.log("正在请求数据 ", tag);
//     });
//     player.on("loadedmetadata", function (e) {
//         console.log("获取资源长度完成 ", tag);
//     });
//     player.on("canplaythrough", function (e) {
//         console.log("视频源数据加载完成", tag);
//     });
//     player.on("waiting", function (e) {
//         console.log("等待数据", tag);
//     });
//     player.on("play", function (e) {
//         console.log("视频开始播放", tag);
//     });
//     player.on("playing", function (e) {
//         console.log("视频播放中", tag);
//     });
//     player.on("pause", function (e) {
//         console.log("视频暂停播放", tag);
//     });
//     player.on("ended", function (e) {
//         console.log("视频播放结束", tag);
//     });
//     player.on("error", function (e) {
//         console.log("加载错误", tag);
//     });
//     player.on("seeking", function (e) {
//         console.log("视频跳转中", tag);
//     });
//     player.on("seeked", function (e) {
//         console.log("视频跳转结束", tag);
//     });
//     player.on("ratechange", function (e) {
//         console.log("播放速率改变", tag);
//     });
//     player.on("timeupdate", function (e) {
//         console.log("播放时长改变", tag, player.readyState());
//     });
//     player.on("volumechange", function (e) {
//         console.log("音量改变", tag);
//     });
//     player.on("stalled", function (e) {
//         console.log("网速异常", tag);
//     });
// }
