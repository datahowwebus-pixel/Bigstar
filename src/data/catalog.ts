export type DivisionId =
  | 'sportswear'
  | 'motorcycle'
  | 'medical'
  | 'fashion-leather'
  | 'safety-workwear';

export interface SubcategoryGroup {
  code: string;
  title: string;
  items: string[];
}

export interface DivisionCollageImage {
  src: string;
  alt: string;
  objectPosition?: string;
}

export interface DivisionInfo {
  id: DivisionId;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  editorialNote: string;
  heroImage: string;
  collageImages: DivisionCollageImage[];
  accentSpec: string;
  subcategories: SubcategoryGroup[];
}

export interface ProductGalleryView {
  label: string;
  caption: string;
  image?: string;
  cropPosition: string;
  scale: number;
}

export interface SampleProduct {
  id: string;
  code: string;
  divisionId: DivisionId;
  subcategory: string;
  name: string;
  summary: string;
  image: string;
  sizes: string[];
  materials: string[];
  specWeight: string;
  moq: string;
  customization: string[];
  oemAvailable: boolean;
  galleryViews: ProductGalleryView[];
}

export const HERO_IMAGE = '/bgh1.png';

export const DIVISIONS: DivisionInfo[] = [
  {
    id: 'sportswear',
    number: '01',
    title: 'Sportswear & Team Apparel',
    shortTitle: 'Sportswear',
    tagline: '3D-engineered athletic tailoring, combat sports uniforms & high-compression training gear.',
    editorialNote:
      'Engineered in breathable micro-mesh, heavyweight pearl-weave cotton, and 4-way stretch interlock for clubs, federations, and global athletic labels.',
    heroImage: '/src/assets/images/div_model_sportswear_1794860461797.jpg',
    collageImages: [
      {
        src: '/src/assets/images/div_model_sportswear_1794860461797.jpg',
        alt: 'Big Star team sportswear & tracksuits model lookbook',
        objectPosition: '50% 18%',
      },
      {
        src: '/src/assets/images/full_dummy_sportswear_1794899018416.jpg',
        alt: 'Big Star full-body tracksuit studio mannequin',
        objectPosition: '50% 15%',
      },
      {
        src: '/src/assets/images/div_sportswear_flatlay_1794854647139.jpg',
        alt: 'Sportswear jersey and athletic shorts flat-lay detail',
        objectPosition: '50% 50%',
      },
    ],
    accentSpec: '140–450 GSM · 3D Patterning & Sublimation',
    subcategories: [
      {
        code: 'A',
        title: 'Team Sportswear & Apparel',
        items: [
          'Football Kits (Jerseys, Shorts & Socks)',
          'Cricket Uniforms',
          'Basketball Uniforms',
          'Volleyball Uniforms',
          'Rugby Uniforms',
          'Tracksuits',
          'Training Suits',
          'Sports T-Shirts',
          'Sports Shorts',
          'Sports Hoodies',
          'Sports Jackets',
          'Team & Academy Uniforms',
          'Custom Sportswear',
          'Sports Accessories',
        ],
      },
      {
        code: 'B',
        title: 'Fighting Sports & Martial Arts Wear',
        items: [
          'Karate Suits (Karate Gi)',
          'Taekwondo Uniforms (Dobok)',
          'Judo Suits (Judo Gi)',
          'Brazilian Jiu-Jitsu (BJJ) Gi',
          'Boxing Shorts',
          'Boxing Uniforms',
          'Kickboxing Shorts & Uniforms',
          'MMA Shorts',
          'MMA Training Wear',
          'Wrestling Singlets',
          'Muay Thai Shorts',
          'Martial Arts Training Uniforms',
          'Martial Arts Belts',
          'Grappling Shorts',
          'Fight Rash Guards',
          'Fight Training T-Shirts',
          'Custom Fighting Sports Apparel',
        ],
      },
      {
        code: 'C',
        title: 'Fitness & Training Apparel',
        items: [
          'Gym Wear',
          'Fitness Wear',
          'Compression Wear',
          'Training T-Shirts',
          'Training Shorts',
          'Fitness Hoodies',
          'Fitness Tracksuits',
          'Workout Apparel',
          'Custom Fitness Apparel',
        ],
      },
    ],
  },
  {
    id: 'motorcycle',
    number: '02',
    title: 'Motorcycle & Protective Wear',
    shortTitle: 'Motorcycle',
    tagline: 'Track-grade leather armor, Cordura touring shells & precision riding gloves.',
    editorialNote:
      'Constructed with drum-dyed cowhide, Kevlar reinforcement panels, and CE-certified impact architecture for touring, sport, and motocross.',
    heroImage: '/src/assets/images/div_model_motorcycle_1794860457149.jpg',
    collageImages: [
      {
        src: '/src/assets/images/div_model_motorcycle_1794860457149.jpg',
        alt: 'Big Star armored motorcycle leather jacket rider lookbook',
        objectPosition: '50% 16%',
      },
      {
        src: '/src/assets/images/full_dummy_motorcycle_1794899019912.jpg',
        alt: 'Big Star full-body leather motorcycle racing suit mannequin',
        objectPosition: '50% 15%',
      },
      {
        src: '/src/assets/images/div_motorcycle_suit_1794854649628.jpg',
        alt: 'Protective touring motorcycle leather jacket specimen',
        objectPosition: '50% 35%',
      },
    ],
    accentSpec: '1.3mm Full-Grain Hide · CE EN 17092',
    subcategories: [
      {
        code: 'A',
        title: 'Motorcycle Riding Apparel',
        items: [
          'Motorcycle Racing Suits',
          'Leather Riding Suits',
          'Textile Riding Suits',
          'Motorcycle Jackets',
          'Motorcycle Riding Pants',
          'Motorcycle Riding Hoodies',
          'Protective Riding Vests',
          'Motorcycle Base Layers',
        ],
      },
      {
        code: 'B',
        title: 'Motorcycle Gloves & Accessories',
        items: [
          'Motorcycle Gloves',
          'Racing Gloves',
          'Leather Riding Gloves',
          'Motorcycle Leather Accessories',
        ],
      },
      {
        code: 'C',
        title: 'Motocross & Racing Apparel',
        items: [
          'Motocross Jerseys',
          'Motocross Pants',
          'Motocross Riding Suits',
          'Custom Racing Apparel',
        ],
      },
    ],
  },
  {
    id: 'medical',
    number: '03',
    title: 'Medical & Professional Apparel',
    shortTitle: 'Medical',
    tagline: 'Antimicrobial clinical scrubs, tailored lab coats & hospital staff uniforms.',
    editorialNote:
      'Fluid-repellent cotton-poly twill and four-way stretch healthcare textiles engineered for long clinical shifts and institutional hygiene protocols.',
    heroImage: '/src/assets/images/div_model_medical_1794860457353.jpg',
    collageImages: [
      {
        src: '/src/assets/images/div_model_medical_1794860457353.jpg',
        alt: 'Big Star antimicrobial clinical medical scrubs lookbook',
        objectPosition: '50% 16%',
      },
      {
        src: '/src/assets/images/full_dummy_medical_1794899021265.jpg',
        alt: 'Big Star full-body medical uniform studio mannequin',
        objectPosition: '50% 15%',
      },
      {
        src: '/src/assets/images/div_medical_scrubs_1794854648797.jpg',
        alt: 'Tailored hospital scrub set and clinical tunic layout',
        objectPosition: '50% 45%',
      },
    ],
    accentSpec: 'ISO 13485 Compliant · Antimicrobial Finish',
    subcategories: [
      {
        code: 'A',
        title: 'Medical & Healthcare Uniforms',
        items: [
          'Medical Scrubs',
          'Surgical Scrub Sets',
          'Doctor Uniforms',
          'Nursing Uniforms',
          'Hospital Staff Uniforms',
          'Dental Uniforms',
          'Pharmacy Uniforms',
          'Clinic Uniforms',
        ],
      },
      {
        code: 'B',
        title: 'Medical Clothing & Workwear',
        items: [
          'Lab Coats',
          'Medical Tunics',
          'Medical Pants',
          'Medical Jackets',
          'Healthcare Workwear',
          'Customized Medical Uniforms',
        ],
      },
    ],
  },
  {
    id: 'fashion-leather',
    number: '04',
    title: 'Fashion, Lifestyle & Leather Products',
    shortTitle: 'Leather & Lifestyle',
    tagline: 'Architectural leather outerwear, travel luggage, loungewear & bespoke atelier pieces.',
    editorialNote:
      'From vegetable-tanned travel bags and tailored leather jackets to silk-touch sleepwear, swimwear, and sculpted alternative silhouettes.',
    heroImage: '/src/assets/images/div_model_leather_1794860459798.jpg',
    collageImages: [
      {
        src: '/src/assets/images/div_model_leather_1794860459798.jpg',
        alt: 'Big Star fashion leather jacket & weekender duffel lookbook',
        objectPosition: '50% 16%',
      },
      {
        src: '/src/assets/images/full_dummy_leather_1794899021518.jpg',
        alt: 'Big Star full-body leather jacket & luggage studio mannequin',
        objectPosition: '50% 15%',
      },
      {
        src: '/src/assets/images/div_leather_duffel_1794854650142.jpg',
        alt: 'Full-grain leather cabin duffel bag and leathercraft goods',
        objectPosition: '50% 50%',
      },
    ],
    accentSpec: 'Full-Grain Calfskin · Bespoke Hardware',
    subcategories: [
      {
        code: 'A',
        title: 'Leather Products',
        items: [
          'Leather Jackets',
          'Leather Vests',
          'Leather Pants',
          'Leather Wallets',
          'Leather Belts',
          'Leather Bags',
          'Travel Bags',
          'Duffel Bags',
          'Backpacks',
          'Handbags',
          'Leather Gloves',
          'Custom Leather Products',
          'Promotional Leather Gifts',
        ],
      },
      {
        code: 'B',
        title: 'Nightwear, Loungewear & Intimate Apparel',
        items: [
          "Women's Night Suits",
          "Men's Night Suits",
          'Pajama Sets',
          'Night Dresses',
          'Sleep Shirts',
          'Night Gowns',
          'Sleep Shorts',
          'Bathrobes & Dressing Gowns',
          "Women's Lounge Sets",
          "Men's Lounge Sets",
          'Lounge Pants',
          'Lounge Shorts',
          'Lounge T-Shirts',
          'Homewear Sets',
          'Casual Lounge Hoodies',
          "Women's Lingerie Sets",
          'Bras',
          'Panties',
          'Bodysuits',
          'Bralettes',
          'Camisoles',
          'Slips',
          "Men's Underwear",
          "Men's Boxer Shorts",
          'Satin Lingerie',
          'Lace Lingerie',
          'Bridal Lingerie',
          'Babydoll Nightwear',
          'Chemises',
          'Fashion Lingerie Sets',
        ],
      },
      {
        code: 'C',
        title: 'Swimwear & Beachwear',
        items: [
          "Women's Bikinis",
          'Two-Piece Swimsuits',
          'One-Piece Swimsuits',
          'Brazilian Bikinis',
          'High-Waist Bikinis',
          'Triangle Bikinis',
          'String Bikinis',
          'Push-Up Bikinis',
          'Tankinis',
          "Men's Swim Shorts",
          "Men's Swimming Trunks",
          'Beach Cover-Ups',
          'Beach Dresses',
          'Beach Kaftans',
          'Sarongs',
          'Rash Guard Swimwear',
          'Custom Swimwear',
        ],
      },
      {
        code: 'D',
        title: 'Alternative & Fetish Fashion',
        items: [
          'Leather Bodysuits',
          'Leather Corsets',
          'Leather Harnesses',
          'Leather Catsuits',
          'Latex Clothing',
          'PVC Outfits',
          'Fetish Fashion Wear',
          'BDSM Costumes',
          'Leather Masks',
          'Studded Leather Apparel',
          'Gothic & Alternative Fashion',
          'Fashion Restraint Accessories',
        ],
      },
    ],
  },
  {
    id: 'safety-workwear',
    number: '05',
    title: 'Safety & Industrial Workwear',
    shortTitle: 'Safety Workwear',
    tagline: 'EN ISO 20471 high-visibility garments, flame-resistant coveralls & heavy industrial armor.',
    editorialNote:
      'Built for energy, construction, and heavy manufacturing environments with triple-stitched seams, aramid blends, and certified reflective visibility.',
    heroImage: '/src/assets/images/div_model_safety_1794860458441.jpg',
    collageImages: [
      {
        src: '/src/assets/images/div_model_safety_1794860458441.jpg',
        alt: 'Big Star flame-resistant hi-vis industrial workwear lookbook',
        objectPosition: '50% 16%',
      },
      {
        src: '/src/assets/images/full_dummy_safety_1794899023285.jpg',
        alt: 'Big Star full-body reflective FR safety uniform mannequin',
        objectPosition: '50% 15%',
      },
      {
        src: '/src/assets/images/div_safety_workwear_1794854649721.jpg',
        alt: 'Heavy-duty FR work jacket with EN ISO 20471 reflective strips',
        objectPosition: '50% 35%',
      },
    ],
    accentSpec: 'EN ISO 20471 · NFPA 2112 FR',
    subcategories: [
      {
        code: 'A',
        title: 'Safety & High-Visibility Clothing',
        items: [
          'High-Visibility Safety Vests',
          'Reflective Safety Jackets',
          'Safety Trousers',
          'Safety Work Jackets',
          'Customized Safety Apparel',
        ],
      },
      {
        code: 'B',
        title: 'Industrial & Protective Workwear',
        items: [
          'Industrial Coveralls',
          'Workwear Overalls',
          'Industrial Uniforms',
          'Construction Workwear',
          'Waterproof Workwear',
          'Protective Aprons',
        ],
      },
      {
        code: 'C',
        title: 'Specialized Protective Clothing',
        items: [
          'Flame-Resistant Clothing',
          'Welding Protective Clothing',
          'Chemical-Resistant Coveralls',
        ],
      },
    ],
  },
];

