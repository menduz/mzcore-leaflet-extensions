mz.loadCss(module.getPath('./css/ionic.min.css'));

export function activatePlugin() { };

@mz.Widget.ConfigureEmptyTag
@mz.Widget.ConfigureUnwrapped
export class IonInputBase extends mz.widgets.MzInput {
    @IonInputBase.Attribute
    disabled: boolean;

    input: mz.Widget;

    focus() {

        if (this.input && this.input.rootNode instanceof HTMLElement) {
            if (document.activeElement == this.input.rootNode) return;
            (this.input.rootNode as HTMLElement).focus();
        }
    }

    value_changed(val) {
        if ((this.input.rootNode as HTMLInputElement).value != Object.prototype.toString.call(val)) {
            (this.input.rootNode as HTMLInputElement).value = val;
        }
    }
};

@mz.Widget.RegisterComponent("ion-select")
@mz.Widget.Template(`
<label class="item item-input item-select" onclick="{this.focus}">
    <div class="input-label">{label}</div>
    <select name="input" onchange="{this.changed}" disabled="{this.disabled}">
        <option disabled="{this.required}" visible="{!this.required}" scope="{null}" value="0">{this.get('label-null') || ' '}</option>
        <mz-repeat tag="optgroup" list="{list}" label="{label}">
            <option selected="{this.value == scope}">
                { this.get('label-field') ? scope[this.get('label-field')] : scope.Label || scope.Name || scope }
            </option>
        </mz-repeat>
    </select>
</label>`)
export class IonSelect extends IonInputBase {
    @mz.MVCObject.proxy
    list: mz.Collection<any>;

    value_changed(val) {
        if (!this.list.contains(val)) {
            (this.input.rootNode as HTMLInputElement).value = '0';
            return null;
        }
    }

    changed(e: mz.IMZComponentEvent) {
        let opt = this.find('option:checked')[0] as any;

        this.value = opt && opt.$scope || null;
    }
};

@mz.Widget.RegisterComponent("ion-text")
@mz.Widget.Template(`
<label class="item item-input" onclick="{this.focus}">
    <span class="input-label">{label}</span>
    <input type="text" name="input" placeholder="{placeholder}" disabled="{this.disabled}" readonly="{readonly}" onchange="{this.changed}" onkeyup="{this.keyup}" />
</label>`)
export class IonText extends IonInputBase {
    input: mz.Widget;

    focus() {
        if (this.input && this.input.rootNode instanceof HTMLElement) {
            (this.input.rootNode as HTMLElement).focus();
        }
    }

    private keyup(e: mz.IMZComponentEvent) {
        this.changed(e);
    }

    changed(e: mz.IMZComponentEvent) {
        this.value = (this.input.rootNode as HTMLInputElement).value;
    }
};

@mz.Widget.RegisterComponent("ion-password")
@mz.Widget.Template(`
<label class="item item-input" onclick="{this.focus}">
    <span class="input-label">{label}</span>
    <input type="password" name="input" placeholder="{placeholder}" disabled="{this.disabled}" readonly="{readonly}"  onchange="{this.changed}" onkeyup="{this.keyup}" />
</label>`)
export class IonPassword extends IonText { }

@mz.Widget.RegisterComponent("ion-toggle")
@mz.Widget.Template(`
<label class="toggle">
    <input type="checkbox" checked="{this.value}" disabled="{this.disabled}" onchange="{this.changed}" name="input" />
    <div class="track">
        <div class="handle"></div>
    </div>
</label>`)
export class IonToggle extends IonInputBase {
    changed(e: mz.IMZComponentEvent) {
        if (this.value != (<HTMLInputElement>e.element).checked)
            this.value = (<HTMLInputElement>e.element).checked;
    }

    value_changed(val) {
        if ((this.input.rootNode as HTMLInputElement).checked != CBool(val)) {
            (this.input.rootNode as HTMLInputElement).checked = CBool(val);
        }
    }
};

@mz.Widget.RegisterComponent("ion-checkbox")
@mz.Widget.Template(`
<label class="checkbox">
    <input type="checkbox" checked="{checked}" disabled="{disabled}" onchange="{this.changed}" name="input" />
</label>`)
export class IonCheckbox extends IonInputBase {
    changed(e: mz.IMZComponentEvent) {
        if (this.value != (<HTMLInputElement>e.element).checked)
            this.value = (<HTMLInputElement>e.element).checked;
    }

    value_changed(val) {
        if ((this.input.rootNode as HTMLInputElement).checked != CBool(val)) {
            (this.input.rootNode as HTMLInputElement).checked = CBool(val);
        }
    }
};

