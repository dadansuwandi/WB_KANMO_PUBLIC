//$(document).ready(function () {
//    console.log("ready...")
/*
Code 1 System Aux
Code 2 Istirahat
Code 3 Eskalasi
Code 4 Briefing
Code 5 Outgoing call
Code 6 Isi form
Code 7 Rest Room
Code 8 Sholat
Code 9 System Error
Code 0 Aux System
*/


//});
var myVarX;
var myVarY;
var urlUidesk='https://pelni.uidesk.id/crm/apps/WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo';

// $(document).ready(function(){
//     $("#submitData").click(function(){
//         // Your data to be sent in the POST request
        
//         // jQuery POST request
//         /*$.post("https://crm.uidesk.id/roatex/apps/WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo?TrxID=2024-03-04&TrxUserName=2024-03-04&TrxAction=UIDESK128", postData, function(data, status){
//             // Handle the response here
//             console.log("Data: " + ("#date1").val() + "\nStatus: " + status);
//         });*/
//         console.log("date1: " + $("#date1").val().replace('T', ' ') + "\ndate2: " + $("#date2").val().replace('T', ' '));
//         fetchData($("#date1").val().replace('T', ' '),$("#date2").val().replace('T', ' '));
//     });
// });

function myFunction() {
 
  // myVarX = setInterval(fetchData, 80000);
   myVarY = setInterval(agentList, 8000);

  //calloutbound staffedoutbound auxagent waiting acdin avail callabdn callanswer

  //------------------------
  getDateTime();

   SLA();
   GetSShData();
   fetchDataAgent();
   fetchDataTotalEmail();
   fetchDataKelola();
   fetchDataTotalAux();
   
   
 

  //------------------------

  
}

function fetchDataTotalAux(){
var aarayagent=[];
  
  //var selectedValue = value;
    $.ajax({
        type: "POST",
        url: "https://pelni.uidesk.id/crm/apps/WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo",
        data: "{TrxID:'', TrxUserName: '', TrxAction: 'AuxData'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

          var json = JSON.parse(data.d);
          dataAgent=json;
          var i, x, resultSourceEnquiryReason = "";
          console.log(json);
          
          var table = '<table class="table table-light table-striped">';
          // Membuat baris header
          table += '<tr>' +                                               
         '<th scope="col">Nama Agent</th>'+
                                            '<th scope="col">Status</th>'+
                                             '<th scope="col">Login Time</th>'+
                                            '<th scope="col">Prayer</th>'+
                                            '<th scope="col">Lunch</th>'+
                                            '<th scope="col">Short Break</th>'+
                                            '<th scope="col">Meeting</th>'+
                                            '<th scope="col">Training</th>'+
                                            '<th scope="col">Friday Pray</th>'+
                                            '<th scope="col">Toilet</th>'+
											'<th scope="col">FollowUp</th>'+
											'<th scope="col">Ready</th>'+
         
          '</tr>';
          // Loop melalui setiap objek dalam respons dan menambahkan baris untuk setiap objek
          

          for (i = 0; i < json.length; i++) {
            aarayagent.push(json[i].AuxUserName);

           
              table += '<tr>';
              table += '<td>' + json[i].AuxUserName + '</td>';
              table += '<td>Aux</td>';
              // table += '<td>' + json[i].HandleMarket + '</td>';
              table += '<td> 00:00:00 </td>';
              table += '<td>' + json[i].Prayer + '</td>';
              table += '<td>' + json[i].Lunch + '</td>';
              table += '<td>' + json[i].ShortBreak + '</td>';
              table += '<td>' + json[i].Meeting + '</td>';
              table += '<td>' + json[i].Training + '</td>';
			  table += '<td>' + json[i].FridayPray + '</td>';
			    table += '<td>' + json[i].Toilet + '</td>';
				 table += '<td>' + json[i].FollowUp + '</td>';
				  table += '<td>' + json[i].Ready + '</td>';
              table += '</tr>';
			  
			  
          
          
          // Menutup tabel HTML
         
        }
        table += '</table>';
          
        $('#table-container').html(table);


        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        },
        complete: function(xhr, status) {
          
       listAgentCall(aarayagent);
        }
        
    })
}


