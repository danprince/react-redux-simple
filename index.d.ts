import { ComponentType } from "react";

type Selector<T> = (state: any) => T;
type Action<T> = (...args: any[]) => T;
type Selectors<P> = { [K in keyof P]?: Selector<P[K]> };
type Actions<P> = { [K in keyof P]?: Action<P[K]> };
type SelectorFactory<P> = (props: P) => Selectors<P>;
type ActionsFactory<P> = (props: P) => Actions<P>;

export type Component<P> = ComponentType<P> & {
  selectors?: Selectors<P> | SelectorFactory<P>;
  actions?: Actions<P> | ActionsFactory<P>;
};

export function connect<P>(component: Component<P>): ComponentType<P>;
export let Provider: any;
