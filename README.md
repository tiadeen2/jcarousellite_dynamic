jcarousellite_dynamic
=====================
jCarouselLite dynamic load - jCarouselLiteの【前へ】【次へ】のコンテンツをAjaxで読み込んで既存のリストに付け足すカスタマイズをしたもの。

original jCarouselLite: http://gmarwaha.com/jquery/jcarousellite/
@requires jQuery v1.7 or above

Copyright (c) 2012 ARK-Web Co., Ltd.
Copyright (c) 2007 Ganeshji Marwaha (gmarwaha.com)
Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html

Version: 1.0.1_dynamic


-----------------------------
   Install
-----------------------------
<script type="text/javascript" src="js/jquery-1.7.min.js"></script>
<script type="text/javascript" src="js/jcarousellite_1.0.1_unbind.js"></script>
<script type="text/javascript" src="js/jcarousellite_dynamic.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	
	$("div.carousel").jcl_dynamic({});

});
</script>

* jCarouselLiteと同じようにするが、$(".carousel").jCarouselLite({}) ではなく、$(".carousel").jcl_dynamic({}) とする。

-----------------------------
   jcl_dynamic Options
-----------------------------
@option visible, scroll, btnNext, btnPrev
@desc jcarouselliteに渡すための値なので、仕様はjcarouselliteを参照。

@option apiURL : string - default = "data{PAGE}_json.php"
@desc 【次】・【前】のページデータを返してくれるAPIのURL。{PAGE} の部分は該当ページ番号に置換される

@option page : num - default = 1
@desc 最初に表示するページ数

@option max_page : num - default = 10
@desc APIが返せるデータの最大ページ数

-----------------------------
   jcarousellite 変更点
-----------------------------
2つ Option が増えた。この 2つは jcl_dynamic 側で利用するので、特に意識する必要はない。
@option scrollLast, scrollFirst : function - callbacks
@desc 【次】・【前】が押された時に最後（もしくは最初）の要素が表示されていた時に呼ばれるイベントハンドラをセットできる。

イベントを $(o.btnPrev).click(function() {}); ではなく、$(o.btnPrev).bind("click.prev.jcarousellite", function() {}); に変更した。

circler=falseの時に最後（もしくは最初）の要素なのに次へを押されたら何もしない仕様から、scrollLast, scrollFirst を呼び出すように変更した。

-----------------------------
   APIが返すJSONの想定
-----------------------------
[
  {"alt"    : "example7",
   "image"  : "samples/thm07.jpg",
   "width"  : 100,
   "height" : 100
  },
  {"alt"    : "example8",
   "image"  : "samples/thm08.jpg",
   "width"  : 100,
   "height" : 100
  }
]

-----------------------------
   Example
-----------------------------
<script type="text/javascript" src="js/jquery-1.7.min.js"></script>
<script type="text/javascript" src="js/jcarousellite_1.0.1_unbind.js"></script>
<script type="text/javascript" src="js/jcarousellite_dynamic.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	
	var jcld = $("div.carousel").jcl_dynamic({
		max_page: 10
	});

});
</script>

<div class="jcarousellite">
<div class="controller">
  <button class="prev">前へ</button>
  <button class="next">次へ</button>
</div>
<div class="carousel">
  <ul>
  <li><img src="samples/thm01.jpg" alt="example1" width="100" height="100" /></li>
  <li><img src="samples/thm02.jpg" alt="example2" width="100" height="100" /></li>
  <li><img src="samples/thm03.jpg" alt="example3" width="100" height="100" /></li>
  <li><img src="samples/thm04.jpg" alt="example4" width="100" height="100" /></li>
  </ul>
</div>
<!--.jcarousellite--></div>

上記のサンプルは下記URLから動作確認ができます。
http://okra.ark-web.jp/~takemura/public/js/jcarousellite/jcarousellite_dynamic/
