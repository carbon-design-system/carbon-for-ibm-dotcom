/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  export default {
    parameters: {
      docs: {
        container: JSX.Element,
        page: MDXComponent,
      },
    },
  };
}

declare module '*.scss';
declare module '*.svg';
