/*Am urmatoarele categorii ca sa le tin organizate:
 *  Actiuni cu baza de date
 *  Functionare 
 *  Data si timp
 *  Inca in teste
*/
var RunningFunction=[];
function StopRF()
{
    for(var i=0;i<RunningFunction.length;i++)
        {
            clearInterval(RunningFunction[i]);
            RunningFunction[i]=null;
        }
}
$(document).ready(function(){ 
    ActivateDateTimePicker();
    //!!!!!!!!!Pentru taburi sa se schimbe automat active link-urile trebuie sa aiba clasa "link-tab"
    ActivateLinkTab();
   // ActivateCheckBox();
    $(".my-tab-content-left").css({minHeight:($(".my-nav-left").innerHeight()+3)+"px"});
    $(".my-nav-left").css({marginRight:"0px",height:($(".my-tab-content-left").innerHeight()-3)+"px"});
    if (IsMobile())
        console.log("Mod mobile");
//        alert("Mod mobile");
    else
        console.log("Mod desktop");
//        alert("Mod desktop");
    console.log("document ready");
    //alert(IsMobile() );
    
    //alert(navigator.userAgent);
});

//--------------Actiuni cu baza de date----------------------
function TotalOreActivitati(){
    $("#total-ore-myw strong").text(function(){
            var totalH=0;
            var totalM=0;
            var arText=$('[id|=celula-ore-myw]').map(function(){
                return $(this).text();}).get();
            for (var i=0;i<arText.length;i++)
              { 
                  var arOra=arText[i].split(/:/);
                  totalH+=parseInt(arOra[0]);
                  totalM+=parseInt(arOra[1]);
              }
              if (totalH<10)
                  totalH='0'+totalH;
              if (totalM<10)
                  totalM='0'+totalM;
            return ''+totalH+':'+totalM;
        }); 
}
function TotalOreTabel(selectorElem,selectorCelule)
{
    var theResult="";
    $(""+selectorElem).text(function(){
            var totalH=0;
            var totalM=0;
            $(""+selectorCelule).each(function(){
                var arOra=$(this).text().split(/:/);
                  totalH+=parseInt(arOra[0]);
                  totalM+=parseInt(arOra[1]);
            });
//            var arText=$(""+selectorCelule).map(function(){
//                return $(this).text();}).get();
//            for (var i=0;i<arText.length;i++)
//              { 
//                  var arOra=arText[i].split(/:/);
//                  totalH+=parseInt(arOra[0]);
//                  totalM+=parseInt(arOra[1]);
//              }
                if (totalH >= 60)
                    {
                        totalH += Math.floor(totalM / 60); 
                        totalM = (totalM % 60);
                    }
              if (totalH<10)
                  totalH='0'+totalH;
              if (totalM<10)
                  totalM='0'+totalM;
              theResult=''+totalH+':'+totalM;
            return ''+totalH+':'+totalM;
        }); 
    return theResult;
}
function TotalValoriTabel(selectorElem,selectorCelule,precision,separatorLaMie)
{   var Suma=0;
    precision=precision||2;
    separatorLaMie=separatorLaMie||true;
    $(""+selectorElem).text(function(){
            $(""+selectorCelule).each(function(){
                var val=parseFloat($(this).text());
                Suma+=val;
            });
            if (separatorLaMie)
              return numberWithCommas(Suma.toFixed(precision)); 
            else
                return Suma.toFixed(precision);
        }); 
   if (separatorLaMie)
    return numberWithCommas(Suma.toFixed(precision)); 
   else
    return Suma.toFixed(precision);
}
/**
 * Creaza dinamic breadcrumb-ul din detalii financiare fiindca reincarc cu ajax paginile.
 * <br>
 * Initial am textul din variabila "textOverview". <br>
 *  Apoi la adaugare unui element breadcrumb-ul va fii de forma "Inapoi \ @TextElementNou".<br>
 *  Si adauga eveniment la "click":
 *       <li>pe elementul nou sa incarce pagina PHP, in functie de <strong>tip_fct</strong>.</li>
 *       <li>pe "Inapoi" sa incarce prima pagina (cu toate panelulrile) </li>
 * @param {String} textElem Elementul pe care il adaug (numele paginii)
 * @param {String} idElem Id-ul elementului adaugat
 * @param {Number} tip_fct parametru transmis mai departe la incarcarea paginii PHP din FBUtils.php
 *                  <br>
 *                  <pre>
 *                     1 - Facturi emise
 *                     2 - Facturi outstanding
 *                     3 - Incasari 
 *                  </pre>
 * @returns {undefined}
 */
function Breadcrumb_DetaliiFinanciare(textElem,idElem,tip_fct)
{
    textElem=textElem||"";
    tip_fct=tip_fct||0;
    var idBreadcrumb="breadcrumb-date-facturare";
    var idLinkOverview="link-breadOverview";
    var textOverview="Informatii generale";
    if (textElem!=="")
        {
            textOverview='Inapoi';
            $("#"+idBreadcrumb).text("");
            $("#"+idBreadcrumb).append(
                    '<li ><a href="#" id="'+idLinkOverview+'">'+textOverview+'</a>\n\
                        <span class="divider"> / </span>\n\
                      </li>\n\
                    <li class="active"><a href="#" id="'+idElem+'">'+textElem+'</a></li>');
        }
    else
        {
             $("#"+idBreadcrumb).text("");
          $("#"+idBreadcrumb).append('<li ><a href="#" id="'+idLinkOverview+'">'+textOverview+'</a> </li>');  
        }
        $("#"+idLinkOverview).on("click",function(){
            Breadcrumb_DetaliiFinanciare();
            IncarcaPaginaPHP("contentTabsFacturiIncasari","facturi-incasari.php",'{"TIP_FCT":0}');
       });
       if (idElem!=="")
        $("#"+idElem).on("click",function(){
             IncarcaPaginaPHP("contentTabsFacturiIncasari","facturi-incasari.php",'{"TIP_FCT":'+tip_fct+'}');
        });
       
}

function SetAvocatLogat(theElem,afterVisible,lockAvocatLogat)
{
    
    if (typeof(sessionStorage.UID)==="undefined")
        return false;
    if (typeof(lockAvocatLogat)==="undefined")
        lockAvocatLogat=true;
    if (typeof(afterVisible)==="undefined")
        afterVisible=true;
    if (afterVisible)
        RunAfterElementVisible(theElem,function(aObj){
            //console.log(aObj);
//            SetSelect2(aObj,{id:sessionStorage.UID,text:""+sessionStorage.ULogat});
              aObj.select2("data",{id:sessionStorage.UID,text:""+sessionStorage.ULogat,locked: lockAvocatLogat});
            });
    else
        RunAfterElementExits(theElem,function(aObj){
          //  SetSelect2(aObj,{id:sessionStorage.UID,text:""+sessionStorage.ULogat});
              aObj.select2("data",{id:sessionStorage.UID,text:""+sessionStorage.ULogat,locked:lockAvocatLogat});
            });
}
/**
 * 
 * Populeaza cu avocatii din baza in functie de drepturi sau toti.<br>
 * Pentru mai multi avocati se foloseste select2 cu atributul <b><em>multiple</em></b>, <br>
 * iar pentru selectarea unui singur avocat se foloseste select2 sau selectul default 
 * in functie de <em>UseSelect2()</em>.
 * 
 * @param {String} idElem                 id-ul selectului
 * @param {Bool} all                    daca pun direct toti avocatii (ex: la evenimente)
 * @param {Number} drept             <pre>0 : drept DOAR de vizualizare activitati<br>
                                        1 : drept DOAR de modificare activitati<br>
                                        2 : drept de vizualizare SI modificare activitati<br>
                                        3 : drept de vizualizare onorarii<br>
                                        4 : drept de vizualizare termene<br>
                                        5 : drept DOAR de vizualizare cheltuieli<br>
                                        6 : drept DOAR de modificare cheltuieli<br>
                                        7 : drept de vizualizare SI modificare cheltuieli<br>
                                        8 : drept vizualizare rapoarte activitati / cheltuieli
                                 </pre>    
 * @param {String} placeholder            default "Avocati"
 * @param {Bool} allowClear             daca se poate sa nu fie nici un avocat selectat(x-ulet de anulare selectie) 
 * @param {Bool} selectAvocatLogat      selecteaza avocatul logat luand datele din sesiunea de browser(javascript)
 * @param {Array Of Object} 
 *         objSelectAvocati             daca vreau ca dupa populare sa selectez anumiti avocati<br>
 *                                      ex: [{id:12,text:"dasdasd"},{id:14,text:"jjjjjasd"}]
 * 
 * @example <li><pre>PopuleazaComboAvocati( 
           "input-avocatiEveniment" , true , -1 , 
           "Avocati" , true , false ,
           [ {id:17,text:"Cristian Cocioaba"} , {id:11,text:"Vlad Marginean"} ]
               );
                   </pre>
             <br>
            </li>
            <li><pre>PopuleazaComboAvocati('input-avocatiTermen',false,2);   </pre>    </li>
 */
// TO DO -> de VERIFICAT daca tine bine cont de drepturi 
//              si daca e decat un avocat in lista sa-l selecteze si sa nu ma lase sa ii aleg pe toti(ca in rapoarte)
function PopuleazaComboAvocati(idElem,all,drept,placeholder,allowClear,selectAvocatLogat,objSelectAvocati)
{
    placeholder=placeholder||"Avocati";
    all=all||false;
    allowClear=allowClear||false;
    drept=drept||-1;
    if (typeof(objSelectAvocati)==="undefined")
        objSelectAvocati=null;
    if (typeof(selectAvocatLogat)==="undefined")
        selectAvocatLogat=true;
    var theParameters=GenerateJSONString(["method","DREPT","ALL","JSON"],
                                          ["PopuleazaListaAvocati",drept,all]);
     IncarcaPaginaPHP(idElem,'./functions/FBUtils.php',theParameters,"GET",true,function(){
        if (selectAvocatLogat) 
            {
                //momentan nu las sa adaug pt altcineva si astfel ru voi fi mereu in lista
                SetAvocatLogat(idElem,true,true);
            }
         if (!selectAvocatLogat && (objSelectAvocati!==null))
           {
              SetSelect2(idElem,objSelectAvocati);
           }
        }
    ); 
        if (!$('#'+idElem).attr("multiple"))
            {
                if (!UseSelect2())
                    {
                        return true;
                    }
            }
        $('#'+idElem).select2({
              placeholder:""+placeholder,
              allowClear:allowClear
             }); 
}


function PopuleazaComboStadiiProcesuale(idElem,placeholder,allowClear,objStadiuSelectat)
{
     idElem=idElem||"";
    placeholder=placeholder||"Stadii procesuale";
    allowClear=allowClear||false;
    if (typeof(objStadiuSelectat)==="undefined")
        objStadiuSelectat=null;
    var ID_StadiuSelectat=-1;
            if (objStadiuSelectat!==null)
                if (objStadiuSelectat.id)
                   ID_StadiuSelectat=parseInt(String(objStadiuSelectat.id));
    var paramsString=GenerateJSONString(["method","ID_STADIU"],
       ["PopuleazaListaStadii",ID_StadiuSelectat]);
    if (!UseSelect2())
        { 
         IncarcaPaginaPHP(idElem,'./functions/FBUtils.php',paramsString,"GET");   
        }
    else
        {
          IncarcaPaginaPHP(idElem,'./functions/FBUtils.php',
                        paramsString,
                        "GET");   
            $('#'+idElem).select2({  
              placeholder:placeholder,
              allowClear:allowClear
           }); 
           if (objStadiuSelectat!==null)
            SetSelect2(idElem,objStadiuSelectat);  
        }
}

function PopuleazaComboMoneda(idElem,defaultValue,placeholder,allowClear)
{
     idElem=idElem||"";
    placeholder=placeholder||"Moneda";
    allowClear=allowClear||false;
    defaultValue=defaultValue||"RON";
    if (!UseSelect2())
        {
         IncarcaPaginaPHP(idElem,'./functions/FBUtils.php',
                        '{"method":"PopuleazaListaMonede","def_mon":"'+defaultValue+'"}',
                        "GET");   
        }
    else
        {
          IncarcaPaginaPHP(idElem,'./functions/FBUtils.php',
                        '{"method":"PopuleazaListaMonede","def_mon":"'+defaultValue+'"}',
                        "GET");   
            $('#'+idElem).select2({  
              placeholder:placeholder,
              allowClear:allowClear
           });      
        }
}

function TriggerOnChange(elem)
{
     var theElem;
    if (typeof(elem)==='string')
        {  
          theElem=$("#"+elem);  
        }
    else
        theElem=elem;
    if ("createEvent" in document) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    console.log(theElem);
    theElem.dispatchEvent(evt);
}
else
    theElem.fireEvent("onchange");
}

//!!!!ATENTIE la select2 cand incarc cu ajax trebuie sa fie '<input type="hidden">' NU '<select></select>'

