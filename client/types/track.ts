export interface IComment {
  id: string;
  username: string;
  text: string;
}

export interface ITrack {
  id: string;
  name: string;
  artist: string;
  text: string;
  listeners: number;
  picture: string;
  audio: string;
  comments: IComment[];
}