@mz.Widget.RegisterComponent("ion-item-checkbox")
@mz.Widget.Template(`
<li class="item item-checkbox">
    {label}
    <label class="checkbox">
        <input type="checkbox" checked="{checked}" disabled="{disabled}" onchange="{this.changed}" name="input" />
    </label>
</li>`, '.item')
export class IonItemCheckbox extends IonInputBase {
    changed(e: mz.IMZComponentEvent) {
        if (this.value != (<HTMLInputElement>e.element).checked)
            this.value = (<HTMLInputElement>e.element).checked;
    }

    value_changed(val) {
        if ((this.input.rootNode as HTMLInputElement).checked != CBool(val)) {
            (this.input.rootNode as HTMLInputElement).checked = CBool(val);
        }
    }
};

@mz.Widget.RegisterComponent("ion-item-toggle")
@mz.Widget.Template(`
<li class="item item-toggle">
    {label}
    <label class="toggle toggle-{mood}">
        <input type="checkbox" checked="{checked}" disabled="{disabled}" onchange="{this.changed}" name="input" />
        <div class="track">
            <div class="handle"></div>
        </div>
    </label>
</li>`, '.item')
export class IonItemToggle extends IonInputBase {
    @mz.MVCObject.proxy
    label: string;

    @mz.MVCObject.proxy
    mood: string;

    changed(e: mz.IMZComponentEvent) {
        if (this.value != (<HTMLInputElement>e.element).checked)
            this.value = (<HTMLInputElement>e.element).checked;
    }

    value_changed(val) {
        if ((this.input.rootNode as HTMLInputElement).checked != CBool(val)) {
            (this.input.rootNode as HTMLInputElement).checked = CBool(val);
        }
    }
};

/*
@mz.Widget.RegisterComponent("ion-tabs")
export class IonTabs extends mz.widgets.MzTaber {
    @mz.MVCObject.proxy//Named('icon-style')
    iconStyle: string;

    @mz.MVCObject.proxy//Named('label-visible')
    labelVisible: boolean;

    @mz.MVCObject.proxy
    striped: boolean;

    @mz.MVCObject.proxy
    mood: boolean;

    @mz.MVCObject.proxy
    top: boolean;

    constructor(rootNode: HTMLElement, attr: mz.Dictionary<any>, children: mz.IChildWidget[], a, b, scope) {
        if (attr['iconStyle'] == void 0)
            attr['iconStyle'] = 'top';

        super(rootNode, attr, [], a, b, scope);
        this.startComponent
            `
<div class="scroll-content">
    <mz-repeat list="{this.tabs}" tag="div" class="tabs tabs-icon-{this.iconStyle} tabs-{mood}">
        <a role="presentation" class="{active: scope.tab_visible} tab-item" visible="{scope.componentVisible}" onclick="{this.tabClicked}">
        	<i class="icon {scope.icon}" visible="{scope.icon}"></i>
			{this.labelVisible ? scope.label : null}
        </a>
    </mz-repeat>
    <div class="{has-tabs: !this.top, has-tabs-top: this.top } scroll-content" />
</div>`
        this.setContentSelector('.scroll-content');

        children.forEach(child => {
            if (child instanceof IonTab) {
                this.tabs.push(child);
                child.panel.set('switcher', this.switcher);
                child.parent = this;
                child.on('valueChanged', () => this.tabs.update(child));
            } else {
                console.warn("IonTabs only allows (ion-tab: IonTab) childs");
            }
        });

        var firstTab = this.tabs.first();

        if (firstTab) {
            this.show(firstTab);
        }

        this.children = children;
    }

    top_changed(val: boolean) {
        let v = CBool(val);
        if (v !== val) {
            this.top = v;
        }
        if (v) {
            this.rootNode.classList.add("tabs-top");
            this.rootNode.classList.remove("tabs-bottom");
        } else {
            this.rootNode.classList.remove("tabs-top");
            this.rootNode.classList.add("tabs-bottom");
        }
    }

    striped_changed(val: boolean) {
        if (val)
            this.rootNode.classList.add("tabs-striped");
        else
            this.rootNode.classList.remove("tabs-striped");
    }
};

@mz.Widget.RegisterComponent("ion-tab")
export class IonTab extends mzc.MzTab {
    @mz.MVCObject.proxy
    icon: string;

    @mz.MVCObject.proxy
    label: string;
};

*/

@mz.Widget.RegisterComponent("ion-content")
@mz.Widget.Template(`<div class="scroll"></div>`, ':root')
@mz.Widget.ConfigureUnwrapped
export class IonContent extends mz.Widget {
    constructor(rootNode: HTMLElement, attr: any, children: mz.IChildWidget[], a, b, scope) {

        attr.direction = attr.direction || 'y';

        if (!attr.direction) { attr.direction = 'y'; }
        var isPaging = CBool(attr.paging) === true;

        var scrollViewOptions = {
            el: null,
            delegateHandle: (a, b, c) => this.emit('scroll', a, b, c),
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


        super(rootNode, attr, children, a, b, scope);


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
        } else {
            this['class'] += ' scroll-content-false';
        }

        if (CBool(attr.paging) === true) {
            this['class'] += ' scroll-paging';
        }

        this['class'] += ' scroll-' + attr.direction;

        this['class'] += ' scroll-content ionic-scroll';
    }