// e factut pt select2 sa incarce decat 50 de clienti o data apoi sa mai adauge cand face scroll
//!!! dar cand vor fi 10000 de clienti pt selectul default s-ar putea sa crape!!! 
// deci trebuie gasita o metoda pt telefon  TO DO !!!!!
function PopuleazaComboClient(idElem,placeholder,allowClear,objClientSelectat,callBackFunction)
{
    idElem=idElem||"";
    placeholder=placeholder||"Client";
    allowClear=allowClear||false;
    if (typeof(objClientSelectat)==="undefined")
        objClientSelectat=null;
    if (!UseSelect2())
        {
            var C_IDSelectat=-1;
            if (objClientSelectat!==null)
                if (objClientSelectat.id)
                   C_IDSelectat=parseInt(String(objClientSelectat.id));
         IncarcaPaginaPHP(idElem,'./functions/FBUtils.php',
         '{"method":"PopuleazaListaClienti","C_ID":'+C_IDSelectat+'}',"GET",true,function(){
             $("#"+idElem).change();
            if (callBackFunction)
                    {
                        var callbacks = $.Callbacks();
                        callbacks.add(callBackFunction);
                        callbacks.fire();
                    }
         });   
        }
    else
        {
            //elimin elementul si recreez un '<input type="hidden">' ca sa ma asigur ca merge cu ajax
              var parent=$("#"+idElem).parent();
            var elemClass=$("#"+idElem).attr("class");
            var elemName="";
            if ($("#"+idElem).attr("name"))
                {
                    elemName=$("#"+idElem).attr("name");
                }
         $("#"+idElem).remove();
         if (elemName!="")
             parent.append("<input type='hidden' class='"+elemClass+"' id='"+idElem+"' name='"+elemName+"'></input>");
         else   
            parent.append("<input type='hidden' class='"+elemClass+"' id='"+idElem+"'></input>");
       function format(item){
            return item.TEXT;
       }
       $("#"+idElem).select2({
              ajax:{
                  url:'./functions/FBUtils.php',
                     contentType: 'application/json;',
                  dataType: 'json',
                  quietMillis: 100,
                  data: function (term, page) {
                      return {
                          text_cautat: term,
                          method:'PopuleazaListaClienti',
                          returnJSON:true,
                          page: page,
                          page_limit: 50
                      };  
                  },
                  results: function (data, page) {
                    var more = (page * 50) <=data.total; 
                    //console.log("dt:"+data.total+" p:"+page);
                      return { results: data.data, more: more};
                  }
              },
              id: function(item){return item.ID;},
              allowClear:allowClear,
              placeholder:placeholder,
              formatResult: format,
             formatSelection: format,
             initSelection:format,
             escapeMarkup: function (m) { return m; },
              formatNoMatches:function(){
                          return "Nici un client gasit";
                  }
           }); 
           if (objClientSelectat!==null)
            SetSelect2(idElem,objClientSelectat);  
           if (callBackFunction)
                    {
                        var callbacks = $.Callbacks();
                        callbacks.add(callBackFunction);
                        callbacks.fire();
                    }
        }
      
}
//ii pun numele Emitent_Conturi fiindca in delphi e cam 
//in ceata ce vrea sa insemne acest combo
function PopuleazaComboEmitent_Conturi(idElem,idElemClient,placeholder,allowClear)
{
   placeholder=placeholder||"Conturi";
    allowClear=allowClear||false;
    function format(item){
        return item.TEXT;
    }
    function GetC_ID()
    {
     if (idElemClient!=="")
         {
            var id=GetComboSelectedValue(idElemClient);
            if (String(id)==='undefined'||String(id).trim()===''||id===-1)
                return -1;
            else
                return id;
         }
     else
        return "";
     }
     function GetC_DENUM()
    {
     if (idElemClient!=="")
         return GetComboSelectedText(idElemClient);
     else
        return "-1";
     } 
   if (!UseSelect2())
   {
       
        var paramsString=GenerateJSONString(["method","text_cautat","C_ID","C_DENUM","returnJSON"],
                                         ["PopuleazaListaEmitenti_Conturi"," ",GetC_ID(),GetC_DENUM(),"false"]);
                                         
      IncarcaPaginaPHP(idElem,'./functions/FBUtils.php',paramsString,"GET"); 
   }
   else
   {
       //ca sa mearga select2 trebuie inlocuit tagul "<select>" cu "<input type='hidden'>"
        var parent=$("#"+idElem).parent();
//        console.log(parent);
        var elemClass=$("#"+idElem).attr("class");
        var elemName="";
            if ($("#"+idElem).attr("name"))
                {
                    elemName=$("#"+idElem).attr("name");
                }
         $("#"+idElem).remove();
         if (elemName!="")
             parent.append("<input type='hidden' class='"+elemClass+"' id='"+idElem+"' name='"+elemName+"'></input>");
         else   
            parent.append("<input type='hidden' class='"+elemClass+"' id='"+idElem+"'></input>");
//         console.log(parent);
       $("#"+idElem).select2({
              ajax:{
                  url:'./functions/FBUtils.php',
                     contentType: 'application/json;',
                  dataType: 'json',
                  data: function (term, page) {
                      return {
                          text_cautat: term,
                          method:'PopuleazaListaEmitenti_Conturi',
                          C_ID:GetC_ID(),
                          C_DENUM:GetC_DENUM(),
                          returnJSON:true
                      };  
                  },
                  results: function (data, page) {
                      return { results: data};
                  }

              },
              id: function(item){return item.ID;},
              allowClear:allowClear,
              placeholder:placeholder,
              formatResult: format,
             formatSelection: format,
              formatNoMatches:function(){
                      if ((String(GetC_ID())==="")||(parseInt(GetC_ID())===-1)) 
                          return "Selectati un client";
                      else
                          return "Nici un cont gasit";
                  }
           }); 
    }
}
//se poate optimiza ca popularea clientilor... sa incarce decat 50-100 la inceput 
//si apoi sa mai incarce la scroll TO DO
function PopuleazaComboContract(idElem,idElemClient,placeholder,allowClear,objContractSelectat,callBackFunction)
{

    placeholder=placeholder||"Contract";
    allowClear=allowClear||false;
    if (typeof(objContractSelectat)==="undefined")
        objContractSelectat=null;
    function format(item){
        return item.TEXT;
    }
    //console.log(GetC_ID());
    function GetC_ID()
    {
     if (idElemClient!=="")
         {
            var id=GetComboSelectedValue(idElemClient);
            if (String(id)==='undefined'||String(id).trim()===''||id===-1)
                return -1;
            else
                return id;
         }
     else
        return "";
     }
   if (!UseSelect2())
   {
       console.log(GetC_ID());
       var CTR_IDSelectat=-1;
            if (objContractSelectat!==null)
                if (objContractSelectat.id)
                   CTR_IDSelectat=parseInt(String(objContractSelectat.id));
        var paramsString=GenerateJSONString(["method","text_cautat","C_ID","returnJSON","CTR_ID"],
                                         ["PopuleazaListaContracte","",GetC_ID(),"false",CTR_IDSelectat]);
                                         
      IncarcaPaginaPHP(idElem,'./functions/FBUtils.php',paramsString,"GET",true,function(){
             $("#"+idElem).change();
            if (callBackFunction)
                    {
                        var callbacks = $.Callbacks();
                        callbacks.add(callBackFunction);
                        callbacks.fire();
                    }
         });   
   }
   else
   {
       
       //ca sa mearga select2 trebuie inlocuit tagul "<select>" cu "<input type='hidden'>"
        var parent=$("#"+idElem).parent();
        var elemClass=$("#"+idElem).attr("class");
       var elemName="";
            if ($("#"+idElem).attr("name"))
                {
                    elemName=$("#"+idElem).attr("name");
                }
         $("#"+idElem).remove();
         if (elemName!="")
             parent.append("<input type='hidden' class='"+elemClass+"' id='"+idElem+"' name='"+elemName+"'></input>");
         else   
            parent.append("<input type='hidden' class='"+elemClass+"' id='"+idElem+"'></input>");
       $("#"+idElem).select2({
              ajax:{
                  url:'./functions/FBUtils.php',
                     contentType: 'application/json;',
                  dataType: 'json',
                  data: function (term, page) {
                      return {
                          text_cautat: term,
                          method:'PopuleazaListaContracte',
                          C_ID:GetC_ID(),
                          returnJSON:true
                      };  
                  },
                  results: function (data, page) {
                      return { results: data};
                  }

              },
              id: function(item){return item.ID;},
              allowClear:allowClear,
              placeholder:placeholder,
              formatResult: format,
             formatSelection: format,
             initSelection:format,
              formatNoMatches:function(){
                      if (String(GetC_ID()).trim()===""||parseInt(GetC_ID())===-1) 
                          return "Selectati un client";
                      else
                          return "Nici un contract gasit";
                  }
           }); 
      if (objContractSelectat!==null)
            SetSelect2(idElem,objContractSelectat);  
      if (callBackFunction)
                    {
                        var callbacks = $.Callbacks();
                        callbacks.add(callBackFunction);
                        callbacks.fire();
                    }
   }
     
}
function PopuleazaComboTipActivitate(idElem,idElemContract,placeholder,allowClear,objTipActvSelectat)
{
placeholder=placeholder||"Tip activitate";
    allowClear=allowClear||false;
    if (typeof(objTipActvSelectat)==="undefined")
        objTipActvSelectat=null;
    function format(item){
        return item.TEXT;
    }
    function GetCTR_ID()
    {
     if (idElemContract!=="")
         return GetComboSelectedValue(idElemContract);
     else
        return "";
     }
    // console.log(GetCTR_ID());
     if (!UseSelect2())
   {
       var TIP_MYWSelectat=-1;
            if (objTipActvSelectat!==null)
                if (objTipActvSelectat.id)
                   objTipActvSelectat=parseInt(String(objTipActvSelectat.id));
        var paramsString=GenerateJSONString(["method","text_cautat","CTR_ID","returnJSON","TIP_MYW"],
                                         ["PopuleazaTipActivitate","",GetCTR_ID(),"false",TIP_MYWSelectat]);                               
      IncarcaPaginaPHP(idElem,'./functions/FBUtils.php',paramsString,"GET"); 
   }
   else
   {
       //ca sa mearga select2 trebuie inlocuit tagul "<select>" cu "<input type='hidden'>"
        var parent=$("#"+idElem).parent();
        var elemClass=$("#"+idElem).attr("class");
        var elemName="";
            if ($("#"+idElem).attr("name"))
                {
                    elemName=$("#"+idElem).attr("name");
                }
         $("#"+idElem).remove();
         if (elemName!="")
             parent.append("<input type='hidden' class='"+elemClass+"' id='"+idElem+"' name='"+elemName+"'></input>");
         else   
            parent.append("<input type='hidden' class='"+elemClass+"' id='"+idElem+"'></input>");
       $("#"+idElem).select2({
              ajax:{
                  url:'./functions/FBUtils.php',
                     contentType: 'application/json;',
                  dataType: 'json',
                  data: function (term, page) {
                      return {
                          text_cautat: term,
                          method:'PopuleazaTipActivitate',
                          CTR_ID:GetCTR_ID(),
                          returnJSON:true
                      };  
                  },
                  results: function (data, page) {
                      return { results: data};
                  }

              },
              id: function(item){return item.ID;},
              allowClear:allowClear,
              placeholder:placeholder,
              formatResult: format,
             formatSelection: format,
              formatNoMatches:function(){
                      if (String(GetCTR_ID()).trim()===""||GetCTR_ID()===-1) 
                          return "Selectati un contract";
                      else
                          return "Nici un element gasit";
                  }
           }); 
      if (objTipActvSelectat!==null)
            SetSelect2(idElem,objTipActvSelectat);  
    }
}
function PopuleazaComboCheltStandard(idElem,idElemContract,placeholder,allowClear)
{
    placeholder=placeholder||"Cheltuieli standard";
    allowClear=allowClear||false;
    function format(item){
        return item.TEXT;
    }
    function GetCTR_ID()
    {
     if (idElemContract!=="")
         return $("#"+idElemContract).val();
     else
        return "";
     }
    // console.log(GetCTR_ID());
     if (!UseSelect2())
   {
        var paramsString=GenerateJSONString(["method","text_cautat","CTR_ID","returnJSON"],
                                         ["PopuleazaCheltuieliStandard","",GetCTR_ID(),"false"]);
                                         
      IncarcaPaginaPHP(idElem,'./functions/FBUtils.php',paramsString,"GET"); 
   }
   else
   {
       //ca sa mearga select2 trebuie inlocuit tagul "<select>" cu "<input type='hidden'>"
        var parent=$("#"+idElem).parent();
        var elemClass=$("#"+idElem).attr("class");
       var elemName="";
            if ($("#"+idElem).attr("name"))
                {
                    elemName=$("#"+idElem).attr("name");
                }
         $("#"+idElem).remove();
         if (elemName!="")
             parent.append("<input type='hidden' class='"+elemClass+"' id='"+idElem+"' name='"+elemName+"'></input>");
         else   
            parent.append("<input type='hidden' class='"+elemClass+"' id='"+idElem+"'></input>");
       $("#"+idElem).select2({
              ajax:{
                  url:'./functions/FBUtils.php',
                     contentType: 'application/json;',
                  dataType: 'json',
                  data: function (term, page) {
                      return {
                          text_cautat: term,
                          method:'PopuleazaCheltuieliStandard',
                          CTR_ID:GetCTR_ID(),
                          returnJSON:true
                      };  
                  },
                  results: function (data, page) {
                      return { results: data};
                  }

              },
              id: function(item){return item.ID;},
              allowClear:allowClear,
              placeholder:placeholder,
              formatResult: format,
             formatSelection: format,
              formatNoMatches:function(){
                      if (GetCTR_ID()==""||GetCTR_ID()==-1) 
                          return "Selectati un contract";
                      else
                          return "Nici un element gasit";
                  }
           }); 
    }
}
/**
 * Folosesc aceasta functie ca sa incarc doar alarmele fiindca trebuie sa transmit 
 * parametrii pentru filtre, ordonare, paginatie si sa se pastreze dupa reincarcarea paginii...
 * @param {String} idContainer
 * @param {String} id_pag
 * @example IncarcaAlarme('contentAlarme',1);
 */
function IncarcaAlarme(idContainer,id_pag)
{
   
    var filterStr='';
    var orderStr='ORDER BY ORDER_ID,STARTDATE,STARTTIME';
    var filtruTip='all';
    var activeOrderLink=null;
    var orderType='';
    // se poate sa incarce inainte de a crea tabelul (la prima incarcare)
    //  si atunci nu mai verific filtrele
    if ($("#tabel-alarme").length!==0)
        {
            filtruTip=$("#link-filtru-tip").attr("filter-type");
            if (filtruTip==='only-term')
                filterStr+=' WHERE TIP_SCHEDULE=0 ';
            if (filtruTip==='only-evenim')
                filterStr+=' WHERE TIP_SCHEDULE<>0 ';
             activeOrderLink=$(".table-order-link[class*='active']");
            orderType=activeOrderLink.attr("order-type")||'';
            if (activeOrderLink.attr('id')==='link-ord-data')
                {
                  orderStr=' ORDER BY STARTDATE '+orderType+', STARTTIME '+orderType;  
                }
            if (activeOrderLink.attr('id')==='link-ord-loc')
                {
                  orderStr=' ORDER BY LOCATIA '+orderType;  
                }
            if (activeOrderLink.attr('id')==='link-ord-cl')
                {
                  orderStr=' ORDER BY CLIENT '+orderType+',STARTDATE '+orderType+' ,STARTTIME '+orderType;  
                }
            if (activeOrderLink.attr('id')==='link-ord-ctr')
                {
                  orderStr=' ORDER BY CONTRACT '+orderType;  
                }
        }
    var perioada=-1;
    perioada=$(".link-filtru-alarme").parent("li[class*='active']").children('a').attr("id-perioada-alarme");
    //console.log(perioada);
    var paramString=GenerateJSONString(
            ['id_pag','filter_str','order_str','perioada'],
            [id_pag,filterStr,orderStr,perioada]);
    //console.log('f:'+filterStr+' '+orderStr );
    IncarcaPaginaPHP(idContainer,'alarme.php',paramString,'POST',true,
    function(){
        
                ChangeFiltruTipAgenda('link-filtru-tip',filtruTip);
         if (activeOrderLink!==null)
                 SetOrderLink(activeOrderLink.attr('id'),orderType); 
    });  
}

