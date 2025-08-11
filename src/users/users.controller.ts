import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post()
    create(@Body() user: UserDTO) {
        this.userService.create(user);
    }

    @Get('/custom')
    findAllCustom() {
        return this.userService.findAllCustom();
    }
}
