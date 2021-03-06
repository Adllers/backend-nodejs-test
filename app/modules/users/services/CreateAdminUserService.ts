import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Errors from '@shared/errors/Errors';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateAdminUserService {

    constructor(

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
 
    ) {};

    public async execute({ name, email, password }: IRequest): Promise<User | undefined> {

        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new Errors('Email address already used', 400);
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.createAdmin({
            name,
            email,
            password: hashedPassword,
            is_admin: true,
        });
        
        return user;
    }
}

export default CreateAdminUserService;