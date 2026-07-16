import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  FileText,
  Settings,
  Coins,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

// Order and set match the UI/UX Product Specification, section 7
// (Dashboard, Calendar, Studios, Earnings, Invoices, Settings).
export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Studios", href: "/studios", icon: Building2 },
  { label: "Earnings", href: "/earnings", icon: Coins },
  { label: "Invoices", href: "/invoices", icon: FileText },
  { label: "Settings", href: "/settings", icon: Settings },
];
