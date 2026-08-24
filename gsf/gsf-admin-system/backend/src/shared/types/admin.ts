export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'SuperAdmin' | 'LoanManager' | 'Counselor';
  /** Salted hash only — never sent to the client. Optional so client-facing
   * copies of this type (e.g. the logged-in user stored in the frontend)
   * can omit it entirely. */
  passwordHash?: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: AdminUser;
}
