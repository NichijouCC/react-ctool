import React from "react"
import { Link } from "react-router-dom"
import { LazyComp } from "../../../src/lazyComp"

export const demos = [
    {
        title: "rtmpvideo",
        path: "/rtmpvideo",
        comp: <LazyComp target={() => import("./rtmpvideo")} onloading={<div>loadcomp...</div>} />
    }
]
export class DemoPage extends React.Component {

    render() {
        return (
            <React.Fragment>
                {
                    demos.map(item => {
                        return <Link key={item.path} to={item.path}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <div style={{
                                    display: "inline-block",
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    margin: "8px",
                                    backgroundColor: "cornflowerblue"
                                }}></div>
                                <div style={{
                                    display: "inline-block",
                                }}>{item.title}</div>
                            </div>

                        </Link>
                    })
                }
            </React.Fragment>)
    }
}