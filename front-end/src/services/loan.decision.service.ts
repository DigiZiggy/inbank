import apiClient from "./api.client";

export async function requestLoanDecision({ personalCode, loanAmount, loanPeriodMonths }) {
    try {
        const response = await apiClient.post("/loan-decision", {
            personalCode,
            loanAmount,
            loanPeriodMonths
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            // Backend responded with non-2xx
            throw new Error(
                error.response.data?.message || `Request failed (${error.response.status})`
            );
        }

        if (error.request) {
            // Request made but no response
            throw new Error("No response from server");
        }

        // Something else
        throw new Error(error.message || "Unknown error");
    }
}