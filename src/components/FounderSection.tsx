"use client";

import React from "react";
import { GraduationCap, Briefcase, Award, Sparkles, BookOpen, HeartHandshake } from "lucide-react";

interface FounderSectionProps {
  onBookConsultation: () => void;
}

export default function FounderSection({ onBookConsultation }: FounderSectionProps) {
  const degrees = [
    {
      title: "Ph.D. in Organizational Psychology",
      institution: "Jamia Millia Islamia University, New Delhi",
      focus: "Research focus on employee motivation, commitment, personal development, and holistic well-being."
    },
    {
      title: "Master of Human Resource Management (MAHRM)",
      institution: "Jamia Millia Islamia University, New Delhi",
      focus: "People development, organizational behavior, and supportive workplace wellness environments."
    },
    {
      title: "Master of Tourism Management (MTM)",
      institution: "Lucknow University (through UPMCAT)",
      focus: "Cross-cultural service leadership, guest wellness experience, and hospitality systems."
    },
    {
      title: "Diploma in Career Guidance & Counselling",
      institution: "Jamia Millia Islamia University, New Delhi",
      focus: "Behavioral counselling, emotional resilience, and intentional life-habit coaching."
    },
    {
      title: "Advanced Certification in Nutritional Counselling",
      institution: "Health Academy, Melbourne, Australia",
      focus: "Nutritional psychology, mindful eating protocols, macronutrient balance, and metabolic support."
    },
    {
      title: "Diploma in Food & Dietetics",
      institution: "National Skill Development Corporation (NSDC)",
      focus: "Dietary planning, nutrient bioavailability, food safety standards, and therapeutic meal formulation."
    }
  ];

  const careerHighlights = [
    {
      role: "Flight Operations Control & Terminal-3 Operation",
      organization: "GMR — Delhi International Airport",
      description: "Flight operations control and terminal operations, high-tempo coordination, situational discipline, and people-centred precision."
    },
    {
      role: "Luxury Hospitality Leadership",
      organization: "Taj Lake Palace, Udaipur",
      description: "World-renowned royal hospitality, culinary perfectionism, and guest-centered wellness service."
    },
    {
      role: "Hospitality Management",
      organization: "Radisson Hotel, Delhi",
      description: "Service excellence, banquet catering standards, and food presentation discipline."
    },
    {
      role: "Resort Operations & Experience",
      organization: "Sterling Resorts India Pvt. Ltd.",
      description: "Holistic leisure environments, nature retreats, and guest well-being engagement."
    }
  ];

  return (
    <section id="founder" className="py-20 bg-[#FCFAF6] border-b border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#B45309] bg-amber-100/70 px-3 py-1 rounded-full">
            <span>Leadership & Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#27211A]">
            Meet the Founder
          </h2>
          <p className="text-[#655544] text-base leading-relaxed">
            Bridging organizational psychology, service excellence in aviation & luxury hospitality, 
            and certified nutritional science.
          </p>
        </div>

        {/* Founder Bio Card */}
        <div className="bg-gradient-to-br from-white to-[#FAF6EE] rounded-3xl p-6 sm:p-12 border border-[#E8DEC9] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Portrait Card */}
            <div className="lg:col-span-5 text-center">
              <div className="relative inline-block">
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-[#1C3D2B] via-[#C28833] to-[#F59E0B] p-1.5 shadow-xl mx-auto">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner relative bg-[#FAF5EB]">
                    <img
                      src="/dr-afroz.jpeg"
                      alt="Dr. Khan Afroz Shams"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#1C3D2B] text-amber-200 text-xs font-semibold px-4 py-1 rounded-full shadow border-2 border-white whitespace-nowrap">
                  15+ Years Multidisciplinary Experience
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={onBookConsultation}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#C28833] to-[#996515] hover:from-[#B37825] hover:to-[#7A500D] text-white px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-sm transition-all"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Book Consultation with Dr. Afroz</span>
                </button>
              </div>
            </div>

            {/* Founder Biography */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#F3ECE0] text-[#7C6A53]">
                Founder & Wellness Formulator
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#27211A]">
                Dr. Khan Afroz Shams
              </h3>

              <div className="text-sm sm:text-base text-[#4A3E31] leading-relaxed space-y-3">
                <p>
                  Dr. Khan Afroz Shams is a multidisciplinary professional with over 15 years of rich 
                  experience across hospitality, aviation, organizational psychology, career guidance, 
                  human resource management, and nutritional counselling. Her career reflects a lifelong 
                  dedication to human growth, behaviour, emotional development, and well-being.
                </p>
                <p>
                  With an academic foundation in organizational psychology and nutritional counselling, 
                  Dr. Afroz takes an integrated, human-centric view of well-being—recognizing that physical 
                  nourishment, daily routines, emotional awareness, and supportive environments all 
                  intertwine in how people care for themselves.
                </p>
                <p className="italic text-[#7C6A53] border-l-2 border-[#C28833] pl-3 py-1">
                  “Through Dr. KAS’S, I hope to bring this integrative perspective into a practical, 
                  food-focused brand that makes mindful nourishment comforting, traditional, and enjoyable 
                  for the entire family.”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Qualifications & Professional Experience Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Academic Qualifications */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC9] shadow-sm space-y-6">
            <div className="flex items-center space-x-3 border-b border-[#EFE8D8] pb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg text-[#27211A]">
                  Academic Qualifications & Certifications
                </h4>
                <p className="text-xs text-[#7C6A53]">
                  Rigorous multidisciplinary training across universities & institutions
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {degrees.map((deg, i) => (
                <div
                  key={i}
                  className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#EAE0CD] hover:border-[#C28833] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-serif font-bold text-sm text-[#27211A]">{deg.title}</h5>
                      <span className="text-xs text-[#1C3D2B] font-semibold">{deg.institution}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#6B5A47] mt-1.5 leading-relaxed">{deg.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC9] shadow-sm space-y-6">
            <div className="flex items-center space-x-3 border-b border-[#EFE8D8] pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg text-[#27211A]">
                  Professional Career Pedigree
                </h4>
                <p className="text-xs text-[#7C6A53]">
                  Service excellence, human factors & operational care
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {careerHighlights.map((exp, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#F7F3EA] border border-[#EBE1CF] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C28833] uppercase tracking-wider">
                      {exp.organization}
                    </span>
                  </div>
                  <h5 className="font-serif font-bold text-sm text-[#27211A]">{exp.role}</h5>
                  <p className="text-xs text-[#6B5A47] leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#1C3D2B] text-[#FAF5EB] p-4 rounded-2xl text-xs space-y-2">
              <span className="font-bold text-amber-300 uppercase tracking-wider block">
                The Service Philosophy
              </span>
              <p className="text-[#D6E3DA] leading-relaxed">
                “These prestigious experiences in aviation and luxury hospitality forged our unwavering 
                standard for uncompromising hygiene, ingredient purity, and genuine people-centered care.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
