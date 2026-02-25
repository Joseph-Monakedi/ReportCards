import { useMemo } from "react";
import { students } from "../data/students";
import { getGradeInfo } from "../utils/gradeHelper";
import { setUrlParam } from "../utils/urlState";
import { useFiltersFromUrl } from "../hooks/useFiltersFromUrl";
import { GradeFilter, SortType } from "../utils/urlState";

const GradeReportCard = () => {
  const { grade, sort, search } = useFiltersFromUrl();

  const filteredStudents = useMemo(() => {
    return [...students]
      .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
      .filter((s) => {
        if (grade === GradeFilter.All) return true;
        return getGradeInfo(s.score).label === grade;
      })
      .sort((a, b) => {
        if (sort === SortType.name) return a.name.localeCompare(b.name);
        return b.score - a.score;
      });
  }, [grade, sort, search]);

  return (
    <div className="min-h-screen bg-base-200 flex items-start justify-center p-2 sm:p-6">
      <div className="card bg-base-100 shadow-xl w-full max-w-2xl">
        <div className="card-body p-4 sm:p-8">
          <h2 className="card-title text-xl sm:text-2xl mb-4">Grade Report Card</h2>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Search student..."
              className="input input-bordered w-full"
              defaultValue={search}
              onChange={(e) => setUrlParam("search", e.target.value)}
            />

            <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
              <select
                className="select select-bordered w-full"
                value={grade}
                onChange={(e) => setUrlParam("grade", e.target.value)}
              >
                <option value={GradeFilter.All}>All Grades</option>
                <option value={GradeFilter.A}>Grade A</option>
                <option value={GradeFilter.B}>Grade B</option>
                <option value={GradeFilter.Fail}>Fail</option>
              </select>

              <select
                className="select select-bordered w-full"
                value={sort}
                onChange={(e) => setUrlParam("sort", e.target.value)}
              >
                <option value={SortType.name}>Sort: Name</option>
                <option value={SortType.score}>Sort: Score</option>
              </select>
            </div>
          </div>

          {/* Table Container: Ensure it scrolls horizontally on tiny screens */}
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th className="px-2 sm:px-4">#</th>
                  <th className="px-2 sm:px-4">Student</th>
                  <th className="px-2 sm:px-4 text-right sm:text-left">Score</th>
                  <th className="px-2 sm:px-4">Grade</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => {
                    const gradeInfo = getGradeInfo(student.score);
                    return (
                      <tr key={student.id} className={`${gradeInfo.className} hover`}>
                        <td className="px-2 sm:px-4">{student.id}</td>
                        <td className="px-2 sm:px-4 font-medium max-w-[120px] truncate sm:max-w-none">
                          {student.name}
                        </td>
                        <td className="px-2 sm:px-4 text-right sm:text-left">{student.score}</td>
                        <td className="px-2 sm:px-4">
                          <span className="badge badge-sm sm:badge-md font-bold">
                            {gradeInfo.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-gray-500">
                      No matches found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeReportCard;