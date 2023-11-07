import { Module } from "@nestjs/common";
import { UsersController } from "./users.controllers";
import { UserService } from "./users.services";

@Module({
    controllers:[UsersController],
    providers:[UserService]
})
export class UsersModule{}