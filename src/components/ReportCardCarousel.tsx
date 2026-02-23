import { useEffect, useRef, useState } from "react";
import { students } from "../data/students";
import Hover3DStudentCard from "./Hover3dStudentCard";

const ReportCardCarousel = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      const container = carouselRef.current;
      if (!container) return;

      const scrollAmount = 280;

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });


      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 5
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Report Card Carousel
        </h2>

        {/* Carousel */}
        <div
          ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-6 overflow-x-auto pb-6 scroll-smooth [perspective:1000px]"
        >
          {students.map((student) => (
            <Hover3DStudentCard
              key={student.id}
              student={student}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 mt-6 justify-center">
          <span className="badge bg-success text-success-content">
            A: 90-100
          </span>
          <span className="badge bg-warning text-warning-content">
            B: 50-89
          </span>
          <span className="badge bg-error text-error-content">
            Fail: Below 50
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportCardCarousel;