/*! Vendors v3.1.2 */
/*!
  * Bootstrap v4.5.3 (https://getbootstrap.com/)
  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.bootstrap = {}, global.jQuery));
}(this, (function (exports, $) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($);

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.5.3): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    if (obj === null || typeof obj === 'undefined') {
      return "" + obj;
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($__default['default'](event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined;
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $__default['default'](this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $__default['default'].fn.emulateTransitionEnd = transitionEndEmulator;
    $__default['default'].event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (_) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $__default['default'](element).css('transition-duration');
      var transitionDelay = $__default['default'](element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $__default['default'](element).trigger(TRANSITION_END);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    },
    jQueryDetection: function jQueryDetection() {
      if (typeof $__default['default'] === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      }

      var version = $__default['default'].fn.jquery.split(' ')[0].split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;

      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      }
    }
  };
  Util.jQueryDetection();
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.5.3';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $__default['default'].fn[NAME];
  var SELECTOR_DISMISS = '[data-dismiss="alert"]';
  var EVENT_CLOSE = "close" + EVENT_KEY;
  var EVENT_CLOSED = "closed" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var CLASS_NAME_ALERT = 'alert';
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_SHOW = 'show';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = /*#__PURE__*/function () {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $__default['default'](element).closest("." + CLASS_NAME_ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $__default['default'].Event(EVENT_CLOSE);
      $__default['default'](element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $__default['default'](element).removeClass(CLASS_NAME_SHOW);

      if (!$__default['default'](element).hasClass(CLASS_NAME_FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $__default['default'](element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $__default['default'](element).detach().trigger(EVENT_CLOSED).remove();
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME] = Alert._jQueryInterface;
  $__default['default'].fn[NAME].Constructor = Alert;

  $__default['default'].fn[NAME].noConflict = function () {
    $__default['default'].fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'button';
  var VERSION$1 = '4.5.3';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $__default['default'].fn[NAME$1];
  var CLASS_NAME_ACTIVE = 'active';
  var CLASS_NAME_BUTTON = 'btn';
  var CLASS_NAME_FOCUS = 'focus';
  var SELECTOR_DATA_TOGGLE_CARROT = '[data-toggle^="button"]';
  var SELECTOR_DATA_TOGGLES = '[data-toggle="buttons"]';
  var SELECTOR_DATA_TOGGLE = '[data-toggle="button"]';
  var SELECTOR_DATA_TOGGLES_BUTTONS = '[data-toggle="buttons"] .btn';
  var SELECTOR_INPUT = 'input:not([type="hidden"])';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_BUTTON = '.btn';
  var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$1 + DATA_API_KEY$1;
  var EVENT_FOCUS_BLUR_DATA_API = "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1);
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$1 + DATA_API_KEY$1;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = /*#__PURE__*/function () {
    function Button(element) {
      this._element = element;
      this.shouldAvoidTriggerChange = false;
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $__default['default'](this._element).closest(SELECTOR_DATA_TOGGLES)[0];

      if (rootElement) {
        var input = this._element.querySelector(SELECTOR_INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(SELECTOR_ACTIVE);

              if (activeElement) {
                $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
            if (input.type === 'checkbox' || input.type === 'radio') {
              input.checked = !this._element.classList.contains(CLASS_NAME_ACTIVE);
            }

            if (!this.shouldAvoidTriggerChange) {
              $__default['default'](input).trigger('change');
            }
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(CLASS_NAME_ACTIVE));
        }

        if (triggerChangeEvent) {
          $__default['default'](this._element).toggleClass(CLASS_NAME_ACTIVE);
        }
      }
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config, avoidTriggerChange) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $element.data(DATA_KEY$1, data);
        }

        data.shouldAvoidTriggerChange = avoidTriggerChange;

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
    var button = event.target;
    var initialButton = button;

    if (!$__default['default'](button).hasClass(CLASS_NAME_BUTTON)) {
      button = $__default['default'](button).closest(SELECTOR_BUTTON)[0];
    }

    if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
      event.preventDefault(); // work around Firefox bug #1540995
    } else {
      var inputBtn = button.querySelector(SELECTOR_INPUT);

      if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
        event.preventDefault(); // work around Firefox bug #1540995

        return;
      }

      if (initialButton.tagName === 'INPUT' || button.tagName !== 'LABEL') {
        Button._jQueryInterface.call($__default['default'](button), 'toggle', initialButton.tagName === 'INPUT');
      }
    }
  }).on(EVENT_FOCUS_BLUR_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
    var button = $__default['default'](event.target).closest(SELECTOR_BUTTON)[0];
    $__default['default'](button).toggleClass(CLASS_NAME_FOCUS, /^focus(in)?$/.test(event.type));
  });
  $__default['default'](window).on(EVENT_LOAD_DATA_API, function () {
    // ensure correct active class is set to match the controls' actual values/states
    // find all checkboxes/readio buttons inside data-toggle groups
    var buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLES_BUTTONS));

    for (var i = 0, len = buttons.length; i < len; i++) {
      var button = buttons[i];
      var input = button.querySelector(SELECTOR_INPUT);

      if (input.checked || input.hasAttribute('checked')) {
        button.classList.add(CLASS_NAME_ACTIVE);
      } else {
        button.classList.remove(CLASS_NAME_ACTIVE);
      }
    } // find all button toggles


    buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE));

    for (var _i = 0, _len = buttons.length; _i < _len; _i++) {
      var _button = buttons[_i];

      if (_button.getAttribute('aria-pressed') === 'true') {
        _button.classList.add(CLASS_NAME_ACTIVE);
      } else {
        _button.classList.remove(CLASS_NAME_ACTIVE);
      }
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$1] = Button._jQueryInterface;
  $__default['default'].fn[NAME$1].Constructor = Button;

  $__default['default'].fn[NAME$1].noConflict = function () {
    $__default['default'].fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'carousel';
  var VERSION$2 = '4.5.3';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $__default['default'].fn[NAME$2];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var DIRECTION_NEXT = 'next';
  var DIRECTION_PREV = 'prev';
  var DIRECTION_LEFT = 'left';
  var DIRECTION_RIGHT = 'right';
  var EVENT_SLIDE = "slide" + EVENT_KEY$2;
  var EVENT_SLID = "slid" + EVENT_KEY$2;
  var EVENT_KEYDOWN = "keydown" + EVENT_KEY$2;
  var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY$2;
  var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY$2;
  var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$2;
  var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$2;
  var EVENT_TOUCHEND = "touchend" + EVENT_KEY$2;
  var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$2;
  var EVENT_POINTERUP = "pointerup" + EVENT_KEY$2;
  var EVENT_DRAG_START = "dragstart" + EVENT_KEY$2;
  var EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$2 + DATA_API_KEY$2;
  var EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$2 + DATA_API_KEY$2;
  var CLASS_NAME_CAROUSEL = 'carousel';
  var CLASS_NAME_ACTIVE$1 = 'active';
  var CLASS_NAME_SLIDE = 'slide';
  var CLASS_NAME_RIGHT = 'carousel-item-right';
  var CLASS_NAME_LEFT = 'carousel-item-left';
  var CLASS_NAME_NEXT = 'carousel-item-next';
  var CLASS_NAME_PREV = 'carousel-item-prev';
  var CLASS_NAME_POINTER_EVENT = 'pointer-event';
  var SELECTOR_ACTIVE$1 = '.active';
  var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  var SELECTOR_ITEM = '.carousel-item';
  var SELECTOR_ITEM_IMG = '.carousel-item img';
  var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  var SELECTOR_INDICATORS = '.carousel-indicators';
  var SELECTOR_DATA_SLIDE = '[data-slide], [data-slide-to]';
  var SELECTOR_DATA_RIDE = '[data-ride="carousel"]';
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = /*#__PURE__*/function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(SELECTOR_INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(DIRECTION_NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      var $element = $__default['default'](this._element); // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible

      if (!document.hidden && $element.is(':visible') && $element.css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(DIRECTION_PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(SELECTOR_NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $__default['default'](this._element).one(EVENT_SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $__default['default'](this._element).off(EVENT_KEY$2);
      $__default['default'].removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, config);
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $__default['default'](this._element).on(EVENT_KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $__default['default'](this._element).on(EVENT_MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(EVENT_MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $__default['default'](this._element.querySelectorAll(SELECTOR_ITEM_IMG)).on(EVENT_DRAG_START, function (e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $__default['default'](this._element).on(EVENT_POINTERDOWN, function (event) {
          return start(event);
        });
        $__default['default'](this._element).on(EVENT_POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        $__default['default'](this._element).on(EVENT_TOUCHSTART, function (event) {
          return start(event);
        });
        $__default['default'](this._element).on(EVENT_TOUCHMOVE, function (event) {
          return move(event);
        });
        $__default['default'](this._element).on(EVENT_TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(SELECTOR_ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === DIRECTION_NEXT;
      var isPrevDirection = direction === DIRECTION_PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === DIRECTION_PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(SELECTOR_ACTIVE_ITEM));

      var slideEvent = $__default['default'].Event(EVENT_SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $__default['default'](this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(SELECTOR_ACTIVE$1));
        $__default['default'](indicators).removeClass(CLASS_NAME_ACTIVE$1);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $__default['default'](nextIndicator).addClass(CLASS_NAME_ACTIVE$1);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === DIRECTION_NEXT) {
        directionalClassName = CLASS_NAME_LEFT;
        orderClassName = CLASS_NAME_NEXT;
        eventDirectionName = DIRECTION_LEFT;
      } else {
        directionalClassName = CLASS_NAME_RIGHT;
        orderClassName = CLASS_NAME_PREV;
        eventDirectionName = DIRECTION_RIGHT;
      }

      if (nextElement && $__default['default'](nextElement).hasClass(CLASS_NAME_ACTIVE$1)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $__default['default'].Event(EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($__default['default'](this._element).hasClass(CLASS_NAME_SLIDE)) {
        $__default['default'](nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $__default['default'](activeElement).addClass(directionalClassName);
        $__default['default'](nextElement).addClass(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $__default['default'](activeElement).one(Util.TRANSITION_END, function () {
          $__default['default'](nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(CLASS_NAME_ACTIVE$1);
          $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE$1 + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $__default['default'](_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $__default['default'](activeElement).removeClass(CLASS_NAME_ACTIVE$1);
        $__default['default'](nextElement).addClass(CLASS_NAME_ACTIVE$1);
        this._isSliding = false;
        $__default['default'](this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$2);

        var _config = _extends({}, Default, $__default['default'](this).data());

        if (typeof config === 'object') {
          _config = _extends({}, _config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $__default['default'](this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $__default['default'](selector)[0];

      if (!target || !$__default['default'](target).hasClass(CLASS_NAME_CAROUSEL)) {
        return;
      }

      var config = _extends({}, $__default['default'](target).data(), $__default['default'](this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($__default['default'](target), config);

      if (slideIndex) {
        $__default['default'](target).data(DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$2, SELECTOR_DATA_SLIDE, Carousel._dataApiClickHandler);
  $__default['default'](window).on(EVENT_LOAD_DATA_API$1, function () {
    var carousels = [].slice.call(document.querySelectorAll(SELECTOR_DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $__default['default'](carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$2] = Carousel._jQueryInterface;
  $__default['default'].fn[NAME$2].Constructor = Carousel;

  $__default['default'].fn[NAME$2].noConflict = function () {
    $__default['default'].fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'collapse';
  var VERSION$3 = '4.5.3';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $__default['default'].fn[NAME$3];
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var EVENT_SHOW = "show" + EVENT_KEY$3;
  var EVENT_SHOWN = "shown" + EVENT_KEY$3;
  var EVENT_HIDE = "hide" + EVENT_KEY$3;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY$3;
  var EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$3 + DATA_API_KEY$3;
  var CLASS_NAME_SHOW$1 = 'show';
  var CLASS_NAME_COLLAPSE = 'collapse';
  var CLASS_NAME_COLLAPSING = 'collapsing';
  var CLASS_NAME_COLLAPSED = 'collapsed';
  var DIMENSION_WIDTH = 'width';
  var DIMENSION_HEIGHT = 'height';
  var SELECTOR_ACTIVES = '.show, .collapsing';
  var SELECTOR_DATA_TOGGLE$1 = '[data-toggle="collapse"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = /*#__PURE__*/function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$1));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($__default['default'](this._element).hasClass(CLASS_NAME_SHOW$1)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $__default['default'](this._element).hasClass(CLASS_NAME_SHOW$1)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(SELECTOR_ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(CLASS_NAME_COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $__default['default'](actives).not(this._selector).data(DATA_KEY$3);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $__default['default'].Event(EVENT_SHOW);
      $__default['default'](this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($__default['default'](actives).not(this._selector), 'hide');

        if (!activesData) {
          $__default['default'](actives).data(DATA_KEY$3, null);
        }
      }

      var dimension = this._getDimension();

      $__default['default'](this._element).removeClass(CLASS_NAME_COLLAPSE).addClass(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $__default['default'](this._triggerArray).removeClass(CLASS_NAME_COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $__default['default'](_this._element).removeClass(CLASS_NAME_COLLAPSING).addClass(CLASS_NAME_COLLAPSE + " " + CLASS_NAME_SHOW$1);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $__default['default'](_this._element).trigger(EVENT_SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$__default['default'](this._element).hasClass(CLASS_NAME_SHOW$1)) {
        return;
      }

      var startEvent = $__default['default'].Event(EVENT_HIDE);
      $__default['default'](this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $__default['default'](this._element).addClass(CLASS_NAME_COLLAPSING).removeClass(CLASS_NAME_COLLAPSE + " " + CLASS_NAME_SHOW$1);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $__default['default']([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(CLASS_NAME_SHOW$1)) {
              $__default['default'](trigger).addClass(CLASS_NAME_COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $__default['default'](_this2._element).removeClass(CLASS_NAME_COLLAPSING).addClass(CLASS_NAME_COLLAPSE).trigger(EVENT_HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$1, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $__default['default'](this._element).hasClass(DIMENSION_WIDTH);
      return hasWidth ? DIMENSION_WIDTH : DIMENSION_HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $__default['default'](children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $__default['default'](element).hasClass(CLASS_NAME_SHOW$1);

      if (triggerArray.length) {
        $__default['default'](triggerArray).toggleClass(CLASS_NAME_COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$3);

        var _config = _extends({}, Default$1, $element.data(), typeof config === 'object' && config ? config : {});

        if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $element.data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$1, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $__default['default'](this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $__default['default'](selectors).each(function () {
      var $target = $__default['default'](this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$3] = Collapse._jQueryInterface;
  $__default['default'].fn[NAME$3].Constructor = Collapse;

  $__default['default'].fn[NAME$3].noConflict = function () {
    $__default['default'].fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  };

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.1
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

  var timeoutDuration = function () {
    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
      if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        return 1;
      }
    }
    return 0;
  }();

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }
      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser && window.Promise;

  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */
  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */
  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    }
    // NOTE: 1 DOM access here
    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }

  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */
  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }
    return element.parentNode || element.host;
  }

  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */
  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well

    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  /**
   * Returns the reference node of the reference object, or the reference object itself.
   * @method
   * @memberof Popper.Utils
   * @param {Element|Object} reference - the reference element (the popper will be relative to this)
   * @returns {Element} parent
   */
  function getReferenceNode(reference) {
    return reference && reference.referenceNode ? reference.referenceNode : reference;
  }

  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }
    if (version === 10) {
      return isIE10;
    }
    return isIE11 || isIE10;
  }

  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */
  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE(10) ? document.body : null;

    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent || null;
    // Skip hidden elements which don't have an offsetParent
    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    }

    // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...
    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }
    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }

  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */
  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }

  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */
  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    }

    // Here we make sure to give as "start" the element that comes first in the DOM
    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1;

    // Get common ancestor container
    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer;

    // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    }

    // one of the nodes is inside shadowDOM, find which one
    var element1root = getRoot(element1);
    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }

  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */
  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }

  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */
  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }

  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */

  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

    return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }

  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);

    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();





  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
  function getClientRect(offsets) {
    return _extends$1({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }

  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */
  function getBoundingClientRect(element) {
    var rect = {};

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };

    // subtract scrollbar size from sizes
    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.width;
    var height = sizes.height || element.clientHeight || result.height;

    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height;

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');

      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);

    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth);

    // In cases where the parent is fixed, we must ignore negative scroll in offset calc
    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }
    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0;

    // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.
    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop);
      var marginLeft = parseFloat(styles.marginLeft);

      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;

      // Attach marginTop and marginLeft because in some circumstances we may need them
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);

    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };

    return getClientRect(offset);
  }

  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */
  function isFixed(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }
    var parentNode = getParentNode(element);
    if (!parentNode) {
      return false;
    }
    return isFixed(parentNode);
  }

  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */

  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }
    var el = element.parentElement;
    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }
    return el || document.documentElement;
  }

  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */
  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    // NOTE: 1 DOM access here

    var boundaries = { top: 0, left: 0 };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

    // Handle viewport case
    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;
      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));
        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

      // In case of HTML, we need a different computation
      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    }

    // Add paddings
    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;

    return width * height;
  }

  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };

    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends$1({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });

    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });

    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

    var variation = placement.split('-')[1];

    return computedPlacement + (variation ? '-' + variation : '');
  }

  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */
  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }

  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */
  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }

  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */
  function getOppositePlacement(placement) {
    var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }

  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */
  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    var popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }

  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function find(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
  }

  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    var match = find(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }

  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */
  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }
      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
      if (modifier.enabled && isFunction(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);

        data = fn(data, modifier);
      }
    });

    return data;
  }

  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */
  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    };

    // compute reference element offsets
    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

    // store the computed placement inside `originalPlacement`
    data.originalPlacement = data.placement;

    data.positionFixed = this.options.positionFixed;

    // compute the popper offsets
    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

    // run the modifiers
    data = runModifiers(this.modifiers, data);

    // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback
    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }

  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */
  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }

  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */
  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;
      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  }

  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */
  function destroy() {
    this.state.isDestroyed = true;

    // touch DOM only if `applyStyle` modifier is enabled
    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners();

    // remove the popper if user explicitly asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it
    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }
    return this;
  }

  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */
  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, { passive: true });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }
    scrollParents.push(target);
  }

  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

    // Scroll event listener on scroll parents
    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;

    return state;
  }

  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */
  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }

  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound);

    // Remove scroll event listener on scroll parents
    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    });

    // Reset state
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }

  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */
  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }

  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */
  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }

  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */
  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles);

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, data.attributes);

    // if arrowElement is defined and arrowStyles has some properties
    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }

  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */
  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

    popper.setAttribute('x-placement', placement);

    // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations
    setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

    return options;
  }

  /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */
  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var round = Math.round,
        floor = Math.floor;

    var noRound = function noRound(v) {
      return v;
    };

    var referenceWidth = round(reference.width);
    var popperWidth = round(popper.width);

    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    var verticalToInteger = !shouldRound ? noRound : round;

    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper;

    // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }
    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent);

    // Styles
    var styles = {
      position: popper.position
    };

    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right';

    // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    var prefixedProperty = getSupportedPropertyName('transform');

    // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.
    var left = void 0,
        top = void 0;
    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }
    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }
    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    }

    // Attributes
    var attributes = {
      'x-placement': data.placement
    };

    // Update `data` attributes, styles and arrowStyles
    data.attributes = _extends$1({}, attributes, data.attributes);
    data.styles = _extends$1({}, styles, data.styles);
    data.arrowStyles = _extends$1({}, data.offsets.arrow, data.arrowStyles);

    return data;
  }

  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */
  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });

    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';
      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }
    return isRequired;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function arrow(data, options) {
    var _data$offsets$arrow;

    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement);

      // if arrowElement is not found, don't run the modifier
      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isVertical = ['left', 'right'].indexOf(placement) !== -1;

    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }
    data.offsets.popper = getClientRect(data.offsets.popper);

    // compute center of the popper
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available
    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

    return data;
  }

  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */
  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }
    return variation;
  }

  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */
  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

  // Get rid of `auto` `auto-start` and `auto-end`
  var validPlacements = placements.slice(3);

  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */
  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';

    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;
      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;
      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

      // flip the variation if required
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

      // flips variation if reference element overflows boundaries
      var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      // flips variation if popper content overflows boundaries
      var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

      var flippedVariation = flippedVariationByRef || flippedVariationByContent;

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : '');

        // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future
        data.offsets.popper = _extends$1({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }
    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }

  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */
  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2];

    // If it's not a number it's an operator, I guess
    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;
      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;
      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }

  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */
  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0];

    // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one
    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

    // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    });

    // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space
    var divider = fragments.indexOf(find(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    }

    // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.
    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

    // Convert the values with units to absolute pixels to allow our computations
    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op
      // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, [])
      // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    });

    // Loop trough the offsets arrays and execute the operations
    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */
  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var basePlacement = placement.split('-')[0];

    var offsets = void 0;
    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    }

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification
    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];

    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    options.boundaries = boundaries;

    var order = options.priority;
    var popper = data.offsets.popper;

    var check = {
      primary: function primary(placement) {
        var value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }
        return defineProperty({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }
        return defineProperty({}, mainSide, value);
      }
    };

    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends$1({}, popper, check[side](placement));
    });

    data.offsets.popper = popper;

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;

      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      var shiftOffsets = {
        start: defineProperty({}, side, reference[side]),
        end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
      };

      data.offsets.popper = _extends$1({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
  }

  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */
  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: offset,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: preventOverflow,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: arrow,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: flip,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport',
      /**
       * @prop {Boolean} flipVariations=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the reference element overlaps its boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariations: false,
      /**
       * @prop {Boolean} flipVariationsByContent=false
       * The popper will switch placement variation between `-start` and `-end` when
       * the popper element overlaps its reference boundaries.
       *
       * The original placement should have a set variation.
       */
      flipVariationsByContent: false
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,
      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: computeStyle,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: applyStyle,
      /** @prop {Function} */
      onLoad: applyStyleOnLoad,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };

  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */
  var Defaults = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers
  };

  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */

  // Utils
  // Methods
  var Popper = function () {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {Element|referenceObject} reference - The reference element used to position the popper
     * @param {Element} popper - The HTML / XML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      };

      // make update() debounced, so that it only runs at most once-per-tick
      this.update = debounce(this.update.bind(this));

      // with {} we create a new object with the options inside it
      this.options = _extends$1({}, Popper.Defaults, options);

      // init state
      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      };

      // get reference and popper elements (allow jQuery wrappers)
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;

      // Deep merge modifiers options
      this.options.modifiers = {};
      Object.keys(_extends$1({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends$1({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends$1({
          name: name
        }, _this.options.modifiers[name]);
      })
      // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      });

      // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      });

      // fire the first update to position the popper in the right place
      this.update();

      var eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    }

    // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }

      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */


      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();

  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '4.5.3';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$4 = $__default['default'].fn[NAME$4];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var EVENT_HIDE$1 = "hide" + EVENT_KEY$4;
  var EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$4;
  var EVENT_SHOW$1 = "show" + EVENT_KEY$4;
  var EVENT_SHOWN$1 = "shown" + EVENT_KEY$4;
  var EVENT_CLICK = "click" + EVENT_KEY$4;
  var EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$4 + DATA_API_KEY$4;
  var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$4 + DATA_API_KEY$4;
  var CLASS_NAME_DISABLED = 'disabled';
  var CLASS_NAME_SHOW$2 = 'show';
  var CLASS_NAME_DROPUP = 'dropup';
  var CLASS_NAME_DROPRIGHT = 'dropright';
  var CLASS_NAME_DROPLEFT = 'dropleft';
  var CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
  var CLASS_NAME_POSITION_STATIC = 'position-static';
  var SELECTOR_DATA_TOGGLE$2 = '[data-toggle="dropdown"]';
  var SELECTOR_FORM_CHILD = '.dropdown form';
  var SELECTOR_MENU = '.dropdown-menu';
  var SELECTOR_NAVBAR_NAV = '.navbar-nav';
  var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  var PLACEMENT_TOP = 'top-start';
  var PLACEMENT_TOPEND = 'top-end';
  var PLACEMENT_BOTTOM = 'bottom-start';
  var PLACEMENT_BOTTOMEND = 'bottom-end';
  var PLACEMENT_RIGHT = 'right-start';
  var PLACEMENT_LEFT = 'left-start';
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = /*#__PURE__*/function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var isActive = $__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$2);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      this.show(true);
    };

    _proto.show = function show(usePopper) {
      if (usePopper === void 0) {
        usePopper = false;
      }

      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED) || $__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$2)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $__default['default'].Event(EVENT_SHOW$1, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $__default['default'](parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar && usePopper) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $__default['default'](parent).addClass(CLASS_NAME_POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $__default['default'](parent).closest(SELECTOR_NAVBAR_NAV).length === 0) {
        $__default['default'](document.body).children().on('mouseover', null, $__default['default'].noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $__default['default'](this._menu).toggleClass(CLASS_NAME_SHOW$2);
      $__default['default'](parent).toggleClass(CLASS_NAME_SHOW$2).trigger($__default['default'].Event(EVENT_SHOWN$1, relatedTarget));
    };

    _proto.hide = function hide() {
      if (this._element.disabled || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED) || !$__default['default'](this._menu).hasClass(CLASS_NAME_SHOW$2)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $__default['default'].Event(EVENT_HIDE$1, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $__default['default'](parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      if (this._popper) {
        this._popper.destroy();
      }

      $__default['default'](this._menu).toggleClass(CLASS_NAME_SHOW$2);
      $__default['default'](parent).toggleClass(CLASS_NAME_SHOW$2).trigger($__default['default'].Event(EVENT_HIDDEN$1, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$4);
      $__default['default'](this._element).off(EVENT_KEY$4);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $__default['default'](this._element).on(EVENT_CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, this.constructor.Default, $__default['default'](this._element).data(), config);
      Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(SELECTOR_MENU);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $__default['default'](this._element.parentNode);
      var placement = PLACEMENT_BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(CLASS_NAME_DROPUP)) {
        placement = $__default['default'](this._menu).hasClass(CLASS_NAME_MENURIGHT) ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPRIGHT)) {
        placement = PLACEMENT_RIGHT;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPLEFT)) {
        placement = PLACEMENT_LEFT;
      } else if ($__default['default'](this._menu).hasClass(CLASS_NAME_MENURIGHT)) {
        placement = PLACEMENT_BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $__default['default'](this._element).closest('.navbar').length > 0;
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      }; // Disable Popper.js if we have a static display

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return _extends({}, popperConfig, this._config.popperConfig);
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$4);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $__default['default'](this).data(DATA_KEY$4, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE$2));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $__default['default'](toggles[i]).data(DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$__default['default'](parent).hasClass(CLASS_NAME_SHOW$2)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $__default['default'].contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $__default['default'].Event(EVENT_HIDE$1, relatedTarget);
        $__default['default'](parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $__default['default'](document.body).children().off('mouseover', null, $__default['default'].noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        }

        $__default['default'](dropdownMenu).removeClass(CLASS_NAME_SHOW$2);
        $__default['default'](parent).removeClass(CLASS_NAME_SHOW$2).trigger($__default['default'].Event(EVENT_HIDDEN$1, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    } // eslint-disable-next-line complexity
    ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $__default['default'](event.target).closest(SELECTOR_MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      if (this.disabled || $__default['default'](this).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $__default['default'](parent).hasClass(CLASS_NAME_SHOW$2);

      if (!isActive && event.which === ESCAPE_KEYCODE) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (!isActive || event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE) {
        if (event.which === ESCAPE_KEYCODE) {
          $__default['default'](parent.querySelector(SELECTOR_DATA_TOGGLE$2)).trigger('focus');
        }

        $__default['default'](this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(SELECTOR_VISIBLE_ITEMS)).filter(function (item) {
        return $__default['default'](item).is(':visible');
      });

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown._dataApiKeydownHandler).on(EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown._dataApiKeydownHandler).on(EVENT_CLICK_DATA_API$4 + " " + EVENT_KEYUP_DATA_API, Dropdown._clearMenus).on(EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$2, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($__default['default'](this), 'toggle');
  }).on(EVENT_CLICK_DATA_API$4, SELECTOR_FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$4] = Dropdown._jQueryInterface;
  $__default['default'].fn[NAME$4].Constructor = Dropdown;

  $__default['default'].fn[NAME$4].noConflict = function () {
    $__default['default'].fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'modal';
  var VERSION$5 = '4.5.3';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$5 = $__default['default'].fn[NAME$5];
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var EVENT_HIDE$2 = "hide" + EVENT_KEY$5;
  var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$5;
  var EVENT_HIDDEN$2 = "hidden" + EVENT_KEY$5;
  var EVENT_SHOW$2 = "show" + EVENT_KEY$5;
  var EVENT_SHOWN$2 = "shown" + EVENT_KEY$5;
  var EVENT_FOCUSIN = "focusin" + EVENT_KEY$5;
  var EVENT_RESIZE = "resize" + EVENT_KEY$5;
  var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$5;
  var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY$5;
  var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$5;
  var EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$5 + DATA_API_KEY$5;
  var CLASS_NAME_SCROLLABLE = 'modal-dialog-scrollable';
  var CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
  var CLASS_NAME_BACKDROP = 'modal-backdrop';
  var CLASS_NAME_OPEN = 'modal-open';
  var CLASS_NAME_FADE$1 = 'fade';
  var CLASS_NAME_SHOW$3 = 'show';
  var CLASS_NAME_STATIC = 'modal-static';
  var SELECTOR_DIALOG = '.modal-dialog';
  var SELECTOR_MODAL_BODY = '.modal-body';
  var SELECTOR_DATA_TOGGLE$3 = '[data-toggle="modal"]';
  var SELECTOR_DATA_DISMISS = '[data-dismiss="modal"]';
  var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  var SELECTOR_STICKY_CONTENT = '.sticky-top';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = /*#__PURE__*/function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(SELECTOR_DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if ($__default['default'](this._element).hasClass(CLASS_NAME_FADE$1)) {
        this._isTransitioning = true;
      }

      var showEvent = $__default['default'].Event(EVENT_SHOW$2, {
        relatedTarget: relatedTarget
      });
      $__default['default'](this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $__default['default'](this._element).on(EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $__default['default'](this._dialog).on(EVENT_MOUSEDOWN_DISMISS, function () {
        $__default['default'](_this._element).one(EVENT_MOUSEUP_DISMISS, function (event) {
          if ($__default['default'](event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = $__default['default'].Event(EVENT_HIDE$2);
      $__default['default'](this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$1);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $__default['default'](document).off(EVENT_FOCUSIN);
      $__default['default'](this._element).removeClass(CLASS_NAME_SHOW$3);
      $__default['default'](this._element).off(EVENT_CLICK_DISMISS);
      $__default['default'](this._dialog).off(EVENT_MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default['default'](this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return $__default['default'](htmlElement).off(EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `EVENT_CLICK_DATA_API` event that should remain
       */

      $__default['default'](document).off(EVENT_FOCUSIN);
      $__default['default'].removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$3, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
      var _this3 = this;

      if (this._config.backdrop === 'static') {
        var hideEventPrevented = $__default['default'].Event(EVENT_HIDE_PREVENTED);
        $__default['default'](this._element).trigger(hideEventPrevented);

        if (hideEventPrevented.isDefaultPrevented()) {
          return;
        }

        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!isModalOverflowing) {
          this._element.style.overflowY = 'hidden';
        }

        this._element.classList.add(CLASS_NAME_STATIC);

        var modalTransitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $__default['default'](this._element).off(Util.TRANSITION_END);
        $__default['default'](this._element).one(Util.TRANSITION_END, function () {
          _this3._element.classList.remove(CLASS_NAME_STATIC);

          if (!isModalOverflowing) {
            $__default['default'](_this3._element).one(Util.TRANSITION_END, function () {
              _this3._element.style.overflowY = '';
            }).emulateTransitionEnd(_this3._element, modalTransitionDuration);
          }
        }).emulateTransitionEnd(modalTransitionDuration);

        this._element.focus();
      } else {
        this.hide();
      }
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this4 = this;

      var transition = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$1);
      var modalBody = this._dialog ? this._dialog.querySelector(SELECTOR_MODAL_BODY) : null;

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      if ($__default['default'](this._dialog).hasClass(CLASS_NAME_SCROLLABLE) && modalBody) {
        modalBody.scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $__default['default'](this._element).addClass(CLASS_NAME_SHOW$3);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $__default['default'].Event(EVENT_SHOWN$2, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this4._config.focus) {
          _this4._element.focus();
        }

        _this4._isTransitioning = false;
        $__default['default'](_this4._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $__default['default'](this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this5 = this;

      $__default['default'](document).off(EVENT_FOCUSIN) // Guard against infinite focus loop
      .on(EVENT_FOCUSIN, function (event) {
        if (document !== event.target && _this5._element !== event.target && $__default['default'](_this5._element).has(event.target).length === 0) {
          _this5._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $__default['default'](this._element).on(EVENT_KEYDOWN_DISMISS, function (event) {
          if (_this6._config.keyboard && event.which === ESCAPE_KEYCODE$1) {
            event.preventDefault();

            _this6.hide();
          } else if (!_this6._config.keyboard && event.which === ESCAPE_KEYCODE$1) {
            _this6._triggerBackdropTransition();
          }
        });
      } else if (!this._isShown) {
        $__default['default'](this._element).off(EVENT_KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this7 = this;

      if (this._isShown) {
        $__default['default'](window).on(EVENT_RESIZE, function (event) {
          return _this7.handleUpdate(event);
        });
      } else {
        $__default['default'](window).off(EVENT_RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this8 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $__default['default'](document.body).removeClass(CLASS_NAME_OPEN);

        _this8._resetAdjustments();

        _this8._resetScrollbar();

        $__default['default'](_this8._element).trigger(EVENT_HIDDEN$2);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $__default['default'](this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this9 = this;

      var animate = $__default['default'](this._element).hasClass(CLASS_NAME_FADE$1) ? CLASS_NAME_FADE$1 : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = CLASS_NAME_BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $__default['default'](this._backdrop).appendTo(document.body);
        $__default['default'](this._element).on(EVENT_CLICK_DISMISS, function (event) {
          if (_this9._ignoreBackdropClick) {
            _this9._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          _this9._triggerBackdropTransition();
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $__default['default'](this._backdrop).addClass(CLASS_NAME_SHOW$3);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $__default['default'](this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $__default['default'](this._backdrop).removeClass(CLASS_NAME_SHOW$3);

        var callbackRemove = function callbackRemove() {
          _this9._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($__default['default'](this._element).hasClass(CLASS_NAME_FADE$1)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $__default['default'](this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this10 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(SELECTOR_STICKY_CONTENT)); // Adjust fixed content padding

        $__default['default'](fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $__default['default'](element).css('padding-right');
          $__default['default'](element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $__default['default'](stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $__default['default'](element).css('margin-right');
          $__default['default'](element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $__default['default'](document.body).css('padding-right');
        $__default['default'](document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $__default['default'](document.body).addClass(CLASS_NAME_OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT));
      $__default['default'](fixedContent).each(function (index, element) {
        var padding = $__default['default'](element).data('padding-right');
        $__default['default'](element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("" + SELECTOR_STICKY_CONTENT));
      $__default['default'](elements).each(function (index, element) {
        var margin = $__default['default'](element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $__default['default'](element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $__default['default'](document.body).data('padding-right');
      $__default['default'](document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$5);

        var _config = _extends({}, Default$3, $__default['default'](this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $__default['default'](this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$3, function (event) {
    var _this11 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $__default['default'](target).data(DATA_KEY$5) ? 'toggle' : _extends({}, $__default['default'](target).data(), $__default['default'](this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $__default['default'](target).one(EVENT_SHOW$2, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(EVENT_HIDDEN$2, function () {
        if ($__default['default'](_this11).is(':visible')) {
          _this11.focus();
        }
      });
    });

    Modal._jQueryInterface.call($__default['default'](target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$5] = Modal._jQueryInterface;
  $__default['default'].fn[NAME$5].Constructor = Modal;

  $__default['default'].fn[NAME$5].noConflict = function () {
    $__default['default'].fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.5.3): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, len = regExp.length; i < len; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'tooltip';
  var VERSION$6 = '4.5.3';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $__default['default'].fn[NAME$6];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object',
    popperConfig: '(null|object)'
  };
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist,
    popperConfig: null
  };
  var HOVER_STATE_SHOW = 'show';
  var HOVER_STATE_OUT = 'out';
  var Event = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var CLASS_NAME_FADE$2 = 'fade';
  var CLASS_NAME_SHOW$4 = 'show';
  var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  var SELECTOR_ARROW = '.arrow';
  var TRIGGER_HOVER = 'hover';
  var TRIGGER_FOCUS = 'focus';
  var TRIGGER_CLICK = 'click';
  var TRIGGER_MANUAL = 'manual';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = /*#__PURE__*/function () {
    function Tooltip(element, config) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $__default['default'](event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $__default['default'](event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($__default['default'](this.getTipElement()).hasClass(CLASS_NAME_SHOW$4)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $__default['default'].removeData(this.element, this.constructor.DATA_KEY);
      $__default['default'](this.element).off(this.constructor.EVENT_KEY);
      $__default['default'](this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        $__default['default'](this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($__default['default'](this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $__default['default'].Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $__default['default'](this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $__default['default'].contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $__default['default'](tip).addClass(CLASS_NAME_FADE$2);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $__default['default'](tip).data(this.constructor.DATA_KEY, this);

        if (!$__default['default'].contains(this.element.ownerDocument.documentElement, this.tip)) {
          $__default['default'](tip).appendTo(container);
        }

        $__default['default'](this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, this._getPopperConfig(attachment));
        $__default['default'](tip).addClass(CLASS_NAME_SHOW$4); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $__default['default'](document.body).children().on('mouseover', null, $__default['default'].noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $__default['default'](_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HOVER_STATE_OUT) {
            _this._leave(null, _this);
          }
        };

        if ($__default['default'](this.tip).hasClass(CLASS_NAME_FADE$2)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $__default['default'](this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $__default['default'].Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $__default['default'](_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $__default['default'](this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $__default['default'](tip).removeClass(CLASS_NAME_SHOW$4); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $__default['default'](document.body).children().off('mouseover', null, $__default['default'].noop);
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;

      if ($__default['default'](this.tip).hasClass(CLASS_NAME_FADE$2)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $__default['default'](tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $__default['default'](this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $__default['default'](this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($__default['default'](tip.querySelectorAll(SELECTOR_TOOLTIP_INNER)), this.getTitle());
      $__default['default'](tip).removeClass(CLASS_NAME_FADE$2 + " " + CLASS_NAME_SHOW$4);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$__default['default'](content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($__default['default'](content).text());
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this3 = this;

      var defaultBsConfig = {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: SELECTOR_ARROW
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(data) {
          if (data.originalPlacement !== data.placement) {
            _this3._handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          return _this3._handlePopperPlacementChange(data);
        }
      };
      return _extends({}, defaultBsConfig, this.config.popperConfig);
    };

    _proto._getOffset = function _getOffset() {
      var _this4 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _extends({}, data.offsets, _this4.config.offset(data.offsets, _this4.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (Util.isElement(this.config.container)) {
        return $__default['default'](this.config.container);
      }

      return $__default['default'](document).find(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this5 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $__default['default'](_this5.element).on(_this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
            return _this5.toggle(event);
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
          var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
          $__default['default'](_this5.element).on(eventIn, _this5.config.selector, function (event) {
            return _this5._enter(event);
          }).on(eventOut, _this5.config.selector, function (event) {
            return _this5._leave(event);
          });
        }
      });

      this._hideModalHandler = function () {
        if (_this5.element) {
          _this5.hide();
        }
      };

      $__default['default'](this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler);

      if (this.config.selector) {
        this.config = _extends({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $__default['default'](event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $__default['default'](event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
      }

      if ($__default['default'](context.getTipElement()).hasClass(CLASS_NAME_SHOW$4) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $__default['default'](event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $__default['default'](event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $__default['default'](this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _extends({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $__default['default'](this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      this.tip = popperData.instance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $__default['default'](tip).removeClass(CLASS_NAME_FADE$2);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$6);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $element.data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $__default['default'].fn[NAME$6] = Tooltip._jQueryInterface;
  $__default['default'].fn[NAME$6].Constructor = Tooltip;

  $__default['default'].fn[NAME$6].noConflict = function () {
    $__default['default'].fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Tooltip._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$7 = 'popover';
  var VERSION$7 = '4.5.3';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var JQUERY_NO_CONFLICT$7 = $__default['default'].fn[NAME$7];
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _extends({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _extends({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var CLASS_NAME_FADE$3 = 'fade';
  var CLASS_NAME_SHOW$5 = 'show';
  var SELECTOR_TITLE = '.popover-header';
  var SELECTOR_CONTENT = '.popover-body';
  var Event$1 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = /*#__PURE__*/function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $__default['default'](this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $__default['default'](this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $__default['default'](this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(SELECTOR_TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(SELECTOR_CONTENT), content);
      $tip.removeClass(CLASS_NAME_FADE$3 + " " + CLASS_NAME_SHOW$5);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $__default['default'](this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    } // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$7);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $__default['default'](this).data(DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$1;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $__default['default'].fn[NAME$7] = Popover._jQueryInterface;
  $__default['default'].fn[NAME$7].Constructor = Popover;

  $__default['default'].fn[NAME$7].noConflict = function () {
    $__default['default'].fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Popover._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'scrollspy';
  var VERSION$8 = '4.5.3';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $__default['default'].fn[NAME$8];
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var EVENT_ACTIVATE = "activate" + EVENT_KEY$8;
  var EVENT_SCROLL = "scroll" + EVENT_KEY$8;
  var EVENT_LOAD_DATA_API$2 = "load" + EVENT_KEY$8 + DATA_API_KEY$6;
  var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  var CLASS_NAME_ACTIVE$2 = 'active';
  var SELECTOR_DATA_SPY = '[data-spy="scroll"]';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_NAV_LINKS = '.nav-link';
  var SELECTOR_NAV_ITEMS = '.nav-item';
  var SELECTOR_LIST_ITEMS = '.list-group-item';
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_DROPDOWN_ITEMS = '.dropdown-item';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var METHOD_OFFSET = 'offset';
  var METHOD_POSITION = 'position';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = /*#__PURE__*/function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + SELECTOR_NAV_LINKS + "," + (this._config.target + " " + SELECTOR_LIST_ITEMS + ",") + (this._config.target + " " + SELECTOR_DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $__default['default'](this._scrollElement).on(EVENT_SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$__default['default'](target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$8);
      $__default['default'](this._scrollElement).off(EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$6, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string' && Util.isElement(config.target)) {
        var id = $__default['default'](config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME$8);
          $__default['default'](config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $__default['default']([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(CLASS_NAME_DROPDOWN_ITEM)) {
        $link.closest(SELECTOR_DROPDOWN).find(SELECTOR_DROPDOWN_TOGGLE).addClass(CLASS_NAME_ACTIVE$2);
        $link.addClass(CLASS_NAME_ACTIVE$2);
      } else {
        // Set triggered link as active
        $link.addClass(CLASS_NAME_ACTIVE$2); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).addClass(CLASS_NAME_ACTIVE$2); // Handle special case when .nav-link is inside .nav-item

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_ITEMS).children(SELECTOR_NAV_LINKS).addClass(CLASS_NAME_ACTIVE$2);
      }

      $__default['default'](this._scrollElement).trigger(EVENT_ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(CLASS_NAME_ACTIVE$2);
      }).forEach(function (node) {
        return node.classList.remove(CLASS_NAME_ACTIVE$2);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default['default'](this).data(DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $__default['default'](this).data(DATA_KEY$8, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](window).on(EVENT_LOAD_DATA_API$2, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(SELECTOR_DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $__default['default'](scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$8] = ScrollSpy._jQueryInterface;
  $__default['default'].fn[NAME$8].Constructor = ScrollSpy;

  $__default['default'].fn[NAME$8].noConflict = function () {
    $__default['default'].fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'tab';
  var VERSION$9 = '4.5.3';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $__default['default'].fn[NAME$9];
  var EVENT_HIDE$3 = "hide" + EVENT_KEY$9;
  var EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$9;
  var EVENT_SHOW$3 = "show" + EVENT_KEY$9;
  var EVENT_SHOWN$3 = "shown" + EVENT_KEY$9;
  var EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$9 + DATA_API_KEY$7;
  var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  var CLASS_NAME_ACTIVE$3 = 'active';
  var CLASS_NAME_DISABLED$1 = 'disabled';
  var CLASS_NAME_FADE$4 = 'fade';
  var CLASS_NAME_SHOW$6 = 'show';
  var SELECTOR_DROPDOWN$1 = '.dropdown';
  var SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
  var SELECTOR_ACTIVE$2 = '.active';
  var SELECTOR_ACTIVE_UL = '> li > .active';
  var SELECTOR_DATA_TOGGLE$4 = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = '> .dropdown-menu .active';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = /*#__PURE__*/function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $__default['default'](this._element).hasClass(CLASS_NAME_ACTIVE$3) || $__default['default'](this._element).hasClass(CLASS_NAME_DISABLED$1)) {
        return;
      }

      var target;
      var previous;
      var listElement = $__default['default'](this._element).closest(SELECTOR_NAV_LIST_GROUP$1)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE$2;
        previous = $__default['default'].makeArray($__default['default'](listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $__default['default'].Event(EVENT_HIDE$3, {
        relatedTarget: this._element
      });
      var showEvent = $__default['default'].Event(EVENT_SHOW$3, {
        relatedTarget: previous
      });

      if (previous) {
        $__default['default'](previous).trigger(hideEvent);
      }

      $__default['default'](this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $__default['default'].Event(EVENT_HIDDEN$3, {
          relatedTarget: _this._element
        });
        var shownEvent = $__default['default'].Event(EVENT_SHOWN$3, {
          relatedTarget: previous
        });
        $__default['default'](previous).trigger(hiddenEvent);
        $__default['default'](_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $__default['default'].removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $__default['default'](container).find(SELECTOR_ACTIVE_UL) : $__default['default'](container).children(SELECTOR_ACTIVE$2);
      var active = activeElements[0];
      var isTransitioning = callback && active && $__default['default'](active).hasClass(CLASS_NAME_FADE$4);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = Util.getTransitionDurationFromElement(active);
        $__default['default'](active).removeClass(CLASS_NAME_SHOW$6).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $__default['default'](active).removeClass(CLASS_NAME_ACTIVE$3);
        var dropdownChild = $__default['default'](active.parentNode).find(SELECTOR_DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $__default['default'](dropdownChild).removeClass(CLASS_NAME_ACTIVE$3);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $__default['default'](element).addClass(CLASS_NAME_ACTIVE$3);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE$4)) {
        element.classList.add(CLASS_NAME_SHOW$6);
      }

      if (element.parentNode && $__default['default'](element.parentNode).hasClass(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = $__default['default'](element).closest(SELECTOR_DROPDOWN$1)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(SELECTOR_DROPDOWN_TOGGLE$1));
          $__default['default'](dropdownToggleList).addClass(CLASS_NAME_ACTIVE$3);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $__default['default'](this);
        var data = $this.data(DATA_KEY$9);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$9, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $__default['default'](document).on(EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$4, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($__default['default'](this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $__default['default'].fn[NAME$9] = Tab._jQueryInterface;
  $__default['default'].fn[NAME$9].Constructor = Tab;

  $__default['default'].fn[NAME$9].noConflict = function () {
    $__default['default'].fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'toast';
  var VERSION$a = '4.5.3';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $__default['default'].fn[NAME$a];
  var EVENT_CLICK_DISMISS$1 = "click.dismiss" + EVENT_KEY$a;
  var EVENT_HIDE$4 = "hide" + EVENT_KEY$a;
  var EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$a;
  var EVENT_SHOW$4 = "show" + EVENT_KEY$a;
  var EVENT_SHOWN$4 = "shown" + EVENT_KEY$a;
  var CLASS_NAME_FADE$5 = 'fade';
  var CLASS_NAME_HIDE = 'hide';
  var CLASS_NAME_SHOW$7 = 'show';
  var CLASS_NAME_SHOWING = 'showing';
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var SELECTOR_DATA_DISMISS$1 = '[data-dismiss="toast"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Toast = /*#__PURE__*/function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      var showEvent = $__default['default'].Event(EVENT_SHOW$4);
      $__default['default'](this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE$5);
      }

      var complete = function complete() {
        _this._element.classList.remove(CLASS_NAME_SHOWING);

        _this._element.classList.add(CLASS_NAME_SHOW$7);

        $__default['default'](_this._element).trigger(EVENT_SHOWN$4);

        if (_this._config.autohide) {
          _this._timeout = setTimeout(function () {
            _this.hide();
          }, _this._config.delay);
        }
      };

      this._element.classList.remove(CLASS_NAME_HIDE);

      Util.reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide() {
      if (!this._element.classList.contains(CLASS_NAME_SHOW$7)) {
        return;
      }

      var hideEvent = $__default['default'].Event(EVENT_HIDE$4);
      $__default['default'](this._element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      this._close();
    };

    _proto.dispose = function dispose() {
      this._clearTimeout();

      if (this._element.classList.contains(CLASS_NAME_SHOW$7)) {
        this._element.classList.remove(CLASS_NAME_SHOW$7);
      }

      $__default['default'](this._element).off(EVENT_CLICK_DISMISS$1);
      $__default['default'].removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default$7, $__default['default'](this._element).data(), typeof config === 'object' && config ? config : {});
      Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this2 = this;

      $__default['default'](this._element).on(EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function () {
        return _this2.hide();
      });
    };

    _proto._close = function _close() {
      var _this3 = this;

      var complete = function complete() {
        _this3._element.classList.add(CLASS_NAME_HIDE);

        $__default['default'](_this3._element).trigger(EVENT_HIDDEN$4);
      };

      this._element.classList.remove(CLASS_NAME_SHOW$7);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $__default['default'](this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._clearTimeout = function _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $__default['default'](this);
        var data = $element.data(DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY$a, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Toast;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $__default['default'].fn[NAME$a] = Toast._jQueryInterface;
  $__default['default'].fn[NAME$a].Constructor = Toast;

  $__default['default'].fn[NAME$a].noConflict = function () {
    $__default['default'].fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
  };

  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;
  exports.Util = Util;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bootstrap.bundle.js.map

/*!
 * Name    : Just Another Parallax [Jarallax]
 * Version : 1.12.4
 * Author  : nK <https://nkdev.info>
 * GitHub  : https://github.com/nk-o/jarallax
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

module.exports = function (callback) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Already ready or interactive, execute callback
    callback.call();
  } else if (document.attachEvent) {
    // Old browsers
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'interactive') callback.call();
    });
  } else if (document.addEventListener) {
    // Modern browsers
    document.addEventListener('DOMContentLoaded', callback);
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
  win = window;
} else if (typeof global !== "undefined") {
  win = global;
} else if (typeof self !== "undefined") {
  win = self;
} else {
  win = {};
}

module.exports = win;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lite_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var lite_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lite_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jarallax_esm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



 // no conflict

var oldPlugin = global__WEBPACK_IMPORTED_MODULE_1__["window"].jarallax;
global__WEBPACK_IMPORTED_MODULE_1__["window"].jarallax = _jarallax_esm__WEBPACK_IMPORTED_MODULE_2__["default"];

global__WEBPACK_IMPORTED_MODULE_1__["window"].jarallax.noConflict = function () {
  global__WEBPACK_IMPORTED_MODULE_1__["window"].jarallax = oldPlugin;
  return this;
}; // jQuery support


if ('undefined' !== typeof global__WEBPACK_IMPORTED_MODULE_1__["jQuery"]) {
  var jQueryPlugin = function jQueryPlugin() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    Array.prototype.unshift.call(args, this);
    var res = _jarallax_esm__WEBPACK_IMPORTED_MODULE_2__["default"].apply(global__WEBPACK_IMPORTED_MODULE_1__["window"], args);
    return 'object' !== _typeof(res) ? res : this;
  };

  jQueryPlugin.constructor = _jarallax_esm__WEBPACK_IMPORTED_MODULE_2__["default"].constructor; // no conflict

  var oldJqPlugin = global__WEBPACK_IMPORTED_MODULE_1__["jQuery"].fn.jarallax;
  global__WEBPACK_IMPORTED_MODULE_1__["jQuery"].fn.jarallax = jQueryPlugin;

  global__WEBPACK_IMPORTED_MODULE_1__["jQuery"].fn.jarallax.noConflict = function () {
    global__WEBPACK_IMPORTED_MODULE_1__["jQuery"].fn.jarallax = oldJqPlugin;
    return this;
  };
} // data-jarallax initialization


lite_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  Object(_jarallax_esm__WEBPACK_IMPORTED_MODULE_2__["default"])(document.querySelectorAll('[data-jarallax]'));
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lite_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var lite_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lite_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_1__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var navigator = global__WEBPACK_IMPORTED_MODULE_1__["window"].navigator;
var isIE = -1 < navigator.userAgent.indexOf('MSIE ') || -1 < navigator.userAgent.indexOf('Trident/') || -1 < navigator.userAgent.indexOf('Edge/');
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

var supportTransform = function () {
  var prefixes = 'transform WebkitTransform MozTransform'.split(' ');
  var div = document.createElement('div');

  for (var i = 0; i < prefixes.length; i += 1) {
    if (div && div.style[prefixes[i]] !== undefined) {
      return prefixes[i];
    }
  }

  return false;
}();

var $deviceHelper;
/**
 * The most popular mobile browsers changes height after page scroll and this generates image jumping.
 * We can fix it using this workaround with vh units.
 */

function getDeviceHeight() {
  if (!$deviceHelper && document.body) {
    $deviceHelper = document.createElement('div');
    $deviceHelper.style.cssText = 'position: fixed; top: -9999px; left: 0; height: 100vh; width: 0;';
    document.body.appendChild($deviceHelper);
  }

  return ($deviceHelper ? $deviceHelper.clientHeight : 0) || global__WEBPACK_IMPORTED_MODULE_1__["window"].innerHeight || document.documentElement.clientHeight;
} // Window height data


var wndH;

function updateWndVars() {
  if (isMobile) {
    wndH = getDeviceHeight();
  } else {
    wndH = global__WEBPACK_IMPORTED_MODULE_1__["window"].innerHeight || document.documentElement.clientHeight;
  }
}

updateWndVars();
global__WEBPACK_IMPORTED_MODULE_1__["window"].addEventListener('resize', updateWndVars);
global__WEBPACK_IMPORTED_MODULE_1__["window"].addEventListener('orientationchange', updateWndVars);
global__WEBPACK_IMPORTED_MODULE_1__["window"].addEventListener('load', updateWndVars);
lite_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  updateWndVars({
    type: 'dom-loaded'
  });
}); // list with all jarallax instances
// need to render all in one scroll/resize event

var jarallaxList = []; // get all parents of the element.

function getParents(elem) {
  var parents = [];

  while (null !== elem.parentElement) {
    elem = elem.parentElement;

    if (1 === elem.nodeType) {
      parents.push(elem);
    }
  }

  return parents;
}

function updateParallax() {
  if (!jarallaxList.length) {
    return;
  }

  jarallaxList.forEach(function (data, k) {
    var instance = data.instance,
        oldData = data.oldData;
    var clientRect = instance.$item.getBoundingClientRect();
    var newData = {
      width: clientRect.width,
      height: clientRect.height,
      top: clientRect.top,
      bottom: clientRect.bottom,
      wndW: global__WEBPACK_IMPORTED_MODULE_1__["window"].innerWidth,
      wndH: wndH
    };
    var isResized = !oldData || oldData.wndW !== newData.wndW || oldData.wndH !== newData.wndH || oldData.width !== newData.width || oldData.height !== newData.height;
    var isScrolled = isResized || !oldData || oldData.top !== newData.top || oldData.bottom !== newData.bottom;
    jarallaxList[k].oldData = newData;

    if (isResized) {
      instance.onResize();
    }

    if (isScrolled) {
      instance.onScroll();
    }
  });
  global__WEBPACK_IMPORTED_MODULE_1__["window"].requestAnimationFrame(updateParallax);
}

var instanceID = 0; // Jarallax class

var Jarallax = /*#__PURE__*/function () {
  function Jarallax(item, userOptions) {
    _classCallCheck(this, Jarallax);

    var self = this;
    self.instanceID = instanceID;
    instanceID += 1;
    self.$item = item;
    self.defaults = {
      type: 'scroll',
      // type of parallax: scroll, scale, opacity, scale-opacity, scroll-opacity
      speed: 0.5,
      // supported value from -1 to 2
      imgSrc: null,
      imgElement: '.jarallax-img',
      imgSize: 'cover',
      imgPosition: '50% 50%',
      imgRepeat: 'no-repeat',
      // supported only for background, not for <img> tag
      keepImg: false,
      // keep <img> tag in it's default place
      elementInViewport: null,
      zIndex: -100,
      disableParallax: false,
      disableVideo: false,
      // video
      videoSrc: null,
      videoStartTime: 0,
      videoEndTime: 0,
      videoVolume: 0,
      videoLoop: true,
      videoPlayOnlyVisible: true,
      videoLazyLoading: true,
      // events
      onScroll: null,
      // function(calculations) {}
      onInit: null,
      // function() {}
      onDestroy: null,
      // function() {}
      onCoverImage: null // function() {}

    }; // prepare data-options

    var dataOptions = self.$item.dataset || {};
    var pureDataOptions = {};
    Object.keys(dataOptions).forEach(function (key) {
      var loweCaseOption = key.substr(0, 1).toLowerCase() + key.substr(1);

      if (loweCaseOption && 'undefined' !== typeof self.defaults[loweCaseOption]) {
        pureDataOptions[loweCaseOption] = dataOptions[key];
      }
    });
    self.options = self.extend({}, self.defaults, pureDataOptions, userOptions);
    self.pureOptions = self.extend({}, self.options); // prepare 'true' and 'false' strings to boolean

    Object.keys(self.options).forEach(function (key) {
      if ('true' === self.options[key]) {
        self.options[key] = true;
      } else if ('false' === self.options[key]) {
        self.options[key] = false;
      }
    }); // fix speed option [-1.0, 2.0]

    self.options.speed = Math.min(2, Math.max(-1, parseFloat(self.options.speed))); // prepare disableParallax callback

    if ('string' === typeof self.options.disableParallax) {
      self.options.disableParallax = new RegExp(self.options.disableParallax);
    }

    if (self.options.disableParallax instanceof RegExp) {
      var disableParallaxRegexp = self.options.disableParallax;

      self.options.disableParallax = function () {
        return disableParallaxRegexp.test(navigator.userAgent);
      };
    }

    if ('function' !== typeof self.options.disableParallax) {
      self.options.disableParallax = function () {
        return false;
      };
    } // prepare disableVideo callback


    if ('string' === typeof self.options.disableVideo) {
      self.options.disableVideo = new RegExp(self.options.disableVideo);
    }

    if (self.options.disableVideo instanceof RegExp) {
      var disableVideoRegexp = self.options.disableVideo;

      self.options.disableVideo = function () {
        return disableVideoRegexp.test(navigator.userAgent);
      };
    }

    if ('function' !== typeof self.options.disableVideo) {
      self.options.disableVideo = function () {
        return false;
      };
    } // custom element to check if parallax in viewport


    var elementInVP = self.options.elementInViewport; // get first item from array

    if (elementInVP && 'object' === _typeof(elementInVP) && 'undefined' !== typeof elementInVP.length) {
      var _elementInVP = elementInVP;

      var _elementInVP2 = _slicedToArray(_elementInVP, 1);

      elementInVP = _elementInVP2[0];
    } // check if dom element


    if (!(elementInVP instanceof Element)) {
      elementInVP = null;
    }

    self.options.elementInViewport = elementInVP;
    self.image = {
      src: self.options.imgSrc || null,
      $container: null,
      useImgTag: false,
      // position fixed is needed for the most of browsers because absolute position have glitches
      // on MacOS with smooth scroll there is a huge lags with absolute position - https://github.com/nk-o/jarallax/issues/75
      // on mobile devices better scrolled with absolute position
      position: /iPad|iPhone|iPod|Android/.test(navigator.userAgent) ? 'absolute' : 'fixed'
    };

    if (self.initImg() && self.canInitParallax()) {
      self.init();
    }
  } // add styles to element
  // eslint-disable-next-line class-methods-use-this


  _createClass(Jarallax, [{
    key: "css",
    value: function css(el, styles) {
      if ('string' === typeof styles) {
        return global__WEBPACK_IMPORTED_MODULE_1__["window"].getComputedStyle(el).getPropertyValue(styles);
      } // add transform property with vendor prefix


      if (styles.transform && supportTransform) {
        styles[supportTransform] = styles.transform;
      }

      Object.keys(styles).forEach(function (key) {
        el.style[key] = styles[key];
      });
      return el;
    } // Extend like jQuery.extend
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: "extend",
    value: function extend(out) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      out = out || {};
      Object.keys(args).forEach(function (i) {
        if (!args[i]) {
          return;
        }

        Object.keys(args[i]).forEach(function (key) {
          out[key] = args[i][key];
        });
      });
      return out;
    } // get window size and scroll position. Useful for extensions
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: "getWindowData",
    value: function getWindowData() {
      return {
        width: global__WEBPACK_IMPORTED_MODULE_1__["window"].innerWidth || document.documentElement.clientWidth,
        height: wndH,
        y: document.documentElement.scrollTop
      };
    } // Jarallax functions

  }, {
    key: "initImg",
    value: function initImg() {
      var self = this; // find image element

      var $imgElement = self.options.imgElement;

      if ($imgElement && 'string' === typeof $imgElement) {
        $imgElement = self.$item.querySelector($imgElement);
      } // check if dom element


      if (!($imgElement instanceof Element)) {
        if (self.options.imgSrc) {
          $imgElement = new Image();
          $imgElement.src = self.options.imgSrc;
        } else {
          $imgElement = null;
        }
      }

      if ($imgElement) {
        if (self.options.keepImg) {
          self.image.$item = $imgElement.cloneNode(true);
        } else {
          self.image.$item = $imgElement;
          self.image.$itemParent = $imgElement.parentNode;
        }

        self.image.useImgTag = true;
      } // true if there is img tag


      if (self.image.$item) {
        return true;
      } // get image src


      if (null === self.image.src) {
        self.image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        self.image.bgImage = self.css(self.$item, 'background-image');
      }

      return !(!self.image.bgImage || 'none' === self.image.bgImage);
    }
  }, {
    key: "canInitParallax",
    value: function canInitParallax() {
      return supportTransform && !this.options.disableParallax();
    }
  }, {
    key: "init",
    value: function init() {
      var self = this;
      var containerStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      };
      var imageStyles = {
        pointerEvents: 'none',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        willChange: 'transform,opacity'
      };

      if (!self.options.keepImg) {
        // save default user styles
        var curStyle = self.$item.getAttribute('style');

        if (curStyle) {
          self.$item.setAttribute('data-jarallax-original-styles', curStyle);
        }

        if (self.image.useImgTag) {
          var curImgStyle = self.image.$item.getAttribute('style');

          if (curImgStyle) {
            self.image.$item.setAttribute('data-jarallax-original-styles', curImgStyle);
          }
        }
      } // set relative position and z-index to the parent


      if ('static' === self.css(self.$item, 'position')) {
        self.css(self.$item, {
          position: 'relative'
        });
      }

      if ('auto' === self.css(self.$item, 'z-index')) {
        self.css(self.$item, {
          zIndex: 0
        });
      } // container for parallax image


      self.image.$container = document.createElement('div');
      self.css(self.image.$container, containerStyles);
      self.css(self.image.$container, {
        'z-index': self.options.zIndex
      }); // fix for IE https://github.com/nk-o/jarallax/issues/110

      if (isIE) {
        self.css(self.image.$container, {
          opacity: 0.9999
        });
      }

      self.image.$container.setAttribute('id', "jarallax-container-".concat(self.instanceID));
      self.$item.appendChild(self.image.$container); // use img tag

      if (self.image.useImgTag) {
        imageStyles = self.extend({
          'object-fit': self.options.imgSize,
          'object-position': self.options.imgPosition,
          // support for plugin https://github.com/bfred-it/object-fit-images
          'font-family': "object-fit: ".concat(self.options.imgSize, "; object-position: ").concat(self.options.imgPosition, ";"),
          'max-width': 'none'
        }, containerStyles, imageStyles); // use div with background image
      } else {
        self.image.$item = document.createElement('div');

        if (self.image.src) {
          imageStyles = self.extend({
            'background-position': self.options.imgPosition,
            'background-size': self.options.imgSize,
            'background-repeat': self.options.imgRepeat,
            'background-image': self.image.bgImage || "url(\"".concat(self.image.src, "\")")
          }, containerStyles, imageStyles);
        }
      }

      if ('opacity' === self.options.type || 'scale' === self.options.type || 'scale-opacity' === self.options.type || 1 === self.options.speed) {
        self.image.position = 'absolute';
      } // 1. Check if one of parents have transform style (without this check, scroll transform will be inverted if used parallax with position fixed)
      //    discussion - https://github.com/nk-o/jarallax/issues/9
      // 2. Check if parents have overflow scroll


      if ('fixed' === self.image.position) {
        var $parents = getParents(self.$item).filter(function (el) {
          var styles = global__WEBPACK_IMPORTED_MODULE_1__["window"].getComputedStyle(el);
          var parentTransform = styles['-webkit-transform'] || styles['-moz-transform'] || styles.transform;
          var overflowRegex = /(auto|scroll)/;
          return parentTransform && 'none' !== parentTransform || overflowRegex.test(styles.overflow + styles['overflow-y'] + styles['overflow-x']);
        });
        self.image.position = $parents.length ? 'absolute' : 'fixed';
      } // add position to parallax block


      imageStyles.position = self.image.position; // insert parallax image

      self.css(self.image.$item, imageStyles);
      self.image.$container.appendChild(self.image.$item); // set initial position and size

      self.onResize();
      self.onScroll(true); // call onInit event

      if (self.options.onInit) {
        self.options.onInit.call(self);
      } // remove default user background


      if ('none' !== self.css(self.$item, 'background-image')) {
        self.css(self.$item, {
          'background-image': 'none'
        });
      }

      self.addToParallaxList();
    } // add to parallax instances list

  }, {
    key: "addToParallaxList",
    value: function addToParallaxList() {
      jarallaxList.push({
        instance: this
      });

      if (1 === jarallaxList.length) {
        global__WEBPACK_IMPORTED_MODULE_1__["window"].requestAnimationFrame(updateParallax);
      }
    } // remove from parallax instances list

  }, {
    key: "removeFromParallaxList",
    value: function removeFromParallaxList() {
      var self = this;
      jarallaxList.forEach(function (data, key) {
        if (data.instance.instanceID === self.instanceID) {
          jarallaxList.splice(key, 1);
        }
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var self = this;
      self.removeFromParallaxList(); // return styles on container as before jarallax init

      var originalStylesTag = self.$item.getAttribute('data-jarallax-original-styles');
      self.$item.removeAttribute('data-jarallax-original-styles'); // null occurs if there is no style tag before jarallax init

      if (!originalStylesTag) {
        self.$item.removeAttribute('style');
      } else {
        self.$item.setAttribute('style', originalStylesTag);
      }

      if (self.image.useImgTag) {
        // return styles on img tag as before jarallax init
        var originalStylesImgTag = self.image.$item.getAttribute('data-jarallax-original-styles');
        self.image.$item.removeAttribute('data-jarallax-original-styles'); // null occurs if there is no style tag before jarallax init

        if (!originalStylesImgTag) {
          self.image.$item.removeAttribute('style');
        } else {
          self.image.$item.setAttribute('style', originalStylesTag);
        } // move img tag to its default position


        if (self.image.$itemParent) {
          self.image.$itemParent.appendChild(self.image.$item);
        }
      } // remove additional dom elements


      if (self.$clipStyles) {
        self.$clipStyles.parentNode.removeChild(self.$clipStyles);
      }

      if (self.image.$container) {
        self.image.$container.parentNode.removeChild(self.image.$container);
      } // call onDestroy event


      if (self.options.onDestroy) {
        self.options.onDestroy.call(self);
      } // delete jarallax from item


      delete self.$item.jarallax;
    } // it will remove some image overlapping
    // overlapping occur due to an image position fixed inside absolute position element

  }, {
    key: "clipContainer",
    value: function clipContainer() {
      // needed only when background in fixed position
      if ('fixed' !== this.image.position) {
        return;
      }

      var self = this;
      var rect = self.image.$container.getBoundingClientRect();
      var width = rect.width,
          height = rect.height;

      if (!self.$clipStyles) {
        self.$clipStyles = document.createElement('style');
        self.$clipStyles.setAttribute('type', 'text/css');
        self.$clipStyles.setAttribute('id', "jarallax-clip-".concat(self.instanceID));
        var head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(self.$clipStyles);
      } // clip is used for old browsers.
      // clip-path for modern browsers (also fixes Safari v14 bug https://github.com/nk-o/jarallax/issues/181 ).


      var styles = "#jarallax-container-".concat(self.instanceID, " {\n            clip: rect(0 ").concat(width, "px ").concat(height, "px 0);\n            clip: rect(0, ").concat(width, "px, ").concat(height, "px, 0);\n            -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);\n            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);\n        }"); // add clip styles inline (this method need for support IE8 and less browsers)

      if (self.$clipStyles.styleSheet) {
        self.$clipStyles.styleSheet.cssText = styles;
      } else {
        self.$clipStyles.innerHTML = styles;
      }
    }
  }, {
    key: "coverImage",
    value: function coverImage() {
      var self = this;
      var rect = self.image.$container.getBoundingClientRect();
      var contH = rect.height;
      var speed = self.options.speed;
      var isScroll = 'scroll' === self.options.type || 'scroll-opacity' === self.options.type;
      var scrollDist = 0;
      var resultH = contH;
      var resultMT = 0; // scroll parallax

      if (isScroll) {
        // scroll distance and height for image
        if (0 > speed) {
          scrollDist = speed * Math.max(contH, wndH);

          if (wndH < contH) {
            scrollDist -= speed * (contH - wndH);
          }
        } else {
          scrollDist = speed * (contH + wndH);
        } // size for scroll parallax


        if (1 < speed) {
          resultH = Math.abs(scrollDist - wndH);
        } else if (0 > speed) {
          resultH = scrollDist / speed + Math.abs(scrollDist);
        } else {
          resultH += (wndH - contH) * (1 - speed);
        }

        scrollDist /= 2;
      } // store scroll distance


      self.parallaxScrollDistance = scrollDist; // vertical center

      if (isScroll) {
        resultMT = (wndH - resultH) / 2;
      } else {
        resultMT = (contH - resultH) / 2;
      } // apply result to item


      self.css(self.image.$item, {
        height: "".concat(resultH, "px"),
        marginTop: "".concat(resultMT, "px"),
        left: 'fixed' === self.image.position ? "".concat(rect.left, "px") : '0',
        width: "".concat(rect.width, "px")
      }); // call onCoverImage event

      if (self.options.onCoverImage) {
        self.options.onCoverImage.call(self);
      } // return some useful data. Used in the video cover function


      return {
        image: {
          height: resultH,
          marginTop: resultMT
        },
        container: rect
      };
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      return this.isElementInViewport || false;
    }
  }, {
    key: "onScroll",
    value: function onScroll(force) {
      var self = this;
      var rect = self.$item.getBoundingClientRect();
      var contT = rect.top;
      var contH = rect.height;
      var styles = {}; // check if in viewport

      var viewportRect = rect;

      if (self.options.elementInViewport) {
        viewportRect = self.options.elementInViewport.getBoundingClientRect();
      }

      self.isElementInViewport = 0 <= viewportRect.bottom && 0 <= viewportRect.right && viewportRect.top <= wndH && viewportRect.left <= global__WEBPACK_IMPORTED_MODULE_1__["window"].innerWidth; // stop calculations if item is not in viewport

      if (force ? false : !self.isElementInViewport) {
        return;
      } // calculate parallax helping variables


      var beforeTop = Math.max(0, contT);
      var beforeTopEnd = Math.max(0, contH + contT);
      var afterTop = Math.max(0, -contT);
      var beforeBottom = Math.max(0, contT + contH - wndH);
      var beforeBottomEnd = Math.max(0, contH - (contT + contH - wndH));
      var afterBottom = Math.max(0, -contT + wndH - contH);
      var fromViewportCenter = 1 - 2 * ((wndH - contT) / (wndH + contH)); // calculate on how percent of section is visible

      var visiblePercent = 1;

      if (contH < wndH) {
        visiblePercent = 1 - (afterTop || beforeBottom) / contH;
      } else if (beforeTopEnd <= wndH) {
        visiblePercent = beforeTopEnd / wndH;
      } else if (beforeBottomEnd <= wndH) {
        visiblePercent = beforeBottomEnd / wndH;
      } // opacity


      if ('opacity' === self.options.type || 'scale-opacity' === self.options.type || 'scroll-opacity' === self.options.type) {
        styles.transform = 'translate3d(0,0,0)';
        styles.opacity = visiblePercent;
      } // scale


      if ('scale' === self.options.type || 'scale-opacity' === self.options.type) {
        var scale = 1;

        if (0 > self.options.speed) {
          scale -= self.options.speed * visiblePercent;
        } else {
          scale += self.options.speed * (1 - visiblePercent);
        }

        styles.transform = "scale(".concat(scale, ") translate3d(0,0,0)");
      } // scroll


      if ('scroll' === self.options.type || 'scroll-opacity' === self.options.type) {
        var positionY = self.parallaxScrollDistance * fromViewportCenter; // fix if parallax block in absolute position

        if ('absolute' === self.image.position) {
          positionY -= contT;
        }

        styles.transform = "translate3d(0,".concat(positionY, "px,0)");
      }

      self.css(self.image.$item, styles); // call onScroll event

      if (self.options.onScroll) {
        self.options.onScroll.call(self, {
          section: rect,
          beforeTop: beforeTop,
          beforeTopEnd: beforeTopEnd,
          afterTop: afterTop,
          beforeBottom: beforeBottom,
          beforeBottomEnd: beforeBottomEnd,
          afterBottom: afterBottom,
          visiblePercent: visiblePercent,
          fromViewportCenter: fromViewportCenter
        });
      }
    }
  }, {
    key: "onResize",
    value: function onResize() {
      this.coverImage();
      this.clipContainer();
    }
  }]);

  return Jarallax;
}(); // global definition


var plugin = function plugin(items, options) {
  // check for dom element
  // thanks: http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
  if ('object' === (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) ? items instanceof HTMLElement : items && 'object' === _typeof(items) && null !== items && 1 === items.nodeType && 'string' === typeof items.nodeName) {
    items = [items];
  }

  var len = items.length;
  var k = 0;
  var ret;

  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  for (k; k < len; k += 1) {
    if ('object' === _typeof(options) || 'undefined' === typeof options) {
      if (!items[k].jarallax) {
        items[k].jarallax = new Jarallax(items[k], options);
      }
    } else if (items[k].jarallax) {
      // eslint-disable-next-line prefer-spread
      ret = items[k].jarallax[options].apply(items[k].jarallax, args);
    }

    if ('undefined' !== typeof ret) {
      return ret;
    }
  }

  return items;
};

plugin.constructor = Jarallax;
/* harmony default export */ __webpack_exports__["default"] = (plugin);

/***/ })
/******/ ]);
/*!
 * Name    : Video Background Extension for Jarallax
 * Version : 1.0.1
 * Author  : nK <https://nkdev.info>
 * GitHub  : https://github.com/nk-o/jarallax
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

module.exports = function (callback) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Already ready or interactive, execute callback
    callback.call();
  } else if (document.attachEvent) {
    // Old browsers
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'interactive') callback.call();
    });
  } else if (document.addEventListener) {
    // Modern browsers
    document.addEventListener('DOMContentLoaded', callback);
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
  win = window;
} else if (typeof global !== "undefined") {
  win = global;
} else if (typeof self !== "undefined") {
  win = self;
} else {
  win = {};
}

module.exports = win;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var video_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lite_ready__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var lite_ready__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lite_ready__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jarallax_video_esm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);



 // add video worker globally to fallback jarallax < 1.10 versions

global__WEBPACK_IMPORTED_MODULE_1___default.a.VideoWorker = global__WEBPACK_IMPORTED_MODULE_1___default.a.VideoWorker || video_worker__WEBPACK_IMPORTED_MODULE_0__["default"];
Object(_jarallax_video_esm__WEBPACK_IMPORTED_MODULE_3__["default"])(); // data-jarallax-video initialization

lite_ready__WEBPACK_IMPORTED_MODULE_2___default()(function () {
  if ('undefined' !== typeof global__WEBPACK_IMPORTED_MODULE_1___default.a.jarallax) {
    global__WEBPACK_IMPORTED_MODULE_1___default.a.jarallax(document.querySelectorAll('[data-jarallax-video]'));
  }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VideoWorker; });
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // Deferred
// thanks http://stackoverflow.com/questions/18096715/implement-deferred-object-without-using-jquery

function Deferred() {
  this.doneCallbacks = [];
  this.failCallbacks = [];
}

Deferred.prototype = {
  execute: function execute(list, args) {
    var i = list.length;
    args = Array.prototype.slice.call(args);

    while (i) {
      i -= 1;
      list[i].apply(null, args);
    }
  },
  resolve: function resolve() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.execute(this.doneCallbacks, args);
  },
  reject: function reject() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    this.execute(this.failCallbacks, args);
  },
  done: function done(callback) {
    this.doneCallbacks.push(callback);
  },
  fail: function fail(callback) {
    this.failCallbacks.push(callback);
  }
};
var ID = 0;
var YoutubeAPIadded = 0;
var VimeoAPIadded = 0;
var loadingYoutubePlayer = 0;
var loadingVimeoPlayer = 0;
var loadingYoutubeDefer = new Deferred();
var loadingVimeoDefer = new Deferred();

var VideoWorker = /*#__PURE__*/function () {
  function VideoWorker(url, options) {
    _classCallCheck(this, VideoWorker);

    var self = this;
    self.url = url;
    self.options_default = {
      autoplay: false,
      loop: false,
      mute: false,
      volume: 100,
      showContols: true,
      // start / end video time in seconds
      startTime: 0,
      endTime: 0
    };
    self.options = self.extend({}, self.options_default, options); // check URL

    self.videoID = self.parseURL(url); // init

    if (self.videoID) {
      self.ID = ID;
      ID += 1;
      self.loadAPI();
      self.init();
    }
  } // Extend like jQuery.extend
  // eslint-disable-next-line class-methods-use-this


  _createClass(VideoWorker, [{
    key: "extend",
    value: function extend() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var out = args[0] || {};
      Object.keys(args).forEach(function (i) {
        if (!args[i]) {
          return;
        }

        Object.keys(args[i]).forEach(function (key) {
          out[key] = args[i][key];
        });
      });
      return out;
    }
  }, {
    key: "parseURL",
    value: function parseURL(url) {
      // parse youtube ID
      function getYoutubeID(ytUrl) {
        // eslint-disable-next-line no-useless-escape
        var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
        var match = ytUrl.match(regExp);
        return match && 11 === match[1].length ? match[1] : false;
      } // parse vimeo ID


      function getVimeoID(vmUrl) {
        // eslint-disable-next-line no-useless-escape
        var regExp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
        var match = vmUrl.match(regExp);
        return match && match[3] ? match[3] : false;
      } // parse local string


      function getLocalVideos(locUrl) {
        // eslint-disable-next-line no-useless-escape
        var videoFormats = locUrl.split(/,(?=mp4\:|webm\:|ogv\:|ogg\:)/);
        var result = {};
        var ready = 0;
        videoFormats.forEach(function (val) {
          // eslint-disable-next-line no-useless-escape
          var match = val.match(/^(mp4|webm|ogv|ogg)\:(.*)/);

          if (match && match[1] && match[2]) {
            // eslint-disable-next-line prefer-destructuring
            result['ogv' === match[1] ? 'ogg' : match[1]] = match[2];
            ready = 1;
          }
        });
        return ready ? result : false;
      }

      var Youtube = getYoutubeID(url);
      var Vimeo = getVimeoID(url);
      var Local = getLocalVideos(url);

      if (Youtube) {
        this.type = 'youtube';
        return Youtube;
      }

      if (Vimeo) {
        this.type = 'vimeo';
        return Vimeo;
      }

      if (Local) {
        this.type = 'local';
        return Local;
      }

      return false;
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return !!this.videoID;
    } // events

  }, {
    key: "on",
    value: function on(name, callback) {
      this.userEventsList = this.userEventsList || []; // add new callback in events list

      (this.userEventsList[name] || (this.userEventsList[name] = [])).push(callback);
    }
  }, {
    key: "off",
    value: function off(name, callback) {
      var _this = this;

      if (!this.userEventsList || !this.userEventsList[name]) {
        return;
      }

      if (!callback) {
        delete this.userEventsList[name];
      } else {
        this.userEventsList[name].forEach(function (val, key) {
          if (val === callback) {
            _this.userEventsList[name][key] = false;
          }
        });
      }
    }
  }, {
    key: "fire",
    value: function fire(name) {
      var _this2 = this;

      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      if (this.userEventsList && 'undefined' !== typeof this.userEventsList[name]) {
        this.userEventsList[name].forEach(function (val) {
          // call with all arguments
          if (val) {
            val.apply(_this2, args);
          }
        });
      }
    }
  }, {
    key: "play",
    value: function play(start) {
      var self = this;

      if (!self.player) {
        return;
      }

      if ('youtube' === self.type && self.player.playVideo) {
        if ('undefined' !== typeof start) {
          self.player.seekTo(start || 0);
        }

        if (global__WEBPACK_IMPORTED_MODULE_0___default.a.YT.PlayerState.PLAYING !== self.player.getPlayerState()) {
          self.player.playVideo();
        }
      }

      if ('vimeo' === self.type) {
        if ('undefined' !== typeof start) {
          self.player.setCurrentTime(start);
        }

        self.player.getPaused().then(function (paused) {
          if (paused) {
            self.player.play();
          }
        });
      }

      if ('local' === self.type) {
        if ('undefined' !== typeof start) {
          self.player.currentTime = start;
        }

        if (self.player.paused) {
          self.player.play();
        }
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      var self = this;

      if (!self.player) {
        return;
      }

      if ('youtube' === self.type && self.player.pauseVideo) {
        if (global__WEBPACK_IMPORTED_MODULE_0___default.a.YT.PlayerState.PLAYING === self.player.getPlayerState()) {
          self.player.pauseVideo();
        }
      }

      if ('vimeo' === self.type) {
        self.player.getPaused().then(function (paused) {
          if (!paused) {
            self.player.pause();
          }
        });
      }

      if ('local' === self.type) {
        if (!self.player.paused) {
          self.player.pause();
        }
      }
    }
  }, {
    key: "mute",
    value: function mute() {
      var self = this;

      if (!self.player) {
        return;
      }

      if ('youtube' === self.type && self.player.mute) {
        self.player.mute();
      }

      if ('vimeo' === self.type && self.player.setVolume) {
        self.player.setVolume(0);
      }

      if ('local' === self.type) {
        self.$video.muted = true;
      }
    }
  }, {
    key: "unmute",
    value: function unmute() {
      var self = this;

      if (!self.player) {
        return;
      }

      if ('youtube' === self.type && self.player.mute) {
        self.player.unMute();
      }

      if ('vimeo' === self.type && self.player.setVolume) {
        self.player.setVolume(self.options.volume);
      }

      if ('local' === self.type) {
        self.$video.muted = false;
      }
    }
  }, {
    key: "setVolume",
    value: function setVolume() {
      var volume = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var self = this;

      if (!self.player || !volume) {
        return;
      }

      if ('youtube' === self.type && self.player.setVolume) {
        self.player.setVolume(volume);
      }

      if ('vimeo' === self.type && self.player.setVolume) {
        self.player.setVolume(volume);
      }

      if ('local' === self.type) {
        self.$video.volume = volume / 100;
      }
    }
  }, {
    key: "getVolume",
    value: function getVolume(callback) {
      var self = this;

      if (!self.player) {
        callback(false);
        return;
      }

      if ('youtube' === self.type && self.player.getVolume) {
        callback(self.player.getVolume());
      }

      if ('vimeo' === self.type && self.player.getVolume) {
        self.player.getVolume().then(function (volume) {
          callback(volume);
        });
      }

      if ('local' === self.type) {
        callback(self.$video.volume * 100);
      }
    }
  }, {
    key: "getMuted",
    value: function getMuted(callback) {
      var self = this;

      if (!self.player) {
        callback(null);
        return;
      }

      if ('youtube' === self.type && self.player.isMuted) {
        callback(self.player.isMuted());
      }

      if ('vimeo' === self.type && self.player.getVolume) {
        self.player.getVolume().then(function (volume) {
          callback(!!volume);
        });
      }

      if ('local' === self.type) {
        callback(self.$video.muted);
      }
    }
  }, {
    key: "getImageURL",
    value: function getImageURL(callback) {
      var self = this;

      if (self.videoImage) {
        callback(self.videoImage);
        return;
      }

      if ('youtube' === self.type) {
        var availableSizes = ['maxresdefault', 'sddefault', 'hqdefault', '0'];
        var step = 0;
        var tempImg = new Image();

        tempImg.onload = function () {
          // if no thumbnail, youtube add their own image with width = 120px
          if (120 !== (this.naturalWidth || this.width) || step === availableSizes.length - 1) {
            // ok
            self.videoImage = "https://img.youtube.com/vi/".concat(self.videoID, "/").concat(availableSizes[step], ".jpg");
            callback(self.videoImage);
          } else {
            // try another size
            step += 1;
            this.src = "https://img.youtube.com/vi/".concat(self.videoID, "/").concat(availableSizes[step], ".jpg");
          }
        };

        tempImg.src = "https://img.youtube.com/vi/".concat(self.videoID, "/").concat(availableSizes[step], ".jpg");
      }

      if ('vimeo' === self.type) {
        var request = new XMLHttpRequest();
        request.open('GET', "https://vimeo.com/api/v2/video/".concat(self.videoID, ".json"), true);

        request.onreadystatechange = function () {
          if (4 === this.readyState) {
            if (200 <= this.status && 400 > this.status) {
              // Success!
              var response = JSON.parse(this.responseText);
              self.videoImage = response[0].thumbnail_large;
              callback(self.videoImage);
            } else {// Error :(
            }
          }
        };

        request.send();
        request = null;
      }
    } // fallback to the old version.

  }, {
    key: "getIframe",
    value: function getIframe(callback) {
      this.getVideo(callback);
    }
  }, {
    key: "getVideo",
    value: function getVideo(callback) {
      var self = this; // return generated video block

      if (self.$video) {
        callback(self.$video);
        return;
      } // generate new video block


      self.onAPIready(function () {
        var hiddenDiv;

        if (!self.$video) {
          hiddenDiv = document.createElement('div');
          hiddenDiv.style.display = 'none';
        } // Youtube


        if ('youtube' === self.type) {
          self.playerOptions = {};
          self.playerOptions.videoId = self.videoID;
          self.playerOptions.playerVars = {
            autohide: 1,
            rel: 0,
            autoplay: 0,
            // autoplay enable on mobile devices
            playsinline: 1
          }; // hide controls

          if (!self.options.showContols) {
            self.playerOptions.playerVars.iv_load_policy = 3;
            self.playerOptions.playerVars.modestbranding = 1;
            self.playerOptions.playerVars.controls = 0;
            self.playerOptions.playerVars.showinfo = 0;
            self.playerOptions.playerVars.disablekb = 1;
          } // events


          var ytStarted;
          var ytProgressInterval;
          self.playerOptions.events = {
            onReady: function onReady(e) {
              // mute
              if (self.options.mute) {
                e.target.mute();
              } else if (self.options.volume) {
                e.target.setVolume(self.options.volume);
              } // autoplay


              if (self.options.autoplay) {
                self.play(self.options.startTime);
              }

              self.fire('ready', e); // For seamless loops, set the endTime to 0.1 seconds less than the video's duration
              // https://github.com/nk-o/video-worker/issues/2

              if (self.options.loop && !self.options.endTime) {
                var secondsOffset = 0.1;
                self.options.endTime = self.player.getDuration() - secondsOffset;
              } // volumechange


              setInterval(function () {
                self.getVolume(function (volume) {
                  if (self.options.volume !== volume) {
                    self.options.volume = volume;
                    self.fire('volumechange', e);
                  }
                });
              }, 150);
            },
            onStateChange: function onStateChange(e) {
              // loop
              if (self.options.loop && e.data === global__WEBPACK_IMPORTED_MODULE_0___default.a.YT.PlayerState.ENDED) {
                self.play(self.options.startTime);
              }

              if (!ytStarted && e.data === global__WEBPACK_IMPORTED_MODULE_0___default.a.YT.PlayerState.PLAYING) {
                ytStarted = 1;
                self.fire('started', e);
              }

              if (e.data === global__WEBPACK_IMPORTED_MODULE_0___default.a.YT.PlayerState.PLAYING) {
                self.fire('play', e);
              }

              if (e.data === global__WEBPACK_IMPORTED_MODULE_0___default.a.YT.PlayerState.PAUSED) {
                self.fire('pause', e);
              }

              if (e.data === global__WEBPACK_IMPORTED_MODULE_0___default.a.YT.PlayerState.ENDED) {
                self.fire('ended', e);
              } // progress check


              if (e.data === global__WEBPACK_IMPORTED_MODULE_0___default.a.YT.PlayerState.PLAYING) {
                ytProgressInterval = setInterval(function () {
                  self.fire('timeupdate', e); // check for end of video and play again or stop

                  if (self.options.endTime && self.player.getCurrentTime() >= self.options.endTime) {
                    if (self.options.loop) {
                      self.play(self.options.startTime);
                    } else {
                      self.pause();
                    }
                  }
                }, 150);
              } else {
                clearInterval(ytProgressInterval);
              }
            },
            onError: function onError(e) {
              self.fire('error', e);
            }
          };
          var firstInit = !self.$video;

          if (firstInit) {
            var div = document.createElement('div');
            div.setAttribute('id', self.playerID);
            hiddenDiv.appendChild(div);
            document.body.appendChild(hiddenDiv);
          }

          self.player = self.player || new global__WEBPACK_IMPORTED_MODULE_0___default.a.YT.Player(self.playerID, self.playerOptions);

          if (firstInit) {
            self.$video = document.getElementById(self.playerID); // get video width and height

            self.videoWidth = parseInt(self.$video.getAttribute('width'), 10) || 1280;
            self.videoHeight = parseInt(self.$video.getAttribute('height'), 10) || 720;
          }
        } // Vimeo


        if ('vimeo' === self.type) {
          self.playerOptions = {
            id: self.videoID,
            autopause: 0,
            transparent: 0,
            autoplay: self.options.autoplay ? 1 : 0,
            loop: self.options.loop ? 1 : 0,
            muted: self.options.mute ? 1 : 0
          };

          if (self.options.volume) {
            self.playerOptions.volume = self.options.volume;
          } // hide controls


          if (!self.options.showContols) {
            self.playerOptions.badge = 0;
            self.playerOptions.byline = 0;
            self.playerOptions.portrait = 0;
            self.playerOptions.title = 0;
            self.playerOptions.background = 1;
          }

          if (!self.$video) {
            var playerOptionsString = '';
            Object.keys(self.playerOptions).forEach(function (key) {
              if ('' !== playerOptionsString) {
                playerOptionsString += '&';
              }

              playerOptionsString += "".concat(key, "=").concat(encodeURIComponent(self.playerOptions[key]));
            }); // we need to create iframe manually because when we create it using API
            // js events won't triggers after iframe moved to another place

            self.$video = document.createElement('iframe');
            self.$video.setAttribute('id', self.playerID);
            self.$video.setAttribute('src', "https://player.vimeo.com/video/".concat(self.videoID, "?").concat(playerOptionsString));
            self.$video.setAttribute('frameborder', '0');
            self.$video.setAttribute('mozallowfullscreen', '');
            self.$video.setAttribute('allowfullscreen', '');
            hiddenDiv.appendChild(self.$video);
            document.body.appendChild(hiddenDiv);
          }

          self.player = self.player || new global__WEBPACK_IMPORTED_MODULE_0___default.a.Vimeo.Player(self.$video, self.playerOptions); // set current time for autoplay

          if (self.options.startTime && self.options.autoplay) {
            self.player.setCurrentTime(self.options.startTime);
          } // get video width and height


          self.player.getVideoWidth().then(function (width) {
            self.videoWidth = width || 1280;
          });
          self.player.getVideoHeight().then(function (height) {
            self.videoHeight = height || 720;
          }); // events

          var vmStarted;
          self.player.on('timeupdate', function (e) {
            if (!vmStarted) {
              self.fire('started', e);
              vmStarted = 1;
            }

            self.fire('timeupdate', e); // check for end of video and play again or stop

            if (self.options.endTime) {
              if (self.options.endTime && e.seconds >= self.options.endTime) {
                if (self.options.loop) {
                  self.play(self.options.startTime);
                } else {
                  self.pause();
                }
              }
            }
          });
          self.player.on('play', function (e) {
            self.fire('play', e); // check for the start time and start with it

            if (self.options.startTime && 0 === e.seconds) {
              self.play(self.options.startTime);
            }
          });
          self.player.on('pause', function (e) {
            self.fire('pause', e);
          });
          self.player.on('ended', function (e) {
            self.fire('ended', e);
          });
          self.player.on('loaded', function (e) {
            self.fire('ready', e);
          });
          self.player.on('volumechange', function (e) {
            self.fire('volumechange', e);
          });
          self.player.on('error', function (e) {
            self.fire('error', e);
          });
        } // Local


        function addSourceToLocal(element, src, type) {
          var source = document.createElement('source');
          source.src = src;
          source.type = type;
          element.appendChild(source);
        }

        if ('local' === self.type) {
          if (!self.$video) {
            self.$video = document.createElement('video'); // show controls

            if (self.options.showContols) {
              self.$video.controls = true;
            } // mute


            if (self.options.mute) {
              self.$video.muted = true;
            } else if (self.$video.volume) {
              self.$video.volume = self.options.volume / 100;
            } // loop


            if (self.options.loop) {
              self.$video.loop = true;
            } // autoplay enable on mobile devices


            self.$video.setAttribute('playsinline', '');
            self.$video.setAttribute('webkit-playsinline', '');
            self.$video.setAttribute('id', self.playerID);
            hiddenDiv.appendChild(self.$video);
            document.body.appendChild(hiddenDiv);
            Object.keys(self.videoID).forEach(function (key) {
              addSourceToLocal(self.$video, self.videoID[key], "video/".concat(key));
            });
          }

          self.player = self.player || self.$video;
          var locStarted;
          self.player.addEventListener('playing', function (e) {
            if (!locStarted) {
              self.fire('started', e);
            }

            locStarted = 1;
          });
          self.player.addEventListener('timeupdate', function (e) {
            self.fire('timeupdate', e); // check for end of video and play again or stop

            if (self.options.endTime) {
              if (self.options.endTime && this.currentTime >= self.options.endTime) {
                if (self.options.loop) {
                  self.play(self.options.startTime);
                } else {
                  self.pause();
                }
              }
            }
          });
          self.player.addEventListener('play', function (e) {
            self.fire('play', e);
          });
          self.player.addEventListener('pause', function (e) {
            self.fire('pause', e);
          });
          self.player.addEventListener('ended', function (e) {
            self.fire('ended', e);
          });
          self.player.addEventListener('loadedmetadata', function () {
            // get video width and height
            self.videoWidth = this.videoWidth || 1280;
            self.videoHeight = this.videoHeight || 720;
            self.fire('ready'); // autoplay

            if (self.options.autoplay) {
              self.play(self.options.startTime);
            }
          });
          self.player.addEventListener('volumechange', function (e) {
            self.getVolume(function (volume) {
              self.options.volume = volume;
            });
            self.fire('volumechange', e);
          });
          self.player.addEventListener('error', function (e) {
            self.fire('error', e);
          });
        }

        callback(self.$video);
      });
    }
  }, {
    key: "init",
    value: function init() {
      var self = this;
      self.playerID = "VideoWorker-".concat(self.ID);
    }
  }, {
    key: "loadAPI",
    value: function loadAPI() {
      var self = this;

      if (YoutubeAPIadded && VimeoAPIadded) {
        return;
      }

      var src = ''; // load Youtube API

      if ('youtube' === self.type && !YoutubeAPIadded) {
        YoutubeAPIadded = 1;
        src = 'https://www.youtube.com/iframe_api';
      } // load Vimeo API


      if ('vimeo' === self.type && !VimeoAPIadded) {
        VimeoAPIadded = 1; // Useful when Vimeo API added using RequireJS https://github.com/nk-o/video-worker/pull/7

        if ('undefined' !== typeof global__WEBPACK_IMPORTED_MODULE_0___default.a.Vimeo) {
          return;
        }

        src = 'https://player.vimeo.com/api/player.js';
      }

      if (!src) {
        return;
      } // add script in head section


      var tag = document.createElement('script');
      var head = document.getElementsByTagName('head')[0];
      tag.src = src;
      head.appendChild(tag);
      head = null;
      tag = null;
    }
  }, {
    key: "onAPIready",
    value: function onAPIready(callback) {
      var self = this; // Youtube

      if ('youtube' === self.type) {
        // Listen for global YT player callback
        if (('undefined' === typeof global__WEBPACK_IMPORTED_MODULE_0___default.a.YT || 0 === global__WEBPACK_IMPORTED_MODULE_0___default.a.YT.loaded) && !loadingYoutubePlayer) {
          // Prevents Ready event from being called twice
          loadingYoutubePlayer = 1; // Creates deferred so, other players know when to wait.

          window.onYouTubeIframeAPIReady = function () {
            window.onYouTubeIframeAPIReady = null;
            loadingYoutubeDefer.resolve('done');
            callback();
          };
        } else if ('object' === _typeof(global__WEBPACK_IMPORTED_MODULE_0___default.a.YT) && 1 === global__WEBPACK_IMPORTED_MODULE_0___default.a.YT.loaded) {
          callback();
        } else {
          loadingYoutubeDefer.done(function () {
            callback();
          });
        }
      } // Vimeo


      if ('vimeo' === self.type) {
        if ('undefined' === typeof global__WEBPACK_IMPORTED_MODULE_0___default.a.Vimeo && !loadingVimeoPlayer) {
          loadingVimeoPlayer = 1;
          var vimeoInterval = setInterval(function () {
            if ('undefined' !== typeof global__WEBPACK_IMPORTED_MODULE_0___default.a.Vimeo) {
              clearInterval(vimeoInterval);
              loadingVimeoDefer.resolve('done');
              callback();
            }
          }, 20);
        } else if ('undefined' !== typeof global__WEBPACK_IMPORTED_MODULE_0___default.a.Vimeo) {
          callback();
        } else {
          loadingVimeoDefer.done(function () {
            callback();
          });
        }
      } // Local


      if ('local' === self.type) {
        callback();
      }
    }
  }]);

  return VideoWorker;
}();



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return jarallaxVideo; });
/* harmony import */ var video_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_1__);


function jarallaxVideo() {
  var jarallax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : global__WEBPACK_IMPORTED_MODULE_1___default.a.jarallax;

  if ('undefined' === typeof jarallax) {
    return;
  }

  var Jarallax = jarallax.constructor; // append video after when block will be visible.

  var defOnScroll = Jarallax.prototype.onScroll;

  Jarallax.prototype.onScroll = function () {
    var self = this;
    defOnScroll.apply(self);
    var isReady = !self.isVideoInserted && self.video && (!self.options.videoLazyLoading || self.isElementInViewport) && !self.options.disableVideo();

    if (isReady) {
      self.isVideoInserted = true;
      self.video.getVideo(function (video) {
        var $parent = video.parentNode;
        self.css(video, {
          position: self.image.position,
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          width: '100%',
          height: '100%',
          maxWidth: 'none',
          maxHeight: 'none',
          pointerEvents: 'none',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          willChange: 'transform,opacity',
          margin: 0,
          zIndex: -1
        });
        self.$video = video; // add Poster attribute to self-hosted video

        if ('local' === self.video.type) {
          if (self.image.src) {
            self.$video.setAttribute('poster', self.image.src);
          } else if (self.image.$item && 'IMG' === self.image.$item.tagName && self.image.$item.src) {
            self.$video.setAttribute('poster', self.image.$item.src);
          }
        } // insert video tag


        self.image.$container.appendChild(video); // remove parent video element (created by VideoWorker)

        $parent.parentNode.removeChild($parent);
      });
    }
  }; // cover video


  var defCoverImage = Jarallax.prototype.coverImage;

  Jarallax.prototype.coverImage = function () {
    var self = this;
    var imageData = defCoverImage.apply(self);
    var node = self.image.$item ? self.image.$item.nodeName : false;

    if (imageData && self.video && node && ('IFRAME' === node || 'VIDEO' === node)) {
      var h = imageData.image.height;
      var w = h * self.image.width / self.image.height;
      var ml = (imageData.container.width - w) / 2;
      var mt = imageData.image.marginTop;

      if (imageData.container.width > w) {
        w = imageData.container.width;
        h = w * self.image.height / self.image.width;
        ml = 0;
        mt += (imageData.image.height - h) / 2;
      } // add video height over than need to hide controls


      if ('IFRAME' === node) {
        h += 400;
        mt -= 200;
      }

      self.css(self.$video, {
        width: "".concat(w, "px"),
        marginLeft: "".concat(ml, "px"),
        height: "".concat(h, "px"),
        marginTop: "".concat(mt, "px")
      });
    }

    return imageData;
  }; // init video


  var defInitImg = Jarallax.prototype.initImg;

  Jarallax.prototype.initImg = function () {
    var self = this;
    var defaultResult = defInitImg.apply(self);

    if (!self.options.videoSrc) {
      self.options.videoSrc = self.$item.getAttribute('data-jarallax-video') || null;
    }

    if (self.options.videoSrc) {
      self.defaultInitImgResult = defaultResult;
      return true;
    }

    return defaultResult;
  };

  var defCanInitParallax = Jarallax.prototype.canInitParallax;

  Jarallax.prototype.canInitParallax = function () {
    var self = this;
    var defaultResult = defCanInitParallax.apply(self);

    if (!self.options.videoSrc) {
      return defaultResult;
    } // Init video api


    var video = new video_worker__WEBPACK_IMPORTED_MODULE_0__["default"](self.options.videoSrc, {
      autoplay: true,
      loop: self.options.videoLoop,
      showContols: false,
      startTime: self.options.videoStartTime || 0,
      endTime: self.options.videoEndTime || 0,
      mute: self.options.videoVolume ? 0 : 1,
      volume: self.options.videoVolume || 0
    });

    function resetDefaultImage() {
      if (self.image.$default_item) {
        self.image.$item = self.image.$default_item;
        self.image.$item.style.display = 'block'; // set image width and height

        self.coverImage();
        self.clipContainer();
        self.onScroll();
      }
    }

    if (video.isValid()) {
      // Force enable parallax.
      // When the parallax disabled on mobile devices, we still need to display videos.
      // https://github.com/nk-o/jarallax/issues/159
      if (this.options.disableParallax()) {
        defaultResult = true;
        self.image.position = 'absolute';
        self.options.type = 'scroll';
        self.options.speed = 1;
      } // if parallax will not be inited, we can add thumbnail on background.


      if (!defaultResult) {
        if (!self.defaultInitImgResult) {
          video.getImageURL(function (url) {
            // save default user styles
            var curStyle = self.$item.getAttribute('style');

            if (curStyle) {
              self.$item.setAttribute('data-jarallax-original-styles', curStyle);
            } // set new background


            self.css(self.$item, {
              'background-image': "url(\"".concat(url, "\")"),
              'background-position': 'center',
              'background-size': 'cover'
            });
          });
        } // init video

      } else {
        video.on('ready', function () {
          if (self.options.videoPlayOnlyVisible) {
            var oldOnScroll = self.onScroll;

            self.onScroll = function () {
              oldOnScroll.apply(self);

              if (!self.videoError && (self.options.videoLoop || !self.options.videoLoop && !self.videoEnded)) {
                if (self.isVisible()) {
                  video.play();
                } else {
                  video.pause();
                }
              }
            };
          } else {
            video.play();
          }
        });
        video.on('started', function () {
          self.image.$default_item = self.image.$item;
          self.image.$item = self.$video; // set video width and height

          self.image.width = self.video.videoWidth || 1280;
          self.image.height = self.video.videoHeight || 720;
          self.coverImage();
          self.clipContainer();
          self.onScroll(); // hide image

          if (self.image.$default_item) {
            self.image.$default_item.style.display = 'none';
          }
        });
        video.on('ended', function () {
          self.videoEnded = true;

          if (!self.options.videoLoop) {
            // show default image if Loop disabled.
            resetDefaultImage();
          }
        });
        video.on('error', function () {
          self.videoError = true; // show default image if video loading error.

          resetDefaultImage();
        });
        self.video = video; // set image if not exists

        if (!self.defaultInitImgResult) {
          // set empty image on self-hosted video if not defined
          self.image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

          if ('local' !== video.type) {
            video.getImageURL(function (url) {
              self.image.bgImage = "url(\"".concat(url, "\")");
              self.init();
            });
            return false;
          }
        }
      }
    }

    return defaultResult;
  }; // Destroy video parallax


  var defDestroy = Jarallax.prototype.destroy;

  Jarallax.prototype.destroy = function () {
    var self = this;

    if (self.image.$default_item) {
      self.image.$item = self.image.$default_item;
      delete self.image.$default_item;
    }

    defDestroy.apply(self);
  };
}

/***/ })
/******/ ]);
/*!
 * Name    : DEPRECATED Elements Extension for Jarallax. Use laxxx instead https://github.com/alexfoxy/laxxx
 * Version : 1.0.0
 * Author  : nK <https://nkdev.info>
 * GitHub  : https://github.com/nk-o/jarallax
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lite_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var lite_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lite_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jarallax_element_esm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);



Object(_jarallax_element_esm__WEBPACK_IMPORTED_MODULE_2__["default"])(); // data-jarallax-element initialization

lite_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  if ('undefined' !== typeof global__WEBPACK_IMPORTED_MODULE_1___default.a.jarallax) {
    global__WEBPACK_IMPORTED_MODULE_1___default.a.jarallax(document.querySelectorAll('[data-jarallax-element]'));
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (callback) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Already ready or interactive, execute callback
    callback.call();
  } else if (document.attachEvent) {
    // Old browsers
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'interactive') callback.call();
    });
  } else if (document.addEventListener) {
    // Modern browsers
    document.addEventListener('DOMContentLoaded', callback);
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
  win = window;
} else if (typeof global !== "undefined") {
  win = global;
} else if (typeof self !== "undefined") {
  win = self;
} else {
  win = {};
}

module.exports = win;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return jarallaxElement; });
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global__WEBPACK_IMPORTED_MODULE_0__);
/* eslint no-case-declarations: "off" */

function jarallaxElement() {
  var jarallax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : global__WEBPACK_IMPORTED_MODULE_0___default.a.jarallax;

  if ('undefined' === typeof jarallax) {
    return;
  }

  var Jarallax = jarallax.constructor; // redefine default methods

  ['initImg', 'canInitParallax', 'init', 'destroy', 'clipContainer', 'coverImage', 'isVisible', 'onScroll', 'onResize'].forEach(function (key) {
    var def = Jarallax.prototype[key];

    Jarallax.prototype[key] = function () {
      var self = this;

      if ('initImg' === key && null !== self.$item.getAttribute('data-jarallax-element')) {
        self.options.type = 'element';
        self.pureOptions.speed = self.$item.getAttribute('data-jarallax-element') || self.pureOptions.speed;
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if ('element' !== self.options.type) {
        return def.apply(self, args);
      }

      self.pureOptions.threshold = self.$item.getAttribute('data-threshold') || '';

      switch (key) {
        case 'init':
          var speedArr = self.pureOptions.speed.split(' ');
          self.options.speed = self.pureOptions.speed || 0;
          self.options.speedY = speedArr[0] ? parseFloat(speedArr[0]) : 0;
          self.options.speedX = speedArr[1] ? parseFloat(speedArr[1]) : 0;
          var thresholdArr = self.pureOptions.threshold.split(' ');
          self.options.thresholdY = thresholdArr[0] ? parseFloat(thresholdArr[0]) : null;
          self.options.thresholdX = thresholdArr[1] ? parseFloat(thresholdArr[1]) : null;
          def.apply(self, args); // restore background image if available.

          var originalStylesTag = self.$item.getAttribute('data-jarallax-original-styles');

          if (originalStylesTag) {
            self.$item.setAttribute('style', originalStylesTag);
          }

          return true;

        case 'onResize':
          var defTransform = self.css(self.$item, 'transform');
          self.css(self.$item, {
            transform: ''
          });
          var rect = self.$item.getBoundingClientRect();
          self.itemData = {
            width: rect.width,
            height: rect.height,
            y: rect.top + self.getWindowData().y,
            x: rect.left
          };
          self.css(self.$item, {
            transform: defTransform
          });
          break;

        case 'onScroll':
          var wnd = self.getWindowData();
          var centerPercent = (wnd.y + wnd.height / 2 - self.itemData.y - self.itemData.height / 2) / (wnd.height / 2);
          var moveY = centerPercent * self.options.speedY;
          var moveX = centerPercent * self.options.speedX;
          var my = moveY;
          var mx = moveX;
          if (null !== self.options.thresholdY && moveY > self.options.thresholdY) my = 0;
          if (null !== self.options.thresholdX && moveX > self.options.thresholdX) mx = 0;
          self.css(self.$item, {
            transform: "translate3d(".concat(mx, "px,").concat(my, "px,0)")
          });
          break;

        case 'initImg':
        case 'isVisible':
        case 'clipContainer':
        case 'coverImage':
          return true;
        // no default
      }

      return def.apply(self, args);
    };
  });
}

/***/ })
/******/ ]);
// Generated by CoffeeScript 1.6.2
/**
@license Sticky-kit v1.1.3 | WTFPL | Leaf Corcoran 2015 | http://leafo.net
*/


(function() {
  var $, win;

  $ = this.jQuery || window.jQuery;

  win = $(window);

  $.fn.stick_in_parent = function(opts) {
    var doc, elm, enable_bottoming, inner_scrolling, manual_spacer, offset_top, outer_width, parent_selector, recalc_every, sticky_class, _fn, _i, _len;

    if (opts == null) {
      opts = {};
    }
    sticky_class = opts.sticky_class, inner_scrolling = opts.inner_scrolling, recalc_every = opts.recalc_every, parent_selector = opts.parent, offset_top = opts.offset_top, manual_spacer = opts.spacer, enable_bottoming = opts.bottoming;
    if (offset_top == null) {
      offset_top = 0;
    }
    if (parent_selector == null) {
      parent_selector = void 0;
    }
    if (inner_scrolling == null) {
      inner_scrolling = true;
    }
    if (sticky_class == null) {
      sticky_class = "is_stuck";
    }
    doc = $(document);
    if (enable_bottoming == null) {
      enable_bottoming = true;
    }
    outer_width = function(el) {
      var computed, w, _el;

      if (window.getComputedStyle) {
        _el = el[0];
        computed = window.getComputedStyle(el[0]);
        w = parseFloat(computed.getPropertyValue("width")) + parseFloat(computed.getPropertyValue("margin-left")) + parseFloat(computed.getPropertyValue("margin-right"));
        if (computed.getPropertyValue("box-sizing") !== "border-box") {
          w += parseFloat(computed.getPropertyValue("border-left-width")) + parseFloat(computed.getPropertyValue("border-right-width")) + parseFloat(computed.getPropertyValue("padding-left")) + parseFloat(computed.getPropertyValue("padding-right"));
        }
        return w;
      } else {
        return el.outerWidth(true);
      }
    };
    _fn = function(elm, padding_bottom, parent_top, parent_height, top, height, el_float, detached) {
      var bottomed, detach, fixed, last_pos, last_scroll_height, offset, parent, recalc, recalc_and_tick, recalc_counter, spacer, tick;

      if (elm.data("sticky_kit")) {
        return;
      }
      elm.data("sticky_kit", true);
      last_scroll_height = doc.height();
      parent = elm.parent();
      if (parent_selector != null) {
        parent = parent.closest(parent_selector);
      }
      if (!parent.length) {
        throw "failed to find stick parent";
      }
      fixed = false;
      bottomed = false;
      spacer = manual_spacer != null ? manual_spacer && elm.closest(manual_spacer) : $("<div />");
      if (spacer) {
        spacer.css('position', elm.css('position'));
      }
      recalc = function() {
        var border_top, padding_top, restore;

        if (detached) {
          return;
        }
        last_scroll_height = doc.height();
        border_top = parseInt(parent.css("border-top-width"), 10);
        padding_top = parseInt(parent.css("padding-top"), 10);
        padding_bottom = parseInt(parent.css("padding-bottom"), 10);
        parent_top = parent.offset().top + border_top + padding_top;
        parent_height = parent.height();
        if (fixed) {
          fixed = false;
          bottomed = false;
          if (manual_spacer == null) {
            elm.insertAfter(spacer);
            spacer.detach();
          }
          elm.css({
            position: "",
            top: "",
            width: "",
            bottom: ""
          }).removeClass(sticky_class);
          restore = true;
        }
        top = elm.offset().top - (parseInt(elm.css("margin-top"), 10) || 0) - offset_top;
        height = elm.outerHeight(true);
        el_float = elm.css("float");
        if (spacer) {
          spacer.css({
            width: outer_width(elm),
            height: height,
            display: elm.css("display"),
            "vertical-align": elm.css("vertical-align"),
            "float": el_float
          });
        }
        if (restore) {
          return tick();
        }
      };
      recalc();
      if (height === parent_height) {
        return;
      }
      last_pos = void 0;
      offset = offset_top;
      recalc_counter = recalc_every;
      tick = function() {
        var css, delta, recalced, scroll, will_bottom, win_height;

        if (detached) {
          return;
        }
        recalced = false;
        if (recalc_counter != null) {
          recalc_counter -= 1;
          if (recalc_counter <= 0) {
            recalc_counter = recalc_every;
            recalc();
            recalced = true;
          }
        }
        if (!recalced && doc.height() !== last_scroll_height) {
          recalc();
          recalced = true;
        }
        scroll = win.scrollTop();
        if (last_pos != null) {
          delta = scroll - last_pos;
        }
        last_pos = scroll;
        if (fixed) {
          if (enable_bottoming) {
            will_bottom = scroll + height + offset > parent_height + parent_top;
            if (bottomed && !will_bottom) {
              bottomed = false;
              elm.css({
                position: "fixed",
                bottom: "",
                top: offset
              }).trigger("sticky_kit:unbottom");
            }
          }
          if (scroll < top) {
            fixed = false;
            offset = offset_top;
            if (manual_spacer == null) {
              if (el_float === "left" || el_float === "right") {
                elm.insertAfter(spacer);
              }
              spacer.detach();
            }
            css = {
              position: "",
              width: "",
              top: ""
            };
            elm.css(css).removeClass(sticky_class).trigger("sticky_kit:unstick");
          }
          if (inner_scrolling) {
            win_height = win.height();
            if (height + offset_top > win_height) {
              if (!bottomed) {
                offset -= delta;
                offset = Math.max(win_height - height, offset);
                offset = Math.min(offset_top, offset);
                if (fixed) {
                  elm.css({
                    top: offset + "px"
                  });
                }
              }
            }
          }
        } else {
          if (scroll > top) {
            fixed = true;
            css = {
              position: "fixed",
              top: offset
            };
            css.width = elm.css("box-sizing") === "border-box" ? elm.outerWidth() + "px" : elm.width() + "px";
            elm.css(css).addClass(sticky_class);
            if (manual_spacer == null) {
              elm.after(spacer);
              if (el_float === "left" || el_float === "right") {
                spacer.append(elm);
              }
            }
            elm.trigger("sticky_kit:stick");
          }
        }
        if (fixed && enable_bottoming) {
          if (will_bottom == null) {
            will_bottom = scroll + height + offset > parent_height + parent_top;
          }
          if (!bottomed && will_bottom) {
            bottomed = true;
            if (parent.css("position") === "static") {
              parent.css({
                position: "relative"
              });
            }
            return elm.css({
              position: "absolute",
              bottom: padding_bottom,
              top: "auto"
            }).trigger("sticky_kit:bottom");
          }
        }
      };
      recalc_and_tick = function() {
        recalc();
        return tick();
      };
      detach = function() {
        detached = true;
        win.off("touchmove", tick);
        win.off("scroll", tick);
        win.off("resize", recalc_and_tick);
        $(document.body).off("sticky_kit:recalc", recalc_and_tick);
        elm.off("sticky_kit:detach", detach);
        elm.removeData("sticky_kit");
        elm.css({
          position: "",
          bottom: "",
          top: "",
          width: ""
        });
        parent.position("position", "");
        if (fixed) {
          if (manual_spacer == null) {
            if (el_float === "left" || el_float === "right") {
              elm.insertAfter(spacer);
            }
            spacer.remove();
          }
          return elm.removeClass(sticky_class);
        }
      };
      win.on("touchmove", tick);
      win.on("scroll", tick);
      win.on("resize", recalc_and_tick);
      $(document.body).on("sticky_kit:recalc", recalc_and_tick);
      elm.on("sticky_kit:detach", detach);
      return setTimeout(tick, 0);
    };
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      elm = this[_i];
      _fn($(elm));
    }
    return this;
  };

}).call(this);

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).Sortable=e()}(this,function(){function t(){return(t=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}function e(t){if("undefined"!=typeof window&&window.navigator)return!!navigator.userAgent.match(t)}var n=e(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),o=e(/Edge/i),i=e(/firefox/i),r=e(/safari/i)&&!e(/chrome/i)&&!e(/android/i),a=e(/iP(ad|od|hone)/i),l=e(/chrome/i)&&e(/android/i),s={capture:!1,passive:!1};function c(t,e,o){t.addEventListener(e,o,!n&&s)}function u(t,e,o){t.removeEventListener(e,o,!n&&s)}function d(t,e){if(e){if(">"===e[0]&&(e=e.substring(1)),t)try{if(t.matches)return t.matches(e);if(t.msMatchesSelector)return t.msMatchesSelector(e);if(t.webkitMatchesSelector)return t.webkitMatchesSelector(e)}catch(t){return!1}return!1}}function h(t){return t.host&&t!==document&&t.host.nodeType?t.host:t.parentNode}function f(t,e,n,o){if(t){n=n||document;do{if(null!=e&&(">"===e[0]?t.parentNode===n&&d(t,e):d(t,e))||o&&t===n)return t;if(t===n)break}while(t=h(t))}return null}var p,g=/\s+/g;function v(t,e,n){if(t&&e)if(t.classList)t.classList[n?"add":"remove"](e);else{var o=(" "+t.className+" ").replace(g," ").replace(" "+e+" "," ");t.className=(o+(n?" "+e:"")).replace(g," ")}}function m(t,e,n){var o=t&&t.style;if(o){if(void 0===n)return document.defaultView&&document.defaultView.getComputedStyle?n=document.defaultView.getComputedStyle(t,""):t.currentStyle&&(n=t.currentStyle),void 0===e?n:n[e];e in o||-1!==e.indexOf("webkit")||(e="-webkit-"+e),o[e]=n+("string"==typeof n?"":"px")}}function b(t,e){var n="";if("string"==typeof t)n=t;else do{var o=m(t,"transform");o&&"none"!==o&&(n=o+" "+n)}while(!e&&(t=t.parentNode));var i=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return i&&new i(n)}function w(t,e,n){if(t){var o=t.getElementsByTagName(e),i=0,r=o.length;if(n)for(;i<r;i++)n(o[i],i);return o}return[]}function E(){return document.scrollingElement||document.documentElement}function y(t,e,o,i,r){if(t.getBoundingClientRect||t===window){var a,l,s,c,u,d,h;if(t!==window&&t!==E()?(l=(a=t.getBoundingClientRect()).top,s=a.left,c=a.bottom,u=a.right,d=a.height,h=a.width):(l=0,s=0,c=window.innerHeight,u=window.innerWidth,d=window.innerHeight,h=window.innerWidth),(e||o)&&t!==window&&(r=r||t.parentNode,!n))do{if(r&&r.getBoundingClientRect&&("none"!==m(r,"transform")||o&&"static"!==m(r,"position"))){var f=r.getBoundingClientRect();l-=f.top+parseInt(m(r,"border-top-width")),s-=f.left+parseInt(m(r,"border-left-width")),c=l+a.height,u=s+a.width;break}}while(r=r.parentNode);if(i&&t!==window){var p=b(r||t),g=p&&p.a,v=p&&p.d;p&&(c=(l/=v)+(d/=v),u=(s/=g)+(h/=g))}return{top:l,left:s,bottom:c,right:u,width:h,height:d}}}function D(t,e,n){for(var o=x(t,!0),i=y(t)[e];o;){var r=y(o)[n];if(!("top"===n||"left"===n?i>=r:i<=r))return o;if(o===E())break;o=x(o,!1)}return!1}function _(t,e,n){for(var o=0,i=0,r=t.children;i<r.length;){if("none"!==r[i].style.display&&r[i]!==It.ghost&&r[i]!==It.dragged&&f(r[i],n.draggable,t,!1)){if(o===e)return r[i];o++}i++}return null}function S(t,e){for(var n=t.lastElementChild;n&&(n===It.ghost||"none"===m(n,"display")||e&&!d(n,e));)n=n.previousElementSibling;return n||null}function C(t,e){var n=0;if(!t||!t.parentNode)return-1;for(;t=t.previousElementSibling;)"TEMPLATE"===t.nodeName.toUpperCase()||t===It.clone||e&&!d(t,e)||n++;return n}function T(t){var e=0,n=0,o=E();if(t)do{var i=b(t);e+=t.scrollLeft*i.a,n+=t.scrollTop*i.d}while(t!==o&&(t=t.parentNode));return[e,n]}function x(t,e){if(!t||!t.getBoundingClientRect)return E();var n=t,o=!1;do{if(n.clientWidth<n.scrollWidth||n.clientHeight<n.scrollHeight){var i=m(n);if(n.clientWidth<n.scrollWidth&&("auto"==i.overflowX||"scroll"==i.overflowX)||n.clientHeight<n.scrollHeight&&("auto"==i.overflowY||"scroll"==i.overflowY)){if(!n.getBoundingClientRect||n===document.body)return E();if(o||e)return n;o=!0}}}while(n=n.parentNode);return E()}function M(t,e){return Math.round(t.top)===Math.round(e.top)&&Math.round(t.left)===Math.round(e.left)&&Math.round(t.height)===Math.round(e.height)&&Math.round(t.width)===Math.round(e.width)}function N(t,e){return function(){if(!p){var n=arguments,o=this;1===n.length?t.call(o,n[0]):t.apply(o,n),p=setTimeout(function(){p=void 0},e)}}}function O(t,e,n){t.scrollLeft+=e,t.scrollTop+=n}function A(t){var e=window.Polymer,n=window.jQuery||window.Zepto;return e&&e.dom?e.dom(t).cloneNode(!0):n?n(t).clone(!0)[0]:t.cloneNode(!0)}function I(t,e){m(t,"position","absolute"),m(t,"top",e.top),m(t,"left",e.left),m(t,"width",e.width),m(t,"height",e.height)}function P(t){m(t,"position",""),m(t,"top",""),m(t,"left",""),m(t,"width",""),m(t,"height","")}var k="Sortable"+(new Date).getTime(),R=[],X={initializeByDefault:!0},Y={mount:function(t){for(var e in X)X.hasOwnProperty(e)&&!(e in t)&&(t[e]=X[e]);R.push(t)},pluginEvent:function(e,n,o){var i=this;this.eventCanceled=!1,o.cancel=function(){i.eventCanceled=!0};var r=e+"Global";R.forEach(function(i){n[i.pluginName]&&(n[i.pluginName][r]&&n[i.pluginName][r](t({sortable:n},o)),n.options[i.pluginName]&&n[i.pluginName][e]&&n[i.pluginName][e](t({sortable:n},o)))})},initializePlugins:function(t,e,n,o){for(var i in R.forEach(function(o){var i=o.pluginName;if(t.options[i]||o.initializeByDefault){var r=new o(t,e,t.options);r.sortable=t,r.options=t.options,t[i]=r,Object.assign(n,r.defaults)}}),t.options)if(t.options.hasOwnProperty(i)){var r=this.modifyOption(t,i,t.options[i]);void 0!==r&&(t.options[i]=r)}},getEventProperties:function(t,e){var n={};return R.forEach(function(o){"function"==typeof o.eventProperties&&Object.assign(n,o.eventProperties.call(e[o.pluginName],t))}),n},modifyOption:function(t,e,n){var o;return R.forEach(function(i){t[i.pluginName]&&i.optionListeners&&"function"==typeof i.optionListeners[e]&&(o=i.optionListeners[e].call(t[i.pluginName],n))}),o}};function B(e){var i=e.sortable,r=e.rootEl,a=e.name,l=e.targetEl,s=e.cloneEl,c=e.toEl,u=e.fromEl,d=e.oldIndex,h=e.newIndex,f=e.oldDraggableIndex,p=e.newDraggableIndex,g=e.originalEvent,v=e.putSortable,m=e.extraEventProperties;if(i=i||r&&r[k]){var b,w=i.options,E="on"+a.charAt(0).toUpperCase()+a.substr(1);!window.CustomEvent||n||o?(b=document.createEvent("Event")).initEvent(a,!0,!0):b=new CustomEvent(a,{bubbles:!0,cancelable:!0}),b.to=c||r,b.from=u||r,b.item=l||r,b.clone=s,b.oldIndex=d,b.newIndex=h,b.oldDraggableIndex=f,b.newDraggableIndex=p,b.originalEvent=g,b.pullMode=v?v.lastPutMode:void 0;var y=t({},m,Y.getEventProperties(a,i));for(var D in y)b[D]=y[D];r&&r.dispatchEvent(b),w[E]&&w[E].call(i,b)}}var H=function(e,n,o){var i=void 0===o?{}:o,r=i.evt,a=function(t,e){if(null==t)return{};var n,o,i={},r=Object.keys(t);for(o=0;o<r.length;o++)e.indexOf(n=r[o])>=0||(i[n]=t[n]);return i}(i,["evt"]);Y.pluginEvent.bind(It)(e,n,t({dragEl:L,parentEl:j,ghostEl:K,rootEl:W,nextEl:z,lastDownEl:G,cloneEl:U,cloneHidden:q,dragStarted:lt,putSortable:tt,activeSortable:It.active,originalEvent:r,oldIndex:V,oldDraggableIndex:Q,newIndex:Z,newDraggableIndex:$,hideGhostForTarget:xt,unhideGhostForTarget:Mt,cloneNowHidden:function(){q=!0},cloneNowShown:function(){q=!1},dispatchSortableEvent:function(t){F({sortable:n,name:t,originalEvent:r})}},a))};function F(e){B(t({putSortable:tt,cloneEl:U,targetEl:L,rootEl:W,oldIndex:V,oldDraggableIndex:Q,newIndex:Z,newDraggableIndex:$},e))}var L,j,K,W,z,G,U,q,V,Z,Q,$,J,tt,et,nt,ot,it,rt,at,lt,st,ct,ut,dt,ht=!1,ft=!1,pt=[],gt=!1,vt=!1,mt=[],bt=!1,wt=[],Et="undefined"!=typeof document,yt=a,Dt=o||n?"cssFloat":"float",_t=Et&&!l&&!a&&"draggable"in document.createElement("div"),St=function(){if(Et){if(n)return!1;var t=document.createElement("x");return t.style.cssText="pointer-events:auto","auto"===t.style.pointerEvents}}(),Ct=function(t,e){var n=m(t),o=parseInt(n.width)-parseInt(n.paddingLeft)-parseInt(n.paddingRight)-parseInt(n.borderLeftWidth)-parseInt(n.borderRightWidth),i=_(t,0,e),r=_(t,1,e),a=i&&m(i),l=r&&m(r),s=a&&parseInt(a.marginLeft)+parseInt(a.marginRight)+y(i).width,c=l&&parseInt(l.marginLeft)+parseInt(l.marginRight)+y(r).width;return"flex"===n.display?"column"===n.flexDirection||"column-reverse"===n.flexDirection?"vertical":"horizontal":"grid"===n.display?n.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal":i&&a.float&&"none"!==a.float?!r||"both"!==l.clear&&l.clear!==("left"===a.float?"left":"right")?"horizontal":"vertical":i&&("block"===a.display||"flex"===a.display||"table"===a.display||"grid"===a.display||s>=o&&"none"===n[Dt]||r&&"none"===n[Dt]&&s+c>o)?"vertical":"horizontal"},Tt=function(t){function e(t,n){return function(o,i,r,a){if(null==t&&(n||o.options.group.name&&i.options.group.name&&o.options.group.name===i.options.group.name))return!0;if(null==t||!1===t)return!1;if(n&&"clone"===t)return t;if("function"==typeof t)return e(t(o,i,r,a),n)(o,i,r,a);var l=(n?o:i).options.group.name;return!0===t||"string"==typeof t&&t===l||t.join&&t.indexOf(l)>-1}}var n={},o=t.group;o&&"object"==typeof o||(o={name:o}),n.name=o.name,n.checkPull=e(o.pull,!0),n.checkPut=e(o.put),n.revertClone=o.revertClone,t.group=n},xt=function(){!St&&K&&m(K,"display","none")},Mt=function(){!St&&K&&m(K,"display","")};Et&&document.addEventListener("click",function(t){if(ft)return t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation(),ft=!1,!1},!0);var Nt,Ot=function(t){if(L){var e=(i=(t=t.touches?t.touches[0]:t).clientX,r=t.clientY,pt.some(function(t){if(!S(t)){var e=y(t),n=t[k].options.emptyInsertThreshold;return n&&i>=e.left-n&&i<=e.right+n&&r>=e.top-n&&r<=e.bottom+n?a=t:void 0}}),a);if(e){var n={};for(var o in t)t.hasOwnProperty(o)&&(n[o]=t[o]);n.target=n.rootEl=e,n.preventDefault=void 0,n.stopPropagation=void 0,e[k]._onDragOver(n)}}var i,r,a},At=function(t){L&&L.parentNode[k]._isOutsideThisEl(t.target)};function It(e,n){if(!e||!e.nodeType||1!==e.nodeType)throw"Sortable: `el` must be an HTMLElement, not "+{}.toString.call(e);this.el=e,this.options=n=Object.assign({},n),e[k]=this;var o,i,r={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(e.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return Ct(e,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==It.supportPointer&&"PointerEvent"in window,emptyInsertThreshold:5};for(var a in Y.initializePlugins(this,e,r),r)!(a in n)&&(n[a]=r[a]);for(var l in Tt(n),this)"_"===l.charAt(0)&&"function"==typeof this[l]&&(this[l]=this[l].bind(this));this.nativeDraggable=!n.forceFallback&&_t,this.nativeDraggable&&(this.options.touchStartThreshold=1),n.supportPointer?c(e,"pointerdown",this._onTapStart):(c(e,"mousedown",this._onTapStart),c(e,"touchstart",this._onTapStart)),this.nativeDraggable&&(c(e,"dragover",this),c(e,"dragenter",this)),pt.push(this.el),n.store&&n.store.get&&this.sort(n.store.get(this)||[]),Object.assign(this,(i=[],{captureAnimationState:function(){i=[],this.options.animation&&[].slice.call(this.el.children).forEach(function(e){if("none"!==m(e,"display")&&void 0!==e){i.push({target:e,rect:y(e)});var n=t({},i[i.length-1].rect);if(e.thisAnimationDuration){var o=b(e,!0);o&&(n.top-=o.f,n.left-=o.e)}e.fromRect=n}})},addAnimationState:function(t){i.push(t)},removeAnimationState:function(t){i.splice(function(t,e){for(var n in t)if(t.hasOwnProperty(n))for(var o in e)if(e.hasOwnProperty(o)&&e[o]===t[n][o])return Number(n);return-1}(i,{target:t}),1)},animateAll:function(t){var e=this;if(!this.options.animation)return clearTimeout(o),void("function"==typeof t&&t());var n=!1,r=0;i.forEach(function(t){var o=0,i=t.target,a=i.fromRect,l=y(i),s=i.prevFromRect,c=i.prevToRect,u=t.rect,d=b(i,!0);d&&(l.top-=d.f,l.left-=d.e),i.toRect=l,i.thisAnimationDuration&&M(s,l)&&!M(a,l)&&(u.top-l.top)/(u.left-l.left)==(a.top-l.top)/(a.left-l.left)&&(o=function(t,e,n,o){return Math.sqrt(Math.pow(e.top-t.top,2)+Math.pow(e.left-t.left,2))/Math.sqrt(Math.pow(e.top-n.top,2)+Math.pow(e.left-n.left,2))*o.animation}(u,s,c,e.options)),M(l,a)||(i.prevFromRect=a,i.prevToRect=l,o||(o=e.options.animation),e.animate(i,u,l,o)),o&&(n=!0,r=Math.max(r,o),clearTimeout(i.animationResetTimer),i.animationResetTimer=setTimeout(function(){i.animationTime=0,i.prevFromRect=null,i.fromRect=null,i.prevToRect=null,i.thisAnimationDuration=null},o),i.thisAnimationDuration=o)}),clearTimeout(o),n?o=setTimeout(function(){"function"==typeof t&&t()},r):"function"==typeof t&&t(),i=[]},animate:function(t,e,n,o){if(o){m(t,"transition",""),m(t,"transform","");var i=b(this.el),r=(e.left-n.left)/(i&&i.a||1),a=(e.top-n.top)/(i&&i.d||1);t.animatingX=!!r,t.animatingY=!!a,m(t,"transform","translate3d("+r+"px,"+a+"px,0)"),this.forRepaintDummy=function(t){return t.offsetWidth}(t),m(t,"transition","transform "+o+"ms"+(this.options.easing?" "+this.options.easing:"")),m(t,"transform","translate3d(0,0,0)"),"number"==typeof t.animated&&clearTimeout(t.animated),t.animated=setTimeout(function(){m(t,"transition",""),m(t,"transform",""),t.animated=!1,t.animatingX=!1,t.animatingY=!1},o)}}}))}function Pt(t,e,i,r,a,l,s,c){var u,d,h=t[k],f=h.options.onMove;return!window.CustomEvent||n||o?(u=document.createEvent("Event")).initEvent("move",!0,!0):u=new CustomEvent("move",{bubbles:!0,cancelable:!0}),u.to=e,u.from=t,u.dragged=i,u.draggedRect=r,u.related=a||e,u.relatedRect=l||y(e),u.willInsertAfter=c,u.originalEvent=s,t.dispatchEvent(u),f&&(d=f.call(h,u,s)),d}function kt(t){t.draggable=!1}function Rt(){bt=!1}function Xt(t){for(var e=t.tagName+t.className+t.src+t.href+t.textContent,n=e.length,o=0;n--;)o+=e.charCodeAt(n);return o.toString(36)}function Yt(t){return setTimeout(t,0)}function Bt(t){return clearTimeout(t)}It.prototype={constructor:It,_isOutsideThisEl:function(t){this.el.contains(t)||t===this.el||(st=null)},_getDirection:function(t,e){return"function"==typeof this.options.direction?this.options.direction.call(this,t,e,L):this.options.direction},_onTapStart:function(t){if(t.cancelable){var e=this,n=this.el,o=this.options,i=o.preventOnFilter,a=t.type,l=t.touches&&t.touches[0]||t.pointerType&&"touch"===t.pointerType&&t,s=(l||t).target,c=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||s,u=o.filter;if(function(t){wt.length=0;for(var e=t.getElementsByTagName("input"),n=e.length;n--;){var o=e[n];o.checked&&wt.push(o)}}(n),!L&&!(/mousedown|pointerdown/.test(a)&&0!==t.button||o.disabled)&&!c.isContentEditable&&(this.nativeDraggable||!r||!s||"SELECT"!==s.tagName.toUpperCase())&&!((s=f(s,o.draggable,n,!1))&&s.animated||G===s)){if(V=C(s),Q=C(s,o.draggable),"function"==typeof u){if(u.call(this,t,s,this))return F({sortable:e,rootEl:c,name:"filter",targetEl:s,toEl:n,fromEl:n}),H("filter",e,{evt:t}),void(i&&t.cancelable&&t.preventDefault())}else if(u&&(u=u.split(",").some(function(o){if(o=f(c,o.trim(),n,!1))return F({sortable:e,rootEl:o,name:"filter",targetEl:s,fromEl:n,toEl:n}),H("filter",e,{evt:t}),!0})))return void(i&&t.cancelable&&t.preventDefault());o.handle&&!f(c,o.handle,n,!1)||this._prepareDragStart(t,l,s)}}},_prepareDragStart:function(t,e,r){var a,l=this,s=l.el,u=l.options,d=s.ownerDocument;if(r&&!L&&r.parentNode===s){var h=y(r);if(W=s,j=(L=r).parentNode,z=L.nextSibling,G=r,J=u.group,It.dragged=L,rt=(et={target:L,clientX:(e||t).clientX,clientY:(e||t).clientY}).clientX-h.left,at=et.clientY-h.top,this._lastX=(e||t).clientX,this._lastY=(e||t).clientY,L.style["will-change"]="all",a=function(){H("delayEnded",l,{evt:t}),It.eventCanceled?l._onDrop():(l._disableDelayedDragEvents(),!i&&l.nativeDraggable&&(L.draggable=!0),l._triggerDragStart(t,e),F({sortable:l,name:"choose",originalEvent:t}),v(L,u.chosenClass,!0))},u.ignore.split(",").forEach(function(t){w(L,t.trim(),kt)}),c(d,"dragover",Ot),c(d,"mousemove",Ot),c(d,"touchmove",Ot),c(d,"mouseup",l._onDrop),c(d,"touchend",l._onDrop),c(d,"touchcancel",l._onDrop),i&&this.nativeDraggable&&(this.options.touchStartThreshold=4,L.draggable=!0),H("delayStart",this,{evt:t}),!u.delay||u.delayOnTouchOnly&&!e||this.nativeDraggable&&(o||n))a();else{if(It.eventCanceled)return void this._onDrop();c(d,"mouseup",l._disableDelayedDrag),c(d,"touchend",l._disableDelayedDrag),c(d,"touchcancel",l._disableDelayedDrag),c(d,"mousemove",l._delayedDragTouchMoveHandler),c(d,"touchmove",l._delayedDragTouchMoveHandler),u.supportPointer&&c(d,"pointermove",l._delayedDragTouchMoveHandler),l._dragStartTimer=setTimeout(a,u.delay)}}},_delayedDragTouchMoveHandler:function(t){var e=t.touches?t.touches[0]:t;Math.max(Math.abs(e.clientX-this._lastX),Math.abs(e.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){L&&kt(L),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;u(t,"mouseup",this._disableDelayedDrag),u(t,"touchend",this._disableDelayedDrag),u(t,"touchcancel",this._disableDelayedDrag),u(t,"mousemove",this._delayedDragTouchMoveHandler),u(t,"touchmove",this._delayedDragTouchMoveHandler),u(t,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(t,e){e=e||"touch"==t.pointerType&&t,!this.nativeDraggable||e?c(document,this.options.supportPointer?"pointermove":e?"touchmove":"mousemove",this._onTouchMove):(c(L,"dragend",this),c(W,"dragstart",this._onDragStart));try{document.selection?Yt(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch(t){}},_dragStarted:function(t,e){if(ht=!1,W&&L){H("dragStarted",this,{evt:e}),this.nativeDraggable&&c(document,"dragover",At);var n=this.options;!t&&v(L,n.dragClass,!1),v(L,n.ghostClass,!0),It.active=this,t&&this._appendGhost(),F({sortable:this,name:"start",originalEvent:e})}else this._nulling()},_emulateDragOver:function(){if(nt){this._lastX=nt.clientX,this._lastY=nt.clientY,xt();for(var t=document.elementFromPoint(nt.clientX,nt.clientY),e=t;t&&t.shadowRoot&&(t=t.shadowRoot.elementFromPoint(nt.clientX,nt.clientY))!==e;)e=t;if(L.parentNode[k]._isOutsideThisEl(t),e)do{if(e[k]&&e[k]._onDragOver({clientX:nt.clientX,clientY:nt.clientY,target:t,rootEl:e})&&!this.options.dragoverBubble)break;t=e}while(e=e.parentNode);Mt()}},_onTouchMove:function(t){if(et){var e=this.options,n=e.fallbackTolerance,o=e.fallbackOffset,i=t.touches?t.touches[0]:t,r=K&&b(K,!0),a=K&&r&&r.a,l=K&&r&&r.d,s=yt&&dt&&T(dt),c=(i.clientX-et.clientX+o.x)/(a||1)+(s?s[0]-mt[0]:0)/(a||1),u=(i.clientY-et.clientY+o.y)/(l||1)+(s?s[1]-mt[1]:0)/(l||1);if(!It.active&&!ht){if(n&&Math.max(Math.abs(i.clientX-this._lastX),Math.abs(i.clientY-this._lastY))<n)return;this._onDragStart(t,!0)}if(K){r?(r.e+=c-(ot||0),r.f+=u-(it||0)):r={a:1,b:0,c:0,d:1,e:c,f:u};var d="matrix("+r.a+","+r.b+","+r.c+","+r.d+","+r.e+","+r.f+")";m(K,"webkitTransform",d),m(K,"mozTransform",d),m(K,"msTransform",d),m(K,"transform",d),ot=c,it=u,nt=i}t.cancelable&&t.preventDefault()}},_appendGhost:function(){if(!K){var t=this.options.fallbackOnBody?document.body:W,e=y(L,!0,yt,!0,t),n=this.options;if(yt){for(dt=t;"static"===m(dt,"position")&&"none"===m(dt,"transform")&&dt!==document;)dt=dt.parentNode;dt!==document.body&&dt!==document.documentElement?(dt===document&&(dt=E()),e.top+=dt.scrollTop,e.left+=dt.scrollLeft):dt=E(),mt=T(dt)}v(K=L.cloneNode(!0),n.ghostClass,!1),v(K,n.fallbackClass,!0),v(K,n.dragClass,!0),m(K,"transition",""),m(K,"transform",""),m(K,"box-sizing","border-box"),m(K,"margin",0),m(K,"top",e.top),m(K,"left",e.left),m(K,"width",e.width),m(K,"height",e.height),m(K,"opacity","0.8"),m(K,"position",yt?"absolute":"fixed"),m(K,"zIndex","100000"),m(K,"pointerEvents","none"),It.ghost=K,t.appendChild(K),m(K,"transform-origin",rt/parseInt(K.style.width)*100+"% "+at/parseInt(K.style.height)*100+"%")}},_onDragStart:function(t,e){var n=this,o=t.dataTransfer,i=n.options;H("dragStart",this,{evt:t}),It.eventCanceled?this._onDrop():(H("setupClone",this),It.eventCanceled||((U=A(L)).draggable=!1,U.style["will-change"]="",this._hideClone(),v(U,this.options.chosenClass,!1),It.clone=U),n.cloneId=Yt(function(){H("clone",n),It.eventCanceled||(n.options.removeCloneOnHide||W.insertBefore(U,L),n._hideClone(),F({sortable:n,name:"clone"}))}),!e&&v(L,i.dragClass,!0),e?(ft=!0,n._loopId=setInterval(n._emulateDragOver,50)):(u(document,"mouseup",n._onDrop),u(document,"touchend",n._onDrop),u(document,"touchcancel",n._onDrop),o&&(o.effectAllowed="move",i.setData&&i.setData.call(n,o,L)),c(document,"drop",n),m(L,"transform","translateZ(0)")),ht=!0,n._dragStartId=Yt(n._dragStarted.bind(n,e,t)),c(document,"selectstart",n),lt=!0,r&&m(document.body,"user-select","none"))},_onDragOver:function(e){var n,o,i,r,a=this.el,l=e.target,s=this.options,c=s.group,u=It.active,d=J===c,h=s.sort,p=tt||u,g=this,b=!1;if(!bt){if(void 0!==e.preventDefault&&e.cancelable&&e.preventDefault(),l=f(l,s.draggable,a,!0),B("dragOver"),It.eventCanceled)return b;if(L.contains(e.target)||l.animated&&l.animatingX&&l.animatingY||g._ignoreWhileAnimating===l)return U(!1);if(ft=!1,u&&!s.disabled&&(d?h||(i=!W.contains(L)):tt===this||(this.lastPutMode=J.checkPull(this,u,L,e))&&c.checkPut(this,u,L,e))){if(r="vertical"===this._getDirection(e,l),n=y(L),B("dragOverValid"),It.eventCanceled)return b;if(i)return j=W,G(),this._hideClone(),B("revert"),It.eventCanceled||(z?W.insertBefore(L,z):W.appendChild(L)),U(!0);var w=S(a,s.draggable);if(!w||function(t,e,n){var o=y(S(n.el,n.options.draggable));return e?t.clientX>o.right+10||t.clientX<=o.right&&t.clientY>o.bottom&&t.clientX>=o.left:t.clientX>o.right&&t.clientY>o.top||t.clientX<=o.right&&t.clientY>o.bottom+10}(e,r,this)&&!w.animated){if(w===L)return U(!1);if(w&&a===e.target&&(l=w),l&&(o=y(l)),!1!==Pt(W,a,L,n,l,o,e,!!l))return G(),a.appendChild(L),j=a,q(),U(!0)}else if(l.parentNode===a){o=y(l);var E,_,T,x=L.parentNode!==a,M=!function(t,e,n){var o=n?t.left:t.top,i=n?e.left:e.top;return o===i||(n?t.right:t.bottom)===(n?e.right:e.bottom)||o+(n?t.width:t.height)/2===i+(n?e.width:e.height)/2}(L.animated&&L.toRect||n,l.animated&&l.toRect||o,r),N=r?"top":"left",A=D(l,"top","top")||D(L,"top","top"),I=A?A.scrollTop:void 0;if(st!==l&&(_=o[N],gt=!1,vt=!M&&s.invertSwap||x),0!==(E=function(t,e,n,o,i,r,a,l){var s=o?t.clientY:t.clientX,c=o?n.height:n.width,u=o?n.top:n.left,d=o?n.bottom:n.right,h=!1;if(!a)if(l&&ut<c*i){if(!gt&&(1===ct?s>u+c*r/2:s<d-c*r/2)&&(gt=!0),gt)h=!0;else if(1===ct?s<u+ut:s>d-ut)return-ct}else if(s>u+c*(1-i)/2&&s<d-c*(1-i)/2)return function(t){return C(L)<C(t)?1:-1}(e);return(h=h||a)&&(s<u+c*r/2||s>d-c*r/2)?s>u+c/2?1:-1:0}(e,l,o,r,M?1:s.swapThreshold,null==s.invertedSwapThreshold?s.swapThreshold:s.invertedSwapThreshold,vt,st===l))){var P=C(L);do{T=j.children[P-=E]}while(T&&("none"===m(T,"display")||T===K))}if(0===E||T===l)return U(!1);st=l,ct=E;var R=l.nextElementSibling,X=!1,Y=Pt(W,a,L,n,l,o,e,X=1===E);if(!1!==Y)return 1!==Y&&-1!==Y||(X=1===Y),bt=!0,setTimeout(Rt,30),G(),X&&!R?a.appendChild(L):l.parentNode.insertBefore(L,X?R:l),A&&O(A,0,I-A.scrollTop),j=L.parentNode,void 0===_||vt||(ut=Math.abs(_-y(l)[N])),q(),U(!0)}if(a.contains(L))return U(!1)}return!1}function B(s,c){H(s,g,t({evt:e,isOwner:d,axis:r?"vertical":"horizontal",revert:i,dragRect:n,targetRect:o,canSort:h,fromSortable:p,target:l,completed:U,onMove:function(t,o){return Pt(W,a,L,n,t,y(t),e,o)},changed:q},c))}function G(){B("dragOverAnimationCapture"),g.captureAnimationState(),g!==p&&p.captureAnimationState()}function U(t){return B("dragOverCompleted",{insertion:t}),t&&(d?u._hideClone():u._showClone(g),g!==p&&(v(L,tt?tt.options.ghostClass:u.options.ghostClass,!1),v(L,s.ghostClass,!0)),tt!==g&&g!==It.active?tt=g:g===It.active&&tt&&(tt=null),p===g&&(g._ignoreWhileAnimating=l),g.animateAll(function(){B("dragOverAnimationComplete"),g._ignoreWhileAnimating=null}),g!==p&&(p.animateAll(),p._ignoreWhileAnimating=null)),(l===L&&!L.animated||l===a&&!l.animated)&&(st=null),s.dragoverBubble||e.rootEl||l===document||(L.parentNode[k]._isOutsideThisEl(e.target),!t&&Ot(e)),!s.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),b=!0}function q(){Z=C(L),$=C(L,s.draggable),F({sortable:g,name:"change",toEl:a,newIndex:Z,newDraggableIndex:$,originalEvent:e})}},_ignoreWhileAnimating:null,_offMoveEvents:function(){u(document,"mousemove",this._onTouchMove),u(document,"touchmove",this._onTouchMove),u(document,"pointermove",this._onTouchMove),u(document,"dragover",Ot),u(document,"mousemove",Ot),u(document,"touchmove",Ot)},_offUpEvents:function(){var t=this.el.ownerDocument;u(t,"mouseup",this._onDrop),u(t,"touchend",this._onDrop),u(t,"pointerup",this._onDrop),u(t,"touchcancel",this._onDrop),u(document,"selectstart",this)},_onDrop:function(t){var e=this.el,n=this.options;Z=C(L),$=C(L,n.draggable),H("drop",this,{evt:t}),j=L&&L.parentNode,Z=C(L),$=C(L,n.draggable),It.eventCanceled||(ht=!1,vt=!1,gt=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),Bt(this.cloneId),Bt(this._dragStartId),this.nativeDraggable&&(u(document,"drop",this),u(e,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),r&&m(document.body,"user-select",""),m(L,"transform",""),t&&(lt&&(t.cancelable&&t.preventDefault(),!n.dropBubble&&t.stopPropagation()),K&&K.parentNode&&K.parentNode.removeChild(K),(W===j||tt&&"clone"!==tt.lastPutMode)&&U&&U.parentNode&&U.parentNode.removeChild(U),L&&(this.nativeDraggable&&u(L,"dragend",this),kt(L),L.style["will-change"]="",lt&&!ht&&v(L,tt?tt.options.ghostClass:this.options.ghostClass,!1),v(L,this.options.chosenClass,!1),F({sortable:this,name:"unchoose",toEl:j,newIndex:null,newDraggableIndex:null,originalEvent:t}),W!==j?(Z>=0&&(F({rootEl:j,name:"add",toEl:j,fromEl:W,originalEvent:t}),F({sortable:this,name:"remove",toEl:j,originalEvent:t}),F({rootEl:j,name:"sort",toEl:j,fromEl:W,originalEvent:t}),F({sortable:this,name:"sort",toEl:j,originalEvent:t})),tt&&tt.save()):Z!==V&&Z>=0&&(F({sortable:this,name:"update",toEl:j,originalEvent:t}),F({sortable:this,name:"sort",toEl:j,originalEvent:t})),It.active&&(null!=Z&&-1!==Z||(Z=V,$=Q),F({sortable:this,name:"end",toEl:j,originalEvent:t}),this.save())))),this._nulling()},_nulling:function(){H("nulling",this),W=L=j=K=z=U=G=q=et=nt=lt=Z=$=V=Q=st=ct=tt=J=It.dragged=It.ghost=It.clone=It.active=null,wt.forEach(function(t){t.checked=!0}),wt.length=ot=it=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragenter":case"dragover":L&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move"),t.cancelable&&t.preventDefault()}(t));break;case"selectstart":t.preventDefault()}},toArray:function(){for(var t,e=[],n=this.el.children,o=0,i=n.length,r=this.options;o<i;o++)f(t=n[o],r.draggable,this.el,!1)&&e.push(t.getAttribute(r.dataIdAttr)||Xt(t));return e},sort:function(t){var e={},n=this.el;this.toArray().forEach(function(t,o){var i=n.children[o];f(i,this.options.draggable,n,!1)&&(e[t]=i)},this),t.forEach(function(t){e[t]&&(n.removeChild(e[t]),n.appendChild(e[t]))})},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return f(t,e||this.options.draggable,this.el,!1)},option:function(t,e){var n=this.options;if(void 0===e)return n[t];var o=Y.modifyOption(this,t,e);n[t]=void 0!==o?o:e,"group"===t&&Tt(n)},destroy:function(){H("destroy",this);var t=this.el;t[k]=null,u(t,"mousedown",this._onTapStart),u(t,"touchstart",this._onTapStart),u(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(u(t,"dragover",this),u(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),pt.splice(pt.indexOf(this.el),1),this.el=t=null},_hideClone:function(){if(!q){if(H("hideClone",this),It.eventCanceled)return;m(U,"display","none"),this.options.removeCloneOnHide&&U.parentNode&&U.parentNode.removeChild(U),q=!0}},_showClone:function(t){if("clone"===t.lastPutMode){if(q){if(H("showClone",this),It.eventCanceled)return;L.parentNode!=W||this.options.group.revertClone?z?W.insertBefore(U,z):W.appendChild(U):W.insertBefore(U,L),this.options.group.revertClone&&this.animate(L,U),m(U,"display",""),q=!1}}else this._hideClone()}},Et&&c(document,"touchmove",function(t){(It.active||ht)&&t.cancelable&&t.preventDefault()}),It.utils={on:c,off:u,css:m,find:w,is:function(t,e){return!!f(t,e,t,!1)},extend:function(t,e){if(t&&e)for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t},throttle:N,closest:f,toggleClass:v,clone:A,index:C,nextTick:Yt,cancelNextTick:Bt,detectDirection:Ct,getChild:_},It.get=function(t){return t[k]},It.mount=function(){var e=[].slice.call(arguments);e[0].constructor===Array&&(e=e[0]),e.forEach(function(e){if(!e.prototype||!e.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not "+{}.toString.call(e);e.utils&&(It.utils=t({},It.utils,e.utils)),Y.mount(e)})},It.create=function(t,e){return new It(t,e)},It.version="1.12.0";var Ht,Ft,Lt,jt,Kt,Wt=[],zt=[],Gt=!1,Ut=!1,qt=!1;function Vt(t,e){zt.forEach(function(n,o){var i=e.children[n.sortableIndex+(t?Number(o):0)];i?e.insertBefore(n,i):e.appendChild(n)})}function Zt(){Wt.forEach(function(t){t!==Lt&&t.parentNode&&t.parentNode.removeChild(t)})}var Qt=function(t){var e=t.originalEvent,n=t.putSortable,o=t.dragEl,i=t.dispatchSortableEvent,r=t.unhideGhostForTarget;if(e){var a=n||t.activeSortable;(0,t.hideGhostForTarget)();var l=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:e,s=document.elementFromPoint(l.clientX,l.clientY);r(),a&&!a.el.contains(s)&&(i("spill"),this.onSpill({dragEl:o,putSortable:n}))}};function $t(){}function Jt(){}$t.prototype={startIndex:null,dragStart:function(t){this.startIndex=t.oldDraggableIndex},onSpill:function(t){var e=t.dragEl,n=t.putSortable;this.sortable.captureAnimationState(),n&&n.captureAnimationState();var o=_(this.sortable.el,this.startIndex,this.options);o?this.sortable.el.insertBefore(e,o):this.sortable.el.appendChild(e),this.sortable.animateAll(),n&&n.animateAll()},drop:Qt},Object.assign($t,{pluginName:"revertOnSpill"}),Jt.prototype={onSpill:function(t){var e=t.dragEl,n=t.putSortable||this.sortable;n.captureAnimationState(),e.parentNode&&e.parentNode.removeChild(e),n.animateAll()},drop:Qt},Object.assign(Jt,{pluginName:"removeOnSpill"});var te,ee,ne,oe,ie,re,ae=[],le=!1;function se(){ae.forEach(function(t){clearInterval(t.pid)}),ae=[]}function ce(){clearInterval(re)}var ue=N(function(t,e,n,o){if(e.scroll){var i,r=(t.touches?t.touches[0]:t).clientX,a=(t.touches?t.touches[0]:t).clientY,l=e.scrollSensitivity,s=e.scrollSpeed,c=E(),u=!1;ee!==n&&(ee=n,se(),i=e.scrollFn,!0===(te=e.scroll)&&(te=x(n,!0)));var d=0,h=te;do{var f=h,p=y(f),g=p.top,v=p.bottom,b=p.left,w=p.right,D=p.width,_=p.height,S=void 0,C=void 0,T=f.scrollWidth,M=f.scrollHeight,N=m(f),A=f.scrollLeft,I=f.scrollTop;f===c?(S=D<T&&("auto"===N.overflowX||"scroll"===N.overflowX||"visible"===N.overflowX),C=_<M&&("auto"===N.overflowY||"scroll"===N.overflowY||"visible"===N.overflowY)):(S=D<T&&("auto"===N.overflowX||"scroll"===N.overflowX),C=_<M&&("auto"===N.overflowY||"scroll"===N.overflowY));var P=S&&(Math.abs(w-r)<=l&&A+D<T)-(Math.abs(b-r)<=l&&!!A),R=C&&(Math.abs(v-a)<=l&&I+_<M)-(Math.abs(g-a)<=l&&!!I);if(!ae[d])for(var X=0;X<=d;X++)ae[X]||(ae[X]={});ae[d].vx==P&&ae[d].vy==R&&ae[d].el===f||(ae[d].el=f,ae[d].vx=P,ae[d].vy=R,clearInterval(ae[d].pid),0==P&&0==R||(u=!0,ae[d].pid=setInterval(function(){o&&0===this.layer&&It.active._onTouchMove(ie);var e=ae[this.layer].vy?ae[this.layer].vy*s:0,n=ae[this.layer].vx?ae[this.layer].vx*s:0;"function"==typeof i&&"continue"!==i.call(It.dragged.parentNode[k],n,e,t,ie,ae[this.layer].el)||O(ae[this.layer].el,n,e)}.bind({layer:d}),24))),d++}while(e.bubbleScroll&&h!==c&&(h=x(h,!1)));le=u}},30);return It.mount(new function(){function t(){for(var t in this.defaults={scroll:!0,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0},this)"_"===t.charAt(0)&&"function"==typeof this[t]&&(this[t]=this[t].bind(this))}return t.prototype={dragStarted:function(t){var e=t.originalEvent;this.sortable.nativeDraggable?c(document,"dragover",this._handleAutoScroll):c(document,this.options.supportPointer?"pointermove":e.touches?"touchmove":"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(t){var e=t.originalEvent;this.options.dragOverBubble||e.rootEl||this._handleAutoScroll(e)},drop:function(){this.sortable.nativeDraggable?u(document,"dragover",this._handleAutoScroll):(u(document,"pointermove",this._handleFallbackAutoScroll),u(document,"touchmove",this._handleFallbackAutoScroll),u(document,"mousemove",this._handleFallbackAutoScroll)),ce(),se(),clearTimeout(p),p=void 0},nulling:function(){ie=ee=te=le=re=ne=oe=null,ae.length=0},_handleFallbackAutoScroll:function(t){this._handleAutoScroll(t,!0)},_handleAutoScroll:function(t,e){var i=this,a=(t.touches?t.touches[0]:t).clientX,l=(t.touches?t.touches[0]:t).clientY,s=document.elementFromPoint(a,l);if(ie=t,e||o||n||r){ue(t,this.options,s,e);var c=x(s,!0);!le||re&&a===ne&&l===oe||(re&&ce(),re=setInterval(function(){var n=x(document.elementFromPoint(a,l),!0);n!==c&&(c=n,se()),ue(t,i.options,n,e)},10),ne=a,oe=l)}else{if(!this.options.bubbleScroll||x(s,!0)===E())return void se();ue(t,this.options,x(s,!1),!1)}}},Object.assign(t,{pluginName:"scroll",initializeByDefault:!0})}),It.mount(Jt,$t),It.mount(new function(){function t(){this.defaults={swapClass:"sortable-swap-highlight"}}return t.prototype={dragStart:function(t){Nt=t.dragEl},dragOverValid:function(t){var e=t.completed,n=t.target,o=t.changed,i=t.cancel;if(t.activeSortable.options.swap){var r=this.options;if(n&&n!==this.sortable.el){var a=Nt;!1!==(0,t.onMove)(n)?(v(n,r.swapClass,!0),Nt=n):Nt=null,a&&a!==Nt&&v(a,r.swapClass,!1)}o(),e(!0),i()}},drop:function(t){var e,n,o,i,r,a,l=t.activeSortable,s=t.putSortable,c=t.dragEl,u=s||this.sortable,d=this.options;Nt&&v(Nt,d.swapClass,!1),Nt&&(d.swap||s&&s.options.swap)&&c!==Nt&&(u.captureAnimationState(),u!==l&&l.captureAnimationState(),a=(n=Nt).parentNode,(r=(e=c).parentNode)&&a&&!r.isEqualNode(n)&&!a.isEqualNode(e)&&(o=C(e),i=C(n),r.isEqualNode(a)&&o<i&&i++,r.insertBefore(n,r.children[o]),a.insertBefore(e,a.children[i])),u.animateAll(),u!==l&&l.animateAll())},nulling:function(){Nt=null}},Object.assign(t,{pluginName:"swap",eventProperties:function(){return{swapItem:Nt}}})}),It.mount(new function(){function t(t){for(var e in this)"_"===e.charAt(0)&&"function"==typeof this[e]&&(this[e]=this[e].bind(this));t.options.supportPointer?c(document,"pointerup",this._deselectMultiDrag):(c(document,"mouseup",this._deselectMultiDrag),c(document,"touchend",this._deselectMultiDrag)),c(document,"keydown",this._checkKeyDown),c(document,"keyup",this._checkKeyUp),this.defaults={selectedClass:"sortable-selected",multiDragKey:null,setData:function(e,n){var o="";Wt.length&&Ft===t?Wt.forEach(function(t,e){o+=(e?", ":"")+t.textContent}):o=n.textContent,e.setData("Text",o)}}}return t.prototype={multiDragKeyDown:!1,isMultiDrag:!1,delayStartGlobal:function(t){Lt=t.dragEl},delayEnded:function(){this.isMultiDrag=~Wt.indexOf(Lt)},setupClone:function(t){var e=t.sortable,n=t.cancel;if(this.isMultiDrag){for(var o=0;o<Wt.length;o++)zt.push(A(Wt[o])),zt[o].sortableIndex=Wt[o].sortableIndex,zt[o].draggable=!1,zt[o].style["will-change"]="",v(zt[o],this.options.selectedClass,!1),Wt[o]===Lt&&v(zt[o],this.options.chosenClass,!1);e._hideClone(),n()}},clone:function(t){var e=t.dispatchSortableEvent,n=t.cancel;this.isMultiDrag&&(this.options.removeCloneOnHide||Wt.length&&Ft===t.sortable&&(Vt(!0,t.rootEl),e("clone"),n()))},showClone:function(t){var e=t.cloneNowShown,n=t.cancel;this.isMultiDrag&&(Vt(!1,t.rootEl),zt.forEach(function(t){m(t,"display","")}),e(),Kt=!1,n())},hideClone:function(t){var e=this,n=t.cloneNowHidden,o=t.cancel;this.isMultiDrag&&(zt.forEach(function(t){m(t,"display","none"),e.options.removeCloneOnHide&&t.parentNode&&t.parentNode.removeChild(t)}),n(),Kt=!0,o())},dragStartGlobal:function(t){!this.isMultiDrag&&Ft&&Ft.multiDrag._deselectMultiDrag(),Wt.forEach(function(t){t.sortableIndex=C(t)}),Wt=Wt.sort(function(t,e){return t.sortableIndex-e.sortableIndex}),qt=!0},dragStarted:function(t){var e=this,n=t.sortable;if(this.isMultiDrag){if(this.options.sort&&(n.captureAnimationState(),this.options.animation)){Wt.forEach(function(t){t!==Lt&&m(t,"position","absolute")});var o=y(Lt,!1,!0,!0);Wt.forEach(function(t){t!==Lt&&I(t,o)}),Ut=!0,Gt=!0}n.animateAll(function(){Ut=!1,Gt=!1,e.options.animation&&Wt.forEach(function(t){P(t)}),e.options.sort&&Zt()})}},dragOver:function(t){var e=t.completed,n=t.cancel;Ut&&~Wt.indexOf(t.target)&&(e(!1),n())},revert:function(t){var e=t.fromSortable,n=t.rootEl,o=t.sortable,i=t.dragRect;Wt.length>1&&(Wt.forEach(function(t){o.addAnimationState({target:t,rect:Ut?y(t):i}),P(t),t.fromRect=i,e.removeAnimationState(t)}),Ut=!1,function(t,e){Wt.forEach(function(n,o){var i=e.children[n.sortableIndex+(t?Number(o):0)];i?e.insertBefore(n,i):e.appendChild(n)})}(!this.options.removeCloneOnHide,n))},dragOverCompleted:function(t){var e=t.sortable,n=t.isOwner,o=t.activeSortable,i=t.parentEl,r=t.putSortable,a=this.options;if(t.insertion){if(n&&o._hideClone(),Gt=!1,a.animation&&Wt.length>1&&(Ut||!n&&!o.options.sort&&!r)){var l=y(Lt,!1,!0,!0);Wt.forEach(function(t){t!==Lt&&(I(t,l),i.appendChild(t))}),Ut=!0}if(!n)if(Ut||Zt(),Wt.length>1){var s=Kt;o._showClone(e),o.options.animation&&!Kt&&s&&zt.forEach(function(t){o.addAnimationState({target:t,rect:jt}),t.fromRect=jt,t.thisAnimationDuration=null})}else o._showClone(e)}},dragOverAnimationCapture:function(t){var e=t.dragRect,n=t.isOwner,o=t.activeSortable;if(Wt.forEach(function(t){t.thisAnimationDuration=null}),o.options.animation&&!n&&o.multiDrag.isMultiDrag){jt=Object.assign({},e);var i=b(Lt,!0);jt.top-=i.f,jt.left-=i.e}},dragOverAnimationComplete:function(){Ut&&(Ut=!1,Zt())},drop:function(t){var e=t.originalEvent,n=t.rootEl,o=t.parentEl,i=t.sortable,r=t.dispatchSortableEvent,a=t.oldIndex,l=t.putSortable,s=l||this.sortable;if(e){var c=this.options,u=o.children;if(!qt)if(c.multiDragKey&&!this.multiDragKeyDown&&this._deselectMultiDrag(),v(Lt,c.selectedClass,!~Wt.indexOf(Lt)),~Wt.indexOf(Lt))Wt.splice(Wt.indexOf(Lt),1),Ht=null,B({sortable:i,rootEl:n,name:"deselect",targetEl:Lt,originalEvt:e});else{if(Wt.push(Lt),B({sortable:i,rootEl:n,name:"select",targetEl:Lt,originalEvt:e}),e.shiftKey&&Ht&&i.el.contains(Ht)){var d,h,f=C(Ht),p=C(Lt);if(~f&&~p&&f!==p)for(p>f?(h=f,d=p):(h=p,d=f+1);h<d;h++)~Wt.indexOf(u[h])||(v(u[h],c.selectedClass,!0),Wt.push(u[h]),B({sortable:i,rootEl:n,name:"select",targetEl:u[h],originalEvt:e}))}else Ht=Lt;Ft=s}if(qt&&this.isMultiDrag){if((o[k].options.sort||o!==n)&&Wt.length>1){var g=y(Lt),m=C(Lt,":not(."+this.options.selectedClass+")");if(!Gt&&c.animation&&(Lt.thisAnimationDuration=null),s.captureAnimationState(),!Gt&&(c.animation&&(Lt.fromRect=g,Wt.forEach(function(t){if(t.thisAnimationDuration=null,t!==Lt){var e=Ut?y(t):g;t.fromRect=e,s.addAnimationState({target:t,rect:e})}})),Zt(),Wt.forEach(function(t){u[m]?o.insertBefore(t,u[m]):o.appendChild(t),m++}),a===C(Lt))){var b=!1;Wt.forEach(function(t){t.sortableIndex===C(t)||(b=!0)}),b&&r("update")}Wt.forEach(function(t){P(t)}),s.animateAll()}Ft=s}(n===o||l&&"clone"!==l.lastPutMode)&&zt.forEach(function(t){t.parentNode&&t.parentNode.removeChild(t)})}},nullingGlobal:function(){this.isMultiDrag=qt=!1,zt.length=0},destroyGlobal:function(){this._deselectMultiDrag(),u(document,"pointerup",this._deselectMultiDrag),u(document,"mouseup",this._deselectMultiDrag),u(document,"touchend",this._deselectMultiDrag),u(document,"keydown",this._checkKeyDown),u(document,"keyup",this._checkKeyUp)},_deselectMultiDrag:function(t){if(!(void 0!==qt&&qt||Ft!==this.sortable||t&&f(t.target,this.options.draggable,this.sortable.el,!1)||t&&0!==t.button))for(;Wt.length;){var e=Wt[0];v(e,this.options.selectedClass,!1),Wt.shift(),B({sortable:this.sortable,rootEl:this.sortable.el,name:"deselect",targetEl:e,originalEvt:t})}},_checkKeyDown:function(t){t.key===this.options.multiDragKey&&(this.multiDragKeyDown=!0)},_checkKeyUp:function(t){t.key===this.options.multiDragKey&&(this.multiDragKeyDown=!1)}},Object.assign(t,{pluginName:"multiDrag",utils:{select:function(t){var e=t.parentNode[k];e&&e.options.multiDrag&&!~Wt.indexOf(t)&&(Ft&&Ft!==e&&(Ft.multiDrag._deselectMultiDrag(),Ft=e),v(t,e.options.selectedClass,!0),Wt.push(t))},deselect:function(t){var e=t.parentNode[k],n=Wt.indexOf(t);e&&e.options.multiDrag&&~n&&(v(t,e.options.selectedClass,!1),Wt.splice(n,1))}},eventProperties:function(){var t=this,e=[],n=[];return Wt.forEach(function(o){var i;e.push({multiDragElement:o,index:o.sortableIndex}),i=Ut&&o!==Lt?-1:Ut?C(o,":not(."+t.options.selectedClass+")"):C(o),n.push({multiDragElement:o,index:i})}),{items:[].concat(Wt),clones:[].concat(zt),oldIndicies:e,newIndicies:n}},optionListeners:{multiDragKey:function(t){return"ctrl"===(t=t.toLowerCase())?t="Control":t.length>1&&(t=t.charAt(0).toUpperCase()+t.substr(1)),t}}})}),It});
//# sourceMappingURL=sortable.umd.js.map

/*!
 * Bootstrap-select v1.13.18 (https://developer.snapappointments.com/bootstrap-select)
 *
 * Copyright 2012-2020 SnapAppointments, LLC
 * Licensed under MIT (https://github.com/snapappointments/bootstrap-select/blob/master/LICENSE)
 */

(function (root, factory) {
  if (root === undefined && window !== undefined) root = window;
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(root["jQuery"]);
  }
}(this, function (jQuery) {

(function ($) {
  'use strict';

  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];

  var uriAttrs = [
    'background',
    'cite',
    'href',
    'itemtype',
    'longdesc',
    'poster',
    'src',
    'xlink:href'
  ];

  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;

  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', 'tabindex', 'style', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  }

  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */
  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;

  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */
  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

  function allowedAttribute (attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase()

    if ($.inArray(attrName, allowedAttributeList) !== -1) {
      if ($.inArray(attrName, uriAttrs) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN))
      }

      return true
    }

    var regExp = $(allowedAttributeList).filter(function (index, value) {
      return value instanceof RegExp
    })

    // Check if a regular expression validates the attribute.
    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true
      }
    }

    return false
  }

  function sanitizeHtml (unsafeElements, whiteList, sanitizeFn) {
    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeElements);
    }

    var whitelistKeys = Object.keys(whiteList);

    for (var i = 0, len = unsafeElements.length; i < len; i++) {
      var elements = unsafeElements[i].querySelectorAll('*');

      for (var j = 0, len2 = elements.length; j < len2; j++) {
        var el = elements[j];
        var elName = el.nodeName.toLowerCase();

        if (whitelistKeys.indexOf(elName) === -1) {
          el.parentNode.removeChild(el);

          continue;
        }

        var attributeList = [].slice.call(el.attributes);
        var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);

        for (var k = 0, len3 = attributeList.length; k < len3; k++) {
          var attr = attributeList[k];

          if (!allowedAttribute(attr, whitelistedAttributes)) {
            el.removeAttribute(attr.nodeName);
          }
        }
      }
    }
  }

  // Polyfill for browsers with no classList support
  // Remove in v2
  if (!('classList' in document.createElement('_'))) {
    (function (view) {
      if (!('Element' in view)) return;

      var classListProp = 'classList',
          protoProp = 'prototype',
          elemCtrProto = view.Element[protoProp],
          objCtr = Object,
          classListGetter = function () {
            var $elem = $(this);

            return {
              add: function (classes) {
                classes = Array.prototype.slice.call(arguments).join(' ');
                return $elem.addClass(classes);
              },
              remove: function (classes) {
                classes = Array.prototype.slice.call(arguments).join(' ');
                return $elem.removeClass(classes);
              },
              toggle: function (classes, force) {
                return $elem.toggleClass(classes, force);
              },
              contains: function (classes) {
                return $elem.hasClass(classes);
              }
            }
          };

      if (objCtr.defineProperty) {
        var classListPropDesc = {
          get: classListGetter,
          enumerable: true,
          configurable: true
        };
        try {
          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        } catch (ex) { // IE 8 doesn't support enumerable:true
          // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
          // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
          if (ex.number === undefined || ex.number === -0x7FF5EC54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
          }
        }
      } else if (objCtr[protoProp].__defineGetter__) {
        elemCtrProto.__defineGetter__(classListProp, classListGetter);
      }
    }(window));
  }

  var testElement = document.createElement('_');

  testElement.classList.add('c1', 'c2');

  if (!testElement.classList.contains('c2')) {
    var _add = DOMTokenList.prototype.add,
        _remove = DOMTokenList.prototype.remove;

    DOMTokenList.prototype.add = function () {
      Array.prototype.forEach.call(arguments, _add.bind(this));
    }

    DOMTokenList.prototype.remove = function () {
      Array.prototype.forEach.call(arguments, _remove.bind(this));
    }
  }

  testElement.classList.toggle('c3', false);

  // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
  // support the second argument.
  if (testElement.classList.contains('c3')) {
    var _toggle = DOMTokenList.prototype.toggle;

    DOMTokenList.prototype.toggle = function (token, force) {
      if (1 in arguments && !this.contains(token) === !force) {
        return force;
      } else {
        return _toggle.call(this, token);
      }
    };
  }

  testElement = null;

  // shallow array comparison
  function isEqual (array1, array2) {
    return array1.length === array2.length && array1.every(function (element, index) {
      return element === array2[index];
    });
  };

  // <editor-fold desc="Shims">
  if (!String.prototype.startsWith) {
    (function () {
      'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
      var defineProperty = (function () {
        // IE 8 only supports `Object.defineProperty` on DOM elements
        try {
          var object = {};
          var $defineProperty = Object.defineProperty;
          var result = $defineProperty(object, object, object) && $defineProperty;
        } catch (error) {
        }
        return result;
      }());
      var toString = {}.toString;
      var startsWith = function (search) {
        if (this == null) {
          throw new TypeError();
        }
        var string = String(this);
        if (search && toString.call(search) == '[object RegExp]') {
          throw new TypeError();
        }
        var stringLength = string.length;
        var searchString = String(search);
        var searchLength = searchString.length;
        var position = arguments.length > 1 ? arguments[1] : undefined;
        // `ToInteger`
        var pos = position ? Number(position) : 0;
        if (pos != pos) { // better `isNaN`
          pos = 0;
        }
        var start = Math.min(Math.max(pos, 0), stringLength);
        // Avoid the `indexOf` call if no match is possible
        if (searchLength + start > stringLength) {
          return false;
        }
        var index = -1;
        while (++index < searchLength) {
          if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
            return false;
          }
        }
        return true;
      };
      if (defineProperty) {
        defineProperty(String.prototype, 'startsWith', {
          'value': startsWith,
          'configurable': true,
          'writable': true
        });
      } else {
        String.prototype.startsWith = startsWith;
      }
    }());
  }

  if (!Object.keys) {
    Object.keys = function (
      o, // object
      k, // key
      r  // result array
    ) {
      // initialize object and result
      r = [];
      // iterate over object keys
      for (k in o) {
        // fill result array with non-prototypical keys
        r.hasOwnProperty.call(o, k) && r.push(k);
      }
      // return result
      return r;
    };
  }

  if (HTMLSelectElement && !HTMLSelectElement.prototype.hasOwnProperty('selectedOptions')) {
    Object.defineProperty(HTMLSelectElement.prototype, 'selectedOptions', {
      get: function () {
        return this.querySelectorAll(':checked');
      }
    });
  }

  function getSelectedOptions (select, ignoreDisabled) {
    var selectedOptions = select.selectedOptions,
        options = [],
        opt;

    if (ignoreDisabled) {
      for (var i = 0, len = selectedOptions.length; i < len; i++) {
        opt = selectedOptions[i];

        if (!(opt.disabled || opt.parentNode.tagName === 'OPTGROUP' && opt.parentNode.disabled)) {
          options.push(opt);
        }
      }

      return options;
    }

    return selectedOptions;
  }

  // much faster than $.val()
  function getSelectValues (select, selectedOptions) {
    var value = [],
        options = selectedOptions || select.selectedOptions,
        opt;

    for (var i = 0, len = options.length; i < len; i++) {
      opt = options[i];

      if (!(opt.disabled || opt.parentNode.tagName === 'OPTGROUP' && opt.parentNode.disabled)) {
        value.push(opt.value);
      }
    }

    if (!select.multiple) {
      return !value.length ? null : value[0];
    }

    return value;
  }

  // set data-selected on select element if the value has been programmatically selected
  // prior to initialization of bootstrap-select
  // * consider removing or replacing an alternative method *
  var valHooks = {
    useDefault: false,
    _set: $.valHooks.select.set
  };

  $.valHooks.select.set = function (elem, value) {
    if (value && !valHooks.useDefault) $(elem).data('selected', true);

    return valHooks._set.apply(this, arguments);
  };

  var changedArguments = null;

  var EventIsSupported = (function () {
    try {
      new Event('change');
      return true;
    } catch (e) {
      return false;
    }
  })();

  $.fn.triggerNative = function (eventName) {
    var el = this[0],
        event;

    if (el.dispatchEvent) { // for modern browsers & IE9+
      if (EventIsSupported) {
        // For modern browsers
        event = new Event(eventName, {
          bubbles: true
        });
      } else {
        // For IE since it doesn't support Event constructor
        event = document.createEvent('Event');
        event.initEvent(eventName, true, false);
      }

      el.dispatchEvent(event);
    } else if (el.fireEvent) { // for IE8
      event = document.createEventObject();
      event.eventType = eventName;
      el.fireEvent('on' + eventName, event);
    } else {
      // fall back to jQuery.trigger
      this.trigger(eventName);
    }
  };
  // </editor-fold>

  function stringSearch (li, searchString, method, normalize) {
    var stringTypes = [
          'display',
          'subtext',
          'tokens'
        ],
        searchSuccess = false;

    for (var i = 0; i < stringTypes.length; i++) {
      var stringType = stringTypes[i],
          string = li[stringType];

      if (string) {
        string = string.toString();

        // Strip HTML tags. This isn't perfect, but it's much faster than any other method
        if (stringType === 'display') {
          string = string.replace(/<[^>]+>/g, '');
        }

        if (normalize) string = normalizeToBase(string);
        string = string.toUpperCase();

        if (method === 'contains') {
          searchSuccess = string.indexOf(searchString) >= 0;
        } else {
          searchSuccess = string.startsWith(searchString);
        }

        if (searchSuccess) break;
      }
    }

    return searchSuccess;
  }

  function toInteger (value) {
    return parseInt(value, 10) || 0;
  }

  // Borrowed from Lodash (_.deburr)
  /** Used to map Latin Unicode letters to basic Latin letters. */
  var deburredLetters = {
    // Latin-1 Supplement block.
    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C',  '\xe7': 'c',
    '\xd0': 'D',  '\xf0': 'd',
    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N',  '\xf1': 'n',
    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss',
    // Latin Extended-A block.
    '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
    '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
    '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
    '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
    '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
    '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
    '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
    '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
    '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
    '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
    '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
    '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
    '\u0134': 'J',  '\u0135': 'j',
    '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
    '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
    '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
    '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
    '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
    '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
    '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
    '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
    '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
    '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
    '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
    '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
    '\u0163': 't',  '\u0165': 't', '\u0167': 't',
    '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
    '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
    '\u0174': 'W',  '\u0175': 'w',
    '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
    '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
    '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
    '\u0132': 'IJ', '\u0133': 'ij',
    '\u0152': 'Oe', '\u0153': 'oe',
    '\u0149': "'n", '\u017f': 's'
  };

  /** Used to match Latin Unicode letters (excluding mathematical operators). */
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

  /** Used to compose unicode character classes. */
  var rsComboMarksRange = '\\u0300-\\u036f',
      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange = '\\u20d0-\\u20ff',
      rsComboMarksExtendedRange = '\\u1ab0-\\u1aff',
      rsComboMarksSupplementRange = '\\u1dc0-\\u1dff',
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange;

  /** Used to compose unicode capture groups. */
  var rsCombo = '[' + rsComboRange + ']';

  /**
   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
   */
  var reComboMark = RegExp(rsCombo, 'g');

  function deburrLetter (key) {
    return deburredLetters[key];
  };

  function normalizeToBase (string) {
    string = string.toString();
    return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
  }

  // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function (map) {
    var escaper = function (match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + Object.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function (string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };

  var htmlEscape = createEscaper(escapeMap);

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var keyCodeMap = {
    32: ' ',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    59: ';',
    65: 'A',
    66: 'B',
    67: 'C',
    68: 'D',
    69: 'E',
    70: 'F',
    71: 'G',
    72: 'H',
    73: 'I',
    74: 'J',
    75: 'K',
    76: 'L',
    77: 'M',
    78: 'N',
    79: 'O',
    80: 'P',
    81: 'Q',
    82: 'R',
    83: 'S',
    84: 'T',
    85: 'U',
    86: 'V',
    87: 'W',
    88: 'X',
    89: 'Y',
    90: 'Z',
    96: '0',
    97: '1',
    98: '2',
    99: '3',
    100: '4',
    101: '5',
    102: '6',
    103: '7',
    104: '8',
    105: '9'
  };

  var keyCodes = {
    ESCAPE: 27, // KeyboardEvent.which value for Escape (Esc) key
    ENTER: 13, // KeyboardEvent.which value for Enter key
    SPACE: 32, // KeyboardEvent.which value for space key
    TAB: 9, // KeyboardEvent.which value for tab key
    ARROW_UP: 38, // KeyboardEvent.which value for up arrow key
    ARROW_DOWN: 40 // KeyboardEvent.which value for down arrow key
  }

  var version = {
    success: false,
    major: '3'
  };

  try {
    version.full = ($.fn.dropdown.Constructor.VERSION || '').split(' ')[0].split('.');
    version.major = version.full[0];
    version.success = true;
  } catch (err) {
    // do nothing
  }

  var selectId = 0;

  var EVENT_KEY = '.bs.select';

  var classNames = {
    DISABLED: 'disabled',
    DIVIDER: 'divider',
    SHOW: 'open',
    DROPUP: 'dropup',
    MENU: 'dropdown-menu',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    // to-do: replace with more advanced template/customization options
    BUTTONCLASS: 'btn-default',
    POPOVERHEADER: 'popover-title',
    ICONBASE: 'glyphicon',
    TICKICON: 'glyphicon-ok'
  }

  var Selector = {
    MENU: '.' + classNames.MENU
  }

  var elementTemplates = {
    div: document.createElement('div'),
    span: document.createElement('span'),
    i: document.createElement('i'),
    subtext: document.createElement('small'),
    a: document.createElement('a'),
    li: document.createElement('li'),
    whitespace: document.createTextNode('\u00A0'),
    fragment: document.createDocumentFragment()
  }

  elementTemplates.noResults = elementTemplates.li.cloneNode(false);
  elementTemplates.noResults.className = 'no-results';

  elementTemplates.a.setAttribute('role', 'option');
  elementTemplates.a.className = 'dropdown-item';

  elementTemplates.subtext.className = 'text-muted';

  elementTemplates.text = elementTemplates.span.cloneNode(false);
  elementTemplates.text.className = 'text';

  elementTemplates.checkMark = elementTemplates.span.cloneNode(false);

  var REGEXP_ARROW = new RegExp(keyCodes.ARROW_UP + '|' + keyCodes.ARROW_DOWN);
  var REGEXP_TAB_OR_ESCAPE = new RegExp('^' + keyCodes.TAB + '$|' + keyCodes.ESCAPE);

  var generateOption = {
    li: function (content, classes, optgroup) {
      var li = elementTemplates.li.cloneNode(false);

      if (content) {
        if (content.nodeType === 1 || content.nodeType === 11) {
          li.appendChild(content);
        } else {
          li.innerHTML = content;
        }
      }

      if (typeof classes !== 'undefined' && classes !== '') li.className = classes;
      if (typeof optgroup !== 'undefined' && optgroup !== null) li.classList.add('optgroup-' + optgroup);

      return li;
    },

    a: function (text, classes, inline) {
      var a = elementTemplates.a.cloneNode(true);

      if (text) {
        if (text.nodeType === 11) {
          a.appendChild(text);
        } else {
          a.insertAdjacentHTML('beforeend', text);
        }
      }

      if (typeof classes !== 'undefined' && classes !== '') a.classList.add.apply(a.classList, classes.split(/\s+/));
      if (inline) a.setAttribute('style', inline);

      return a;
    },

    text: function (options, useFragment) {
      var textElement = elementTemplates.text.cloneNode(false),
          subtextElement,
          iconElement;

      if (options.content) {
        textElement.innerHTML = options.content;
      } else {
        textElement.textContent = options.text;

        if (options.icon) {
          var whitespace = elementTemplates.whitespace.cloneNode(false);

          // need to use <i> for icons in the button to prevent a breaking change
          // note: switch to span in next major release
          iconElement = (useFragment === true ? elementTemplates.i : elementTemplates.span).cloneNode(false);
          iconElement.className = this.options.iconBase + ' ' + options.icon;

          elementTemplates.fragment.appendChild(iconElement);
          elementTemplates.fragment.appendChild(whitespace);
        }

        if (options.subtext) {
          subtextElement = elementTemplates.subtext.cloneNode(false);
          subtextElement.textContent = options.subtext;
          textElement.appendChild(subtextElement);
        }
      }

      if (useFragment === true) {
        while (textElement.childNodes.length > 0) {
          elementTemplates.fragment.appendChild(textElement.childNodes[0]);
        }
      } else {
        elementTemplates.fragment.appendChild(textElement);
      }

      return elementTemplates.fragment;
    },

    label: function (options) {
      var textElement = elementTemplates.text.cloneNode(false),
          subtextElement,
          iconElement;

      textElement.innerHTML = options.display;

      if (options.icon) {
        var whitespace = elementTemplates.whitespace.cloneNode(false);

        iconElement = elementTemplates.span.cloneNode(false);
        iconElement.className = this.options.iconBase + ' ' + options.icon;

        elementTemplates.fragment.appendChild(iconElement);
        elementTemplates.fragment.appendChild(whitespace);
      }

      if (options.subtext) {
        subtextElement = elementTemplates.subtext.cloneNode(false);
        subtextElement.textContent = options.subtext;
        textElement.appendChild(subtextElement);
      }

      elementTemplates.fragment.appendChild(textElement);

      return elementTemplates.fragment;
    }
  }

  function showNoResults (searchMatch, searchValue) {
    if (!searchMatch.length) {
      elementTemplates.noResults.innerHTML = this.options.noneResultsText.replace('{0}', '"' + htmlEscape(searchValue) + '"');
      this.$menuInner[0].firstChild.appendChild(elementTemplates.noResults);
    }
  }

  var Selectpicker = function (element, options) {
    var that = this;

    // bootstrap-select has been initialized - revert valHooks.select.set back to its original function
    if (!valHooks.useDefault) {
      $.valHooks.select.set = valHooks._set;
      valHooks.useDefault = true;
    }

    this.$element = $(element);
    this.$newElement = null;
    this.$button = null;
    this.$menu = null;
    this.options = options;
    this.selectpicker = {
      main: {},
      search: {},
      current: {}, // current changes if a search is in progress
      view: {},
      isSearching: false,
      keydown: {
        keyHistory: '',
        resetKeyHistory: {
          start: function () {
            return setTimeout(function () {
              that.selectpicker.keydown.keyHistory = '';
            }, 800);
          }
        }
      }
    };

    this.sizeInfo = {};

    // If we have no title yet, try to pull it from the html title attribute (jQuery doesnt' pick it up as it's not a
    // data-attribute)
    if (this.options.title === null) {
      this.options.title = this.$element.attr('title');
    }

    // Format window padding
    var winPad = this.options.windowPadding;
    if (typeof winPad === 'number') {
      this.options.windowPadding = [winPad, winPad, winPad, winPad];
    }

    // Expose public methods
    this.val = Selectpicker.prototype.val;
    this.render = Selectpicker.prototype.render;
    this.refresh = Selectpicker.prototype.refresh;
    this.setStyle = Selectpicker.prototype.setStyle;
    this.selectAll = Selectpicker.prototype.selectAll;
    this.deselectAll = Selectpicker.prototype.deselectAll;
    this.destroy = Selectpicker.prototype.destroy;
    this.remove = Selectpicker.prototype.remove;
    this.show = Selectpicker.prototype.show;
    this.hide = Selectpicker.prototype.hide;

    this.init();
  };

  Selectpicker.VERSION = '1.13.18';

  // part of this is duplicated in i18n/defaults-en_US.js. Make sure to update both.
  Selectpicker.DEFAULTS = {
    noneSelectedText: 'Nothing selected',
    noneResultsText: 'No results matched {0}',
    countSelectedText: function (numSelected, numTotal) {
      return (numSelected == 1) ? '{0} item selected' : '{0} items selected';
    },
    maxOptionsText: function (numAll, numGroup) {
      return [
        (numAll == 1) ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)',
        (numGroup == 1) ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)'
      ];
    },
    selectAllText: 'Select All',
    deselectAllText: 'Deselect All',
    doneButton: false,
    doneButtonText: 'Close',
    multipleSeparator: ', ',
    styleBase: 'btn',
    style: classNames.BUTTONCLASS,
    size: 'auto',
    title: null,
    selectedTextFormat: 'values',
    width: false,
    container: false,
    hideDisabled: false,
    showSubtext: false,
    showIcon: true,
    showContent: true,
    dropupAuto: true,
    header: false,
    liveSearch: false,
    liveSearchPlaceholder: null,
    liveSearchNormalize: false,
    liveSearchStyle: 'contains',
    actionsBox: false,
    iconBase: classNames.ICONBASE,
    tickIcon: classNames.TICKICON,
    showTick: false,
    template: {
      caret: '<span class="caret"></span>'
    },
    maxOptions: false,
    mobile: false,
    selectOnTab: false,
    dropdownAlignRight: false,
    windowPadding: 0,
    virtualScroll: 600,
    display: false,
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist
  };

  Selectpicker.prototype = {

    constructor: Selectpicker,

    init: function () {
      var that = this,
          id = this.$element.attr('id'),
          element = this.$element[0],
          form = element.form;

      selectId++;
      this.selectId = 'bs-select-' + selectId;

      element.classList.add('bs-select-hidden');

      this.multiple = this.$element.prop('multiple');
      this.autofocus = this.$element.prop('autofocus');

      if (element.classList.contains('show-tick')) {
        this.options.showTick = true;
      }

      this.$newElement = this.createDropdown();
      this.buildData();
      this.$element
        .after(this.$newElement)
        .prependTo(this.$newElement);

      // ensure select is associated with form element if it got unlinked after moving it inside newElement
      if (form && element.form === null) {
        if (!form.id) form.id = 'form-' + this.selectId;
        element.setAttribute('form', form.id);
      }

      this.$button = this.$newElement.children('button');
      this.$menu = this.$newElement.children(Selector.MENU);
      this.$menuInner = this.$menu.children('.inner');
      this.$searchbox = this.$menu.find('input');

      element.classList.remove('bs-select-hidden');

      if (this.options.dropdownAlignRight === true) this.$menu[0].classList.add(classNames.MENURIGHT);

      if (typeof id !== 'undefined') {
        this.$button.attr('data-id', id);
      }

      this.checkDisabled();
      this.clickListener();

      if (this.options.liveSearch) {
        this.liveSearchListener();
        this.focusedParent = this.$searchbox[0];
      } else {
        this.focusedParent = this.$menuInner[0];
      }

      this.setStyle();
      this.render();
      this.setWidth();
      if (this.options.container) {
        this.selectPosition();
      } else {
        this.$element.on('hide' + EVENT_KEY, function () {
          if (that.isVirtual()) {
            // empty menu on close
            var menuInner = that.$menuInner[0],
                emptyMenu = menuInner.firstChild.cloneNode(false);

            // replace the existing UL with an empty one - this is faster than $.empty() or innerHTML = ''
            menuInner.replaceChild(emptyMenu, menuInner.firstChild);
            menuInner.scrollTop = 0;
          }
        });
      }
      this.$menu.data('this', this);
      this.$newElement.data('this', this);
      if (this.options.mobile) this.mobile();

      this.$newElement.on({
        'hide.bs.dropdown': function (e) {
          that.$element.trigger('hide' + EVENT_KEY, e);
        },
        'hidden.bs.dropdown': function (e) {
          that.$element.trigger('hidden' + EVENT_KEY, e);
        },
        'show.bs.dropdown': function (e) {
          that.$element.trigger('show' + EVENT_KEY, e);
        },
        'shown.bs.dropdown': function (e) {
          that.$element.trigger('shown' + EVENT_KEY, e);
        }
      });

      if (element.hasAttribute('required')) {
        this.$element.on('invalid' + EVENT_KEY, function () {
          that.$button[0].classList.add('bs-invalid');

          that.$element
            .on('shown' + EVENT_KEY + '.invalid', function () {
              that.$element
                .val(that.$element.val()) // set the value to hide the validation message in Chrome when menu is opened
                .off('shown' + EVENT_KEY + '.invalid');
            })
            .on('rendered' + EVENT_KEY, function () {
              // if select is no longer invalid, remove the bs-invalid class
              if (this.validity.valid) that.$button[0].classList.remove('bs-invalid');
              that.$element.off('rendered' + EVENT_KEY);
            });

          that.$button.on('blur' + EVENT_KEY, function () {
            that.$element.trigger('focus').trigger('blur');
            that.$button.off('blur' + EVENT_KEY);
          });
        });
      }

      setTimeout(function () {
        that.buildList();
        that.$element.trigger('loaded' + EVENT_KEY);
      });
    },

    createDropdown: function () {
      // Options
      // If we are multiple or showTick option is set, then add the show-tick class
      var showTick = (this.multiple || this.options.showTick) ? ' show-tick' : '',
          multiselectable = this.multiple ? ' aria-multiselectable="true"' : '',
          inputGroup = '',
          autofocus = this.autofocus ? ' autofocus' : '';

      if (version.major < 4 && this.$element.parent().hasClass('input-group')) {
        inputGroup = ' input-group-btn';
      }

      // Elements
      var drop,
          header = '',
          searchbox = '',
          actionsbox = '',
          donebutton = '';

      if (this.options.header) {
        header =
          '<div class="' + classNames.POPOVERHEADER + '">' +
            '<button type="button" class="close" aria-hidden="true">&times;</button>' +
              this.options.header +
          '</div>';
      }

      if (this.options.liveSearch) {
        searchbox =
          '<div class="bs-searchbox">' +
            '<input type="search" class="form-control" autocomplete="off"' +
              (
                this.options.liveSearchPlaceholder === null ? ''
                :
                ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"'
              ) +
              ' role="combobox" aria-label="Search" aria-controls="' + this.selectId + '" aria-autocomplete="list">' +
          '</div>';
      }

      if (this.multiple && this.options.actionsBox) {
        actionsbox =
          '<div class="bs-actionsbox">' +
            '<div class="btn-group btn-group-sm btn-block">' +
              '<button type="button" class="actions-btn bs-select-all btn ' + classNames.BUTTONCLASS + '">' +
                this.options.selectAllText +
              '</button>' +
              '<button type="button" class="actions-btn bs-deselect-all btn ' + classNames.BUTTONCLASS + '">' +
                this.options.deselectAllText +
              '</button>' +
            '</div>' +
          '</div>';
      }

      if (this.multiple && this.options.doneButton) {
        donebutton =
          '<div class="bs-donebutton">' +
            '<div class="btn-group btn-block">' +
              '<button type="button" class="btn btn-sm ' + classNames.BUTTONCLASS + '">' +
                this.options.doneButtonText +
              '</button>' +
            '</div>' +
          '</div>';
      }

      drop =
        '<div class="dropdown bootstrap-select' + showTick + inputGroup + '">' +
          '<button type="button" tabindex="-1" class="' + this.options.styleBase + ' dropdown-toggle" ' + (this.options.display === 'static' ? 'data-display="static"' : '') + 'data-toggle="dropdown"' + autofocus + ' role="combobox" aria-owns="' + this.selectId + '" aria-haspopup="listbox" aria-expanded="false">' +
            '<div class="filter-option">' +
              '<div class="filter-option-inner">' +
                '<div class="filter-option-inner-inner"></div>' +
              '</div> ' +
            '</div>' +
            (
              version.major === '4' ? ''
              :
              '<span class="bs-caret">' +
                this.options.template.caret +
              '</span>'
            ) +
          '</button>' +
          '<div class="' + classNames.MENU + ' ' + (version.major === '4' ? '' : classNames.SHOW) + '">' +
            header +
            searchbox +
            actionsbox +
            '<div class="inner ' + classNames.SHOW + '" role="listbox" id="' + this.selectId + '" tabindex="-1" ' + multiselectable + '>' +
                '<ul class="' + classNames.MENU + ' inner ' + (version.major === '4' ? classNames.SHOW : '') + '" role="presentation">' +
                '</ul>' +
            '</div>' +
            donebutton +
          '</div>' +
        '</div>';

      return $(drop);
    },

    setPositionData: function () {
      this.selectpicker.view.canHighlight = [];
      this.selectpicker.view.size = 0;
      this.selectpicker.view.firstHighlightIndex = false;

      for (var i = 0; i < this.selectpicker.current.data.length; i++) {
        var li = this.selectpicker.current.data[i],
            canHighlight = true;

        if (li.type === 'divider') {
          canHighlight = false;
          li.height = this.sizeInfo.dividerHeight;
        } else if (li.type === 'optgroup-label') {
          canHighlight = false;
          li.height = this.sizeInfo.dropdownHeaderHeight;
        } else {
          li.height = this.sizeInfo.liHeight;
        }

        if (li.disabled) canHighlight = false;

        this.selectpicker.view.canHighlight.push(canHighlight);

        if (canHighlight) {
          this.selectpicker.view.size++;
          li.posinset = this.selectpicker.view.size;
          if (this.selectpicker.view.firstHighlightIndex === false) this.selectpicker.view.firstHighlightIndex = i;
        }

        li.position = (i === 0 ? 0 : this.selectpicker.current.data[i - 1].position) + li.height;
      }
    },

    isVirtual: function () {
      return (this.options.virtualScroll !== false) && (this.selectpicker.main.elements.length >= this.options.virtualScroll) || this.options.virtualScroll === true;
    },

    createView: function (isSearching, setSize, refresh) {
      var that = this,
          scrollTop = 0,
          active = [],
          selected,
          prevActive;

      this.selectpicker.isSearching = isSearching;
      this.selectpicker.current = isSearching ? this.selectpicker.search : this.selectpicker.main;

      this.setPositionData();

      if (setSize) {
        if (refresh) {
          scrollTop = this.$menuInner[0].scrollTop;
        } else if (!that.multiple) {
          var element = that.$element[0],
              selectedIndex = (element.options[element.selectedIndex] || {}).liIndex;

          if (typeof selectedIndex === 'number' && that.options.size !== false) {
            var selectedData = that.selectpicker.main.data[selectedIndex],
                position = selectedData && selectedData.position;

            if (position) {
              scrollTop = position - ((that.sizeInfo.menuInnerHeight + that.sizeInfo.liHeight) / 2);
            }
          }
        }
      }

      scroll(scrollTop, true);

      this.$menuInner.off('scroll.createView').on('scroll.createView', function (e, updateValue) {
        if (!that.noScroll) scroll(this.scrollTop, updateValue);
        that.noScroll = false;
      });

      function scroll (scrollTop, init) {
        var size = that.selectpicker.current.elements.length,
            chunks = [],
            chunkSize,
            chunkCount,
            firstChunk,
            lastChunk,
            currentChunk,
            prevPositions,
            positionIsDifferent,
            previousElements,
            menuIsDifferent = true,
            isVirtual = that.isVirtual();

        that.selectpicker.view.scrollTop = scrollTop;

        chunkSize = Math.ceil(that.sizeInfo.menuInnerHeight / that.sizeInfo.liHeight * 1.5); // number of options in a chunk
        chunkCount = Math.round(size / chunkSize) || 1; // number of chunks

        for (var i = 0; i < chunkCount; i++) {
          var endOfChunk = (i + 1) * chunkSize;

          if (i === chunkCount - 1) {
            endOfChunk = size;
          }

          chunks[i] = [
            (i) * chunkSize + (!i ? 0 : 1),
            endOfChunk
          ];

          if (!size) break;

          if (currentChunk === undefined && scrollTop - 1 <= that.selectpicker.current.data[endOfChunk - 1].position - that.sizeInfo.menuInnerHeight) {
            currentChunk = i;
          }
        }

        if (currentChunk === undefined) currentChunk = 0;

        prevPositions = [that.selectpicker.view.position0, that.selectpicker.view.position1];

        // always display previous, current, and next chunks
        firstChunk = Math.max(0, currentChunk - 1);
        lastChunk = Math.min(chunkCount - 1, currentChunk + 1);

        that.selectpicker.view.position0 = isVirtual === false ? 0 : (Math.max(0, chunks[firstChunk][0]) || 0);
        that.selectpicker.view.position1 = isVirtual === false ? size : (Math.min(size, chunks[lastChunk][1]) || 0);

        positionIsDifferent = prevPositions[0] !== that.selectpicker.view.position0 || prevPositions[1] !== that.selectpicker.view.position1;

        if (that.activeIndex !== undefined) {
          prevActive = that.selectpicker.main.elements[that.prevActiveIndex];
          active = that.selectpicker.main.elements[that.activeIndex];
          selected = that.selectpicker.main.elements[that.selectedIndex];

          if (init) {
            if (that.activeIndex !== that.selectedIndex) {
              that.defocusItem(active);
            }
            that.activeIndex = undefined;
          }

          if (that.activeIndex && that.activeIndex !== that.selectedIndex) {
            that.defocusItem(selected);
          }
        }

        if (that.prevActiveIndex !== undefined && that.prevActiveIndex !== that.activeIndex && that.prevActiveIndex !== that.selectedIndex) {
          that.defocusItem(prevActive);
        }

        if (init || positionIsDifferent) {
          previousElements = that.selectpicker.view.visibleElements ? that.selectpicker.view.visibleElements.slice() : [];

          if (isVirtual === false) {
            that.selectpicker.view.visibleElements = that.selectpicker.current.elements;
          } else {
            that.selectpicker.view.visibleElements = that.selectpicker.current.elements.slice(that.selectpicker.view.position0, that.selectpicker.view.position1);
          }

          that.setOptionStatus();

          // if searching, check to make sure the list has actually been updated before updating DOM
          // this prevents unnecessary repaints
          if (isSearching || (isVirtual === false && init)) menuIsDifferent = !isEqual(previousElements, that.selectpicker.view.visibleElements);

          // if virtual scroll is disabled and not searching,
          // menu should never need to be updated more than once
          if ((init || isVirtual === true) && menuIsDifferent) {
            var menuInner = that.$menuInner[0],
                menuFragment = document.createDocumentFragment(),
                emptyMenu = menuInner.firstChild.cloneNode(false),
                marginTop,
                marginBottom,
                elements = that.selectpicker.view.visibleElements,
                toSanitize = [];

            // replace the existing UL with an empty one - this is faster than $.empty()
            menuInner.replaceChild(emptyMenu, menuInner.firstChild);

            for (var i = 0, visibleElementsLen = elements.length; i < visibleElementsLen; i++) {
              var element = elements[i],
                  elText,
                  elementData;

              if (that.options.sanitize) {
                elText = element.lastChild;

                if (elText) {
                  elementData = that.selectpicker.current.data[i + that.selectpicker.view.position0];

                  if (elementData && elementData.content && !elementData.sanitized) {
                    toSanitize.push(elText);
                    elementData.sanitized = true;
                  }
                }
              }

              menuFragment.appendChild(element);
            }

            if (that.options.sanitize && toSanitize.length) {
              sanitizeHtml(toSanitize, that.options.whiteList, that.options.sanitizeFn);
            }

            if (isVirtual === true) {
              marginTop = (that.selectpicker.view.position0 === 0 ? 0 : that.selectpicker.current.data[that.selectpicker.view.position0 - 1].position);
              marginBottom = (that.selectpicker.view.position1 > size - 1 ? 0 : that.selectpicker.current.data[size - 1].position - that.selectpicker.current.data[that.selectpicker.view.position1 - 1].position);

              menuInner.firstChild.style.marginTop = marginTop + 'px';
              menuInner.firstChild.style.marginBottom = marginBottom + 'px';
            } else {
              menuInner.firstChild.style.marginTop = 0;
              menuInner.firstChild.style.marginBottom = 0;
            }

            menuInner.firstChild.appendChild(menuFragment);

            // if an option is encountered that is wider than the current menu width, update the menu width accordingly
            // switch to ResizeObserver with increased browser support
            if (isVirtual === true && that.sizeInfo.hasScrollBar) {
              var menuInnerInnerWidth = menuInner.firstChild.offsetWidth;

              if (init && menuInnerInnerWidth < that.sizeInfo.menuInnerInnerWidth && that.sizeInfo.totalMenuWidth > that.sizeInfo.selectWidth) {
                menuInner.firstChild.style.minWidth = that.sizeInfo.menuInnerInnerWidth + 'px';
              } else if (menuInnerInnerWidth > that.sizeInfo.menuInnerInnerWidth) {
                // set to 0 to get actual width of menu
                that.$menu[0].style.minWidth = 0;

                var actualMenuWidth = menuInner.firstChild.offsetWidth;

                if (actualMenuWidth > that.sizeInfo.menuInnerInnerWidth) {
                  that.sizeInfo.menuInnerInnerWidth = actualMenuWidth;
                  menuInner.firstChild.style.minWidth = that.sizeInfo.menuInnerInnerWidth + 'px';
                }

                // reset to default CSS styling
                that.$menu[0].style.minWidth = '';
              }
            }
          }
        }

        that.prevActiveIndex = that.activeIndex;

        if (!that.options.liveSearch) {
          that.$menuInner.trigger('focus');
        } else if (isSearching && init) {
          var index = 0,
              newActive;

          if (!that.selectpicker.view.canHighlight[index]) {
            index = 1 + that.selectpicker.view.canHighlight.slice(1).indexOf(true);
          }

          newActive = that.selectpicker.view.visibleElements[index];

          that.defocusItem(that.selectpicker.view.currentActive);

          that.activeIndex = (that.selectpicker.current.data[index] || {}).index;

          that.focusItem(newActive);
        }
      }

      $(window)
        .off('resize' + EVENT_KEY + '.' + this.selectId + '.createView')
        .on('resize' + EVENT_KEY + '.' + this.selectId + '.createView', function () {
          var isActive = that.$newElement.hasClass(classNames.SHOW);

          if (isActive) scroll(that.$menuInner[0].scrollTop);
        });
    },

    focusItem: function (li, liData, noStyle) {
      if (li) {
        liData = liData || this.selectpicker.main.data[this.activeIndex];
        var a = li.firstChild;

        if (a) {
          a.setAttribute('aria-setsize', this.selectpicker.view.size);
          a.setAttribute('aria-posinset', liData.posinset);

          if (noStyle !== true) {
            this.focusedParent.setAttribute('aria-activedescendant', a.id);
            li.classList.add('active');
            a.classList.add('active');
          }
        }
      }
    },

    defocusItem: function (li) {
      if (li) {
        li.classList.remove('active');
        if (li.firstChild) li.firstChild.classList.remove('active');
      }
    },

    setPlaceholder: function () {
      var that = this,
          updateIndex = false;

      if (this.options.title && !this.multiple) {
        if (!this.selectpicker.view.titleOption) this.selectpicker.view.titleOption = document.createElement('option');

        // this option doesn't create a new <li> element, but does add a new option at the start,
        // so startIndex should increase to prevent having to check every option for the bs-title-option class
        updateIndex = true;

        var element = this.$element[0],
            selectTitleOption = false,
            titleNotAppended = !this.selectpicker.view.titleOption.parentNode,
            selectedIndex = element.selectedIndex,
            selectedOption = element.options[selectedIndex],
            navigation = window.performance && window.performance.getEntriesByType('navigation'),
            // Safari doesn't support getEntriesByType('navigation') - fall back to performance.navigation
            isNotBackForward = (navigation && navigation.length) ? navigation[0].type !== 'back_forward' : window.performance.navigation.type !== 2;

        if (titleNotAppended) {
          // Use native JS to prepend option (faster)
          this.selectpicker.view.titleOption.className = 'bs-title-option';
          this.selectpicker.view.titleOption.value = '';

          // Check if selected or data-selected attribute is already set on an option. If not, select the titleOption option.
          // the selected item may have been changed by user or programmatically before the bootstrap select plugin runs,
          // if so, the select will have the data-selected attribute
          selectTitleOption = !selectedOption || (selectedIndex === 0 && selectedOption.defaultSelected === false && this.$element.data('selected') === undefined);
        }

        if (titleNotAppended || this.selectpicker.view.titleOption.index !== 0) {
          element.insertBefore(this.selectpicker.view.titleOption, element.firstChild);
        }

        // Set selected *after* appending to select,
        // otherwise the option doesn't get selected in IE
        // set using selectedIndex, as setting the selected attr to true here doesn't work in IE11
        if (selectTitleOption && isNotBackForward) {
          element.selectedIndex = 0;
        } else if (document.readyState !== 'complete') {
          // if navigation type is back_forward, there's a chance the select will have its value set by BFCache
          // wait for that value to be set, then run render again
          window.addEventListener('pageshow', function () {
            if (that.selectpicker.view.displayedValue !== element.value) that.render();
          });
        }
      }

      return updateIndex;
    },

    buildData: function () {
      var optionSelector = ':not([hidden]):not([data-hidden="true"])',
          mainData = [],
          optID = 0,
          startIndex = this.setPlaceholder() ? 1 : 0; // append the titleOption if necessary and skip the first option in the loop

      if (this.options.hideDisabled) optionSelector += ':not(:disabled)';

      var selectOptions = this.$element[0].querySelectorAll('select > *' + optionSelector);

      function addDivider (config) {
        var previousData = mainData[mainData.length - 1];

        // ensure optgroup doesn't create back-to-back dividers
        if (
          previousData &&
          previousData.type === 'divider' &&
          (previousData.optID || config.optID)
        ) {
          return;
        }

        config = config || {};
        config.type = 'divider';

        mainData.push(config);
      }

      function addOption (option, config) {
        config = config || {};

        config.divider = option.getAttribute('data-divider') === 'true';

        if (config.divider) {
          addDivider({
            optID: config.optID
          });
        } else {
          var liIndex = mainData.length,
              cssText = option.style.cssText,
              inlineStyle = cssText ? htmlEscape(cssText) : '',
              optionClass = (option.className || '') + (config.optgroupClass || '');

          if (config.optID) optionClass = 'opt ' + optionClass;

          config.optionClass = optionClass.trim();
          config.inlineStyle = inlineStyle;
          config.text = option.textContent;

          config.content = option.getAttribute('data-content');
          config.tokens = option.getAttribute('data-tokens');
          config.subtext = option.getAttribute('data-subtext');
          config.icon = option.getAttribute('data-icon');

          option.liIndex = liIndex;

          config.display = config.content || config.text;
          config.type = 'option';
          config.index = liIndex;
          config.option = option;
          config.selected = !!option.selected;
          config.disabled = config.disabled || !!option.disabled;

          mainData.push(config);
        }
      }

      function addOptgroup (index, selectOptions) {
        var optgroup = selectOptions[index],
            // skip placeholder option
            previous = index - 1 < startIndex ? false : selectOptions[index - 1],
            next = selectOptions[index + 1],
            options = optgroup.querySelectorAll('option' + optionSelector);

        if (!options.length) return;

        var config = {
              display: htmlEscape(optgroup.label),
              subtext: optgroup.getAttribute('data-subtext'),
              icon: optgroup.getAttribute('data-icon'),
              type: 'optgroup-label',
              optgroupClass: ' ' + (optgroup.className || '')
            },
            headerIndex,
            lastIndex;

        optID++;

        if (previous) {
          addDivider({ optID: optID });
        }

        config.optID = optID;

        mainData.push(config);

        for (var j = 0, len = options.length; j < len; j++) {
          var option = options[j];

          if (j === 0) {
            headerIndex = mainData.length - 1;
            lastIndex = headerIndex + len;
          }

          addOption(option, {
            headerIndex: headerIndex,
            lastIndex: lastIndex,
            optID: config.optID,
            optgroupClass: config.optgroupClass,
            disabled: optgroup.disabled
          });
        }

        if (next) {
          addDivider({ optID: optID });
        }
      }

      for (var len = selectOptions.length, i = startIndex; i < len; i++) {
        var item = selectOptions[i];

        if (item.tagName !== 'OPTGROUP') {
          addOption(item, {});
        } else {
          addOptgroup(i, selectOptions);
        }
      }

      this.selectpicker.main.data = this.selectpicker.current.data = mainData;
    },

    buildList: function () {
      var that = this,
          selectData = this.selectpicker.main.data,
          mainElements = [],
          widestOptionLength = 0;

      if ((that.options.showTick || that.multiple) && !elementTemplates.checkMark.parentNode) {
        elementTemplates.checkMark.className = this.options.iconBase + ' ' + that.options.tickIcon + ' check-mark';
        elementTemplates.a.appendChild(elementTemplates.checkMark);
      }

      function buildElement (item) {
        var liElement,
            combinedLength = 0;

        switch (item.type) {
          case 'divider':
            liElement = generateOption.li(
              false,
              classNames.DIVIDER,
              (item.optID ? item.optID + 'div' : undefined)
            );

            break;

          case 'option':
            liElement = generateOption.li(
              generateOption.a(
                generateOption.text.call(that, item),
                item.optionClass,
                item.inlineStyle
              ),
              '',
              item.optID
            );

            if (liElement.firstChild) {
              liElement.firstChild.id = that.selectId + '-' + item.index;
            }

            break;

          case 'optgroup-label':
            liElement = generateOption.li(
              generateOption.label.call(that, item),
              'dropdown-header' + item.optgroupClass,
              item.optID
            );

            break;
        }

        item.element = liElement;
        mainElements.push(liElement);

        // count the number of characters in the option - not perfect, but should work in most cases
        if (item.display) combinedLength += item.display.length;
        if (item.subtext) combinedLength += item.subtext.length;
        // if there is an icon, ensure this option's width is checked
        if (item.icon) combinedLength += 1;

        if (combinedLength > widestOptionLength) {
          widestOptionLength = combinedLength;

          // guess which option is the widest
          // use this when calculating menu width
          // not perfect, but it's fast, and the width will be updating accordingly when scrolling
          that.selectpicker.view.widestOption = mainElements[mainElements.length - 1];
        }
      }

      for (var len = selectData.length, i = 0; i < len; i++) {
        var item = selectData[i];

        buildElement(item);
      }

      this.selectpicker.main.elements = this.selectpicker.current.elements = mainElements;
    },

    findLis: function () {
      return this.$menuInner.find('.inner > li');
    },

    render: function () {
      var that = this,
          element = this.$element[0],
          // ensure titleOption is appended and selected (if necessary) before getting selectedOptions
          placeholderSelected = this.setPlaceholder() && element.selectedIndex === 0,
          selectedOptions = getSelectedOptions(element, this.options.hideDisabled),
          selectedCount = selectedOptions.length,
          button = this.$button[0],
          buttonInner = button.querySelector('.filter-option-inner-inner'),
          multipleSeparator = document.createTextNode(this.options.multipleSeparator),
          titleFragment = elementTemplates.fragment.cloneNode(false),
          showCount,
          countMax,
          hasContent = false;

      button.classList.toggle('bs-placeholder', that.multiple ? !selectedCount : !getSelectValues(element, selectedOptions));

      if (!that.multiple && selectedOptions.length === 1) {
        that.selectpicker.view.displayedValue = getSelectValues(element, selectedOptions);
      }

      if (this.options.selectedTextFormat === 'static') {
        titleFragment = generateOption.text.call(this, { text: this.options.title }, true);
      } else {
        showCount = this.multiple && this.options.selectedTextFormat.indexOf('count') !== -1 && selectedCount > 1;

        // determine if the number of selected options will be shown (showCount === true)
        if (showCount) {
          countMax = this.options.selectedTextFormat.split('>');
          showCount = (countMax.length > 1 && selectedCount > countMax[1]) || (countMax.length === 1 && selectedCount >= 2);
        }

        // only loop through all selected options if the count won't be shown
        if (showCount === false) {
          if (!placeholderSelected) {
            for (var selectedIndex = 0; selectedIndex < selectedCount; selectedIndex++) {
              if (selectedIndex < 50) {
                var option = selectedOptions[selectedIndex],
                    thisData = this.selectpicker.main.data[option.liIndex],
                    titleOptions = {};

                if (this.multiple && selectedIndex > 0) {
                  titleFragment.appendChild(multipleSeparator.cloneNode(false));
                }

                if (option.title) {
                  titleOptions.text = option.title;
                } else if (thisData) {
                  if (thisData.content && that.options.showContent) {
                    titleOptions.content = thisData.content.toString();
                    hasContent = true;
                  } else {
                    if (that.options.showIcon) {
                      titleOptions.icon = thisData.icon;
                    }
                    if (that.options.showSubtext && !that.multiple && thisData.subtext) titleOptions.subtext = ' ' + thisData.subtext;
                    titleOptions.text = option.textContent.trim();
                  }
                }

                titleFragment.appendChild(generateOption.text.call(this, titleOptions, true));
              } else {
                break;
              }
            }

            // add ellipsis
            if (selectedCount > 49) {
              titleFragment.appendChild(document.createTextNode('...'));
            }
          }
        } else {
          var optionSelector = ':not([hidden]):not([data-hidden="true"]):not([data-divider="true"])';
          if (this.options.hideDisabled) optionSelector += ':not(:disabled)';

          // If this is a multiselect, and selectedTextFormat is count, then show 1 of 2 selected, etc.
          var totalCount = this.$element[0].querySelectorAll('select > option' + optionSelector + ', optgroup' + optionSelector + ' option' + optionSelector).length,
              tr8nText = (typeof this.options.countSelectedText === 'function') ? this.options.countSelectedText(selectedCount, totalCount) : this.options.countSelectedText;

          titleFragment = generateOption.text.call(this, {
            text: tr8nText.replace('{0}', selectedCount.toString()).replace('{1}', totalCount.toString())
          }, true);
        }
      }

      if (this.options.title == undefined) {
        // use .attr to ensure undefined is returned if title attribute is not set
        this.options.title = this.$element.attr('title');
      }

      // If the select doesn't have a title, then use the default, or if nothing is set at all, use noneSelectedText
      if (!titleFragment.childNodes.length) {
        titleFragment = generateOption.text.call(this, {
          text: typeof this.options.title !== 'undefined' ? this.options.title : this.options.noneSelectedText
        }, true);
      }

      // strip all HTML tags and trim the result, then unescape any escaped tags
      button.title = titleFragment.textContent.replace(/<[^>]*>?/g, '').trim();

      if (this.options.sanitize && hasContent) {
        sanitizeHtml([titleFragment], that.options.whiteList, that.options.sanitizeFn);
      }

      buttonInner.innerHTML = '';
      buttonInner.appendChild(titleFragment);

      if (version.major < 4 && this.$newElement[0].classList.contains('bs3-has-addon')) {
        var filterExpand = button.querySelector('.filter-expand'),
            clone = buttonInner.cloneNode(true);

        clone.className = 'filter-expand';

        if (filterExpand) {
          button.replaceChild(clone, filterExpand);
        } else {
          button.appendChild(clone);
        }
      }

      this.$element.trigger('rendered' + EVENT_KEY);
    },

    /**
     * @param [style]
     * @param [status]
     */
    setStyle: function (newStyle, status) {
      var button = this.$button[0],
          newElement = this.$newElement[0],
          style = this.options.style.trim(),
          buttonClass;

      if (this.$element.attr('class')) {
        this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ''));
      }

      if (version.major < 4) {
        newElement.classList.add('bs3');

        if (newElement.parentNode.classList && newElement.parentNode.classList.contains('input-group') &&
            (newElement.previousElementSibling || newElement.nextElementSibling) &&
            (newElement.previousElementSibling || newElement.nextElementSibling).classList.contains('input-group-addon')
        ) {
          newElement.classList.add('bs3-has-addon');
        }
      }

      if (newStyle) {
        buttonClass = newStyle.trim();
      } else {
        buttonClass = style;
      }

      if (status == 'add') {
        if (buttonClass) button.classList.add.apply(button.classList, buttonClass.split(' '));
      } else if (status == 'remove') {
        if (buttonClass) button.classList.remove.apply(button.classList, buttonClass.split(' '));
      } else {
        if (style) button.classList.remove.apply(button.classList, style.split(' '));
        if (buttonClass) button.classList.add.apply(button.classList, buttonClass.split(' '));
      }
    },

    liHeight: function (refresh) {
      if (!refresh && (this.options.size === false || Object.keys(this.sizeInfo).length)) return;

      var newElement = elementTemplates.div.cloneNode(false),
          menu = elementTemplates.div.cloneNode(false),
          menuInner = elementTemplates.div.cloneNode(false),
          menuInnerInner = document.createElement('ul'),
          divider = elementTemplates.li.cloneNode(false),
          dropdownHeader = elementTemplates.li.cloneNode(false),
          li,
          a = elementTemplates.a.cloneNode(false),
          text = elementTemplates.span.cloneNode(false),
          header = this.options.header && this.$menu.find('.' + classNames.POPOVERHEADER).length > 0 ? this.$menu.find('.' + classNames.POPOVERHEADER)[0].cloneNode(true) : null,
          search = this.options.liveSearch ? elementTemplates.div.cloneNode(false) : null,
          actions = this.options.actionsBox && this.multiple && this.$menu.find('.bs-actionsbox').length > 0 ? this.$menu.find('.bs-actionsbox')[0].cloneNode(true) : null,
          doneButton = this.options.doneButton && this.multiple && this.$menu.find('.bs-donebutton').length > 0 ? this.$menu.find('.bs-donebutton')[0].cloneNode(true) : null,
          firstOption = this.$element.find('option')[0];

      this.sizeInfo.selectWidth = this.$newElement[0].offsetWidth;

      text.className = 'text';
      a.className = 'dropdown-item ' + (firstOption ? firstOption.className : '');
      newElement.className = this.$menu[0].parentNode.className + ' ' + classNames.SHOW;
      newElement.style.width = 0; // ensure button width doesn't affect natural width of menu when calculating
      if (this.options.width === 'auto') menu.style.minWidth = 0;
      menu.className = classNames.MENU + ' ' + classNames.SHOW;
      menuInner.className = 'inner ' + classNames.SHOW;
      menuInnerInner.className = classNames.MENU + ' inner ' + (version.major === '4' ? classNames.SHOW : '');
      divider.className = classNames.DIVIDER;
      dropdownHeader.className = 'dropdown-header';

      text.appendChild(document.createTextNode('\u200b'));

      if (this.selectpicker.current.data.length) {
        for (var i = 0; i < this.selectpicker.current.data.length; i++) {
          var data = this.selectpicker.current.data[i];
          if (data.type === 'option') {
            li = data.element;
            break;
          }
        }
      } else {
        li = elementTemplates.li.cloneNode(false);
        a.appendChild(text);
        li.appendChild(a);
      }

      dropdownHeader.appendChild(text.cloneNode(true));

      if (this.selectpicker.view.widestOption) {
        menuInnerInner.appendChild(this.selectpicker.view.widestOption.cloneNode(true));
      }

      menuInnerInner.appendChild(li);
      menuInnerInner.appendChild(divider);
      menuInnerInner.appendChild(dropdownHeader);
      if (header) menu.appendChild(header);
      if (search) {
        var input = document.createElement('input');
        search.className = 'bs-searchbox';
        input.className = 'form-control';
        search.appendChild(input);
        menu.appendChild(search);
      }
      if (actions) menu.appendChild(actions);
      menuInner.appendChild(menuInnerInner);
      menu.appendChild(menuInner);
      if (doneButton) menu.appendChild(doneButton);
      newElement.appendChild(menu);

      document.body.appendChild(newElement);

      var liHeight = li.offsetHeight,
          dropdownHeaderHeight = dropdownHeader ? dropdownHeader.offsetHeight : 0,
          headerHeight = header ? header.offsetHeight : 0,
          searchHeight = search ? search.offsetHeight : 0,
          actionsHeight = actions ? actions.offsetHeight : 0,
          doneButtonHeight = doneButton ? doneButton.offsetHeight : 0,
          dividerHeight = $(divider).outerHeight(true),
          // fall back to jQuery if getComputedStyle is not supported
          menuStyle = window.getComputedStyle ? window.getComputedStyle(menu) : false,
          menuWidth = menu.offsetWidth,
          $menu = menuStyle ? null : $(menu),
          menuPadding = {
            vert: toInteger(menuStyle ? menuStyle.paddingTop : $menu.css('paddingTop')) +
                  toInteger(menuStyle ? menuStyle.paddingBottom : $menu.css('paddingBottom')) +
                  toInteger(menuStyle ? menuStyle.borderTopWidth : $menu.css('borderTopWidth')) +
                  toInteger(menuStyle ? menuStyle.borderBottomWidth : $menu.css('borderBottomWidth')),
            horiz: toInteger(menuStyle ? menuStyle.paddingLeft : $menu.css('paddingLeft')) +
                  toInteger(menuStyle ? menuStyle.paddingRight : $menu.css('paddingRight')) +
                  toInteger(menuStyle ? menuStyle.borderLeftWidth : $menu.css('borderLeftWidth')) +
                  toInteger(menuStyle ? menuStyle.borderRightWidth : $menu.css('borderRightWidth'))
          },
          menuExtras = {
            vert: menuPadding.vert +
                  toInteger(menuStyle ? menuStyle.marginTop : $menu.css('marginTop')) +
                  toInteger(menuStyle ? menuStyle.marginBottom : $menu.css('marginBottom')) + 2,
            horiz: menuPadding.horiz +
                  toInteger(menuStyle ? menuStyle.marginLeft : $menu.css('marginLeft')) +
                  toInteger(menuStyle ? menuStyle.marginRight : $menu.css('marginRight')) + 2
          },
          scrollBarWidth;

      menuInner.style.overflowY = 'scroll';

      scrollBarWidth = menu.offsetWidth - menuWidth;

      document.body.removeChild(newElement);

      this.sizeInfo.liHeight = liHeight;
      this.sizeInfo.dropdownHeaderHeight = dropdownHeaderHeight;
      this.sizeInfo.headerHeight = headerHeight;
      this.sizeInfo.searchHeight = searchHeight;
      this.sizeInfo.actionsHeight = actionsHeight;
      this.sizeInfo.doneButtonHeight = doneButtonHeight;
      this.sizeInfo.dividerHeight = dividerHeight;
      this.sizeInfo.menuPadding = menuPadding;
      this.sizeInfo.menuExtras = menuExtras;
      this.sizeInfo.menuWidth = menuWidth;
      this.sizeInfo.menuInnerInnerWidth = menuWidth - menuPadding.horiz;
      this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth;
      this.sizeInfo.scrollBarWidth = scrollBarWidth;
      this.sizeInfo.selectHeight = this.$newElement[0].offsetHeight;

      this.setPositionData();
    },

    getSelectPosition: function () {
      var that = this,
          $window = $(window),
          pos = that.$newElement.offset(),
          $container = $(that.options.container),
          containerPos;

      if (that.options.container && $container.length && !$container.is('body')) {
        containerPos = $container.offset();
        containerPos.top += parseInt($container.css('borderTopWidth'));
        containerPos.left += parseInt($container.css('borderLeftWidth'));
      } else {
        containerPos = { top: 0, left: 0 };
      }

      var winPad = that.options.windowPadding;

      this.sizeInfo.selectOffsetTop = pos.top - containerPos.top - $window.scrollTop();
      this.sizeInfo.selectOffsetBot = $window.height() - this.sizeInfo.selectOffsetTop - this.sizeInfo.selectHeight - containerPos.top - winPad[2];
      this.sizeInfo.selectOffsetLeft = pos.left - containerPos.left - $window.scrollLeft();
      this.sizeInfo.selectOffsetRight = $window.width() - this.sizeInfo.selectOffsetLeft - this.sizeInfo.selectWidth - containerPos.left - winPad[1];
      this.sizeInfo.selectOffsetTop -= winPad[0];
      this.sizeInfo.selectOffsetLeft -= winPad[3];
    },

    setMenuSize: function (isAuto) {
      this.getSelectPosition();

      var selectWidth = this.sizeInfo.selectWidth,
          liHeight = this.sizeInfo.liHeight,
          headerHeight = this.sizeInfo.headerHeight,
          searchHeight = this.sizeInfo.searchHeight,
          actionsHeight = this.sizeInfo.actionsHeight,
          doneButtonHeight = this.sizeInfo.doneButtonHeight,
          divHeight = this.sizeInfo.dividerHeight,
          menuPadding = this.sizeInfo.menuPadding,
          menuInnerHeight,
          menuHeight,
          divLength = 0,
          minHeight,
          _minHeight,
          maxHeight,
          menuInnerMinHeight,
          estimate,
          isDropup;

      if (this.options.dropupAuto) {
        // Get the estimated height of the menu without scrollbars.
        // This is useful for smaller menus, where there might be plenty of room
        // below the button without setting dropup, but we can't know
        // the exact height of the menu until createView is called later
        estimate = liHeight * this.selectpicker.current.elements.length + menuPadding.vert;

        isDropup = this.sizeInfo.selectOffsetTop - this.sizeInfo.selectOffsetBot > this.sizeInfo.menuExtras.vert && estimate + this.sizeInfo.menuExtras.vert + 50 > this.sizeInfo.selectOffsetBot;

        // ensure dropup doesn't change while searching (so menu doesn't bounce back and forth)
        if (this.selectpicker.isSearching === true) {
          isDropup = this.selectpicker.dropup;
        }

        this.$newElement.toggleClass(classNames.DROPUP, isDropup);
        this.selectpicker.dropup = isDropup;
      }

      if (this.options.size === 'auto') {
        _minHeight = this.selectpicker.current.elements.length > 3 ? this.sizeInfo.liHeight * 3 + this.sizeInfo.menuExtras.vert - 2 : 0;
        menuHeight = this.sizeInfo.selectOffsetBot - this.sizeInfo.menuExtras.vert;
        minHeight = _minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight;
        menuInnerMinHeight = Math.max(_minHeight - menuPadding.vert, 0);

        if (this.$newElement.hasClass(classNames.DROPUP)) {
          menuHeight = this.sizeInfo.selectOffsetTop - this.sizeInfo.menuExtras.vert;
        }

        maxHeight = menuHeight;
        menuInnerHeight = menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding.vert;
      } else if (this.options.size && this.options.size != 'auto' && this.selectpicker.current.elements.length > this.options.size) {
        for (var i = 0; i < this.options.size; i++) {
          if (this.selectpicker.current.data[i].type === 'divider') divLength++;
        }

        menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding.vert;
        menuInnerHeight = menuHeight - menuPadding.vert;
        maxHeight = menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight;
        minHeight = menuInnerMinHeight = '';
      }

      this.$menu.css({
        'max-height': maxHeight + 'px',
        'overflow': 'hidden',
        'min-height': minHeight + 'px'
      });

      this.$menuInner.css({
        'max-height': menuInnerHeight + 'px',
        'overflow-y': 'auto',
        'min-height': menuInnerMinHeight + 'px'
      });

      // ensure menuInnerHeight is always a positive number to prevent issues calculating chunkSize in createView
      this.sizeInfo.menuInnerHeight = Math.max(menuInnerHeight, 1);

      if (this.selectpicker.current.data.length && this.selectpicker.current.data[this.selectpicker.current.data.length - 1].position > this.sizeInfo.menuInnerHeight) {
        this.sizeInfo.hasScrollBar = true;
        this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth + this.sizeInfo.scrollBarWidth;
      }

      if (this.options.dropdownAlignRight === 'auto') {
        this.$menu.toggleClass(classNames.MENURIGHT, this.sizeInfo.selectOffsetLeft > this.sizeInfo.selectOffsetRight && this.sizeInfo.selectOffsetRight < (this.sizeInfo.totalMenuWidth - selectWidth));
      }

      if (this.dropdown && this.dropdown._popper) this.dropdown._popper.update();
    },

    setSize: function (refresh) {
      this.liHeight(refresh);

      if (this.options.header) this.$menu.css('padding-top', 0);

      if (this.options.size !== false) {
        var that = this,
            $window = $(window);

        this.setMenuSize();

        if (this.options.liveSearch) {
          this.$searchbox
            .off('input.setMenuSize propertychange.setMenuSize')
            .on('input.setMenuSize propertychange.setMenuSize', function () {
              return that.setMenuSize();
            });
        }

        if (this.options.size === 'auto') {
          $window
            .off('resize' + EVENT_KEY + '.' + this.selectId + '.setMenuSize' + ' scroll' + EVENT_KEY + '.' + this.selectId + '.setMenuSize')
            .on('resize' + EVENT_KEY + '.' + this.selectId + '.setMenuSize' + ' scroll' + EVENT_KEY + '.' + this.selectId + '.setMenuSize', function () {
              return that.setMenuSize();
            });
        } else if (this.options.size && this.options.size != 'auto' && this.selectpicker.current.elements.length > this.options.size) {
          $window.off('resize' + EVENT_KEY + '.' + this.selectId + '.setMenuSize' + ' scroll' + EVENT_KEY + '.' + this.selectId + '.setMenuSize');
        }
      }

      this.createView(false, true, refresh);
    },

    setWidth: function () {
      var that = this;

      if (this.options.width === 'auto') {
        requestAnimationFrame(function () {
          that.$menu.css('min-width', '0');

          that.$element.on('loaded' + EVENT_KEY, function () {
            that.liHeight();
            that.setMenuSize();

            // Get correct width if element is hidden
            var $selectClone = that.$newElement.clone().appendTo('body'),
                btnWidth = $selectClone.css('width', 'auto').children('button').outerWidth();

            $selectClone.remove();

            // Set width to whatever's larger, button title or longest option
            that.sizeInfo.selectWidth = Math.max(that.sizeInfo.totalMenuWidth, btnWidth);
            that.$newElement.css('width', that.sizeInfo.selectWidth + 'px');
          });
        });
      } else if (this.options.width === 'fit') {
        // Remove inline min-width so width can be changed from 'auto'
        this.$menu.css('min-width', '');
        this.$newElement.css('width', '').addClass('fit-width');
      } else if (this.options.width) {
        // Remove inline min-width so width can be changed from 'auto'
        this.$menu.css('min-width', '');
        this.$newElement.css('width', this.options.width);
      } else {
        // Remove inline min-width/width so width can be changed
        this.$menu.css('min-width', '');
        this.$newElement.css('width', '');
      }
      // Remove fit-width class if width is changed programmatically
      if (this.$newElement.hasClass('fit-width') && this.options.width !== 'fit') {
        this.$newElement[0].classList.remove('fit-width');
      }
    },

    selectPosition: function () {
      this.$bsContainer = $('<div class="bs-container" />');

      var that = this,
          $container = $(this.options.container),
          pos,
          containerPos,
          actualHeight,
          getPlacement = function ($element) {
            var containerPosition = {},
                // fall back to dropdown's default display setting if display is not manually set
                display = that.options.display || (
                  // Bootstrap 3 doesn't have $.fn.dropdown.Constructor.Default
                  $.fn.dropdown.Constructor.Default ? $.fn.dropdown.Constructor.Default.display
                  : false
                );

            that.$bsContainer.addClass($element.attr('class').replace(/form-control|fit-width/gi, '')).toggleClass(classNames.DROPUP, $element.hasClass(classNames.DROPUP));
            pos = $element.offset();

            if (!$container.is('body')) {
              containerPos = $container.offset();
              containerPos.top += parseInt($container.css('borderTopWidth')) - $container.scrollTop();
              containerPos.left += parseInt($container.css('borderLeftWidth')) - $container.scrollLeft();
            } else {
              containerPos = { top: 0, left: 0 };
            }

            actualHeight = $element.hasClass(classNames.DROPUP) ? 0 : $element[0].offsetHeight;

            // Bootstrap 4+ uses Popper for menu positioning
            if (version.major < 4 || display === 'static') {
              containerPosition.top = pos.top - containerPos.top + actualHeight;
              containerPosition.left = pos.left - containerPos.left;
            }

            containerPosition.width = $element[0].offsetWidth;

            that.$bsContainer.css(containerPosition);
          };

      this.$button.on('click.bs.dropdown.data-api', function () {
        if (that.isDisabled()) {
          return;
        }

        getPlacement(that.$newElement);

        that.$bsContainer
          .appendTo(that.options.container)
          .toggleClass(classNames.SHOW, !that.$button.hasClass(classNames.SHOW))
          .append(that.$menu);
      });

      $(window)
        .off('resize' + EVENT_KEY + '.' + this.selectId + ' scroll' + EVENT_KEY + '.' + this.selectId)
        .on('resize' + EVENT_KEY + '.' + this.selectId + ' scroll' + EVENT_KEY + '.' + this.selectId, function () {
          var isActive = that.$newElement.hasClass(classNames.SHOW);

          if (isActive) getPlacement(that.$newElement);
        });

      this.$element.on('hide' + EVENT_KEY, function () {
        that.$menu.data('height', that.$menu.height());
        that.$bsContainer.detach();
      });
    },

    setOptionStatus: function (selectedOnly) {
      var that = this;

      that.noScroll = false;

      if (that.selectpicker.view.visibleElements && that.selectpicker.view.visibleElements.length) {
        for (var i = 0; i < that.selectpicker.view.visibleElements.length; i++) {
          var liData = that.selectpicker.current.data[i + that.selectpicker.view.position0],
              option = liData.option;

          if (option) {
            if (selectedOnly !== true) {
              that.setDisabled(
                liData.index,
                liData.disabled
              );
            }

            that.setSelected(
              liData.index,
              option.selected
            );
          }
        }
      }
    },

    /**
     * @param {number} index - the index of the option that is being changed
     * @param {boolean} selected - true if the option is being selected, false if being deselected
     */
    setSelected: function (index, selected) {
      var li = this.selectpicker.main.elements[index],
          liData = this.selectpicker.main.data[index],
          activeIndexIsSet = this.activeIndex !== undefined,
          thisIsActive = this.activeIndex === index,
          prevActive,
          a,
          // if current option is already active
          // OR
          // if the current option is being selected, it's NOT multiple, and
          // activeIndex is undefined:
          //  - when the menu is first being opened, OR
          //  - after a search has been performed, OR
          //  - when retainActive is false when selecting a new option (i.e. index of the newly selected option is not the same as the current activeIndex)
          keepActive = thisIsActive || (selected && !this.multiple && !activeIndexIsSet);

      liData.selected = selected;

      a = li.firstChild;

      if (selected) {
        this.selectedIndex = index;
      }

      li.classList.toggle('selected', selected);

      if (keepActive) {
        this.focusItem(li, liData);
        this.selectpicker.view.currentActive = li;
        this.activeIndex = index;
      } else {
        this.defocusItem(li);
      }

      if (a) {
        a.classList.toggle('selected', selected);

        if (selected) {
          a.setAttribute('aria-selected', true);
        } else {
          if (this.multiple) {
            a.setAttribute('aria-selected', false);
          } else {
            a.removeAttribute('aria-selected');
          }
        }
      }

      if (!keepActive && !activeIndexIsSet && selected && this.prevActiveIndex !== undefined) {
        prevActive = this.selectpicker.main.elements[this.prevActiveIndex];

        this.defocusItem(prevActive);
      }
    },

    /**
     * @param {number} index - the index of the option that is being disabled
     * @param {boolean} disabled - true if the option is being disabled, false if being enabled
     */
    setDisabled: function (index, disabled) {
      var li = this.selectpicker.main.elements[index],
          a;

      this.selectpicker.main.data[index].disabled = disabled;

      a = li.firstChild;

      li.classList.toggle(classNames.DISABLED, disabled);

      if (a) {
        if (version.major === '4') a.classList.toggle(classNames.DISABLED, disabled);

        if (disabled) {
          a.setAttribute('aria-disabled', disabled);
          a.setAttribute('tabindex', -1);
        } else {
          a.removeAttribute('aria-disabled');
          a.setAttribute('tabindex', 0);
        }
      }
    },

    isDisabled: function () {
      return this.$element[0].disabled;
    },

    checkDisabled: function () {
      if (this.isDisabled()) {
        this.$newElement[0].classList.add(classNames.DISABLED);
        this.$button.addClass(classNames.DISABLED).attr('aria-disabled', true);
      } else {
        if (this.$button[0].classList.contains(classNames.DISABLED)) {
          this.$newElement[0].classList.remove(classNames.DISABLED);
          this.$button.removeClass(classNames.DISABLED).attr('aria-disabled', false);
        }
      }
    },

    clickListener: function () {
      var that = this,
          $document = $(document);

      $document.data('spaceSelect', false);

      this.$button.on('keyup', function (e) {
        if (/(32)/.test(e.keyCode.toString(10)) && $document.data('spaceSelect')) {
          e.preventDefault();
          $document.data('spaceSelect', false);
        }
      });

      this.$newElement.on('show.bs.dropdown', function () {
        if (version.major > 3 && !that.dropdown) {
          that.dropdown = that.$button.data('bs.dropdown');
          that.dropdown._menu = that.$menu[0];
        }
      });

      this.$button.on('click.bs.dropdown.data-api', function () {
        if (!that.$newElement.hasClass(classNames.SHOW)) {
          that.setSize();
        }
      });

      function setFocus () {
        if (that.options.liveSearch) {
          that.$searchbox.trigger('focus');
        } else {
          that.$menuInner.trigger('focus');
        }
      }

      function checkPopperExists () {
        if (that.dropdown && that.dropdown._popper && that.dropdown._popper.state.isCreated) {
          setFocus();
        } else {
          requestAnimationFrame(checkPopperExists);
        }
      }

      this.$element.on('shown' + EVENT_KEY, function () {
        if (that.$menuInner[0].scrollTop !== that.selectpicker.view.scrollTop) {
          that.$menuInner[0].scrollTop = that.selectpicker.view.scrollTop;
        }

        if (version.major > 3) {
          requestAnimationFrame(checkPopperExists);
        } else {
          setFocus();
        }
      });

      // ensure posinset and setsize are correct before selecting an option via a click
      this.$menuInner.on('mouseenter', 'li a', function (e) {
        var hoverLi = this.parentElement,
            position0 = that.isVirtual() ? that.selectpicker.view.position0 : 0,
            index = Array.prototype.indexOf.call(hoverLi.parentElement.children, hoverLi),
            hoverData = that.selectpicker.current.data[index + position0];

        that.focusItem(hoverLi, hoverData, true);
      });

      this.$menuInner.on('click', 'li a', function (e, retainActive) {
        var $this = $(this),
            element = that.$element[0],
            position0 = that.isVirtual() ? that.selectpicker.view.position0 : 0,
            clickedData = that.selectpicker.current.data[$this.parent().index() + position0],
            clickedIndex = clickedData.index,
            prevValue = getSelectValues(element),
            prevIndex = element.selectedIndex,
            prevOption = element.options[prevIndex],
            triggerChange = true;

        // Don't close on multi choice menu
        if (that.multiple && that.options.maxOptions !== 1) {
          e.stopPropagation();
        }

        e.preventDefault();

        // Don't run if the select is disabled
        if (!that.isDisabled() && !$this.parent().hasClass(classNames.DISABLED)) {
          var option = clickedData.option,
              $option = $(option),
              state = option.selected,
              $optgroup = $option.parent('optgroup'),
              $optgroupOptions = $optgroup.find('option'),
              maxOptions = that.options.maxOptions,
              maxOptionsGrp = $optgroup.data('maxOptions') || false;

          if (clickedIndex === that.activeIndex) retainActive = true;

          if (!retainActive) {
            that.prevActiveIndex = that.activeIndex;
            that.activeIndex = undefined;
          }

          if (!that.multiple) { // Deselect all others if not multi select box
            if (prevOption) prevOption.selected = false;
            option.selected = true;
            that.setSelected(clickedIndex, true);
          } else { // Toggle the one we have chosen if we are multi select.
            option.selected = !state;

            that.setSelected(clickedIndex, !state);
            that.focusedParent.focus();

            if (maxOptions !== false || maxOptionsGrp !== false) {
              var maxReached = maxOptions < getSelectedOptions(element).length,
                  maxReachedGrp = maxOptionsGrp < $optgroup.find('option:selected').length;

              if ((maxOptions && maxReached) || (maxOptionsGrp && maxReachedGrp)) {
                if (maxOptions && maxOptions == 1) {
                  element.selectedIndex = -1;
                  option.selected = true;
                  that.setOptionStatus(true);
                } else if (maxOptionsGrp && maxOptionsGrp == 1) {
                  for (var i = 0; i < $optgroupOptions.length; i++) {
                    var _option = $optgroupOptions[i];
                    _option.selected = false;
                    that.setSelected(_option.liIndex, false);
                  }

                  option.selected = true;
                  that.setSelected(clickedIndex, true);
                } else {
                  var maxOptionsText = typeof that.options.maxOptionsText === 'string' ? [that.options.maxOptionsText, that.options.maxOptionsText] : that.options.maxOptionsText,
                      maxOptionsArr = typeof maxOptionsText === 'function' ? maxOptionsText(maxOptions, maxOptionsGrp) : maxOptionsText,
                      maxTxt = maxOptionsArr[0].replace('{n}', maxOptions),
                      maxTxtGrp = maxOptionsArr[1].replace('{n}', maxOptionsGrp),
                      $notify = $('<div class="notify"></div>');
                  // If {var} is set in array, replace it
                  /** @deprecated */
                  if (maxOptionsArr[2]) {
                    maxTxt = maxTxt.replace('{var}', maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                    maxTxtGrp = maxTxtGrp.replace('{var}', maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                  }

                  option.selected = false;

                  that.$menu.append($notify);

                  if (maxOptions && maxReached) {
                    $notify.append($('<div>' + maxTxt + '</div>'));
                    triggerChange = false;
                    that.$element.trigger('maxReached' + EVENT_KEY);
                  }

                  if (maxOptionsGrp && maxReachedGrp) {
                    $notify.append($('<div>' + maxTxtGrp + '</div>'));
                    triggerChange = false;
                    that.$element.trigger('maxReachedGrp' + EVENT_KEY);
                  }

                  setTimeout(function () {
                    that.setSelected(clickedIndex, false);
                  }, 10);

                  $notify[0].classList.add('fadeOut');

                  setTimeout(function () {
                    $notify.remove();
                  }, 1050);
                }
              }
            }
          }

          if (!that.multiple || (that.multiple && that.options.maxOptions === 1)) {
            that.$button.trigger('focus');
          } else if (that.options.liveSearch) {
            that.$searchbox.trigger('focus');
          }

          // Trigger select 'change'
          if (triggerChange) {
            if (that.multiple || prevIndex !== element.selectedIndex) {
              // $option.prop('selected') is current option state (selected/unselected). prevValue is the value of the select prior to being changed.
              changedArguments = [option.index, $option.prop('selected'), prevValue];
              that.$element
                .triggerNative('change');
            }
          }
        }
      });

      this.$menu.on('click', 'li.' + classNames.DISABLED + ' a, .' + classNames.POPOVERHEADER + ', .' + classNames.POPOVERHEADER + ' :not(.close)', function (e) {
        if (e.currentTarget == this) {
          e.preventDefault();
          e.stopPropagation();
          if (that.options.liveSearch && !$(e.target).hasClass('close')) {
            that.$searchbox.trigger('focus');
          } else {
            that.$button.trigger('focus');
          }
        }
      });

      this.$menuInner.on('click', '.divider, .dropdown-header', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (that.options.liveSearch) {
          that.$searchbox.trigger('focus');
        } else {
          that.$button.trigger('focus');
        }
      });

      this.$menu.on('click', '.' + classNames.POPOVERHEADER + ' .close', function () {
        that.$button.trigger('click');
      });

      this.$searchbox.on('click', function (e) {
        e.stopPropagation();
      });

      this.$menu.on('click', '.actions-btn', function (e) {
        if (that.options.liveSearch) {
          that.$searchbox.trigger('focus');
        } else {
          that.$button.trigger('focus');
        }

        e.preventDefault();
        e.stopPropagation();

        if ($(this).hasClass('bs-select-all')) {
          that.selectAll();
        } else {
          that.deselectAll();
        }
      });

      this.$button
        .on('focus' + EVENT_KEY, function (e) {
          var tabindex = that.$element[0].getAttribute('tabindex');

          // only change when button is actually focused
          if (tabindex !== undefined && e.originalEvent && e.originalEvent.isTrusted) {
            // apply select element's tabindex to ensure correct order is followed when tabbing to the next element
            this.setAttribute('tabindex', tabindex);
            // set element's tabindex to -1 to allow for reverse tabbing
            that.$element[0].setAttribute('tabindex', -1);
            that.selectpicker.view.tabindex = tabindex;
          }
        })
        .on('blur' + EVENT_KEY, function (e) {
          // revert everything to original tabindex
          if (that.selectpicker.view.tabindex !== undefined && e.originalEvent && e.originalEvent.isTrusted) {
            that.$element[0].setAttribute('tabindex', that.selectpicker.view.tabindex);
            this.setAttribute('tabindex', -1);
            that.selectpicker.view.tabindex = undefined;
          }
        });

      this.$element
        .on('change' + EVENT_KEY, function () {
          that.render();
          that.$element.trigger('changed' + EVENT_KEY, changedArguments);
          changedArguments = null;
        })
        .on('focus' + EVENT_KEY, function () {
          if (!that.options.mobile) that.$button[0].focus();
        });
    },

    liveSearchListener: function () {
      var that = this;

      this.$button.on('click.bs.dropdown.data-api', function () {
        if (!!that.$searchbox.val()) {
          that.$searchbox.val('');
          that.selectpicker.search.previousValue = undefined;
        }
      });

      this.$searchbox.on('click.bs.dropdown.data-api focus.bs.dropdown.data-api touchend.bs.dropdown.data-api', function (e) {
        e.stopPropagation();
      });

      this.$searchbox.on('input propertychange', function () {
        var searchValue = that.$searchbox[0].value;

        that.selectpicker.search.elements = [];
        that.selectpicker.search.data = [];

        if (searchValue) {
          var i,
              searchMatch = [],
              q = searchValue.toUpperCase(),
              cache = {},
              cacheArr = [],
              searchStyle = that._searchStyle(),
              normalizeSearch = that.options.liveSearchNormalize;

          if (normalizeSearch) q = normalizeToBase(q);

          for (var i = 0; i < that.selectpicker.main.data.length; i++) {
            var li = that.selectpicker.main.data[i];

            if (!cache[i]) {
              cache[i] = stringSearch(li, q, searchStyle, normalizeSearch);
            }

            if (cache[i] && li.headerIndex !== undefined && cacheArr.indexOf(li.headerIndex) === -1) {
              if (li.headerIndex > 0) {
                cache[li.headerIndex - 1] = true;
                cacheArr.push(li.headerIndex - 1);
              }

              cache[li.headerIndex] = true;
              cacheArr.push(li.headerIndex);

              cache[li.lastIndex + 1] = true;
            }

            if (cache[i] && li.type !== 'optgroup-label') cacheArr.push(i);
          }

          for (var i = 0, cacheLen = cacheArr.length; i < cacheLen; i++) {
            var index = cacheArr[i],
                prevIndex = cacheArr[i - 1],
                li = that.selectpicker.main.data[index],
                liPrev = that.selectpicker.main.data[prevIndex];

            if (li.type !== 'divider' || (li.type === 'divider' && liPrev && liPrev.type !== 'divider' && cacheLen - 1 !== i)) {
              that.selectpicker.search.data.push(li);
              searchMatch.push(that.selectpicker.main.elements[index]);
            }
          }

          that.activeIndex = undefined;
          that.noScroll = true;
          that.$menuInner.scrollTop(0);
          that.selectpicker.search.elements = searchMatch;
          that.createView(true);
          showNoResults.call(that, searchMatch, searchValue);
        } else if (that.selectpicker.search.previousValue) { // for IE11 (#2402)
          that.$menuInner.scrollTop(0);
          that.createView(false);
        }

        that.selectpicker.search.previousValue =  searchValue;
      });
    },

    _searchStyle: function () {
      return this.options.liveSearchStyle || 'contains';
    },

    val: function (value) {
      var element = this.$element[0];

      if (typeof value !== 'undefined') {
        var prevValue = getSelectValues(element);

        changedArguments = [null, null, prevValue];

        this.$element
          .val(value)
          .trigger('changed' + EVENT_KEY, changedArguments);

        if (this.$newElement.hasClass(classNames.SHOW)) {
          if (this.multiple) {
            this.setOptionStatus(true);
          } else {
            var liSelectedIndex = (element.options[element.selectedIndex] || {}).liIndex;

            if (typeof liSelectedIndex === 'number') {
              this.setSelected(this.selectedIndex, false);
              this.setSelected(liSelectedIndex, true);
            }
          }
        }

        this.render();

        changedArguments = null;

        return this.$element;
      } else {
        return this.$element.val();
      }
    },

    changeAll: function (status) {
      if (!this.multiple) return;
      if (typeof status === 'undefined') status = true;

      var element = this.$element[0],
          previousSelected = 0,
          currentSelected = 0,
          prevValue = getSelectValues(element);

      element.classList.add('bs-select-hidden');

      for (var i = 0, data = this.selectpicker.current.data, len = data.length; i < len; i++) {
        var liData = data[i],
            option = liData.option;

        if (option && !liData.disabled && liData.type !== 'divider') {
          if (liData.selected) previousSelected++;
          option.selected = status;
          if (status === true) currentSelected++;
        }
      }

      element.classList.remove('bs-select-hidden');

      if (previousSelected === currentSelected) return;

      this.setOptionStatus();

      changedArguments = [null, null, prevValue];

      this.$element
        .triggerNative('change');
    },

    selectAll: function () {
      return this.changeAll(true);
    },

    deselectAll: function () {
      return this.changeAll(false);
    },

    toggle: function (e) {
      e = e || window.event;

      if (e) e.stopPropagation();

      this.$button.trigger('click.bs.dropdown.data-api');
    },

    keydown: function (e) {
      var $this = $(this),
          isToggle = $this.hasClass('dropdown-toggle'),
          $parent = isToggle ? $this.closest('.dropdown') : $this.closest(Selector.MENU),
          that = $parent.data('this'),
          $items = that.findLis(),
          index,
          isActive,
          liActive,
          activeLi,
          offset,
          updateScroll = false,
          downOnTab = e.which === keyCodes.TAB && !isToggle && !that.options.selectOnTab,
          isArrowKey = REGEXP_ARROW.test(e.which) || downOnTab,
          scrollTop = that.$menuInner[0].scrollTop,
          isVirtual = that.isVirtual(),
          position0 = isVirtual === true ? that.selectpicker.view.position0 : 0;

      // do nothing if a function key is pressed
      if (e.which >= 112 && e.which <= 123) return;

      isActive = that.$newElement.hasClass(classNames.SHOW);

      if (
        !isActive &&
        (
          isArrowKey ||
          (e.which >= 48 && e.which <= 57) ||
          (e.which >= 96 && e.which <= 105) ||
          (e.which >= 65 && e.which <= 90)
        )
      ) {
        that.$button.trigger('click.bs.dropdown.data-api');

        if (that.options.liveSearch) {
          that.$searchbox.trigger('focus');
          return;
        }
      }

      if (e.which === keyCodes.ESCAPE && isActive) {
        e.preventDefault();
        that.$button.trigger('click.bs.dropdown.data-api').trigger('focus');
      }

      if (isArrowKey) { // if up or down
        if (!$items.length) return;

        liActive = that.selectpicker.main.elements[that.activeIndex];
        index = liActive ? Array.prototype.indexOf.call(liActive.parentElement.children, liActive) : -1;

        if (index !== -1) {
          that.defocusItem(liActive);
        }

        if (e.which === keyCodes.ARROW_UP) { // up
          if (index !== -1) index--;
          if (index + position0 < 0) index += $items.length;

          if (!that.selectpicker.view.canHighlight[index + position0]) {
            index = that.selectpicker.view.canHighlight.slice(0, index + position0).lastIndexOf(true) - position0;
            if (index === -1) index = $items.length - 1;
          }
        } else if (e.which === keyCodes.ARROW_DOWN || downOnTab) { // down
          index++;
          if (index + position0 >= that.selectpicker.view.canHighlight.length) index = that.selectpicker.view.firstHighlightIndex;

          if (!that.selectpicker.view.canHighlight[index + position0]) {
            index = index + 1 + that.selectpicker.view.canHighlight.slice(index + position0 + 1).indexOf(true);
          }
        }

        e.preventDefault();

        var liActiveIndex = position0 + index;

        if (e.which === keyCodes.ARROW_UP) { // up
          // scroll to bottom and highlight last option
          if (position0 === 0 && index === $items.length - 1) {
            that.$menuInner[0].scrollTop = that.$menuInner[0].scrollHeight;

            liActiveIndex = that.selectpicker.current.elements.length - 1;
          } else {
            activeLi = that.selectpicker.current.data[liActiveIndex];
            offset = activeLi.position - activeLi.height;

            updateScroll = offset < scrollTop;
          }
        } else if (e.which === keyCodes.ARROW_DOWN || downOnTab) { // down
          // scroll to top and highlight first option
          if (index === that.selectpicker.view.firstHighlightIndex) {
            that.$menuInner[0].scrollTop = 0;

            liActiveIndex = that.selectpicker.view.firstHighlightIndex;
          } else {
            activeLi = that.selectpicker.current.data[liActiveIndex];
            offset = activeLi.position - that.sizeInfo.menuInnerHeight;

            updateScroll = offset > scrollTop;
          }
        }

        liActive = that.selectpicker.current.elements[liActiveIndex];

        that.activeIndex = that.selectpicker.current.data[liActiveIndex].index;

        that.focusItem(liActive);

        that.selectpicker.view.currentActive = liActive;

        if (updateScroll) that.$menuInner[0].scrollTop = offset;

        if (that.options.liveSearch) {
          that.$searchbox.trigger('focus');
        } else {
          $this.trigger('focus');
        }
      } else if (
        (!$this.is('input') && !REGEXP_TAB_OR_ESCAPE.test(e.which)) ||
        (e.which === keyCodes.SPACE && that.selectpicker.keydown.keyHistory)
      ) {
        var searchMatch,
            matches = [],
            keyHistory;

        e.preventDefault();

        that.selectpicker.keydown.keyHistory += keyCodeMap[e.which];

        if (that.selectpicker.keydown.resetKeyHistory.cancel) clearTimeout(that.selectpicker.keydown.resetKeyHistory.cancel);
        that.selectpicker.keydown.resetKeyHistory.cancel = that.selectpicker.keydown.resetKeyHistory.start();

        keyHistory = that.selectpicker.keydown.keyHistory;

        // if all letters are the same, set keyHistory to just the first character when searching
        if (/^(.)\1+$/.test(keyHistory)) {
          keyHistory = keyHistory.charAt(0);
        }

        // find matches
        for (var i = 0; i < that.selectpicker.current.data.length; i++) {
          var li = that.selectpicker.current.data[i],
              hasMatch;

          hasMatch = stringSearch(li, keyHistory, 'startsWith', true);

          if (hasMatch && that.selectpicker.view.canHighlight[i]) {
            matches.push(li.index);
          }
        }

        if (matches.length) {
          var matchIndex = 0;

          $items.removeClass('active').find('a').removeClass('active');

          // either only one key has been pressed or they are all the same key
          if (keyHistory.length === 1) {
            matchIndex = matches.indexOf(that.activeIndex);

            if (matchIndex === -1 || matchIndex === matches.length - 1) {
              matchIndex = 0;
            } else {
              matchIndex++;
            }
          }

          searchMatch = matches[matchIndex];

          activeLi = that.selectpicker.main.data[searchMatch];

          if (scrollTop - activeLi.position > 0) {
            offset = activeLi.position - activeLi.height;
            updateScroll = true;
          } else {
            offset = activeLi.position - that.sizeInfo.menuInnerHeight;
            // if the option is already visible at the current scroll position, just keep it the same
            updateScroll = activeLi.position > scrollTop + that.sizeInfo.menuInnerHeight;
          }

          liActive = that.selectpicker.main.elements[searchMatch];

          that.activeIndex = matches[matchIndex];

          that.focusItem(liActive);

          if (liActive) liActive.firstChild.focus();

          if (updateScroll) that.$menuInner[0].scrollTop = offset;

          $this.trigger('focus');
        }
      }

      // Select focused option if "Enter", "Spacebar" or "Tab" (when selectOnTab is true) are pressed inside the menu.
      if (
        isActive &&
        (
          (e.which === keyCodes.SPACE && !that.selectpicker.keydown.keyHistory) ||
          e.which === keyCodes.ENTER ||
          (e.which === keyCodes.TAB && that.options.selectOnTab)
        )
      ) {
        if (e.which !== keyCodes.SPACE) e.preventDefault();

        if (!that.options.liveSearch || e.which !== keyCodes.SPACE) {
          that.$menuInner.find('.active a').trigger('click', true); // retain active class
          $this.trigger('focus');

          if (!that.options.liveSearch) {
            // Prevent screen from scrolling if the user hits the spacebar
            e.preventDefault();
            // Fixes spacebar selection of dropdown items in FF & IE
            $(document).data('spaceSelect', true);
          }
        }
      }
    },

    mobile: function () {
      // ensure mobile is set to true if mobile function is called after init
      this.options.mobile = true;
      this.$element[0].classList.add('mobile-device');
    },

    refresh: function () {
      // update options if data attributes have been changed
      var config = $.extend({}, this.options, this.$element.data());
      this.options = config;

      this.checkDisabled();
      this.buildData();
      this.setStyle();
      this.render();
      this.buildList();
      this.setWidth();

      this.setSize(true);

      this.$element.trigger('refreshed' + EVENT_KEY);
    },

    hide: function () {
      this.$newElement.hide();
    },

    show: function () {
      this.$newElement.show();
    },

    remove: function () {
      this.$newElement.remove();
      this.$element.remove();
    },

    destroy: function () {
      this.$newElement.before(this.$element).remove();

      if (this.$bsContainer) {
        this.$bsContainer.remove();
      } else {
        this.$menu.remove();
      }

      if (this.selectpicker.view.titleOption && this.selectpicker.view.titleOption.parentNode) {
        this.selectpicker.view.titleOption.parentNode.removeChild(this.selectpicker.view.titleOption);
      }

      this.$element
        .off(EVENT_KEY)
        .removeData('selectpicker')
        .removeClass('bs-select-hidden selectpicker');

      $(window).off(EVENT_KEY + '.' + this.selectId);
    }
  };

  // SELECTPICKER PLUGIN DEFINITION
  // ==============================
  function Plugin (option) {
    // get the args of the outer function..
    var args = arguments;
    // The arguments of the function are explicitly re-defined from the argument list, because the shift causes them
    // to get lost/corrupted in android 2.3 and IE9 #715 #775
    var _option = option;

    [].shift.apply(args);

    // if the version was not set successfully
    if (!version.success) {
      // try to retreive it again
      try {
        version.full = ($.fn.dropdown.Constructor.VERSION || '').split(' ')[0].split('.');
      } catch (err) {
        // fall back to use BootstrapVersion if set
        if (Selectpicker.BootstrapVersion) {
          version.full = Selectpicker.BootstrapVersion.split(' ')[0].split('.');
        } else {
          version.full = [version.major, '0', '0'];

          console.warn(
            'There was an issue retrieving Bootstrap\'s version. ' +
            'Ensure Bootstrap is being loaded before bootstrap-select and there is no namespace collision. ' +
            'If loading Bootstrap asynchronously, the version may need to be manually specified via $.fn.selectpicker.Constructor.BootstrapVersion.',
            err
          );
        }
      }

      version.major = version.full[0];
      version.success = true;
    }

    if (version.major === '4') {
      // some defaults need to be changed if using Bootstrap 4
      // check to see if they have already been manually changed before forcing them to update
      var toUpdate = [];

      if (Selectpicker.DEFAULTS.style === classNames.BUTTONCLASS) toUpdate.push({ name: 'style', className: 'BUTTONCLASS' });
      if (Selectpicker.DEFAULTS.iconBase === classNames.ICONBASE) toUpdate.push({ name: 'iconBase', className: 'ICONBASE' });
      if (Selectpicker.DEFAULTS.tickIcon === classNames.TICKICON) toUpdate.push({ name: 'tickIcon', className: 'TICKICON' });

      classNames.DIVIDER = 'dropdown-divider';
      classNames.SHOW = 'show';
      classNames.BUTTONCLASS = 'btn-light';
      classNames.POPOVERHEADER = 'popover-header';
      classNames.ICONBASE = '';
      classNames.TICKICON = 'bs-ok-default';

      for (var i = 0; i < toUpdate.length; i++) {
        var option = toUpdate[i];
        Selectpicker.DEFAULTS[option.name] = classNames[option.className];
      }
    }

    var value;
    var chain = this.each(function () {
      var $this = $(this);
      if ($this.is('select')) {
        var data = $this.data('selectpicker'),
            options = typeof _option == 'object' && _option;

        if (!data) {
          var dataAttributes = $this.data();

          for (var dataAttr in dataAttributes) {
            if (Object.prototype.hasOwnProperty.call(dataAttributes, dataAttr) && $.inArray(dataAttr, DISALLOWED_ATTRIBUTES) !== -1) {
              delete dataAttributes[dataAttr];
            }
          }

          var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, dataAttributes, options);
          config.template = $.extend({}, Selectpicker.DEFAULTS.template, ($.fn.selectpicker.defaults ? $.fn.selectpicker.defaults.template : {}), dataAttributes.template, options.template);
          $this.data('selectpicker', (data = new Selectpicker(this, config)));
        } else if (options) {
          for (var i in options) {
            if (Object.prototype.hasOwnProperty.call(options, i)) {
              data.options[i] = options[i];
            }
          }
        }

        if (typeof _option == 'string') {
          if (data[_option] instanceof Function) {
            value = data[_option].apply(data, args);
          } else {
            value = data.options[_option];
          }
        }
      }
    });

    if (typeof value !== 'undefined') {
      // noinspection JSUnusedAssignment
      return value;
    } else {
      return chain;
    }
  }

  var old = $.fn.selectpicker;
  $.fn.selectpicker = Plugin;
  $.fn.selectpicker.Constructor = Selectpicker;

  // SELECTPICKER NO CONFLICT
  // ========================
  $.fn.selectpicker.noConflict = function () {
    $.fn.selectpicker = old;
    return this;
  };

  // get Bootstrap's keydown event handler for either Bootstrap 4 or Bootstrap 3
  function keydownHandler () {
    if ($.fn.dropdown) {
      // wait to define until function is called in case Bootstrap isn't loaded yet
      var bootstrapKeydown = $.fn.dropdown.Constructor._dataApiKeydownHandler || $.fn.dropdown.Constructor.prototype.keydown;
      return bootstrapKeydown.apply(this, arguments);
    }
  }

  $(document)
    .off('keydown.bs.dropdown.data-api')
    .on('keydown.bs.dropdown.data-api', ':not(.bootstrap-select) > [data-toggle="dropdown"]', keydownHandler)
    .on('keydown.bs.dropdown.data-api', ':not(.bootstrap-select) > .dropdown-menu', keydownHandler)
    .on('keydown' + EVENT_KEY, '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input', Selectpicker.prototype.keydown)
    .on('focusin.modal', '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input', function (e) {
      e.stopPropagation();
    });

  // SELECTPICKER DATA-API
  // =====================
  $(window).on('load' + EVENT_KEY + '.data-api', function () {
    $('.selectpicker').each(function () {
      var $selectpicker = $(this);
      Plugin.call($selectpicker, $selectpicker.data());
    })
  });
})(jQuery);


}));
//# sourceMappingURL=bootstrap-select.js.map
/*!
 * 
 *   typed.js - A JavaScript Typing Animation Library
 *   Author: Matt Boldt <me@mattboldt.com>
 *   Version: v2.0.11
 *   Url: https://github.com/mattboldt/typed.js
 *   License(s): MIT
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Typed"] = factory();
	else
		root["Typed"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _initializerJs = __webpack_require__(1);
	
	var _htmlParserJs = __webpack_require__(3);
	
	/**
	 * Welcome to Typed.js!
	 * @param {string} elementId HTML element ID _OR_ HTML element
	 * @param {object} options options object
	 * @returns {object} a new Typed object
	 */
	
	var Typed = (function () {
	  function Typed(elementId, options) {
	    _classCallCheck(this, Typed);
	
	    // Initialize it up
	    _initializerJs.initializer.load(this, options, elementId);
	    // All systems go!
	    this.begin();
	  }
	
	  /**
	   * Toggle start() and stop() of the Typed instance
	   * @public
	   */
	
	  _createClass(Typed, [{
	    key: 'toggle',
	    value: function toggle() {
	      this.pause.status ? this.start() : this.stop();
	    }
	
	    /**
	     * Stop typing / backspacing and enable cursor blinking
	     * @public
	     */
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (this.typingComplete) return;
	      if (this.pause.status) return;
	      this.toggleBlinking(true);
	      this.pause.status = true;
	      this.options.onStop(this.arrayPos, this);
	    }
	
	    /**
	     * Start typing / backspacing after being stopped
	     * @public
	     */
	  }, {
	    key: 'start',
	    value: function start() {
	      if (this.typingComplete) return;
	      if (!this.pause.status) return;
	      this.pause.status = false;
	      if (this.pause.typewrite) {
	        this.typewrite(this.pause.curString, this.pause.curStrPos);
	      } else {
	        this.backspace(this.pause.curString, this.pause.curStrPos);
	      }
	      this.options.onStart(this.arrayPos, this);
	    }
	
	    /**
	     * Destroy this instance of Typed
	     * @public
	     */
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.reset(false);
	      this.options.onDestroy(this);
	    }
	
	    /**
	     * Reset Typed and optionally restarts
	     * @param {boolean} restart
	     * @public
	     */
	  }, {
	    key: 'reset',
	    value: function reset() {
	      var restart = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	      clearInterval(this.timeout);
	      this.replaceText('');
	      if (this.cursor && this.cursor.parentNode) {
	        this.cursor.parentNode.removeChild(this.cursor);
	        this.cursor = null;
	      }
	      this.strPos = 0;
	      this.arrayPos = 0;
	      this.curLoop = 0;
	      if (restart) {
	        this.insertCursor();
	        this.options.onReset(this);
	        this.begin();
	      }
	    }
	
	    /**
	     * Begins the typing animation
	     * @private
	     */
	  }, {
	    key: 'begin',
	    value: function begin() {
	      var _this = this;
	
	      this.options.onBegin(this);
	      this.typingComplete = false;
	      this.shuffleStringsIfNeeded(this);
	      this.insertCursor();
	      if (this.bindInputFocusEvents) this.bindFocusEvents();
	      this.timeout = setTimeout(function () {
	        // Check if there is some text in the element, if yes start by backspacing the default message
	        if (!_this.currentElContent || _this.currentElContent.length === 0) {
	          _this.typewrite(_this.strings[_this.sequence[_this.arrayPos]], _this.strPos);
	        } else {
	          // Start typing
	          _this.backspace(_this.currentElContent, _this.currentElContent.length);
	        }
	      }, this.startDelay);
	    }
	
	    /**
	     * Called for each character typed
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @private
	     */
	  }, {
	    key: 'typewrite',
	    value: function typewrite(curString, curStrPos) {
	      var _this2 = this;
	
	      if (this.fadeOut && this.el.classList.contains(this.fadeOutClass)) {
	        this.el.classList.remove(this.fadeOutClass);
	        if (this.cursor) this.cursor.classList.remove(this.fadeOutClass);
	      }
	
	      var humanize = this.humanizer(this.typeSpeed);
	      var numChars = 1;
	
	      if (this.pause.status === true) {
	        this.setPauseStatus(curString, curStrPos, true);
	        return;
	      }
	
	      // contain typing function in a timeout humanize'd delay
	      this.timeout = setTimeout(function () {
	        // skip over any HTML chars
	        curStrPos = _htmlParserJs.htmlParser.typeHtmlChars(curString, curStrPos, _this2);
	
	        var pauseTime = 0;
	        var substr = curString.substr(curStrPos);
	        // check for an escape character before a pause value
	        // format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
	        // single ^ are removed from string
	        if (substr.charAt(0) === '^') {
	          if (/^\^\d+/.test(substr)) {
	            var skip = 1; // skip at least 1
	            substr = /\d+/.exec(substr)[0];
	            skip += substr.length;
	            pauseTime = parseInt(substr);
	            _this2.temporaryPause = true;
	            _this2.options.onTypingPaused(_this2.arrayPos, _this2);
	            // strip out the escape character and pause value so they're not printed
	            curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
	            _this2.toggleBlinking(true);
	          }
	        }
	
	        // check for skip characters formatted as
	        // "this is a `string to print NOW` ..."
	        if (substr.charAt(0) === '`') {
	          while (curString.substr(curStrPos + numChars).charAt(0) !== '`') {
	            numChars++;
	            if (curStrPos + numChars > curString.length) break;
	          }
	          // strip out the escape characters and append all the string in between
	          var stringBeforeSkip = curString.substring(0, curStrPos);
	          var stringSkipped = curString.substring(stringBeforeSkip.length + 1, curStrPos + numChars);
	          var stringAfterSkip = curString.substring(curStrPos + numChars + 1);
	          curString = stringBeforeSkip + stringSkipped + stringAfterSkip;
	          numChars--;
	        }
	
	        // timeout for any pause after a character
	        _this2.timeout = setTimeout(function () {
	          // Accounts for blinking while paused
	          _this2.toggleBlinking(false);
	
	          // We're done with this sentence!
	          if (curStrPos >= curString.length) {
	            _this2.doneTyping(curString, curStrPos);
	          } else {
	            _this2.keepTyping(curString, curStrPos, numChars);
	          }
	          // end of character pause
	          if (_this2.temporaryPause) {
	            _this2.temporaryPause = false;
	            _this2.options.onTypingResumed(_this2.arrayPos, _this2);
	          }
	        }, pauseTime);
	
	        // humanized value for typing
	      }, humanize);
	    }
	
	    /**
	     * Continue to the next string & begin typing
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @private
	     */
	  }, {
	    key: 'keepTyping',
	    value: function keepTyping(curString, curStrPos, numChars) {
	      // call before functions if applicable
	      if (curStrPos === 0) {
	        this.toggleBlinking(false);
	        this.options.preStringTyped(this.arrayPos, this);
	      }
	      // start typing each new char into existing string
	      // curString: arg, this.el.html: original text inside element
	      curStrPos += numChars;
	      var nextString = curString.substr(0, curStrPos);
	      this.replaceText(nextString);
	      // loop the function
	      this.typewrite(curString, curStrPos);
	    }
	
	    /**
	     * We're done typing the current string
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @private
	     */
	  }, {
	    key: 'doneTyping',
	    value: function doneTyping(curString, curStrPos) {
	      var _this3 = this;
	
	      // fires callback function
	      this.options.onStringTyped(this.arrayPos, this);
	      this.toggleBlinking(true);
	      // is this the final string
	      if (this.arrayPos === this.strings.length - 1) {
	        // callback that occurs on the last typed string
	        this.complete();
	        // quit if we wont loop back
	        if (this.loop === false || this.curLoop === this.loopCount) {
	          return;
	        }
	      }
	      this.timeout = setTimeout(function () {
	        _this3.backspace(curString, curStrPos);
	      }, this.backDelay);
	    }
	
	    /**
	     * Backspaces 1 character at a time
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @private
	     */
	  }, {
	    key: 'backspace',
	    value: function backspace(curString, curStrPos) {
	      var _this4 = this;
	
	      if (this.pause.status === true) {
	        this.setPauseStatus(curString, curStrPos, true);
	        return;
	      }
	      if (this.fadeOut) return this.initFadeOut();
	
	      this.toggleBlinking(false);
	      var humanize = this.humanizer(this.backSpeed);
	
	      this.timeout = setTimeout(function () {
	        curStrPos = _htmlParserJs.htmlParser.backSpaceHtmlChars(curString, curStrPos, _this4);
	        // replace text with base text + typed characters
	        var curStringAtPosition = curString.substr(0, curStrPos);
	        _this4.replaceText(curStringAtPosition);
	
	        // if smartBack is enabled
	        if (_this4.smartBackspace) {
	          // the remaining part of the current string is equal of the same part of the new string
	          var nextString = _this4.strings[_this4.arrayPos + 1];
	          if (nextString && curStringAtPosition === nextString.substr(0, curStrPos)) {
	            _this4.stopNum = curStrPos;
	          } else {
	            _this4.stopNum = 0;
	          }
	        }
	
	        // if the number (id of character in current string) is
	        // less than the stop number, keep going
	        if (curStrPos > _this4.stopNum) {
	          // subtract characters one by one
	          curStrPos--;
	          // loop the function
	          _this4.backspace(curString, curStrPos);
	        } else if (curStrPos <= _this4.stopNum) {
	          // if the stop number has been reached, increase
	          // array position to next string
	          _this4.arrayPos++;
	          // When looping, begin at the beginning after backspace complete
	          if (_this4.arrayPos === _this4.strings.length) {
	            _this4.arrayPos = 0;
	            _this4.options.onLastStringBackspaced();
	            _this4.shuffleStringsIfNeeded();
	            _this4.begin();
	          } else {
	            _this4.typewrite(_this4.strings[_this4.sequence[_this4.arrayPos]], curStrPos);
	          }
	        }
	        // humanized value for typing
	      }, humanize);
	    }
	
	    /**
	     * Full animation is complete
	     * @private
	     */
	  }, {
	    key: 'complete',
	    value: function complete() {
	      this.options.onComplete(this);
	      if (this.loop) {
	        this.curLoop++;
	      } else {
	        this.typingComplete = true;
	      }
	    }
	
	    /**
	     * Has the typing been stopped
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @param {boolean} isTyping
	     * @private
	     */
	  }, {
	    key: 'setPauseStatus',
	    value: function setPauseStatus(curString, curStrPos, isTyping) {
	      this.pause.typewrite = isTyping;
	      this.pause.curString = curString;
	      this.pause.curStrPos = curStrPos;
	    }
	
	    /**
	     * Toggle the blinking cursor
	     * @param {boolean} isBlinking
	     * @private
	     */
	  }, {
	    key: 'toggleBlinking',
	    value: function toggleBlinking(isBlinking) {
	      if (!this.cursor) return;
	      // if in paused state, don't toggle blinking a 2nd time
	      if (this.pause.status) return;
	      if (this.cursorBlinking === isBlinking) return;
	      this.cursorBlinking = isBlinking;
	      if (isBlinking) {
	        this.cursor.classList.add('typed-cursor--blink');
	      } else {
	        this.cursor.classList.remove('typed-cursor--blink');
	      }
	    }
	
	    /**
	     * Speed in MS to type
	     * @param {number} speed
	     * @private
	     */
	  }, {
	    key: 'humanizer',
	    value: function humanizer(speed) {
	      return Math.round(Math.random() * speed / 2) + speed;
	    }
	
	    /**
	     * Shuffle the sequence of the strings array
	     * @private
	     */
	  }, {
	    key: 'shuffleStringsIfNeeded',
	    value: function shuffleStringsIfNeeded() {
	      if (!this.shuffle) return;
	      this.sequence = this.sequence.sort(function () {
	        return Math.random() - 0.5;
	      });
	    }
	
	    /**
	     * Adds a CSS class to fade out current string
	     * @private
	     */
	  }, {
	    key: 'initFadeOut',
	    value: function initFadeOut() {
	      var _this5 = this;
	
	      this.el.className += ' ' + this.fadeOutClass;
	      if (this.cursor) this.cursor.className += ' ' + this.fadeOutClass;
	      return setTimeout(function () {
	        _this5.arrayPos++;
	        _this5.replaceText('');
	
	        // Resets current string if end of loop reached
	        if (_this5.strings.length > _this5.arrayPos) {
	          _this5.typewrite(_this5.strings[_this5.sequence[_this5.arrayPos]], 0);
	        } else {
	          _this5.typewrite(_this5.strings[0], 0);
	          _this5.arrayPos = 0;
	        }
	      }, this.fadeOutDelay);
	    }
	
	    /**
	     * Replaces current text in the HTML element
	     * depending on element type
	     * @param {string} str
	     * @private
	     */
	  }, {
	    key: 'replaceText',
	    value: function replaceText(str) {
	      if (this.attr) {
	        this.el.setAttribute(this.attr, str);
	      } else {
	        if (this.isInput) {
	          this.el.value = str;
	        } else if (this.contentType === 'html') {
	          this.el.innerHTML = str;
	        } else {
	          this.el.textContent = str;
	        }
	      }
	    }
	
	    /**
	     * If using input elements, bind focus in order to
	     * start and stop the animation
	     * @private
	     */
	  }, {
	    key: 'bindFocusEvents',
	    value: function bindFocusEvents() {
	      var _this6 = this;
	
	      if (!this.isInput) return;
	      this.el.addEventListener('focus', function (e) {
	        _this6.stop();
	      });
	      this.el.addEventListener('blur', function (e) {
	        if (_this6.el.value && _this6.el.value.length !== 0) {
	          return;
	        }
	        _this6.start();
	      });
	    }
	
	    /**
	     * On init, insert the cursor element
	     * @private
	     */
	  }, {
	    key: 'insertCursor',
	    value: function insertCursor() {
	      if (!this.showCursor) return;
	      if (this.cursor) return;
	      this.cursor = document.createElement('span');
	      this.cursor.className = 'typed-cursor';
	      this.cursor.innerHTML = this.cursorChar;
	      this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling);
	    }
	  }]);
	
	  return Typed;
	})();
	
	exports['default'] = Typed;
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _defaultsJs = __webpack_require__(2);
	
	var _defaultsJs2 = _interopRequireDefault(_defaultsJs);
	
	/**
	 * Initialize the Typed object
	 */
	
	var Initializer = (function () {
	  function Initializer() {
	    _classCallCheck(this, Initializer);
	  }
	
	  _createClass(Initializer, [{
	    key: 'load',
	
	    /**
	     * Load up defaults & options on the Typed instance
	     * @param {Typed} self instance of Typed
	     * @param {object} options options object
	     * @param {string} elementId HTML element ID _OR_ instance of HTML element
	     * @private
	     */
	
	    value: function load(self, options, elementId) {
	      // chosen element to manipulate text
	      if (typeof elementId === 'string') {
	        self.el = document.querySelector(elementId);
	      } else {
	        self.el = elementId;
	      }
	
	      self.options = _extends({}, _defaultsJs2['default'], options);
	
	      // attribute to type into
	      self.isInput = self.el.tagName.toLowerCase() === 'input';
	      self.attr = self.options.attr;
	      self.bindInputFocusEvents = self.options.bindInputFocusEvents;
	
	      // show cursor
	      self.showCursor = self.isInput ? false : self.options.showCursor;
	
	      // custom cursor
	      self.cursorChar = self.options.cursorChar;
	
	      // Is the cursor blinking
	      self.cursorBlinking = true;
	
	      // text content of element
	      self.elContent = self.attr ? self.el.getAttribute(self.attr) : self.el.textContent;
	
	      // html or plain text
	      self.contentType = self.options.contentType;
	
	      // typing speed
	      self.typeSpeed = self.options.typeSpeed;
	
	      // add a delay before typing starts
	      self.startDelay = self.options.startDelay;
	
	      // backspacing speed
	      self.backSpeed = self.options.backSpeed;
	
	      // only backspace what doesn't match the previous string
	      self.smartBackspace = self.options.smartBackspace;
	
	      // amount of time to wait before backspacing
	      self.backDelay = self.options.backDelay;
	
	      // Fade out instead of backspace
	      self.fadeOut = self.options.fadeOut;
	      self.fadeOutClass = self.options.fadeOutClass;
	      self.fadeOutDelay = self.options.fadeOutDelay;
	
	      // variable to check whether typing is currently paused
	      self.isPaused = false;
	
	      // input strings of text
	      self.strings = self.options.strings.map(function (s) {
	        return s.trim();
	      });
	
	      // div containing strings
	      if (typeof self.options.stringsElement === 'string') {
	        self.stringsElement = document.querySelector(self.options.stringsElement);
	      } else {
	        self.stringsElement = self.options.stringsElement;
	      }
	
	      if (self.stringsElement) {
	        self.strings = [];
	        self.stringsElement.style.display = 'none';
	        var strings = Array.prototype.slice.apply(self.stringsElement.children);
	        var stringsLength = strings.length;
	
	        if (stringsLength) {
	          for (var i = 0; i < stringsLength; i += 1) {
	            var stringEl = strings[i];
	            self.strings.push(stringEl.innerHTML.trim());
	          }
	        }
	      }
	
	      // character number position of current string
	      self.strPos = 0;
	
	      // current array position
	      self.arrayPos = 0;
	
	      // index of string to stop backspacing on
	      self.stopNum = 0;
	
	      // Looping logic
	      self.loop = self.options.loop;
	      self.loopCount = self.options.loopCount;
	      self.curLoop = 0;
	
	      // shuffle the strings
	      self.shuffle = self.options.shuffle;
	      // the order of strings
	      self.sequence = [];
	
	      self.pause = {
	        status: false,
	        typewrite: true,
	        curString: '',
	        curStrPos: 0
	      };
	
	      // When the typing is complete (when not looped)
	      self.typingComplete = false;
	
	      // Set the order in which the strings are typed
	      for (var i in self.strings) {
	        self.sequence[i] = i;
	      }
	
	      // If there is some text in the element
	      self.currentElContent = this.getCurrentElContent(self);
	
	      self.autoInsertCss = self.options.autoInsertCss;
	
	      this.appendAnimationCss(self);
	    }
	  }, {
	    key: 'getCurrentElContent',
	    value: function getCurrentElContent(self) {
	      var elContent = '';
	      if (self.attr) {
	        elContent = self.el.getAttribute(self.attr);
	      } else if (self.isInput) {
	        elContent = self.el.value;
	      } else if (self.contentType === 'html') {
	        elContent = self.el.innerHTML;
	      } else {
	        elContent = self.el.textContent;
	      }
	      return elContent;
	    }
	  }, {
	    key: 'appendAnimationCss',
	    value: function appendAnimationCss(self) {
	      var cssDataName = 'data-typed-js-css';
	      if (!self.autoInsertCss) {
	        return;
	      }
	      if (!self.showCursor && !self.fadeOut) {
	        return;
	      }
	      if (document.querySelector('[' + cssDataName + ']')) {
	        return;
	      }
	
	      var css = document.createElement('style');
	      css.type = 'text/css';
	      css.setAttribute(cssDataName, true);
	
	      var innerCss = '';
	      if (self.showCursor) {
	        innerCss += '\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      ';
	      }
	      if (self.fadeOut) {
	        innerCss += '\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      ';
	      }
	      if (css.length === 0) {
	        return;
	      }
	      css.innerHTML = innerCss;
	      document.body.appendChild(css);
	    }
	  }]);
	
	  return Initializer;
	})();
	
	exports['default'] = Initializer;
	var initializer = new Initializer();
	exports.initializer = initializer;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/**
	 * Defaults & options
	 * @returns {object} Typed defaults & options
	 * @public
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var defaults = {
	  /**
	   * @property {array} strings strings to be typed
	   * @property {string} stringsElement ID of element containing string children
	   */
	  strings: ['These are the default values...', 'You know what you should do?', 'Use your own!', 'Have a great day!'],
	  stringsElement: null,
	
	  /**
	   * @property {number} typeSpeed type speed in milliseconds
	   */
	  typeSpeed: 0,
	
	  /**
	   * @property {number} startDelay time before typing starts in milliseconds
	   */
	  startDelay: 0,
	
	  /**
	   * @property {number} backSpeed backspacing speed in milliseconds
	   */
	  backSpeed: 0,
	
	  /**
	   * @property {boolean} smartBackspace only backspace what doesn't match the previous string
	   */
	  smartBackspace: true,
	
	  /**
	   * @property {boolean} shuffle shuffle the strings
	   */
	  shuffle: false,
	
	  /**
	   * @property {number} backDelay time before backspacing in milliseconds
	   */
	  backDelay: 700,
	
	  /**
	   * @property {boolean} fadeOut Fade out instead of backspace
	   * @property {string} fadeOutClass css class for fade animation
	   * @property {boolean} fadeOutDelay Fade out delay in milliseconds
	   */
	  fadeOut: false,
	  fadeOutClass: 'typed-fade-out',
	  fadeOutDelay: 500,
	
	  /**
	   * @property {boolean} loop loop strings
	   * @property {number} loopCount amount of loops
	   */
	  loop: false,
	  loopCount: Infinity,
	
	  /**
	   * @property {boolean} showCursor show cursor
	   * @property {string} cursorChar character for cursor
	   * @property {boolean} autoInsertCss insert CSS for cursor and fadeOut into HTML <head>
	   */
	  showCursor: true,
	  cursorChar: '|',
	  autoInsertCss: true,
	
	  /**
	   * @property {string} attr attribute for typing
	   * Ex: input placeholder, value, or just HTML text
	   */
	  attr: null,
	
	  /**
	   * @property {boolean} bindInputFocusEvents bind to focus and blur if el is text input
	   */
	  bindInputFocusEvents: false,
	
	  /**
	   * @property {string} contentType 'html' or 'null' for plaintext
	   */
	  contentType: 'html',
	
	  /**
	   * Before it begins typing
	   * @param {Typed} self
	   */
	  onBegin: function onBegin(self) {},
	
	  /**
	   * All typing is complete
	   * @param {Typed} self
	   */
	  onComplete: function onComplete(self) {},
	
	  /**
	   * Before each string is typed
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  preStringTyped: function preStringTyped(arrayPos, self) {},
	
	  /**
	   * After each string is typed
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onStringTyped: function onStringTyped(arrayPos, self) {},
	
	  /**
	   * During looping, after last string is typed
	   * @param {Typed} self
	   */
	  onLastStringBackspaced: function onLastStringBackspaced(self) {},
	
	  /**
	   * Typing has been stopped
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onTypingPaused: function onTypingPaused(arrayPos, self) {},
	
	  /**
	   * Typing has been started after being stopped
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onTypingResumed: function onTypingResumed(arrayPos, self) {},
	
	  /**
	   * After reset
	   * @param {Typed} self
	   */
	  onReset: function onReset(self) {},
	
	  /**
	   * After stop
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onStop: function onStop(arrayPos, self) {},
	
	  /**
	   * After start
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onStart: function onStart(arrayPos, self) {},
	
	  /**
	   * After destroy
	   * @param {Typed} self
	   */
	  onDestroy: function onDestroy(self) {}
	};
	
	exports['default'] = defaults;
	module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/**
	 * TODO: These methods can probably be combined somehow
	 * Parse HTML tags & HTML Characters
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var HTMLParser = (function () {
	  function HTMLParser() {
	    _classCallCheck(this, HTMLParser);
	  }
	
	  _createClass(HTMLParser, [{
	    key: 'typeHtmlChars',
	
	    /**
	     * Type HTML tags & HTML Characters
	     * @param {string} curString Current string
	     * @param {number} curStrPos Position in current string
	     * @param {Typed} self instance of Typed
	     * @returns {number} a new string position
	     * @private
	     */
	
	    value: function typeHtmlChars(curString, curStrPos, self) {
	      if (self.contentType !== 'html') return curStrPos;
	      var curChar = curString.substr(curStrPos).charAt(0);
	      if (curChar === '<' || curChar === '&') {
	        var endTag = '';
	        if (curChar === '<') {
	          endTag = '>';
	        } else {
	          endTag = ';';
	        }
	        while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
	          curStrPos++;
	          if (curStrPos + 1 > curString.length) {
	            break;
	          }
	        }
	        curStrPos++;
	      }
	      return curStrPos;
	    }
	
	    /**
	     * Backspace HTML tags and HTML Characters
	     * @param {string} curString Current string
	     * @param {number} curStrPos Position in current string
	     * @param {Typed} self instance of Typed
	     * @returns {number} a new string position
	     * @private
	     */
	  }, {
	    key: 'backSpaceHtmlChars',
	    value: function backSpaceHtmlChars(curString, curStrPos, self) {
	      if (self.contentType !== 'html') return curStrPos;
	      var curChar = curString.substr(curStrPos).charAt(0);
	      if (curChar === '>' || curChar === ';') {
	        var endTag = '';
	        if (curChar === '>') {
	          endTag = '<';
	        } else {
	          endTag = '&';
	        }
	        while (curString.substr(curStrPos - 1).charAt(0) !== endTag) {
	          curStrPos--;
	          if (curStrPos < 0) {
	            break;
	          }
	        }
	        curStrPos--;
	      }
	      return curStrPos;
	    }
	  }]);
	
	  return HTMLParser;
	})();
	
	exports['default'] = HTMLParser;
	var htmlParser = new HTMLParser();
	exports.htmlParser = htmlParser;

/***/ })
/******/ ])
});
;
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.AOS=t():e.AOS=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="dist/",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=n(1),a=(o(r),n(6)),u=o(a),c=n(7),s=o(c),f=n(8),d=o(f),l=n(9),p=o(l),m=n(10),b=o(m),v=n(11),y=o(v),g=n(14),h=o(g),w=[],k=!1,x={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded",throttleDelay:99,debounceDelay:50,disableMutationObserver:!1},j=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e&&(k=!0),k)return w=(0,y.default)(w,x),(0,b.default)(w,x.once),w},O=function(){w=(0,h.default)(),j()},M=function(){w.forEach(function(e,t){e.node.removeAttribute("data-aos"),e.node.removeAttribute("data-aos-easing"),e.node.removeAttribute("data-aos-duration"),e.node.removeAttribute("data-aos-delay")})},S=function(e){return e===!0||"mobile"===e&&p.default.mobile()||"phone"===e&&p.default.phone()||"tablet"===e&&p.default.tablet()||"function"==typeof e&&e()===!0},_=function(e){x=i(x,e),w=(0,h.default)();var t=document.all&&!window.atob;return S(x.disable)||t?M():(x.disableMutationObserver||d.default.isSupported()||(console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '),x.disableMutationObserver=!0),document.querySelector("body").setAttribute("data-aos-easing",x.easing),document.querySelector("body").setAttribute("data-aos-duration",x.duration),document.querySelector("body").setAttribute("data-aos-delay",x.delay),"DOMContentLoaded"===x.startEvent&&["complete","interactive"].indexOf(document.readyState)>-1?j(!0):"load"===x.startEvent?window.addEventListener(x.startEvent,function(){j(!0)}):document.addEventListener(x.startEvent,function(){j(!0)}),window.addEventListener("resize",(0,s.default)(j,x.debounceDelay,!0)),window.addEventListener("orientationchange",(0,s.default)(j,x.debounceDelay,!0)),window.addEventListener("scroll",(0,u.default)(function(){(0,b.default)(w,x.once)},x.throttleDelay)),x.disableMutationObserver||d.default.ready("[data-aos]",O),w)};e.exports={init:_,refresh:j,refreshHard:O}},function(e,t){},,,,,function(e,t){(function(t){"use strict";function n(e,t,n){function o(t){var n=b,o=v;return b=v=void 0,k=t,g=e.apply(o,n)}function r(e){return k=e,h=setTimeout(f,t),M?o(e):g}function a(e){var n=e-w,o=e-k,i=t-n;return S?j(i,y-o):i}function c(e){var n=e-w,o=e-k;return void 0===w||n>=t||n<0||S&&o>=y}function f(){var e=O();return c(e)?d(e):void(h=setTimeout(f,a(e)))}function d(e){return h=void 0,_&&b?o(e):(b=v=void 0,g)}function l(){void 0!==h&&clearTimeout(h),k=0,b=w=v=h=void 0}function p(){return void 0===h?g:d(O())}function m(){var e=O(),n=c(e);if(b=arguments,v=this,w=e,n){if(void 0===h)return r(w);if(S)return h=setTimeout(f,t),o(w)}return void 0===h&&(h=setTimeout(f,t)),g}var b,v,y,g,h,w,k=0,M=!1,S=!1,_=!0;if("function"!=typeof e)throw new TypeError(s);return t=u(t)||0,i(n)&&(M=!!n.leading,S="maxWait"in n,y=S?x(u(n.maxWait)||0,t):y,_="trailing"in n?!!n.trailing:_),m.cancel=l,m.flush=p,m}function o(e,t,o){var r=!0,a=!0;if("function"!=typeof e)throw new TypeError(s);return i(o)&&(r="leading"in o?!!o.leading:r,a="trailing"in o?!!o.trailing:a),n(e,t,{leading:r,maxWait:t,trailing:a})}function i(e){var t="undefined"==typeof e?"undefined":c(e);return!!e&&("object"==t||"function"==t)}function r(e){return!!e&&"object"==("undefined"==typeof e?"undefined":c(e))}function a(e){return"symbol"==("undefined"==typeof e?"undefined":c(e))||r(e)&&k.call(e)==d}function u(e){if("number"==typeof e)return e;if(a(e))return f;if(i(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=i(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(l,"");var n=m.test(e);return n||b.test(e)?v(e.slice(2),n?2:8):p.test(e)?f:+e}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s="Expected a function",f=NaN,d="[object Symbol]",l=/^\s+|\s+$/g,p=/^[-+]0x[0-9a-f]+$/i,m=/^0b[01]+$/i,b=/^0o[0-7]+$/i,v=parseInt,y="object"==("undefined"==typeof t?"undefined":c(t))&&t&&t.Object===Object&&t,g="object"==("undefined"==typeof self?"undefined":c(self))&&self&&self.Object===Object&&self,h=y||g||Function("return this")(),w=Object.prototype,k=w.toString,x=Math.max,j=Math.min,O=function(){return h.Date.now()};e.exports=o}).call(t,function(){return this}())},function(e,t){(function(t){"use strict";function n(e,t,n){function i(t){var n=b,o=v;return b=v=void 0,O=t,g=e.apply(o,n)}function r(e){return O=e,h=setTimeout(f,t),M?i(e):g}function u(e){var n=e-w,o=e-O,i=t-n;return S?x(i,y-o):i}function s(e){var n=e-w,o=e-O;return void 0===w||n>=t||n<0||S&&o>=y}function f(){var e=j();return s(e)?d(e):void(h=setTimeout(f,u(e)))}function d(e){return h=void 0,_&&b?i(e):(b=v=void 0,g)}function l(){void 0!==h&&clearTimeout(h),O=0,b=w=v=h=void 0}function p(){return void 0===h?g:d(j())}function m(){var e=j(),n=s(e);if(b=arguments,v=this,w=e,n){if(void 0===h)return r(w);if(S)return h=setTimeout(f,t),i(w)}return void 0===h&&(h=setTimeout(f,t)),g}var b,v,y,g,h,w,O=0,M=!1,S=!1,_=!0;if("function"!=typeof e)throw new TypeError(c);return t=a(t)||0,o(n)&&(M=!!n.leading,S="maxWait"in n,y=S?k(a(n.maxWait)||0,t):y,_="trailing"in n?!!n.trailing:_),m.cancel=l,m.flush=p,m}function o(e){var t="undefined"==typeof e?"undefined":u(e);return!!e&&("object"==t||"function"==t)}function i(e){return!!e&&"object"==("undefined"==typeof e?"undefined":u(e))}function r(e){return"symbol"==("undefined"==typeof e?"undefined":u(e))||i(e)&&w.call(e)==f}function a(e){if("number"==typeof e)return e;if(r(e))return s;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(d,"");var n=p.test(e);return n||m.test(e)?b(e.slice(2),n?2:8):l.test(e)?s:+e}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c="Expected a function",s=NaN,f="[object Symbol]",d=/^\s+|\s+$/g,l=/^[-+]0x[0-9a-f]+$/i,p=/^0b[01]+$/i,m=/^0o[0-7]+$/i,b=parseInt,v="object"==("undefined"==typeof t?"undefined":u(t))&&t&&t.Object===Object&&t,y="object"==("undefined"==typeof self?"undefined":u(self))&&self&&self.Object===Object&&self,g=v||y||Function("return this")(),h=Object.prototype,w=h.toString,k=Math.max,x=Math.min,j=function(){return g.Date.now()};e.exports=n}).call(t,function(){return this}())},function(e,t){"use strict";function n(e){var t=void 0,o=void 0,i=void 0;for(t=0;t<e.length;t+=1){if(o=e[t],o.dataset&&o.dataset.aos)return!0;if(i=o.children&&n(o.children))return!0}return!1}function o(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}function i(){return!!o()}function r(e,t){var n=window.document,i=o(),r=new i(a);u=t,r.observe(n.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}function a(e){e&&e.forEach(function(e){var t=Array.prototype.slice.call(e.addedNodes),o=Array.prototype.slice.call(e.removedNodes),i=t.concat(o);if(n(i))return u()})}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){};t.default={isSupported:i,ready:r}},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(){return navigator.userAgent||navigator.vendor||window.opera||""}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,a=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,u=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,c=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,s=function(){function e(){n(this,e)}return i(e,[{key:"phone",value:function(){var e=o();return!(!r.test(e)&&!a.test(e.substr(0,4)))}},{key:"mobile",value:function(){var e=o();return!(!u.test(e)&&!c.test(e.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),e}();t.default=new s},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t,n){var o=e.node.getAttribute("data-aos-once");t>e.position?e.node.classList.add("aos-animate"):"undefined"!=typeof o&&("false"===o||!n&&"true"!==o)&&e.node.classList.remove("aos-animate")},o=function(e,t){var o=window.pageYOffset,i=window.innerHeight;e.forEach(function(e,r){n(e,i+o,t)})};t.default=o},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(12),r=o(i),a=function(e,t){return e.forEach(function(e,n){e.node.classList.add("aos-init"),e.position=(0,r.default)(e.node,t.offset)}),e};t.default=a},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(13),r=o(i),a=function(e,t){var n=0,o=0,i=window.innerHeight,a={offset:e.getAttribute("data-aos-offset"),anchor:e.getAttribute("data-aos-anchor"),anchorPlacement:e.getAttribute("data-aos-anchor-placement")};switch(a.offset&&!isNaN(a.offset)&&(o=parseInt(a.offset)),a.anchor&&document.querySelectorAll(a.anchor)&&(e=document.querySelectorAll(a.anchor)[0]),n=(0,r.default)(e).top,a.anchorPlacement){case"top-bottom":break;case"center-bottom":n+=e.offsetHeight/2;break;case"bottom-bottom":n+=e.offsetHeight;break;case"top-center":n+=i/2;break;case"bottom-center":n+=i/2+e.offsetHeight;break;case"center-center":n+=i/2+e.offsetHeight/2;break;case"top-top":n+=i;break;case"bottom-top":n+=e.offsetHeight+i;break;case"center-top":n+=e.offsetHeight/2+i}return a.anchorPlacement||a.offset||isNaN(t)||(o=t),n+o};t.default=a},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){for(var t=0,n=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft-("BODY"!=e.tagName?e.scrollLeft:0),n+=e.offsetTop-("BODY"!=e.tagName?e.scrollTop:0),e=e.offsetParent;return{top:n,left:t}};t.default=n},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e=e||document.querySelectorAll("[data-aos]"),Array.prototype.map.call(e,function(e){return{node:e}})};t.default=n}])});
/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.8
 *
 */
(function($) {

  $.fn.extend({
    slimScroll: function(options) {

      var defaults = {

        // width in pixels of the visible scroll area
        width : 'auto',

        // height in pixels of the visible scroll area
        height : '250px',

        // width in pixels of the scrollbar and rail
        size : '7px',

        // scrollbar color, accepts any hex/color value
        color: '#000',

        // scrollbar position - left/right
        position : 'right',

        // distance in pixels between the side edge and the scrollbar
        distance : '1px',

        // default scroll position on load - top / bottom / $('selector')
        start : 'top',

        // sets scrollbar opacity
        opacity : .4,

        // enables always-on mode for the scrollbar
        alwaysVisible : false,

        // check if we should hide the scrollbar when user is hovering over
        disableFadeOut : false,

        // sets visibility of the rail
        railVisible : false,

        // sets rail color
        railColor : '#333',

        // sets rail opacity
        railOpacity : .2,

        // whether  we should use jQuery UI Draggable to enable bar dragging
        railDraggable : true,

        // defautlt CSS class of the slimscroll rail
        railClass : 'slimScrollRail',

        // defautlt CSS class of the slimscroll bar
        barClass : 'slimScrollBar',

        // defautlt CSS class of the slimscroll wrapper
        wrapperClass : 'slimScrollDiv',

        // check if mousewheel should scroll the window if we reach top/bottom
        allowPageScroll : false,

        // scroll amount applied to each mouse wheel step
        wheelStep : 20,

        // scroll amount applied when user is using gestures
        touchScrollStep : 200,

        // sets border radius
        borderRadius: '7px',

        // sets border radius of the rail
        railBorderRadius : '7px'
      };

      var o = $.extend(defaults, options);

      // do it for every element that matches selector
      this.each(function(){

      var isOverPanel, isOverBar, isDragg, queueHide, touchDif,
        barHeight, percentScroll, lastScroll,
        divS = '<div></div>',
        minBarHeight = 30,
        releaseScroll = false;

        // used in event handlers and for better minification
        var me = $(this);

        // ensure we are not binding it again
        if (me.parent().hasClass(o.wrapperClass))
        {
            // start from last bar position
            var offset = me.scrollTop();

            // find bar and rail
            bar = me.siblings('.' + o.barClass);
            rail = me.siblings('.' + o.railClass);

            getBarHeight();

            // check if we should scroll existing instance
            if ($.isPlainObject(options))
            {
              // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
              if ( 'height' in options && options.height == 'auto' ) {
                me.parent().css('height', 'auto');
                me.css('height', 'auto');
                var height = me.parent().parent().height();
                me.parent().css('height', height);
                me.css('height', height);
              } else if ('height' in options) {
                var h = options.height;
                me.parent().css('height', h);
                me.css('height', h);
              }

              if ('scrollTo' in options)
              {
                // jump to a static point
                offset = parseInt(o.scrollTo);
              }
              else if ('scrollBy' in options)
              {
                // jump by value pixels
                offset += parseInt(o.scrollBy);
              }
              else if ('destroy' in options)
              {
                // remove slimscroll elements
                bar.remove();
                rail.remove();
                me.unwrap();
                return;
              }

              // scroll content by the given offset
              scrollContent(offset, false, true);
            }

            return;
        }
        else if ($.isPlainObject(options))
        {
            if ('destroy' in options)
            {
            	return;
            }
        }

        // optionally set height to the parent's height
        o.height = (o.height == 'auto') ? me.parent().height() : o.height;

        // wrap content
        var wrapper = $(divS)
          .addClass(o.wrapperClass)
          .css({
            position: 'relative',
            overflow: 'hidden',
            width: o.width,
            height: o.height
          });

        // update style for the div
        me.css({
          overflow: 'hidden',
          width: o.width,
          height: o.height
        });

        // create scrollbar rail
        var rail = $(divS)
          .addClass(o.railClass)
          .css({
            width: o.size,
            height: '100%',
            position: 'absolute',
            top: 0,
            display: (o.alwaysVisible && o.railVisible) ? 'block' : 'none',
            'border-radius': o.railBorderRadius,
            background: o.railColor,
            opacity: o.railOpacity,
            zIndex: 90
          });

        // create scrollbar
        var bar = $(divS)
          .addClass(o.barClass)
          .css({
            background: o.color,
            width: o.size,
            position: 'absolute',
            top: 0,
            opacity: o.opacity,
            display: o.alwaysVisible ? 'block' : 'none',
            'border-radius' : o.borderRadius,
            BorderRadius: o.borderRadius,
            MozBorderRadius: o.borderRadius,
            WebkitBorderRadius: o.borderRadius,
            zIndex: 99
          });

        // set position
        var posCss = (o.position == 'right') ? { right: o.distance } : { left: o.distance };
        rail.css(posCss);
        bar.css(posCss);

        // wrap it
        me.wrap(wrapper);

        // append to parent div
        me.parent().append(bar);
        me.parent().append(rail);

        // make it draggable and no longer dependent on the jqueryUI
        if (o.railDraggable){
          bar.bind("mousedown", function(e) {
            var $doc = $(document);
            isDragg = true;
            t = parseFloat(bar.css('top'));
            pageY = e.pageY;

            $doc.bind("mousemove.slimscroll", function(e){
              currTop = t + e.pageY - pageY;
              bar.css('top', currTop);
              scrollContent(0, bar.position().top, false);// scroll content
            });

            $doc.bind("mouseup.slimscroll", function(e) {
              isDragg = false;hideBar();
              $doc.unbind('.slimscroll');
            });
            return false;
          }).bind("selectstart.slimscroll", function(e){
            e.stopPropagation();
            e.preventDefault();
            return false;
          });
        }

        // on rail over
        rail.hover(function(){
          showBar();
        }, function(){
          hideBar();
        });

        // on bar over
        bar.hover(function(){
          isOverBar = true;
        }, function(){
          isOverBar = false;
        });

        // show on parent mouseover
        me.hover(function(){
          isOverPanel = true;
          showBar();
          hideBar();
        }, function(){
          isOverPanel = false;
          hideBar();
        });

        // support for mobile
        me.bind('touchstart', function(e,b){
          if (e.originalEvent.touches.length)
          {
            // record where touch started
            touchDif = e.originalEvent.touches[0].pageY;
          }
        });

        me.bind('touchmove', function(e){
          // prevent scrolling the page if necessary
          if(!releaseScroll)
          {
  		      e.originalEvent.preventDefault();
		      }
          if (e.originalEvent.touches.length)
          {
            // see how far user swiped
            var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
            // scroll content
            scrollContent(diff, true);
            touchDif = e.originalEvent.touches[0].pageY;
          }
        });

        // set up initial height
        getBarHeight();

        // check start position
        if (o.start === 'bottom')
        {
          // scroll content to bottom
          bar.css({ top: me.outerHeight() - bar.outerHeight() });
          scrollContent(0, true);
        }
        else if (o.start !== 'top')
        {
          // assume jQuery selector
          scrollContent($(o.start).position().top, null, true);

          // make sure bar stays hidden
          if (!o.alwaysVisible) { bar.hide(); }
        }

        // attach scroll events
        attachWheel(this);

        function _onWheel(e)
        {
          // use mouse wheel only when mouse is over
          if (!isOverPanel) { return; }

          var e = e || window.event;

          var delta = 0;
          if (e.wheelDelta) { delta = -e.wheelDelta/120; }
          if (e.detail) { delta = e.detail / 3; }

          var target = e.target || e.srcTarget || e.srcElement;
          if ($(target).closest('.' + o.wrapperClass).is(me.parent())) {
            // scroll content
            scrollContent(delta, true);
          }

          // stop window scroll
          if (e.preventDefault && !releaseScroll) { e.preventDefault(); }
          if (!releaseScroll) { e.returnValue = false; }
        }

        function scrollContent(y, isWheel, isJump)
        {
          releaseScroll = false;
          var delta = y;
          var maxTop = me.outerHeight() - bar.outerHeight();

          if (isWheel)
          {
            // move bar with mouse wheel
            delta = parseInt(bar.css('top')) + y * parseInt(o.wheelStep) / 100 * bar.outerHeight();

            // move bar, make sure it doesn't go out
            delta = Math.min(Math.max(delta, 0), maxTop);

            // if scrolling down, make sure a fractional change to the
            // scroll position isn't rounded away when the scrollbar's CSS is set
            // this flooring of delta would happened automatically when
            // bar.css is set below, but we floor here for clarity
            delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);

            // scroll the scrollbar
            bar.css({ top: delta + 'px' });
          }

          // calculate actual scroll amount
          percentScroll = parseInt(bar.css('top')) / (me.outerHeight() - bar.outerHeight());
          delta = percentScroll * (me[0].scrollHeight - me.outerHeight());

          if (isJump)
          {
            delta = y;
            var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
            offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
            bar.css({ top: offsetTop + 'px' });
          }

          // scroll content
          me.scrollTop(delta);

          // fire scrolling event
          me.trigger('slimscrolling', ~~delta);

          // ensure bar is visible
          showBar();

          // trigger hide when scroll is stopped
          hideBar();
        }

        function attachWheel(target)
        {
          if (window.addEventListener)
          {
            target.addEventListener('DOMMouseScroll', _onWheel, false );
            target.addEventListener('mousewheel', _onWheel, false );
          }
          else
          {
            document.attachEvent("onmousewheel", _onWheel)
          }
        }

        function getBarHeight()
        {
          // calculate scrollbar height and make sure it is not too small
          barHeight = Math.max((me.outerHeight() / me[0].scrollHeight) * me.outerHeight(), minBarHeight);
          bar.css({ height: barHeight + 'px' });

          // hide scrollbar if content is not long enough
          var display = barHeight == me.outerHeight() ? 'none' : 'block';
          bar.css({ display: display });
        }

        function showBar()
        {
          // recalculate bar height
          getBarHeight();
          clearTimeout(queueHide);

          // when bar reached top or bottom
          if (percentScroll == ~~percentScroll)
          {
            //release wheel
            releaseScroll = o.allowPageScroll;

            // publish approporiate event
            if (lastScroll != percentScroll)
            {
                var msg = (~~percentScroll == 0) ? 'top' : 'bottom';
                me.trigger('slimscroll', msg);
            }
          }
          else
          {
            releaseScroll = false;
          }
          lastScroll = percentScroll;

          // show only when required
          if(barHeight >= me.outerHeight()) {
            //allow window scroll
            releaseScroll = true;
            return;
          }
          bar.stop(true,true).fadeIn('fast');
          if (o.railVisible) { rail.stop(true,true).fadeIn('fast'); }
        }

        function hideBar()
        {
          // only hide when options allow it
          if (!o.alwaysVisible)
          {
            queueHide = setTimeout(function(){
              if (!(o.disableFadeOut && isOverPanel) && !isOverBar && !isDragg)
              {
                bar.fadeOut('slow');
                rail.fadeOut('slow');
              }
            }, 1000);
          }
        }

      });

      // maintain chainability
      return this;
    }
  });

  $.fn.extend({
    slimscroll: $.fn.slimScroll
  });

})(jQuery);

/*!
 * Nestable jQuery Plugin - Copyright (c) 2012 David Bushell - http://dbushell.com/
 * Dual-licensed under the BSD or MIT licenses
 */
;(function($, window, document, undefined)
{
    var hasTouch = 'ontouchstart' in document;

    /**
     * Detect CSS pointer-events property
     * events are normally disabled on the dragging element to avoid conflicts
     * https://github.com/ausi/Feature-detection-technique-for-pointer-events/blob/master/modernizr-pointerevents.js
     */
    var hasPointerEvents = (function()
    {
        var el    = document.createElement('div'),
            docEl = document.documentElement;
        if (!('pointerEvents' in el.style)) {
            return false;
        }
        el.style.pointerEvents = 'auto';
        el.style.pointerEvents = 'x';
        docEl.appendChild(el);
        var supports = window.getComputedStyle && window.getComputedStyle(el, '').pointerEvents === 'auto';
        docEl.removeChild(el);
        return !!supports;
    })();

    var defaults = {
            listNodeName    : 'ol',
            itemNodeName    : 'li',
            rootClass       : 'dd',
            listClass       : 'dd-list',
            itemClass       : 'dd-item',
            dragClass       : 'dd-dragel',
            handleClass     : 'dd-handle',
            collapsedClass  : 'dd-collapsed',
            placeClass      : 'dd-placeholder',
            noDragClass     : 'dd-nodrag',
            emptyClass      : 'dd-empty',
            expandBtnHTML   : '<button data-action="expand" type="button">Expand</button>',
            collapseBtnHTML : '<button data-action="collapse" type="button">Collapse</button>',
            group           : 0,
            maxDepth        : 5,
            threshold       : 20
        };

    function Plugin(element, options)
    {
        this.w  = $(document);
        this.el = $(element);
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    Plugin.prototype = {

        init: function()
        {
            var list = this;

            list.reset();

            list.el.data('nestable-group', this.options.group);

            list.placeEl = $('<div class="' + list.options.placeClass + '"/>');

            $.each(this.el.find(list.options.itemNodeName), function(k, el) {
                list.setParent($(el));
            });

            list.el.on('click', 'button', function(e) {
                if (list.dragEl) {
                    return;
                }
                var target = $(e.currentTarget),
                    action = target.data('action'),
                    item   = target.parent(list.options.itemNodeName);
                if (action === 'collapse') {
                    list.collapseItem(item);
                }
                if (action === 'expand') {
                    list.expandItem(item);
                }
            });

            var onStartEvent = function(e)
            {
                var handle = $(e.target);
                if (!handle.hasClass(list.options.handleClass)) {
                    if (handle.closest('.' + list.options.noDragClass).length) {
                        return;
                    }
                    handle = handle.closest('.' + list.options.handleClass);
                }

                if (!handle.length || list.dragEl) {
                    return;
                }

                list.isTouch = /^touch/.test(e.type);
                if (list.isTouch && e.touches.length !== 1) {
                    return;
                }

                e.preventDefault();
                list.dragStart(e.touches ? e.touches[0] : e);
            };

            var onMoveEvent = function(e)
            {
                if (list.dragEl) {
                    e.preventDefault();
                    list.dragMove(e.touches ? e.touches[0] : e);
                }
            };

            var onEndEvent = function(e)
            {
                if (list.dragEl) {
                    e.preventDefault();
                    list.dragStop(e.touches ? e.touches[0] : e);
                }
            };

            if (hasTouch) {
                list.el[0].addEventListener('touchstart', onStartEvent, false);
                window.addEventListener('touchmove', onMoveEvent, false);
                window.addEventListener('touchend', onEndEvent, false);
                window.addEventListener('touchcancel', onEndEvent, false);
            }

            list.el.on('mousedown', onStartEvent);
            list.w.on('mousemove', onMoveEvent);
            list.w.on('mouseup', onEndEvent);

        },

        serialize: function()
        {
            var data,
                depth = 0,
                list  = this;
                step  = function(level, depth)
                {
                    var array = [ ],
                        items = level.children(list.options.itemNodeName);
                    items.each(function()
                    {
                        var li   = $(this),
                            item = $.extend({}, li.data()),
                            sub  = li.children(list.options.listNodeName);
                        if (sub.length) {
                            item.children = step(sub, depth + 1);
                        }
                        array.push(item);
                    });
                    return array;
                };
            data = step(list.el.find(list.options.listNodeName).first(), depth);
            return data;
        },

        serialise: function()
        {
            return this.serialize();
        },

        reset: function()
        {
            this.mouse = {
                offsetX   : 0,
                offsetY   : 0,
                startX    : 0,
                startY    : 0,
                lastX     : 0,
                lastY     : 0,
                nowX      : 0,
                nowY      : 0,
                distX     : 0,
                distY     : 0,
                dirAx     : 0,
                dirX      : 0,
                dirY      : 0,
                lastDirX  : 0,
                lastDirY  : 0,
                distAxX   : 0,
                distAxY   : 0
            };
            this.isTouch    = false;
            this.moving     = false;
            this.dragEl     = null;
            this.dragRootEl = null;
            this.dragDepth  = 0;
            this.hasNewRoot = false;
            this.pointEl    = null;
        },

        expandItem: function(li)
        {
            li.removeClass(this.options.collapsedClass);
            li.children('[data-action="expand"]').hide();
            li.children('[data-action="collapse"]').show();
            li.children(this.options.listNodeName).show();
        },

        collapseItem: function(li)
        {
            var lists = li.children(this.options.listNodeName);
            if (lists.length) {
                li.addClass(this.options.collapsedClass);
                li.children('[data-action="collapse"]').hide();
                li.children('[data-action="expand"]').show();
                li.children(this.options.listNodeName).hide();
            }
        },

        expandAll: function()
        {
            var list = this;
            list.el.find(list.options.itemNodeName).each(function() {
                list.expandItem($(this));
            });
        },

        collapseAll: function()
        {
            var list = this;
            list.el.find(list.options.itemNodeName).each(function() {
                list.collapseItem($(this));
            });
        },

        setParent: function(li)
        {
            if (li.children(this.options.listNodeName).length) {
                li.prepend($(this.options.expandBtnHTML));
                li.prepend($(this.options.collapseBtnHTML));
            }
            li.children('[data-action="expand"]').hide();
        },

        unsetParent: function(li)
        {
            li.removeClass(this.options.collapsedClass);
            li.children('[data-action]').remove();
            li.children(this.options.listNodeName).remove();
        },

        dragStart: function(e)
        {
            var mouse    = this.mouse,
                target   = $(e.target),
                dragItem = target.closest(this.options.itemNodeName);

            this.placeEl.css('height', dragItem.height());

            mouse.offsetX = e.offsetX !== undefined ? e.offsetX : e.pageX - target.offset().left;
            mouse.offsetY = e.offsetY !== undefined ? e.offsetY : e.pageY - target.offset().top;
            mouse.startX = mouse.lastX = e.pageX;
            mouse.startY = mouse.lastY = e.pageY;

            this.dragRootEl = this.el;

            this.dragEl = $(document.createElement(this.options.listNodeName)).addClass(this.options.listClass + ' ' + this.options.dragClass);
            this.dragEl.css('width', dragItem.width());

            dragItem.after(this.placeEl);
            dragItem[0].parentNode.removeChild(dragItem[0]);
            dragItem.appendTo(this.dragEl);

            $(document.body).append(this.dragEl);
            this.dragEl.css({
                'left' : e.pageX - mouse.offsetX,
                'top'  : e.pageY - mouse.offsetY
            });
            // total depth of dragging item
            var i, depth,
                items = this.dragEl.find(this.options.itemNodeName);
            for (i = 0; i < items.length; i++) {
                depth = $(items[i]).parents(this.options.listNodeName).length;
                if (depth > this.dragDepth) {
                    this.dragDepth = depth;
                }
            }
        },

        dragStop: function(e)
        {
            var el = this.dragEl.children(this.options.itemNodeName).first();
            el[0].parentNode.removeChild(el[0]);
            this.placeEl.replaceWith(el);

            this.dragEl.remove();
            this.el.trigger('change');
            if (this.hasNewRoot) {
                this.dragRootEl.trigger('change');
            }
            this.reset();
        },

        dragMove: function(e)
        {
            var list, parent, prev, next, depth,
                opt   = this.options,
                mouse = this.mouse;

            this.dragEl.css({
                'left' : e.pageX - mouse.offsetX,
                'top'  : e.pageY - mouse.offsetY
            });

            // mouse position last events
            mouse.lastX = mouse.nowX;
            mouse.lastY = mouse.nowY;
            // mouse position this events
            mouse.nowX  = e.pageX;
            mouse.nowY  = e.pageY;
            // distance mouse moved between events
            mouse.distX = mouse.nowX - mouse.lastX;
            mouse.distY = mouse.nowY - mouse.lastY;
            // direction mouse was moving
            mouse.lastDirX = mouse.dirX;
            mouse.lastDirY = mouse.dirY;
            // direction mouse is now moving (on both axis)
            mouse.dirX = mouse.distX === 0 ? 0 : mouse.distX > 0 ? 1 : -1;
            mouse.dirY = mouse.distY === 0 ? 0 : mouse.distY > 0 ? 1 : -1;
            // axis mouse is now moving on
            var newAx   = Math.abs(mouse.distX) > Math.abs(mouse.distY) ? 1 : 0;

            // do nothing on first move
            if (!mouse.moving) {
                mouse.dirAx  = newAx;
                mouse.moving = true;
                return;
            }

            // calc distance moved on this axis (and direction)
            if (mouse.dirAx !== newAx) {
                mouse.distAxX = 0;
                mouse.distAxY = 0;
            } else {
                mouse.distAxX += Math.abs(mouse.distX);
                if (mouse.dirX !== 0 && mouse.dirX !== mouse.lastDirX) {
                    mouse.distAxX = 0;
                }
                mouse.distAxY += Math.abs(mouse.distY);
                if (mouse.dirY !== 0 && mouse.dirY !== mouse.lastDirY) {
                    mouse.distAxY = 0;
                }
            }
            mouse.dirAx = newAx;

            /**
             * move horizontal
             */
            if (mouse.dirAx && mouse.distAxX >= opt.threshold) {
                // reset move distance on x-axis for new phase
                mouse.distAxX = 0;
                prev = this.placeEl.prev(opt.itemNodeName);
                // increase horizontal level if previous sibling exists and is not collapsed
                if (mouse.distX > 0 && prev.length && !prev.hasClass(opt.collapsedClass)) {
                    // cannot increase level when item above is collapsed
                    list = prev.find(opt.listNodeName).last();
                    // check if depth limit has reached
                    depth = this.placeEl.parents(opt.listNodeName).length;
                    if (depth + this.dragDepth <= opt.maxDepth) {
                        // create new sub-level if one doesn't exist
                        if (!list.length) {
                            list = $('<' + opt.listNodeName + '/>').addClass(opt.listClass);
                            list.append(this.placeEl);
                            prev.append(list);
                            this.setParent(prev);
                        } else {
                            // else append to next level up
                            list = prev.children(opt.listNodeName).last();
                            list.append(this.placeEl);
                        }
                    }
                }
                // decrease horizontal level
                if (mouse.distX < 0) {
                    // we can't decrease a level if an item preceeds the current one
                    next = this.placeEl.next(opt.itemNodeName);
                    if (!next.length) {
                        parent = this.placeEl.parent();
                        this.placeEl.closest(opt.itemNodeName).after(this.placeEl);
                        if (!parent.children().length) {
                            this.unsetParent(parent.parent());
                        }
                    }
                }
            }

            var isEmpty = false;

            // find list item under cursor
            if (!hasPointerEvents) {
                this.dragEl[0].style.visibility = 'hidden';
            }
            this.pointEl = $(document.elementFromPoint(e.pageX - document.body.scrollLeft, e.pageY - (window.pageYOffset || document.documentElement.scrollTop)));
            if (!hasPointerEvents) {
                this.dragEl[0].style.visibility = 'visible';
            }
            if (this.pointEl.hasClass(opt.handleClass)) {
                this.pointEl = this.pointEl.parent(opt.itemNodeName);
            }
            if (this.pointEl.hasClass(opt.emptyClass)) {
                isEmpty = true;
            }
            else if (!this.pointEl.length || !this.pointEl.hasClass(opt.itemClass)) {
                return;
            }

            // find parent list of item under cursor
            var pointElRoot = this.pointEl.closest('.' + opt.rootClass),
                isNewRoot   = this.dragRootEl.data('nestable-id') !== pointElRoot.data('nestable-id');

            /**
             * move vertical
             */
            if (!mouse.dirAx || isNewRoot || isEmpty) {
                // check if groups match if dragging over new root
                if (isNewRoot && opt.group !== pointElRoot.data('nestable-group')) {
                    return;
                }
                // check depth limit
                depth = this.dragDepth - 1 + this.pointEl.parents(opt.listNodeName).length;
                if (depth > opt.maxDepth) {
                    return;
                }
                var before = e.pageY < (this.pointEl.offset().top + this.pointEl.height() / 2);
                    parent = this.placeEl.parent();
                // if empty create new list to replace empty placeholder
                if (isEmpty) {
                    list = $(document.createElement(opt.listNodeName)).addClass(opt.listClass);
                    list.append(this.placeEl);
                    this.pointEl.replaceWith(list);
                }
                else if (before) {
                    this.pointEl.before(this.placeEl);
                }
                else {
                    this.pointEl.after(this.placeEl);
                }
                if (!parent.children().length) {
                    this.unsetParent(parent.parent());
                }
                if (!this.dragRootEl.find(opt.itemNodeName).length) {
                    this.dragRootEl.append('<div class="' + opt.emptyClass + '"/>');
                }
                // parent root list has changed
                if (isNewRoot) {
                    this.dragRootEl = pointElRoot;
                    this.hasNewRoot = this.el[0] !== this.dragRootEl[0];
                }
            }
        }

    };

    $.fn.nestable = function(params)
    {
        var lists  = this,
            retval = this;

        lists.each(function()
        {
            var plugin = $(this).data("nestable");

            if (!plugin) {
                $(this).data("nestable", new Plugin(this, params));
                $(this).data("nestable-id", new Date().getTime());
            } else {
                if (typeof params === 'string' && typeof plugin[params] === 'function') {
                    retval = plugin[params]();
                }
            }
        });

        return retval || lists;
    };

})(window.jQuery || window.Zepto, window, document);

/**
 *
 *	[SOW] Jarallax
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependency 	-
 *	@Usage 			$.SOW.vendor.jarallax.init('.jarallax')
 * 	@Ajax Support 	YES
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 		= 'Vendor Jaralax';


	$.SOW.vendor.jarallax = {


		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {

			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(this.selector).length < 1)
					return null;
			}

			if (typeof jarallax !== "function") {

				var paths = $.SOW.helper.vendorLogicPaths('jarallax');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (typeof jarallax !== "function") {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.jarallax.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


			// Destroy first (ajax purpose)
			$.SOW.vendor.jarallax.destroy(this.selector);


			// Init
			jarallax(document.querySelectorAll(this.selector));


			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			return $(this.selector);

		},



		/**
		 *
		 *	@destroy
		 *
		 *
		 **/
		destroy: function(selector) {

			jarallax(document.querySelectorAll(selector), 'destroy');

		}

	};


})(jQuery);
/**
 *
 *	[SOW] Sticky Kit
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependency 	-
 *	@Usage 			$.SOW.vendor.sticky_kit.init('.sticky-kit')
 * 	@Ajax Support 	YES
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 		= 'Vendor Sticky Kit';


	$.SOW.vendor.sticky_kit = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {

			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(this.selector).length < 1)
					return null;
			}

			if (!jQuery().stick_in_parent) {

				var paths = $.SOW.helper.vendorLogicPaths('sticky_kit');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (!jQuery().stick_in_parent) {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.sticky_kit.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			jQuery(window).resize(function() {
				setTimeout(function() {

					if($.SOW.globals.is_mobile === true) {

						jQuery(this.selector).each(function() {
							$(this).removeClass('js-stickified').trigger("sticky_kit:detach");
						});

					} else {

						$.SOW.vendor.sticky_kit.process(this.selector);

					}

				}, 450);
			});


			// on load
			$.SOW.vendor.sticky_kit.process(this.selector);


			return $(this.selector);
		},



		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {
			
			if($.SOW.globals.is_mobile === true)
				return;

			jQuery(_this).not('.js-stickified').addClass('js-stickified').each(function() {

					
				var _t 			= jQuery(this),
					_offset 	= _t.data('sticky-kit-offset') || 0; // in pixels

				// Auto offset, according to header settings
				if(_offset < 1) {

					// default
					_offset 	= 15;

					if($.SOW.globals.elBody.hasClass('header-sticky') || $.SOW.globals.elBody.hasClass('header-scroll-reveal') || $.SOW.globals.elBody.hasClass('header-over'))
						_offset = ($.SOW.globals.elHeader.outerHeight() || 0) + _offset;

				}


				_t.stick_in_parent({
					offset_top: Number(_offset)
				});

			});

		}

	};


})(jQuery);
/**
 *
 *	[SOW] Sortable
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependencies 	-
 *	@Usage 			$.SOW.vendor.sortable.init('.sortable');
 * 					$.SOW.vendor.sortable.process($('.my_element'));
 *
 * 	@Ajax Support 	YES
 *
 * 	Vendor: 		https://github.com/SortableJS/Sortable
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 		= 'Vendor Sortable';


	$.SOW.vendor.sortable = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {

			dataIdAttr: 		'data-id', // used by ajax (as item/database id)
			handle: 			'.sortable-handle',
			animation: 			150,
			ghostClass: 		'bg-primary-soft',
			chosenClass: 		'bg-white-alt',
			swapClass: 			'bg-warning-soft',
			filter: 			'.js-ignore', // 'filtered' class is not draggable

			headers: 			'',
			crossDomain: 		'',

		},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (typeof Sortable !== 'function') {

				var paths = $.SOW.helper.vendorLogicPaths('sortable')

				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (typeof Sortable !== 'function') {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.sortable.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;



			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// 1. Has no selector
			if(!this.selector) {
				$.SOW.vendor.sortable.process($('.sortable'));
				return $('.sortable');
			}

			// 2. Has selector
			return this.collection.each(function() {
				
				$.SOW.vendor.sortable.process($(this));

			});

		},



		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {

			if(_this.hasClass('js-sortablified'))
				return;

			var _id 			= _this.attr('id') 					|| '',
				_sharedGroup 	= _this.data('shared-group') 		|| '',
				_pullMode 		= _this.data('pull-mode') 			|| '', // 'clone'
				_putDenied 		= _this.data('put-denied') 			|| 'false',
				_sortableType 	= _this.data('sortable-type') 		|| '', // 'nested'
				_sortDisable 	= _this.data('sort-disable') 		|| 'false',
				_sortSwap 		= _this.data('sort-swap') 			|| 'false',
				_swapThreshold 	= _this.data('swap-treshold') 		|| '',
				_hasHandle 		= jQuery($.SOW.vendor.sortable.config.handle, _this).length || 0;

			_this.addClass('js-sortablified');


			if(_id == '') {
				var _id = 'strand_' + $.SOW.helper.randomStr(3);
				_this.attr('id', _id);
			}

			var _config = {
				dataIdAttr: 		$.SOW.vendor.sortable.config.dataIdAttr || 'data-id',
				handle: 			(_hasHandle > 0) ? $.SOW.vendor.sortable.config.handle : null,
				animation: 			$.SOW.vendor.sortable.config.animation,
				ghostClass: 		$.SOW.vendor.sortable.config.ghostClass,
				chosenClass: 		$.SOW.vendor.sortable.config.chosenClass,
				swapClass: 			$.SOW.vendor.sortable.config.swapClass,
				filter: 			$.SOW.vendor.sortable.config.filter, // 'filtered' class is not draggable

				onUpdate: function (evt) {

					var items = sortable.toArray();
					$.SOW.vendor.sortable.sortable__update_order(_this, items);

				}

			};

			// shared|cloning lists
			if(_sharedGroup != '') {

				if(_pullMode == '')
					_config.group = _sharedGroup;

				else if(_pullMode != '') {

					_config.group = {
						name: _sharedGroup,
						pull: _pullMode, // 'clone'
						put: (_putDenied+'' == 'true') ? false : true,
					}

				}

			}

			// disable sorting
			if(_sortDisable+'' == 'true')
				_config.sort = false;

			// trshold
			if(_swapThreshold != '')
				_config.swapThreshold = swapThreshold;

			// nested
			if(_sortableType.toLowerCase() == 'nested') {
				_config.group 			= 'nested';
				_config.fallbackOnBody 	= true;
				_config.swapThreshold 	= 0.65;
			}

			if(_sortSwap+'' == 'true') {
				_config.swap = true;
			}

			var el = document.getElementById(_id);
			var sortable = new Sortable(el, _config);

		},



		sortable__update_order: function(_this, items) {

			var _updateParams 			= _this.data('ajax-update-params') 			|| '',
				_updateUrl 				= _this.data('ajax-update-url') 			|| '',
				_updateIdentifier 		= _this.data('ajax-update-identifier') 		|| '',
				_updateToastSuccess 	= _this.data('update-toast-success') 		|| 'Order Saved!',
				_updateToastPosition 	= _this.data('update-toast-position') 		|| 'bottom-center';

			if(_updateUrl == '')
				return;

			var formData = new FormData();
				formData.append('action', 'reorder');
				formData.append('ajax', 'true');
				formData.append('identifier', _updateIdentifier);

			if(_updateParams != '') {

				var ajax_params_arr = $.SOW.helper.params_parse(_updateParams);
				for (var i = 0; i < ajax_params_arr.length; ++i) {
					formData.append(ajax_params_arr[i][0], ajax_params_arr[i][1]);
				}

			}

			for (var i = 0; i < items.length; ++i) {
				formData.append('items[]', items[i]);
			}



			$.ajax({
				url: 			_updateUrl,
				cache: 			false,
				contentType: 	false,
				processData: 	false,
				data: 			formData,
				type: 			'POST',
				headers: 		$.SOW.vendor.sortable.headers,
				crossDomain: 	$.SOW.vendor.sortable.crossDomain,

				beforeSend: function() {

					
				},

				success: function (data) {

					$.SOW.helper.consoleLog(data);

					if(typeof $.SOW.core.toast === 'object' && _updateToastSuccess != '')
						$.SOW.core.toast.show('success', '', _updateToastSuccess, _updateToastPosition, 1800, true);

				},

				error: function (data) {

					$.SOW.helper.consoleLog(data);

					if(typeof $.SOW.core.toast === 'object') {
						$.SOW.core.toast.show('danger', '', '404 Server Error!', _updateToastPosition, 4000, true);
					} else {
						alert('404 Server Error!');
					}

				},

			});

		}

	};


})(jQuery);
/**
 *
 *	[SOW] Bootstrap Select
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependency 	-
 *	@Usage 			$.SOW.vendor.bootstrap_select.init('select.bs-select');
 * 					$.SOW.vendor.bootstrap_select.refresh();
 * 	@Ajax Support 	YES
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 		= 'Vendor Bootstrap Select';


	$.SOW.vendor.bootstrap_select = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (!jQuery().selectpicker) {

				var paths = $.SOW.helper.vendorLogicPaths('bootstrap_select');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (!jQuery().selectpicker) {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.bootstrap_select.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// 1. Has no selector
			if(!this.selector) {
				$.SOW.vendor.bootstrap_select.process($('select.bs-select'));
				return $('select.bs-select');
			}

			// 2. Has selector
			return this.collection.each(function() {
				
				$.SOW.vendor.bootstrap_select.process($(this));

			});

		},



		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {

			// avoid multiple 'binds', on mistake ajax reinits (just for safe)
			if(_this.hasClass('js-bselectified'))
				return;

			// Make it looks the same as a regullar select
			if(!_this.data('style')) {
				var _style = 'select-form-control border';

				if(_this.hasClass('form-control-clean'))
					_style += ' form-control-clean';

				if(_this.hasClass('form-control-pill'))
					_style += ' form-control-pill';

				_this.attr('data-style', _style);
			}


			_this.selectpicker();
			_this.addClass('js-bselectified');

		},




		/**
		 *
		 *	@process
		 *
		 *
		 **/
		refresh: function(_selector) {

			if (!jQuery().selectpicker)
				return;

			if(typeof _selector === 'undefined')
				var _selector = this.selector;

			var _this = (typeof _selector !== 'object') ? jQuery(_selector) : _selector;

			if(_this.hasClass('js-bselectified'))
				_this.selectpicker('refresh');

		}

	};


})(jQuery);
/**
 *
 *	[SOW] Typed.js
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependency 	-
 *	@Usage 			$.SOW.vendor.typed.init('.typed')
 * 	@Ajax Support 	YES
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 		= 'Vendor Typed.js';


	$.SOW.vendor.typed = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {},




		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),




		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {

			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (typeof Typed !== "function") {

				var paths = $.SOW.helper.vendorLogicPaths('typed');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (typeof Typed !== "function") {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.typed.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;



			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// 1. Has no selector
			if(!this.selector) {
				$.SOW.vendor.typed.process($('.typed'));
				return $('.typed');
			}

			// 2. Has selector
			return this.collection.each(function() {

				$.SOW.vendor.typed.process($(this));

			});

		},



		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {

			if(_this.hasClass('js-typified'))
				return;

			var _strings 			= _this.data('typed-string') 			|| '', // format: lorem upsum|dolor sit amet
				_source 			= _this.data('typed-source')			|| '',
				_speed 				= _this.data('typed-speed-forward')		|| '',
				_backSpeed 			= _this.data('typed-speed-back')		|| '',
				_backDelay 			= _this.data('typed-back-delay')		|| '',
				_loop 				= _this.data('typed-loop-times')		|| 'infinite',
				_smartBackspace 	= _this.data('typed-smart-backspace')	|| 'true',
				_shuffle 			= _this.data('typed-shuffle')			|| 'false',
				_cursorChar 		= _this.data('typed-cursor')			|| '|',
				_itemID 			= _this.attr('id')						|| '';

			_this.addClass('js-typified');

			if(_speed == '') 
				_speed = 80;

			if(_backSpeed == '')
				_backSpeed = _speed / 2;

			if(_strings == '' && _source == '')
				return;

			if(_itemID == '') {
				var _itemID = 'rand_' + $.SOW.helper.randomStr(3);
				_this.attr('id', _itemID);
			}


			var options = {
				typeSpeed: 			_speed 		|| 80,
				backSpeed: 			_backSpeed,
				backDelay: 			_backDelay 	|| 700,
				smartBackspace: 	(_smartBackspace+'' == 'true') 	? true : false,
				shuffle: 			(_shuffle+'' == 'true') 		? true : false,
				loop: 				(_loop != '0') 					? true : false,
				loopCount: 			(_loop == 'infinite') 			? 9999 : _loop,
				showCursor: 		(_cursorChar != '') 			? true : false,
				cursorChar: 		_cursorChar,
			};

			if(_source != '')
				options.stringsElement 	= _source;
			else
				options.strings 		= _strings.split("|");

			// Inputs / textarea
			var _elType = _this[0].nodeName.toLowerCase();
			if(_elType === 'input' || _elType === 'textarea' || _elType === 'select') {
				options.attr 					= 'placeholder';
				options.bindInputFocusEvents 	= true;
				options.showCursor 				= false;
			}


			var typed = new Typed('#'+_itemID, options);

		},


	};


})(jQuery);
/**
 *
 *	[SOW] Flickity [Ajax Reinit]
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependency 	-
 *	@Usage 			$.SOW.vendor.flickity.init('div[data-flickity]') (vendor stick with 'div[data-flickity]')
 * 	@Ajax Support 	YES
 *
 * 	@Desc 			Controller required if Ajax Navigation used - reinit Flickity
 * 					Without this controller, will not reinit!
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 		= 'Vendor Flickity [Ajax Reinit]';


	$.SOW.vendor.flickity = {


		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (typeof Flickity !== 'function') {

				var paths = $.SOW.helper.vendorLogicPaths('flickity');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (typeof Flickity !== 'function') {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.flickity.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



			jQuery(selector).not('.js-flickity').addClass('js-flickity');
			var nodeList = document.querySelectorAll('.js-flickity');

			for (var i = 0, t = nodeList.length; i < t; i++) {
				var flkty = Flickity.data(nodeList[i]);

				if (!flkty) {

					// Check if element had flickity options specified in data attribute.
					var flktyData = nodeList[i].getAttribute('data-flickity');

					if (flktyData) {

						var flktyOptions = JSON.parse(flktyData);
							flktyOptions.rightToLeft = ( $.SOW.globals.direction == 'rtl' ) ? true : false;

						new Flickity(nodeList[i], flktyOptions);

					} else {

						var flktyOptions = { 
							rightToLeft : ( $.SOW.globals.direction == 'rtl' ) ? true : false 
						};

					}

					// Init ---------------------------------
					new Flickity(nodeList[i], flktyOptions);
					// --------------------------------------

				}

			}


			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --

			// no chaining
			return null;

		},


	};


})(jQuery);
/**
 *
 *	[SOW] Fancybox
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependency 	-
 *	@Usage 			$.SOW.vendor.fancybox.init('a.fancybox')
 * 	@Ajax Support 	YES
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 		= 'Vendor Fancybox';


	$.SOW.vendor.fancybox = {

		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {

			loop 					: true,
			infobar 				: true,
			protect 				: false, // disable right click
			transitionEffect 		: "zoom-in-out",
			transitionDuration 		: 250,

		},




		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {

			if(!selector)
				this.selector = 'a.fancybox';

			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (!jQuery().fancybox) {

				var paths = $.SOW.helper.vendorLogicPaths('fancybox');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (!jQuery().fancybox) {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.fancybox.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			// http://fancyapps.com/fancybox/3/docs/#setup
			$(this.selector).not('.js-fancyvified').addClass('js-fancyvified').fancybox({

					beforeShow: function(instance, current) {

						var _t 		= current.opts.$orig;
						var __class = 'bg-secondary text-white';

						if(_t.hasClass('fancybox-secondary'))
							var __class = 'bg-secondary text-white';

						else if(_t.hasClass('fancybox-dark'))
							var __class = 'bg-dark text-white';

						else if(_t.hasClass('fancybox-white'))
							var __class = 'bg-white text-dark';

						else if(_t.hasClass('fancybox-dark'))
							var __class = 'bg-dark text-white';

						else if(_t.hasClass('fancybox-primary'))
							var __class = 'bg-primary text-white';

						else if(_t.hasClass('fancybox-success'))
							var __class = 'bg-success text-white';

						else if(_t.hasClass('fancybox-danger'))
							var __class = 'bg-danger text-white';

						else if(_t.hasClass('fancybox-warning'))
							var __class = 'bg-warning text-white';

						else if(_t.hasClass('fancybox-info'))
							var __class = 'bg-info text-white';

						else if(_t.hasClass('fancybox-pink'))
							var __class = 'bg-pink text-white';

						else if(_t.hasClass('fancybox-purple'))
							var __class = 'bg-purple text-white';

						else if(_t.hasClass('fancybox-indigo'))
							var __class = 'bg-indigo text-white';

						jQuery('button.fancybox-button').removeClass('bg-white bg-dark bg-primary bg-secondary bg-success bg-danger bg-warning bg-info bg-pink bg-purple bg-indigo text-dark text-white');
						jQuery('button.fancybox-button:not(.fancybox-button--close)').addClass(__class);

					},

					afterLoad : function(instance, current) {
						var pixelRatio = window.devicePixelRatio || 1;

						if ( pixelRatio > 1.5 ) {
							current.width  = current.width  / pixelRatio;
							current.height = current.height / pixelRatio;
						}
					},

					loop : $.SOW.vendor.fancybox.config.loop,
					infobar: $.SOW.vendor.fancybox.config.infobar,

					buttons: [
						// "zoom",
						// "share",
						// "slideShow",
						// "fullScreen",
						// "download",
						// "thumbs",
						"close"
					],

					protect: $.SOW.vendor.fancybox.config.protect, // disable right click

					image: {
						// Wait for images to load before displaying
						//   true  - wait for image to load and then display;
						//   false - display thumbnail and load the full-sized image over top,
						//           requires predefined image dimensions (`data-width` and `data-height` attributes)
						preload: false
					},

					// Hash value when initializing manually,
					// set `false` to disable hash change
					hash: false,


					// Open/close animation type
					// Possible values:
					//   false            - disable
					//   "zoom"           - zoom images from/to thumbnail
					//   "fade"
					//   "zoom-in-out"
					//
					animationEffect: "zoom",
	  				animationDuration: 366,


					// Transition effect between slides
					//
					// Possible values:
					//   false            - disable
					//   "fade'
					//   "slide'
					//   "circular'
					//   "tube'
					//   "zoom-in-out'
					//   "rotate'
					//
					transitionEffect: $.SOW.vendor.fancybox.config.transitionEffect,
					transitionDuration: $.SOW.vendor.fancybox.config.transitionDuration,


					// Loading indicator template
					// spinnerTpl: '<div class="fancybox-loading"></div>',
					spinnerTpl: 

	                	// == == == same as ajax loader
						'<div class="position-fixed fixed-bottom w-100 mb-3 z-index-9999 text-center shadow-none">'
							+ '<span class="bg-white d-inline-block px-4 rounded-lg shadow-lg">'
								+ '<i class="'+$.SOW.config.sow__icon_loading+' fs--30 text-muted"></i>'
							+ '</span>'
					  	+ '</div>',
	                	// == == == same as ajax loader


					btnTpl: {
						download:
							'<a download data-fancybox-download class="fancybox-button fancybox-button--download rounded-circle p-0 h--40 w--40 m-3 fi fi-arrow-download bg-white text-dark shadow-xlg" title="{{DOWNLOAD}}" href="javascript:;">' +
								// '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg>' +
							"</a>",

						zoom:
							'<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom rounded-circle p-0 h--40 w--40 m-3 fi fi-search bg-white text-dark shadow-xlg" title="{{ZOOM}}">' +
								// '<svg width="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg>' +
							"</button>",

						close:
							'<button data-fancybox-close class="fancybox-button fancybox-button--close rounded-circle p-0 h--40 w--40 m-3 '+$.SOW.config.sow__icon_close+' bg-transparent fs--35" title="{{CLOSE}}">' +
								// '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg>' +
							"</button>",

						// Arrows
						arrowLeft:
							'<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left rounded-circle p-0 h--60 w--60 m-3 fs--20 fi fi-arrow-left bg-white text-dark shadow-xlg" title="{{PREV}}">' +
								// '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div>' +
							"</button>",

						arrowRight:
							'<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right rounded-circle p-0 h--60 w--60 m-3 fs--20 fi fi-arrow-right bg-white text-dark shadow-xlg" title="{{NEXT}}">' +
								// '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div>' +
							"</button>",

						// This small close button will be appended to your html/inline/ajax content by default,
						// if "smallBtn" option is not set to false
						smallBtn:
							'<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small rounded-circle p-0 h--40 w--40 mt--22 mr--n8 ml--n8 '+$.SOW.config.sow__icon_close+' bg-white text-dark shadow-xlg" title="{{CLOSE}}">' +
								// '<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg>' +
							"</button>"
					},
					smallBtn: false,


			});

			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// no chaining
			return null;
		},

	};


})(jQuery);
/**
 *
 *	[SOW] Cocoen
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependency 	-
 *	@Usage 			$.SOW.vendor.cocoen.init('figure.cocoen')
 * 	@Ajax Support 	YES
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 		= 'Vendor Cocoen (Image Comparision)';
	window.cocoenInit = false;


	$.SOW.vendor.cocoen = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (typeof Cocoen !== 'function') {

				var paths = $.SOW.helper.vendorLogicPaths('cocoen');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (typeof Cocoen !== 'function') {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.cocoen.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


			jQuery(selector).each(function() {

				var _t = jQuery(this);

				if(_t.hasClass('js-cocoened'))
					return;

				_t.addClass('js-cocoened');

				// assign random class!
				var _rand = $.SOW.helper.randomStr(3, 'L');
				var _randClass = 'rand_'+_rand;
					_t.addClass(_randClass);

				// Init
				new Cocoen(document.querySelector('.' + _randClass));

			});


			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --

			// no chaining
			return null;

		},


	};


})(jQuery);
/**
 *
 *	[SOW] photoswipe
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependency 	-
 *	@Usage 			$.SOW.vendor.photoswipe.init()
 * 	@Ajax Support 	YES
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 		= 'Vendor Photoswipe';


	$.SOW.vendor.photoswipe = {

		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {

			defaults: 	{

				galleryOpen: 				function (gallery) {},
				showHideOpacity: 			false,
				history: 					false,
				captionEl: 					false,
				shareEl: 					false,
				tapToClose: 				false,
				tapToToggleControls: 		false,
				escKey: 					true,
				barsSize: 					{ top:0, bottom:0 },

			}

		},




		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(this.selector).length < 1)
					return null;
			}

			if (typeof PhotoSwipe !== 'function') {

				var paths = $.SOW.helper.vendorLogicPaths('photoswipe');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (typeof PhotoSwipe !== 'function') {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.photoswipe.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


			// Append PSW Template
			$.SOW.vendor.photoswipe.photoswipe_tpl();



			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// Process
			return $.SOW.vendor.photoswipe.process(this.selector);

		},





		/**
		 *
		 *	@process
		 * 	
		 *
		 **/
		process: function(_this) {

			var TPL 			= jQuery(".pswp[role='dialog']")[0];
			var phswCollection 	= {};
			var arr 			= "abcdefghijklmnopqrstuvwxyz".split("");
			var instance 		= [];
			var instanceCount	= [];

			// Create array by group
		    $(_this).not('.js-photoswapified').addClass('js-photoswapified').each( function() {

		        var _t     				= $(this),
		        	src 				= _t.attr('href'),
		        	caption 			= _t.attr('title'),
		        	phswGroup 			= _t.data('photoswipe'),
					groupId 			= (!phswGroup) ? $.SOW.helper.randomStr(3, 'N') : phswGroup.replace(/[a-z]/ig, function(m){ return arr.indexOf(m.toLowerCase()) + 1 });

				if(!src) return;
				_t.attr('data-group-id', groupId);


				// add index for groups
				if(phswGroup) {
					if(typeof instanceCount[groupId] === 'undefined')
						instanceCount[groupId] = 0;

					_t.attr('data-index', instanceCount[groupId]++);
				}


				if(typeof phswCollection[groupId] === 'undefined')
					phswCollection[groupId] = [];


				phswCollection[groupId].push({
					src: 	src,
					title: 	caption,
					w: 		0,
					h: 		0
				});

		    });




	        $(_this).off().on('click', function(e) {
	            e.preventDefault();

	            var _t     					= $(this),
	            	href 					= _t.attr('href') 							|| '',
	            	groupId 				= _t.data('group-id') 						|| 0,
	            	index 					= _t.data('index') 							|| 0,
	            	history 				= _t.attr('data-history') 					|| 'false',
	            	shareEl 				= _t.attr('data-shareEl') 					|| 'false',
	            	captionEl 				= _t.attr('data-captionEl') 				|| 'false',
	            	tapToClose 				= _t.attr('data-tapToClose') 				|| 'false',
	            	tapToToggleControls 	= _t.attr('data-tapToToggleControls') 		|| 'false',
	            	showHideOpacity 		= _t.attr('data-showHideOpacity') 			|| 'true',
	            	mainClass 				= _t.attr('data-mainClass') 				|| '',
	            	isVideo 				= false;


            	// Video Detect!
				if(href.match(/(youtube.com)/)) 				isVideo = true;
				else if(href.match(/(youtu.be)/)) 				isVideo = true;
				else if(href.match(/(vimeo.com)/)) 				isVideo = true;
				else if(href.match(/(.mp4)/)) 					isVideo = true;
				else if(href.match(/(.ogv)/)) 					isVideo = true;


				// Stop here, link is video
				// Call ajax modal to laounch video!
				if(isVideo === true) {

					if(typeof $.SOW.core.ajax_modal === 'object') {

						_t.off().removeClass('photoswipe js-photoswapified')
							.addClass('js-onload')
							.attr('data-ajax-modal-delay', '0')
							.attr('data-ajax-modal-type', 'video')
							.attr('data-ajax-modal-size', 'modal-xl')
							.attr('data-ajax-modal-centered', 'true');

						$.SOW.core.ajax_modal.attach(_t);

					}
					

					return false;

				}



	            // Show Preloader (margin issues)
	            // jQuery('.pswp__preloader').addClass('pswp__preloader--active');



	            // Get defaults
	            var options 			= $.SOW.vendor.photoswipe.config.defaults;
	            	options.mainClass 	= mainClass;
	            	options.index 		= index;


	            // User overwrite defaults
	            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
	            if(showHideOpacity != '')			options.showHideOpacity 		= (showHideOpacity+'' == 'true') ? true : false;
	            if(history != '')					options.history 				= (history+'' == 'true') ? true : false;
	            if(captionEl != '')					options.captionEl 				= (captionEl+'' == 'true') ? true : false;
	            if(shareEl != '')					options.shareEl 				= (shareEl+'' == 'true') ? true : false;
	            if(tapToClose != '')				options.tapToClose 				= (tapToClose+'' == 'true') ? true : false;
	            if(tapToToggleControls != '')		options.tapToToggleControls 	= (tapToToggleControls+'' == 'true') ? true : false;
	            if(typeof barsSize === 'object')	options.barsSize 				= barsSize;
	            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


            	instance[groupId] = new PhotoSwipe(TPL, PhotoSwipeUI_Default, phswCollection[groupId], options);
            	instance[groupId].init();


				instance[groupId].listen('initialZoomInEnd', function() {
					options.galleryOpen(instance[groupId]);
				});

				instance[groupId].listen('imageLoadComplete', function(index, item) {
					loadImg(index, item);
				});

				instance[groupId].listen('gettingData', function(index, item) {
					loadImg(index, item);
				});

				instance[groupId].listen('resize', function(index, item) {
					resizeItem(item);
				});

				function loadImg(index, item) {

					if (item.w == 0 && item.h == 0) {
						var imgpreload = new Image(); 

						imgpreload.onload = function() {

							item.w 				= this.width;
							item.h 				= this.height;
							item.needsUpdate 	= true;
							instance[groupId].updateSize(true);

						};

						imgpreload.src = item.src;
					}

				}



				function resizeItem(item) {

					/* ununsed */

				}



				// Style
				$.SOW.vendor.photoswipe.photoswipe_style(_t);

	        });


		},





		/**
		 *
		 *	@photoswipe_tpl
		 *	Should be the same with fancybox!
		 *
		 **/
		photoswipe_style: function(_t) {

			// rounded-circle p-0 h--60 w--60 m--15 fs--20 fi fi-arrow-left shadow-xlg bg-secondary text-white
			var __class = 'bg-secondary text-white';

			if(_t.hasClass('photoswipe-secondary'))
				var __class = 'bg-secondary text-white';

			else if(_t.hasClass('photoswipe-dark'))
				var __class = 'bg-dark text-white';

			else if(_t.hasClass('photoswipe-white'))
				var __class = 'bg-white text-dark';

			else if(_t.hasClass('photoswipe-dark'))
				var __class = 'bg-dark text-white';

			else if(_t.hasClass('photoswipe-primary'))
				var __class = 'bg-primary text-white';

			else if(_t.hasClass('photoswipe-success'))
				var __class = 'bg-success text-white';

			else if(_t.hasClass('photoswipe-danger'))
				var __class = 'bg-danger text-white';

			else if(_t.hasClass('photoswipe-warning'))
				var __class = 'bg-warning text-white';

			else if(_t.hasClass('photoswipe-info'))
				var __class = 'bg-info text-white';

			else if(_t.hasClass('photoswipe-pink'))
				var __class = 'bg-pink text-white';

			else if(_t.hasClass('photoswipe-purple'))
				var __class = 'bg-purple text-white';

			else if(_t.hasClass('photoswipe-indigo'))
				var __class = 'bg-indigo text-white';

			jQuery('.pswp__button--custom').removeClass('bg-white bg-dark bg-primary bg-secondary bg-success bg-danger bg-warning bg-info bg-pink bg-purple bg-indigo text-dark text-white');
			jQuery('.pswp__button--custom').addClass(__class);

		},






		/**
		 *
		 *	@photoswipe_tpl
		 *
		 *
		 **/
		photoswipe_tpl: function() {

			/**
				
				https://photoswipe.com/documentation/getting-started.html

				Order of pswp__bg, pswp__scroll-wrap, pswp__container 
				and pswp__item elements should not be changed.

			**/
			var tpl = '<!-- Root element of PhotoSwipe. Must have class pswp. -->'
					+ '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">'

					   // + ' <!-- Background of PhotoSwipe. It`s a separate element as animating opacity is faster than rgba(). -->'
					    + '<div class="pswp__bg"></div>'

					    // + '<!-- Slides wrapper with overflow:hidden. -->'
					    + '<div class="pswp__scroll-wrap">'

					        // + '<!-- Container that holds slides. PhotoSwipe keeps only 3 of them in the DOM to save memory. Don`t modify these 3 pswp__item elements, data is added later on. -->'
					        + '<div class="pswp__container">'
					           + ' <div class="pswp__item"></div>'
					            + '<div class="pswp__item"></div>'
					            + '<div class="pswp__item"></div>'
					        + '</div>'

					       // + ' <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->'
					       + ' <div class="pswp__ui pswp__ui--hidden">'

					            + '<div class="pswp__top-bar">'

					                + '<div class="pswp__counter"><!-- image container --></div>'

					                + '<button class="pswp__button pswp__button--close fi fi-close fs--35 w--50 h--50 rounded m-3" aria-label="Close (Esc)"></button>'

					               + ' <button class="pswp__button pswp__button--share fi fi-share fs--20 w--50 h--50 rounded mt-3" aria-label="Share"></button>'

					                // + '<button class="pswp__button pswp__button--fs fs--20 mt-3" aria-label="Toggle fullscreen"></button>'

					                // + '<button class="pswp__button pswp__button--zoom fs--20 mt-3" aria-label="Zoom in/out"></button>'

					                // + '<!-- element will get class pswp__preloader--active when preloader is running -->'
					               + ' <div class="pswp__preloader pswp__preloader--active">'
					                    + '<div class="pswp__preloader__icn">'
					                      + '<div class="pswp__preloader__cut">'
					                        + '<div class="pswp__preloader__donut">'

					                        	// == == == same as ajax loader
												+ '<div class="position-fixed fixed-bottom w-100 mb-3 z-index-9999 text-center shadow-none">'
													+ '<span class="bg-white d-inline-block px-4 rounded-lg shadow-lg">'
														+ '<i class="'+$.SOW.config.sow__icon_loading+' fs--30 text-muted"></i>'
													+ '</span>'
											  + '</div>'
					                        	// == == == same as ajax loader

					                        + '</div>'
					                      + '</div>'
					                    + '</div>'
					                + '</div>'
					            + '</div>'




					            + '<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">'
					                + '<div class="pswp__share-tooltip"></div> '
					            + '</div>'

					            + '<button class="pswp__button--custom pswp__button pswp__button--arrow--left rounded-circle p-0 h--60 w--60 m-3 fs--20 fi fi-arrow-left shadow-xlg" aria-label="Previous (arrow left)"></button>'

					            + '<button class="pswp__button--custom pswp__button pswp__button--arrow--right rounded-circle p-0 h--60 w--60 m-3 fs--20 fi fi-arrow-right shadow-xlg" aria-label="Next (arrow right)"></button>'

					            + '<div class="pswp__caption">'
					                + '<div class="pswp__caption__center"></div>'
					            + '</div>'

					        + '</div>'

					   + ' </div>'

					+ '</div>';


			// Append Template!
			$.SOW.globals.elBody.append(tpl);

		}

	};


})(jQuery);
/**
 *
 *	[SOW] Swiper
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependencies 	-
 *	@Usage 			$.SOW.vendor.swiper.init('.swiper-container');
 *
 * 	@Ajax Support 	YES
 *
 * 	Vendor: 		https://github.com/nolimits4web/swiper
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 		= 'Vendor Swiper';
	var swiperInst 		= [];


	$.SOW.vendor.swiper = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {

			init 				: true,
			direction 			: 'horizontal', // horizontal, vertical
			spaceBetween 		: 15,
			slidesPerView 		: 1, // number, 'auto'
			slidesPerGroup 		: 1,
			slidesPerColumn 	: 1,
			centeredSlides 		: false,
			effect 				: 'slide', // slide, fade, flip, cubeEffect, coverflowEffect
			grabCursor 			: false,
			freeMode 			: false, // scroll free, don't stop to next one
			loop 				: false,
			autoHeight 			: false,
			mousewheel 			: false,
			speed 				: 600,
			parallax 			: true,
			lazy 				: false, // enable lazy loading
			zoom 				: false,

			keyboard 			: {
							enabled: true,
			},

			autoplay 			: {
							delay 					: 4500,
							disableOnInteraction 	: false,
			},

			coverflowEffect: {
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows : true,
			},

			cubeEffect: {
				shadow: true,
				slideShadows: true,
				shadowOffset: 20,
				shadowScale: 0.94,
			},

			pagination: {
				el 				: '.swiper-pagination',
				type 			: 'bullets', // bullets, progressbar, fraction, custom
				dynamicBullets 	: true,
				clickable 		: true
			},

			scrollbar: {
				el: '.swiper-scrollbar',
				hide: true,
			},

			navigation: {
				nextEl 			: '.swiper-button-next',
				prevEl 			: '.swiper-button-prev',
			}

		},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (typeof Swiper !== 'function') {

				var paths = $.SOW.helper.vendorLogicPaths('swiper');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (typeof Swiper !== 'function') {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.swiper.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;



			// Add RTL
			if($.SOW.globals.direction == 'rtl')
				jQuery(this.selector).attr('dir', 'rtl');


			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// 1. Has no selector
			if(!this.selector) {
				$.SOW.vendor.swiper.process($('.swiper-container'));
				return $('.swiper-container');
			}

			// 2. Has selector
			return this.collection.each(function() {
				
				$.SOW.vendor.swiper.process($(this));

			});

		},



		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {

			if(_this.hasClass('js-swiperified'))
				return;

			var swiperID 			= _this.attr('id')				|| '',
				custom_config 		= _this.data('swiper') 			|| '',
				linkWith 			= _this.data('swiper-link') 	|| '',
				config 				= $.SOW.vendor.swiper.config;

			if(typeof custom_config === 'object') {

				// fixes : deep objects not supported by jQuery
				if(typeof custom_config.pagination === 'object')
					custom_config.pagination = $.extend({}, config.pagination, custom_config.pagination);

				if(config.pagination != 'bullets')
					config.pagination.dynamicBullets = false;

				// extend
				$.extend(config, custom_config);

			}

			if(swiperID == '') {
				swiperID = 'rand_' + $.SOW.helper.randomStr(3);
				_this.attr('id', swiperID);
			}

			// Rename elements, to support multiple swipes in the same page!
			jQuery('.swiper-button-next', '#'+swiperID).addClass('swiper-button-next-'+swiperID);
			jQuery('.swiper-button-prev', '#'+swiperID).addClass('swiper-button-prev-'+swiperID);
			jQuery('.swiper-pagination', '#'+swiperID).addClass('swiper-pagination-'+swiperID);
			config.navigation.nextEl 	= '.swiper-button-next-'+swiperID;
			config.navigation.prevEl 	= '.swiper-button-prev-'+swiperID;
			config.pagination.el 		= '.swiper-pagination-'+swiperID;
			// -- -- --


			// fix on multiple sliders - prevent using last effect set!
			if(config.slidesPerView > '1')
				config.effect = "slide";


			/**

				By default, Smarty controller will reconfigure swiper if -only- one image detected:
					- remove arrows
					- remove progress/bullets
					- disable loop
				Add .js-ignore class to skip, if for some reason is needed!

			**/
			if(!jQuery('#'+swiperID).hasClass('.js-ignore') && jQuery('.swiper-slide', '#'+swiperID).length < 2) {
				config.pagination 	= {};
				config.navigation 	= {};
				config.loop 		= false;

				jQuery('.swiper-button-next', '#'+swiperID).remove();
				jQuery('.swiper-button-prev', '#'+swiperID).remove();
				jQuery('.swiper-pagination', '#'+swiperID).remove();
			}

			// linked with another swiper
			if(linkWith != '') {

				if(typeof config.thumbs !== 'object')
					config.thumbs = {};

				config.thumbs.swiper = swiperInst[linkWith];
			}




			/**

				! INIT SWIPER !
				------------------------------------------------------
			*/
			swiperInst[swiperID] = new Swiper('#'+swiperID, config);
			_this.addClass('js-swiperified');
			/** ------------------------------------------------------ **/




			// refresh linked (with thumbnails)
			if(linkWith != '') {

				setTimeout(function() {
					swiperInst[linkWith].update();
					swiperInst[swiperID].update();
				}, 700);

			}

		},


	};


})(jQuery);
/**
 *
 *	[SOW] Leaflet [Map]
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependency 	-
 *	@Usage 			$.SOW.vendor.leaflet.init('.map-leaflet')
 * 	@Ajax Support 	YES
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 		= 'Vendor Leaflet [Map]';


	$.SOW.vendor.leaflet = {


		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (typeof L === 'undefined') {

				var paths = $.SOW.helper.vendorLogicPaths('leaflet');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (typeof L === 'undefined') {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.leaflet.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


			// Selector
			var __selector 			= $.SOW.helper.__selector(selector);
			this.selector 			= __selector[0] || '.map-leaflet'; 	// '#selector'



			jQuery(this.selector).each(function() {
				$.SOW.vendor.leaflet.map_openstreet($(this));
			});


			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			return $(this.selector);

		},




		/**
		 *
		 *	@map_openstreet
		 *
		 *
		 **/
		map_openstreet: function(_this) {

			// avoid loop issue, if happen
			if(_this.hasClass('js-leafletified'))
				return;


			var _mapID 				= _this.attr('id')					|| '',
				map_json 			= _this.data('map-json') 			|| '',
				map_tile 			= _this.data('map-tile') 			|| '',
				map_tile_custom 	= _this.data('map-tile-custom') 	|| '',
				__zoom__ 			= _this.data('map-zoom') 			|| 9,
				map 				= [];


			// -- --
			_this.addClass('js-leafletified')
			// -- --


			// Check for a valid json
			if(typeof map_json !== 'object') {

				if(typeof $.SOW.core.toast === 'object') {
					$.SOW.core.toast.show('danger', '', 'Map Error: Invalid Json!', 'top-center', 0, true);
				} else {
					alert("[404] Unexpected internal error!");
				}

				return;
			}


			// Map id - create one if no id provided
			if(_mapID == '') {
				var _mapID = 'map_' + $.SOW.helper.randomStr(3);
				_this.attr('id', _mapID);
			}




			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
			var ajaxRequest;
			var plotlist;
			var plotlayers=[];


			/* custom icon */
			var customIcon = L.icon({
			    iconUrl: 	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAMAAAD3TXL8AAAB5lBMVEVHcEwtbZk5hLcubZgubZkyeak4fq8zbaEwcqEtcqQubZsvbpoyaZYua5cubJcubJcubJgtbZk+h7ovbp01eqwtbJovbpo3gbc0d6gydKZHjsEubJk2gLIwb58tbJk2frQua5dIkcREjL43g7RGkMIvb5wubJctbJktbJkzd6o0eKc/hrU4grgzd6gxdKMzdqcxdKQ1dqY2frA2frA4gbQ4gbU2frA3gbQ3grc2fbA2fbA1e6s9grQ1fKw+hbw5g7g5g7c2g7YwdJ88grX///8uhctHmNEhesk/ks8rgssshMtElc8ogMoxh8wpgcpFl9A2jM0whswlfsoeeMkmf8o2ic4jfMpClM9Bk88ziM05jc5Dk9E0isxJltJZotU6js5AkNBEjMBKmNIzhM1Un9U8kc47f687i89XoNROm9Madcj8/f5JmdE2gb5SntM/isVQmcxLlc8rgMwwerdLlMpDjMQ5eKU3dqNCib0+jtAwcZ5cpNROlspQndNHldJfptdHkctHi7tChbNFlNGPtc5ek7igwNZDh7i2zt7e6fE8h8Q6hcJWntEvg8wyfbtTnM8xhM44i81Lm9E4grZKkcVJgqo1e6zB1eJunb2FrcnR3+qrxdeBrMqXudFQirRYoNAwgMg+hbuAcFJ8AAAARHRSTlMA7/hT+BP2AfYIzEsNh2Zyeen09/YY/i729v/0+PbkHlv6+Cf5g0Ld1jxx9oyvwOfx9EfwzNJRgni0vlv6Zf7o5EKA+QUIjyQAAAJISURBVBgZdcCFQuIAGADgnxxht2d313XnHHjKOeWmbpONGp1hBnZnXFe86W1MDjA+SFGUvipVwBUNnS/PpQXS8xedpZAOeShtDDHLy8sLx3XSBwgkITV3Cw4Y+9KZ72zJzvwuuNcAF25XNi4EsKTAQl3lfUhQ3AkxvuEUHxNS1oDgUb1rUIQNilz1j4H3ROnCxnk+O+Ni7L5xHuZSPgNQFy26J3jug1XHJ8fq8dIEz71YpIY2pV3Ps4YcP3a9uxuORaueZ1e2QXuHm+O4icDaFirYcQTGOY5zd7RDlwXjOG74wy8vmrB5C+M4DrN0QU+MZlnWNPsVFf3ctrIsS8d6oDempyjKtL2BirbWrBRF6WO90G2hcRynLZuo6MvsOo7jtKUbmp7GcRxnw9OfUcG3mTCH43j8zWvQ9lknebRl5rsX9e5Mz65P8qx9WiguCZ+SJEnEp6bnP87PTJkIkiRPwyXFAJq/ZoNgzrQytWIyGwTm5xoAkKnihpEEwkkYRgSGuEoGAGpJkOrPRAXzEeBlF9FvM/TTZbkgKJYHiYF0RFCugITsMvO7NAPm8mwQKeR75FAKsVeRBReayueG3icNzanyICmrYt82mkTuS7LgvzyVc3RMNOpU5UKKWuI/0Ylsfoka0uSqnGM6wZhTlQPp1Pn+Q6Pg0J+vhgw5VYTOaDTqiKocyIRUH0U8Hk/kqBqBS2oLbUaP0VZYC5chLdGIJxJtQeAKWaFNZ5PL4CqkNXoSbYXraOV/5Fq4lmZeA9drLmmGG+RBmn9TM85gFMKHmQAAAABJRU5ErkJggg==',
			    shadowUrl: 	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC',

			    iconSize:     [25, 41], /* size of the icon */
			    shadowSize:   [41, 41], /* size of the shadow */
			    iconAnchor:   [10, 40], /* iconSize - 15 , iconSize - 1 */
			    shadowAnchor: [10, 39],	/* shadowSize - 32 , shadowSize - 2 */
			    popupAnchor:  [3, -26]	/* well, calibrate until you get the correct position */
			});

			switch(map_tile) {

				case 'gray': 	var _tile = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
								break;

				case 'carto': 	var _tile = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
								break;

				case 'voyager': var _tile = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
								break;

				case 'hot': 	var _tile = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
								break;

				default: 		var _tile = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
								break;

			};


			// Custom tile : overwrite
			if(map_tile_custom != '')
				var _tile = map_tile_custom;


			/* create the tile layer with correct attribution */
			var osmAttrib 	= '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
			var leafletUrl 	= '<a href="https://leafletjs.com/">Leaflet</a>';
			var osm 		= new L.TileLayer(_tile, {minZoom: 3, maxZoom: 18, attribution: osmAttrib});		
			var __map 		= [];
			var _rand 		= $.SOW.helper.randomStr(3, 'L');

			/* set up the map */
			map[_mapID] 	= new L.Map(_mapID);
			map[_mapID].addLayer(osm);
			map[_mapID].attributionControl.setPrefix(leafletUrl); 	// Leaflet copyright with target="_blank"


			for(var i=0; i < map_json.length; ++i) {

				var __lat__ 	= Number(map_json[i]['map_lat']) 	|| 0;
				var __lng__ 	= Number(map_json[i]['map_long']) 	|| 0;
				var __popup__ 	= map_json[i]['map_popup'] 			|| '';
				var __popup__ 	= __popup__.replace(/`/g, '"');

				/* add marker */
				__map[_rand] = L.marker([__lat__, __lng__], {icon: customIcon}).addTo(map[_mapID]);

				/* center map to first marker */
				if(i == 0)
					map[_mapID].setView(new L.LatLng(__lat__, __lng__), Number(__zoom__));

				/* add popup */
				if(__popup__ != '')
					__map[_rand].bindPopup(L.popup({maxWidth:300, autoClose:false, autoPan:false}).setContent("<div class='fs--14'>"+__popup__+"</div>")).openPopup();

			}



		}

	};


})(jQuery);
/**
 *
 *	[SOW] AOS
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependency 	-
 *	@Usage 			$.SOW.vendor.aos.init()
 * 	@Ajax Support 	YES
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 		= 'Vendor AOS';


	$.SOW.vendor.aos = {



		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {
			duration 	: 700, 					// 700
			easing 		: 'ease-in-out-sine', 	// 'ease-out-quad',
			once 		: true,
			// startEvent 	: 'load' 			// DO NOT USE! NOT WORKING IN OPERA!
		},





		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if (typeof AOS === "undefined") {

				var paths = $.SOW.helper.vendorLogicPaths('aos');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (typeof AOS === "undefined") {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.aos.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



			var __config 			= $.SOW.helper.check_var(config);
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			/**
				jQuery('[data-aos]').each(function() {
					var _once = jQuery(this).data('[data-aos-once]') || '';
					if(_once == '')
						jQuery(this).attr('data-aos-once', 'true');
				});
			**/


			AOS.init($.SOW.vendor.aos.config);

			if(!window["MutationObserver"])
				AOS.refreshHard();


		},

	};


})(jQuery);
/**
 *
 *	[SOW] Slimscroll
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependency 	-
 *	@Usage 			$.SOW.vendor.slimscroll.init('.slimscroll')
 * 	@Ajax Support 	YES
 *
 * 	@Issues			Slimscroll uses overflow-hidden so nothing outside is visible!
 					Admin expanded menu will not work!
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 		= 'Vendor Slimscroll';


	$.SOW.vendor.slimscroll = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {

			height: 			'100%',
			color: 				'#444',
			size: 				'3px',
			railColor: 			'#ccc',
			railOpacity: 		0.5,
			alwaysVisible: 		false,
			railVisible: 		true,
			position: 			($.SOW.globals.direction == 'ltr') ? 'right' : 'left',

			distance: 			'0',
			wheelStep: 			10,
			allowPageScroll: 	false,
			disableFadeOut: 	false

		},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 * 	
		 *
		 **/
		init: function (selector, config) {


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (!jQuery().slimScroll) {

				var paths = $.SOW.helper.vendorLogicPaths('slimscroll');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (!jQuery().slimScroll) {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.slimscroll.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


			// Disable on mobile device
			else if($.SOW.globals.is_mobile === true) {
				$.SOW.helper.consoleLog('Mobile disabled : ' + scriptInfo);
				return;
			}


			// Selector
			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);
			this.selector 			= __selector[0]; 	// '#selector'
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			$(this.selector).slimScroll({

				height: 			this.config.height,
				color: 				this.config.color,
				size: 				this.config.size,
				railColor: 			this.config.railColor,
				railOpacity: 		this.config.railOpacity,
				alwaysVisible: 		this.config.alwaysVisible,
				railVisible: 		this.config.railVisible,
				position: 			this.config.position,

				distance: 			this.config.distance,
				wheelStep: 			this.config.wheelStep,
				allowPageScroll: 	this.config.allowPageScroll,
				disableFadeOut: 	this.config.disableFadeOut

			});

			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			return $(this.selector);

		},



		/**
		 *
		 *	@destroy
		 *
		 *
		 **/
		destroy: function(selector) {

			$(selector).slimScroll({
				destroy: true
			});

		}

	};


})(jQuery);
/**
 *
 *	[SOW] Nestable
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependencies 	-
 *	@Usage 			$.SOW.vendor.nestable.init('.nestable');
 *
 * 	@Ajax Support 	YES
 *
 * 	Vendor: 		https://github.com/nolimits4web/swiper
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 				= 'Vendor Nestable';
	window.nestableLastUpdate 	= {};


	$.SOW.vendor.nestable = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {

			group 			: 0,
			maxDepth 		: 6,
			listNodeName    : 'ol',
			itemNodeName    : 'li',
			rootClass       : 'dd',
			listClass       : 'dd-list',
			itemClass       : 'dd-item',
			dragClass       : 'dd-dragel',
			handleClass     : 'dd-handle',
			collapsedClass  : 'dd-collapsed',
			placeClass      : 'dd-placeholder',
			noDragClass     : 'dd-nodrag',
			emptyClass      : 'dd-empty',
			expandBtnHTML   : '<button data-action="expand" type="button" aria-label="expand"></button>',
			collapseBtnHTML : '<button data-action="collapse" type="button" aria-label="collapse"></button>',
			maxDepth        : 5,
			threshold       : 0,

			// ajax params
			headers 		: '',
			crossDomain 	: '',
			method 			: 'POST',
			contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8', // jQuery default
			dataType 		: '', // 'json', 'html', 'text'
			headers 		: '',
			crossDomain 	: '',
			data_params 	: {ajax:'true'},
		},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {

			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (!jQuery().nestable) {

				var paths = $.SOW.helper.vendorLogicPaths('nestable');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (!jQuery().nestable) {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.nestable.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			// reset (ajax needed)
			window.nestableLastUpdate = {};

			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// 1. Has no selector
			if(!this.selector) {
				$.SOW.vendor.nestable.process($('.nestable'));
				return $('.nestable');
			}

			// 2. Has selector
			return this.collection.each(function() {
				
				$.SOW.vendor.nestable.process($(this));

			});

		},



		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {

			if(_this.hasClass('js-nestablified'))
				return;

			var nestableID 				= _this.attr('id')									|| '',
				_delWithChilds			= _this.data('nestable-delete-with-childs') 		|| "false",
				_maxDepth 				= _this.data('nestable-max-depth') 					|| 6,
				_rand 				 	= $.SOW.helper.randomStr(3, 'N'),
				nestableGroup 			= _this.data('nestable-group')						|| _rand,
				config 					= $.SOW.vendor.nestable.config;


			_this.addClass('js-nestablified');


			// overwrite defaults
			config.group 	= nestableGroup;
			config.maxDepth = Number(_maxDepth) || 6;



			// Add random ID if doesn't one
			if(nestableID == '') {
				nestableID = 'rand_' +_rand;
				_this.attr('id', nestableID);
			}


			// Init Nestable
			$('#'+nestableID).nestable(config).on('change', function(e) {

				// Update Output
				var _json = window.JSON.stringify(_this.nestable('serialize'));
				jQuery('textarea', _this).val(_json);

				// Ajax Update [avoid updating exactly the same]
				if(window.nestableLastUpdate[nestableID] != _json)
					$.SOW.vendor.nestable.updateOrder(_this, e);

				// save last change
				window.nestableLastUpdate[nestableID] = _json;
			});



			// Update Output on load
			var _json = window.JSON.stringify(_this.nestable('serialize'));
			jQuery('textarea', _this).val(_json);
			window.nestableLastUpdate[nestableID] = _json;


			// Bind remove item
			$.SOW.vendor.nestable.removeItem(_this);

		},




		/**
		 *
		 *	@updateOrder
		 *
		 *
		 **/
		updateOrder: function(_this, e) {

			var _updateParams 			= _this.data('ajax-update-params') 			|| '',
				_updateUrl 				= _this.data('ajax-update-url') 			|| '',
				_updateMethod 			= _this.data('ajax-update-method') 			|| $.SOW.vendor.nestable.config.method,
				_updateToastSuccess 	= _this.data('update-toast-success') 		|| 'Order Saved!',
				_updateToastPosition 	= _this.data('update-toast-position') 		|| 'bottom-center',
				data_params 			= $.SOW.vendor.nestable.config.data_params;

			if(_updateUrl == '')
				return;

			var list 			= e.length ? e : $(e.target);
			var _serialized 	= (window.JSON.stringify(list.nestable('serialize')));
			var _array 			= JSON.parse(_serialized);

			if(_updateParams != '') {

				var ajax_params_arr = $.SOW.helper.params_parse(_updateParams);
				for (var i = 0; i < ajax_params_arr.length; ++i) {
					data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
				}

			}


			// add data
			data_params.array 		= _array;
			data_params.serialized 	= _serialized;


			// UPDATE ORDER VIA AJAX
			jQuery.ajax({
				url:			_updateUrl,
				data: 			data_params,
				type: 			_updateMethod,
				contentType: 	$.SOW.vendor.nestable.config.contentType,
				dataType: 		$.SOW.vendor.nestable.config.dataType,
				headers: 		$.SOW.vendor.nestable.config.headers,
				crossDomain: 	$.SOW.vendor.nestable.config.crossDomain,

				beforeSend: function() {

					// Add Ajax Loading Block
					_this.prepend('<div class="nestableOverlayLoading d-middle overlay-light overlay-opacity-5 absolute-full z-index-1"><i class="'+$.SOW.config.sow__icon_loading+' fs--30 text-muted"></i></div>');

				},

				error: 	function(XMLHttpRequest, textStatus, errorThrown) {

					if(typeof $.SOW.core.toast === 'object') {
						$.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', _updateToastPosition, 0, true);
					} else {
						alert("[404] Unexpected internal error!");
					}

					jQuery('.nestableOverlayLoading', _this).remove();

				},

				success: function(data) {
					
					$.SOW.helper.consoleLog(data);

					jQuery('.nestableOverlayLoading', _this).remove();
					if(typeof $.SOW.core.toast === 'object')
						$.SOW.core.toast.show('success', '', _updateToastSuccess, _updateToastPosition, 1500, true);

					// required
					$.SOW.vendor.nestable.removeItem(_this);

				}
			});


		},



		removeItem: function(_this) {


			var _delWithChilds 			= _this.data('update-delete-with-childs') 			|| 'false',
				_delWithChildsError 	= _this.data('update-delete-with-childs-error') 	|| 'Move or delete childs first!',
				_toastPos 				= _this.data('update-toast-position') 				|| 'bottom-center',
				_deleteParams 			= _this.data('update-delete-params') 				|| '',
				_updateMethod 			= _this.data('ajax-update-method') 					|| $.SOW.vendor.nestable.config.method,
				_updateUrl 				= _this.data('ajax-update-url') 					|| '',
				_confirmBeforeDelete	= _this.data('update-delete-confirm-first')			|| 'false',
				_confirmSelector 		= (typeof $.SOW.core.ajax_confirm === 'object') ? $.SOW.core.ajax_confirm.__selector() : '',
				_confirmSelectorClass	= _confirmSelector.replace('.',''),
				data_params 			= $.SOW.vendor.nestable.config.data_params;

			var _modal_confirm_size = _this.data('ajax-confirm-size') 				|| '', 		// modal-sm, modal-md, modal-lg , modal-full
				_modal_centered		= _this.data('ajax-confirm-centered') 			|| '', 		// true|false
				_confirmCallback	= _this.data('ajax-confirm-callback-function')	|| '', 		// custom function
				_confirmType 		= _this.data('ajax-confirm-type')				|| '',		// confirmation type: danger|warning|etc. empty for normal/clean
				_confirmMode 		= _this.data('ajax-confirm-mode')				|| '',		// confirmation type: regular|ajax
				_confirmMethod 		= _this.data('ajax-confirm-method')				|| '',		// confirmation method: GET|POST

		    	_confirmTitle		= _this.data('ajax-confirm-title') 				|| '',		// modal title
		    	_confirmBody 		= _this.data('ajax-confirm-body') 				|| '',		// message | question
		    	
		    	_confirmBtnYesTxt 	= _this.data('ajax-confirm-btn-yes-text') 		|| '',		// button text
		    	_confirmBtnYesClass = _this.data('ajax-confirm-btn-yes-class') 		|| '',		// button class
		    	_confirmBtnYesIcon 	= _this.data('ajax-confirm-btn-yes-icon') 		|| '',		// button icon. eg: fi fi-check

		    	_confirmBtnNoTxt 	= _this.data('ajax-confirm-btn-no-text') 		|| '',		// button text
		    	_confirmBtnNoClass 	= _this.data('ajax-confirm-btn-no-class') 		|| '',		// button class
		    	_confirmBtnNoIcon 	= _this.data('ajax-confirm-btn-no-icon') 		|| '';		// button icon. eg: fi fi-check


			jQuery('a.nestable-del', _this).off().on('click', function(e) {
				e.preventDefault();

				var _t 					= jQuery(this),
					_li 				= _t.closest('li'),
					_id 				= _li.attr('data-id'),				// item id (should be the database item id)
					_href 				= _t.attr('href') 		|| '#',
					_href_data 			= _t.data('href') 		|| '',
					_href_data2 		= _t.data('href2') 		|| '',
					_childs 			= [],
					_stopScript 		= false;


				// because of confirm plugin!
				if(_href == '#' && _href == '' && _href == 'javascript:;') {
					_t.attr('href', '#');
					_t.attr('data-href2', _href);
				}

				if(_href_data != '') {
					var _href = _href_data;

					// because of confirm plugin!
					_t.removeAttr('data-href');
					_t.attr('data-href2', _href);
				}

				if(_href_data2 != '')
					var _href = _href_data2;



				// We use href. If href is empty (#), the we use _updateUrl
				// the same with reorder!
				if(_href == '#' || _href == '' || _href == 'javascript:;') {
					var _orig_href = _href; // to print info on success
					var _href = _updateUrl;
				}



				// Check delete
				if(_delWithChilds+'' == 'false') {

					if(jQuery('ol.dd-list', _li).length > 0) {
						// e.stopPropagation();

						if(typeof $.SOW.core.toast === 'object') {
							$.SOW.core.toast.destroy();
							$.SOW.core.toast.show('danger', '', _delWithChildsError, _toastPos, 4000, true);
						} else {
							alert(_delWithChildsError);
						}

						_t.removeClass('js-ajax-modal js-modalified');
						return;
					}

				}


				

				




				// Ajax Modal/Confirm -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
				if(_t.hasClass('nestable-ajax-modal')) {

					if(typeof $.SOW.core.ajax_modal === 'object')
						$.SOW.core.ajax_modal.attach(_t, 0);
					else alert('[SOW : Ajax Modal] plugin not found!');

				} else {

					if(typeof $.SOW.core.ajax_confirm === 'object') {

						if(_confirmBeforeDelete+'' == 'true' && !_t.hasClass(_confirmSelectorClass) && !_t.hasClass('js-confirmed')) {

						    _t.attr('data-ajax-confirm-size', _modal_confirm_size);
						    _t.attr('data-ajax-confirm-centered', _modal_centered);
						    _t.attr('data-ajax-confirm-callback-function', _confirmCallback);
						    _t.attr('data-ajax-confirm-type', _confirmType);
						    _t.attr('data-ajax-confirm-mode', _confirmMode);
						    _t.attr('data-ajax-confirm-method', _confirmMethod);
						    _t.attr('data-ajax-confirm-title', _confirmTitle);
						    _t.attr('data-ajax-confirm-body', _confirmBody);
						    _t.attr('data-ajax-confirm-btn-yes-text', _confirmBtnYesTxt);
						    _t.attr('data-ajax-confirm-btn-yes-class', _confirmBtnYesClass);
						    _t.attr('data-ajax-confirm-btn-yes-icon', _confirmBtnYesIcon);
						    _t.attr('data-ajax-confirm-btn-no-text', _confirmBtnNoTxt);
						    _t.attr('data-ajax-confirm-btn-no-class', _confirmBtnNoClass);
						    _t.attr('data-ajax-confirm-btn-no-icon', _confirmBtnNoIcon);

							_t.addClass(_confirmSelectorClass+' js-nestable-confirmation-pending');
							$.SOW.core.ajax_confirm.init(_confirmSelector);
							$.SOW.core.ajax_confirm.ajax_confirm(_t);
							_t.trigger('click'); // submit

							setTimeout(function() {
								_t.removeClass(_confirmSelectorClass);

								jQuery('#sow_ajax_confirm .btn-confirm-yes').not('js-nestablified').addClass('js-nestablified').on('click', function(e) {
									e.preventDefault();

									_t.addClass('js-confirmed');
									_t.removeClass('js-nestable-confirmation-pending'); 	// 1. remove pending class
									_t.removeClass(_confirmSelectorClass); 					// 2. remove confirm class
									_t.trigger('click'); 									// 3. submit again
								});

							},100);

							return;
						} 

					} else {

						if(confirm(_confirmBody) === false) {
							return;
						} else {
							_t.addClass('js-confirmed');
						}

					} 

				} // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
				if(_t.hasClass('js-nestable-confirmation-pending')) 
					return;

				if(_confirmBeforeDelete+'' == 'true' && !_t.hasClass('js-confirmed'))
					return;



				if(_deleteParams != '') {

					var ajax_params_arr = $.SOW.helper.params_parse(_deleteParams);
					for (var i = 0; i < ajax_params_arr.length; ++i) {
						data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
					}

				}

				// Get all childs
				jQuery('li', _li).each(function() {
					_childs.push(jQuery(this).data('id') || 0);
				});

				// Add item id
				data_params.id 		= _id;
				data_params.childs 	= _childs;
				data_params.info 	= 'Info: `id` = the id to delete! `childs` = childs of this id! (if data-update-delete-with-childs="true")';

				// UPDATE ORDER VIA AJAX
				jQuery.ajax({
					url:			_href,
					data: 			data_params,
					type: 			_updateMethod,
					contentType: 	$.SOW.vendor.nestable.config.contentType,
					dataType: 		$.SOW.vendor.nestable.config.dataType,
					headers: 		$.SOW.vendor.nestable.config.headers,
					crossDomain: 	$.SOW.vendor.nestable.config.crossDomain,

					beforeSend: function() {

						// Add Ajax Loading Block
						_this.prepend('<div class="nestableOverlayLoading d-middle overlay-light overlay-opacity-5 absolute-full z-index-1"><i class="'+$.SOW.config.sow__icon_loading+' fs--30 text-muted"></i></div>');

					},

					error: 	function(XMLHttpRequest, textStatus, errorThrown) {

						if(typeof $.SOW.core.toast === 'object') {
							$.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', 'bottom-center', 0, true);
						} else {
							alert("[404] Unexpected internal error!");
						}

						jQuery('.nestableOverlayLoading', _this).remove();

					},

					success: function(data) {
						
						$.SOW.helper.consoleLog(data);

						jQuery('.nestableOverlayLoading', _this).remove();

						// Remove node, with style :)
						_li.addClass('bg-danger-soft transition-all-ease-150');
						setTimeout(function() {

							// get remaining items
							var _thisNode 	= _t.closest('ol.dd-list');
							var _parentNode = _thisNode.closest('li.dd-item');

							_li.fadeOut(150, function() {
								_li.remove();

								// check for remaining childs, else remove main node
								if(jQuery('.dd-item', _thisNode).length < 1) {
									jQuery('button', _parentNode).remove();
									_thisNode.remove();
								}

							});

						},150);

						// Info only!
						if(_orig_href == '#' || _orig_href == '' || _orig_href == 'javascript:;')
							$.SOW.helper.consoleLog('[Nestable Delete Item] : [ajax-update-method] used to POST data because href="'+_href+'"');


					}
				});


			});

		}


	};


})(jQuery);
/**
 *
 *	[SOW] FullCalendar
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependencies 	-
 *	@Usage 			$.SOW.vendor.fullcalendar.init('.fullcalendar');
 *
 * 	@Ajax Support 	YES
 *
 * 	Vendor: 		https://fullcalendar.io/
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 					= 'Vendor FullCalendar';
	window.fullCalendarInstance 	= {};

	$.SOW.vendor.fullcalendar = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {
			plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list', 'bootstrap', 'googleCalendar' ],



			/** 

				We rewrite the plugin by injecting the variables
				because, obviously this plugin hardcoded everything!
				node_modules/@fullcalendar/bootstrap/main.js

			**/
			kickBsPlugin: function(theme) {
				var theme = (theme) ? theme : 'primary';

				if(typeof FullCalendarBootstrap !== 'object')
					return;

				FullCalendarBootstrap.BootstrapTheme.prototype.baseIconClass 					= 'm-0 fi';
			    FullCalendarBootstrap.BootstrapTheme.prototype.iconOverrideOption 				= 'smartyAwesopme';
			    FullCalendarBootstrap.BootstrapTheme.prototype.iconOverrideCustomButtonOption 	= 'smartyAwesopme';
			    FullCalendarBootstrap.BootstrapTheme.prototype.iconOverridePrefix 				= 'fi-';
				FullCalendarBootstrap.BootstrapTheme.prototype.iconClasses = {
					close: 		'fi-close',
					prev: 		'fi-arrow-left',
					next: 		'fi-arrow-right',
					prevYear: 	'fi-arrow-left',
					nextYear: 	'fi-arrow-right'
				};

				FullCalendarBootstrap.BootstrapTheme.prototype.classes.popover 		= 'card card-'+theme;
				FullCalendarBootstrap.BootstrapTheme.prototype.classes.button 		= 'btn btn-'+theme+' btn-sm';
				FullCalendarBootstrap.BootstrapTheme.prototype.classes.listView 	= 'card card-'+theme;

			},


			// ajax params
			headers 		: '',
			crossDomain 	: '',
			method 			: 'GET',
			contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8', // jQuery default
			dataType 		: '', // 'json', 'html', 'text'
			headers 		: '',
			crossDomain 	: '',
			data_params 	: {ajax:'true'},

		},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (typeof FullCalendar !== 'object') {

				var paths = $.SOW.helper.vendorLogicPaths('fullcalendar');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (typeof FullCalendar !== 'object') {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.fullcalendar.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				


			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			if(jQuery(this.selector).length < 1)
				return null;


			// Rewrite default fullcalendar bootstrap plugin
			if(typeof FullCalendarBootstrap === 'object')
				$.SOW.vendor.fullcalendar.config.kickBsPlugin('primary');


			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// 1. Has no selector
			if(!this.selector) {
				$.SOW.vendor.fullcalendar.process($('.fullcalendar'));
				return $('.fullcalendar');
			}

			// 2. Has selector
			return this.collection.each(function() {
				
				$.SOW.vendor.fullcalendar.process($(this));

			});

		},



		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {

			var calendarID 				= _this.attr('id') 												|| '',

				plugins  				= _this.data('fullcalendar-plugins') 							|| '',
				defaultView  			= _this.data('fullcalendar-default-view') 						|| 'dayGridMonth', // dayGridMonth,timeGridWeek,timeGridDay,listWeek

				modalSize  				= _this.data('fullcalendar-modal-size') 						|| 'modal-lg',

				// Create
				createInModal  			= _this.attr('data-fullcalendar-event-create-modal') 			|| true,
				createUrl 				= _this.data('fullcalendar-modal-event-create') 				|| '',

				// Edit
				editInModal  			= _this.attr('data-fullcalendar-event-edit-modal') 				|| true,
				editURL  				= _this.data('fullcalendar-modal-event-edit') 					|| '',

				// Date Click
				dateClickAction  		= _this.data('fullcalendar-date-click') 						|| '', // 'modal', 'redirect'
				dateClickURL  			= _this.data('fullcalendar-modal-date-click-modal') 			|| '',

				fcCustom  				= _this.data('fullcalendar-custom') 							|| '',
				fcExtend  				= _this.data('fullcalendar-extend') 							|| '',
				
				// data sources
				jsonSources 			= _this.data('fullcalendar-source-json-url') 					|| '',
				inlineSource 			= _this.data('fullcalendar-source-json-inline') 				|| '',
				objectSource 			= _this.data('fullcalendar-source-object') 						|| '',
				
				buttonText 				= _this.data('fullcalendar-lang-btn') 							|| '',
				header 					= _this.data('fullcalendar-header') 							|| '',
				editable 				= _this.attr('data-fullcalendar-editable') 						|| false,
				eventTimeFormat 		= _this.data('fullcalendar-time-format') 						|| '',
				defaultDate 			= _this.data('fullcalendar-default-date') 						|| 'now',
				timezone 				= _this.data('fullcalendar-timezone') 							|| 'local',

				// google calendar
				googleCalApiKey 		= _this.data('fullcalendar-google-apikey')						|| '',
				googleCalSources 		= _this.data('fullcalendar-google-event-sources')				|| '';


			// Add random ID if doesn't one
			if(calendarID == '') {
				calendarID = 'rand_' + $.SOW.helper.randomStr(3, 'N');
				_this.attr('id', calendarID);
			}

			if(typeof jsonSources !== 'object')
				jsonSources = false;

			if(typeof inlineSource !== 'object')
				inlineSource = null;

			if(typeof window[objectSource] === 'object') {
				inlineSource = window[objectSource];
			}
			

			// bool needed for easy use
			var editable = (editable+'' == 'true') ? true : false;

			if(typeof buttonText !== 'object') {
				var buttonText = {
					today 	: 'today',
					month 	: 'month',
					week 	: 'week',
					day 	: 'day',
					list 	: 'list'
				}
			}

			if(typeof header !== 'object') {
				var header = {
					left 	: 'prev,next, today, customAddEventButton',
					center 	: 'title',
					right 	: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
				};
			}


			if(typeof eventTimeFormat !== 'object') {
				var eventTimeFormat = {
					hour 		: 'numeric',
					minute 		: '2-digit',
					meridiem 	: 'short'
				};
			}

			if(defaultDate == 'today' || defaultDate == 'now') {
				defaultDate = new Date();
			} else {
				defaultDate = new Date(defaultDate);
			}

			var _defaults = {

				plugins 		: (typeof plugins === 'object') ? plugins : $.SOW.vendor.fullcalendar.config.plugins, 

				editable 		: editable,
				eventLimit 		: true, // allow "more" link when too many events
				locale 			: 'en', // enable 'locales-all.js' or 'de|fr|etc.js' on config
				themeSystem 	: 'bootstrap',
				defaultView 	: defaultView || 'dayGridMonth',
				defaultDate 	: defaultDate,
				dir 			: $.SOW.globals.direction, 	// LTR|RTL

				timeZone 		: timezone,
				eventTimeFormat : eventTimeFormat,

				// instead of `locale` .js file
				buttonText 		: buttonText,

				header 			: header,

				customButtons: {

					customAddEventButton: {
						text: '+',

						click: function(info) {
							if(editable === true) {
							// console.log(info);

								if(createInModal+'' == 'true') {

									if(createUrl != '' && typeof $.SOW.core.ajax_modal === 'object') {
										$.SOW.helper.consoleLog(createUrl, 'color:#cccccc');

										// Programtically Create Modal 	: 		      url , 'modal-md', 'true' (centered)
										$.SOW.core.ajax_modal.createFromThinAir(createUrl, modalSize, 'true', 'static', function() {

											// CALLBACK
											setTimeout(function() {

												// item id, if empty
												var item_id = jQuery('#event_id').attr('id') || '';
												if(item_id == '') {
													var item_id = new Date().getTime();
													jQuery('#event_id').attr('id', item_id);
												}

												jQuery('.btn-fullcalendar-add').on('click',function(e) {

													$.SOW.vendor.fullcalendar.eventCreate(calendarID, item_id);

												});

											}, 250);

										});

									}

								} else {

								if(createUrl != '')
									window.location = createUrl;

								}

							}
						} // end click

					}

                },

                // https://fullcalendar.io/docs/google-calendar
                // https://calendar.google.com/calendar/r
                googleCalendarApiKey : (googleCalApiKey) ? googleCalApiKey : null,


				// https://fullcalendar.io/docs/event-parsing
				events: (typeof inlineSource === 'object') ? inlineSource : false,

				// https://fullcalendar.io/docs/events-json-feed
				eventSources: (typeof jsonSources === 'object') ? jsonSources : false,



				// for edit
				eventClick:  function(info) {
					if(editable === true) {

						// console.log(info);
						// console.log(info.event.title);
						// console.log(info.event.id);

						if(editInModal+'' == 'true') {


							// Prevent URL redirect
							info.jsEvent.preventDefault(); // don't let the browser navigate
							if(info.event.url) {}


							if(editURL != '' && typeof $.SOW.core.ajax_modal === 'object') {
								$.SOW.helper.consoleLog(editURL+info.event.id, 'color:#cccccc');

								// Programtically Create Modal 	: 		      url , 'modal-md', 'true' (centered), 'null|static' (backdrop), callback
								$.SOW.core.ajax_modal.createFromThinAir(editURL+info.event.id, modalSize, 'true', 'static', function() {

									// CALLBACK
									setTimeout(function() {
										
										// get & assign data
										$.SOW.vendor.fullcalendar.eventGet(info, calendarID);

										// item id, if empty
										var item_id = jQuery('#event_id').attr('id') || '';
										if(item_id == '') {
	                        				var item_id = new Date().getTime();
	                        				jQuery('#event_id').attr('id', item_id);
										}

										// save
										jQuery('.btn-fullcalendar-edit').on('click',function(e) {

											$.SOW.vendor.fullcalendar.eventEdit(info, calendarID, item_id);

										});


										// delete
										jQuery('.btn-fullcalendar-remove').on('click',function(e){
											info.event.remove();
										});


									}, 450);

								});



							}

						} else {

							if(editURL != '')
								window.location = editURL+info.event.id;

						}


					}
				},



				// https://fullcalendar.io/docs/dateClick
				dateClick: function(info) {
					if(editable === true) {

						// console.log(info);
						// console.log(info.allDay);
						// console.log(info.dateStr);
						if(dateClickAction == 'modal' && dateClickURL != '') {

							if(typeof $.SOW.core.ajax_modal === 'object') {
								$.SOW.helper.consoleLog(dateClickURL+info.dateStr, 'color:#cccccc');

								// Programtically Create Modal 	: 		      url , 'modal-md', 'true' (centered), 'null|static' (backdrop), callback
								$.SOW.core.ajax_modal.createFromThinAir(dateClickURL+info.dateStr, modalSize, 'true', 'static', function() {

									// CALLBACK
									setTimeout(function() {

										var _now 		= new Date();
										var _hrs 		= _now.getHours();
										var _mins 		= _now.getMinutes();
										if(_hrs < 10)	_hrs = '0'+_hrs;
										if(_mins < 10)	_mins = '0'+_mins;
										var _time 		= _hrs + ':' + _mins;

										jQuery('#start').val(info.dateStr + ' ' +_time);
										jQuery('#start').attr('data-date-start', info.dateStr + ' ' +_time);
										// jQuery('#allDay').prop('checked', true);

										// item id, if empty
										var item_id = jQuery('#event_id').attr('id') || '';
										if(item_id == '') {
	                        				var item_id = new Date().getTime();
	                        				jQuery('#event_id').attr('id', item_id);
										}

										jQuery('.btn-fullcalendar-add').on('click',function(e) {

											$.SOW.vendor.fullcalendar.eventCreate(calendarID, item_id);

										});

									}, 250);

								});
								
							
							}

						} 

						else if(dateClickAction == 'redirect' && dateClickURL != '') {

							window.location = dateClickURL+info.dateStr;

						}

					}
				},



				eventRender: function(info) {

					// Yeah! Let's add a rangepicker on title!
					if(jQuery('#'+calendarID + ' .fc-toolbar #fc_smarty_custom_range').length < 1) {
						
						jQuery('#'+calendarID + ' .fc-toolbar h2').wrap('<a href="#" class="link-muted" id="fc_smarty_custom_range"></a>');
					
					} else {

						// range picker
						if(!jQuery('#'+calendarID + ' #fc_smarty_custom_range').hasClass('js-tangepickified')) {

							jQuery('#'+calendarID + ' #fc_smarty_custom_range').on('click', function(e) {
								e.preventDefault();

							});

						}
					}

				},



				eventResize: function(info) {
					if(editable === true) {

						var start 	= info.event.start.toISOString();
						var end 	= (info.event.end) ? info.event.end.toISOString() : info.event.start.toISOString();

						$.SOW.vendor.fullcalendar.ajaxReq(editURL, calendarID, info.event.id, start, end, 'resize');
						
						//alert(info.event.title + " end is now " + info.event.end.toISOString());

						// if (!confirm("is this okay?")) {
						// 	info.revert();
						// }

					}
				},



				eventDrop: function(info) {
					if(editable === true) {

						var start 	= info.event.start.toISOString();
						var end 	= (info.event.end) ? info.event.end.toISOString() : info.event.start.toISOString();

						$.SOW.vendor.fullcalendar.ajaxReq(editURL, calendarID, info.event.id, start, end, 'drag');
						
						// alert(info.event.title + " was dropped on " + info.event.start.toISOString());

						// if (!confirm("Are you sure about this change?")) {
						// 	info.revert();
						// }

					}
				}


			};



			var _defaults 	= (typeof window[fcExtend] === 'object') ? $.extend({}, _defaults, window[fcExtend]) : _defaults;
			var calendarEl	 = document.getElementById(calendarID);

			// CUSTOM : OVERWRITE EVERYTHING!
			if(typeof window[fcCustom] === 'object') {

				var _defaults = {

					themeSystem 	: 'bootstrap',
					defaultView 	: defaultView || 'dayGridMonth',
					defaultDate 	: new Date(),
					dir 			: $.SOW.globals.direction, // LTR|RTL
					header 			: {
										left 	: 'prev,next, today',
										center 	: 'title',
										right 	: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
									}

				};

				var _defaults 	= $.extend({}, _defaults, window[fcCustom]);
			}

			window.fullCalendarInstance[calendarID] = new FullCalendar.Calendar(calendarEl, _defaults);
			window.fullCalendarInstance[calendarID].render();

		},




		/**
		 *
		 *	@ajaxReq
		 *	used on update (drag/drop).
		 *	create/edit is used by form post
		 *
		 *
		 **/
		ajaxReq: function(_updateUrl, calendarID, event_id, start, end, action) {

			if(_updateUrl == '')
				return;

			var _updateMethod 			= jQuery('#' + calendarID).data('ajax-method') 			|| $.SOW.vendor.fullcalendar.config.method,
				_toastSuccessMsg		= jQuery('#' + calendarID).data('toast-success') 		|| 'Sucessfully Updated!',
				_toastPosition			= jQuery('#' + calendarID).data('toast-position') 		|| 'top-center',
				data_params 			= $.SOW.vendor.fullcalendar.config.data_params;

			var _url = _updateUrl + event_id+'&start='+start+'&end='+end+'&action='+action+'&ajax=true';

			// UPDATE ORDER VIA AJAX
			jQuery.ajax({
				url:			_url,
				data: 			null,
				type: 			_updateMethod,
				contentType: 	$.SOW.vendor.fullcalendar.config.contentType,
				dataType: 		$.SOW.vendor.fullcalendar.config.dataType,
				headers: 		$.SOW.vendor.fullcalendar.config.headers,
				crossDomain: 	$.SOW.vendor.fullcalendar.config.crossDomain,

				beforeSend: function() {},

				error: 	function(XMLHttpRequest, textStatus, errorThrown) {

					if(typeof $.SOW.core.toast === 'object') {
						$.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', _toastPosition, 0, true);
					} else {
						alert("[404] Unexpected internal error!");
					}

				},

				success: function(data) {

					$.SOW.helper.consoleLog(_url);

					setTimeout(function() {

					if(typeof $.SOW.core.toast === 'object')
						$.SOW.core.toast.show('success', '', _toastSuccessMsg, _toastPosition, 1300, true);

					},150);

				}
			});

		},



		/**
		 *
		 *	@dateFormat
		 *
		 *
		 **/
		dateFormat: function(_d) {

			if(!_d) return null;

			if (typeof moment === 'function')
				return moment(_d, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');

			var _s 			= new Date(_d);
			var _offset 	= _s.getTimezoneOffset()  / 60,
				_offset 	= (_offset > 0) ? _offset / 60 : 0;
			var _mo 		= _s.getMonth() + 1;
			var _day 		= _s.getDate();
			var _hrs 		= _s.getHours() + _offset;
			var _min 		= _s.getMinutes();

			if(_mo < 10) 	_mo 	= '0'+_mo;
			if(_day < 10) 	_day 	= '0'+_day;
			if(_hrs < 10) 	_hrs 	= '0'+_hrs;
			if(_min < 10) 	_min 	= '0'+_min;

			return _s.getFullYear() + '-' +_mo + '-' + _day + ' ' + _hrs + ':'+_min;

		},



		/**
		 *
		 *	@eventCreate
		 *
		 *
		 **/
		eventCreate: function(calendarID, item_id) {

			var start 				= jQuery('#start').val();
			var end 				= jQuery('#end').val() 			|| null;
			var startRecur 			= jQuery('#startRecur').val() 	|| null;
			var endRecur 			= jQuery('#endRecur').val() 	|| null;
			var daysOfWeek 			= jQuery('#daysOfWeek').val() 	|| null;
			var recurrent_enable 	= jQuery('#recurrent_enable').is(':checked');

			if(!recurrent_enable) {
				var startRecur 	= null;
				var endRecur 	= null;
				var daysOfWeek 	= null;
			}

			var start 		= start 		? start.replace(' ', 'T')+':00' 		: start;
			var end 		= end 			? end.replace(' ', 'T')+':00' 			: end;
			var startRecur 	= startRecur 	? startRecur.replace(' ', 'T')+':00' 	: startRecur;
			var endRecur 	= endRecur 		? endRecur.replace(' ', 'T')+':00' 		: endRecur;


			window.fullCalendarInstance[calendarID].addEvent({
				id: 			item_id,
				title: 			jQuery('#title').val(),
				start: 			start,
				end: 			end,
				allDay: 		end ? false : true, //(jQuery('#allDay').is(':checked')) ? true : false,
				description: 	jQuery('#description').val(),
				className: 		jQuery('#className').val(),
				startRecur: 	startRecur,
				endRecur: 		endRecur,
				daysOfWeek: 	daysOfWeek,
				editable: 		true,
				startEditable: 	true,
				durationEditable: 	true,
				resourceEditable: 	true
			});

			$.SOW.vendor.fullcalendar.refetchEvents(calendarID);

		},




		/**
		 *
		 *	@eventEdit
		 *
		 *
		 **/
		eventEdit: function(info, calendarID, item_id) {

			var start 				= jQuery('#start').val();
			var end 				= jQuery('#end').val() 							|| null;
			var startRecur 			= jQuery('#startRecur').val() 					|| null;
			var endRecur 			= jQuery('#endRecur').val() 					|| null;
			var className 			= jQuery('#className').val() 					|| '';
			var daysOfWeek 			= jQuery('#daysOfWeek').val() 					|| null;
			var recurrent_enable 	= jQuery('#recurrent_enable').is(':checked');

			if(!recurrent_enable) {
				var startRecur 	= null;
				var endRecur 	= null;
				var daysOfWeek 	= null;
			}


			if(start) 
				var start 		= start.replace(' ', 'T')+':00';

			if(end)
				var end 		= end.replace(' ', 'T')+':00';

			if(startRecur) {
				var startRecur 	= startRecur.replace(' ', 'T')+':00';
				info.event.setProp('startRecur', 	startRecur);
			}

			if(endRecur) {
				var endRecur 	= endRecur.replace(' ', 'T')+':00';
				info.event.setProp('endRecur', 		endRecur);
			}

			info.event.setProp('daysOfWeek', 		daysOfWeek);


			info.event.setStart(start);
			info.event.setEnd(end);
			info.event.setAllDay(end ? false : true);

			info.event.setProp('title', 		jQuery('#title').val());
			info.event.setProp('className', 	className.split(' '));
			info.event.setExtendedProp('description', 	jQuery('#description').val());

			$.SOW.vendor.fullcalendar.refetchEvents(calendarID);

		},




		/**
		 *
		 *	@eventGet
		 *
		 *
		 **/
		eventGet: function(info, calendarID) {


			var _start 		= info.event.start 		|| '';
			var _end 		= info.event.end 		|| null;
			var _startRecur = (typeof info.event._def.recurringDef !== 'undefined') ? info.event._def.recurringDef.typeData.startRecur 	: null;
			var _endRecur 	= (typeof info.event._def.recurringDef !== 'undefined') ? info.event._def.recurringDef.typeData.endRecur 	: null;
			var _daysOfWeek = (typeof info.event._def.recurringDef !== 'undefined') ? info.event._def.recurringDef.typeData.daysOfWeek 	: null;
			var className 	= info.event._def.ui.classNames.join(' ') || null;




			// set selected daysOfWeek
			if(_daysOfWeek) {
				if(_daysOfWeek.length > 0) {
					
					jQuery('#recurrent_enable').trigger('click');

					for(var d = 0; d<_daysOfWeek.length; d++) {
						jQuery('#daysOfWeek option[value='+_daysOfWeek[d]+']').attr('selected','selected');
					}

					// Refresh bootstrap select
					if(typeof $.SOW.vendor.bootstrap_select === 'object')
						$.SOW.vendor.bootstrap_select.refresh('#daysOfWeek');

				}
			}


			// get all in a dynamic way
			var extendedProps = (info.event._def.extendedProps) ? info.event._def.extendedProps : null;
			for(var extEl in extendedProps) {
				jQuery('#'+extEl).val(extendedProps[extEl]);
				jQuery('#info_'+extEl).html(extendedProps[extEl]);
				jQuery('#info_'+extEl+' a').addClass('link-muted').attr('target', 'fullcalendar').attr('rel', 'noopener');
			}
			// --
			var _start 		= $.SOW.vendor.fullcalendar.dateFormat(_start);
			var _end 		= $.SOW.vendor.fullcalendar.dateFormat(_end);
			var _startRecur = $.SOW.vendor.fullcalendar.dateFormat(_startRecur);
			var _endRecur 	= $.SOW.vendor.fullcalendar.dateFormat(_endRecur);

			jQuery('#start').val(_start);
			jQuery('#start').attr('data-date-start', _start);
			
			jQuery('#end').val(_end);
			if(_end) {
				jQuery('#end').attr('data-date-start', _end);
			}

			jQuery('#startRecur').val(_startRecur);
			jQuery('#endRecur').val(_endRecur);

			jQuery('#info_start').text(_start || '–');
			jQuery('#info_end').text(_end || '–');
			jQuery('#info_startRecur').text(_startRecur || '–');
			jQuery('#info_endRecur').text(_endRecur || '–');
			jQuery('#info_title').text(info.event.title || '–');

			if(info.event.url) {
				jQuery('#info_url').html('<a class="link-muted" href="'+info.event.url+'" target="fullcalendar">'+info.event.url+'</a>');
			}

			// --
			jQuery('#title').val(info.event.title || '');
			jQuery('#url').val(info.event.url || '');
			// --
			if(className != '') {

				jQuery('#className').val(className);
				jQuery('#info_className').addClass(className);

				// Refresh bootstrap select
				if(typeof $.SOW.vendor.bootstrap_select === 'object')
					$.SOW.vendor.bootstrap_select.refresh('#className');

			}

		},




		/**
		 *
		 *	@refetchEvents
		 *
		 *
		 **/
		refetchEvents: function(calendarID) {

			if(typeof window.fullCalendarInstance[calendarID] === 'object') {
				window.fullCalendarInstance[calendarID].refetchEvents();
			}

		}

	};


})(jQuery);
/**
 *
 *	[SOW] Datepicker
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependencies 	-
 *	@Usage 			$.SOW.vendor.datepicker.init('.datepicker');
 *
 * 	@Ajax Support 	YES
 *
 * 	Vendor: 		https://github.com/uxsolutions/bootstrap-datepicker
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 				= 'Vendor Datepicker';


	$.SOW.vendor.datepicker = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {
			// ajax params
			headers 		: '',
			crossDomain 	: '',
			method 			: 'POST',
			contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8', // jQuery default
			dataType 		: '', // 'json', 'html', 'text'
			headers 		: '',
			crossDomain 	: '',
			data_params 	: {ajax:'true'},
		},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (!jQuery().datepicker) {

				var paths = $.SOW.helper.vendorLogicPaths('datepicker');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (!jQuery().datepicker) {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.datepicker.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;



			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// 1. Has no selector
			if(!this.selector) {
				$.SOW.vendor.datepicker.process($('.datepicker'));
				return $('.datepicker');
			}

			// 2. Has selector
			return this.collection.each(function() {
				
				$.SOW.vendor.datepicker.process($(this));

			});

		},



		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {

			if(_this.hasClass('js-datepickified'))
				return;

			// Links
			if(_this.attr('href') != '') {
				_this.on('click', function(e) {
					e.preventDefault();
				});
			}

			var itemID 					= _this.data('id') 							|| '',
				language 				= _this.data('lang') 						|| 'en',
				format 					= _this.data('format') 						|| 'mm/dd/yyyy',
				format 					= format.toLowerCase(),
				startDate 				= _this.data('date-start') 					|| -Infinity,
				endDate 				= _this.data('date-end') 					|| Infinity,
				changeMonth 			= _this.attr('data-changeMonth')			|| true,
				todayBtn 				= _this.attr('data-today-btn') 				|| true,
				calendarWeeks 			= _this.attr('data-show-weeks') 			|| true,
				autoclose 				= _this.attr('data-autoclose') 				|| true,
				todayHighlight 			= _this.attr('data-today-highlight') 		|| true,
				clearBtn 				= _this.attr('data-clear-btn') 				|| false,
				showWeekDays 			= _this.attr('data-showWeekDays') 			|| true,
				enableOnReadonly 		= _this.attr('data-enableOnReadonly') 		|| false,
				daysOfWeekDisabled 		= _this.data('daysOfWeekDisabled') 			|| '',
				daysOfWeekHighlighted 	= _this.data('daysOfWeekHighlighted') 		|| '',
				datesDisabled 			= _this.data('datesDisabled') 				|| '',
				zIndexOffset 			= _this.data('zIndexOffset') 				|| 10,
				showOnFocus 			= _this.attr('data-showOnFocus') 			|| true,
				title 					= _this.data('title') 						|| '',
				locales 				= _this.data('quick-locale') 				|| '',
				layoutRounded 			= _this.attr('data-layout-rounded') 		|| false;




			/* 

				:: DATE FIXES ::
				03:57 PM Friday, May 01, 2020

			*/
			if(startDate == 'today' || startDate == 'now') {
				
				startDate = new Date();
			
			} else {

				// Start Date is real date
				if(startDate != -Infinity && startDate.trim() != '')
					startDate = new Date(startDate);

			}

			// End Date is real date
			if(endDate == 'today' || endDate == 'now')
				startDate = new Date();
			/* 
				:: END DATE FIXES :: 
			*/





			if(itemID == '') {
				var itemID = 'rand_'+$.SOW.helper.randomStr(3);
				_this.attr('id', itemID);
			}


			// Link
			if(_this.attr('href') != '') {

				var __startDate = startDate;
				if(__startDate == -Infinity) {
					__startDate = new Date(startDate);
				}

				var __d 		= {};
					__d['dd'] 	= __startDate.getDate();
					__d['mm'] 	= __startDate.getMonth()+1;
					__d['yyyy'] = __startDate.getFullYear();


				if(format.indexOf('/') !== -1) {
					var __dateSplit = format.split('/');
					var __sepy = '/';
				}

				else if(format.indexOf('-') !== -1) {
					var __dateSplit = format.split('-');
					var __sepy = '-';
				}

				else if(format.indexOf('.') !== -1) {
					var __dateSplit = format.split('.');
					var __sepy = '.';
				}

				else if(format.indexOf(',') !== -1) {
					var __dateSplit = format.split(',');
					var __sepy = ',';
				}
		
				else if(format.indexOf(' ') !== -1) {
					var __dateSplit = format.split(' ');
					var __sepy = ' ';
				}

				var dateShort = __d[__dateSplit[0]] + __sepy + __d[__dateSplit[1]] + __sepy + __d[__dateSplit[2]];
				_this.text(dateShort);

			}



			// $.fn.datepicker.dates.en = {
			// 	days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			// 	daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			// 	daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			// 	months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			// 	monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			// 	today: "Today",
			// 	clear: "Clear",
			// 	titleFormat: "MM yyyy"
			// };
			if(typeof locales === 'object')
				$.fn.datepicker.dates.en = locales;




			_this.addClass('js-datepickified').datepicker({
				language 				: language,
				format 					: format, 
				rtl 					: ($.SOW.globals.direction == 'rtl') ? true  : false,
				startDate 				: startDate,
				endDate 				: endDate,
				changeMonth 			: changeMonth+'' 		!= 'true'  	? false : true,
				todayBtn 				: todayBtn+'' == 'true' ? 'linked' : null,
				calendarWeeks 			: calendarWeeks+'' 		!= 'true'  	? false : true,
				autoclose 				: autoclose+'' 			!= 'true'  	? false : true,
				todayHighlight 			: todayHighlight+'' 	!= 'true'  	? false : true,
				clearBtn 				: clearBtn+'' 			!= 'true' 	? false  : true,
				enableOnReadonly 		: enableOnReadonly+'' 	!= 'true' 	? false  : true,

				daysOfWeekDisabled 		: (typeof daysOfWeekDisabled === 'object') 		? daysOfWeekDisabled 		: [],
				daysOfWeekHighlighted 	: (typeof daysOfWeekHighlighted === 'object') 	? daysOfWeekHighlighted 	: [],
				datesDisabled 			: (typeof datesDisabled === 'object') 			? datesDisabled 			: [],

				title 					: title,
				showOnFocus 			: changeMonth+'' 		!= 'true'  ? false  : true,
				zIndexOffset 			: Number(zIndexOffset) || 10,
				showWeekDays 			: showWeekDays+'' 		!= 'true'  ? false : true,
				templates 				: {
											leftArrow: 	($.SOW.globals.direction == 'rtl') ? '<i class="fi fi-arrow-right"></i>' 	:  '<i class="fi fi-arrow-left"></i>',
											rightArrow: ($.SOW.globals.direction == 'rtl') ? '<i class="fi fi-arrow-left"></i>' 	:  '<i class="fi fi-arrow-right"></i>'
										},

				dates 					: {
					en: {
						days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
						daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
						daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
						months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
						monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
						today: "Today",
						clear: "Clear",
						titleFormat: "MM yyyy"
					}
				}

			}).click( function(e) {

				// on input click (not datepicker)
				setTimeout(function() { // disable "blink" on click
					$('.datepicker-dropdown').addClass('animate-none');

					if(layoutRounded+'' == 'true') {
						$('.datepicker-dropdown').addClass('datepicker-rounded');
					}

				},200);
				


			}).on('changeDate', function(e) {

				// AJAX POST - OPTIONAL
				var dateFull = e.date;

				$.SOW.vendor.datepicker.updateAjax(_this, dateFull, format);

			}).data('datepicker'); 


		},







		/**
		 *
		 *	@updateAjax
		 *
		 *
		 **/
		updateAjax: function(_this, dateFull, format) {

			var _updateMethod 			= _this.data('ajax-method') 					|| $.SOW.vendor.datepicker.config.method,
				_updateUrl 				= _this.data('ajax-url') 						|| '',
				_updateParams			= _this.data('ajax-params') 					|| '',
				_toastSuccessMsg		= _this.data('toast-success') 					|| 'Sucessfully Updated!',
				_toastPosition			= _this.data('toast-position') 					|| 'top-center',
				_itemID					= _this.data('id') 								|| '',
				data_params 			= $.SOW.vendor.datepicker.config.data_params;

			if(_updateUrl == '')
				return;




			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
			// Yes, we can get with val() but
			// will not work if span/div used instead of input
			var _date 		= new Date(dateFull);
			var __d 		= {};
				__d['dd'] 	= _date.getDate();
				__d['mm'] 	= _date.getMonth()+1;
				__d['yyyy'] = _date.getFullYear();

			if(__d['dd']<10){ __d['dd']='0'+__d['dd'] } 
			if(__d['mm']<10){ __d['mm']='0'+__d['mm'] } 

			if(format.indexOf('/') !== -1) {
				var __dateSplit = format.split('/');
				var __sepy = '/';
			}

			else if(format.indexOf('-') !== -1) {
				var __dateSplit = format.split('-');
				var __sepy = '-';
			}

			else if(format.indexOf('.') !== -1) {
				var __dateSplit = format.split('.');
				var __sepy = '.';
			}

			else if(format.indexOf(',') !== -1) {
				var __dateSplit = format.split(',');
				var __sepy = ',';
			}

			else if(format.indexOf(' ') !== -1) {
				var __dateSplit = format.split(' ');
				var __sepy = ' ';
			}

			var dateShort = __d[__dateSplit[0]] + __sepy + __d[__dateSplit[1]] + __sepy + __d[__dateSplit[2]];
			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --




			if(_updateParams != '') {

				var ajax_params_arr = $.SOW.helper.params_parse(_updateParams);
				for (var i = 0; i < ajax_params_arr.length; ++i) {
					data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
				}

			}



			// Add item id
			data_params.id 					= _itemID;
			data_params.date_full 			= dateFull;
			data_params.date_short 			= dateShort;


			// UPDATE ORDER VIA AJAX
			jQuery.ajax({
				url:			_updateUrl,
				data: 			data_params,
				type: 			_updateMethod,
				contentType: 	$.SOW.vendor.datepicker.config.contentType,
				dataType: 		$.SOW.vendor.datepicker.config.dataType,
				headers: 		$.SOW.vendor.datepicker.config.headers,
				crossDomain: 	$.SOW.vendor.datepicker.config.crossDomain,

				beforeSend: function() {

					_this.addClass('disabled').prop('disabled', true).prop('readonly', true);

				},

				error: 	function(XMLHttpRequest, textStatus, errorThrown) {

					if(typeof $.SOW.core.toast === 'object') {
						$.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', _toastPosition, 0, true);
					} else {
						alert("[404] Unexpected internal error!");
					}

					_this.removeClass('disabled').prop('disabled', false).prop('readonly', false);

				},

				success: function(data) {

					_this.removeClass('disabled').prop('disabled', false).prop('readonly', false);
					$.SOW.helper.consoleLog(data);

					setTimeout(function() {

					if(typeof $.SOW.core.toast === 'object')
						$.SOW.core.toast.show('success', '', _toastSuccessMsg, _toastPosition, 1300, true);

					},150);


					// Is a link, update
					if(_this.attr('href') != '') {
						_this.text(dateShort);
					}

				}
			});


		}


	};


})(jQuery);
/**
 *
 *	[SOW] Daterangepicker
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependencies 	-
 *	@Usage 			$.SOW.vendor.daterangepicker.init('.rangepicker');
 *
 * 	@Ajax Support 	YES
 *
 * 	Vendor: 		https://github.com/dangrossman/daterangepicker
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 				= 'Vendor Daterangepicker';


	$.SOW.vendor.daterangepicker = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {
			// ajax params
			headers 		: '',
			crossDomain 	: '',
			method 			: 'POST',
			contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8', // jQuery default
			dataType 		: '', // 'json', 'html', 'text'
			headers 		: '',
			crossDomain 	: '',
			data_params 	: {ajax:'true'},
		},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (!jQuery().daterangepicker) {

				var paths = $.SOW.helper.vendorLogicPaths('daterangepicker');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (!jQuery().daterangepicker) {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.daterangepicker.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


			// Check Dependencies
			if (typeof moment !== 'function') {
				$.SOW.helper.consoleLog('Dependencies Missing : moment.js  [By: '+scriptInfo+']');
				return;
			}


			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// 1. Has no selector
			if(!this.selector) {
				$.SOW.vendor.daterangepicker.process($('.rangepicker'));
				return $('.rangepicker');
			}

			// 2. Has selector
			return this.collection.each(function() {
				
				$.SOW.vendor.daterangepicker.process($(this));

			});

		},





		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {

			var selector_orig = this.selector_orig;
			if(_this.hasClass('js-tangepickified'))
				return;


			setTimeout(function() {


				// Bind clear button
				jQuery('a.btn-rangepicker-clear').on('click', function(e) {
					e.preventDefault();

					jQuery(this).parent().find('input'+selector_orig).val('');
				});


				var _timePicker 			= _this.data('timepicker') 							|| false,
					_timePicker24h			= _this.data('timepicker-24h') 						|| false,
					_timePickerSecs			= _this.data('timepicker-show-seconds') 			|| false,
					_opens 					= _this.data('placement') 							|| '', 		// left|right
					_drops 					= _this.data('drops') 								|| 'down',	// down|up
					_autoUpdateInput 		= _this.data('disable-auto-update-input') 			|| false,
					_singleDatePicker 		= _this.data('single-datepicker') 					|| false,
					_autoApply 				= _this.data('click-apply') 						|| false,
					_startDate 				= _this.data('date-start') 							|| '',
					_endDate 				= _this.data('date-end') 							|| moment(),
					_dropdowns 				= _this.data('interval-years') 						|| '',
					_quickLocale 			= _this.data('quick-locale') 						|| '',
					_dateFormat 			= _this.data('date-format') 						|| moment.localeData().longDateFormat('L'), //MM/DD/YYYY
					_ranges 				= _this.attr('data-ranges') 						|| false,
					_customOBJ 				= _this.data('custom-config') 						|| '',
					_roundedLayout 			= _this.data('layout-rounded') 						|| false,
					_disablePastDates 		= _this.data('disable-past-dates') 					|| false,
					
					_minYear 				= 1982,
					_maxYear 				= 2030,
					showDropdowns;


				if(_singleDatePicker+'' == 'true') {
					if(_startDate == '') {
						_startDate = moment();
					}
				} else {
					if(_startDate == '') {
						_startDate = moment().subtract(29, 'days');
					}
				}

				if(typeof _customOBJ !== 'object') {
				// ---------------------------------------------------------------------------------------------------

					var _ranges = (_ranges+'' == 'true') ?
						{
							'Today' 		: [moment(), moment()],
							'Yesterday' 	: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
							'Last 7 Days' 	: [moment().subtract(6, 'days'), moment()],
							'Last 30 Days' 	: [moment().subtract(29, 'days'), moment()],
							'This Month' 	: [moment().startOf('month'), moment().endOf('month')],
							'Last Month' 	: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
						} : false;

					if(typeof _quickLocale === 'object' && _ranges !== false) {

						var _ranges = {};

							if(_quickLocale['lang_today'])
								_ranges[_quickLocale['lang_today']] = [moment(), moment()];
							
							if(_quickLocale['lang_yday'])
								_ranges[_quickLocale['lang_yday']] = [moment().subtract(1, 'days'), moment().subtract(1, 'days')];
							
							if(_quickLocale['lang_7days'])
								_ranges[_quickLocale['lang_7days']] = [moment().subtract(6, 'days'), moment()];
							
							if(_quickLocale['lang_30days'])
								_ranges[_quickLocale['lang_30days']] = [moment().subtract(29, 'days'), moment()];
							
							if(_quickLocale['lang_tmonth'])
								_ranges[_quickLocale['lang_tmonth']] = [moment().startOf('month'), moment().endOf('month')];
							
							if(_quickLocale['lang_lmonth'])
								_ranges[_quickLocale['lang_lmonth']] = [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')];

					}


					// DISABLE PAST DATES
					var disablePast = false;
					if(_disablePastDates+'' == 'true') {

						if(_startDate == '') {
							
							var __sd = moment()._d;
						
						} else {

							if(typeof _startDate === 'string') {
								var __sd = _startDate;
							} else {
								var __sd = _startDate._d;
							}

						}

						var disablePast = moment(__sd,_dateFormat).format(_dateFormat);
					} 




					if(_timePicker+'' == 'true') {
						// var _startDate 	= moment().startOf('hour');
						// var _endDate 	= moment().startOf('hour').add(32, 'hour');
					}

					if(typeof _dropdowns === 'object') {
						var _showDropdowns 	= true,
							_minYear 		= _dropdowns[0] || 1982;
							_maxYear 		= _dropdowns[1] || 2030;
					}
	 


					// default config
					var _obj = {
						
						direction 			: $.SOW.globals.direction,

						opens 				: (_opens != '') ? _opens :   ( ($.SOW.globals.direction == 'rtl') ? 'left' : 'right' ),
						autoUpdateInput 	: (_autoUpdateInput+'' != 'true') 		? true : false,

						singleDatePicker 	: (_singleDatePicker+'' == 'true') 		? true 	: false,
						autoApply 			: (_singleDatePicker+'' == 'true' || _autoApply+'' == 'true') 		? true 	: false,
						timePicker 			: (_timePicker+'' == 'true') 			? true 	: false,
						timePicker24Hour 	: (_timePicker24h+'' == 'true') 		? true 	: false,
						timePickerSeconds 	: (_timePickerSecs+'' == 'true') 		? true 	: false,
						startDate 			: (_startDate != '') 					? _startDate 	: null,
						endDate 			: (_endDate != '') 						? _endDate 		: null,
						minDate 			: disablePast,

						showDropdowns 		: (_showDropdowns === true) 			? true : false,
						minYear 			: Number(_minYear),
						maxYear 			: Number(_maxYear),

						ranges 				: _ranges,
						drops 				: (_drops == '') 						? 'down' 	: _drops,

						locale: {
							customRangeLabel: (typeof _quickLocale === 'object' && _quickLocale['lang_crange']) ? _quickLocale['lang_crange'] : 'Custom Range',
							applyLabel 		: (typeof _quickLocale === 'object' && _quickLocale['lang_apply']) ? _quickLocale['lang_apply'] : 'Apply',
							cancelLabel 	: (typeof _quickLocale === 'object' && _quickLocale['lang_cancel']) ? _quickLocale['lang_cancel'] : 'Cancel',
							
							// from core, in case we need them
							monthNames 		: (typeof _quickLocale === 'object' && typeof _quickLocale['lang_months'] === 'object' && _quickLocale['lang_months']) ? _quickLocale['lang_months'] : moment.monthsShort(),
							daysOfWeek 		: (typeof _quickLocale === 'object' && typeof _quickLocale['lang_weekdays'] === 'object' && _quickLocale['lang_weekdays']) ? _quickLocale['lang_weekdays'] : moment.weekdaysMin(),
							firstDay 		: moment.localeData().firstDayOfWeek(),
							format 			: _dateFormat //MM/DD/YYYY
						}

					};

				// ---------------------------------------------------------------------------------------------------
				}


			

				var _pick = _this.addClass('js-tangepickified').daterangepicker(  ( (typeof _customOBJ === 'object') ? _customOBJ : _obj ), 
					function(start, end, label) {

						var start_format 	= start.format(_dateFormat);
						var end_format 		= start.format(_dateFormat);
						// console.log("A new date selection was made: " + start_format + ' to ' + end_format);

						return;

				}).data('daterangepicker');


				if(_roundedLayout !== false)
					_pick.container.addClass('daterangepicker-rounded');
					jQuery('.btn-default', _pick.container).removeClass('btn-default').addClass('bg-light');


				// Used if autoUpdateInput is false
				_this.on('apply.daterangepicker', function(ev, picker) {

					// console.log(picker.startDate.format('H:mm:ss'));


					// update
					if(_singleDatePicker+'' == 'true') {
						$(this).val(picker.startDate.format(_dateFormat));
					} else {
						$(this).val(picker.startDate.format(_dateFormat) + ' - ' + picker.endDate.format(_dateFormat));
					}

					// AJAX
					var startDate 		= picker.startDate._d;
					var endDate 		= picker.endDate._d;
					var start_format 	= picker.startDate.format(_dateFormat);
					var end_format 		= picker.endDate.format(_dateFormat);
					$.SOW.vendor.daterangepicker.updateAjax(_this, startDate, endDate, start_format, end_format);

				});

				_this.on('cancel.daterangepicker', function(ev, picker) {
					
				});

				_this.on('change.daterangepicker', function(ev, picker) {
					// NO! Will trigger ALL rangepickers we have more on the same page
					// jQuery('button.applyBtn').trigger('click');
				});

			}, _this.data('load-delay') || 0);

		},




		/**
		 *
		 *	@updateAjax
		 *
		 *
		 **/
		updateAjax: function(_this, start, end, start_format, end_format) {


			var _updateMethod 			= _this.data('ajax-method') 					|| $.SOW.vendor.daterangepicker.config.method,
				_updateUrl 				= _this.data('ajax-url') 						|| '',
				_updateParams			= _this.data('ajax-params') 					|| '',
				_toastSuccessMsg		= _this.data('toast-success') 					|| 'Sucessfully Updated!',
				_toastPosition			= _this.data('toast-position') 					|| 'top-center',
				_itemID					= _this.data('id') 								|| '',
				data_params 			= $.SOW.vendor.daterangepicker.config.data_params;

			if(_updateUrl == '')
				return;


			if(_updateParams != '') {

				var ajax_params_arr = $.SOW.helper.params_parse(_updateParams);
				for (var i = 0; i < ajax_params_arr.length; ++i) {
					data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
				}

			}

			// Add item id
			data_params.id 					= _itemID;
			data_params.date_start_full 	= start; 			// FULL DATE
			data_params.date_end_full 		= end; 				// FULL DATE
			data_params.date_start_short 	= start_format;
			data_params.date_end_short 		= end_format;


			// UPDATE ORDER VIA AJAX
			jQuery.ajax({
				url:			_updateUrl,
				data: 			data_params,
				type: 			_updateMethod,
				contentType: 	$.SOW.vendor.daterangepicker.config.contentType,
				dataType: 		$.SOW.vendor.daterangepicker.config.dataType,
				headers: 		$.SOW.vendor.daterangepicker.config.headers,
				crossDomain: 	$.SOW.vendor.daterangepicker.config.crossDomain,

				beforeSend: function() {

					_this.addClass('disabled').prop('disabled', true).prop('readonly', true);

				},

				error: 	function(XMLHttpRequest, textStatus, errorThrown) {

					if(typeof $.SOW.core.toast === 'object') {
						$.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', _toastPosition, 0, true);
					} else {
						alert("[404] Unexpected internal error!");
					}

					_this.removeClass('disabled').prop('disabled', false).prop('readonly', false);

				},

				success: function(data) {

					_this.removeClass('disabled').prop('disabled', false).prop('readonly', false);
					$.SOW.helper.consoleLog(data);

					setTimeout(function() {

					if(typeof $.SOW.core.toast === 'object')
						$.SOW.core.toast.show('success', '', _toastSuccessMsg, _toastPosition, 1300, true);

					},150);

				}
			});


		}

	};


})(jQuery);
/**
 *
 *	[SOW] Color Picker
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependencies 	-
 *	@Usage 			$.SOW.vendor.colorpicker.init('.colorpicker');
 *
 * 	@Ajax Support 	YES
 *
 * 	Vendor: 		https://github.com/Simonwep/pickr
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 				= 'Vendor Color Picker';
	var pickrInstance 			= [];

	$.SOW.vendor.colorpicker = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {

			classic: {

				swatches: [
					'rgba(244, 67, 54, 1)',
					'rgba(233, 30, 99, 0.95)',
					'rgba(156, 39, 176, 0.9)',
					'rgba(103, 58, 183, 0.85)',
					'rgba(63, 81, 181, 0.8)',
					'rgba(33, 150, 243, 0.75)',
					'rgba(3, 169, 244, 0.7)',
					'rgba(0, 188, 212, 0.7)',
					'rgba(0, 150, 136, 0.75)',
					'rgba(76, 175, 80, 0.8)',
					'rgba(139, 195, 74, 0.85)',
					'rgba(205, 220, 57, 0.9)',
					'rgba(255, 235, 59, 0.95)',
					'rgba(255, 193, 7, 1)'
				],

			},

			monolith: {

				swatches: [
					'rgba(244, 67, 54, 1)',
					'rgba(233, 30, 99, 0.95)',
					'rgba(156, 39, 176, 0.9)',
					'rgba(103, 58, 183, 0.85)',
					'rgba(63, 81, 181, 0.8)',
					'rgba(33, 150, 243, 0.75)',
					'rgba(3, 169, 244, 0.7)'
				],

			},


			nano: {

				swatches: [
					'rgba(244, 67, 54, 1)',
					'rgba(233, 30, 99, 0.95)',
					'rgba(156, 39, 176, 0.9)',
					'rgba(103, 58, 183, 0.85)',
					'rgba(63, 81, 181, 0.8)',
					'rgba(33, 150, 243, 0.75)',
					'rgba(3, 169, 244, 0.7)'
				],

			},

			// overwritten via attributes (ex: data-hex="false")
			interaction: {
				hex: true,
				rgba: true,
				hsla: false,
				hsva: false,
				cmyk: false,
				input: true,
				clear: true,
				save: true
			},


			// ajax params
			headers 		: '',
			crossDomain 	: '',
			method 			: 'POST',
			contentType 	: 'application/x-www-form-urlencoded; charset=UTF-8', // jQuery default
			dataType 		: '', // 'json', 'html', 'text'
			headers 		: '',
			crossDomain 	: '',
			data_params 	: {ajax:'true'},

		},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {

			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (typeof Pickr !== 'function') {

				var paths = $.SOW.helper.vendorLogicPaths('colorpicker');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (typeof Pickr !== 'function') {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.colorpicker.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// 1. Has no selector
			if(!this.selector) {
				$.SOW.vendor.colorpicker.process($('.colorpicker'));
				return $('.colorpicker');
			}

			// 2. Has selector
			return this.collection.each(function() {
				
				$.SOW.vendor.colorpicker.process($(this));

			});

		},





		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {

			if(_this.hasClass('js-colorpickified'))
				return;

			var target 					= _this.data('target') 						|| '',
				theme 					= _this.data('theme') 						|| 'classic',
				liveUpdate 				= _this.data('live-update') 				|| false,
				position 				= _this.data('position') 					|| 'bottom-middle',
				showAlways 				= _this.attr('data-show-always') 			|| false,
				inline 					= _this.attr('data-inline') 				|| false,
				appClass 				= _this.data('app-class') 					|| 'rounded',
				useAsButton 			= _this.attr('data-use-as-button') 			|| false,
				defaultRepresentation 	= _this.data('default') 					|| 'HEXA',
				defaultColor 			= _this.data('color') 						|| '#42445a',
				lngSave 				= _this.data('lng-save') 					|| 'Save',
				lngClear 				= _this.data('lng-clear') 					|| 'Clear',
				lngCancel 				= _this.data('lng-cancel') 					|| 'Cancel',

				__hex 					= _this.attr('data-hex') 					|| $.SOW.vendor.colorpicker.config.interaction.hex,
				__rgba 					= _this.attr('data-rgba') 					|| $.SOW.vendor.colorpicker.config.interaction.rgba,
				__hsla 					= _this.attr('data-hsla') 					|| $.SOW.vendor.colorpicker.config.interaction.hsla,
				__hsva 					= _this.attr('data-hsva') 					|| $.SOW.vendor.colorpicker.config.interaction.hsva,
				__cmyk 					= _this.attr('data-cmyk') 					|| $.SOW.vendor.colorpicker.config.interaction.cmyk,
				
				__input 				= _this.attr('data-input') 					|| $.SOW.vendor.colorpicker.config.interaction.input,
				__clear 				= _this.attr('data-clear') 					|| $.SOW.vendor.colorpicker.config.interaction.clear,
				__save 					= _this.attr('data-save') 					|| $.SOW.vendor.colorpicker.config.interaction.save;

			_this.addClass('js-colorpickified');

			var _rand = $.SOW.helper.randomStr(3, 'L');
			var _randClass = 'rand_'+_rand;
				_this.addClass(_randClass);

			if(target == '')
				var target = '.'+_randClass;

			if(jQuery('input.pcr-result-final').length < 1)
				jQuery('body').append('<input type="hidden" class="pcr-result-final" val="">');

	        // Delete previous instance
	        // if(pickr) {
	        //     pickr.destroyAndRemove();
	        // }


	        // fix last update
	        if(inline+'' == 'true') 
	        	showAlways = 'true';




			// Simple example, see optional options for more configuration.
			pickrInstance[_rand] = Pickr.create({
			
				el: 	'.'+_randClass,
				theme: 	theme,

				// Default color
				default: defaultColor,

				// Defines the position of the color-picker.
				// Any combinations of top, left, bottom or right with one of these optional modifiers: start, middle, end
				// Examples: top-start / right-end
				// If clipping occurs, the color picker will automatically choose its position.
				position: position,

				// Option to keep the color picker always visible.
				// You can still hide / show it via 'pickr.hide()' and 'pickr.show()'.
				// The save button keeps its functionality, so still fires the onSave event when clicked.
				showAlways: (showAlways+'' == 'true') ? true : false,

				// If true pickr won't be floating, and instead will append after the in el resolved element.
				// Setting this to true will also set showAlways to true. It's possible to hide it via .hide() anyway.
				inline: (inline+'' == 'true') ? true : false,

				// Custom class which gets added to the pcr-app. Can be used to apply custom styles.
				appClass: appClass,

				// Don't replace 'el' Element with the pickr-button, instead use 'el' as a button.
				// If true, appendToBody will also be automatically true.
				useAsButton: (useAsButton+'' == 'true') ? true : false,

				defaultRepresentation: 	defaultRepresentation,
				swatches: 				$.SOW.vendor.colorpicker.config['classic']['swatches'],
				components: 			{

										// Main components
										preview: true,
										opacity: true,
										hue: true,

										// Input / output Options
										interaction: {
											hex: 	(__hex+'' == 'false') 	? false : true,
											rgba: 	(__rgba+'' == 'false') 	? false : true,
											hsla: 	(__hsla+'' == 'false') 	? false : true,
											hsva: 	(__hsva+'' == 'false') 	? false : true,
											cmyk: 	(__cmyk+'' == 'false') 	? false : true,

											input: 	(__input+'' == 'false') ? false : true,
											clear: 	(__clear+'' == 'false') ? false : true,
											save: 	(__save+'' == 'false') 	? false : true
										}
				},

				strings: {
					save: 		lngSave,  		// Default for save button
					clear: 		lngClear, 		// Default for clear button
					cancel: 	lngCancel 		// Default for cancel button
				}

			}).on('init', instance => {
			    // console.log('init', instance);

			    // Simple Styling
			    jQuery('.pcr-result, .pcr-type, .pcr-save, .pcr-clear').addClass('rounded');
			    

			    // SAVE - because of multiple pickers bug!!!
			    jQuery('.pcr-save').on('click', function() {
			    	var _container = jQuery(this).parents('.pcr-interaction');
			    	var _exactOutput = jQuery('.pcr-result', _container).val();
			    	jQuery('.pcr-result-final').val(_exactOutput);
			    });

			}).on('hide', instance => {
			    // console.log('hide', instance);

			    if(__save+'' == 'false') {

				    var _exactOutput =  jQuery('.pcr-result').val();
				    $.SOW.vendor.colorpicker.updateAjax(_this, _exactOutput);
				    
				    if(target) {
				    	jQuery('input' + target).val(_exactOutput);
				    	jQuery('div' + target + ', span' + target).text(_exactOutput);
				    }

			    }

			}).on('show', (color, instance) => {
			    // console.log('show', color, instance);

			    if(liveUpdate+'' == 'true') {

					var _exactOutput = jQuery('.pcr-result').val();
					if(target) {
						jQuery('input' + target).val(_exactOutput);
						jQuery('div' + target + ', span' + target).text(_exactOutput);
					}

			    }

			}).on('save', (color, instance) => {
			    // console.log('save', color, instance);

			    /**
				    var _hexa 	= pickr.getColor().toHEXA();
			    	var _rgb 	= _hexa.join(',');
				    var _hex 	= pickr.getColor().toHEXA().toString();
			    **/

			    setTimeout(function() {

				    var _exactOutput = jQuery('.pcr-result-final').val();
				    $.SOW.vendor.colorpicker.updateAjax(_this, _exactOutput);

				    if(target) {
				    	jQuery('input' + target).val(_exactOutput);
				    	jQuery('div' + target + ', span' + target).text(_exactOutput);
				    }

				    jQuery('.pcr-result-final').val('');
				    
				},200);

			}).on('clear', instance => {
			    // console.log('clear', instance);

			    if(target) {
			    	jQuery('input' + target).val('');
			    	jQuery('div' + target + ', span' + target).text('');
			    }

			}).on('change', (color, instance) => {
			    // console.log('change', color, instance);
			    
			    if(liveUpdate+'' == 'true') {

			    	var _exactOutput = jQuery('.pcr-result').val();

					if(window.afterPickChange)
						clearTimeout(window.afterPickChange);

					window.afterPickChange = setTimeout(function() {

					    $.SOW.vendor.colorpicker.updateAjax(_this, _exactOutput);

					}, 1500);


					if(target) {
						jQuery('input' + target).val(_exactOutput);
						jQuery('div' + target + ', span' + target).text(_exactOutput);
					}

			    }

			}).on('changestop', instance => {
			    // console.log('changestop', instance);
			}).on('cancel', instance => {
			    // console.log('cancel', instance);
			}).on('swatchselect', (color, instance) => {
			    // console.log('swatchselect', color, instance);
			});


			return pickrInstance[_rand];
		},






		/**
		 *
		 *	@updateAjax
		 *
		 *
		 **/
		updateAjax: function(_this, _exactOutput) {

			var _updateMethod 			= _this.data('ajax-method') 					|| $.SOW.vendor.colorpicker.config.method,
				_updateUrl 				= _this.data('ajax-url') 						|| '',
				_updateParams			= _this.data('ajax-params') 					|| '',
				_toastSuccessMsg		= _this.data('toast-success') 					|| 'Sucessfully Updated!',
				_toastPosition			= _this.data('toast-position') 					|| 'top-center',
				_itemID					= _this.data('id') 								|| '',
				data_params 			= $.SOW.vendor.colorpicker.config.data_params;


			if(_updateUrl == '')
				return;


			if(_updateParams != '') {

				var ajax_params_arr = $.SOW.helper.params_parse(_updateParams);
				for (var i = 0; i < ajax_params_arr.length; ++i) {
					data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
				}

			}

			// Add item id
			data_params.id 					= _itemID;
			data_params.color 				= _exactOutput;


			// UPDATE ORDER VIA AJAX
			jQuery.ajax({
				url:			_updateUrl,
				data: 			data_params,
				type: 			_updateMethod,
				contentType: 	$.SOW.vendor.colorpicker.config.contentType,
				dataType: 		$.SOW.vendor.colorpicker.config.dataType,
				headers: 		$.SOW.vendor.colorpicker.config.headers,
				crossDomain: 	$.SOW.vendor.colorpicker.config.crossDomain,

				beforeSend: function() {},

				error: 	function(XMLHttpRequest, textStatus, errorThrown) {

					if(typeof $.SOW.core.toast === 'object') {
						$.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', _toastPosition, 0, true);
					} else {
						alert("[404] Unexpected internal error!");
					}

				},

				success: function(data) {

					$.SOW.helper.consoleLog(data);

					setTimeout(function() {

					if(typeof $.SOW.core.toast === 'object')
						$.SOW.core.toast.show('success', '', _toastSuccessMsg, _toastPosition, 1300, true);

					},150);

				}
			});



			return;

		},




		/**
		 *
		 *	@forceInit
		 *
		 *
		 **/
		forceInit: function() {

			var pickSelector = this.selector_orig.replace('.','');

			if(jQuery('#forceColorPickrInit').length > 0)
				return pickSelector;

			jQuery('body').append('<div id="forceColorPickrInit" class="hide-force"><div class=""></div></div>');
			jQuery('#forceColorPickrInit>div').addClass(pickSelector);
			$.SOW.vendor.colorpicker.init(this.selector_orig);

			return pickSelector;
		},




		/**
		 *
		 *	@Return Selector
		 *
		 *
		 **/
		__selector: function() {
			return this.selector_orig;
		}

	};


})(jQuery);
/**
 *
 *	[SOW] Flot Chart
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependencies 	-
 *	@Usage 			$.SOW.vendor.flot.init('.flot');
 *
 * 	@Ajax Support 	YES
 *
 * 	Vendor: 		https://github.com/flot/flot
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 					= 'Vendor Flot Chart';

	$.SOW.vendor.flot = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {
			// ajax params
			headers 		: '',
			crossDomain 	: '',
			method 			: 'GET',
			dataType 		: 'json', // 'json', 'html', 'text'
			headers 		: '',
			crossDomain 	: '',
			data_params 	: {ajax:'true'},
		},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (!jQuery().plot) {

				var paths = $.SOW.helper.vendorLogicPaths('flot');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (!jQuery().plot) {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.flot.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				


			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --



			$.SOW.vendor.flot.btnSave_bind();



			// 1. Has no selector
			if(!this.selector) {
				$.SOW.vendor.flot.process($('.flot'));
				return $('.flot');
			}

			// 2. Has selector
			return this.collection.each(function() {
				
				$.SOW.vendor.flot.process($(this));

			});

		},



		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {

			if(_this.hasClass('js-plotified'))
				return;

			_this.addClass('js-plotified');


			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
			var CUSTOM_DATA 			= _this.data('flot-custom-data') 			|| '',
				CUSTOM_OPTIONS 			= _this.data('flot-custom-options') 		|| '',
				flot_id 				= _this.attr('data-flot-id') 				|| '';

			// Add random ID if doesn't have one
			if(flot_id == '') {
				flot_id = 'rand_' + $.SOW.helper.randomStr(3, 'N');
				_this.attr('id', flot_id);
				_this.attr('data-flot-id', flot_id);
			}
			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

		

			// SMARTY CUSTOM
			var flot_label_1 		= _this.data('flot-label-1') 		|| 'Plot 1',
				flot_label_2 		= _this.data('flot-label-2') 		|| 'Plot 2',
				flot_label_3 		= _this.data('flot-label-3') 		|| 'Plot 3',
				flot_color_1 		= _this.data('flot-color-1') 		|| '#6595b4',
				flot_color_2 		= _this.data('flot-color-2') 		|| '#FF0000',
				flot_color_3 		= _this.data('flot-color-3') 		|| '#FF0000',
				flot_border_color 	= _this.data('flot-border-color') 	|| '#eaeaea',
				flot_type 			= _this.data('flot-type') 			|| 'fill',

				ajax_url 			= _this.data('ajax-url')			|| '',
				
				flot_click 			= _this.data('flot-click') 			|| '', // modal|url
				click_url 			= _this.data('flot-click-url') 		|| '',

				modal_size 			= _this.data('flot-modal-size') 	|| 'modal-md',
				modal_backdrop 		= _this.data('flot-modal-backdrop') || '',
				modal_centered 		= _this.data('flot-modal-centered') || 'false',

				flot_data_1			= _this.attr('data-flot-data-1'),
				flot_data_1 		= flot_data_1 ? JSON.parse(flot_data_1) : null,

				flot_data_2			= _this.attr('data-flot-data-2'),
				flot_data_2 		= flot_data_2 ? JSON.parse(flot_data_2) : null,

				flot_data_3			= _this.attr('data-flot-data-3'),
				flot_data_3 		= flot_data_3 ? JSON.parse(flot_data_3) : null,

				flot_fill_2 		= _this.data('flot-fill-2') 			|| 'false',
				flot_fill_3 		= _this.data('flot-fill-3') 			|| 'false',

				flot_pie_data 		= _this.data('flot-pie-data') 			|| '',
				flot_legend_show 	= _this.attr('data-flot-legend-show') 	|| 'true',

				flot_ticks			= _this.attr('data-flot-ticks'),
				flot_ticks 			= flot_ticks ? JSON.parse(flot_ticks) 	: null;






			// CLICK!
			if(flot_click != '') {

				_this.bind("plotclick", function (event, pos, item) {

				    if (item) {

				    	click_url += '&val_x='+item.datapoint[0]+'&val_y='+item.datapoint[1]+'&pos_x='+pos.x+'&pos_y='+pos.y;
				    	$.SOW.helper.consoleLog(click_url);


				    	// 1. URL
				    	if(flot_click == 'url') {
				    		window.location = click_url;
				    		return;
				    	}

				    	// 2. CALLBACK
				    	if(flot_click == 'callback' && typeof flot_callback === 'function') {
							flot_callback(event, pos, item);
				    	}

				    	// 3. MODAL
				    	else if(typeof $.SOW.core.ajax_modal === 'object' && flot_click == 'modal') {
				    		

							// Programtically Create Modal 	: 		      url , 'modal-md', 'true' (centered)
							$.SOW.core.ajax_modal.createFromThinAir(click_url, modal_size, modal_centered, modal_backdrop, function() {

								// CALLBACK
								setTimeout(function() {

									jQuery('#val_x').val(item.datapoint[0]);
									jQuery('#val_y').val(item.datapoint[1]);
									jQuery('.val_x').text(item.datapoint[0]);
									jQuery('.val_y').text(item.datapoint[1]);

									jQuery('#pos_x').val(pos.x);
									jQuery('#pos_y').val(pos.y);
									jQuery('.pos_x').text(pos.x);
									jQuery('.pos_y').text(pos.y);

									if(typeof flot_callback === 'function') {
										flot_callback(event, pos, item);
									}

								}, 450);

							});

				    	}

				    }
				});

			}



			// CUSTOM! STOP HERE!
			if(CUSTOM_DATA != '' && CUSTOM_OPTIONS != '') {
				window[flot_id] = jQuery.plot(_this, flot_custom[CUSTOM_DATA], flot_custom[CUSTOM_OPTIONS]);
				return;
			}
			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --




			// PIE CHART
			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
			if(typeof flot_pie_data === 'object') {

				window[flot_id] = jQuery.plot(_this, flot_pie_data,
					{
						grid: {
							hoverable 			: true,
							clickable 			: true,
						},

						series: {

							/* pie */
							pie: {
								show: true,
							},

							/* lines : used by legend */
							lines : {
								show : true,
							},

							shadowSize : 0,
							highlightColor: 0.5 // or color
						},

						legend: {
							show: (flot_legend_show+'' == 'false') ? false : true,
							noColumns: 1,
							labelFormatter: null
						},

						tooltip : true,
						tooltipOpts : {
							content : function(label, xval, yval, flotItem) {
								return label+": <b>"+yval+"</b>";
							},

							dateFormat : "%y-%0m-%0d",
							defaultTheme : true
						},

					});
				return;

			}
			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --



			// REGULAR CHART
			if(flot_data_1) {

				var flotData = [{ /* graph #1 */
									data: 		flot_data_1,
									label: 		flot_label_1,
									lines: 		{ show: (flot_type == 'bar') ? false : true },
									points: 	{ show: (flot_type == 'bar') ? false : true },
									color: 		flot_color_1
								}];

			}

			if(flot_data_2) {

				var flotData = [{ /* graph #1 */
									data: 		flot_data_1,
									label: 		flot_label_1,
									lines: 		{ show: (flot_type == 'bar') ? false : true },
									points: 	{ show: (flot_type == 'bar') ? false : true },
									color: 		flot_color_1
								}, { /* graph #2 */

									data: 		flot_data_2,
									label: 		flot_label_2,
									lines: 		{ show: (flot_type == 'bar') ? false : true, fill: (flot_fill_2+'' == 'true') ? true : false },
									points: 	{ show: (flot_type == 'bar') ? false : true },
									color: 		flot_color_2
								}];

			}

			if(flot_data_3) {

				var flotData = [{ /* graph #1 */
									data: 		flot_data_1,
									label: 		flot_label_1,
									lines: 		{ show: (flot_type == 'bar') ? false : true },
									points: 	{ show: (flot_type == 'bar') ? false : true },
									color: 		flot_color_1
								}, { /* graph #2 */

									data: 		flot_data_2,
									label: 		flot_label_2,
									lines: 		{ show: (flot_type == 'bar') ? false : true, fill: (flot_fill_2+'' == 'true') ? true : false },
									points: 	{ show: (flot_type == 'bar') ? false : true },
									color: 		flot_color_2
								}, { /* graph #3 */

									data: 		flot_data_3,
									label: 		flot_label_3,
									lines: 		{ show: (flot_type == 'bar') ? false : true, fill: (flot_fill_3+'' == 'true') ? true : false },
									points: 	{ show: (flot_type == 'bar') ? false : true },
									color: 		flot_color_3
								}];

			}


			/* flot settings */
			var flotSettings = {  

	            grid: {
	                mouseActiveRadius 	: (flot_type == 'pie') ? 0 : 30,
					hoverable 			: true,
					clickable 			: true,
					borderWidth 		: 0,
					tickColor 			: (flot_type == 'pie') ? null : flot_border_color,
					borderColor 		: (flot_type == 'pie') ? null : flot_border_color,
					// backgroundColor 	: '#ffffff',
	            },

				tooltip : true,
				tooltipOpts : {
					content : function(label, xval, yval, flotItem) {
						return label+": <b>"+yval+"</b>";
					},

					dateFormat : "%y-%0m-%0d",
					defaultTheme : true
				},

				// https://github.com/flot/flot/blob/master/API.md#customizing-the-axes
	            xaxis:{
	            	// show: false,
					ticks: flot_ticks,
					tickLength : 5,
					mode: "time"
	            },
				legend: {
					show: (flot_legend_show+'' == 'true') ? true : false,
					noColumns: 1,
					labelFormatter: null
				},
				series : {

					/* pie */
					pie: {
						show: (flot_type == 'pie') ? true : false, 
					},

					/* bars */
					bars: {
						show: (flot_type == 'bar') ? true : false, 
						lineWidth:0,
						align: "center",
						barWidth: 0.5
					},

					/* lines */
					lines : {
						show : (flot_type == 'bar') ? false : true,
						lineWidth : 1,
						fill : true,
						fillColor : {
							colors : [{
								opacity : 0.1
							}, {
								opacity : 0.15
							}]
						}
					},

			       //points: { show: true },
					shadowSize : 0,
					highlightColor: 0.5 // or color
				},

				selection : {
					mode : "x"
				},

				/*
				margin: {
					top: 30,
					left: 30,
					bottom: 30,
					right: 30,
				}
				*/

			};

		   



			// AJAX
			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
			if(ajax_url) {
				$.SOW.vendor.flot.flotAjax(_this, flot_id, flotSettings);
				return;
			}
			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

			 window[flot_id] = jQuery.plot(_this, flotData, flotSettings);

		},




		/**
		 *
		 *	@flotRender
		 *
		 *
		 **/
		flotAjax: function(_this, flot_id, flotSettings) {


			var _updateMethod 			= _this.data('ajax-method') 					|| $.SOW.vendor.flot.config.method,
				_updateType 			= _this.data('ajax-dataType') 					|| $.SOW.vendor.flot.config.dataType,
				_updateUrl 				= _this.data('ajax-url') 						|| '',
				_updateParams			= _this.data('ajax-params') 					|| '',
				_itemID					= _this.data('id') 								|| '',
				_updateInterval			= _this.data('ajax-update-interval') 			|| 0,
				data_params 			= $.SOW.vendor.flot.config.data_params;


			if(_updateUrl == '')
				return;



			if(_updateParams != '') {

				var ajax_params_arr = $.SOW.helper.params_parse(_updateParams);
				for (var i = 0; i < ajax_params_arr.length; ++i) {
					data_params[ajax_params_arr[i][0]] = ajax_params_arr[i][1];
				}

			}

			// Add item id
			data_params.id = _itemID;

			// UPDATE ORDER VIA AJAX
			jQuery.ajax({
				url:			_updateUrl,
				data: 			data_params,
				type: 			_updateMethod,
				contentType: 	$.SOW.vendor.flot.config.contentType,
				dataType: 		_updateType,
				headers: 		$.SOW.vendor.flot.config.headers,
				crossDomain: 	$.SOW.vendor.flot.config.crossDomain,
				cache: 			false,

				beforeSend: function() {
					$.SOW.helper.consoleLog(_updateUrl);
				},

				error: 	function(XMLHttpRequest, textStatus, errorThrown) {

					if(typeof $.SOW.core.toast === 'object') {
						$.SOW.core.toast.show('danger', '404 Error', 'Unexpected Internal error!', "top-center", 0, true);
					} else {
						alert("[404] Unexpected internal error!");
					}


				},

				success: function(data) {

					var flotData = [];
					for(var i=0; i < data.length; i++) {
						flotData.push(data[i]);
					}

					window[flot_id] = jQuery.plot(_this, flotData, flotSettings);



					if(Number(_updateInterval) < 1)
						return;

					setTimeout(function() {

						$.SOW.vendor.flot.flotAjax(_this, flot_id, flotSettings);

					}, Number(_updateInterval));


				}
			});

		},






		/**
		 *
		 *	@btnSave_bind
		 *
		 *
		 **/
		btnSave_bind: function(_this) {


			/* FLOT SAVE AS IMAGE */
			jQuery('a.flot-save:not(.js-plotified)').addClass('js-plotified').on("click", function(e) {
				e.preventDefault();

				var _t 			= jQuery(this),
					flot_id 	= _t.attr('data-flot-id') 	|| 'null',
					file_name 	= _t.attr('data-file-name') || 'graph';

				var myCanvas 	= window[flot_id].getCanvas();

				// we use filesaver to be able to save a custom file name
				myCanvas.toBlob(function(blob) {
				    saveAs(blob, file_name + ".png");
				});

			});
			/* -- */

		}


	};


})(jQuery);
/**
 *
 *	[SOW] Easypie Chart
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependencies 	-
 *	@Usage 			$.SOW.vendor.easypie.init('.easypie');
 *
 * 	@Ajax Support 	YES
 *
 * 	Vendor: 		https://github.com/rendro/easy-pie-chart
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 					= 'Vendor Easypie Chart';

	$.SOW.vendor.easypie = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (!jQuery().easyPieChart) {

				var paths = $.SOW.helper.vendorLogicPaths('easypie');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (!jQuery().easyPieChart) {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.easypie.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				


			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// 1. Has no selector
			if(!this.selector) {
				$.SOW.vendor.easypie.process($('.easypie'));
				return $('.easypie');
			}

			// 2. Has selector
			return this.collection.each(function() {
				
				$.SOW.vendor.easypie.process($(this));

			});

		},



		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {

			_this.easyPieChart({
				//your options goes here
			});

		},

	};


})(jQuery);
/**
 *
 *	[SOW] Sparkline Chart
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependencies 	-
 *	@Usage 			$.SOW.vendor.sparkline.init('.sparkline');
 *
 * 	@Ajax Support 	YES
 *
 * 	Vendor: 		https://github.com/gwatts/jquery.sparkline
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 					= 'Vendor Sparkline Chart';

	$.SOW.vendor.sparkline = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;



			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(this.selector != '') {
				if(jQuery(this.selector).length < 1)
					return null;
			}

			if (!jQuery().sparkline) {

				var paths = $.SOW.helper.vendorLogicPaths('sparkline');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (!jQuery().sparkline) {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.sparkline.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				


			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// 1. Has no selector
			if(!this.selector) {
				$.SOW.vendor.sparkline.process($('.sparkline'));
				return $('.sparkline');
			}

			// 2. Has selector
			return this.collection.each(function() {
				
				$.SOW.vendor.sparkline.process($(this));

			});

		},





		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {


			if(_this.hasClass('js-spaklineified'))
				return;


			// https://omnipotent.net/jquery.sparkline/#s-docs
			_this.addClass('js-spaklineified').sparkline('html', {
					enableTagOptions: true,
					tagOptionPrefix: 'spark',
					disableHiddenCheck: true,
			}); 

		},

	};


})(jQuery);
/**
 *
 *	[SOW] Sparkline Chart.js
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependencies 	-
 *	@Usage 			$.SOW.vendor.chartjs.init('.chartjs');
 *
 * 	@Ajax Support 	YES
 *
 * 	Vendor: 		https://github.com/chartjs/Chart.js
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 					= 'Vendor Chart.js';



	$.SOW.vendor.chartjs = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {

			data: {

                datasets: [
	                // 2.9.1 update
	                // moved from [x/y]Axes
	                // {
	                //     categoryPercentage: 0.35,
	                //     barPercentage: 0.70,
	                // }
                ],

			},


			// Default options
			// used by Quick chartjs
			options: {
				// backgroundColor: "transparent",
				responsive: true,
				maintainAspectRatio: false,
				hover: {
					mode: 'index'
				},
				legend: {
					display: true,
					position: 'top',
					rtl: $.SOW.globals.direction == 'rtl' ? true : false,
				},

                elements: {
                    point:{
                        radius: 3
                    }
                },

				scales: {

					xAxes: [{
						display: true,
						scaleLabel: {
							display: false,
							labelString: '', // Month
							fontSize: 14,
						},
						ticks: {
							display: true,
							beginAtZero: true,
							fontColor: '#999999',
							fontSize: 13,
							padding: 10
						},

                        gridLines: true,

					}],

					yAxes: [{
						display: true,
						scaleLabel: {
							display: false,
							labelString: '', // Value
							fontSize: 14,
						},

                        gridLines: {
                            color: 				'#dddddd',
                            borderDash: 		[2, 3],
                            zeroLineBorderDash: [2, 3],
                            zeroLineWidth: 1,
						},

						ticks: {
							max: 			50,                            
							stepSize: 		10,
							display: 		true,
							beginAtZero: 	true,
							fontColor: 		'#999999',
							fontSize: 		13,
							padding: 		10
						}

					}]
				},

				title: {
					display: false,
					text: '', // Lorem Ipsum
					fontSize: 16,
				},


				tooltips: {
					enabled: true,
					intersect: false,
					mode: 'nearest',
					bodySpacing: 5,
					yPadding: 10,
					xPadding: 15, 
					caretPadding: 0,
					displayColors: false,
					backgroundColor: '#121212',
					titleFontColor: '#ffffff', 
					cornerRadius: 4,
					footerSpacing: 0,
					titleSpacing: 0,
					rtl: $.SOW.globals.direction == 'rtl' ? true : false
				},

				layout: {
					padding: {
						left: 	0,
						right: 	0,
						top: 	0,
						bottom: 0
					}
				}

			},

		},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;



			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(this.selector != '') {
				if(jQuery(this.selector).length < 1)
					return null;
			}

			if (typeof Chart !== 'function') {

				var paths = $.SOW.helper.vendorLogicPaths('chartjs');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (typeof Chart !== 'function') {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.chartjs.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				


			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			$.SOW.vendor.chartjs.btnSave_bind();


			// 1. Has no selector
			if(!this.selector) {
				$.SOW.vendor.chartjs.process($('.chartjs'));
				return $('.chartjs');
			}

			// 2. Has selector
			return this.collection.each(function() {
				
				$.SOW.vendor.chartjs.process($(this));

			});

		},





		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {


			if(_this.hasClass('js-chartjsified'))
				return;

			_this.addClass('js-chartjsified');
			var ID 						= _this.attr('id')							|| '',
				dataQuick 				= _this.data('quick') 						|| '',
				dataChart 				= _this.data('chartjs') 					|| '',
				cjsCustom 				= _this.data('custom') 						|| '',

				// smarty quick
				quickChartType 			= _this.data('chartjs-type') 				|| 'line', // line/bar/pie
				quickChartLabels 		= _this.data('chartjs-labels') 				|| '',
				quickChartGrid 			= _this.attr('data-chartjs-grid') 			|| 'true',
				quickChartDots 			= _this.attr('data-chartjs-dots') 			|| 'true',
				quickChartTooltip 		= _this.attr('data-chartjs-tooltip') 		|| 'true',
				quickChartTitle			= _this.data('chartjs-title') 				|| '',
				quickChartxAxesLabel	= _this.data('chartjs-xaxes-label') 		|| '',
				quickChartxborderWidth	= _this.data('chartjs-line-width') 			|| '',
				quickChartyAxesLabel	= _this.data('chartjs-yaxes-label') 		|| '',
				quickChartLegend 		= _this.attr('data-chartjs-legend') 		|| 'true',
				quickChartDatasets 		= _this.data('chartjs-datasets') 			|| '';


			// Autoassign ID
			if(ID == '') {
				var ID = 'rand_'+$.SOW.helper.randomStr(4, 'N');
					_this.attr('id', ID);
			}


			// 1. from attributes
			// 2. from object
			var __obj 	= (typeof window[cjsCustom] === 'object') 	? window[cjsCustom] 	: {};
			var OBJ 	= (typeof dataChart === 'object') 			? dataChart 			: __obj;


			// used by image save!
			// var backgroundColor = 'white';
			// Chart.plugins.register({
			//     beforeDraw: function(c) {
			//         var ctx = c.chart.ctx;
			//         ctx.fillStyle = backgroundColor;
			//         ctx.fillRect(0, 0, c.chart.width, c.chart.height);
			//     }
			// });


			// Legend Spacing
			Chart.Legend.prototype.afterFit = function() {
			    this.height = this.height + 30;
			};



			// QUICK
			if(typeof quickChartDatasets === 'object') {

				var __OBJ__ 				= {};
					__OBJ__.type 			= quickChartType;



				// BAR & LINE
				if(__OBJ__.type != 'pie' && __OBJ__.type != 'doughnut') {


					__OBJ__.data 			= {};
					__OBJ__.options 		= $.SOW.vendor.chartjs.config.options;
					
					__OBJ__.data.labels 	= (typeof quickChartLabels === 'object') ? quickChartLabels : null;
					__OBJ__.data.datasets 	= quickChartDatasets;
					__OBJ__.options.scales.yAxes[0].ticks.max = 0; // 0 default


					// legend
					__OBJ__.options.legend.display = true; 	// default required
					if(quickChartLegend+'' == 'false')
						__OBJ__.options.legend.display = false;
					else if(quickChartLegend+'' != 'false') {

						// if only "true" used!
						if(quickChartLegend+'' == 'true') 
							quickChartLegend = 'top';
						
						__OBJ__.options.legend.position = quickChartLegend;
					}


					// Title
					__OBJ__.options.title.display 	= false; 	// default required
					if(quickChartTitle != '') {
						__OBJ__.options.title.display 	= true;
						__OBJ__.options.title.text 		= quickChartTitle;
					}


					// Tooltip
					__OBJ__.options.tooltips.enabled = true; 	// default required
					if(quickChartTooltip+'' == 'false')
						__OBJ__.options.tooltips.enabled = false;


					// Labels
					__OBJ__.options.scales.xAxes[0].scaleLabel.display = false;
					if(quickChartxAxesLabel != '') {
						__OBJ__.options.scales.xAxes[0].scaleLabel.display 		= true;
						__OBJ__.options.scales.xAxes[0].scaleLabel.labelString 	= quickChartxAxesLabel;
					}
					__OBJ__.options.scales.yAxes[0].scaleLabel.display = false;
					if(quickChartyAxesLabel != '') {
						__OBJ__.options.scales.yAxes[0].scaleLabel.display 		= true;
						__OBJ__.options.scales.yAxes[0].scaleLabel.labelString 	= quickChartyAxesLabel;
					}

						
					// Bar - set width
					// __OBJ__.options.scales.xAxes[0].categoryPercentage 		= 0.35; 	// 2.9.1 update
					// __OBJ__.options.scales.xAxes[0].barPercentage 			= 0.70; 	// 2.9.1 update
					__OBJ__.data.datasets[0].categoryPercentage 				= 0.35;
					__OBJ__.data.datasets[0].barPercentage 						= 0.70;
					if(__OBJ__.type == 'bar') {
						// __OBJ__.options.scales.xAxes[0].categoryPercentage 	= 0.65; // 2.9.1 update
						// __OBJ__.options.scales.xAxes[0].barPercentage 		= 1; 	// 2.9.1 update
						__OBJ__.data.datasets[0].categoryPercentage 			= 0.65;
						__OBJ__.data.datasets[0].barPercentage 					= 1;
					}


					// Grid
					__OBJ__.options.scales.xAxes[0].display = true;
					__OBJ__.options.scales.xAxes[0].gridLines = true;
					__OBJ__.options.scales.yAxes[0].display = true;
					if(quickChartGrid+'' == 'false') {
						__OBJ__.options.scales.xAxes[0].display = false;
						__OBJ__.options.scales.xAxes[0].gridLines = false;
						__OBJ__.options.scales.yAxes[0].display = false;
					}
					else if(quickChartGrid+'' == 'xAxes') {
						__OBJ__.options.scales.xAxes[0].display = true;
						__OBJ__.options.scales.xAxes[0].gridLines = true;
						__OBJ__.options.scales.yAxes[0].display = false;
					}
					else if(quickChartGrid+'' == 'yAxes') {
						__OBJ__.options.scales.xAxes[0].display = false;
						__OBJ__.options.scales.xAxes[0].gridLines = false;
						__OBJ__.options.scales.yAxes[0].display = true;
					}


					// Walk through dataset
					for(var i=0;i<__OBJ__.data.datasets.length; i++) {

						// Set MAX - chartjs is not settings by itself corectly!
						for(var j=0;j<__OBJ__.data.datasets[i].data.length; j++) {

							if(__OBJ__.data.datasets[i].data[j] > __OBJ__.options.scales.yAxes[0].ticks.max)
								__OBJ__.options.scales.yAxes[0].ticks.max = __OBJ__.data.datasets[i].data[j] + 10; // Y scale + 10

						} // -- -- --


						// Defaults
						__OBJ__.data.datasets[i].borderColor 			= __OBJ__.data.datasets[i].backgroundColor;
						__OBJ__.data.datasets[i].pointHoverRadius 		= 4;
						__OBJ__.data.datasets[i].pointHoverBorderWidth 	= 12;
						__OBJ__.data.datasets[i].borderWidth 			= 1;
						__OBJ__.data.datasets[i].pointBackgroundColor 	= __OBJ__.data.datasets[i].backgroundColor;
						__OBJ__.data.datasets[i].pointBorderColor 		= __OBJ__.data.datasets[i].backgroundColor;
						__OBJ__.data.datasets[i].pointHoverBorderColor 	= __OBJ__.data.datasets[i].backgroundColor;


						// no line & dots
						if(quickChartDots+'' == 'false' && __OBJ__.data.datasets[i].fill === true) {

							__OBJ__.data.datasets[i].pointBackgroundColor 		= 'rgba(133, 133, 145, 0)';
							__OBJ__.data.datasets[i].pointBorderColor 			= 'rgba(133, 133, 145, 0)';
							__OBJ__.data.datasets[i].pointHoverBackgroundColor 	= 'rgba(133, 133, 145, 0)';
							__OBJ__.data.datasets[i].pointHoverBorderColor 		= 'rgba(133, 133, 145, 0)';
							__OBJ__.data.datasets[i].borderWidth 				= 0;
							__OBJ__.data.datasets[i].borderColor 				= 'rgba(133, 133, 145, 0)';
							__OBJ__.options.elements.point.radius 				= 0;

						}

						// no dots, in case line used
						if(quickChartDots+'' == 'false')
							__OBJ__.options.elements.point.radius = 0;


						// line width
						if(__OBJ__.data.datasets[i].fill === false)
							__OBJ__.data.datasets[i].borderWidth = (quickChartxborderWidth != '') ? Number(quickChartxborderWidth) : 3;


					}



					// Final object
					var OBJ = __OBJ__;

				}



				// PIE CHART
				else if(__OBJ__.type == 'pie' || __OBJ__.type == 'doughnut') {

					var pieData 			= [];
					var piebackgroundColor 	= [];
					var pieLabels 			= [];

					for(var i=0;i<quickChartDatasets.length; i++) {

						pieData.push(quickChartDatasets[i][1]);
						piebackgroundColor.push(quickChartDatasets[i][2]);
						pieLabels.push(quickChartDatasets[i][0]);

					}

					// Final object
					var OBJ = {
								type: __OBJ__.type,
								legend: {
									display: false,
									position: 'top',
								},
								data: {
									datasets: [{
										data: 				pieData,
										backgroundColor: 	piebackgroundColor,
										label: 				'Dataset 1'
									}],
									labels: pieLabels
								},
								options: {
									responsive: true,
									maintainAspectRatio: true,
									legend: {
										display: 	(quickChartLegend+'' == 'false') ? false : true,
										position: 	(quickChartLegend+'' != 'false') ? quickChartLegend : 'top',
									},
									tooltips: {
										enabled: 	(quickChartTooltip+'' == 'false') ? false : true,
										intersect: false,
										mode: 'nearest',
										bodySpacing: 5,
										yPadding: 10,
										xPadding: 15, 
										caretPadding: 0,
										displayColors: false,
										backgroundColor: '#121212',
										titleFontColor: '#ffffff', 
										cornerRadius: 4,
										footerSpacing: 0,
										titleSpacing: 0
									},
									title: {
										display: (quickChartTitle != '') ? true : false,
										text: quickChartTitle, // Lorem Ipsum
										fontSize: 16,
									},
								}

							};


				}

				
			}
if(ID == 'smartyBarSimple')
	console.log(OBJ);


			// Render
			var ctx 	= document.getElementById(ID).getContext('2d');
			window[ID] 	= new Chart(ctx, OBJ);

			/**
				Use this to destroy any chart instances that are created. 
				This will clean up any references stored to the chart object within Chart.js, 
				along with any associated event listeners attached by Chart.js. 
				This must be called before the canvas is reused for a new chart.
			**/

		},






		/**
		 *
		 *	@btnSave_bind
		 *
		 *
		 **/
		btnSave_bind: function() {

			/* FLOT SAVE AS IMAGE */
			jQuery('a.chartjs-save:not(.js-chartjsified)').addClass('js-chartjsified').on("click", function(e) {
				e.preventDefault();

				var _t 			= jQuery(this),
					ID 			= _t.attr('data-chartjs-id') 	|| 'null',
					file_name 	= _t.attr('data-file-name') 	|| 'graph';

				// // we use filesaver to be able to save a custom file name
				var canvas = document.getElementById(ID);

				// set white background
				$.SOW.vendor.chartjs.fillCanvasBackgroundWithColor(canvas, 'white');

				canvas.toBlob(function(blob) {
				    saveAs(blob, file_name + ".png");
				});


			});
			/* -- */

		},



		/**
		 *
		 *	@fillCanvasBackgroundWithColor
		 *	white bg on canvas save
		 *	https://stackoverflow.com/questions/50104437/set-background-color-to-save-canvas-chart
		 *
		 *
		 **/
		fillCanvasBackgroundWithColor: function(canvas, color) {
			// Get the 2D drawing context from the provided canvas.
			const context = canvas.getContext('2d');

			// We're going to modify the context state, so it's
			// good practice to save the current state first.
			context.save();

			// Normally when you draw on a canvas, the new drawing
			// covers up any previous drawing it overlaps. This is
			// because the default `globalCompositeOperation` is
			// 'source-over'. By changing this to 'destination-over',
			// our new drawing goes behind the existing drawing. This
			// is desirable so we can fill the background, while leaving
			// the chart and any other existing drawing intact.
			// Learn more about `globalCompositeOperation` here:
			// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
			context.globalCompositeOperation = 'destination-over';

			// Fill in the background. We do this by drawing a rectangle
			// filling the entire canvas, using the provided color.
			context.fillStyle = color;
			context.fillRect(0, 0, canvas.width, canvas.height);

			// Restore the original context state from `context.save()`
			context.restore();
		},



	};


})(jQuery);
/**
 *
 *	[SOW] Medium Editor
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependencies 	-
 *	@Usage 			$.SOW.vendor.mediumeditor.init('.medium-editor');
 *
 * 	@Ajax Support 	YES
 *
 * 	Vendor: 		https://github.com/yabwe/medium-editor
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 					= 'Vendor Medium Editor';
	var mediumEditor 				= [];

	$.SOW.vendor.mediumeditor = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (typeof MediumEditor !== 'function') {

				var paths = $.SOW.helper.vendorLogicPaths('mediumeditor');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (typeof MediumEditor !== 'function') {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.mediumeditor.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				


			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// 1. Has no selector
			if(!this.selector) {
				$.SOW.vendor.mediumeditor.process($('.medium-editor'));
				return $('.medium-editor');
			}

			// 2. Has selector
			return this.collection.each(function() {
				
				$.SOW.vendor.mediumeditor.process($(this));

			});

		},



		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {

			if(_this.hasClass('js-mediumified'))
				return;


			// VALIDATE
			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
			if(_this.attr('required')) {

				var _form = _this.parents('form.bs-validate');
				if(_form.length > 0) {
					_form.submit(function() {

						if(_this.val() == '') {
							_this.parent().find('div.medium-editor').addClass('is-invalid');
						} else {
							_this.parent().find('div.medium-editor').removeClass('is-invalid').addClass('is-valid');
						}

					});
				}

			}
			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --




			var ID 						= _this.attr('id')							|| '',
				lngSave 				= _this.data('lng-save') 					|| 'Save',
				lngClear 				= _this.data('lng-clear') 					|| 'Clear',
				lngCancel 				= _this.data('lng-cancel') 					|| 'Cancel',
				lngLink 				= _this.data('lng-link')					|| 'Paste or type a link',

				btnPicker 				= _this.attr('data-btn-picker') 			|| 'true',
				btnBold 				= _this.attr('data-btn-bold') 				|| 'true',
				btnItalic 				= _this.attr('data-btn-italic') 			|| 'true',
				btnUnderline			= _this.attr('data-btn-underline') 			|| 'true',
				btnLink					= _this.attr('data-btn-link') 				|| 'true',
				btnH1					= _this.attr('data-btn-h1') 				|| 'true',
				btnH2					= _this.attr('data-btn-h2') 				|| 'true',
				btnH3					= _this.attr('data-btn-h3') 				|| 'true',
				btnH4					= _this.attr('data-btn-h4') 				|| 'true',
				btnH5					= _this.attr('data-btn-h5') 				|| 'true',
				btnH6					= _this.attr('data-btn-h6') 				|| 'true',
				btnUnordered			= _this.attr('data-btn-unordered') 			|| 'true',
				btnOrdered				= _this.attr('data-btn-ordered') 			|| 'true';

			if(ID == '') {
				var ID = 'rand_'+$.SOW.helper.randomStr(3);
					_this.attr('id', ID);
			}

			_this.addClass('js-mediumified');
			mediumEditor[ID];


			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
			if(typeof $.SOW.vendor.colorpicker !== 'object')
				var btnPicker = 'false';
			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

			/** ********************************** MEDIUM COLOR PICKER ********************************* **/
			if(btnPicker+'' == 'true') {

				var currentTextSelection;

				// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
				if(typeof Pickr !== 'function')
					var __selector = $.SOW.vendor.colorpicker.forceInit();


				/**
				* Gets the color of the current text selection
				*/
				function getCurrentTextColor(){
				    return jQuery(mediumEditor[ID].getSelectedParentElement()).css('color');
				}

				/**
				 * Custom `color picker` extension
				 */
				var ColorPickerExtension = MediumEditor.extensions.button.extend({
				    name: 	"colorPicker",
				    action: "applyForeColor",
				    aria: 	"color picker",
				    contentDefault: '<i class="fi mdi-format_color_fill"></i>',

				    init: function() {

				        this.button = this.document.createElement('button');
				        this.button.classList.add('medium-editor-action');
				        this.button.innerHTML = '<i class="fi mdi-format_color_fill"></i>';
						
				        //init spectrum color picker for this button
				        initPicker(this.button);
				        
				        //use our own handleClick instead of the default one
				        this.on(this.button, 'click', this.handleClick.bind(this));
				    },

				    handleClick: function (event) {

						//keeping record of the current text selection
						currentTextSelection = mediumEditor[ID].exportSelection();

						//sets the color of the current selection on the color picker
						// jQuery(this.button).pickr("set", getCurrentTextColor());
						// jQuery(this.button).addClass(__selector).on('click', function(e) {
		
						// 	$.SOW.vendor.colorpicker.process(jQuery(this));

						// });


						jQuery(this.button).prepend('<span class="'+__selector+'"></span>');
						setTimeout(function() {
						
							// $.SOW.vendor.colorpicker.init(__selector);
							// jQuery(this.button).addClass(__selector);
							// jQuery(this.button).remove();

							window[ID] = Pickr.create({

								el: 			'.'+__selector,
								theme: 			'nano',
								default: 		(typeof window[ID].lastColor !== 'undefined') ? window[ID].lastColor : '#121212',
								showAlways: 	true,
								inline: 		false,
								position: 		'bottom-middle',
								useAsButton: 	true,
								defaultRepresentation: 'HEXA',
								closeWithKey: 	'Escape',
								autoReposition: true,
								swatches: 		[
									'rgba(244, 67, 54, 1)',
									'rgba(233, 30, 99, 1)',
									'rgba(156, 39, 176, 1)',
									'rgba(103, 58, 183, 1)',
									'rgba(63, 81, 181, 1)',
									'rgba(33, 150, 243, 1)',
									'rgba(3, 169, 244, 1)',
									'rgba(0, 188, 212, 1)',
									'rgba(0, 150, 136, 1)',
									'rgba(76, 175, 80, 1)',
									'rgba(139, 195, 74, 1)',
									'rgba(205, 220, 57, 1)',
									'rgba(255, 235, 59, 1)',
									'rgba(255, 193, 7, 1)'
												],
								components : {
									// Main components
									palette: true,
									preview: true,
									opacity: true,
									hue: true,
									interaction: {
										hex: true,
										rgba: true,
										hsla: false,
										hsva: false,
										cmyk: false,
										input: true,
										clear: true,
										save: true
									},

								},

								strings: {
									save: 		lngSave,  		// Default for save button
									clear: 		lngClear, 		// Default for clear button
									cancel: 	lngCancel 		// Default for cancel button
								}


							}).on('init', instance => {
							    // console.log('init', instance);

							    // Simple Styling
							    jQuery('.pcr-result, .pcr-type, .pcr-save, .pcr-clear').addClass('rounded');

							}).on('hide', instance => {
							    // console.log('hide', instance);
							}).on('show', (color, instance) => {
							    // console.log('show', color, instance);

							    jQuery('.pcr-app:not(.pcr-save):not(.pcr-cancel):not(.pcr-clear)').on('click', function(e) {
							    	e.preventDefault();
							    	e.stopPropagation();
							    });

							    jQuery(document).on('click', function() {
							    	window[ID].hide();
							    });

							}).on('save', (color, instance) => {
							    // console.log('save', color, instance);
							   
							    var _hexa 	= window[ID].getColor().toHEXA();
						    	var _rgb 	= _hexa.join(',');
							    var _hex 	= window[ID].getColor().toHEXA().toString();
							    setColor(_hex);

							    window[ID].lastColor = _hex;
							  	window[ID].hide();

							}).on('clear', instance => {

							    // console.log('clear', instance);
							    setColor('');

							}).on('change', (color, instance) => {
							    // console.log('change', color, instance);
							}).on('changestop', instance => {
							    // console.log('changestop', instance);
							}).on('cancel', instance => {
							    // console.log('cancel', instance);
							}).on('swatchselect', (color, instance) => {
							    // console.log('swatchselect', color, instance);
							});

						},100);



						//from here on, it was taken form the default handleClick
						event.preventDefault();
						event.stopPropagation();

						var action = this.getAction();

						if (action) {
							this.execAction(action);
						}
				    }

				});

				var pickerExtension = new ColorPickerExtension();

				function setColor(color) {
				    var finalColor = color;

				    pickerExtension.base.importSelection(currentTextSelection);
				    pickerExtension.document.execCommand("styleWithCSS", false, true);

				    if(color == '') {
				    	pickerExtension.document.execCommand("RemoveFormat");
				    } else {
				    	pickerExtension.document.execCommand("foreColor", false, finalColor);
				    }
				}

				function initPicker(element) {




				}

			}
			/** ******************************** END MEDIUM COLOR PICKER ******************************* **/

			var __buttons = [{
		            		name: 'colorPicker'
		            		/* 
		            			contentDefault is not available for color picker
		            			see above if you want to change the icon
		            		 */
		            } /*{
		                    name: 'quote',
		                    contentDefault: '<i class="mdi mdi-format-quote-close"></i>', 
		                },*/ 

		            ];


		    if(btnBold+'' == 'true') {
		     	__buttons.push({
                    name: 'bold',
                    contentDefault: '<b>B</b>'
                });
		    }

		    if(btnItalic+'' == 'true') {
		     	__buttons.push({ 
                    name: 'italic',
                    contentDefault: '<i>I</i>'
                });
		    }

		    if(btnUnderline+'' == 'true') {
		     	__buttons.push({ 
                    name: 'underline',
                    contentDefault: '<u>U</u>'
                });
		    }

		    if(btnLink+'' == 'true') {
		     	__buttons.push({
                    name: 'anchor',
                    contentDefault: '<i class="fi fi-link"></i>'
                });
		    }

		    if(btnH1+'' == 'true') __buttons.push('h1');
		    if(btnH2+'' == 'true') __buttons.push('h2');
		    if(btnH3+'' == 'true') __buttons.push('h3');
		    if(btnH4+'' == 'true') __buttons.push('h4');
		    if(btnH5+'' == 'true') __buttons.push('h5');
		    if(btnH6+'' == 'true') __buttons.push('h6');

		    if(btnUnordered+'' == 'true') {
		     	__buttons.push({
                    name: 'unorderedlist',
                    contentDefault: '<i class="fi mdi-format_list_bulleted"></i>'
                });
		    }

		    if(btnOrdered+'' == 'true') {
		     	__buttons.push({
                    name: 'orderedlist',
                    contentDefault: '<i class="fi mdi-format_list_numbered"></i>'
                });
		    }



		    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
		    var __mediumObj = {

				autoLink: 			true,
				imageDragging: 		false,
				targetBlank: 		false,

				anchor: {
					linkValidation: 	false,
					targetCheckbox: 	false,
					placeholderText: 	lngLink,
					targetCheckboxText: 'Open in new window',
				},

				anchorPreview: {
				    hideDelay: 300
				},
				toolbar: {
		            buttons: __buttons
		        }, 

		        extensions: {
					'colorPicker': (btnPicker+'' == 'true') ? pickerExtension : null
			    }

			};
		    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --




		    // Fix medium editor inside modal!
		    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
		    if(jQuery('.modal.show').length > 0) {
		    	var modalID = jQuery('.modal.show').attr('id') || '';

		    	if(modalID == '') {
					var modalID = 'rand_'+$.SOW.helper.randomStr(3);
						jQuery('.modal.show').attr('id', modalID);
		    	}

		    	__mediumObj.elementsContainer = document.getElementById(modalID);
		    }
		    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --



			// TO DESTROY:  window.mediumEditor.destroy();
			mediumEditor[ID] = new MediumEditor(this.selector_orig, __mediumObj);


		},

	};


})(jQuery);
/**
 *
 *	[SOW] Summernote Editor
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependencies 	-
 *	@Usage 			$.SOW.vendor.summernoteeditor.init('.summernote-editor');
 *
 * 	@Ajax Support 	YES
 *
 * 	Vendor: 		https://github.com/summernote/summernote
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 					= 'Vendor Summernote Editor';
	var summernoteEditor 			= [];

	$.SOW.vendor.summernoteeditor = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (!jQuery().summernote) {

				var paths = $.SOW.helper.vendorLogicPaths('summernoteeditor');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (!jQuery().summernote) {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.summernoteeditor.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// 1. Has no selector
			if(!this.selector) {
				$.SOW.vendor.summernoteeditor.process($('.summernote-editor'));
				return $('.summernote-editor');
			}

			// 2. Has selector
			return this.collection.each(function() {
				
				$.SOW.vendor.summernoteeditor.process($(this));

			});

		},



		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {

			if(_this.hasClass('js-summernotefied'))
				return;

			var ID 						= _this.attr('id')									|| '',
				placeholder 			= _this.data('placeholder')							|| 'Type here...',
				minHeight 				= _this.data('min-height')							|| 300,
				maxHeight 				= _this.data('max-height')							|| 1500,
				focus 					= _this.attr('data-focus')							|| 'true',
				lang 					= _this.data('lang')								|| 'en-US',
				ajaxURL 				= _this.data('ajax-url')							|| '',
				ajaxParams 				= _this.data('ajax-params')							|| '',
				toolbar 				= _this.data('toolbar')								|| '';

			if(ID == '') {
				var ID = 'rand_'+$.SOW.helper.randomStr(3);
					_this.attr('id', ID);
			}


			summernoteEditor[ID];
			summernoteEditor[ID] = _this.addClass('js-summernotefied').summernote({
				placeholder: 	placeholder,
				// height: 		500,
				minHeight: 		minHeight, 								// set minimum height of editor
				maxHeight: 		maxHeight, 								// set maximum height of editor
				focus: 			(focus+'' == 'true') ? true : false, 	// set focus to editable area after initializin
				lang: 			(lang != '') ? lang : 'en-US', 			// default: 'en-US'

				toolbar: (typeof toolbar === 'object') ? toolbar : null,

				/**
				// WORKING : ONLY DISABLED
				// SHOULD BE ADDED TO PARAMS FOR CUSTOMIZATION
				// https://summernote.org/deep-dive/#customization
				styleTags: [
								'p', 
								{ title: 'Blockquote', tag: 'blockquote', className: 'blockquote', value: 'blockquote' },
								'h2', 
								'h3', 
								'h4', 
								'h5', 
								'h6'
							],
				**/


				// bootstrap 4 popover fix
				popover: {
					image: [],
					link: [],
					air: []
				},

				callbacks: {

					onImageUpload: (ajaxURL != '') ? function(files, editor, welEditable) {

						for(var i = files.length - 1; i >= 0; i--) {
							$.SOW.vendor.summernoteeditor.ajaxUpload(ajaxURL, files[i], this, ajaxParams);
						}

					} : null

				}

			});

		},




		/**
		 *
		 *	@ajaxUpload
		 *
		 *
		 **/
		ajaxUpload: function(ajaxURL, file, el, ajaxParams) {

			if(ajaxURL == '') {
				$.SOW.helper.consoleLog("Summernote: Upload URL not provided!");
				return;
			}

			var formData = new FormData();
				formData.append('file', file);
				formData.append('ajax', 'true');


			if(ajaxParams && ajaxParams != '') {

				var ajax_params_arr = $.SOW.helper.params_parse(ajaxParams);
				for (var i = 0; i < ajax_params_arr.length; ++i) {
					formData.append(ajax_params_arr[i][0], ajax_params_arr[i][1]);
				}

			}


			$.ajax({
				url: 			ajaxURL,
				cache: 			false,
				contentType: 	false,
				processData: 	false,
				data: 			formData,
				type: 			'POST',

				beforeSend: function() {},

				error: function (data) {

					$.SOW.helper.consoleLog(data);

					if(typeof $.SOW.core.toast === 'object') {
						$.SOW.core.toast.show('danger', '', '404 Server Error!', "center-top", 4000, true);
					} else {
						alert('404 Server Error!');
					}

				},

				success: function(imgURL) {

					$.SOW.helper.consoleLog(imgURL);
					$(el).summernote('editor.insertImage', imgURL);

				}
			});
		}

	};


})(jQuery);
/**
 *
 *	[SOW] Datatables
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependencies 	-
 *	@Usage 			$.SOW.vendor.datatables.init('.table-datatable');
 *
 * 	@Ajax Support 	YES
 *
 * 	Vendor: 		https://datatables.net/
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 					= 'Vendor Datatables';
	var DTable 						= [];

	$.SOW.vendor.datatables = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {},



		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),



		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {

			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;


			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(this.selector).length < 1)
					return null;
			}

			if (!jQuery().DataTable) {

				var paths = $.SOW.helper.vendorLogicPaths('datatables');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (!jQuery().DataTable) {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}

					// self reinit, external js loaded!
					$.SOW.vendor.datatables.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --


			// Fixes
			$.SOW.vendor.datatables.miscOptions();


			// 1. Has no selector
			if(!this.selector) {
				$.SOW.vendor.datatables.process($('.table-datatable'));
				return $('.table-datatable');
			}

			// 2. Has selector
			return this.collection.each(function() {
				
				$.SOW.vendor.datatables.process($(this));

			});

		},



		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function(_this) {

			if(_this.hasClass('js-datatableified'))
				return;


			var ID 								= _this.attr('id')									|| '',
				lngEmpty 						= _this.data('lng-empty')							|| 'No data available in table',
				lngPageInfo 					= _this.data('lng-page-info')						|| 'Showing _START_ to _END_ of _TOTAL_ entries',
				lngfiltered 					= _this.data('lng-filtered')						|| '(filtered from _MAX_ total entries)',
				lngLoading 						= _this.data('lng-loading')							|| 'Loading...',
				lngProcessing 					= _this.data('lng-processing')						|| 'Processing...',
				lngSearch 						= _this.data('lng-search')							|| 'Search...',
				lngNoRecords 					= _this.data('lng-norecords')						|| 'No matching records found',
				lngsortAscending 				= _this.data('lng-sort-ascending')					|| ': activate to sort column ascending',
				lngsortDescending 				= _this.data('lng-sort-descending')					|| ': activate to sort column descending',

				lngColumnVisibility 			= _this.data('lng-column-visibility')				|| 'Column Visibility',
				lngExport 						= _this.data('lng-export')							|| '<i class="fi fi-squared-dots fs--18 line-height-1"></i>',
				lngCSV 							= _this.data('lng-csv')								|| 'CSV',
				lngPDF 							= _this.data('lng-pdf')								|| 'PDF',
				lngXLS 							= _this.data('lng-xls')								|| 'XLS',
				lngCopy 						= _this.data('lng-copy')							|| 'Copy',
				lngPrint 						= _this.data('lng-print')							|| 'Print',
				lngAll 							= _this.data('lng-all')								|| 'All',

				columnSearch					= _this.attr('data-column-search')					|| 'false',
				rowReorder						= _this.attr('data-row-reorder')					|| 'false',
				colReorder						= _this.attr('data-col-reorder')					|| 'false',
				isResponsive					= _this.attr('data-responsive')						|| 'true',
				fixedHeader						= _this.attr('data-header-fixed')					|| 'false',
				selectOnClick					= _this.attr('data-select-onclick')					|| 'false',
				enableSearch					= _this.attr('data-main-search')					|| 'true',
				enablePaging					= _this.attr('data-enable-paging')					|| 'true',
				enableColumnSort				= _this.attr('data-enable-col-sorting')				|| 'true',
				autoFill						= _this.attr('data-autofill')						|| 'false',
				dataGroup						= _this.attr('data-group')							|| 'false',
				isCustom						= _this.attr('data-custom')							|| 'false',
				itemsPerPage					= _this.attr('data-items-per-page')					|| 15;

			_this.addClass('js-datatableified');

			if(ID == '') {
				var ID = 'rand_'+$.SOW.helper.randomStr(3);
					_this.attr('id', ID);
			}	



			DTable[ID];



            // Custom request! Stop here!
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
			if(isCustom+'' == 'true')
				return;
			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --





            // Column Search
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            if(columnSearch+'' == 'true' && $.SOW.globals.is_mobile === false) {

	            jQuery('#'+ID+' thead tr').clone(true).appendTo('#'+ID+' thead');
	            jQuery('#'+ID+' thead tr:eq(1) th').each(function(i) {
	                var title = jQuery(this).text();
	                jQuery(this).html('<input type="text" class="form-control form-control-sm" placeholder="' + lngSearch + '" />');
	                // jQuery(this).html('<input type="text" class="form-control form-control-sm" placeholder="Search ' + title + '" />');

	                jQuery('input', this).on('keyup change', function() {
	                    
	                    if(DTable[ID].column(i).search() !== this.value) {
	                        DTable[ID].column(i).search(this.value).draw();
	                    }

	                });
	            });

        	}
            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --








			/**

				OPTIONS

			**/
			var __dtOptions = 	{

					// Keytable
					// blurable: 	false,
					// keys: 		true,
					// stateSave: 	true,



					// REORDER (sortable like)
                    rowReorder: (rowReorder+'' == 'true') ? {
                        selector: 'tr td:not(:first-child)'
                    } : false,
                    colReorder: 	(colReorder+'' == 'true') ? true : false,

                    // SCROLLER
                    /*
                    pageLength: 	false,
                    scrollY: 		300,
                    scrollCollapse: true,
                    scroller: 		true,
                    */

					
					fixedHeader: 	(fixedHeader+'' == 'true') ? true : false,


                    // Select on click (also print/export selected)
                    select: 		(selectOnClick+'' == 'true') ? true : false,

					// needed by column search
					orderCellsTop: 	true,

					ordering: 		(enableColumnSort+'' == 'true') ? true : false,				// column ordering (sorting)
					paging: 		(enablePaging+'' == 'true') ? true : false,
					searching: 		(enableSearch+'' == 'true') ? true : false,					// searching

					// per page
					pageLength: Number(itemsPerPage),
					lengthMenu: [[10, 15, 30, 50, 100, -1], [10, 15, 30, 50, 100, lngAll]],


					// select & fill
					autoFill: (autoFill+'' != 'false') ? {
						focus: autoFill // 'hover', 'click'
					} : false,


					// Langs
					oLanguage: {
						oAria: {
							sSortAscending: 	lngsortAscending 	|| "",
							sSortDescending: 	lngsortDescending 	|| ""
						},
						oPaginate: {
							sFirst: 		'<i class="fi fi-arrow-start-full fs--13"></i>',
							sLast: 			'<i class="fi fi-arrow-end-full fs--13"></i>',
							sNext: 			'<i class="fi fi-arrow-end fs--13"></i>',
							sPrevious: 		'<i class="fi fi-arrow-start fs--13"></i>'
						},
						sEmptyTable: 		lngEmpty 		|| "",
						sInfo: 				lngPageInfo 	|| "",
						sInfoEmpty: 		"",
						sInfoFiltered: 		"",
						sInfoPostFix: 		"",
						sDecimal: 			"",
						sThousands: 		",",
						// sLengthMenu: 	"Show _MENU_ entries",
						sLengthMenu: 		"_MENU_", 					// per page - without text
						sLoadingRecords: 	lngLoading 		|| "",
						sProcessing: 		lngProcessing 	|| "",
						// sSearch: 		"Search:",
						sSearch: 			"",
						sSearchPlaceholder: lngSearch 		|| "",
						sUrl: 				"",
						sZeroRecords: 		lngNoRecords 	|| ""
					},





					// -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
					// processing: 	false,
					// serverSide: 	false,

					// ajax: 			"_ajax/datatables.json",
					// columns: [
					// 	{ data: "first_name" },
					// 	{ data: "last_name" },
					// 	{ data: "position" },
					// 	{ data: "office" },
					// 	{ data: "start_date" },
					// 	{ data: "salary" }
					// ],
					// -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


					dom:
						/*	
							:: Datatables layout help
							https://datatables.net/reference/option/dom

								l	=	length changing input control
								f	=	filtering input
								t	=	The table!
								i	=	Table information summary
								p	=	pagination control
								r	=	processing display element
								B	=	buttons
								R	=	ColReorder
								S	=	Select

							:: Markup

								< and >				= div element
								<"class" and >		= div with a class
								<"#id" and >		= div with an ID
								<"#id.class" and >	= div with an ID and a class

						*/
						"<'row mb-3'"
							+"<'col-sm-12 col-md-6 d-flex align-items-center justify-content-start'f l>" 	// filtering input + per page
							+"<'col-sm-12 col-md-6 d-flex align-items-center justify-content-end'B>" 		// buttons
						+">"
						
						+ "<'row'"
							+"<'col-sm-12'tr>" 			// The table + processing display element
						+">"

						+"<'row'"
							+"<'col-sm-12 col-md-5'i>" 	// Table information summary
							+"<'col-sm-12 col-md-7'p>" 	// pagination control
						+">",

					buttons: [
								{
									extend: 	'colvis',
									text: 		lngColumnVisibility,
									titleAttr: 	lngColumnVisibility,
									className: 	'btn-sm btn-light'
								},
								{
									extend: 	'collection',
									text: 		lngExport,
									className: 	'btn-sm btn-light pt--6 pb--6',
									buttons: 	[  

													{
														extend: 'csvHtml5',
														text: lngCSV,
													},
													{
														extend: 'pdfHtml5',
														text: lngPDF,
													},
													{
														extend: 'excelHtml5',
														text: lngXLS,
													},
													{
														extend: 'copyHtml5',
														text: lngCopy,
													},
													{
														extend: 'print',
														text: lngPrint,
													}

									]
						},

					]

			};



            // GROUPPED
			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            if(dataGroup+'' == 'true') {
					__dtOptions.pageLength 	= 15;
					__dtOptions.order 		= [[2, 'desc']];
					__dtOptions.rowGroup 	= {dataSrc: 2};
            }
			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            


			// Responsive
			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
			if(isResponsive+'' == 'true') {
				__dtOptions.responsive = true;
			}

			else if(isResponsive+'' == 'extended') {

				__dtOptions.responsive = {
					details: {
						display: $.fn.dataTable.Responsive.display.modal({
							header: function(row) {
								var data = row.data();
								return 'Details for ' + data[0] + ' ' + data[1];
							}
						}),

						renderer: $.fn.dataTable.Responsive.renderer.tableAll({
							tableClass: 'table table-responsive'
						})
					}
				};

			}
			// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --





			// PDFMAKE : 2Mb
			var paths = $.SOW.helper.vendorLogicPaths('datatables');
			if(paths['path_js'] != '') {
				paths['path_js'] = paths['path_js'].replace('datatables.min', 'pdfmake.min');
				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					DTable[ID] = _this.DataTable(__dtOptions);


					/**

						click events

					**/	$.SOW.vendor.datatables.clickEvents(DTable[ID]);

				});
			}
			// -- --



		},



		/**
		 *
		 *	@clickEvents
		 *
		 *
		 **/
		clickEvents: function(_el) {

			if(!events) {

				var events = jQuery('#event_log');
				var clearlogText = function() {
					events.empty();
				}

			}


			_el.on('key', function(e, datatable, key, cell, originalEvent) {
			
				events.prepend('<div class="clearfix"><span class="badge badge-warning">Key press</span>&nbsp; ' + key + ' &bull; ' + cell.data() + '</div>');

			}) .on('key-focus', function(e, datatable, cell) {

				events.prepend('<div class="clearfix"><span class="badge badge-primary">Item click</span>&nbsp; ' + cell.data() + '</div>');

			}).on('key-blur', function(e, datatable, cell) {

				events.prepend('<div class="clearfix"><span class="badge badge-light">Item blur</span>&nbsp; ' + cell.data() + '</div>');

			});

		},



		/**
		 *
		 *	@miscOptions
		 *
		 *
		 **/
		miscOptions: function() {

			/**
	
				Needed for fixed table header

			**/
			var headerHeight = $.SOW.globals.elHeader.outerHeight();
			$('head').append('<style type="text/css">body.header-fixed table.dataTable.fixedHeader-floating { top: '+headerHeight+'px !important; }</style>');

		}
	};


})(jQuery);
/**
 *
 *	[SOW] Prism [Code Highlighter]
 *
 *	@author 		Dorin Grigoras
 *					www.stepofweb.com
 *
 *	@Dependency 	-
 *	@Usage 			$.SOW.vendor.prismjs.init('pre')
 * 	@Ajax Support 	YES
 * 
 *
 **/
;(function ($) {
	'use strict';


	/**
	 *
	 *	@vars
	 *
	 *
	 **/
	var scriptInfo 		= 'Vendor Prism [Code Highlighter]';


	$.SOW.vendor.prismjs = {


		/**
		 *
		 *	@config
		 *
		 *
		 **/
		config: {

			NormalizeWhitespace: {
									'remove-trailing': false,
									'remove-indent': false,
									'left-trim': false,
									'right-trim': false,

									// 'break-lines': 80,
									'indent': 0,
									'remove-initial-line-feed': false,
									'tabs-to-spaces': 2,
									'spaces-to-tabs': 2
								}
		},




		/**
		 *
		 *	@collection
		 *
		 *
		 **/
		collection: $(),




		/**
		 *
		 *	@init
		 *
		 *
		 **/
		init: function (selector, config) {

			// Check Vendor ; dymanically load if missing (should be external)
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			if(selector != '') {
				if(jQuery(selector).length < 1)
					return null;
			}

			if (typeof Prism !== "object") {

				/** ++++++++++++++++++++++++++++++++++++++++++++

					!IMPORTANT!
						This will stop Prismjs to autoinit!
						We init manually on each page load!
						Else, will not work on ajax!

				++++++++++++++++++++++++++++++++++++++++++++++++ **/
				window.Prism = window.Prism || {};
				window.Prism.manual = true;
				/** ++++++++++++++++++++++++++++++++++++++++++++ **/

				var paths = $.SOW.helper.vendorLogicPaths('prismjs');
				if(paths['path_js'] == '') {
					$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
					return null;
				}

				$.SOW.helper.loadScript([paths['path_js']], false, true).done(function() {

					if (typeof Prism !== "object") {
						$.SOW.helper.consoleLog('Vendor Missing : ' + scriptInfo);
						return null;
					}


					/** ++++++++++++++++++++++++++++++++++++++++++++

						!IMPORTANT!
							We load plugin settings here!

					++++++++++++++++++++++++++++++++++++++++++++++++ **/
					// plugin : normalize-whitespace
					Prism.plugins.NormalizeWhitespace.setDefaults($.SOW.vendor.prismjs.config.NormalizeWhitespace);
					/** ++++++++++++++++++++++++++++++++++++++++++++ **/


					// self reinit, external js loaded!
					$.SOW.vendor.prismjs.init(selector, config);
					return null;

				});

				return null;
			}
			// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


			var __selector 			= $.SOW.helper.__selector(selector);
			var __config 			= $.SOW.helper.check_var(config);

			this.selector 			= __selector[0]; 	// '#selector'
			this.collection 		= __selector[1]; 	// $('#selector')
			this.selector_orig 		= __selector[2]; 	// $('#selector') // without ajax container prefix
			this.config 			= (__config !== null) ? $.extend({}, this.config, __config) : this.config;



			// -- * --
			$.SOW.helper.consoleLog('Init : ' + scriptInfo);
			// -- * --



			// Init
			$.SOW.vendor.prismjs.process();

		},



		/**
		 *
		 *	@process
		 *
		 *
		 **/
		process: function() {

			// PHP XDebug
			jQuery('pre.xdebug-var-dump').addClass('language-php');

			// Init
			if (typeof Prism === "object")
				Prism.highlightAll();

		},


	};


})(jQuery);
//! moment.js
//! version : 2.29.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks() {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback(callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return (
            input instanceof Array ||
            Object.prototype.toString.call(input) === '[object Array]'
        );
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return (
            input != null &&
            Object.prototype.toString.call(input) === '[object Object]'
        );
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return Object.getOwnPropertyNames(obj).length === 0;
        } else {
            var k;
            for (k in obj) {
                if (hasOwnProp(obj, k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return (
            typeof input === 'number' ||
            Object.prototype.toString.call(input) === '[object Number]'
        );
    }

    function isDate(input) {
        return (
            input instanceof Date ||
            Object.prototype.toString.call(input) === '[object Date]'
        );
    }

    function map(arr, fn) {
        var res = [],
            i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false,
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this),
                len = t.length >>> 0,
                i;

            for (i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m),
                parsedParts = some.call(flags.parsedDateParts, function (i) {
                    return i != null;
                }),
                isNowValid =
                    !isNaN(m._d.getTime()) &&
                    flags.overflow < 0 &&
                    !flags.empty &&
                    !flags.invalidEra &&
                    !flags.invalidMonth &&
                    !flags.invalidWeekday &&
                    !flags.weekdayMismatch &&
                    !flags.nullInput &&
                    !flags.invalidFormat &&
                    !flags.userInvalidated &&
                    (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid =
                    isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            } else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        } else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = (hooks.momentProperties = []),
        updateInProgress = false;

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment(obj) {
        return (
            obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
        );
    }

    function warn(msg) {
        if (
            hooks.suppressDeprecationWarnings === false &&
            typeof console !== 'undefined' &&
            console.warn
        ) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [],
                    arg,
                    i,
                    key;
                for (i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (key in arguments[0]) {
                            if (hasOwnProp(arguments[0], key)) {
                                arg += key + ': ' + arguments[0][key] + ', ';
                            }
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(
                    msg +
                        '\nArguments: ' +
                        Array.prototype.slice.call(args).join('') +
                        '\n' +
                        new Error().stack
                );
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return (
            (typeof Function !== 'undefined' && input instanceof Function) ||
            Object.prototype.toString.call(input) === '[object Function]'
        );
    }

    function set(config) {
        var prop, i;
        for (i in config) {
            if (hasOwnProp(config, i)) {
                prop = config[i];
                if (isFunction(prop)) {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' +
                /\d{1,2}/.source
        );
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig),
            prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (
                hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])
            ) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i,
                res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L',
    };

    function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (
            (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
            absNumber
        );
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        formatFunctions = {},
        formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(
                    func.apply(this, arguments),
                    token
                );
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens),
            i,
            length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '',
                i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i])
                    ? array[i].call(mom, format)
                    : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] =
            formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(
                localFormattingTokens,
                replaceLongDateFormatTokens
            );
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var defaultLongDateFormat = {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A',
    };

    function longDateFormat(key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper
            .match(formattingTokens)
            .map(function (tok) {
                if (
                    tok === 'MMMM' ||
                    tok === 'MM' ||
                    tok === 'DD' ||
                    tok === 'dddd'
                ) {
                    return tok.slice(1);
                }
                return tok;
            })
            .join('');

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate() {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d',
        defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal(number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        w: 'a week',
        ww: '%d weeks',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years',
    };

    function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output)
            ? output(number, withoutSuffix, string, isFuture)
            : output.replace(/%d/i, number);
    }

    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string'
            ? aliases[units] || aliases[units.toLowerCase()]
            : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [],
            u;
        for (u in unitsObj) {
            if (hasOwnProp(unitsObj, u)) {
                units.push({ unit: u, priority: priorities[u] });
            }
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function absFloor(number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    function makeGetSet(unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get(mom, unit) {
        return mom.isValid()
            ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]()
            : NaN;
    }

    function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (
                unit === 'FullYear' &&
                isLeapYear(mom.year()) &&
                mom.month() === 1 &&
                mom.date() === 29
            ) {
                value = toInt(value);
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](
                    value,
                    mom.month(),
                    daysInMonth(value, mom.month())
                );
            } else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }

    function stringSet(units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units),
                i;
            for (i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    var match1 = /\d/, //       0 - 9
        match2 = /\d\d/, //      00 - 99
        match3 = /\d{3}/, //     000 - 999
        match4 = /\d{4}/, //    0000 - 9999
        match6 = /[+-]?\d{6}/, // -999999 - 999999
        match1to2 = /\d\d?/, //       0 - 99
        match3to4 = /\d\d\d\d?/, //     999 - 9999
        match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
        match1to3 = /\d{1,3}/, //       0 - 999
        match1to4 = /\d{1,4}/, //       0 - 9999
        match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
        matchUnsigned = /\d+/, //       0 - inf
        matchSigned = /[+-]?\d+/, //    -inf - inf
        matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
        matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        // any word (or two) characters or numbers including two/three word month in arabic.
        // includes scottish gaelic two word and hyphenated months
        matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
        regexes;

    regexes = {};

    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex)
            ? regex
            : function (isStrict, localeData) {
                  return isStrict && strictRegex ? strictRegex : regex;
              };
    }

    function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(
            s
                .replace('\\', '')
                .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (
                    matched,
                    p1,
                    p2,
                    p3,
                    p4
                ) {
                    return p1 || p2 || p3 || p4;
                })
        );
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken(token, callback) {
        var i,
            func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken(token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,
        WEEK = 7,
        WEEKDAY = 8;

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1
            ? isLeapYear(year)
                ? 29
                : 28
            : 31 - ((modMonth % 7) % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
            '_'
        ),
        defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split(
            '_'
        ),
        MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        defaultMonthsShortRegex = matchWord,
        defaultMonthsRegex = matchWord;

    function localeMonths(m, format) {
        if (!m) {
            return isArray(this._months)
                ? this._months
                : this._months['standalone'];
        }
        return isArray(this._months)
            ? this._months[m.month()]
            : this._months[
                  (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
                      ? 'format'
                      : 'standalone'
              ][m.month()];
    }

    function localeMonthsShort(m, format) {
        if (!m) {
            return isArray(this._monthsShort)
                ? this._monthsShort
                : this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort)
            ? this._monthsShort[m.month()]
            : this._monthsShort[
                  MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'
              ][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i,
            ii,
            mom,
            llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp(
                    '^' + this.months(mom, '').replace('.', '') + '$',
                    'i'
                );
                this._shortMonthsParse[i] = new RegExp(
                    '^' + this.monthsShort(mom, '').replace('.', '') + '$',
                    'i'
                );
            }
            if (!strict && !this._monthsParse[i]) {
                regex =
                    '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'MMMM' &&
                this._longMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'MMM' &&
                this._shortMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth(mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth(value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }

    function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict
                ? this._monthsShortStrictRegex
                : this._monthsShortRegex;
        }
    }

    function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict
                ? this._monthsStrictRegex
                : this._monthsRegex;
        }
    }

    function computeMonthsParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._monthsShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY', 4], 0, 'year');
    addFormatToken(0, ['YYYYY', 5], 0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] =
            input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear() {
        return isLeapYear(this.year());
    }

    function createDate(y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate(y) {
        var date, args;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear,
            resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear,
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek,
            resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear,
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w', match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W', match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow: 0, // Sunday is the first day of the week.
        doy: 6, // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek() {
        return this._week.dow;
    }

    function localeFirstDayOfYear() {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d', match1to2);
    addRegexToken('e', match1to2);
    addRegexToken('E', match1to2);
    addRegexToken('dd', function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd', function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd', function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
            '_'
        ),
        defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        defaultWeekdaysRegex = matchWord,
        defaultWeekdaysShortRegex = matchWord,
        defaultWeekdaysMinRegex = matchWord;

    function localeWeekdays(m, format) {
        var weekdays = isArray(this._weekdays)
            ? this._weekdays
            : this._weekdays[
                  m && m !== true && this._weekdays.isFormat.test(format)
                      ? 'format'
                      : 'standalone'
              ];
        return m === true
            ? shiftWeekdays(weekdays, this._week.dow)
            : m
            ? weekdays[m.day()]
            : weekdays;
    }

    function localeWeekdaysShort(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : m
            ? this._weekdaysShort[m.day()]
            : this._weekdaysShort;
    }

    function localeWeekdaysMin(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : m
            ? this._weekdaysMin[m.day()]
            : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i,
            ii,
            mom,
            llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdays(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._shortWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._minWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
            }
            if (!this._weekdaysParse[i]) {
                regex =
                    '^' +
                    this.weekdays(mom, '') +
                    '|^' +
                    this.weekdaysShort(mom, '') +
                    '|^' +
                    this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'dddd' &&
                this._fullWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'ddd' &&
                this._shortWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'dd' &&
                this._minWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict
                ? this._weekdaysStrictRegex
                : this._weekdaysRegex;
        }
    }

    function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict
                ? this._weekdaysShortStrictRegex
                : this._weekdaysShortRegex;
        }
    }

    function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict
                ? this._weekdaysMinStrictRegex
                : this._weekdaysMinRegex;
        }
    }

    function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [],
            shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom,
            minp,
            shortp,
            longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = regexEscape(this.weekdaysMin(mom, ''));
            shortp = regexEscape(this.weekdaysShort(mom, ''));
            longp = regexEscape(this.weekdays(mom, ''));
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._weekdaysShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
        this._weekdaysMinStrictRegex = new RegExp(
            '^(' + minPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return (
            '' +
            hFormat.apply(this) +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return (
            '' +
            this.hours() +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(
                this.hours(),
                this.minutes(),
                lowercase
            );
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a', matchMeridiem);
    addRegexToken('A', matchMeridiem);
    addRegexToken('H', match1to2);
    addRegexToken('h', match1to2);
    addRegexToken('k', match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return (input + '').toLowerCase().charAt(0) === 'p';
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
        // Setting the hour should keep the time, because the user explicitly
        // specified which hour they want. So trying to maintain the same hour (in
        // a new timezone) makes sense. Adding/subtracting hours does not follow
        // this rule.
        getSetHour = makeGetSet('Hours', true);

    function localeMeridiem(hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse,
    };

    // internal storage for locale config files
    var locales = {},
        localeFamilies = {},
        globalLocale;

    function commonPrefix(arr1, arr2) {
        var i,
            minl = Math.min(arr1.length, arr2.length);
        for (i = 0; i < minl; i += 1) {
            if (arr1[i] !== arr2[i]) {
                return i;
            }
        }
        return minl;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0,
            j,
            next,
            locale,
            split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (
                    next &&
                    next.length >= j &&
                    commonPrefix(split, next) >= j - 1
                ) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null,
            aliasedRequire;
        // TODO: Find a better way to register and load all the locales in Node
        if (
            locales[name] === undefined &&
            typeof module !== 'undefined' &&
            module &&
            module.exports
        ) {
            try {
                oldLocale = globalLocale._abbr;
                aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {
                // mark as not found to avoid repeating expensive file require call causing high CPU
                // when trying to find en-US, en_US, en-us for every format call
                locales[name] = null; // null means not found
            }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            } else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            } else {
                if (typeof console !== 'undefined' && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn(
                        'Locale ' + key + ' not found. Did you forget to load it?'
                    );
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale(name, config) {
        if (config !== null) {
            var locale,
                parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple(
                    'defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
                );
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config,
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale,
                tmpLocale,
                parentConfig = baseConfig;

            if (locales[name] != null && locales[name].parentLocale != null) {
                // Update existing child locale in-place to avoid memory-leaks
                locales[name].set(mergeConfigs(locales[name]._config, config));
            } else {
                // MERGE
                tmpLocale = loadLocale(name);
                if (tmpLocale != null) {
                    parentConfig = tmpLocale._config;
                }
                config = mergeConfigs(parentConfig, config);
                if (tmpLocale == null) {
                    // updateLocale is called for creating a new locale
                    // Set abbr so it will have a name (getters return
                    // undefined otherwise).
                    config.abbr = name;
                }
                locale = new Locale(config);
                locale.parentLocale = locales[name];
                locales[name] = locale;
            }

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                    if (name === getSetGlobalLocale()) {
                        getSetGlobalLocale(name);
                    }
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale(key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow(m) {
        var overflow,
            a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH] < 0 || a[MONTH] > 11
                    ? MONTH
                    : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
                    ? DATE
                    : a[HOUR] < 0 ||
                      a[HOUR] > 24 ||
                      (a[HOUR] === 24 &&
                          (a[MINUTE] !== 0 ||
                              a[SECOND] !== 0 ||
                              a[MILLISECOND] !== 0))
                    ? HOUR
                    : a[MINUTE] < 0 || a[MINUTE] > 59
                    ? MINUTE
                    : a[SECOND] < 0 || a[SECOND] > 59
                    ? SECOND
                    : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                    ? MILLISECOND
                    : -1;

            if (
                getParsingFlags(m)._overflowDayOfYear &&
                (overflow < YEAR || overflow > DATE)
            ) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
            ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
            ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
            ['YYYY-DDD', /\d{4}-\d{3}/],
            ['YYYY-MM', /\d{4}-\d\d/, false],
            ['YYYYYYMMDD', /[+-]\d{10}/],
            ['YYYYMMDD', /\d{8}/],
            ['GGGG[W]WWE', /\d{4}W\d{3}/],
            ['GGGG[W]WW', /\d{4}W\d{2}/, false],
            ['YYYYDDD', /\d{7}/],
            ['YYYYMM', /\d{6}/, false],
            ['YYYY', /\d{4}/, false],
        ],
        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
            ['HH:mm:ss', /\d\d:\d\d:\d\d/],
            ['HH:mm', /\d\d:\d\d/],
            ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
            ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
            ['HHmmss', /\d\d\d\d\d\d/],
            ['HHmm', /\d\d\d\d/],
            ['HH', /\d\d/],
        ],
        aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
        // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
        rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
        obsOffsets = {
            UT: 0,
            GMT: 0,
            EDT: -4 * 60,
            EST: -5 * 60,
            CDT: -5 * 60,
            CST: -6 * 60,
            MDT: -6 * 60,
            MST: -7 * 60,
            PDT: -7 * 60,
            PST: -8 * 60,
        };

    // date from iso format
    function configFromISO(config) {
        var i,
            l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime,
            dateFormat,
            timeFormat,
            tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    function extractFromRFC2822Strings(
        yearStr,
        monthStr,
        dayStr,
        hourStr,
        minuteStr,
        secondStr
    ) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10),
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s
            .replace(/\([^)]*\)|[\n\t]/g, ' ')
            .replace(/(\s\s+)/g, ' ')
            .replace(/^\s\s*/, '')
            .replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(
                    parsedInput[0],
                    parsedInput[1],
                    parsedInput[2]
                ).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10),
                m = hm % 100,
                h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)),
            parsedArray;
        if (match) {
            parsedArray = extractFromRFC2822Strings(
                match[4],
                match[3],
                match[2],
                match[5],
                match[6],
                match[7]
            );
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        if (config._strict) {
            config._isValid = false;
        } else {
            // Final attempt, use Input Fallback
            hooks.createFromInputFallback(config);
        }
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
            'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
            'discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [
                nowValue.getUTCFullYear(),
                nowValue.getUTCMonth(),
                nowValue.getUTCDate(),
            ];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config) {
        var i,
            date,
            input = [],
            currentDate,
            expectedWeekday,
            yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (
                config._dayOfYear > daysInYear(yearToUse) ||
                config._dayOfYear === 0
            ) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] =
                config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (
            config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0
        ) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(
            null,
            input
        );
        expectedWeekday = config._useUTC
            ? config._d.getUTCDay()
            : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (
            config._w &&
            typeof config._w.d !== 'undefined' &&
            config._w.d !== expectedWeekday
        ) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(
                w.GG,
                config._a[YEAR],
                weekOfYear(createLocal(), 1, 4).year
            );
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i,
            parsedInput,
            tokens,
            token,
            skipped,
            stringLength = string.length,
            totalParsedInputLength = 0,
            era;

        tokens =
            expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) ||
                [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(
                    string.indexOf(parsedInput) + parsedInput.length
                );
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                } else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver =
            stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (
            config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0
        ) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(
            config._locale,
            config._a[HOUR],
            config._meridiem
        );

        // handle era
        era = getParsingFlags(config).era;
        if (era !== null) {
            config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
        }

        configFromArray(config);
        checkOverflow(config);
    }

    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,
            scoreToBeat,
            i,
            currentScore,
            validFormatFound,
            bestFormatIsValid = false;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (isValid(tempConfig)) {
                validFormatFound = true;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (!bestFormatIsValid) {
                if (
                    scoreToBeat == null ||
                    currentScore < scoreToBeat ||
                    validFormatFound
                ) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                    if (validFormatFound) {
                        bestFormatIsValid = true;
                    }
                }
            } else {
                if (currentScore < scoreToBeat) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                }
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i),
            dayOrDate = i.day === undefined ? i.date : i.day;
        config._a = map(
            [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
            function (obj) {
                return obj && parseInt(obj, 10);
            }
        );

        configFromArray(config);
    }

    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({ nullInput: true });
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};

        if (format === true || format === false) {
            strict = format;
            format = undefined;
        }

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if (
            (isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)
        ) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
            'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other < this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        ),
        prototypeMax = deprecate(
            'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other > this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +new Date();
    };

    var ordering = [
        'year',
        'quarter',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second',
        'millisecond',
    ];

    function isDurationValid(m) {
        var key,
            unitHasDecimal = false,
            i;
        for (key in m) {
            if (
                hasOwnProp(m, key) &&
                !(
                    indexOf.call(ordering, key) !== -1 &&
                    (m[key] == null || !isNaN(m[key]))
                )
            ) {
                return false;
            }
        }

        for (i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds =
            +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days + weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months + quarters * 3 + years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration(obj) {
        return obj instanceof Duration;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (
                (dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
            ) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    // FORMATTING

    function offset(token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset(),
                sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return (
                sign +
                zeroFill(~~(offset / 60), 2) +
                separator +
                zeroFill(~~offset % 60, 2)
            );
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z', matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher),
            chunk,
            parts,
            minutes;

        if (matches === null) {
            return null;
        }

        chunk = matches[matches.length - 1] || [];
        parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff =
                (isMoment(input) || isDate(input)
                    ? input.valueOf()
                    : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset(m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset());
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(
                        this,
                        createDuration(input - offset, 'm'),
                        1,
                        false
                    );
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone(input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset() {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            } else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime() {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {},
            other;

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted =
                this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal() {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        // and further modified to allow for strings containing both week and day
        isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration(input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months,
            };
        } else if (isNumber(input) || !isNaN(+input)) {
            duration = {};
            if (key) {
                duration[key] = +input;
            } else {
                duration.milliseconds = +input;
            }
        } else if ((match = aspNetRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
            };
        } else if ((match = isoRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign),
            };
        } else if (duration == null) {
            // checks for null or undefined
            duration = {};
        } else if (
            typeof duration === 'object' &&
            ('from' in duration || 'to' in duration)
        ) {
            diffRes = momentsDifference(
                createLocal(duration.from),
                createLocal(duration.to)
            );

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        if (isDuration(input) && hasOwnProp(input, '_isValid')) {
            ret._isValid = input._isValid;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso(inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months =
            other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +base.clone().add(res.months, 'M');

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(
                    name,
                    'moment().' +
                        name +
                        '(period, number) is deprecated. Please use moment().' +
                        name +
                        '(number, period). ' +
                        'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
                );
                tmp = val;
                val = period;
                period = tmp;
            }

            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add = createAdder(1, 'add'),
        subtract = createAdder(-1, 'subtract');

    function isString(input) {
        return typeof input === 'string' || input instanceof String;
    }

    // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
    function isMomentInput(input) {
        return (
            isMoment(input) ||
            isDate(input) ||
            isString(input) ||
            isNumber(input) ||
            isNumberOrStringArray(input) ||
            isMomentInputObject(input) ||
            input === null ||
            input === undefined
        );
    }

    function isMomentInputObject(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'years',
                'year',
                'y',
                'months',
                'month',
                'M',
                'days',
                'day',
                'd',
                'dates',
                'date',
                'D',
                'hours',
                'hour',
                'h',
                'minutes',
                'minute',
                'm',
                'seconds',
                'second',
                's',
                'milliseconds',
                'millisecond',
                'ms',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function isNumberOrStringArray(input) {
        var arrayTest = isArray(input),
            dataTypeTest = false;
        if (arrayTest) {
            dataTypeTest =
                input.filter(function (item) {
                    return !isNumber(item) && isString(input);
                }).length === 0;
        }
        return arrayTest && dataTypeTest;
    }

    function isCalendarSpec(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'sameDay',
                'nextDay',
                'lastDay',
                'nextWeek',
                'lastWeek',
                'sameElse',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6
            ? 'sameElse'
            : diff < -1
            ? 'lastWeek'
            : diff < 0
            ? 'lastDay'
            : diff < 1
            ? 'sameDay'
            : diff < 2
            ? 'nextDay'
            : diff < 7
            ? 'nextWeek'
            : 'sameElse';
    }

    function calendar$1(time, formats) {
        // Support for single parameter, formats only overload to the calendar function
        if (arguments.length === 1) {
            if (!arguments[0]) {
                time = undefined;
                formats = undefined;
            } else if (isMomentInput(arguments[0])) {
                time = arguments[0];
                formats = undefined;
            } else if (isCalendarSpec(arguments[0])) {
                formats = arguments[0];
                time = undefined;
            }
        }
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse',
            output =
                formats &&
                (isFunction(formats[format])
                    ? formats[format].call(this, now)
                    : formats[format]);

        return this.format(
            output || this.localeData().calendar(format, this, createLocal(now))
        );
    }

    function clone() {
        return new Moment(this);
    }

    function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween(from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (
            (inclusivity[0] === '('
                ? this.isAfter(localFrom, units)
                : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')'
                ? this.isBefore(localTo, units)
                : !this.isAfter(localTo, units))
        );
    }

    function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return (
                this.clone().startOf(units).valueOf() <= inputMs &&
                inputMs <= this.clone().endOf(units).valueOf()
            );
        }
    }

    function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff(input, units, asFloat) {
        var that, zoneDelta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year':
                output = monthDiff(this, that) / 12;
                break;
            case 'month':
                output = monthDiff(this, that);
                break;
            case 'quarter':
                output = monthDiff(this, that) / 3;
                break;
            case 'second':
                output = (this - that) / 1e3;
                break; // 1000
            case 'minute':
                output = (this - that) / 6e4;
                break; // 1000 * 60
            case 'hour':
                output = (this - that) / 36e5;
                break; // 1000 * 60 * 60
            case 'day':
                output = (this - that - zoneDelta) / 864e5;
                break; // 1000 * 60 * 60 * 24, negate dst
            case 'week':
                output = (this - that - zoneDelta) / 6048e5;
                break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default:
                output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff(a, b) {
        if (a.date() < b.date()) {
            // end-of-month calculations work correct when the start month has more
            // days than the end month.
            return -monthDiff(b, a);
        }
        // difference in months
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2,
            adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString() {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true,
            m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(
                m,
                utc
                    ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
                    : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
            );
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
                    .toISOString()
                    .replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(
            m,
            utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
        );
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect() {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment',
            zone = '',
            prefix,
            year,
            datetime,
            suffix;
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        prefix = '[' + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
        datetime = '-MM-DD[T]HH:mm:ss.SSS';
        suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format(inputString) {
        if (!inputString) {
            inputString = this.isUtc()
                ? hooks.defaultFormatUtc
                : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ to: this, from: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ from: this, to: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale(key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData() {
        return this._locale;
    }

    var MS_PER_SECOND = 1000,
        MS_PER_MINUTE = 60 * MS_PER_SECOND,
        MS_PER_HOUR = 60 * MS_PER_MINUTE,
        MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return ((dividend % divisor) + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(
                    this.year(),
                    this.month() - (this.month() % 3),
                    1
                );
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - this.weekday()
                );
                break;
            case 'isoWeek':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - (this.isoWeekday() - 1)
                );
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(
                    time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                    MS_PER_HOUR
                );
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time =
                    startOfDate(
                        this.year(),
                        this.month() - (this.month() % 3) + 3,
                        1
                    ) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - this.weekday() + 7
                    ) - 1;
                break;
            case 'isoWeek':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - (this.isoWeekday() - 1) + 7
                    ) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time +=
                    MS_PER_HOUR -
                    mod$1(
                        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                        MS_PER_HOUR
                    ) -
                    1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 60000;
    }

    function unix() {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate() {
        return new Date(this.valueOf());
    }

    function toArray() {
        var m = this;
        return [
            m.year(),
            m.month(),
            m.date(),
            m.hour(),
            m.minute(),
            m.second(),
            m.millisecond(),
        ];
    }

    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds(),
        };
    }

    function toJSON() {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2() {
        return isValid(this);
    }

    function parsingFlags() {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt() {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict,
        };
    }

    addFormatToken('N', 0, 0, 'eraAbbr');
    addFormatToken('NN', 0, 0, 'eraAbbr');
    addFormatToken('NNN', 0, 0, 'eraAbbr');
    addFormatToken('NNNN', 0, 0, 'eraName');
    addFormatToken('NNNNN', 0, 0, 'eraNarrow');

    addFormatToken('y', ['y', 1], 'yo', 'eraYear');
    addFormatToken('y', ['yy', 2], 0, 'eraYear');
    addFormatToken('y', ['yyy', 3], 0, 'eraYear');
    addFormatToken('y', ['yyyy', 4], 0, 'eraYear');

    addRegexToken('N', matchEraAbbr);
    addRegexToken('NN', matchEraAbbr);
    addRegexToken('NNN', matchEraAbbr);
    addRegexToken('NNNN', matchEraName);
    addRegexToken('NNNNN', matchEraNarrow);

    addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (
        input,
        array,
        config,
        token
    ) {
        var era = config._locale.erasParse(input, token, config._strict);
        if (era) {
            getParsingFlags(config).era = era;
        } else {
            getParsingFlags(config).invalidEra = input;
        }
    });

    addRegexToken('y', matchUnsigned);
    addRegexToken('yy', matchUnsigned);
    addRegexToken('yyy', matchUnsigned);
    addRegexToken('yyyy', matchUnsigned);
    addRegexToken('yo', matchEraYearOrdinal);

    addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
    addParseToken(['yo'], function (input, array, config, token) {
        var match;
        if (config._locale._eraYearOrdinalRegex) {
            match = input.match(config._locale._eraYearOrdinalRegex);
        }

        if (config._locale.eraYearOrdinalParse) {
            array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        } else {
            array[YEAR] = parseInt(input, 10);
        }
    });

    function localeEras(m, format) {
        var i,
            l,
            date,
            eras = this._eras || getLocale('en')._eras;
        for (i = 0, l = eras.length; i < l; ++i) {
            switch (typeof eras[i].since) {
                case 'string':
                    // truncate time
                    date = hooks(eras[i].since).startOf('day');
                    eras[i].since = date.valueOf();
                    break;
            }

            switch (typeof eras[i].until) {
                case 'undefined':
                    eras[i].until = +Infinity;
                    break;
                case 'string':
                    // truncate time
                    date = hooks(eras[i].until).startOf('day').valueOf();
                    eras[i].until = date.valueOf();
                    break;
            }
        }
        return eras;
    }

    function localeErasParse(eraName, format, strict) {
        var i,
            l,
            eras = this.eras(),
            name,
            abbr,
            narrow;
        eraName = eraName.toUpperCase();

        for (i = 0, l = eras.length; i < l; ++i) {
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();

            if (strict) {
                switch (format) {
                    case 'N':
                    case 'NN':
                    case 'NNN':
                        if (abbr === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNN':
                        if (name === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNNN':
                        if (narrow === eraName) {
                            return eras[i];
                        }
                        break;
                }
            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
                return eras[i];
            }
        }
    }

    function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? +1 : -1;
        if (year === undefined) {
            return hooks(era.since).year();
        } else {
            return hooks(era.since).year() + (year - era.offset) * dir;
        }
    }

    function getEraName() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].name;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].name;
            }
        }

        return '';
    }

    function getEraNarrow() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].narrow;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].narrow;
            }
        }

        return '';
    }

    function getEraAbbr() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].abbr;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].abbr;
            }
        }

        return '';
    }

    function getEraYear() {
        var i,
            l,
            dir,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            dir = eras[i].since <= eras[i].until ? +1 : -1;

            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (
                (eras[i].since <= val && val <= eras[i].until) ||
                (eras[i].until <= val && val <= eras[i].since)
            ) {
                return (
                    (this.year() - hooks(eras[i].since).year()) * dir +
                    eras[i].offset
                );
            }
        }

        return this.year();
    }

    function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNameRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNameRegex : this._erasRegex;
    }

    function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, '_erasAbbrRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
    }

    function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNarrowRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
    }

    function matchEraAbbr(isStrict, locale) {
        return locale.erasAbbrRegex(isStrict);
    }

    function matchEraName(isStrict, locale) {
        return locale.erasNameRegex(isStrict);
    }

    function matchEraNarrow(isStrict, locale) {
        return locale.erasNarrowRegex(isStrict);
    }

    function matchEraYearOrdinal(isStrict, locale) {
        return locale._eraYearOrdinalRegex || matchUnsigned;
    }

    function computeErasParse() {
        var abbrPieces = [],
            namePieces = [],
            narrowPieces = [],
            mixedPieces = [],
            i,
            l,
            eras = this.eras();

        for (i = 0, l = eras.length; i < l; ++i) {
            namePieces.push(regexEscape(eras[i].name));
            abbrPieces.push(regexEscape(eras[i].abbr));
            narrowPieces.push(regexEscape(eras[i].narrow));

            mixedPieces.push(regexEscape(eras[i].name));
            mixedPieces.push(regexEscape(eras[i].abbr));
            mixedPieces.push(regexEscape(eras[i].narrow));
        }

        this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
        this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
        this._erasNarrowRegex = new RegExp(
            '^(' + narrowPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg', 'weekYear');
    addWeekYearFormatToken('ggggg', 'weekYear');
    addWeekYearFormatToken('GGGG', 'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);

    // PARSING

    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy
        );
    }

    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.isoWeek(),
            this.isoWeekday(),
            1,
            4
        );
    }

    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }

    function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
    }

    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter(input) {
        return input == null
            ? Math.ceil((this.month() + 1) / 3)
            : this.month((input - 1) * 3 + (this.month() % 3));
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict
            ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
            : locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear(input) {
        var dayOfYear =
            Math.round(
                (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
            ) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });

    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);

    var token, getSetMillisecond;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }

    getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z', 0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr() {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    if (typeof Symbol !== 'undefined' && Symbol.for != null) {
        proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
            return 'Moment<' + this.format() + '>';
        };
    }
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.eraName = getEraName;
    proto.eraNarrow = getEraNarrow;
    proto.eraAbbr = getEraAbbr;
    proto.eraYear = getEraYear;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.weeksInWeekYear = getWeeksInWeekYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = deprecate(
        'dates accessor is deprecated. Use date instead.',
        getSetDayOfMonth
    );
    proto.months = deprecate(
        'months accessor is deprecated. Use month instead',
        getSetMonth
    );
    proto.years = deprecate(
        'years accessor is deprecated. Use year instead',
        getSetYear
    );
    proto.zone = deprecate(
        'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
        getSetZone
    );
    proto.isDSTShifted = deprecate(
        'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
        isDaylightSavingTimeShifted
    );

    function createUnix(input) {
        return createLocal(input * 1000);
    }

    function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat(string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;
    proto$1.eras = localeEras;
    proto$1.erasParse = localeErasParse;
    proto$1.erasConvertYear = localeErasConvertYear;
    proto$1.erasAbbrRegex = erasAbbrRegex;
    proto$1.erasNameRegex = erasNameRegex;
    proto$1.erasNarrowRegex = erasNarrowRegex;

    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;

    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1(format, index, field, setter) {
        var locale = getLocale(),
            utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i,
            out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0,
            i,
            out = [];

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths(format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        eras: [
            {
                since: '0001-01-01',
                until: +Infinity,
                offset: 1,
                name: 'Anno Domini',
                narrow: 'AD',
                abbr: 'AD',
            },
            {
                since: '0000-12-31',
                until: -Infinity,
                offset: 1,
                name: 'Before Christ',
                narrow: 'BC',
                abbr: 'BC',
            },
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (number) {
            var b = number % 10,
                output =
                    toInt((number % 100) / 10) === 1
                        ? 'th'
                        : b === 1
                        ? 'st'
                        : b === 2
                        ? 'nd'
                        : b === 3
                        ? 'rd'
                        : 'th';
            return number + output;
        },
    });

    // Side effect imports

    hooks.lang = deprecate(
        'moment.lang is deprecated. Use moment.locale instead.',
        getSetGlobalLocale
    );
    hooks.langData = deprecate(
        'moment.langData is deprecated. Use moment.localeData instead.',
        getLocale
    );

    var mathAbs = Math.abs;

    function abs() {
        var data = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);

        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);

        return this;
    }

    function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil(number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble() {
        var milliseconds = this._milliseconds,
            days = this._days,
            months = this._months,
            data = this._data,
            seconds,
            minutes,
            hours,
            years,
            monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (
            !(
                (milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0)
            )
        ) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;

        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;

        hours = absFloor(minutes / 60);
        data.hours = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days = days;
        data.months = months;
        data.years = years;

        return this;
    }

    function daysToMonths(days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return (days * 4800) / 146097;
    }

    function monthsToDays(months) {
        // the reverse of daysToMonths
        return (months * 146097) / 4800;
    }

    function as(units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days,
            months,
            milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':
                    return months;
                case 'quarter':
                    return months / 3;
                case 'year':
                    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week':
                    return days / 7 + milliseconds / 6048e5;
                case 'day':
                    return days + milliseconds / 864e5;
                case 'hour':
                    return days * 24 + milliseconds / 36e5;
                case 'minute':
                    return days * 1440 + milliseconds / 6e4;
                case 'second':
                    return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond':
                    return Math.floor(days * 864e5) + milliseconds;
                default:
                    throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1() {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs(alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms'),
        asSeconds = makeAs('s'),
        asMinutes = makeAs('m'),
        asHours = makeAs('h'),
        asDays = makeAs('d'),
        asWeeks = makeAs('w'),
        asMonths = makeAs('M'),
        asQuarters = makeAs('Q'),
        asYears = makeAs('y');

    function clone$1() {
        return createDuration(this);
    }

    function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds'),
        seconds = makeGetter('seconds'),
        minutes = makeGetter('minutes'),
        hours = makeGetter('hours'),
        days = makeGetter('days'),
        months = makeGetter('months'),
        years = makeGetter('years');

    function weeks() {
        return absFloor(this.days() / 7);
    }

    var round = Math.round,
        thresholds = {
            ss: 44, // a few seconds to seconds
            s: 45, // seconds to minute
            m: 45, // minutes to hour
            h: 22, // hours to day
            d: 26, // days to month/week
            w: null, // weeks to month
            M: 11, // months to year
        };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
        var duration = createDuration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            weeks = round(duration.as('w')),
            years = round(duration.as('y')),
            a =
                (seconds <= thresholds.ss && ['s', seconds]) ||
                (seconds < thresholds.s && ['ss', seconds]) ||
                (minutes <= 1 && ['m']) ||
                (minutes < thresholds.m && ['mm', minutes]) ||
                (hours <= 1 && ['h']) ||
                (hours < thresholds.h && ['hh', hours]) ||
                (days <= 1 && ['d']) ||
                (days < thresholds.d && ['dd', days]);

        if (thresholds.w != null) {
            a =
                a ||
                (weeks <= 1 && ['w']) ||
                (weeks < thresholds.w && ['ww', weeks]);
        }
        a = a ||
            (months <= 1 && ['M']) ||
            (months < thresholds.M && ['MM', months]) ||
            (years <= 1 && ['y']) || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof roundingFunction === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var withSuffix = false,
            th = thresholds,
            locale,
            output;

        if (typeof argWithSuffix === 'object') {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
        }
        if (typeof argWithSuffix === 'boolean') {
            withSuffix = argWithSuffix;
        }
        if (typeof argThresholds === 'object') {
            th = Object.assign({}, thresholds, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) {
                th.ss = argThresholds.s - 1;
            }
        }

        locale = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return (x > 0) - (x < 0) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000,
            days = abs$1(this._days),
            months = abs$1(this._months),
            minutes,
            hours,
            years,
            s,
            total = this.asSeconds(),
            totalSign,
            ymSign,
            daysSign,
            hmsSign;

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';

        totalSign = total < 0 ? '-' : '';
        ymSign = sign(this._months) !== sign(total) ? '-' : '';
        daysSign = sign(this._days) !== sign(total) ? '-' : '';
        hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return (
            totalSign +
            'P' +
            (years ? ymSign + years + 'Y' : '') +
            (months ? ymSign + months + 'M' : '') +
            (days ? daysSign + days + 'D' : '') +
            (hours || minutes || seconds ? 'T' : '') +
            (hours ? hmsSign + hours + 'H' : '') +
            (minutes ? hmsSign + minutes + 'M' : '') +
            (seconds ? hmsSign + s + 'S' : '')
        );
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asQuarters = asQuarters;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;

    proto$2.toIsoString = deprecate(
        'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
        toISOString$1
    );
    proto$2.lang = lang;

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    //! moment.js

    hooks.version = '2.29.1';

    setHookCallback(createLocal);

    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD', // <input type="date" />
        TIME: 'HH:mm', // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW', // <input type="week" />
        MONTH: 'YYYY-MM', // <input type="month" />
    };

    return hooks;

})));

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.FileSaver = mod.exports;
  }
})(this, function () {
  "use strict";

  /*
  * FileSaver.js
  * A saveAs() FileSaver implementation.
  *
  * By Eli Grey, http://eligrey.com
  *
  * License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
  * source  : http://purl.eligrey.com/github/FileSaver.js
  */
  // The one and only way of getting global scope in all environments
  // https://stackoverflow.com/q/3277182/1008999
  var _global = typeof window === 'object' && window.window === window ? window : typeof self === 'object' && self.self === self ? self : typeof global === 'object' && global.global === global ? global : void 0;

  function bom(blob, opts) {
    if (typeof opts === 'undefined') opts = {
      autoBom: false
    };else if (typeof opts !== 'object') {
      console.warn('Deprecated: Expected third argument to be a object');
      opts = {
        autoBom: !opts
      };
    } // prepend BOM for UTF-8 XML and text/* types (including HTML)
    // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF

    if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(0xFEFF), blob], {
        type: blob.type
      });
    }

    return blob;
  }

  function download(url, name, opts) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';

    xhr.onload = function () {
      saveAs(xhr.response, name, opts);
    };

    xhr.onerror = function () {
      console.error('could not download file');
    };

    xhr.send();
  }

  function corsEnabled(url) {
    var xhr = new XMLHttpRequest(); // use sync to avoid popup blocker

    xhr.open('HEAD', url, false);

    try {
      xhr.send();
    } catch (e) {}

    return xhr.status >= 200 && xhr.status <= 299;
  } // `a.click()` doesn't work for all browsers (#465)


  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent('click'));
    } catch (e) {
      var evt = document.createEvent('MouseEvents');
      evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }

  var saveAs = _global.saveAs || ( // probably in some web worker
  typeof window !== 'object' || window !== _global ? function saveAs() {}
  /* noop */
  // Use download attribute first if possible (#193 Lumia mobile)
  : 'download' in HTMLAnchorElement.prototype ? function saveAs(blob, name, opts) {
    var URL = _global.URL || _global.webkitURL;
    var a = document.createElement('a');
    name = name || blob.name || 'download';
    a.download = name;
    a.rel = 'noopener'; // tabnabbing
    // TODO: detect chrome extensions & packaged apps
    // a.target = '_blank'

    if (typeof blob === 'string') {
      // Support regular links
      a.href = blob;

      if (a.origin !== location.origin) {
        corsEnabled(a.href) ? download(blob, name, opts) : click(a, a.target = '_blank');
      } else {
        click(a);
      }
    } else {
      // Support blobs
      a.href = URL.createObjectURL(blob);
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
      }, 4E4); // 40s

      setTimeout(function () {
        click(a);
      }, 0);
    }
  } // Use msSaveOrOpenBlob as a second approach
  : 'msSaveOrOpenBlob' in navigator ? function saveAs(blob, name, opts) {
    name = name || blob.name || 'download';

    if (typeof blob === 'string') {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        var a = document.createElement('a');
        a.href = blob;
        a.target = '_blank';
        setTimeout(function () {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  } // Fallback to using FileReader and a popup
  : function saveAs(blob, name, opts, popup) {
    // Open a popup immediately do go around popup blocker
    // Mostly only available on user interaction and the fileReader is async so...
    popup = popup || open('', '_blank');

    if (popup) {
      popup.document.title = popup.document.body.innerText = 'downloading...';
    }

    if (typeof blob === 'string') return download(blob, name, opts);
    var force = blob.type === 'application/octet-stream';

    var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;

    var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

    if ((isChromeIOS || force && isSafari) && typeof FileReader === 'object') {
      // Safari doesn't allow downloading of blob URLs
      var reader = new FileReader();

      reader.onloadend = function () {
        var url = reader.result;
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
        if (popup) popup.location.href = url;else location = url;
        popup = null; // reverse-tabnabbing #460
      };

      reader.readAsDataURL(blob);
    } else {
      var URL = _global.URL || _global.webkitURL;
      var url = URL.createObjectURL(blob);
      if (popup) popup.location = url;else location.href = url;
      popup = null; // reverse-tabnabbing #460

      setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 4E4); // 40s
    }
  });
  _global.saveAs = saveAs.saveAs = saveAs;

  if (typeof module !== 'undefined') {
    module.exports = saveAs;
  }
});

if(!$.SOW.config["vendor:external_css"]){$.SOW.config["vendor:external_css"]=[];}
$.SOW.config["vendor:external_css"]["vendor"] = ["flickity","fancybox","cocoen","photoswipe","swiper","leaflet","fullcalendar","datepicker","daterangepicker","colorpicker","flot","chartjs","mediumeditor","summernoteeditor","datatables","prismjs"];$.SOW.config.autoinit['jarallax'] = ['$.SOW.vendor.jarallax.init','.jarallax', null,true];
$.SOW.config.autoinit['sticky_kit'] = ['$.SOW.vendor.sticky_kit.init','.sticky-kit', null,true];
$.SOW.config.autoinit['sortable'] = ['$.SOW.vendor.sortable.init','.sortable', null,true];
$.SOW.config.autoinit['bootstrap_select'] = ['$.SOW.vendor.bootstrap_select.init','select.bs-select', null,true];
$.SOW.config.autoinit['typed'] = ['$.SOW.vendor.typed.init','.typed', null,true];
$.SOW.config.autoinit['flickity'] = ['$.SOW.vendor.flickity.init','div[data-flickity]', null,true];
$.SOW.config.autoinit['fancybox'] = ['$.SOW.vendor.fancybox.init','a.fancybox', null,true];
$.SOW.config.autoinit['cocoen'] = ['$.SOW.vendor.cocoen.init','figure.cocoen', null,true];
$.SOW.config.autoinit['photoswipe'] = ['$.SOW.vendor.photoswipe.init','a.photoswipe', {showHideOpacity:false,history:false,captionEl:false,shareEl:false,tapToClose:false,tapToToggleControls:false,escKey:true,barsSize:{top:0,bottom:0}},true];
$.SOW.config.autoinit['swiper'] = ['$.SOW.vendor.swiper.init','.swiper-container', null,true];
$.SOW.config.autoinit['leaflet'] = ['$.SOW.vendor.leaflet.init','.map-leaflet', null,true];
$.SOW.config.autoinit['aos'] = ['$.SOW.vendor.aos.init','null', null,true];
$.SOW.config.autoinit['slimscroll'] = ['$.SOW.vendor.slimscroll.init','.slimscroll', {height:"100%",color:"#444",size:"3px",railColor:"#ccc",railOpacity:0.5,alwaysVisible:false,railVisible:true,distance:"0",wheelStep:10,allowPageScroll:false,disableFadeOut:false},true];
$.SOW.config.autoinit['nestable'] = ['$.SOW.vendor.nestable.init','.nestable', null,true];
$.SOW.config.autoinit['fullcalendar'] = ['$.SOW.vendor.fullcalendar.init','.fullcalendar', {plugins:["interaction","dayGrid","timeGrid","list","bootstrap","googleCalendar"],editable:true,eventLimit:true,locale:"en",themeSystem:"bootstrap",defaultView:"dayGridMonth",defaultDate:"2020-10-22T12:37:50.781Z",timeZone:"UTC",header:{left:"prev,next today, addEventButton",center:"title",right:"dayGridMonth,timeGridWeek,timeGridDay,listWeek"},buttonText:{today:"today",month:"month",week:"week",day:"day",list:"list"},eventTimeFormat:{hour:"numeric",minute:"2-digit",meridiem:"short"}},true];
$.SOW.config.autoinit['datepicker'] = ['$.SOW.vendor.datepicker.init','.datepicker', null,true];
$.SOW.config.autoinit['daterangepicker'] = ['$.SOW.vendor.daterangepicker.init','.rangepicker', null,true];
$.SOW.config.autoinit['colorpicker'] = ['$.SOW.vendor.colorpicker.init','.colorpicker', {classic:{swatches:["rgba(244, 67, 54, 1)","rgba(233, 30, 99, 0.95)","rgba(156, 39, 176, 0.9)","rgba(103, 58, 183, 0.85)","rgba(63, 81, 181, 0.8)","rgba(33, 150, 243, 0.75)","rgba(3, 169, 244, 0.7)","rgba(0, 188, 212, 0.7)","rgba(0, 150, 136, 0.75)","rgba(76, 175, 80, 0.8)","rgba(139, 195, 74, 0.85)","rgba(205, 220, 57, 0.9)","rgba(255, 235, 59, 0.95)","rgba(255, 193, 7, 1)"]},monolith:{swatches:["rgba(244, 67, 54, 1)","rgba(233, 30, 99, 0.95)","rgba(156, 39, 176, 0.9)","rgba(103, 58, 183, 0.85)","rgba(63, 81, 181, 0.8)","rgba(33, 150, 243, 0.75)","rgba(3, 169, 244, 0.7)"]},nano:{swatches:["rgba(244, 67, 54, 1)","rgba(233, 30, 99, 0.95)","rgba(156, 39, 176, 0.9)","rgba(103, 58, 183, 0.85)","rgba(63, 81, 181, 0.8)","rgba(33, 150, 243, 0.75)","rgba(3, 169, 244, 0.7)"]},interaction:{hex:true,rgba:true,hsla:false,hsva:false,cmyk:false,input:true,clear:true,save:true}},true];
$.SOW.config.autoinit['flot'] = ['$.SOW.vendor.flot.init','.flot-chart', null,true];
$.SOW.config.autoinit['easypie'] = ['$.SOW.vendor.easypie.init','.easypie', null,true];
$.SOW.config.autoinit['sparkline'] = ['$.SOW.vendor.sparkline.init','.sparkline', null,true];
$.SOW.config.autoinit['chartjs'] = ['$.SOW.vendor.chartjs.init','.chartjs', null,true];
$.SOW.config.autoinit['mediumeditor'] = ['$.SOW.vendor.mediumeditor.init','.medium-editor', null,true];
$.SOW.config.autoinit['summernoteeditor'] = ['$.SOW.vendor.summernoteeditor.init','.summernote-editor', null,true];
$.SOW.config.autoinit['datatables'] = ['$.SOW.vendor.datatables.init','.table-datatable', null,true];
$.SOW.config.autoinit['prismjs'] = ['$.SOW.vendor.prismjs.init','pre', null,true];
if(!$.SOW.config["vendor:external_js"]){$.SOW.config["vendor:external_js"]=[];}
$.SOW.config["vendor:external_js"]["vendor"] = ["flickity","fancybox","cocoen","photoswipe","swiper","leaflet","fullcalendar","datepicker","daterangepicker","colorpicker","flot","easypie","sparkline","chartjs","mediumeditor","summernoteeditor","datatables","prismjs","pdfmake"];