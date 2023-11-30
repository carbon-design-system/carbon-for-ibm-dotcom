/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import MockIntersectionObserver from '../../../../tests/utils/mock-intersection-observer';
import '../top-nav';

const template = ({ width = 215 }: { width?: number } = {}) => {
  return html`
    <style>
      c4d-top-nav {
        display: flex;
        width: ${width}px;
        height: 1rem;
        background-color: blue; /* For debugging */
      }

      c4d-top-nav::part(nav) {
        /* Forces the nav being shown */
        display: block;
        /* Removes the padding for simpler test */
        padding: 0;
      }

      c4d-top-nav::part(prev-button),
      c4d-top-nav::part(next-button) {
        display: block;
      }

      .c4d-ce--test--scroll-content {
        width: 100px;
        flex-grow: 0;
        flex-shrink: 0;
      }

      .c4d-ce--test--scroll-content--odd {
        width: 75px;
      }
    </style>
    <c4d-top-nav>
      <div
        class="c4d-ce--test--scroll-content c4d-ce--test--scroll-content--even"></div>
      <div
        class="c4d-ce--test--scroll-content c4d-ce--test--scroll-content--odd"></div>
      <div
        class="c4d-ce--test--scroll-content c4d-ce--test--scroll-content--even"></div>
      <div
        class="c4d-ce--test--scroll-content c4d-ce--test--scroll-content--odd"></div>
      <div
        class="c4d-ce--test--scroll-content c4d-ce--test--scroll-content--even"></div>
      <div
        class="c4d-ce--test--scroll-content c4d-ce--test--scroll-content--odd"></div>
      <div
        class="c4d-ce--test--scroll-content c4d-ce--test--scroll-content--even"></div>
      <div
        class="c4d-ce--test--scroll-content c4d-ce--test--scroll-content--odd"></div>
      <div
        class="c4d-ce--test--scroll-content c4d-ce--test--scroll-content--even"></div>
      <div
        class="c4d-ce--test--scroll-content c4d-ce--test--scroll-content--odd"></div>
    </c4d-top-nav>
  `;
};

async function pause(timespan = 0) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, timespan);
  });
}

