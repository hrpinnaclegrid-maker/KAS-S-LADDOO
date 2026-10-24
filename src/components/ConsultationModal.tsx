"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, HeartHandshake, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { ConsultationBooking } from "@/types";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    topic: "Nutritional Psychology & Mindful Snacking Habits",
    preferredDate: "",
    preferredTime: "Morning (10:00 AM - 12:00 PM)",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<ConsultationBooking | null>(null);

  if (!isOpen) return null;

  const topics = [
    "Nutritional Psychology & Mindful Snacking Habits",
    "Family & Child Healthy Snacking Routine",
    "Women's Life-Stage Nourishment (Postnatal / Hormonal)",
    "Men's Vitality, Energy & Workout Nutrition",
    "Older Adults Gentle Digestion & Traditional Nutrition"
  ];

  const timeSlots = [
    "Morning (10:00 AM - 12:00 PM)",
    "Afternoon (02:00 PM - 04:00 PM)",
    "Evening (05:00 PM - 07:00 PM)"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.clientName.trim() || !formData.phone.trim() || !formData.preferredDate) {
      setError("Please fill in your name, contact phone number, and preferred date.");
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
        throw new Error(data.error || "Failed to book consultation.");
      }

      setBookingConfirmed(data.consultation);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setBookingConfirmed(null);
    setFormData({
      clientName: "",
      phone: "",
      email: "",
      topic: topics[0],
      preferredDate: "",
      preferredTime: timeSlots[0],
      notes: ""
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FCFAF6] rounded-3xl max-w-xl w-full border border-[#E5DAC6] shadow-2xl overflow-hidden relative my-8">
        {/* Header */}
        <div className="bg-[#FAF5EB] p-6 border-b border-[#E8DEC8] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HeartHandshake className="w-5 h-5 text-[#1C3D2B]" />
            <div>
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest block">
                1-on-1 Guidance
              </span>
              <h3 className="font-serif font-bold text-xl text-[#27211A]">
                Book Nutritional Consultation
              </h3>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg hover:bg-[#EFE5D3] text-[#5C4D3D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {bookingConfirmed ? (
          /* Confirmation View */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">
                Consultation Request Logged
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#27211A]">
                We Look Forward To Connecting!
              </h3>
              <p className="text-xs text-[#6B5A47] max-w-md mx-auto">
                Your request has been received by Dr. Khan Afroz Shams. Our team will reach out to confirm your scheduled slot.
              </p>
            </div>

            <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#E8DEC7] text-left text-xs space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between border-b border-[#EFE8D8] pb-1.5">
                <span className="text-[#7C6A53]">Reference ID:</span>
                <span className="font-mono font-bold text-[#1C3D2B]">{bookingConfirmed.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7C6A53]">Client:</span>
                <span className="font-semibold text-[#27211A]">{bookingConfirmed.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7C6A53]">Date & Time:</span>
                <span className="font-semibold text-[#27211A]">
                  {bookingConfirmed.preferredDate} ({bookingConfirmed.preferredTime})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7C6A53]">Topic:</span>
                <span className="font-semibold text-[#27211A] truncate max-w-[200px]">
                  {bookingConfirmed.topic}
                </span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="bg-[#1C3D2B] text-white px-8 py-3 rounded-xl font-semibold text-xs sm:text-sm hover:bg-[#132A1E] transition-all"
            >
              Done & Return to Store
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="bg-[#FAF6EE] p-3 rounded-xl border border-[#E8DFC9] text-xs text-[#5C4D3D]">
              👩‍⚕️ <strong>Consultation with Dr. Khan Afroz Shams:</strong> An integrative session on mindful food choices, emotional relationship with eating, and sustainable family snacking habits.
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anjali Verma"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#C28833]/40 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                  Phone (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98111 22334"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#C28833]/40 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="anjali@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#C28833]/40 outline-none"
              />
            </div>

            {/* Topic Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                Consultation Topic Focus *
              </label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#C28833]/40 outline-none text-[#2D261E]"
              >
                {topics.map((t, idx) => (
                  <option key={idx} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#C28833]/40 outline-none text-[#2D261E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#C28833]/40 outline-none text-[#2D261E]"
                >
                  {timeSlots.map((ts, idx) => (
                    <option key={idx} value={ts}>
                      {ts}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Health Goals / Notes */}
            <div>
              <label className="block text-xs font-semibold text-[#4A3E31] mb-1">
                What would you like to discuss with Dr. Shams? (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Share any dietary challenges, stress eating habits, or goals..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#E5DAC6] rounded-xl focus:ring-2 focus:ring-[#C28833]/40 outline-none resize-none"
              />
            </div>

            {/* Action */}
            <div className="pt-3 border-t border-[#E8DEC8] flex items-center justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 bg-gradient-to-r from-[#1C3D2B] to-[#122B1E] hover:from-[#163324] hover:to-[#0D1F15] text-white px-7 py-3 rounded-xl font-semibold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 text-amber-300" />
                    <span>Request Appointment</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
