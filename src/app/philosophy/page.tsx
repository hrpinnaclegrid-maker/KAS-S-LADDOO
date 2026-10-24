"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Brain,
  Heart,
  Sparkles,
  CheckCircle2,
  Compass,
  Target,
  ArrowRight,
  Sun,
  ShieldCheck,
  Coffee,
  Activity
} from "lucide-react";
import InteractiveChakraWheel from "@/components/InteractiveChakraWheel";

export default function PhilosophyPage() {
  const [selectedPillar, setSelectedPillar] = useState<"mind" | "body" | "soul">("mind");

  const pillars = {
    mind: {
      title: "The Mind: Food, Emotions & Daily Habits",
      subtitle: "Food Choices, Emotions & Behaviour",
      icon: Brain,
      color: "bg-amber-100 text-amber-900 border-amber-300",
      description:
        "Understanding the relationship between food choices, emotions, behaviour, and daily routines. At Dr. KAS’S, we shift the conversation away from guilt and restriction. We encourage a warm, mindful approach to snacking that honours the daily rhythms of life and the choices that make us feel well.",
      actionTips: [
        "Pause for 3 breaths before reaching for your afternoon snack.",
        "Savor textures slowly — chew the nuts and notice natural date sweetness.",
        "Replace frantic sugar crashes with sustained, slow-release whole food fats.",
        "Build a guilt-free, loving relationship with traditional heritage foods."
      ]
    },
    body: {
      title: "The Body: Balanced Nourishment",
      subtitle: "Nutrition, Movement & Self-Care",
      icon: Heart,
      color: "bg-emerald-100 text-emerald-900 border-emerald-300",
      description:
        "Valuing balanced nutrition, movement, rest, and self-care as parts of physical well-being. Our recipes bring together traditional ingredients—dry fruits, nuts, millets, and seeds—that contribute energy, fibre, and a range of nutrients as part of a balanced diet.",
      actionTips: [
        "Sprouted millets offer gentle, high-calcium bone nourishment.",
        "Desi cow ghee provides short-chain fatty acids that support nutrient absorption.",
        "Whole seeds deliver trace zinc, magnesium, and essential fatty acids.",
        "Natural dates and sun-dried figs ensure stable energy without blood sugar spikes."
      ]
    },
    soul: {
      title: "The Soul: Mindfulness & Inner Harmony",
      subtitle: "Mindfulness, Symbolism & Intentional Living",
      icon: Sparkles,
      color: "bg-indigo-100 text-indigo-900 border-indigo-300",
      description:
        "Drawing inspiration from mindfulness, inner harmony, and the traditional symbolism of chakra balance. We invite people to see mindful food choices as one possible part of a balanced lifestyle. We do not claim that laddus alone heal medical conditions or activate chakras.",
      actionTips: [
        "Approach every bite with sensory gratitude and intentional presence.",
        "Honor your body’s unique stage of life without comparison.",
        "Embrace traditional food practices passed down lovingly across generations.",
        "Celebrate mindful snacking as an intentional act of self-care."
      ]
    }
  };

  const comparison = [
    {
      aspect: "Sweetness Source",
      packaged: "Refined white sugar, high-fructose corn syrup, artificial sweeteners",
      drkas: "100% Arabian dates, Turkish figs, organic jaggery, zero refined sugar"
    },
    {
      aspect: "Cooking Medium",
      packaged: "Palm oil, hydrogenated fats, vanaspati, chemical emulsifiers",
      drkas: "Slow-roasted exclusively in pure Desi Cow Ghee & cold-pressed oils"
    },
    {
      aspect: "Nutritional Value",
      packaged: "Empty calories, refined wheat flour (maida), blood sugar spikes",
      drkas: "High dietary fiber, natural plant protein, calcium, magnesium & Omega-3"
    },
    {
      aspect: "Preservatives",
      packaged: "Chemical shelf-life extenders, synthetic colors, artificial essences",
      drkas: "Zero chemical preservatives; fresh handcrafted small batches"
    },
    {
      aspect: "Mind-Body Effect",
      packaged: "Midday crash, guilt, sluggish digestion, cravings cycle",
      drkas: "Sustained vitality, digestive comfort, mindful satisfaction & inner harmony"
    }
  ];

  const currentPillar = pillars[selectedPillar];
  const PillarIcon = currentPillar.icon;

  return (
    <div className="py-10 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#B45309] bg-amber-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Holistic Philosophy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#27211A] leading-tight">
            Healing Mind, Body & Soul
          </h1>
          <p className="text-sm sm:text-base text-[#6B5A47] leading-relaxed">
            Nutritional psychology meets traditional Indian culinary wisdom. 
            Discover how every ingredient choice nurtures physical vitality and inner harmony.
          </p>
        </div>

        {/* The 3 Interactive Pillars */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC9] shadow-sm space-y-8">
          {/* Pillar Selector Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 border-b border-[#EFE8D8] pb-6">
            <button
              onClick={() => setSelectedPillar("mind")}
              className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl font-serif text-sm sm:text-base font-bold transition-all ${
                selectedPillar === "mind"
                  ? "bg-[#B45309] text-white shadow-md scale-102"
                  : "bg-[#FAF6EE] text-[#5C4D3D] hover:bg-[#F2E8D7]"
              }`}
            >
              <Brain className="w-5 h-5" />
              <span>1. The Mind (Food & Emotions)</span>
            </button>

            <button
              onClick={() => setSelectedPillar("body")}
              className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl font-serif text-sm sm:text-base font-bold transition-all ${
                selectedPillar === "body"
                  ? "bg-[#1C3D2B] text-white shadow-md scale-102"
                  : "bg-[#FAF6EE] text-[#5C4D3D] hover:bg-[#F2E8D7]"
              }`}
            >
              <Heart className="w-5 h-5" />
              <span>2. The Body (Balanced Nourishment)</span>
            </button>

            <button
              onClick={() => setSelectedPillar("soul")}
              className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl font-serif text-sm sm:text-base font-bold transition-all ${
                selectedPillar === "soul"
                  ? "bg-[#4338CA] text-white shadow-md scale-102"
                  : "bg-[#FAF6EE] text-[#5C4D3D] hover:bg-[#F2E8D7]"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span>3. The Soul (Mindfulness & Harmony)</span>
            </button>
          </div>

          {/* Active Pillar Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-[#7C6A53] uppercase tracking-wider block">
                {currentPillar.subtitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#27211A]">
                {currentPillar.title}
              </h2>
              <p className="text-sm text-[#4A3E31] leading-relaxed">
                {currentPillar.description}
              </p>

              <div className="pt-3 space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C3D2B] block">
                  Mindful Snacking Micro-Practices:
                </span>
                {currentPillar.actionTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#3D3328]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAF6EE] p-8 rounded-3xl border border-[#E8DEC7] text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white shadow flex items-center justify-center mx-auto text-[#1C3D2B]">
                <PillarIcon className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#27211A]">
                A Mindful Invitation
              </h4>
              <p className="text-xs text-[#5C4D3D] leading-relaxed">
                “Our approach is inspired by holistic wellness. We do not claim that laddus alone heal medical conditions or activate chakras. Rather, we invite people to see mindful food choices as one possible part of a balanced lifestyle.”
              </p>
              <span className="text-[11px] font-bold uppercase text-[#7C6A53] block pt-2 border-t border-[#E8DFC9]">
                — Dr. Khan Afroz Shams
              </span>
            </div>
          </div>
        </div>

        {/* Visual Comparison: Packaged Snacks vs Dr. KAS’S */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC9] shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] bg-amber-100 px-3 py-1 rounded-full">
              The Wholesome Difference
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#27211A]">
              Convenience Snacks vs. Dr. KAS’S Mindful Laddus
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5A47]">
              Why real, traditional ingredients make all the difference for your mind, energy, and digestion.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8DEC9] bg-[#FAF6EE]">
                  <th className="p-3.5 font-serif font-bold text-[#27211A]">Comparison Aspect</th>
                  <th className="p-3.5 text-[#8C7A65] font-semibold">Ultra-Processed Commercial Snacks</th>
                  <th className="p-3.5 font-bold text-[#1C3D2B] bg-emerald-50/60">Dr. KAS’S Homemade Laddus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8D8]">
                {comparison.map((c, i) => (
                  <tr key={i} className="hover:bg-[#FCFAF6] transition-colors">
                    <td className="p-3.5 font-semibold text-[#27211A] whitespace-nowrap">{c.aspect}</td>
                    <td className="p-3.5 text-[#6B5A47]">{c.packaged}</td>
                    <td className="p-3.5 font-medium text-[#1C3D2B] bg-emerald-50/30">{c.drkas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC9] shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] bg-amber-100 px-3 py-1 rounded-full">Our Vision</span>
              <h3 className="text-xl font-serif font-bold text-[#27211A]">A Trusted Wellness-Inspired Brand</h3>
              <p className="text-sm text-[#4A3E31] leading-relaxed">To build a trusted wellness-inspired food brand that brings together traditional goodness, delightful taste, and mindful nutrition—making everyday nourishment a meaningful part of a healthier, more balanced life.</p>
            </div>
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1C3D2B] bg-emerald-100 px-3 py-1 rounded-full">Our Mission</span>
              <h3 className="text-xl font-serif font-bold text-[#27211A]">Thoughtful Homemade Nourishment</h3>
              <p className="text-sm text-[#4A3E31] leading-relaxed">To offer thoughtfully prepared homemade laddus that celebrate flavour and traditional food practices, while inspiring individuals and families to explore nutritious snack choices and develop healthier eating habits.</p>
            </div>
          </div>
        </div>

        {/* 7-Chakra Interactive Component */}
        <InteractiveChakraWheel />

        {/* CTA to Consult or Shop */}
        <div className="bg-gradient-to-r from-[#1C3D2B] to-[#122B1E] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-[#2B573D]">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF5EB]">
            Ready to Experience Mindful Nourishment?
          </h3>
          <p className="text-xs sm:text-sm text-[#C8DBD0] max-w-xl mx-auto">
            Explore our doctor-curated collection of dry fruit and sprouted millet laddus, or book a personalized 
            nutritional psychology consultation with Dr. Shams.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-[#1C3D2B] font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow"
            >
              Browse The Laddu Collection
            </Link>
            <Link
              href="/consult"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl text-xs sm:text-sm border border-white/20 transition-all"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
