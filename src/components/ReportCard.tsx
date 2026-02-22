import { students } from "../data/students";
import { getGradeInfo } from "../utils/gradeHelper";

const GradeReportCard = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="card bg-base-100 shadow-xl w-full max-w-2xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Grade Report Card</h2>
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
                {students.map((student) => {
                  const grade = getGradeInfo(student.score);
                  return (
                    <tr key={student.id} className={grade.className}>
                      <td>{student.id}</td>
                      <td className="font-medium">{student.name}</td>
                      <td>{student.score}</td>
                      <td>
                        <span className="badge badge-lg font-bold">{grade.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="badge bg-success text-success-content">A: 90-100</span>
            <span className="badge bg-warning text-warning-content">B: 50-89</span>
            <span className="badge bg-error text-error-content">Fail: Below 50</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeReportCard;
