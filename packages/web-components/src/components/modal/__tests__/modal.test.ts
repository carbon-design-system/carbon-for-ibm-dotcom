/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import EventManager from '../../../../tests/utils/event-manager';
import DDSModal, { DDS_MODAL_SIZE } from '../modal';
import { Default } from '../__stories__/modal.stories';

const template = (props?) =>
  Default({
    parameters: {
      props: {
        'dds-modal': props,
      },
    },
  });

describe('dds-modal', function() {
  const events = new EventManager();

  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve(); // First update cycle
      await Promise.resolve(); // Update cycle for `_hasHeader`
      await Promise.resolve(); // Update cycle for `_hasBody`
      await Promise.resolve(); // Update cycle for `_hasFooter`
      expect(document.body.querySelector('dds-modal')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          expressiveSize: DDS_MODAL_SIZE.FULL_WIDTH,
          open: true,
        }),
        document.body
      );
      await Promise.resolve(); // First update cycle
      await Promise.resolve(); // Update cycle for `_hasHeader`
      await Promise.resolve(); // Update cycle for `_hasBody`
      await Promise.resolve(); // Update cycle for `_hasFooter`
      expect(document.body.querySelector('dds-modal')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Misc contents', function() {
    it('should render with header only', async function() {
      render(
        html`
          <dds-modal>
            <dds-modal-header></dds-modal-header>
          </dds-modal>
        `,
        document.body
      );
      await Promise.resolve(); // First update cycle
      await Promise.resolve(); // Update cycle for `_hasHeader`
      await Promise.resolve(); // Update cycle for `_hasBody`
      await Promise.resolve(); // Update cycle for `_hasFooter`
      expect(document.body.querySelector('dds-modal')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with header and body only', async function() {
      render(
        html`
          <dds-modal><dds-modal-header></dds-modal-header><dds-modal-body></dds-modal-body></dds-modal>
        `,
        document.body
      );
      await Promise.resolve(); // First update cycle
      await Promise.resolve(); // Update cycle for `_hasHeader`
      await Promise.resolve(); // Update cycle for `_hasBody`
      await Promise.resolve(); // Update cycle for `_hasFooter`
      expect(document.body.querySelector('dds-modal')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with header and footer only', async function() {
      render(
        html`
          <dds-modal>
            <dds-modal-header></dds-modal-header>
            <dds-modal-footer></dds-modal-footer>
          </dds-modal>
        `,
        document.body
      );
      await Promise.resolve(); // First update cycle
      await Promise.resolve(); // Update cycle for `_hasHeader`
      await Promise.resolve(); // Update cycle for `_hasBody`
      await Promise.resolve(); // Update cycle for `_hasFooter`
      expect(document.body.querySelector('dds-modal')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Showing/hiding', function() {
    it('Should support using Carbob core primary button in footer as the primary focus element', async function() {
      render(
        html`
          <dds-modal>
            <input type="text" /><dds-modal-footer><bx-btn kind="primary"></bx-btn></dds-modal-footer>
          </dds-modal>
        `,
        document.body
      );
      await Promise.resolve();
      const modal = document.querySelector('dds-modal') as DDSModal;
      const input = modal.querySelector('input') as HTMLInputElement;
      const button = modal.querySelector('bx-btn') as HTMLButtonElement;
      spyOn(input, 'focus');
      spyOn(button, 'focus');
      modal.open = true;
      await Promise.resolve(); // For triggering the update cycle of `<bx-modal>`
      await Promise.resolve(); // `update()` in `<bx-modal>` waits for child nodes' update cycles to run
      expect(input.focus).not.toHaveBeenCalled();
      expect(button.focus).toHaveBeenCalled();
    });

    it('Should support using primary button in footer as the primary focus element', async function() {
      render(
        html`
          <dds-modal>
            <input type="text" /><dds-modal-footer><dds-btn kind="primary"></dds-btn></dds-modal-footer>
          </dds-modal>
        `,
        document.body
      );
      await Promise.resolve();
      const modal = document.querySelector('dds-modal') as DDSModal;
      const input = modal.querySelector('input') as HTMLInputElement;
      const button = modal.querySelector('dds-btn') as HTMLButtonElement;
      spyOn(input, 'focus');
      spyOn(button, 'focus');
      modal.open = true;
      await Promise.resolve(); // For triggering the update cycle of `<dds-modal>`
      await Promise.resolve(); // `update()` in `<dds-modal>` waits for child nodes' update cycles to run
      expect(input.focus).not.toHaveBeenCalled();
      expect(button.focus).toHaveBeenCalled();
    });

    it('Should support specifying the primary focus element', async function() {
      render(
        html`
          <dds-modal><input type="text"/><button data-modal-primary-focus></button></dds-modal>
        `,
        document.body
      );
      await Promise.resolve();
      const modal = document.querySelector('dds-modal') as DDSModal;
      const input = modal.querySelector('input') as HTMLInputElement;
      const button = modal.querySelector('button') as HTMLButtonElement;
      spyOn(input, 'focus');
      spyOn(button, 'focus');
      modal.open = true;
      await Promise.resolve(); // For triggering the update cycle of `<dds-modal>`
      await Promise.resolve(); // `update()` in `<dds-modal>` waits for child nodes' update cycles to run
      expect(input.focus).not.toHaveBeenCalled();
      expect(button.focus).toHaveBeenCalled();
    });

    it('Should support Carbon core close button', async function() {
      render(
        html`
          <dds-modal open><bx-modal-close-button></bx-modal-close-button></dds-modal>
        `,
        document.body
      );
      await Promise.resolve();
      (document.querySelector('bx-modal-close-button') as HTMLElement).click();
      await Promise.resolve();
      expect((document.querySelector('dds-modal') as DDSModal).open).toBeFalsy();
    });

    it('Should support close button', async function() {
      render(
        html`
          <dds-modal open><dds-modal-close-button></dds-modal-close-button></dds-modal>
        `,
        document.body
      );
      await Promise.resolve();
      (document.querySelector('dds-modal-close-button') as HTMLElement).click();
      await Promise.resolve();
      expect((document.querySelector('dds-modal') as DDSModal).open).toBeFalsy();
    });

    it('Should support custom close button', async function() {
      render(
        html`
          <dds-modal open><button data-modal-close></button></dds-modal>
        `,
        document.body
      );
      await Promise.resolve();
      (document.querySelector('[data-modal-close]') as HTMLElement).click();
      await Promise.resolve();
      expect((document.querySelector('dds-modal') as DDSModal).open).toBeFalsy();
    });
  });

  describe('Supporting click-outside gesture', function() {
    let elem: HTMLElement | null;

    beforeEach(async function() {
      render(template({ open: true }), document.body);
      await Promise.resolve();
      elem = document.querySelector('dds-modal');
    });

    it('Should close the modal', async function() {
      const spyBeforeClosed = jasmine.createSpy('before closed');
      const spyAfterClosed = jasmine.createSpy('after closed');
      events.on(elem!, 'dds-modal-beingclosed', spyBeforeClosed);
      events.on(elem!, 'dds-modal-closed', spyAfterClosed);
      elem!.click();
      await Promise.resolve();
      expect((elem as DDSModal).open).toBeFalsy();
      expect(spyBeforeClosed).toHaveBeenCalled();
      expect(spyAfterClosed).toHaveBeenCalled();
      const eventDataBeforeHidden = spyBeforeClosed.calls.argsFor(0)[0].detail;
      const eventDataAfterHidden = spyAfterClosed.calls.argsFor(0)[0].detail;
      expect(eventDataBeforeHidden.triggeredBy).toBe(elem);
      expect(eventDataAfterHidden.triggeredBy).toBe(elem);
    });

    it('Should provide a way to prevent the modal from being closed', async function() {
      const spyBeforeClosed = jasmine.createSpy('before closed');
      const spyAfterClosed = jasmine.createSpy('after closed');
      events.on(elem!, 'dds-modal-beingclosed', spyBeforeClosed);
      events.on(elem!, 'dds-modal-closed', spyAfterClosed);
      elem!.click();
      await Promise.resolve();
      expect((elem as DDSModal).open).toBeFalsy();
      expect(spyBeforeClosed).toHaveBeenCalled();
      expect(spyAfterClosed).toHaveBeenCalled();
      const eventDataBeforeHidden = spyBeforeClosed.calls.argsFor(0)[0].detail;
      const eventDataAfterHidden = spyAfterClosed.calls.argsFor(0)[0].detail;
      expect(eventDataBeforeHidden.triggeredBy).toBe(elem);
      expect(eventDataAfterHidden.triggeredBy).toBe(elem);
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
    events.reset();
  });
});
