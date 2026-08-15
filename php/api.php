<?php
/**
 * Remix: GoGirl API - PHP Backend
 * Transcribed from original Node.js/Vite full-stack solution.
 * Handles AI chat conversations directly with Google Gemini Models.
 */

// Enable CORS for frontend verification
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight options request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Only support POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "error" => "Method Not Allowed",
        "message" => "Please submit a POST request with JSON message payload."
    ]);
    exit;
}

// Receive and clean raw JSON inputs
$rawInput = file_get_contents("php://input");
$inputData = json_decode($rawInput, true);

$message = isset($inputData['message']) ? trim($inputData['message']) : '';
$history = isset($inputData['history']) ? $inputData['history'] : [];

if (empty($message)) {
    http_response_code(400);
    echo json_encode(["error" => "Bad Request", "message" => "The input field 'message' is required."]);
    exit;
}

// Load Gemini API Key from environment or .env helper file
$apiKey = getenv('GEMINI_API_KEY');

// Read from workspace active dot env files if server configuration doesn't bind env
if (!$apiKey && file_exists(__DIR__ . '/../.env')) {
    $envLines = file(__DIR__ . '/../.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($envLines as $line) {
        if (strpos(trim($line), '#') === 0) continue; // Skip comments
        $parts = explode('=', $line, 2);
        if (count($parts) === 2) {
            $name = trim($parts[0]);
            $val = trim($parts[1]);
            // Strip any wrapping quotes from variables
            if (preg_match('/^["\'](.*)["\']$/', $val, $matches)) {
                $val = $matches[1];
            }
            if ($name === 'GEMINI_API_KEY') {
                $apiKey = $val;
                break;
            }
        }
    }
}

// Fallback to mock key with helpful alert if not present
if (!$apiKey) {
    $apiKey = "MOCK_KEY_FOR_LOCAL_PLAY";
}

// Map client chat history format into Google Gemini API expectations
$formattedContents = [];

if (!empty($history) && is_array($history)) {
    foreach ($history as $h) {
        if (!isset($h['role']) || !isset($h['content'])) continue;
        
        $roleMapped = ($h['role'] === 'assistant') ? 'model' : 'user';
        $formattedContents[] = [
            'role' => $roleMapped,
            'parts' => [
                ['text' => $h['content']]
            ]
        ];
    }
}

// Append current active question from user
$formattedContents[] = [
    'role' => 'user',
    'parts' => [
        ['text' => $message]
    ]
];

$systemInstruction = "You are 'Millu', an intelligent, elegant, empathetic, and witty AI companion integrated directly inside Go Girl (a verified female-only community application designed for women in Gurgaon, India). Your primary mission is to empower, assist, guide, and protect women as they navigate safe event meetups, cafe crawls, active movement sessions (like Pilates/yoga), coworking hubs, and travel safety plans. When asked for safety advice, suggest practical tips (using the app's Safety Hub, automatic location broadcasting with emergency guardians, and verified meetups). When asked about cafes, dining, or spots, mention actual pleasant areas in Gurgaon (Sector 50, Sector 53, DLF CyberHub, Galleria, Golf Course Road, etc.). When asked about fun/icebreaker ideas, provide creative, elegant, and non-generic answers. Keep your tone sisterly, warm, highly supportive, confident, and professional. Avoid corporate boilerplate phrases.";

$requestPayload = [
    'contents' => $formattedContents,
    'systemInstruction' => [
        'parts' => [
            ['text' => $systemInstruction]
        ]
    ],
    'generationConfig' => [
        'temperature' => 0.7
    ]
];

// Target Model (matches server.ts model)
$modelName = "gemini-3.5-flash";
$geminiApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/{$modelName}:generateContent?key=" . urlencode($apiKey);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $geminiApiUrl);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'User-Agent: GoGirl-PHP-Bridge'
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestPayload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$result = curl_exec($ch);
$httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($result === false) {
    http_response_code(500);
    echo json_encode([
        "error" => "Service Connection Timeout",
        "message" => "An error occurred while calling the AI model gateway.",
        "details" => $curlError
    ]);
    exit;
}

if ($httpStatusCode >= 400) {
    // Return appropriate feedback from endpoint
    http_response_code($httpStatusCode);
    $apiErrorResponse = json_decode($result, true);
    
    // Check if the mock key tripped the endpoint
    if ($apiKey === "MOCK_KEY_FOR_LOCAL_PLAY") {
        echo json_encode([
            "error" => "Missing Gemini API Key",
            "text" => "Hey there! I am Millu, your sisterly guide! 💖 To enable real AI brainpower, please configure your `GEMINI_API_KEY` in the environment or active `.env` file. In the meantime, I'm excited to greet you! Ask me anything, and keep your adventure in Gurgaon safe and fun! ✨"
        ]);
        exit;
    }
    
    echo json_encode([
        "error" => "API Gateway Return Code " . $httpStatusCode,
        "details" => $apiErrorResponse ?: $result
    ]);
    exit;
}

$decodedResponse = json_decode($result, true);
$replyText = "I'm sorry, I couldn't process that query. Let's try again! ✨";

if (isset($decodedResponse['candidates'][0]['content']['parts'][0]['text'])) {
    $replyText = $decodedResponse['candidates'][0]['content']['parts'][0]['text'];
}

echo json_encode(["text" => $replyText]);
?>
