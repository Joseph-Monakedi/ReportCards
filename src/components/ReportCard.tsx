import { students } from "../data/students";
import { getGradeInfo } from "../utils/gradeHelper";
import { setUrlParam } from "../utils/urlState";
import { useFiltersFromUrl } from "../hooks/useFiltersFromUrl";
import { GradeFilter, SortType } from "../utils/urlState";

const GradeReportCard = () => {
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

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="card bg-base-100 shadow-xl w-full max-w-2xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Grade Report Card</h2>

          <div className="flex flex-wrap gap-3 mb-4">
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

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Score</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => {
                  const gradeInfo = getGradeInfo(student.score);
                  return (
                    <tr key={student.id} className={gradeInfo.className}>
                      <td>{student.id}</td>
                      <td className="font-medium">{student.name}</td>
                      <td>{student.score}</td>
                      <td>
                        <span className="badge badge-lg font-bold">
                          {gradeInfo.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeReportCard;