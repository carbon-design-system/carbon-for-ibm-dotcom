/**
 * Handle OnClick
 *
 * @param {*} e event object
 */
const smoothScrolling = e => {
  e.preventDefault();
  const id = e.currentTarget.getAttribute('href');
  document.querySelector(id).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};
export default smoothScrolling;
