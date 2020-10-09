import React, { Suspense } from "react";
import './app.css';
import { HashRouter, Route, Switch } from 'react-router-dom'
import { demos, DemoPage } from "./demos";

export default class APP extends React.Component {
    render() {
        return (<HashRouter>
            <Suspense fallback={<div>loading...</div>}>
                <Switch>
                    <Route exact path="/" component={DemoPage} />
                    {
                        demos.map(item => {
                            return <Route key={item.path} exact path={item.path} render={() => item.comp}></Route>
                        })
                    }
                </Switch>
            </Suspense>
        </HashRouter>)
    }
}

