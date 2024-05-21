import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import { property, state } from 'lit/decorators.js';
import styles from './menu.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { classMap } from 'lit/directives/class-map.js';
import { consume, provide } from '@lit/context';
import { MenuContext, menuDefaultState } from './menu-context';

/**
 * Menu.
 *
 * @element cds-menu
 */
type activeItemType = {
  item: HTMLLIElement;
  parent: HTMLElement | null;
};
@customElement(`${prefix}-menu`)
class CDSMenu extends HostListenerMixin(LitElement) {
  @provide({ context: MenuContext })
  @consume({ context: MenuContext, subscribe: true })
  context = menuDefaultState;

  readonly spacing: number = 8; // distance to keep to window edges, in px
  /**
   * Parent state.
   */
  @property()
  stateParent = {};

  /**
   * Items.
   */
  @state()
  items: Element[] = [];
  /**
   * Active list Items.
   */
  @state()
  activeitems: activeItemType[]= [];
  /**
   * Items.
   */
  @property()
  itemsChild: any[] = [];

  /**
   * Parent state.
   */
  @property({ type: HTMLElement })
  containerRef;
  /**
   * Label for the menu.
   */
  @property({ type: String })
  label;
  /**
   * Parent state.
   */
  @property({ type: Boolean })
  isChild = false;
  /**
   * Action button width.
   */
  @property()
  actionButtonWidth;
  /**
   * Checks if document direction is rtl.
   */
  @property({ type: Boolean })
  isRtl = false;
  /**
   * Checks if Menu is root menu or not.
   */
  @property({ type: Boolean })
  isRoot = true;

  /**
   * Document direction.
   */
  @property({ type: String })
  direction = 'ltr';

  /**
   * Open value for the menu .
   */
  @property({ type: String })
  open;
  /**
   * Open value for the menu .
   */
  @property({ type: Boolean })
  isOpen = true;
  /**
   * Active element in the DOM .
   */
  @property({ type: HTMLElement })
  focusreturn;
  /**
   * Position of the Menu .
   */
  @property()
  position = [-1, -1];
  /**
   * Size attribute .
   */
  @property()
  size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';
  /**
   * Mode attribute .
   */
  @property()
  mode: 'full' | 'basic' = 'full';
  /**
   * Size of the Menu .
   */
  @property()
  menuSize;
  /**
   * Specify how the menu should align with the button element
   */
  @property({ type: String })
  menuAlignment;
  /**
   * Position of the Menu in X axis .
   */
  @property()
  x: number | number[] = 0;
  /**
   * Position of the Menu in Y axis .
   */
  @property()
  y: number | number[] = 0;


   /**
   * Provide an optional function to be called when the Menu should be closed.
   */
   onClose?: () => void;

  updated(changedProperties) {
    this.isOpen = this.open !== 'false';
    if (changedProperties.has('isOpen') && this.isOpen) {
      this._handleOpen();
    }
  }
  firstUpdated() {
    this.isRtl = this.direction === 'rtl';
    this.isChild = Boolean(this.isChild);
    this.isRoot = this.context.isRoot;
    if (this.context.mode === 'basic' && !this.isRoot) {
      throw new Error(
        'Nested menus are not supported when the menu is in "basic" mode.'
      );
    }
    this.menuSize = this.isRoot ? this.size : this.context.size;
    if (this.isChild) {
      this._newContextCreate();
    }
    // Getting the width from the parent container element - controlled
    if (this.containerRef) {
      const { width: w } = this.containerRef.getBoundingClientRect();
      this.actionButtonWidth = w;
    }
    this._registerMenuItems();
    this._setActiveItems();
  }
  render() {
    const {
      isOpen,
      menuAlignment,
      label,
      x,
      y,
      isChild,
      size,
      menuSize,
      position,
      _handleKeyDown: handleKeyDown,
      _handleBlur: handleBlur,
    } = this;
    const menuClasses = classMap({
      [`${prefix}--menu`]: true,
      [`${prefix}--menu--${menuSize}`]: true,
      [`${prefix}--menu--box-shadow-top`]:
        menuAlignment && menuAlignment.slice(0, 3) === 'top',
      [`${prefix}--menu--open`]: isOpen,
      [`${prefix}--menu--shown`]: position[0] >= 0 && position[1] >= 0,
      [`${prefix}--menu--with-icons`]: this.context.hasIcons,
    });
    return html`
      <ul
        class="${menuClasses}"
        aria-label="${label}"
        tabindex="1"
        @keydown="${handleKeyDown}"
        @onblur="${handleBlur}">
        <slot></slot>
      </ul>
    `;
  }
  
