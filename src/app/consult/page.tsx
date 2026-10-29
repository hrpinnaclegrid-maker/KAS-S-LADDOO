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
  MessageCircle,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { ConsultationBooking } from "@/types";
import { Container, Section, SectionHeader, Button, Input, Textarea, Card, Badge } from "@/components/ui";

const topics = [
  {
    id: "Nutritional Psychology & Emotional Snacking Habits",
    title: "Nutritional Psychology & Stress Snacking",
    desc: "Address emotional cravings, mid-afternoon energy crashes, and mindful eating habits.",
  },
  {
    id: "Family & Child Healthy Snacking Routine",
    title: "Family & Child Snacking Routine",
    desc: "Gently transition children and teens from ultra-processed packaged snacks to wholesome Indian foods.",
  },
  {
    id: "Women's Life-Stage Nourishment (Postnatal / Hormonal)",
    title: "Women's Life-Stage Nourishment",
    desc: "Tailored nutritional advice for fertility, postpartum strength, bone density, and hormonal care.",
  },
  {
    id: "Men's Vitality, Energy & Workout Nutrition",
    title: "Men's Metabolic Vitality & Active Living",
    desc: "Natural whole food fueling for endurance sports, desk stamina, and muscle recovery.",
  },
  {
    id: "Older Adults Gentle Digestion & Traditional Nutrition",
    title: "Senior Digestive Care & Nutrition",
    desc: "Gentle textures, herbal spice pairing, and comforting traditional digestion support.",
  },
] as const;

const timeSlots = [
  "Morning (10:00 AM - 12:00 PM IST)",
  "Afternoon (02:00 PM - 04:00 PM IST)",
  "Evening (05:00 PM - 07:00 PM IST)",
] as const;

