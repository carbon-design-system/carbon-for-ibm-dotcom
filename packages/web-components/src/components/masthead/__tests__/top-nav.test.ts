/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import MockIntersectionObserver from '../../../../tests/utils/mock-intersection-observer';
import '../top-nav';

const template = ({ width = 215 }: { width?: number } = {}) => {
  return html`
    <style>
      dds-top-nav {
        display: flex;
        width: ${width}px;
        height: 1rem;
      }

      dds-top-nav::part(nav) {
        /* Forces the nav being shown */
        display: block;
        /* Removes the padding for simpler test */
        padding: 0;
      }

      dds-top-nav::part(prev-button),
      dds-top-nav::part(next-button) {
        display: block;
      }

      .dds-ce--test--scroll-content {
        width: 100px;
        flex-grow: 0;
        flex-shrink: 0;
      }

      .dds-ce--test--scroll-content--odd {
        width: 75px;
      }
    </style>
    <dds-top-nav>
      <div class="dds-ce--test--scroll-content dds-ce--test--scroll-content--even"></div>
      <div class="dds-ce--test--scroll-content dds-ce--test--scroll-content--odd"></div>
      <div class="dds-ce--test--scroll-content dds-ce--test--scroll-content--even"></div>
      <div class="dds-ce--test--scroll-content dds-ce--test--scroll-content--odd"></div>
      <div class="dds-ce--test--scroll-content dds-ce--test--scroll-content--even"></div>
      <div class="dds-ce--test--scroll-content dds-ce--test--scroll-content--odd"></div>
      <div class="dds-ce--test--scroll-content dds-ce--test--scroll-content--even"></div>
      <div class="dds-ce--test--scroll-content dds-ce--test--scroll-content--odd"></div>
      <div class="dds-ce--test--scroll-content dds-ce--test--scroll-content--even"></div>
      <div class="dds-ce--test--scroll-content dds-ce--test--scroll-content--odd"></div>
    </dds-top-nav>
  `;
};

