/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import EventManager from '../../../../tests/utils/event-manager';
/* eslint-disable import/no-duplicates */
import DDSFooterNavGroup from '../footer-nav-group';
// Above import is interface-only ref and thus code won't be brought into the build
import '../footer-nav-group';
/* eslint-enable import/no-duplicates */
import '../footer-nav-item';

const template = (props?) => {
  const { open, titleText } = props ?? {};
  return html`
    <dds-footer-nav-group ?open="${open}" title-text="${ifNonNull(titleText)}">
      <dds-footer-nav-item ?open="${open}"></dds-footer-nav-item>
    </dds-footer-nav-group>
  `;
};

class MockMediaQueryList {
  private _matches = false;

  constructor(matches: boolean) {
    this._matches = matches;
  }

  addListener(fn: EventListener) {
    const { _matches: matches } = this;
    fn(({ matches } as unknown) as Event);
  }

  removeListener() {} // eslint-disable-line class-methods-use-this
}

describe('dds-footer-nav-group', function() {
  const events = new EventManager();

  describe('Misc attributes', function() {
    it('should render with minimum attributes for narrow screen', async function() {
      spyOn(window, 'matchMedia').and.returnValue(new MockMediaQueryList(false));
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-footer-nav-group>`
      expect(document.body.querySelector('dds-footer-nav-group')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with minimum attributes for wide screen', async function() {
      spyOn(window, 'matchMedia').and.returnValue(new MockMediaQueryList(true));
      render(template(), document.body);
      await Promise.resolve(); // Update cycle for `<dds-footer-nav-group>`
      expect(document.body.querySelector('dds-footer-nav-group')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes for narrow screen', async function() {
      spyOn(window, 'matchMedia').and.returnValue(new MockMediaQueryList(false));
      render(template({ open: true, titleText: 'title-text-foo' }), document.body);
      await Promise.resolve(); // Update cycle for `<dds-footer-nav-group>`
      expect(document.body.querySelector('dds-footer-nav-group')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes for wide screen', async function() {
      spyOn(window, 'matchMedia').and.returnValue(new MockMediaQueryList(true));
      render(template({ open: true, titleText: 'title-text-foo' }), document.body);
      await Promise.resolve(); // Update cycle for `<dds-footer-nav-group>`
      expect(document.body.querySelector('dds-footer-nav-group')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Toggling', function() {
    let group: DDSFooterNavGroup | null;

    beforeEach(async function() {
      spyOn(window, 'matchMedia').and.returnValue(new MockMediaQueryList(false));
      render(template(), document.body);
      await Promise.resolve();
      group = document.body.querySelector('dds-footer-nav-group');
    });

    it('Should open and close the item', async function() {
      group!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      expect(group!.open).toBe(true);

      group!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      expect(group!.open).toBe(false);
    });

    it('Should have ESC key close the item', async function() {
      render(template({ open: true }), document.body);
      await Promise.resolve();
      group = document.body.querySelector('dds-footer-nav-group');

      const event = new CustomEvent('keydown', { bubbles: true, composed: true });
      group!.shadowRoot!.querySelector('button')!.dispatchEvent(Object.assign(event, { key: 'Escape' }));
      await Promise.resolve();
      expect(group!.open).toBe(false);
    });

    it('Should have legacy ESC key close the item', async function() {
      render(template({ open: true }), document.body);
      await Promise.resolve();
      group = document.body.querySelector('dds-footer-nav-group');

      const event = new CustomEvent('keydown', { bubbles: true, composed: true });
      group!.shadowRoot!.querySelector('button')!.dispatchEvent(Object.assign(event, { key: 'Esc' }));
      await Promise.resolve();
      expect(group!.open).toBe(false);
    });

    it('Should fire dds-footer-nav-group-beingtoggled/dds-footer-nav-group-toggled events upon opening', async function() {
      const spyBeforeToggle = jasmine.createSpy('before toggle');
      const spyAfterToggle = jasmine.createSpy('after toggle');
      events.on(group!, 'dds-footer-nav-group-beingtoggled', spyBeforeToggle);
      events.on(group!, 'dds-footer-nav-group-toggled', spyAfterToggle);
      group!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      expect(spyBeforeToggle).toHaveBeenCalled();
      expect(spyAfterToggle).toHaveBeenCalled();
    });

    it('Should fire dds-footer-nav-group-beingtoggled/dds-footer-nav-group-toggled events upon closing', async function() {
      render(template({ open: true }), document.body);
      await Promise.resolve();
      group = document.body.querySelector('dds-footer-nav-group');
      const spyBeforeToggle = jasmine.createSpy('before toggle');
      const spyAfterToggle = jasmine.createSpy('after toggle');
      events.on(group!, 'dds-footer-nav-group-beingtoggled', spyBeforeToggle);
      events.on(group!, 'dds-footer-nav-group-toggled', spyAfterToggle);
      const event = new CustomEvent('keydown', { bubbles: true, composed: true });
      group!.shadowRoot!.querySelector('button')!.dispatchEvent(Object.assign(event, { key: 'Escape' }));
      await Promise.resolve();
      expect(spyBeforeToggle).toHaveBeenCalled();
      expect(spyAfterToggle).toHaveBeenCalled();
    });

    it('Should support preventing footer nav group from being opened upon user gesture', async function() {
      const spyAfterToggle = jasmine.createSpy('after toggle');
      events.on(group!, 'dds-footer-nav-group-beingtoggled', event => {
        event.preventDefault();
      });
      events.on(group!, 'dds-footer-nav-group-toggled', spyAfterToggle);
      group!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      expect(spyAfterToggle).not.toHaveBeenCalled();
    });

    it('Should support preventing footer nav group from being closed upon user gesture', async function() {
      render(template({ open: true }), document.body);
      await Promise.resolve();
      group = document.body.querySelector('dds-footer-nav-group');
      const spyAfterToggle = jasmine.createSpy('after toggle');
      events.on(group!, 'dds-footer-nav-group-beingtoggled', event => {
        event.preventDefault();
      });
      events.on(group!, 'dds-footer-nav-group-toggled', spyAfterToggle);
      const event = new CustomEvent('keydown', { bubbles: true, composed: true });
      group!.shadowRoot!.querySelector('button')!.dispatchEvent(Object.assign(event, { key: 'Escape' }));
      await Promise.resolve();
      expect(spyAfterToggle).not.toHaveBeenCalled();
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
    events.reset();
  });
});
