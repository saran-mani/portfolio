import { useState } from "react";
import {
  BarChart3,
  RefreshCw,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
  Layers,
  Menu,
  X,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const channels = [
  {
    name: "Shopify",
    description: "Sync products, variants, and stock automatically.",
    logo: "https://cdn.simpleicons.org/shopify/96BF48",
    bg: "bg-green-500/10",
  },
  {
    name: "WooCommerce",
    description: "Real-time WordPress inventory synchronization.",
    logo: "https://cdn.simpleicons.org/woocommerce/7F54B3",
    bg: "bg-purple-500/10",
  },
  {
    name: "Amazon",
    description: "FBA and merchant-fulfilled inventory tracking.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/1280px-Amazon_icon.svg.png",
    bg: "bg-orange-500/10",
  },
  {
    name: "BigCommerce",
    description: "Enterprise-grade connection for large catalogs.",
    logo: "https://cdn.simpleicons.org/bigcommerce/121118",
    bg: "bg-blue-500/10",
  },
  {
    name: "eBay",
    description: "Prevent overselling across auction listings.",
    logo: "https://cdn.simpleicons.org/ebay/E53238",
    bg: "bg-red-500/10",
  },
  {
    name: "Square POS",
    description: "Connect physical store registers to online stock.",
    logo: "https://cdn.simpleicons.org/square/3E4348",
    bg: "bg-sky-500/10",
  },
];

const features = [
  {
    icon: RefreshCw,
    color: "text-sky-500",
    bg: "bg-sky-500/10",
    title: "Real-Time Sync",
    description:
      "Every sale on any channel instantly updates stock across all platforms. No delays, no manual updates.",
  },
  {
    icon: BarChart3,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    title: "Unified Dashboard",
    description:
      "One place to manage products, orders, inventory, and sync rules across every sales channel.",
  },
  {
    icon: Shield,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    title: "Oversell Protection",
    description:
      "Smart buffer rules and conflict resolution stop you from selling stock you don't have.",
  },
  {
    icon: Layers,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    title: "Product Matching",
    description:
      "Map your master catalog to channel-specific SKUs so everything stays in sync automatically.",
  },
  {
    icon: Zap,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    title: "Async Job Processing",
    description:
      "Powered by BullMQ for reliable background sync jobs that handle large catalogs without breaking a sweat.",
  },
  {
    icon: BarChart3,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    title: "Audit Trails",
    description:
      "Full sync history and activity logs so you always know what changed, when, and why.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Connect your channels",
    description:
      "Link Shopify, WooCommerce, Amazon, Etsy and more via OAuth in seconds.",
  },
  {
    step: "02",
    title: "Match your products",
    description:
      "Map your master catalog to each platform's SKUs using our product matching engine.",
  },
  {
    step: "03",
    title: "Set your sync rules",
    description:
      "Define buffer quantities, conflict resolution, and sync frequency per channel.",
  },
  {
    step: "04",
    title: "Sell without limits",
    description:
      "Every order auto-updates inventory across all connected channels in real time.",
  },
];

const stats = [
  { value: "10+", label: "Sales channels supported" },
  { value: "<1s", label: "Average sync latency" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "0", label: "Oversells guaranteed" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function VendpilotLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased overflow-x-hidden">
      {/* ── Navbar ── */}
      <header className="fixed top-0 z-50 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-white">
              <Layers className="h-4 w-4" />
            </div>
            <span className="font-bold text-xl tracking-tight">Vendpilot</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["Features", "Integrations", "How it works"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </nav>

          {/* CTA */}
          {/* <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
              Sign In
            </button>
            <button className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition-colors">
              Get Started Free
            </button>
          </div> */}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-100 bg-white px-6 py-4 flex flex-col gap-4">
            {["Features", "Integrations", "How it works"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              )
            )}
            <button className="mt-2 w-full rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
              Get Started Free
            </button>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-16 text-center max-w-screen-xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold text-sky-700 mb-8">
          <Zap className="h-3 w-3" />
          Real-time multi-channel inventory sync
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            Sync Your Inventory
          </span>
          <br />
          Everywhere, Instantly
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-neutral-500 mb-10 leading-relaxed">
          The complete platform for e-commerce and retail sellers to
          effortlessly synchronize inventory across all sales channels in real
          time. Stop overselling. Start scaling.
        </p>

        {/* <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <button className="flex items-center gap-2 rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 transition-colors shadow-lg shadow-sky-200">
            Start for free
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
            See how it works
          </button>
        </div> */}

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl border-t border-neutral-100 pt-12">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-neutral-900">
                {value}
              </span>
              <span className="mt-1 text-xs text-neutral-500 text-center">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section
        id="features"
        className="py-24 bg-neutral-50"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Everything you need to sell everywhere
            </h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              Vendpilot handles the complexity of multi-channel commerce so you
              can focus on growing your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-neutral-200/80 bg-white p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${f.bg}`}
                >
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Up and running in minutes
            </h2>
            <p className="text-lg text-neutral-500 max-w-xl mx-auto">
              Four simple steps to get your entire inventory in sync.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative flex flex-col">
                {/* connector line */}
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(100%-1rem)] w-full h-px bg-gradient-to-r from-neutral-200 to-transparent z-0" />
                )}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-sky-50 border-2 border-sky-200 text-sky-600 font-extrabold text-sm mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-base mb-2">{step.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <section id="integrations" className="py-24 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Integrate with everything you sell on
            </h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              Bring all your sales channels into one unified dashboard. Whether
              you sell on marketplaces, your own site, or in-store — Vendpilot
              syncs it all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((ch) => (
              <div
                key={ch.name}
                className="rounded-xl border border-neutral-200/80 bg-white p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${ch.bg}`}
                >
                  <img src={ch.logo} alt={ch.name} className="w-6 h-6 object-contain" />
                </div>
                <h3 className="text-lg font-bold mb-2">{ch.name}</h3>
                <p className="text-neutral-500 text-sm">{ch.description}</p>
              </div>
            ))}
          </div>

          {/* More integrations coming soon */}
          <p className="mt-10 text-center text-sm text-neutral-400">
            More integrations coming soon — Etsy, Walmart, TikTok Shop, and more.
          </p>
        </div>
      </section>

      {/* ── Pricing teaser ── */}
      {/* <section id="pricing" className="py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-neutral-500 max-w-xl mx-auto">
              Start free and scale as your business grows. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$0",
                period: "Free forever",
                highlight: false,
                perks: [
                  "2 sales channels",
                  "Up to 500 SKUs",
                  "Manual sync",
                  "Email support",
                ],
              },
              {
                name: "Growth",
                price: "$49",
                period: "per month",
                highlight: true,
                perks: [
                  "Unlimited channels",
                  "Up to 10 000 SKUs",
                  "Real-time auto sync",
                  "Sync rules & buffers",
                  "Priority support",
                ],
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "contact us",
                highlight: false,
                perks: [
                  "Unlimited everything",
                  "Dedicated infrastructure",
                  "Custom integrations",
                  "SLA guarantee",
                  "Dedicated CSM",
                ],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 flex flex-col ${
                  plan.highlight
                    ? "border-sky-500 bg-sky-600 text-white shadow-xl shadow-sky-200"
                    : "border-neutral-200 bg-white"
                }`}
              >
                <div className="mb-6">
                  <p
                    className={`text-sm font-semibold mb-1 ${plan.highlight ? "text-sky-200" : "text-neutral-500"}`}
                  >
                    {plan.name}
                  </p>
                  <p
                    className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-neutral-900"}`}
                  >
                    {plan.price}
                  </p>
                  <p
                    className={`text-sm mt-1 ${plan.highlight ? "text-sky-200" : "text-neutral-400"}`}
                  >
                    {plan.period}
                  </p>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-sm">
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 ${plan.highlight ? "text-sky-200" : "text-emerald-500"}`}
                      />
                      <span
                        className={
                          plan.highlight ? "text-sky-50" : "text-neutral-700"
                        }
                      >
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                    plan.highlight
                      ? "bg-white text-sky-600 hover:bg-sky-50"
                      : "bg-sky-600 text-white hover:bg-sky-700"
                  }`}
                >
                  {plan.name === "Enterprise" ? "Contact sales" : "Get started"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── CTA Banner ── */}
      {/* <section className="py-20 bg-gradient-to-r from-sky-500 to-blue-600">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to stop overselling?
          </h2>
          <p className="text-sky-100 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of sellers who trust Vendpilot to keep their
            inventory in sync across every channel, every second.
          </p>
          <button className="rounded-lg bg-white px-8 py-3 text-sm font-bold text-sky-600 hover:bg-sky-50 transition-colors shadow-lg">
            Start syncing for free
          </button>
        </div>
      </section> */}

      {/* ── Footer ── */}
      <footer className="py-10 border-t border-neutral-100 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-600 text-white">
              <Layers className="h-3.5 w-3.5" />
            </div>
            <span className="font-bold text-base">Vendpilot</span>
          </div>
          <p className="text-sm text-neutral-400">
            © 2026 Vendpilot Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Status"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
