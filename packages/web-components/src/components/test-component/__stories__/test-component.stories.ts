import { html } from 'lit-element';
import readme from './README.stories.mdx';
import '../test-component';
import { DDS_TEST_COMPONENT } from '../../../globals/internal/feature-flags';

export const Default = () =>
  !DDS_TEST_COMPONENT
    ? undefined
    : html`
        <dds-test-component>
          <h2>Hey</h2>
        </dds-test-component>
      `;

export default !DDS_TEST_COMPONENT
  ? undefined
  : {
        title: 'Components/Test Component',
        parameters: {
          ...readme.parameters,
          hasGrid: true,
        },
        decorators: [
          story => {
            return html`
              <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
                <div class="bx--row">
                  <div class="bx--col-sm-4 bx--offset-lg-4">
                    ${story()}
                  </div>
                </div>
              </div>
            `;
          },
        ],
    };
