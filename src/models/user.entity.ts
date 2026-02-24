import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { CustomerRat } from './customer-rat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  @JoinColumn({ name: 'user_profile_id' })
  user_profile: UserProfile;

  @OneToMany(() => CustomerRat, (rat) => rat.createdBy)
  created_rats: CustomerRat[];
}
