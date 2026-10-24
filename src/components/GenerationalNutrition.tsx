"use client";

import React, { useState } from "react";
import { Baby, Activity, HeartHandshake, Dumbbell, Sparkles, UserCheck } from "lucide-react";
import { LadduProduct } from "@/types";

interface GenerationalNutritionProps {
  products: LadduProduct[];
  onSelectProduct: (product: LadduProduct) => void;
}

export default function GenerationalNutrition({ products, onSelectProduct }: GenerationalNutritionProps) {
  const [activeTab, setActiveTab] = useState<"children" | "young-adults" | "women" | "men" | "older-adults">("children");

  const generations = {
    children: {
      id: "children",
      title: "For Children",
      tagline: "Growing with Good Nutrition",
      icon: Baby,
      badgeColor: "bg-emerald-100 text-emerald-800",
      borderColor: "border-emerald-200",
      message: "Make nutritious snacking enjoyable for growing minds and bodies.",
      insights: [
        "Can provide energy for play, learning, and everyday activities.",
        "Nuts and seeds can contribute fats, some protein, and minerals that support a balanced diet.",
        "Fibre-containing ingredients may help support normal digestion.",
        "Can help introduce children to traditional foods and a wider variety of snack choices.",
        "Offers families an opportunity to build enjoyable, healthier snacking routines."
      ],
      recommendedIds: ["kas-dryfruit-almond-date", "kas-millet-jowar-cardamom"]
    },
    "young-adults": {
      id: "young-adults",
      title: "For Young Adults",
      tagline: "Energy & Everyday Living",
      icon: Activity,
      badgeColor: "bg-amber-100 text-amber-800",
      borderColor: "border-amber-200",
      message: "Nourish your ambitions with thoughtful everyday choices.",
      insights: [
        "Can provide convenient energy between meals.",
        "Nuts can contribute unsaturated fats and some protein.",
        "May help broaden snack choices beyond highly processed options.",
        "Can complement a balanced eating pattern alongside vegetables, fruits, whole grains, and protein-rich foods.",
        "Supports a mindful approach to food as part of an overall healthy lifestyle."
      ],
      recommendedIds: ["kas-dryfruit-pista-walnut", "kas-specialty-seven-seed"]
    },
    women: {
      id: "women",
      title: "For Women",
      tagline: "Thoughtful Nourishment at Every Stage of Life",
      icon: HeartHandshake,
      badgeColor: "bg-rose-100 text-rose-800",
      borderColor: "border-rose-200",
      message: "Celebrate well-being with thoughtful nourishment at every stage of life.",
      insights: [
        "Nuts and seeds can contribute unsaturated fats and minerals.",
        "Some ingredients contribute iron or calcium, with amounts depending on the recipe.",
        "A suitable portion can provide convenient nourishment between meals.",
        "Can complement varied dietary needs across adulthood and different life stages.",
        "Pregnancy, breastfeeding, menstruation, and menopause may involve individual nutritional needs that require tailored advice."
      ],
      recommendedIds: ["kas-millet-ragi-gond", "kas-dryfruit-cashew-anjeer", "kas-specialty-seven-seed"]
    },
    men: {
      id: "men",
      title: "For Men",
      tagline: "Mindful Nutrition for an Active Lifestyle",
      icon: Dumbbell,
      badgeColor: "bg-blue-100 text-blue-800",
      borderColor: "border-blue-200",
      message: "Support an active lifestyle with mindful nutrition.",
      insights: [
        "Can provide energy for work and daily activities.",
        "Nuts contribute unsaturated fats and some protein.",
        "Nuts and seeds may provide minerals such as magnesium and zinc, depending on the ingredients.",
        "Can be part of a heart-conscious eating pattern when used in place of some less nutritious snack options.",
        "Works best alongside balanced meals, physical activity, adequate sleep, and hydration."
      ],
      recommendedIds: ["kas-dryfruit-almond-date", "kas-millet-bajra-til", "kas-specialty-seven-seed"]
    },
    "older-adults": {
      id: "older-adults",
      title: "For Older Adults",
      tagline: "Flavour, Care & Mindful Nourishment",
      icon: UserCheck,
      badgeColor: "bg-purple-100 text-purple-800",
      borderColor: "border-purple-200",
      message: "Celebrate every stage of life with flavour, care, and mindful nourishment.",
      insights: [
        "A small serving may provide energy and nutrients.",
        "Nuts can contribute unsaturated fats to a balanced diet.",
        "Fibre-containing ingredients may support normal bowel function.",
        "Can offer an enjoyable traditional snack when texture and ingredients suit individual needs.",
        "Portions and ingredients may need adjustment for dental difficulties, swallowing concerns, diabetes, allergies, or other dietary restrictions."
      ],
      recommendedIds: ["kas-specialty-besan-methi", "kas-dryfruit-cashew-anjeer", "kas-millet-ragi-gond"]
    }
  };

  const currentGen = generations[activeTab];
  const TabIcon = currentGen.icon;
  const recommendedProducts = products.filter((p) => currentGen.recommendedIds.includes(p.id));

  return (
    <section id="generational" className="py-20 bg-gradient-to-b from-[#FAF6EE] to-[#F5ECE0] border-b border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#1C3D2B] bg-emerald-100/80 px-3 py-1 rounded-full">
            <span>Holistic Life-Stage Nutrition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#27211A]">
            Nutrition for Every Generation
          </h2>
          <p className="text-[#655544] text-base leading-relaxed">
            “A Healthier Generation Begins with Better Choices.” Explore how thoughtfully crafted 
            dry fruits and millet laddus fit into the dietary rhythms of every life stage.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {(Object.keys(generations) as Array<keyof typeof generations>).map((key) => {
            const gen = generations[key];
            const Icon = gen.icon;
            const isSelected = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                  isSelected
                    ? "bg-[#1C3D2B] text-white shadow-md scale-102"
                    : "bg-white text-[#5C4D3D] border border-[#E5DBCA] hover:bg-[#F8F2E8]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-amber-300" : "text-[#8C7A65]"}`} />
                <span>{gen.title}</span>
              </button>
            );
          })}
        </div>

        {/* Generational Content Showcase */}
        <div className="bg-white/95 rounded-3xl p-6 sm:p-10 border border-[#E5DBC7] shadow-sm space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Detailed Insights */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF5EB] flex items-center justify-center text-[#1C3D2B]">
                  <TabIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${currentGen.badgeColor}`}>
                    {currentGen.tagline}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#27211A] mt-1">
                    {currentGen.title}
                  </h3>
                </div>
              </div>

              {/* Founder quote for this generation */}
              <div className="bg-[#FAF6EE] border-l-4 border-[#C28833] p-4 rounded-r-xl">
                <p className="text-sm font-serif italic text-[#3A3026]">
                  “{currentGen.message}”
                </p>
                <span className="text-[11px] font-semibold text-[#8C7A65] uppercase tracking-wider block mt-1">
                  — Dr. KAS’S Principle
                </span>
              </div>

              {/* Insights bullet points */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C6A53]">
                  Nutritional Value & Role in Everyday Living:
                </h4>
                <div className="space-y-2">
                  {currentGen.insights.map((insight, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#4A3E31]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C28833] mt-2 shrink-0"></span>
                      <span className="leading-relaxed">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Curated Laddu Recommendations for this cohort */}
            <div className="lg:col-span-5 bg-[#FAF6EE] rounded-2xl p-6 border border-[#E9DFC8] space-y-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h4 className="text-sm font-serif font-bold text-[#27211A] uppercase tracking-wider">
                  Recommended Laddus For This Stage
                </h4>
              </div>

              <div className="space-y-3">
                {recommendedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white rounded-xl p-3.5 border border-[#E8DEC7] hover:border-[#C28833] transition-all flex items-center justify-between group shadow-2xs"
                  >
                    <div className="pr-3">
                      <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        {prod.categoryLabel}
                      </span>
                      <h5 className="font-serif font-bold text-sm text-[#27211A] group-hover:text-[#C28833] transition-colors mt-1">
                        {prod.name}
                      </h5>
                      <p className="text-[11px] text-[#7C6A53] line-clamp-1">{prod.tagline}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-[#1C3D2B]">₹{prod.price}</div>
                      <button
                        onClick={() => onSelectProduct(prod)}
                        className="text-[11px] text-[#C28833] font-semibold hover:underline block mt-1"
                      >
                        View Info →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-[#7C6A53] italic bg-white/60 p-3 rounded-lg border border-[#EAE1CF]">
                💡 Laddus are best enjoyed as one mindful part of a varied, balanced diet. Adjust portions
                to your personal nutritional needs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
