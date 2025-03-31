// landing page
"use client";
import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
// sections
import Hero from "./hero";
import Feature from "./feature";
import Faqs from "./faqs";

export default function Campaign() {
  return (
    <ThemeProvider>
      <Navbar />
      <Hero />
      <Feature />
      <Faqs />
      <Footer />
    </ThemeProvider>
  );
}
