import { EmployeeStatus, EmployeeTier } from "../Employee.enum";

export interface EmployeeUpdateDto {
    firstName?: string,
    lastName?: string,
    designation?: string,
    nearestCity?: string,
    tier?: EmployeeTier,
    status?: EmployeeStatus,
}