import initStoryshots from '@storybook/addon-storyshots';
import path from 'path';

/**
 * This will initialize storyshots for snapshot testing.
 * NOTE: If a molecule/organism requires deeper testing, a __tests__ folder must be created in the corresponding folder
 * and create additional tests in there.
 */
initStoryshots({
  configPath: path.resolve(__dirname, '../../../.storybook'),
  framework: 'html',
});
