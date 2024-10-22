<?php
 include('Net/SSH2.php');
  ini_set('display_errors', 0);
  ini_set('display_startup_errors', 0);

$key ="Uid35k32!J4y4J4y4";
  $ssh1 = new Net_SSH2('103.186.31.140',3389);   
  if (!$ssh1->login('root', $key))   exit('Login Failed'); 

//$mysqli = new mysqli("103.149.177.137:3306","root","Uid35k32!Uid35k32!J4y4!","qstats");
//$mysqli = new mysqli("pbx.pelni.uidesk.id","root","Uid35k32!J4y4J4y4","qstats");



$outputArray = ['DataDetail' => []];


    // Fetch data for the current queue number
    $memberData = $ssh1->exec("sudo asterisk -x 'queue show'");
    $rows = explode("\n", $memberData);

    // Initialize counters for each queue
    $queueId = null;
    $in_ready_count = 0;
    $in_call_count = 0;
    $in_callwait_count = 0;
    $in_unavailable_count = 0;
    $talking_count = 0; 
    $abandoned_count = 0; 
    $total_calls = 0; 
    $service_level = 0;
    $talkTime = 0;

    foreach ($rows as $row) {
        // Detect a new queue and save the previous one
        if (preg_match('/^(\d+)\s+has/m', $row, $matches)) {
            // If we have a previous queue, save its data
            if ($queueId !== null) {
                

                $outputArray['DataDetail'][] = array(
                    'ID' => $queueId,
                    'ACDIN' => $in_call_count,
                    'QUE' => $in_callwait_count,
                    'READY' => $in_ready_count,
                    'UNAVAILABLE' => $in_unavailable_count,
                    'TALKING' => $talking_count,
                    'ABANDON_RATE' => number_format($abandon_rate, 2),
                    'SERVICE_LEVEL' => number_format($service_level, 2)
                );
            }

           
            $queueId = $matches[1];
            $in_call_count = 0;
            $in_callwait_count = 0;
            $in_ready_count = 0;
            $in_unavailable_count = 0;
            $talking_count = 0; 
            $abandoned_count = 0; 
            $total_calls = 0; 
			$answer = 0; 
        }

        // Count statuses for the current queue
		// Check for total calls in the queue
		// if (preg_match('/(\d+) calls/', $row, $matches)) {
			// $in_call_count = (int)$matches[1]; // Add to total calls
		// }
      if (preg_match('/C:(\d+)/', $row, $ans_matches)) {
				$in_call_count = intval($ans_matches[1]); // Extract and convert answered calls to integer
		}
    
		// if (preg_match('/abandoned\s+(\d+)/', $row, $a_matches)) {
			// $abandoned_count = intval($a_matches[1]);
		// }
		if (preg_match('/A:(\d+)/', $row, $a_matches)) {
        $abandoned_calls = intval($a_matches[1]);
    }
		
		if (preg_match('/W:(\d+)/', $row, $w_matches)) {
			$in_callwait_count = intval($w_matches[1]); // Extract and convert waiting calls to integer
		}
		
		
        if (preg_match('/Not in use/', $row)) {
            $in_ready_count++;
        }
        if (preg_match('/Unavailable/', $row)) {
            $in_unavailable_count++;
        }
        if (preg_match('/(\d+)s talktime/', $row, $talk_matches)) {
			$talkTime = intval($talk_matches[1]);
            $seconds = intval($talk_matches[1]);
            $hours = floor($seconds / 3600);
            $minutes = floor(($seconds % 3600) / 60);
            $seconds %= 60;
            $seconds %= 60;
            $talking_count = sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
        }
		
        // if (preg_match('/\(abandoned\)/', $row)) {
            // $abandoned_count++;
        // }
		
         if (preg_match('/SL\s*:\s*(\d+\.\d+)%/', $row, $sl_matches)) {
             $service_level = floatval($sl_matches[1]);
         }
		
		 $total_calls = $in_callwait_count + $in_call_count + $abandoned_calls;
	     $abandon_rate = $total_calls > 0 ? ($abandoned_calls / $total_calls) * 100 : 0;
		 
		

		 
		 



        // Increment total calls
       // $total_calls++;
    }

    // After looping through all rows, save the last queue data if it exists
    if ($queueId !== null) {
      //  $abandon_rate = $total_calls > 0 ? ($abandoned_count / $total_calls) * 100 : 0;

        $outputArray['DataDetail'][] = array(
            'ID' => $queueId,
			'Total'=>$total_calls,
            'ACDIN' => $in_call_count,
            'QUE' => $in_callwait_count,
            'READY' => $in_ready_count,
            'UNAVAILABLE' => $in_unavailable_count,
            'TALKING' => $talking_count,
            'ABANDON' => $abandoned_calls,
            'SERVICE_LEVEL' => number_format($service_level, 2)
        );
    }


// Encode the output as JSON
$myJSON = json_encode($outputArray, JSON_PRETTY_PRINT);
echo $myJSON;

 
?>
	
   
