<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ForecastController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\SmartPricingController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\WishlistController;

Route::get('/api/orders', [OrderController::class, 'index']);
Route::post('/api/orders', [OrderController::class, 'store']);
Route::get('/api/wishlists', [WishlistController::class, 'index']);
Route::post('/api/wishlists/toggle', [WishlistController::class, 'toggle']);

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

Route::get('/category/accommodations', function () {
    return Inertia::render('Accommodations', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'reviews' => \App\Models\Review::latest()->get(),
        'policy' => \App\Models\EstatePolicy::first(),
        'addons' => \App\Models\LuxuryAddon::all(),
        'roomsProp' => \App\Models\AccommodationRoom::all(),
        'estateDetail' => \App\Models\EstateDetail::first(),
        'accommodations' => \App\Models\Accommodation::all()
    ]);
});

Route::post('/accommodations/{id}/like', function ($id) {
    $accommodation = \App\Models\Accommodation::findOrFail($id);
    $accommodation->increment('likes');
    return back();
});

Route::post('/accommodations/{id}/share', function ($id) {
    $accommodation = \App\Models\Accommodation::findOrFail($id);
    $accommodation->increment('shares');
    return back();
});

Route::post('/accommodations/{id}/transit', function (Illuminate\Http\Request $request, $id) {
    $request->validate([
        'transit_method' => 'required|string|in:car,shuttle,rail',
    ]);

    \App\Models\TransitRequest::create([
        'accommodation_id' => $id,
        'transit_method' => $request->transit_method,
        'status' => 'requested',
    ]);

    return back();
});

Route::post('/reviews', function (Illuminate\Http\Request $request) {
    $request->validate([
        'accommodation_id' => 'nullable|integer',
        'name' => 'required|string|max:255',
        'rating' => 'required|numeric|min:1|max:5',
        'review_text' => 'required|string',
    ]);

    \App\Models\Review::create([
        'accommodation_id' => $request->accommodation_id,
        'name' => $request->name,
        'date_string' => date('F Y'),
        'review_text' => $request->review_text,
        'avatar' => 'https://ui-avatars.com/api/?name=' . urlencode($request->name) . '&background=0D8ABC&color=fff',
        'rating' => $request->rating,
    ]);

    return back();
});

Route::get('/checkout', function (Illuminate\Http\Request $request) {
    return Inertia::render('Checkout', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'itemId' => $request->query('item', 401),
        'quantity' => $request->query('qty', 1),
    ]);
});

