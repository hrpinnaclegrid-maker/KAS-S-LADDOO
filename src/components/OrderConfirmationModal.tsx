"use client";

import React from "react";
import { CheckCircle2, Truck, Copy, X } from "lucide-react";
import { CustomerOrder } from "@/types";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

interface OrderConfirmationModalProps {
  order: CustomerOrder | null;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
}

export default function OrderConfirmationModal({
  order,
  onClose,
  onTrackOrder
}: OrderConfirmationModalProps) {
  if (!order) return null;

  const [copied, setCopied] = React.useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Namaste Dr. KAS’S Team! 🙏 I just placed Order #${order.id} for ₹${order.totalAmount}.
Name: ${order.customerName}
Delivery Address: ${order.address}, ${order.city} - ${order.pincode}
Looking forward to my fresh homemade laddus! ✨`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FCFAF6] rounded-3xl max-w-lg w-full border border-[#E5DAC6] shadow-2xl overflow-hidden relative my-8 text-center p-6 sm:p-8 space-y-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg hover:bg-[#EFE5D3] text-[#5C4D3D] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">
            Order Successfully Placed
          </span>
          <h3 className="font-serif font-bold text-2xl text-[#27211A]">
            Thank You, {order.customerName}!
          </h3>
          <p className="text-xs text-[#6B5A47] max-w-sm mx-auto">
            Our kitchen has received your order. We prepare fresh batches with pure desi cow ghee and mindfulness.
          </p>
        </div>

        {/* Order ID Box */}
        <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#E8DEC7] flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] text-[#7C6A53] uppercase font-bold tracking-wider">
              Your Tracking Order ID
            </span>
            <div className="font-mono font-bold text-lg text-[#1C3D2B]">{order.id}</div>
          </div>
          <button
            onClick={handleCopyId}
            className="flex items-center space-x-1 text-xs font-semibold bg-white border border-[#DACFBB] px-3 py-1.5 rounded-lg text-[#5C4D3D] hover:text-[#27211A] transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>

        {/* Order Details Brief */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8DEC7] text-left text-xs space-y-2">
          <div className="font-semibold text-[#27211A] border-b border-[#EFE8D8] pb-1.5">
            Items ({order.items.length}):
          </div>
          <div className="space-y-1 text-[#5C4D3D]">
            {order.items.map((it, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{it.productName} × {it.quantity}</span>
                <span className="font-medium text-[#27211A]">₹{it.price * it.quantity}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-2 border-t border-[#EFE8D8] font-bold text-sm text-[#27211A]">
            <span>Total Payable:</span>
            <span className="text-[#B45309]">₹{order.totalAmount}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-2">
          {/* WhatsApp Direct Connect */}
          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-2.5 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:translate-y-0 hover:-translate-y-0.5"
            style={{
              backgroundColor: "#25D366",
              color: "#FFFFFF",
              boxShadow: "0 4px 14px rgba(37, 211, 102, 0.35)",
            }}
          >
            <WhatsAppIcon className="w-5 h-5 fill-white text-white shrink-0" />
            <span style={{ color: "#FFFFFF" }}>Notify Kitchen on WhatsApp</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onTrackOrder(order.id);
            }}
            className="w-full flex items-center justify-center space-x-2 bg-[#1C3D2B] hover:bg-[#132A1E] text-white py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all"
          >
            <Truck className="w-4 h-4 text-amber-300" />
            <span>Track Order Status</span>
          </button>
        </div>
      </div>
    </div>
  );
}
