with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('"\n,\n        "Filter":', '",\n        "Filter":')

with open('resources/js/translations.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Fixed comma syntax in translations.js')
