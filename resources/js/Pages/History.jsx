import { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import Navbar from "@/Layouts/Navbar";
import Footer from "@/Layouts/Footer";
import { motion } from "framer-motion";
import InteractiveMap from "@/Components/InteractiveMap";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import axios from "axios";

export default function History({ auth, spot }) {
    // Default to location to match the wireframe image, but normally history
    const [activeTab, setActiveTab] = useState("history");
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedLocation, setSearchedLocation] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [locationAddress, setLocationAddress] = useState(null);
    const [isGeocodingAddress, setIsGeocodingAddress] = useState(false);

    // Auto-refresh spot data for real-time updates when on the location tab
    useEffect(() => {
        let interval;
        if (activeTab === "location") {
            interval = setInterval(() => {
                router.reload({
                    only: ["spot"],
                    preserveState: true,
                    preserveScroll: true,
                    showProgress: false,
                });
            }, 3000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [activeTab]);

    // Reverse-geocode the active location (searched location takes priority over spot coords)
    useEffect(() => {
        const lat = searchedLocation ? searchedLocation.lat : spot?.lat;
        const lng = searchedLocation ? searchedLocation.lng : spot?.lng;

        if (searchedLocation?.name) {
            // Nominatim already gave us a display_name — use it directly
            setLocationAddress(searchedLocation.name);
            return;
        }

        if (!lat || !lng) {
            setLocationAddress(null);
            return;
        }

        setIsGeocodingAddress(true);
        fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`,
            { headers: { "Accept-Language": "en" } },
        )
            .then((res) => res.json())
            .then((data) => {
                if (data && data.display_name) {
                    const addr = data.address || {};
                    const parts = [
                        addr.village ||
                            addr.town ||
                            addr.city ||
                            addr.municipality ||
                            addr.county,
                        addr.state_district || addr.state,
                        addr.country,
                    ].filter(Boolean);
                    setLocationAddress(
                        parts.length > 0 ? parts.join(", ") : data.display_name,
                    );
                } else {
                    setLocationAddress(null);
                }
            })
            .catch(() => setLocationAddress(null))
            .finally(() => setIsGeocodingAddress(false));
    }, [spot?.lat, spot?.lng, searchedLocation]);

    const handleSearch = async (e) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            setIsSearching(true);
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`,
                );
                const data = await res.json();
                if (data && data.length > 0) {
                    setSearchedLocation({
                        lat: parseFloat(data[0].lat),
                        lng: parseFloat(data[0].lon),
                        name: data[0].display_name,
                    });
                    setActiveTab("location");
                } else {
                    alert("Location not found");
                }
            } catch (error) {
                console.error(error);
                alert("Error searching for location");
            } finally {
                setIsSearching(false);
            }
        }
    };

    // Booking Flow State
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [bookingForm, setBookingForm] = useState({
        name: "",
        email: "",
        phone: "",
        language: "English",
        attendance: 1,
        agreement: false,
    });
    const [bookingErrors, setBookingErrors] = useState({});
    const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(null);
    const [thewawaBookingOpen, setThewawaBookingOpen] = useState(false);
    const [thewawaPaymentOpen, setThewawaPaymentOpen] = useState(false);
    const [thewawaReceipt, setThewawaReceipt] = useState(null);
    const [thewawaForm, setThewawaForm] = useState({
        date: "",
        puja: "Kanchuka Puja",
        name: "",
        email: "",
        phone: "",
        amount: "5000",
    });

    const handleThewawaBooking = (event) => {
        event.preventDefault();
        setThewawaPaymentOpen(true);
    };

    const completeThewawaPayment = (event) => {
        event.preventDefault();
        setThewawaPaymentOpen(false);
        setThewawaBookingOpen(false);
        setThewawaReceipt(`TW-${Date.now().toString().slice(-8)}`);
    };

    const openThewawaBooking = (puja = "Kanchuka Puja") => {
        setThewawaReceipt(null);
        setThewawaForm((current) => ({
            ...current,
            puja,
            amount:
                puja === "Atawisi and 108-Bowl Puja" || puja === "Alms-giving"
                    ? "10000"
                    : "5000",
        }));
        setThewawaBookingOpen(true);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        setBookingErrors({});

        if (!bookingForm.agreement) {
            setBookingErrors({
                agreement: "You must agree to the guidelines to proceed.",
            });
            return;
        }

        setIsSubmittingBooking(true);
        try {
            const res = await axios.post("/api/retreat-booking", {
                ...bookingForm,
                date: selectedDate,
                slot: selectedSlot,
            });
            if (res.data.status === "success") {
                setBookingSuccess(res.data.reference);
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setBookingErrors(error.response.data.errors);
            } else {
                setBookingErrors({
                    general:
                        "An error occurred while booking. Please try again.",
                });
            }
        } finally {
            setIsSubmittingBooking(false);
        }
    };

    const category = spot?.category || "Sacred Sites";
    let historyLabel = "History of the Sacred Site"; // Default fallback

    if (category === "Spiritual Experiences & Wellness") {
        historyLabel = "History of the Sacred Site";
    } else if (category === "Nature & Wildlife") {
        historyLabel = "About the Nature Reserve";
    } else if (category === "Historical Ruins" || category === "Heritage") {
        historyLabel = "History of the Ruins";
    } else if (category === "Hydraulic") {
        historyLabel = "History of the Hydraulic Site";
    } else if (category === "Rituals") {
        historyLabel = "About the Rituals";
    } else if (category === "Sacred Sites") {
        historyLabel = "History of the Sacred Site";
    } else {
        historyLabel = `About the ${category}`;
    }

    // â”€â”€â”€ Per-spot Thewawa / ritual data keyed by spot.id â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const thewawaData = {
        thuparamaya: {
            heroImage: "/images/thuparamaya_1779380449379.png",
            heroAlt: "Thuparamaya",
            heroSubtitle:
                "A puja guide for devotees visiting the Thuparamaya Dagoba, the oldest stupa in Sri Lanka.",
            dailySchedules: [
                {
                    title: "Aluyama Thewawa",
                    time: "05:30 AM â€“ 06:15 AM",
                    image: "/images/bodhi_pooja_isurumuniya_1779804442648.png",
                    detail: "The dawn offering period at Thuparamaya, including Bodhi Puja and lamp lighting around the vatadage columns. Devotees observe in silence as monks conduct the opening rites.",
                    steps: [
                        "Arrive before 05:30 AM, wearing white attire.",
                        "Place flowers only in the designated tray near the entrance; do not approach the relic chamber.",
                        "Stand quietly and avoid photography during active chanting.",
                    ],
                },
                {
                    title: "Dawal Puja",
                    time: "10:00 AM â€“ 11:00 AM",
                    image: "/images/atavisi_buddha_pooja_1779804459576.png",
                    detail: "The midday offering at Thuparamaya with 108-lamp and flower arrangements. Dana offerings of cooked rice may be coordinated through the custodian priest.",
                    steps: [
                        "Contact the head monk the day before to arrange a sponsored dana offering.",
                        "Deliver cooked food at the designated dana hall by 09:45 AM.",
                        "Remain in the outer courtyard during the monks' mealtime.",
                    ],
                },
                {
                    title: "Sandhya Thewawa",
                    time: "06:00 PM â€“ 07:00 PM",
                    image: "/images/gilanpasa_pooja_1779804420756.png",
                    detail: "The evening lamp-lighting ceremony, one of the most atmospheric at Thuparamaya with oil lamps placed around the ancient vatadage pillars at dusk.",
                    steps: [
                        "Contribute oil lamps through the temple counter; individual placement is not permitted.",
                        "Walk clockwise around the stupa in silence.",
                        "Leave the premises quietly before the gates close at 07:30 PM.",
                    ],
                },
            ],
            specialPujas: [
                [
                    "Kanchuka Puja",
                    "/images/kanchuka_pooja_1779804339624.png",
                    "A robe-offering procession around the Thuparamaya stupa, typically conducted on Poya days by an appointed dana sponsor.",
                    [
                        "Arrange sponsorship with the temple office at least one week in advance.",
                        "Join the procession only when directed by the custodian monk.",
                        "Do not enter the restricted inner chamber during the ceremony.",
                    ],
                ],
                [
                    "Kapruka Puja",
                    "/images/kapruk_pooja_1779804403588.png",
                    "A wish-tree offering performed at the Thuparamaya bo-tree shrine adjacent to the stupa.",
                    [
                        "Receive the ritual thread from the appointed temple worker.",
                        "Silently state your intention and do not tie anything to the sacred tree directly.",
                        "Leave the thread arrangement intact for the monk to complete.",
                    ],
                ],
                [
                    "Atawisi and 108-Bowl Puja",
                    "/images/atavisi_buddha_pooja_1779804459576.png",
                    "An offering honouring the 28 Buddhas with 108 bowls of flowers or rice, hosted by a dana sponsor at Thuparamaya.",
                    [
                        "Coordinate the bowl count and menu with the temple organiser in advance.",
                        "Deliver offerings at the designated point by 09:30 AM.",
                        "Allow the clergy to distribute; visitors observe from the outer courtyard.",
                    ],
                ],
            ],
            pilgrimGuide: [
                "Wear pure white attire â€” colour prints are not permitted inside the sacred precinct.",
                "Remove footwear and headwear at the entrance arch.",
                "Circumambulate the stupa clockwise and maintain silence near the vatadage.",
            ],
        },
        "jaya-sri": {
            heroImage: "/images/jaya_sri_maha_bodhi.png",
            heroAlt: "Jaya Sri Maha Bodhi",
            heroSubtitle:
                "A puja guide for pilgrims visiting the sacred Jaya Sri Maha Bodhi, the world's oldest recorded tree.",
            dailySchedules: [
                {
                    title: "Aluyama Bodhi Puja",
                    time: "05:30 AM â€“ 06:30 AM",
                    image: "/images/bodhi_pooja_isurumuniya_1779804442648.png",
                    detail: "The pre-dawn Bodhi Puja at the Sri Maha Bodhi platform. Water, flowers, and incense are offered to the sacred tree by ordained members; devotees participate from the lower terrace.",
                    steps: [
                        "Arrive before 05:30 AM in white attire.",
                        "Place offerings â€” flowers, water pots, or incense â€” only at the designated ledge, not directly at the tree enclosure.",
                        "Kneel or stand quietly; photography is permitted only from the outer railing.",
                    ],
                },
                {
                    title: "Dawal Puja",
                    time: "10:00 AM â€“ 11:00 AM",
                    image: "/images/atavisi_buddha_pooja_1779804459576.png",
                    detail: "The midday puja with lamp lighting and chanting by resident monks at the Sri Maha Bodhi upper platform.",
                    steps: [
                        "Purchase oil lamps from the counter near the gate.",
                        "Hand lamps to the attendant for placement; do not approach the tree enclosure independently.",
                        "Join the chanting if you know the Bodhi Vandana stanza.",
                    ],
                },
                {
                    title: "Sandhya Puja",
                    time: "06:00 PM â€“ 07:30 PM",
                    image: "/images/gilanpasa_pooja_1779804420756.png",
                    detail: "The most attended evening puja at Sri Maha Bodhi, featuring hundreds of oil lamps on the terraced platform and communal pirith chanting.",
                    steps: [
                        "Arrive by 05:45 PM to secure a place on the lower terrace.",
                        "Contribute oil lamps at the counter; placement is managed by temple staff.",
                        "Maintain silence during pirith chanting and exit in a clockwise direction.",
                    ],
                },
            ],
            specialPujas: [
                [
                    "Bodhi Puja (Sponsored)",
                    "/images/kanchuka_pooja_1779804339624.png",
                    "A privately sponsored full Bodhi Puja with 108 oil lamps, flower garlands, and pirith chanting arranged through the Mahanayaka office.",
                    [
                        "Submit a written request to the temple administration at least two weeks ahead.",
                        "Provide all materials listed in the temple's dana guide.",
                        "The sponsor family may sit in the designated VIP area during the puja.",
                    ],
                ],
                [
                    "Gilanpasa Offering",
                    "/images/gilanpasa_pooja_1779804420756.png",
                    "A traditional medicinal-beverage and fruit offering to the resident monks at the Sri Maha Bodhi chapter house.",
                    [
                        "Prepare approved beverages (herbal drinks, fruit juice) and present them before midday.",
                        "Offer through the chapter-house attendant â€” do not distribute directly to monks.",
                        "Observe the five precepts during your time at the premises.",
                    ],
                ],
                [
                    "Atawisi Puja",
                    "/images/atavisi_buddha_pooja_1779804459576.png",
                    "A ceremony honouring the 28 Buddhas with individual flower offerings placed in 28 dedicated niches around the platform.",
                    [
                        "Obtain a 28-flower set from the temple counter.",
                        "Follow the guide monk to each niche in the correct sequence.",
                        "Complete the circuit clockwise without stopping in restricted areas.",
                    ],
                ],
            ],
            pilgrimGuide: [
                "Wear only white â€” no coloured prints or logos permitted on the sacred platform.",
                "Remove footwear at the first arch and do not re-enter with them until beyond the outer gate.",
                "Do not touch, lean on, or feed the sacred Bodhi tree or its enclosure fence.",
            ],
        },
        ruwanweli: {
            heroImage: "/images/ruwanweli_maha_seya.png",
            heroAlt: "Ruwanwelisaya",
            heroSubtitle:
                "A puja guide prepared for devotees visiting the Jaya Sri Maha Bodhi and Ruwanwelisaya.",
            dailySchedules: [
                {
                    title: "Aluyama Thewawa",
                    time: "05:15 AM â€“ 06:00 AM",
                    image: "/images/bodhi_pooja_isurumuniya_1779804442648.png",
                    detail: "The early-morning offering period, including Buddha Puja and Kiripindu Puja. Devotees observe quietly and follow the officiating monks' instructions.",
                    steps: [
                        "Arrive before the published start time and dress respectfully.",
                        "Place flowers or other permitted offerings only where the temple attendants direct.",
                        "Stand or sit quietly during the chanting and offering; do not interrupt the clergy.",
                    ],
                },
                {
                    title: "Dawal Buddha Puja Thewawa",
                    time: "10:15 AM â€“ 11:30 AM",
                    image: "/images/atavisi_buddha_pooja_1779804459576.png",
                    detail: "The midday Buddha Puja period associated here with 108 curry offerings, Gilanpasa, and traditional Hevisi. The offering is made by the temple or dana organisers, not self-served by visitors.",
                    steps: [
                        "Register or coordinate with the temple or dana organiser if you are sponsoring an offering.",
                        "Deliver prepared food or materials through the designated receiving point and observe food-safety instructions.",
                        "Remain outside restricted areas while monks conduct the offering and musical observances.",
                    ],
                },
                {
                    title: "Gilanpasa and Sandhya Thewawa",
                    time: "06:00 PM â€“ 07:00 PM",
                    image: "/images/gilanpasa_pooja_1779804420756.png",
                    detail: "The evening offering period for Gilanpasa, flowers, and lamps. Gilanpasa is traditionally a non-solid beverage or medicinal refreshment offered to the monastic community according to the temple's practice.",
                    steps: [
                        "Offer permitted drinks, flowers, or lamps through the appointed attendant.",
                        "Never place a flame, liquid, or flower directly on a sacred object unless instructed.",
                        "Keep pathways clear and leave quietly after the service.",
                    ],
                },
            ],
            specialPujas: [
                [
                    "Kanchuka Puja",
                    "/images/kanchuka_pooja_1779804339624.png",
                    "A robe offering presented around a stupa during an organised ceremony.",
                    [
                        "Confirm the date, route, and role permitted to visitors with the temple organiser.",
                        "Join the procession only when directed and keep the robe clean and off the ground.",
                        "Do not climb the stupa or enter restricted areas.",
                    ],
                ],
                [
                    "Kapruka Puja",
                    "/images/kapruk_pooja_1779804403588.png",
                    "A devotional offering associated with a kapruk or wish-fulfilling-tree arrangement and prayer thread.",
                    [
                        "Receive the thread or offering from the appointed organiser.",
                        "Make your intention privately and participate without pulling or tying anything to a sacred structure.",
                        "Leave the arrangement intact after the ceremony.",
                    ],
                ],
                [
                    "Atawisi and 108-Bowl Puja",
                    "/images/atavisi_buddha_pooja_1779804459576.png",
                    "An offering honouring the 28 Buddhas; the 108-bowl form is a special food and flower offering when arranged by the temple or dana sponsor.",
                    [
                        "Coordinate the menu, quantity, and delivery time with the temple or organiser.",
                        "Submit food and flowers at the designated receiving point.",
                        "Allow the clergy to conduct the offering and follow directions for distribution afterward.",
                    ],
                ],
            ],
            pilgrimGuide: [
                "Wear pure white attire.",
                "Remove shoes and hats, and remain silent during rituals.",
                "Participate respectfully in daily pujas at the Upper Maluwa.",
            ],
        },
        abhayagiriya: {
            heroImage: "/images/abhayagiri_1779380471030.png",
            heroAlt: "Abhayagiriya",
            heroSubtitle:
                "A puja guide for pilgrims visiting the Abhayagiri Vihara, the great monastery of the northern fraternity.",
            dailySchedules: [
                {
                    title: "Aluyama Puja",
                    time: "06:00 AM â€“ 06:45 AM",
                    image: "/images/bodhi_pooja_isurumuniya_1779804442648.png",
                    detail: "The morning offering at Abhayagiriya, with flower and lamp offerings at the stupa base. This monastic complex follows the Mahayana-influenced northern tradition.",
                    steps: [
                        "Arrive dressed in white before 06:00 AM.",
                        "Deposit flowers at the offering ledge near the main entrance; independent placement on the stupa is prohibited.",
                        "Observe silence during the morning chanting conducted by resident monks.",
                    ],
                },
                {
                    title: "Dawal Sangha Dana",
                    time: "10:30 AM â€“ 11:30 AM",
                    image: "/images/atavisi_buddha_pooja_1779804459576.png",
                    detail: "The midday dana (alms-giving) at Abhayagiriya's refectory. Lay visitors may sponsor a full Sangha dana with prior arrangement through the head monk.",
                    steps: [
                        "Contact the chapter house at least three days in advance to register a Sangha Dana.",
                        "Deliver cooked food of the approved menu by 10:15 AM.",
                        "Maintain silence in the refectory precincts.",
                    ],
                },
                {
                    title: "Sandhya Vandana",
                    time: "06:00 PM â€“ 07:00 PM",
                    image: "/images/gilanpasa_pooja_1779804420756.png",
                    detail: "The evening lamp-lighting and stupa circumambulation. Hundreds of oil lamps are lit around the stupa base at dusk, creating a memorable atmosphere.",
                    steps: [
                        "Purchase oil lamps from the counter near the car park.",
                        "Hand your lamp to the temple worker for placement; the inner perimeter is restricted.",
                        "Walk clockwise and exit without disrupting the circumambulation flow.",
                    ],
                },
            ],
            specialPujas: [
                [
                    "Stupa Vandana Puja",
                    "/images/kanchuka_pooja_1779804339624.png",
                    "A full stupa-circumambulation ceremony with pirith chanting and 108-lamp offering at Abhayagiriya, usually hosted on Full-Moon (Poya) nights.",
                    [
                        "Join the procession at the eastern gate; procession starts punctually at dusk.",
                        "Carry only the oil lamp provided by the temple counter.",
                        "Complete the full seven circuits in silence.",
                    ],
                ],
                [
                    "Gilanpasa Puja",
                    "/images/gilanpasa_pooja_1779804420756.png",
                    "An afternoon offering of medicinal beverages and light refreshments to the Abhayagiri Sangha, following the Vinaya schedule.",
                    [
                        "Bring only liquids approved in the Vinaya (herbal teas, fruit juice, honey water).",
                        "Present items to the chapter-house attendant by noon.",
                        "Do not offer solid food after the midday deadline.",
                    ],
                ],
                [
                    "Atawisi Puja",
                    "/images/atavisi_buddha_pooja_1779804459576.png",
                    "A ceremony honouring the 28 Buddhas with flower offerings at Abhayagiriya, conducted by the custodian monk.",
                    [
                        "Obtain a flower set from the temple store before the ceremony.",
                        "Follow the monk's directions at each of the 28 niches.",
                        "Maintain the clockwise sequence without interruption.",
                    ],
                ],
            ],
            pilgrimGuide: [
                "Wear white clothing â€” the site respects both Theravada and Mahayana traditions; mixed dress is not appropriate.",
                "Remove footwear at the outer courtyard entrance.",
                "The moonstone at the main entrance is a protected artefact â€” do not step on it.",
            ],
        },
        jetavanaramaya: {
            heroImage: "/images/jetavanarama_1779380489792.png",
            heroAlt: "Jetavanaramaya",
            heroSubtitle:
                "A puja guide for pilgrims visiting the Jetavanaramaya, once the tallest structure in the ancient world.",
            dailySchedules: [
                {
                    title: "Aluyama Puja",
                    time: "06:00 AM â€“ 06:45 AM",
                    image: "/images/bodhi_pooja_isurumuniya_1779804442648.png",
                    detail: "Morning veneration at the Jetavanarama stupa, focusing on the relic chamber and the central altar with flower and incense offerings.",
                    steps: [
                        "Arrive before 06:00 AM wearing white attire.",
                        "Use the main eastern entrance and place flowers in the tray provided.",
                        "Observe silence as the presiding monk reads the morning pirith.",
                    ],
                },
                {
                    title: "Dawal Puja",
                    time: "11:00 AM â€“ 12:00 PM",
                    image: "/images/atavisi_buddha_pooja_1779804459576.png",
                    detail: "Midday puja with 108-lamp and dana offerings at the Jetavanaramaya museum-monastery site. Arrangements must be made with the custodian archaeologist-monk.",
                    steps: [
                        "Coordinate with the site office if you wish to sponsor a lamp or dana offering.",
                        "Deliver materials at the receiving point by 10:45 AM.",
                        "Visitors observe from outside the active ritual boundary.",
                    ],
                },
                {
                    title: "Sandhya Puja",
                    time: "06:00 PM â€“ 07:00 PM",
                    image: "/images/gilanpasa_pooja_1779804420756.png",
                    detail: "Evening circumambulation and lamp offering at Jetavanaramaya. The stupa's enormous scale makes the lamplight especially impressive at dusk.",
                    steps: [
                        "Lamps are available at the site office counter for a nominal fee.",
                        "Walk clockwise around the stupa's base level.",
                        "Photography is permitted from the outer path only during the evening puja.",
                    ],
                },
            ],
            specialPujas: [
                [
                    "Kanchuka Puja",
                    "/images/kanchuka_pooja_1779804339624.png",
                    "A robe-offering ceremony conducted by the Jetavanarama custodian monk on designated Poya days.",
                    [
                        "Contact the site administration one week in advance to sponsor.",
                        "Participate in the procession from the eastern entrance.",
                        "Do not enter the excavated inner zones during the ceremony.",
                    ],
                ],
                [
                    "Bodhi Puja",
                    "/images/bodhi_pooja_isurumuniya_1779804442648.png",
                    "A Bodhi tree puja at the small Bodhi shrine within the Jetavanarama precinct.",
                    [
                        "Purchase a flower set from the site office.",
                        "Present flowers to the attending monk for placement at the Bodhi shrine.",
                        "Recite the Bodhi Vandana if you know it.",
                    ],
                ],
                [
                    "Atawisi Puja",
                    "/images/atavisi_buddha_pooja_1779804459576.png",
                    "An Atawisi Puja honouring the 28 Buddhas, conducted at the Jetavanarama altar on Full Moon Poya days.",
                    [
                        "Obtain the 28-flower set at the site counter.",
                        "Follow the guide monk's circuit in strict order.",
                        "Do not break the sequence or handle offerings belonging to other donors.",
                    ],
                ],
            ],
            pilgrimGuide: [
                "Wear white or plain light-coloured clothing â€” bright prints are disrespectful on an active sacred site.",
                "Do not climb the stupa or sit on any archaeological structure.",
                "Keep noise to a minimum; the site serves both pilgrims and researchers.",
            ],
        },
        mirisawetiya: {
            heroImage: "/images/mirisawetiya_1779380509748.png",
            heroAlt: "Mirisawetiya Stupa",
            heroSubtitle:
                "A puja guide for devotees visiting the Mirisawetiya Stupa, built by King Dutugemunu to enshrine the Buddha's relic scepter.",
            dailySchedules: [
                {
                    title: "Aluyama Puja",
                    time: "05:30 AM â€“ 06:30 AM",
                    image: "/images/bodhi_pooja_isurumuniya_1779804442648.png",
                    detail: "Dawn offerings at Mirisawetiya's lakeside altar. The stupa, rising beside the Tissa Wewa, is especially serene in the early morning. Monks conduct a brief pirith ceremony before sunrise.",
                    steps: [
                        "Arrive before 05:30 AM and enter via the southern gate.",
                        "Place flower baskets at the offering ledge by the base; do not approach the harmika.",
                        "Observe silence throughout the morning pirith.",
                    ],
                },
                {
                    title: "Dawal Puja",
                    time: "10:00 AM â€“ 11:00 AM",
                    image: "/images/atavisi_buddha_pooja_1779804459576.png",
                    detail: "Midday dana and lamp offering coordinated by the caretaker monk at Mirisawetiya. The ceremony includes a reading from the Mahavamsa account of King Dutugemunu's vow.",
                    steps: [
                        "Register a dana sponsorship with the caretaker monk the morning of your visit.",
                        "Deliver meals to the dana hall by 09:45 AM.",
                        "Sit quietly in the assembly area during the Mahavamsa recitation.",
                    ],
                },
                {
                    title: "Sandhya Thewawa",
                    time: "06:00 PM â€“ 07:00 PM",
                    image: "/images/gilanpasa_pooja_1779804420756.png",
                    detail: "Evening lamp offering with the Tissa Wewa as a backdrop. The reflected lamplight on the lake makes this one of the most photographed evening ceremonies in Anuradhapura.",
                    steps: [
                        "Purchase oil lamps at the site entrance.",
                        "Hand lamps to the attendant for placing on the terraced offering shelf.",
                        "Photography is permitted from the outer path; flash is not.",
                    ],
                },
            ],
            specialPujas: [
                [
                    "Dutugemunu Commemoration Puja",
                    "/images/kanchuka_pooja_1779804339624.png",
                    "An annual puja commemorating King Dutugemunu's vow, held on the Esala Poya (July Full Moon), with a flag procession around the stupa.",
                    [
                        "Arrive before 05:00 AM for the procession assembly near the entrance.",
                        "White national dress is required for participation.",
                        "Follow the monk marshals throughout the procession.",
                    ],
                ],
                [
                    "Gilanpasa Puja",
                    "/images/gilanpasa_pooja_1779804420756.png",
                    "A medicinal-beverage offering to the resident monks at Mirisawetiya's small chapter house.",
                    [
                        "Bring approved beverages (herbal drinks, juice) in sealed containers.",
                        "Present to the chapter-house attendant before noon.",
                        "Observe the five precepts during your visit.",
                    ],
                ],
                [
                    "Atawisi Puja",
                    "/images/atavisi_buddha_pooja_1779804459576.png",
                    "A 28-Buddha offering ceremony at the Mirisawetiya altar, open to sponsored pilgrims on Poya days.",
                    [
                        "Obtain a 28-flower set from the caretaker.",
                        "Follow the monk's guidance at each of the 28 stations.",
                        "Complete the circuit without breaking the procession.",
                    ],
                ],
            ],
            pilgrimGuide: [
                "Wear white â€” the lakeside setting is serene, and respectful attire is essential.",
                "Remove footwear at the outer archway.",
                "The stupa is an active archaeological zone; do not touch or lean on the brick surface.",
            ],
        },
        lankarama: {
            heroImage: "/images/lankaramaya_1779380541763.png",
            heroAlt: "Lankarama",
            heroSubtitle:
                "A puja guide for devotees visiting the Lankarama Vatadage, famed for its encircling monolithic pillars.",
            dailySchedules: [
                {
                    title: "Aluyama Puja",
                    time: "06:00 AM â€“ 06:45 AM",
                    image: "/images/bodhi_pooja_isurumuniya_1779804442648.png",
                    detail: "Morning flower and lamp offering at the Lankarama vatadage. The circular stone pillars create a unique silhouette at dawn. Monks conduct a short pirith chant before departing.",
                    steps: [
                        "Enter through the forest path from the western car park before 06:00 AM.",
                        "Place flowers gently at the base offering ledge â€” do not climb the stone pillars.",
                        "Maintain silence; the site is also a forest meditation area.",
                    ],
                },
                {
                    title: "Midday Offering",
                    time: "10:30 AM â€“ 11:30 AM",
                    image: "/images/atavisi_buddha_pooja_1779804459576.png",
                    detail: "A simple midday offering of flowers and incense conducted by the forest monk associated with Lankarama. Dana is coordinated through the resident hermitage.",
                    steps: [
                        "Visit the small hermitage to the north of the stupa and speak with the forest monk.",
                        "Dana offerings (cooked meals) must be agreed the day before.",
                        "Maintain silence throughout the hermitage grounds.",
                    ],
                },
                {
                    title: "Sandhya Puja",
                    time: "06:00 PM â€“ 07:00 PM",
                    image: "/images/gilanpasa_pooja_1779804420756.png",
                    detail: "A quiet evening lamp-offering at Lankarama. The forest setting and encircling stone pillars create an atmospheric dusk ceremony.",
                    steps: [
                        "Bring your own oil lamp if you prefer â€” the site does not always have a counter.",
                        "Place the lamp at the designated stone slab near the stupa base.",
                        "Depart before nightfall as the forest path is unlit after 07:30 PM.",
                    ],
                },
            ],
            specialPujas: [
                [
                    "Forest Dana",
                    "/images/kanchuka_pooja_1779804339624.png",
                    "A special forest-monk dana offered at the hermitage attached to Lankarama, emphasising simplicity and mindfulness.",
                    [
                        "Arrive the previous day to register with the hermitage monk.",
                        "Bring simple, oil-free vegetarian food as specified by the monk.",
                        "Observe noble silence during the offering.",
                    ],
                ],
                [
                    "Bodhi Puja",
                    "/images/bodhi_pooja_isurumuniya_1779804442648.png",
                    "A small Bodhi Puja at the young Bo sapling planted beside the Lankarama stupa.",
                    [
                        "Obtain flowers at the site entrance.",
                        "Offer flowers at the base of the Bo sapling; never cut or touch the branches.",
                        "Recite a short Bodhi Vandana silently.",
                    ],
                ],
                [
                    "Pirith Ceremony",
                    "/images/atavisi_buddha_pooja_1779804459576.png",
                    "A full-night pirith chanting ceremony occasionally held at Lankarama on significant Poya days.",
                    [
                        "Confirm dates in advance with the hermitage monk.",
                        "Participants must observe the eight precepts for the duration of the ceremony.",
                        "Bring a white cloth to sit on during the night session.",
                    ],
                ],
            ],
            pilgrimGuide: [
                "The site is partly forest â€” wear white and apply mosquito repellent.",
                "Remove footwear before entering the stupa clearing.",
                "Do not lean against or climb the ancient stone pillars â€” they are fragile.",
            ],
        },
        "lovamahaprasada-1": {
            heroImage: "/images/lovamahaprasaya_1779380558455.png",
            heroAlt: "Lovamahaprasada",
            heroSubtitle:
                "A guide for pilgrims visiting the Lovamahaprasada (Brazen Palace), an ancient nine-storied monastic palace.",
            dailySchedules: [
                {
                    title: "Morning Remembrance",
                    time: "07:00 AM â€“ 08:00 AM",
                    image: "/images/bodhi_pooja_isurumuniya_1779804442648.png",
                    detail: "A short morning offering at the Lovamahaprasada precinct, recalling its original function as the chapter house of the Sangha. The custodian monk leads a brief Dhamma recitation among the 1,600 stone pillars.",
                    steps: [
                        "Enter from the eastern side adjacent to the Ruwanwelisaya.",
                        "Flower offerings are placed at the small shrine at the north-western corner.",
                        "Maintain silence and do not sit on the stone pillars.",
                    ],
                },
                {
                    title: "Midday Dhamma Talk",
                    time: "11:00 AM â€“ 12:00 PM",
                    image: "/images/atavisi_buddha_pooja_1779804459576.png",
                    detail: "An occasional Dhamma discourse held in the open-air hall formed by the remaining pillars.",
                    steps: [
                        "Check with the custodian monk on arrival whether a Dhamma talk is scheduled.",
                        "Bring a small mat or cloth to sit on the grassed area.",
                        "Mobile devices should be silenced; questions are welcome after the talk.",
                    ],
                },
                {
                    title: "Evening Reflection",
                    time: "05:30 PM â€“ 06:30 PM",
                    image: "/images/gilanpasa_pooja_1779804420756.png",
                    detail: "A quiet evening meditation period among the pillars as the setting sun illuminates the ancient stonework.",
                    steps: [
                        "Arrive before 05:30 PM.",
                        "Sit quietly in a row of pillars; guided meditation is available on request.",
                        "Depart before the archaeological zone closes at 06:30 PM.",
                    ],
                },
            ],
            specialPujas: [
                [
                    "Pillar Veneration",
                    "/images/kanchuka_pooja_1779804339624.png",
                    "A ceremonial walk through all 40 rows of granite pillars with chanting, offered in memory of the original monastic residents.",
                    [
                        "Follow the monk leading the circuit from the north-eastern corner.",
                        "Do not touch or mark the stone pillars.",
                        "The walk takes approximately 30 minutes.",
                    ],
                ],
                [
                    "Sangha Dana",
                    "/images/gilanpasa_pooja_1779804420756.png",
                    "A Sangha dana offered to monks from the adjacent Ruwanwelisaya chapter in memory of the original Lovamahaprasada community.",
                    [
                        "Arrange with the Ruwanwelisaya temple administration.",
                        "Deliver food at the chapter house before 10:30 AM.",
                        "Observe silence during the monks' meal.",
                    ],
                ],
                [
                    "Atawisi Puja",
                    "/images/atavisi_buddha_pooja_1779804459576.png",
                    "An Atawisi offering held in the open courtyard of the Lovamahaprasada on Full Moon Poya days.",
                    [
                        "Join the ceremony from the open eastern side.",
                        "Flower offerings are distributed at the entrance.",
                        "Follow the monk's sequence through the 28 stations.",
                    ],
                ],
            ],
            pilgrimGuide: [
                "Wear white â€” the site is a living heritage space shared with active monks from Ruwanwelisaya.",
                "Do not sit on, lean against, or touch any of the 1,600 stone pillars.",
                "The site has no roof â€” bring an umbrella or hat for sun protection.",
            ],
        },
        isurumuniya: {
            heroImage: "/images/isurumuniya_1779380577189.png",
            heroAlt: "Isurumuniya Rajamaha Viharaya",
            heroSubtitle:
                "A puja guide for devotees visiting the Isurumuniya Rock Temple, famed for its ancient carvings and cave shrines.",
            dailySchedules: [
                {
                    title: "Aluyama Puja",
                    time: "06:00 AM â€“ 07:00 AM",
                    image: "/images/bodhi_pooja_isurumuniya_1779804442648.png",
                    detail: "Morning puja at the cave shrine of Isurumuniya, including offerings to the reclining Buddha statue carved into the rock face.",
                    steps: [
                        "Enter through the rock arch and remove footwear at the base of the steps.",
                        "Place flowers at the shrine ledge â€” do not touch the carved stone figures.",
                        "The cave shrine is small; wait your turn if it is occupied.",
                    ],
                },
                {
                    title: "Dawal Puja",
                    time: "10:00 AM â€“ 11:00 AM",
                    image: "/images/atavisi_buddha_pooja_1779804459576.png",
                    detail: "Midday offering at the upper shrine of Isurumuniya, overlooking the Tissa Wewa. The priest conducts a puja with incense, lamps, and flowers.",
                    steps: [
                        "Climb the rock steps carefully â€” they are steep and wet in the rainy season.",
                        "Offer incense sticks or flower bundles at the tray provided.",
                        "Observe the five-minute silent period after the main chanting.",
                    ],
                },
                {
                    title: "Sandhya Puja",
                    time: "06:00 PM â€“ 07:00 PM",
                    image: "/images/gilanpasa_pooja_1779804420756.png",
                    detail: "The evening puja at Isurumuniya's poolside altar, overlooking the ancient rock-cut pool with elephant carvings.",
                    steps: [
                        "Use the main lower entrance for the evening session.",
                        "Purchase oil lamps at the temple counter.",
                        "Do not enter the pool area or disturb the elephant carvings.",
                    ],
                },
            ],
            specialPujas: [
                [
                    "Elephant Pool Offering",
                    "/images/kanchuka_pooja_1779804339624.png",
                    "A special offering beside the ancient elephant-carved rock pool at Isurumuniya, typically on Poya days.",
                    [
                        "Observe from the paved viewing platform above the pool.",
                        "Flower boats may be offered â€” purchase from the temple counter.",
                        "Photography is permitted from the platform; no flash near the carvings.",
                    ],
                ],
                [
                    "Lovers' Carving Blessing",
                    "/images/gilanpasa_pooja_1779804420756.png",
                    "A blessing ceremony at the museum showcase of the famous Isurumuniya Lovers carving, offered for couples seeking marital blessings.",
                    [
                        "Visit the on-site museum and speak with the curator monk.",
                        "A small donation to the museum fund is customary.",
                        "Photography of the carving is permitted without flash.",
                    ],
                ],
                [
                    "Pirith Chanting",
                    "/images/atavisi_buddha_pooja_1779804459576.png",
                    "A weekly pirith chanting held at the cave shrine on Friday evenings.",
                    [
                        "Arrive before 06:30 PM and take your seat in the cave antechamber.",
                        "Observe the eight precepts if you choose to participate in the all-night session.",
                        "Do not record or broadcast the ceremony without the head monk's permission.",
                    ],
                ],
            ],
            pilgrimGuide: [
                "Wear white â€” the cave shrine is small and modesty of dress is particularly important.",
                "Remove footwear at the entrance arch; the rock steps can be slippery.",
                "Do not photograph the Isurumuniya Lovers carving with flash.",
            ],
        },
        vessagiriya: {
            heroImage: "/images/vessagiriya_monastery.png",
            heroAlt: "Vessagiriya",
            heroSubtitle:
                "A guide for pilgrims visiting the Vessagiriya Forest Monastery, a network of ancient cave meditation cells.",
            dailySchedules: [
                {
                    title: "Dawn Meditation",
                    time: "05:30 AM â€“ 07:00 AM",
                    image: "/images/bodhi_pooja_isurumuniya_1779804442648.png",
                    detail: "A guided meditation session in the forest cave cells of Vessagiriya, led by the resident forest monk. The offering is one of mindful silence.",
                    steps: [
                        "Arrive at the forest path entrance before 05:30 AM.",
                        "Bring a mat and wear white; insect repellent is advisable.",
                        "Follow the monk's instructions for cave allocation.",
                    ],
                },
                {
                    title: "Midday Dhamma",
                    time: "10:00 AM â€“ 11:30 AM",
                    image: "/images/atavisi_buddha_pooja_1779804459576.png",
                    detail: "An informal Dhamma discussion at the open-air assembly rock near the central clearing of Vessagiriya.",
                    steps: [
                        "Bring a simple vegetarian meal offering for the resident forest monk.",
                        "Sit in silence until the monk invites questions.",
                        "Mobile phones must be switched off during the Dhamma session.",
                    ],
                },
                {
                    title: "Sunset Walk",
                    time: "05:30 PM â€“ 06:30 PM",
                    image: "/images/gilanpasa_pooja_1779804420756.png",
                    detail: "A mindful walking meditation through the Vessagiriya boulders guided by the forest monk at dusk.",
                    steps: [
                        "Wear comfortable white clothing and closed-toe shoes.",
                        "Walk in single file and maintain silence throughout.",
                        "Do not enter the boulder caves independently after 06:00 PM.",
                    ],
                },
            ],
            specialPujas: [
                [
                    "Forest Dana",
                    "/images/kanchuka_pooja_1779804339624.png",
                    "A simple alms-giving at the Vessagiriya forest hermitage, offered in the tradition of forest-dwelling monks.",
                    [
                        "Coordinate one day in advance with the resident monk.",
                        "Bring only simple, oil-free vegetarian food.",
                        "Observe noble silence from arrival to departure.",
                    ],
                ],
                [
                    "Inscription Reading Tour",
                    "/images/gilanpasa_pooja_1779804420756.png",
                    "A specialist tour of the Brahmi cave inscriptions at Vessagiriya led by an archaeologist or senior monk.",
                    [
                        "Pre-book through the Central Cultural Fund office in Anuradhapura.",
                        "Do not touch or trace the inscriptions.",
                        "Photography is permitted â€” no flash near the inscriptions.",
                    ],
                ],
                [
                    "Pirith Night",
                    "/images/atavisi_buddha_pooja_1779804459576.png",
                    "An occasional all-night pirith ceremony held at the forest clearing on significant Poya nights.",
                    [
                        "Confirm dates with the forest hermitage in advance.",
                        "Observe the eight precepts for the duration of the night.",
                        "Bring a warm layer; the boulder area is cool after midnight.",
                    ],
                ],
            ],
            pilgrimGuide: [
                "Wear white and closed-toe shoes â€” the terrain is rocky and the forest has snakes.",
                "Do not enter any cave independently â€” always follow a resident monk or guide.",
                "Silence is the primary offering at Vessagiriya; speaking is limited to essential communication.",
            ],
        },
        "srimahabodhi-malu": {
            heroImage: "/images/srimaha_bodhi_malu_1779380597304.png",
            heroAlt: "Sri Maha Bodhi Malu Vihara",
            heroSubtitle:
                "A puja guide for pilgrims visiting the Sri Maha Bodhi Malu Vihara, the ancient temple surrounding the sacred Bodhi precinct.",
            dailySchedules: [
                {
                    title: "Aluyama Puja",
                    time: "05:30 AM â€“ 06:30 AM",
                    image: "/images/bodhi_pooja_isurumuniya_1779804442648.png",
                    detail: "Pre-dawn flower and lamp offering at the Malu Vihara shrine hall. The main Buddha image is illuminated with oil lamps during the morning session.",
                    steps: [
                        "Arrive before 05:30 AM; the inner hall opens only during puja times.",
                        "Place flowers in the silver tray before the main image.",
                        "Do not walk in front of worshippers already prostrating.",
                    ],
                },
                {
                    title: "Dawal Puja",
                    time: "10:00 AM â€“ 11:00 AM",
                    image: "/images/atavisi_buddha_pooja_1779804459576.png",
                    detail: "Midday puja with special oil-lamp and flower offerings coordinated by the Malu Vihara chief incumbent.",
                    steps: [
                        "Speak with the temple attendant to contribute to the midday lamp offering.",
                        "Deliver flowers in sealed bags to the offering counter by 09:45 AM.",
                        "Observe silence during the recitation of the Suttas.",
                    ],
                },
                {
                    title: "Sandhya Puja",
                    time: "06:00 PM â€“ 07:00 PM",
                    image: "/images/gilanpasa_pooja_1779804420756.png",
                    detail: "Evening puja at the Malu Vihara, offering incense and lamps in the outer courtyard adjacent to the sacred Bodhi tree fence.",
                    steps: [
                        "Purchase incense and flowers at the outer gate.",
                        "Offer at the designated courtyard altar, not at the Bodhi tree fence directly.",
                        "Follow the monk's announcement for the direction of prostrations.",
                    ],
                },
            ],
            specialPujas: [
                [
                    "Bodhi Puja (Sponsored)",
                    "/images/kanchuka_pooja_1779804339624.png",
                    "A sponsored Bodhi Puja at the Malu Vihara with 108 oil lamps circling the precinct, offered on behalf of the donor family.",
                    [
                        "Apply to the chief incumbent two weeks in advance.",
                        "Provide 108 oil lamps and garlands as listed in the temple's specification.",
                        "The donor family may sit in the inner courtyard during the ceremony.",
                    ],
                ],
                [
                    "Gilanpasa Offering",
                    "/images/gilanpasa_pooja_1779804420756.png",
                    "A traditional afternoon offering of herbal beverages and seasonal fruit to the resident monks of the Malu Vihara.",
                    [
                        "Bring liquids and fruit in sealed containers.",
                        "Present through the chapter-house attendant before noon.",
                        "Solid food is not accepted after 12:00 PM (midday).",
                    ],
                ],
                [
                    "Atawisi Puja",
                    "/images/atavisi_buddha_pooja_1779804459576.png",
                    "A 28-Buddha offering at the Malu Vihara altar, conducted on Full Moon Poya days.",
                    [
                        "Obtain the 28-flower set from the inner temple counter.",
                        "Follow the guide monk in clockwise order.",
                        "Do not skip stations or offer flowers out of sequence.",
                    ],
                ],
            ],
            pilgrimGuide: [
                "Wear white â€” the Malu Vihara is within the sacred Bodhi precinct and dress standards are strictly enforced.",
                "Remove footwear at the outer entrance arch.",
                "Do not eat, drink, or chew gum inside the temple boundaries.",
            ],
        },
        mihintale: {
            heroImage: "/images/mihintale_peak.png",
            heroAlt: "Mihintale",
            heroSubtitle:
                "A puja guide for pilgrims ascending Mihintale, the sacred mountain where Buddhism was introduced to Sri Lanka.",
            dailySchedules: [
                {
                    title: "Aluyama Puja",
                    time: "05:30 AM â€“ 06:30 AM",
                    image: "/images/bodhi_pooja_isurumuniya_1779804442648.png",
                    detail: "Dawn puja at the Mahinda's Cave shrine at the summit of Mihintale. Monks climb the 1,840 steps before sunrise to conduct the offering at the spot where Mahinda Thero met King Devanampiyatissa.",
                    steps: [
                        "Begin your ascent by 04:45 AM to reach the summit before the puja begins.",
                        "Carry flowers and water; no food is permitted on the sacred steps.",
                        "Silence is required on the final 100 steps to the summit shrine.",
                    ],
                },
                {
                    title: "Dawal Sangha Dana",
                    time: "10:30 AM â€“ 11:30 AM",
                    image: "/images/atavisi_buddha_pooja_1779804459576.png",
                    detail: "Midday Sangha dana at the Mihintale monastery complex at the base. Organised sponsorship of the resident monks is a popular merit-making activity.",
                    steps: [
                        "Contact the Mihintale temple administration to register a Sangha dana.",
                        "Deliver food to the refectory by 10:15 AM.",
                        "Wait in the donor hall; monks eat first and donors receive blessings after.",
                    ],
                },
                {
                    title: "Sandhya Puja",
                    time: "06:00 PM â€“ 07:00 PM",
                    image: "/images/gilanpasa_pooja_1779804420756.png",
                    detail: "Evening lamp offering at the Ambasthale Dagoba at the mid-level plateau. The panoramic view at sunset with oil lamps is one of Mihintale's most memorable experiences.",
                    steps: [
                        "Ascend to the Ambasthale Dagoba level (approximately 600 steps).",
                        "Purchase oil lamps at the mid-level counter.",
                        "Place lamps at the stupa base through the attendant; walk clockwise.",
                    ],
                },
            ],
            specialPujas: [
                [
                    "Poson Poya Procession",
                    "/images/kanchuka_pooja_1779804339624.png",
                    "The largest annual ceremony at Mihintale, held on the June Full Moon, commemorating Mahinda Thero's arrival. Hundreds of thousands of pilgrims ascend barefoot.",
                    [
                        "Arrive before midnight on Poson Poya eve.",
                        "Wear all-white and ascend barefoot as per tradition.",
                        "Follow the procession marshals; the route is one-way during peak hours.",
                    ],
                ],
                [
                    "Aradhana Rock Puja",
                    "/images/bodhi_pooja_isurumuniya_1779804442648.png",
                    "A puja at the flat Aradhana Rock at the summit where Mahinda Thero stood to preach to the King, conducted by the summit monk on Poya days.",
                    [
                        "Reach the summit before the sunrise service.",
                        "Place flowers at the small shrine on the rock â€” do not stand on the offering mat.",
                        "Photography is permitted but must not interfere with the ceremony.",
                    ],
                ],
                [
                    "Sinha Pokuna Offering",
                    "/images/atavisi_buddha_pooja_1779804459576.png",
                    "A water-offering ceremony at the ancient Sinha Pokuna (Lion Pond) at the base level of Mihintale.",
                    [
                        "Obtain a flower set from the base-level counter.",
                        "Follow the custodian monk to the pond offering point.",
                        "Do not enter or touch the water of the ancient pond.",
                    ],
                ],
            ],
            pilgrimGuide: [
                "Wear white and remove footwear at the base â€” ascending barefoot is traditional at Mihintale.",
                "Carry water; the ascent is strenuous, especially in warm weather.",
                "Do not climb over the protected lion statues or enter excavated zones.",
            ],
        },
    };
    const spotThewawa = thewawaData[spot?.id] || thewawaData["ruwanweli"];
    const shouldShowThewawa = category !== "Hydraulic";

    useEffect(() => {
        if (!shouldShowThewawa && activeTab === "thewawa") {
            setActiveTab("history");
        }
    }, [shouldShowThewawa, activeTab]);

    const sidebarItems = [
        {
            id: "history",
            label: historyLabel,
            icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
        },
        ...(shouldShowThewawa
            ? [
                  {
                      id: "thewawa",
                      label: "Thewawa",
                      icon: "M3 12c2.5-2.5 5.5-2.5 9 0s6.5 2.5 9 0M3 16c2.5-2.5 5.5-2.5 9 0s6.5 2.5 9 0M3 8c2.5-2.5 5.5-2.5 9 0s6.5 2.5 9 0",
                  },
              ]
            : []),
        {
            id: "gallery",
            label: "Gallery / Photos",
            icon: "M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z",
        },
        {
            id: "location",
            label: "Location & Map Information",
            icon: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
        },
    ];

    return (
        <>
            <Head
                title={`${spot?.name || "History"} - Secret Places Sri Lanka`}
            />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />

                <motion.main
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex-grow max-w-[1400px] mx-auto w-full flex flex-col md:flex-row py-8 px-4 sm:px-6 lg:px-8 gap-6"
                >
                    {/* Left Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="w-full md:w-64 shrink-0 bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col h-fit md:sticky md:top-8 md:self-start z-10"
                    >
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                            {(() => {
                                let backHref = "/places";
                                let backLabel = "Back to Places";
                                if (
                                    category ===
                                        "Spiritual Experiences & Wellness" ||
                                    category === "Spiritual Experience"
                                ) {
                                    backHref = "/category/spiritual";
                                    backLabel = "Back to Spiritual";
                                } else if (category === "Nature & Wildlife") {
                                    backHref = "/places";
                                } else if (
                                    category === "Historical Ruins" ||
                                    category === "Heritage"
                                ) {
                                    backHref = "/category/heritage";
                                } else if (category === "Hydraulic") {
                                    backHref = "/category/hydraulic";
                                } else if (category === "Rituals") {
                                    backHref = "/category/rituals";
                                }
                                return (
                                    <Link
                                        href={backHref}
                                        className="text-royalTeal hover:text-[#0c6b65] text-sm font-bold tracking-wider uppercase inline-flex items-center gap-2 transition-colors"
                                    >
                                        <span>←</span> {backLabel}
                                    </Link>
                                );
                            })()}
                        </div>

                        <nav className="flex flex-col py-2">
                            {sidebarItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full text-left px-5 py-3.5 text-sm transition-all duration-300 flex items-center gap-3 border-l-4 ${
                                        activeTab === item.id
                                            ? "bg-royalGold-500/10 text-royalMaroon-950 font-bold border-royalGold-500"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-royalMaroon-900 border-transparent font-medium"
                                    }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.8"
                                        stroke="currentColor"
                                        className={`w-5 h-5 ${activeTab === item.id ? "text-royalGold-600" : "text-slate-400"}`}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d={item.icon}
                                        />
                                    </svg>
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </motion.aside>

                    {/* Main Content Area */}
                    <motion.section
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex-1 min-w-0 bg-white border border-slate-200/60 shadow-sm rounded-xl overflow-hidden flex flex-col"
                    >
                        {/* Teal Header Bar */}
                        {category !== "Hydraulic" && (
                            <div className="bg-[#0f4a45] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <h2 className="text-lg font-bold tracking-wide">
                                    {
                                        sidebarItems.find(
                                            (i) => i.id === activeTab,
                                        )?.label
                                    }{" "}
                                    - {spot?.name}
                                </h2>

                                {/* Search box (simulating the map wireframe) */}
                                {activeTab !== "gallery" && (
                                    <div className="relative w-full sm:w-64">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                            onKeyDown={handleSearch}
                                            placeholder="Search Location"
                                            className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-1.5 pr-8 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-royalGold-400 focus:border-royalGold-400"
                                            disabled={isSearching}
                                        />
                                        {isSearching ? (
                                            <div className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin absolute right-3 top-2 pointer-events-none"></div>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="w-4 h-4 text-white/60 absolute right-3 top-2 pointer-events-none"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Content Container */}
                        <div className="p-6 md:p-8 flex-1 bg-slate-50/30">
                            {activeTab === "history" && spot ? (
                                <div className="max-w-4xl space-y-10">
                                    {/* Header & Guidelines */}
                                    <div className="space-y-6">
                                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
                                            <h3 className="text-red-800 font-bold uppercase tracking-widest text-xs mb-1">
                                                You Must Need
                                            </h3>
                                            <p className="text-sm text-red-700/90 leading-relaxed">
                                                Preserve our sacred heritage:
                                                Please dress in traditional
                                                white attire, refrain from
                                                speaking loudly, and avoid using
                                                polythene or plastic to help
                                                maintain the serenity and
                                                cleanliness of the sacred
                                                grounds.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Main Content Card (Image + Text Below) */}
                                    <div className="w-full bg-[#0a0f12] rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                                        <div className="w-full aspect-[21/9] md:aspect-[16/9] lg:aspect-[21/9] relative">
                                            <img
                                                src={spot.image}
                                                alt={spot.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src =
                                                        "https://placehold.co/1200x500/e2e8f0/64748b?text=Sacred+Site+Image";
                                                }}
                                            />
                                            {/* Gradient to smoothly transition from image to the dark text area below */}
                                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0f12] to-transparent pointer-events-none"></div>
                                        </div>

                                        <div className="px-6 pt-2 pb-12 md:px-10 md:pb-16 text-center flex flex-col items-center justify-center relative z-10">
                                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white tracking-widest uppercase mb-4 drop-shadow-md">
                                                {spot.name}
                                            </h2>
                                            <p className="text-[#e2c792] font-serif text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed">
                                                {spot.topic}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Topics & Details */}
                                    <div className="space-y-8 text-slate-700">
                                        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-xl">
                                            <h2 className="text-xl font-bold text-royalMaroon-900 mb-4">
                                                Historical Narrative (Sub Topic
                                                1)
                                            </h2>
                                            <div className="prose prose-slate max-w-none text-sm leading-relaxed mb-6">
                                                {(() => {
                                                    const text =
                                                        spot.history_narrative ||
                                                        "";
                                                    const wordCount = text
                                                        .split(/\s+/)
                                                        .filter(Boolean).length;
                                                    const needsTruncation =
                                                        wordCount > 100;
                                                    const paragraphs = text
                                                        .split(/\n\s*\n+/)
                                                        .filter(Boolean);

                                                    const parseMarkdown = (
                                                        str,
                                                    ) => {
                                                        const parts = str.split(
                                                            /(\*\*.*?\*\*|\*.*?\*)/g,
                                                        );
                                                        return parts.map(
                                                            (part, i) => {
                                                                if (
                                                                    part.startsWith(
                                                                        "**",
                                                                    ) &&
                                                                    part.endsWith(
                                                                        "**",
                                                                    )
                                                                ) {
                                                                    return (
                                                                        <strong
                                                                            key={
                                                                                i
                                                                            }
                                                                            className="font-semibold text-royalMaroon-800"
                                                                        >
                                                                            {part.slice(
                                                                                2,
                                                                                -2,
                                                                            )}
                                                                        </strong>
                                                                    );
                                                                } else if (
                                                                    part.startsWith(
                                                                        "*",
                                                                    ) &&
                                                                    part.endsWith(
                                                                        "*",
                                                                    )
                                                                ) {
                                                                    return (
                                                                        <em
                                                                            key={
                                                                                i
                                                                            }
                                                                            className="italic text-slate-600"
                                                                        >
                                                                            {part.slice(
                                                                                1,
                                                                                -1,
                                                                            )}
                                                                        </em>
                                                                    );
                                                                }
                                                                return part;
                                                            },
                                                        );
                                                    };

                                                    if (!needsTruncation) {
                                                        return (
                                                            <p className="whitespace-pre-line">
                                                                {parseMarkdown(
                                                                    text,
                                                                )}
                                                            </p>
                                                        );
                                                    }

                                                    if (!isExpanded) {
                                                        return (
                                                            <div className="space-y-4">
                                                                <p className="whitespace-pre-line">
                                                                    {parseMarkdown(
                                                                        paragraphs[0],
                                                                    )}
                                                                </p>
                                                                <button
                                                                    onClick={() =>
                                                                        setIsExpanded(
                                                                            true,
                                                                        )
                                                                    }
                                                                    className="mt-2 text-[#0f4a45] hover:text-[#0c3935] font-bold text-sm flex items-center gap-1 transition-colors group cursor-pointer"
                                                                >
                                                                    Read More...
                                                                    <span className="transform group-hover:translate-x-1 transition-transform">
                                                                        →
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <div className="space-y-6">
                                                            {paragraphs.map(
                                                                (p, idx) => {
                                                                    if (
                                                                        idx ===
                                                                        0
                                                                    ) {
                                                                        return (
                                                                            <p
                                                                                key={
                                                                                    idx
                                                                                }
                                                                                className="whitespace-pre-line"
                                                                            >
                                                                                {parseMarkdown(
                                                                                    p,
                                                                                )}
                                                                            </p>
                                                                        );
                                                                    }
                                                                    return (
                                                                        <motion.p
                                                                            key={
                                                                                idx
                                                                            }
                                                                            initial={{
                                                                                opacity: 0,
                                                                                y: 15,
                                                                            }}
                                                                            animate={{
                                                                                opacity: 1,
                                                                                y: 0,
                                                                            }}
                                                                            transition={{
                                                                                duration: 0.4,
                                                                                delay:
                                                                                    (idx -
                                                                                        1) *
                                                                                    0.12,
                                                                            }}
                                                                            className="whitespace-pre-line"
                                                                        >
                                                                            {parseMarkdown(
                                                                                p,
                                                                            )}
                                                                        </motion.p>
                                                                    );
                                                                },
                                                            )}
                                                            <button
                                                                onClick={() =>
                                                                    setIsExpanded(
                                                                        false,
                                                                    )
                                                                }
                                                                className="mt-2 text-[#0f4a45] hover:text-[#0c3935] font-bold text-sm flex items-center gap-1 transition-colors group cursor-pointer"
                                                            >
                                                                Read Less
                                                                <span className="transform group-hover:-translate-x-1 transition-transform">
                                                                    ←
                                                                </span>
                                                            </button>
                                                        </div>
                                                    );
                                                })()}
                                            </div>

                                            {spot.history_audio && (
                                                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-royalGold-100 flex items-center justify-center shrink-0">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            className="w-5 h-5 text-royalGold-700 ml-1"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                                                            Listen to the
                                                            Narrative
                                                        </p>
                                                        <audio
                                                            key={
                                                                spot.history_audio
                                                            }
                                                            controls
                                                            className="w-full h-10 outline-none"
                                                        >
                                                            <source
                                                                src={
                                                                    spot.history_audio
                                                                }
                                                                type="audio/mpeg"
                                                            />
                                                        </audio>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {!category?.includes("Spiritual") && (
                                            <>
                                                <div className="h-px w-full bg-slate-200"></div>

                                                <div>
                                                    <h2 className="text-xl font-bold text-royalMaroon-900 mb-4">
                                                        Blueprint /
                                                        Architectural Layout
                                                        (Sub Topic 2)
                                                    </h2>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                                                        <div className="bg-slate-100 aspect-square border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                                            {spot.blueprint_image ? (
                                                                <img
                                                                    src={
                                                                        spot.blueprint_image
                                                                    }
                                                                    alt="Architectural Blueprint"
                                                                    className="w-full h-full object-cover"
                                                                    onError={(
                                                                        e,
                                                                    ) => {
                                                                        e.target.src =
                                                                            "https://placehold.co/600x600/e2e8f0/64748b?text=Blueprint+Image";
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                                                                    Blueprint
                                                                    Placeholder
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="prose prose-slate max-w-none text-sm leading-relaxed">
                                                            <p>
                                                                {
                                                                    spot.blueprint_text
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {spot.blueprint_audio && (
                                                        <div className="bg-white border border-slate-200 shadow-sm p-4 rounded-xl flex items-center gap-4 mt-6">
                                                            <div className="w-10 h-10 rounded-full bg-royalGold-100 flex items-center justify-center shrink-0">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                    className="w-5 h-5 text-royalGold-700 ml-1"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <audio
                                                                controls
                                                                className="w-full h-10 outline-none"
                                                            >
                                                                <source
                                                                    src={
                                                                        spot.blueprint_audio
                                                                    }
                                                                    type="audio/mpeg"
                                                                />
                                                            </audio>
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        {/* Booking Section */}
                                        {![
                                            "Sacred Sites",
                                            "Sacred Sites & Shrines",
                                        ].includes(category) && (
                                            <div
                                                className="bg-white border border-slate-200 shadow-sm p-6 rounded-xl mt-8"
                                                id="booking-section"
                                            >
                                                <h2 className="text-xl font-bold text-royalMaroon-900 mb-2">
                                                    {spot?.id ===
                                                    "rajarata-ayurveda"
                                                        ? `Book an Ayurvedic Consultation / Treatment at ${spot?.name}`
                                                        : spot?.id ===
                                                            "nuwara-wewa-yoga"
                                                          ? `Join a Lakeside Yoga Session / Book a Wellness Retreat at ${spot?.name}`
                                                          : spot?.id ===
                                                              "ranmasu-uyana"
                                                            ? `Book a Guided Mindfulness Walk at ${spot?.name}`
                                                            : spot?.id ===
                                                                "mihintale-sunrise"
                                                              ? `Book a Guided Sunrise Meditation at Mihintale`
                                                              : spot?.id ===
                                                                  "ritigala-forest-bathing"
                                                                ? `Book a Guided Forest Bathing Session at Ritigala`
                                                                : spot?.id ===
                                                                    "jaya-sri-maha-bodhi-contemplation"
                                                                  ? `Book a Sacred Bodhi Contemplation Session at Jaya Sri Maha Bodhi`
                                                                  : `Join a Meditation Session / Book a Retreat at ${spot?.name}`}
                                                </h2>
                                                <p className="text-slate-600 text-sm mb-6 max-w-2xl">
                                                    {spot?.id ===
                                                    "rajarata-ayurveda"
                                                        ? `Select a preferred date and time slot to register for your wellness therapies and healing sessions at this serene center.`
                                                        : spot?.id ===
                                                            "nuwara-wewa-yoga"
                                                          ? `Select a preferred date and time slot to register for our guided lakeside yoga programs or a longer wellness retreat.`
                                                          : spot?.id ===
                                                              "ranmasu-uyana"
                                                            ? `Select a preferred date and time slot to book a guided walking meditation tour through the ancient royal gardens.`
                                                            : spot?.id ===
                                                                "mihintale-sunrise"
                                                              ? `Select a preferred date and time slot to register for our early morning guided meditation sessions at the sacred Mihintale peak.`
                                                              : spot?.id ===
                                                                  "ritigala-forest-bathing"
                                                                ? `Select a preferred date and time slot to register for our guided Shinrin-yoku (forest bathing) sessions in the ancient strict nature reserve.`
                                                                : spot?.id ===
                                                                    "jaya-sri-maha-bodhi-contemplation"
                                                                  ? `Select a preferred date and time slot to sit in guided silent contemplation beneath the world's oldest historically documented tree.`
                                                                  : `Select a preferred date and time slot to register for our guided meditation programs or a longer retreat at this serene center.`}
                                                </p>

                                                <div className="space-y-6">
                                                    {/* Date Picker (Next 7 days) */}
                                                    <div>
                                                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">
                                                            Select a Date
                                                        </h3>
                                                        <div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide">
                                                            {[...Array(7)].map(
                                                                (_, i) => {
                                                                    const d =
                                                                        new Date();
                                                                    d.setDate(
                                                                        d.getDate() +
                                                                            i +
                                                                            1,
                                                                    );
                                                                    const dateStr =
                                                                        d
                                                                            .toISOString()
                                                                            .split(
                                                                                "T",
                                                                            )[0];
                                                                    const isSelected =
                                                                        selectedDate ===
                                                                        dateStr;
                                                                    return (
                                                                        <button
                                                                            key={
                                                                                dateStr
                                                                            }
                                                                            onClick={() =>
                                                                                setSelectedDate(
                                                                                    dateStr,
                                                                                )
                                                                            }
                                                                            className={`snap-start shrink-0 w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                                                                                isSelected
                                                                                    ? "border-royalTeal bg-royalTeal text-white shadow-md"
                                                                                    : "border-slate-200 bg-white hover:border-royalTeal/50 text-slate-600"
                                                                            }`}
                                                                        >
                                                                            <span
                                                                                className={`text-xs font-bold uppercase tracking-wider mb-1 ${isSelected ? "text-teal-100" : "text-slate-400"}`}
                                                                            >
                                                                                {d.toLocaleDateString(
                                                                                    "en-US",
                                                                                    {
                                                                                        weekday:
                                                                                            "short",
                                                                                    },
                                                                                )}
                                                                            </span>
                                                                            <span className="text-2xl font-display font-bold">
                                                                                {d.getDate()}
                                                                            </span>
                                                                            <span
                                                                                className={`text-xs ${isSelected ? "text-teal-100" : "text-slate-500"}`}
                                                                            >
                                                                                {d.toLocaleDateString(
                                                                                    "en-US",
                                                                                    {
                                                                                        month: "short",
                                                                                    },
                                                                                )}
                                                                            </span>
                                                                        </button>
                                                                    );
                                                                },
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Time Slot Selector */}
                                                    {selectedDate && (
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                                y: 10,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                            }}
                                                        >
                                                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">
                                                                Select a Session
                                                            </h3>
                                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                                {(spot?.id ===
                                                                "rajarata-ayurveda"
                                                                    ? [
                                                                          "Morning Consultation (8 AM - 12 PM)",
                                                                          "Afternoon Treatment (2 PM - 6 PM)",
                                                                          "Full Day Wellness Program",
                                                                      ]
                                                                    : spot?.id ===
                                                                        "nuwara-wewa-yoga"
                                                                      ? [
                                                                            "Morning Sunrise Yoga (6 AM - 8 AM)",
                                                                            "Evening Sunset Yoga (4 PM - 6 PM)",
                                                                            "Full Day Wellness Retreat",
                                                                        ]
                                                                      : spot?.id ===
                                                                          "ranmasu-uyana"
                                                                        ? [
                                                                              "Morning Guided Walk (7 AM - 9 AM)",
                                                                              "Evening Guided Walk (4 PM - 6 PM)",
                                                                          ]
                                                                        : spot?.id ===
                                                                            "mihintale-sunrise"
                                                                          ? [
                                                                                "Pre-dawn Ascent & Meditation (4:30 AM - 7:30 AM)",
                                                                                "Early Morning Session (6 AM - 9 AM)",
                                                                            ]
                                                                          : spot?.id ===
                                                                              "ritigala-forest-bathing"
                                                                            ? [
                                                                                  "Morning Forest Bathing (7 AM - 10 AM)",
                                                                                  "Evening Forest Bathing (3 PM - 6 PM)",
                                                                                  "Full Day Nature Retreat",
                                                                              ]
                                                                            : spot?.id ===
                                                                                "jaya-sri-maha-bodhi-contemplation"
                                                                              ? [
                                                                                    "Dawn Pooja & Contemplation (5 AM - 8 AM)",
                                                                                    "Morning Sit (8 AM - 11 AM)",
                                                                                    "Evening Lamp Offering (5 PM - 7 PM)",
                                                                                ]
                                                                              : [
                                                                                    "Morning Session (6 AM - 10 AM)",
                                                                                    "Afternoon Session (2 PM - 6 PM)",
                                                                                    "Full Day Retreat",
                                                                                ]
                                                                ).map(
                                                                    (slot) => (
                                                                        <button
                                                                            key={
                                                                                slot
                                                                            }
                                                                            onClick={() =>
                                                                                setSelectedSlot(
                                                                                    slot,
                                                                                )
                                                                            }
                                                                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                                                                                selectedSlot ===
                                                                                slot
                                                                                    ? "border-royalGold-500 bg-royalGold-50"
                                                                                    : "border-slate-200 bg-white hover:border-royalGold-300"
                                                                            }`}
                                                                        >
                                                                            <div className="font-bold text-slate-800 text-sm mb-1">
                                                                                {
                                                                                    slot.split(
                                                                                        " (",
                                                                                    )[0]
                                                                                }
                                                                            </div>
                                                                            {slot.includes(
                                                                                "(",
                                                                            ) && (
                                                                                <div className="text-xs text-slate-500">
                                                                                    {slot
                                                                                        .split(
                                                                                            " (",
                                                                                        )[1]
                                                                                        .replace(
                                                                                            ")",
                                                                                            "",
                                                                                        )}
                                                                                </div>
                                                                            )}
                                                                        </button>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* Proceed Button */}
                                                    {selectedDate &&
                                                        selectedSlot && (
                                                            <motion.div
                                                                initial={{
                                                                    opacity: 0,
                                                                    y: 10,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                }}
                                                                className="pt-4 flex justify-end"
                                                            >
                                                                <PrimaryButton
                                                                    onClick={() =>
                                                                        setBookingModalOpen(
                                                                            true,
                                                                        )
                                                                    }
                                                                    className="px-8 py-3 bg-[#0f4a45] hover:bg-[#0c3935] shadow-md border-none"
                                                                >
                                                                    Proceed to
                                                                    Register
                                                                    &rarr;
                                                                </PrimaryButton>
                                                            </motion.div>
                                                        )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : activeTab === "thewawa" ? (
                                <div className="max-w-6xl mx-auto space-y-8 text-slate-700">
                                    <div className="relative overflow-hidden rounded-2xl bg-[#3a0d18] text-white min-h-[280px] flex items-end">
                                        <img
                                            src={spotThewawa.heroImage}
                                            alt={spotThewawa.heroAlt}
                                            className="absolute inset-0 w-full h-full object-cover opacity-60"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#260711] via-[#3a0d18]/55 to-transparent" />
                                        <div className="relative p-6 md:p-10 max-w-2xl">
                                            <p className="text-[#f4d58b] text-sm font-semibold tracking-[0.18em] uppercase mb-3">
                                                Sacred Service Schedule
                                            </p>
                                            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">
                                                Daily Thewawa and Special Pujas
                                            </h1>
                                            <p className="mt-3 text-white/85 text-sm md:text-base">
                                                {spotThewawa.heroSubtitle}
                                            </p>
                                        </div>
                                    </div>

                                    <section>
                                        <div className="flex items-end justify-between gap-4 mb-4">
                                            <div>
                                                <p className="text-xs font-bold tracking-[0.18em] text-royalGold-700 uppercase">
                                                    Daily schedule
                                                </p>
                                                <h2 className="text-2xl font-bold text-royalMaroon-900">
                                                    Daily Thewawa Schedule
                                                </h2>
                                            </div>
                                            <span className="hidden sm:inline-flex items-center gap-2 text-xs text-slate-500">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                                Every day
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                            {spotThewawa.dailySchedules.map(
                                                (schedule, index) => (
                                                    <div
                                                        key={schedule.title}
                                                        role="button"
                                                        tabIndex={0}
                                                        onClick={() =>
                                                            openThewawaBooking(
                                                                schedule.title,
                                                            )
                                                        }
                                                        onKeyDown={(event) => {
                                                            if (
                                                                event.key ===
                                                                    "Enter" ||
                                                                event.key ===
                                                                    " "
                                                            ) {
                                                                event.preventDefault();
                                                                openThewawaBooking(
                                                                    schedule.title,
                                                                );
                                                            }
                                                        }}
                                                        className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm cursor-pointer transition-all hover:-translate-y-1 hover:border-royalGold-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-royalTeal focus:ring-offset-2"
                                                    >
                                                        <div className="relative">
                                                            <img
                                                                src={
                                                                    schedule.image
                                                                }
                                                                alt={
                                                                    schedule.title
                                                                }
                                                                className="w-full h-36 object-cover"
                                                            />
                                                            <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-widest bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                                                                Live Schedule
                                                            </span>
                                                            <span className="absolute bottom-2 left-3 text-white font-bold text-lg drop-shadow">
                                                                {String(
                                                                    index + 1,
                                                                ).padStart(
                                                                    2,
                                                                    "0",
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="p-4">
                                                            <p className="text-xs font-bold text-royalGold-700 mb-1">
                                                                {schedule.time}
                                                            </p>
                                                            <h3 className="font-bold text-royalMaroon-900 text-sm mb-2">
                                                                {schedule.title}
                                                            </h3>
                                                            <p className="text-xs text-slate-600 leading-relaxed">
                                                                {
                                                                    schedule.detail
                                                                }
                                                            </p>
                                                            <h4 className="mt-3 text-xs font-bold uppercase tracking-wide text-royalTeal">
                                                                Visitor Sequence
                                                            </h4>
                                                            <ol className="mt-2 space-y-1 text-xs text-slate-600 list-decimal list-inside">
                                                                {schedule.steps.map(
                                                                    (step) => (
                                                                        <li
                                                                            key={
                                                                                step
                                                                            }
                                                                        >
                                                                            {
                                                                                step
                                                                            }
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ol>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </section>

                                    <section className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6">
                                        <div>
                                            <p className="text-xs font-bold tracking-[0.18em] text-royalGold-700 uppercase">
                                                Sacred offerings
                                            </p>
                                            <h2 className="text-2xl font-bold text-royalMaroon-900 mb-4">
                                                Special Pujas
                                            </h2>
                                            <div className="grid sm:grid-cols-3 gap-4">
                                                {spotThewawa.specialPujas.map(
                                                    ([
                                                        title,
                                                        image,
                                                        detail,
                                                        steps,
                                                    ]) => (
                                                        <div
                                                            key={title}
                                                            role="button"
                                                            tabIndex={0}
                                                            onClick={() =>
                                                                openThewawaBooking(
                                                                    title,
                                                                )
                                                            }
                                                            onKeyDown={(
                                                                event,
                                                            ) => {
                                                                if (
                                                                    event.key ===
                                                                        "Enter" ||
                                                                    event.key ===
                                                                        " "
                                                                ) {
                                                                    event.preventDefault();
                                                                    openThewawaBooking(
                                                                        title,
                                                                    );
                                                                }
                                                            }}
                                                            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm cursor-pointer transition-all hover:-translate-y-1 hover:border-royalGold-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-royalTeal focus:ring-offset-2"
                                                        >
                                                            <img
                                                                src={image}
                                                                alt={title}
                                                                className="w-full h-32 object-cover"
                                                            />
                                                            <div className="p-4">
                                                                <h3 className="font-bold text-royalMaroon-900 text-sm">
                                                                    {title}
                                                                </h3>
                                                                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                                                                    {detail}
                                                                </p>
                                                                <h4 className="mt-3 text-xs font-bold uppercase tracking-wide text-royalTeal">
                                                                    Visitor
                                                                    sequence
                                                                </h4>
                                                                <ol className="mt-2 space-y-1 text-xs text-slate-600 list-decimal list-inside">
                                                                    {steps.map(
                                                                        (
                                                                            step,
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    step
                                                                                }
                                                                            >
                                                                                {
                                                                                    step
                                                                                }
                                                                            </li>
                                                                        ),
                                                                    )}
                                                                </ol>
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                            <p className="mt-4 text-xs text-slate-500">
                                                Ritual names, eligibility,
                                                routes, and materials can differ
                                                by temple and date. Confirm the
                                                current procedure with the
                                                relevant temple office before
                                                making an offering.
                                            </p>
                                        </div>

                                        <div className="bg-[#f8f4ed] border border-royalGold-200 rounded-2xl p-6 flex flex-col gap-4">
                                            <div>
                                                <p className="text-xs font-bold tracking-[0.18em] text-royalGold-700 uppercase mb-1">
                                                    For all visitors
                                                </p>
                                                <h3 className="text-lg font-bold text-royalMaroon-900">
                                                    Pilgrim Participation Guide
                                                </h3>
                                            </div>
                                            <ul className="flex flex-col gap-3">
                                                {spotThewawa.pilgrimGuide.map(
                                                    (tip, i) => (
                                                        <li
                                                            key={i}
                                                            className="flex gap-3 text-sm text-slate-700"
                                                        >
                                                            <span className="text-royalGold-700 font-bold shrink-0">
                                                                {String(
                                                                    i + 1,
                                                                ).padStart(
                                                                    2,
                                                                    "0",
                                                                )}
                                                            </span>
                                                            <span>{tip}</span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    </section>
                                </div>
                            ) : activeTab === "location" ? (
                                /* Location / Map View matching the wireframe */
                                <div className="h-full min-h-[500px] flex gap-6 relative">
                                    {/* Map Area */}
                                    <div className="flex-1 bg-slate-200 rounded-xl border border-slate-300 overflow-hidden relative shadow-inner z-0">
                                        <InteractiveMap
                                            spot={spot}
                                            searchedLocation={searchedLocation}
                                        />
                                    </div>

                                    {/* Detail Panel overlay/side */}
                                    <div className="w-72 hidden lg:flex flex-col gap-4">
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                            <h4 className="font-bold text-slate-800 text-sm mb-2">
                                                Location Details
                                            </h4>
                                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                                {isGeocodingAddress ? (
                                                    <span className="inline-flex items-center gap-1 text-slate-400">
                                                        <span className="w-3 h-3 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin inline-block"></span>
                                                        Fetching address…
                                                    </span>
                                                ) : locationAddress ? (
                                                    locationAddress
                                                ) : (
                                                    <span className="text-slate-400 italic">
                                                        Address not available.
                                                    </span>
                                                )}
                                            </p>
                                            <a
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${searchedLocation ? searchedLocation.lat : spot?.lat},${searchedLocation ? searchedLocation.lng : spot?.lng}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`w-full block text-center bg-[#0f4a45] text-white text-xs font-bold py-2 rounded-md hover:bg-[#0c3935] transition-colors ${!spot?.lat && !spot?.lng && !searchedLocation ? "opacity-50 pointer-events-none" : ""}`}
                                            >
                                                Get Directions
                                            </a>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex-1">
                                            <h4 className="font-bold text-slate-800 text-sm mb-2">
                                                Nearby Sites
                                            </h4>
                                            <div className="text-xs text-slate-500 flex flex-col gap-2">
                                                {spot?.nearby_sites &&
                                                spot.nearby_sites.length > 0 ? (
                                                    spot.nearby_sites.map(
                                                        (site, index) => (
                                                            <Link
                                                                key={index}
                                                                href={`/places/${site.id}/history`}
                                                                className="flex items-center gap-2 hover:text-[#0f4a45] transition-colors group"
                                                            >
                                                                <div
                                                                    className={`w-2 h-2 rounded-full flex-shrink-0 ${index === 0 ? "bg-royalGold-500" : "bg-royalTeal"}`}
                                                                ></div>
                                                                <span className="group-hover:underline">
                                                                    {site.name}
                                                                </span>
                                                                <span className="text-slate-400 ml-auto">
                                                                    (
                                                                    {
                                                                        site.distance
                                                                    }{" "}
                                                                    km)
                                                                </span>
                                                            </Link>
                                                        ),
                                                    )
                                                ) : (
                                                    <span>
                                                        No nearby sites found.
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : activeTab === "gallery" && spot ? (
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                                        <h3 className="text-xl font-bold text-royalMaroon-900 font-display">
                                            Photo Gallery
                                        </h3>
                                        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                            {spot.gallery?.length || 0} Photos
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {spot.gallery &&
                                            spot.gallery.map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    className="group relative aspect-square rounded-xl overflow-hidden bg-slate-200 border border-slate-200 shadow-sm cursor-pointer"
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`Gallery image ${idx + 1}`}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="2"
                                                            stroke="white"
                                                            className="w-10 h-10 drop-shadow-md transform scale-50 group-hover:scale-100 transition-transform duration-300"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            ))}
                                        {(!spot.gallery ||
                                            spot.gallery.length === 0) && (
                                            <div className="col-span-full py-12 text-center text-slate-500">
                                                No photos available for this
                                                location yet.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full min-h-[400px] text-slate-500 text-sm border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                                    <p>
                                        Content for "
                                        {
                                            sidebarItems.find(
                                                (i) => i.id === activeTab,
                                            )?.label
                                        }
                                        " is coming soon.
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.section>
                </motion.main>

                <Footer auth={auth} />
            </div>

            <Modal
                show={thewawaBookingOpen}
                onClose={() => setThewawaBookingOpen(false)}
                maxWidth="lg"
            >
                <form onSubmit={handleThewawaBooking} className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold tracking-[0.18em] text-royalGold-700 uppercase">
                                Online puja booking
                            </p>
                            <h2 className="text-2xl font-bold text-royalMaroon-900 mt-1">
                                Reserve a Puja
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => setThewawaBookingOpen(false)}
                            className="text-slate-500 hover:text-slate-900 text-2xl leading-none"
                            aria-label="Close booking form"
                        >
                            ×
                        </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 mt-6">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="thewawa-puja"
                                className="block text-sm font-semibold text-slate-700 mb-1"
                            >
                                Puja type
                            </label>
                            <select
                                id="thewawa-puja"
                                value={thewawaForm.puja}
                                onChange={(event) =>
                                    setThewawaForm({
                                        ...thewawaForm,
                                        puja: event.target.value,
                                        amount:
                                            event.target.value === "Alms-giving"
                                                ? "10000"
                                                : "5000",
                                    })
                                }
                                className="w-full bg-white text-slate-900 border-slate-300 rounded-md focus:border-royalTeal focus:ring-royalTeal"
                            >
                                <option>Aluyama Thewawa</option>
                                <option>Dawal Buddha Puja Thewawa</option>
                                <option>Gilanpasa and Sandhya Thewawa</option>
                                <option>Kanchuka Puja</option>
                                <option>Gilanpasa Puja</option>
                                <option>Atawisi and 108-Bowl Puja</option>
                                <option>Alms-giving</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="thewawa-date"
                                className="block text-sm font-semibold text-slate-700 mb-1"
                            >
                                Puja date
                            </label>
                            <input
                                id="thewawa-date"
                                required
                                type="date"
                                min={new Date().toISOString().split("T")[0]}
                                value={thewawaForm.date}
                                onChange={(event) =>
                                    setThewawaForm({
                                        ...thewawaForm,
                                        date: event.target.value,
                                    })
                                }
                                className="w-full bg-white text-slate-900 placeholder:text-slate-400 border-slate-300 rounded-md focus:border-royalTeal focus:ring-royalTeal"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="thewawa-amount"
                                className="block text-sm font-semibold text-slate-700 mb-1"
                            >
                                Donation amount (LKR)
                            </label>
                            <input
                                id="thewawa-amount"
                                required
                                type="number"
                                min="1000"
                                step="500"
                                value={thewawaForm.amount}
                                onChange={(event) =>
                                    setThewawaForm({
                                        ...thewawaForm,
                                        amount: event.target.value,
                                    })
                                }
                                className="w-full bg-white text-slate-900 placeholder:text-slate-400 border-slate-300 rounded-md focus:border-royalTeal focus:ring-royalTeal"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="thewawa-name"
                                className="block text-sm font-semibold text-slate-700 mb-1"
                            >
                                Name
                            </label>
                            <input
                                id="thewawa-name"
                                required
                                value={thewawaForm.name}
                                onChange={(event) =>
                                    setThewawaForm({
                                        ...thewawaForm,
                                        name: event.target.value,
                                    })
                                }
                                className="w-full bg-white text-slate-900 placeholder:text-slate-400 border-slate-300 rounded-md focus:border-royalTeal focus:ring-royalTeal"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="thewawa-phone"
                                className="block text-sm font-semibold text-slate-700 mb-1"
                            >
                                Phone number
                            </label>
                            <input
                                id="thewawa-phone"
                                required
                                value={thewawaForm.phone}
                                onChange={(event) =>
                                    setThewawaForm({
                                        ...thewawaForm,
                                        phone: event.target.value,
                                    })
                                }
                                className="w-full bg-white text-slate-900 placeholder:text-slate-400 border-slate-300 rounded-md focus:border-royalTeal focus:ring-royalTeal"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="thewawa-email"
                                className="block text-sm font-semibold text-slate-700 mb-1"
                            >
                                Email address
                            </label>
                            <input
                                id="thewawa-email"
                                required
                                type="email"
                                value={thewawaForm.email}
                                onChange={(event) =>
                                    setThewawaForm({
                                        ...thewawaForm,
                                        email: event.target.value,
                                    })
                                }
                                className="w-full bg-white text-slate-900 placeholder:text-slate-400 border-slate-300 rounded-md focus:border-royalTeal focus:ring-royalTeal"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            className="bg-[#0f4a45] text-white font-bold px-5 py-3 rounded-lg hover:bg-[#0c3935] transition-colors"
                        >
                            Continue to payment →
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal
                show={thewawaPaymentOpen}
                onClose={() => setThewawaPaymentOpen(false)}
                maxWidth="md"
            >
                <form onSubmit={completeThewawaPayment} className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold tracking-[0.18em] text-royalGold-700 uppercase">
                                Secure payment simulation
                            </p>
                            <h2 className="text-2xl font-bold text-royalMaroon-900 mt-1">
                                Online payment
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => setThewawaPaymentOpen(false)}
                            className="text-slate-500 hover:text-slate-900 text-2xl leading-none"
                            aria-label="Close payment form"
                        >
                            ×
                        </button>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 mt-6 text-sm">
                        <div className="flex justify-between">
                            <span>Puja</span>
                            <strong>{thewawaForm.puja.split(" (")[0]}</strong>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Date</span>
                            <strong>{thewawaForm.date}</strong>
                        </div>
                        <div className="flex justify-between mt-2 text-royalMaroon-900">
                            <span>Amount</span>
                            <strong>
                                LKR{" "}
                                {Number(thewawaForm.amount).toLocaleString()}
                            </strong>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-5 text-xs">
                        <span className="border border-royalGold-400 bg-royalGold-50 rounded px-3 py-2 font-semibold">
                            Credit / Debit Card
                        </span>
                        <span className="border border-slate-200 rounded px-3 py-2">
                            Mobile Banking
                        </span>
                    </div>
                    <div className="grid gap-4 mt-5">
                        <div>
                            <label
                                htmlFor="card-number"
                                className="block text-sm font-semibold text-slate-700 mb-1"
                            >
                                Card number
                            </label>
                            <input
                                id="card-number"
                                required
                                inputMode="numeric"
                                pattern="[0-9 ]{12,19}"
                                placeholder="4242 4242 4242 4242"
                                className="w-full bg-white text-slate-900 placeholder:text-slate-400 border-slate-300 rounded-md focus:border-royalTeal focus:ring-royalTeal"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="card-expiry"
                                    className="block text-sm font-semibold text-slate-700 mb-1"
                                >
                                    Expiry
                                </label>
                                <input
                                    id="card-expiry"
                                    required
                                    placeholder="MM / YY"
                                    className="w-full bg-white text-slate-900 placeholder:text-slate-400 border-slate-300 rounded-md focus:border-royalTeal focus:ring-royalTeal"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="card-cvc"
                                    className="block text-sm font-semibold text-slate-700 mb-1"
                                >
                                    CVC
                                </label>
                                <input
                                    id="card-cvc"
                                    required
                                    inputMode="numeric"
                                    pattern="[0-9]{3,4}"
                                    placeholder="123"
                                    className="w-full bg-white text-slate-900 placeholder:text-slate-400 border-slate-300 rounded-md focus:border-royalTeal focus:ring-royalTeal"
                                />
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-4">
                        This is a payment interface simulation. No real money
                        will be charged.
                    </p>
                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            className="bg-[#3a0d18] text-white font-bold px-5 py-3 rounded-lg hover:bg-[#260711] transition-colors"
                        >
                            Confirm payment
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal
                show={Boolean(thewawaReceipt)}
                onClose={() => setThewawaReceipt(null)}
                maxWidth="md"
            >
                <div className="p-6 md:p-8 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl">
                        ✓
                    </div>
                    <p className="text-xs font-bold tracking-[0.18em] text-royalGold-700 uppercase mt-4">
                        Booking confirmed
                    </p>
                    <h2 className="text-2xl font-bold text-royalMaroon-900 mt-1">
                        Puja booking confirmed
                    </h2>
                    <p className="text-sm text-slate-600 mt-3">
                        Thank you for your puja booking. Your confirmation
                        number is:
                    </p>
                    <p className="font-bold text-lg text-royalTeal mt-2">
                        {thewawaReceipt}
                    </p>
                    <button
                        type="button"
                        onClick={() => setThewawaReceipt(null)}
                        className="mt-6 bg-[#0f4a45] text-white font-bold px-5 py-3 rounded-lg"
                    >
                        Done
                    </button>
                </div>
            </Modal>

            {/* Floating CTA for Booking */}
            {activeTab === "history" && (
                <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-4 flex justify-center pb-8 lg:pb-4">
                    <div className="max-w-6xl w-full flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
                        <div className="text-sm">
                            <span className="font-bold text-royalMaroon-900 block sm:inline">
                                {spot?.id === "rajarata-ayurveda"
                                    ? "Seeking Natural Healing?"
                                    : spot?.id === "nuwara-wewa-yoga"
                                      ? "Seeking Wellness & Calm?"
                                      : spot?.id === "ranmasu-uyana"
                                        ? "Seeking Mindful Exploration?"
                                        : spot?.id === "mihintale-sunrise"
                                          ? "Seeking a Spiritual Awakening?"
                                          : "Seeking Inner Peace?"}
                            </span>
                            <span className="text-slate-600 sm:ml-2">
                                {spot?.id === "rajarata-ayurveda"
                                    ? "Book an Ayurvedic consultation or treatment today."
                                    : spot?.id === "nuwara-wewa-yoga"
                                      ? "Join a lakeside yoga session or book a wellness retreat today."
                                      : spot?.id === "ranmasu-uyana"
                                        ? "Book a guided walking meditation tour through the ancient royal gardens."
                                        : spot?.id === "mihintale-sunrise"
                                          ? "Book a guided sunrise meditation at Mihintale today."
                                          : "Join a guided meditation session or book a retreat today."}
                            </span>
                        </div>
                        <PrimaryButton
                            onClick={() => {
                                setActiveTab("history");
                                setTimeout(() => {
                                    document
                                        .getElementById("booking-section")
                                        ?.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                }, 100);
                            }}
                            className="w-full sm:w-auto px-6 py-3 bg-[#0f4a45] hover:bg-[#0c3935] border-none"
                        >
                            {spot?.id === "rajarata-ayurveda"
                                ? "Book Treatment"
                                : spot?.id === "nuwara-wewa-yoga"
                                  ? "Book Yoga Session"
                                  : spot?.id === "ranmasu-uyana"
                                    ? "Book Guided Walk"
                                    : spot?.id === "mihintale-sunrise"
                                      ? "Book Sunrise Meditation"
                                      : "Book a Retreat"}
                        </PrimaryButton>
                    </div>
                </div>
            )}

            {/* Registration Modal */}
            <Modal
                show={bookingModalOpen}
                onClose={() => {
                    if (!isSubmittingBooking) {
                        setBookingModalOpen(false);
                        if (bookingSuccess) {
                            setBookingSuccess(null);
                            setSelectedDate(null);
                            setSelectedSlot(null);
                            setBookingForm({
                                ...bookingForm,
                                agreement: false,
                            });
                        }
                    }
                }}
            >
                <div className="p-6">
                    {!bookingSuccess ? (
                        <>
                            <h2 className="text-xl font-bold text-royalMaroon-900 mb-4 border-b border-slate-100 pb-2">
                                Complete Registration
                            </h2>
                            <p className="text-sm text-slate-600 mb-6 bg-slate-50 p-3 rounded-md border border-slate-100">
                                You are booking <strong>{selectedSlot}</strong>{" "}
                                for <strong>{selectedDate}</strong>.
                            </p>

                            <form
                                onSubmit={handleBookingSubmit}
                                className="space-y-4"
                            >
                                {bookingErrors.general && (
                                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">
                                        {bookingErrors.general}
                                    </div>
                                )}
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Full Name"
                                    />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={bookingForm.name}
                                        onChange={(e) =>
                                            setBookingForm({
                                                ...bookingForm,
                                                name: e.target.value,
                                            })
                                        }
                                        required
                                        disabled={isSubmittingBooking}
                                    />
                                    <InputError
                                        message={bookingErrors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email Address"
                                        />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            className="mt-1 block w-full"
                                            value={bookingForm.email}
                                            onChange={(e) =>
                                                setBookingForm({
                                                    ...bookingForm,
                                                    email: e.target.value,
                                                })
                                            }
                                            required
                                            disabled={isSubmittingBooking}
                                        />
                                        <InputError
                                            message={bookingErrors.email}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="phone"
                                            value="Phone Number"
                                        />
                                        <TextInput
                                            id="phone"
                                            type="tel"
                                            className="mt-1 block w-full"
                                            value={bookingForm.phone}
                                            onChange={(e) =>
                                                setBookingForm({
                                                    ...bookingForm,
                                                    phone: e.target.value,
                                                })
                                            }
                                            required
                                            disabled={isSubmittingBooking}
                                        />
                                        <InputError
                                            message={bookingErrors.phone}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="language"
                                            value="Language Preference"
                                        />
                                        <select
                                            id="language"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                                            value={bookingForm.language}
                                            onChange={(e) =>
                                                setBookingForm({
                                                    ...bookingForm,
                                                    language: e.target.value,
                                                })
                                            }
                                            disabled={isSubmittingBooking}
                                        >
                                            <option value="English">
                                                English
                                            </option>
                                            <option value="Sinhala">
                                                Sinhala
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="attendance"
                                            value="Group Size"
                                        />
                                        <TextInput
                                            id="attendance"
                                            type="number"
                                            min="1"
                                            max="10"
                                            className="mt-1 block w-full"
                                            value={bookingForm.attendance}
                                            onChange={(e) =>
                                                setBookingForm({
                                                    ...bookingForm,
                                                    attendance:
                                                        parseInt(
                                                            e.target.value,
                                                        ) || 1,
                                                })
                                            }
                                            required
                                            disabled={isSubmittingBooking}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 mt-4">
                                    <label className="flex items-start cursor-pointer">
                                        <Checkbox
                                            name="agreement"
                                            checked={bookingForm.agreement}
                                            onChange={(e) =>
                                                setBookingForm({
                                                    ...bookingForm,
                                                    agreement: e.target.checked,
                                                })
                                            }
                                            disabled={isSubmittingBooking}
                                        />
                                        <span className="ms-3 text-sm text-slate-600 leading-tight pt-0.5">
                                            I agree to follow the white dress
                                            code and monastery guidelines,
                                            preserving the serenity of the
                                            sacred grounds.
                                        </span>
                                    </label>
                                    <InputError
                                        message={bookingErrors.agreement}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setBookingModalOpen(false)
                                        }
                                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-sm font-bold transition-colors"
                                        disabled={isSubmittingBooking}
                                    >
                                        Cancel
                                    </button>
                                    <PrimaryButton
                                        className="bg-[#0f4a45] hover:bg-[#0c3935] border-none"
                                        disabled={isSubmittingBooking}
                                    >
                                        {isSubmittingBooking
                                            ? "Confirming..."
                                            : "Confirm Registration"}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2.5"
                                    stroke="currentColor"
                                    className="w-10 h-10"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-display font-bold text-royalMaroon-900 mb-2">
                                Booking Confirmed!
                            </h2>
                            <p className="text-slate-600 mb-6 max-w-sm mx-auto text-sm">
                                An email and SMS with your retreat details have
                                been sent. Please present this QR code at the
                                entrance.
                            </p>
                            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl inline-block shadow-sm">
                                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
                                    Reference Number
                                </div>
                                <div className="text-2xl font-bold font-mono tracking-wider text-[#0f4a45]">
                                    {bookingSuccess}
                                </div>
                                <img
                                    src="/images/qr_placeholder.jpg"
                                    alt="QR Code"
                                    className="w-40 h-40 mx-auto mt-4 rounded-md border border-slate-200"
                                />
                            </div>
                            <div className="mt-8">
                                <PrimaryButton
                                    onClick={() => {
                                        setBookingModalOpen(false);
                                        setBookingSuccess(null);
                                        setSelectedDate(null);
                                        setSelectedSlot(null);
                                        setBookingForm({
                                            ...bookingForm,
                                            agreement: false,
                                        });
                                    }}
                                >
                                    Done
                                </PrimaryButton>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
}
