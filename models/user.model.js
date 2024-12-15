class userModel {
  constructor() {
      this.users = new Map();
      this.userId = 1;
  }

  // User methods
  createUser(userData) {
      const id = this.userId++;
      const user = { id, ...userData };
      this.users.set(id, user);
      return user;
  }

  findUserByUsername(username) {
      return Array.from(this.users.values()).find(user => user.username === username);
  }

  findUserById(id) {
      return this.users.get(id);
  }

}

const db = new userModel();
module.exports = db;