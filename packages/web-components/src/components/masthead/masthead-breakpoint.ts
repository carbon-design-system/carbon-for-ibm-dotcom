/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Magic Number: 799px matches masthead.scss?lit's `$breakpoint--desktop-nav`.
const mastheadBreakpoint = window.matchMedia(`(max-width: 799px)`);

export default mastheadBreakpoint;
