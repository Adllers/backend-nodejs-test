import { getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import ICreateAdminUserDTO from '@modules/users/dtos/ICreateAdminUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../entities/User';


class UsersRepository implements IUsersRepository {

    private ormRepository:Repository<User>;

    constructor() {
        //Buscando o repo de user
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }

    
    public async findUsersByCompanyId(company_id: string): Promise<User[]> {
        
        let users: User[] = [];

        if (company_id) {

            users = await this.ormRepository.find({
                where: {
                    company_id
                }
            }); 

            return users ;

        } else {

            return [];
        
        }
    }

    public async create(userData: ICreateUserDTO): Promise<User> {

        const user = this.ormRepository.create(userData);

        await this.ormRepository.save(user);

        return user;

    }

    public async createAdmin(userData: ICreateAdminUserDTO): Promise<User> {

        const user = this.ormRepository.create(userData);

        await this.ormRepository.save(user);

        return user;

    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;