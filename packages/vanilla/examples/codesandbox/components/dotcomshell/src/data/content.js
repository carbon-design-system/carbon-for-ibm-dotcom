/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "carbon-components/scss/components/button/_button.scss";
import "carbon-components/scss/components/data-table/_data-table.scss";
import "carbon-components/scss/components/structured-list/_structured-list.scss";

const content = `<div class="bx--grid">
  <div class="bx--row">
    <div class="bx--col-lg-8">
      <h1>Some random content</h1>
      <p style="padding-bottom: 1rem;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  </div>
  <div class="bx--row">
    <div class="bx--col-lg-10" style="padding-top: 4rem;">
      <h1>Carbon structured list</h1>
      <section class="bx--structured-list" aria-label="Structured list section">
        <div class="bx--structured-list-thead">
          <div class="bx--structured-list-row bx--structured-list-row--header-row">
            <div class="bx--structured-list-th">ColumnA</div>
            <div class="bx--structured-list-th">ColumnB</div>
            <div class="bx--structured-list-th">ColumnC</div>
          </div>
        </div>
        <div class="bx--structured-list-tbody">
          <div class="bx--structured-list-row">
            <div class="bx--structured-list-td bx--structured-list-content--nowrap">Row 1</div>
            <div class="bx--structured-list-td">Row 1</div>
            <div class="bx--structured-list-td">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</div>
          </div>
          <div class="bx--structured-list-row">
            <div class="bx--structured-list-td bx--structured-list-content--nowrap">Row 2</div>
            <div class="bx--structured-list-td">Row 2</div>
            <div class="bx--structured-list-td">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <div class="bx--row">
    <div class="bx--col-lg-5" style="padding-top: 0rem;">
      <h1>Some info about this data table</h1>
      <p style="padding-bottom: 2rem;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <div class="bx--col-lg-7" style="padding-top: 0rem;">
      <table class="bx--skeleton bx--data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Protocol</th>
            <th>Port</th>
            <th>Rule</th>
            <th>Attached Groups</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
            <td><span></span></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="bx--row" style="margin-top: 5rem; background-color: rgb(243, 243, 243); padding-top: 2rem; padding-bottom: 2rem; padding-right: 2rem;">
    <div class="bx--col-md-2" style="padding-bottom: 2rem; padding-top: 2rem;">
      <h5>Content card</h5>
      <p style="padding-bottom: 2rem; padding-top: 2rem;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <div class="bx--col-md-2" style="padding-bottom: 2rem; padding-top: 2rem;">
      <div style="padding: 2rem; background-color: rgb(255, 255, 255);">
        <h5>Content card</h5>
        <p style="padding-bottom: 2rem; padding-top: 2rem;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p style="padding-bottom: 2rem;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <button tabindex="0" class="bx--btn bx--btn--primary" type="button">Click me</button>
      </div>
    </div>
    <div class="bx--col-md-2" style="padding-bottom: 2rem; padding-top: 2rem;">
      <div style="padding: 2rem; background-color: rgb(255, 255, 255);">
        <h5>Content card</h5>
        <p style="padding-bottom: 2rem; padding-top: 2rem;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p style="padding-bottom: 2rem;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <button tabindex="0" class="bx--btn bx--btn--primary" type="button">Click me</button>
      </div>
    </div>
    <div class="bx--col-md-2" style="padding-bottom: 2rem; padding-top: 2rem;">
      <div style="padding: 2rem; background-color: rgb(255, 255, 255);">
        <h5>Content card</h5>
        <p style="padding-bottom: 2rem; padding-top: 2rem;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p style="padding-bottom: 2rem;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <button tabindex="0" class="bx--btn bx--btn--primary" type="button">Click me</button>
      </div>
    </div>
  </div>
</div>`;

export default content;
