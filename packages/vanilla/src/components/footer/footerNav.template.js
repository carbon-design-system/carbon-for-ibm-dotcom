import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders footer nav for tall
 *
 * @param {object} footerMenu Footer menu data
 * @returns {string} footer nav html output
 */
function footerNavTemplate(footerMenu) {
  console.log('footerMenu', footerMenu);
  return `
  <nav data-autoid="${stablePrefix}--footer-nav" class="${prefix}--footer-nav">
    <ul class="${prefix}--accordion ${prefix}--footer-nav__container">
      <li class="${prefix}--accordion__item ${prefix}--footer-nav-group" data-autoid="${stablePrefix}--footer-nav-group"><button aria-expanded="false" class="${prefix}--accordion__heading" title="Expand/Collapse" type="button"><svg focusable="false"
            preserveAspectRatio="xMidYMid meet" aria-label="Expand/Collapse" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" class="${prefix}--accordion__arrow" style="will-change: transform;">
            <path d="M11 8l-5 5-.7-.7L9.6 8 5.3 3.7 6 3z"></path>
          </svg>
          <div class="${prefix}--accordion__title">Discover</div>
        </button>
        <div class="${prefix}--accordion__content">
          <h2 class="${prefix}--footer-nav-group__title">Discover</h2>
          <ul>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.ibm.com/products?lnk=fdi" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Marketplace</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.redbooks.ibm.com/?lnk=fdi" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Redbooks</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.ibm.com/services?lnk=fdi" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Services</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.ibm.com/industries?lnk=fdi" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Industries</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://research.ibm.com/?lnk=fdi" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">IBM Research</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.ibm.com/case-studies?lnk=fdi" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Case studies</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.ibm.com/demos/?lnk=fdi" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Demos</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.ibm.com/financing?ref=ibmfooter&amp;amp;lnk=fdi" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Financing</a></li>
          </ul>
        </div>
      </li>
      <li class="${prefix}--accordion__item ${prefix}--footer-nav-group" data-autoid="${stablePrefix}--footer-nav-group"><button aria-expanded="false" class="${prefix}--accordion__heading" title="Expand/Collapse" type="button"><svg focusable="false"
            preserveAspectRatio="xMidYMid meet" aria-label="Expand/Collapse" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" class="${prefix}--accordion__arrow" style="will-change: transform;">
            <path d="M11 8l-5 5-.7-.7L9.6 8 5.3 3.7 6 3z"></path>
          </svg>
          <div class="${prefix}--accordion__title">Information for...</div>
        </button>
        <div class="${prefix}--accordion__content">
          <h2 class="${prefix}--footer-nav-group__title">Information for...</h2>
          <ul>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.ibm.com/developerworks/?lnk=fif" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Developers</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www-356.ibm.com/partnerworld/wps/servlet/ContentHandler/partnerworld-home?lnk=fif" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Business
                Partners</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.ibm.com/industries/sled-contracts?lnk=fif" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Federal and state contracts</a></li>
          </ul>
        </div>
      </li>
      <li class="${prefix}--accordion__item ${prefix}--footer-nav-group" data-autoid="${stablePrefix}--footer-nav-group"><button aria-expanded="false" class="${prefix}--accordion__heading" title="Expand/Collapse" type="button"><svg focusable="false"
            preserveAspectRatio="xMidYMid meet" aria-label="Expand/Collapse" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" class="${prefix}--accordion__arrow" style="will-change: transform;">
            <path d="M11 8l-5 5-.7-.7L9.6 8 5.3 3.7 6 3z"></path>
          </svg>
          <div class="${prefix}--accordion__title">Connect with us</div>
        </button>
        <div class="${prefix}--accordion__content">
          <h2 class="${prefix}--footer-nav-group__title">Connect with us</h2>
          <ul>
            <li class="${prefix}--footer-nav-group__item"><a href="https://support.ibm.com?lnk=fcw" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Support</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.ibm.com/partnerworld/wps/bplocator/search.jsp?lnk=fcw" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Find a Business Partner</a></li>
          </ul>
        </div>
      </li>
      <li class="${prefix}--accordion__item ${prefix}--footer-nav-group" data-autoid="${stablePrefix}--footer-nav-group"><button aria-expanded="false" class="${prefix}--accordion__heading" title="Expand/Collapse" type="button"><svg focusable="false"
            preserveAspectRatio="xMidYMid meet" aria-label="Expand/Collapse" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" class="${prefix}--accordion__arrow" style="will-change: transform;">
            <path d="M11 8l-5 5-.7-.7L9.6 8 5.3 3.7 6 3z"></path>
          </svg>
          <div class="${prefix}--accordion__title">About IBM</div>
        </button>
        <div class="${prefix}--accordion__content">
          <h2 class="${prefix}--footer-nav-group__title">About IBM</h2>
          <ul>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.ibm.com/employment/?lnk=fab" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Careers</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.ibm.com/events?lnk=fab" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Events</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://newsroom.ibm.com/?lnk=fab" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Latest news</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.ibm.com/investor/?lnk=fab" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Investor relations</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.ibm.com/employment/us/diverse/?lnk=fab" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Diversity and inclusion</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.ibm.org/?lnk=fab" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Corporate responsibility</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.ibm.com/ibm/us/en/?lnk=fab" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">About IBM</a></li>
          </ul>
        </div>
      </li>
      <li class="${prefix}--accordion__item ${prefix}--footer-nav-group" data-autoid="${stablePrefix}--footer-nav-group"><button aria-expanded="false" class="${prefix}--accordion__heading" title="Expand/Collapse" type="button"><svg focusable="false"
            preserveAspectRatio="xMidYMid meet" aria-label="Expand/Collapse" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" class="${prefix}--accordion__arrow" style="will-change: transform;">
            <path d="M11 8l-5 5-.7-.7L9.6 8 5.3 3.7 6 3z"></path>
          </svg>
          <div class="${prefix}--accordion__title">Social</div>
        </button>
        <div class="${prefix}--accordion__content">
          <h2 class="${prefix}--footer-nav-group__title">Social</h2>
          <ul>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.twitter.com/ibm" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Twitter</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.linkedin.com/company/ibm" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">LinkedIn</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.facebook.com/ibm" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">Facebook</a></li>
            <li class="${prefix}--footer-nav-group__item"><a href="https://www.youtube.com/ibm" class="${prefix}--link ${prefix}--footer-nav-group__link" data-autoid="${stablePrefix}--footer-nav-group__link">YouTube</a></li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>`;
}
export default footerNavTemplate;
