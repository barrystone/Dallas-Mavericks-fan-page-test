function manubar(){
$("#menu-nav ul li").hover(function(){
			$(this).css("border-bottom","5px solid black");
		},function(){
			$(this).css("border-bottom","5px solid #37a5ef");
		});
}
export {manubar};