function searchArray(searchString, array) {
 

  var lowerCaseSearchString = searchString.toLowerCase();

  // Use filter to find matching items
  var results = array.filter(function(item) {
      return item.toLowerCase().includes(lowerCaseSearchString);
  });

  // Return the results
  return results;
}
function GetdataChart(){
	 $('#chart').empty();
       var options = {
        series: [],
        chart: {
          type: 'bar',
          height: 430
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: [],
        },
      };
	  
	let categories = [];  
	var urlUidesk='https://pelni.uidesk.id/crm/apps/WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo';
		$.ajax({
      type: "POST",
      url: urlUidesk,
     data: "{TrxID:'', TrxUserName: '"+$('#calltotal').html()+"', TrxAction: 'UIDESK204'}",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {

          var json = JSON.parse(data.d);
		  
		  
		json.forEach(function(item) {
    
			if (!Array.isArray(item.data)) {
				// Convert the data property to an array

				item.data = [item.data];
			}
			categories.push(item.name);
		});
		  
			
		  var options = {
          series: json,
          chart: {
          type: 'bar',
          height: 430
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: ['Total Data'],
        },
		colors: ['#64b8ed', '#FFd700', '#C13584','#25D366']
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
          
             

        }
      

      
      
	 })
	
	
}




			  
function listAgentCall(Agent){
 

  if (Agent.length == 0){
      listCallZero();
  }else{
    listCallNotZero(Agent);

  }


	

}

async function listCallNotZero(Agent) {
  let body = ""; // Store HTML content

  try {
    // Fetch agent and peer data concurrently
    const [agentData, peerDataResponse] = await Promise.all([
      $.getJSON("BE/getssh_listagent_que.php"),
      $.getJSON("BE/getDataPeers.php"),
    ]);

    const peers = peerDataResponse.sip_peers; // Extract peers from response
    console.log(agentData, peers);

    // Iterate over peers and match with agent data
   for (const [key, peer] of Object.entries(peers)) {
    const ext = key.split("/")[0]; // Extract extension from peer key
    const matchingAgent = agentData.find(agent => agent.local == ext);

    if (matchingAgent) {
        $('#table-container tr').each(function() {
            const firstColumnData = $(this).find('td').eq(0).text();

            if (matchingAgent.statuscall === "Ready") {
                const matchedAgent = agentData.find(agent =>
                    agent.name.toLowerCase().includes(firstColumnData.toLowerCase())
                );

			//if (matchedAgent && matchedAgent.statuscall.toLowerCase() === "ready" || }) {
                    $(this).find('td').eq(1).text(matchingAgent.statuscall);
                    $(this).find('td').eq(2).text(secondsToTime(matchingAgent.callstaken));
                }
            //}
        });
    }
}

    // Wrap the rows in <tbody> and update the HTML content
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function listCallZero(){
  var jqxhr = $.getJSON("BE/getssh_listagent_que.php", function (data) {
  
    $.getJSON("BE/getssh_listagent_que.php", function(data) {
      // Keep track of unique names
      const processedNames = new Set();
      let NoUrutanAvail = 1; // Initialize with your starting value
      
      
      var table = '<table class="table table-dark table-striped">';
      // Membuat baris header
      table += '<tr>' +                                               
      
	   '<th scope="col">Nama Agent</th>'+
                                            '<th scope="col">Status</th>'+
                                             '<th scope="col">Login Time</th>'+
                                            '<th scope="col">Prayer</th>'+
                                            '<th scope="col">Lunch</th>'+
                                            '<th scope="col">Short Break</th>'+
                                            '<th scope="col">Meeting</th>'+
                                            '<th scope="col">Training</th>'+
                                            '<th scope="col">Friday Pray</th>'+
                                            '<th scope="col">Toilet</th>'+
											'<th scope="col">FollowUp</th>'+
											'<th scope="col">Ready</th>'+
     
      '</tr>';
     
     
      $.each(data, function(i, items) {
          console.log(items.name);
          console.log(items.lastcalltime);
       
        
          if (items.statuscall === "Ready" || items.statuscall === "Ringing" || items.statuscall.toLowerCase() === "incall" ) {
  
          
         
            table += '<tr>';
            table += '<td>' + items.name + '</td>';
            table += '<td>  '+ items.statuscall + ' </td>';
            table += '<td> '+ secondsToTime(items.callstaken) + ' </td>';
            table += '<td> 00:00:00 </td>';
            table += '<td> 00:00:00 </td>';
            table += '<td> 00:00:00 </td>';
            table += '<td> 00:00:00 </td>';
            table += '<td> 00:00:00 </td>';  
            table += '<td> 00:00:00 </td>';  
            table += '<td> 00:00:00 </td>';  
            table += '<td> 00:00:00 </td>';  
            table += '<td> 00:00:00 </td>';  
               
            table += '</tr>';
  
            table += '</table>';
        // Append the new row to the table body
            $('#table-container tbody').html(table);
         
             
        }
      
       
        //$('#table-container tr').find('td').eq(2).text('Updated Name');
       
      });
     // $('#table-container tr').eq(2).find('td').eq(4).text('Updated Name');
  
      
      });
  
        
      
    
  
    })
    .done(function () {
     
           
      
    })
    .fail(function () {
      //console.log( "error" );
    })
    .always(function () {
      
      //console.log( "complete" );
    });
}
function secondsToTime(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var secs = seconds % 60;

  // Format dengan leading zero jika diperlukan
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  secs = (secs < 10) ? '0' + secs : secs;

  return hours + ':' + minutes + ':' + secs;
}
function secondsToHHMMSS(totalSeconds) {
  var hours   = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds % 3600) / 60);
  var seconds = totalSeconds % 60;

  // Add leading zeros if needed
  hours   = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  return hours + ':' + minutes + ':' + seconds;
}



async function SLA(){
  var currentDate = new Date();
  var day = currentDate.getDate();

  
    var jqxhr = await $.getJSON("BE/getsummary_v2.php", function (data) {
        $.each(data["DataDetail"], function (i, items) {
                  
            
           
            //$('#calltotal').html(items['Total Call'][day]);
            $('#callanswer').html(items['Call Answered'][day]);
			if (items['Abnd. Ringing'] == undefined)
				$('#callabdn').html('0');
			else
			 $('#callabdn').html(parseInt(items['Abnd. Ringing'][day])+  parseInt(items['ivr terminated'][day])  );
			  if($('#callabdn').html() == 0)
				  
			 // items['Total Call'][day]
				$('#calltotal').html(parseInt(items['Total Call'][day]));
			  else
				$('#calltotal').html(parseInt(items['Total Call'][day]));
           if ( items['Service Level'][day] == undefined)
			   $('#valueVoip').html(0);
		   else
			   
		   var voip=  parseFloat(items['Call Answered'][day])/parseFloat($('#calltotal').html())*100
            $('#valueVoip').html(voip.toFixed(2)+' %');
			 var ahtCall = (parseFloat(items['Call Answered'][day]) / parseInt(items['Total Call'][day])) * 100

			 $('#callAht').html(voip.toFixed(2) +'%');
           
           
        });
        })
        .done(function () {
          //console.log( "done" );
          
        })
        .fail(function () {
          //console.log( "error" );
        })
        .always(function () {
          //console.log( "complete" );
        });
}

function fetchDataAgent(){

    $.ajax({
      type: "POST",
      url:urlUidesk,
      data: "{TrxID:'', TrxUserName: '', TrxAction: 'UIDESK202'}",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {

          var json = JSON.parse(data.d);
          var i, x, resultSourceEnquiryReason = "";
          console.log(json);
          for (i = 0; i < json.length; i++) {
           
            switch(json[i].label) {
              case 'Email':
                $("#emailagent").html(json[i].Jumlah);
                
                  break;
              case 'Wa':
                  $("#waagent").html(json[i].Jumlah);
                  break;
                
                case 'Ig':
                  $("#igagent").html(json[i].Jumlah);
                  break;
                
               default:
                $("#emailagent").html(0);
                $("#igagent").html(0);
                $("#waagent").html(0);
            }
           
            

          }

      },
      error: function (xmlHttpRequest, textStatus, errorThrown) {
          console.log(xmlHttpRequest.responseText);
          console.log(textStatus);
          console.log(errorThrown);
      }
  })

 
}
function GetSShData(){
  var jqxhr = $.getJSON("BE/getSla.php", function (data) {
    

    var availCount = 0;
    var auxCount = 0;
    var acdIN = 0;
    
    $.each(data["DataDetail"], function (i, items) {
       
	   
	   var storedDataAUX = localStorage.getItem('DATAAUX');
    $('#callagent').html(items.READY);
    // $('#calltotal').html(items.Total);
    // $('#callanswer').html(items.ACDIN);
    // $('#callQue').html(items.QUE);
    // $('#callabdn').html(items.ABANDON);
    // $('#valueVoip').html(items.SERVICE_LEVEL +" %");
	
	var Timeinsecond =timeToSeconds(items.TALKING);
	// var aht=0;
	// // if (items.Total !=  0){
		// // aht = (Timeinsecond/items.Total)* 100;
		// // var _aht = aht.toFixed(2);
	// // var __aht=secondsToHHMMSS(_aht);
	// //alert();
	// //$('#callAht').html(__aht.split('.')[0]);

	// }else{
		// //$('#callAht').html(0);
	// }
	
		var currentDateTime = new Date();
            var hours = currentDateTime.getHours();
            var minutes = currentDateTime.getMinutes();
            var seconds = currentDateTime.getSeconds();

            // Add leading zeros to minutes and seconds
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
         
		   if (hours == '23' && minutes == '59'){
			   
			   var urlUidesk='https://pelni.uidesk.id/crm/apps/WebServiceGetDataMaster.asmx/UIDESK_TrmMasterCombo';
							$.ajax({
						  type: "POST",
						  url: urlUidesk,
						 data: "{TrxID:'"+$('#valueVoip').html()+"', TrxUserName: '"+$('#callAht').html()+"', TrxAction: 'GETSLA'}",
						  contentType: "application/json; charset=utf-8",
						  dataType: "json",
						  success: function (data) {
								var json = JSON.parse(data.d);
							  
							}
      
			})
			   
		   }
			   console.log("test" + hours + ':' + minutes);
		   
		  
         //   var currentTime = hours + ":" + minutes + ":" + seconds;
	
        
    });
    
   
  })
    .done(function () {
      //console.log( "done" );
      
    })
    .fail(function () {
      //console.log( "error" );
    })
    .always(function () {
      //console.log( "complete" );
    });

  // Perform other work here ...

  // Set another completion function for the request above
  jqxhr.always(function () {
    //console.log( "second complete" );
  });

  
}
function convertTimeString(timeString) {
    // Split the time string by the period to remove milliseconds
    return timeString.split('.')[0];
}
function timeToSeconds(time) {
    // Split the time string into components
    const parts = time.split(':');
    let seconds = 0;

    // Depending on the number of parts, calculate total seconds
    if (parts.length === 3) { // HH:MM:SS
        seconds += parseInt(parts[0]) * 3600; // Hours to seconds
        seconds += parseInt(parts[1]) * 60;   // Minutes to seconds
        seconds += parseInt(parts[2]);        // Add remaining seconds
    } else if (parts.length === 2) { // MM:SS
        seconds += parseInt(parts[0]) * 60;   // Minutes to seconds
        seconds += parseInt(parts[1]);        // Add remaining seconds
    } else if (parts.length === 1) { // Just seconds
        seconds += parseInt(parts[0]);        // Add remaining seconds
    }

    return seconds;
}
function fetchDataTotalEmail(){
  
  $("#TotalAnsweredEmail").html(0);
  $("#TotalIncomingEmail").html(0);
  $("#TotalQueEmail").html(0);
  $("#TotalAbnEmail").html(0);
  $("#TotalNotResponseEmail").html(0);
    var lastvoip;
  var lastomni;


  $.ajax({
      type: "POST",
      url: urlUidesk,
      data: "{TrxID:'', TrxUserName: '', TrxAction: 'UIDESK200'}",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {

          var json = JSON.parse(data.d);
          var i, x, resultSourceEnquiryReason = "";
          console.log(json);
          for (i = 0; i < json.length; i++) {

            console.log(json[i].Jenis);
            console.log(json[i].Jumlah);
            if(json[i].Jenis == "TotalEmail"){
              $("#emailtotal").html(json[i].Jumlah);
            }else if(json[i].Jenis == "AnsweredEmail"){
              $("#emailanswer").html(json[i].Jumlah);
            }else if(json[i].Jenis == "NotResponseEmail" ){
              $("#emailwait").html(json[i].Jumlah);
            }else if(json[i].Jenis == "FRT"){
              $("#emailfrt").html(json[i].Jumlah);
            }else if(json[i].Jenis == "EmailLastWaiting"){
              $("#EmailLast").html(json[i].Jumlah);
            }
			else if(json[i].Jenis == "LastValueVoip"){
				lastvoip =json[i].Jumlah;
             // $("#lastvalueVoip").html(json[i].Jumlah);
            }
			else if(json[i].Jenis == "LastValueOmni"){
				lastomni=json[i].Jumlah;
             // $("#lastvalueOmni").html(json[i].Jumlah);
            }
             
			 

        }
		
        var LasttotalSla = (parseFloat(lastvoip) +parseFloat(lastvoip))/2 ;
        $("#lastvalueVoip").html(lastvoip +'%');
        $("#lastvalueOmni").html(lastomni + '%');
        $("#lastvalueAll").html(LasttotalSla + '%');
      
		
        var totalEmails = parseFloat($("#emailtotal").html());
        var answeredEmails = parseFloat($("#emailanswer").html());
        
        //var aht = (answeredEmails !== 0) ? (  answeredEmails/totalEmails) * 100 : 0;
        //var igaht = (answeredEmails !== 0) ? (  answeredEmails/totalEmails) * 100 : 0;
        
        //$("#emailaht").html(aht);
        

      },
      error: function (xmlHttpRequest, textStatus, errorThrown) {
          console.log(xmlHttpRequest.responseText);
          console.log(textStatus);
          console.log(errorThrown);
      }
  })
}
function fetchDataKelola(){
  //Lc
  $("#lctotal").html(0);
  $("#lcreply").html(0);
  $("#lcwait").html(0);

    //Lc
    $("#fbtotal").html(0);
    $("#fbreply").html(0);
    $("#fbwait").html(0);


  $.ajax({
      type: "POST",
      url: urlUidesk,
      data: "{TrxID:'UideskIndonesia', TrxUserName: '', TrxAction: 'UIDESK201'}",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {

          var json = JSON.parse(data.d);
          var i, x, resultSourceEnquiryReason = "";
          console.log(json);
          for (i = 0; i < json.length; i++) {

          
            //Ig
            if(json[i].label == "Total" && json[i].type =='Ig'){
              $("#igtotal").html(json[i].Jumlah );
            }else if(json[i].label == "Reply" &&  json[i].type =='Ig'){
              $("#igreply").html(json[i].Jumlah);
            }else if(json[i].label == "queue" && json[i].type =='Ig'){
              $("#igwait").html(json[i].Jumlah);
            }else if(json[i].label == "close" && json[i].type =='Ig'){
              $("#igend").html(json[i].Jumlah);
            }else if(json[i].label == "last" && json[i].type =='Ig'){
              $("#IgLast").html(json[i].Jumlah);
            }

            //wa
            if(json[i].label == "Total" && json[i].type =='Wa'){
              $("#watotal").html(json[i].Jumlah );
            }else if(json[i].label == "Reply" && json[i].type =='Wa'){
              $("#wareply").html(json[i].Jumlah );
            }else if(json[i].label == "queue" && json[i].type =='Wa'){
              $("#wawait").html(json[i].Jumlah);
            }else if(json[i].label == "close" && json[i].type =='Wa'){
              $("#waend").html(json[i].Jumlah);
            }else if(json[i].label == "last" && json[i].type =='Wa'){
              $("#WaLast").html(json[i].Jumlah);
            }
        }
		
		 
		  var igTotal = (parseFloat($("#igend").html()) / parseFloat($("#igtotal").html())) * 100;
		
		   var waTotal = (parseFloat($("#waend").html()) / parseFloat($("#watotal").html())) * 100;
		      var emailTotal = (parseFloat($("#emailanswer").html()) / parseFloat($("#emailtotal").html())) * 100;
	
		 
       	  	$("#igaht").html(isNaN(igTotal)?RoundingAngka(100):RoundingAngka(igTotal));
			$("#waaht").html(isNaN(waTotal)?RoundingAngka(100):RoundingAngka(waTotal));
			$("#emailaht").html(isNaN(emailTotal)?RoundingAngka(100):RoundingAngka(emailTotal));
			  var waTotal1 = isNaN(waTotal) ? RoundingAngka(100) :RoundingAngka(waTotal);
			   var igTotal1 = isNaN(igTotal)? RoundingAngka(100) :RoundingAngka(igTotal);
			    var emailTotal1 = isNaN(emailTotal) ? RoundingAngka(100) :RoundingAngka(emailTotal);
			 
			
			var TotalOmni = ( parseFloat(waTotal1)+ parseFloat(igTotal1) +parseFloat(emailTotal1) )/3;
			
			$('#valueOmni').html(RoundingAngka(TotalOmni));
			//$('#valueVoip').html
			
			var all =parseFloat($("#valueVoip").html())+ TotalOmni;
			$('#valueAll').html(RoundingAngka(all/2));
        

      },
      error: function (xmlHttpRequest, textStatus, errorThrown) {
          console.log(xmlHttpRequest.responseText);
          console.log(textStatus);
          console.log(errorThrown);
      }
  })
}
function RoundingAngka(angka) {
   
   // Kalikan dengan 100, lalu bulatkan, kemudian bagi dengan 100
    var hasil = (Math.round(angka * 100) / 100).toFixed(2);
    // Ubah hasil menjadi string
    var hasilString = hasil.toString();
    // Periksa jika hasil terakhir adalah 00, maka hapus
    if (hasilString.endsWith('.00')) {
        return hasilString.substring(0, hasilString.length - 3)+"%";
    }
    return hasilString +"%";
}



function storeUserData(fieldName,userData) {
  // Convert the data to a JSON string
  var jsonString = JSON.stringify(userData);

  // Store the data in local storage under the key 'user'
  localStorage.setItem(fieldName, jsonString);

  console.log('Data stored in local storage successfully.');
}

function secondsToHHMMSS(totalSeconds) {
  var hours   = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds % 3600) / 60);
  var seconds = totalSeconds % 60;

  // Add leading zeros if needed
  hours   = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  return hours + ':' + minutes + ':' + seconds;
}
function convertDate(dateString) {
    const milliseconds = parseInt(dateString.replace(/\/Date\((\d+)\)\//, '$1'));
    return new Date(milliseconds);
}
function sortByNumericPropertyAsc(array, propertyName) {
  return array.sort(function (a, b) {
    return b[propertyName] - a[propertyName];
  });
}
function getTopRows(array, n) {
  return array.slice(0, n);
}
function secondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds =  Math.round(seconds % 60);
    
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
    if (isNaN(formattedMinutes)) formattedMinutes = 0;
    if (isNaN(formattedSeconds)) formattedSeconds = 0;

    return `${formattedMinutes}:${formattedSeconds}`;
}

function chartPie(){
  // Retrieve data from local storage under the key 'user'
  var storedDataAUX = localStorage.getItem('DATANOTREADY');
  var storedDataACDIN = localStorage.getItem('DATAACDIN');
  var storedDataREADY = localStorage.getItem('DATAAVAIL');
  var storedDataQUE = localStorage.getItem('DATAQUE');
  var options={
    chart: {
        height: 365,
        type: "pie"
    },
    plotOptions: {
        pie: {
            donut: {
                size: "70%"
            }
        }
    },
    dataLabels: {
        formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            const value = opts.w.config.series[opts.seriesIndex]
            return [name, value]
          }
    },
    series: [storedDataQUE, storedDataAUX, storedDataACDIN],
    labels: ["QUE", "AUX", "ACD IN"],
    colors: ["#EB1616", "#C7EB16", "#164FEB"],
    legend: {
        show: false,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: !1,
        fontSize: "14px",
        offsetX: 0
    }
  };
  var chart = new ApexCharts(document.querySelector("#chart-donut"), options);
  chart.render();
}


