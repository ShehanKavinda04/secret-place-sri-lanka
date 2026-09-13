import re
import json

with open('routes/web.php', 'r', encoding='utf-8') as f:
    web = f.read()

# Let's extract all spots from $spotsData
# Find the start of $spotsData
pos = web.find('$spotsData = [')
end = web.find('];\n\n        if (!isset', pos)
if end == -1:
    end = web.find('];\n        if (!isset', pos)
if end == -1:
    end = web.find('];', pos)

spots_code = web[pos:end]

# Extract spot IDs
spot_ids = re.findall(r"'([a-z0-9\-_]+)'\s*=>\s*\[", spots_code)
# filter out non-spot keys like 'gallery'
spot_ids = [s for s in spot_ids if s != 'gallery']
print(f"Total unique spot IDs: {len(spot_ids)}")
print(spot_ids)

# Let's parse each spot's blueprint_text and history_narrative
spots_dict = {}
for i, sid in enumerate(spot_ids):
    s_start = spots_code.find(f"'{sid}' => [")
    if s_start == -1:
        s_start = spots_code.find(f'"{sid}" => [')
    
    # find next spot start
    if i + 1 < len(spot_ids):
        next_sid = spot_ids[i+1]
        s_end = spots_code.find(f"'{next_sid}' => [", s_start)
        if s_end == -1:
            s_end = spots_code.find(f'"{next_sid}" => [', s_start)
    else:
        s_end = len(spots_code)
        
    s_chunk = spots_code[s_start:s_end]
    
    # Extract blueprint_text
    bp = None
    if "'blueprint_text' => <<<'EOD'" in s_chunk:
        bp_s = s_chunk.find("'blueprint_text' => <<<'EOD'\n") + len("'blueprint_text' => <<<'EOD'\n")
        bp_e = s_chunk.find("\nEOD", bp_s)
        bp = s_chunk[bp_s:bp_e]
    elif "'blueprint_text' => '" in s_chunk:
        bp_s = s_chunk.find("'blueprint_text' => '") + len("'blueprint_text' => '")
        bp_e = s_chunk.find("',", bp_s)
        bp = s_chunk[bp_s:bp_e]
    elif "'blueprint_text' => \"" in s_chunk:
        bp_s = s_chunk.find("'blueprint_text' => \"") + len("'blueprint_text' => \"")
        bp_e = s_chunk.find("\",", bp_s)
        bp = s_chunk[bp_s:bp_e]
        
    # Extract history_narrative
    hn = None
    if "'history_narrative' => <<<'EOD'" in s_chunk:
        hn_s = s_chunk.find("'history_narrative' => <<<'EOD'\n") + len("'history_narrative' => <<<'EOD'\n")
        hn_e = s_chunk.find("\nEOD", hn_s)
        hn = s_chunk[hn_s:hn_e]
    elif "'history_narrative' => '" in s_chunk:
        hn_s = s_chunk.find("'history_narrative' => '") + len("'history_narrative' => '")
        hn_e = s_chunk.find("',", hn_s)
        hn = s_chunk[hn_s:hn_e]
    elif "'history_narrative' => \"" in s_chunk:
        hn_s = s_chunk.find("'history_narrative' => \"") + len("'history_narrative' => \"")
        hn_e = s_chunk.find("\",", hn_s)
        hn = s_chunk[hn_s:hn_e]
        
    spots_dict[sid] = {
        'blueprint': bp.strip() if bp else None,
        'narrative': hn.strip() if hn else None
    }

print(f"Parsed {len(spots_dict)} spots.")
for sid, data in spots_dict.items():
    print(f"Spot: {sid:<30} | BP: {bool(data['blueprint'])} | HN: {bool(data['narrative'])}")

with open('scratch_extracted_spots.json', 'w', encoding='utf-8') as f:
    json.dump(spots_dict, f, ensure_ascii=False, indent=2)
