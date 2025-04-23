import React, { useState } from 'react';
import { Button } from "/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "/components/ui/card";
import { Label } from "/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "/components/ui/select";
import { Sun, Droplets, Leaf, Bug, Languages, Sprout, Shield, Calendar, BarChart2, Clock, TrendingUp } from "lucide-react";

// Define translations
const translations = {
  en: {
    title: "🌱 Smart Crop Advisor",
    description: "Get personalized crop recommendations tailored to your farm's unique conditions",
    soilType: "🌍 Soil Type",
    moisture: "💧 Moisture Level",
    phRange: "🧪 pH Range",
    season: "☀️ Season",
    pests: "🐛 Common Pests",
    calculate: "✨ Get Recommendations",
    reset: "🔄 Reset",
    recommendations: "🌟 Recommended Crops",
    revenue: "💰 Revenue per Acre",
    duration: "⏳ Duration",
    tips: "💡 Expert Tips",
    soilTypes: {
      clay: "Clay 🏺",
      loam: "Loam 🌱",
      sandy: "Sandy 🏖️",
      silt: "Silt 🌊",
      alluvial: "Alluvial 🌊",
      black: "Black 🖤",
      red: "Red 🔴"
    },
    moistureLevels: {
      low: "Low 🏜️",
      medium: "Medium 💦",
      high: "High 🌊"
    },
    phRanges: {
      acidic: "Acidic 🍋 (below 6.5)",
      neutral: "Neutral ⚖️ (6.5-7.5)",
      alkaline: "Alkaline 🧼 (above 7.5)",
      slightlyAcidic: "Slightly Acidic (6.0-6.5)",
      slightlyAlkaline: "Slightly Alkaline (7.5-8.0)"
    },
    seasons: {
      kharif: "Kharif 🌧️ (Monsoon)",
      rabi: "Rabi ❄️ (Winter)",
      zaid: "Zaid ☀️ (Summer)",
      yearRound: "Year-round 📅"
    },
    pestsList: {
      none: "None ✅",
      aphids: "Aphids 🐜",
      bollworm: "Bollworm 🐛",
      stemBorer: "Stem Borer 🪱",
      whitefly: "Whitefly 🦟",
      termites: "Termites 🐜",
      fruitBorer: "Fruit Borer 🍏",
      shootFly: "Shoot Fly 🪰",
      armyWorm: "Army Worm 🐛",
      thrips: "Thrips 🦗",
      blowworm: "Blow Worm 🐛"
    }
  },
  te: {
    // Telugu translations...
  },
  hi: {
    // Hindi translations...
  }
};

