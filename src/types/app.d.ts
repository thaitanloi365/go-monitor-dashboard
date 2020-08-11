export type ISubscribeStatus = 'Subscribed' | 'Unsubscribed';
export type IOrderStatus = 'opening' | 'adding_item' | 'completed';

export interface INotificationPayload {}

export interface AppConstants {
  term_url: string;
  privacy_url: string;
  districts: IDistrict[];
}

export interface INotificationItem {
  title: string;
  date: Date;
}
export interface IDistrict {
  name: string;
  alias: string;
}

export interface IProvince {
  name: string;
  alias: string;
}

export interface IImage {
  image_url: string;
  thumbnail_image_url: string;
  width: number;
  height: number;
}
export interface IBusinessOpeningHour {
  day: number;
  start: string;
  end: string;
}

export interface IBusinessCoordinate {
  latitude: number;
  longitude: number;
  address: string;
  google_place_id: string;
}

export interface IFood {
  id: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  business_menu_category: string;
  name: string;
  category: string;
  price: number;
  discount: number;
  price_after_discount: number;
  images: IImage[];
}
export interface IBusinessMenu {
  name: string;
  items: IFood[];
  images: IImage[];
}
// businessReview review
export interface IBusinessReview {
  id: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  reviewer: IUser;
  rating: number;
  content: string;
  images: IImage[];
}

export interface IBusiness {
  id: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;

  name: string;
  rating: number;
  district: IDistrict;
  coordinates: IBusinessCoordinate[];
  hours: IBusinessOpeningHour[];
  images: IImage[];
  menus: IBusinessMenu[];
  reviews: IBusinessReview[];
}
export interface ISearchResponse {
  latitude: number;
  longitude: number;
  address: string;
  google_place_id: string;
}

export interface IMenuItem {
  id: string;
  icon?: string;
  name?: string;
  route: string;
  breadcrumbParentId?: string;
  menuParentId?: string;
}
export interface IUserDevice {
  id: number;
  token: string;
  platform: 'ios' | 'android';
}

export interface IUserSetting {
  biometry_enabled: boolean;
}

export interface IUser {
  id: number;
  updated_at: number;
  created_at: number;
  deleted_at: number;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  last_login: number;
  logged_out_at: number;
  phone: string;

  devices: IUserDevice[];
  app_version: string;
  birthday: string;

  firebase_user_id: string;
  timezone: string;

  setting: IUserSetting;
  token: string;
}

export interface IPost {
  id: number;
  updated_at: number;
  created_at: number;
  deleted_at: number;

  owner_id: string;
  owner: IUser;
  image_url: string;
  thumbnail_url: string;
  title: string;
  content: string;
}
