import React, { useState, useEffect } from "react";
import { rotatingTexts } from "./Constants";
import Header from "../../components/Header";

const FEATURES = [
  {
    num: "01",
    img: "/roommatematch.png",
    title: "Smart Roommate Matching",
    text: "Find roommates who match your lifestyle, study habits, cleanliness preferences, and daily routines.",
  },
  {
    num: "02",
    img: "/issuereporting.png",
    title: "Easy Issue Reporting",
    text: "Report maintenance issues and complaints, track their status, and stay updated until they are resolved.",
  },
  {
    num: "03",
    img: "/simplifiedhostellife.png",
    title: "Simplified Hostel Life",
    text: "Access your dashboard, mess information, feedback, announcements, and other hostel services from one place.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Set Your Preferences",
    text: "Tell HostelEzz about your lifestyle, study habits, cleanliness, noise preferences, and other requirements.",
  },
  {
    num: "02",
    title: "Find Your Match",
    text: "Our matching system compares your preferences and helps you find a more compatible roommate.",
  },
  {
    num: "03",
    title: "Manage Hostel Life",
    text: "Handle complaints, check hostel information, share feedback, and access everything from your dashboard.",
  },
];



export default function Landing() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-[#102D3D] overflow-x-hidden">
      <Header />

      {/* HERO */}
      <section className="flex min-h-screen items-center bg-[#EAF6FB] px-6 pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-10">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D1E3EB] bg-white px-3.5 py-1.5 text-xs font-medium text-[#234C6A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#456882]" />
              Smart Hostel Management
            </span>

            <p className="mt-6 text-4xl sm:text-5xl lg:text-[54px] font-bold leading-[1.2] text-[#102D3D]">
              Your portal for
            </p>

            {/* fixed-height box so the hero never jumps */}
            <div className="relative mt-1 h-[2.5em] text-4xl sm:text-5xl lg:text-[54px] font-bold leading-[1.2]">
              {rotatingTexts.map((text, i) => (
                <span
                  key={text}
                  aria-hidden={i !== currentTextIndex}
                  className={`absolute inset-x-0 top-0 pb-1 bg-gradient-to-r from-[#1B3C53] to-[#456882] bg-clip-text text-transparent transition-all duration-500 ease-in-out ${i === currentTextIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                    }`}
                >
                  {text}
                </span>
              ))}
            </div>

            <p className="mt-2 mx-auto md:mx-0 max-w-[540px] text-base md:text-[17px] leading-relaxed text-[#5B7180]">
              A unified hostel management system that helps students find
              compatible roommates, manage complaints, access hostel
              information, and make everyday hostel life easier.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a
                href="/login"
                className="rounded-lg bg-[#1B3C53] px-7 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-[3px] hover:bg-[#102D3D] hover:shadow-lg"
              >
                Get Started →
              </a>
              <a
                href="#features"
                className="rounded-lg border border-[#D1E3EB] bg-white px-7 py-3 text-sm font-semibold text-[#1B3C53] shadow-sm transition-all duration-300 hover:-translate-y-[3px] hover:shadow-md"
              >
                Explore Features
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 justify-center md:justify-start text-xs text-[#5B7180]">
              <Check>Smart Matching</Check>
              <Check>Easy Complaints</Check>
              <Check>One Dashboard</Check>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-[440px]">
              <div className="absolute inset-0 -z-0 m-auto h-3/4 w-3/4 rounded-full bg-[#456882]/20 blur-3xl" />
              <img
                src="/student_accomodation1.png"
                alt="Hostel Management Illustration"
                className="relative w-full transition-transform duration-500 hover:-translate-y-[5px] hover:scale-[1.01]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="scroll-mt-16 bg-[#F3FAFD] px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#102D3D]">
              Everything You Need for Hostel Living
            </h2>
            <p className="mt-4 text-base md:text-lg text-[#5B7180] leading-relaxed">
              From finding compatible roommates to addressing everyday hostel
              needs, HostelEzz brings everything together in one simple
              platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <FeatureCard key={f.num} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="scroll-mt-16 bg-[#102B3C] px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10 md:grid-cols-[2fr_3fr] md:gap-16  md:items-center">
          <div className="md:self-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-15">
              How HostelEzz
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-15 "> Works!</h2>

            </h2>
            <p className="mt-4 text-base md:text-lg text-[#9DB8C7] leading-relaxed">
              From setting your preferences to managing everyday hostel life,
              everything is designed to stay simple.
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {STEPS.map((s) => (
              <Step key={s.num} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD SHOWCASE */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#102D3D]">
              One Dashboard. Everything You Need.
            </h2>
            <p className="mt-4 text-base md:text-lg text-[#5B7180] leading-relaxed">
              Keep your hostel experience organized from one simple student
              dashboard.
            </p>
          </div>

          <DashboardMockup />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#EAF6FB] px-6 py-20 md:py-28 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-[#456882]">
            YOUR HOSTEL. YOUR SPACE.
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#102D3D]">
            Make hostel life a little easier.
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#5B7180] leading-relaxed">
            Find the right roommate, stay on top of hostel life, and manage
            everyday needs from one connected platform.
          </p>
          <a
            href="/login"
            className="mt-8 inline-block rounded-lg bg-[#1B3C53] px-8 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-[3px] hover:bg-[#102D3D] hover:shadow-lg"
          >
            Get Started with HostelEzz →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#D1E3EB] bg-[#F3FAFD] px-6 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-[#5B7180]">
          <span className="font-bold text-[#1B3C53]">HostelEzz</span>
          <span className="text-center">
            © 2026 HostelEzz. Making hostel life easier.
          </span>
          <nav className="flex gap-5">
            <a href="#features" className="hover:text-[#1B3C53] transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-[#1B3C53] transition-colors">
              How It Works
            </a>
            <a href="/login" className="hover:text-[#1B3C53] transition-colors">
              Sign In
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function Check({ children }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-[#456882]">✓</span>
      {children}
    </span>
  );
}

function FeatureCard({ num, img, title, text }) {
  return (
    <div className="group rounded-2xl border border-[#D1E3EB] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[592/320] overflow-hidden rounded-xl bg-[#EAF6FB]">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-5 text-sm font-semibold text-[#456882]">{num}</p>
      <h3 className="mt-1 text-lg font-bold text-[#102D3D]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#5B7180]">{text}</p>
    </div>
  );
}

function Step({ num, title, text }) {
  return (
    <div className="flex gap-6 py-8 first:pt-0 last:pb-0">
      <p className="w-12 shrink-0 text-3xl font-bold text-[#456882]">{num}</p>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#9DB8C7]">{text}</p>
      </div>
    </div>
  );
}

function DashCard({ title, detail, tag }) {
  return (
    <div className="rounded-xl border border-[#D1E3EB] bg-white p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-[#102D3D]">{title}</h4>
        <span className="rounded-full bg-[#EAF6FB] px-2 py-0.5 text-[10px] font-medium text-[#234C6A]">
          {tag}
        </span>
      </div>
      <p className="mt-2 text-xs text-[#5B7180]">{detail}</p>
    </div>
  );
}

const MOCK_NAV = ["Dashboard", "Complaints", "Feedback", "Roommate Match", "Preferences", "Profile"];

const MOCK_MEALS = [
  { icon: "🥣", name: "Breakfast", items: "Upma, Tea", time: "08:00 AM" },
  { icon: "🍛", name: "Lunch", items: "Rice, Rajma", time: "01:00 PM" },
  { icon: "🍪", name: "Snacks", items: "Biscuits, Tea", time: "04:30 PM" },
  { icon: "🍽️", name: "Dinner", items: "Chapati, Aloo Gobi", time: "08:30 PM" },
];

function DashboardMockup() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto max-w-4xl select-none overflow-hidden rounded-2xl border border-[#D1E3EB] bg-white shadow-xl shadow-[#1B3C53]/10"
    >
      {/* browser bar */}
      <div className="flex items-center gap-1.5 border-b border-[#D1E3EB] bg-[#F3FAFD] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#D1E3EB]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#D1E3EB]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#D1E3EB]" />
      </div>

      <div className="flex">
        {/* main area */}
        <div className="grid flex-1 gap-3 bg-[#F3FAFD] p-3 md:p-4 lg:grid-cols-[1fr_190px]">
          <div className="space-y-4">
            <div className="rounded-xl border border-[#E6EEF3] bg-white p-4">
              <p className="text-xs font-semibold text-[#102D3D]">Complaints Overview</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <MockStat value="02" label="Total Filed" tint="bg-[#DCE8F8]" />
                <MockStat value="01" label="Pending" tint="bg-[#FDE8CC]" />
                <MockStat value="01" label="Resolved" tint="bg-[#DCE8F8]" />
              </div>
            </div>

            <div className="rounded-xl border border-[#E6EEF3] bg-white p-4">
              <p className="text-xs font-semibold text-[#102D3D]">Today's Menu</p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {MOCK_MEALS.map((m) => (
                  <MockMeal key={m.name} {...m} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-[#083067] py-2.5 text-center text-xs font-semibold text-white">
              + File New Complaint
            </div>

            <div className="rounded-xl border border-[#E6EEF3] bg-white p-4">
              <p className="text-xs font-semibold text-[#102D3D]">Rate Lunch</p>
              <p className="mt-1 text-[11px] text-[#5B7180]">"How was today's lunch?"</p>
              <p className="mt-2 text-base tracking-wider text-[#D5DEE5]">★★★★★</p>
              <div className="mt-2 h-10 rounded-lg border border-[#E6EEF3] bg-[#F3FAFD]" />
              <div className="mt-3 rounded-lg bg-[#083067] py-2 text-center text-[11px] font-semibold text-white">
                Submit Feedback
              </div>
            </div>

            <div className="rounded-xl bg-[#083067] p-4 text-white">
              <p className="text-xs font-semibold">Roommate Match</p>
              <p className="mt-1 text-[10px] leading-snug text-white/70">
                Find your perfect roommate based on shared interests and habits.
              </p>
              <div className="mt-3 rounded-lg bg-white/10 py-2 text-center text-[11px] font-semibold">
                Get Started →
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockNavItem({ label, active }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs ${active ? "bg-[#DCE8F8] font-semibold text-[#083067]" : "text-[#5B7180]"
        }`}
    >
      <span className="h-3 w-3 rounded-[4px] border border-current opacity-60" />
      {label}
    </div>
  );
}

function MockStat({ value, label, tint }) {
  return (
    <div className="rounded-lg border border-[#E6EEF3] p-3">
      <span className={`block h-5 w-5 rounded-md ${tint}`} />
      <p className="mt-2 text-lg font-bold text-[#083067]">{value}</p>
      <p className="text-[9px] font-medium uppercase tracking-wide text-[#5B7180]">{label}</p>
    </div>
  );
}

function MockMeal({ icon, name, items, time }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-[#EAF1FB] p-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm">
        {icon}
      </span>
      <div className="min-w-0 flex-1 leading-tight">
        <p className="text-[11px] font-semibold text-[#102D3D]">{name}</p>
        <p className="truncate text-[10px] text-[#5B7180]">{items}</p>
      </div>
      <span className="text-[9px] text-[#5B7180]">{time}</span>
    </div>
  );
}