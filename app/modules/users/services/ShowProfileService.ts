import { inject, injectable } from 'tsyringe';

import Errors from '@shared/errors/Errors';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
    user_id: string;
}

@injectable()
class ShowProfileService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

    ) {};

    public async execute({ user_id}: IRequest): Promise<User> {
        
        const user = await this.usersRepository.findById(user_id);

        if(!user) {
           throw new Errors('User not found'); 
        }

        return user;
    };
}

export default ShowProfileService;