// Complete crop data with all plants
const cropData = [
  // Crops with pests: none
  {
    name: { en: "Barley 🌾", te: "యవలు 🌾", hi: "जौ 🌾" },
    soilTypes: ["clay", "loam"],
    moisture: "medium",
    phRange: "neutral",
    seasons: ["rabi"],
    pests: ["none"],
    revenue: { en: "₹35,000 - ₹55,000", te: "₹35,000 - ₹55,000", hi: "₹35,000 - ₹55,000" },
    duration: { en: "100-120 days", te: "100-120 రోజులు", hi: "100-120 दिन" },
    tips: {
      en: ["Avoid waterlogging", "Use early maturing varieties", "Perform timely weeding"],
      te: ["నీటి నిల్వను నివారించండి", "త్వరగా పండే రకాలను వాడండి", "సమయానికి కలుపు తీసేయండి"],
      hi: ["जलभराव से बचें", "जल्दी पकने वाली किस्मों का उपयोग करें", "समय पर निराई करें"]
    }
  },
  {
    name: { en: "Groundnut 🥜", te: "వేరుసెనగ 🥜", hi: "मूंगफली 🥜" },
    soilTypes: ["sandy", "loam"],
    moisture: "low",
    phRange: "slightlyAcidic",
    seasons: ["kharif"],
    pests: ["none"],
    revenue: { en: "₹40,000 - ₹70,000", te: "₹40,000 - ₹70,000", hi: "₹40,000 - ₹70,000" },
    duration: { en: "110-130 days", te: "110-130 రోజులు", hi: "110-130 दिन" },
    tips: {
      en: ["Avoid heavy clay soils", "Harvest when leaves turn yellow", "Dry pods properly"],
      te: ["భారీ మట్టిని నివారించండి", "ఆకులు పసుపు రంగు వచ్చేసరికి కోయండి", "గింజలను బాగా ఎండబెట్టండి"],
      hi: ["भारी मिट्टी से बचें", "जब पत्तियां पीली हो जाएं तब काटें", "फलियों को अच्छी तरह सुखाएं"]
    }
  },
  {
    name: { en: "Jowar 🌾", te: "జొన్న 🌾", hi: "ज्वार 🌾" },
    soilTypes: ["black", "loam"],
    moisture: "medium",
    phRange: "neutral",
    seasons: ["rabi", "kharif"],
    pests: ["none"],
    revenue: { en: "₹20,000 - ₹35,000", te: "₹20,000 - ₹35,000", hi: "₹20,000 - ₹35,000" },
    duration: { en: "100-120 days", te: "100-120 రోజులు", hi: "100-120 दिन" },
    tips: {
      en: ["Avoid waterlogging", "Intercrop with pulses", "Use organic manure"],
      te: ["నీటి నిల్వను నివారించండి", "పప్పుదినుసులతో అంతర్ సాగు చేయండి", "సేంద్రీయ ఎరువులు వాడండి"],
      hi: ["जलभराव से बचें", "दलहनी के साथ अंतः फसल लें", "जैविक खाद का उपयोग करें"]
    }
  },
  {
    name: { en: "Mustard 🌿", te: "ఆవాలు 🌿", hi: "सरसों 🌿" },
    soilTypes: ["alluvial", "loam"],
    moisture: "low",
    phRange: "neutral",
    seasons: ["rabi"],
    pests: ["none"],
    revenue: { en: "₹45,000 - ₹60,000", te: "₹45,000 - ₹60,000", hi: "₹45,000 - ₹60,000" },
    duration: { en: "110-130 days", te: "110-130 రోజులు", hi: "110-130 दिन" },
    tips: {
      en: ["Sow with proper spacing", "Avoid late sowing", "Control weeds timely"],
      te: ["తగినంత దూరంలో విత్తండి", "ఆలస్యంగా విత్తకండి", "సమయానికి కలుపు తీసేయండి"],
      hi: ["सही दूरी पर बुआई करें", "देर से बुआई न करें", "समय पर निराई करें"]
    }
  },
  {
    name: { en: "Sunflower 🌻", te: "సూర్యకాంతి 🌻", hi: "सूरजमुखी 🌻" },
    soilTypes: ["loam", "sandy"],
    moisture: "medium",
    phRange: "neutral",
    seasons: ["rabi", "kharif"],
    pests: ["none"],
    revenue: { en: "₹50,000 - ₹75,000", te: "₹50,000 - ₹75,000", hi: "₹50,000 - ₹75,000" },
    duration: { en: "90-110 days", te: "90-110 రోజులు", hi: "90-110 दिन" },
    tips: {
      en: ["Ensure full sunlight", "Do not over-irrigate", "Use balanced fertilizers"],
      te: ["పూర్తి వెలుతురును ఇవ్వండి", "అధికంగా నీరు పెట్టవద్దు", "సమతుల్య ఎరువులు వాడండి"],
      hi: ["पूरा धूप दें", "अधिक सिंचाई न करें", "संतुलित उर्वरक का प्रयोग करें"]
    }
  },
  {
    name: { en: "Turmeric 🌿", te: "పసుపు 🌿", hi: "हल्दी 🌿" },
    soilTypes: ["loam", "alluvial"],
    moisture: "high",
    phRange: "slightlyAcidic",
    seasons: ["kharif"],
    pests: ["none"],
    revenue: { en: "₹80,000 - ₹1,20,000", te: "₹80,000 - ₹1,20,000", hi: "₹80,000 - ₹1,20,000" },
    duration: { en: "210-240 days", te: "210-240 రోజులు", hi: "210-240 दिन" },
    tips: {
      en: ["Mulch after planting", "Regular irrigation needed", "Harvest after leaves dry"],
      te: ["నాటిన తర్వాత మల్చింగ్ చేయండి", "నియమితంగా నీరు పెట్టండి", "ఆకులు ఎండిన తర్వాత కోయండి"],
      hi: ["रोपण के बाद मल्चिंग करें", "नियमित सिंचाई करें", "पत्ते सूखने के बाद कटाई करें"]
    }
  },
  {
    name: { en: "Sesame 🌱", te: "నువ్వులు 🌱", hi: "तिल 🌱" },
    soilTypes: ["sandy", "red"],
    moisture: "low",
    phRange: "slightlyAcidic",
    seasons: ["kharif"],
    pests: ["none"],
    revenue: { en: "₹25,000 - ₹45,000", te: "₹25,000 - ₹45,000", hi: "₹25,000 - ₹45,000" },
    duration: { en: "80-100 days", te: "80-100 రోజులు", hi: "80-100 दिन" },
    tips: {
      en: ["Sow in well-prepared soil", "Avoid waterlogging", "Harvest on sunny days"],
      te: ["బాగా తయారుచేసిన నేలలో విత్తండి", "నీటి నిల్వను నివారించండి", "ఎండిన రోజులలో కోయండి"],
      hi: ["अच्छी तरह तैयार मिट्टी में बुआई करें", "जलभराव से बचें", "धूप वाले दिन कटाई करें"]
    }
  },
  {
    name: { en: "Coriander 🌿", te: "ధనియాలు 🌿", hi: "धनिया 🌿" },
    soilTypes: ["loam", "black"],
    moisture: "medium",
    phRange: "neutral",
    seasons: ["rabi", "zaid"],
    pests: ["none"],
    revenue: { en: "₹20,000 - ₹35,000", te: "₹20,000 - ₹35,000", hi: "₹20,000 - ₹35,000" },
    duration: { en: "90-100 days", te: "90-100 రోజులు", hi: "90-100 दिन" },
    tips: {
      en: ["Sow shallowly", "Keep moist until germination", "Thin seedlings early"],
      te: ["అతి లోతుగా విత్తకండి", "మొక్కలు పుట్టేవరకు తేమను ఉంచండి", "మొక్కలు పెరిగేలోపు తగ్గించండి"],
      hi: ["हल्की बुआई करें", "अंकुरण तक मिट्टी नम रखें", "जल्दी पौधे पतले करें"]
    }
  },

  // Crops with specific pests
  {
    name: { en: "Wheat 🌾", te: "గోధుమలు 🌾", hi: "गेंहू 🌾" },
    soilTypes: ["alluvial", "clay"],
    moisture: "medium",
    phRange: "neutral",
    seasons: ["rabi"],
    pests: ["aphids", "armyWorm"],
    revenue: { en: "₹45,000 - ₹65,000", te: "₹45,000 - ₹65,000", hi: "₹45,000 - ₹65,000" },
    duration: { en: "110-130 days", te: "110-130 రోజులు", hi: "110-130 दिन" },
    tips: {
      en: ["Sow in well-drained soil", "Use certified seeds", "Regular weed control"],
      te: ["బాగా నికసజారే నేలలో విత్తించండి", "సర్టిఫైడ్ విత్తనాలను ఉపయోగించండి", "నిరంతరం మొక్కజొన్న నివారణ చేయండి"],
      hi: ["अच्छी जल निकासी वाली मिट्टी में बोएं", "प्रमाणित बीज का उपयोग करें", "नियमित निराई करें"]
    }
  },
  {
    name: { en: "Rice 🌾", te: "బియ్యం 🌾", hi: "चावल 🌾" },
    soilTypes: ["clay", "loam"],
    moisture: "high",
    phRange: "slightlyAcidic",
    seasons: ["kharif", "rabi"],
    pests: ["stemBorer", "whitefly"],
    revenue: { en: "₹60,000 - ₹80,000", te: "₹60,000 - ₹80,000", hi: "₹60,000 - ₹80,000" },
    duration: { en: "120-150 days", te: "120-150 రోజులు", hi: "120-150 दिन" },
    tips: {
      en: ["Ensure standing water in early stages", "Timely transplanting", "Proper spacing"],
      te: ["మొదటి దశలలో నీరు నిలిచి ఉండేలా చూసుకోండి", "సకాలంలో నాటివేయడం", "తగినంత విస్తీర్ణం ఉంచండి"],
      hi: ["प्रारंभिक चरणों में पानी खड़ा रखें", "समय पर रोपाई करें", "उचित दूरी बनाए रखें"]
    }
  },
  {
    name: { en: "Maize 🌽", te: "మొక్కజొన్న 🌽", hi: "मक्का 🌽" },
    soilTypes: ["sandy", "loam"],
    moisture: "medium",
    phRange: "neutral",
    seasons: ["kharif"],
    pests: ["fruitBorer", "shootFly"],
    revenue: { en: "₹40,000 - ₹60,000", te: "₹40,000 - ₹60,000", hi: "₹40,000 - ₹60,000" },
    duration: { en: "90-120 days", te: "90-120 రోజులు", hi: "90-120 दिन" },
    tips: {
      en: ["Use nitrogen-rich fertilizer", "Control weeds early", "Monitor pest infestation"],
      te: ["నైట్రోజన్ అధికంగా ఉండే ఎరువులు వాడండి", "ఆరంభంలోనే మల్లెలను నివారించండి", "పురుగులు ఉన్నాయా అనేది గమనించండి"],
      hi: ["नाइट्रोजन युक्त उर्वरक का उपयोग करें", "जल्दी निराई करें", "कीट संक्रमण पर नजर रखें"]
    }
  },
  {
    name: { en: "Cotton ☁️", te: "పత్తి ☁️", hi: "कपास ☁️" },
    soilTypes: ["black", "clay"],
    moisture: "medium",
    phRange: "slightlyAlkaline",
    seasons: ["kharif"],
    pests: ["whitefly", "bollworm"],
    revenue: { en: "₹50,000 - ₹90,000", te: "₹50,000 - ₹90,000", hi: "₹50,000 - ₹90,000" },
    duration: { en: "150-180 days", te: "150-180 రోజులు", hi: "150-180 दिन" },
    tips: {
      en: ["Avoid water stagnation", "Timely pesticide spray", "Balanced nutrient supply"],
      te: ["నీరు నిలిచేలా కాకుండా చూడండి", "సకాలంలో పురుగుమందు స్ప్రే చేయండి", "సమతుల్యంగా పోషకాలు అందించండి"],
      hi: ["पानी का ठहराव न होने दें", "समय पर कीटनाशक छिड़काव करें", "संतुलित पोषक तत्व प्रदान करें"]
    }
  },
  {
    name: { en: "Tomato 🍅", te: "టమాటా 🍅", hi: "टमाटर 🍅" },
    soilTypes: ["loam", "silt"],
    moisture: "medium",
    phRange: "slightlyAcidic",
    seasons: ["yearRound"],
    pests: ["fruitBorer", "whitefly"],
    revenue: { en: "₹60,000 - ₹85,000", te: "₹60,000 - ₹85,000", hi: "₹60,000 - ₹85,000" },
    duration: { en: "90-100 days", te: "90-100 రోజులు", hi: "90-100 दिन" },
    tips: {
      en: ["Stake plants to prevent falling", "Regular watering", "Mulching recommended"],
      te: ["చెట్లు పడిపోకుండా స్టేక్ చేయండి", "నిరంతరం నీరు పోయండి", "మల్చింగ్ చే��డం మంచిది"],
      hi: ["पौधों को सहारा दें", "नियमित सिंचाई करें", "मल्चिंग की सलाह दी जाती है"]
    }
  },
  {
    name: { en: "Chilli 🌶️", te: "మిరపకాయలు 🌶️", hi: "मिर्च 🌶️" },
    soilTypes: ["black", "loam"],
    moisture: "low",
    phRange: "neutral",
    seasons: ["kharif", "rabi"],
    pests: ["aphids", "fruitBorer"],
    revenue: { en: "₹55,000 - ₹90,000", te: "₹55,000 - ₹90,000", hi: "₹55,000 - ₹90,000" },
    duration: { en: "120-150 days", te: "120-150 రోజులు", hi: "120-150 दिन" },
    tips: {
      en: ["Proper staking", "Drip irrigation preferred", "Avoid overcrowding"],
      te: ["తగిన మద్దతు ఇవ్వండి", "డ్రిప్ ఇరిగేషన్ వాడండి", "మరింత మొక్కలను రద్దీ చేయవద్దు"],
      hi: ["ठीक से सहारा दें", "ड्रिप सिंचाई उत्तम है", "भीड़ से बचें"]
    }
  },
  {
    name: { en: "Brinjal 🍆", te: "వంకాయ 🍆", hi: "बैंगन 🍆" },
    soilTypes: ["loam", "clay"],
    moisture: "medium",
    phRange: "neutral",
    seasons: ["yearRound"],
    pests: ["fruitBorer", "whitefly"],
    revenue: { en: "₹50,000 - ₹80,000", te: "₹50,000 - ₹80,000", hi: "₹50,000 - ₹80,000" },
    duration: { en: "100-120 days", te: "100-120 రోజులు", hi: "100-120 दिन" },
    tips: {
      en: ["Use row planting", "Regular pesticide use", "Mulching advised"],
      te: ["వరుసలుగా నాటండి", "నిరంతర పురుగుమందు వాడండి", "మల్చింగ్ మంచిది"],
      hi: ["पंक्तियों में लगाएं", "नियमित कीटनाशक का उपयोग करें", "मल्चिंग करें"]
    }
  },
  {
    name: { en: "Onion 🧅", te: "ఉల్లిపాయ 🧅", hi: "प्याज़ 🧅" },
    soilTypes: ["silt", "loam"],
    moisture: "medium",
    phRange: "slightlyAlkaline",
    seasons: ["rabi", "kharif"],
    pests: ["blowworm", "thrips"],
    revenue: { en: "₹60,000 - ₹85,000", te: "₹60,000 - ₹85,000", hi: "₹60,000 - ₹85,000" },
    duration: { en: "110-130 days", te: "110-130 రోజులు", hi: "110-130 दिन" },
    tips: {
      en: ["Avoid waterlogging", "Provide full sunlight", "Dry properly before storage"],
      te: ["నీరు నిలిచేలా కాకుండా చూడండి", "పూర్తి సూర్యకాంతి ఉండేలా చూడండి", "అనువుగా ఎండబెట్టి నిల్వ చేయండి"],
      hi: ["पानी का जमाव न हो", "पूरा धूप मिले", "भंडारण से पहले ठीक से सुखाएं"]
    }
  },
  {
    name: { en: "Sugarcane 🍬", te: "చెరకు 🍬", hi: "गन्ना 🍬" },
    soilTypes: ["clay", "alluvial"],
    moisture: "high",
    phRange: "neutral",
    seasons: ["yearRound"],
    pests: ["stemBorer", "shootFly"],
    revenue: { en: "₹80,000 - ₹1,20,000", te: "₹80,000 - ₹1,20,000", hi: "₹80,000 - ₹1,20,000" },
    duration: { en: "270-365 days", te: "270-365 రోజులు", hi: "270-365 दिन" },
    tips: {
      en: ["Requires abundant water", "Plant in furrows", "Timely cutting is important"],
      te: ["ఎక్కువ నీరు అవసరం", "నాళాలలో నాటాలి", "సకాలంలో కోత చేయండి"],
      hi: ["अधिक पानी की आवश्यकता", "नालियों में रोपाई करें", "समय पर कटाई करें"]
    }
  }
];