// !!!!!----------------------- CEA MAI FOLOSITA FUNCTIE------------------!!!!!!!!!!!!
/**
 * <strong>Foarte Utila</strong><br>
 * Folosita la incarcarea unui PHP intr-un container (de obicei un div, dar nu conteaza care e...)
 * 
 * @param {String} idContainer      id-ul Containerului, parintele in care incarc pagina 
                                    !ATENTIE! suprascrie tot ce e in el <br>
                                    <b>Daca nu e dat id-ul suprasrie tot documentul.</b>
 * @param {String} numePagina       numele paginii pe care o incarc ex:"termene.php"
 * @param {String} params           parametrii care o sa fie transmisi prin GET sau POST
                      de forma :
                     <pre>   '{}' -> "nimic" = {} </pre>
                      <pre>  'true' pt bool = true </pre>
                      <pre>  '"foo"' pt string = "foo" </pre>
                      <pre>  '[1, 5, "false"]'  = [1, 5, "false"] </pre>
                      <pre>  '{"nume_param":"val_param",...}' cel mai util pt mai multi parametrii</pre>
                      <pre>  'null'  pt null </pre>
 * @param {String} submitMethod GET/POST
 * @param {bool} autoAfter true/false -> daca seteaza dupa incarcare inaltimea "auto" (cam in plus momentan)
 * @param {function} callBackFunction <strong>UTIL!</strong> pentru a executa cv dupa ce s-a incarcat pagina complet
 * 
 */ 
function IncarcaPaginaPHP(idContainer,numePagina,params,submitMethod,autoAfter,callBackFunction)
{

    if (typeof(idContainer)!=="undefined" && idContainer!==null)
    ShowLoader(idContainer);
    autoAfter=autoAfter||true;
    submitMethod=submitMethod||"POST";
    var Jparams=JSON.parse(params);
    //console.log(Jparams);
    var request = $.ajax({
      url: numePagina,
      type: submitMethod,
      
      data: Jparams//{id_pag : idPagina}
    });
 //cand s-a incarcat pagina...
    request.done(function(msg) {
    if (typeof(idContainer)!=="undefined" && idContainer!==null)
      $("#"+idContainer).html( msg );
  else
      document.write(msg);
//      console.log(msg);
      //daca s-a delogat din alt tab o sa primesc pagina de LogIn(index.php)
      // asa ca trebuie sa fac redirect catre LogIn(index.php) ca sa nu il pun doar in containerul cerut de functie 
      if (ElementExits("MainLogInForm"))
        window.location.assign("index.php");
      if (autoAfter)
        if (typeof(idContainer)!=="undefined" && idContainer!==null)  
            $('#'+idContainer).css('height','auto'); 
    if (callBackFunction)
        {
            var callbacks = $.Callbacks();
            callbacks.add(callBackFunction);
            callbacks.fire();
        }
    });
//daca e vreo eroare...
    request.fail(function(jqXHR, textStatus) {
      alert( "Request failed: " + textStatus );
    });
}

function GetDataFromRequest(url,params,submitMethod,callBackFunction)
{
    submitMethod=submitMethod||"POST";
    var Jparams=JSON.parse(params);
    var theObj=null;
    //console.log(Jparams);
    var request = $.ajax({
      url: url,
      type: submitMethod,
      
      data: Jparams//{id_pag : idPagina}
    });
 //cand s-a incarcat pagina...
    request.done(function(msg) {
          theObj=JSON.parse(msg);
//     console.log(theObj);
    if (callBackFunction)
        {
            var callbacks = $.Callbacks();
            callbacks.add(callBackFunction);
            callbacks.fire(theObj);
        }
    });
//daca e vreo eroare...
    request.fail(function(jqXHR, textStatus) {
      alert( "Request failed: " + textStatus );
    });
    
}

function VerificaCheltuialaNoua()
{
  var mesajEroare='';
    if ($("#input-dataCheltuieli").val()==='')
        {
            mesajEroare='Alegeti data cheltuielii!';
            return mesajEroare;
        }
   if (String(GetComboSelectedValue("input-clientCheltuieli"))===''||
       GetComboSelectedValue("input-clientCheltuieli")===undefined)
        {
            mesajEroare='Alegeti clientul cheltuielii!';
            return mesajEroare;
        }
   if (String(GetComboSelectedValue("input-contractCheltuieli"))===''||
       GetComboSelectedValue("input-contractCheltuieli")===undefined)
        {
            mesajEroare='Alegeti contractul cheltuielii!';
            return mesajEroare;
        }
   if (String(GetComboSelectedValue("input-tipCheltuieli"))===''||
       GetComboSelectedValue("input-tipCheltuieli")===undefined)
     {
            mesajEroare='Alegeti tipul de cheltuiala standard!';
            return mesajEroare;
     }
     if (parseInt($("#input-TotalValoareCheltuieli").val())===0)
       {
            mesajEroare='Introduceti valoarea cheltuielii!';
            return mesajEroare;
     }   
     if (String(GetComboSelectedValue("input-contCheltuieli"))===''||
       GetComboSelectedValue("input-contCheltuieli")===undefined)
     {
            mesajEroare='Alegeti contul cheltuielii!';
            return mesajEroare;
     }
    return mesajEroare;  
}
function VerificaActivitateNoua()
{
    var mesajEroare='';
     if ($("#input-avocatiActivitate").select2("data").length===0)
      {
           mesajEroare='Alegeti cel putin un avocat pentru activitate!';
            return mesajEroare;
      }
    if ($("#input-dataActivitate").val()==='')
        {
            mesajEroare='Alegeti data activitatii!';
            return mesajEroare;
        }
    if ($("#input-oreActivitate").val()==='')
        {
            mesajEroare='Alegeti durata activitatii!';
            return mesajEroare;
        }
   if (String(GetComboSelectedValue("input-clientActivitate",""))===""||
       GetComboSelectedValue("input-clientActivitate")===undefined)
        {
            mesajEroare='Alegeti clientul activitatii!';
            return mesajEroare;
        }
   if (String(GetComboSelectedValue("input-contractActivitate",""))===''||
       GetComboSelectedValue("input-contractActivitate")===undefined)
        {
            mesajEroare='Alegeti contractul activitatii!';
            return mesajEroare;
        }
   if ($("#input-descriereActivitate").val().length>4950)
       {
          mesajEroare='Descrierea activitatii contine prea multe caractere!';
            return mesajEroare; 
       }
   if ($("#input-observatiiActivitate").val().length>1024)
       {
          mesajEroare='Observatiile activitatii contin prea multe caractere!';
            return mesajEroare; 
       }
//   if (String(GetComboSelectedValue("input-tipActivitate"))===''||
//       GetComboSelectedValue("input-tipActivitate")===undefined)
//        {
//            mesajEroare='Alegeti tipul activitatii!';
//            return mesajEroare;
//        }
    return mesajEroare;
        
}
function VerificaEvenimentNou()
{
  var mesajEroare=''; 
  if ($("#input-avocatiEveniment").select2("data").length===0)
      {
           mesajEroare='Alegeti cel putin un avocat pentru eveniment!';
            return mesajEroare;
      }
  if ($("#input-dataEveniment").val()==='')
        {
            mesajEroare='Alegeti data evenimentului!';
            return mesajEroare;
        }
   if ($("#input-oraEveniment").val()==='')
        {
            mesajEroare='Alegeti ora evenimentului!';
            return mesajEroare;
        }
   if ( String($("#input-descriereEveniment").val()).trim()==='')
        {
            mesajEroare='Introduceti o descriere pentru eveniment!';
            return mesajEroare;
        }
    if ($("#input-descriereEveniment").val().length>4950)
       {
          mesajEroare='Descrierea evenimentului contine prea multe caractere!';
            return mesajEroare; 
       }
  return mesajEroare;
}
function VerificaTermenNou()
{
    var mesajEroare='';
    if ($("#input-avocatiTermen").select2("data").length===0)
      {
           mesajEroare='Alegeti cel putin un avocat pentru termen!';
            return mesajEroare;
      }
    if ($("#input-dataTermen").val()==='')
        {
            mesajEroare='Alegeti data termenului!';
            return mesajEroare;
        }
    if ($("#input-oraTermen").val()==='')
        {
            mesajEroare='Alegeti ora termenului!';
            return mesajEroare;
        }
     if (String(GetComboSelectedValue("input-clientTermen",""))===''||
       GetComboSelectedValue("input-clientTermen")===undefined)
        {
            mesajEroare='Alegeti clientul termenului!';
            return mesajEroare;
        }
   if (String(GetComboSelectedValue("input-contractTermen",""))===''||
       GetComboSelectedValue("input-contractTermen")===undefined)
        {
            mesajEroare='Alegeti contractul termenului!';
            return mesajEroare;
        }
   if ($("#input-durataTermen").val()==='')
        {
            mesajEroare='Alegeti durata termenului!';
            return mesajEroare;
        }
   if (String(GetComboSelectedValue("input-stadiuTermen",""))===''||
       GetComboSelectedValue("input-stadiuTermen")===undefined)
        {
            mesajEroare='Alegeti un Stadiu Procesual pentru termen!';
            return mesajEroare;
        }    
   if ($("#input-instantaTermen").select2("data")===null ||$("#input-instantaTermen").select2("data").TEXT==='')
        {
            mesajEroare='Alegeti o instanta pentru termen!';
            return mesajEroare;
        }
   if ($("#input-descriereTermen").val().length>4950)
       {
          mesajEroare='Descrierea termenului contine prea multe caractere!';
            return mesajEroare; 
       }
    return mesajEroare;
        
}
 function SalveazaActivitate()
 {
     var PostString="null";
     var mesajEroare=VerificaActivitateNoua();
     
     var poateSalva=(mesajEroare==="")||(mesajEroare===undefined);
     //alert(poateSalva);
    if (poateSalva)
    {
     PostString=GenerateJSONString(
        ["NEW_MYWORK","AMA_IDS","DATA","ORE","C_ID","CTR_ID","TIP_MYW","DESCRIERE","OBSERVATII"],
        ["true",GetMultipleSelected('input-avocatiActivitate'),$("#input-dataActivitate").val(),
            $("#input-oreActivitate").val(),
            GetComboSelectedValue("input-clientActivitate"),GetComboSelectedValue("input-contractActivitate"),
            GetComboSelectedValue("input-tipActivitate"),
        $("#input-descriereActivitate").val(),$("#input-observatiiActivitate").val()]);
    IncarcaPaginaPHP('contentListaActivitati','lista-activitati.php',PostString);
    }
    else
        {
//         PostString=GenerateJSONString(["MESAJ_ATENTIE"],[mesajEroare]);     
         ArataMesajAlerta("Atentie!<br> ",
            mesajEroare,
            "",
            "",
            false,
            4000);
        }
    
    return poateSalva;
 }
  function SalveazaCheltuiala()
 {
     var PostString="null";
     var mesajEroare=VerificaCheltuialaNoua();
     
     var poateSalva=(mesajEroare==="")||(mesajEroare===undefined);
     //alert(poateSalva);
    if (poateSalva)
    {
     PostString=GenerateJSONString(
        ["CHELT_NOUA","DATA_CHELT","C_ID","CTR_ID","CHELT_STD","VAL_CHELT",
            "VAL_CUTVA","COTA_TVA","MONEDA","CONT_CHELT",
            "FURNIZOR","DOCUMENT","EXPLICATII"],
        ["true",$("#input-dataCheltuieli").val(),
            GetComboSelectedValue("input-clientCheltuieli"),
            GetComboSelectedValue("input-contractCheltuieli"),
            GetComboSelectedValue("input-tipCheltuieli"),
            $("#input-ValoareCheltuieli").val(),
            $("#input-CotaTVACheltuieli").val(),
            $("#input-TotalValoareCheltuieli").val(),
            GetComboSelectedValue("input-monedaValoareCheltuieli"),
            GetComboSelectedValue("input-contCheltuieli"),
        $("#input-furnizorCheltuieli").val(),
        $("#input-documentCheltuieli").val(),
        $("#input-explicatiiCheltuieli").val()]);
        IncarcaPaginaPHP('contentListaCheltuieli','lista-cheltuieli.php',PostString);
    }
    else
        {
//         PostString=GenerateJSONString(["MESAJ_ATENTIE"],[mesajEroare]);     
              ArataMesajAlerta("Atentie!<br> ",
            mesajEroare,
            "",
            "",
            false,
            4000);
        }
    
    return poateSalva;
 }
function SalveazaTermen()
 {
     /*TIP_SCHED - 0 -> termen
      *             - mai mare ca 0 -> eveniment
      */
     var PostString="null";
     var mesajEroare=VerificaTermenNou();
    
     var poateSalva=(mesajEroare==="")||(typeof(mesajEroare)==="undefined");
       var tipOperatie='NEW_SCHEDULE';
     if (String($("#mod-salvareTermen").val())==='1')
         tipOperatie="UPDATE_SCHEDULE";
     function AdaugaSiTermenUrmator()
     {
        if ($("#input-adaugaTermenUrmator").is(":checked"))
            return 1;
        else
            return 0;
     }
     function DataTermenUrmator()
     {
         if (AdaugaSiTermenUrmator()===1)
             return $("#input-dataTermenUrmator").val();
         else
             return "";
     }
     function OraTermenUrmator()
     {
         if (AdaugaSiTermenUrmator()===1)
             return $("#input-oraTermenUrmator").val();
         else
             return "";
     }
    if (poateSalva)
    {
//     if (AdaugaSiTermenUrmator())
//       {
    //NUMELE PARAMATRILOR TRANSMISI TREBUIE SA FIE LA FEL CA PROPRIETATILE CLASEI TERMENE
    //altfel din "alarme.php" nu se poate folosi funtia TERMEN->SetEvenimentFromSubmit();
           PostString=GenerateJSONString(
           ["id_pag",tipOperatie,"S_ID","AMA_IDS","DATA_SCHEDULE","ORA_SCHEDULE",
               "C_ID","CTR_ID","ID_STADIU_PROCESUAL","INSTANTA","DURATA_SCHEDULE","DESCRIERE"
               ,"TIP_SCHEDULE",
               "TERMEN_URMATOR",
               "DATA_TERMEN_URMATOR",
               "ORA_TERMEN_URMATOR"
           ],
           ["1","true",$("#id-schedTermen").val(),
               GetMultipleSelected('input-avocatiTermen'),
               $("#input-dataTermen").val(),$("#input-oraTermen").val(),
               GetComboSelectedValue("input-clientTermen"),GetComboSelectedValue("input-contractTermen"),
               GetComboSelectedValue("input-stadiuTermen"),
               GetComboSelectedText("input-instantaTermen","",false),
               $("#input-durataTermen").val(),
               $("#input-descriereTermen").val(),
               0, /* tipul -    0 :termen
        *               - <> 0 :eveniment*/
               /*Adauga si termenul urmator daca e cazul*/
               AdaugaSiTermenUrmator(),
               DataTermenUrmator(),
               OraTermenUrmator()
           ]);
//       }
//    console.log(PostString);
//    return false;
        IncarcaPaginaPHP('contentAlarme','alarme.php',PostString);
    }
    else
        {
//         PostString=GenerateJSONString(["MESAJ_ATENTIE","id_pag"],[mesajEroare,1]);     
            ArataMesajAlerta("Atentie!<br> ",
            mesajEroare,
            "",
            "",
            false,
            4000);
        }
    
    return poateSalva;
 }
