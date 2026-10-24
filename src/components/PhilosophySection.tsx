"use client";

import React, { useState } from "react";
import { Brain, Heart, Sparkles, CheckCircle2, Compass, Target, Sun, Feather } from "lucide-react";

export default function PhilosophySection() {
  const [activePillar, setActivePillar] = useState<"mind" | "body" | "soul">("mind");

  const pillars = {
    mind: {
      title: "Mind — Nutritional Psychology",
      subtitle: "Emotional Awareness & Habit Formation",
      icon: Brain,
      color: "from-amber-600 to-amber-700",
      accentBg: "bg-amber-50 border-amber-200 text-amber-900",
      description:
        "Nutritional psychology explores how our everyday food choices, emotions, stress, routines, and physical environments intersect. Rather than approaching snacking with guilt or rigid restriction, Dr. KAS’S fosters positive awareness—helping individuals and families build sustainable, joyful eating rituals that support everyday mental clarity.",
      keyPoints: [
        "Unpacking the connection between emotional stress and mindless snacking",
        "Encouraging conscious eating routines over fast-paced convenience grabs",
        "Developing long-term sustainable nourishment habits for busy careers",
        "Fostering a positive, guilt-free relationship with wholesome traditional foods"
      ]
    },
    body: {
      title: "Body — Balanced Nourishment",
      subtitle: "Whole Foods, Pure Fats & Steady Energy",
      icon: Heart,
      color: "from-emerald-700 to-emerald-800",
      accentBg: "bg-emerald-50 border-emerald-200 text-emerald-900",
      description:
        "Physical well-being thrives on unadulterated real foods. Our laddus are thoughtfully handcrafted using high-grade dry fruits, nutrient-dense ancient millets (ragi, bajra, jowar), and pure desi cow ghee. We prioritize bioavailable minerals, fiber, and healthy monounsaturated fats to fuel daily vitality.",
      keyPoints: [
        "Dry fruits and nuts providing natural fats, sustained energy, and protein",
        "Ancient millets offering mineral density, calcium, and complex carbohydrates",
        "Naturally sweetened with dates, figs, and unrefined jaggery—no white sugar",
        "Honoring sleep, movement, and mindful digestion as pillars of physical health"
      ]
    },
    soul: {
      title: "Soul — Chakra Harmony & Mindfulness",
      subtitle: "Traditional Balance & Inner Awareness",
      icon: Sparkles,
      color: "from-indigo-600 to-indigo-700",
      accentBg: "bg-indigo-50 border-indigo-200 text-indigo-900",
      description:
        "Drawing inspiration from the ancient wisdom of chakra philosophy, we view food preparation as an act of mindfulness and positive intention. Each laddu recipe reflects balance, grounding resilience, and sensory gratitude—inviting you to pause, savor, and cultivate inner harmony in a rushed world.",
      keyPoints: [
        "Inspired by traditional chakra symbolism of balance and self-care",
        "Prepared with calm intention, hygiene, and respect for ingredients",
        "Inviting present-moment sensory appreciation with every bite",
        "A mindful pause in the day to nourish the spirit alongside the body"
      ]
    }
  };

  const objectives = [
    {
      title: "Health & Nourishment",
      desc: "Encourage wholesome snacking through thoughtfully prepared homemade laddus rich in natural nutrients."
    },
    {
      title: "Taste & Satisfaction",
      desc: "Celebrate rich traditional Indian flavours to create an indulgent, deeply satisfying snack experience."
    },
    {
      title: "Mind-Body Well-being",
      desc: "Raise awareness of how nutrition, routines, emotions, and lifestyle choices relate to overall health."
    },
    {
      title: "Nutritional Psychology",
      desc: "Encourage a mindful approach to food habits, mindful chewing, and everyday self-care."
    },
    {
      title: "Holistic Harmony",
      desc: "Draw inspiration from chakra balance as a guiding symbol of inner alignment and awareness."
    },
    {
      title: "Generational Habits",
      desc: "Make nutritious snack choices appealing and exciting to children, teens, and young adults."
    }
  ];

  const currentPillarData = pillars[activePillar];
  const IconComponent = currentPillarData.icon;

  return (
    <section id="philosophy" className="py-20 bg-[#FCFAF6] border-b border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#B45309] bg-amber-100/70 px-3 py-1 rounded-full">
            <span>Philosophy & Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#27211A]">
            Healing Mind, Body & Soul
          </h2>
          <p className="text-[#655544] text-base sm:text-lg leading-relaxed">
            Founded by Dr. Khan Afroz Shams, Dr. KAS’S is built on the belief that everyday food choices 
            are a profound act of self-care. We blend traditional culinary heritage with the insights 
            of modern nutritional psychology and chakra balance.
          </p>
        </div>

        {/* The 3 Interactive Pillars Tabs */}
        <div className="bg-white rounded-3xl border border-[#E8DEC9] p-6 sm:p-10 shadow-sm">
          {/* Tabs selector */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 border-b border-[#EFE8D8] pb-6 mb-8">
            <button
              onClick={() => setActivePillar("mind")}
              className={`flex items-center space-x-2.5 px-6 py-3 rounded-2xl font-serif text-base font-semibold transition-all w-full sm:w-auto justify-center ${
                activePillar === "mind"
                  ? "bg-[#C28833] text-white shadow-md scale-102"
                  : "bg-[#F7F3EA] text-[#5C4D3D] hover:bg-[#EFE7D8]"
              }`}
            >
              <Brain className="w-5 h-5" />
              <span>1. The Mind (Psychology)</span>
            </button>

            <button
              onClick={() => setActivePillar("body")}
              className={`flex items-center space-x-2.5 px-6 py-3 rounded-2xl font-serif text-base font-semibold transition-all w-full sm:w-auto justify-center ${
                activePillar === "body"
                  ? "bg-[#1C3D2B] text-white shadow-md scale-102"
                  : "bg-[#F7F3EA] text-[#5C4D3D] hover:bg-[#EFE7D8]"
              }`}
            >
              <Heart className="w-5 h-5" />
              <span>2. The Body (Nourishment)</span>
            </button>

            <button
              onClick={() => setActivePillar("soul")}
              className={`flex items-center space-x-2.5 px-6 py-3 rounded-2xl font-serif text-base font-semibold transition-all w-full sm:w-auto justify-center ${
                activePillar === "soul"
                  ? "bg-[#4338CA] text-white shadow-md scale-102"
                  : "bg-[#F7F3EA] text-[#5C4D3D] hover:bg-[#EFE7D8]"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span>3. The Soul (Chakra Harmony)</span>
            </button>
          </div>

          {/* Active Pillar Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#F3ECE0] text-[#7C6A53]">
                {currentPillarData.subtitle}
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#27211A]">
                {currentPillarData.title}
              </h3>
              <p className="text-[#5C4D3D] text-base leading-relaxed">
                {currentPillarData.description}
              </p>

              <div className="pt-3 space-y-2.5">
                {currentPillarData.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-sm text-[#3D3328]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className={`p-8 rounded-2xl border ${currentPillarData.accentBg} space-y-4 shadow-sm`}>
                <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center shadow-sm">
                  <IconComponent className="w-7 h-7 text-[#2D261E]" />
                </div>
                <h4 className="font-serif font-bold text-lg text-current">
                  Holistic Wellness Perspective
                </h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  “Our approach is inspired by holistic wellness. We do not claim that laddus alone heal
                  medical conditions or activate chakras. Rather, we invite people to see mindful food choices
                  as one possible part of a balanced lifestyle.”
                </p>
                <div className="text-xs font-semibold uppercase tracking-wider pt-2 border-t border-current/20">
                  — Dr. Khan Afroz Shams
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Core Purpose & Objectives Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-serif font-bold text-[#27211A]">
              Our Purpose & Core Objectives
            </h3>
            <p className="text-sm text-[#6E5E4D]">
              Guiding principles behind every recipe, portion, and family routine we support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((obj, i) => (
              <div
                key={i}
                className="bg-white/80 hover:bg-white rounded-2xl p-6 border border-[#E9DFCE] hover:border-[#C28833] transition-all hover:shadow-md space-y-2 group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FAF5EB] group-hover:bg-amber-100 text-[#C28833] flex items-center justify-center font-bold text-xs">
                  0{i + 1}
                </div>
                <h4 className="font-serif font-bold text-base text-[#27211A] pt-1">
                  {obj.title}
                </h4>
                <p className="text-xs text-[#5C4D3D] leading-relaxed">
                  {obj.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision & Mission Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-[#1C3D2B] text-white p-8 rounded-3xl space-y-3 relative overflow-hidden">
            <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Our Vision</span>
            </div>
            <h4 className="text-xl font-serif font-bold text-[#FAF5EB]">
              A Trusted Wellness Food Movement
            </h4>
            <p className="text-sm text-[#D7E3DA] leading-relaxed">
              To build a trusted wellness-inspired food brand that brings together traditional goodness, 
              delightful taste, and mindful nutrition—making everyday nourishment a meaningful part of a 
              healthier, more balanced life.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#FAF5EB] to-[#F1E5D2] border border-[#E2D4BC] p-8 rounded-3xl space-y-3 text-[#2D261E]">
            <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Target className="w-4 h-4 text-amber-700" />
              <span>Our Mission</span>
            </div>
            <h4 className="text-xl font-serif font-bold text-[#27211A]">
              Thoughtful Nourishment for Families
            </h4>
            <p className="text-sm text-[#5C4D3D] leading-relaxed">
              To offer thoughtfully prepared homemade laddus that celebrate flavour and traditional food practices, 
              while inspiring individuals and families to explore nutritious snack choices and develop healthier eating habits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
