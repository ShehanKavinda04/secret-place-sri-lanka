<?php
function translateSinhala($sinhalaText) {
    $url = "http://127.0.0.1:5001/translate";
    $data = json_encode(["text" => $sinhalaText]);
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
    $response = curl_exec($ch);
    
    if (curl_errno($ch)) {
        curl_close($ch);
        return ["error" => "Translation service eka available na"];
    }
    
    curl_close($ch);
    return json_decode($response, true);
}
?>