export default function ConsultPage() {
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    topic: "Nutritional Psychology & Emotional Snacking Habits",
    preferredDate: "",
    preferredTime: "Morning (10:00 AM - 12:00 PM IST)",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<ConsultationBooking | null>(null);

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
        body: JSON.stringify(formData),
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

  const handleReset = () => {
    setConfirmedBooking(null);
    setFormData({
      clientName: "",
      phone: "",
      email: "",
      topic: topics[0].id,
      preferredDate: "",
      preferredTime: timeSlots[0],
      notes: "",
    });
  };

  return (
    <div className="py-10 sm:py-16 space-y-12">
      <Container size="lg">
        {/* Banner */}
        <SectionHeader
          label="1-on-1 Guidance"
          icon={<HeartHandshake className="w-5 h-5 text-gold-600" />}
          title="Book Nutritional Consultation"
          description="Schedule a personalized session with <strong>Dr. Khan Afroz Shams</strong> to explore your relationship with food, overcome stress snacking, and create nourishing family habits."
          align="center"
        />

        {confirmedBooking ? (
          /* Confirmation Success State */
          <Card variant="elevated" padding="xl" className="text-center space-y-6 animate-fade-in-up">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
            </div>

            <div className="space-y-1">
              <Badge variant="success" size="md">
                Appointment Request Confirmed
              </Badge>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ink-dark">
                Thank You, {confirmedBooking.clientName}!
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto">
                Dr. Shams's team will review your requested slot and message you on WhatsApp to confirm connection details.
              </p>
            </div>

            <Card variant="outlined" padding="md" className="max-w-md mx-auto text-left text-xs space-y-2.5">
              <div className="flex justify-between border-b border-border-light pb-2">
                <span className="text-ink-muted font-semibold">Reference ID:</span>
                <span className="font-mono font-bold text-ink-dark">{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted font-semibold">Date & Time:</span>
                <span className="font-semibold text-ink-dark">
                  {confirmedBooking.preferredDate} ({confirmedBooking.preferredTime})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted font-semibold">Focus Area:</span>
                <span className="font-semibold text-ink-dark truncate max-w-[220px]">
                  {confirmedBooking.topic}
                </span>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link href="/shop">
                <Button size="lg" fullWidth>
                  Explore The Laddu Collection
                </Button>
              </Link>
              <Button variant="outline" size="md" fullWidth onClick={handleReset}>
                Book Another Session
              </Button>
            </div>
          </Card>
        ) : (
          /* Interactive Booking Form */
          <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-xs flex items-center gap-2 animate-fade-in" role="alert">
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            {/* Step 1: Topic Selection */}
            <Card variant="outlined" padding="lg" className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center text-xs font-bold">1</span>
                <span className="text-xs font-bold uppercase tracking-wider text-forest-700">Select Consultation Focus Area</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topics.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, topic: t.id })}
                    className={`text-left p-4 rounded-xl border transition-all text-xs ${
                      formData.topic === t.id
                        ? "border-gold-500 bg-amber-50/70 shadow-sm"
                        : "border-border-light bg-cream hover:bg-cream-warm"
                    }`}
                  >
                    <div className="font-serif font-bold text-sm text-ink-dark">{t.title}</div>
                    <div className="text-[11px] text-ink-muted mt-1 leading-relaxed">{t.desc}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Step 2: Date & Slot */}
            <Card variant="outlined" padding="lg" className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center text-xs font-bold">2</span>
                <span className="text-xs font-bold uppercase tracking-wider text-forest-700">Preferred Schedule</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Select Preferred Date *"
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  leftIcon={<Calendar className="w-4 h-4" />}
                />
                <div>
                  <label className="label">Preferred Time Slot</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="input appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3E%3Cpath stroke=%27%23655544%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3E%3C/svg%27%3E')] bg-right-3 bg-center bg-no-repeat pr-10"
                  >
                    {timeSlots.map((s, idx) => (
                      <option key={idx} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Step 3: Contact Details */}
            <Card variant="outlined" padding="lg" className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center text-xs font-bold">3</span>
                <span className="text-xs font-bold uppercase tracking-wider text-forest-700">Your Contact Information</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name *"
                  required
                  placeholder="e.g. Shalini Roy"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  leftIcon={<User className="w-4 h-4" />}
                />
                <Input
                  label="WhatsApp Phone Number *"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  leftIcon={<Phone className="w-4 h-4" />}
                />
              </div>

              <Input
                label="Email Address (Optional)"
                type="email"
                placeholder="shalini@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                leftIcon={<Mail className="w-4 h-4" />}
              />

              <Textarea
                label="Share any questions or dietary patterns you want Dr. Shams to review (Optional)"
                placeholder="e.g. I experience 4 PM sweet cravings during work sprints, looking for realistic habit swaps..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </Card>

            {/* Submit Button */}
            <div className="pt-4 border-t border-border-light flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>Strictly Confidential Consultation</span>
              </div>

              <Button
                type="submit"
                size="lg"
                isLoading={loading}
                leftIcon={loading ? null : <Calendar className="w-4 h-4 text-gold-300" />}
                fullWidth={true}
              >
                {loading ? "Booking Session..." : "Schedule Appointment"}
              </Button>
            </div>
          </form>
        )}

        {/* Consultation FAQ */}
        <Card variant="outlined" padding="lg" className="space-y-4">
          <h3 className="font-serif font-bold text-base text-ink-dark flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-gold-600" aria-hidden="true" />
            <span>What to Expect From Your Session</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 leading-relaxed text-xs text-ink-muted">
            <div>
              <strong className="text-ink-dark block mb-1">Empathetic, Guilt-Free Dialogue:</strong>
              We do not count rigid calories or prescribe unsustainable deprivations. We examine routines, work rhythms, and emotional triggers.
            </div>
            <div>
              <strong className="text-ink-dark block mb-1">Tailored Whole Food Swaps:</strong>
              Receive actionable, practical recommendations incorporating millets, seeds, and dry fruits into your family's weekly menu.
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}