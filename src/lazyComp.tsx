import React, { Component, Suspense, ComponentType, ReactType } from "react";

interface Istate {
    Comp: ReactType
}

export class LazyComp extends Component<{ target: () => Promise<ComponentType<any>>, onloading?: React.ReactNode }, Istate> {
    state: Istate = {
        Comp: undefined
    };

    async componentDidMount() {
        const comp: any = await this.props.target();
        if (comp.default != null) {
            this.setState({ Comp: comp.default });
        } else {
            throw new Error(" 'target' props of LazyComp must be default export");
        }
    }

    render() {
        const { Comp } = this.state;
        return Comp ? <Comp /> : this.props.onloading;
    }
}
