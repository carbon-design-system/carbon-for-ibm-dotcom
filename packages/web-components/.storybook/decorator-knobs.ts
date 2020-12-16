/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * A Storybook decorator that mixes in knobs data from `parameters.knobs` to `parameters.props`.
 * @param story The story to decorate.
 * @param parameters The story parameters.
 * @returns The decorated story.
 */
function decoratorKnobs(story, { parameters }) {
  const { knobs } = parameters;
  if (Object(knobs) === knobs) {
    if (!parameters.props) {
      parameters.props = {};
    }
    Object.keys(knobs).forEach(name => {
      if (!parameters.props[name]) {
        parameters.props[name] = {};
      }
      if (typeof knobs[name] === 'function') {
        Object.assign(parameters.props[name], knobs[name]({ groupId: name }));
      }
    });
  }
  return story();
}

export default decoratorKnobs;