// Function to update chart data
function updateChartData() {
  // Generate new random data
  var newData = [];
  /*for (var i = 0; i < pieData.series.length; i++) {
      newData.push(Math.floor(Math.random() * 100) + 1);
  }*/
  
// Define initial chart data
var storedDataACDIN = parseInt(localStorage.getItem('DATAACDIN'));
var storedDataAUX = parseInt(localStorage.getItem('DATANOTREADY'));
var storedDataREADY = parseInt(localStorage.getItem('DATAAVAIL'));
var pieData = {
  series: [storedDataACDIN, storedDataAUX, storedDataREADY],
  labels: ["ACD IN", "NOT READY", "AVAIL"]
};

// Define chart options
var pieOptions = {
  chart: {
    height: 365,
    type: "pie"
  },
  labels: pieData.labels,
  dataLabels: {
    formatter(val, opts) {
        //const name = opts.w.globals.labels[opts.seriesIndex]
        const value = opts.w.config.series[opts.seriesIndex]
        //return [name, value]
          const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, value]
      }
},
  series: pieData.series,
  colors: ["#309E43", "#F20F3C", "#160FF2"],
    legend: {
        show: false,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: !1,
        fontSize: "14px",
        offsetX: 0
    },
  responsive: [{
      breakpoint: 480,
      options: {
          chart: {
              width: 200
          },
          legend: {
              position: 'bottom'
          }
      }
  }]
};