Route::post('/checkout/process', [CheckoutController::class, 'process'])->name('checkout.process');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/places/{id}/history', function ($id) {
    $spotsData = [
        'jaya-sri' => [
            'name' => 'Jaya Sri Maha Bodhi',
                        'lat' => 8.3447,
            'lng' => 80.3970,
'image' => '/images/jaya_sri_maha_bodhi.png',
            'topic' => 'The oldest historically documented tree in the world, serving as the living heartbeat of Sri Lankan Buddhism.',
            'history_narrative' => <<<'EOD'
Chapter 1: The Great Act of Truth by Emperor Ashoka of Jambudvipa
The third century BCE had dawned. Centered around the city of Pataliputra, the capital of the Magadha Kingdom in Jambudvipa (India), Emperor Dharmashoka was spreading the light of Buddhism throughout the entire Indian subcontinent.
Meanwhile, in the island of Sri Lanka, King Devanampiyatissa had listened to the Dhamma from Arahat Mahinda and had offered the entire country to the Buddha Sasana. One day, while paying his respects before Arahat Mahinda, King Devanampiyatissa inquired whether it would be possible to bring a branch of the Jaya Sri Maha Bodhi—the sacred tree under which the Buddha attained Enlightenment—to Sri Lanka, so that the people of Lanka could worship it. Arahat Mahinda stated that his sister, Theri Sanghamitta, a fully enlightened nun ($Arahat\ Meheni$) and daughter of Emperor Ashoka, could be invited to Sri Lanka, and she could bring the sacred Bodhi branch along with her. Accordingly, a royal delegation led by Prince Arittha, the King's minister and brother-in-law, departed for Jambudvipa.
Upon hearing the royal request from Sri Lanka through Prince Arittha, Emperor Ashoka faced a monumental dilemma. Although he wished to gift a branch of the Bodhi tree, he feared damaging the divine, sacred Maha Bodhi with any weapon, golden saw, or blade. "If the Bodhi tree is harmed by my hand, will I commit a grave sin?" the Emperor anxiously pondered.
On the advice of Arahat Moggaliputta Tissa, Emperor Ashoka marched with his entire army to Bodh Gaya, where the Maha Bodhi tree stood. The Emperor prepared a magnificent, massive vessel made of solid gold ($Suwarnamaya\ Ran\ Kataram$) and placed it beneath the southern branch of the Bodhi tree. Then, marking a red line on the branch using a golden stylus, he placed both hands upon his head in worship and made a profound Act of Truth ($Sathya\ Kriya$) from the depths of his heart:
"If this noble Bodhi branch is truly destined to travel to the island of Lanka to establish the Buddha Sasana, and if the faith I harbor in my heart toward the Buddha is true... let this Bodhi branch separate itself from the parent tree without any human effort or touch of a weapon, and let it establish itself within this golden vessel that I have prepared...!"
The moment the Act of Truth was completed, the earth trembled powerfully, and divine drums ($Deva\ Dundubhi$) resonated from the heavens. The southern (Dakkhina) branch of the Maha Bodhi tree, untouched by any weapon, separated beautifully from the parent tree and automatically established itself within the fragrant golden vessel. Hundreds of roots instantly sprouted and reached deep into the vessel. The entirety of Jambudvipa echoed with a singular roar of Sadhu and joyous acclamations.

Chapter 2: Crossing the Great Ocean and Subduing the Naga Realm
The sacred Bodhi branch, now firmly rooted and shimmering with fresh young leaves inside the golden vessel, was secured for the journey. Arahat Theri Sanghamitta and the noble community of nuns assumed guardianship of the Bodhi tree. To ensure its protection and to develop the agricultural, artistic, and administrative affairs of Sri Lanka, Emperor Ashoka included a specialized retinue comprising skilled artisans, guardians, and royal princes from eighteen distinct clans (Kula) in this mission.
They boarded a massive ship at the port of Tamralipti in Jambudvipa and began navigating the great ocean toward Sri Lanka. As the vessel glided across the deep sea, the divine aura and miraculous energy of the Bodhi tree became visible to the Nagas living beneath the ocean. Enchanted by the majesty of the Bodhi tree, a fierce desire arose within the Nagas to claim it for themselves.
Using their supernatural powers, the Nagas conjured massive ocean waves, halting the ship dead in the middle of the sea, and surrounded the vessel to seize the sacred Bodhi tree. The passengers on board were gripped by absolute terror.
However, in this perilous moment, Arahat Theri Sanghamitta remained completely unshaken and exercised her spiritual powers ($Iddhi$). Understanding the nature of the Nagas, she manifested the terrifying form of a giant Garuda (a mythical eagle-like king of birds, the natural adversary of the Nagas), ascended into the sky, and let out a thunderous cry.
Submitting to the miraculous power of the Arahat nun, the Nagas realized their grave mistake. Trembling with fear, they shed their monstrous illusions, appeared in their normal forms, and prostrated before the Theri to beg for forgiveness:
"Venerable Mother, we do not wish to harm the Bodhi tree. Please grant us permission to escort the sacred tree to our Naga realm (Naga\ Bhavana) to pay homage to it for seven days," they implored.
Seeing their devotion, Theri Sanghamitta granted them permission. The Bodhi tree was escorted to the Manjerika Naga Realm. After seven days of magnificent, celestial offerings performed by the Nagas, it was returned completely unharmed to the ship. The vessel then resumed its peaceful voyage toward the shores of Lanka.

Chapter 3: The Royal Reception at the Port of Jambukola Pattana
As the royal ship bearing the sacred Bodhi tree reached the port of Jambukola Pattana in northern Lanka (near modern-day Jaffna), King Devanampiyatissa, alongside his complete cabinet of ministers, the Maha Sangha, and his royal army, stood waiting on the shore. The entire beachfront had been covered with pristine white sand, adorned with ceremonial arches ($Thorana$), and perfumed with fragrant incense.
As the vessel neared the shore, the King's devotion to the Buddha swelled so intensely that he could no longer wait on land. Clad in his full royal attire, King Devanampiyatissa waded directly into the great ocean waves. Immersion up to his neck in the sea, the King reached the ship and lifted the golden vessel containing the Maha Bodhi branch onto his own head with boundless reverence and devotion.
As the King emerged from the sea bearing the Bodhi tree upon his head, the thunderous beats of ceremonial drums (Hewisi) and the Sadhu cries of the citizens filled the skies across the coast. The Bodhi tree was temporarily placed in a specially constructed pavilion named the 'Samudra Shala', where grand royal festivals were held for three consecutive days, during which the kingship of the entire island of Sri Lanka was symbolically offered to the Maha Bodhi.
Subsequently, the route from Jambukola Pattana to the Mahamevnawa Park in Anuradhapura was carpeted with pure white sand, decorated with wild flowers, and a magnificent procession began to escort the Bodhi tree to the capital. The residents of every village along the way, including the 'Village of the Brahmin Tivakka', lined the roadsides, sprinkling fragrant water, offering flowers, and worshiping with utmost devotion and love.

Chapter 4: The Miraculous Planting at Mahamevnawa
The sacred Bodhi tree was escorted to the exact sanctified ground in the Mahamevnawa Park of Anuradhapura, a site previously marked by Arahat Mahinda where the Bodhi trees of past Buddhas had also been planted.
In the year 288 BCE—more than 2,300 years ago—during a highly auspicious astrological moment at the exact hour of sunset, King Devanampiyatissa commenced the grand planting ceremony. Just as the King prepared to lower the Bodhi tree from its golden vessel onto the earth, a spectacular miracle occurred, astounding the thousands of people gathered there.
Freed from the golden vessel, the Bodhi branch rose straight up into the sky without the touch of any human hand! Floating in the air, a brilliant six-colored aura of Buddha rays (the Shadwarna\ Buddha\ Rashmi—blue, yellow, red, white, orange, and a radiant mixture of them all) began to emanate from its leaves and branches. The entire city of Anuradhapura was illuminated by this divine light, and the Bodhi tree shone in the night sky like a second sun.
Gazing upon this wondrous miracle, the King and the citizens fell to their knees, weeping tears of devotion while uttering cries of Sadhu. As the sun vanished and night fully arrived, the Bodhi tree gently descended back from the heavens. The moment it touched the earth destined for its planting, its roots plunged with immense strength deep into the ground.
At that exact instant, the earth shook in approval, and a massive, silver-tinted mist materialized, completely enveloping the Bodhi tree for a week and a half (seven days). When the mist finally cleared on the eighth day, everyone witnessed the Jaya Sri Maha Bodhi standing firmly rooted in the soil of Lanka—vibrant, healthy, and shimmering in a brilliant green.

Chapter 5: The Ashta Phala Bodhi and the Eternal Protection of the Chronicle
A few weeks after the planting of the Bodhi tree, four fresh Bodhi fruits (seeds) appeared on four of its branches. Following the instructions of Theri Sanghamitta, the King placed them in a golden platter filled with fragrant soil to facilitate their germination.
From those four fruits, eight exceptionally strong Bodhi saplings emerged. These are known in history as the "Ashta Phala Bodhi" (The Eight Transformed Fruits). As a symbol of the expansion of the Buddha Sasana across the island, these saplings were planted at key locations throughout the country: Jambukola Pattana, the Brahmin village of Tivakka, Thuparama, Isurumuniya, Segiriya (Mihintale), Kataragama, Sandungama, and Weligama. Later, thirty-two more saplings (Dethis\ Phala\ Bodhi) emerged from subsequent fruits, and they too were planted in temples across the length and breadth of Sri Lanka.
From that era onward, every great monarch who ruled Lanka—including Dutugemunu, Vasabha, Dhatusena, and Parakramabahu—protected the Jaya Sri Maha Bodhi as if it were their own life. Fortified walls (Prakara), golden railings, and intricate irrigation systems that supplied cooling water were constructed around the sacred tree. According to Sri Lankan tradition, to rightfully claim the kingship of the island, possessing the guardianship and ownership of the Jaya Sri Maha Bodhi and the Sacred Tooth Relic was an absolute necessity.
In later centuries, even during dark eras when the Anuradhapura kingdom collapsed due to foreign invasions and the entire capital was swallowed by dense jungles, the Jaya Sri Maha Bodhi was never abandoned. To protect the Bodhi tree from wild animals, particularly wild elephants, the "People of Wellassa" and ancestral villagers lived in the heart of the forest, lighting bonfires around the sacred tree, protecting it at the risk of their own lives.
Today, spanning a continuous period of over 2,300 years, the Jaya Sri Maha Bodhi stands eternally alive in the sacred grounds of Anuradhapura as the oldest historically documented, living, human-planted tree in the entire world, with an unbroken lineage of recorded guardianship.
EOD
,
            'blueprint_text' => 'The sacred tree is planted on a high terrace about 6.5 meters (21.3 ft) above the ground and surrounded by railings. The wall was constructed during the reign of King Kirthi Sri Rajasingha to protect it from wild elephants. Multiple smaller bodhi trees known as "Parivara Bodhi" surround the central sacred tree.',
            'blueprint_image' => '/images/jaya_sri_maha_bodhi_blueprint.jpg',
            'gallery' => [
                '/images/jaya_sri_gallery_1.jpg',
                '/images/jaya_sri_gallery_2.jpg',
                '/images/jaya_sri_gallery_3.jpg',
                '/images/jaya_sri_gallery_4.jpg',
            ],
        ],
        'ruwanweli' => [
            'name' => 'Ruwanwelisaya',
                        'lat' => 8.3500,
            'lng' => 80.3964,
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
            'gallery' => [
                '/images/ruwanweli_gallery_1.jpg',
                '/images/ruwanweli_gallery_2.jpg',
                '/images/ruwanweli_gallery_3.jpg',
                '/images/ruwanweli_gallery_4.jpg',
            ],
        ],
        'thuparamaya' => [
            'name' => 'Thuparamaya',
                        'lat' => 8.3556,
            'lng' => 80.3967,
'image' => '/images/thuparamaya_1779380449379.png',
            'topic' => 'The oldest dagoba in Sri Lanka, constructed to enshrine the sacred collarbone relic of the Buddha.',
            'history_narrative' => <<<'EOD'
Chapter 1: The Royal Aspiration for the Sacred Bodily Relics
In the third century BCE, the sacred land of Lanka shone with a glorious light. Following the arrival of Arahat Mahinda Maha Thero and the establishment of the Buddha Sasana on the island, King Devanampiyatissa and the entire populace were enveloped in profound faith and devotion. Although the blessings of the Triple Gem had spread across the land, an unfulfilled longing—a pious yearning—remained in the King's heart.

One day, amid the tranquil surroundings of the Mahamevnawa Park, King Devanampiyatissa paid his respects before Arahat Mahinda and expressed the noble aspiration of his heart:
"Venerable Sir, through your compassion, we have now received the Sublime Dhamma of the Blessed One. The venerable Maha Sangha resides here. Sacred grounds like the beautiful Mahamevnawa Park belong to the Buddha Sasana. Yet, Venerable Sir, this land still lacks a great stupa enshrining the sacred bodily relics (Sarvagna Dhatu) of the Buddha, which we could worship and gaze upon as if the Buddha were alive before our very eyes. A powerful desire burns in my heart to build a stupa for the Buddha. Please guide us toward this path!"

Hearing the King’s faith-filled words, Arahat Mahinda was overjoyed. He looked at the King and spoke in a calm, composed voice:
"Great King, your aspiration is truly noble. To look upon a sacred relic of the Tathagata is akin to seeing the living Buddha Himself. Although we do not possess the relics at this very moment, we can obtain the sacred relics of the Buddha for the island of Lanka by reaching out to Emperor Dharmashoka of Jambudvipa and Sakra, the King of Gods in the celestial realm. Great King, prepare the ground for the stupa immediately."

For this noble emissary mission, Arahat Mahinda chose Sumana Samanera, a sixteen-year-old novice monk who had traveled with him to Lanka and possessed immense supernatural powers ($Iddhi$). Addressing the young novice, Arahat Mahinda instructed:
"Virtuous Sumana, depart immediately using your spiritual powers to Emperor Ashoka in Jambudvipa. Meet the Emperor and request the sacred Alms Bowl Relic (Patra Dhatu) used by the Buddha, along with a collection of sacred bodily relics for the island of Lanka. Without stopping there, ascend directly to the Tavatimsa Heaven, meet Sakra, the King of Gods, and request the deeply venerated Right Collarbone Relic (Dakkhina Akkhu Dhatu) of the Buddha, which is safely enshrined within the Silumini Seya, for the land of Lanka."

Chapter 2: The Miraculous Spiritual Journey of Sumana Samanera
Accepting the guidance of Arahat Mahinda with the utmost reverence, Sumana Samanera instantly ascended into the skies from Mahamevnawa, vanishing among the clouds. Such was the speed of his supernatural power that he crossed the great ocean in the blink of an eye and appeared before Emperor Dharmashoka in the city of Pataliputra in Jambudvipa.

Overjoyed to hear about the flourishing of the Sasana in Lanka, Emperor Ashoka immediately took the sacred Alms Bowl used by the Buddha—which was filled with fragrant flowers—placed a vast collection of sacred bodily relics inside it, and offered it to the novice monk with deep devotion.

Bearing the sacred Alms Bowl Relic safely in his right hand, Sumana Samanera flew directly from that very spot toward the celestial realm. As he arrived at the magnificent Sudharma Divine Council in the Tavatimsa Heaven, Sakra, the King of Gods, stepped forward to receive him. The novice monk addressed Sakra, requesting the Right Collarbone Relic of the Buddha to establish the Buddha Sasana eternally in Sri Lanka.

With immense joy, Sakra reverently retrieved the highly sacred Right Collarbone Relic from the 'Silumini Seya', the monument worshiped by the deities of Tavatimsa. He placed it inside an exceptionally precious, gleaming crystal casket and laid it upon the palm of Sumana Samanera.

Holding the world’s most sublime treasures in his hands, Sumana Samanera traveled back through the heavens using his spiritual powers, gently descending onto the peak of Mihintale Rock (Sagiriya) in Anuradhapura. Arahat Mahinda and the community of monks received the sacred relics with grand honor and thunderous chants of Sadhu.

Chapter 3: The Majestic Decision of the State Elephant and the Clay Platform
Upon hearing that the Right Collarbone Relic of the Buddha had been brought to Lanka, King Devanampiyatissa, accompanied by his grand army, the chief queen, and the royal court, rushed to Mihintale. Gazing at the crystal casket, the King was struck by overwhelming devotion; tears of joy streamed from his eyes as he worshiped the sacred relics.

To escort the relics to the city of Anuradhapura, the royal state elephant (Mangala Attha) was adorned in pure white garments, and a golden pavilion (Sivige) was secured upon its back. The moment the crystal casket was placed within the golden pavilion, the state elephant let out a majestic, thunderous trumpet (Kunchanada) that shook the earth. It was a highly auspicious omen, blessed by the deities themselves.

Bearing the relic casket upon its head, the elephant began its journey toward the Mahamevnawa Park in Anuradhapura, flanked by the grand army and a procession of flowers. Entering through the eastern gate of the city, the majestic elephant paced slowly into the Maha Vihara grounds and walked toward the specific elevated ground destined for the construction of Thuparama—a site sanctified by the presence of the Bodhi trees and relics of past Buddhas.

Upon reaching the spot, the elephant turned around, faced the west, and stood completely still like a massive boulder. Though the King attempted to lower the relic casket from the elephant’s back, the animal refused to allow it. Shaking its frontal lobes (Kumbhasthala), the elephant fiercely protested the removal of the casket.

Puzzled, the King inquired about the secret behind this behavior from Arahat Mahinda. Understanding the elephant’s mind, Arahat Mahinda explained:
"Great King, this elephant is exceptionally wise. The ground of the Thuparama site is lower than the elephant's head. The elephant does not wish for the sacred relics of the Buddha to be placed at a level lower than itself. It is waiting until the relics can be deposited upon a exalted platform that rises higher than its own head."

The King took immediate action. He deployed hundreds of laborers to bring pure, dry clay from the nearby Abhaya Wewa (Basawakkulama Reservoir). He constructed a massive platform (mound) equivalent to the height of a man's neck, rising well above the level where the elephant stood. The moment the platform surpassed the height of the elephant's head, the animal trumpeted softly with great satisfaction, permitted the enshrinement of the relic casket, and devoutly stepped aside.

Chapter 4: The First Relic Miracle in Lanka and the Auspicious Shape of the Stupa
Once the relics were placed upon the platform, the first great relic miracle in the history of Sri Lanka—one that would be etched in golden letters—took place. Before the astonished eyes of King Devanampiyatissa, the chief queen, the ministers, and thousands of ordinary citizens, the crystal casket opened automatically! The Right Collarbone Relic emerged from the casket and instantly soared high into the sky.

Floating in the heavens, the sacred relic of the Buddha began to emit a brilliant six-colored aura of Buddha rays (the Shadwarna Buddha Rashmi—blue, yellow, red, white, orange, and a radiant mixture of them all) across the entire city, as if the Buddha Himself were hovering alive in the sky. Furthermore, to the absolute amazement of the gathered crowd, the relic simultaneously unleashed streams of cool water from one side and columns of unquenchable fire from the other. This was identical to the Twin Miracle (Yamaka Maha Pratihariya) performed by the Buddha during His lifetime to dispel the doubts of skeptics. The entire sky of Anuradhapura transformed into a celestial vision as a rain of heavenly flowers cascaded from above.

At the conclusion of this grand miracle, the sacred relic gently descended from the heavens and rested lightly upon the crown of King Devanampiyatissa's head. Weeping tears of ultimate devotion, the King proclaimed, "My life is blessed!" and enshrined the sacred relic within the great platform at the Thuparama site.

The Thuparama Stupa was designed in the Dhanyakara shape (the shape of a heap of paddy). This was the very first great stupa constructed in the historical chronicles of Sri Lanka. Later, to protect the monument from wind and rain, an elegant circular relic house (Vatadage) was built around it. Artisans set up slender, beautifully carved granite pillars (Stone Pillars) encircling the stupa. To this day, they remain as an eternal hallmark of Thuparama's wondrous architecture.

Chapter 5: An Eternal Sacred Legacy
Following the completion of the Thuparama Stupa, a massive religious renaissance swept across the land of Lanka. Thousands of royals and citizens, including the King's younger brother, Prince Mattabhaya, entered the Buddhist monastic order. Centered around this first stupa of Lanka, a sprawling monastic complex capable of housing thousands of monks developed around Thuparama.

Over the centuries, monarchs such as Vasabha, Gothabhaya, and Aggabodhi continuously renovated and preserved Thuparama. During the brutal foreign invasions of later eras, the monks and rulers of Lanka protected this Right Collarbone Relic at the risk of their own lives, concealing it in secret wilderness hideouts. Once peace returned to the country, they brought it back in grand processions to re-enshrine it within Thuparama.
EOD
,
            'blueprint_text' => 'The Thuparamaya stupa was originally built in the shape of a heap of paddy, but was reconstructed in a bell shape in 1842. The unique architectural feature is the Vatadage—a circular relic house built around the stupa. It originally supported a conical wooden roof, and its ruins are marked by concentric circles of elegant monolithic stone pillars.',
            'blueprint_image' => '/images/thuparamaya_blueprint.jpg',
            'gallery' => [
                '/images/thuparamaya_gallery_1.jpg',
                '/images/thuparamaya_gallery_2.jpg',
                '/images/thuparamaya_gallery_3.jpg',
                '/images/thuparamaya_gallery_4.jpg',
            ],
        ],
        'abhayagiriya' => [
            'name' => 'Abhayagiriya',
                        'lat' => 8.3711,
            'lng' => 80.3953,
'image' => '/images/abhayagiri_1779380471030.png',
            'topic' => 'A massive monastic complex and ancient center of Buddhist scholarship, featuring a towering, majestic brick stupa.',
            'history_narrative' => <<<'EOD'
Chapter 1: "The Great Black Sinhalese is Fleeing!" (The Royal Retreat)
The first century BCE had dawned. The throne of Anuradhapura in the island of Sri Lanka was occupied by a majestic young monarch named Vattagamani Abhaya, known to history by the name King Walagamba. While the first five months of his successful reign passed peacefully, dark storm clouds began to gather over the skies of Lanka. Seven ruthless South Indian Dravidian (Tamil) invaders, leading a massive army, simultaneously invaded the country. Due to the devastating Baminitiya Famine gripping the island at the time and internal rebellions splitting the nation, the King's royal army was severely weakened. Faced with the overwhelming might of the enemy, King Walagamba was forced to retreat from battle and temporarily abandon the city of Anuradhapura.

The King, along with his chief queen Anula Devi, Queen Soma Devi, and his two companion princes, boarded a royal chariot and fled rapidly out of the city through its northern gate. As they fled, they passed a Jain monastery located near the northern gate within the city limits, inhabited by a Jain ascetic (Nigantha) named "Giri".

Seeing King Walagamba fleeing helplessly with the royal family in his chariot, Giri Nigantha burst into loud, mocking laughter and shouted insultingly for all the nearby citizens and enemy troops to hear:
"Look...! There goes the Great Black Sinhalese, defeated and fleeing in fear...!" (Mahavamsa: "Maha Kanasihalo Palayati")

As the chariot sped past, these humiliating and harsh words echoed clearly in the ears of King Walagamba. The King’s entire body trembled with rage, and his heart filled with deep agony. He instinctively reached for his sword, intending to halt the chariot and decapitate the ascetic, but he mastered his emotions, realizing he must survive for the sake of the nation's future. Closing his eyes tightly, the King made a fierce, solemn vow from the depths of his heart:
"When I someday reorganize my Sinhalese army, completely vanquish these enemies, and recapture Anuradhapura... I will utterly raze this insulting Nigantha monastery to the ground! And on this very spot, for the longevity of the Buddha Sasana, I shall construct a magnificent Buddhist empire and a monumental stupa that will astound the entire world...!"

Chapter 2: Fourteen Arduous Years in the Wilderness
The King’s journey into exile was exceptionally perilous and agonizing. As the enemy forces hotly pursued the royal chariot, the heavy load slowed the horses down. Seeing the enemy close in, Queen Soma Devi, who harbored a profound love for the King and the country, made a heroic and selfless decision. To save the King and the princes, she voluntarily stepped down from the chariot, allowing herself to be captured by the enemy. Due to her monumental sacrifice, the weight of the chariot was reduced, allowing the horses to gallop swiftly away. King Walagamba and the princes escaped safely into the dense wilderness, while the enemy captured Queen Soma Devi and carried her away to India as a prize of war.

For the next fourteen (14) years, King Walagamba lived in hiding within remote, dark jungle caves across the central highlands and the Malaya region of Lanka, including sites like Sewagala, Vessagiriya, and the Matula Aluvihara (the Aluvihara Temple in Matale). Throughout this prolonged period, the Maha Sangha, led by the enlightened monk Arahat Kupikkala Maha Tissa, supported and protected the King like a shadow. The King endured immense hardships, hunting and foraging for wild roots to survive.

Yet, despite these brutal adversities, the King never abandoned his resolve. He traversed the country in secret, systematically organizing his forces. Thousands of heroic Sinhalese youths, prepared to sacrifice their lives for their country and religion, rallied around the King's banner. After 14 years of rigorous preparation and military training, the grand Sinhalese army marched toward Anuradhapura, their battle cries echoing like roaring lions. A fierce, bloody war ensued. Under King Walagamba’s brilliant military strategies, the Dravidian rulers were defeated one by one. Ultimately, King Walagamba recaptured Anuradhapura and was consecrated as the supreme emperor of Lanka for the second time. He subsequently sent an emissary to India and brought Queen Soma Devi back to Lanka with grand royal honors.

Chapter 3: A Sacred Name Arising from the Grounds of Humiliation
Upon reclaiming the sovereignty of the island, King Walagamba had not forgotten for a single moment the humiliating insult cast by Giri Nigantha during his retreat. The King immediately summoned his royal army and ordered them to completely demolish the monastery of Giri Nigantha, leveling its buildings to the ground. Seeing the approach of the King, Giri Nigantha fled the country in terror.

The King purified the land and integrated it with adjacent sacred sites previously designated by Arahat Mahinda, initiating the construction of a massive Buddhist monastic complex and a colossal stupa.

When naming this grand new monastery, the King made a highly intelligent and timeless historical decision. Blending his own name, "Abhaya", with the name of the Nigantha who previously owned the monastery, "Giri", he named this sacred sanctuary the "Abhayagiri Vihara". Through this, the King demonstrated to the world how the insults and defeats directed at a man can, through unwavering resolve, be transformed into monumental triumphs and magnificent shrines of pristine white.

Out of his boundless gratitude toward Arahat Kupikkala Maha Tissa, who had protected his life during his grueling exile in the forest, the King offered the Abhayagiri Vihara to him personally. (This personal offering later led to the first ecclesiastical schism in Sri Lanka, creating an independent school of thought distinct from the traditional Maha Vihara).

Chapter 4: The Architecture of the Monumental Stupa that Awed the World
The central and most majestic feature of the Abhayagiri Vihara was the sky-high Abhayagiri Maha Stupa. Initially constructed by King Walagamba, the stupa was subsequently expanded on a colossal scale and beautifully renovated by later great monarchs, most notably King Gajabahu I and King Parakramabahu the Great.

The Abhayagiri Stupa was designed in the Bubbulakara (bubble) shape (though some sources indicate its original shape was Dhanyakara, a heap of paddy, before being modified to a bubble shape). Its scale and architectural engineering struck the ancient world with absolute wonder:

Engineering Marvel: It soared to a height of over 370 feet (more than 110 meters), making it the second-largest brick structure in the ancient world, surpassed only by the Great Pyramid of Giza in Egypt.

Massive Scale: Hundreds of millions of burnt clay bricks were utilized to build this giant monument, incorporating remarkably advanced ancient structural engineering techniques.

Intricate Artistry: The Wahalkada (frontispieces) constructed at the four cardinal points were adorned with exquisite carvings of swans, lions, and dwarfs (Vamana figures), and embellished with precious gemstones.

Sacred Enshrinement: Enshrined deep within the massive dome (Garbha) of the stupa were sacred bodily relics of the Buddha, invaluable Dhamma discourses etched onto golden plates, and a vast repository of offerings crafted from gold, silver, pearls, and gems.

Chapter 5: The International University and the Grand Glory of Abhayagiri
Over time, Abhayagiri evolved beyond a mere religious site to become the largest International Buddhist University in the Asian region.

While the traditional Maha Vihara preserved Orthodox Theravada Buddhism in its pristine form, Abhayagiri opened its doors to Mahayana concepts, foreign Buddhist ideologies, and various secular sciences from around the world. As a result:

Global Academic Hub: During its golden era, the Abhayagiri monastic complex housed over 5,000 monks from various corners of the globe, all residing together to study the Dhamma and diverse academic disciplines.

The Chronicle of Fa-Hien: In the 5th century CE, the famous Chinese traveling monk, Faxian (Fa-Hien), arrived in Lanka via India. He resided at Abhayagiri for two full years, meticulously copying rare Dhamma texts and palm-leaf manuscripts to take back to China. In his travelogues, he highly extolled the grand prosperity, jewel-encrusted shrines, and magnificent rituals of Abhayagiri.

Guardianship of the Tooth Relic: When the Sacred Tooth Relic (Dantha Dhatu)—the crest-jewel of Sri Lanka currently housed in Kandy—was first brought to the island during the reign of King Kithsirimevan, the King safely deposited it at the Abhayagiri Vihara, establishing an annual grand procession (Perahera) and state festivals in its honor.

Timeless Artistic Masterpieces: The Kuttam Pokuna (Twin Ponds)—a miraculous feat of ancient hydraulic engineering—and the world-renowned Samadhi Buddha Statue, which imparts a sense of profound serenity to all who gaze upon it, still stand intact within the Abhayagiri grounds as living testimonies to its peerless artistic heritage.
EOD
,
            'blueprint_text' => 'The Abhayagiri stupa stands as one of the largest brick structures in the ancient world, reaching a height of about 75 meters (246 ft). The monastic complex includes beautiful stone carvings, guardstones (Muragala), moonstones (Sandakada Pahana), and the famous twin ponds (Kuttam Pokuna), illustrating advanced ancient water engineering.',
            'blueprint_image' => '/images/abhayagiri_blueprint.jpg',
            'gallery' => [
                '/images/abhayagiri_gallery_1.jpg',
                '/images/abhayagiri_gallery_2.jpg',
                '/images/abhayagiri_gallery_3.jpg',
                '/images/abhayagiri_gallery_4.jpg',
            ],
        ],
        'jetavanaramaya' => [
            'name' => 'Jetavanaramaya',
                        'lat' => 8.3517,
            'lng' => 80.4033,
'image' => '/images/jetavanarama_1779380489792.png',
            'topic' => 'Once the tallest stupa in the ancient world, representing an unparalleled masterpiece of ancient Sri Lankan architecture.',
            'history_narrative' => <<<'EOD'
Chapter 1: The Darkness of Heresy and the Great Crisis of the Maha Vihara
The late third century CE had dawned. The throne of Anuradhapura in the island of Sri Lanka was occupied by King Mahasen (Mahasena), a highly majestic yet stubborn monarch who spearheaded an authoritarian regime. Since his childhood, the King had been tutored and guided by an opportunistic, heretical monk from Jambudvipa named "Sanghamitta", who was well-versed in Vetullavada (Mahayana) doctrines. The moment the King ascended to power, this monk Sanghamitta completely deceived the King’s mind with heretical Mahayana ideologies, successfully instilling a deep-seated hatred toward the traditional orthodox monks.

Listening to the treasonous counsel of the monk Sanghamitta, King Mahasen issued a strict royal decree throughout the country, completely banning the offering of alms and support to the Maha Vihara—the very heartbeat of orthodox Theravada Buddhism in Lanka:
"If anyone provides even a single bowl of rice or alms to a Theravada monk residing in the Maha Vihara, he shall be fined one hundred Kahavanus...!"

Due to this unfortunate and terrifying law, the enlightened Arahats and monks of the Maha Vihara, deprived of alms and suffering from hunger, abandoned the city of Anuradhapura. Weeping, they departed for the Rohana principality and the Malaya region (the central highlands). For nine consecutive years, the sacred grounds of the Maha Vihara and the Lovamahaprasada (the Brazen Palace) lay deserted, completely devoid of the sound of any Dhamma chanting.

Not stopping there, under the direct instigation of the monk Sanghamitta, the King demolished centuries-old valuable buildings and multi-storied palaces belonging to the Maha Vihara. Their exquisite stone carvings and treasures of gold and silver were completely plundered and carried away to embellish the rival Abhayagiri Vihara. Witnessing this religious and cultural desecration, the entire nation fell into deep sorrow and harbored severe wrath toward the King.

Chapter 2: The Tearful Rebellion of a Friend and the King's Great Repentance
Against this short-sighted and violent tyranny of King Mahasen, a massive public outcry and silent rebellion emerged across the country. Minister Meghavarnabhaya, the supreme commander of the state army and the King’s closest childhood friend who had grown up alongside him, became furious over this unrighteous, anti-Dhamma conduct of the King. Out of deep resentment toward the monarch, he immediately defected from the royal palace. He traveled to the Rohana region, mobilized a massive patriotic Sinhalese army, declared war against the King, and surrounded the capital city of Anuradhapura. The two friends were poised for a massive, bloody civil war.

However, on the decisive night before the battle was scheduled to commence, Minister Meghavarnabhaya made an exceptionally brave decision. Unarmed, completely alone, and under the cover of darkness, he secretly slipped into King Mahasen’s royal military tent. Entering not as a mortal enemy seeking assassination, but as the trusted companion of his youth, he sat down before the startled King and shared a late-night meal from the exact same dish.

Once they finished eating, Minister Meghavarnabhaya looked at the King with tear-filled eyes and said with deep emotion:
"My life-long friend... I did not bring an army to wage war against you to seize your kingdom or your crown. Listening to the malicious words of outsiders, you have destroyed the Maha Vihara—the monument established upon this soil by Arahat Mahinda, which our ancestors guarded like their own lives. You have banished the monks from the country. My only desire is to rebuild the Maha Vihara. For that cause, I am prepared to sacrifice my life. I simply want my old friend back..."

Hearing these honest, passionate, and tearful words from his companion, the ignorance masking King Mahasen's eyes evaporated instantly. The King suddenly realized the gravity of the horrific, sinful atrocities he had committed under the spell of the deceitful monk Sanghamitta. The King immediately embraced his friend and wept openly, begging for forgiveness. Right then and there, both men halted the impending war and took a solemn vow to reconstruct the Maha Vihara, restoring it to its former pristine glory. (Subsequently, the monk Sanghamitta, who had earned the fierce hatred of the populace, along with the faction of the chief queen who had supported the destruction of the Maha Vihara, were assassinated by outraged citizens).

Chapter 3: The Birth of Jetavana and the Miraculous Stone Foundation
Filled with deep remorse, King Mahasen recalled the monks of the Maha Vihara back to Anuradhapura with grand honors and a majestic procession. Following this, as an act of penance for his grave transgressions and with the vision of gifting an unparalleled monument to the Buddha Sasana—the likes of which the world had never seen—he initiated the construction of a colossal monastic complex in the beautiful pleasure garden named "Jotivana", situated directly adjacent to the boundaries of the Maha Vihara. Because it was constructed within the 'Jotivana' park, this monastery entered global history under the name "Jetavanaramaya".

King Mahasen summoned the finest engineers, irrigation specialists, and master architects from across Lanka and the entire Asian continent to construct this monumental stupa. To sustain the colossal weight of this massive structure, which was designed to tower over 400 feet like a natural mountain, they utilized a highly advanced foundation technology that continues to astound modern engineering science:

Excavation to Bedrock: The topsoil and loose sand across the designated site were completely cleared away, excavating a massive crater deep into the earth until the natural solid bedrock was struck.

Deep Substructure: The depth of the foundation alone exceeded 26 feet (more than 8 meters).

Seismic Stabilization Matrix: To ensure the stupa remained completely immovable against severe earthquakes, layers of crushed granite, a specialized resilient 'butter clay' compacted continuously by herds of elephants for days, and a precise metallic solution including mercury were laid down to form an exceptionally stable foundation core.

Chapter 4: The Pinnacle of Sinhalese Engineering that Awed the World
The Jetavanaramaya Maha Stupa was designed in the Bubbulakara (bubble) shape (though some ancient records note it initially resembled a Dhanyakara shape—a heap of paddy—before settling into a fully developed bubble form). Upon its completion, it shattered numerous architectural records in world history:

The Largest Brick Structure on Earth: The Jetavanaramaya soared to a total height of approximately 400 feet (122 meters). It stood as the largest brick structure in the ancient world and ranked as the third tallest structure in the ancient world, surpassed only by the two tallest Great Pyramids of Giza in Egypt.

Millions of Kiln-Baked Bricks: According to modern mathematical calculations, over 93 million baked clay bricks were utilized to construct the Jetavana Stupa. If these bricks were laid end to end, they would be sufficient to construct a boundary wall entirely around the circumference of the planet Earth!

The Miraculous Mortar Compound: The binding mortar technology used to fuse the bricks together was so exceptionally powerful that even after 1,700 years of exposure to torrential monsoonal rains, earthquakes, and the destructive forces of being swallowed by dense jungles, the bricks remain tightly bound to one another today. Modern chemical analysis has confirmed that this mortar matrix contains resin (the sap of specific trees), lime, and ultra-fine sand.

Enshrined with absolute security deep within the massive dome (Garbha) of the stupa is the Sri Maha Pati Dhatu (the Sacred Waistband Relic) of the Buddha, brought to the location through supernatural means, along with a vast repository of sacred bodily relics.

Chapter 5: A Grand Cultural Hub and the Legacy of Jetavana
The construction of the Jetavana Maha Saya initiated by King Mahasen was brought to full completion by his son, King Kithsirimewan (Keerthi Sri Meghavarna), who ruled the island during the historic era when the Sacred Tooth Relic was brought to Sri Lanka.

The Jetavanaramaya was far more than a mere stupa; it was a massive monastic university spanning over 200 acres, equipped with grand multi-storied residential quarters, chapter houses (Poya Gewal), hydraulic ponds, and massive alms halls capable of supporting over 3,000 resident monks.

During modern archaeological excavations conducted within the Jetavana sector, an array of rare artifacts has been discovered, including precious gemstones sourced from diverse foreign lands, Roman and Chinese coins, Persian pottery, and the famous Jetavanaramaya Gold Plates—a series of pure gold sheets upon which Mahayana Buddhist discourses (such as the Prajnaparamita Sutra) were meticulously inscribed. These discoveries scientifically validate that the Jetavanaramaya was an internationally recognized religious and cultural metropolis that connected the trades and philosophies of the East and the West.
EOD
,
            'blueprint_text' => 'With a height of 122 meters (400 ft) at its construction, the Jetavanaramaya was the third tallest structure in the ancient world, behind only the Pyramids of Giza. It required approximately 93.3 million baked bricks. The foundation is dug to a depth of 8.5 meters (28 ft), resting directly on bedrock to support the colossal weight.',
            'blueprint_image' => '/images/jetavanarama_blueprint.jpg',
            'gallery' => [
                '/images/jetavanarama_gallery_1.jpg',
                '/images/jetavanarama_gallery_2.jpg',
                '/images/jetavanarama_gallery_3.jpg',
                '/images/jetavanarama_gallery_4.jpg',
            ],
        ],
        'mirisawetiya' => [
            'name' => 'Mirisawetiya Stupa',
                        'lat' => 8.3444,
            'lng' => 80.3900,
'image' => '/images/mirisawetiya_1779380509748.png',
            'topic' => 'Built by King Dutugemunu after leaving his scepter containing Buddha relics, a symbol of profound devotion.',
            'history_narrative' => <<<'EOD'
Chapter 1: The Auspicious Water Bath that Grounded the Scepter
The second century BCE had dawned. Having liberated the sacred skies of Lanka from invaders and bringing an end to a bloody war that had raged for thirty-two years, King Dutugemunu the Great was consecrated upon the throne of Anuradhapura. The most valuable possession belonging to the King, which commanded the timeless reverence of all the inhabitants of Lanka, was the "Jaya Kunthaya" (the Royal Victory Spear/Scepter). Enshrined within this scepter was a highly sacred bodily relic of the Buddha, and it was this holy Jaya Kunthaya that had constantly guided and driven the King toward absolute triumph on the battlefield.

Following his coronation, the King prepared to journey to the famous Tisa Wewa (Tissa Vapi reservoir) in Anuradhapura, accompanied by his army, his ten great warriors (Dasa Maha Yोधas), and his royal retinue, to partake in the auspicious inaugural water sports. According to royal protocol, the Victory Scepter had to accompany the King wherever he traveled. The King's guides and royal attendants firmly planted the massive Jaya Kunthaya upright into the ground upon a beautiful, elevated knoll situated a short distance from the Tisa Wewa. King Dutugemunu and his royal court then spent the entire day in high spirits, engaging in water sports and bathing within the refreshing waters of the Tisa Wewa.

As dusk approached and the sun began its descent across the western skies, King Dutugemunu concluded his bath and prepared to return to the royal palace. The King commanded his royal guards to retrieve the Victory Scepter planted upon the elevated ground and bring it back to the chariot.

Chapter 2: The Grand Miracle of the Unmoving Victory Scepter
Upon receiving the King's command, a powerful royal guard stepped forward and attempted to uproot the scepter from the earth. To his utter amazement, the scepter did not budge even a hair's breadth! Subsequently, several more robust soldiers stepped forward, grasping it tightly with both hands and attempting to pull it upward simultaneously. Yet, the scepter remained unyielding, locked to the earth as if it were a solid extension of the subterranean bedrock.

Upon hearing of this extraordinary and mystical phenomenon, King Dutugemunu rushed to the site. At the King's command, the ten great warriors—including Nandimitra, Suranimala, and Mahasona, who were capable of feats far beyond normal human strength—stepped to the forefront. They unleashed their peerless human might, causing the very ground to reverberate as they strained to lift the scepter, but their efforts were entirely in vain. The scepter remained absolutely immovable, as though it had taken deep root into the core of the earth.

To the absolute astonishment of the thousands gathered there, the sacred relic enshrined within the Victory Scepter suddenly performed a miracle, radiating breathtaking streams of celestial light and waves of brilliant Buddha rays (Buddha Rashmi). King Dutugemunu instantly realized that this was a miraculous sign from the deities and the Buddha. Overwhelmed with profound faith ($Saddha$), the King placed both hands upon his head in worship, kneeling upon the earth as tears of ultimate devotion streamed from his eyes.

"This noble Victory Scepter remains immovable not by any human power, but by the divine decree of the Buddha. For the longevity of the Buddha Sasana, I vow upon my life to construct a sky-high, magnificent stupa right here, encircling this Victory Scepter and using it as the absolute center point...!" the King solemnly resolved on that very spot.

Chapter 3: The "Chilli Dish" and the Miraculous Secret Behind the Name Mirisawetiya
Before the structural layout of the stupa could be planned, a profound sense of remorse and a deeply moving spiritual compunction arose within the heart of King Dutugemunu. As a true, virtuous disciple of the Buddha, the King had strictly maintained a solemn vow and policy instilled in him since childhood by his parents, King Kavantissa and Queen Viharamaha Devi. This lifelong principle dictated that he would never consume any delicious food or crop without first offering the finest initial portion (Agra Bhaga) to the Maha Sangha.

However, during the chaotic and busy opening days of his reign, a oversight occurred. One morning, the King completely consumed an exceptionally delicious and well-prepared chilli dish (a rich meal featuring a heavily spiced chilli broth) that had been prepared for him, entirely forgetting to offer the initial portion to the community of monks. While this would be considered a trivial oversight for an ordinary citizen or any other monarch, to the intensely pious King Dutugemunu, it felt like a catastrophic violation of his principles—a sinful transgression that weighed heavily upon his conscience. The King fell into a state of deep sorrow and self-reproach.

The King immediately hastened before the Maha Sangha, openly confessed his serious oversight, and begged forgiveness from the venerable monks. As an act of penance to atone for his lapse in mindfulness, he resolved to name the grand monument he was about to construct "Mirisawetiya" (derived directly from the chilli dish, Miris). Through this act, the King demonstrated to the world how even the smallest personal oversight must be purified through a monumental act of merit and the creation of a massive, sacred relic shrine.

Chapter 4: The Inaugural Construction and Splendid Architecture
The Mirisawetiya Stupa holds the unique historical distinction of being the very first great stupa whose construction was initiated by King Dutugemunu in the sacred city of Anuradhapura after unifying the island of Sri Lanka under a single canopy. (The foundational work on the iconic Ruwanweli Maha Seya only commenced while the Mirisawetiya was already nearing completion).

The construction of the monument was executed by the country's finest master craftsmen, ensuring unparalleled structural integrity:
The Unbroken Core: The immovable Victory Scepter was preserved as the sacred core—the exact center point of the dome (Garbha)—and encircled by millions of high-quality, kiln-baked red bricks to raise the massive structure toward the heavens.
EOD
,
            'blueprint_text' => 'Mirisawetiya stupa was the first built by King Dutugemunu. Its most significant feature is that it was built around his victory scepter. The site is characterized by its tranquil atmosphere and large stone pillars, which suggest it was once surrounded by a massive vatadage or colonnaded structure.',
            'blueprint_image' => '/images/mirisawetiya_blueprint.jpg',
            'gallery' => [
                '/images/mirisawetiya_gallery_1.jpg',
                '/images/mirisawetiya_gallery_2.jpg',
                '/images/mirisawetiya_gallery_3.jpg',
                '/images/mirisawetiya_gallery_4.jpg',
            ],
        ],
        'lankarama' => [
            'name' => 'Lankarama',
                        'lat' => 8.3614,
            'lng' => 80.3886,
'image' => '/images/lankaramaya_1779380541763.png',
            'topic' => 'An ancient stupa built by King Vattagamani Abhaya, surrounded by beautiful monolithic stone pillars and ruins.',
            'history_narrative' => <<<'EOD'
Chapter 1: The Retreat of the Great Black Sinhalese and the Weight of the Royal Chariot
The first century BCE had dawned. The throne of Anuradhapura in the island of Sri Lanka was occupied by a majestic monarch named Vattagamani Abhaya, known to history by the name King Walagamba. While the first five months of his successful reign passed peacefully, dark storm clouds began to gather over the skies of Lanka. Seven ruthless South Indian Dravidian (Tamil) invaders, leading a massive army, simultaneously invaded the country. Due to the devastating Baminitiya Famine gripping the island at the time and internal rebellions splitting the nation, the King's royal army was severely weakened. Faced with the overwhelming might of the enemy, King Walagamba was forced to retreat from battle and temporarily abandon the city of Anuradhapura.

The King, along with his chief queen Anula Devi, her two young princes, and the King's deeply beloved second queen, Soma Devi, boarded a single royal chariot and fled rapidly out of the city through its northern gate.

As they emerged past the city limits, the enemy forces hotly pursued the royal chariot. Because there were five individuals inside the chariot alongside heavy, valuable royal treasures, the weight of the carriage drawn by the horses was exceptionally heavy. The speed of the chariot gradually decreased, and it became terrifyingly clear to everyone on board that the enemy was closing the distance. If they proceeded further in this manner, the capture or execution of the entire royal family at the hands of the enemy was absolutely certain.

Chapter 2: The Peerless Sacrifice of Queen Soma Devi
King Walagamba realized that to increase the speed of the chariot, its weight had to be reduced immediately. But who could be asked to step down? Queen Anula Devi was pregnant, and the other two passengers were small princes. The King found himself trapped in a monumental dilemma and gripped by severe agony. Discerning the immense turmoil weighing upon the King’s mind, Queen Soma Devi—who harbored a love for King Walagamba and her country that surpassed her own life—made a heroic and deeply moving decision. Looking at the King, she spoke in a firm, resolute voice:

"My Lord, do not worry about me. You must preserve the crown of this country and the Sinhalese royal lineage. It is only if you survive that the country can be liberated by defeating the enemy. Therefore, grant me permission to step down from the chariot!"

As tears streamed from the King’s eyes, Queen Soma Devi voluntarily stepped down from the rapidly moving royal chariot. She stood alone by the edge of the wilderness to save her husband and the children. The moment Queen Soma Devi stepped down, the weight of the chariot was significantly reduced, allowing the horses to gallop swiftly away. King Walagamba and his party safely escaped into the dense forest. When the pursuing Dravidian soldiers reached the spot, they discovered the exceptionally beautiful Queen Soma Devi. Instead of killing her, they captured her as a highly valuable royal prize and carried her away directly to the Chola Kingdom in South India (Jambudvipa).

Chapter 3: Fourteen Years in Exile and the Repatriation of Queen Soma Devi
For the next fourteen (14) years, King Walagamba lived in hiding within remote, harsh jungle caves across Lanka, systematically organizing his forces in secret. After 14 years of rigorous preparation and ultimate dedication, King Walagamba marched with his grand Sinhalese army, completely vanquished the Dravidian rulers, recaptured Anuradhapura, and was consecrated as the supreme emperor of Lanka for the second time.

Upon reclaiming his sovereignty, King Walagamba did not forget for a single moment his deeply cherished queen, Soma Devi, who had allowed herself to be captured by the enemy to save his life. The King immediately initiated diplomatic relations with the rulers of India, and by paying a massive treasure as compensation, he repatriated Queen Soma Devi—who had been held captive in the Chola Kingdom—back to Sri Lanka with grand honors and a majestic royal procession. Following her return, to honor her peerless heroism, the King consecrated her once again as his chief queen consort (Agra Mehesiya).

Chapter 4: The Monument of Love and the Birth of "Somarama"
To eternalize his respect, profound love, and the monumental sacrifice made by his queen, Soma Devi, King Walagamba selected a beautiful, sacred plot of land situated a short distance from the Mahamevnawa Park in Anuradhapura. The King constructed a grand monastic complex and an elegant stupa here, dedicated to the name of Queen Soma Devi. Blending his queen's name, "Soma", the King initially named this sanctuary "Somarama". Later, because it stood as a monument of pure light illuminating the entire island of Sri Lanka, it entered history under the name "Lankarama".

The architectural design of the Lankarama Stupa was exceptionally graceful:

The Aesthetic Form: The monument was designed in the elegant Bubbulakara (bubble) shape, capturing the perfect symmetry of a water bubble.

The Relic House Structure: Much like the Thuparama, a splendid circular relic house (Vatadage) was constructed around the Lankarama Stupa to shield the monument from wind and rain.

The Monolithic Pillars: Encircling the monument were eighty-eight (88) slender, delicately carved granite pillars arranged in three concentric rows. A large majority of these monolithic pillars still stand intact across the Lankarama grounds today.

Sacred Enshrinement: Enshrined deep within the massive dome (Garbha) of the stupa are the sacred bodily relics (Sarvagna Dhatu) of the Buddha.

Chapter 5: An Eternal Sacred Legacy
Following its completion, King Walagamba and Queen Soma Devi dedicated the Lankarama Maha Vihara as a sacred offering to the Maha Sangha. Chronicles record that a separate convent was also designated here specifically for the community of Buddhist nuns (Bhikkhunis). Over the centuries, successive monarchs who ruled Lanka continuously renovated and preserved Lankarama. Although the stupa suffered damage during the dark eras when the Anuradhapura kingdom collapsed into wilderness, it was completely restored in the modern era, opening its gates to global pilgrims as the pristine white monument we see today.
EOD
,
            'blueprint_text' => 'Similar to Thuparamaya, Lankarama features a Vatadage design. The stupa is built on a circular platform raised above the ground, surrounded by three rows of beautiful monolithic stone pillars that once supported a wooden structure. The columns are decorated with delicate carvings of lions and dwarfs.',
            'blueprint_image' => '/images/lankarama_blueprint.jpg',
        ],
        'lovamahaprasada-1' => [
            'name' => 'Lovamahaprasada',
                        'lat' => 8.3458,
            'lng' => 80.3975,
'image' => '/images/lovamahaprasaya_1779380558455.png',
            'topic' => 'The Brazen Palace, an ancient multistoried building with hundreds of stone pillars, once a grand monastery.',
            'history_narrative' => <<<'EOD'
Chapter 1: The Model of a Celestial Mansion and the Inscription on the Stone Pillar
A wondrous evening had dawned in the third century BCE. Arahat Mahinda Maha Thero, who had gifted the light of the Sublime Dhamma to the land of Lanka, and King Devanampiyatissa were walking serenely in the royal Mahamevnawa Park. Strolling through the tranquil environment filled with the fragrance of wild flowers, Arahat Mahinda paused at a specific spot situated a short distance from the site designated for the sacred Jaya Sri Maha Bodhi tree. A powerful, majestic gaze emanated from his serene eyes, as if looking deep into the future. Arahat Mahinda looked at the King and spoke in a calm, composed voice:

"Great King, this ground is no ordinary earth. In the future, a 'Chapter House' (Uposathagara / Poya Ge) will be constructed on this exact plot of land for the Maha Sangha. It is destined to become the eternal center for great monastic discussions and ecclesiastical acts (Vinaya Karma) of the Buddha Sasana."

Hearing this, King Devanampiyatissa’s heart overflowed with profound faith ($Saddha$). He took immediate action, erecting a preliminary chapter house on the site, and fashioned a massive stone pillar ($Gal\ Tamba$) for future generations, engraving upon it in clear Brahmi script: "In the future, a great destined king named Dutugemunu will arise and construct a magnificent mansion of nine stories on this very location."

One hundred and forty years passed. History unfolded exactly as Arahat Mahinda had prophesied. King Dutugemunu the Great, who had brought the land of Lanka under a single canopy of state, discovered and read this ancient stone pillar in the Mahamevnawa Park of Anuradhapura. Seeing his own name etched upon it, the King was filled with immense joy and spiritual emotion. The King desired that the structure he would build for the Maha Sangha should not mirror the form of an ordinary earthly building, but should instead capture the likeness of a celestial mansion (Vimana) found in the heavenly realms.

To fulfill the King's noble aspiration, eight Arahat monks possessing immense supernatural powers ($Iddhi$) instantly ascended to the Tavatimsa Heaven. There, they beheld the magnificent "Bharani Prasada"—a dazzling celestial mansion carved of gold, silver, pearls, and gems belonging to the divine nymph (Apsara) named Bharani. The Arahat monks meticulously drew the entire architectural layout and geometric form of that celestial mansion on a piece of cloth using red vermilion (Hingul), gifting the architectural blueprint to King Dutugemunu. The King was overjoyed and commenced construction immediately.

Chapter 2: The Forest of Stone Pillars and the Architecture of the Nine-Storied Mansion
King Dutugemunu deployed the country's finest master craftsmen, carpenters, and stone engineers to construct what was destined to be the largest and tallest building in the ancient Eastern world. To sustain the colossal weight of this massive palace and the walls of its nine stories, it was resolved to use exceptionally strong granite pillars.

The architectural layout of this structural marvel was as follows:

The Forest of Stone Pillars: To fortify the ground floor of the palace, massive granite pillars were planted several feet deep into the earth, arranged in a perfect grid of 40 columns by 40 rows, totaling 1,600 stone pillars. Today, anyone visiting the sacred city of Anuradhapura can still witness this grand forest of monolithic stone pillars planted by King Dutugemunu.

The Nine-Storied Palace: Rising majestically atop these massive stone pillars was a colossal mansion consisting of nine floors ($9\ Floors$). Its height and width measured one hundred riyans (over 150 feet) on every side. It towered toward the heavens like a massive mountain of solid rock.

Chambers and Monastic Cells: Within this nine-storied mansion, 900 residential chambers (monastic cells) were created for the venerable monks. The lower floors were allocated to ordinary monks, the middle floors were reserved for the learned Dhamma-bearers versed in the Tripitaka, and the uppermost floors were dedicated exclusively to the enlightened Arahats possessing spiritual powers.

Chapter 3: The Bronze Roof and the Interior Splendor
This grand mansion earned the name "Lovamahaprasada" (The Brazen Palace) due to the specialized and highly expensive metal technology utilized for its roofing. The King had the entirety of this nine-storied mansion roofed with plates of copper and bronze ($Copper\ and\ Bronze\ Roof$). During the day, as the bright rays of the sun fell upon it, the copper roof glistened with a golden hue across the entire Anuradhapura kingdom, while at night, it took on a silver sheen under the moonlight. Because it was a great palace characterized by a bronze (metal) roof, it entered history under the name "Lovamahaprasada" (Metal + Great + Palace).

The interior decorations and grand splendor of the palace were absolutely breathtaking:

The Grand Refectory: At the absolute center of the palace lay a magnificent alms hall embellished with carvings of gold, silver, pearls, and gems.

The Ivory Throne: At the center of the refectory, a grand royal seat (pulpit) fashioned from pure ivory, inlaid with chrysoberyl stones and gold filigree, was constructed for the monks to deliver Dhamma discourses.

Sacred Utensils: All the vessels, water pitchers, and spoons used within the alms hall were crafted from pure gold and silver.

Upon its completion, King Dutugemunu dedicated this grand palace as a sacred offering to the Maha Sangha, holding a grand week-long alms-giving ceremony to mark its inauguration. From that moment, it became the administrative headquarters for the Buddhist clergy and ecclesiastic affairs of Lanka.

Chapter 4: The Conflagrations and Rising from the Ashes Through the Ages
Since the upper stories of the Lovamahaprasada were constructed primarily out of timber and brickwork, the monument fell victim to devastating fire accidents and foreign desecration several times throughout history:

The First Destruction: During the reign of King Saddha Tissa (who succeeded King Dutugemunu), a sudden fire sparked by a lamp completely razed the grand palace to the ground. King Saddha Tissa took immediate action, rebuilding it as a seven-storied structure.

The Desecration by King Mahasen: During the reign of King Mahasen, who had fallen into conflict with the monks of the Maha Vihara, the Lovamahaprasada was completely demolished under the heretical instigation of the monk Sanghamitta. Its gold and silver treasures were plundered to embellish the rival Abhayagiri Vihara. Later, a deeply remorseful King Mahasen reconstructed the palace himself.

The Chola Invasions: During the South Indian Chola invasions of the fifth and tenth centuries, foreign invaders completely plundered the priceless bronze roofing material along with the gold and silver treasures within, causing severe structural damage to the palace.

Chapter 5: The Final Restoration by King Parakramabahu the Great
Before the golden age of the Anuradhapura Kingdom drew to a close, King Parakramabahu the Great, who ruled the island from Polonnaruwa in the 12th century, infused fresh life into the Lovamahaprasada one last time.

King Parakramabahu realigned and re-erected all the old stone pillars that had collapsed over time, completely restoring the grand mansion. The 1,600 stone pillars we see today standing in the sacred grounds of the Anuradhapura Maha Vihara—positioned gracefully between the Jaya Sri Maha Bodhi and the Thuparama Stupa—are the monumental stone testimonies left behind by the final restoration of King Parakramabahu.
EOD
,
            'blueprint_text' => 'The structure originally had nine stories and could accommodate up to a thousand monks. Today, the ruins consist of a forest of 1,600 stone pillars arranged in a perfect square grid of 40x40. Each stone pillar stands about 3.5 meters (11.5 ft) high, representing the foundation of this massive multi-level timber structure.',
            'blueprint_image' => '/images/lovamahaprasada_blueprint.jpg',
            'gallery' => [
                '/images/lovamahaprasada_gallery_1.jpg',
                '/images/lovamahaprasada_gallery_2.jpg',
                '/images/lovamahaprasada_gallery_3.jpg',
                '/images/lovamahaprasada_gallery_4.jpg',
            ],
        ],
        'lovamahaprasada-2' => [
            'name' => 'Lovamahaprasada',
            'image' => '/images/lovamahaprasaya_1779380558455.png',
            'topic' => 'The magnificent ruins of the Brazen Palace, standing as a testament to the grand monastic life of ancient times.',
            'history_narrative' => <<<'EOD'
Chapter 1: The Model of a Celestial Mansion and the Inscription on the Stone Pillar
A wondrous evening had dawned in the third century BCE. Arahat Mahinda Maha Thero, who had gifted the light of the Sublime Dhamma to the land of Lanka, and King Devanampiyatissa were walking serenely in the royal Mahamevnawa Park. Strolling through the tranquil environment filled with the fragrance of wild flowers, Arahat Mahinda paused at a specific spot situated a short distance from the site designated for the sacred Jaya Sri Maha Bodhi tree. A powerful, majestic gaze emanated from his serene eyes, as if looking deep into the future. Arahat Mahinda looked at the King and spoke in a calm, composed voice:

"Great King, this ground is no ordinary earth. In the future, a 'Chapter House' (Uposathagara / Poya Ge) will be constructed on this exact plot of land for the Maha Sangha. It is destined to become the eternal center for great monastic discussions and ecclesiastical acts (Vinaya Karma) of the Buddha Sasana."

Hearing this, King Devanampiyatissa’s heart overflowed with profound faith ($Saddha$). He took immediate action, erecting a preliminary chapter house on the site, and fashioned a massive stone pillar ($Gal\ Tamba$) for future generations, engraving upon it in clear Brahmi script: "In the future, a great destined king named Dutugemunu will arise and construct a magnificent mansion of nine stories on this very location."

One hundred and forty years passed. History unfolded exactly as Arahat Mahinda had prophesied. King Dutugemunu the Great, who had brought the land of Lanka under a single canopy of state, discovered and read this ancient stone pillar in the Mahamevnawa Park of Anuradhapura. Seeing his own name etched upon it, the King was filled with immense joy and spiritual emotion. The King desired that the structure he would build for the Maha Sangha should not mirror the form of an ordinary earthly building, but should instead capture the likeness of a celestial mansion (Vimana) found in the heavenly realms.

To fulfill the King's noble aspiration, eight Arahat monks possessing immense supernatural powers ($Iddhi$) instantly ascended to the Tavatimsa Heaven. There, they beheld the magnificent "Bharani Prasada"—a dazzling celestial mansion carved of gold, silver, pearls, and gems belonging to the divine nymph (Apsara) named Bharani. The Arahat monks meticulously drew the entire architectural layout and geometric form of that celestial mansion on a piece of cloth using red vermilion (Hingul), gifting the architectural blueprint to King Dutugemunu. The King was overjoyed and commenced construction immediately.

Chapter 2: The Forest of Stone Pillars and the Architecture of the Nine-Storied Mansion
King Dutugemunu deployed the country's finest master craftsmen, carpenters, and stone engineers to construct what was destined to be the largest and tallest building in the ancient Eastern world. To sustain the colossal weight of this massive palace and the walls of its nine stories, it was resolved to use exceptionally strong granite pillars.

The architectural layout of this structural marvel was as follows:

The Forest of Stone Pillars: To fortify the ground floor of the palace, massive granite pillars were planted several feet deep into the earth, arranged in a perfect grid of 40 columns by 40 rows, totaling 1,600 stone pillars. Today, anyone visiting the sacred city of Anuradhapura can still witness this grand forest of monolithic stone pillars planted by King Dutugemunu.

The Nine-Storied Palace: Rising majestically atop these massive stone pillars was a colossal mansion consisting of nine floors ($9\ Floors$). Its height and width measured one hundred riyans (over 150 feet) on every side. It towered toward the heavens like a massive mountain of solid rock.

Chambers and Monastic Cells: Within this nine-storied mansion, 900 residential chambers (monastic cells) were created for the venerable monks. The lower floors were allocated to ordinary monks, the middle floors were reserved for the learned Dhamma-bearers versed in the Tripitaka, and the uppermost floors were dedicated exclusively to the enlightened Arahats possessing spiritual powers.

Chapter 3: The Bronze Roof and the Interior Splendor
This grand mansion earned the name "Lovamahaprasada" (The Brazen Palace) due to the specialized and highly expensive metal technology utilized for its roofing. The King had the entirety of this nine-storied mansion roofed with plates of copper and bronze ($Copper\ and\ Bronze\ Roof$). During the day, as the bright rays of the sun fell upon it, the copper roof glistened with a golden hue across the entire Anuradhapura kingdom, while at night, it took on a silver sheen under the moonlight. Because it was a great palace characterized by a bronze (metal) roof, it entered history under the name "Lovamahaprasada" (Metal + Great + Palace).

The interior decorations and grand splendor of the palace were absolutely breathtaking:

The Grand Refectory: At the absolute center of the palace lay a magnificent alms hall embellished with carvings of gold, silver, pearls, and gems.

The Ivory Throne: At the center of the refectory, a grand royal seat (pulpit) fashioned from pure ivory, inlaid with chrysoberyl stones and gold filigree, was constructed for the monks to deliver Dhamma discourses.

Sacred Utensils: All the vessels, water pitchers, and spoons used within the alms hall were crafted from pure gold and silver.

Upon its completion, King Dutugemunu dedicated this grand palace as a sacred offering to the Maha Sangha, holding a grand week-long alms-giving ceremony to mark its inauguration. From that moment, it became the administrative headquarters for the Buddhist clergy and ecclesiastic affairs of Lanka.

Chapter 4: The Conflagrations and Rising from the Ashes Through the Ages
Since the upper stories of the Lovamahaprasada were constructed primarily out of timber and brickwork, the monument fell victim to devastating fire accidents and foreign desecration several times throughout history:

The First Destruction: During the reign of King Saddha Tissa (who succeeded King Dutugemunu), a sudden fire sparked by a lamp completely razed the grand palace to the ground. King Saddha Tissa took immediate action, rebuilding it as a seven-storied structure.

The Desecration by King Mahasen: During the reign of King Mahasen, who had fallen into conflict with the monks of the Maha Vihara, the Lovamahaprasada was completely demolished under the heretical instigation of the monk Sanghamitta. Its gold and silver treasures were plundered to embellish the rival Abhayagiri Vihara. Later, a deeply remorseful King Mahasen reconstructed the palace himself.

The Chola Invasions: During the South Indian Chola invasions of the fifth and tenth centuries, foreign invaders completely plundered the priceless bronze roofing material along with the gold and silver treasures within, causing severe structural damage to the palace.

Chapter 5: The Final Restoration by King Parakramabahu the Great
Before the golden age of the Anuradhapura Kingdom drew to a close, King Parakramabahu the Great, who ruled the island from Polonnaruwa in the 12th century, infused fresh life into the Lovamahaprasada one last time.

King Parakramabahu realigned and re-erected all the old stone pillars that had collapsed over time, completely restoring the grand mansion. The 1,600 stone pillars we see today standing in the sacred grounds of the Anuradhapura Maha Vihara—positioned gracefully between the Jaya Sri Maha Bodhi and the Thuparama Stupa—are the monumental stone testimonies left behind by the final restoration of King Parakramabahu.
EOD
,
            'blueprint_text' => 'The structure originally had nine stories and could accommodate up to a thousand monks. Today, the ruins consist of a forest of 1,600 stone pillars arranged in a perfect square grid of 40x40. Each stone pillar stands about 3.5 meters (11.5 ft) high, representing the foundation of this massive multi-level timber structure.',
            'blueprint_image' => '/images/lovamahaprasada_blueprint.jpg',
            'gallery' => [
                '/images/lovamahaprasada_gallery_1.jpg',
                '/images/lovamahaprasada_gallery_2.jpg',
                '/images/lovamahaprasada_gallery_3.jpg',
                '/images/lovamahaprasada_gallery_4.jpg',
            ],
        ],
        'isurumuniya' => [
            'name' => 'Isurumuniya Rajamaha Viharaya',
                        'lat' => 8.3344,
            'lng' => 80.3897,
'image' => '/images/isurumuniya_1779380577189.png',
            'topic' => 'A beautiful rock temple famous for its exquisite ancient stone carvings, including the renowned Isurumuniya Lovers.',
            'history_narrative' => <<<'EOD'
Chapter 1: The Sanctuary of Nobles and the Birth of "Issarasamana"
The third century BCE had dawned. Following the arrival of Arahat Mahinda Maha Thero and the establishment of the Buddha Sasana on the soil of Lanka, a massive religious renaissance swept across the city of Anuradhapura. Individuals from various social strata of society, deeply inspired by the Sublime Dhamma, entered the Buddhist monastic order.

While King Devanampiyatissa allocated the Maha Vihara and Chetiyagiri (Mihintale) for individuals from the higher royal lineages, he resolved to create a specialized monastic complex for the wealthy elite and nobles (Issaras) belonging to the Vaishya and Kshatriya clans of Anuradhapura who had entered the monkhood.

The King selected a tranquil, scenic terrain characterized by beautiful natural granite boulders and ponds, situated adjacent to the auspicious royal gardens and the Tisa Wewa. Because it served as the sanctuary where affluent nobles (Issaras) resided as ordained monks, this sacred ground was designated in ancient chronicles as the "Issarasamana Vihara" (The Monastery of Nobles). In the course of time, this classical name evolved within popular vernacular into "Isurumuniya".

Chapter 2: The Romantic Saga of Saliya and Asokamala
The moment the name Isurumuniya is spoken, the world immediately recalls its world-renowned stone relief, the "Isurumuniya Lovers". Behind this magnificent carving lies a deeply touching, true romantic saga recorded within the historical chronicles of Lanka.

Prince Saliya was the only son of King Dutugemunu the Great. He was the crown prince destined to inherit the vast empire of Anuradhapura. One day, while strolling through the beautiful Ranmasu Uyana (The Royal Goldfish Park) situated adjacent to Isurumuniya, the prince beheld an exceptionally beautiful young maiden gathering flowers and fell profoundly in love with her.

Her name was Asokamala. Although she possessed unparalleled beauty, she belonged to a caste deemed low by the conventions of contemporary society (the Chandala clan). Prince Saliya resolved to make her his queen consort. Upon hearing this news, King Dutugemunu and the royal council became furious. The King issued a stern geopolitical decree to Prince Saliya:

"Prince, erase this low-caste maiden from your mind immediately. Fail to do so, and you shall forfeit the grand crown of Lanka and your sovereign right to the throne forever!"

Prince Saliya did not hesitate for a single moment. Looking at the grand throne and the imperial crown, he declared with immense pride:

"For the sake of my love and Asokamala, I can discard any grand kingdom or imperial crown in this universe like a worthless blade of grass!"

Prince Saliya renounced his right to the throne forever and departed from the palace to live as a commoner alongside Asokamala. History records that the couple subsequently resided within the monastic grounds of the Isurumuniya Vihara. Witnessing this peerless devotion, a gifted Sinhalese artisan of the 4th century CE etched the love of Saliya and Asokamala into a solid granite boulder as an immortal monument. This masterpiece is the iconic 'Isurumuniya Lovers' relief we behold today.

Chapter 3: The Sinhalese Artistic Marvel Carved in Granite
The Isurumuniya Vihara stands as the preeminent epicenter of ancient Sinhalese stone carving artistry. Deep iconographic and historical meanings are embedded within each of its iconic reliefs:

The Man and the Horse Head: Carved into the surface of the natural granite rock face, this relief depicts a powerful, majestic man seated in a regal posture with the head of a horse etched behind his shoulder. According to meteorological and historical interpretations, this composition symbolizes Parjanya (the god of rainclouds and rain) and Agni (the wind). It is widely regarded as a sacred symbolic invocation carved to govern the water levels of the adjacent Tisa Wewa.

The Bathing Elephants: Etched just above the water level of the Isurumuniya pond, these carvings of elephants are remarkably lifelike. The master artisan captured the animals in an incredibly natural state, depicting them as if they are actively drinking and splashing water within the pool.

The Royal Court: Another remarkable relief panel found at the site depicts a royal assembly, widely believed to represent King Dutugemunu, Queen Viharamaha Devi, and the dignitaries of the royal court.

Chapter 4: The Inaugural Resting Place of the Sacred Tooth Relic
In the 4th century CE, during the reign of King Kithsirimewan, Princess Hemamala and Prince Dantha risked their lives to carry the deeply venerated Sacred Tooth Relic (Dantha Dhatu) of the Buddha from the Kingdom of Kalinga in India to the island of Lanka.

The moment they reached Anuradhapura in secret, King Kithsirimewan personally received the Sacred Tooth Relic. Under strict royal security, the King safely deposited the relic and conducted the inaugural state offerings right here within the Isurumuniya Raja Maha Vihara.

Until a permanent palace was constructed specifically for the relic, the sacred ground of Isurumuniya served as the inaugural and highly secure sanctuary for the Sacred Tooth Relic. Consequently, Isurumuniya continuously received immense royal patronage throughout history.

Chapter 5: An Unshaken Heritage Through the Ages
The Isurumuniya Vihara was later extensively renovated and expanded by King Kasyapa (the monarch who created Sigiriya), who renamed it the "Bodhi Upulvan Kasupgiri Vihara", incorporating the names of his daughters into the sanctuary and dedicating grand religious festivals to it.

Although this monastery was eventually abandoned and swallowed by dense vegetation following the fall of the Anuradhapura Kingdom, its ruins were rediscovered and restored during the Kandyan Kingdom by King Kirti Sri Rajasinha. He commissioned the creation of the present image house and the serene reclining Buddha statue.
EOD
,
            'blueprint_text' => 'The temple is built around a low rock cliff. It has a beautiful pond at the base of the rock, from which relief carvings of elephants emerge. Above the pond is a shrine room carved into the cave, and a small stupa sits on top of the rock boulder, offering panoramic views of the Royal Gardens.',
            'blueprint_image' => '/images/isurumuniya_blueprint.jpg',
            'gallery' => [
                '/images/isurumuniya_gallery_1.jpg',
                '/images/isurumuniya_gallery_2.jpg',
                '/images/isurumuniya_gallery_3.jpg',
                '/images/isurumuniya_gallery_4.jpg',
            ],
        ],
        'vessagiriya' => [
            'name' => 'Vessagiriya',
                        'lat' => 8.3242,
            'lng' => 80.3931,
'image' => '/images/vessagiriya_monastery.png',
            'topic' => 'An ancient forest monastery complex where pious monks meditated amidst scenic, rugged rock caves and serene surroundings.',
            'history_narrative' => <<<'EOD'
Chapter 1: The Ordination of Five Hundred Vaishya Princes
The third century BCE had dawned. Following the arrival of Arahat Mahinda Maha Thero and the dissemination of the light of the Sublime Dhamma across the land of Lanka, thousands of individuals throughout the city of Anuradhapura embraced the Buddha Sasana, casting aside all barriers of caste and social strata.

While King Devanampiyatissa allocated the Maha Vihara for the highest royal lineages (Kshatriyas) and subsequently designated Isurumuniya for the affluent nobles (Issaras) of the Vaishya clan, five hundred (500) princes and youths belonging to the ordinary commercial and agricultural community—the Vaishya (Vessa) clan—entered the monastic order before Arahat Mahinda on the exact same day.

To provide these five hundred newly ordained monks with a deeply meditative and profoundly tranquil environment to dwell in, King Devanampiyatissa selected a secluded terrain situated at the southern boundary of the city of Anuradhapura, characterized by three massive granite rock outcrops and encircled by dense forest. Because this sanctuary was specifically dedicated to the individuals of the Vaishya (Vessa) clan, it was given the sacred name "Vessagiri Vihara" (The Monastery of the Vaishyas).

Chapter 2: The Drip-Ledge Caves and the Silent Meditation of the Arahats
Vessagiriya was not an imperial palace filled with monumental brick constructions, but an awe-inspiring monastic complex fashioned entirely from natural granite caves. Its infrastructure was developed in perfect harmony with the austere, renunciant nature of true sons of the Buddha:

Drip-Ledge Caves: To prevent monsoonal rainwater from cascading down the rock face and leaking into the living spaces, ancient Sinhalese sculptors meticulously chiseled fine channels high along the brows of the granite caves, carving drip-ledges (Kataram).

Ancient Brahmi Inscriptions: Directly beneath these drip-ledges, the names of the affluent patrons who dedicated the caves to the monastic order were engraved in ancient Brahmi script. Some of the oldest rock inscriptions discovered anywhere in Sri Lanka are preserved across these Vessagiriya caves.

Monolithic Stone Beds: Intricately carved directly into the living rock inside the caves are smooth granite beds designed for the venerable monks to sleep upon and utilize for deep meditative absorption (Dhyana).

Within twenty-three (23) rock caves distributed across the three massive granite formations of Vessagiriya, five hundred enlightened Arahat monks resided in absolute secrecy. In profound silence, they mastered their minds, cultivated higher meditative states, and experienced the sublime bliss of Nirvana. As night gave way to dawn, the only sound vibrating through the entire Vessagiriya hermitage was the serene, rhythmic breathing of these meditating sages.

Chapter 3: The Royal Sanctuary that Sheltered King Walagamba
In the first century BCE, when Anuradhapura fell to the seven ruthless South Indian Dravidian invaders and King Walagamba (Vattagamani Abhaya) was forced into helpless exile, the very first sanctuary that offered him protection was provided by the Arahat monks residing within the Vessagiri Vihara.

While the enemy forces combed through the capital city of Anuradhapura searching for members of the royal family, the monks of Vessagiriya acted with absolute secrecy, concealing the King and Queen Anula Devi deep within the safety of their caves.

The venerable community of monks, led by the enlightened sage Arahat Kupikkala Maha Tissa, guided the King on how to survive inside the dense wilderness. It was from this very sacred ground that the final blueprints were drawn to facilitate King Walagamba's retreat to the highly secure caverns of the Malaya region (the central highlands) to evade capture. Upon reclaiming his throne fourteen years later, a deeply grateful King Walagamba extensively renovated the Vessagiriya hermitage that had saved him from certain death.

Chapter 4: Advanced Architecture and Miraculous Cave Paintings
In the course of time, during the 5th century CE, King Kasyapa (the monarch who engineered the citadel of Sigiriya) extended immense royal patronage to the Vessagiri Vihara, transforming it into a expansive monastic university. Blending his own name with the names of his two beloved daughters, 'Bodhi' and 'Uppalavanna', the King renovated Vessagiriya and officially renamed it the "Bodhi Uppalavanna Kasupgiri Vihara".

During this golden era of Vessagiriya:

Structural Expansion: Alongside the natural rock caves, elegant brick-built chapter houses (Uposathagaras), grand alms halls, and small stupas were constructed across the landscape.

Vibrant Cave Art: Exquisite cave paintings (Frescoes), mirroring the distinct artistic style, pigments, and fine composition of the world-renowned Sigiriya Frescoes, were rendered across the rock ceilings of the Vessagiriya caves. Traces of these ancient masterpieces can still be faintly witnessed inside a specific cave at Vessagiriya today.

Chapter 5: A Living Testament to Wilderness Serenity
Following the tragic collapse of the Anuradhapura Kingdom, when the entire capital city was swallowed by a vast, dense jungle, the Vessagiriya hermitage surrendered to nature and was gradually forgotten. For over a millennium, these sacred ruins remained hidden deep within the heart of the forest until they were systematically brought back to light by archaeologists during the late 19th and early 20th centuries.

Today, as one travels to the southern boundaries of the sacred city of Anuradhapura, situated a short distance from Isurumuniya and completely removed from the bustle of modern life, the three massive granite rock outcrops and their collection of caves rise proudly across several acres of tranquil terrain.
EOD
,
            'blueprint_text' => 'The complex consists of natural rock shelters modified with drip ledges to prevent rain from entering. Monks used these caves as living quarters and meditation cells. The remains of a stupa, a chapter house, and refectory buildings are scattered among the boulders, connected by ancient stone pathways.',
            'blueprint_image' => '/images/vessagiriya_blueprint.jpg',
            'gallery' => [
                '/images/vessagiriya_gallery_1.jpg',
                '/images/vessagiriya_gallery_2.jpg',
                '/images/vessagiriya_gallery_3.jpg',
                '/images/vessagiriya_gallery_4.jpg',
            ],
        ],
        'srimahabodhi-malu' => [
            'name' => 'Sri Maha Bodhi Malu Vihara',
                        'lat' => 8.3447,
            'lng' => 80.3970,
'image' => '/images/srimaha_bodhi_malu_1779380597304.png',
            'topic' => 'A serene temple complex surrounding the sacred Bodhi tree, offering a profoundly peaceful environment for reflection.',
            'history_narrative' => 'The Sri Maha Bodhi Malu Vihara is a temple complex surrounding the sacred Mahamewna Gardens and the outer terraces of the Jaya Sri Maha Bodhi. It has been a site of continuous Buddhist worship, chanting, and meditation for over two millennia, serving as a sanctuary for pilgrims visiting the sacred tree.',
            'blueprint_text' => 'The temple grounds are arranged in a series of terraces. It features ancient stone altars, guard stones, and meditation pavilions (Pilima Ge) housing beautiful Buddha statues. The stone paths are shaded by ancient trees, creating a quiet space for spiritual reflection.',
            'blueprint_image' => '/images/srimahabodhi_malu_blueprint.jpg',
            'gallery' => [
                '/images/srimahabodhi_malu_gallery_1.jpg',
                '/images/srimahabodhi_malu_gallery_2.jpg',
                '/images/srimahabodhi_malu_gallery_3.jpg',
                '/images/srimahabodhi_malu_gallery_4.jpg',
            ],
        ],
        'mihintale' => [
            'name' => 'Mihintale',
                        'lat' => 8.3514,
            'lng' => 80.5167,
'image' => '/images/mihintale_peak.png',
            'topic' => 'The sacred mountain peak where Buddhism was introduced to Sri Lanka, featuring ancient steps and panoramic views.',
            'history_narrative' => <<<'EOD'
Chapter 1: The Auspicious Arrival of the Dhamma Mission at Ambasthala Peak
In the year 247 BCE, a wondrous evening on the full-moon day of Poson (Asela in ancient reckoning) had dawned. The throne of Anuradhapura in the island of Sri Lanka was occupied by King Devanampiyatissa. As a grand hunting festival had been proclaimed throughout the city that day, the King, bearing his royal bow and arrows in his right hand and surrounded by a massive army, arrived for a hunt in the dense wilderness of "Missaka Pawwa" (modern-day Mihintale), situated outside the city limits of Anuradhapura.

As the King advanced through the thick jungle, a highly majestic stag possessing immense past merit caught his eye, guided by the influence of a certain deity. The King immediately drew his bow string, preparing to release the arrow, but paused, thinking: "It is unbefitting of royal protocol to shoot an animal unawares from behind." Instead, he twanged his bow string to make a sound. Startled, the stag fled rapidly toward the upper Ambasthala plateau of Missaka Pawwa, and the King pursued it, running all the way to the summit of the rock.

The moment the King reached the Ambasthala plateau, the stag vanished into thin air. In its place, the King beheld a group of noble, merit-filled Maha Arahat monks clad in saffron robes, illuminating the entire environment with a serene aura.

Then, the majestic ascetic monk standing at the center of the group addressed the King directly by his name in a voice as resonant as thunder, yet brimming with immense compassion:
"Tissa... Tissa... Come here...!"

The King was profoundly startled and gripped by fear, wondering who this mysterious group could be that was bold enough to directly call out the name of the supreme sovereign of the entire island. To dispel the King's fear, Arahat Mahinda (the son of Emperor Ashoka) smiled gently and uttered the immortal, historic stanza that altered the entire trajectory of Sri Lankan history:
"Samana mayam maharaja - Dhammarajassa savaka
Tameva anukampaya - Jambudvipa idhagata..."
(Great King, we are recluses, disciples of the King of Dhamma, the Buddha. Out of compassion for you and all the people of Lanka, we have journeyed here from Jambudvipa...)

The moment he heard these noble words, the King dropped his great bow and arrows to the ground, placed both hands upon his head in worship, and knelt before the Maha Arahat in profound faith ($Saddha$). With the fall of that royal bow, the reign of weapons and bloodshed on the soil of Lanka came to an end, and the reign of wisdom and compassion officially began.

Chapter 2: "The Mango Tree Puzzle" that Tested the King's Intellect
Arahat Mahinda did not rush to immediately preach the Dhamma to the King. He wished to initially test whether the ruler of the nation possessed a sharp enough intellect to comprehend the profound depths of the Buddhist doctrine. To achieve this, he presented the King with "The Mango Tree Puzzle"—the first recorded intelligence test in world history—using a nearby mango tree as the subject:

Arahat Mahinda: "Great King, what tree is this?"
King: "Venerable Sir, this is a mango tree."
Arahat Mahinda: "Great King, are there other mango trees besides this one?"
King: "Venerable Sir, there are many other mango trees."
Arahat Mahinda: "Great King, are there other trees besides those mango trees and this mango tree?"
King: "Venerable Sir, there are many other trees which are not mango trees."
Arahat Mahinda: "Great King, besides all those mango trees and the trees that are not mango trees, is there any other tree?"

The King, without a moment's hesitation, replied with exceptional brilliance:
"Venerable Sir, there remains only this very tree under which I am standing!"

Following the King's highly logical and clever response, Arahat Mahinda posed another series of questions regarding the King's kinsmen, firmly establishing that the monarch possessed a highly advanced mind with supreme retention.

Subsequently, he preached the Chullahatthipadopama Sutta (The Shorter Discourse on the Elephant's Footprint Simile) to the King and his assembly, which encapsulates the core tenets of Buddhism. At the conclusion of the sermon, King Devanampiyatissa, the royal court, and the hunting party took refuge in the Triple Gem, becoming devout lay disciples (Upasakas).

Chapter 3: The Dedication of 68 Drip-Ledge Caves and the First Hermitage of Lanka
Following the spiritual revolution that took place at Mihintale, King Devanampiyatissa ordered that the Mihintale mountain (Chetiyagiri) be converted into a grand monastic sanctuary. To provide Arahat Mahinda and the community of monks with shelter to observe the rainy season retreat (Vassa), the King undertook the preparation of the natural granite caves situated along the slopes of Mihintale.

Ancient Sinhalese artisans chiseled drip-ledges (Kataram) along the brows of the granite cliffs to ensure that rainwater would not seep into the living quarters, clearing and preparing the caves for comfortable habitation. The King dedicated sixty-eight (68) of these highly secure, serene drip-ledge caves simultaneously to the Maha Sangha led by Arahat Mahinda.

This stood as the very first wilderness forest hermitage established in the history of Sri Lanka. As night fell, hundreds of Arahat monks resided within these 68 caves in absolute tranquility, cultivating higher meditative states and experiencing the bliss of Nirvana. Mihintale thus became the great epicenter radiating spiritual energy across the entire island. Arahat Mahinda resided on this sacred mountain until the final days of his life, where he eventually attained passing away (Parinirvana).

Chapter 4: The Monumental Ruins of Mihintale and Visual Engineering
In the course of time, Mihintale evolved beyond a holy mountain to become a massive monastic city and an independent university supporting over 2,000 resident monks. Its architectural grandeur continues to astound us to this day:

The Grand Staircase (1,840 Stone Steps): To reach the summit of the Mihintale mountain, a monumental stone staircase chiseled out of solid granite runs beneath the shade of beautiful temple trees (Frangipani). Consisting of 1,840 steps, it is regarded as one of the most scenic and largest ancient staircases in all of Asia.

The Mihintale Inscription Tablets: Flanking the entrance of the ancient refectory stand two massive stone tablets containing inscriptions that detail the administration of the monastery, the regulations of the clergy, and the institutional wages paid to physicians, laborers, and carpenters. This serves as supreme historical evidence of ancient Sinhalese management practices.

The Alms Boats (The Rice Boat): Inside the grand refectory lie wondrous stone troughs chiseled out of solid granite, exceeding 20 feet in length, used to distribute rice and gruel (Kenda) to thousands of monks simultaneously.

The Mihintale Hospital: Situated at the foot of the mountain and equipped with a specialized monolithic stone medicinal bath (Medicinal Bath Container), this hospital complex is officially recognized by archaeologists as the world's oldest archaeologically documented hospital.

The engineering prowess of the era is vividly displayed across the site through the architectural composition of the Kantaka Chetiya, the Maha Seya which enshrined the Urna Roma relic (the sacred hair relic from between the eyebrows of the Buddha), the Mihindu Guhava (the narrow rock cave where Arahat Mahinda meditated), and the Sinha Pokuna (Lion Pond) chiseled out of living rock.

Chapter 5: The Eternal Heartbeat of the Sri Lankan Chronicle
Mihintale stands as the true birthplace of Sri Lankan religion, culture, literature, art, architecture, and language. Were it not for the light of the Dhamma that erupted from Mihintale, the vast reservoirs, the sky-high stupas, and the proud, independent Sinhalese identity we witness today would never have come into existence.

Although Mihintale surrendered to nature and was swallowed by dense jungles when Anuradhapura collapsed under foreign invasions, its sacred ruins were systematically uncovered and restored in the modern era, elevated today as the most sacred 'Poson Sanctuary' for the inhabitants of Lanka.
EOD
,
            'blueprint_text' => 'A grand stone staircase of 1,840 steps leads up to the summit of the mountain. The site features several important monuments: the Kantaka Cetiya with its beautiful stone carvings, the Ambasthala Dagoba (built where the meeting took place), the Maha Stupa on the peak, and the Aradhana Gala rock where Mahinda landed.',
            'blueprint_image' => '/images/mihintale_blueprint.jpg',
            'gallery' => [
                '/images/mihintale_gallery_1.jpg',
                '/images/mihintale_gallery_2.jpg',
                '/images/mihintale_gallery_3.jpg',
                '/images/mihintale_gallery_4.jpg',
            ],
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
        'lat' => $spotInfo['lat'] ?? null,
        'lng' => $spotInfo['lng'] ?? null,
        'gallery' => isset($spotInfo['gallery']) ? $spotInfo['gallery'] : array_map(function($i) use ($id) {
            return "https://picsum.photos/seed/" . crc32($id . $i) . "/800/600";
        }, range(1, 12))
    ];

    return Inertia::render('History', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'spot' => $mockSpot
    ]);
});

