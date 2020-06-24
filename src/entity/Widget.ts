import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Widget {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length:256
    })
    name: string;

    @Column()
    deleted: boolean;

}
