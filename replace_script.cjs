const fs = require('fs');

// Process CraftCategory.jsx
let catCode = fs.readFileSync('resources/js/Pages/CraftCategory.jsx', 'utf8');
catCode = catCode.replace("import { useState } from 'react';", "import { useState } from 'react';\nimport { categoryDatabase } from '../data/craftsDatabase';");
catCode = catCode.replace(/const categoryDatabase = \{[\s\S]*?\n    \};\n/, '');
catCode = catCode.replace('<img src="/images/crafts/banner.png" alt="Artisan working" className="w-full h-full object-cover object-center" />', '<img src={currentCat.banner || "/images/crafts/banner.png"} alt={currentCat.title || "Artisan working"} className="w-full h-full object-cover object-center" />');
fs.writeFileSync('resources/js/Pages/CraftCategory.jsx', catCode);

// Process CraftItem.jsx
let itemCode = fs.readFileSync('resources/js/Pages/CraftItem.jsx', 'utf8');
itemCode = itemCode.replace("import { useState } from 'react';", "import { useState } from 'react';\nimport { getProductById } from '../data/craftsDatabase';");

const oldProductRegex = /\/\/ Mocking the specific product details[\s\S]*?subImages: \[\n.*?\n.*?\n.*?\n.*?\n\s*\]\n\s*\};\n/;

const newProductCode = `const fetchedProduct = getProductById(itemId);
    const product = fetchedProduct ? {
        ...fetchedProduct,
        description: fetchedProduct.description || "An exquisite piece of Sri Lankan heritage, carefully crafted by master artisans.",
        features: fetchedProduct.features || ["Authentic craftsmanship", "Locally sourced materials"],
        mainImage: fetchedProduct.image,
        subImages: fetchedProduct.subImages || [fetchedProduct.image],
        reviewsCount: fetchedProduct.reviewsCount || 124
    } : {
        id: itemId,
        title: "Traditional Wooden Mask",
        subtitle: "Hand-carved and painted mask, depicting ancient Sri Lankan folklore.",
        price: "Rs. 4,500.00",
        rating: 4.8,
        reviewsCount: 124,
        description: "This exquisite traditional wooden mask is hand-carved by master artisans in Anuradhapura using locally sourced Kaduru wood. These masks are historically used in healing rituals (Kolam and Thovil) and traditional dances. Each vibrant color is carefully applied by hand, representing different characters from Sri Lankan mythology. It serves as a beautiful wall hanging that brings cultural heritage and protection into your home.",
        features: [
            "Hand-carved from sustainable Kaduru wood",
            "Painted with traditional, vibrant colors",
            "Dimensions: 14\\" x 8\\" x 4\\"",
            "Ready to hang with an attached loop on the back"
        ],
        mainImage: "/images/woodcraft.png",
        subImages: [
            "/images/woodcraft.png",
            "/images/crafts/stone_elephant.png",
            "/images/crafts/pillar.png",
            "/images/crafts/guardstone.png"
        ]
    };\n`;

itemCode = itemCode.replace(oldProductRegex, newProductCode);
fs.writeFileSync('resources/js/Pages/CraftItem.jsx', itemCode);
console.log('Done replacing');
