"use client";

import React from "react";
import { Star, ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function CustomerReviews() {
  const reviews = [
    {
      name: "Dr. Ananya Sen",
      location: "Bengaluru",
      rating: 5,
      product: "Royal Almond & Medjool Date Laddu",
      comment:
        "As a pediatrician and working mother, getting my 8-year-old to eat healthy snacks was an uphill battle. Dr. KAS’s almond date laddus are a game-changer! Completely replaced processed biscuits at 4 PM.",
      verified: true
    },
    {
      name: "Rohan & Shalini Varma",
      location: "Gurugram",
      rating: 5,
      product: "Signature Chakra Harmony Gift Box",
      comment:
        "Ordered 15 gift boxes for Diwali and family celebrations. The packaging is pure luxury, and the taste is nostalgic yet refined. You can taste the genuine desi cow ghee and fresh nuts in every bite.",
      verified: true
    },
    {
      name: "Meenakshi Iyer",
      location: "Chennai",
      rating: 5,
      product: "Sprouted Ragi & Babool Gond Strength Laddu",
      comment:
        "Postpartum recovery required good joint and bone care. The combination of sprouted ragi and babool gond is deeply strengthening, not overwhelmingly heavy, and gave me sustained energy during nursing.",
      verified: true
    },
    {
      name: "Captain Devendra Kapoor",
      location: "Mumbai",
      rating: 5,
      product: "Kashmiri Walnut & Pistachio Brain Vitality",
      comment:
        "Clean, guilt-free cognitive energy before long commercial flights. Knowing Dr. Shams's background in aviation operations gives so much reassurance in the food safety and precision of these recipes.",
      verified: true
    }
  ];

  return (
    <section className="py-16 bg-[#FCFAF6] border-b border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#B45309] bg-amber-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Love & Experiences</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#27211A]">
            Loved by Mindful Families Across India
          </h3>
          <p className="text-xs sm:text-sm text-[#6B5A47]">
            Real feedback from parents, professionals, and wellness enthusiasts enjoying mindful nourishment daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-[#E8DEC9] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Stars */}
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-[#4A3E31] leading-relaxed italic">
                  “{rev.comment}”
                </p>
              </div>

              <div className="pt-3 border-t border-[#EFE8D8] space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-[#27211A]">{rev.name}</h4>
                  <span className="text-[10px] text-[#8C7A65]">{rev.location}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#7C6A53]">
                  <span className="truncate max-w-[150px]">{rev.product}</span>
                  <span className="text-emerald-700 font-semibold flex items-center space-x-0.5">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
