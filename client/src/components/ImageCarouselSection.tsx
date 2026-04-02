import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import teamPhotoPath from "@assets/Screenshot_2026-04-02_at_9.00.31_AM_1775134847333.png";

const slides = [
  {
    image: "/images/waldo-jobs.png",
    title: "Digital Job Management",
    subtitle: "Create and manage harvest jobs with real-time status tracking across your entire operation.",
  },
  {
    image: "/images/rowlee-farms-trucking.jpg",
    title: "Load Tracking & Tickets",
    subtitle: "Replace paper tickets with digital load tracking that works offline and syncs automatically.",
  },
  {
    image: "/images/lyme-great-lakes-timberlands.jpg",
    title: "In the Field Operations",
    subtitle: "Digitize field operations across thousands of acres with offline-capable tools for every role.",
  },
  {
    image: teamPhotoPath,
    title: "The PCT Team",
    subtitle: "Our dedicated team of forestry professionals bringing digital innovation to every harvest operation.",
  },
];

export default function ImageCarouselSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const autoNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
    setResetKey((k) => k + 1);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setResetKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(autoNext, 5000);
    return () => clearInterval(timer);
  }, [autoNext, resetKey]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="bg-neutral-900 py-20" data-testid="image-carousel-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-wider uppercase text-orange-500 mb-3 block">
            Platform Preview
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            data-testid="text-carousel-title"
          >
            See PCT in Action
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-md bg-neutral-800 border border-neutral-700">
            <div className="relative aspect-[16/9]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={current}
                  src={slides[current].image}
                  alt={slides[current].title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Button
              size="icon"
              variant="outline"
              onClick={prev}
              className="bg-neutral-900/70 border-neutral-600 text-white backdrop-blur-sm"
              data-testid="button-carousel-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Button
              size="icon"
              variant="outline"
              onClick={next}
              className="bg-neutral-900/70 border-neutral-600 text-white backdrop-blur-sm"
              data-testid="button-carousel-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-white mb-2" data-testid="text-carousel-slide-title">
                {slides[current].title}
              </h3>
              <p className="text-sm text-neutral-400 max-w-lg mx-auto" data-testid="text-carousel-slide-subtitle">
                {slides[current].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
                setResetKey((k) => k + 1);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-orange-500 w-6" : "bg-neutral-600"
              }`}
              data-testid={`button-carousel-dot-${i}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
