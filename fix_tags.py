import glob

for f in glob.glob(r'g:\reserch project my\secret-place-sri-lanka\resources\js\Pages\*.jsx'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    open_count = content.count('<motion.div')
    close_count = content.count('</motion.div>')
    
    if close_count > open_count:
        # Find the index of the second </motion.div> (or rather, the one right before <motion.main)
        # Because we only replaced one <div className="relative h-64..."> with <motion.div>
        # Let's just fix the mismatched tag by replacing the sequence:
        # </motion.div>\n\n                <motion.main
        # with
        # </div>\n\n                <motion.main
        content = content.replace('</motion.div>\n\n                <motion.main', '</div>\n\n                <motion.main')
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f'Fixed {f}')
    else:
        print(f'Skipped {f} (open={open_count}, close={close_count})')
