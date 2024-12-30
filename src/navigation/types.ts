import { HeritageSite } from '../types/heritage';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Reports: undefined;
  Heritage: undefined;
  Profile: undefined;
};

export type HeritageStackParamList = {
  HeritageList: undefined;
  HeritageDetail: { site: HeritageSite };
};