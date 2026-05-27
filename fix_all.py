import glob
import re

files = glob.glob(r'g:\reserch project my\secret-place-sri-lanka\resources\js\Pages\*.jsx')

for f in files:
    if 'History.jsx' in f or 'Welcome' in f or 'Dashboard' in f or 'AboutUs' in f:
        continue

    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Revert all motion.div
    content = content.replace('<motion.div', '<div')
    content = content.replace('</motion.div>', '</div>')
    
    # Re-apply Hero banner opening
    content = content.replace(
        '{/* Hero Banner */}\n                <div \n                    initial={{ opacity: 0, y: -30 }}\n                    animate={{ opacity: 1, y: 0 }}\n                    transition={{ duration: 0.8 }}\n                    className="relative h-64 sm:h-80 overflow-hidden"\n                >',
        '{/* Hero Banner */}\n                <motion.div \n                    initial={{ opacity: 0, y: -30 }}\n                    animate={{ opacity: 1, y: 0 }}\n                    transition={{ duration: 0.8 }}\n                    className="relative h-64 sm:h-80 overflow-hidden"\n                >'
    )
    
    # Re-apply Hero banner closing tag
    # It might be before an Info Strip, or before <motion.main
    # Since we use regex, we can match it accurately
    content = re.sub(r'</div>\n\s+\{\/\* (.*?) Info Strip \*\/\}', r'</motion.div>\n\n                {/* \1 Info Strip */}', content)
    
    # If there was no Info Strip, the closing tag is before <motion.main
    # We only want to replace the </div> before <motion.main IF the file doesn't have an Info Strip
    if 'Info Strip' not in content:
        content = re.sub(r'</div>\n\s+<motion.main', r'</motion.div>\n\n                <motion.main', content)

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f'Fixed {f}')
