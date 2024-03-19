/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createContext } from '@lit/context';

type StateType = {
  isRoot: boolean;
  mode: 'full' | 'basic';
  hasIcons: boolean;
  size: 'xs' | 'sm' | 'md' | 'lg' | null;
  items: any[];
  requestCloseRoot: (e: Pick<KeyboardEvent, 'type'>) => void;
};

type MenuContextProps = {
  state: StateType;
};
const menuContext = createContext<MenuContextProps>('menucontext');

export { menuContext, MenuContextProps };
