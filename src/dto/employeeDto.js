
class EmployeeDTO {
  constructor(nik, name, email, tipe, oldPosition, newPosition, oldBP, newBP, oldBI, newBI, structural, functional) {
    this.nik = nik;
    this.name = name;
    this.email = email;
    this.tipe = tipe;
    this.oldPosition = oldPosition;
    this.newPosition = newPosition;
    this.oldBP = oldBP;
    this.newBP = newBP;
    this.oldBI = oldBI;
    this.newBI = newBI;
    this.structural = structural;
    this.functional = functional;
  }
}

module.exports = EmployeeDTO;
