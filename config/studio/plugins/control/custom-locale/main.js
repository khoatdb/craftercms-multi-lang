(function () {
  'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  (function () {
    var React = CrafterCMSNext.React;
    var ReactDOM = CrafterCMSNext.ReactDOM;
    var CrafterCMSNextBridge = CrafterCMSNext.components.CrafterCMSNextBridge;
    var ConfirmDialog = CrafterCMSNext.components.ConfirmDialog;

    function CustomLocale(props) {
      var _React$useState = React.useState(false),
          _React$useState2 = _slicedToArray(_React$useState, 2),
          isDialogOpen = _React$useState2[0],
          setIsDialogOpen = _React$useState2[1];

      var _React$useState3 = React.useState(props.locale),
          _React$useState4 = _slicedToArray(_React$useState3, 2),
          locale = _React$useState4[0],
          setLocale = _React$useState4[1];

      var DEFAULT_FIELDS_MAX_LENGTH = 50;

      var onConfirmOk = function onConfirmOk(e) {
        e.preventDefault();

        var _props$unlinkLocale = props.unlinkLocale(),
            uuid = _props$unlinkLocale.uuid,
            sourceLocaleCode = _props$unlinkLocale.sourceLocaleCode;

        setLocale({
          localeCode: locale.localeCode,
          localeSourceId: uuid,
          sourceLocaleCode: sourceLocaleCode
        });
        setIsDialogOpen(false);
      };

      React.useEffect(function () {
        var setLocaleCodeTimer = setInterval(function () {
          if (typeof $ !== 'function') return;
          if (!$('#localeCode_s').find('input')[0]) return;

          if (locale.localeCode && locale.localeCode.length >= 0) {
            $('#localeCode_s').find('input')[0].value = locale.localeCode;
            $('#localeCode_s').find('.cstudio-form-control-input-count')[0].innerHTML = "".concat(locale.localeCode.length, " / ").concat(DEFAULT_FIELDS_MAX_LENGTH);
          }

          clearInterval(setLocaleCodeTimer);
        }, 100);
        var setSourceLocaleCodeTimer = setInterval(function () {
          if (typeof $ !== 'function') return;
          if (!$('#sourceLocaleCode_s').find('input')[0]) return;

          if (locale.sourceLocaleCode && locale.sourceLocaleCode.length >= 0) {
            $('#sourceLocaleCode_s').find('input')[0].value = locale.sourceLocaleCode;
            $('#sourceLocaleCode_s').find('.cstudio-form-control-input-count')[0].innerHTML = "".concat(locale.sourceLocaleCode.length, " / ").concat(DEFAULT_FIELDS_MAX_LENGTH);
          }

          clearInterval(setSourceLocaleCodeTimer);
        }, 100);
      }, [locale.localeCode, locale.sourceLocaleCode, locale.localeSourceId]);
      return /*#__PURE__*/React.createElement(React.Fragment, null, locale && locale.localeCode && locale.sourceLocaleCode && locale.localeCode !== locale.sourceLocaleCode && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
        style: {
          "float": 'right',
          color: '#fff',
          backgroundColor: '#7e9dbb',
          border: '1px solid transparent',
          borderColor: '#6d90b2',
          minWidth: '72px'
        },
        onClick: function onClick() {
          setIsDialogOpen(true);
        }
      }, "Unlink"), /*#__PURE__*/React.createElement(CrafterCMSNextBridge, null, /*#__PURE__*/React.createElement(ConfirmDialog, {
        open: isDialogOpen,
        onOk: onConfirmOk,
        onCancel: function onCancel() {
          setIsDialogOpen(false);
        },
        onClose: function onClose() {
          setIsDialogOpen(false);
        },
        description: "Warning: By unlinking this content you are indicating that this object has no localization relationships to any other objects in the system. Do you wish to continue?",
        title: "Unlink",
        disableEnforceFocus: false
      }))));
    }

    CStudioForms.Controls.CustomLocale = CStudioForms.Controls.CustomLocale || function (id, form, owner, properties, constraints) {
      this.owner = owner;
      this.owner.registerField(this);
      this.errors = [];
      this.properties = properties;
      this.constraints = constraints;
      this.inputEl = null;
      this.countEl = null;
      this.required = false;
      this.value = '_not-set';
      this.form = form;
      this.id = id;
      this.supportedPostFixes = ['_s'];
      return this;
    };

    YAHOO.extend(CStudioForms.Controls.CustomLocale, CStudioForms.CStudioFormField, {
      getLabel: function getLabel() {
        return 'Custom Locale Control';
      },

      /**
       * List of valid custom locale codes for Pokemon
       */
      _getLocaleList: function _getLocaleList() {
        return ['us', 'uk', 'de', 'es', 'fr', 'it', 'dk', 'fi', 'nl', 'no', 'ru', 'se', 'br', 'el', 'jp'];
      },

      /**
       * Get locale code from a site path. Ex: /site/us/content/pokemon/pikachu.html => us
       * @param {*} path
       * @returns
       */
      _getLocaleFromPath: function _getLocaleFromPath(path) {
        if (!path) return '';
        var pathStr = path.toLowerCase().replace(/^\/site\/[^\/]+\//, '');
        var localeCode = pathStr.split('/')[0];

        if (this._getLocaleList().indexOf(localeCode) >= 0) {
          return localeCode;
        }

        return '';
      },

      /**
       * Unlink the content from the current locale
       * New uuid will be assigned and the (source) locale code will be set to current path locale
       * @param {*} obj
       * @returns
       */
      _unlinkLocale: function _unlinkLocale(obj) {
        var uuid = CStudioAuthoring.Utils.generateUUID();

        var sourceLocaleCode = this._getLocaleFromPath(obj.form.path);

        obj.form.updateModel('localeSourceId_s', uuid);
        obj.form.updateModel('sourceLocaleCode_s', sourceLocaleCode);
        return {
          uuid: uuid,
          sourceLocaleCode: sourceLocaleCode
        };
      },

      /**
       * Render form from a React component
       * @param {*} obj
       * @returns
       */
      _renderReactComponent: function _renderReactComponent(obj) {
        var localeFromPath = this._getLocaleFromPath(obj.form.path);

        if (!obj.form.model.localeSourceId_s) {
          return this._renderNewItem(obj, localeFromPath);
        }

        return this._renderExistingItem(obj, localeFromPath);
      },

      /**
       * Item is solo created without being copied from other item
       */
      _renderNewItem: function _renderNewItem(obj, localeFromPath) {
        var _this = this;

        var locale = {
          localeCode: localeFromPath,
          sourceLocaleCode: localeFromPath,
          localeSourceId: CStudioAuthoring.Utils.generateUUID()
        };
        obj.form.updateModel('localeCode_s', locale.localeCode);
        obj.form.updateModel('sourceLocaleCode_s', locale.sourceLocaleCode);
        obj.form.updateModel('localeSourceId_s', locale.localeSourceId);
        ReactDOM.unmountComponentAtNode(obj.containerEl);
        ReactDOM.render(React.createElement(CustomLocale, {
          locale: locale,
          unlinkLocale: function unlinkLocale() {
            return _this._unlinkLocale(obj);
          }
        }), obj.containerEl);
      },

      /**
       * Item already exists (it's an update)
       */
      _renderExistingItem: function _renderExistingItem(obj, localeFromPath) {
        var _this2 = this;

        var locale = {
          localeCode: localeFromPath,
          sourceLocaleCode: obj.form.model.sourceLocaleCode_s || localeFromPath,
          localeSourceId: obj.form.model.localeSourceId_s
        };
        obj.form.updateModel('localeCode_s', locale.localeCode);
        obj.form.updateModel('sourceLocaleCode_s', locale.sourceLocaleCode);
        ReactDOM.unmountComponentAtNode(obj.containerEl);
        ReactDOM.render(React.createElement(CustomLocale, {
          locale: locale,
          unlinkLocale: function unlinkLocale() {
            return _this2._unlinkLocale(obj);
          }
        }), obj.containerEl);
      },
      render: function render(config, containerEl) {
        containerEl.id = this.id;

        this._renderReactComponent(this);
      },
      getValue: function getValue() {
        return this.value;
      },
      setValue: function setValue(value) {
        this.value = value;
      },
      getName: function getName() {
        return 'custom-locale';
      },
      getSupportedProperties: function getSupportedProperties() {
        return [];
      },
      getSupportedConstraints: function getSupportedConstraints() {
        return [];
      },
      getSupportedPostFixes: function getSupportedPostFixes() {
        return this.supportedPostFixes;
      }
    });
    CStudioAuthoring.Module.moduleLoaded('custom-locale', CStudioForms.Controls.CustomLocale);
  })();

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc291cmNlcy9jdXN0b20tbG9jYWxlL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuICB2YXIgUmVhY3QgPSBDcmFmdGVyQ01TTmV4dC5SZWFjdDtcbiAgdmFyIFJlYWN0RE9NID0gQ3JhZnRlckNNU05leHQuUmVhY3RET007XG4gIHZhciBDcmFmdGVyQ01TTmV4dEJyaWRnZSA9IENyYWZ0ZXJDTVNOZXh0LmNvbXBvbmVudHMuQ3JhZnRlckNNU05leHRCcmlkZ2U7XG4gIHZhciBDb25maXJtRGlhbG9nID0gQ3JhZnRlckNNU05leHQuY29tcG9uZW50cy5Db25maXJtRGlhbG9nO1xuXG4gIGZ1bmN0aW9uIEN1c3RvbUxvY2FsZShwcm9wcykge1xuICAgIGNvbnN0IFtpc0RpYWxvZ09wZW4sIHNldElzRGlhbG9nT3Blbl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2xvY2FsZSwgc2V0TG9jYWxlXSA9IFJlYWN0LnVzZVN0YXRlKHByb3BzLmxvY2FsZSk7XG5cbiAgICBjb25zdCBERUZBVUxUX0ZJRUxEU19NQVhfTEVOR1RIID0gNTA7XG5cbiAgICBjb25zdCBvbkNvbmZpcm1PayA9IChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCB7IHV1aWQsIHNvdXJjZUxvY2FsZUNvZGUgfSA9IHByb3BzLnVubGlua0xvY2FsZSgpO1xuICAgICAgc2V0TG9jYWxlKHtcbiAgICAgICAgbG9jYWxlQ29kZTogbG9jYWxlLmxvY2FsZUNvZGUsXG4gICAgICAgIGxvY2FsZVNvdXJjZUlkOiB1dWlkLFxuICAgICAgICBzb3VyY2VMb2NhbGVDb2RlOiBzb3VyY2VMb2NhbGVDb2RlLFxuICAgICAgfSk7XG4gICAgICBzZXRJc0RpYWxvZ09wZW4oZmFsc2UpO1xuICAgIH07XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc3Qgc2V0TG9jYWxlQ29kZVRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mICQgIT09ICdmdW5jdGlvbicpIHJldHVybjtcbiAgICAgICAgaWYgKCEkKCcjbG9jYWxlQ29kZV9zJykuZmluZCgnaW5wdXQnKVswXSkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChsb2NhbGUubG9jYWxlQ29kZSAmJiBsb2NhbGUubG9jYWxlQ29kZS5sZW5ndGggPj0gMCkge1xuICAgICAgICAgICQoJyNsb2NhbGVDb2RlX3MnKS5maW5kKCdpbnB1dCcpWzBdLnZhbHVlID0gbG9jYWxlLmxvY2FsZUNvZGU7XG4gICAgICAgICAgJCgnI2xvY2FsZUNvZGVfcycpLmZpbmQoJy5jc3R1ZGlvLWZvcm0tY29udHJvbC1pbnB1dC1jb3VudCcpWzBdLmlubmVySFRNTCA9IGAke2xvY2FsZS5sb2NhbGVDb2RlLmxlbmd0aH0gLyAke0RFRkFVTFRfRklFTERTX01BWF9MRU5HVEh9YDtcbiAgICAgICAgfVxuICAgICAgICBjbGVhckludGVydmFsKHNldExvY2FsZUNvZGVUaW1lcik7XG4gICAgICB9LCAxMDApO1xuXG4gICAgICBjb25zdCBzZXRTb3VyY2VMb2NhbGVDb2RlVGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgJCAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuO1xuICAgICAgICBpZiAoISQoJyNzb3VyY2VMb2NhbGVDb2RlX3MnKS5maW5kKCdpbnB1dCcpWzBdKSByZXR1cm47XG5cbiAgICAgICAgaWYgKGxvY2FsZS5zb3VyY2VMb2NhbGVDb2RlICYmIGxvY2FsZS5zb3VyY2VMb2NhbGVDb2RlLmxlbmd0aCA+PTAgKSB7XG4gICAgICAgICAgJCgnI3NvdXJjZUxvY2FsZUNvZGVfcycpLmZpbmQoJ2lucHV0JylbMF0udmFsdWUgPSBsb2NhbGUuc291cmNlTG9jYWxlQ29kZTtcbiAgICAgICAgICAkKCcjc291cmNlTG9jYWxlQ29kZV9zJykuZmluZCgnLmNzdHVkaW8tZm9ybS1jb250cm9sLWlucHV0LWNvdW50JylbMF0uaW5uZXJIVE1MID0gYCR7bG9jYWxlLnNvdXJjZUxvY2FsZUNvZGUubGVuZ3RofSAvICR7REVGQVVMVF9GSUVMRFNfTUFYX0xFTkdUSH1gO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2V0U291cmNlTG9jYWxlQ29kZVRpbWVyKTtcbiAgICAgIH0sIDEwMCk7XG4gICAgfSwgW2xvY2FsZS5sb2NhbGVDb2RlLCBsb2NhbGUuc291cmNlTG9jYWxlQ29kZSwgbG9jYWxlLmxvY2FsZVNvdXJjZUlkXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPD5cbiAgICAgIHtsb2NhbGUgJiYgbG9jYWxlLmxvY2FsZUNvZGUgJiYgbG9jYWxlLnNvdXJjZUxvY2FsZUNvZGUgJiYgbG9jYWxlLmxvY2FsZUNvZGUgIT09IGxvY2FsZS5zb3VyY2VMb2NhbGVDb2RlICYmIChcbiAgICAgICAgPD5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBmbG9hdDogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzdlOWRiYicsXG4gICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCB0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzZkOTBiMicsXG4gICAgICAgICAgICAgIG1pbldpZHRoOiAnNzJweCcsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRJc0RpYWxvZ09wZW4odHJ1ZSk7IH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgVW5saW5rXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPENyYWZ0ZXJDTVNOZXh0QnJpZGdlPlxuICAgICAgICAgICAgPENvbmZpcm1EaWFsb2dcbiAgICAgICAgICAgICAgb3Blbj17aXNEaWFsb2dPcGVufVxuICAgICAgICAgICAgICBvbk9rPXtvbkNvbmZpcm1Pa31cbiAgICAgICAgICAgICAgb25DYW5jZWw9eygpID0+IHsgc2V0SXNEaWFsb2dPcGVuKGZhbHNlKSB9fVxuICAgICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB7IHNldElzRGlhbG9nT3BlbihmYWxzZSkgfX1cbiAgICAgICAgICAgICAgZGVzY3JpcHRpb249e1wiV2FybmluZzogQnkgdW5saW5raW5nIHRoaXMgY29udGVudCB5b3UgYXJlIGluZGljYXRpbmcgdGhhdCB0aGlzIG9iamVjdCBoYXMgbm8gbG9jYWxpemF0aW9uIHJlbGF0aW9uc2hpcHMgdG8gYW55IG90aGVyIG9iamVjdHMgaW4gdGhlIHN5c3RlbS4gRG8geW91IHdpc2ggdG8gY29udGludWU/XCJ9XG4gICAgICAgICAgICAgIHRpdGxlPXtcIlVubGlua1wifVxuICAgICAgICAgICAgICBkaXNhYmxlRW5mb3JjZUZvY3VzPXtmYWxzZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9DcmFmdGVyQ01TTmV4dEJyaWRnZT5cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxuXG4gIENTdHVkaW9Gb3Jtcy5Db250cm9scy5DdXN0b21Mb2NhbGUgPSBDU3R1ZGlvRm9ybXMuQ29udHJvbHMuQ3VzdG9tTG9jYWxlIHx8IGZ1bmN0aW9uIChpZCwgZm9ybSwgb3duZXIsIHByb3BlcnRpZXMsIGNvbnN0cmFpbnRzKSB7XG4gICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgIHRoaXMub3duZXIucmVnaXN0ZXJGaWVsZCh0aGlzKTtcbiAgICB0aGlzLmVycm9ycyA9IFtdO1xuICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gICAgdGhpcy5jb25zdHJhaW50cyA9IGNvbnN0cmFpbnRzO1xuICAgIHRoaXMuaW5wdXRFbCA9IG51bGw7XG4gICAgdGhpcy5jb3VudEVsID0gbnVsbDtcbiAgICB0aGlzLnJlcXVpcmVkID0gZmFsc2U7XG4gICAgdGhpcy52YWx1ZSA9ICdfbm90LXNldCc7XG4gICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5zdXBwb3J0ZWRQb3N0Rml4ZXMgPSBbJ19zJ107XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBZQUhPTy5leHRlbmQoQ1N0dWRpb0Zvcm1zLkNvbnRyb2xzLkN1c3RvbUxvY2FsZSwgQ1N0dWRpb0Zvcm1zLkNTdHVkaW9Gb3JtRmllbGQsIHtcbiAgICBnZXRMYWJlbDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICdDdXN0b20gTG9jYWxlIENvbnRyb2wnO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiB2YWxpZCBjdXN0b20gbG9jYWxlIGNvZGVzIGZvciBQb2tlbW9uXG4gICAgICovXG4gICAgX2dldExvY2FsZUxpc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBbJ3VzJywgJ3VrJywgJ2RlJywgJ2VzJywgJ2ZyJywgJ2l0JywgJ2RrJywgJ2ZpJywgJ25sJywgJ25vJywgJ3J1JywgJ3NlJywgJ2JyJywgJ2VsJywgJ2pwJ107XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBHZXQgbG9jYWxlIGNvZGUgZnJvbSBhIHNpdGUgcGF0aC4gRXg6IC9zaXRlL3VzL2NvbnRlbnQvcG9rZW1vbi9waWthY2h1Lmh0bWwgPT4gdXNcbiAgICAgKiBAcGFyYW0geyp9IHBhdGhcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIF9nZXRMb2NhbGVGcm9tUGF0aDogZnVuY3Rpb24ocGF0aCkge1xuICAgICAgaWYgKCFwYXRoKSByZXR1cm4gJyc7XG5cbiAgICAgIGNvbnN0IHBhdGhTdHIgPSBwYXRoLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXlxcL3NpdGVcXC9bXlxcL10rXFwvLywgJycpO1xuICAgICAgY29uc3QgbG9jYWxlQ29kZSA9IHBhdGhTdHIuc3BsaXQoJy8nKVswXTtcbiAgICAgIGlmICh0aGlzLl9nZXRMb2NhbGVMaXN0KCkuaW5kZXhPZihsb2NhbGVDb2RlKSA+PSAwKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGVDb2RlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJyc7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBVbmxpbmsgdGhlIGNvbnRlbnQgZnJvbSB0aGUgY3VycmVudCBsb2NhbGVcbiAgICAgKiBOZXcgdXVpZCB3aWxsIGJlIGFzc2lnbmVkIGFuZCB0aGUgKHNvdXJjZSkgbG9jYWxlIGNvZGUgd2lsbCBiZSBzZXQgdG8gY3VycmVudCBwYXRoIGxvY2FsZVxuICAgICAqIEBwYXJhbSB7Kn0gb2JqXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBfdW5saW5rTG9jYWxlOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICBjb25zdCB1dWlkID0gQ1N0dWRpb0F1dGhvcmluZy5VdGlscy5nZW5lcmF0ZVVVSUQoKTtcbiAgICAgIGNvbnN0IHNvdXJjZUxvY2FsZUNvZGUgPSB0aGlzLl9nZXRMb2NhbGVGcm9tUGF0aChvYmouZm9ybS5wYXRoKTtcbiAgICAgIG9iai5mb3JtLnVwZGF0ZU1vZGVsKCdsb2NhbGVTb3VyY2VJZF9zJywgdXVpZCk7XG4gICAgICBvYmouZm9ybS51cGRhdGVNb2RlbCgnc291cmNlTG9jYWxlQ29kZV9zJywgc291cmNlTG9jYWxlQ29kZSk7XG4gICAgICByZXR1cm4geyB1dWlkLCBzb3VyY2VMb2NhbGVDb2RlIH07XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBSZW5kZXIgZm9ybSBmcm9tIGEgUmVhY3QgY29tcG9uZW50XG4gICAgICogQHBhcmFtIHsqfSBvYmpcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIF9yZW5kZXJSZWFjdENvbXBvbmVudDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICBjb25zdCBsb2NhbGVGcm9tUGF0aCA9IHRoaXMuX2dldExvY2FsZUZyb21QYXRoKG9iai5mb3JtLnBhdGgpO1xuXG4gICAgICBpZiAoIW9iai5mb3JtLm1vZGVsLmxvY2FsZVNvdXJjZUlkX3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlck5ld0l0ZW0ob2JqLCBsb2NhbGVGcm9tUGF0aCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJFeGlzdGluZ0l0ZW0ob2JqLCBsb2NhbGVGcm9tUGF0aCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBJdGVtIGlzIHNvbG8gY3JlYXRlZCB3aXRob3V0IGJlaW5nIGNvcGllZCBmcm9tIG90aGVyIGl0ZW1cbiAgICAgKi9cbiAgICBfcmVuZGVyTmV3SXRlbTogZnVuY3Rpb24ob2JqLCBsb2NhbGVGcm9tUGF0aCkge1xuICAgICAgY29uc3QgbG9jYWxlID0ge1xuICAgICAgICBsb2NhbGVDb2RlOiBsb2NhbGVGcm9tUGF0aCxcbiAgICAgICAgc291cmNlTG9jYWxlQ29kZTogbG9jYWxlRnJvbVBhdGgsXG4gICAgICAgIGxvY2FsZVNvdXJjZUlkOiBDU3R1ZGlvQXV0aG9yaW5nLlV0aWxzLmdlbmVyYXRlVVVJRCgpXG4gICAgICB9O1xuXG4gICAgICBvYmouZm9ybS51cGRhdGVNb2RlbCgnbG9jYWxlQ29kZV9zJywgbG9jYWxlLmxvY2FsZUNvZGUpO1xuICAgICAgb2JqLmZvcm0udXBkYXRlTW9kZWwoJ3NvdXJjZUxvY2FsZUNvZGVfcycsIGxvY2FsZS5zb3VyY2VMb2NhbGVDb2RlKTtcbiAgICAgIG9iai5mb3JtLnVwZGF0ZU1vZGVsKCdsb2NhbGVTb3VyY2VJZF9zJywgbG9jYWxlLmxvY2FsZVNvdXJjZUlkKTtcblxuICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZShvYmouY29udGFpbmVyRWwpO1xuICAgICAgUmVhY3RET00ucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ3VzdG9tTG9jYWxlLCB7IGxvY2FsZSwgdW5saW5rTG9jYWxlOiAoKSA9PiB0aGlzLl91bmxpbmtMb2NhbGUob2JqKSB9KSwgb2JqLmNvbnRhaW5lckVsKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEl0ZW0gYWxyZWFkeSBleGlzdHMgKGl0J3MgYW4gdXBkYXRlKVxuICAgICAqL1xuICAgIF9yZW5kZXJFeGlzdGluZ0l0ZW06IGZ1bmN0aW9uKG9iaiwgbG9jYWxlRnJvbVBhdGgpIHtcbiAgICAgIGNvbnN0IGxvY2FsZSA9IHtcbiAgICAgICAgbG9jYWxlQ29kZTogbG9jYWxlRnJvbVBhdGgsXG4gICAgICAgIHNvdXJjZUxvY2FsZUNvZGU6IG9iai5mb3JtLm1vZGVsLnNvdXJjZUxvY2FsZUNvZGVfcyB8fCBsb2NhbGVGcm9tUGF0aCxcbiAgICAgICAgbG9jYWxlU291cmNlSWQ6IG9iai5mb3JtLm1vZGVsLmxvY2FsZVNvdXJjZUlkX3NcbiAgICAgIH07XG4gICAgICBvYmouZm9ybS51cGRhdGVNb2RlbCgnbG9jYWxlQ29kZV9zJywgbG9jYWxlLmxvY2FsZUNvZGUpO1xuICAgICAgb2JqLmZvcm0udXBkYXRlTW9kZWwoJ3NvdXJjZUxvY2FsZUNvZGVfcycsIGxvY2FsZS5zb3VyY2VMb2NhbGVDb2RlKTtcbiAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUob2JqLmNvbnRhaW5lckVsKTtcbiAgICAgIFJlYWN0RE9NLnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KEN1c3RvbUxvY2FsZSwgeyBsb2NhbGUsIHVubGlua0xvY2FsZTogKCkgPT4gdGhpcy5fdW5saW5rTG9jYWxlKG9iaikgfSksIG9iai5jb250YWluZXJFbCk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uIChjb25maWcsIGNvbnRhaW5lckVsKSB7XG4gICAgICBjb250YWluZXJFbC5pZCA9IHRoaXMuaWQ7XG4gICAgICB0aGlzLl9yZW5kZXJSZWFjdENvbXBvbmVudCh0aGlzKTtcbiAgICB9LFxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9LFxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9LFxuICAgIGdldE5hbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAnY3VzdG9tLWxvY2FsZSc7XG4gICAgfSxcbiAgICBnZXRTdXBwb3J0ZWRQcm9wZXJ0aWVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSxcbiAgICBnZXRTdXBwb3J0ZWRDb25zdHJhaW50czogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0sXG4gICAgZ2V0U3VwcG9ydGVkUG9zdEZpeGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdXBwb3J0ZWRQb3N0Rml4ZXM7XG4gICAgfVxuICB9KTtcbiAgQ1N0dWRpb0F1dGhvcmluZy5Nb2R1bGUubW9kdWxlTG9hZGVkKCdjdXN0b20tbG9jYWxlJywgQ1N0dWRpb0Zvcm1zLkNvbnRyb2xzLkN1c3RvbUxvY2FsZSk7XG59KSgpOyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNyYWZ0ZXJDTVNOZXh0IiwiUmVhY3RET00iLCJDcmFmdGVyQ01TTmV4dEJyaWRnZSIsImNvbXBvbmVudHMiLCJDb25maXJtRGlhbG9nIiwiQ3VzdG9tTG9jYWxlIiwicHJvcHMiLCJ1c2VTdGF0ZSIsImlzRGlhbG9nT3BlbiIsInNldElzRGlhbG9nT3BlbiIsImxvY2FsZSIsInNldExvY2FsZSIsIkRFRkFVTFRfRklFTERTX01BWF9MRU5HVEgiLCJvbkNvbmZpcm1PayIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInVubGlua0xvY2FsZSIsInV1aWQiLCJzb3VyY2VMb2NhbGVDb2RlIiwibG9jYWxlQ29kZSIsImxvY2FsZVNvdXJjZUlkIiwidXNlRWZmZWN0Iiwic2V0TG9jYWxlQ29kZVRpbWVyIiwic2V0SW50ZXJ2YWwiLCIkIiwiZmluZCIsImxlbmd0aCIsInZhbHVlIiwiaW5uZXJIVE1MIiwiY2xlYXJJbnRlcnZhbCIsInNldFNvdXJjZUxvY2FsZUNvZGVUaW1lciIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyIiwiYm9yZGVyQ29sb3IiLCJtaW5XaWR0aCIsIkNTdHVkaW9Gb3JtcyIsIkNvbnRyb2xzIiwiaWQiLCJmb3JtIiwib3duZXIiLCJwcm9wZXJ0aWVzIiwiY29uc3RyYWludHMiLCJyZWdpc3RlckZpZWxkIiwiZXJyb3JzIiwiaW5wdXRFbCIsImNvdW50RWwiLCJyZXF1aXJlZCIsInN1cHBvcnRlZFBvc3RGaXhlcyIsIllBSE9PIiwiZXh0ZW5kIiwiQ1N0dWRpb0Zvcm1GaWVsZCIsImdldExhYmVsIiwiX2dldExvY2FsZUxpc3QiLCJfZ2V0TG9jYWxlRnJvbVBhdGgiLCJwYXRoIiwicGF0aFN0ciIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsInNwbGl0IiwiaW5kZXhPZiIsIl91bmxpbmtMb2NhbGUiLCJvYmoiLCJDU3R1ZGlvQXV0aG9yaW5nIiwiVXRpbHMiLCJnZW5lcmF0ZVVVSUQiLCJ1cGRhdGVNb2RlbCIsIl9yZW5kZXJSZWFjdENvbXBvbmVudCIsImxvY2FsZUZyb21QYXRoIiwibW9kZWwiLCJsb2NhbGVTb3VyY2VJZF9zIiwiX3JlbmRlck5ld0l0ZW0iLCJfcmVuZGVyRXhpc3RpbmdJdGVtIiwidW5tb3VudENvbXBvbmVudEF0Tm9kZSIsImNvbnRhaW5lckVsIiwicmVuZGVyIiwiY3JlYXRlRWxlbWVudCIsInNvdXJjZUxvY2FsZUNvZGVfcyIsImNvbmZpZyIsImdldFZhbHVlIiwic2V0VmFsdWUiLCJnZXROYW1lIiwiZ2V0U3VwcG9ydGVkUHJvcGVydGllcyIsImdldFN1cHBvcnRlZENvbnN0cmFpbnRzIiwiZ2V0U3VwcG9ydGVkUG9zdEZpeGVzIiwiTW9kdWxlIiwibW9kdWxlTG9hZGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUVBLENBQUMsWUFBWTtFQUNYLE1BQUlBLEtBQUssR0FBR0MsY0FBYyxDQUFDRCxLQUEzQjtFQUNBLE1BQUlF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
