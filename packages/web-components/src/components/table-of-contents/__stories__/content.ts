/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';

export const headings = [
  'Forward thinkers',
  'Innovation and transformation',
  'Client success stories',
  'Iconic moments in IBM history',
  'Trust and responsibility',
  'Connect with IBM',
];

// eslint-disable-next-line max-len
export const LOREM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie condimentum consectetur. Nulla tristique lacinia elit, at elementum dui gravida non. Mauris et nisl semper, elementum quam non, lacinia purus. Vivamus aliquam vitae sapien volutpat efficitur. Curabitur sagittis neque facilisis magna posuere consectetur. Praesent fermentum sodales facilisis. Mauris a efficitur sem. Aliquam vehicula sapien libero, a viverra felis scelerisque vel. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec fringilla dui tellus, a pretium diam vehicula et. Etiam non vulputate augue. Morbi laoreet diam dapibus sapien pellentesque tristique. Morbi id nibh metus. Integer non scelerisque nisl.`;

const generateCopySections = (n) => Array(n).map(() => html` <p>${LOREM}</p> `);

const content = ({ contentClass, items }) => html`
  <div class="${contentClass} dds-ce-demo--table-of-contents">
    ${items.map(
      ({ heading, copy }, i) =>
        html`
          <h3 name="${i}">${heading}</h3>
          ${copy
            ? copy.split('\n').map((section) => html` <p>${section}</p> `)
            : generateCopySections(3)}
        `
    )}
  </div>
`;

export default content;
