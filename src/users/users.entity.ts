import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('new user added:', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('existing user updated:', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('existing user removed:', this.id);
  }
}
