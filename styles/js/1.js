if (mashiro_option.float_player_on) {
    function aplayerF() {
        'use strict';
        var aplayers = [],
            loadMeting = function () {
                function a(a, b) {
                    var c = {
                        container: a,
                        audio: b,
                        mini: null,
                        fixed: null,
                        autoplay: !1,
                        mutex: !0,
                        lrcType: 3,
                        listFolded: 1,
                        preload: 'auto',
                        theme: '#2980b9',
                        loop: 'all',
                        order: 'list',
                        volume: null,
                        listMaxHeight: null,
                        customAudioType: null,
                        storageName: 'metingjs'
                    };
                    if (b.length) {
                        b[0].lrc || (c.lrcType = 0);
                        var d = {};
                        for (var e in c) {
                            var f = e.toLowerCase();
                            (a.dataset.hasOwnProperty(f) || a.dataset.hasOwnProperty(e) || null !== c[e]) && (d[e] = a.dataset[f] || a.dataset[e] || c[e], ('true' === d[e] || 'false' === d[e]) && (d[e] = 'true' == d[e]))
                        }
                        aplayers.push(new APlayer(d))
                    }
                    for (var f = 0; f < aplayers.length; f++) try {
                        aplayers[f].lrc.hide();
                    } catch (a) {
                        console.log(a)
                    }
                    var lrcTag = 1;
                    $(".aplayer.aplayer-fixed").click(function () {
                        if (lrcTag == 1) {
                            for (var f = 0; f < aplayers.length; f++) try {
                                aplayers[f].lrc.show();
                            } catch (a) {
                                console.log(a)
                            }
                        }
                        lrcTag = 2;
                    });
                    var apSwitchTag = 0;
                    $(".aplayer.aplayer-fixed .aplayer-body").addClass("ap-hover");
                    $(".aplayer-miniswitcher").click(function () {
                        if (apSwitchTag == 0) {
                            $(".aplayer.aplayer-fixed .aplayer-body").removeClass("ap-hover");
                            $("#secondary").addClass("active");
                            apSwitchTag = 1;
                        } else {
                            $(".aplayer.aplayer-fixed .aplayer-body").addClass("ap-hover");
                            $("#secondary").removeClass("active");
                            apSwitchTag = 0;
                        }
                    });
                }
                var b = mashiro_option.meting_api_url + '?server=:server&type=:type&id=:id&_wpnonce=' + Poi.nonce;
                'undefined' != typeof meting_api && (b = meting_api);
                for (var f = 0; f < aplayers.length; f++) try {
                    aplayers[f].destroy()
                } catch (a) {
                    console.log(a)
                }
                aplayers = [];
                for (var c = document.querySelectorAll('.aplayer'), d = function () {
                        var d = c[e],
                            f = d.dataset.id;
                        if (f) {
                            var g = d.dataset.api || b;
                            g = g.replace(':server', d.dataset.server), g = g.replace(':type', d.dataset.type), g = g.replace(':id', d.dataset.id);
                            var h = new XMLHttpRequest;
                            h.onreadystatechange = function () {
                                if (4 === h.readyState && (200 <= h.status && 300 > h.status || 304 === h.status)) {
                                    var b = JSON.parse(h.responseText);
                                    a(d, b)
                                }
                            }, h.open('get', g, !0), h.send(null)
                        } else if (d.dataset.url) {
                            var i = [{
                                name: d.dataset.name || d.dataset.title || 'Audio name',
                                artist: d.dataset.artist || d.dataset.author || 'Audio artist',
                                url: d.dataset.url,
                                cover: d.dataset.cover || d.dataset.pic,
                                lrc: d.dataset.lrc,
                                type: d.dataset.type || 'auto'
                            }];
                            a(d, i)
                        }
                    }, e = 0; e < c.length; e++) d()
            };
        document.addEventListener('DOMContentLoaded', loadMeting, !1);
    }
    if (document.body.clientWidth > 860) {
        aplayerF();
    }
}
