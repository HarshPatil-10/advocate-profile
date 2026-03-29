import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useMutation } from "@tanstack/react-query";
import {
  Award,
  Briefcase,
  Building2,
  ChevronRight,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Quote,
  Scale,
  Shield,
  Star,
  Target,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ── Nav links ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Practice Areas", href: "#practice-areas" },
  { label: "Success Stories", href: "#testimonials" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

const PRACTICE_AREAS = [
  {
    icon: Scale,
    title: "Criminal Law",
    desc: "Vigorous defense strategies tailored to protect your rights in every criminal proceeding, from arraignment to appeal.",
  },
  {
    icon: Building2,
    title: "Civil Litigation",
    desc: "Comprehensive civil dispute resolution with a track record of securing favorable outcomes for clients in complex matters.",
  },
  {
    icon: Users,
    title: "Family Law",
    desc: "Compassionate representation in divorce, custody, and family disputes — prioritizing your family's well-being.",
  },
  {
    icon: Briefcase,
    title: "Corporate Law",
    desc: "Strategic counsel for businesses navigating contracts, mergers, compliance, and commercial litigation.",
  },
];

const STATS = [
  { value: "25+", label: "Years Experience" },
  { value: "500+", label: "Cases Won" },
  { value: "$150M+", label: "Recovered" },
  { value: "98%", label: "Success Rate" },
];

const TESTIMONIALS = [
  {
    initials: "MR",
    name: "Margaret Reynolds",
    role: "Corporate Executive",
    text: "Ajay's counsel during our merger dispute was nothing short of extraordinary. His strategic acumen and composure under pressure secured a settlement that exceeded our expectations.",
  },
  {
    initials: "DK",
    name: "David Kim",
    role: "Small Business Owner",
    text: "Facing criminal charges was the most frightening experience of my life. Ajay fought tirelessly for my innocence and achieved a complete acquittal. I owe everything to him.",
  },
  {
    initials: "SP",
    name: "Sophia Patel",
    role: "Healthcare Professional",
    text: "The divorce process was overwhelming, but Ajay handled every detail with sensitivity and professionalism. He protected my interests and my children's future.",
  },
];

const INSIGHTS = [
  {
    category: "Criminal Law",
    date: "March 12, 2026",
    title: "Understanding Your Right to Silence: A Practical Guide",
    excerpt:
      "The Fifth Amendment protects you from self-incrimination, but many citizens misunderstand how it applies in everyday police encounters. Here's what you need to know.",
  },
  {
    category: "Corporate Law",
    date: "February 28, 2026",
    title: "Force Majeure Clauses in the Modern Contract",
    excerpt:
      "Recent global disruptions have forced courts to re-examine the boundaries of force majeure. We analyze the evolving case law and what it means for your contracts.",
  },
];

const FOOTER_ICONS = [
  { Icon: Phone, label: "Phone" },
  { Icon: Mail, label: "Email" },
  { Icon: MapPin, label: "Location" },
];

// ── Contact form mutation ────────────────────────────────────────────────────
function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitContact(
        data.name,
        data.email,
        data.phone,
        data.subject,
        data.message,
        BigInt(Date.now()),
      );
    },
    onSuccess: () => {
      toast.success("Message sent! We'll be in touch shortly.");
    },
    onError: () => {
      toast.error("Failed to send your message. Please try again.");
    },
  });
}

// ── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleNav("#home")}
          className="flex flex-col leading-tight text-left"
          data-ocid="nav.link"
        >
          <span className="font-serif font-bold text-navy text-lg tracking-[0.12em] uppercase">
            Ajay Nimbalkar
          </span>
          <span className="font-sans text-xs italic text-[oklch(var(--gray-muted))] tracking-wide">
            Advocate &amp; Legal Counsel
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNav(link.href)}
              className="font-sans text-sm font-medium text-[oklch(var(--gray-muted))] hover:text-navy transition-colors"
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
          <Button
            type="button"
            onClick={() => handleNav("#contact")}
            className="bg-navy text-white rounded-full px-5 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
            data-ocid="nav.primary_button"
          >
            Request Consultation
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden text-navy"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-cream border-t border-border"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNav(link.href)}
                  className="text-left font-sans text-base font-medium text-charcoal hover:text-navy transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              ))}
              <Button
                type="button"
                onClick={() => handleNav("#contact")}
                className="bg-navy text-white rounded-full w-full mt-2"
                data-ocid="nav.primary_button"
              >
                Request Consultation
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const handleNav = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-[88vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(15,45,74,0.92) 45%, rgba(15,45,74,0.55) 100%), url('/assets/generated/hero-advocate.dim_1200x700.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <span className="inline-flex items-center gap-2 text-gold font-sans text-sm font-medium tracking-widest uppercase">
            <span className="w-8 h-px bg-gold inline-block" />
            Trusted Legal Counsel Since 1999
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[54px] text-white font-semibold leading-tight">
            Strategic Advocacy.
            <br />
            <span className="italic text-gold">Trusted Counsel.</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-white/80 max-w-lg leading-relaxed">
            With over 25 years defending clients across criminal, civil, family,
            and corporate law, Ajay Nimbalkar delivers results grounded in
            integrity and relentless preparation.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              type="button"
              onClick={() => handleNav("#about")}
              className="bg-gold text-navy rounded font-semibold px-7 py-3 hover:brightness-110 transition-all"
              data-ocid="hero.primary_button"
            >
              Meet Ajay
            </Button>
            <Button
              type="button"
              onClick={() => handleNav("#contact")}
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 rounded px-7 py-3"
              data-ocid="hero.secondary_button"
            >
              Free Consultation
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}

