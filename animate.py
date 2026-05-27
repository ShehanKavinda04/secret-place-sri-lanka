import os
import re

files_to_update = [
    'resources/js/Pages/Heritage.jsx',
    'resources/js/Pages/Transport.jsx',
    'resources/js/Pages/History.jsx',
    'resources/js/Pages/Hydraulic.jsx',
    'resources/js/Pages/Spiritual.jsx',
    'resources/js/Pages/Places.jsx',
    'resources/js/Pages/Rituals.jsx'
]

for file_path in files_to_update:
    full_path = os.path.join(r'g:\reserch project my\secret-place-sri-lanka', file_path)
    if not os.path.exists(full_path):
        continue
        
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Add import
    if "import { motion } from 'framer-motion';" not in content:
        content = content.replace("import Footer from '@/Layouts/Footer';", "import Footer from '@/Layouts/Footer';\nimport { motion } from 'framer-motion';")
        
    # Hero Banner
    content = content.replace(
        '{/* Hero Banner */}\n                <div className="relative h-64 sm:h-80 overflow-hidden">',
        '{/* Hero Banner */}\n                <motion.div \n                    initial={{ opacity: 0, y: -30 }}\n                    animate={{ opacity: 1, y: 0 }}\n                    transition={{ duration: 0.8 }}\n                    className="relative h-64 sm:h-80 overflow-hidden"\n                >'
    )
    # The end div of the hero banner is right before `{/* Introductory Info Strip */}` or `<main`
    content = re.sub(r'</div>\n\s+\{\/\* Introductory Info Strip \*\/\}', r'</motion.div>\n\n                {/* Introductory Info Strip */}', content)
    content = re.sub(r'</div>\n\s+<main', r'</motion.div>\n\n                <main', content)
    
    # Main container
    content = re.sub(
        r'<main className="(.*?)">',
        r'<motion.main \n                    initial={{ opacity: 0, y: 30 }}\n                    animate={{ opacity: 1, y: 0 }}\n                    transition={{ duration: 0.8, delay: 0.3 }}\n                    className="\1"\n                >',
        content
    )
    content = re.sub(r'</main>\n\s+<Footer', r'</motion.main>\n\n                <Footer', content)
    
    # History.jsx has specific structure that might differ:
    if 'History.jsx' in full_path:
        # History.jsx left sidebar
        content = re.sub(
            r'<aside className="(.*?)">',
            r'<motion.aside \n                        initial={{ opacity: 0, x: -30 }}\n                        animate={{ opacity: 1, x: 0 }}\n                        transition={{ duration: 0.8, delay: 0.4 }}\n                        className="\1"\n                    >',
            content
        )
        content = content.replace('</aside>', '</motion.aside>')
        
        # main content area
        content = re.sub(
            r'<section className="flex-1 min-w-0 bg-white border border-slate-200/60 shadow-sm rounded-xl overflow-hidden flex flex-col">',
            r'<motion.section \n                        initial={{ opacity: 0, x: 30 }}\n                        animate={{ opacity: 1, x: 0 }}\n                        transition={{ duration: 0.8, delay: 0.4 }}\n                        className="flex-1 min-w-0 bg-white border border-slate-200/60 shadow-sm rounded-xl overflow-hidden flex flex-col"\n                    >',
            content
        )
        content = re.sub(r'</section>\n\s+</motion.main>', r'</motion.section>\n                </motion.main>', content)

    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated files with framer-motion!')
