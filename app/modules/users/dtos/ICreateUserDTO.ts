export default interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    is_admin?: boolean; 
}