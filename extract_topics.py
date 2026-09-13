import re
import json

with open('routes/web.php', 'r', encoding='utf-8') as f:
    web = f.read()

topics = re.findall(r"'topic'\s*=>\s*'([^']+)'", web)
names = re.findall(r"'name'\s*=>\s*'([^']+)'", web)

print("Unique topics:", len(set(topics)))
for t in set(topics):
    print("TOPIC:", t)

print("\nUnique names:", len(set(names)))
for n in set(names):
    print("NAME:", n)
