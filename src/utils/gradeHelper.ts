export interface GradeInfo {
  label: string;
  className: string;
}

export function getGradeInfo(score: number): GradeInfo {
  if (score >= 90) return { label: "A", className: "bg-success text-success-content" };
  if (score >= 50) return { label: "B", className: "bg-warning text-warning-content" };
  return { label: "Fail", className: "bg-error text-error-content" };
}
