import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const features = [
  {
    title: "SIP Calculator",
    desc: "Plan systematic investments and visualize long-term wealth growth.",
    link: "/calculators/sip",
  },
  {
    title: "EMI Calculator",
    desc: "Calculate loan EMIs and total interest instantly.",
    link: "/calculators/emi",
  },
  {
    title: "FD Calculator",
    desc: "Estimate fixed deposit maturity amount with ease.",
    link: "/calculators/fd",
  },
  {
    title: "RD Calculator",
    desc: "Plan recurring deposits and track expected returns.",
    link: "/calculators/rd",
  },
  {
    title: "Lump Sum Calculator",
    desc: "Calculate returns on one-time investments accurately.",
    link: "/calculators/lumpsum",
  },
  {
    title: "Expense Tracker",
    desc: "Track daily expenses and manage budgets securely.",
    link: "/register",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 text-gray-900">
      <Navbar />

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between w-full">
          
          {/* Left Content */}
          <div className="md:w-1/2">
            <h1 className="text-5xl font-bold leading-tight">
              Take Control of Your <br />
              Financial Future
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Use powerful calculators like SIP, EMI, FD, RD & Lump Sum,
              track expenses, and manage your finances — all in one place.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => navigate("/register")}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/calculators/sip")}
                className="border border-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Try Calculators
              </button>
            </div>
          </div>

          {/* Right Preview Box */}
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                Finance Dashboard Preview
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            Powerful Financial Tools
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => navigate(feature.link)}
                className="cursor-pointer bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition"
              >
                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-4 text-gray-600 text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">
            Built for Simplicity. Designed for Security.
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="font-semibold text-lg">Secure Authentication</h4>
              <p className="mt-2 text-gray-600 text-sm">
                JWT-based login ensures your financial data stays protected.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg">Accurate Calculations</h4>
              <p className="mt-2 text-gray-600 text-sm">
                Industry-standard formulas for SIP, EMI, FD, RD & Lump Sum.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg">MERN Stack Powered</h4>
              <p className="mt-2 text-gray-600 text-sm">
                Built using modern technologies for scalability and performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-green-500 text-white text-center">
        <h2 className="text-3xl font-bold">
          Ready to Take Control of Your Finances?
        </h2>

        <button
          onClick={() => navigate("/register")}
          className="mt-8 bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          Create Free Account
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between">
          
          <div>
            <h3 className="text-white font-semibold text-lg">
              Finance Tracker
            </h3>
            <p className="mt-2 text-sm">
              Smart financial tools for smarter decisions.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <p className="text-sm">
              © 2026 Finance Tracker. All rights reserved.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Landing;