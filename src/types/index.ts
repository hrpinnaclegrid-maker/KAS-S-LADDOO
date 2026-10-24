export type ProductCategory = "dry-fruits" | "millets" | "specialty" | "gift-boxes" | "seasonal";

export type TargetAudience = "children" | "young-adults" | "women" | "men" | "older-adults" | "all";

export interface NutritionInfo {
  servingSize: string; // e.g. "1 Laddu (35g)"
  caloriesApprox: number;
  proteinG: number;
  carbsG: number;
  healthyFatsG: number;
  dietaryFiberG: number;
  sugarG: number; // natural sugar from dates/figs/jaggery
  sweetenerType: string; // e.g. "Medjool Dates & Fig (Zero Added Sugar)", "Desi Khand", "Organic Jaggery"
}

export interface LadduProduct {
  id: string;
  name: string;
  hindiName?: string;
  category: ProductCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  ingredients: string[];
  keyBenefits: string[];
  targetAudience: TargetAudience[];
  nutrition: NutritionInfo;
  price: number; // in INR
  weight: string; // e.g. "400g (approx 10-12 laddus)"
  badges: string[];
  inStock: boolean;
  featured: boolean;
  chakraTheme?: {
    chakraName: string;
    chakraMeaning: string;
    accentColor: string;
  };
  storageInstructions: string;
  allergenWarning: string;
  image?: string;
  gallery?: string[];
}

export interface CartItem {
  product: LadduProduct;
  quantity: number;
}

export type OrderStatus = "Received" | "Preparing" | "Dispatched" | "Delivered" | "Cancelled";

export interface CustomerOrder {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: "cod" | "upi";
  orderNotes?: string;
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
  createdAt: string;
}

export type ConsultationStatus = "Pending Review" | "Confirmed" | "Completed" | "Rescheduled";

export interface ConsultationBooking {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  topic: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status: ConsultationStatus;
  createdAt: string;
}

export interface DatabaseSchema {
  products: LadduProduct[];
  orders: CustomerOrder[];
  consultations: ConsultationBooking[];
}
