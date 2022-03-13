var duration = "";
var resultDuration = "";
setInterval(() => isYoutubePlaylist(window.location.href), 1000);

function isYoutubePlaylist(url){
    if(resultDuration.toString().includes('Sec') )
    return;

    if(url.length>0)
    {
        if(url.includes("&list=") && url.includes("youtube.com"))
        {
            document.getElementsByTagName("TITLE")[0].text = getDuration()
            resultDuration = document.getElementsByTagName("TITLE")[0].text
        }
        else if(url.includes("playlist?list=") && url.includes("youtube.com"))
        {
            document.getElementsByTagName("TITLE")[0].text =  getDuration()
            resultDuration = document.getElementsByTagName("TITLE")[0].text
        }
    }
}


function getDuration()
{
    console.log("Duration hesaplanıyor");
    var time = 0;

    var ytp = document.querySelectorAll("ytd-playlist-video-list-renderer > #contents > ytd-playlist-video-renderer");
    if(!(ytp.length>0))
    {
        ytp = document.querySelectorAll("ytd-playlist-panel-renderer > #container > #items > ytd-playlist-panel-video-renderer");
    }
    if(ytp != null)
    {
        for (var i = 0; i < ytp.length; i++) {
            var a;
            try {
                a = ytp[i].getElementsByTagName('ytd-thumbnail-overlay-time-status-renderer')[0].innerText;
              } 
            catch (e) {
                console.log(`Iteration ${i} catch block.Error ${e}`);
                continue;
            }
            var tx = a.split(':');
            if (tx.length < 3) {
                time = time + Number(tx[0]) * 60 + Number(tx[1]);
            } else if (tx.length = 3) {
                time = time + Number(tx[0]) * 60 * 60 + Number(tx[1]) * 60 + Number(tx[2]);
            }
        }   
    }

    return convertS(time);        
}

function convertS(sec) {
    var hrs = Math.floor(sec / 3600);
    var min = Math.floor((sec - (hrs * 3600)) / 60);
    var seconds = sec - (hrs * 3600) - (min * 60);
    seconds = Math.round(seconds * 100) / 100

    var result = (hrs < 10 ? "0" + hrs : hrs) + ' Hours ';
    result += (min < 10 ? "0" + min : min) + " Min ";
    result += (seconds < 10 ? "0" + seconds : seconds) + ' Sec ';
    return result;
}











