# `dds-masthead-search`

## `Misc attributes`

#### `should render with minimum attributes`

```
<div class="bx--masthead__search">
  <div class="bx--header__search--actions">
    <button
      aria-label="Open IBM search field"
      class="bx--header__action bx--header__search--search"
      type="button"
    >
    </button>
    <button
      aria-label="Close"
      class="bx--header__action bx--header__search--close"
      type="button"
    >
    </button>
  </div>
</div>

```

#### `should render with various attributes in the inactive state`

```
<div class="bx--masthead__search">
  <div class="bx--header__search--actions">
    <button
      aria-label="open-search-button-assistive-text-foo"
      class="bx--header__action bx--header__search--search"
      type="button"
    >
    </button>
    <button
      aria-label="Close"
      class="bx--header__action bx--header__search--close"
      type="button"
    >
    </button>
  </div>
</div>

```

#### `should render with various attributes`

```
<div class="bx--masthead__search bx--masthead__search--active">
  <form
    action="https://www.ibm.com/search"
    method="get"
  >
    <input
      name="lang"
      type="hidden"
      value="ko"
    >
    <input
      name="cc"
      type="hidden"
      value="KR"
    >
    <input
      name="lnk"
      type="hidden"
      value="mhsrch"
    >
    <div
      aria-expanded="true"
      aria-haspopup="listbox"
      aria-owns="result-list"
      class="react-autosuggest__container react-autosuggest__suggestions-container--open"
      role="combobox"
    >
      <input
        aria-autocomplete="list"
        aria-controls="result-list"
        autocomplete="off"
        class="bx--header__search--input"
        name="q"
        placeholder="placeholder-foo"
        type="text"
      >
      <div
        class="react-autosuggest__suggestions-container"
        id="result-list"
      >
        <ul
          class="react-autosuggest__suggestions-list"
          role="listbox"
        >
          <slot>
          </slot>
        </ul>
      </div>
    </div>
  </form>
  <div class="bx--header__search--actions">
    <button
      aria-label="perform-search-button-assistive-text-foo"
      class="bx--header__action bx--header__search--search"
      type="button"
    >
    </button>
    <button
      aria-label="close-search-button-assistive-text-foo"
      class="bx--header__action bx--header__search--close"
      type="button"
    >
    </button>
  </div>
</div>

```