function SalveazaEveniment()
 {
     /*TIP_SCHED - 0 -> termen
      *             - mai mare ca 0 -> eveniment
      */
     var PostString="null";
     var mesajEroare=VerificaEvenimentNou();
     
     var poateSalva=(mesajEroare==="")||(mesajEroare===undefined);
     var tipOperatie='NEW_SCHEDULE';
     if (String($("#mod-salvareEveniment").val())==='1')
         tipOperatie="UPDATE_SCHEDULE";
    if (poateSalva)
    {
     PostString=GenerateJSONString(
        ["id_pag",tipOperatie,"S_ID","AMA_IDS","DATA_SCHEDULE","ORA_SCHEDULE","DESCRIERE","TIP_SCHEDULE"],
        ["1","true",$("#id-schedEveniment").val(),
            GetMultipleSelected('input-avocatiEveniment'),
            $("#input-dataEveniment").val(),
            $("#input-oraEveniment").val(),
            $("#input-descriereEveniment").val(),
        /*e eveniment TIP_SCHEDULE*/
            "1"
       ]);
    IncarcaPaginaPHP('contentAlarme','alarme.php',PostString);
    }
    else
        {
        // PostString=GenerateJSONString(["MESAJ_ATENTIE","id_pag"],[mesajEroare,1]);     
        ArataMesajAlerta("Atentie!<br> ",
            mesajEroare,
            "",
            "",
            false,
            4000);
        }
    
    return poateSalva;
 }
 function SubmitDataRaport()
 {
   $("#frmRapoarte").append('<input type="hidden" name="AVOCAT" value="'+
                GetComboSelectedText("input-avocatiRaport")+'">').
           append('<input type="hidden" name="CLIENT" value="'+
                GetComboSelectedText("input-clientRaport")+'">').
           append('<input type="hidden" name="CONTRACT" value="'+
                GetComboSelectedText("input-contractRaport")+'">');
//   $("#frmRapoarte").submit();
    var submitStr=GenerateJSONString(
         ["id_rap","AMA_ID_FOR","AVOCAT","DATA_DELA","DATA_LA","C_ID","CLIENT","CTR_ID","CONTRACT"],
         [$("#input-id_rap").val(),GetComboSelectedValue("input-avocatiRaport"),
             GetComboSelectedText("input-avocatiRaport"),
             $("#input-dataDeLaRaport").val(),$("#input-dataLaRaport").val(),
          GetComboSelectedValue("input-clientRaport"),GetComboSelectedText("input-clientRaport"),
          GetComboSelectedValue("input-contractRaport"),GetComboSelectedText("input-contractRaport")]);
    IncarcaPaginaPHP("container-rapoarte","generare-rapoarte.php",submitStr);
 }
 function RedirectDataRaport()
 {
     var submitStr=GenerateJSONString(
         ["id_rap","AMA_ID_FOR","AVOCAT","DATA_DELA","DATA_LA","C_ID","CLIENT","CTR_ID","CONTRACT"],
         [$('input[name="id_rap"]').val(),
             $('input[name="AMA_ID_FOR"]').val(),$('input[name="AVOCAT"]').val(),
            $('input[name="DATA_DELA"]').val(),$('input[name="DATA_LA"]').val(),
          $('input[name="C_ID"]').val(),$('input[name="CLIENT"]').val(),
          $('input[name="CTR_ID"]').val(),$('input[name="CONTRACT"]').val()]);
      console.log(submitStr);
    IncarcaPaginaPHP("container-rapoarte","filtre-rapoarte.php",submitStr,"POST",true,
        function(){
//            $(".boot-date-picker,.boot-time-picker").each(function(){
//                var totalWidth;
//                if ($(".select2-container").length!==0)
//                     totalWidth=$(".select2-container").innerWidth();
//                 else
//                     totalWidth=$("#input-clientRaport").innerWidth();
//                 $(this).children("input").css({
//                         width:(totalWidth-$(this).children('span[class*="add-on"]').innerWidth()-10)+"px"
//                     });
//              }); 
        });
 }

 
 /**
  * <strong>Utila pentru a lua date de pe server prin Ajax</strong>
  * <ol>
  *     <li>Incarca pagina intr-un div dinamic</li>
  *     <li>Ia textul din div (cel <strong> returnat de pagina sub forma de JSON!</strong>)</li>
  *     <li>Distruge div-ul</li>
  *     <li>Parseaza stringul de JSON intr-un obiect</li>
  *     <li>Apeleaza functia din "callBack" cu parametul obiectul parsat</li>
  * </ol>
  * 
  * @param {String} page
  * @param {String} params
  * @param {String} method GET / POST
  * @param {function} callBack <strong>IMPORTANT</strong> 
  *                            Functia "callBack" trebuie sa fie de forma "function(theOBJ){...}"
  * @example <pre>GetObjectFromPHP('functions/FBUtils.php',
                '{"method":"GetData...","id":...}',
                "GET",
                function(obj){...});
             </pre>
  * <br><br><em>Nu returneaza obiectul fiindca se pierde sau nu se apeleaza bine functia care il foloseste.
  *     Prin multe incercari asta pare cea mai buna solutie.</em>
  */
 function GetObjectFromPHP(page,params,method,callBack)
 {
    
     var theObject={};
     var id_div=AvailableID("edit-schedule-dinam");
     $("body").append("<div class='hiden-elem' id='"+id_div+"'></div>");
     var theDiv=$("#"+id_div);
     IncarcaPaginaPHP(id_div,page,
            params,method,true,
        function(){
            var theRezult=$("#"+id_div).text()+'';
            console.log(theRezult);
            theDiv.remove();
            theObject=JSON.parse(theRezult);
//            console.log(theRezult);
          var callBacks=$.Callbacks();
          callBacks.add(callBack);
          callBacks.fire(theObject);
        });
 }
 //
 /**
  * Ia datele termenului din baza si apeleaza 
  * functia <strong>callBack</strong> cu obiectul returnat ca parametru.
  * @param {String} S_ID
  * @param {function} callBack functia trebuie sa aiba parametru de intrare un obiect
  * 
  * @example GetDataFromSchedule('s_id',function(theObj){...});
  * 
  */
 function GetDataFromSchedule(S_ID,callBack)
 {
//    console.log(S_ID);
    var theObject={};
    var id_div=AvailableID("edit-schedule-dinam");
     $("body").append("<div class='hiden-elem' id='"+id_div+"'></div>");
     var theDiv=$("#"+id_div);
     var theParams=GenerateJSONString(["method","S_ID"],
                                        ["GetSchedule",S_ID]);
     IncarcaPaginaPHP(id_div,"functions/FBUtils.php",
            theParams,"GET",true,
        function(){
            var theRezult=$("#"+id_div).text()+'';
            theDiv.remove();
            theObject=JSON.parse(theRezult);
            //pt a vedea ce obiect e returnat... DECOMENTEAZA ASTA!
//            console.log(theRezult);
          var callBacks=$.Callbacks();
          callBacks.add(callBack);
          callBacks.fire(theObject);
        });
        
 }
 
 /**
  *<strong>Utila!</strong><br>
  *  Folosita pentru a genera stringul care sa fie transmis prin ajax in functia IncarcaPaginaPHP
  * @param {String []} arNumeParam vector cu numele parametrilor ex:["id_pag","NEW_SCHEDULE","NUME"]
  * @param {String []} arValParam vector cu valorile parametrilor ex:[1,true,"Vasile"]
  * @returns {String} De forma unui Obiect JSON <br><strong>'{"numeParam":"valoareParam"}'</strong>
  */
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
 //varianta initiala a functiei GenerateJSONString()
  /**
  * <em>Varianta initiala a functiei GenerateJSONString(), 
  * care e mult <strong>mai sigura dacat aceasta</strong>.</em>
  * <br><br>
  *  Folosita pentru a genera stringul care sa fie transmis prin ajax in functia IncarcaPaginaPHP
  * @param {String []} arNumeParam vector cu numele parametrilor ex:["id_pag","NEW_SCHEDULE","NUME"]
  * @param {String []} arValParam vector cu valorile parametrilor ex:[1,true,"Vasile"]
  * @returns {String} De forma unui Obiect JSON <br><strong>'{"numeParam":"valoareParam"}'</strong>
  */
 function GeneratePostString(arNumeParam,arValParam)
{
    var theString='{';
    if (String(arValParam[0]).indexOf("'")!==-1)
        {
            theString+="'"+arNumeParam[0]+"':'"+arValParam[0]+"' ";
        }
    else
            theString+='"'+arNumeParam[0]+'":"'+arValParam[0]+'" ';
     
    for (var i=1; i < arNumeParam.length;i++)
        {
             if (String(arValParam[i]).indexOf("'")!==-1)
                theString+=",\n'"+arNumeParam[i]+"':'"+arValParam[i]+"' ";
            else
                theString+=',\n"'+arNumeParam[i]+'":"'+arValParam[i]+'" ';
            
//            theString+=',\n"'+arNumeParam[i]+'":"'+arValParam[i]+'" ';
        }
        theString+='}';
//        alert(theString);
     return theString;   
}
function FiltreDiferite_PnlsDateFinanciare()
{
    if ($("#filtru-aplicat-fact-emise").val()===$("#filtru-aplicat-fact-outs").val() && 
            $("#filtru-aplicat-fact-emise").val()===$("#filtru-aplicat-incasari").val())
        return false;
    else
        return true;
}
function ActivateFilter_PnlsDateFinanciare()
{
    
    $(".filtre-perioada-fct").children("li").children('a').each(function(){
      $(this).on("click",function(){
            var nume_filtru=$(this).text();
            var tip_fct=$(this).attr("tip-fct")||1;
            var f_perioada=$(this).attr("id-perioada")||1;
            var theParams=GenerateJSONString(["method","TIP_TOTAL","F_PERIOADA","returnJSON"],
                       ["TotalIncasariFacturi",tip_fct,f_perioada,true]);
            
            GetObjectFromPHP('functions/FBUtils.php',
                theParams,
                "GET",
                function(obj){
                    
                    console.log(obj);
                    WriteData_PnlsDateFinanciare(obj);
                     if (FiltreDiferite_PnlsDateFinanciare()===true)
                         {
                            $("#link-filtru-gen-date-fin > span").text("Perioade diferite");
                             SetActiveElement($(".filtre-perioada-fct-gen").children("li[class*='active']"),false);
                         }
                      else
                          {
                            $("#link-filtru-gen-date-fin > span").text(nume_filtru);
                            SetActiveElement($(".filtre-perioada-fct-gen").children("li").
                                    children('a[id-perioada="'+f_perioada+'"]').parent("li"));
                          }
                });
      }); 
    });
    //la click pe un filtru genereal activeaza evenimentul de click de pe fiecare filtru panel-uri
    $(".filtre-perioada-fct-gen").children("li").children('a').each(function(){
      $(this).on("click",function(){
            var tip_fct=$(this).attr("tip-fct")||0;
            var f_perioada=$(this).attr("id-perioada")||-1;
            if (parseInt(f_perioada)!==-1)
                {
                    
                   $(".filtre-perioada-fct").children("li").
                           children('a[id-perioada="'+f_perioada+'"]').each(function(){
                                $(this).trigger("click");
                            });
                }
             //$("#link-filtru-gen-date-fin > span").text($(this).text());   
      }); 
    });
    
    
}
function ActivateFilter_DetaliiDateFinanciare(tip_fct_dat,f_perioada_data)
{
    $(".filtre-perioada-fct-detalii").children("li").children('a').each(function(){
        if (parseInt(f_perioada_data)!==-1 )
            {
                $(this).attr("tip-fct",tip_fct_dat);
//                $(this).attr("id-perioada",f_perioada_data);
                if ($(this).attr("id-perioada")==f_perioada_data)
                    $("#link-filtru-detalii-date-fin > span").text($(this).text());
            }
       
      $(this).on("click",function(){
             var tip_fct=$(this).attr("tip-fct");
             var f_perioada=$(this).attr("id-perioada");
//             console.log("t "+tip_fct,"p "+f_perioada);
            if (parseInt(f_perioada)!==-1 && tip_fct!==0)
                {
                     IncarcaPaginaPHP("contentTabsFacturiIncasari","facturi-incasari.php",
                    '{"TIP_FCT":'+tip_fct+',"F_PERIOADA":'+f_perioada+'}');
                }
             //$("#link-filtru-gen-date-fin > span").text($(this).text());   
      }); 
    });
//    console.log('td '+tip_fct_dat,'pd '+f_perioada_data);
}


function WriteData_PnlsDateFinanciare(theObj)
{
    var val_incasat=-1;
    var val_rest=-1;
    for (var i=0;i<theObj.length;i++)
        {
            var textFactura_i;
            if (parseInt(theObj[i].NR_TOTAL_FACTURI)===1)
                    textFactura_i='factura';
            else
               textFactura_i='facturi'; 
            switch (theObj[i].TIP_TOTAL_RET)
            {
                //facturi emise
                case 1:
                    $("#continut-date-fact-emise > strong").text("");
                    
                    $("#continut-date-fact-emise> strong").append(
                            theObj[i].TOTAL_PT_FORMAT+' '+theObj[i].MONEDA
                    );
                    $("#filtru-aplicat-fact-emise").val(theObj[i].FILTRU_PERIOADA_RET);
                    $("#link-breadFacturi-emise").attr("id-perioada",theObj[i].FILTRU_PERIOADA_RET);
                    break;
               //facturi outs
                case 2:
                    $("#continut-date-fact-oust").text("");
                    
                    $("#continut-date-fact-oust").append(
                    '<strong>'+theObj[i].NR_TOTAL_FACTURI+' '+textFactura_i+' </strong>'+
                        'in valoare de: '+
                    '<strong class="warning-facturare" id="total-fct-outs"> '+
                            theObj[i].TOTAL_PT_FORMAT+' '+theObj[i].MONEDA+
                     ' </strong>'
                    );
                    $("#filtru-aplicat-fact-outs").val(theObj[i].FILTRU_PERIOADA_RET);
                    $("#link-breadFacturi-outs").attr("id-perioada",theObj[i].FILTRU_PERIOADA_RET);
                    break;
               //incasari
                case 3:
                    $("#continut-date-incasari>strong").text("");
                    $("#continut-date-incasari>strong").append(
                        theObj[i].TOTAL_PT_FORMAT+' '+theObj[i].MONEDA
                    );
                        val_incasat=parseFloat(theObj[i].TOTAL);
                    $("#filtru-aplicat-incasari").val(theObj[i].FILTRU_PERIOADA_RET);
                    $("#link-breadIncasari").attr("id-perioada",theObj[i].FILTRU_PERIOADA_RET);
                    break;
               //rest plata
                case 4:
                    $("#continut-date-rest>strong").text("");
                    $("#continut-date-rest>strong").append(
                        theObj[i].TOTAL_PT_FORMAT+' '+theObj[i].MONEDA
                    );
                         val_rest=parseFloat(theObj[i].TOTAL);
                    $("#filtru-aplicat-incasari").val(theObj[i].FILTRU_PERIOADA_RET);
                    $("#link-breadIncasari").attr("id-perioada",theObj[i].FILTRU_PERIOADA_RET);
                    break;
                case 0:
                    alert("sadsad");
                    break;
                default:
                    break;
            }
        }
                if (val_rest===0 && val_incasat===0)
                        {
                           $("#bar-procent-incasat").css({width:"0%"});
                           $("#bar-procent-rest").css({width:"0%"});
                         return;  
                       }  
                    if (val_incasat!==-1 && val_rest!==-1)
                        {
                            var proc_incasat = val_incasat/(val_rest+val_incasat)*100;
                            var proc_rest=val_rest/(val_rest+val_incasat)*100;
                           $("#bar-procent-incasat").css({width:proc_incasat+"%"});
                           $("#bar-procent-rest").css({width:proc_rest+"%"});
                        }
     
}

