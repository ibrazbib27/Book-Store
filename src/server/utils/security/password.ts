import * as bcrypt from "bcrypt";


export const HashPassword = (content: string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(content, salt);
};

export const ComparePasswords =  (password: string, hash: string) => {
        return bcrypt.compareSync(password, hash);
};
