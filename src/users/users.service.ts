import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { v4 as uuid } from 'uuid'
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly users: UserDTO[] = []

    create(newUser: UserDTO) {
        newUser.id = uuid();
        newUser.password = bcryptHashSync(newUser.password, 10);
        this.users.push(newUser)
    }

    findAllCustom() {
        return this.users
    }

    findByUserName(username: string): UserDTO | null {
        return this.users.find(user => user.username = username)!;
    }
}