// Create the pie chart
var pieChart = new ApexCharts(document.querySelector('#chart-donut'), pieOptions);

// Render the chart
pieChart.render();
 // var storedDataACDIN = parseInt(localStorage.getItem('DATAACDIN'));
  //var storedDataAUX = parseInt(localStorage.getItem('DATANOTREADY'));
  //var storedDataREADY = parseInt(localStorage.getItem('DATAAVAIL'));
  //var storedDataQUE = parseInt(localStorage.getItem('DATAQUE'));
  
  newData.push(storedDataACDIN);
  newData.push(storedDataAUX);
  newData.push(storedDataREADY);



  console.log(newData);
  // Update chart series with new data
  pieChart.updateSeries(newData);
}



String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours + ':' + minutes + ':' + seconds;
}
function blink(selector){
  $(selector).fadeOut('slow', function(){
      $(this).fadeIn('slow', function(){
          blink(this);
      });
  });
}

function agentList() {
    getDateTime();
	 SLA();
  GetSShData();
  fetchDataAgent();
  fetchDataTotalEmail();
  fetchDataKelola();
  fetchDataFRTAndAHT();
  fetchDataTotalAux();
   
   
}

function fetchDataFRTAndAHT(){

    $.ajax({
      type: "POST",
      url:urlUidesk,
      data: "{TrxID:'', TrxUserName: '', TrxAction: 'UIDESK203'}",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {

          var json = JSON.parse(data.d);
          var i, x, resultSourceEnquiryReason = "";
          console.log(json);
          for (i = 0; i < json.length; i++) {
            // $("#emailaht").html(json[i].AHTEmail);
			  $("#emailfrt").html(json[i].FRTEmail);
			  $("#fbfrt").html(json[i].FRTFb);
			   //$("#fbaht").html(json[i].AHTFb);
			   $("#igfrt").html(json[i].FRTIg);
			   //$("#igaht").html(json[i].AHTIg);
			   $("#wafrt").html(json[i].FRTWa);
			   //$("#waaht").html(json[i].AHTWa);
			   $("#lcfrt").html(json[i].FRTLc);
			   //$("#lcaht").html(json[i].AHTLc);
			    
          
            

          }

      },
      error: function (xmlHttpRequest, textStatus, errorThrown) {
          console.log(xmlHttpRequest.responseText);
          console.log(textStatus);
          console.log(errorThrown);
      }
  })
}
function getDateTime() {
  var today = new Date();
  let hours = today.getHours(); // get hours
  let minutes = today.getMinutes(); // get minutes
  let seconds = today.getSeconds(); //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  var time = hours + ":" + minutes + ":" + seconds;
  var today = new Date();
  var dateNya = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNya + ' ' + time;
  var divTimenya = $('#timeNya');
  var divDateNya = $('#dateNya');

  var months = new Array(12);
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";

  var current_date = new Date();
  current_date.setDate(current_date.getDate() + 0);
  month_value = current_date.getMonth();
  day_value = current_date.getDate();
  year_value = current_date.getFullYear();
  divTimenya.empty();
  divTimenya.append(time);
  divDateNya.empty();
  divDateNya.append(months[month_value] + " " + day_value + ", " + year_value);
}