//---------------------------------------

//---------------Functionare-------------
/**
 * 
 * Arata un gif de incarcare dupa care apeleaza functia callBackFunction
 * (dimensiunea gif-ului este luata in functie de dimensiunea parintelui).
 * 
 * Folosita in general pentru IncarcaPaginaPHP, fiind apelata inainte de incarca pagina cu Ajax,
 * dupa care continutul Container-ului/Parintelui e inlocuit cu ce returneaza Ajax-ul
 * 
 * @param {String} idContainer id-ul parintelui in care sa apara loader-ul
 * @param {function} callBackFunction functia pe care o apeleaza dupa ce arata gif-ul 
 * @returns {undefined}
 */
function ShowLoader(idContainer,callBackFunction)
{
    
    var theContainer=$('#'+idContainer);
    if (!Boolean(theContainer)) 
        {
            var callbacks = $.Callbacks();
            callbacks.add(callBackFunction);
            callbacks.fire();
            return false;
        }
    if (!Boolean(theContainer.position()))
    {
        var callbacks = $.Callbacks();
        callbacks.add(callBackFunction);
        callbacks.fire();
        return false;
    }
    var idLoaderDiv=AvailableID('div-dinam-loader');
    var idLoaderImg=AvailableID('img-dinam-loader');
    var divString='<div class="dinam-loader" id="'+idLoaderDiv+'"></div>';
    var gifName='loader';
    if ((theContainer.innerHeight()/2)>=64)
        gifName+='(64).gif';
    else
       if ((theContainer.innerHeight()/2)>32)
        gifName+='(32).gif'; 
       else
        gifName+='(24).gif';        
    var imgString='<img src="./library/img/'+gifName+'" class="dinam-img-loader" id="'+idLoaderImg+'">';
    theContainer.append(divString);
    var theDiv=$("#"+idLoaderDiv);
    theDiv.append(imgString);
    theDiv.css({
        top:theContainer.position().top+'px',
        left:theContainer.position().left+'px',
        height:theContainer.css('height'),
        width:theContainer.css('width')
    });
    var callbacks = $.Callbacks();
    callbacks.add(callBackFunction);
    callbacks.fire();
    //$('#'+idContainer).removeChild($("#"+idLoaderDiv));
    return true;
}
/**
 * 
 * Verifica daca elementul dat ca parametru <b>exista</b> sau nu.
 * 
 * @param {Object / String} paramElem id-ul elementului ca <b>String</b> 
 *                                    sau <br>chiar obiectul ca <b>Object</b> 
 * @returns {Boolean}
 */
function ElementExits(paramElem)
{
    var theElem;
    if (typeof(paramElem)==="string")
        theElem=$("#"+paramElem);
    else
        theElem=paramElem;
    //aici se poate modifica aceasta conditie pt a verifica daca un element exista
    // asta in caz ca aceasta nu merge bine :)
    if (theElem.length!==0)
        return true;
    else
        return false;
}
/**
 * 
 * Verifica daca elementul dat ca parametru este <b>vizibil</b> sau nu.
 * 
 * @param {Object / String} paramElem id-ul elementului ca <b>String</b> 
 *                                    sau <br>chiar obiectul ca <b>Object</b> 
 * @returns {Boolean}
 */
function ElementVisible(paramElem)
{
    var theElem;
    if (typeof(paramElem)==="string")
        theElem=$("#"+paramElem);
    else
        theElem=paramElem;
    //aici se poate modifica aceasta conditie pt a verifica daca un element exista
    // asta in caz ca aceasta nu merge bine :)
    if (theElem.is(":visible"))
        return true;
    else
        return false;
}
/**
 * 
 * Verifica pana cand elementul dat ca parametru este <b>vizibil</b> si abia 
 * apoi ruleaza functia data. 
 * 
 * @param {String / Object} theElem     id-ul elementului ca <b>String</b> 
 *                                      sau <br>chiar obiectul ca <b>Object</b> 
 * @param {function(theObj)} callback   functia pe care sa o execute dupa ce elementul e vizibil
 *                                      (theObj- elementul transmis ca parametru initial)
 * @param {Number} intervalOfChecking   timpul intre verificari <br> 
 *                                      <b>default:</b> 100
 * @param {Number} limitRuns            nr limita de verificari dupa care sa se opreasca<br> 
 *                                      <b>default:</b> 1000                                    
 */
function RunAfterElementVisible(theElem,callback,intervalOfChecking,limitRuns)
{
    if (typeof(limitRuns)==="undefined")
        limitRuns=500;
    if (typeof(intervalOfChecking)==="undefined")
        intervalOfChecking=100;
    try 
    {
    var myVar=
    setInterval(function DinamRun(){
            console.log("RunAfterElementVisible...");
                 if (!DinamRun.counter)
                    DinamRun.counter=0;
                DinamRun.counter++;
                console.log(DinamRun.counter);
                if ( DinamRun.counter>=limitRuns)
                   {
                       clearInterval(myVar);
                       DinamRun.counter=0;
                       console.log("A depasit limita de incercari!"); 
                       return ;
                   }
                if (ElementVisible(theElem))
                    {
                        var callbacks = $.Callbacks();
                        callbacks.add(callback);
                        try
                        {
                            if (typeof(theElem)==="string")
                               callbacks.fire($("#"+theElem));
                            else
                               callbacks.fire(theElem);
                             
                        }
                       catch (err)
                       {
                           clearInterval(myVar);
                            console.log("Eroare!");
                            DinamRun.counter=0;
                            console.log(err.message);
                       }
                        clearInterval(myVar);
                        DinamRun.counter=0;
                        console.log("Gata!");
                        return;
                    }
                    
            },
        intervalOfChecking);
        RunningFunction[RunningFunction.length]=myVar;
    }
    catch (err)
    {
       clearInterval(myVar);
       DinamRun.counter=0;
       console.log("Eroare!");
       console.log(err);
    }
}
/**
 * 
 * Verifica pana cand elementul dat ca parametru <b>exista</b> si abia 
 * apoi ruleaza functia data. 
 * 
 * @param {String / Object} theElem     id-ul elementului ca <b>String</b> 
 *                                      sau <br>chiar obiectul ca <b>Object</b> 
 * @param {function(theObj)} callback   functia pe care sa o execute dupa ce elementul exista
 *                                      (theObj- elementul transmis ca parametru initial)
 * @param {Number} intervalOfChecking   timpul intre verificari <br> 
 *                                      <b>default:</b> 100
 * @param {Number} limitRuns            nr limita de verificari dupa care sa se opreasca<br> 
 *                                      <b>default:</b> 1000  
 */
function RunAfterElementExits(theElem,callback,intervalOfChecking,limitRuns)
{
     if (typeof(limitRuns)==="undefined")
        limitRuns=500;
    if (typeof(intervalOfChecking)==="undefined")
        intervalOfChecking=100;
     try 
    {
        
    var myVar=
    setInterval(function DinamRun(){
        console.log("RunAfterElementExits...");
                if (!DinamRun.counter)
                    DinamRun.counter=0;
                DinamRun.counter++;
//                console.log(DinamRun.counter);
                if ( DinamRun.counter>=limitRuns)
                   {
                       clearInterval(myVar);
                       DinamRun.counter=0;
                       console.log("A depasit limita de incercari!"); 
                       return ;
                   }
                if (ElementExits(theElem))
                    {
                        var callbacks = $.Callbacks();
                        callbacks.add(callback);
                         try 
                        {
                            if (typeof(theElem)==="string")
                               callbacks.fire($("#"+theElem));
                            else
                               callbacks.fire(theElem);
                         }
                       catch (err)
                       {
                           clearInterval(myVar);
                           DinamRun.counter=0;
                            console.log("Eroare!");
                            console.log(err.message);
                       }
                        clearInterval(myVar);
                        DinamRun.counter=0;
                        console.log("Gata!");
                        return;
                    }
                   
            },
        intervalOfChecking);
  }
                       catch (err)
                       {
                           clearInterval(myVar);
                           DinamRun.counter=0;
                            console.log("Eroare!");
                            console.log(err.message);
                       }
}

/**
 * 
 * Activeaza tote link-urile care au clasa <strong>link-tab</strong>.<br>
 * La click pe link parintele "li" devine activ, iar celelalte taburi inactive(se elimina clasa "active")
 * <br>
 * <br>
 * <em>Apelata la $(document).ready()</em>
 * 
 */
function ActivateLinkTab()
{
    $(".link-tab").bind("click",function(){
        SetActiveElement($(this).parent());
    });
}
/**
 * Activeaza checkbox-urile cu <b>clasa "my-checkbox"</b>.
 * 
 */
/*
 * care sunt de forma 
 * <input id="test-checkbox2" class="my-checkbox my-checkbox-@type (succes,info,danger,warning)" type="checkbox"/>
    <label for="test-checkbox2" class="my-checkbox-label ">
        <i class="icon-check-empty icon-large "></i> 
        <span>Inca o optiune 2</span>
    </label>
 !!!!!! Trebuie facuta mai general TO DO
 **/
function ActivateCheckBox()
{
    $(".my-checkbox").on("click",function(){
            var elem=$(this).siblings("label");
//            console.log(elem);
            if ($(this).is(":checked"))
                {
                    elem.children("i").removeClass("icon-check-empty").
                            addClass("icon-check-sign");
                }
            else
                {
                     elem.children("i").removeClass("icon-check-sign").
                            addClass("icon-check-empty");
                }
            
        });
}


/**
 * Seteaza vizibile/ascunse elementele date in vectorul de id-uri
 * 
 * @param {String[]} arIDuri -[id1, id2, id3,...]
 * @param {String[]} arBool *[abool1, abool2,abool3,...];
 *                      *[abool] ->pt toate;
 *                      *[abool, aboo2] ->daca sunt mai multe id-uri... 
 *                      pt restul il considera pe ultimul;
 * @returns {undefined}
 */
function SetVisible(arIDuri,arBool)
{
    arBool=arBool||[true];
    var toateLaFel=(arBool.length===1);
    for (var i=0;i<arIDuri.length;i++)
        {
            if (toateLaFel)
                {
                    if (arBool[0]===true)
                        $("#"+arIDuri[i]).show();
                    else
                      $("#"+arIDuri[i]).hide();  
                }
            else
                if (i<arBool.length)
                    {
                      if (arBool[i]===true)
                        $("#"+arIDuri[i]).show();
                    else
                      $("#"+arIDuri[i]).hide();    
                    }
                else
                    {
                       if (arBool[arBool.length-1]===true)
                        $("#"+arIDuri[i]).show();
                    else
                      $("#"+arIDuri[i]).hide();  
                    }
        }
}
/**
 * Functia care imi arata daca folosesc sau nu componenta "select2".
 *  Momentan returneaza TRUE daca nu e mobil.
 *
 * @returns {bool} !IsMobile()
 */
// ca sa se poata schimba doar de aici 
// daca folosesc select2 sau selectul standard
function UseSelect2()
{
    return !IsMobile();
    //return false;
}
/**
 * Verifica daca este browser de mobil
 * @returns {bool} true if mobile
 */
function IsMobile()
{
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|SymbianOS|Symbian|SymbOS/i.test(navigator.userAgent);  
}
/**
 * Fields:
 * Android,BlackBerry,iOS,Opera,Windows, any;
 * Fields type: bool;
 * 
 * @type Object
 * 
 */
var isAMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i)||navigator.userAgent.match(/Opera Mobi/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    Symbian: function() {
        return navigator.userAgent.match(/SymbianOS/i)|| navigator.userAgent.match(/Symbian/i)
        || navigator.userAgent.match(/SymbOS/i);
    },
    any: function() {
        return (isAMobile.Android() || isAMobile.BlackBerry() || isAMobile.iOS() || isAMobile.Opera() || isAMobile.Windows());
    }
};
/**
 * 
 * @param {Float / String} x
 * @returns {String} numarul cu "," pt mie si "." pt zecimale
 */
function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
/**
 * 
 * Returneaza ce ID e selectat, in functie de tipul de combo folosit (select2 sau default)
 * sau daca nu e selectat nimic... retuneaza "defaultValue" (care daca nu e data ia valoarea -1)
 * 
 * @param {String} idElem
 * @param {String / Number} defaultValue    daca nu e selectat nimic returneaza aceasta valoare
 * @param {bool} useStandard                daca se foloseste selectul standard de browser sau select2, 
 *                                          iar daca nu e dat foloseste functia UseSelct2()
 * @returns {String / any}                  id-ul selectat sau defaultValue 
 */
function GetComboSelectedValue(idElem,defaultValue,useStandard)
{

   if (typeof (useStandard)==="undefined") 
    useStandard=!(UseSelect2());
    if (typeof(defaultValue)==="undefined")
        defaultValue=-1;
   if (useStandard)
   {
//         var elem = document.getElementById(idElem);
//         return  elem.options[elem.selectedIndex].value;

        return $("#"+idElem+" :selected").val();
   }
   else
       {
           if ($("#"+idElem).select2("data")!==null)
            return $("#"+idElem).select2("data").id||$("#"+idElem).select2("data").ID||defaultValue; 
           else
               return defaultValue;
       }
}
/**
 * 
 * Returneaza ce TEXT e selectat, in functie de tipul de combo folosit (select2 sau default)
 * sau daca nu e selectat nimic... retuneaza "defaultValue" (care daca nu e data ia valoarea "")
 * 
 * @param {String} idElem
 * @param {String / Number} defaultValue    daca nu e selectat nimic returneaza aceasta valoare
 * @param {bool} useStandard                daca se foloseste selectul standard de browser sau select2
 *                                          iar daca nu e dat foloseste functia UseSelct2()
 * @returns {String / any}                  TEXTUL-ul selectat sau defaultValue 
 */
