import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Navigation data for the site
export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/discord", label: "Discord" },
  { href: "/changelog", label: "Changelog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/store", label: "Store" },
  { href: "/submit-skins", label: "Submit Skins" },
  { href: "/contact", label: "Contact" },
];

// Navigation cards data
export const navigationCards = [
  {
    href: "/",
    title: "Home",
    description: "Return to main page",
    icon: "fas fa-home",
    borderColor: "border-green-500",
    hoverColor: "hover:border-green-400",
    iconColor: "text-green-500"
  },
  {
    href: "/discord",
    title: "Discord",
    description: "Join our community",
    icon: "fab fa-discord",
    borderColor: "border-blue-500",
    hoverColor: "hover:border-blue-400",
    iconColor: "text-blue-500"
  },
  {
    href: "/changelog",
    title: "Changelog",
    description: "View server updates",
    icon: "fas fa-history",
    borderColor: "border-orange-500",
    hoverColor: "hover:border-orange-400",
    iconColor: "text-orange-500"
  },
  {
    href: "/gallery",
    title: "Gallery",
    description: "View server images",
    icon: "fas fa-images",
    borderColor: "border-purple-500",
    hoverColor: "hover:border-purple-400",
    iconColor: "text-purple-500"
  },
  {
    href: "/store",
    title: "Store",
    description: "Visit our store",
    icon: "fas fa-shopping-cart",
    borderColor: "border-yellow-500",
    hoverColor: "hover:border-yellow-400",
    iconColor: "text-yellow-500"
  },
  {
    href: "/submit-skins",
    title: "Submit Skins",
    description: "Request skins for the server",
    icon: "fas fa-tshirt",
    borderColor: "border-green-500",
    hoverColor: "hover:border-green-400",
    iconColor: "text-green-500"
  },
  {
    href: "/contact",
    title: "Contact Us",
    description: "Get in touch",
    icon: "fas fa-envelope",
    borderColor: "border-blue-500",
    hoverColor: "hover:border-blue-400",
    iconColor: "text-blue-500"
  }
];

// Server features data
export const serverFeatures = [
  {
    icon: "fas fa-bolt",
    title: "Fast Gathering",
    description: "Enjoy increased resource gathering rates for a more streamlined gameplay experience."
  },
  {
    icon: "fas fa-user-shield",
    title: "Active Admins",
    description: "Our server is supported by a team of dedicated admins to ensure fair play and address issues promptly."
  },
  {
    icon: "fas fa-gift",
    title: "Regular Events",
    description: "Participate in exciting server events with unique challenges and valuable rewards."
  },
  {
    icon: "fas fa-coins",
    title: "Economy System",
    description: "Engage with our balanced economy system featuring shops, trading, and currency."
  },
  {
    icon: "fas fa-users",
    title: "Friendly Community",
    description: "Join our welcoming community of players who value teamwork and fair play."
  },
  {
    icon: "fas fa-server",
    title: "High Performance",
    description: "Experience smooth gameplay with our high-performance servers and minimal downtime."
  }
];

// Server stats data
export const serverStats = [
  {
    icon: "fas fa-users",
    value: "124/200",
    label: "Active Players"
  },
  {
    icon: "fas fa-clock",
    value: "99.8%",
    label: "Server Uptime"
  },
  {
    icon: "fas fa-map-marker-alt",
    value: "4500",
    label: "Map Size"
  },
  {
    icon: "fas fa-calendar-alt",
    value: "Thursday",
    label: "Wipe Day"
  }
];

// Latest updates/changelog data
export const latestUpdates = [
  {
    title: "May Wipe Update",
    date: "May 15, 2023",
    description: "We're excited to announce the latest update to our Rust server including new plugins, balance changes, and quality-of-life improvements.",
    changes: [
      "Added new custom monuments to the map",
      "Balanced gathering rates for wood and stone",
      "Implemented new event system with better rewards"
    ],
    link: "/changelog/may-update"
  },
  {
    title: "Economy System Revamp",
    date: "April 30, 2023",
    description: "We've completely revamped our server economy system to provide a more balanced and engaging experience for all players.",
    changes: [
      "New shop interfaces with better categorization",
      "Adjusted prices for common resources and items",
      "Introduced new currency system with anti-inflation measures"
    ],
    link: "/changelog/economy-revamp"
  }
];

// Gallery images data (placeholder paths)
export const galleryImages = [
  {
    id: "image1",
    title: "Rust Monument",
    thumbnail: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    fullImage: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "image2",
    title: "Base Building",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    fullImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "image3",
    title: "PVP Action",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    fullImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "image4",
    title: "Raid Defense",
    thumbnail: "https://images.unsplash.com/photo-1564049489314-60d154ff107d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    fullImage: "https://images.unsplash.com/photo-1564049489314-60d154ff107d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  }
];
