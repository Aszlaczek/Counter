// ===== Local Types (existing) =====
export type User = {
  id: number | null;
  name: string;
  surname: string;
  hours: string;
  date: string;
};

// ===== API Types =====

// Auth
export type LoginRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type RefreshRequest = {
  refresh_token: string;
};

export type TokenRefreshResponse = {
  access_token: string;
  token_type: string;
};

export type UserProfile = {
  id: number;
  username: string;
  email: string;
};

// Person
export type Person = {
  id: number;
  name: string;
  surname: string;
  hours: string;
  date: string;
};

export type PersonCreate = {
  name: string;
  surname: string;
  hours: string;
};

export type PersonUpdate = {
  name?: string;
  surname?: string;
  hours?: string;
};

// Extra Hours
export type ExtraHours = {
  id: number;
  person_id: number;
  hours: string;
  description?: string;
  date: string;
};

export type ExtraHoursCreate = {
  person_id: number;
  hours: string;
  description?: string;
};

export type ExtraHoursUpdate = {
  hours?: string;
  description?: string;
};

export type ExtraHoursSummary = {
  person_id: number;
  person_name: string;
  person_surname: string;
  total_hours: string;
  records: ExtraHours[];
};
