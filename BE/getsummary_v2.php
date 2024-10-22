<?php
// Same as error_reporting(E_ALL);
ini_set("error_reporting", E_ALL);

// Report all errors except E_NOTICE
error_reporting(E_ALL & ~E_NOTICE);
date_default_timezone_set('GMT');


//$mysqli = new mysqli("103.149.177.137:3306","root","Uid35k32!Uid35k32!J4y4!","qstats");
$mysqli = new mysqli("pbx.pelni.uidesk.id","root","Uid35k32!J4y4J4y4","qstats");

if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}


// $sql = "SELECT qstats.reportmonthly.labelreport as lastapp,DAY(datetime) AS hari, COUNT(jumlah) AS total_data,SUM(Seconds) as Seconds from( select event,datetime,real_uniqueid as jumlah,0 Seconds from qstats.queue_stats_mv where (queue='60012' or queue='60011') 
                            // union 
                            // select 'FIXANSWERED11',calldate,recordingfile as jumlah,0 Seconds from ( select distinct 'ABANDON 1' as State,CASE WHEN NoAnswer='NO ANSWER' and Answered='ANSWERED' THEN 'TidakAbandon' WHEN NoAnswer='NO ANSWER' and Answered is null THEN 'Abandon' WHEN NoAnswer='ANSWERED' THEN 'TidakAbandon' END AS jumlah,0 Seconds,recordingfile,src,calldate from( SELECT c.src,DATE_FORMAT(c.calldate, '%Y-%m-%d') as calldate,c.uniqueid,c.recordingfile,c.disposition as NoAnswer,(select disposition from asteriskcdrdb.cdr b where b.recordingfile=c.recordingfile AND b.disposition='ANSWERED' Limit 0,1) as Answered FROM asteriskcdrdb.cdr c WHERE (c.duration-c.billsec) >=0 AND substring(c.dstchannel,1,locate('-',c.dstchannel,length(c.dstchannel)-8)-1) in ('SIP/162001','SIP/162002','SIP/162003','SIP/162004','SIP/162005','','SIP/162006','SIP/162007','SIP/162008','SIP/162009','SIP/162010','SIP/162011','SIP/162012','SIP/162013','SIP/162014','SIP/162015','SIP/162016','SIP/162017','SIP/162018') ) as a 
                            // where DATE_FORMAT(a.calldate, '%Y-%m-%d') = CURDATE() ) as b where jumlah='TidakAbandon'
                            // union 
                            // select 'FIXANSWERED',a.calldate,a.uniqueid,a.billsec as  
							// Seconds 
							// from( select recordingfile,SUM(duration) as Ringtime,calldate,uniqueid,billsec 
							// from( SELECT substring(dstchannel,1,locate('-',dstchannel,length(dstchannel)-8)-1) 
							// AS chan1,asteriskcdrdb.cdr.* FROM asteriskcdrdb.cdr WHERE (duration-billsec) >=0 HAVING 
							// chan1 in ('SIP/162001','SIP/162002','SIP/162003','SIP/162004','SIP/162005','SIP/','SIP/162006','SIP/162007','SIP/162008','SIP/162009','SIP/162010','SIP/162011','SIP/162012','SIP/162013','SIP/162014','SIP/162015','SIP/162016','SIP/162017','SIP/162018') ) as a where a.disposition='ANSWERED' group by recordingfile ) 
							// as a 
							// where Ringtime>0 
							// union 
                            
                            // select 'ABANDON 1' as event,calldate as datetime,recordingfile as jumlah,0 Seconds from ( select distinct 'ABANDON 1' as State,CASE WHEN NoAnswer='NO ANSWER' and Answered='ANSWERED' THEN 'TidakAbandon' WHEN NoAnswer='NO ANSWER' and Answered is null THEN 'Abandon' END AS jumlah,0 Seconds,recordingfile,src,calldate from( SELECT c.src,DATE_FORMAT(c.calldate, '%Y-%m-%d') as calldate,c.uniqueid,c.recordingfile,c.disposition as NoAnswer,(select disposition from asteriskcdrdb.cdr b where b.recordingfile=c.recordingfile AND b.disposition='ANSWERED' Limit 0,1) as Answered FROM asteriskcdrdb.cdr c WHERE (c.duration-c.billsec) >=0 and c.disposition='NO ANSWER' AND substring(c.dstchannel,1,locate('-',c.dstchannel,length(c.dstchannel)-8)-1) in ('SIP/162001','SIP/162002','SIP/162003','SIP/162004','SIP/162005','SIP/202020','SIP/162006','SIP/162007','SIP/162008','SIP/162009','SIP/162010','SIP/162011','SIP/162012','SIP/162013','SIP/162014','SIP/162015','SIP/162016','SIP/162017','SIP/162018') ) as a
                            // where DATE_FORMAT(a.calldate, '%Y-%m-%d') = CURDATE() ) as b where jumlah='Abandon'
                            // union 
                            // SELECT 'BUSY 1',calldate,uniqueid as jumlah,0 Seconds FROM asteriskcdrdb.cdr WHERE (duration-billsec) >=0 and disposition='BUSY' AND substring(dstchannel,1,locate('-',dstchannel,length(dstchannel)-8)-1) in ('SIP/162001','SIP/162002','SIP/162003','SIP/162004','SIP/162005','SIP/202020','SIP/162006','SIP/162007','SIP/162008','SIP/162009','SIP/162010','SIP/162011','SIP/162012','SIP/162013','SIP/162014','SIP/162015','SIP/162016','SIP/162017','SIP/162018')
                            // union 
                            // SELECT 'OUTBOUND',a.calldate,a.uniqueid,0 Seconds from( select substring(channel,1,locate('-',channel,1)-1) AS chan1, billsec, calldate,uniqueid, (time_to_sec(calldate)-(hour(calldate)*3600)+billsec)-3600 AS minute, hour(calldate) AS hour,date_format(calldate,'%Y%m%d') AS fulldate FROM asteriskcdrdb.cdr WHERE substring(channel,1,locate('-',channel,1)-1)<>'' AND (duration-billsec) >=0 HAVING chan1 IN ('SIP/162001','SIP/162002','SIP/162003','SIP/162004','SIP/162005','SIP/202020','SIP/162006','SIP/162007','SIP/162008','SIP/162009','SIP/162010','SIP/162011','SIP/162012','SIP/162013','SIP/162014','SIP/162015','SIP/162016','SIP/162017','SIP/162018') ) as a 
                            // union 
                            // select 'TOTALCALL',calldate,recordingfile as jumlah,0 Seconds from ( select distinct 'TOTALCALL' as State,NoAnswer AS jumlah,0 Seconds,recordingfile,src,calldate 
                            // from( SELECT c.src,DATE_FORMAT(c.calldate, '%Y-%m-%d') as calldate,c.uniqueid,c.recordingfile,c.disposition as NoAnswer,'aaa' as Answered FROM asteriskcdrdb.cdr c 
                            // WHERE (c.duration-c.billsec) >=0 AND substring(c.dstchannel,1,locate('-',c.dstchannel,length(c.dstchannel)-8)-1) in ('SIP/162001','SIP/162002','SIP/162003','SIP/162004','SIP/162005','SIP/202020','SIP/162006','SIP/162007','SIP/162008','SIP/162009','SIP/162010','SIP/162011','SIP/162012','SIP/162013','SIP/162014','SIP/162015','SIP/162016','SIP/162017','SIP/162018') ) as a
                            // where  DATE_FORMAT(a.calldate, '%Y-%m-%d') = CURDATE() ) as b 
                            // union 
                            
                            // select 'EARLY',curdate(),0 as jumlah,0 Seconds ) as a left outer join qstats.reportmonthly on qstats.reportmonthly.event_id=a.event WHERE datetime !='' and labelreport !='' AND (DATE_FORMAT(datetime, '%Y-%m-%d') = CURDATE()
                            // ) GROUP BY DAY(datetime),qstats.reportmonthly.labelreport ORDER BY qstats.reportmonthly.id,DAY(datetime)";

 


