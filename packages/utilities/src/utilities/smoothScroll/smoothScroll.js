/**
 * Handle OnClick
 *
 * @param {*} e event object
 */
const smoothScroll = e => {
  e.preventDefault();
  const id = e.currentTarget.getAttribute('href');
  document.querySelector(id).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};
export default smoothScroll;
