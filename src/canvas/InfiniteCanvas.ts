import L, { SVGOverlay } from "leaflet";

export let DebugCoordsLayer = L.GridLayer.extend({
    createTile: function (coords: L.Coords) {
        var tile = document.createElement('div');
        tile.innerHTML = [coords.x, coords.y, coords.z].join(', ');
        tile.style.outline = '1px solid red';
        return tile;
    }
});

export let InfiniteCanvas = L.GridLayer.extend({
    createTile: function (coords: L.Coords) {
        var tile = document.createElement('canvas');
        tile.style.pointerEvents = "auto";

        var tileSize = this.getTileSize();
        tile.setAttribute('width', tileSize.x);
        tile.setAttribute('height', tileSize.y);

        var ctx = tile.getContext('2d');

        // Draw whatever is needed in the canvas context
        // For example, circles which get bigger as we zoom in
        if (ctx === null)
            throw new Error("ctx is undefined, cant get 2d context of canvas");

        for (const ev of ["touchstart", "mousedown"]) {
            tile.addEventListener(ev, function (e) {
                let pressure = 0.1;
                let x, y;
                let touchEvt = e as TouchEvent;
                if (touchEvt.touches && touchEvt.touches[0] && typeof touchEvt.touches[0]["force"] !== "undefined") {
                    if (touchEvt.touches[0]["force"] > 0) {
                        pressure = touchEvt.touches[0]["force"]
                    }
                } else {
                    pressure = 1.0
                }

                console.log("Pressure : " + pressure)

            })
        }

        return tile;
    }
});

export default InfiniteCanvas;