export class GetUserDTO{
    constructor(userDB){
        this.first_name = userDB.first_name;
        this.last_name = userDB.last_name;
        this.full_name = userDB.first_name + " " + userDB.last_name;
        this.email = userDB.email;
        this.age = userDB.age;
        this.role = userDB.role;
    }
}