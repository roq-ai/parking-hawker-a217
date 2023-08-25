import { UserInterface } from 'interfaces/user';
import { ParkingSpaceInterface } from 'interfaces/parking-space';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  start_time: any;
  end_time: any;
  user_id: string;
  parking_space_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  parking_space?: ParkingSpaceInterface;
  _count?: {};
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  parking_space_id?: string;
}
