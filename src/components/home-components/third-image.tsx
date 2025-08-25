"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  id: number;
  coupleNames: string;
  image: string;
  testimonial: string;
  signature: string;
}

const reviews: Review[] = [
  {
    id: 1,
    coupleNames: "KRYSTAL & ALVIN",
    image: "/hero-page-img/1.jpg",
    testimonial:
      'A huge thank you to the amazing team at Faybe Weddings and Events for making our wedding day truly beautiful.\n\nKasmooth gd sng tanan kay ara gd sila ga help and guide throughout the planning process. Even though both of us were overseas, their guidance and support made everything completely worry-free.\n\nTo the entire team, we are so grateful. Our wedding turned out just the way we had imagined. It was stress-free, and we felt completely at ease knowing you were always there in case anything unexpected came up especially sng wedding day. Both of us ni groom were just relax and happy kay we are confident nga successful ang wedding namun because Faybe Weddings are with us.\n\nEvery idea we had was brought to life, and you truly went above and beyond. Both our families and friends were saying, "kanami gd inyu wedding" "fun gd and smooth all through out inyu kasal" "nami inyu coordinator" For that, we will be forever thankful for all your efforts.\n\nOnce again, thank you so much Faybe Wedding and Events from the bottom of our hearts.',
    signature: "Lovelots,\nMr. and Mrs Tay",
  },
  {
    id: 2,
    coupleNames: "SARAH & MICHAEL",
    image: "/hero-page-img/2.jpg",
    testimonial:
      "Working with Faybe Weddings was an absolute dream! From our first consultation to the last dance, every detail was perfectly executed.\n\nTheir team's creativity and attention to detail transformed our vision into reality. The coordination was flawless, and we could truly enjoy our special day without any worries.\n\nOur guests are still talking about how beautiful and well-organized everything was. Thank you for making our wedding day absolutely perfect!",
    signature: "With love,\nSarah & Michael",
  },
  {
    id: 3,
    coupleNames: "EMMA & JAMES",
    image: "/hero-page-img/3.jpg",
    testimonial:
      "Faybe Weddings exceeded all our expectations! Their professionalism and creativity made our wedding planning journey so enjoyable.\n\nEvery vendor they recommended was exceptional, and the timeline they created kept everything running smoothly. Our wedding was everything we dreamed of and more.\n\nWe cannot thank the entire team enough for their dedication and hard work. Highly recommend to any couple looking for their perfect day!",
    signature: "Forever grateful,\nEmma & James",
  },
];

interface ThirdImageProps {
  nextSectionId: string;
}

export default function ThirdImage({ nextSectionId }: ThirdImageProps) {
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const review = reviews[currentReview];

  return (
    <main className="relative min-h-screen bg-gray-100" id="third-image">
      {/* Reviews Header */}

      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Left Side - Image */}
        <div className="relative w-1/2 bg-black">
          <div className="absolute top-8 right-8 z-10">
            <h1 className="text-6xl bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-700 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] tracking-wider">
              REVIEWS
            </h1>
          </div>
          <img
            src={review.image || "/placeholder.svg"}
            alt={`Wedding photo of ${review.coupleNames}`}
            className="w-full h-full object-cover"
          />

          {/* Couple Names and Navigation */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center">
            <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">
              {review.coupleNames}
            </h2>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-center gap-8">
              <button
                onClick={prevReview}
                className="w-12 h-12 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextReview}
                className="w-12 h-12 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors"
                aria-label="Next review"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Testimonial */}
        <div className="w-1/2 bg-gray-200 flex items-center justify-center p-16">
          <div className="max-w-lg">
            <div className="text-gray-700 text-base leading-relaxed mb-8 whitespace-pre-line">
              {review.testimonial}
            </div>

            <div className="text-gray-600 text-sm whitespace-pre-line">
              {review.signature}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