const SmartCropAdvisor = () => {
  const [language, setLanguage] = useState<'en' | 'te' | 'hi'>('en');
  const [soilType, setSoilType] = useState('');
  const [moisture, setMoisture] = useState('');
  const [phRange, setPhRange] = useState('');
  const [season, setSeason] = useState('');
  const [pests, setPests] = useState('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const t = translations[language] || translations.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const matchedCrops = cropData.filter(crop => {
      const soilMatch = !soilType || crop.soilTypes.includes(soilType);
      const moistureMatch = !moisture || crop.moisture === moisture;
      const phMatch = !phRange || crop.phRange === phRange;
      const seasonMatch = !season || crop.seasons.includes(season);
      const pestMatch = pests === 'none' || !pests || !crop.pests.includes(pests);
      
      return soilMatch && moistureMatch && phMatch && seasonMatch && pestMatch;
    });

    setRecommendations(matchedCrops);
    setShowResults(true);
  };

  const resetForm = () => {
    setSoilType('');
    setMoisture('');
    setPhRange('');
    setSeason('');
    setPests('');
    setRecommendations([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-green-600 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-white text-2xl font-bold">{t.title}</CardTitle>
                <CardDescription className="text-green-100">{t.description}</CardDescription>
              </div>
              <Select value={language} onValueChange={(value: 'en' | 'te' | 'hi') => setLanguage(value)}>
                <SelectTrigger className="w-[120px] bg-white/90 hover:bg-white">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English 🇬🇧</SelectItem>
                  <SelectItem value="te">తెలుగు 🇮🇳</SelectItem>
                  <SelectItem value="hi">हिंदी 🇮🇳</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          <CardContent className="bg-white/90 p-6 rounded-b-lg">
            {!showResults ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Soil Type */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-green-800 font-medium">
                      <Leaf className="h-5 w-5 text-green-600" />
                      {t.soilType}
                    </Label>
                    <Select value={soilType} onValueChange={setSoilType}>
                      <SelectTrigger className="h-12 border-green-300 hover:border-green-400 focus:ring-green-500">
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent className="border-green-200">
                        {Object.entries(t.soilTypes || {}).map(([key, value]) => (
                          <SelectItem key={key} value={key} className="hover:bg-green-50">
                            {value as string}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Moisture Level */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-blue-800 font-medium">
                      <Droplets className="h-5 w-5 text-blue-600" />
                      {t.moisture}
                    </Label>
                    <Select value={moisture} onValueChange={setMoisture}>
                      <SelectTrigger className="h-12 border-blue-300 hover:border-blue-400 focus:ring-blue-500">
                        <SelectValue placeholder="Select moisture level" />
                      </SelectTrigger>
                      <SelectContent className="border-blue-200">
                        {Object.entries(t.moistureLevels || {}).map(([key, value]) => (
                          <SelectItem key={key} value={key} className="hover:bg-blue-50">
                            {value as string}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* pH Range */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-purple-800 font-medium">
                      <BarChart2 className="h-5 w-5 text-purple-600" />
                      {t.phRange}
                    </Label>
                    <Select value={phRange} onValueChange={setPhRange}>
                      <SelectTrigger className="h-12 border-purple-300 hover:border-purple-400 focus:ring-purple-500">
                        <SelectValue placeholder="Select pH range" />
                      </SelectTrigger>
                      <SelectContent className="border-purple-200">
                        {Object.entries(t.phRanges || {}).map(([key, value]) => (
                          <SelectItem key={key} value={key} className="hover:bg-purple-50">
                            {value as string}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Season */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-amber-800 font-medium">
                      <Sun className="h-5 w-5 text-amber-600" />
                      {t.season}
                    </Label>
                    <Select value={season} onValueChange={setSeason}>
                      <SelectTrigger className="h-12 border-amber-300 hover:border-amber-400 focus:ring-amber-500">
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent className="border-amber-200">
                        {Object.entries(t.seasons || {}).map(([key, value]) => (
                          <SelectItem key={key} value={key} className="hover:bg-amber-50">
                            {value as string}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Pests */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-red-800 font-medium">
                      <Bug className="h-5 w-5 text-red-600" />
                      {t.pests}
                    </Label>
                    <Select value={pests} onValueChange={setPests}>
                      <SelectTrigger className="h-12 border-red-300 hover:border-red-400 focus:ring-red-500">
                        <SelectValue placeholder="Select common pests" />
                      </SelectTrigger>
                      <SelectContent className="border-red-200">
                        {Object.entries(t.pestsList || {}).map(([key, value]) => (
                          <SelectItem key={key} value={key} className="hover:bg-red-50">
                            {value as string}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="flex items-center gap-2">
                      <Sprout className="h-5 w-5" />
                      {t.calculate}
                    </span>
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                <div className="flex justify-between items-center pb-4 border-b border-green-200">
                  <h3 className="text-2xl font-bold text-green-800 flex items-center gap-2">
                    <Sprout className="h-6 w-6 text-green-600" />
                    {t.recommendations}
                  </h3>
                  <Button 
                    variant="outline" 
                    onClick={resetForm}
                    className="border-green-400 text-green-700 hover:bg-green-50 hover:text-green-800"
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      {t.reset}
                    </span>
                  </Button>
                </div>

                {recommendations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendations.map((crop, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow duration-300 border-green-100">
                        <CardHeader className="bg-green-50 rounded-t-lg border-b border-green-200">
                          <CardTitle className="text-xl font-bold text-green-800">
                            {crop.name[language]}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                          <div className="bg-green-50 p-4 rounded-lg">
                            <p className="font-semibold text-green-700 flex items-center gap-2">
                              <TrendingUp className="h-5 w-5" />
                              {t.revenue}:
                            </p>
                            <p className="text-green-900 pl-7">{crop.revenue[language]}</p>
                          </div>
                          
                          <div className="bg-amber-50 p-4 rounded-lg">
                            <p className="font-semibold text-amber-700 flex items-center gap-2">
                              <Clock className="h-5 w-5" />
                              {t.duration}:
                            </p>
                            <p className="text-amber-900 pl-7">{crop.duration[language]}</p>
                          </div>
                          
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="font-semibold text-blue-700 flex items-center gap-2">
                              <Calendar className="h-5 w-5" />
                              {t.tips}:
                            </p>
                            <ul className="space-y-2 pl-7">
                              {(crop.tips[language] || []).map((tip: string, i: number) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-blue-500">•</span>
                                  <span className="text-blue-900">{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="text-5xl">🌵</span>
                      <p className="text-yellow-800 font-medium max-w-md">
                        {language === 'en' ? "No perfect matches found. Try adjusting your parameters!" : 
                         "कोई सटीक मिलान नहीं मिला। अपने मापदंडों को समायोजित करें!"}
                      </p>
                      <Button 
                        onClick={resetForm}
                        className="mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                      >
                        {t.reset}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartCropAdvisor;
