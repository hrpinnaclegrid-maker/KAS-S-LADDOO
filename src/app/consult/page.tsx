"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Loader2,
  HelpCircle,
  MessageCircle
} from "lucide-react";
import { ConsultationBooking } from "@/types";

export default function ConsultPage() {
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    topic: "Nutritional Psychology & Emotional Snacking Habits",
    preferredDate: "",
    preferredTime: "Morning (10:00 AM - 12:00 PM)",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<ConsultationBooking | null>(null);

  const topics = [
    {
      id: "Nutritional Psychology & Emotional Snacking Habits",
      title: "Nutritional Psychology & Stress Snacking",
      desc: "Address emotional cravings, mid-afternoon energy crashes, and mindful eating habits."
    },
    {
      id: "Family & Child Healthy Snacking Routine",
      title: "Family & Child Snacking Routine",
      desc: "Gently transition children and teens from ultra-processed packaged snacks to wholesome Indian foods."
    },
    {
      id: "Women's Life-Stage Nourishment (Postnatal / Hormonal)",
      title: "Women’s Life-Stage Nourishment",
      desc: "Tailored nutritional advice for fertility, postpartum strength, bone density, and hormonal care."
    },
    {
      id: "Men's Vitality, Energy & Workout Nutrition",
      title: "Men’s Metabolic Vitality & Active Living",
      desc: "Natural whole food fueling for endurance sports, desk stamina, and muscle recovery."
    },
    {
      id: "Older Adults Gentle Digestion & Traditional Nutrition",
      title: "Senior Digestive Care & Nutrition",
      desc: "Gentle textures, herbal spice pairing, and comforting traditional digestion support."
    }
  ];

  const timeSlots = [
    "Morning (10:00 AM - 12:00 PM IST)",
    "Afternoon (02:00 PM - 04:00 PM IST)",
    "Evening (05:00 PM - 07:00 PM IST)"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.clientName.trim() || !formData.phone.trim() || !formData.preferredDate) {
      setError("Please fill in your name, contact phone number, and preferred appointment date.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to schedule consultation.");
      }

      setConfirmedBooking(data.consultation);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 sm:py-16 space-y-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#B45309] bg-amber-100 px-3 py-1 rounded-full">
            <HeartHandshake className="w-3.5 h-3.5 text-[#B45309]" />
            <span>1-on-1 Guidance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#27211A] leading-tight">
            Book Nutritional Consultation
          </h1>
          <p className="text-sm sm:text-base text-[#6B5A47] max-w-2xl mx-auto">
            Schedule a personalized session with <strong>Dr. Khan Afroz Shams</strong> to explore your relationship 
            with food, overcome stress snacking, and create nourishing family habits.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation Success State */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DEC9] shadow-xl text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">
                Appointment Request Confirmed
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#27211A]">
                Thank You, {confirmedBooking.clientName}!
              </h2>
              <p className="text-xs sm:text-sm text-[#6B5A47] max-w-md mx-auto">
                Dr. Shams’s team will review your requested slot and message you on WhatsApp to confirm connection details.
              </p>
            </div>

            <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#E8DEC7] text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between border-b border-[#EFE8D8] pb-2">
                <span className="text-[#7C6A53] font-semibold">Reference ID:</span>
                <span className="font-mono font-bold text-[#1C3D2B]">{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7C6A53] font-semibold">Date & Time:</span>
                <span className="font-semibold text-[#27211A]">
                  {confirmedBooking.preferredDate} ({confirmedBooking.preferredTime})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7C6A53] font-semibold">Focus Area:</span>
                <span className="font-semibold text-[#27211A] truncate max-w-[220px]">
                  {confirmedBooking.topic}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto bg-[#B45309] hover:bg-[#92400E] text-white px-8 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                Explore The Laddu Collection
              </Link>
              <button
                onClick={() => setConfirmedBooking(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#DACFBB] text-[#4A3E31] text-xs font-semibold hover:bg-[#FAF6EE]"
              >
                Book Another Session
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Booking Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC9] shadow-sm space-y-8"
          >
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Step 1: Topic Selection */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1C3D2B] block">
                1. Select Consultation Focus Area
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topics.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, topic: t.id })}
                    className={`text-left p-4 rounded-2xl border transition-all text-xs ${
                      formData.topic === t.id
                        ? "border-[#B45309] bg-amber-50/70 shadow-sm"
                        : "border-[#E8DEC9] bg-[#FCFAF6] hover:bg-[#FAF6EE]"
                    }`}
                  >
                    <div className="font-serif font-bold text-sm text-[#27211A]">{t.title}</div>
                    <div className="text-[11px] text-[#6B5A47] mt-1 leading-relaxed">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Slot */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1C3D2B] block">
                2. Preferred Schedule
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                    Select Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#B45309]/30 outline-none text-[#2D261E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#B45309]/30 outline-none text-[#2D261E]"
                  >
                    {timeSlots.map((s, idx) => (
                      <option key={idx} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Contact Details */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1C3D2B] block">
                3. Your Contact Information
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shalini Roy"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#B45309]/30 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#B45309]/30 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="shalini@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#B45309]/30 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                  Share any questions or dietary patterns you want Dr. Shams to review (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. I experience 4 PM sweet cravings during work sprints, looking for realistic habit swaps..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FAF6EE] border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#B45309]/30 outline-none resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#EFE8D8] flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs text-[#7C6A53]">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Strictly Confidential Consultation</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 bg-gradient-to-r from-[#B45309] to-[#92400E] hover:from-[#92400E] hover:to-[#78350F] text-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Booking Session...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 text-amber-300" />
                    <span>Schedule Appointment</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Consultation FAQ */}
        <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-8 border border-[#E5DAC6] space-y-4 text-xs text-[#5C4D3D]">
          <h3 className="font-serif font-bold text-base text-[#27211A] flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-[#B45309]" />
            <span>What to Expect From Your Session</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 leading-relaxed">
            <div>
              <strong className="text-[#27211A] block mb-1">Empathetic, Guilt-Free Dialogue:</strong>
              We do not count rigid calories or prescribe unsustainable deprivations. We examine routines, work rhythms, and emotional triggers.
            </div>
            <div>
              <strong className="text-[#27211A] block mb-1">Tailored Whole Food Swaps:</strong>
              Receive actionable, practical recommendations incorporating millets, seeds, and dry fruits into your family's weekly menu.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
