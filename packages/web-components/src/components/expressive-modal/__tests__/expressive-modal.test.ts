/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit/html.js';
import EventManager from '../../../../tests/utils/event-manager';
import C4DExpressiveModal from '../expressive-modal';
import '../../../internal/vendor/@carbon/web-components/components/button/button';
import CDSModalCloseButton from '../../../internal/vendor/@carbon/web-components/components/modal/modal-close-button';
import { EXPRESSIVE_MODAL_SIZE } from '../defs';
import { Default } from '../__stories__/expressive-modal.stories';

const template = (props?) =>
  Default({
    Modal: props,
  });

describe('c4d-expressive-modal', function () {
  const events = new EventManager();

  describe('Misc attributes', function () {
    it('should render with minimum attributes', async function () {
      render(template(), document.body);
      await Promise.resolve(); // First update cycle
      await Promise.resolve(); // Update cycle for `_hasHeader`
      await Promise.resolve(); // Update cycle for `_hasBody`
      await Promise.resolve(); // Update cycle for `_hasFooter`
      expect(
        document.body.querySelector('c4d-expressive-modal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function () {
      render(
        template({
          expressiveSize: EXPRESSIVE_MODAL_SIZE.FULL_WIDTH,
          open: true,
        }),
        document.body
      );
      await Promise.resolve(); // First update cycle
      await Promise.resolve(); // Update cycle for `_hasHeader`
      await Promise.resolve(); // Update cycle for `_hasBody`
      await Promise.resolve(); // Update cycle for `_hasFooter`
      expect(
        document.body.querySelector('c4d-expressive-modal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Misc contents', function () {
    it('should render with header only', async function () {
      render(
        html`
          <c4d-expressive-modal>
            <c4d-expressive-modal-header></c4d-expressive-modal-header>
          </c4d-expressive-modal>
        `,
        document.body
      );
      await Promise.resolve(); // First update cycle
      await Promise.resolve(); // Update cycle for `_hasHeader`
      await Promise.resolve(); // Update cycle for `_hasBody`
      await Promise.resolve(); // Update cycle for `_hasFooter`
      expect(
        document.body.querySelector('c4d-expressive-modal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with header and body only', async function () {
      render(
        html`
          <c4d-expressive-modal>
            <c4d-expressive-modal-header></c4d-expressive-modal-header>
            <c4d-expressive-modal-body></c4d-expressive-modal-body>
          </c4d-expressive-modal>
        `,
        document.body
      );
      await Promise.resolve(); // First update cycle
      await Promise.resolve(); // Update cycle for `_hasHeader`
      await Promise.resolve(); // Update cycle for `_hasBody`
      await Promise.resolve(); // Update cycle for `_hasFooter`
      expect(
        document.body.querySelector('c4d-expressive-modal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with header and footer only', async function () {
      render(
        html`
          <c4d-expressive-modal>
            <c4d-expressive-modal-header></c4d-expressive-modal-header>
            <c4d-expressive-modal-footer></c4d-expressive-modal-footer>
          </c4d-expressive-modal>
        `,
        document.body
      );
      await Promise.resolve(); // First update cycle
      await Promise.resolve(); // Update cycle for `_hasHeader`
      await Promise.resolve(); // Update cycle for `_hasBody`
      await Promise.resolve(); // Update cycle for `_hasFooter`
      expect(
        document.body.querySelector('c4d-expressive-modal')
      ).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  xdescribe('Showing/hiding', function () {
    it('Should support using Carbon core primary button in footer as the primary focus element', async function () {
      render(
        html`
          <c4d-expressive-modal>
            <input type="text" />
            <c4d-expressive-modal-footer
              ><cds-btn kind="primary"></cds-btn
            ></c4d-expressive-modal-footer>
          </c4d-expressive-modal>
        `,
        document.body
      );
      await Promise.resolve();
      const modal = document.querySelector(
        'c4d-expressive-modal'
      ) as C4DExpressiveModal;
      const input = modal.querySelector('input') as HTMLInputElement;
      const button = modal.querySelector('cds-btn') as HTMLButtonElement;
      spyOn(modal as any, '_waitForTransitionEnd').and.callFake(() => {});
      spyOn(input, 'focus');
      spyOn(button, 'focus');
      modal.open = true;
      await Promise.resolve(); // For triggering the update cycle of `<cds-modal>`
      await Promise.resolve(); // `update()` in `<cds-modal>` waits for child nodes' update cycles to run
      expect(input.focus).not.toHaveBeenCalled();
      expect(button.focus).toHaveBeenCalled();
    });

    it('Should support using primary button in footer as the primary focus element', async function () {
      render(
        html`
          <c4d-expressive-modal>
            <input type="text" />
            <c4d-expressive-modal-footer
              ><c4d-button kind="primary"></c4d-button
            ></c4d-expressive-modal-footer>
          </c4d-expressive-modal>
        `,
        document.body
      );
      await Promise.resolve();
      const modal = document.querySelector(
        'c4d-expressive-modal'
      ) as C4DExpressiveModal;
      const input = modal.querySelector('input') as HTMLInputElement;
      const button = modal.querySelector('c4d-button') as HTMLButtonElement;
      spyOn(modal as any, '_waitForTransitionEnd').and.callFake(() => {});
      spyOn(input, 'focus');
      spyOn(button, 'focus');
      modal.open = true;
      await Promise.resolve(); // For triggering the update cycle of `<c4d-expressive-modal>`
      await Promise.resolve(); // `update()` in `<c4d-expressive-modal>` waits for child nodes' update cycles to run
      expect(input.focus).not.toHaveBeenCalled();
      expect(button.focus).toHaveBeenCalled();
    });

    it('Should support specifying the primary focus element', async function () {
      render(
        html`
          <c4d-expressive-modal>
            <input type="text" />
            <button data-modal-primary-focus></button>
          </c4d-expressive-modal>
        `,
        document.body
      );
      await Promise.resolve();
      const modal = document.querySelector(
        'c4d-expressive-modal'
      ) as C4DExpressiveModal;
      const input = modal.querySelector('input') as HTMLInputElement;
      const button = modal.querySelector('button') as HTMLButtonElement;
      spyOn(modal as any, '_waitForTransitionEnd').and.callFake(() => {});
      spyOn(input, 'focus');
      spyOn(button, 'focus');
      modal.open = true;
      await Promise.resolve(); // For triggering the update cycle of `<c4d-expressive-modal>`
      await Promise.resolve(); // `update()` in `<c4d-expressive-modal>` waits for child nodes' update cycles to run
      expect(input.focus).not.toHaveBeenCalled();
      expect(button.focus).toHaveBeenCalled();
    });

    it('Should support Carbon core close button', async function () {
      render(
        html`
          <c4d-expressive-modal open
            ><cds-modal-close-button></cds-modal-close-button
          ></c4d-expressive-modal>
        `,
        document.body
      );
      await Promise.resolve();
      (
        document.querySelector('cds-modal-close-button') as CDSModalCloseButton
      ).click();
      await Promise.resolve();
      expect(
        (document.querySelector('c4d-expressive-modal') as C4DExpressiveModal)
          .open
      ).toBeFalsy();
    });

    it('Should support close button', async function () {
      render(
        html`
          <c4d-expressive-modal open
            ><c4d-expressive-modal-close-button></c4d-expressive-modal-close-button
          ></c4d-expressive-modal>
        `,
        document.body
      );
      await Promise.resolve();
      (
        document.querySelector(
          'c4d-expressive-modal-close-button'
        ) as HTMLElement
      ).click();
      await Promise.resolve();
      expect(
        (document.querySelector('c4d-expressive-modal') as C4DExpressiveModal)
          .open
      ).toBeFalsy();
    });

    it('Should support custom close button', async function () {
      render(
        html`
          <c4d-expressive-modal open
            ><button data-modal-close></button
          ></c4d-expressive-modal>
        `,
        document.body
      );
      await Promise.resolve();
      (document.querySelector('[data-modal-close]') as HTMLElement).click();
      await Promise.resolve();
      expect(
        (document.querySelector('c4d-expressive-modal') as C4DExpressiveModal)
          .open
      ).toBeFalsy();
    });
  });

  describe('Supporting click-outside gesture', function () {
    let elem: HTMLElement | null;

    beforeEach(async function () {
      render(template({ open: true }), document.body);
      await Promise.resolve();
      elem = document.querySelector('c4d-expressive-modal');
    });

    it('Should close the modal', async function () {
      const spyBeforeClosed = jasmine.createSpy('before closed');
      const spyAfterClosed = jasmine.createSpy('after closed');
      events.on(elem!, 'c4d-expressive-modal-beingclosed', spyBeforeClosed);
      events.on(elem!, 'c4d-expressive-modal-closed', spyAfterClosed);
      elem!.click();
      await Promise.resolve();
      expect((elem as C4DExpressiveModal).open).toBeFalsy();
      expect(spyBeforeClosed).toHaveBeenCalled();
      expect(spyAfterClosed).toHaveBeenCalled();
      const eventDataBeforeHidden = spyBeforeClosed.calls.argsFor(0)[0].detail;
      const eventDataAfterHidden = spyAfterClosed.calls.argsFor(0)[0].detail;
      expect(eventDataBeforeHidden.triggeredBy).toBe(elem);
      expect(eventDataAfterHidden.triggeredBy).toBe(elem);
    });

    it('Should provide a way to prevent the modal from being closed', async function () {
      const spyBeforeClosed = jasmine.createSpy('before closed');
      const spyAfterClosed = jasmine.createSpy('after closed');
      events.on(elem!, 'c4d-expressive-modal-beingclosed', spyBeforeClosed);
      events.on(elem!, 'c4d-expressive-modal-closed', spyAfterClosed);
      elem!.click();
      await Promise.resolve();
      expect((elem as C4DExpressiveModal).open).toBeFalsy();
      expect(spyBeforeClosed).toHaveBeenCalled();
      expect(spyAfterClosed).toHaveBeenCalled();
      const eventDataBeforeHidden = spyBeforeClosed.calls.argsFor(0)[0].detail;
      const eventDataAfterHidden = spyAfterClosed.calls.argsFor(0)[0].detail;
      expect(eventDataBeforeHidden.triggeredBy).toBe(elem);
      expect(eventDataAfterHidden.triggeredBy).toBe(elem);
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
    events.reset();
  });
});