// ── Practice Areas ────────────────────────────────────────────────────────────
function PracticeAreasSection() {
  return (
    <section
      id="practice-areas"
      className="py-20"
      style={{ background: "oklch(var(--taupe))" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white font-semibold">
            Areas of Practice
          </h2>
          <p className="font-sans text-white/70 mt-3 max-w-xl mx-auto">
            Comprehensive legal services delivered with precision and conviction
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRACTICE_AREAS.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow group cursor-default"
              data-ocid={`practice.item.${i + 1}`}
            >
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.95_0.05_75)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <area.icon size={22} className="text-gold" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                {area.title}
              </h3>
              <p className="font-sans text-sm text-[oklch(var(--gray-muted))] leading-relaxed mb-4">
                {area.desc}
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-gold text-sm font-semibold hover:gap-2 transition-all"
              >
                Learn More <ChevronRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About ────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-card-hover">
              <img
                src="/assets/generated/about-alexander.dim_600x700.jpg"
                alt="Ajay Nimbalkar – Advocate"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-navy text-white rounded-xl px-5 py-3 shadow-card flex items-center gap-3">
              <Award className="text-gold" size={24} />
              <div>
                <p className="font-serif text-sm font-semibold">
                  Bar Association
                </p>
                <p className="font-sans text-xs text-white/70">
                  Member since 1999
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div>
              <span className="text-gold font-sans text-sm font-semibold tracking-widest uppercase">
                About
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-semibold mt-2">
                About Ajay Nimbalkar
              </h2>
            </div>
            <p className="font-sans text-[oklch(var(--gray-muted))] leading-relaxed">
              Ajay Nimbalkar is one of the region's most respected advocates,
              known for his meticulous preparation, courtroom presence, and
              unwavering commitment to justice. After graduating top of his
              class from Yale Law School, he has built a distinguished career
              representing individuals and corporations in high-stakes legal
              battles.
            </p>
            <p className="font-sans text-[oklch(var(--gray-muted))] leading-relaxed">
              His philosophy is simple: every client deserves fearless, honest,
              and effective representation — regardless of the complexity or the
              opposition they face.
            </p>

            {/* Feature pillars */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                {
                  icon: Award,
                  label: "Experience",
                  sub: "25+ years at the bar",
                },
                {
                  icon: Shield,
                  label: "Integrity",
                  sub: "Your interests first",
                },
                { icon: Target, label: "Results", sub: "Outcomes that matter" },
              ].map((pillar) => (
                <div
                  key={pillar.label}
                  className="text-center p-4 bg-white rounded-xl shadow-xs"
                >
                  <pillar.icon size={22} className="text-gold mx-auto mb-2" />
                  <p className="font-serif font-semibold text-charcoal text-sm">
                    {pillar.label}
                  </p>
                  <p className="font-sans text-xs text-[oklch(var(--gray-muted))] mt-1">
                    {pillar.sub}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Stats ────────────────────────────────────────────────────────────────────
function StatsSection() {
  return (
    <section className="py-16 bg-navy">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center bg-[oklch(0.27_0.07_240)] rounded-2xl py-8 px-4"
              data-ocid={`stats.item.${i + 1}`}
            >
              <p className="font-serif text-4xl font-bold text-gold">
                {stat.value}
              </p>
              <p className="font-sans text-sm text-white/70 mt-2 tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold font-sans text-sm font-semibold tracking-widest uppercase">
            Client Voices
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-semibold mt-2">
            What Clients Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow flex flex-col gap-4"
              data-ocid={`testimonials.item.${i + 1}`}
            >
              <Quote size={28} className="text-gold opacity-60" />
              <p className="font-sans text-sm text-[oklch(var(--gray-muted))] leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white font-serif text-sm font-semibold shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-serif font-semibold text-charcoal text-sm">
                    {t.name}
                  </p>
                  <p className="font-sans text-xs text-[oklch(var(--gray-muted))]">
                    {t.role}
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12} className="text-gold fill-gold" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Insights + Contact ────────────────────────────────────────────────────────
function InsightsContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const mutation = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    mutation.mutate(form, {
      onSuccess: () => {
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      },
    });
  };

  return (
    <section id="insights" className="py-20 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Insights */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold font-sans text-sm font-semibold tracking-widest uppercase">
              Knowledge Hub
            </span>
            <h2 className="font-serif text-3xl text-charcoal font-semibold mt-2 mb-6">
              Latest Insights
            </h2>

            <div className="flex flex-col gap-5">
              {INSIGHTS.map((post, i) => (
                <div
                  key={post.title}
                  className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
                  data-ocid={`insights.item.${i + 1}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[oklch(0.95_0.05_75)] text-gold text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-[oklch(var(--gray-muted))]">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
                    {post.title}
                  </h3>
                  <p className="font-sans text-sm text-[oklch(var(--gray-muted))] leading-relaxed mb-3">
                    {post.excerpt}
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-gold text-sm font-semibold hover:gap-2 transition-all"
                  >
                    Learn More <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="rounded-2xl p-8 shadow-card-hover"
              style={{ background: "oklch(var(--taupe))" }}
            >
              <span className="text-gold font-sans text-sm font-semibold tracking-widest uppercase">
                Free Consultation
              </span>
              <h2 className="font-serif text-2xl text-white font-semibold mt-2 mb-6">
                Get In Touch
              </h2>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                data-ocid="contact.panel"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="font-sans text-xs text-white/70 font-medium"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="contact-name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your full name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="font-sans text-xs text-white/70 font-medium"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="your@email.com"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold"
                      data-ocid="contact.input"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-phone"
                      className="font-sans text-xs text-white/70 font-medium"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="+1 (555) 000-0000"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-subject"
                      className="font-sans text-xs text-white/70 font-medium"
                    >
                      Subject
                    </label>
                    <Input
                      id="contact-subject"
                      value={form.subject}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, subject: e.target.value }))
                      }
                      placeholder="Legal matter type"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold"
                      data-ocid="contact.input"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="font-sans text-xs text-white/70 font-medium"
                  >
                    Your Message *
                  </label>
                  <Textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Briefly describe your legal matter..."
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold resize-none"
                    data-ocid="contact.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="bg-gold text-navy font-semibold py-3 rounded-xl hover:brightness-110 transition-all mt-1"
                  data-ocid="contact.submit_button"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>

                {mutation.isSuccess && (
                  <p
                    className="text-center text-sm text-green-300"
                    data-ocid="contact.success_state"
                  >
                    ✓ Your message has been received.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand col */}
          <div>
            <p className="font-serif font-bold text-xl tracking-[0.1em] uppercase mb-1">
              Ajay Nimbalkar
            </p>
            <p className="font-sans text-xs italic text-white/60 mb-4">
              Advocate &amp; Legal Counsel
            </p>
            <p className="font-sans text-sm text-white/60 leading-relaxed">
              Delivering fearless, results-driven legal representation for over
              25 years. Your case, our mission.
            </p>
            <div className="flex gap-3 mt-4">
              {FOOTER_ICONS.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/30 transition-colors cursor-pointer"
                  aria-label={label}
                >
                  <Icon size={15} className="text-gold" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif font-semibold text-base mb-4 text-gold">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .querySelector(link.href)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-serif font-semibold text-base mb-4 text-gold">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-white/60">
                  1200 Avenue of the Americas, Suite 2400
                  <br />
                  New York, NY 10036
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold shrink-0" />
                <span className="font-sans text-sm text-white/60">
                  +1 (212) 555-0192
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold shrink-0" />
                <span className="font-sans text-sm text-white/60">
                  acroft@croftlaw.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-white/40">
            &copy; {year} Ajay Nimbalkar. All rights reserved.
          </p>
          <p className="font-sans text-xs text-white/40">
            Built with ♥ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/70 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <Toaster richColors position="top-right" />
      <Header />
      <main>
        <HeroSection />
        <PracticeAreasSection />
        <AboutSection />
        <StatsSection />
        <TestimonialsSection />
        <InsightsContactSection />
      </main>
      <Footer />
    </div>
  );
}
