import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bath,
  Bed,
  Briefcase,
  Building,
  ChevronDown,
  Facebook,
  Heart,
  Home,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Square,
  Truck,
  Twitter,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useFeaturedProperties } from "./hooks/useQueries";

// ─── Types ────────────────────────────────────────────────────────────────────
type NavItem = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Buy",
    href: "/buy",
    dropdown: [
      { label: "Single Family Homes", href: "/buy/single-family" },
      { label: "Condos & Townhomes", href: "/buy/condos" },
      { label: "Luxury Properties", href: "/buy/luxury" },
      { label: "New Construction", href: "/buy/new-construction" },
    ],
  },
  {
    label: "Sell",
    href: "/sell",
    dropdown: [
      { label: "Free Home Valuation", href: "/sell/valuation" },
      { label: "Seller's Guide", href: "/sell/guide" },
      { label: "List Your Property", href: "/sell/list" },
    ],
  },
  {
    label: "Rent",
    href: "/rent",
    dropdown: [
      { label: "Apartments", href: "/rent/apartments" },
      { label: "Houses for Rent", href: "/rent/houses" },
      { label: "Short Term Rentals", href: "/rent/short-term" },
    ],
  },
  { label: "Agents", href: "/agents" },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Property Management", href: "/services/management" },
      { label: "Commercial Real Estate", href: "/services/commercial" },
      { label: "Relocation Support", href: "/services/relocation" },
      { label: "Home Financing", href: "/services/financing" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { Icon: Facebook, href: "/social/facebook", label: "Facebook" },
  { Icon: Instagram, href: "/social/instagram", label: "Instagram" },
  { Icon: Twitter, href: "/social/twitter", label: "Twitter" },
  { Icon: Linkedin, href: "/social/linkedin", label: "LinkedIn" },
];

