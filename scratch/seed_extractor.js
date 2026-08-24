import fs from 'fs';
import { categoryDatabase } from '../resources/js/Data/craftsDatabase.js';

const items = [];
for (const catKey in categoryDatabase) {
    const cat = categoryDatabase[catKey];
    if (cat.products) {
        for (const p of cat.products) {
            items.push({
                ...p,
                category_key: catKey
            });
        }
    }
}

fs.writeFileSync('../database/seeders/crafts_data.json', JSON.stringify(items, null, 2));
