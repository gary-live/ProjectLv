 var oHtml=document.documentElement;
  getFont();
  window.onresize=function(){
	getFont();
  }
  function getFont(){

	var screenWidth=oHtml.clientWidth;
	oHtml.style.fontSize=screenWidth/(750/100)+"px";
  }