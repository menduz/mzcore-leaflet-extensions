var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports"], function (require, exports) {
    mz.loadCss(module.getPath('./css/ionic.min.css'));
    function activatePlugin() { }
    exports.activatePlugin = activatePlugin;
    ;
    var IonInputBase = (function (_super) {
        __extends(IonInputBase, _super);
        function IonInputBase() {
            _super.apply(this, arguments);
        }
        IonInputBase.prototype.focus = function () {
            if (this.input && this.input.rootNode instanceof HTMLElement) {
                if (document.activeElement == this.input.rootNode)
                    return;
                this.input.rootNode.focus();
            }
        };
        IonInputBase.prototype.value_changed = function (val) {
            if (this.input.rootNode.value != Object.prototype.toString.call(val)) {
                this.input.rootNode.value = val;
            }
        };
        __decorate([
            IonInputBase.Attribute, 
            __metadata('design:type', Boolean)
        ], IonInputBase.prototype, "disabled", void 0);
        IonInputBase = __decorate([
            mz.Widget.ConfigureEmptyTag,
            mz.Widget.ConfigureUnwrapped, 
            __metadata('design:paramtypes', [])
        ], IonInputBase);
        return IonInputBase;
    })(mz.widgets.MzInput);
    exports.IonInputBase = IonInputBase;
    ;
    var IonSelect = (function (_super) {
        __extends(IonSelect, _super);
        function IonSelect() {
            _super.apply(this, arguments);
        }
        IonSelect.prototype.value_changed = function (val) {
            if (!this.list.contains(val)) {
                this.input.rootNode.value = '0';
                return null;
            }
        };
        IonSelect.prototype.changed = function (e) {
            var opt = this.find('option:checked')[0];
            this.value = opt && opt.$scope || null;
        };
        __decorate([
            mz.MVCObject.proxy, 
            __metadata('design:type', mz.Collection)
        ], IonSelect.prototype, "list", void 0);
        IonSelect = __decorate([
            mz.Widget.RegisterComponent("ion-select"),
            mz.Widget.Template("\n<label class=\"item item-input item-select\" onclick=\"{this.focus}\">\n    <div class=\"input-label\">{label}</div>\n    <select name=\"input\" onchange=\"{this.changed}\" disabled=\"{this.disabled}\">\n        <option disabled=\"{this.required}\" visible=\"{!this.required}\" scope=\"{null}\" value=\"0\">{this.get('label-null') || ' '}</option>\n        <mz-repeat tag=\"optgroup\" list=\"{list}\" label=\"{label}\">\n            <option selected=\"{this.value == scope}\">\n                { this.get('label-field') ? scope[this.get('label-field')] : scope.Label || scope.Name || scope }\n            </option>\n        </mz-repeat>\n    </select>\n</label>"), 
            __metadata('design:paramtypes', [])
        ], IonSelect);
        return IonSelect;
    })(IonInputBase);
    exports.IonSelect = IonSelect;
    ;
    var IonText = (function (_super) {
        __extends(IonText, _super);
        function IonText() {
            _super.apply(this, arguments);
        }
        IonText.prototype.focus = function () {
            if (this.input && this.input.rootNode instanceof HTMLElement) {
                this.input.rootNode.focus();
            }
        };
        IonText.prototype.keyup = function (e) {
            this.changed(e);
        };
        IonText.prototype.changed = function (e) {
            this.value = this.input.rootNode.value;
        };
        IonText = __decorate([
            mz.Widget.RegisterComponent("ion-text"),
            mz.Widget.Template("\n<label class=\"item item-input\" onclick=\"{this.focus}\">\n    <span class=\"input-label\">{label}</span>\n    <input type=\"text\" name=\"input\" placeholder=\"{placeholder}\" disabled=\"{this.disabled}\" readonly=\"{readonly}\" onchange=\"{this.changed}\" onkeyup=\"{this.keyup}\" />\n</label>"), 
            __metadata('design:paramtypes', [])
        ], IonText);
        return IonText;
    })(IonInputBase);
    exports.IonText = IonText;
    ;
    var IonPassword = (function (_super) {
        __extends(IonPassword, _super);
        function IonPassword() {
            _super.apply(this, arguments);
        }
        IonPassword = __decorate([
            mz.Widget.RegisterComponent("ion-password"),
            mz.Widget.Template("\n<label class=\"item item-input\" onclick=\"{this.focus}\">\n    <span class=\"input-label\">{label}</span>\n    <input type=\"password\" name=\"input\" placeholder=\"{placeholder}\" disabled=\"{this.disabled}\" readonly=\"{readonly}\"  onchange=\"{this.changed}\" onkeyup=\"{this.keyup}\" />\n</label>"), 
            __metadata('design:paramtypes', [])
        ], IonPassword);
        return IonPassword;
    })(IonText);
    exports.IonPassword = IonPassword;
    var IonToggle = (function (_super) {
        __extends(IonToggle, _super);
        function IonToggle() {
            _super.apply(this, arguments);
        }
        IonToggle.prototype.changed = function (e) {
            if (this.value != e.element.checked)
                this.value = e.element.checked;
        };
        IonToggle.prototype.value_changed = function (val) {
            if (this.input.rootNode.checked != CBool(val)) {
                this.input.rootNode.checked = CBool(val);
            }
        };
        IonToggle = __decorate([
            mz.Widget.RegisterComponent("ion-toggle"),
            mz.Widget.Template("\n<label class=\"toggle\">\n    <input type=\"checkbox\" checked=\"{this.value}\" disabled=\"{this.disabled}\" onchange=\"{this.changed}\" name=\"input\" />\n    <div class=\"track\">\n        <div class=\"handle\"></div>\n    </div>\n</label>"), 
            __metadata('design:paramtypes', [])
        ], IonToggle);
        return IonToggle;
    })(IonInputBase);
    exports.IonToggle = IonToggle;
    ;
    var IonCheckbox = (function (_super) {
        __extends(IonCheckbox, _super);
        function IonCheckbox() {
            _super.apply(this, arguments);
        }
        IonCheckbox.prototype.changed = function (e) {
            if (this.value != e.element.checked)
                this.value = e.element.checked;
        };
        IonCheckbox.prototype.value_changed = function (val) {
            if (this.input.rootNode.checked != CBool(val)) {
                this.input.rootNode.checked = CBool(val);
            }
        };
        IonCheckbox = __decorate([
            mz.Widget.RegisterComponent("ion-checkbox"),
            mz.Widget.Template("\n<label class=\"checkbox\">\n    <input type=\"checkbox\" checked=\"{checked}\" disabled=\"{disabled}\" onchange=\"{this.changed}\" name=\"input\" />\n</label>"), 
            __metadata('design:paramtypes', [])
        ], IonCheckbox);
        return IonCheckbox;
    })(IonInputBase);
    exports.IonCheckbox = IonCheckbox;
    ;
    var IonItemCheckbox = (function (_super) {
        __extends(IonItemCheckbox, _super);
        function IonItemCheckbox() {
            _super.apply(this, arguments);
        }
        IonItemCheckbox.prototype.changed = function (e) {
            if (this.value != e.element.checked)
                this.value = e.element.checked;
        };
        IonItemCheckbox.prototype.value_changed = function (val) {
            if (this.input.rootNode.checked != CBool(val)) {
                this.input.rootNode.checked = CBool(val);
            }
        };
        IonItemCheckbox = __decorate([
            mz.Widget.RegisterComponent("ion-item-checkbox"),
            mz.Widget.Template("\n<li class=\"item item-checkbox\">\n    {label}\n    <label class=\"checkbox\">\n        <input type=\"checkbox\" checked=\"{checked}\" disabled=\"{disabled}\" onchange=\"{this.changed}\" name=\"input\" />\n    </label>\n</li>", '.item'), 
            __metadata('design:paramtypes', [])
        ], IonItemCheckbox);
        return IonItemCheckbox;
    })(IonInputBase);
    exports.IonItemCheckbox = IonItemCheckbox;
    ;
    var IonItemToggle = (function (_super) {
        __extends(IonItemToggle, _super);
        function IonItemToggle() {
            _super.apply(this, arguments);
        }
        IonItemToggle.prototype.changed = function (e) {
            if (this.value != e.element.checked)
                this.value = e.element.checked;
        };
        IonItemToggle.prototype.value_changed = function (val) {
            if (this.input.rootNode.checked != CBool(val)) {
                this.input.rootNode.checked = CBool(val);
            }
        };
        __decorate([
            mz.MVCObject.proxy, 
            __metadata('design:type', String)
        ], IonItemToggle.prototype, "label", void 0);
        __decorate([
            mz.MVCObject.proxy, 
            __metadata('design:type', String)
        ], IonItemToggle.prototype, "mood", void 0);
        IonItemToggle = __decorate([
            mz.Widget.RegisterComponent("ion-item-toggle"),
            mz.Widget.Template("\n<li class=\"item item-toggle\">\n    {label}\n    <label class=\"toggle toggle-{mood}\">\n        <input type=\"checkbox\" checked=\"{checked}\" disabled=\"{disabled}\" onchange=\"{this.changed}\" name=\"input\" />\n        <div class=\"track\">\n            <div class=\"handle\"></div>\n        </div>\n    </label>\n</li>", '.item'), 
            __metadata('design:paramtypes', [])
        ], IonItemToggle);
        return IonItemToggle;
    })(IonInputBase);
    exports.IonItemToggle = IonItemToggle;
    ;
    var IonContent = (function (_super) {
        __extends(IonContent, _super);
        function IonContent(rootNode, attr, children, a, b, scope) {
            var _this = this;
            attr.direction = attr.direction || 'y';
            if (!attr.direction) {
                attr.direction = 'y';
            }
            var isPaging = CBool(attr.paging) === true;
            var scrollViewOptions = {
                el: null,
                delegateHandle: function (a, b, c) { return _this.emit('scroll', a, b, c); },
                locking: (attr.locking || 'true') === 'true',
                bouncing: attr.has_bouncing,
                paging: isPaging,
                scrollbarX: CBool(attr.scrollbar_x) !== false,
                scrollbarY: CBool(attr.scrollbar_y) !== false,
                scrollingX: attr.direction.indexOf('x') >= 0,
                scrollingY: attr.direction.indexOf('y') >= 0,
                zooming: CBool(attr.zooming) === true,
                maxZoom: parseFloat(attr.max_zoom || 3),
                minZoom: parseFloat(attr.min_zoom || 0.5),
                preventDefault: true,
                speedMultiplier: 1
            };
            if (isPaging) {
                scrollViewOptions.speedMultiplier = 0.8;
                scrollViewOptions.bouncing = false;
            }
            _super.call(this, rootNode, attr, children, a, b, scope);
            this['class'] = this['class'] || '';
            if (!('scroll' in attr) || CBool(attr.scroll)) {
                scrollViewOptions.el = this.rootNode;
                var nativeScrolling = CBool(attr.overflowScroll) === true;
                if (nativeScrolling)
                    this['class'] += ' overflow-scroll';
                if (mz.globalContext.ionic)
                    this.scrollCtrl = new mz.globalContext.ionic.views.Scroll(scrollViewOptions);
                else
                    this['class'] += ' overflow-scroll';
            }
            else {
                this['class'] += ' scroll-content-false';
            }
            if (CBool(attr.paging) === true) {
                this['class'] += ' scroll-paging';
            }
            this['class'] += ' scroll-' + attr.direction;
            this['class'] += ' scroll-content ionic-scroll';
        }
        __decorate([
            IonContent.Attribute, 
            __metadata('design:type', String)
        ], IonContent.prototype, "class", void 0);
        IonContent = __decorate([
            mz.Widget.RegisterComponent("ion-content"),
            mz.Widget.Template("<div class=\"scroll\"></div>", ':root'),
            mz.Widget.ConfigureUnwrapped, 
            __metadata('design:paramtypes', [HTMLElement, Object, Array, Object, Object, Object])
        ], IonContent);
        return IonContent;
    })(mz.Widget);
    exports.IonContent = IonContent;
    ;
    var IonPopOver = (function (_super) {
        __extends(IonPopOver, _super);
        function IonPopOver(rootNode, attr, children, a, b, scope) {
            var _this = this;
            _super.call(this, rootNode, attr, children, a, b, scope);
            $(function () {
                requestAnimationFrame(function () {
                    _this.appendTo("body");
                    _this.appendTo = mz.emptyFn;
                });
            });
        }
        IonPopOver.prototype.hide = function () {
            this.visible = false;
        };
        IonPopOver.prototype.show = function () {
            this.visible = true;
        };
        IonPopOver.prototype.open = function (e) {
            var POPOVER_BODY_PADDING = 6;
            var POPOVER_OPTIONS = {
                viewType: 'popover',
                hideDelay: 1,
                animation: 'none'
            };
            var popoverEle = $(this.find('ion-popover-view')).first();
            var targetEle = $(e.element);
            var buttonOffset = targetEle.offset();
            var buttonHeight = targetEle.outerHeight();
            var buttonWidth = targetEle.outerWidth();
            var popoverWidth = popoverEle.width();
            var popoverHeight = popoverEle.height();
            var bodyWidth = window.innerWidth;
            var bodyHeight = window.innerHeight;
            var popoverCSS = {
                top: 0,
                left: buttonOffset.left + buttonWidth / 2 - popoverWidth / 2
            };
            var arrowEle = $(popoverEle[0].querySelector('.popover-arrow'));
            if (popoverCSS.left < POPOVER_BODY_PADDING) {
                popoverCSS.left = POPOVER_BODY_PADDING;
            }
            else if (popoverCSS.left + popoverWidth + POPOVER_BODY_PADDING > bodyWidth) {
                popoverCSS.left = bodyWidth - popoverWidth - POPOVER_BODY_PADDING;
            }
            if (buttonOffset.top + buttonHeight + popoverHeight > bodyHeight &&
                buttonOffset.top - popoverHeight > 0) {
                popoverCSS.top = buttonOffset.top - popoverHeight;
                popoverEle.addClass('popover-bottom');
            }
            else {
                popoverCSS.top = buttonOffset.top + buttonHeight;
                popoverEle.removeClass('popover-bottom');
            }
            arrowEle.css({
                left: buttonOffset.left + buttonWidth / 2 -
                    arrowEle.outerWidth() / 2 - popoverCSS.left + 'px'
            });
            popoverEle.css({
                top: popoverCSS.top + 'px',
                left: popoverCSS.left + 'px',
                marginLeft: '0',
                opacity: '1'
            });
            popoverEle.attr('style', popoverEle.attr('style') + (this.get('style') || ''));
            this.visible = true;
        };
        __decorate([
            IonPopOver.Attribute, 
            __metadata('design:type', Boolean)
        ], IonPopOver.prototype, "visible", void 0);
        IonPopOver = __decorate([
            mz.Widget.RegisterComponent("ion-popover"),
            mz.Widget.Template("\n    <div class=\"popover-backdrop { active: visible, hide: !visible }\" onclick=\"{this.hide}\">\n\t\t<div class=\"popover-wrapper\">\n\t\t\t<ion-popover-view class=\"popover active\" style=\"max-height:80vh;{style}\">\n\t\t\t\t<div class=\"mz-fit popcont\" style=\"overflow-y:auto;overflow-x:hidden;\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"popover-arrow\"></div>\n\t\t\t</ion-popover-view>\n\t\t</div>\n\t</div>", '.popcont'), 
            __metadata('design:paramtypes', [HTMLElement, Object, Array, Object, Object, Object])
        ], IonPopOver);
        return IonPopOver;
    })(mz.Widget);
    exports.IonPopOver = IonPopOver;
    ;
    var IonPopup = (function (_super) {
        __extends(IonPopup, _super);
        function IonPopup(rootNode, attr, children, a, b, scope) {
            var _this = this;
            _super.call(this, rootNode, attr, children, a, b, scope);
            this.loading = false;
            $(function () {
                _this.appendTo("body");
                _this.appendTo = (function () { return void 0; });
            });
        }
        IonPopup.prototype.visible_changed = function (visible) {
            if (visible) {
                $(this.find('.popup-container')).removeClass('popup-hidden').addClass('popup-showing active');
            }
            else {
                $(this.find('.popup-container')).removeClass('popup-showing active').addClass('popup-hidden');
            }
        };
        IonPopup.prototype.hide = function () {
            var _this = this;
            mz.dom.microqueue.callback(function () { return _this.visible = false; });
        };
        IonPopup.prototype.show = function () {
            this.loading = false;
            this.visible = true;
        };
        IonPopup.prototype.width_changed = function (width) {
            if (width) {
                width = ('' + width).trim();
                width = width.match(/^\d+$/) ? width + '%' : width;
                $(this.find('.popup')).width(width);
            }
        };
        IonPopup.prototype.bindPromise = function (promise) {
            var _this = this;
            if (this.visible && promise) {
                return promise.then(function (a) {
                    _this.loading = false;
                    _this.hide();
                    return a;
                }, function (e) {
                    _this.loading = false;
                    throw e;
                });
            }
            return promise;
        };
        __decorate([
            IonPopup.proxy, 
            __metadata('design:type', String)
        ], IonPopup.prototype, "title", void 0);
        __decorate([
            IonPopup.proxy, 
            __metadata('design:type', String)
        ], IonPopup.prototype, "sub_title", void 0);
        __decorate([
            IonPopup.proxy, 
            __metadata('design:type', Boolean)
        ], IonPopup.prototype, "loading", void 0);
        __decorate([
            IonPopup.proxy, 
            __metadata('design:type', String)
        ], IonPopup.prototype, "width", void 0);
        __decorate([
            IonPopup.Attribute, 
            __metadata('design:type', Boolean)
        ], IonPopup.prototype, "visible", void 0);
        IonPopup = __decorate([
            mz.Widget.RegisterComponent("ion-popup"),
            mz.Widget.ConfigureUnwrapped,
            mz.Widget.Template("\n<div class=\"backdrop { active: this.visible, hide: !this.visible, visible: this.visible }\" visible=\"{visible}\" style=\"z-index: 9999;\">\n\t<div class=\"popup-container\">\n\t\t<div class=\"popup\">\n\t\t\t<div class=\"popup-head\">\n\t\t\t\t<h3 class=\"popup-title\">{this.title}</h3>\n\t\t\t\t<h5 class=\"popup-sub-title\" visible=\"{!!this.sub_title}\">{this.sub_title}</h5>\n\t\t\t</div>\n\t\t\t<div class=\"mz-fit\" style=\"z-index:9999;background-color:rgba(255,255,255,0.8)\" visible=\"{this.loading}\">\n\t\t\t\t<div class=\"spinner spinner-lg spinner-centered\" style=\"\"/>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n", '.popup'), 
            __metadata('design:paramtypes', [HTMLElement, Object, Array, Object, Object, Object])
        ], IonPopup);
        return IonPopup;
    })(mz.Widget);
    exports.IonPopup = IonPopup;
    ;
});
