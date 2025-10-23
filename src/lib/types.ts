interface IJoinedUser {
  userId: string;
  name: string;
  joinedAt?: Date;
}

export interface IRoom {
  roomName: string;
  limit: number;
  difficulty: "easy" | "medium" | "hard";
  type: string;
  hostId: string;
  joinedUsers:IJoinedUser[]
}