// $add_query="AND (datetime BETWEEN '".date('Y-m-d')." 00:00:00' AND '".date('Y-m-d')." 23:59:59')";

$sql = "SELECT
  qstats.reportmonthly.labelreport as lastapp,DAY(datetime) AS hari,
  COUNT(jumlah) AS total_data,SUM(Seconds) as Seconds from(
select event,datetime,real_uniqueid as jumlah,0 Seconds from qstats.queue_stats_mv where (queue='60012' or queue='60011') 
union
select disposition as event,calldate,uniqueid as jumlah,0 AS seconds from asteriskcdrdb.cdr where dst in ('60012','60011')
union
select 'CONNECTA' as event,calldate,uniqueid as jumlah,billsec AS seconds from asteriskcdrdb.cdr where dst in ('60012','60011')
union
select 'CALLWITHIN',datetime,real_uniqueid as jumlah,0 Seconds from qstats.queue_stats_mv where (queue='60012' or queue='60011') and event in ('COMPLETECALLER','COMPLETEAGENT') and ringtime <=20
union
select 'ENTERQUEUENEW',calldate,uniqueid as jumlah,0 Seconds from asteriskcdrdb.cdr where dst in ('60012','60011') and dstchannel=''
union
select a.event,a.datetime,a.uniqueid as jumlah,(SELECT g.duration FROM asteriskcdrdb.cdr g WHERE g.uniqueid = a.uniqueid and g.disposition='ANSWERED' ORDER BY uniqueid DESC LIMIT 1) AS Seconds from qstats.queue_stats_full a where a.qname in ('2','3')
union
select 'EARLY',calldate,uniqueid as jumlah,0 Seconds from asteriskcdrdb.cdr where disposition in ('NO ANSWER') and dst in ('60012','60011') and duration between '0' and '9'
union
select 'FIXANSWERED',a.calldate,a.uniqueid,a.billsec as  
							Seconds 
							from( select recordingfile,SUM(duration) as Ringtime,calldate,uniqueid,billsec 
							from( SELECT substring(dstchannel,1,locate('-',dstchannel,length(dstchannel)-8)-1) 
							AS chan1,asteriskcdrdb.cdr.* FROM asteriskcdrdb.cdr WHERE (duration-billsec) >=0 HAVING 
							chan1 in ('SIP/162001','SIP/162002','SIP/162003','SIP/162004','SIP/162005','SIP/','SIP/162006','SIP/162007','SIP/162008','SIP/162009','SIP/162010','SIP/162011','SIP/162012','SIP/162013','SIP/162014','SIP/162015','SIP/162016','SIP/162017','SIP/162018','SIP/162019','SIP/162020','SIP/162021','SIP/162022') ) as a where a.disposition='ANSWERED' group by recordingfile ) 
							as a 
							where Ringtime>0 
Union
SELECT 'TOTALCALL',calldate,uniqueid as jumlah,0 Seconds FROM asteriskcdrdb.cdr 
    WHERE  (duration-billsec) >=0 
   AND substring(dstchannel,1,locate('-',dstchannel,length(dstchannel)-8)-1)
   in ('SIP/162001','SIP/162002','SIP/162003','SIP/162004','SIP/162005','SIP/','SIP/162006','SIP/162007','SIP/162008','SIP/162009','SIP/162010','SIP/162011','SIP/162012','SIP/162013','SIP/162014','SIP/162015','SIP/162016','SIP/162017','SIP/162018','SIP/162019','SIP/162020','SIP/162021','SIP/162022')
union
select 'EARLY',+curdate(),1 as jumlah,0 Seconds
) as a left outer join qstats.reportmonthly on qstats.reportmonthly.event_id=a.event WHERE
  datetime !='' and labelreport !='' and DATE_FORMAT(a.datetime, '%Y-%m-%d') = CURDATE()
