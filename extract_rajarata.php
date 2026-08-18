<?php

$file = 'C:\\Users\\Shehan Kavinda\\.gemini\\antigravity-ide\\brain\\dd5bdadb-6215-401f-9318-7941854de013\\.system_generated\\steps\\485\\content.md';
$content = file_get_contents($file);

preg_match_all('/https:\/\/[^\s"\'<>]+\.bstatic\.com\/xdata\/images\/hotel\/[^\s"\'<>]+/i', $content, $matches);

$urls = [];
foreach ($matches[0] as $u) {
    $u = html_entity_decode($u);
    if (!in_array($u, $urls)) {
        $urls[] = $u;
    }
}

echo "Found " . count($urls) . " bstatic URLs for Rajarata Hotel:\n";
print_r($urls);
