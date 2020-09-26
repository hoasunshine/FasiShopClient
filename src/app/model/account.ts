import {Role} from './role';
import {Category} from './category';

export class Accounts {
  accountId: string;
  accountName: string;
  phoneNumber: string;
  email: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  gender: string;
  birthday: string;
  status: string;
  password: string;
  token: string;
  category: Category;
  role: Role[];
}
