import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { CustomBaseEntity } from "./CustomBaseEntity";

@Entity()
export class Banner extends CustomBaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column({
    type: "text",
  })
  about: string;

  @Column()
  timer: number;

  @Column()
  image: string;

  @Column()
  visible: boolean;
}
