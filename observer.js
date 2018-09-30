function Observer () {
    this.listeners = {};
}
Observer.prototype = {
    constructor: Observer,
    sub: function (type, fn) {
        this.listeners[type] = this.listeners[type] || [];
        this.listeners[type].push(fn);
    },
    one: function (type, fn) {
        this.sub(type, function tmp (ev) {
            /* eslint-disable no-invalid-this */
            fn.call(this, ev);
            this.unbind(type, tmp);
            /* eslint-enable no-invalid-this */
        });
    },
    pub: function (type) {
        if (this.listeners && this.listeners[type]) {
            for (var i = 0; i < this.listeners[type].length; i++) {
                this.listeners[type][i].apply(this, [].slice.call(arguments, 1));
            }
        }
    },
    unbind: function (type, fn) {
        if (this.listeners && this.listeners[type]) {
            if (typeof fn !== 'function') {
                delete this.listeners[type];
            } else {
                for (var i = 0; i < this.listeners[type].length; i++) {
                    if (this.listeners[type][i] === fn) {
                        this.listeners[type].splice(i--, 1);
                    }
                }
            }
        }
    }
};

module.exports = {
    Observer: Observer,
    observer: new Observer()
};