describe('c4d-top-nav', function () {
  let origIntersectionObserver;

  beforeEach(function () {
    origIntersectionObserver = window.IntersectionObserver;
    window.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  xdescribe('Navigating to right', function () {
    it('should go to the next page', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for the component
      await Promise.resolve(); // The cycle where `slotchange` event is called
      const topNav = document.querySelector('c4d-top-nav');
      const intersectionRightSentinelNode = topNav!.shadowRoot!.querySelector(
        '.cds-sub-content-right'
      );
      MockIntersectionObserver.run(intersectionRightSentinelNode!, false);
      await Promise.resolve();
      (
        topNav!.shadowRoot!.querySelector('[part="next-button"]') as HTMLElement
      ).click();
      await Promise.resolve();
      await Promise.resolve();
      await pause(250); // Let DOM update, transition to end.
      const offsetElement = topNav!.shadowRoot!.querySelector(
        '.cds-header__nav-content'
      ) as HTMLElement;
      expect(window.getComputedStyle(offsetElement).insetInlineStart).toBe(
        '-167px'
      );
    });

    it('should support snapping to menu item', async function () {
      render(template({ width: 200 }), document.body);
      await Promise.resolve(); // Update cycle for the component
      await Promise.resolve(); // The cycle where `slotchange` event is called
      const topNav = document.querySelector('c4d-top-nav');
      const intersectionRightSentinelNode = topNav!.shadowRoot!.querySelector(
        '.cds-sub-content-right'
      );
      MockIntersectionObserver.run(intersectionRightSentinelNode!, false);
      await Promise.resolve();
      (
        topNav!.shadowRoot!.querySelector('[part="next-button"]') as HTMLElement
      ).click();
      await Promise.resolve();
      await Promise.resolve();
      await pause(250); // Let DOM update, transition to end.
      const offsetElement = topNav!.shadowRoot!.querySelector(
        '.cds-header__nav-content'
      ) as HTMLElement;
      expect(window.getComputedStyle(offsetElement).insetInlineStart).toBe(
        '-92px'
      );
    });

    // it('should cope with change in the hidden state of the go to next page button', async function() {
    //   render(template(), document.body);
    //   await Promise.resolve(); // Update cycle for the component
    //   await Promise.resolve(); // The cycle where `slotchange` event is called
    //   const topNav = document.querySelector('c4d-top-nav');
    //   const intersectionRightSentinelNode = topNav!.shadowRoot!.querySelector('.cds-sub-content-right');
    //   MockIntersectionObserver.run(intersectionRightSentinelNode!, false);
    //   await Promise.resolve();
    //   (topNav as any)._currentScrollPosition = 565;
    //   (topNav!.shadowRoot!.querySelector('[part="next-button"]') as HTMLElement).click();
    //   await Promise.resolve();
    //   await pause(250); // Let DOM update, transition to end.
    //   const offsetElement = topNav!.shadowRoot!.querySelector('.cds-header__nav-content') as HTMLElement;
    //   const offsetStyle = window.getComputedStyle(offsetElement).insetInlineStart;
    //   expect(offsetStyle).toBe('-565px');
    // });

    // it('should snap to the right edge at the last page', async function() {
    //   render(template(), document.body);
    //   await Promise.resolve(); // Update cycle for the component
    //   await Promise.resolve(); // The cycle where `slotchange` event is called
    //   const topNav = document.querySelector('c4d-top-nav');
    //   const intersectionLeftSentinelNode = topNav!.shadowRoot!.querySelector('.cds-sub-content-left');
    //   MockIntersectionObserver.run(intersectionLeftSentinelNode!, false);
    //   const intersectionRightSentinelNode = topNav!.shadowRoot!.querySelector('.cds-sub-content-right');
    //   MockIntersectionObserver.run(intersectionRightSentinelNode!, false);
    //   await Promise.resolve();
    //   (topNav as any)._currentScrollPosition = 690;
    //   (topNav!.shadowRoot!.querySelector('[part="next-button"]') as HTMLElement).click();
    //   await Promise.resolve();
    //   await pause(250); // Let DOM update, transition to end.
    //   const offsetElement = topNav!.shadowRoot!.querySelector('.cds-header__nav-content') as HTMLElement;
    //   const offsetStyle = window.getComputedStyle(offsetElement).insetInlineStart;
    //   expect(offsetStyle).toBe('-690px');
    // });
  });

  xdescribe('Navigating to left', function () {
    it('should go to the next page', async function () {
      render(template({ width: 255 }), document.body);
      await Promise.resolve(); // Update cycle for the component
      await Promise.resolve(); // The cycle where `slotchange` event is called
      const topNav = document.querySelector('c4d-top-nav');
      const intersectionLeftSentinelNode = topNav!.shadowRoot!.querySelector(
        '.cds-sub-content-left'
      );
      MockIntersectionObserver.run(intersectionLeftSentinelNode!, false);
      const intersectionRightSentinelNode = topNav!.shadowRoot!.querySelector(
        '.cds-sub-content-right'
      );
      MockIntersectionObserver.run(intersectionRightSentinelNode!, false);
      await Promise.resolve();
      (topNav as any)._currentScrollPosition = 350;
      (
        topNav!.shadowRoot!.querySelector('[part="prev-button"]') as HTMLElement
      ).click();
      await Promise.resolve();
      await pause(250); // Let DOM update, transition to end.
      const offsetElement = topNav!.shadowRoot!.querySelector(
        '.cds-header__nav-content'
      ) as HTMLElement;
      const offsetStyle =
        window.getComputedStyle(offsetElement).insetInlineStart;
      expect(offsetStyle).toBe('-183px');
    });

    it('should support snapping to menu item', async function () {
      render(template({ width: 200 }), document.body);
      await Promise.resolve(); // Update cycle for the component
      await Promise.resolve(); // The cycle where `slotchange` event is called
      const topNav = document.querySelector('c4d-top-nav');
      const intersectionLeftSentinelNode = topNav!.shadowRoot!.querySelector(
        '.cds-sub-content-left'
      );
      MockIntersectionObserver.run(intersectionLeftSentinelNode!, false);
      const intersectionRightSentinelNode = topNav!.shadowRoot!.querySelector(
        '.cds-sub-content-right'
      );
      MockIntersectionObserver.run(intersectionRightSentinelNode!, false);
      await Promise.resolve();
      // The 4th item (left: `275px`, right: `350px`) should be the right-most next time
      (topNav as any)._currentScrollPosition = 320;
      (
        topNav!.shadowRoot!.querySelector('[part="prev-button"]') as HTMLElement
      ).click();
      await Promise.resolve();
      // Given the 4th item should be the right-most, the left position should be `350px - (200px - 80px)`
      await pause(250); // Let DOM update, transition to end.
      const offsetElement = topNav!.shadowRoot!.querySelector(
        '.cds-header__nav-content'
      ) as HTMLElement;
      const offsetStyle =
        window.getComputedStyle(offsetElement).insetInlineStart;
      expect(offsetStyle).toBe('-238px');
    });

    it('should cope with change in the hidden state of the go to next page button', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for the component
      await Promise.resolve(); // The cycle where `slotchange` event is called
      const topNav = document.querySelector('c4d-top-nav');
      const intersectionLeftSentinelNode = topNav!.shadowRoot!.querySelector(
        '.cds-sub-content-left'
      );
      MockIntersectionObserver.run(intersectionLeftSentinelNode!, false);
      await Promise.resolve();
      (topNav as any)._currentScrollPosition = 700; // The scrolling position of the last page
      (
        topNav!.shadowRoot!.querySelector('[part="prev-button"]') as HTMLElement
      ).click();
      await Promise.resolve();
      await pause(250); // Let DOM update, transition to end.
      const offsetElement = topNav!.shadowRoot!.querySelector(
        '.cds-header__nav-content'
      ) as HTMLElement;
      const offsetStyle =
        window.getComputedStyle(offsetElement).insetInlineStart;
      expect(offsetStyle).toBe('-573px');
    });

    it('should snap to the left edge at the first page', async function () {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for the component
      await Promise.resolve(); // The cycle where `slotchange` event is called
      const topNav = document.querySelector('c4d-top-nav');
      const intersectionLeftSentinelNode = topNav!.shadowRoot!.querySelector(
        '.cds-sub-content-left'
      );
      MockIntersectionObserver.run(intersectionLeftSentinelNode!, false);
      const intersectionRightSentinelNode = topNav!.shadowRoot!.querySelector(
        '.cds-sub-content-right'
      );
      MockIntersectionObserver.run(intersectionRightSentinelNode!, false);
      await Promise.resolve();
      // This `_currentScrollPosition` makes the 2nd item the last visible one.
      // Given the nav has `215px` in width, it can contain the 1st item as well as the 2nd item (`175px` combined)
      // if the right caret is the only caret shown, and thus we can safely set `0` to the new scroll position
      (topNav as any)._currentScrollPosition = 110;
      (
        topNav!.shadowRoot!.querySelector('[part="prev-button"]') as HTMLElement
      ).click();
      await Promise.resolve();
      await pause(250); // Let DOM update, transition to end.
      const offsetElement = topNav!.shadowRoot!.querySelector(
        '.cds-header__nav-content'
      ) as HTMLElement;
      const offsetStyle =
        window.getComputedStyle(offsetElement).insetInlineStart;
      expect(offsetStyle).toBe('-48px');
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
    window.IntersectionObserver = origIntersectionObserver;
  });
});
