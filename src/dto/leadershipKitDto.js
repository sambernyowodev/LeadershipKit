
class LeadershipKitDTO {
  constructor(id, nik, name, email, oldPosition, newPosition, oldLevel, newLevel, sendEmailDate, sendEmailStatus) {
    this.id = id;
    this.nik = nik;
    this.name = name;
    this.email = email;
    this.oldPosition = oldPosition;
    this.newPosition = newPosition;
    this.oldLevel = oldLevel;
    this.newLevel = newLevel;
    this.sendEmailDate = sendEmailDate;
    this.sendEmailStatus = sendEmailStatus;
  }
}

module.exports = LeadershipKitDTO;
