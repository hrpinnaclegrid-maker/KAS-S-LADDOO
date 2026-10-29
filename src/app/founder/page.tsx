"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  HeartHandshake,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export default function FounderPage() {
  const academicDegrees = [
    {
      title: "Ph.D. in Organizational Psychology",
      institution: "Jamia Millia Islamia University, New Delhi",
      focus: "Research focus on employee motivation, psychological commitment, human potential, and organizational well-being."
    },
    {
      title: "Master of Human Resource Management (MAHRM)",
      institution: "Jamia Millia Islamia University, New Delhi",
      focus: "Human behavior, people-centered culture, and supportive workplace health environments."
    },
    {
      title: "Master of Tourism Management (MTM)",
      institution: "Lucknow University (through UPMCAT)",
      focus: "Cross-cultural hospitality excellence, guest wellness systems, and luxury operational management."
    },
    {
      title: "Diploma in Career Guidance & Counselling",
      institution: "Jamia Millia Islamia University, New Delhi",
      focus: "Behavioral psychology, habit formation, emotional resilience, and intentional self-care routines."
    },
    {
      title: "Advanced Certification in Nutritional Counselling",
      institution: "Health Academy, Melbourne, Australia",
      focus: "Nutritional psychology, mindful eating protocols, macronutrient bio-availability, and metabolic support."
    },
    {
      title: "Diploma in Food & Dietetics",
      institution: "National Skill Development Corporation (NSDC)",
      focus: "Nutrient density, therapeutic diet planning, ingredient safety, and traditional meal formulation."
    }
  ];

  const careerPedigree = [
    {
      role: "Flight Operations Control & Terminal-3 Operations",
      place: "GMR — Delhi International Airport (T3)",
      description: "Flight operations control and terminal operations, high-tempo coordination, situational discipline, and people-centred precision."
    },
    {
      role: "Luxury Royal Hospitality",
      place: "Taj Lake Palace, Udaipur",
      description: "Iconic world-class Indian hospitality, royal culinary heritage, and obsessive attention to detail."
    },
    {
      role: "Hospitality Operations",
      place: "Radisson Hotel, Delhi",
      description: "International banquet standards, food safety hygiene, and human service excellence."
    },
    {
      role: "Wellness Retreat Operations",
      place: "Sterling Resorts India Pvt. Ltd.",
      description: "Nature retreats, guest restorative leisure, and healthy lifestyle engagement."
    }
  ];

  return (
    <div className="py-10 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#B45309] bg-amber-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Mind Behind The Brand</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#27211A] leading-tight">
            Meet Dr. Khan Afroz Shams
          </h1>
          <p className="text-sm sm:text-base text-[#6B5A47]">
            Organizational Psychologist, Certified Nutritional Counsellor, and founder of Dr. KAS’S Homemade Laddu Collection.
          </p>
        </div>

        {/* Hero Portrait & Editorial Bio */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E8DEC9] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Portrait Card */}
            <div className="lg:col-span-5 text-center space-y-6">
              <div className="relative inline-block">
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-[#1C3D2B] via-[#B45309] to-[#D97706] p-1.5 shadow-2xl mx-auto">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner relative bg-[#FAF5EB]">
                    <img
                      src="/dr-afroz.jpeg"
                      alt="Dr. Khan Afroz Shams"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#1C3D2B] text-amber-200 text-xs font-bold px-4 py-1.5 rounded-full shadow border-2 border-white whitespace-nowrap">
                  15+ Years Multidisciplinary Experience
                </div>
              </div>

              <div>
                <Link
                  href="/consult"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#B45309] to-[#92400E] hover:from-[#92400E] hover:to-[#78350F] text-white hover:text-white px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all"
                  style={{ color: "#FFFFFF" }}
                >
                  <HeartHandshake className="w-4 h-4" style={{ color: "#FFFFFF" }} />
                  <span>Book Consultation with Dr. Shams</span>
                </Link>
              </div>
            </div>

            {/* Editorial Bio */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B45309] bg-amber-50 px-3 py-1 rounded-full inline-block">
                Founder Story & Integrated Vision
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#27211A]">
                Where Professional Experience Meets Mindful Well-Being
              </h2>

              <div className="text-sm text-[#4A3E31] leading-relaxed space-y-3">
                <p>
                  Dr. Khan Afroz Shams is a multidisciplinary professional with over 15 years of professional 
                  experience across hospitality, aviation, organizational psychology, career guidance, 
                  human resource management, and nutritional counselling. Her work and studies reflect a continuing 
                  interest in human growth, behaviour, development, and well-being.
                </p>
                <p>
                  With a background in organizational psychology and nutritional counselling, Dr. Khan Afroz Shams takes 
                  an integrated view of well-being—recognizing that physical nourishment, daily habits, emotional 
                  awareness, and supportive environments all contribute to how people care for themselves.
                </p>
                <p>
                  Through Dr. KAS’S, she hopes to bring this perspective into a practical, food-focused brand that makes 
                  mindful nourishment enjoyable.
                </p>
                <blockquote className="border-l-4 border-[#B45309] pl-4 py-1 italic text-[#6B5A47] font-serif text-sm">
                  “Healing begins when we stop treating food as a battleground of guilt or restriction. Mindful food choices can be a meaningful part of everyday well-being—for the whole family.”
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Credentials & Career Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Degrees */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC9] shadow-sm space-y-6">
            <div className="flex items-center space-x-3 border-b border-[#EFE8D8] pb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#27211A]">
                  Academic Qualifications & Certifications
                </h3>
                <p className="text-xs text-[#7C6A53]">
                  Rigorous qualifications across leading universities and national councils
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {academicDegrees.map((deg, i) => (
                <div key={i} className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#EAE0CD] space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#27211A]">{deg.title}</h4>
                      <span className="text-xs font-semibold text-[#1C3D2B]">{deg.institution}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#6B5A47] leading-relaxed pt-1">{deg.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Career Pedigree */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC9] shadow-sm space-y-6">
            <div className="flex items-center space-x-3 border-b border-[#EFE8D8] pb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#27211A]">
                  Professional Career Pedigree
                </h3>
                <p className="text-xs text-[#7C6A53]">
                  Aviation precision & royal hospitality excellence
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {careerPedigree.map((item, i) => (
                <div key={i} className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#EAE0CD] space-y-1">
                  <span className="text-[10px] font-bold text-[#B45309] uppercase tracking-wider block">
                    {item.place}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#27211A]">{item.role}</h4>
                  <p className="text-xs text-[#6B5A47] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#1C3D2B] text-[#FAF5EB] p-5 rounded-2xl space-y-2 text-xs">
              <span className="font-bold text-amber-300 uppercase tracking-wider block">
                The Service Standard
              </span>
              <p className="text-[#D6E3DA] leading-relaxed">
                “These demanding experiences instilled the discipline of zero compromise—from laboratory-grade kitchen hygiene 
                to ingredient transparency and genuine warmth.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