//!!!!!!!!Nu merge cu selectul multiplu!!!!
function GetComboSelectedText(idElem,defaultValue,useStandard)
{
    if (typeof (useStandard)==="undefined") 
    useStandard=!(UseSelect2());
       if (typeof(defaultValue)==="undefined")
        defaultValue="";
    if (useStandard)
   {
//                 var elem = document.getElementById(idElem);
//         return  elem.options[elem.selectedIndex].text;
        return $("#"+idElem+" :selected").text();
   }
   else
       {
           if ($("#"+idElem).select2("data")!==null)
            return $("#"+idElem).select2("data").text||$("#"+idElem).select2("data").TEXT||defaultValue;
           else
               return ""; 
       }
}

/**
 * 
 * Returneaza un string de tipul JSON cu elementele selectate din select2 multiplu.
 * 
 * @param {String / Object} Elem    id-ul elementului / elementul
 * @param {Bool} alternativeJSON    
 * @returns {JSON_String}           '[{"id":"id_ama","text":"nume_avocat"},{...},...]' 
 *                                  <br/>sau<br/>
 *                                  '{"id_ama":"Nume_Avocat",...}' - pt alternativeJSON=true
 */
function GetMultipleSelected(Elem,alternativeJSON)
{
    var theCombo;
    if (typeof(Elem)==="string")
        theCombo =$("#"+Elem);
    else
        theCombo=Elem;
if (alternativeJSON)
    {
         var theObject={};
            var nrAvocati=theCombo.select2("data").length;
            if (nrAvocati===0)
                {
                    return "{}";
                }
           for(var i=0;i<nrAvocati;i++)
               {
                 theObject[theCombo.select2("data")[i].id]=theCombo.select2("data")[i].text;  
               }
           return JSON.stringify(theObject);
    }
    else
        {
            //nu merge sa iau direct din select2("data").
            //trebuie sa pun obiectele cate unul in alt vector si sa il convertesc pe acela
            var arObj=[{}];
          var nrAvocati=theCombo.select2("data").length;
            if (nrAvocati===0)
                {
                    return "[]";
                }
           for(var i=0;i<nrAvocati;i++)
               {
                  // console.log(theCombo.select2("data")[i].id,theCombo.select2("data")[i].text);
                 arObj[i]={id:theCombo.select2("data")[i].id,
                             text:theCombo.select2("data")[i].text};
               }
           return JSON.stringify(arObj);
        }
}
//
// de tipul '{"id_ama":"Nume_Avocat"}'
/**
 * 
 * Returneaza un string JSON cu avocatii selectati din selectul de avocati (multiplu in general...)
 * 
 * 
 * @param {String}  idElem select-ul cu numele avocatilor 
 * @param {Bool} returnJSON daca trebuie sa returneze dupa tipul JSON
 * @returns {String}    '[{"id":"id_ama","text":"nume_avocat"},{}]'-pt returnJSON=true
 *                      '{"id_ama":"Nume_Avocat"}'-pt returnJSON=false sau undefined
 */
function GetSelectedAvocati(idElem,returnJSON)
{    
var theCombo=$("#"+idElem);
if (returnJSON)
    {
        var theResult="[";
        var nrAvocati=theCombo.select2("data").length;
        if (nrAvocati===0)
            {
                return "[]";
            }
       theResult+='{"id":'+theCombo.select2("data")[0].id+',"text":"'+theCombo.select2("data")[0].text+'"}'; 
       for(var i=1;i<nrAvocati;i++)
           {
             theResult+=',{"id":'+theCombo.select2("data")[i].id+',"text":"'+theCombo.select2("data")[i].text+'"}';  
           }
       return theResult+"]";
    }
    else
        {
            var theObject={};
            var nrAvocati=theCombo.select2("data").length;
            if (nrAvocati===0)
                {
                    return "{}";
                }
           for(var i=0;i<nrAvocati;i++)
               {
                 theObject[theCombo.select2("data")[i].id]=theCombo.select2("data")[i].text;  
               }
           return JSON.stringify(theObject);
        }
}

function ResetFormActivitate()
{
    document.getElementById("frmAddActivitate").reset();
    if (UseSelect2())
        {
            $("#input-clientActivitate").select2("val","");
            $("#input-contractActivitate").select2("val","");
            $("#input-tipActivitate").select2("val","");
        }
    else
        {
           
           $("#input-clientActivitate").val(""); 
           $("#input-contractActivitate").val("");
            $("#input-tipActivitate").val("");
        }
        
    //ResetSelect2("input-clientActivitate","Client");
    //ResetSelect2("input-contractActivitate","Contract");
    //ResetSelect2("input-tipActivitate","Tip activitate");
     SetAvocatLogat("input-avocatiActivitate");
    ResetDateTimePicker();
    $("#input-descriereActivitate").text("");
    $("#input-observatiiActivitate").text("");
     $("#titlu-frmAddActivitate").text("Adauga activitate");
}
function ResetFormTermene()
{
    if ($("#input-adaugaTermenUrmator").is(":checked"))
        $("#input-adaugaTermenUrmator").trigger("click");
    document.getElementById("frmAddTermen").reset();
    ResetSelect2("input-clientTermen","Client");
    ResetSelect2("input-contractTermen","Contract");
    ResetSelect2("input-instantaTermen","Instanta");
     SetAvocatLogat("input-avocatiTermen");
     
    ResetDateTimePicker();
}
function ResetFormCheltuieli()
{
    document.getElementById("frmAddCheltuieli").reset();
    ResetSelect2("input-clientCheltuieli","Client");
    ResetSelect2("input-contractCheltuieli","Contract");
    ResetDateTimePicker();
}
/**
 * Seteaza campurile din fereastra de rapoarte. 
 * Daca nu sunt dati parametrii ii face default.<em>(Populare combo-uri si data curenta)</em>
 * 
 * @param {Number} idRap        Daca e -1 le pune pe cele default
 * @param {Object} avocat       
 * @param {String} dela         Data de inceput
 * @param {String} la           Data pana la
 * @param {Object} client       
 * @param {Object} contract
 * 
 */
function SetFormRapoarte(idRap,avocat,dela,la,client,contract)
{
    if (typeof(idRap)==="undefined")
        idRap=-1;
     if (typeof(avocat)==="undefined")
        avocat=null;
     if (typeof(dela)==="undefined")
        dela='now';
     if (typeof(la)==="undefined")
        la='now';
     if (typeof(client)==="undefined")
        client=null;
    if (typeof(contract)==="undefined")
        contract=null;
    //pune valaorile default
    if (idRap===-1)
        {
            $("#link-rap1").trigger("click");
            PopuleazaComboAvocati("input-avocatiRaport",false,1,"-Toti-",true,false);
            PopuleazaComboClient("input-clientRaport","-Toti-",true);
            PopuleazaComboContract("input-contractRaport","input-clientRaport","-Toate-",true);
        }
   //pune valorile din parametrii
    else
        {
            $("#link-rap"+idRap).trigger("click");
             if ((!(avocat.id))||(avocat.id===-1))
                 avocat=null;
            PopuleazaComboAvocati("input-avocatiRaport",false,1,"-Toti-",true,false,avocat);
             if ((!(client.id))||(client.id===-1))
                 client=null;    
             if ((!(contract.id))||(contract.id===-1))
                 contract=null; 
             PopuleazaComboClient("input-clientRaport","-Toti-",true,client,
                function(){
                        PopuleazaComboContract("input-contractRaport","input-clientRaport","-Toate-",true,contract,
                            function(){
                                //ma asigur ca afiseaza datele bine si stie selectul sa transmita valoarea buna
                                if(GetComboSelectedValue("input-clientRaport")!==$("#input-clientRaport").val())
                                    $("#input-clientRaport").val(GetComboSelectedValue("input-clientRaport"));
                                 if(GetComboSelectedValue("input-contractRaport")!==$("#input-contractRaport").val())
                                    $("#input-contractRaport").val(GetComboSelectedValue("input-contractRaport"));
                            }
                        );
                    }
             );
            $("#input-dataDeLaRaport").val(dela);
            $("#input-dataLaRaport").val(la);
        }
}
/**
 * 
 * Selecteaza un element din "combo-ul" select2 
 * daca obiectul("theObj") e dat null atunci va elibera toate elementele selectate
 * 
 * @param {String / Object} Elem
 * @param {Object} theObj de forma {id:...,text:"..."}
 * 
 */
function SetSelect2(Elem,theObj)
{
    var theElem;
    if (typeof(Elem)==="string")
        theElem=$("#"+Elem);
    else
        theElem=Elem;
    /*theObj - {id:"...",text:"..."}*/
//    RunAfterElementVisible(theElem,function(){
    RunAfterElementExits(theElem,function(){
        //theElem.select2("data",null);
        theElem.select2("data",theObj);
    //verific daca obiectul nu e null
        if (theObj)
         {
             //daca are proprietatea "text"
            if (theObj.text)
                //daca da... afisez textul ca selectat (altfel doar il selecteaza in "data" si nu-l afiseaza... arata selectul gol :( )
                theElem.prev().find('a.select2-choice > span').first().html(theObj.text);     
         }
    });
}
/**
 * Se mai poate reseta si cu "SetSelect2('idElem',null);"
 * !!!! DAR ACESTA NU MERGE CU SELECT2 MULTIPLU!!!!
 * 
 * @param {String} idElem
 * @param {String} placeholder
 * 
 */
function ResetSelect2(idElem,placeholder)
{
    placeholder=placeholder||"";
    $("#"+idElem).prev().find('a.select2-choice > span').first().html(placeholder);
          $("#"+idElem).val('');
    $('#s2id_'+idElem+' > a').addClass('select2-default');
    if ($("#"+idElem).select2("data")!==null)
        {
            if ($("#"+idElem).select2("data").ID)
                $("#"+idElem).select2("data").ID=-1;
//            if ($("#"+idElem).select2("data").id)
//                $("#"+idElem).select2("data").id=-1;
            if ($("#"+idElem).select2("data").TEXT)
                $("#"+idElem).select2("data").TEXT="";
//            if ($("#"+idElem).select2("data").text)
//                $("#"+idElem).select2("data").text="";
        }
    $("#"+idElem).trigger("change");
}

function ActivateBtn_ScheduleAddActivitate()
{
     $(".btn-add-activ").each(function(){
        //ia S_ID-ul care se afla intr-o celula ascunsa pe rand cu butonul 
       var s_id=$(this).parent("td").siblings("td[class*='info-schedule']").attr("id_schedule");
        $(this).on("click",function(){
//            if (!$("#loadTabs").is(":visible"))
//                {
//                     $("#loadTabs").slideToggle("500",function(){
//                         if ($("#frmAddActivitate").offset())
//                            $('html, body').animate({
//                                            scrollTop: $("#frmAddActivitate").offset().top
//                                        }, 400);
//                     });
////                $("#link-tabActivitati").trigger("click");
//                }
//             var sparams=GenerateJSONString(["FROM_SCHEDULE","S_ID"],
//                            [true,s_id]);
////             console.log(sparams);
//                    IncarcaPaginaPHP('contentTabs','activitati.php',sparams,"POST",true,
//                    function(){
//                        return true;
//                    });
            $("#frmSubmitS_ID").children('[name="F_S"]').val("true");
            $("#frmSubmitS_ID").children('[name="S_ID"]').val(s_id);
            $("#frmSubmitS_ID").submit();
            ;
        });
     });
}
//Activeaza butoanele de adaugare termen ca activitate
// !!!SE ACTIVEAZA DIN FBUtils.php DUPA CE SE GENEREAZA 
//          TABELUL DE TERMENE SI EVENIMENTE ("PopuleazaAlarme(..)")!!!
function ActivateBtn_ScheduleAddActivitate2()
{
    $(".btn-add-activ").each(function(){
        //ia S_ID-ul care se afla intr-o celula ascunsa pe rand cu butonul 
       var s_id=$(this).parent("td").siblings("td[class*='info-schedule']").attr("id_schedule");
        $(this).on("click",function(){
            //afiseaza activitatile daca este ascuns containerul
            if (!$("#loadTabs").is(":visible"))
                $("#link-tabActivitati").trigger("click");
            //ia datele din baza pentru termenul pe care e butonul
            GetDataFromSchedule(s_id,function(theObj){

//                console.log(theObj);
                //daca e termen...
               if (String(theObj.data[0].TIP_SCHEDULE)==='0')
                {
                    //ResetFormActivitate();
//                        console.log(theObj);
                     RunAfterElementVisible("input-avocatiActivitate",function(){   
                        
                        $("#titlu-frmAddActivitate").text("Adaugare termen ca activitate");
                        var ama_id_sel=[];
                        for (var i = 0; i < theObj.avocati.length; i++) {
//                           ama_id_sel[i]=theObj.avocati[i].AMA_ID;
                             ama_id_sel[i]={id:theObj.avocati[i].AMA_ID,text:''+theObj.avocati[i].AVOCAT};   
                        }
                        //la data si ora sa se puna in default-dat
                        $("#input-dataActivitate").attr("default-date",theObj.data[0].STARTDATE);
                        $("#input-oreActivitate").attr("default-time",theObj.data[0].DURATA);
                        if (UseSelect2())
                            {
                                SetSelect2("input-clientActivitate",{id:theObj.data[0].C_ID,text:theObj.data[0].CLIENT});
                                SetSelect2("input-contractActivitate",{id:theObj.data[0].CTR_ID,text:theObj.data[0].CONTRACT});
                                
                            }
                        else
                            {
                                //!!!!!!!!!AICI de facut si pt tel!!!!!    TO DO
                            }
                      $("#input-descriereActivitate").val(theObj.data[0].DESCRIERE);  
                      $("#input-observatiiActivitate").val("");
                    //pun avocatul dupa un interval de timp... altfel nu merge... 
                    //probabil nu se creeaza componenta .
                    // s-ar putea verifica o metoda mai sigura, fiindca uneori nu alege avocatul corect TO DO
                    setTimeout(function(){
//                            $("#input-avocatiActivitate").select2("val",ama_id_sel);
                            SetSelect2("input-avocatiActivitate",ama_id_sel);
                            ResetDateTimePicker();
                        },300);
                        
                    });
                }
                //altfel e eveniment
                else
                {
                    return false;
                } 
                
            });            
        });
    });
}
function ActivateBtn_EditTermenUrmator(aBtn,s_idInput)
{
     var theBtn;
    if (typeof(aBtn)==='string')
        {  
          theBtn=$("#"+aBtn);  
        }
    else
        theBtn=aBtn;
    var theInput;
    if (typeof(s_idInput)==='string')
        {  
          theInput=$("#"+s_idInput);  
        }
    else
        if (typeof(s_idInput)==="undefined")
            theInput=$("#id-schedTermenUrmator");
    else
        theInput=s_idInput;
    var s_id=theInput.val();
   theBtn.on("click",function(){
            $("#paginatie-alarme").hide();
                     var sparams=GenerateJSONString(["MODIFICA_TERMEN","S_ID"],
                            [true,s_id]);
                    $("#btnAddEvenimentDinAlarme").hide();
                        $("#btnAddTermenDinAlarme").hide();
                       $("#btnInapoiLaAlarme").show();
                     $("#filtru-perioada-alarme").hide();
                    IncarcaPaginaPHP('contentAlarme','termene.php',sparams,"POST",true,
                    function(){
                        return true;
                    });
   });
}

