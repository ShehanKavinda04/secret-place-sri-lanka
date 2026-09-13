with open('routes/web.php', 'r', encoding='utf-8') as f:
    web = f.read()

pos = web.find("'abhayagiriya' => [")
end = web.find("'jetavanaramaya' => [", pos)
chunk = web[pos:end]

# Extract history_narrative
hn_start = chunk.find("'history_narrative' => <<<'EOD'\n") + len("'history_narrative' => <<<'EOD'\n")
hn_end = chunk.find("\nEOD", hn_start)
hn_text = chunk[hn_start:hn_end]

# Extract blueprint_text
bp_start = chunk.find("'blueprint_text' => '") + len("'blueprint_text' => '")
bp_end = chunk.find("',", bp_start)
bp_text = chunk[bp_start:bp_end]

print("=== BLUEPRINT TEXT ===")
print(bp_text)

print("\n=== HISTORY NARRATIVE PARAGRAPHS AND LINES ===")
paragraphs = [p.strip() for p in hn_text.split('\n\n') if p.strip()]
print(f"Total paragraphs: {len(paragraphs)}")
all_lines = []
for p_idx, p in enumerate(paragraphs):
    lines = [l.strip() for l in p.split('\n') if l.strip()]
    print(f"\n--- Paragraph {p_idx+1} ({len(lines)} lines) ---")
    for l_idx, l in enumerate(lines):
        print(f"  Line {l_idx+1}: {l}")
        all_lines.append(l)

with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    trans = f.read()

print("\n=== TRANSLATION CHECK IN SI ===")
print("Blueprint in SI:", bp_text in trans)
for l in all_lines:
    print(f"Line '{l[:40]}...' in trans: {l in trans}")

