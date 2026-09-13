# encoding: utf-8
import json
import re

with open('scratch_extracted_spots.json', 'r', encoding='utf-8') as f:
    spots_data = json.load(f)

# Let's inspect each spot's blueprint and narrative to make sure our script can map them all
print("Spots to process:", list(spots_data.keys()))
