// Generated on 2025-12-17T13:35:58.523Z
export const css = `
/*
! tailwindcss v3.4.4 | MIT License | https://tailwindcss.com
*/

/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box;
  /* 1 */
  border-width: 0;
  /* 2 */
  border-style: solid;
  /* 2 */
  border-color: #e5e7eb;
  /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured sans font-family by default.
5. Use the user's configured sans font-feature-settings by default.
6. Use the user's configured sans font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html,
:host {
  line-height: 1.5;
  /* 1 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
  -moz-tab-size: 4;
  /* 3 */
  -o-tab-size: 4;
     tab-size: 4;
  /* 3 */
  font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  /* 4 */
  font-feature-settings: normal;
  /* 5 */
  font-variation-settings: normal;
  /* 6 */
  -webkit-tap-highlight-color: transparent;
  /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from html so users can set them as a class directly on the html element.
*/

body {
  margin: 0;
  /* 1 */
  line-height: inherit;
  /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0;
  /* 1 */
  color: inherit;
  /* 2 */
  border-top-width: 1px;
  /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured mono font-family by default.
2. Use the user's configured mono font-feature-settings by default.
3. Use the user's configured mono font-variation-settings by default.
4. Correct the odd em font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  /* 1 */
  font-feature-settings: normal;
  /* 2 */
  font-variation-settings: normal;
  /* 3 */
  font-size: 1em;
  /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent sub and sup elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0;
  /* 1 */
  border-color: inherit;
  /* 2 */
  border-collapse: collapse;
  /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  /* 1 */
  font-feature-settings: inherit;
  /* 1 */
  font-variation-settings: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  font-weight: inherit;
  /* 1 */
  line-height: inherit;
  /* 1 */
  letter-spacing: inherit;
  /* 1 */
  color: inherit;
  /* 1 */
  margin: 0;
  /* 2 */
  padding: 0;
  /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button;
  /* 1 */
  background-color: transparent;
  /* 2 */
  background-image: none;
  /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional :invalid styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to inherit in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/

dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1;
  /* 1 */
  color: #9ca3af;
  /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
  /* 1 */
  color: #9ca3af;
  /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/

:disabled {
  cursor: default;
}

/*
1. Make replaced elements display: block by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add vertical-align: middle to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  /* 1 */
  vertical-align: middle;
  /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */

[hidden] {
  display: none;
}

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 206 57% 24%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 206 57% 24%;
  --radius: 0.5rem;
  --chart-1: 12 76% 61%;
  --chart-2: 173 58% 39%;
  --chart-3: 197 37% 24%;
  --chart-4: 43 74% 66%;
  --chart-5: 27 87% 67%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 224.3 76.3% 48%;
  --chart-1: 220 70% 50%;
  --chart-2: 160 60% 45%;
  --chart-3: 30 80% 55%;
  --chart-4: 280 65% 60%;
  --chart-5: 340 75% 55%;
}

*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

.tw-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.tw-pointer-events-none {
  pointer-events: none;
}

.tw-invisible {
  visibility: hidden;
}

.tw-fixed {
  position: fixed;
}

.tw-absolute {
  position: absolute;
}

.tw-relative {
  position: relative;
}

.tw-inset-0 {
  inset: 0px;
}

.-tw-top-6 {
  top: -1.5rem;
}

.tw-left-0 {
  left: 0px;
}

.tw-left-\\[50\\%\\] {
  left: 50%;
}

.tw-right-0 {
  right: 0px;
}

.tw-right-4 {
  right: 1rem;
}

.tw-top-0 {
  top: 0px;
}

.tw-top-4 {
  top: 1rem;
}

.tw-top-\\[50\\%\\] {
  top: 50%;
}

.tw-z-50 {
  z-index: 50;
}

.tw-col-span-4 {
  grid-column: span 4 / span 4;
}

.tw-col-span-8 {
  grid-column: span 8 / span 8;
}

.tw-m-0 {
  margin: 0px;
}

.tw-m-1 {
  margin: 0.25rem;
}

.tw-m-2 {
  margin: 0.5rem;
}

.tw-mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.tw-mx-40 {
  margin-left: 10rem;
  margin-right: 10rem;
}

.tw-mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.tw-my-0 {
  margin-top: 0px;
  margin-bottom: 0px;
}

.tw-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.tw-my-\\[1px\\] {
  margin-top: 1px;
  margin-bottom: 1px;
}

.-tw-mt-32 {
  margin-top: -8rem;
}

.tw-mb-2 {
  margin-bottom: 0.5rem;
}

.tw-mb-4 {
  margin-bottom: 1rem;
}

.tw-ml-4 {
  margin-left: 1rem;
}

.tw-mr-0 {
  margin-right: 0px;
}

.tw-mr-12 {
  margin-right: 3rem;
}

.tw-mr-2 {
  margin-right: 0.5rem;
}

.tw-mr-\\[5px\\] {
  margin-right: 5px;
}

.tw-mt-1 {
  margin-top: 0.25rem;
}

.tw-mt-2 {
  margin-top: 0.5rem;
}

.tw-mt-3 {
  margin-top: 0.75rem;
}

.tw-mt-4 {
  margin-top: 1rem;
}

.tw-mt-5 {
  margin-top: 1.25rem;
}

.tw-mt-6 {
  margin-top: 1.5rem;
}

.tw-line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.tw-line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.tw-block {
  display: block;
}

.tw-flex {
  display: flex;
}

.tw-inline-flex {
  display: inline-flex;
}

.tw-grid {
  display: grid;
}

.tw-hidden {
  display: none;
}

.tw-h-10 {
  height: 2.5rem;
}

.tw-h-11 {
  height: 2.75rem;
}

.tw-h-12 {
  height: 3rem;
}

.tw-h-14 {
  height: 3.5rem;
}

.tw-h-16 {
  height: 4rem;
}

.tw-h-24 {
  height: 6rem;
}

.tw-h-28 {
  height: 7rem;
}

.tw-h-4 {
  height: 1rem;
}

.tw-h-5 {
  height: 1.25rem;
}

.tw-h-6 {
  height: 1.5rem;
}

.tw-h-60 {
  height: 15rem;
}

.tw-h-8 {
  height: 2rem;
}

.tw-h-80 {
  height: 20rem;
}

.tw-h-9 {
  height: 2.25rem;
}

.tw-h-96 {
  height: 24rem;
}

.tw-h-\\[1px\\] {
  height: 1px;
}

.tw-h-\\[2px\\] {
  height: 2px;
}

.tw-h-full {
  height: 100%;
}

.tw-max-h-96 {
  max-height: 24rem;
}

.tw-min-h-64 {
  min-height: 16rem;
}

.tw-min-h-\\[80px\\] {
  min-height: 80px;
}

.tw-w-1 {
  width: 0.25rem;
}

.tw-w-1\\/2 {
  width: 50%;
}

.tw-w-10 {
  width: 2.5rem;
}

.tw-w-11 {
  width: 2.75rem;
}

.tw-w-12 {
  width: 3rem;
}

.tw-w-14 {
  width: 3.5rem;
}

.tw-w-16 {
  width: 4rem;
}

.tw-w-2 {
  width: 0.5rem;
}

.tw-w-2\\/3 {
  width: 66.666667%;
}

.tw-w-24 {
  width: 6rem;
}

.tw-w-28 {
  width: 7rem;
}

.tw-w-32 {
  width: 8rem;
}

.tw-w-4 {
  width: 1rem;
}

.tw-w-40 {
  width: 10rem;
}

.tw-w-44 {
  width: 11rem;
}

.tw-w-5 {
  width: 1.25rem;
}

.tw-w-52 {
  width: 13rem;
}

.tw-w-6 {
  width: 1.5rem;
}

.tw-w-60 {
  width: 15rem;
}

.tw-w-8 {
  width: 2rem;
}

.tw-w-9 {
  width: 2.25rem;
}

.tw-w-96 {
  width: 24rem;
}

.tw-w-\\[1px\\] {
  width: 1px;
}

.tw-w-full {
  width: 100%;
}

.tw-min-w-40 {
  min-width: 10rem;
}

.tw-max-w-4xl {
  max-width: 56rem;
}

.tw-max-w-lg {
  max-width: 32rem;
}

.tw-max-w-screen-sm {
  max-width: 640px;
}

.tw-max-w-xl {
  max-width: 36rem;
}

.tw-flex-1 {
  flex: 1 1 0%;
}

.tw-flex-shrink-0 {
  flex-shrink: 0;
}

.tw-shrink-0 {
  flex-shrink: 0;
}

.tw-flex-grow {
  flex-grow: 1;
}

.tw-flex-grow-0 {
  flex-grow: 0;
}

.tw-caption-bottom {
  caption-side: bottom;
}

.tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.tw-translate-x-5 {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.tw-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.tw-translate-y-\\[-50\\%\\] {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

@keyframes tw-spin {
  to {
    transform: rotate(360deg);
  }
}

.tw-animate-logo-inner-spin {
  animation: tw-spin 2s linear infinite;
}

@keyframes tw-reverse-spin {
  from {
    transform: rotate(360deg);
  }
}

.tw-animate-logo-outer-spin {
  animation: tw-reverse-spin 5s linear infinite;
}

@keyframes tw-pulse {
  50% {
    opacity: .5;
  }
}

.tw-animate-pulse {
  animation: tw-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes tw-spin {
  to {
    transform: rotate(360deg);
  }
}

.tw-animate-spin {
  animation: tw-spin 1s linear infinite;
}

.tw-cursor-not-allowed {
  cursor: not-allowed;
}

.tw-cursor-pointer {
  cursor: pointer;
}

.tw-grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.tw-grid-cols-12 {
  grid-template-columns: repeat(12, minmax(0, 1fr));
}

.tw-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.tw-grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.tw-grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.tw-grid-cols-5 {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.tw-grid-cols-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

.tw-grid-cols-7 {
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.tw-grid-cols-8 {
  grid-template-columns: repeat(8, minmax(0, 1fr));
}

.tw-grid-cols-9 {
  grid-template-columns: repeat(9, minmax(0, 1fr));
}

.tw-grid-cols-\\[1fr\\,1px\\,1fr\\] {
  grid-template-columns: 1fr 1px 1fr;
}

.tw-grid-rows-2 {
  grid-template-rows: repeat(2, minmax(0, 1fr));
}

.tw-flex-row {
  flex-direction: row;
}

.tw-flex-col {
  flex-direction: column;
}

.tw-flex-col-reverse {
  flex-direction: column-reverse;
}

.tw-place-content-center {
  place-content: center;
}

.tw-place-items-end {
  place-items: end;
}

.tw-place-items-center {
  place-items: center;
}

.tw-content-start {
  align-content: flex-start;
}

.tw-items-start {
  align-items: flex-start;
}

.tw-items-end {
  align-items: flex-end;
}

.tw-items-center {
  align-items: center;
}

.tw-justify-start {
  justify-content: flex-start;
}

.tw-justify-end {
  justify-content: flex-end;
}

.tw-justify-center {
  justify-content: center;
}

.tw-justify-between {
  justify-content: space-between;
}

.tw-justify-evenly {
  justify-content: space-evenly;
}

.tw-justify-items-center {
  justify-items: center;
}

.tw-gap-1 {
  gap: 0.25rem;
}

.tw-gap-12 {
  gap: 3rem;
}

.tw-gap-2 {
  gap: 0.5rem;
}

.tw-gap-4 {
  gap: 1rem;
}

.tw-gap-6 {
  gap: 1.5rem;
}

.tw-gap-8 {
  gap: 2rem;
}

.tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}

.tw-space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}

.tw-space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
}

.tw-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}

.tw-self-end {
  align-self: flex-end;
}

.tw-overflow-auto {
  overflow: auto;
}

.tw-overflow-hidden {
  overflow: hidden;
}

.tw-overflow-y-auto {
  overflow-y: auto;
}

.tw-overflow-y-scroll {
  overflow-y: scroll;
}

.tw-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tw-whitespace-nowrap {
  white-space: nowrap;
}

.tw-rounded-full {
  border-radius: 9999px;
}

.tw-rounded-lg {
  border-radius: var(--radius);
}

.tw-rounded-md {
  border-radius: calc(var(--radius) - 2px);
}

.tw-rounded-none {
  border-radius: 0px;
}

.tw-rounded-sm {
  border-radius: calc(var(--radius) - 4px);
}

.tw-rounded-l-md {
  border-top-left-radius: calc(var(--radius) - 2px);
  border-bottom-left-radius: calc(var(--radius) - 2px);
}

.tw-rounded-l-none {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

.tw-rounded-r-md {
  border-top-right-radius: calc(var(--radius) - 2px);
  border-bottom-right-radius: calc(var(--radius) - 2px);
}

.tw-rounded-r-none {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

.tw-border {
  border-width: 1px;
}

.tw-border-0 {
  border-width: 0px;
}

.tw-border-2 {
  border-width: 2px;
}

.tw-border-b {
  border-bottom-width: 1px;
}

.tw-border-b-2 {
  border-bottom-width: 2px;
}

.tw-border-r {
  border-right-width: 1px;
}

.tw-border-t {
  border-top-width: 1px;
}

.tw-border-solid {
  border-style: solid;
}

.tw-border-amber-600 {
  --tw-border-opacity: 1;
  border-color: rgb(217 119 6 / var(--tw-border-opacity));
}

.tw-border-amber-600\\/50 {
  border-color: rgb(217 119 6 / 0.5);
}

.tw-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}

.tw-border-border {
  border-color: hsl(var(--border));
}

.tw-border-destructive {
  border-color: hsl(var(--destructive));
}

.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}

.tw-border-gray-200 {
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity));
}

.tw-border-input {
  border-color: hsl(var(--input));
}

.tw-border-primary {
  border-color: hsl(var(--primary));
}

.tw-border-slate-200 {
  --tw-border-opacity: 1;
  border-color: rgb(226 232 240 / var(--tw-border-opacity));
}

.tw-border-slate-800 {
  --tw-border-opacity: 1;
  border-color: rgb(30 41 59 / var(--tw-border-opacity));
}

.tw-border-transparent {
  border-color: transparent;
}

.tw-bg-accent {
  background-color: hsl(var(--accent));
}

.tw-bg-background {
  background-color: hsl(var(--background));
}

.tw-bg-black {
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity));
}

.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}

.tw-bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity));
}

.tw-bg-border {
  background-color: hsl(var(--border));
}

.tw-bg-destructive {
  background-color: hsl(var(--destructive));
}

.tw-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}

.tw-bg-green-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(22 163 74 / var(--tw-bg-opacity));
}

.tw-bg-input {
  background-color: hsl(var(--input));
}

.tw-bg-lime-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(132 204 22 / var(--tw-bg-opacity));
}

.tw-bg-muted {
  background-color: hsl(var(--muted));
}

.tw-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}

.tw-bg-primary {
  background-color: hsl(var(--primary));
}

.tw-bg-red-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity));
}

.tw-bg-secondary {
  background-color: hsl(var(--secondary));
}

.tw-bg-sky-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(14 165 233 / var(--tw-bg-opacity));
}

.tw-bg-slate-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(241 245 249 / var(--tw-bg-opacity));
}

.tw-bg-slate-800 {
  --tw-bg-opacity: 1;
  background-color: rgb(30 41 59 / var(--tw-bg-opacity));
}

.tw-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.tw-p-1 {
  padding: 0.25rem;
}

.tw-p-2 {
  padding: 0.5rem;
}

.tw-p-4 {
  padding: 1rem;
}

.tw-p-6 {
  padding: 1.5rem;
}

.tw-p-8 {
  padding: 2rem;
}

.tw-px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}

.tw-px-16 {
  padding-left: 4rem;
  padding-right: 4rem;
}

.tw-px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.tw-px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}

.tw-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.tw-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.tw-px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.tw-py-0 {
  padding-top: 0px;
  padding-bottom: 0px;
}

.tw-py-0\\.5 {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}

.tw-py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.tw-py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}

.tw-py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.tw-pb-0 {
  padding-bottom: 0px;
}

.tw-pb-3 {
  padding-bottom: 0.75rem;
}

.tw-pl-2 {
  padding-left: 0.5rem;
}

.tw-pl-2\\.5 {
  padding-left: 0.625rem;
}

.tw-pl-20 {
  padding-left: 5rem;
}

.tw-pr-2 {
  padding-right: 0.5rem;
}

.tw-pr-2\\.5 {
  padding-right: 0.625rem;
}

.tw-pr-20 {
  padding-right: 5rem;
}

.tw-pr-5 {
  padding-right: 1.25rem;
}

.tw-pt-0 {
  padding-top: 0px;
}

.tw-pt-4 {
  padding-top: 1rem;
}

.tw-text-left {
  text-align: left;
}

.tw-text-center {
  text-align: center;
}

.tw-text-right {
  text-align: right;
}

.tw-align-middle {
  vertical-align: middle;
}

.tw-font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.tw-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.tw-text-6xl {
  font-size: 3.75rem;
  line-height: 1;
}

.tw-text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.tw-text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.tw-text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.tw-text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.tw-font-black {
  font-weight: 900;
}

.tw-font-bold {
  font-weight: 700;
}

.tw-font-medium {
  font-weight: 500;
}

.tw-font-normal {
  font-weight: 400;
}

.tw-font-semibold {
  font-weight: 600;
}

.tw-uppercase {
  text-transform: uppercase;
}

.tw-ordinal {
  --tw-ordinal: ordinal;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}

.tw-leading-none {
  line-height: 1;
}

.tw-leading-relaxed {
  line-height: 1.625;
}

.tw-tracking-tight {
  letter-spacing: -0.025em;
}

.tw-text-amber-600 {
  --tw-text-opacity: 1;
  color: rgb(217 119 6 / var(--tw-text-opacity));
}

.tw-text-border {
  color: hsl(var(--border));
}

.tw-text-destructive {
  color: hsl(var(--destructive));
}

.tw-text-destructive-foreground {
  color: hsl(var(--destructive-foreground));
}

.tw-text-foreground {
  color: hsl(var(--foreground));
}

.tw-text-green-600 {
  --tw-text-opacity: 1;
  color: rgb(22 163 74 / var(--tw-text-opacity));
}

.tw-text-lime-500 {
  --tw-text-opacity: 1;
  color: rgb(132 204 22 / var(--tw-text-opacity));
}

.tw-text-muted-foreground {
  color: hsl(var(--muted-foreground));
}

.tw-text-primary {
  color: hsl(var(--primary));
}

.tw-text-primary-foreground {
  color: hsl(var(--primary-foreground));
}

.tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}

.tw-text-slate-500 {
  --tw-text-opacity: 1;
  color: rgb(100 116 139 / var(--tw-text-opacity));
}

.tw-text-slate-950 {
  --tw-text-opacity: 1;
  color: rgb(2 6 23 / var(--tw-text-opacity));
}

.tw-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.tw-underline-offset-4 {
  text-underline-offset: 4px;
}

.tw-opacity-0 {
  opacity: 0;
}

.tw-opacity-100 {
  opacity: 1;
}

.tw-opacity-40 {
  opacity: 0.4;
}

.tw-opacity-60 {
  opacity: 0.6;
}

.tw-opacity-70 {
  opacity: 0.7;
}

.tw-shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.tw-shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.tw-shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.tw-ring-0 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.tw-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}

.tw-ring-offset-white {
  --tw-ring-offset-color: #fff;
}

.tw-transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.tw-transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.tw-transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.tw-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.tw-duration-1000 {
  transition-duration: 1000ms;
}

.tw-duration-200 {
  transition-duration: 200ms;
}

.tw-ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes enter {
  from {
    opacity: var(--tw-enter-opacity, 1);
    transform: translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0));
  }
}

@keyframes exit {
  to {
    opacity: var(--tw-exit-opacity, 1);
    transform: translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0));
  }
}

.tw-animate-in {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}

.tw-animate-out {
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}

.tw-fade-in-0 {
  --tw-enter-opacity: 0;
}

.tw-fade-out-0 {
  --tw-exit-opacity: 0;
}

.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}

.tw-zoom-out-95 {
  --tw-exit-scale: .95;
}

.tw-slide-in-from-left-1 {
  --tw-enter-translate-x: -0.25rem;
}

.tw-slide-in-from-left-1\\/2 {
  --tw-enter-translate-x: -50%;
}

.tw-slide-in-from-top-\\[48\\%\\] {
  --tw-enter-translate-y: -48%;
}

.tw-slide-out-to-left-1 {
  --tw-exit-translate-x: -0.25rem;
}

.tw-slide-out-to-left-1\\/2 {
  --tw-exit-translate-x: -50%;
}

.tw-slide-out-to-top-\\[48\\%\\] {
  --tw-exit-translate-y: -48%;
}

.tw-duration-1000 {
  animation-duration: 1000ms;
}

.tw-duration-200 {
  animation-duration: 200ms;
}

.tw-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.\\[unit\\:sec\\] {
  unit: sec;
}

.width-1000 {
  width: 1000px;
  max-width: 1000px;
}

input[type='radio'].metasuite-tint {
  accent-color: hsl(var(--primary));
}

.file\\:tw-border-0::file-selector-button {
  border-width: 0px;
}

.file\\:tw-bg-transparent::file-selector-button {
  background-color: transparent;
}

.file\\:tw-font-medium::file-selector-button {
  font-weight: 500;
}

.placeholder\\:tw-text-muted-foreground::-moz-placeholder {
  color: hsl(var(--muted-foreground));
}

.placeholder\\:tw-text-muted-foreground::placeholder {
  color: hsl(var(--muted-foreground));
}

.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}

.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}

.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}

.hover\\:tw-bg-green-600\\/80:hover {
  background-color: rgb(22 163 74 / 0.8);
}

.hover\\:tw-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}

.hover\\:tw-bg-primary\\/80:hover {
  background-color: hsl(var(--primary) / 0.8);
}

.hover\\:tw-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}

.hover\\:tw-bg-secondary\\/80:hover {
  background-color: hsl(var(--secondary) / 0.8);
}

.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}

.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}

.hover\\:tw-opacity-100:hover {
  opacity: 1;
}

.focus\\:tw-outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\\:tw-ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus\\:tw-ring-ring:focus {
  --tw-ring-color: hsl(var(--ring));
}

.focus\\:tw-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}

.focus-visible\\:tw-outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus-visible\\:tw-ring-2:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus-visible\\:tw-ring-ring:focus-visible {
  --tw-ring-color: hsl(var(--ring));
}

.focus-visible\\:tw-ring-slate-950:focus-visible {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(2 6 23 / var(--tw-ring-opacity));
}

.focus-visible\\:tw-ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}

.focus-visible\\:tw-ring-offset-white:focus-visible {
  --tw-ring-offset-color: #fff;
}

.disabled\\:tw-pointer-events-none:disabled {
  pointer-events: none;
}

.disabled\\:tw-cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.disabled\\:tw-opacity-50:disabled {
  opacity: 0.5;
}

.tw-peer:disabled ~ .peer-disabled\\:tw-cursor-not-allowed {
  cursor: not-allowed;
}

.tw-peer:disabled ~ .peer-disabled\\:tw-opacity-70 {
  opacity: 0.7;
}

.data-\\[state\\=selected\\]\\:tw-bg-muted[data-state=selected] {
  background-color: hsl(var(--muted));
}

.dark\\:tw-border-amber-600:is(.tw-dark *) {
  --tw-border-opacity: 1;
  border-color: rgb(217 119 6 / var(--tw-border-opacity));
}

.dark\\:tw-border-destructive:is(.tw-dark *) {
  border-color: hsl(var(--destructive));
}

@media (min-width: 640px) {
  .sm\\:tw-flex-row {
    flex-direction: row;
  }

  .sm\\:tw-justify-end {
    justify-content: flex-end;
  }

  .sm\\:tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:tw-rounded-lg {
    border-radius: var(--radius);
  }
}

.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:tw-pr-0:has([role=checkbox]) {
  padding-right: 0px;
}

.\\[\\&\\>svg\\]\\:tw-text-amber-600>svg {
  --tw-text-opacity: 1;
  color: rgb(217 119 6 / var(--tw-text-opacity));
}

.\\[\\&\\>svg\\]\\:tw-text-destructive>svg {
  color: hsl(var(--destructive));
}

.\\[\\&\\>tr\\]\\:last\\:tw-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}

.\\[\\&_p\\]\\:tw-leading-relaxed p {
  line-height: 1.625;
}

.\\[\\&_tr\\:last-child\\]\\:tw-border-0 tr:last-child {
  border-width: 0px;
}

.\\[\\&_tr\\]\\:tw-border-b tr {
  border-bottom-width: 1px;
}

`;
