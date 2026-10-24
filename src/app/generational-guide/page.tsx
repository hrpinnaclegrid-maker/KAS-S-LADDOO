"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Baby,
  Activity,
  HeartHandshake,
  Dumbbell,
  UserCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShoppingBag
} from "lucide-react";
import { initialProducts } from "@/data/initialData";
import { useCart } from "@/context/CartContext";

export default function GenerationalGuidePage() {
  const { addToCart } = useCart();
  const [activeStage, setActiveStage] = useState<"children" | "young-adults" | "women" | "men" | "older-adults">("children");

  const stages = {
    children: {
      title: "For Children: Growing with Good Nutrition",
      subtitle: "Energy for Play, Learning & Everyday Activities",
      icon: Baby,
      color: "border-emerald-300 bg-emerald-50 text-emerald-900",
      quote: "Make nutritious snacking enjoyable for growing minds and bodies.",
      insights: [
        { label: "Energy for Play & Learning", text: "Can provide energy for play, learning, and everyday activities." },
        { label: "Nuts & Seeds Nutrition", text: "Nuts and seeds can contribute fats, some protein, and minerals that support a balanced diet." },
        { label: "Fibre & Digestion", text: "Fibre-containing ingredients may help support normal digestion." },
        { label: "Introducing Traditional Foods", text: "Can help introduce children to traditional foods and a wider variety of snack choices." },
        { label: "Healthier Snacking Routines", text: "Offers families an opportunity to build enjoyable, healthier snacking routines." }
      ],
      recommendedIds: ["kas-dryfruit-almond-date", "kas-millet-jowar-cardamom"]
    },
    "young-adults": {
      title: "For Young Adults: Energy & Active Living",
      subtitle: "Convenient Fuel for College, Work & Everyday Life",
      icon: Activity,
      color: "border-amber-300 bg-amber-50 text-amber-900",
      quote: "Nourish your ambitions with thoughtful everyday choices.",
      insights: [
        { label: "Convenient Energy", text: "Can provide convenient energy between meals." },
        { label: "Nuts & Healthy Fats", text: "Nuts can contribute unsaturated fats and some protein." },
        { label: "Broadening Snack Choices", text: "May help broaden snack choices beyond highly processed options." },
        { label: "Balanced Eating Pattern", text: "Can complement a balanced eating pattern alongside vegetables, fruits, whole grains, and protein-rich foods." },
        { label: "Mindful Approach to Food", text: "Supports a mindful approach to food as part of an overall healthy lifestyle." }
      ],
      recommendedIds: ["kas-dryfruit-pista-walnut", "kas-specialty-seven-seed"]
    },
    women: {
      title: "For Women: Nourishment Across Life Stages",
      subtitle: "Thoughtful Nourishment at Every Stage of Life",
      icon: HeartHandshake,
      color: "border-rose-300 bg-rose-50 text-rose-900",
      quote: "Celebrate well-being with thoughtful nourishment at every stage of life.",
      insights: [
        { label: "Unsaturated Fats & Minerals", text: "Nuts and seeds can contribute unsaturated fats and minerals." },
        { label: "Iron & Calcium", text: "Some ingredients contribute iron or calcium, with amounts depending on the recipe." },
        { label: "Convenient Nourishment", text: "A suitable portion can provide convenient nourishment between meals." },
        { label: "Varied Dietary Needs", text: "Can complement varied dietary needs across adulthood and different life stages." },
        { label: "Individual Nutritional Needs", text: "Pregnancy, breastfeeding, menstruation, and menopause may involve individual nutritional needs that require tailored advice." }
      ],
      recommendedIds: ["kas-millet-ragi-gond", "kas-dryfruit-cashew-anjeer", "kas-specialty-seven-seed"]
    },
    men: {
      title: "For Men: Everyday Vitality & Stamina",
      subtitle: "Mindful Nutrition for an Active Lifestyle",
      icon: Dumbbell,
      color: "border-blue-300 bg-blue-50 text-blue-900",
      quote: "Support an active lifestyle with mindful nutrition.",
      insights: [
        { label: "Energy for Work & Activities", text: "Can provide energy for work and daily activities." },
        { label: "Unsaturated Fats & Protein", text: "Nuts contribute unsaturated fats and some protein." },
        { label: "Minerals from Nuts & Seeds", text: "Nuts and seeds may provide minerals such as magnesium and zinc, depending on the ingredients." },
        { label: "Heart-Conscious Eating", text: "Can be part of a heart-conscious eating pattern when used in place of some less nutritious snack options." },
        { label: "Part of a Balanced Lifestyle", text: "Works best alongside balanced meals, physical activity, adequate sleep, and hydration." }
      ],
      recommendedIds: ["kas-dryfruit-almond-date", "kas-millet-bajra-til", "kas-specialty-seven-seed"]
    },
    "older-adults": {
      title: "For Older Adults: Nourishment & Gentle Comfort",
      subtitle: "Flavour, Care & Mindful Nourishment",
      icon: UserCheck,
      color: "border-purple-300 bg-purple-50 text-purple-900",
      quote: "Celebrate every stage of life with flavour, care, and mindful nourishment.",
      insights: [
        { label: "Energy & Nutrients", text: "A small serving may provide energy and nutrients." },
        { label: "Unsaturated Fats", text: "Nuts can contribute unsaturated fats to a balanced diet." },
        { label: "Fibre & Bowel Function", text: "Fibre-containing ingredients may support normal bowel function." },
        { label: "Enjoyable Traditional Snack", text: "Can offer an enjoyable traditional snack when texture and ingredients suit individual needs." },
        { label: "Individual Adjustments", text: "Portions and ingredients may need adjustment for dental difficulties, swallowing concerns, diabetes, allergies, or other dietary restrictions." }
      ],
      recommendedIds: ["kas-specialty-besan-methi", "kas-dryfruit-cashew-anjeer", "kas-millet-ragi-gond"]
    }
  };

  const current = stages[activeStage];
  const StageIcon = current.icon;
  const recommendedLaddus = initialProducts.filter((p) => current.recommendedIds.includes(p.id));

  return (
    <div className="py-10 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generational Wellness Guide</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#27211A] leading-tight">
            Nutrition for Every Generation
          </h1>
          <p className="text-sm sm:text-base text-[#6B5A47]">
            “A Healthier Generation Begins with Better Choices.” Explore tailored nutritional roles 
            for each life phase, from growing kids to active adults and cherished seniors.
          </p>
        </div>

        {/* Life Stage Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {(Object.keys(stages) as Array<keyof typeof stages>).map((key) => {
            const st = stages[key];
            const Icon = st.icon;
            const isSelected = activeStage === key;

            return (
              <button
                key={key}
                onClick={() => setActiveStage(key)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? "bg-[#1C3D2B] text-white shadow-md scale-102"
                    : "bg-white text-[#5C4D3D] border border-[#E8DEC9] hover:bg-[#FAF6EE]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-amber-300" : "text-[#7C6A53]"}`} />
                <span>{st.title.split(":")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Spotlight Showcase */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC9] shadow-sm space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Generational Insights */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF5EB] flex items-center justify-center text-[#1C3D2B]">
                  <StageIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#B45309] block uppercase tracking-wider">
                    {current.subtitle}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#27211A] mt-0.5">
                    {current.title}
                  </h2>
                </div>
              </div>

              {/* Founder quote */}
              <div className="bg-[#FAF6EE] border-l-4 border-[#B45309] p-4 rounded-r-xl">
                <p className="text-sm font-serif italic text-[#3A3026]">
                  “{current.quote}”
                </p>
                <span className="text-[11px] font-semibold text-[#8C7A65] uppercase tracking-wider block mt-1">
                  — Dr. KAS’S Principle
                </span>
              </div>

              {/* Insights Grid */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7C6A53] block">
                  Nutritional Synergy & Daily Role:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {current.insights.map((item, idx) => (
                    <div key={idx} className="bg-[#FAF6EE] p-3.5 rounded-2xl border border-[#E8DFC9] space-y-1">
                      <h4 className="font-serif font-bold text-xs text-[#1C3D2B] flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B45309]"></span>
                        <span>{item.label}</span>
                      </h4>
                      <p className="text-xs text-[#5C4D3D] leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Matched Laddus for this stage */}
            <div className="lg:col-span-5 bg-[#FAF6EE] p-6 rounded-3xl border border-[#E8DEC7] space-y-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h3 className="font-serif font-bold text-base text-[#27211A]">
                  Recommended Recipes For This Life Stage
                </h3>
              </div>

              <div className="space-y-3">
                {recommendedLaddus.map((laddu) => (
                  <div
                    key={laddu.id}
                    className="bg-white p-4 rounded-2xl border border-[#E8DEC7] hover:border-[#B45309] transition-all space-y-3 shadow-2xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="pr-2">
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                          {laddu.categoryLabel}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-[#27211A] mt-1">{laddu.name}</h4>
                        <p className="text-[11px] text-[#7C6A53] line-clamp-1">{laddu.tagline}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-serif font-bold text-sm text-[#B45309]">₹{laddu.price}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#EFE8D8]">
                      <Link
                        href={`/shop/${laddu.id}`}
                        className="text-xs font-semibold text-[#1C3D2B] hover:text-[#B45309]"
                      >
                        Nutrition Details →
                      </Link>

                      <button
                        onClick={() => addToCart(laddu)}
                        className="flex items-center space-x-1 bg-[#B45309] hover:bg-[#92400E] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/80 p-3.5 rounded-xl border border-[#E8DEC7] text-[11px] text-[#7C6A53] italic">
                💡 Portions and ingredients may be tailored for individual needs, pregnancy, or specific medical dietary restrictions.
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="text-center pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-[#B45309] hover:bg-[#92400E] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all"
          >
            <span>Explore All Laddu Varieties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