const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Buy a Home", href: "/buy" },
  { label: "Sell Your Home", href: "/sell" },
  { label: "Rental Properties", href: "/rent" },
  { label: "Our Agents", href: "/agents" },
  { label: "Blog & News", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

const SAMPLE_LISTINGS = [
  {
    id: 1,
    title: "Modern Hilltop Retreat",
    price: 1250000,
    address: "482 Crestview Drive, Beverly Hills, CA 90210",
    beds: 5,
    baths: 4,
    sqft: 3850,
    image: "/assets/generated/listing-1.dim_600x400.jpg",
    badge: "Featured",
  },
  {
    id: 2,
    title: "Classic Colonial Estate",
    price: 875000,
    address: "1104 Oak Park Lane, Greenwich, CT 06830",
    beds: 4,
    baths: 3,
    sqft: 3100,
    image: "/assets/generated/listing-2.dim_600x400.jpg",
    badge: "New Listing",
  },
  {
    id: 3,
    title: "Downtown Luxury Penthouse",
    price: 2100000,
    address: "800 Lake Shore Dr, Unit 45A, Chicago, IL 60611",
    beds: 3,
    baths: 3,
    sqft: 2600,
    image: "/assets/generated/listing-3.dim_600x400.jpg",
    badge: "Hot Deal",
  },
  {
    id: 4,
    title: "Waterfront Villa Paradise",
    price: 3450000,
    address: "219 Bayshore Blvd, Miami Beach, FL 33139",
    beds: 6,
    baths: 5,
    sqft: 5200,
    image: "/assets/generated/listing-4.dim_600x400.jpg",
    badge: "Exclusive",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatPrice(price: bigint | number) {
  const num = typeof price === "bigint" ? Number(price) : price;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function NavDropdown({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="nav-dropdown-panel absolute top-full left-1/2 -translate-x-1/2 pt-3 hidden z-50">
      <div className="bg-white rounded-xl shadow-nav border border-border/30 py-2 min-w-[200px]">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="block px-5 py-2.5 text-sm text-foreground hover:bg-background hover:text-[#C5A264] font-body transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0F2A3A] shadow-nav"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5" data-ocid="nav.link">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "#C5A264" }}
          >
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-heading font-bold text-lg leading-none tracking-wide">
              PREMIER
            </div>
            <div className="text-[#C5A264] font-body font-semibold text-[10px] tracking-[0.2em] leading-none mt-0.5">
              HOMES
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative nav-dropdown group"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={item.href}
                className="flex items-center gap-1 px-3.5 py-2 text-white/90 hover:text-[#C5A264] text-sm font-body font-medium tracking-wide transition-colors"
                data-ocid="nav.link"
              >
                {item.label}
                {item.dropdown && (
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                )}
              </a>
              {item.dropdown && activeDropdown === item.label && (
                <NavDropdown items={item.dropdown} />
              )}
            </div>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Button
            className="hidden lg:flex text-xs font-body font-semibold tracking-[0.12em] uppercase px-5 py-2.5 rounded-full border-0"
            style={{ background: "#C5A264", color: "white" }}
            data-ocid="nav.primary_button"
          >
            Get In Touch
          </Button>
          <button
            type="button"
            className="lg:hidden text-white p-1.5"
            onClick={() => setMobileOpen((v) => !v)}
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-[#0F2A3A] border-t border-white/10"
          >
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  className="flex items-center justify-between px-6 py-4 text-white/90 hover:text-[#C5A264] font-body text-sm border-b border-white/5 transition-colors"
                  data-ocid="nav.link"
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </a>
              </div>
            ))}
            <div className="px-6 py-4">
              <Button
                className="w-full font-body font-semibold tracking-widest uppercase text-sm rounded-full"
                style={{ background: "#C5A264", color: "white" }}
                data-ocid="nav.primary_button"
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col"
      style={{
        background:
          "url('/assets/generated/hero-home.dim_1600x900.jpg') center/cover no-repeat",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(15,42,58,0.82) 0%, rgba(15,42,58,0.55) 60%, rgba(15,42,58,0.30) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative flex-1 flex items-center max-w-[1200px] mx-auto w-full px-6 pt-28 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[620px]"
        >
          <p className="text-[#C5A264] font-body text-sm font-semibold tracking-[0.25em] uppercase mb-5">
            Welcome to Premier Homes
          </p>
          <h1 className="font-heading font-extrabold text-[56px] md:text-[64px] leading-[1.05] uppercase mb-6">
            <span className="block text-white">Find Your</span>
            <span className="block" style={{ color: "#C5A264" }}>
              Dream Home
            </span>
          </h1>
          <p className="text-white/75 font-body text-lg leading-relaxed mb-8 max-w-[480px]">
            Discover exceptional properties tailored to your lifestyle. From
            luxury estates to urban retreats — your perfect home awaits.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              className="font-body font-semibold uppercase tracking-wider text-sm px-7 py-3 rounded-full h-auto"
              style={{ background: "#C5A264", color: "white" }}
              data-ocid="hero.primary_button"
            >
              Explore Listings
            </Button>
            <Button
              variant="outline"
              className="font-body font-semibold uppercase tracking-wider text-sm px-7 py-3 rounded-full h-auto border-white/50 text-white hover:bg-white/10 bg-transparent"
              data-ocid="hero.secondary_button"
            >
              Free Valuation
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Floating Search Bar */}
      <div className="relative z-10 pb-0">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-search p-5 md:p-6 translate-y-1/2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
              <div className="lg:col-span-2">
                <label
                  htmlFor="search-location"
                  className="block text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1.5"
                >
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="search-location"
                    placeholder="City, ZIP, or neighborhood"
                    className="pl-9 font-body border-border/60 h-11"
                    data-ocid="search.input"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="search-type"
                  className="block text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1.5"
                >
                  Property Type
                </label>
                <Select>
                  <SelectTrigger
                    id="search-type"
                    className="h-11 font-body border-border/60"
                    data-ocid="search.select"
                  >
                    <SelectValue placeholder="Any Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhome">Townhome</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="search-price"
                  className="block text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1.5"
                >
                  Price Range
                </label>
                <Select>
                  <SelectTrigger
                    id="search-price"
                    className="h-11 font-body border-border/60"
                    data-ocid="search.select"
                  >
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-500k">Under $500K</SelectItem>
                    <SelectItem value="500k-1m">$500K – $1M</SelectItem>
                    <SelectItem value="1m-2m">$1M – $2M</SelectItem>
                    <SelectItem value="2m-plus">$2M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col justify-end">
                <Button
                  className="w-full h-11 font-body font-semibold uppercase tracking-wider text-sm rounded-lg"
                  style={{ background: "#C5A264", color: "white" }}
                  data-ocid="search.submit_button"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Featured Listings ────────────────────────────────────────────────────────
function ListingCard({
  listing,
  index,
}: {
  listing: (typeof SAMPLE_LISTINGS)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-xl shadow-card overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
      data-ocid={`listings.item.${index + 1}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div
          className="absolute top-3 left-3 text-xs font-body font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
          style={{ background: "#C5A264", color: "white" }}
        >
          {listing.badge}
        </div>
        <button
          type="button"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm transition-colors"
          aria-label="Save listing"
        >
          <Heart className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="p-5">
        <div
          className="font-heading font-bold text-xl mb-1"
          style={{ color: "#C5A264" }}
        >
          {formatPrice(listing.price)}
        </div>
        <h3 className="font-heading font-semibold text-foreground text-base mb-1">
          {listing.title}
        </h3>
        <p className="text-muted-foreground font-body text-sm mb-4 flex items-start gap-1">
          <MapPin
            className="w-3.5 h-3.5 mt-0.5 shrink-0"
            style={{ color: "#C5A264" }}
          />
          {listing.address}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground font-body mb-4 border-t border-border pt-4">
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4" /> {listing.beds} Beds
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4" /> {listing.baths} Baths
          </span>
          <span className="flex items-center gap-1">
            <Square className="w-4 h-4" /> {listing.sqft.toLocaleString()} sqft
          </span>
        </div>
        <Button
          className="w-full font-body font-semibold text-sm uppercase tracking-wider h-10 rounded-lg"
          style={{ background: "#C5A264", color: "white" }}
          data-ocid="listings.button"
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
}

function FeaturedListings() {
  const { data: backendListings, isLoading } = useFeaturedProperties();

  const listings =
    backendListings && backendListings.length > 0
      ? backendListings.slice(0, 4).map((p, i) => ({
          id: Number(p.id),
          title: p.title,
          price: Number(p.price),
          address: p.address,
          beds: Number(p.beds),
          baths: Number(p.baths),
          sqft: Number(p.sqft),
          image: SAMPLE_LISTINGS[i % SAMPLE_LISTINGS.length].image,
          badge: "Featured",
        }))
      : SAMPLE_LISTINGS;

  return (
    <section className="pt-36 pb-20" style={{ background: "#F3F5F7" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p
            className="text-sm font-body font-semibold uppercase tracking-[0.25em] mb-3"
            style={{ color: "#C5A264" }}
          >
            Hand-Picked Properties
          </p>
          <h2 className="font-heading font-bold text-[32px] md:text-[40px] text-foreground">
            Featured Listings
          </h2>
        </motion.div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            data-ocid="listings.loading_state"
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-card rounded-xl h-[380px] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            data-ocid="listings.list"
          >
            {listings.map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} index={i} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Button
            variant="outline"
            className="font-body font-semibold uppercase tracking-wider text-sm px-8 py-3 h-auto rounded-full border-2"
            style={{ borderColor: "#C5A264", color: "#C5A264" }}
            data-ocid="listings.secondary_button"
          >
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: Home,
    title: "Residential Sales",
    desc: "Expert guidance through every step of buying or selling your home. We negotiate hard so you get the best possible outcome.",
  },
  {
    icon: Building,
    title: "Property Management",
    desc: "Full-service management for rental properties — from tenant screening to maintenance coordination and financial reporting.",
  },
  {
    icon: Briefcase,
    title: "Commercial Real Estate",
    desc: "Office spaces, retail locations, industrial sites — we identify commercial opportunities aligned with your business goals.",
  },
  {
    icon: Truck,
    title: "Relocation Support",
    desc: "Seamless relocation services for individuals and families. We handle the details so your move feels effortless.",
  },
];

function OurServices() {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p
            className="text-sm font-body font-semibold uppercase tracking-[0.25em] mb-3"
            style={{ color: "#C5A264" }}
          >
            What We Offer
          </p>
          <h2 className="font-heading font-bold text-[32px] md:text-[40px] text-foreground">
            Our Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-xl hover:shadow-card transition-shadow duration-300 group"
              data-ocid={`services.item.${i + 1}`}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-105 transition-transform"
                style={{ background: "rgba(197,162,100,0.12)" }}
              >
                <service.icon
                  className="w-7 h-7"
                  style={{ color: "#C5A264" }}
                />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats Banner ─────────────────────────────────────────────────────────────
const STATS = [
  { value: "1,200+", label: "Properties Sold" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Expert Agents" },
];

function StatsBanner() {
  return (
    <section className="py-16" style={{ background: "#0F2A3A" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="font-heading font-extrabold text-4xl mb-2"
                style={{ color: "#C5A264" }}
              >
                {stat.value}
              </div>
              <div className="text-white/70 font-body text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#1F1F1F" }}>
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "#C5A264" }}
              >
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-heading font-bold text-lg leading-none">
                  PREMIER
                </div>
                <div
                  className="font-body font-semibold text-[10px] tracking-[0.2em] leading-none mt-0.5"
                  style={{ color: "#C5A264" }}
                >
                  HOMES
                </div>
              </div>
            </div>
            <p className="text-white/60 font-body text-sm leading-relaxed mb-5">
              Your trusted partner in finding the perfect property. We bring
              expertise, integrity, and results to every transaction.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-heading font-semibold text-base mb-5">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: "#C5A264" }}
                />
                <span className="text-white/60 font-body text-sm">
                  1280 Sunset Boulevard, Suite 400
                  <br />
                  Los Angeles, CA 90028
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone
                  className="w-4 h-4 shrink-0"
                  style={{ color: "#C5A264" }}
                />
                <span className="text-white/60 font-body text-sm">
                  (310) 555-0192
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail
                  className="w-4 h-4 shrink-0"
                  style={{ color: "#C5A264" }}
                />
                <span className="text-white/60 font-body text-sm">
                  hello@premierhomes.com
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-semibold text-base mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#C5A264] font-body text-sm transition-colors flex items-center gap-2"
                    data-ocid="footer.link"
                  >
                    <span
                      className="w-1 h-1 rounded-full inline-block"
                      style={{ background: "#C5A264" }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-heading font-semibold text-base mb-5">
              Newsletter
            </h4>
            <p className="text-white/60 font-body text-sm mb-4 leading-relaxed">
              Stay updated with the latest listings, market trends, and real
              estate tips.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="font-body text-sm bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10 focus:border-[#C5A264]"
                data-ocid="newsletter.input"
              />
              <Button
                className="h-10 px-4 font-body font-semibold text-sm shrink-0 rounded-lg"
                style={{ background: "#C5A264", color: "white" }}
                data-ocid="newsletter.submit_button"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 font-body text-sm">
            © {new Date().getFullYear()} Premier Homes. All rights reserved.
          </p>
          <p className="text-white/40 font-body text-sm">
            Built with{" "}
            <Heart className="w-3.5 h-3.5 inline text-[#C5A264] mx-0.5" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              className="hover:text-[#C5A264] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <main>
        <Hero />
        <FeaturedListings />
        <OurServices />
        <StatsBanner />
      </main>
      <Footer />
    </div>
  );
}