Route::get('/crafts/{category}', function ($category) {
    // For now we assume category is rajarata-pottery
    return Inertia::render('CraftCategory', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'category' => $category
    ]);
});

Route::get('/crafts/item/{id}', function ($id) {
    return Inertia::render('CraftItem', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'itemId' => $id
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/predict-demand', [ForecastController::class, 'getLiveDemandForecast']);
Route::post('/api/predict-demand', [ForecastController::class, 'getLiveDemandForecast']);

// Smart Pricing Routes
Route::get('/smart-pricing', [SmartPricingController::class, 'index'])->name('smart-pricing.index');
Route::post('/api/smart-pricing/predict', [SmartPricingController::class, 'predict'])->name('smart-pricing.predict');

// Vendor Dashboard Route
Route::get('/vendor/pricing/optimization', function () {
    return Inertia\Inertia::render('Vendor/PriceOptimization');
})->middleware(['auth', 'verified'])->name('vendor.pricing.optimization');

Route::get('/translator', function () {
    return Inertia::render('Translator', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'initialTab' => 'translator',
    ]);
})->name('translator');

Route::get('/forecast', function () {
    return Inertia::render('Translator', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'initialTab' => 'forecast',
    ]);
})->name('forecast');

Route::post('/translate', [App\Http\Controllers\TranslationController::class, 'translate']);
Route::get('/translate/status', [App\Http\Controllers\TranslationController::class, 'status']);

require __DIR__.'/auth.php';