describe('dds-top-nav', function() {
  let origIntersectionObserver;

  beforeEach(function() {
    origIntersectionObserver = window.IntersectionObserver;
    window.IntersectionObserver = (MockIntersectionObserver as unknown) as typeof IntersectionObserver;
  });

  describe('Navigating to right', function() {
    it('should go to the next page', async function() {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for the component
      await Promise.resolve(); // The cycle where `slotchange` event is called
      const topNav = document.querySelector('dds-top-nav');
      const intersectionRightSentinelNode = topNav!.shadowRoot!.querySelector('.bx--sub-content-right');
      MockIntersectionObserver.run(intersectionRightSentinelNode!, false);
      await Promise.resolve();
      (topNav!.shadowRoot!.querySelector('[part="next-button"]') as HTMLElement).click();
      await Promise.resolve();
      expect((topNav!.shadowRoot!.querySelector('.bx--header__nav-content') as HTMLElement).style.left).toBe('-175px');
    });

    it('should support snapping to menu item', async function() {
      render(template({ width: 200 }), document.body);
      await Promise.resolve(); // Update cycle for the component
      await Promise.resolve(); // The cycle where `slotchange` event is called
      const topNav = document.querySelector('dds-top-nav');
      const intersectionRightSentinelNode = topNav!.shadowRoot!.querySelector('.bx--sub-content-right');
      MockIntersectionObserver.run(intersectionRightSentinelNode!, false);
      await Promise.resolve();
      (topNav!.shadowRoot!.querySelector('[part="next-button"]') as HTMLElement).click();
      await Promise.resolve();
      expect((topNav!.shadowRoot!.querySelector('.bx--header__nav-content') as HTMLElement).style.left).toBe('-100px');
    });

    it('should cope with change in the hidden state of the go to next page button', async function() {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for the component
      await Promise.resolve(); // The cycle where `slotchange` event is called
      const topNav = document.querySelector('dds-top-nav');
      const intersectionLeftSentinelNode = topNav!.shadowRoot!.querySelector('.bx--sub-content-left');
      MockIntersectionObserver.run(intersectionLeftSentinelNode!, false);
      const intersectionRightSentinelNode = topNav!.shadowRoot!.querySelector('.bx--sub-content-right');
      MockIntersectionObserver.run(intersectionRightSentinelNode!, false);
      await Promise.resolve();
      (topNav as any)._currentScrollPosition = 565;
      (topNav!.shadowRoot!.querySelector('[part="next-button"]') as HTMLElement).click();
      await Promise.resolve();
      expect((topNav!.shadowRoot!.querySelector('.bx--header__nav-content') as HTMLElement).style.left).toBe('-625px');
    });

    it('should snap to the right edge at the last page', async function() {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for the component
      await Promise.resolve(); // The cycle where `slotchange` event is called
      const topNav = document.querySelector('dds-top-nav');
      const intersectionLeftSentinelNode = topNav!.shadowRoot!.querySelector('.bx--sub-content-left');
      MockIntersectionObserver.run(intersectionLeftSentinelNode!, false);
      const intersectionRightSentinelNode = topNav!.shadowRoot!.querySelector('.bx--sub-content-right');
      MockIntersectionObserver.run(intersectionRightSentinelNode!, false);
      await Promise.resolve();
      (topNav as any)._currentScrollPosition = 690;
      (topNav!.shadowRoot!.querySelector('[part="next-button"]') as HTMLElement).click();
      await Promise.resolve();
      expect((topNav!.shadowRoot!.querySelector('.bx--header__nav-content') as HTMLElement).style.left).toBe('-700px');
    });
  });

  describe('Navigating to left', function() {
    it('should go to the next page', async function() {
      render(template({ width: 255 }), document.body);
      await Promise.resolve(); // Update cycle for the component
      await Promise.resolve(); // The cycle where `slotchange` event is called
      const topNav = document.querySelector('dds-top-nav');
      const intersectionLeftSentinelNode = topNav!.shadowRoot!.querySelector('.bx--sub-content-left');
      MockIntersectionObserver.run(intersectionLeftSentinelNode!, false);
      const intersectionRightSentinelNode = topNav!.shadowRoot!.querySelector('.bx--sub-content-right');
      MockIntersectionObserver.run(intersectionRightSentinelNode!, false);
      await Promise.resolve();
      (topNav as any)._currentScrollPosition = 350;
      (topNav!.shadowRoot!.querySelector('[part="prev-button"]') as HTMLElement).click();
      await Promise.resolve();
      expect((topNav!.shadowRoot!.querySelector('.bx--header__nav-content') as HTMLElement).style.left).toBe('0px');
    });

    it('should support snapping to menu item', async function() {
      render(template({ width: 250 }), document.body);
      await Promise.resolve(); // Update cycle for the component
      await Promise.resolve(); // The cycle where `slotchange` event is called
      const topNav = document.querySelector('dds-top-nav');
      const intersectionLeftSentinelNode = topNav!.shadowRoot!.querySelector('.bx--sub-content-left');
      MockIntersectionObserver.run(intersectionLeftSentinelNode!, false);
      const intersectionRightSentinelNode = topNav!.shadowRoot!.querySelector('.bx--sub-content-right');
      MockIntersectionObserver.run(intersectionRightSentinelNode!, false);
      await Promise.resolve();
      (topNav as any)._currentScrollPosition = 350;
      (topNav!.shadowRoot!.querySelector('[part="prev-button"]') as HTMLElement).click();
      await Promise.resolve();
      expect((topNav!.shadowRoot!.querySelector('.bx--header__nav-content') as HTMLElement).style.left).toBe('0px');
    });

    it('should cope with change in the hidden state of the go to previous page button', async function() {
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for the component
      await Promise.resolve(); // The cycle where `slotchange` event is called
      const topNav = document.querySelector('dds-top-nav');
      const intersectionLeftSentinelNode = topNav!.shadowRoot!.querySelector('.bx--sub-content-left');
      MockIntersectionObserver.run(intersectionLeftSentinelNode!, false);
      const intersectionRightSentinelNode = topNav!.shadowRoot!.querySelector('.bx--sub-content-right');
      MockIntersectionObserver.run(intersectionRightSentinelNode!, false);
      await Promise.resolve();
      (topNav as any)._currentScrollPosition = 175;
      (topNav!.shadowRoot!.querySelector('[part="prev-button"]') as HTMLElement).click();
      await Promise.resolve();
      expect((topNav!.shadowRoot!.querySelector('.bx--header__nav-content') as HTMLElement).style.left).toBe('0px');
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
    window.IntersectionObserver = origIntersectionObserver;
  });
});
