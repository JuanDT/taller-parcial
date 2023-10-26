// user.model.ts

export class User {
    id: number;
    name: string;
    email: string;
    userType: string;
    createdDate: Date;
    observations: string;
  
    constructor(
      id: number,
      name: string,
      email: string,
      userType: string,
      createdDate: Date,
      observations: string
    ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.userType = userType;
      this.createdDate = createdDate;
      this.observations = observations;
    }
  }
  