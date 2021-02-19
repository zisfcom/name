function LastRead(){
	this.bookList="bookList"
	}
LastRead.prototype={	
	set:function(bid,tid,title,texttitle){
		if(!(bid&&tid&&title&&texttitle))return;
		var v=bid+'#'+tid+'#'+title+'#'+texttitle;
		this.setItem(bid,v);
		this.setBook(bid)		
		},
	
	get:function(k){
		return this.getItem(k)?this.getItem(k).split("#"):"";						
		},
	
	remove:function(k){
		this.removeItem(k);
		this.removeBook(k)			
		},
	
	setBook:function(v){
		var reg=new RegExp("(^|#)"+v); 
		var books =	this.getItem(this.bookList);
		if(books==""){
			books=v
			}
		 else{
			 if(books.search(reg)==-1){
				 books+="#"+v				 
				 }
			 else{
				  books.replace(reg,"#"+v)
				 }	 
			 }	
			this.setItem(this.bookList,books)
		
		},
	
	getBook:function(){
		var v=this.getItem(this.bookList)?this.getItem(this.bookList).split("#"):Array();
		var books=Array();
		if(v.length){
			
			for(var i=0;i<v.length;i++){
				var tem=this.getItem(v[i]).split('#');	
				if(i>v.length-11){
					if (tem.length>3)	books.push(tem);
				}
				else{
					lastread.remove(tem[0]);
				}
			}		
		}
		return books		
	},
	
	removeBook:function(v){		
	    var reg=new RegExp("(^|#)"+v); 
		var books =	this.getItem(this.bookList);
		if(!books){
			books=""
			}
		 else{
			 if(books.search(reg)!=-1){	
			      books=books.replace(reg,"")
				 }	 
			 
			 }	
			this.setItem(this.bookList,books)		
		
		},
	
	setItem:function(k,v){
		if(!!window.localStorage){		
			localStorage.setItem(k,v);		
		}
		else{
			var expireDate=new Date();
			  var EXPIR_MONTH=30*24*3600*1000;			
			  expireDate.setTime(expireDate.getTime()+12*EXPIR_MONTH)
			  document.cookie=k+"="+encodeURIComponent(v)+";expires="+expireDate.toGMTString()+"; path=/";		
			}			
		},
		
	getItem:function(k){
		var value=""
		var result=""				
		if(!!window.localStorage){
			result=window.localStorage.getItem(k);
			 value=result||"";	
		}
		else{
			var reg=new RegExp("(^| )"+k+"=([^;]*)(;|\x24)");
			var result=reg.exec(document.cookie);
			if(result){
				value=decodeURIComponent(result[2])||""}				
		}
		return value
		
		},
	
	removeItem:function(k){		
		if(!!window.localStorage){
		 window.localStorage.removeItem(k);		
		}
		else{
			var expireDate=new Date();
			expireDate.setTime(expireDate.getTime()-1000)	
			document.cookie=k+"= "+";expires="+expireDate.toGMTString()							
		}
		},	
	removeAll:function(){
		if(!!window.localStorage){
		 window.localStorage.clear();		
		}
		else{
		var v=this.getItem(this.bookList)?this.getItem(this.bookList).split("#"):Array();
		var books=Array();
		if(v.length){
			for( i in v ){
				var tem=this.removeItem(v[k])				
				}		
			}
			this.removeItem(this.bookList)				
		}
		}	
	}

function showbook(){
	var showbook=document.getElementById('banner');
	var bookhtml='<ul>';
	var books=lastread.getBook();
	if(books.length){
		var iii = '';
		for(var i=books.length-1;i>-1;i--){
			if(i == 0){iii = "border-bottom-width:0px" }else{iii = '';}
			var _17mb_id1000 = parseInt(books[i][0]/1000);		
			bookhtml+='<li style="border-bottom:1px dashed #88C6E5;'+ iii + '"'+'>';
			bookhtml+='<a href="/'+_17mb_id1000+'/'+books[i][0]+'/" class="_17mb_title">'+books[i][2].substring(0,10)+'</a>';
			bookhtml+='<a href="/' + _17mb_id1000 + '/'+books[i][0]+'/'+books[i][1]+'.html"  class="_17mb_chapter">'+books[i][3].substring(0,18)+'</a>';
			bookhtml+='<a href="javascript:removebook(\''+books[i][0]+'\')" class="_17mb_dele">É¾³ý</a>'
			bookhtml+='<div style="clear:both"></div></li>';	
		}
	}
	if(books.length == 0){
		bookhtml+='<li class="_17mb_none">ÔÄ¶Á¼ÇÂ¼Îª¿Õ£¡</li>';
	}
	showbook.innerHTML=bookhtml+"<li class='_17mb_tips'></li></ul>";
} 

function removebook(k){
	lastread.remove(k);
	showbook()
}
function showbook1(){
	var showbook1=document.getElementById('banner');
	if(showbook1.style.display == "block"){
		showbook1.style.display = "none";
	}
	else{
		showbook1.style.display = "block";
	}	
	showbook();
}

	
function yuedu(){
	document.write("<a href='javascript:showbook1();' target='_self'>ÔÄ¶Á¼ÇÂ¼</a>");
}

window.lastread = new LastRead();

