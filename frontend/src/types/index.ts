export interface User {
    id: string;
    name: string;
    email: string;
    lastLogin: string;
}

// Diagnosis
export interface DiagnosisData {
    _id: string;
    income: number;
    expenses: number;
    recommendations: string;
    userId: string;
}
