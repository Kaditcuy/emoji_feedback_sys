"use client";

import Link from "next/link";
import { ThemeProvider, Typography, Button } from "@material-tailwind/react";
import Navbar from "@/components/navbar";

export default function AboutPage() {
  return (
    <ThemeProvider>
        <Navbar />
      <section className="container mx-auto px-4 py-20 text-center lg:text-left">
        <Typography variant="h2" color="blue-gray" className="mb-4 text-4xl font-bold"  placeholder="" 
                  onPointerEnterCapture={() => {}} 
                  onPointerLeaveCapture={() => {}}>
          Hi, I'm Philip Ukanwoke 👋
        </Typography>
        <Typography className="mb-6 text-lg text-gray-600"  placeholder="" 
                  onPointerEnterCapture={() => {}} 
                  onPointerLeaveCapture={() => {}}>
          I'm a passionate web developer with experience in C, PHP, Java, Python, TypeScript,
          JavaScript, and expertise in frameworks like React, Node.js, and Next.js. 
          I build scalable and high-performance applications that drive business success.
        </Typography>

        <Typography className="mb-8 text-lg text-gray-600"  placeholder="" 
                  onPointerEnterCapture={() => {}} 
                  onPointerLeaveCapture={() => {}}>
          If you need a **high-quality website, web app, or AI integration**, I'm the developer for the job.
        </Typography>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="https://portfolio-philip-gamma.vercel.app" target="_blank">
            <Button color="gray" className="w-full sm:w-auto"  placeholder="" 
                  onPointerEnterCapture={() => {}} 
                  onPointerLeaveCapture={() => {}}>View My Portfolio</Button>
          </Link>
          <Link href="https://github.com/Kaditcuy" target="_blank">
            <Button color="gray" className="w-full sm:w-auto"  placeholder="" 
                  onPointerEnterCapture={() => {}} 
                  onPointerLeaveCapture={() => {}}>GitHub Profile</Button>
          </Link>
          <Link href="/">
            <Button color="gray" className="w-full sm:w-auto"  placeholder="" 
                  onPointerEnterCapture={() => {}} 
                  onPointerLeaveCapture={() => {}}>Visit Homepage </Button>
          </Link>
        </div>
      </section>
    </ThemeProvider>
  );
}
