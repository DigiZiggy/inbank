export enum DecisionStatus {
    APPROVED = "APPROVED",
    NOT_APPROVED = "NOT_APPROVED",
}

export const DECISION_STATUS_LABELS: Record<DecisionStatus, string> = {
    [DecisionStatus.APPROVED]: "APPROVED",
    [DecisionStatus.NOT_APPROVED]: "NOT APPROVED",
};

export type LoanDecisionResponse = {
    decision: DecisionStatus;
    approvedAmount: number | null;
    approvedPeriodMonths: number | null;
    creditModifier: number | null;
    message: string;
}