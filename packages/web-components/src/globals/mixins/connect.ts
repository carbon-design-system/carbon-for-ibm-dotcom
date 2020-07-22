/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Dispatch, Store } from 'redux';
import Handle from '../internal/handle';

/**
 * @param store A redux store.
 * @returns A funciton that takes a base class and returns a mix-in that connects the component to Redux store.
 */
const ConnectMixin = <TState, TStateProps = { [name: string]: any }, TDispatchProps = { [name: string]: any }>(
  store: Store<TState>,
  mapStateToProps: (state: TState) => TStateProps,
  mapDispatchToProps: (dispatch: Dispatch) => TDispatchProps = () => ({} as TDispatchProps)
) => <T extends Constructor<HTMLElement>>(Base: T) => {
  class ConnectMixinImpl extends Base {
    /**
     * The handle for subscribing the Redux store.
     */
    _hStore: Handle | null = null;

    _handleChangeStoreState(state: TState) {
      const props = mapStateToProps(state);
      Object.keys(props).forEach(name => {
        const old = this[name];
        const current = props[name];
        if (!Object.is(old, current)) {
          this[name] = current;
          // TODO: Figure out how to make this mix-in type-defined as `LitElement` inheritance
          (this as any).requestUpdate(name, old);
        }
      });
    }

    constructor(...args) {
      super(...args);
      Object.assign(this, mapDispatchToProps(store.dispatch));
    }

    connectedCallback() {
      // TS seems to miss `HTMLElement.prototype.connectedCallback()` definition
      // @ts-ignore
      super.connectedCallback();
      const unsubscribe = store.subscribe(() => this._handleChangeStoreState(store.getState()));
      this._hStore = {
        release() {
          unsubscribe();
          return null;
        },
      };
    }

    disconnectedCallback() {
      if (this._hStore) {
        this._hStore = this._hStore.release();
      }
      // TS seems to miss `HTMLElement.prototype.connectedCallback()` definition
      // @ts-ignore
      super.disconnectedCallback();
    }
  }
  return ConnectMixinImpl;
};

export default ConnectMixin;
