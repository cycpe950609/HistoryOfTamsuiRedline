// Modified from https://github.com/tinuzz/leaflet-messagebox
// 2022-12-20 : Change to module
import L from "leaflet"

export const Messagebox = L.Control.extend({
    options: {
        position: 'topright',
        timeout: 3000
    },

    onAdd: function (map) {
        this._container = L.DomUtil.create('div', 'leaflet-control-layers leaflet-control-layers-expanded leaflet-control');
        //L.DomEvent.disableClickPropagation(this._container);
        return this._container;
    },

    show: function (message, timeout) {
        var elem = this._container;
        elem.innerHTML = message;
        elem.style.display = 'block';

        timeout = timeout || this.options.timeout;

        if (typeof this.timeoutID == 'number') {
            clearTimeout(this.timeoutID);
        }
        if(timeout > 0)
            this.timeoutID = setTimeout(function () {
                elem.style.display = 'none';
            }, timeout);
    },

    close: function(){
        this._container.style.display = 'none';
    },

    getContainer: function(){
        return this._container;
    }
});

export const messagebox = function (options) {
    return new Messagebox(options);
}
