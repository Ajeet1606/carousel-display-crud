

export interface BannerType {
  id: number;
  name: string;
  timer: number;
  image: string;
  about: string;
  visible: boolean;
  link: string;
}

export interface BannerTableType {
  id: string;
  key: string;
  name: string;
  timer: number;
  image: string;
  about: string;
  visible: boolean;
  link: string;
}

export interface CreateBannerType {
  name: string;
  timer: number;
  image: string;
  about: string;
  link: string;
  visible: boolean;
}