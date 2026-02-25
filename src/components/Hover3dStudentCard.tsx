import { getGradeInfo } from "../utils/gradeHelper";

type Props = {
  student: {
    id: number;
    name: string;
    score: number;
  };
};

const Hover3DStudentCard = ({ student }: Props) => {
  const grade = getGradeInfo(student.score);

  return (
    <div className="hover-3d min-w-[260px] mx-auto w-full flex-shrink-0 cursor-pointer">

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h3 className="card-title">{student.name}</h3>

          <p className="text-sm opacity-70">
            Student #{student.id}
          </p>

          <div className="text-4xl font-bold mt-2">
            {student.score}
          </div>

          <span
            className={`badge badge-lg font-bold mt-3 ${grade.className}`}
          >
            {grade.label}
          </span>
        </div>
      </div>

      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Hover3DStudentCard;