  _handleKeyDown = (e: KeyboardEvent) => {
    const { isRoot } = this.context;
    e.stopPropagation();
    // if the user presses escape or this is a submenu
    // and the user presses ArrowLeft, close it
    if (
      ((e.key === 'Escape') || (!isRoot && e.key === 'ArrowLeft')) &&
      this.onClose
    ) {
      this._handleClose(e);
    } else {
      this._focusItem(e);
    }
  };
  _focusItem = (e:KeyboardEvent | undefined) => {
    let currentItem:number;
    if(document.activeElement?.tagName !== 'CDS-MENU'){
      currentItem = this.activeitems?.findIndex((activeItem) =>
        {
        if(activeItem.parent === null){
          return activeItem.item.contains(document.activeElement)
        }else if(activeItem.parent.tagName === 'CDS-MENU-ITEM-RADIO-GROUP'){
          let shadowRootActiveEl = this._findActiveElementInShadowRoot(document);
          return(shadowRootActiveEl === activeItem.item.shadowRoot?.querySelector('li'));
        }
        else{
          return activeItem.parent.contains(document.activeElement)
        }
      }
      );
    }else{
      currentItem = 0;
    }
    
    let indexToFocus = currentItem;
    // if currentItem is -1, no menu item is focused yet.
    // in this case, the first item should receive focus.
    if (currentItem === -1) {
      indexToFocus = 0;
    } else if (e) {
      if (e.key === 'ArrowUp') {
        indexToFocus = indexToFocus - 1;
      }
      if (e.key === 'ArrowDown') {
        indexToFocus = indexToFocus + 1;
        
      }
    }
    if (indexToFocus < 0) {
      indexToFocus = this.activeitems.length - 1;
    }
    if (indexToFocus >= this.activeitems.length) {
      indexToFocus = 0;
    }

    if (indexToFocus !== currentItem) {
      const nodeToFocus = this.activeitems[indexToFocus].item;
      nodeToFocus.shadowRoot.querySelector('.cds--menu-item').focus();
    }
  }
  _findActiveElementInShadowRoot = (shadowRoot) => {
    if (shadowRoot === null) return null;

    let activeElement = shadowRoot.activeElement;
    while (activeElement && activeElement.shadowRoot) {
        activeElement = activeElement.shadowRoot.activeElement;
    }
    return activeElement;
}
  _handleBlur = () => {
    console.log('blur');
  };
 
