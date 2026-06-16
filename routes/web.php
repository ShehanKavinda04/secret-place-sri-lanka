<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ForecastController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/about-us', function () {
    return Inertia::render('AboutUs', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/places', function () {
    return Inertia::render('Places', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/category/rituals', function () {
    return Inertia::render('Rituals', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/category/spiritual', function () {
    return Inertia::render('Spiritual', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/category/hydraulic', function () {
    return Inertia::render('Hydraulic', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/category/heritage', function () {
    return Inertia::render('Heritage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/category/transport', function () {
    return Inertia::render('Transport', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/places/{id}/history', function ($id) {
    $spotsData = [
        'jaya-sri' => [
            'name' => 'Jaya Sri Maha Bodhi',
            'image' => '/images/jaya_sri_maha_bodhi.png',
            'topic' => 'The oldest historically documented tree in the world, serving as the living heartbeat of Sri Lankan Buddhism.',
            'history_narrative' => 'The Jaya Sri Maha Bodhi is a sacred fig tree located in the Mahamewna Gardens, Anuradhapura, Sri Lanka. It is a sapling from the historical Sri Maha Bodhi at Bodh Gaya in India under which Buddha attained Enlightenment. It was planted in 288 BC, and is the oldest living human-planted tree in the world with a known planting date. It was brought to Sri Lanka by Sangamitta Theri, the daughter of Emperor Asoka.',
            'blueprint_text' => 'The sacred tree is planted on a high terrace about 6.5 meters (21.3 ft) above the ground and surrounded by railings. The wall was constructed during the reign of King Kirthi Sri Rajasingha to protect it from wild elephants. Multiple smaller bodhi trees known as "Parivara Bodhi" surround the central sacred tree.',
            'blueprint_image' => '/images/jaya_sri_maha_bodhi_blueprint.jpg',
        ],
        'ruwanweli' => [
            'name' => 'Ruwanwelisaya',
            'image' => '/images/ruwanweli_maha_seya.png',
            'topic' => 'A magnificent, awe-inspiring ancient stupa housing sacred relics, standing as a grand marvel of engineering and devotion.',
            'history_narrative' => <<<'EOD'
Chapter 1: The Historic Prophecy by the Malwathu Oya
The third century BCE had dawned. Arahat Mahinda Maha Thero, who had brought the light of Buddhism to the land of Lanka, was walking with King Devanampiyatissa in the royal Mahamevnawa Park. As they reached a specific spot in this tranquil garden filled with the fragrance of wild flowers, Arahat Mahinda paused for a moment. A powerful, majestic gaze emanated from his serene eyes, as if looking deep into the future.
Holding fragrant flowers in his hands, the Arahat offered eight flowers to that very spot and smiled towards the sky. Seeing this, King Devanampiyatissa asked with great reverence, "Venerable Sir, what is the reason for your smile at this spot?"
Arahat Mahinda replied in a calm, composed voice:
"Great King, this ground is no ordinary earth. It is a sacred land sanctified by the touch of the feet of the past Buddhas—Kakusandha, Konagamana, and Kassapa—where their sacred relics were enshrined. This very ground is destined in the future to hold a massive repository of the sacred bodily relics (Sarvagna Dhatu) of the Sakya Sage, Gautama Buddha. Great King, a magnificent stupa will be built here, which will be worshiped by the entire world."
Hearing this, King Devanampiyatissa’s heart overflowed with profound faith ($Saddha$). He immediately placed both hands on his head in worship and pleaded, "Venerable Sir, if so, I shall begin this great meritorious deed this very moment. Please grant me permission."
However, Arahat Mahinda shook his head and spoke:
"No, Great King. There is still a long time before this great heroic feat takes place. The honor of this deed does not belong to you. In a future era, a great leader of men named 'Dutugemunu' will be born from your lineage. He will liberate this sacred land from Tamil invasions and bring the land of Lanka under a single canopy of state. He, and he alone, will build this."
Although the King was slightly saddened that he would not have that fortune, he did not hesitate to fulfill his duty toward future generations. He immediately employed skilled stone carvers to fashion a massive stone pillar ($Gal\ Tamba$) about twelve feet tall, and had this immortal prophecy engraved upon it in clear Brahmi script, erecting it in Mahamevnawa:
"In the fifth generation from King Devanampiyatissa, a great destined king named Dutugemunu will arise, and at this exact location, he shall construct the great stupa named 'Ruwanweli'."

Chapter 2: The Immortal Inscription Uncovered by Time
One hundred and forty years passed. History unfolded exactly as Arahat Mahinda had prophesied. Prince Gemunu, arriving from Rohana, succeeded in defeating the South Indian invader King Elara, ending a great war that had lasted for thirty-two years, and unifying the island of Sri Lanka under a single parasol. He was crowned on the throne of Anuradhapura as King Dutugemunu.
Having witnessed the horrors of war, the King’s mind was constantly directed toward working for the longevity of the Buddha Sasana (the Buddhist dispensation). One day, while walking through the Mahamevnawa Park reflecting on the great meritorious works he was bound to construct, a mysterious old stone pillar rising from a overgrown thicket caught his eye.
The King immediately summoned his royal scribes and ordered them to clear the dust and moss to read the inscribed letters. The chief royal scribe began to read the passage aloud in a trembling yet overjoyed voice:
"In the fifth generation from King Devanampiyatissa, a great destined king named Dutugemunu will arise..."
Realizing that his name had been spoken by a Maha Arahat and etched into solid rock 140 years before his birth, tears of devotion streamed from King Dutugemunu's eyes. He immediately knelt on the ground and worshiped the stone pillar.
"The responsibility handed down to me by my ancestors and the Arahats is no small task. I will construct this great stupa, even at the cost of my life!" the King resolved with fierce determination.

Chapter 3: Miraculous Treasures Manifested through Merit
Although the King possessed immense resolve, he did not wish to carry out this grand construction by levying taxes or burdening his subjects. "I will not become a burden to my people who have already suffered from war," was the King’s policy. On the night he was contemplating how to procure the wealth, a series of wondrous miracles occurred, shaking the entire land of Lanka due to the power of the King’s accumulated merit.
By the blessings of the earth deities and the gods, all the raw materials required to build the great stupa surfaced simultaneously across different regions of Sri Lanka, without a single cent being taxed:
The Gold Treasure: In the village of 'Acharaviti', located a few miles from the city of Anuradhapura, gold nuggets and golden sands sprouted above the ground, splitting the earth open. Astonished villagers brought them to the royal palace.
The Silver Treasure: In a cave named 'Ambatthakola' in the Malaya region (the central highlands), a massive treasury of solid silver blocks manifested.
Copper and Gems: At dawn, gleaming copper metal and blue sapphires were discovered on the surface of the earth in the Seruwila and Tambavita areas.
Pearls and Crystals: Giant pearl oysters and precious quartz crystals were washed ashore onto the coastal beaches of Sattaratota by the ocean waves.
Unexpectedly, the royal treasury overflowed with gold, silver, pearls, and gems. Realizing that even the deities were contributing to this meritorious deed, the King immediately sent out drummers throughout the country, announcing the preparations for the auspicious stone-laying ceremony ($Mangala\ Shila\ Pratishtapana$) of the Great Stupa.

Chapter 4: The Sacrifice of the Swarnamali Tree and the Unshakable Foundation
On the site designated for the great stupa stood a massive "Ran Thel" (Kaela) tree that had existed since ancient times. A tree deity named "Swarnamali," possessing a divine form, resided there. Since the center point of the stupa fell directly on this tree, the royal artisans had no choice but to cut it down.
King Dutugemunu went to the location himself, offer fragrant incense and flowers, and addressed the deity:
"Virtuous Deity, this ground is reserved for the sacred relics of the Buddha. Please forgive me, for I must remove this tree for the longevity of the Buddha Sasana. I request you to relocate to another grove. To honor your sacrifice, I shall name this great stupa after you."
Appeased by the King's pious words, the deity joyfully left the tree and moved elsewhere. As promised by the King, from that day forward, the monument became widely known as the "Swarnamali Maha Saya."
Following this, the scientific process of laying the strongest foundation in world history began. To prevent the earth from sinking under the immense weight of the stupa and to make it earthquake-resistant, the King proceeded as follows:
1.Excavation: Depth of 7 Riyans. The ground was excavated over a massive circumference to a depth of seven riyans (more than 10 feet).
2.Stone Laying: Large Boulder Layer. Skilled artisans lined the excavated pit with massive blocks of solid granite.
3.Compaction: Elephant Compaction. To compress the stones further, elephants wore leather shoes bound to their feet and trampled the stones continuously for days to level the ground.
4.Layering Matrix: Lead and Bronze Grid. A layer of clay was placed over the stones, followed by a sheet of lead, a network of bronze meshes, and crushed resinous stones (chrysoberyl powder).
5.Finishing: Butter Clay Seal. Finally, a layer of exceptionally smooth and resilient 'butter clay' (Navanita Mattika) was applied, creating a mighty foundation engineered to stand unmoved for thousands of years.

Chapter 5: The Secret of the Water Bubble and Relics from the Naga Realm
Once the foundation was completed, a royal council was held to determine the shape of the great stupa. Many of the country's finest architects gathered. The King asked them, "In what shape will you design this stupa?" While various artisans presented different ideas, none pleased the King's heart.
Finally, an elderly, wise master builder named "Purnaka" came forward. He filled a golden bowl with crystal-clear water. Then, taking another drop of water into his hand, he let it fall gently onto the surface of the water in the bowl.
The moment the droplet hit, a breathtaking, silver-gleaming, perfectly spherical water bubble arose on the surface. The artisan looked at the King and said, "Great King, I shall build this great stupa in the shape of this bubble rising upon the water—the Bubbulakara (bubble) shape."
"Excellent! There is no better shape to illustrate the impermanence ($Anicca$) of life, which arises and passes away," said the King joyfully, presenting him with golden robes and valuable gifts before commencing the work.
As the dome ($Garbha$) of the stupa was being constructed, the monumental task of finding the sacred relics to be enshrined within was assigned to Sonuttara, a sixteen-year-old novice monk ($Samanera$) who possessed immense supernatural powers ($Iddhi$).
According to a determination made by the Buddha at the moment of His passing (Parinirvana), the largest portion of His relics (a Drona of relics) had been enshrined in a golden stupa within the Manjerika Naga Realm, where the Nagas made offerings to them.
Using his spiritual powers, Arahat Sonuttara split the earth and traveled directly to the Naga world. Although the Nagas were reluctant to part with the relics, the young Arahat used his miraculous powers to gently take the golden casket hidden by the Naga King into his palm, returning to Anuradhapura in the blink of an eye.
This was the largest enshrinement of relics ever to take place on the soil of Lanka. King Dutugemunu carried the relic casket upon his head to the relic chamber of the great stupa. There, the relics miraculously rose into the air, taking the living form of the Buddha and performing grand miracles. The entirety of Mahamevnawa reverberated with the thunderous chants of "Sadhu! Sadhu!"

Chapter 6: The Monarch’s Final Gaze and Eternal Pristine White
Following the enshrinement of the relics, work on the great stupa progressed rapidly. However, while the topmost sections—the square chamber ($Hathares\ Kotuwa$) and the spire ($Koth\ Kaerella$)—were being built, King Dutugemunu fell gravely ill. The great hero who had ruled the country for twenty-four years was reaching his final moments.
The royal physicians declared that the King had only a few hours left to live. Lying on his sickbed, the King's sole desire was: "Before I pass away, I wish to see my beloved Great Stupa fully completed."
At this poignant juncture, the King’s brother, Prince Tissa (Saddha Tissa), devised an incredibly moving and ingenious plan. He immediately summoned all the carpenters and weavers of the land and had massive white cloth sheets sewn together to drape and cover the entire dome of the stupa. Then, using bamboo and timber structures, they temporarily fabricated the upper spire, painting it in gold. He quickly created a stunning illusion showing the great stupa as completely finished.
Prince Saddha Tissa went to the King’s side and said, "Great King, arise. As you wished, the construction of the Great Stupa is fully complete."
The King’s bed was carried by soldiers to a spot facing the grand monument. King Dutugemunu opened his eyes with great effort. Beaming in pristine white amidst the rays of the setting sun, with its golden spire glittering, the sight of the Great Stupa filled the King’s heart with immeasurable joy and boundless faith. He genuinely believed the work was finished.
As the Arahats gathered around the stupa chanting protective blessings (Pirith), the King never took his eyes off the sacred monument.
"All the wars I fought were solely for the protection of the Buddha Sasana. I have no regrets now," murmured King Dutugemunu, breathing his last while gazing intently at the stupa, uttering his final words amidst shouts of Sadhu.
At that very instant, a golden chariot sent from the Tusita heaven appeared, and the King ascended into the celestial realm as a divine being.
Subsequently, Prince Saddha Tissa (now King Saddha Tissa) fully finalized the genuine stone masonry and completed the permanent golden spire of the stupa. From that day to this very era, spanning over two thousand years, the Ruwanweli Maha Seya stands unshaken—regarded as the crest-jewel of the land of Lanka and a living testament to monumental faith and ultimate devotion, revered by the entire world.
EOD
,
            'blueprint_text' => 'The Ruwanwelisaya stupa stands at a height of 103 meters (338 ft) with a circumference of 290 meters (951 ft). Its base is surrounded by a wall adorned with 1,900 relief figures of elephants, which appear to support the massive structure. The paved courtyard (Maluwa) is surrounded by four decorative gateways (Vahalkadas) pointing to the cardinal directions.',
            'blueprint_image' => '/images/ruwanweli_blueprint.jpg',
        ],
        'thuparamaya' => [
            'name' => 'Thuparamaya',
            'image' => '/images/thuparamaya_1779380449379.png',
            'topic' => 'The oldest dagoba in Sri Lanka, constructed to enshrine the sacred collarbone relic of the Buddha.',
            'history_narrative' => 'Thuparamaya is the first Buddhist temple in Sri Lanka, built during the reign of King Devanampiya Tissa (307 BC – 267 BC) immediately after the introduction of Buddhism to the island by Mahinda Thera. The king constructed the stupa to enshrine the collarbone relic (Dakunu Aku Dathu) of the Buddha, which was obtained from Emperor Asoka of India.',
            'blueprint_text' => 'The Thuparamaya stupa was originally built in the shape of a heap of paddy, but was reconstructed in a bell shape in 1842. The unique architectural feature is the Vatadage—a circular relic house built around the stupa. It originally supported a conical wooden roof, and its ruins are marked by concentric circles of elegant monolithic stone pillars.',
            'blueprint_image' => '/images/thuparamaya_blueprint.jpg',
        ],
        'abhayagiriya' => [
            'name' => 'Abhayagiriya',
            'image' => '/images/abhayagiri_1779380471030.png',
            'topic' => 'A massive monastic complex and ancient center of Buddhist scholarship, featuring a towering, majestic brick stupa.',
            'history_narrative' => 'The Abhayagiri Vihara was a major monastery site of Mahayana, Theravada and Vajrayana Buddhism. It was established in the 1st century BC by King Valagamba (Vattagamani Abhaya). It grew to become an international center of Buddhist scholarship, hosting over 5,000 monks at its peak, and maintaining close ties with ancient China, India, and Southeast Asia.',
            'blueprint_text' => 'The Abhayagiri stupa stands as one of the largest brick structures in the ancient world, reaching a height of about 75 meters (246 ft). The monastic complex includes beautiful stone carvings, guardstones (Muragala), moonstones (Sandakada Pahana), and the famous twin ponds (Kuttam Pokuna), illustrating advanced ancient water engineering.',
            'blueprint_image' => '/images/abhayagiri_blueprint.jpg',
        ],
        'jetavanaramaya' => [
            'name' => 'Jetavanaramaya',
            'image' => '/images/jetavanarama_1779380489792.png',
            'topic' => 'Once the tallest stupa in the ancient world, representing an unparalleled masterpiece of ancient Sri Lankan architecture.',
            'history_narrative' => 'The Jetavanaramaya is a stupa located in the ruins of Jetavana monastery. It was built by King Mahasen (273–301 AD) and finished by his son Sirimeghavanna. The stupa is significant in Buddhist history as it represents the tension between the Mahavihara and Abhayagiri sects. A part of a sash or belt tied by the Buddha is believed to be enshrined here.',
            'blueprint_text' => 'With a height of 122 meters (400 ft) at its construction, the Jetavanaramaya was the third tallest structure in the ancient world, behind only the Pyramids of Giza. It required approximately 93.3 million baked bricks. The foundation is dug to a depth of 8.5 meters (28 ft), resting directly on bedrock to support the colossal weight.',
            'blueprint_image' => '/images/jetavanarama_blueprint.jpg',
        ],
        'mirisawetiya' => [
            'name' => 'Mirisawetiya Stupa',
            'image' => '/images/mirisawetiya_1779380509748.png',
            'topic' => 'Built by King Dutugemunu after leaving his scepter containing Buddha relics, a symbol of profound devotion.',
            'history_narrative' => 'The Mirisawetiya Stupa was built by King Dutugemunu (161 BC – 137 BC) after defeating King Elara. According to legend, the King went to the water festival at Tissa Wewa, leaving his scepter containing a relic of the Buddha on the bank. When he returned, he found the scepter could not be moved, and recognized it as a sacred sign. He built the stupa around the scepter.',
            'blueprint_text' => 'The stupa is constructed on a large circular platform. It features beautiful ancient stone carvings on its four gateways (Vahalkadas) which are considered some of the oldest surviving stone sculptures in Anuradhapura. The dome is built with solid brickwork, surrounded by a serene courtyard.',
            'blueprint_image' => '/images/mirisawetiya_blueprint.jpg',
        ],
        'lankarama' => [
            'name' => 'Lankarama',
            'image' => '/images/lankaramaya_1779380541763.png',
            'topic' => 'An ancient stupa built by King Vattagamani Abhaya, surrounded by beautiful monolithic stone pillars and ruins.',
            'history_narrative' => 'Lankarama is a stupa built by King Vattagamani Abhaya (King Valagamba) in the 1st century BC. The king built this stupa at the place where he hid from South Indian invaders, naming it after the queen Anula. It was originally called Silasobbhakandaka Cetiya.',
            'blueprint_text' => 'Similar to Thuparamaya, Lankarama features a Vatadage design. The stupa is built on a circular platform raised above the ground, surrounded by three rows of beautiful monolithic stone pillars that once supported a wooden structure. The columns are decorated with delicate carvings of lions and dwarfs.',
            'blueprint_image' => '/images/lankarama_blueprint.jpg',
        ],
        'lovamahaprasada-1' => [
            'name' => 'Lovamahaprasada',
            'image' => '/images/lovamahaprasaya_1779380558455.png',
            'topic' => 'The Brazen Palace, an ancient multistoried building with hundreds of stone pillars, once a grand monastery.',
            'history_narrative' => 'Lovamahaprasada is a building situated between Ruwanweliseya and Jaya Sri Maha Bodhi. It is also known as the Brazen Palace because of the bronze tiles that originally covered its roof. It was built by King Dutugemunu around 155 BC as a grand chapter house (Uposathagara) for the Mahavihara monks.',
            'blueprint_text' => 'The structure originally had nine stories and could accommodate up to a thousand monks. Today, the ruins consist of a forest of 1,600 stone pillars arranged in a perfect square grid of 40x40. Each stone pillar stands about 3.5 meters (11.5 ft) high, representing the foundation of this massive multi-level timber structure.',
            'blueprint_image' => '/images/lovamahaprasada_blueprint.jpg',
        ],
        'lovamahaprasada-2' => [
            'name' => 'Lovamahaprasada',
            'image' => '/images/lovamahaprasaya_1779380558455.png',
            'topic' => 'The magnificent ruins of the Brazen Palace, standing as a testament to the grand monastic life of ancient times.',
            'history_narrative' => 'Lovamahaprasada is a building situated between Ruwanweliseya and Jaya Sri Maha Bodhi. It is also known as the Brazen Palace because of the bronze tiles that originally covered its roof. It was built by King Dutugemunu around 155 BC as a grand chapter house (Uposathagara) for the Mahavihara monks.',
            'blueprint_text' => 'The structure originally had nine stories and could accommodate up to a thousand monks. Today, the ruins consist of a forest of 1,600 stone pillars arranged in a perfect square grid of 40x40. Each stone pillar stands about 3.5 meters (11.5 ft) high, representing the foundation of this massive multi-level timber structure.',
            'blueprint_image' => '/images/lovamahaprasada_blueprint.jpg',
        ],
        'isurumuniya' => [
            'name' => 'Isurumuniya Rajamaha Viharaya',
            'image' => '/images/isurumuniya_1779380577189.png',
            'topic' => 'A beautiful rock temple famous for its exquisite ancient stone carvings, including the renowned Isurumuniya Lovers.',
            'history_narrative' => 'Isurumuniya is a rock temple situated near the Tissa Wewa. It was built by King Devanampiya Tissa in the 3rd century BC to house 500 newly ordained children. The temple is globally famous for its secular stone carvings, particularly the "Isurumuniya Lovers", "Man and Horse", and the relief carving of bathing elephants.',
            'blueprint_text' => 'The temple is built around a low rock cliff. It has a beautiful pond at the base of the rock, from which relief carvings of elephants emerge. Above the pond is a shrine room carved into the cave, and a small stupa sits on top of the rock boulder, offering panoramic views of the Royal Gardens.',
            'blueprint_image' => '/images/isurumuniya_blueprint.jpg',
        ],
        'vessagiriya' => [
            'name' => 'Vessagiriya',
            'image' => '/images/vessagiriya_monastery.png',
            'topic' => 'An ancient forest monastery complex where pious monks meditated amidst scenic, rugged rock caves and serene surroundings.',
            'history_narrative' => 'Vessagiriya is an ancient forest monastery complex built on three large rock boulders. It was established in the 3rd century BC by King Devanampiya Tissa, who built it for 500 commoners who ordained as monks. The caves contain some of the oldest Brahmi rock inscriptions in Sri Lanka, detailing gifts of caves to the Sangha.',
            'blueprint_text' => 'The complex consists of natural rock shelters modified with drip ledges to prevent rain from entering. Monks used these caves as living quarters and meditation cells. The remains of a stupa, a chapter house, and refectory buildings are scattered among the boulders, connected by ancient stone pathways.',
            'blueprint_image' => '/images/vessagiriya_blueprint.jpg',
        ],
        'srimahabodhi-malu' => [
            'name' => 'Sri Maha Bodhi Malu Vihara',
            'image' => '/images/srimaha_bodhi_malu_1779380597304.png',
            'topic' => 'A serene temple complex surrounding the sacred Bodhi tree, offering a profoundly peaceful environment for reflection.',
            'history_narrative' => 'The Sri Maha Bodhi Malu Vihara is a temple complex surrounding the sacred Mahamewna Gardens and the outer terraces of the Jaya Sri Maha Bodhi. It has been a site of continuous Buddhist worship, chanting, and meditation for over two millennia, serving as a sanctuary for pilgrims visiting the sacred tree.',
            'blueprint_text' => 'The temple grounds are arranged in a series of terraces. It features ancient stone altars, guard stones, and meditation pavilions (Pilima Ge) housing beautiful Buddha statues. The stone paths are shaded by ancient trees, creating a quiet space for spiritual reflection.',
            'blueprint_image' => '/images/srimahabodhi_malu_blueprint.jpg',
        ],
        'mihintale' => [
            'name' => 'Mihintale',
            'image' => '/images/mihintale_peak.png',
            'topic' => 'The sacred mountain peak where Buddhism was introduced to Sri Lanka, featuring ancient steps and panoramic views.',
            'history_narrative' => 'Mihintale is a mountain peak near Anuradhapura, regarded as the cradle of Buddhism in Sri Lanka. In 247 BC, King Devanampiya Tissa met Arhat Mahinda, the son of Emperor Asoka of India, on this hill while hunting. Arhat Mahinda preached the Dhamma to the king, marking the official introduction of Buddhism to the island.',
            'blueprint_text' => 'A grand stone staircase of 1,840 steps leads up to the summit of the mountain. The site features several important monuments: the Kantaka Cetiya with its beautiful stone carvings, the Ambasthala Dagoba (built where the meeting took place), the Maha Stupa on the peak, and the Aradhana Gala rock where Mahinda landed.',
            'blueprint_image' => '/images/mihintale_blueprint.jpg',
        ],
    ];

    $spotInfo = isset($spotsData[$id]) ? $spotsData[$id] : $spotsData['jaya-sri'];

    $mockSpot = [
        'id' => $id,
        'name' => $spotInfo['name'],
        'image' => $spotInfo['image'],
        'topic' => $spotInfo['topic'],
        'history_narrative' => $spotInfo['history_narrative'],
        'blueprint_text' => $spotInfo['blueprint_text'],
        'blueprint_image' => $spotInfo['blueprint_image'],
        'gallery' => array_map(function($i) use ($id) {
            return "https://picsum.photos/seed/" . crc32($id . $i) . "/800/600";
        }, range(1, 12))
    ];

    return Inertia::render('History', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'spot' => $mockSpot
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/predict-demand', [ForecastController::class, 'getLiveDemandForecast']);
Route::post('/api/predict-demand', [ForecastController::class, 'getLiveDemandForecast']);

require __DIR__.'/auth.php';