function ActivateBtn_EditMyWork()
{
    $(".btn-edit-activitate").each(function(){
         //ia MYW_ID-ul care se afla intr-o celula ascunsa pe rand cu butonul 
        var myw_id=$(this).parent("td").siblings("td[class*='info-myw']").attr("id_myw");
        $(this).on("click",function(){
            if (!$("#loadTabs").is(":visible"))
                {
                     $("#loadTabs").slideToggle("500",function(){
                         if ($("#frmAddActivitate").offset())
                            $('html, body').animate({
                                            scrollTop: $("#frmAddActivitate").offset().top
                                        }, 400);
                     });
                }
                     var sparams=GenerateJSONString(["MODIFICA_MYW","S_ID"],
                            [true,myw_id]);
                     IncarcaPaginaPHP('contentTabs','activitati.php',sparams,"POST",true,
                    function(){
                        return true;
                    });
        });
    });
}

function ActivateBtn_EditSchedule()
{
    $(".btn-edit-agenda").each(function(){
         //ia S_ID-ul care se afla intr-o celula ascunsa pe rand cu butonul 
        var s_id=$(this).parent("td").siblings("td[class*='info-schedule']").attr("id_schedule");
        var tip_schedule=$(this).parent("td").siblings("td[class*='info-schedule']").attr("tip_schedule");;
        $(this).on("click",function(){
            $("#paginatie-alarme").hide();
            // daca e termen
            if (parseInt(String(tip_schedule))===0)
                {
                     var sparams=GenerateJSONString(["MODIFICA_TERMEN","S_ID"],
                            [true,s_id]);
                    $("#btnAddEvenimentDinAlarme").hide();
                        $("#btnAddTermenDinAlarme").hide();
                       $("#btnInapoiLaAlarme").show();
                     $("#filtru-perioada-alarme").hide();
                    IncarcaPaginaPHP('contentAlarme','termene.php',sparams,"POST",true,
                    function(){
                        return true;
                    });
                }
            else
                //altfel e eveniment
                if (parseInt(String(tip_schedule))>0)
                {
                    var sparams=GenerateJSONString(["MODIFICA_EVENIMENT","S_ID"],
                            [true,s_id]);
                    $("#btnAddEvenimentDinAlarme").hide();
                        $("#btnAddTermenDinAlarme").hide();
                         $("#filtru-perioada-alarme").hide();
                       $("#btnInapoiLaAlarme").show();
                    IncarcaPaginaPHP('contentAlarme','evenimente.php',sparams,"POST",true,
                    function(){
                        return true;
                    });   
                } 
        });
    });
}


//Activeaza evenimentele de editare a unui termen sau eveniment
// !!!SE ACTIVEAZA DIN FBUtils.php DUPA CE SE GENEREAZA 
//          TABELUL DE TERMENE SI EVENIMENTE ("PopuleazaAlarme(..)")!!!
function ActivateBtn_EditSchedule2()
{
    $(".btn-edit-agenda").each(function(){
         //ia S_ID-ul care se afla intr-o celula ascunsa pe rand cu butonul 
        var s_id=$(this).parent("td").siblings("td[class*='id-schedule']").attr("id");
        $(this).on("click",function(){
            //ia datele din baza pentru termenul pe care e butonul
            GetDataFromSchedule(s_id,function(theObj){
                $("#paginatie-alarme").hide();
                var strAvocati="[";
                strAvocati+='{id:"'+theObj.avocati[0].AMA_ID+'",text:"'+theObj.avocati[0].AVOCAT+'"}';
                for (var i = 1; i < theObj.avocati.length; i++) {
                 strAvocati+=',{id:"'+theObj.avocati[i].AMA_ID+'",text:"'+theObj.avocati[i].AVOCAT+'"}';
                }
                 strAvocati+="]";       
                //console.log(theObj);
                //daca e termen...
               if (String(theObj.data[0].TIP_SCHEDULE)==='0')
                { 
                    IncarcaPaginaPHP('contentAlarme','termene.php','null',"POST",true,
                    function(){
//                        console.log(theObj);
                        $("#btnAddEvenimentDinAlarme").show();
                        $("#btnAddTermenDinAlarme").hide();
                       $("#btnInapoiLaAlarme").show();
                        $("#titlu-frmAddTermen").text("Modifica termen");
                        $("#id-schedTermen").val(theObj.data[0].S_ID);
                        $("#mod-salvareTermen").val("1");
                        var ama_id_sel=[];
                        for (var i = 0; i < theObj.avocati.length; i++) {
                           ama_id_sel[i]=theObj.avocati[i].AMA_ID;
                        }
                        //la data si ora sa se puna in default-date
                        $("#input-dataTermen").attr("default-date",theObj.data[0].STARTDATE);
                        $("#input-oraTermen").attr("default-time",theObj.data[0].STARTTIME);
                        $("#input-durataTermen").attr("default-time",theObj.data[0].DURATA);
                        
                        if (UseSelect2())
                            {
                                SetSelect2("input-clientTermen",{id:theObj.data[0].C_ID,text:theObj.data[0].CLIENT});
                                SetSelect2("input-contractTermen",{id:theObj.data[0].CTR_ID,text:theObj.data[0].CONTRACT});
                                SetSelect2("input-instantaTermen",{id:0,text:theObj.data[0].LOCATIA});
                                SetSelect2("input-stadiuTermen",{id:theObj.data[0].STADIU_ID,text:theObj.data[0].STADIU_PROCESUAL});
                            }
                      $("#input-descriereTermen").val(theObj.data[0].DESCRIERE);   
                       //pun avocatul dupa un interval de timp... altfel nu merge... 
                    //probabil nu se creeaza componenta .
                    // s-ar putea verifica o metoda mai sigura, fiindca uneori nu alege avocatul corect TO DO
                   setTimeout(function(){
                            $("#input-avocatiTermen").select2("val",ama_id_sel);
                            ResetDateTimePicker();
                        },300);
                        
                    });
                    
                }
                //altfel e eveniment
                else
                {
                    $("#btnAddEvenimentDinAlarme").show();
                        $("#btnAddTermenDinAlarme").hide();
                       $("#btnInapoiLaAlarme").show();
                    console.log(strAvocati);
                    var sparams=GenerateJSONString(["MODIFICA_EVENIMENT","AMA_IDS",
                                    "S_ID","DATA_SCHEDULE","ORA_SCHEDULE","DESCRIERE"],
                            [true,strAvocati,theObj.data[0].S_ID,
                                theObj.data[0].STARTDATE,theObj.data[0].STARTTIME,theObj.data[0].DESCRIERE]);
                        console.log(sparams);
                    IncarcaPaginaPHP('contentAlarme','evenimente.php',sparams,"POST",true,
                    function(){
                        
                    });
                   return; 
                    //--------------------
                    IncarcaPaginaPHP('contentAlarme','evenimente.php','null',"POST",true,
                    function(){
//                        console.log(theObj);
                        $("#btnAddEvenimentDinAlarme").show();
                        $("#btnAddTermenDinAlarme").hide();
                       $("#btnInapoiLaAlarme").show();
                        $("#titlu-frmAddEveniment").text("Modifica eveniment");
                        $("#id-schedEveniment").val(theObj.data[0].S_ID);
                        $("#mod-salvareEveniment").val("1");
                        
                        var ama_id_sel=[];
                        for (var i = 0; i < theObj.avocati.length; i++) {
                           ama_id_sel[i]=theObj.avocati[i].AMA_ID;
                        }
                        $("#input-dataEveniment").attr("default-date",theObj.data[0].STARTDATE);
                        $("#input-oraEveniment").attr("default-time",theObj.data[0].STARTTIME);

                      $("#input-descriereEveniment").val(theObj.data[0].DESCRIERE);   
                       //pun avocatul dupa un interval de timp... altfel nu merge... 
                    //probabil nu se creeaza componenta .
                    // s-ar putea verifica o metoda mai sigura, fiindca uneori nu alege avocatul corect TO DO
                   setTimeout(function(){
                            $("#input-avocatiEveniment").select2("val",ama_id_sel);
                        },300);
                        ResetDateTimePicker();
                    });
                } 
                
            });            
        });
    });
}
//activez filtrele din tabelul de alarme(termene si evenimente)
//momentan doar "TIP"  :)
//-> la click pe el sa aleaga doar termen sau eveniment 
//!!! SE ACTIVEAZA DIN FBUtils.php DIN "PopuleazaAlarme(...)"
function ActivateFiltruTipAgenda(idElem)
{
    $("#"+idElem).on("click",function(){
      ChangeFiltruTipAgenda(idElem); 
        IncarcaAlarme('contentAlarme',1);
    });
}
//link-ul din capul de tabel are atributul "filter-type" = "all"/"only-term"/"only-evenim"
function ChangeFiltruTipAgenda(idElem,orderType)
{
    var theElem=$("#"+idElem);
   // console.log(idElem+' '+orderType);
    //pot sa dau ca parametru ce tip vreau sau sa il ia automat pe urmatorul
    var changeToNext=(orderType===undefined||String(orderType).trim()==='');
    orderType=orderType||String(theElem.attr("filter-type"));
    var nextType='all';
    if (changeToNext)
        {
          switch (orderType)
          {
              case 'all':
                  nextType='only-term';
                  break;
              case 'only-term':
                  nextType='only-evenim';
                  break;
              case 'only-evenim':
                  nextType='all';
                  break;
              default:
                  nextType='all';
                  break;
          }
        }
    else
        nextType=orderType;
    //console.log(nextType);
    theElem.children("i").remove();
    theElem.attr("filter-type",nextType); 
    if (nextType==='only-term')
      theElem.append("<i class='icon-briefcase'></i>");
    else
        if (nextType==='only-evenim')
            theElem.append("<i class='icon-calendar'></i>");
}
//sa pot alege un filtru programatic
function SetOrderLink(elemId,orderType)
{
  var theParent=$("#"+elemId).parent('th[class*="dropdown"]');
  $(".table-order-link[class*='active'] > b").remove();
  $(".table-order-link[class*='active']").removeClass("active");
  $("#"+elemId).append("<b class='caret'></b>").addClass("active");
  
              if (String(orderType)==='asc')  
                  {
                     theParent.removeClass('dropup'); 
                     $("#"+elemId).attr('order-type','asc');
                  }
              else
                  {
                    theParent.addClass('dropup'); 
                    $("#"+elemId).attr('order-type','desc');
                  } 
}
//activez filtrele de ordonare din tabelul de alarme(termene si evenimente)
//cele care au clasa "table-order-link"
//-> la click pe ele sa incarce tabelul din nou ordonat 
//!!! SE ACTIVEAZA DIN FBUtils.php DIN "PopuleazaAlarme(...)"
function ActivateOrderLink()
{
   $(".table-order-link").on("click",function(){
       //$(this) e linkul 
       // si the parent e th-ul care are clasa dropdown 
       var theParent=$(this).parent('th[class*="dropdown"]');
       //daca nu e activ il setez ca activ
       if (!$(this).hasClass('active'))
        {
            //resetez celalalt filtru activ
            $(".table-order-link[class*='active'] > b").remove();
            $(".table-order-link[class*='active']").removeClass("active")
                    .attr('order-type','');
            $(this).append("<b class='caret'></b>").addClass("active");
            $(this).attr('order-type','asc');
        }
        //daca e... schimb stilul de ordonare asc->dropdown/desc->dropup
        // astfel se schimba si sagetuta
        else
            {
              if (theParent.hasClass('dropup'))  
                  {
                     theParent.removeClass('dropup'); 
                     $(this).attr('order-type','asc');
                  }
              else
                  {
                    theParent.addClass('dropup'); 
                    $(this).attr('order-type','desc');
                  }
            }
       IncarcaAlarme('contentAlarme',1); 
   });
}
/**
 * 
 * Pune clasa "active" elementului si o elimina de la fratii lui.
 * 
 * @param {String/Object} elem
 * @param {bool} aBool
 *  
 * */

 function SetActiveElement(elem,aBool)
{
    var theElem;
    if (typeof(elem)==='string')
        {  
          theElem=$("#"+elem);  
        }
    else
        theElem=elem;
   if (aBool===undefined) aBool=true;
   theElem.siblings(".active").removeClass("active");
  //$("."+$('li#'+elemId).attr('class')).removeClass("active");
  if (aBool===true)
    theElem.addClass("active");
  else
    theElem.removeClass("active");
}
/**
 * 
 * Creeaza un mesaj de alerta in parintele dat.
 * 
 * @param {String} titlu 
 * @param {String} mesaj
 * @param {String} tip ""/"success"/"warning"/"danger"/"info"
 * @param {String} idParinte  Daca parintele nu e dat suprascrie TOT documentul html 
 * @param {bool} supraScrieParinte
 * @param {Number} timeUntilClose Daca timpul este dat se inchide dupa "timeUntilClose" milisecunde...
 * 
 */
function ArataMesajAlerta(titlu,mesaj,tip,idParinte,supraScrieParinte,timeUntilClose)
{
    
    var idAlerta="divAlerta-in";
    idAlerta=AvailableID(idAlerta);
    //daca parintele nu e dat suprascrie TOT documentul html 
    if (idParinte!==undefined && idParinte!=="")
        {
            //alert('t: '+titlu+' m: '+mesaj+' t: '+tip+' i: '+idParinte);
        if (supraScrieParinte!==undefined)
            if (supraScrieParinte===true)
                $("#"+idParinte).empty();
           $("#"+idParinte).append("<div id='"+idAlerta+"' class='alert fade in'>\n\
        <button type='button' class='close' id='"+idAlerta+"-close'>&times;</button>\n\
        </div>"); 
           
        }
    else
        {
            //!!!PROBLEME pt ajax cand parintele nu e dat---- TO DO
            if (IsMobile())
                {
                    //la mobil pun pe toata latimea ecranului
                   $("body").append("<div  style='position:fixed;top:5px;left:0px; width:100%;'>\n\
                <div id='"+idAlerta+"' class='alert fade in '>\n\
                <button type='button' class='close' id='"+idAlerta+"-close'>&times;</button>\n\
                </div></div>"); 
                }
            else
                {
                   $("body").append("<div  style='position:fixed;top:5px;left:30%; width:40%;min-width:100px;'>\n\
                        <div id='"+idAlerta+"' class='alert fade in my-shadow'>\n\
                <button type='button' class='close' id='"+idAlerta+"-close'>&times;</button>\n\
                </div></div>"); 
                }
            
        }
  // daca nu e dat ramane doar clasa alert (adica tot "warning"- alerta aia galbejita) 
   if (tip!==undefined && tip!=="")
     $("#"+idAlerta).addClass('alert-'+tip);
 //tiltul cu bold... dar se poate da orice html ca parametru
   if (titlu!==undefined  && titlu!=="")
     $("#"+idAlerta).append('<strong>'+titlu+' </strong>');
 //mesajul... ca orice html
   if (mesaj!==undefined && mesaj!=="")
     $("#"+idAlerta).append('<span>'+mesaj+'</span>');
 //daca nu... ramane vizibila cu "x" de inchidere... deci nu ar trebui sa streseze userul
 if (timeUntilClose!==undefined)
        setTimeout(function(){$("#"+idAlerta).alert('close');},timeUntilClose);
 //activez butonul de inchidere ("x"-uletul)
   $("#"+idAlerta+"-close").click(function(){
      $("#"+idAlerta).alert('close'); 
   });
   //in sfarsil afisez alarma!!!
   $("#"+idAlerta).alert();
}

