"use client";

import Link from "next/link";
import { ThemeProvider } from "@material-tailwind/react";
import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";

function Hero() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen w-full">
        <header className="grid !min-h-[49rem] bg-gray-900 px-4 sm:px-8 relative">
          <div className="container mx-auto mt-32 grid h-full w-full grid-cols-1 place-items-center lg:mt-14 lg:grid-cols-2">
            {/* LEFT SIDE - TEXT */}
            <div className="col-span-1 text-center lg:text-left">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-4xl sm:text-5xl lg:text-6xl"
              >
                EFS <br />
              </Typography>
              <Typography
                variant="lead"
                className="mb-7 !text-white text-lg sm:text-xl lg:text-2xl md:pr-16 xl:pr-28"
              >
                Emoji Feedback System
              </Typography>
              <Typography
                className="mb-4 text-lg sm:text-xl lg:text-2xl"
                color="white"
                variant="h6"
              >
                Use EFS to Understand Your Customers Like Never Before!
              </Typography>
              <div className="flex flex-col gap-4 md:flex-row md:gap-2 md:mb-2 md:w-10/12">
                <Link href="/auth/login" passHref>
                  <Button
                    size="lg"
                    color="white"
                    className="w-full md:w-auto flex justify-center items-center gap-3"
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/auth/register" passHref>
                  <Button
                    size="lg"
                    color="white"
                    className="w-full md:w-auto flex justify-center items-center gap-3"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE - IMAGE CONTAINER */}
            <div className="relative flex justify-center items-center">
              {/* Background Shape */}
              <div className="absolute -top-10 right-0 w-[500px] h-[500px] bg-green-400/20 rounded-full blur-3xl"></div>

              {/* Floating Emojis */}
              <div className="absolute top-10 left-10 animate-bounce">
                <Image src="/image/emoji-happy.png" width={50} height={50} alt="happy emoji" />
              </div>
              <div className="absolute bottom-10 right-10 animate-bounce">
                <Image src="/image/emoji-angry.png" width={50} height={50} alt="angry emoji" />
              </div>

              {/* Main Image */}
              <Image
                width={470}
                height={576}
                src="/image/emoji.png"
                alt="emoji feedback system"
                className="relative z-10 object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </header>

        {/* SUBSECTION UNDER HERO */}
        <div className="mx-4 lg:mx-16 -mt-24 rounded-xl bg-white p-5 md:p-14 shadow-md">
          <div>
            <Typography
              variant="h3"
              color="blue-gray"
              className="mb-3 text-2xl sm:text-3xl lg:text-4xl"
            >
              Decode Emoji Reactions for Smarter Business Decisions!
            </Typography>
            <Typography
              variant="paragraph"
              className="font-normal !text-gray-500 text-base sm:text-lg lg:w-5/12"
            >
              Track, analyze, and understand how your customers feel—instantly. With AI-powered sentiment analysis, EFS helps you make data-driven decisions that improve satisfaction and boost engagement.
            </Typography>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Hero;
