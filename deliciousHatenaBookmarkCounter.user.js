// ==UserScript==
// @name      delicious hatena bookmark counter
// @namespace http://opera.higeorange.com/
// @include   http://delicious.com/*
// ==/UserScript==

(function() {
    var h_base_uri = 'http://b.hatena.ne.jp/entry/';
    var h_image_base_uri = h_base_uri + 'image/';

    var posts = document.evaluate(
        '//li[contains(concat(" ", normalize-space(@class)," "), " post ")]',
        document, null, 7, null);
    for(var i = 0, l = posts.snapshotLength; i < l; i++) {
        var post = posts.snapshotItem(i);
        var entry_uri = document.evaluate('./div/div[@class="data"]/h4/a',
            post, null, 9, null).singleNodeValue.href;
        // どこに画像を挿入するかがむずかしいな．
        var insert_point = document.evaluate('./div/div[@class="data"]',
            post, null, 9, null).singleNodeValue;

        var h_entry_image = h_image_base_uri + entry_uri;
        var img = document.createElement('img');
            img.src = h_entry_image;
            img.alt = 'hatena_bookmark';
        var a = document.createElement('a');
            a.href = h_base_uri + entry_uri;
            a.appendChild(img);
            insert_point.appendChild(a);
    }
})();
