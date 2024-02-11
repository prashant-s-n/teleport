import { OfficeBranch } from './office_branch';
import { Role } from './role';

export type User = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: string | Date;
  gender: string;
  location: string;
  is_active: boolean;
  created_at: string | Date;
  updated_at: string | Date;
  office_branches: OfficeBranch;
  roles: Role;
};

export type Organization = {
  id: string;
  name: string;
  created_at: string | Date;
}

export type Client = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: string | Date;
  gender: string;
  phone: string;
  address: string;
  created_at: string | Date;
  email: string;
}