export enum GradeLabel {
  A = "A",
  B = "B",
  FAIL = "Fail",
}

export enum GradeClass {
  A = "bg-success text-success-content",
  B = "bg-warning text-warning-content",
  FAIL = "bg-error text-error-content",
}

export interface GradeInfo {
  label: GradeLabel;
  className: GradeClass;
}

export function getGradeInfo(score: number): GradeInfo {
  if (score >= 90) {
    return {
      label: GradeLabel.A,
      className: GradeClass.A,
    };
  }

  if (score >= 50) {
    return {
      label: GradeLabel.B,
      className: GradeClass.B,
    };
  }

  return {
    label: GradeLabel.FAIL,
    className: GradeClass.FAIL,
  };
}