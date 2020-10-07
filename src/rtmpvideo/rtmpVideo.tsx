import React, { ReactType, ReactNode } from "react";

interface Iprops {
    url: string,
    onloading?: ReactNode,
    style?: React.CSSProperties
}

export class RtmpVideo extends React.Component<Iprops> {
    componentDidMount() {

    }

    render() {
        return <div style={this.props.style}></div>;
    }
}
