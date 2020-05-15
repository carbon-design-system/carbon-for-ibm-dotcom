import './markdown.css';
import README from '../../README.md';
import showdown from 'showdown';

export default {
  title: 'Overview|Get Started',
};

export const Default = () => {
  const converter = new showdown.Converter();
  return `<div class="storybook-center-container"><div class="markdown-body">${converter.makeHtml(
    README
  )}</div></div>`;
};

Default.story = {
  title: 'Read Me',
};
