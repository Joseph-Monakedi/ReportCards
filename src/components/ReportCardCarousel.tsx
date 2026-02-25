import { useEffect, useRef, useState } from "react";
import { students } from "../data/students";
import Hover3DStudentCard from "./Hover3dStudentCard";
import { getGradeInfo } from "../utils/gradeHelper";
import { GradeFilter, setUrlParam, SortType } from "../utils/urlState";
import { useFiltersFromUrl } from "../hooks/useFiltersFromUrl";

const ReportCardCarousel = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const { grade, sort, search } = useFiltersFromUrl();

  const filteredStudents = [...students]
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    .filter((s) => {
      if (grade === GradeFilter.All) return true;
      return getGradeInfo(s.score).label === grade;
    })
    .sort((a, b) => {
      if (sort === SortType.name) return a.name.localeCompare(b.name);
      return b.score - a.score;
    });

  useEffect(() => {
    if (isPaused || filteredStudents.length <= 1) return;

    const interval = setInterval(() => {
      const container = carouselRef.current;
      if (!container) return;

      const isMobile = window.innerWidth < 640;

      if (isMobile) {

        const scrollAmount = 350; 
        if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
          container.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ top: scrollAmount, behavior: "smooth" });
        }
      } else {
        const scrollAmount = container.offsetWidth * 0.65;
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, filteredStudents.length]);

  return (
    <div className="min-h-screen w-full mx-auto py-6 sm:py-10 px-4">
      <div className="w-full max-w-6xl mx-auto flex flex-col h-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Student Performance
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 mb-8 justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full sm:max-w-xs"
            defaultValue={search}
            onChange={(e) => setUrlParam("search", e.target.value)}
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <select
              className="select select-bordered flex-1"
              value={grade}
              onChange={(e) => setUrlParam("grade", e.target.value)}
            >
              <option value={GradeFilter.All}>All Grades</option>
              <option value={GradeFilter.A}>Grade A</option>
              <option value={GradeFilter.B}>Grade B</option>
              <option value={GradeFilter.Fail}>Fail</option>
            </select>
            <select
              className="select select-bordered flex-1"
              value={sort}
              onChange={(e) => setUrlParam("sort", e.target.value)}
            >
              <option value={SortType.name}>Name</option>
              <option value={SortType.score}>Score</option>
            </select>
          </div>
        </div>


        <div
          ref={carouselRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          className={`
            carousel carousel-center rounded-box p-4 gap-6
            flex-col sm:flex-row
            carousel-vertical sm:carousel-horizontal
            h-[500px] sm:h-auto 
            w-full  mx-auto
          `}
        >
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div 
                key={student.id} 
                className="carousel-item w-full mx-auto sm:w-auto flex justify-center py-4 sm:py-0"
              >
                <div className="w-full mx-auto max-w-[300px]">
                  <Hover3DStudentCard student={student} />
                </div>
              </div>
            ))
          ) : (
            <div className="carousel-item w-full flex justify-center items-center h-full text-neutral-content opacity-50">
              No results found
            </div>
          )}
        </div>

        <div className="text-center sm:hidden text-xs text-gray-500 mt-4 animate-pulse">
          Scroll down to browse
        </div>
      </div>
    </div>
  );
};

export default ReportCardCarousel;