  _notEmpty = (value: number | null | undefined) => {
    return value !== null && value !== undefined;
  };
  _xyStringToNumberConversion = (val) => {
    let res;
    if (val.includes(',')) {
      res = val.split(',').map(function (item) {
        return parseInt(item);
      });
    } else {
      res = parseInt(val);
    }
    return res;
  };
  _fitValue = (range: number[], axis: 'x' | 'y') => {
    const { isRoot } = this.context;

    // const isRoot =  false
    const { width, height } = this.getBoundingClientRect();
    const alignment = isRoot ? 'vertical' : 'horizontal';
    const axes = {
      x: {
        max: window.innerWidth,
        size: width,
        anchor: alignment === 'horizontal' ? range[1] : range[0],
        reversedAnchor: alignment === 'horizontal' ? range[0] : range[1],
        offset: 0,
      },
      y: {
        max: window.innerHeight,
        size: height,
        anchor: alignment === 'horizontal' ? range[0] : range[1],
        reversedAnchor: alignment === 'horizontal' ? range[1] : range[0],
        offset: isRoot ? 0 : 4, // top padding in menu, used to align the menu items
      },
    };

    // Avoid that the Menu render incorrectly when the postion is set in the right side of the screen
    if (
      this.actionButtonWidth &&
      this.actionButtonWidth < axes.x.size &&
      (this.menuAlignment === 'bottom' || this.menuAlignment === 'top')
    ) {
      axes.x.size = this.actionButtonWidth;
    }

    // if 'axes.x.anchor' is lower than 87px dynamically switch render side
    if (
      this.actionButtonWidth &&
      (this.menuAlignment === 'bottom-end' ||
        this.menuAlignment === 'top-end') &&
      axes.x.anchor >= 87 &&
      this.actionButtonWidth < axes.x.size
    ) {
      const diff = axes.x.anchor + axes.x.reversedAnchor;
      axes.x.anchor = axes.x.anchor + diff;
    }

    const { max, size, anchor, reversedAnchor, offset } = axes[axis];

    // get values for different scenarios, set to false if they don't work
    const options = [
      // towards max (preferred)
      max - this.spacing - size - anchor >= 0 ? anchor - offset : false,

      // towards min / reversed (first fallback)
      reversedAnchor - size >= 0 ? reversedAnchor - size + offset : false,

      // align at max (second fallback)
      max - this.spacing - size,
    ];
    const topAlignment =
      this.menuAlignment === 'top' ||
      this.menuAlignment === 'top-end' ||
      this.menuAlignment === 'top-start';
    // If the tooltip is not visible in the top, switch to the bototm
    if (
      typeof options[0] === 'number' &&
      topAlignment &&
      options[0] >= 0 &&
      !options[1] &&
      axis === 'y'
    ) {
      this.style.transform = 'translate(0)';
    } else if (topAlignment && !options[0] && axis === 'y') {
      options[0] = anchor - offset;
    }

    // Previous array `options`, has at least one item that is a number (the last one - second fallback).
    // That guarantees that the return of `find()` will always be a number
    // and we can safely add the numeric casting `as number`.
    const bestOption = options.find((option) => option !== false) as number;

    return bestOption >= this.spacing ? bestOption : this.spacing;
  };
  _getPosition = (x: number | (number | null | undefined)[]) => {
    if (Array.isArray(x)) {
      // has to be of length 2
      const filtered = x.filter(this._notEmpty);
      if (filtered.length === 2) {
        return filtered;
      } else {
        return;
      }
    } else {
      return [x, x];
    }
  };
  _calculatePosition = () => {
    const ranges = {
      x: this._getPosition(this.x),
      y: this._getPosition(this.y),
    };

    if (!ranges.x || !ranges.y) {
      return [-1, -1];
    }
    return [
      this._fitValue(ranges.x, 'x') ?? -1,
      this._fitValue(ranges.y, 'y') ?? -1,
    ];
  };
  _handleOpen = () => {
    this.x = this._xyStringToNumberConversion(String(this.x));
    this.y = this._xyStringToNumberConversion(String(this.y));
    const pos = this._calculatePosition();
    if (this.isRtl) {
      this.style.insetInlineStart = `initial`;
      this.style.insetInlineEnd = `${pos[0]}px`;
    } else {
      this.style.insetInlineStart = `${pos[0]}px`;
      this.style.insetInlineEnd = `initial`;
    }
    this.style.insetBlockStart = `${pos[1]}px`;
    this.position = pos;
  };
  _handleClose = (e:KeyboardEvent) => {
   
  };
  _newContextCreate = () => {
    this.context = {
      ...this.context,
      isRoot: false,
      mode: this.mode,
      size: this.size,
      requestCloseRoot: this.isRoot
        ? this._handleClose
        : this.context.requestCloseRoot,
    };
  };
  _registerMenuItems = () => {
    const items = this.shadowRoot?.querySelector('slot')?.assignedElements();
    this.items = items?.filter(item => {
      return (item.tagName !== 'CDS-MENU-ITEM-DIVIDER');
    });
        
    // filitems?.map(item => {
    //   if(item.tagName === 'CDS-MENU-ITEM'){
    //     this.items =[...this.items, item];
    //   }else if(item.tagName === 'CDS-MENU-ITEM-GROUP'){
    //     setTimeout(()=>{
    //       item.shadowRoot?.querySelector('slot')?.assignedElements().map(item => {
    //         this.items = [...this.items, ...item.shadowRoot?.querySelectorAll('cds-menu-item')];
    //       });
    //     },500);
    //   }else if()
      
    // });
  };
  _setActiveItems = () => {
    setTimeout(()=>{
        this.items?.map(item => {
          let activeItem:activeItemType;
          switch (item.tagName) {
            case 'CDS-MENU-ITEM-RADIO-GROUP':{
              let slotElements = item.shadowRoot?.querySelectorAll('cds-menu-item');
              for (const entry of slotElements.entries()) {
                activeItem = {
                  item: entry[1] as HTMLLIElement,
                  parent: item as HTMLElement
                };
                this.activeitems = [...this.activeitems, activeItem]
              }
              break;
            }
            case 'CDS-MENU-ITEM-GROUP':{
              let slotElements=  item.shadowRoot?.querySelector('slot')?.assignedElements();
              slotElements?.map(el => {
                activeItem = {
                  item: el.shadowRoot?.querySelector('cds-menu-item') as HTMLLIElement,
                  parent: el as HTMLElement
                };
                this.activeitems = [...this.activeitems, activeItem]
              });
              break;
            }
            default:{
              activeItem = {
                item: item as HTMLLIElement,
                parent: null
              };
              this.activeitems = [...this.activeitems, activeItem];
            }
          }
        });
        const activeEl = this.activeitems[0].item.shadowRoot?.querySelector('.cds--menu-item');
        activeEl?.focus();
      },100);
  }
  static styles = styles; // `styles` here is a `CSSResult` generated by custom Vite loader
}
export default CDSMenu;
