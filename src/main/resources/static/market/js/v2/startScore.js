function scoreFun(object, opts) {
	var defaults = {
		fen_d: 16,
		ScoreGrade: 10,
		parent: "star_score",
		attitude: "attitude",
		scoreNum: -1
	};
	options = $.extend({}, defaults, opts);
	var startParent = object.find("." + options.parent);
	var atti = object.find("." + options.attitude);
	var now_cli;
	var fen_cli;
	var atu;
	var fen_d = options.fen_d;
	var len = options.ScoreGrade;
	var score = options.scoreNum;
	startParent.width(fen_d * len);
	var preA = (5 / len);
	for (var i = 0; i < len; i++) {
		var newSpan = $("<a href='javascript:void(0)' num='"+i+"'></a>");
		newSpan.css({
			"left": 0,
			"width": fen_d * (i + 1),
			"z-index": len - i
		});
		newSpan.appendTo(startParent)
	}
	startParent.find("a").each(function(index, element) {
		$(this).click(function() {
			now_cli = index;
			show(index, $(this));
			$(this).parent().attr("score",now_cli);
			
		});
		$(this).mouseenter(function() {
			show(index, $(this))
		});
		$(this).mouseleave(function() {
			if (now_cli >= 0) {
				var scor = preA * (parseInt(now_cli) + 1);
				startParent.find("a").removeClass("clibg");
				startParent.find("a").eq(now_cli).addClass("clibg");
				var ww = fen_d * (parseInt(now_cli) + 1);
				startParent.find("a").eq(now_cli).css({
					"width": ww,
					"left": "0"
				});
			} else {
				startParent.find("a").removeClass("clibg");
			}
		})
	});
	if(score > -1){
		var tagA = $(".star_score a").eq(score);
		show(score,tagA);
	}
	function show(num, obj) {
		var n = parseInt(num) + 1;
		var lefta = num * fen_d;
		var ww = fen_d * n;
		var scor = preA * n;
		object.find("a").removeClass("clibg");
		obj.addClass("clibg");
		obj.css({
			"width": ww,
			"left": "0"
		});
	}
};

$(function(){
	var $scoreNumber = $("#scoreNumber");
    var number = $scoreNumber.attr("tip");
    $scoreNumber.css("width",16*number);
});