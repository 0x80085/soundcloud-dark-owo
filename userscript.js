// ==UserScript==
// @name         Modern Design and Dark Theme for SoundCloud
// @version      0.11
// @description  A modern design and dark theme for SoundCloud.com, inspired by the SoundCloud Android app
// @author       jottocraft
// @match        *://soundcloud.com/*
// @grant        none
// @license      MIT
// @namespace https://greasyfork.org/users/154395
// ==/UserScript==

/*
  Extensions by 0x80085
  added GIF to home screen 
  include dark theme to add to playlist modal
  maybe other stuff i forgot but patched un-darked modals mostly 
*/

(function () {
  'use strict';

  //Make menu dark
  function setMenuDarkMode(node) {
    if (document.documentElement.classList.contains('jtc-sc-dark')) {
      node.classList.remove("m-light");
      node.classList.add("m-dark");
    } else {
      node.classList.remove("m-dark");
      node.classList.add("m-light");
    }
  }

  //Observe DOM mutations
  const observer = new MutationObserver(mutations => {
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach(node => {
        //Add toggle dark button
        if (node.nodeType === 1 && node.classList.contains("headerMenu") && node.classList.contains("moreMenu")) {
          node.insertAdjacentHTML("afterBegin", `<ul class="headerMenu__list sc-list-nostyle"><li><a id="jtcToggle" onclick="jtcScToggleDark(); event.preventDefault();" class="headerMenu__link moreMenu__link" href="#">Toggle dark theme</a></li></ul>`);
        }

        //Enable built-in dark menus
        if (node.nodeType === 1 && (node.classList.contains("m-light") || node.classList.contains("m-dark"))) {
          setMenuDarkMode(node);
        }
      })
    })
  });

  //Starts the monitoring
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  //Toggle dark mode
  window.jtcScToggleDark = function () {
    const isDark = document.documentElement.classList.toggle('jtc-sc-dark');
    window.localStorage.setItem('jtc-sc-isDark', isDark);
    jtcScApplyDark(isDark);
  }

  //Apply dark mode
  function jtcScApplyDark() {
    const isDark = document.documentElement.classList.contains('jtc-sc-dark');

    //Set dark mode menus
    document.querySelectorAll(".m-light, .m-dark").forEach(node => setMenuDarkMode(node));
  }

  //Set dark mode on load
  const darkPref = window.localStorage.getItem('jtc-sc-isDark');
  const darkSys = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const useDarkMode = darkPref !== null ? darkPref === "true" : darkSys;
  if (useDarkMode) {
    document.documentElement.classList.add('jtc-sc-dark');
    jtcScApplyDark();
  }

  function addCss(cssString) {
    var head = document.getElementsByTagName('head')[0];
    var newCss = document.createElement('style');
    newCss.type = "text/css";
    newCss.innerHTML = cssString;
    head.appendChild(newCss);
  }

  addCss(`
    :root {
    --jtc-sc-root-text: #000000;
    --jtc-sc-bg: #ffffff;
    --jtc-sc-header: #000000;
    --jtc-sc-header-active: #080808;
    --jtc-sc-header-border: #111;
    --jtc-sc-border-light: #f2f2f2;
    --jtc-sc-tag-bg: #f3f3f3;
    --jtc-sc-tag-hover-bg: #eaeaea;
    --jtc-sc-light-text: #939393;
    --jtc-sc-btn-main: #000000;
    --jtc-sc-btn-main-text: #ffffff;
    --jtc-sc-btn: #f0f0f0;
    --jtc-sc-btn-hover: #e6e6e6;
    --jtc-sc-text-verylight: #b1b1b1;
    --jtc-sc-almost-root-text: #3b3b3b;
    --jtc-sc-header-search: #f3f3f3;
    --jtc-sc-border: #d5d5d5;
    --jtc-sc-whiteout: #ffffffe6;
    --jtc-sc-block: #f3f3f3;
    --jtc-sc-bar: #ffffff;
    --jtc-sc-popup: #ffffff;
    }

    :root.jtc-sc-dark {
    --jtc-sc-root-text: #ffffff;
    --jtc-sc-bg: #000000;
    --jtc-sc-header: #111;
    --jtc-sc-header-active: #0c0c0c;
    --jtc-sc-header-border: #1a1a1a;
    --jtc-sc-border-light: #0e0e0e;
    --jtc-sc-tag-bg: #262626;
    --jtc-sc-tag-hover-bg: #424242;
    --jtc-sc-light-text: #bfbfbf;
    --jtc-sc-btn-main: #ffffff;
    --jtc-sc-btn-main-text: #000000;
    --jtc-sc-btn: #272727;
    --jtc-sc-btn-hover: #373737;
    --jtc-sc-text-verylight: #707070;
    --jtc-sc-almost-root-text: #e8e8e8;
    --jtc-sc-header-search: #242424;
    --jtc-sc-border: #585858;
    --jtc-sc-whiteout: #000000e6;
    --jtc-sc-block: #101010;
    --jtc-sc-bar: #282828;
    --jtc-sc-popup: #181818;
    }
    `);

  addCss(`
    :root.jtc-sc-dark {
        color-scheme: dark;
    }

    :root { font-family: 'Inter', sans-serif; }

    body {
        color: var(--jtc-sc-root-text);
        background: var(--jtc-sc-bg);
        font-family: 'Inter', sans-serif;
    }

    * {
        font-family: 'Inter', sans-serif;
    }

    .sc-classic .sidebarHeader__title, .sc-text, button, input, select, textarea {
        color: var(--jtc-sc-root-text);
    }

    .sc-classic .header {
        background-color: var(--jtc-sc-header);
    }

    .sc-classic .sound__soundActions {
        background-color: var(--jtc-sc-bg);
    }

    .sc-classic .header {
        font-size: 14px;
        font-weight: 400;
    }

    .sc-classic .headerMenu, .sc-font-light, .sc-type-light, .sc-classic .spotlightTitle, .sc-classic .userstream__header {
        font-weight: 400;
    }

    .sc-classic .header>li>a:focus, .sc-classic .header__navMenu>li>a.selected {
        text-decoration: underline;
        background-color: var(--jtc-sc-header-active);
    }

    .sc-type-large {
        font-size: 20px;
        font-weight: 400;
    }

    .sc-type-light:not(.systemPlaylistBannerItem) {
        color: var(--jtc-sc-light-text)...
    }

    :root:not(.jtc-sc-dark) .systemPlaylistBannerItem .sc-button-icon:before {
        filter: brightness(0) grayscale(1);
    }

    .sc-classic .header__navMenu>li>a {
        border-color: var(--jtc-sc-header-border);
    }

    .sc-border-light, .sc-border-light-top, .sc-border-light-right, .sc-border-light-bottom, .sc-border-light-left {
        border-color: var(--jtc-sc-border-light);
    }

    .sc-classic .l-fluid-fixed .l-main, .sc-classic .sidebarHeader {
        border: none;
    }

    .sc-classic .sidebarHeader, .sc-classic .sidebarHeader__more {
        font-weight: 400;
    }

    .sidebarHeader__icon {
        filter: brightness(0) grayscale(1);
    }

    :root.jtc-sc-dark .sidebarHeader__icon {
        filter: brightness(100) grayscale(1);
    }

    .sc-tag, .sc-tag:visited {
        background-color: var(--jtc-sc-tag-bg);
        color: var(--jtc-sc-root-text);
        font-weight: 400;
        border: none;
    }

    .sc-tag-small, .sc-tag-small:visited {
        height: 18px;
        padding: 0 8px;
        line-height: 18px;
        font-size: 14px;
    }

    .sc-tag:hover {
        background-color: var(--jtc-sc-tag-hover-bg);
        color: var(--jtc-sc-root-text);
    }

    .sc-classic .compactTrackListItem, .sc-classic .compactTrackList {
        border: none;
    }

    .sc-classic .compactTrackListItem {
        height: 32px;
    }

    .sc-classic .compactTrackListItem__image {
        margin: 0 5px 0 0;
    }

    .sc-classic .soundTitle__uploadTime {
        color: var(--jtc-sc-light-text);
        font-weight: 400;
    }

    .sc-classic .g-tabs, .infoStats__stat, .sc-border-light-top.g-box-full, .sc-classic .mixedSelectionModule, .sc-classic .l-footer.standard {
        border: none;
    }

    .sc-classic .g-type-shrinkwrap-block, .sc-classic .g-type-shrinkwrap-block:hover, .sc-classic .g-type-shrinkwrap-block:visited, .sc-classic .g-type-shrinkwrap-inline, .sc-classic .g-type-shrinkwrap-inline:hover, .sc-classic .g-type-shrinkwrap-inline:visited {
        background-color: #000000b3;
        backdrop-filter: blur(10px);
        border-radius: 2px;
    }

    .sc-classic .g-type-shrinkwrap-large-primary, .sc-classic .g-type-shrinkwrap-primary, .sc-classic .g-type-shrinkwrap-large-secondary, .sc-classic .g-type-shrinkwrap-large-secondary:visited, .sc-classic .g-type-shrinkwrap-secondary, .sc-classic .g-type-shrinkwrap-secondary:visited {
        font-weight: 400;
    }

    .sc-button$BTN_EXCLUDE {
        border: none;
        background-color: var(--jtc-sc-btn);
        color: var(--jtc-sc-root-text);
        font-weight: 400;
        border-radius: 5px;
    }

    .moreActions .sc-button:not(:hover)$BTN_EXCLUDE {
        background-color: transparent;
    }

    .sc-button:hover$BTN_EXCLUDE {
        background-color: var(--jtc-sc-btn-hover);
    }

    :root.jtc-sc-dark .sc-button:not(.sc-button-selected):not(.sc-button-active)$BTN_EXCLUDE:before {
        filter: brightness(100) grayscale(1);
    }

    .sc-button:not(.sc-button-more).sc-button-active$BTN_EXCLUDE, .sc-button:not(.sc-button-more).sc-button-selected$BTN_EXCLUDE {
        background-color: #f50;
        color: white;
    }

    .sc-button.sc-button-more.sc-button-active$BTN_EXCLUDE, .sc-button.sc-button-more.sc-button-selected$BTN_EXCLUDE {
        background-color: var(--jtc-sc-btn-hover);
    }

    .sc-button-active:not(.sc-button-more)$BTN_EXCLUDE:before, .sc-button-selected:not(.sc-button-more)$BTN_EXCLUDE:before {
        filter: brightness(100) grayscale(1);
    }

    .sc-button.sc-button-follow:not(.sc-button-selected):not(.sc-button-active)$BTN_EXCLUDE {
        background-color: var(--jtc-sc-btn-main);
        color: var(--jtc-sc-btn-main-text);
    }

    .sc-button.sc-button-follow:not(.sc-button-selected):not(.sc-button-active)$BTN_EXCLUDE:before {
        filter: brightness(100) grayscale(1);
    }

    :root.jtc-sc-dark .sc-button.sc-button-follow:not(.sc-button-selected):not(.sc-button-active)$BTN_EXCLUDE:before {
        filter: brightness(0) grayscale(1);
    }

    a.sc-link-dark {
        color: var(--jtc-sc-root-text);
    }

    a.sc-link-light {
        color: var(--jtc-sc-light-text);
    }

    .sc-type-large, .sc-classic .mixedSelectionModule__titleText {
        color: var(--jtc-sc-root-text);
        font-weight: 400;
    }

    .sc-classic .listenEngagement, .sc-classic .l-listen-wrapper .l-about-rows, .sc-clearfix.sc-border-light-bottom {
        border: none;
        box-shadow: none;
    }

    .sc-type-medium, .sc-type-small, .sc-ministats, .sc-buylink-medium {
        font-weight: 400;
    }

    a.sc-link-verylight {
        color: var(--jtc-sc-text-verylight);
    }

    .sc-classic .soundBadge__additional {
        background: linear-gradient(90deg,hsl(0deg 0% 100% / 0%),var(--jtc-sc-bg)17px);
    }

    .sc-classic .truncatedAudioInfo.m-overflow.m-collapsed .truncatedAudioInfo__wrapper:after {
        background: linear-gradient(hsla(0,0%,100%,0),var(--jtc-sc-bg));
    }

    .sc-classic .g-tabs-link:not(.g-tabs-link.active), .sc-classic .g-tabs-link:visited:not(.g-tabs-link.active), .sc-buylink {
        color: var(--jtc-sc-almost-root-text);
    }

    :root.jtc-sc-dark .backgroundGradient {
        filter: brightness(0.4) saturate(1.6);
    }

    .sc-classic .truncatedUserDescription.m-overflow.m-collapsed .truncatedUserDescription__wrapper:after {
        background: linear-gradient(hsla(0,0%,100%,0),var(--jtc-sc-bg));
    }

    .sc-classic .dropbar__content {
        background-color: var(--jtc-sc-bg);
    }

    .sc-classic .image__whiteOutline .image__full {
        border-color: var(--jtc-sc-bg);
    }

    .sc-classic .moreActions {
        border-color: var(--jtc-sc-btn-hover);
    }

    .sc-classic .compactTrackListItem__number, .sc-classic .compactTrackListItem__trackTitle {
        color: var(--jtc-sc-root-text);
    }

    .sc-classic .compactTrackListItem__user, .sc-ministats-small:not(.sc-ministats-inverted) {
        color: var(--jtc-sc-light-text);
    }

    .sc-classic .compactTrackListItem.clickToPlay.active, .sc-classic .compactTrackListItem.clickToPlay:focus, .sc-classic .compactTrackListItem.clickToPlay:hover, .sc-classic .compactTrackList__moreLink:focus, .sc-classic .compactTrackList__moreLink:hover {
        background-color: var(--jtc-sc-btn-hover);
        color: var(--jtc-sc-root-text);
    }

    .sc-classic .compactTrackListItem.clickToPlay.active .compactTrackListItem__additional, .sc-classic .compactTrackListItem.clickToPlay:focus .compactTrackListItem__additional, .sc-classic .compactTrackListItem.clickToPlay:hover .compactTrackListItem__additional {
        background: linear-gradient(90deg,hsla(0,0%,100%,0),var(--jtc-sc-btn-hover) 17px);
    }

    .sc-classic .tileGallery__sliderButton:after {
        border-color: var(--jtc-sc-root-text);
    }

    .sc-classic .searchTitle {
        background-color: var(--jtc-sc-bg);
    }

    .sc-classic .searchTitle__text, .sc-classic .g-form-section-head {
        border: none;
    }

    .sc-classic .g-nav-item:not(.active)>.g-nav-link {
        color: var(--jtc-sc-root-text);
    }

    .sc-classic .g-nav-item:not(.active) .g-nav-link {
        filter: brightness(0) grayscale(1);
    }

    :root.jtc-sc-dark .sc-classic .g-nav-item:not(.active) .g-nav-link {
        filter: brightness(100) grayscale(1);
    }

    .sc-classic .g-form-section-title {
        color: var(--jtc-sc-almost-root-text);
        font-weight: 400;
    }

    .sc-classic .hintButton, .sc-ministats-small.sc-ministats-sounds:before {
        filter: brightness(0) grayscale(1);
    }

    :root.jtc-sc-dark .sc-classic .hintButton, :root.jtc-sc-dark .sc-ministats-small.sc-ministats-sounds:before, :root.jtc-sc-dark .sc-classic .reportCopyright {
        filter: brightness(100) grayscale(1);
    }

    input, select, textarea {
        background-color: var(--jtc-sc-bg);
        border-color: var(--jtc-sc-border);
        border-width: 1.5px;
        font-weight: 400;
    }

    .g-dark input[type=password], .g-dark input[type=search], .g-dark input[type=text], .g-dark select, .g-dark textarea {
        background-color: var(--jtc-sc-header-search);
    }

    .sc-select {
        font-weight: 400;
    }

    .sc-toggle {
        background-color: var(--jtc-sc-btn);
        border-color: var(--jtc-sc-btn);
    }

    .sc-toggle-handle {
        background-color: var(--jtc-sc-bg);
    }

    .sc-classic .commentForm__input {
        border: none;
        border-bottom: 2px solid var(--jtc-sc-bg);
        border-radius: 0px;
        transition: border-color 0.2s;
        padding: 0;
        margin: 0 9px;
    }

    .sc-classic .commentForm__inputWrapper.focused .commentForm__input {
        border-color: var(--jtc-sc-border);
    }

    .sc-classic .commentForm__wrapper {
        background-image: none;
        background-color: var(--jtc-sc-bg);
        border: none;
    }

    .sc-classic .audibleEditForm__audio, .sc-classic .audibleEditForm__form, .sc-classic .tabs__headingContainer, .sc-classic .tabs__tabs, .sc-classic .tagInput__wrapper, .sc-classic .uploadMain__foot, .sc-classic .uploadMain__chooserContainer, .sc-classic .quotaMeterWrapper, .sc-classic .profileUploadFooter, .sc-classic .trackManager__upsellWrapper {
        background-color: var(--jtc-sc-popup);
    }

    .sc-classic .modal.modalWhiteout {
        background-color: var(--jtc-sc-whiteout);
    }

    .sc-classic .dialog, .sc-classic .dialog__arrow {
        background-color: var(--jtc-sc-popup);
        border-color: var(--jtc-sc-border);
    }

    .sc-classic .linkMenu {
        background-color: var(--jtc-sc-bg);
        border: 1px solid var(--jtc-sc-border);
    }

    .sc-classic .g-upsell-container, .sc-classic .sidebarInfoBox__body {
        background-color: var(--jtc-sc-block);
        border-color: var(--jtc-sc-border);
    }

    .sc-classic .blockCheckbox, .sc-text-light {
        color: var(--jtc-sc-light-text);
    }

    .sc-classic .blockCheckbox__title {
        color: var(--jtc-sc-root-text);
    }

    :root.jtc-sc-dark .sc-classic .blockCheckbox:not(.m-checked) .blockCheckbox__icon {
        filter: grayscale(1) brightness(0.2);
    }

    .sc-background-white {
        background-color: var(--jtc-sc-bg);
    }

    .sc-classic .modal__modal {
        background-color: var(--jtc-sc-popup);
        border-color: var(--jtc-sc-border);
    }

    .sc-background-light, .statsOverview__separator {
        background-color: var(--jtc-sc-block);
    }

    .topStatsItemPlaceholder__text:after, .topStatsItemPlaceholder__text:before {
        background-color: var(--jtc-sc-light-text);
    }

    .sc-classic .moreActions__group:not(:first-child), .topStatsModule__item, .sc-border-dark, .topStatsItemPlaceholder.listener .topStatsItemPlaceholder__visual {
        border-color: var(--jtc-sc-border);
    }

    .sc-classic .paging-eof:before {
        background: none;
    }

    .sc-classic .collection.m-overview .collection__section:not(:last-child), .sc-classic .g-modal-title-h1 {
        border: none;
    }

    .sc-classic .playControls__bg, .sc-classic .playControls__inner, .sc-classic .volume__sliderWrapper {
        background-color: var(--jtc-sc-bar);
    }

    .sc-classic .playControls__inner {
        box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%);
    }

    .sc-classic .playControls__bg, .sc-classic .playControls__inner {
        border-color: var(--jtc-sc-border);
    }

    .sc-classic .soundContext__line {
        color: var(--jtc-sc-light-text);
    }

    :root.jtc-sc-dark .sc-classic .playControls__elements .playControls__control, :root.jtc-sc-dark .sc-classic .volume__button, :root.jtc-sc-dark .sc-classic .playbackSoundBadge__follow:not(.sc-button-selected), :root.jtc-sc-dark .sc-classic .playbackSoundBadge__like:not(.sc-button-selected) {
        filter: brightness(100) grayscale(1);
    }

    :root.jtc-sc-dark .sc-classic .queue__hide, :root.jtc-sc-dark .sc-classic .queueItemView__more.sc-button-small:before, :root.jtc-sc-dark .sc-button-small.queueItemView__like:not(.sc-button-selected):before  {
        filter: brightness(100) grayscale(1);
    }

    .sc-classic .playbackTimeline__progressBackground, .sc-classic .volume__sliderBackground {
        background-color: var(--jtc-sc-border);
    }

    .sc-classic .volume__sliderWrapper:before, .sc-classic .volume__sliderWrapper:after {
        border-color: transparent transparent var(--jtc-sc-border) var(--jtc-sc-border);
    }

    .sc-classic .volume.expanded .volume__sliderWrapper {
        border-color: var(--jtc-sc-border);
    }

    .sc-classic .playControls__castControl>#castbutton {
        --disconnected-color: var(--jtc-sc-root-text);
    }

    .sc-classic .playbackSoundBadge:not(.m-queueVisible) .playbackSoundBadge__queueIcon {
        fill: var(--jtc-sc-root-text);
    }

    .sc-classic .gritter-item-wrapper {
        background-color: var(--jtc-sc-block);
        color: var(--jtc-sc-root-text);
        border-color: var(--jtc-sc-border);
    }

    .sc-classic .playbackTimeline__duration {
        color: var(--jtc-sc-light-text);
    }

    .sc-classic .playbackSoundBadge__titleLink, .sc-classic .playbackSoundBadge__titleLink:visited {
        color: var(--jtc-sc-root-text);
    }

    .sc-classic .queue, .sc-classic .queue__itemWrapper {
        background-color: var(--jtc-sc-popup);
    }

    .sc-classic .queue__itemsHeight {
        background: var(--jtc-sc-popup);
    }

    .sc-classic .queue__panel {
        border-color: var(--jtc-sc-border);
    }

    .sc-classic .queueFallback__stationMode, .sc-classic .queue__panel {
        border: none;
    }

    .sc-classic .keyboardShortcuts__shortcutsGroup>dl>dt>kbd>kbd {
        background-color: var(--jtc-sc-btn);
    }

    .sc-classic .queueItemView.m-active, .sc-classic .queueItemView:hover {
        background-color: var(--jtc-sc-btn-hover);
    }

    .sc-classic .moreActions {
        background-color: var(--jtc-sc-popup);
        padding: 4px;
        border-radius: 5px;
    }

    .sc-classic .headerMenu {
        padding: 0px 4px;
        border-radius: 5px;
        margin-top: 4px;
        border: 1px solid var(--jtc-sc-border);
        background-color: var(--jtc-sc-popup);
    }

    .sc-classic .headerMenu__list {
        padding: 4px 0px;
    }

    .sc-classic .headerMenu__list li .headerMenu__link {
        border-radius: 5px;
    }

    .sc-classic .dropdownContent__container {
        background-color: var(--jtc-sc-popup);
    }

    .sc-classic .dropdownContent__header, .sc-classic .dropdownContent__main, .sc-classic .dropdownContent__container, .sc-classic .dropdownContent__listItem, .sc-classic .activitiesListFull__item+.activitiesListFull__item, .sc-classic .composeMessage__bottomWrapper {
        border-color: var(--jtc-sc-border);
    }

    .sc-classic .notificationBadge__main {
        font-weight: 400;
        color: var(--jtc-sc-light-text);
    }

    .sc-classic .conversation__actions {
        background-color: var(--jtc-sc-bg);
        box-shadow: none;
    }

    .sc-classic .conversation__form {
        border: none;
    }

    .sc-classic .inbox__item:before {
        background-color: var(--jtc-sc-bg);
    }

    .sc-classic .inboxItem.active, .sc-classic .inboxItem.unread, .sc-classic .inboxItem:focus, .sc-classic .inboxItem:hover {
        background-color: var(--jtc-sc-btn-hover);
    }

    .sc-classic .trackItem.active, .sc-classic .trackItem.hover {
        background-color: var(--jtc-sc-btn-hover);
    }

    .sc-classic .trackItem:not(.m-disabled).active .trackItem__additional, .sc-classic .trackItem:not(.m-disabled).hover .trackItem__additional {
        background: linear-gradient(90deg,hsla(0,0%,100%,0),var(--jtc-sc-btn-hover) 17px);
    }

    .sc-classic .commentPopover.darkText .commentPopover__body {
        color: var(--jtc-sc-root-text);
    }
    .addToPlaylist > section {
    	background-color: black;
      color: white;
    }
    
    .sc-classic  .header__logoLink {
       background-image: url(https://media.tenor.com/CkUXnAoOwUoAAAAM/monika-glitch.gif);
       background-size: 68px 46px;
       background-position-x: 0;
       background-position-y: 0;
    }
    
    `.replaceAll(";", " !important;")
         .replaceAll("...", " ;")
         .replaceAll("$BTN_EXCLUDE", ":not(.reportCopyright):not(.hintButton):not(.sc-classic .playbackSoundBadge .playbackSoundBadge__follow):not(.sc-classic .playbackSoundBadge .playbackSoundBadge__like):not(.sc-button-nostyle):not(.sc-button-next):not(.sc-button-pause):not(.sc-button-play):not(.sc-button-prev):not(.sc-button-blocked)")
        );
})();
