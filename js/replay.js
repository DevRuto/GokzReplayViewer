
function loadList() {

}

function loadReplay(url) {
    document.getElementById("map-view").innerHTML = "";
    document.getElementById("map-view").style.display = "flex";
    let viewer = new Gokz.ReplayViewer(document.getElementById("map-view"));
    viewer.mapBaseUrl = "https://rutoc.me/resources/csgo/maps";
    viewer.cameraMode = SourceUtils.CameraMode.Fixed;

    viewer.replayLoaded.addListener(function (replay) {
        let mins = Math.floor(replay.time / 60);
        let secs = replay.time - (mins * 60);
        let secsString = secs.toFixed(3);
        let title = replay.mapName
            + " | " + mins + ":" + (secsString.indexOf(".") === 1 ? "0" : "") + secsString
            + " - " + replay.playerName
            + " [" + Gokz.GlobalMode[replay.mode].toUpperCase() + "]"
            + " [" + (replay.teleportsUsed === 0 ? "PRO" : "NUB") + "]";
        document.getElementById("title").innerText = title;
        document.title = title;
    });

    viewer.showDebugPanel = true;
    viewer.saveCameraPosInHash = true;
    viewer.isPlaying = true;
    viewer.loadReplay(url);
    viewer.animate();
}

$(document).ready(() => {
    // search
    /*$("#map-filter").keyup((e) => {
        let text = e.currentTarget.value;
        console.log("filter: " + text);
        $(`div[data-map*=${text}]`).show()
        $(`div[data-map]`).not(`[data-map*=${text}]`).hide();
    });*/
    loadList();
    loadReplay("https://staging.kztimerglobal.com/api/v1.0/records/replay/15");
});
