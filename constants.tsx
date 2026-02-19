import React from 'react';
import { NavLink, SkinCondition, TreatmentProgram } from './types';
import { Leaf, ShieldCheck, HeartPulse, UserCheck } from 'lucide-react';

import herbalImg from './assets/herbal.webp';
import chronicImg from './assets/chronic.webp';
import detoxImg from './assets/detox.webp';
import consultationImg from './assets/personalized.webp';

import psoriasisImg from './assets/psoriasis.webp';
import acneImg from './assets/acne.webp';
import tineaImg from './assets/tinea.webp';
import eczemaImg from './assets/eczema.webp';
import fungalImg from './assets/fungal.webp';
import allergyImg from './assets/allergy.webp';

export const COLORS = {
  primary: '#1B5E20',
  secondary: '#F5F5F0',
  white: '#FFFFFF',
};

export const CONTACT_INFO = {
  hospitalName: 'Anbu Naturo Hospital',
  address: '78, Jawahar Main Rd, S S Colony, Madurai, Tamil Nadu 600016',
  phone: '081898 98232',
  workingHours: 'Mon - Sat: 9:00 AM - 8:00 PM, Sun: Closed',
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Treatments',
    path: '/treatments',
    children: [
      { label: 'Herbal Skin Care Programs', path: '/treatments/herbal-skin-care' },
      { label: 'Chronic Skin Management', path: '/treatments/chronic-management' },
      { label: 'Herbal Detox & Immune Support', path: '/treatments/detox-immune' },
      { label: 'Personalized Consultation', path: '/treatments/consultation' },
    ]
  },
  {
    label: 'Treatment Process',
    path: '/process',
    children: [
      { label: 'Psoriasis', path: '/process/psoriasis' },
      { label: 'Acne', path: '/process/acne' },
      { label: 'Tinea Cruris', path: '/process/tinea-cruris' },
      { label: 'Eczema', path: '/process/eczema' },
      { label: 'Fungal Infection', path: '/process/fungal' },
      { label: 'Skin Allergy', path: '/process/allergy' },
    ]
  },
  { label: 'FAQs', path: '/faqs' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export const WHY_CHOOSE_US = [
  {
    icon: <Leaf className="w-8 h-8 text-herbal-green" />,
    title: 'Siddha-Based Traditional Healing',
    description: 'Ancient wisdom combined with clinical observation for holistic skin recovery.'
  },
  {
    icon: <UserCheck className="w-8 h-8 text-herbal-green" />,
    title: 'Personalized Treatment Plans',
    description: 'Custom formulations tailored to your unique skin type and metabolic constitution.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-herbal-green" />,
    title: 'Steroid-Free Approach',
    description: 'We prioritize natural restoration without the use of harsh synthetic additives.'
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-herbal-green" />,
    title: 'Long-Term Skin Support',
    description: 'Ongoing guidance to maintain results and prevent future recurrence.'
  },
];

export const TREATMENT_PROGRAMS: TreatmentProgram[] = [
  {
    id: 'herbal-skin-care',
    name: 'Herbal Skin Care Programs',
    image: herbalImg,
    points: [
      'Systemic Herbal Balance',
      'Natural Surface Healing',
      'Non-Steroidal Treatment',
      'Personalized Skin Analysis'
    ]
  },
  {
    id: 'chronic-management',
    name: 'Chronic Skin Management Program',
    image: chronicImg,
    points: [
      'Root-Cause Immune Regulation',
      'Internal Detoxification',
      'Barrier Repair Support',
      'Lifestyle & Trigger Correction'
    ]
  },
  {
    id: 'detox-immune',
    name: 'Herbal Detox & Immune Support',
    image: detoxImg,
    points: [
      'Deep Internal Cleansing',
      'Immune System Strengthening',
      'Metabolic Optimization',
      'Preventive Recurrence Control'
    ]
  },
  {
    id: 'consultation',
    name: 'Personalized Siddha Consultation',
    image: consultationImg,
    points: [
      'Comprehensive Assessment',
      'Pulse & Metabolic Analysis',
      'Customized Prescription',
      'Diet & Lifestyle Blueprint'
    ]
  }
];

/* =========================
   ALL 6 SKIN CONDITIONS
========================= */

export const SKIN_CONDITIONS: SkinCondition[] = [
  {
    id: 'psoriasis',
    name: 'Psoriasis',
    image: psoriasisImg,
    shortDesc: 'Advanced immune-balancing herbal therapy for chronic plaque psoriasis.',
    sections: [
      {
        title: 'Clinical Assessment',
        iconColor: 'bg-green-100 text-green-600',
        points: ['Plaque evaluation', 'Inflammatory mapping', 'Constitution analysis']
      },
      {
        title: 'Internal Herbal Therapy',
        iconColor: 'bg-emerald-100 text-emerald-600',
        points: ['Immune modulation', 'Blood purification', 'Liver detox support']
      },
      {
        title: 'External Applications',
        iconColor: 'bg-teal-100 text-teal-600',
        points: ['Herbal oils', 'Scale-reducing pastes', 'Anti-inflammatory therapy']
      }
    ]
  },
  {
    id: 'acne',
    name: 'Acne',
    image: acneImg,
    shortDesc: 'Root-cause digestive and hormonal correction for persistent acne.',
    sections: [
      {
        title: 'Hormonal & Gut Assessment',
        iconColor: 'bg-pink-100 text-pink-600',
        points: ['Sebum imbalance evaluation', 'Digestive heat analysis', 'Lifestyle trigger mapping']
      },
      {
        title: 'Internal Detox Plan',
        iconColor: 'bg-orange-100 text-orange-600',
        points: ['Blood purification herbs', 'Hormone balancing support', 'Gut microbiome stabilization']
      },
      {
        title: 'Topical Herbal Support',
        iconColor: 'bg-yellow-100 text-yellow-600',
        points: ['Antibacterial masks', 'Scar reduction', 'Inflammation calming oils']
      }
    ]
  },
  {
    id: 'tinea-cruris',
    name: 'Tinea Cruris',
    image: tineaImg,
    shortDesc: 'Natural antifungal correction for groin-area infections.',
    sections: [
      {
        title: 'Fungal Spread Analysis',
        iconColor: 'bg-purple-100 text-purple-600',
        points: ['Moisture evaluation', 'Fungal strain review', 'Recurrence mapping']
      },
      {
        title: 'Internal Antifungal Support',
        iconColor: 'bg-violet-100 text-violet-600',
        points: ['Antifungal decoctions', 'Immune strengthening', 'Blood purification']
      },
      {
        title: 'External Hygiene Therapy',
        iconColor: 'bg-fuchsia-100 text-fuchsia-600',
        points: ['Cooling washes', 'Antifungal powders', 'Moisture control']
      }
    ]
  },
  {
    id: 'eczema',
    name: 'Eczema',
    image: eczemaImg,
    shortDesc: 'Restoring skin barrier and reducing chronic inflammation naturally.',
    sections: [
      {
        title: 'Allergy Profiling',
        iconColor: 'bg-blue-100 text-blue-600',
        points: ['Allergen identification', 'Immune mapping', 'Dry patch grading']
      },
      {
        title: 'Immune Stabilization',
        iconColor: 'bg-indigo-100 text-indigo-600',
        points: ['Anti-inflammatory herbs', 'Liver detox', 'Hydration correction']
      },
      {
        title: 'Barrier Repair Therapy',
        iconColor: 'bg-cyan-100 text-cyan-600',
        points: ['Herbal salves', 'Moisture locking', 'Steroid withdrawal guidance']
      }
    ]
  },
  {
    id: 'fungal',
    name: 'Fungal Infection',
    image: fungalImg,
    shortDesc: 'Broad-spectrum herbal care for skin and nail fungal infections.',
    sections: [
      {
        title: 'Infection Evaluation',
        iconColor: 'bg-red-100 text-red-600',
        points: ['Skin inspection', 'Spread mapping', 'Recurrence assessment']
      },
      {
        title: 'Internal Cleansing Protocol',
        iconColor: 'bg-rose-100 text-rose-600',
        points: ['Deep detox regimen', 'Immune balance', 'Systemic antifungal herbs']
      },
      {
        title: 'Topical Botanical Care',
        iconColor: 'bg-orange-100 text-orange-600',
        points: ['Antifungal oils', 'Nail restoration', 'Preventive hygiene']
      }
    ]
  },
  {
    id: 'allergy',
    name: 'Skin Allergy',
    image: allergyImg,
    shortDesc: 'Immune balancing care for chronic hives and allergic reactions.',
    sections: [
      {
        title: 'Allergen Identification',
        iconColor: 'bg-sky-100 text-sky-600',
        points: ['Trigger mapping', 'Food evaluation', 'Sensitivity profiling']
      },
      {
        title: 'Internal Immune Balance',
        iconColor: 'bg-lime-100 text-lime-600',
        points: ['Natural antihistamines', 'Liver detox blends', 'Gut repair therapy']
      },
      {
        title: 'Soothing External Relief',
        iconColor: 'bg-teal-100 text-teal-600',
        points: ['Cooling compresses', 'Anti-itch oils', 'Long-term stabilization']
      }
    ]
  }
];
