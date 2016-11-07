var webSocketClient = (function ($, window) {
    'use strict';
    /* Created by Stephan on 05.11.2016 */

    var ws = null;
    var ctx = null;

    function connect(connectedCallback, dataCallback, disconnectedCallback, errorCallback) {
        if ('WebSocket' in window) {
            reconnect(connectedCallback, dataCallback, disconnectedCallback, errorCallback);
        } else {
            errorCallback('No WebSocket supported by this browser');
        }
    }

    function uniqueId() {
        return Math.round(new Date().getTime() + (Math.random() * 100));
    }

    function reconnect(connectedCallback, dataCallback, disconnectedCallback, errorCallback) {
        var rootUrl = $(location).attr('host');
        if (rootUrl) {
            ws = new WebSocket('ws:' + rootUrl);
            ctx = 'ctx-' + uniqueId();
            ws.onopen = function () {
                connectedCallback();
            };
            ws.onmessage = function (msg) {
                var data = msg.data;
                if (data != ctx) {
                    dataCallback(data);
                }
            };
            ws.onClose = function () {
                disconnectedCallback();
                this.setTimeout(reconnect, 1000);
            };
            ws.onerror = function (evt) {
                errorCallback(evt);
            }
        } else {
            errorCallback("No WebSocket server available");
        }
    }

    function triggerBroadcast() {
        ws.send(ctx);
    }

    return {
        connect: connect,
        triggerBroadcast: triggerBroadcast
    };

}(jQuery, window));