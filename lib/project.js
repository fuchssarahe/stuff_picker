const StuffPicker = require('./stuff_picker.js');

document.addEventListener('DOMContentLoaded', function () {
  const picker = new StuffPicker();
  picker.firstRender();
});

function prompt(window, pref, message, callback) {
    let branch = Components.classes["@mozilla.org/preferences-service;1"]
                           .getService(Components.interfaces.nsIPrefBranch);

    if (branch.getPrefType(pref) === branch.PREF_STRING) {
        switch (branch.getCharPref(pref)) {
        case "always":
            return callback(true);
        case "never":
            return callback(false);
        }
    }

    let done = false;

    function remember(value, result) {
        return function() {
            done = true;
            branch.setCharPref(pref, value);
            callback(result);
        }
    }

    let self = window.PopupNotifications.show(
        window.gBrowser.selectedBrowser,
        "geolocation",
        message,
        "geo-notification-icon",
        {
            label: "Share Location",
            accessKey: "S",
            callback: function(notification) {
                done = true;
                callback(true);
            }
        }, [
            {
                label: "Always Share",
                accessKey: "A",
                callback: remember("always", true)
            },
            {
                label: "Never Share",
                accessKey: "N",
                callback: remember("never", false)
            }
        ], {
            eventCallback: function(event) {
                if (event === "dismissed") {
                    if (!done) callback(false);
                    done = true;
                    window.PopupNotifications.remove(self);
                }
            },
            persistWhileVisible: true
        });
}
// prompt(window,
//        "extensions.foo-addon.allowGeolocation",
//        "Foo Add-on wants to know your location.",
//        function callback(allowed) { alert(allowed); });

// A picker has filters and a spinner.
// The spinner is re-created each time the filters change.
// The spinner is thrown into a re-render loop each time the spinner is clicked.

// How are results generated and displayed?
// spinner will generate a color, and send that back to the picker
// the picker will update the results section to display a random suggestion on the selected color background
