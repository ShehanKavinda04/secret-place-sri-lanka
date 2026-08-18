const fs = require('fs');
const path = 'resources/js/Pages/Accommodations.jsx';
let content = fs.readFileSync(path, 'utf8');

// Function injection: Add formatPrice helper if not exists
if (!content.includes('const formatPrice = (amount) =>')) {
    content = content.replace(
        'export default function Accommodations({ auth, reviews = [], policy, addons = [], roomsProp = [], estateDetail = {}, accommodations = [] }) {',
        `export default function Accommodations({ auth, reviews = [], policy, addons = [], roomsProp = [], estateDetail = {}, accommodations = [] }) {\n    const formatPrice = (amount) => new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(amount);`
    );
}

// ListingView price replacements
content = content.replace(/\$\{prop\.price\}/g, '{formatPrice(prop.price)}');
content = content.replace(/\$2500 \/ night/g, 'LKR 750,000 / night');
content = content.replace(/\$300/g, 'LKR 90,000');
content = content.replace(/\$1,400/g, 'LKR 420,000');
content = content.replace(/\$2,500\+/g, 'LKR 750,000+');

// Wishlist
content = content.replace(/\$\{item\.accommodation\.price_per_night \|\| 2400\}/g, '{formatPrice(item.accommodation.price_per_night || 720000)}');

// Room price in list
content = content.replace(/\$\{room\.price\}/g, '{formatPrice(room.price)}');

// Addon price
content = content.replace(/\+\$\{addon\.price\}/g, '+{formatPrice(addon.price)}');

// DetailView reservation panel
content = content.replace(/\$\{rooms\[roomType\]\.price\} \</g, '{formatPrice(rooms[roomType].price)} <');
content = content.replace(/\$\{rooms\[roomType\]\.price\} ×/g, '{formatPrice(rooms[roomType].price)} ×');

content = content.replace(/\$\{total\}/g, '{formatPrice(total)}');
content = content.replace(/\$\{fee\}/g, '{formatPrice(fee)}');
content = content.replace(/\-\$\{savings\}/g, '-{formatPrice(savings)}');
content = content.replace(/\$\{grandTotal\}/g, '{formatPrice(grandTotal)}');
content = content.replace(/\$\{total \+ Math\.round\(total \* 0\.1\)\}/g, '{formatPrice(total + Math.round(total * 0.1))}');

// Food menu
content = content.replace(/\$\{item\.price\}/g, '{formatPrice(item.price)}');
content = content.replace(/\$\{totalPrice\}/g, '{formatPrice(totalPrice)}');

// Transit map prices
content = content.replace(/'\$45'/g, "'LKR 13,500'");
content = content.replace(/'\$15'/g, "'LKR 4,500'");
content = content.replace(/'\$25'/g, "'LKR 7,500'");

// Update FOOD_MENU prices
content = content.replace(/price: 95,/g, 'price: 28500,');
content = content.replace(/price: 110,/g, 'price: 33000,');
content = content.replace(/price: 140,/g, 'price: 42000,');
content = content.replace(/price: 85,/g, 'price: 25500,');
content = content.replace(/price: 420,/g, 'price: 126000,');
content = content.replace(/price: 35,/g, 'price: 10500,');

// Food menu component helper injection if we need formatPrice there too
// Wait, Accommodations has subcomponents. Subcomponents can't access `formatPrice` from the main component!
// Better approach: Let's define `formatPrice` OUTSIDE the main component.
content = content.replace('export default function Accommodations', "const formatPrice = (amount) => new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(amount);\n\nexport default function Accommodations");

// Remove the one inside Accommodations if we added it
content = content.replace(`    const formatPrice = (amount) => new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(amount);\n`, '');

fs.writeFileSync(path, content);
console.log('JSX prices formatted to LKR!');
