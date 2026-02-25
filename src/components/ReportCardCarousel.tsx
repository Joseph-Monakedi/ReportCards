import { useEffect, useRef, useState } from "react";
import { students } from "../data/students";
import Hover3DStudentCard from "./Hover3dStudentCard";
import { getGradeInfo } from "../utils/gradeHelper";
import { GradeFilter, setUrlParam, SortType } from "../utils/urlState";
import { useFiltersFromUrl } from "../hooks/useFiltersFromUrl";

const ReportCardCarousel = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { grade, sort, search } = useFiltersFromUrl();

  const filteredStudents = [...students]
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    .filter((s) => {
      if (grade === GradeFilter.A) return true;
      return getGradeInfo(s.score).label === grade;
    })
    .sort((a, b) => {
      if (sort === SortType.name) return a.name.localeCompare(b.name);
      return b.score - a.score;
    });

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      const container = carouselRef.current;
      if (!container) return;

      container.scrollBy({ left: 280, behavior: "smooth" });

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

        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          <input
            type="text"
            placeholder="Search student..."
            className="input input-bordered"
            defaultValue={search}
            onChange={(e) => setUrlParam("search", e.target.value)}
          />

          <select
            className="select select-bordered"
            value={grade}
            onChange={(e) => setUrlParam("grade", e.target.value)}
          >
            <option value={GradeFilter.All}>All Grades</option>
            <option value={GradeFilter.All}>Grade A</option>
            <option value={GradeFilter.All}>Grade B</option>
            <option value={GradeFilter.All}>Fail</option>
          </select>

          <select
            className="select select-bordered"
            value={sort}
            onChange={(e) => setUrlParam("sort", e.target.value)}
          >
            <option value={SortType.name}>Sort by Name</option>
            <option value={SortType.score}>Sort by Score</option>
          </select>
        </div>

        <div
          ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-6 overflow-x-auto pb-6 scroll-smooth [perspective:1000px]"
        >
          {filteredStudents.map((student) => (
            <Hover3DStudentCard key={student.id} student={student} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportCardCarousel;
