// ==UserScript==
// @name         Krunker 1.9.2 Hack
// @namespace    http://tampermonkey.net/
// @version      2.2.0
// @description  Rip from a Krunker Hack Client by THEGUY3ds
// @author       OVERHAX/THEGUY3ds + Hrt + ttap + Katistic
// @icon         https://www.google.com/s2/favicons?domain=krunker.io
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @require      https://code.jquery.com/ui/1.12.0/jquery-ui.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js
// @match        *://krunker.io/*
// @downloadURL  https://raw.githubusercontent.com/Katistic/WheelChairGUI/master/hack.tampermonkey.js
// @run-at       document-end
// @noframes
// @grant        none
// ==/UserScript==

let shared_state = new Map(Object.entries({functions_to_hide: new WeakMap(), strings_to_hide: [], hidden_globals: [], init: false}));

let invisible_define = function(obj, key, value) {
    shared_state.get('hidden_globals').push(key);
    Object.defineProperty(obj, key, {
        enumberable: false,
        configurable: false,
        writable: true,
        value: value
    });
};

let conceal_function = function(original_Function, hook_Function) {
    shared_state.get('functions_to_hide').set(hook_Function, original_Function);
};

const original_toString = Function.prototype.toString;
let hook_toString = new Proxy(original_toString, {
    apply: function(target, _this, _arguments) {
        try {
            var ret = Function.prototype.apply.apply(target, [_this, _arguments]);
        } catch (e) {
            // modify stack trace to hide proxy
            e.stack = e.stack.replace(/\n.*Object\.apply \(<.*/, '');
            throw e;
        }

        let lookup_fn = shared_state.get('functions_to_hide').get(_this);
        if (lookup_fn) {
            return Function.prototype.apply.apply(target, [lookup_fn, _arguments]);
        }

        for (var i = 0; i < shared_state.get('strings_to_hide').length; i++) {
            ret = ret.replace(shared_state.get('strings_to_hide')[i].from, shared_state.get('strings_to_hide')[i].to);
        }
        return ret;
    }
});
Function.prototype.toString = hook_toString;
conceal_function(original_toString, hook_toString);
//


const original_encode = TextEncoder.prototype.encode;
let hook_encode = new Proxy(original_encode, {
    apply: function(target, _this, _arguments) {
        let game = false;
        try {
            if (_arguments[0].length > 1000) {
                console.log(_arguments[0])
            }

        } catch (e) {
            // modify stack trace to hide proxy
            e.stack = e.stack.replace(/\n.*Object\.apply \(<.*/, '');
            throw e;
        }
        if (game) TextEncoder.prototype.encode = original_encode;

        return Function.prototype.apply.apply(target, [_this, _arguments]);
    }
}); TextEncoder.prototype.encode = hook_encode;
conceal_function(original_encode, hook_encode);

const clearRect = CanvasRenderingContext2D.prototype.clearRect;
const original_clearRect = CanvasRenderingContext2D.prototype.scale;
let hook_clearRect = new Proxy(original_clearRect, {
    apply: function(target, _this, _arguments) {
        try {
            var ret = Function.prototype.apply.apply(target, [_this, _arguments]);
        } catch (e) {
            // modify stack trace to hide proxy
            e.stack = e.stack.replace(/\n.*Object\.apply \(<.*/, '');
            throw e;
        }

        return ret;
    }
}); CanvasRenderingContext2D.prototype.scale = hook_clearRect;
conceal_function(original_clearRect, hook_clearRect);
