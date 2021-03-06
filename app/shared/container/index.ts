
import { container } from 'tsyringe';

// relativo a instância do hashProvider que usa bcrypt no password
import '@modules/users/providers';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import CompaniesRepository from '@modules/companies/infra/typeorm/repositories/CompaniesRepository';


container.registerSingleton<ICompaniesRepository>('CompaniesRepository', CompaniesRepository);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);