GROUP BY
  DAY(datetime),qstats.reportmonthly.labelreport
ORDER BY
  qstats.reportmonthly.urutan,DAY(datetime);";
  
  //die($sql);
$result = $mysqli->query($sql);

// Check if the query was successful
if ($result) {
    // Fetch the result set as an associative array
    $query_fetch = [];
    while ($row = $result->fetch_assoc()) {
        $query_fetch[] = $row;
    }
	
	//echo json_encode($query_fetch);
	//die();

    // Free result set
    $result->free_result();

    // Close connection
    $mysqli->close();
} else {
    echo "Error in query: " . $mysqli->error;
}

$datas = [];
$seconds = [];
foreach ($query_fetch as $key => $data) {
    $datas[$data['lastapp']][$data['hari']] = $data['total_data'] ?? 0;
    $seconds[$data['lastapp']][$data['hari']] = $data['Seconds'] ?? 0;
}
$data = [];
for ($i=date('j'); $i <= date('j'); $i++) { 
 
  $datas['Call Answered'][$i] = $datas['Call Answered'][$i] ?? 0;
$datas['Call Answered Within'][$i] = $datas['Call Answered Within'][$i] ?? 0;
  $datas['Total Call'][$i] = $datas['Total Call'][$i] ?? 0;
  $datas['Abnd. Ringing'][$i] = $datas['Abnd. Ringing'][$i] ?? 0;
  $datas['Abnd. Transfer'][$i] = $datas['Abnd. Transfer'][$i] ?? 0;
  $datas['Abnd. Queue'][$i] = $datas['Abnd. Queue'][$i] ?? 0;
  $datas['ivr terminated'][$i] = $datas['ivr terminated'][$i] ?? 0;
  $datas['early abandoned'][$i] = $datas['early abandoned'][$i] ?? 0;

  $datas['SCR'][$i] = round((($datas['Call Answered'][$i] > 0)? ($datas['Call Answered'][$i] / $datas['Total Call'][$i]) : 0), 2)*100;

  $datas['Service Level'][$i] = round((($datas['Call Answered Within'][$i] > 0)? ($datas['Call Answered Within'][$i] / ($datas['Total Call'][$i] + $datas['Abnd. Ringing'][$i])) : 0), 2)*100;

  //$datas['Service Level'][$i] = round((($datas['Call Answered Within'][$i] > 0)? ($datas['Call Answered Within'][$i] / ($datas['Total Call'][$i] - 
  //                                    $datas['Abnd. Ringing'][$i] - 
  //                                    $datas['Abnd. Transfer'][$i] -
  //                                    $datas['ivr terminated'][$i] - 
  //                                    $datas['early abandoned'][$i])) : 0), 2);
  // $datas['FTE Actual'][$i] = round((($datas['Call Answered'][$i] > 0)? ($datas['Call Answered'][$i] / ($datas['Total Call'][$i] - 
  //                                     $datas['Abnd. Ringing'][$i] - 
  //                                     $datas['Abnd. Transfer'][$i] -
  //                                     $datas['ivr terminated'][$i] - 
  //                                     $datas['early abandoned'][$i])) : 0), 2);

$datas['FTE Actual'][$i] = 0;
$aht = ($datas['Call Answered'][$i] > 0)? round(($seconds['Call Answered'][$i] ?? 0) / $datas['Call Answered'][$i], 2) : 0;
  $datas['Average Handling Time (AHT)'][$i] = $aht;
  $datas['Idle rate %'][$i] = 0;
  $datas['CSAT'][$i] = 0;

  
}
$data['DataDetail'][] = $datas;
echo json_encode($data);
?>