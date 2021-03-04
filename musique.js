exports.action = (data)=>{

var path=require("path")
var chemin="C:\\Users\\Administrator\\Music"
var recursiveReadSync= require('recursive'), files 
var compteur=0

if(data.ArretMusiqueLieux=="stop"){ JarvisIASound("   ",JarvisIA.ipappel) ; return }
if(data.ArretMusiqueLieux!==undefined){ JarvisIASound("   ",data.ArretMusiqueLieux) ; return}


JarvisAskMe('quelle type de musique',function(result){

  console.log("retour askme me time      :          "+result.trim())
  var result=result.toLowerCase()
  var pathe=chemin+'\\'+result ; var listeMusique=[]

    function zz(pathe,compteur) {

      if(compteur!==0){return}
      var compteur=1

      try {   files = recursiveReadSync(pathe)} 
      catch(err){ console .log(err+" erreur de dossier"); return}
    
      var liste = []
      var len = files.length;
          
          for(var i = 0  ;i < len; i++){ 
     
             if ((files[i].search(new RegExp("\\b" + ".mp3" + "\\b","gi")) >-1)||
                 (files[i].search(new RegExp("\\b" + ".wav" + "\\b","gi")) >-1)&&
                 (files[i]!==undefined) 
             ){ liste.push(files[i]) }

          }//fin for
      console.log(liste)
      JarvisIASound(liste,data.MusiqueLieux)
      return
}//fin fnct zz


  function recursiveReaddirSync2(chemin,result,compteur) {
      var fs1 = require('fs')
      var p1 = require('path')
      var list1 = [] , files1 = fs1.readdirSync(chemin) , stats1
             
        files1.forEach(function (file1) {//console.log(file1+"******************************************")
                
           stats1 = fs1.lstatSync(p1.join(chemin, file1));//console .log(stats1 +"aaaaaaaaaaaaa")
                                           
            if(stats1.isDirectory()) {

              list1 = list1.concat(recursiveReaddirSync2(p1.join(chemin, file1),result));       
        
                if (result.search(new RegExp(file1,"gi"))>-1){
                  var path3=chemin+"\\"+file1                
                  zz(path3,compteur)
                  return false
                }
              
            }                              
       });
        
  }//fin recur2
recursiveReaddirSync2(chemin ,result,compteur ) 

return  
})//fin ask
}