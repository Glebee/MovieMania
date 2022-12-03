import Serial from './Serial';

interface User{
    mail: string,
    password: string, 
    serials: Serial[],
    id: number
}

export default User