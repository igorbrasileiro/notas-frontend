interface User {
  role: string;
}

interface UserById {
  [key: string]: User;
}

export interface UserReduceState {
  allIds: string[];
  byId: UserById;
  loggedUserId: string;
}