export const INITIAL_SAMPLE_PRODUCTS: SampleProduct[] = [
  {
    id: 'prod-match-kit',
    code: 'BS-01A',
    divisionId: 'sportswear',
    subcategory: 'Team Sportswear & Apparel',
    name: 'Performance Tracksuit & Kit',
    summary:
      '3D-patterned athletic tracksuit jacket and tapered training pants engineered for clubs, academies, and global exports.',
    image: '/src/assets/images/full_dummy_sportswear_1794899018416.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', 'Youth S–XL'],
    materials: ['220 GSM Interlock Poly', '4-Way Stretch Gussets', 'Moisture-Wicking DryTech'],
    specWeight: '220 GSM',
    moq: '50 Sets / Design',
    customization: ['Full Sublimation', 'Embroidered 3D Crest', 'Woven Neck Label', 'Private Label Packaging'],
    oemAvailable: true,
    galleryViews: [
      {
        label: 'Full Mannequin',
        caption: 'Big Star performance tracksuit jacket & pants',
        image: '/src/assets/images/full_dummy_sportswear_1794899018416.jpg',
        cropPosition: 'center 20%',
        scale: 1,
      },
      {
        label: 'Model Campaign',
        caption: 'Team jersey & track jacket lookbook presentation',
        image: '/src/assets/images/div_model_sportswear_1794860461797.jpg',
        cropPosition: 'center 18%',
        scale: 1,
      },
      {
        label: 'Crest Detail',
        caption: 'Embroidered Big Star chest emblem & panel stitching',
        image: '/src/assets/images/full_dummy_sportswear_1794899018416.jpg',
        cropPosition: '56% 28%',
        scale: 1.85,
      },
    ],
  },
  {
    id: 'prod-bjj-gi',
    code: 'BS-01B',
    divisionId: 'sportswear',
    subcategory: 'Fighting Sports & Martial Arts Wear',
    name: 'Pearl-Weave BJJ Gi Uniform',
    summary:
      'Reinforced competition martial arts Gi kimono jacket and ripstop trousers built with triple-stitched stress zones.',
    image: '/src/assets/images/prod_bigstar_combat_gi_1794899537414.jpg',
    sizes: ['A0', 'A1', 'A2', 'A3', 'A4', 'Youth M0–M4'],
    materials: ['450 GSM Pearl-Weave Cotton', '10oz Ripstop Trousers', 'EVA Foam Collar Core'],
    specWeight: '450 GSM',
    moq: '30 Units / Style',
    customization: ['High-Density Embroidery', 'Custom Woven Tape', 'Contrast Stitching', 'OEM Carry Bag'],
    oemAvailable: true,
    galleryViews: [
      {
        label: 'Full Uniform',
        caption: 'Navy pearl-weave Gi jacket, belt & ripstop pants',
        image: '/src/assets/images/prod_bigstar_combat_gi_1794899537414.jpg',
        cropPosition: 'center 20%',
        scale: 1,
      },
      {
        label: 'Lapel & Crest',
        caption: 'Reinforced lapel & embroidered Big Star badge',
        image: '/src/assets/images/prod_bigstar_combat_gi_1794899537414.jpg',
        cropPosition: '58% 30%',
        scale: 1.8,
      },
    ],
  },
  {
    id: 'prod-fitness-hoodie',
    code: 'BS-01C',
    divisionId: 'sportswear',
    subcategory: 'Fitness & Training Apparel',
    name: 'Fitness Hoodie & Gym Shorts',
    summary:
      'Breathable scuba-knit training hoodie, compression base tee, and 4-way stretch gym shorts for athletic programs.',
    image: '/src/assets/images/prod_bigstar_fitness_1794899539579.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    materials: ['280 GSM Scuba-Tech Fleece', 'Elastane Compression Mesh', 'Flatlock Anti-Chafe Seams'],
    specWeight: '280 GSM',
    moq: '50 Sets / Style',
    customization: ['Silicone Heat Transfer', 'Custom Zipper Pulls', 'Reflective Piping'],
    oemAvailable: true,
    galleryViews: [
      {
        label: 'Training Kit',
        caption: 'Full zip fitness hoodie with compression tee & shorts',
        image: '/src/assets/images/prod_bigstar_fitness_1794899539579.jpg',
        cropPosition: 'center 15%',
        scale: 1,
      },
      {
        label: 'Shorts & Print',
        caption: 'Big Star thigh crest & moisture-wicking fabric',
        image: '/src/assets/images/prod_bigstar_fitness_1794899539579.jpg',
        cropPosition: '54% 62%',
        scale: 1.8,
      },
    ],
  },
  {
    id: 'prod-moto-jacket',
    code: 'BS-02A',
    divisionId: 'motorcycle',
    subcategory: 'Motorcycle Riding Apparel',
    name: 'Armored Leather Moto Suit',
    summary:
      'Articulated 1.3mm full-grain cowhide racing jacket & trousers with molded shoulder/knee armor and brass zips.',
    image: '/src/assets/images/full_dummy_motorcycle_1794899019912.jpg',
    sizes: ['EU 46', 'EU 48', 'EU 50', 'EU 52', 'EU 54', 'EU 56', 'Custom Measure'],
    materials: ['1.3mm Drum-Dyed Cowhide', 'Carbon Shoulder Sliders', 'CE Level 2 Removable Armor'],
    specWeight: '1.3 mm Hide',
    moq: '15 Suits / Model',
    customization: ['Embroidered Brand Crest', 'Perforated Zone Mapping', 'Custom Lining Print', 'CE Labeling'],
    oemAvailable: true,
    galleryViews: [
      {
        label: 'Full Suit',
        caption: 'Big Star armored leather motorcycle racing jacket & pants',
        image: '/src/assets/images/full_dummy_motorcycle_1794899019912.jpg',
        cropPosition: 'center 20%',
        scale: 1,
      },
      {
        label: 'Rider Lookbook',
        caption: 'Full-grain moto jacket fitted on rider model',
        image: '/src/assets/images/div_model_motorcycle_1794860457149.jpg',
        cropPosition: 'center 18%',
        scale: 1,
      },
      {
        label: 'Armor & Crest',
        caption: 'Molded carbon shoulder protection & chest embroidery',
        image: '/src/assets/images/full_dummy_motorcycle_1794899019912.jpg',
        cropPosition: '56% 28%',
        scale: 1.8,
      },
    ],
  },
  {
    id: 'prod-motocross-kit',
    code: 'BS-02C',
    divisionId: 'motorcycle',
    subcategory: 'Motocross & Racing Apparel',
    name: 'Sublimated Motocross MX Kit',
    summary:
      'Abrasion-resistant Cordura motocross jersey and articulated MX racing pants built with laser-cut ventilation.',
    image: '/src/assets/images/prod_bigstar_motocross_1794899540492.jpg',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', 'Youth Kits'],
    materials: ['600D Cordura Nylon', 'Heat-Resistant Knee Panels', 'Fade-Free Sublimated Mesh'],
    specWeight: '240 GSM',
    moq: '30 Kits / Design',
    customization: ['Custom Rider Name/Number', 'Team Sponsor Graphics', 'Knee Leather Patches'],
    oemAvailable: true,
    galleryViews: [
      {
        label: 'Full MX Kit',
        caption: 'Sublimated Big Star motocross jersey & racing pants',
        image: '/src/assets/images/prod_bigstar_motocross_1794899540492.jpg',
        cropPosition: 'center 20%',
        scale: 1,
      },
      {
        label: 'Jersey Detail',
        caption: 'Center chest Big Star sublimation graphic & collar trim',
        image: '/src/assets/images/prod_bigstar_motocross_1794899540492.jpg',
        cropPosition: '50% 28%',
        scale: 1.8,
      },
    ],
  },
  {
    id: 'prod-medical-scrub',
    code: 'BS-03A',
    divisionId: 'medical',
    subcategory: 'Medical & Healthcare Uniforms',
    name: 'Clinical Antimicrobial Scrubs',
    summary:
      'Precision-cut hospital V-neck scrub tops and tailored trousers treated for 75+ industrial hygiene washes.',
    image: '/src/assets/images/full_dummy_medical_1794899021265.jpg',
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    materials: ['65/35 Cotton-Polyester Twill', '4-Way Spandex Poplin', 'Silver-Ion Antimicrobial Finish'],
    specWeight: '195 GSM',
    moq: '100 Units / Colorway',
    customization: ['Hospital Crest Embroidery', 'Custom Pantone Dyeing', 'RFID Pocket Tagging', 'Barcoded Hangtags'],
    oemAvailable: true,
    galleryViews: [
      {
        label: 'Full Uniform',
        caption: 'Antimicrobial V-neck medical scrub set with Big Star crest',
        image: '/src/assets/images/full_dummy_medical_1794899021265.jpg',
        cropPosition: 'center 20%',
        scale: 1,
      },
      {
        label: 'Clinical Fit',
        caption: 'Tailored hospital scrubs worn by female clinician',
        image: '/src/assets/images/div_model_medical_1794860457353.jpg',
        cropPosition: 'center 18%',
        scale: 1,
      },
    ],
  },
  {
    id: 'prod-lab-coat',
    code: 'BS-03B',
    divisionId: 'medical',
    subcategory: 'Medical Clothing & Workwear',
    name: 'Physician Lab Coat & Scrubs',
    summary:
      'Crisp fluid-repellent consultation lab coat layered over deep-navy stretch scrubs for institutional hospital programs.',
    image: '/src/assets/images/prod_bigstar_labcoat_1794899539931.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    materials: ['215 GSM Bleached Clinical Twill', 'Concealed Snap Placket', 'Antimicrobial Finish'],
    specWeight: '215 GSM',
    moq: '80 Units / Style',
    customization: ['Embroidered Department Badge', 'Monogramming', 'Custom Pocket Layout'],
    oemAvailable: true,
    galleryViews: [
      {
        label: 'Full Lab Coat',
        caption: 'White physician coat over tailored navy Big Star scrubs',
        image: '/src/assets/images/prod_bigstar_labcoat_1794899539931.jpg',
        cropPosition: 'center 20%',
        scale: 1,
      },
      {
        label: 'Pocket Embroidery',
        caption: 'Mitered breast pocket with Big Star crest',
        image: '/src/assets/images/prod_bigstar_labcoat_1794899539931.jpg',
        cropPosition: '56% 30%',
        scale: 1.8,
      },
    ],
  },
  {
    id: 'prod-leather-atelier',
    code: 'BS-04A',
    divisionId: 'fashion-leather',
    subcategory: 'Leather Products',
    name: 'Leather Jacket & Duffel Set',
    summary:
      'Tailored full-grain cowhide leather lifestyle jacket paired with a structured weekender cabin duffel bag.',
    image: '/src/assets/images/full_dummy_leather_1794899021518.jpg',
    sizes: ['XS–3XL (Jacket)', '45L Cabin Duffel', '55L Weekender'],
    materials: ['Full-Grain Pebbled Cowhide', 'Vegetable-Tanned Bridle Trim', 'Solid Brushed Brass'],
    specWeight: '1.6 mm Hide',
    moq: '25 Units / SKU',
    customization: ['Blind Deboss Monogram', 'Gold Foil Stamping', 'Custom Cotton Twill Lining', 'Dust Bag Branding'],
    oemAvailable: true,
    galleryViews: [
      {
        label: 'Full Ensemble',
        caption: 'Full-grain leather jacket & matching duffel on plinth',
        image: '/src/assets/images/full_dummy_leather_1794899021518.jpg',
        cropPosition: 'center 20%',
        scale: 1,
      },
      {
        label: 'Editorial Lookbook',
        caption: 'Leather jacket and branded travel duffel lookbook',
        image: '/src/assets/images/div_model_leather_1794860459798.jpg',
        cropPosition: 'center 18%',
        scale: 1,
      },
    ],
  },
  {
    id: 'prod-leather-luggage',
    code: 'BS-04B',
    divisionId: 'fashion-leather',
    subcategory: 'Leather Products',
    name: 'Leather Travel Duffel & Backpack',
    summary:
      'Hand-finished pebble leather weekender duffel, structured commuter backpack, and lined driving gloves.',
    image: '/src/assets/images/prod_bigstar_leather_bag_1794899540381.jpg',
    sizes: ['45L Duffel', '24L Backpack', 'S–XL Gloves'],
    materials: ['Full-Grain Drum-Dyed Leather', 'Brushed Brass Zippers', 'Suede Interior Lining'],
    specWeight: '1.8 mm Hide',
    moq: '25 Sets / SKU',
    customization: ['Embossed Brand Patch', 'Custom Dust Bag', 'Metallic Foil Logo'],
    oemAvailable: true,
    galleryViews: [
      {
        label: 'Luggage Trio',
        caption: 'Duffel bag, backpack & leather gloves on limestone plinth',
        image: '/src/assets/images/prod_bigstar_leather_bag_1794899540381.jpg',
        cropPosition: 'center center',
        scale: 1,
      },
      {
        label: 'Duffel Front Crest',
        caption: 'Crisp Big Star emblem embossed on pebble cowhide',
        image: '/src/assets/images/prod_bigstar_leather_bag_1794899540381.jpg',
        cropPosition: '42% 55%',
        scale: 1.75,
      },
    ],
  },
  {
    id: 'prod-fr-workjacket',
    code: 'BS-05C',
    divisionId: 'safety-workwear',
    subcategory: 'Specialized Protective Clothing',
    name: 'Hi-Vis FR Industrial Suit',
    summary:
      'Flame-resistant navy twill work jacket and reinforced cargo trousers with 50mm EN ISO 20471 reflective banding.',
    image: '/src/assets/images/full_dummy_safety_1794899023285.jpg',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', 'Tall Fit'],
    materials: ['320 GSM FR Cotton-Modacrylic', 'EN ISO 20471 Reflective Tape', 'Nomex Thread Stitching'],
    specWeight: '320 GSM',
    moq: '100 Units / Batch',
    customization: ['FR Company Patch', 'Custom Sleeve Badge', 'Two-Tone Hi-Vis Mapping', 'CE Spec Neck Label'],
    oemAvailable: true,
    galleryViews: [
      {
        label: 'Full FR Uniform',
        caption: 'Big Star navy FR jacket & cargo pants with reflective trim',
        image: '/src/assets/images/full_dummy_safety_1794899023285.jpg',
        cropPosition: 'center 20%',
        scale: 1,
      },
      {
        label: 'Field Fit Model',
        caption: 'Complete FR jacket and cargo trouser workwear kit',
        image: '/src/assets/images/div_model_safety_1794860458441.jpg',
        cropPosition: 'center 18%',
        scale: 1,
      },
    ],
  },
];