    @IonContent.Attribute
    class: string;

    scrollCtrl: any;
};




@mz.Widget.RegisterComponent("ion-popover")
@mz.Widget.Template(`
    <div class="popover-backdrop { active: visible, hide: !visible }" onclick="{this.hide}">
		<div class="popover-wrapper">
			<ion-popover-view class="popover active" style="max-height:80vh;{style}">
				<div class="mz-fit popcont" style="overflow-y:auto;overflow-x:hidden;">
				</div>
				<div class="popover-arrow"></div>
			</ion-popover-view>
		</div>
	</div>`, '.popcont')
export class IonPopOver extends mz.Widget {
    constructor(rootNode: HTMLElement, attr: any, children: mz.IChildWidget[], a, b, scope) {
        super(rootNode, attr, children, a, b, scope);
        $(() => {
            requestAnimationFrame(() => {
                this.appendTo("body");
                this.appendTo = mz.emptyFn as any;
            })
        });
    }

    @IonPopOver.Attribute
    visible: boolean;

    hide() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }

    open(e: mz.IMZComponentEvent) {

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
        // Use innerWidth and innerHeight, because clientWidth and clientHeight
        // doesn't work consistently for body on all platforms
        var bodyWidth = window.innerWidth;
        var bodyHeight = window.innerHeight;

        var popoverCSS = {
            top: 0,
            left: buttonOffset.left + buttonWidth / 2 - popoverWidth / 2
        };
        var arrowEle = $(popoverEle[0].querySelector('.popover-arrow'));

        if (popoverCSS.left < POPOVER_BODY_PADDING) {
            popoverCSS.left = POPOVER_BODY_PADDING;
        } else if (popoverCSS.left + popoverWidth + POPOVER_BODY_PADDING > bodyWidth) {
            popoverCSS.left = bodyWidth - popoverWidth - POPOVER_BODY_PADDING;
        }

        // If the popover when popped down stretches past bottom of screen,
        // make it pop up if there's room above
        if (buttonOffset.top + buttonHeight + popoverHeight > bodyHeight &&
            buttonOffset.top - popoverHeight > 0) {
            popoverCSS.top = buttonOffset.top - popoverHeight;
            popoverEle.addClass('popover-bottom');
        } else {
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

        popoverEle.attr('style', popoverEle.attr('style') + (this.get('style') || ''))

        this.visible = true;
    }
};

@mz.Widget.RegisterComponent("ion-popup")
@mz.Widget.ConfigureUnwrapped
@mz.Widget.Template(`
<div class="backdrop { active: this.visible, hide: !this.visible, visible: this.visible }" visible="{visible}" style="z-index: 9999;">
	<div class="popup-container">
		<div class="popup">
			<div class="popup-head">
				<h3 class="popup-title">{this.title}</h3>
				<h5 class="popup-sub-title" visible="{!!this.sub_title}">{this.sub_title}</h5>
			</div>
			<div class="mz-fit" style="z-index:9999;background-color:rgba(255,255,255,0.8)" visible="{this.loading}">
				<div class="spinner spinner-lg spinner-centered" style=""/>
			</div>
		</div>
	</div>
</div>
`, '.popup')
export class IonPopup extends mz.Widget {

    @IonPopup.proxy
    title: string;

    @IonPopup.proxy
    sub_title: string;

    @IonPopup.proxy
    loading: boolean = false;

    @IonPopup.proxy
    width: string;

    @IonPopup.Attribute
    visible: boolean;


    constructor(rootNode: HTMLElement, attr: any, children: mz.IChildWidget[], a, b, scope) {
        super(rootNode, attr, children, a, b, scope);
        $(() => {
            this.appendTo("body");
            this.appendTo = <any>(() => void 0);
        });
    }

    visible_changed(visible) {
        if (visible) {
            $(this.find('.popup-container')).removeClass('popup-hidden').addClass('popup-showing active');
        } else {
            $(this.find('.popup-container')).removeClass('popup-showing active').addClass('popup-hidden');
        }
    }

    hide() {
        mz.dom.microqueue.callback(() => this.visible = false);
    }

    show() {
        this.loading = false;
        this.visible = true;
    }

    width_changed(width) {
        if (width) {
            width = ('' + width).trim();
            width = width.match(/^\d+$/) ? width + '%' : width;
            $(this.find('.popup')).width(width);
        }
    }

    bindPromise<T>(promise: Promise<T>) {
        if (this.visible && promise) {
            return promise.then(a => {
                this.loading = false;
                this.hide();
                return a;
            }, e => {
                this.loading = false;
                throw e;
            })
        }
        return promise;
    }
};