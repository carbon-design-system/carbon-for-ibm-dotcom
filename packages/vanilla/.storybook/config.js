import './_container.scss';
import requireContext from 'require-context.macro';
import { configure, addParameters, addDecorator } from '@storybook/html';
import { addReadme } from 'storybook-readme/html';

const SORT_ORDER_GROUP = ['Overview', 'Components'];

addParameters({
  options: {
    name: `IBM.com Library Vanilla Components`,
    url: 'https://github.com/carbon-design-system/ibm-dotcom-library',
    storySort(lhs, rhs) {
      const { kind: lhsKind } = lhs[1];
      const { kind: rhsKind } = rhs[1];
      const lhsGroup = lhsKind.split('|')[0];
      const rhsGroup = rhsKind.split('|')[0];
      const lhsSortOrder = SORT_ORDER_GROUP.indexOf(lhsGroup);
      const rhsSortOrder = SORT_ORDER_GROUP.indexOf(rhsGroup);
      if (lhsSortOrder >= 0 && rhsSortOrder >= 0) {
        return lhsSortOrder - rhsSortOrder;
      }
      return 0;
    },
  },
});

addDecorator(addReadme);

const components = requireContext('../src', true, /(overview|\.stories)\.js$/);
configure(components, module);
