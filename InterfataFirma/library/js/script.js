var WSRootURI='/WebService/service';
//from header.php
//var _CIP="<?php echo $_SERVER["REMOTE_ADDR"];?>";
//var _SIP="<?php echo $_SERVER['SERVER_ADDR'];?>";
function initializeMap() {
            var mapOptions = {
                zoom: 2,
                center: myLatlng[0],
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            for( var i = 0; i < myLatlng.length; i++){
                var marker = new google.maps.Marker({
                    position: myLatlng[i],
                    map: map,
                    title: 'Hello World!'
                });
            }
        }
  
  function initializeMap2() {
            var Lipscani = new google.maps.LatLng(44.4325,26.103889);
            var mapOptions = {
                zoom: 12,
                center: Lipscani,
                mapTypeId: google.maps.MapTypeId.ROADMAP
                
            };
            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            for( var i = 0; i < obiecte.length; i++){
                var myLatlng = new google.maps.LatLng(parseFloat(obiecte[i].lat), parseFloat(obiecte[i].long));
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: obiecte[i].nume + ", " + obiecte[i].deseu,
                    clickable: true
                });
                marker.info = new google.maps.InfoWindow({
                content: '<img src="'+"./library/img/google-map.png"+'"/> '+obiecte[i].nume
              });

              google.maps.event.addListener(marker, 'click', function() {
                marker.info.open(map, marker);
              });
            }
            
        }
        
function initializeMap3() {
      var Lipscani = new google.maps.LatLng(44.4325,26.103889);
    var myOptions = {
      center:Lipscani,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        myOptions);

    setMarkers(map,obiecte);

  }



  function setMarkers(map,obiecte){

      var marker, i;

for (i = 0; i < obiecte.length; i++)
 {  

 var nume = obiecte[i].nume;
 var lat = obiecte[i].lat;
 var long =obiecte[i].long;
 var deseu =  obiecte[i].deseu;
 var path= obiecte[i].path;

 var latlngset = new google.maps.LatLng(lat, long);

  var marker = new google.maps.Marker({  
          map: map, title: nume , position: latlngset  
        });
        //map.setCenter(marker.getPosition());


        var content = "Nume: " + nume +  '</h3>' + "<br> Deseu: <b>" + deseu +'</b><br>'+
                '<img src="'+path+'"/> <br>';    

  var infowindow = new google.maps.InfoWindow();

google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
        return function() {
           infowindow.setContent(content);
           infowindow.open(map,marker);
        };
    })(marker,content,infowindow)); 

  }
  }

function ValidateDataLogin() {
      var input = document.getElementById("inputEmail");
	  var pass = document.getElementById("inputPassword");
	  var groupInput = document.getElementById("userPlace");
	  var groupPass = document.getElementById("passPlace");
	  var buton = document.getElementById("buton");
//	  var check = document.getElementById("chk");
	
      if (input.value === "" && pass.value === "")
      {
		groupInput.setAttribute("class", "control-group error");
		groupPass.setAttribute("class", "control-group error");
		buton.setAttribute("class", "btn btn-danger");
		container.setAttribute("id", "containerError");
		return false;
		}
	  else if (input.value === ""){
			groupInput.setAttribute("class", "control-group error");
			buton.setAttribute("class", "btn btn-danger");
			container.setAttribute("id", "containerError");
			return false;
			}
	       else if (pass.value === ""){
					groupPass.setAttribute("class", "control-group error");
					buton.setAttribute("class", "btn btn-danger");
					container.setAttribute("id", "containerError");
					return false;
				}
//	  if(check.value === "on")
//			setCookie(input.value, 100);
	  document.getElementById("formular").submit();
	  return true;			
	}

function ShowPicture(link)
{
    $.colorbox({href:""+link});
//    console.log(link);
}
 function GenerateJSONString(arNumeParam,arValParam)
{
    var theString='';
    var theObject={};
    
    for (var i=0; i < arNumeParam.length;i++)
        {
          
          theObject[arNumeParam[i]]=arValParam[i];
        }
        theString=JSON.stringify(theObject);
//        alert(theString);
     return theString;   
}


function VerificaInregistrare(idBtn)
{
    var row=$("#"+idBtn).parent("td").parent("tr");
    row.addClass("success");
    setTimeout(function(){
        row.remove();
    },300);
   
    GetDataFromWS("/inregistrari/"+row.children('td[class*="idInreg"]').text(),
       // '{"method":"ValidateInregistrare","urq":"asd","prq":"asdsd","trq":"json","id_inreg":"'+row.children('td[class*="idInreg"]').text()+'"}',
        '{}',
        "POST",
        function(obj){
            console.log(obj);
            }
     );
//    var idForma="submit"+idBtn;
//    var submitForm='<form id="'+idForma+'" action="http://192.168.11.151/WS/request.php" method="POST">'+
//                    '<input type="hidden" name="method" value="ValidateInregistrare">'+
//            '<input type="hidden" name="urq" value="platfFirma">'+
//            '<input type="hidden" name="prq" value="a">'+
//            '<input type="hidden" name="trq" value="json">'+
//                    '<input type="hidden" name="id_inreg" value="'+row.children('td[class*="idInreg"]').text()+'">'+
//                    '</form>';
//    $("body").append(submitForm);
//    
//    $("#"+idForma).submit().remove();
}

function GetDataFromWS(URI,params,submitMethod,callBackFunction)
{
    var numePagina;
    submitMethod=submitMethod||"POST";
    params=params||"[]";
     var ip_ws;
    if (_CIP==_SIP)
        ip_ws="localhost";
    else
        ip_ws=_SIP;
    numePagina="http://"+ip_ws+WSRootURI+URI;
    var Jparams=JSON.parse(params);
    var request = $.ajax({
      url: numePagina,
      type: submitMethod,
      
      data: Jparams//{id_pag : idPagina}
    });
 
    
    request.done(function(msg) {
        
        var aObj=msg;
        if (msg.error)
        {
            alert(mesg.error);
            return;
        }
      // console.log(msg);
//     var aObj=JSON.parse(msg);
        if (callBackFunction)
        {
           var callbacks = $.Callbacks();
           callbacks.add(callBackFunction);
           callbacks.fire(aObj);
        }
    });
    request.fail(function(jqXHR, textStatus) {
      alert( "Request failed: " + textStatus );
    });
}

function SeeMarker(idBtn)
{
    var row=$("#"+idBtn).parent("td").parent("tr");
    var id=row.children('td[class*="idInreg"]').text();
    window.location.assign("map.php?id_i="+id);
}