//
//
/**
* 
*   Returneaza id-ul disponibil adaugand un nr la numele dat ca parametru 
*   pana gaseste unul care nu e luat.
   Utila cand creez elemente dinamic... 
 * @param {String} theID
 * @returns {String} id-ul disponibil
 *  */
function AvailableID(theID)
{
    if (!($('#'+theID)[0]))
        return theID;
   var i=0;
    while ($('#'+theID+i)[0])
        {
            i++;
        } 
    return theID+''+i;
}
/** 
 * Creeaza un buton cu o adresa de redirectare (de fapt un link cu forma de buton)
 * @param {String} returnTo         Adresa de redirectare
 * @param {String} idContainer      parintele in care sa creeze butonul 
 * @param {String} text             textul butonului
 * @param {String} icon             daca e dat pune o iconita ca sa fie cat mai sugestiv 
 *                                          (numele iconului trebuie dat fara "icon-" )
 * @param {String} HPos             unde sa puna butonul pe orizontala    : "left"/"right"/""
 * @param {String} VPos             unde sa puna butonul pe verticala     : "top"/"bottom"
 * @param {String} IconPos          unde sa fie iconita pozitionata       : "left"/"right"
 * @param {String} additionalClass  
 * @param {String} aditionalAttr    
 *  */
function InsertRedirectButton(returnTo,idContainer,text,icon,HPos,VPos,IconPos,additionalClass,aditionalAttr)
{
 icon=icon||'';   
 HPos=HPos||'';
 additionalClass=additionalClass||'';
 aditionalAttr=aditionalAttr||'';
 VPos=VPos||'top';
 IconPos=IconPos||'left';
 if (icon!=='')
     icon='icon-'+icon;
 if (HPos!=='')
     HPos='pull-'+HPos;
 var htmlComponenta='<div class=" '+HPos+' '+additionalClass+'" '+aditionalAttr+'>'+
                                    '<div class="btn-group  '+HPos+'">'+
                                         '<a href="'+returnTo+'" class="btn">';
                                 
    if (IconPos==='left')
        htmlComponenta+=                             
                                             '<i class="'+icon+'"></i>'+
                                             '<span> '+text+' </span>';
    else
       if (IconPos==='right')
            htmlComponenta+=                                       
                                             '<span> '+text+' </span>'+
                                             '<i class="'+icon+'"></i>';
       else
          htmlComponenta+=                   '<span> '+text+' </span>'; 
    htmlComponenta+=
                                         '</a>'+
                                    '</div>'+         
                                 '</div>';
                         console.log(htmlComponenta);
 if (VPos==='bottom')
    $("#"+idContainer).append(htmlComponenta);
 else
    if (VPos==='top')
        $("#"+idContainer).prepend(htmlComponenta);  
}

//
//Extinfdere la functia din script_slide.js X USE
$.fn.toggleLoadingPage=function(directionTo,animationTime,page,loadingFunction){
    //console.log(this);
    directionTo=directionTo||"left";
   //var theContainer=this;//$("#"+$(this).attr('toggle-container'));
   var thePage;
   var indexActiv;
    var nextIndex;
    if (page)
        {
            thePage=page;
        }
   else
   //pentru butoane de stanga/dreapta
       {
         indexActiv=parseInt(this.children("[class*='active']")
                .attr("tabindex")); 
        if (directionTo==="right")
            {
                if (indexActiv===this.minTabIndex())
                    {
                      nextIndex=this.maxTabIndex();  
                    }
                else
                    nextIndex=indexActiv-1;
            }
         else
             if (directionTo==="left")
             {
                 if (indexActiv===this.maxTabIndex())
                    {
                      nextIndex=this.minTabIndex();  
                    }
                else
                    nextIndex=indexActiv+1;
             }                 
         thePage=this.children("[tabindex='"+nextIndex+"']");
       }
     //sa faca efectul automat in functie de tabindex
     if (directionTo==="auto")
     {
          indexActiv=parseInt(this.children("[class*='active']")
                .attr("tabindex")); 
        nextIndex=parseInt(thePage.attr("tabindex"));
        if (indexActiv<nextIndex)
            directionTo="left";
        else
         if (indexActiv>nextIndex)
             directionTo="right";
     }
       var transfLeftBefore;
       var transfLeftAfter;
       //aici se poate schimba efectul
       if (directionTo==="left")
           {
               
               transfLeftBefore="-1000px";
               transfLeftAfter="1000px";
           }
      else
          if (directionTo==="right")
              {
               transfLeftBefore="1000px";
               transfLeftAfter="-1000px";   
              }
//console.log(directionTo);
        this.children('[class*="active"]').
                css({display:"inline"}).
                removeClass("active").
                //slide
                animate({left:transfLeftBefore,
                            opacity:0},animationTime,
               function(){
                   //ascunde
                   $(this).hide();
                    var callbacks = $.Callbacks();
                    callbacks.add(loadingFunction);
                    callbacks.fire();
                    callbacks.add(function(){
                        this.css({left:transfLeftAfter,
                                        display:"inline"
                                }).
                           addClass("active").
                           animate({left:"0px",
                                    opacity:1},animationTime);
                    });
                    callbacks.fire();
                    
        });

};

//---------------------------------------
//---------------Data si timp------------
/**
 * Format dd.MM.yyyy
 * @type String Data formatata
 */
function GetCurentDate(){
    var currentTime = new Date();
var month = currentTime.getMonth() + 1;
if (month<10) 
    month='0'+month;
var day = currentTime.getDate();
if (day<10) 
    day='0'+day;
var year = currentTime.getFullYear();
var theString=day+'.'+month+'.'+year;
    //var d=new Date();
    return theString;
        } 
/**
 * 
 * Format hh:mm
 * 
 * @param {bool} roundToHalf Daca trebuie sa returneaze timpul aproximat la "si jumate" sau "la fix" 
 * @type String Timpul formatat
 */
function GetCurrentTime(roundToHalf){
    roundToHalf=roundToHalf||false;
    var currentTime= new Date();
    var hour=currentTime.getHours();
    var min=currentTime.getMinutes();
    var theString="";
    if (roundToHalf)
        {
            if ((min>0)&&(min<=15))
                min=0;
            else
              if ((min>15)&&(min<=45))
                min=30;
              else  
                  if ((min>45))
                      {
                        min=0;
                        hour++;
                      }
        }
        if (String(hour).length<2)
            hour="0"+hour;
        if (String(min).length<2)
            min="0"+min;
     theString+=hour+":"+min;   
     return theString;
}

// !!! DateTimePicker sunt impartite in 
//      "boot-date-picker"  ->  doar pt data  
      /*<div id="container-ID" class="input-append boot-date-picker">
   <input  type="text" data-format="dd.MM.yyyy" id="input-ID" default-date="now">
    <span class="add-on">
     <i data-time-icon="icon-time" data-date-icon="icon-calendar">
     </i>
   </span>
  </div>*/
//      si 
//      "boot-time-picker"  -> doar pt timp
  /*      <div id="container-oreActivitate"class="input-append boot-time-picker">
           <input type="text" data-format="hh:mm" id="input-oreActivitate" default-time="01:00">
              <span class="add-on">
                <i data-time-icon="icon-time" data-date-icon="icon-time">
                </i>
              </span>
           </div>*/
/* "default-date" : - "now" pt data curenta
 *                  -  data pt initializare de obicei "dd.MM.yyyy"*/
/* "default-time" : - "now" pt ora curenta
 *                  - "now-round" pt ora rotunjita la "si jumate" 
 *                  -  timp pt initializare de obicei "hh:mm"*/

function ResetDateTimePicker(idElem)
{
    if (idElem===undefined)
        {
          $(".boot-date-picker").each(function(){
              //alert($(this).children('input').attr("default-date"));
            var attr=$(this).children('input').attr("default-date");
             if (typeof attr !== 'undefined' && attr !== false)
                 {
                     if ((String(attr).toLowerCase()==='now'))
                     {
                        $(this).children('input').val(GetCurentDate()); 
                     }
                     else
                      $(this).children('input').val(attr);   
                 }
            });  
            $(".boot-time-picker").each(function(){
                //alert($(this).children('input').attr("default-time"));
                var attr=$(this).children('input').attr("default-time");
                 if (typeof attr !== 'undefined' && attr !== false)
                     {
                         if ((String(attr).toLowerCase()==='now'))
                         {
                            $(this).children('input').val(GetCurrentTime()); 
                         }
                         else
                          if ((String(attr).toLowerCase()==='now-round'))
                              {
                                 $(this).children('input').val(GetCurrentTime(true));
                              }
                          else
                             $(this).children('input').val(attr);  
                     }

             }); 
        }
    else
        {
         if ($("#"+idElem).hasClass('.boot-date-picker'))
             {
                var attr=$("#"+idElem).attr("default-date");
                 if (typeof attr !== 'undefined' && attr !== false)
                     {
                         if ((String(attr).toLowerCase()==='now'))
                         {
                            $("#"+idElem).val(GetCurentDate()); 
                         }
                         else
                          $("#"+idElem).val(attr);   
                     } 
                 }
        else
            if ($("#"+idElem).hasClass('.boot-time-picker'))
                {
                    var attr=$("#"+idElem).attr("default-time");
                 if (typeof attr !== 'undefined' && attr !== false)
                     {
                         if ((String(attr).toLowerCase()==='now'))
                         {
                            $("#"+idElem).val(GetCurrentTime()); 
                         }
                         else
                          if ((String(attr).toLowerCase()==='now-round'))
                              {
                                 $("#"+idElem).val(GetCurrentTime(true));
                              }
                          else
                             $("#"+idElem).val(attr);  
                     }
                }
        }
}

/**
 * Trebuie pus la inceputul documentului (sau la incarcarea paginii curente) pentru 
    activarea componentei
 * 
 */
//parametrii si atributele componentei sunt explicate mai sus :)
function ActivateDateTimePicker(deleteOthers)
{
    if(typeof(deleteOthers)==="undefined")
        deleteOthers=true;
    //sterg toate widgeturile create pana acum
    if (deleteOthers)
        $(".bootstrap-datetimepicker-widget").remove();   
//pune la inceput data din "default-date" sau data curenta daca textul e "now"
$(".boot-date-picker").each(function(){
   var attr=$(this).children('input').attr("default-date");
    if (typeof attr !== 'undefined' && attr !== false)
        {
            if ((String(attr).toLowerCase()==='now'))
            {
               $(this).children('input').val(GetCurentDate()); 
            }
            else
             $(this).children('input').val(attr);   
        }
    //face atat containerul cat si input-ul disabled daca e deja unul din ele 
    if ($(this).children('input').is(":disabled"))
        $(this).attr("disabled","disabled");
    if ($(this).is(":disabled"))
       $(this).children('input').prop("disabled",true);  
});
 $(".boot-date-picker").each(function(){
     //nu-l activeaza daca e disabled
     if (!$(this).attr("disabled"))
         $(this).datetimepicker({
            pickTime: false
          });
 });
 $(".boot-time-picker").each(function(){
   var attr=$(this).children('input').attr("default-time");
    if (typeof attr !== 'undefined' && attr !== false)
        {
            if ((String(attr).toLowerCase()==='now'))
            {
               $(this).children('input').val(GetCurrentTime()); 
            }
            else
             if ((String(attr).toLowerCase()==='now-round'))
                 {
                    $(this).children('input').val(GetCurrentTime(true));
                 }
             else
                $(this).children('input').val(attr);  
        }
   //face atat containerul cat si input-ul disabled daca e deja unul din ele 
    if ($(this).children('input').is(":disabled"))
        $(this).attr("disabled","disabled");
    if ($(this).is(":disabled"))
       $(this).children('input').prop("disabled",true); 
});  
$(".boot-time-picker").each(function(){
    //nu-l activeaza daca e disabled
     if (!$(this).attr("disabled"))
         $(this).datetimepicker({
            pickSeconds: false,
      pickDate: false
          });
 });

/*.on('changeDate', 
            function(ev){
                $(".boot-time-picker").datetimepicker("hide");
            }
        );*/   
}
/**
* Activeaza butonul "+" care ascunde/afiseaza facturile pe clientul respectiv
 *  */
// !!!! SE APELEAZA DIN FBUtils.php DUPA GENERAREA TABELULUI DE FACTURI EMISE/ OUTSTANDING / INCASARI !!!
//este de forma
/* <button class="btn btn-mini pull-right btn-toggle-detalii-fct"><i class="icon-plus"></i></button>*/
//iar randurile ascunse de el sunt cele dupa el 
//!!!! care au clasa "detalii-fact-cl", clasa "hidden-elem" pt a fi ascunse si atributul "cl-row" 
//  care e la fel cu "cl-row" al randului cu clientul cu aceste facturi
/* <tr class="rand-tabel rand-progress" cl-row="$nr_randCL">*/
function ActivateToggleBtnDetaliiFacturi()
{
    $(".btn-toggle-detalii-fct").each(function(){
        $(this).attr("title","Detalii");
        var randCL=$(this).parent('td').parent('tr');
        var nrRandCl=randCL.attr('cl-row');
        var theBtn=$(this);
        $(this).on("click",function(){
            $(randCL).siblings('tr[cl-row='+nrRandCl+']').each(function(){
               if ($(this).hasClass('hidden-elem'))
               {
                   $(this).removeClass('hidden-elem');
                   theBtn.children('i').removeClass('icon-plus');
                   theBtn.children('i').addClass('icon-minus');
               }
               else
                   {
                   $(this).addClass('hidden-elem');
                   theBtn.children('i').addClass('icon-plus');
                   theBtn.children('i').removeClass('icon-minus');
                    }
            });
        });
    });
}

//---------------------------------------
//------------Inca in teste--------------

 function isScrolledIntoView(elem)
    {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
//---------------------------------------