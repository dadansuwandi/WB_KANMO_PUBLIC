<?php
include('Net/SSH2.php');
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
//error_reporting(E_ALL);
$key = "Uid35k32!J4y4J4y4";
$ssh = new Net_SSH2('pbx.pelni.uidesk.id', 3389);
if (!$ssh->login('root', $key))
    exit('Login Failed');

// Execute command to get SIP peers
$getSIPPeers = $ssh->exec('sudo asterisk -x "sip show peers"');

// Check if command execution was successful
if ($getSIPPeers === false) {
    exit(json_encode(['error' => 'Command execution failed']));
}

// Process the output to filter peers
$lines = explode("\n", trim($getSIPPeers));
$peers = [];

foreach ($lines as $line) {
    // Match lines that contain peer information
    if (preg_match('/^(\S+)\s+(\S+)\s+(.*OK.*)$/', $line, $matches)) {
        $peerName = $matches[1];
        $status = $matches[3];
        $peers[$peerName] = ['status' => $status];
    }
}

// Output the filtered list of SIP peers as JSON
header('Content-Type: application/json');
echo json_encode(['sip_peers' => $peers]);
?>