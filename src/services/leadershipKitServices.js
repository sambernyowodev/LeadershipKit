const { db, queryType } = require("../config/db");
const employeeDTO = require("../dto/employeeDto");
const { getAuthenticatedClient } = require("./graphClient");
const leadershipKitDTO = require("../dto/leadershipKitDto");
const EMAIL_STATUS = require("../utils/enum").EMAIL_STATUS

async function getAll() {
  const leadershipKits = await db.LeadershipKits.findAll();
  // Create DTO instances for each user
  return leadershipKits.map(
    (leadershipKit) =>
      new leadershipKitDTO(
        leadershipKit.Id,
        leadershipKit.Nik,
        leadershipKit.Name,
        leadershipKit.Email,
        leadershipKit.OldPosition,
        leadershipKit.NewPosition,
        leadershipKit.OldLevel,
        leadershipKit.NewLevel,
        leadershipKit.sendEmailDate,
        leadershipKit.sendEmailStatus,
      )
  );
}

async function getById(id) {
  const leadershipKit = await db.LeadersipKits.findByPk(id);
  // Create a DTO instance
  new leadershipKitDTO(
    leadershipKit.Id,
    leadershipKit.Nik,
    leadershipKit.Name,
    leadershipKit.Email,
    leadershipKit.OldPosition,
    leadershipKit.NewPosition,
    leadershipKit.OldLevel,
    leadershipKit.NewLevel,
    leadershipKit.sendEmailDate,
    leadershipKit.sendEmailStatus
  );
}

async function getByNik(nik) {
  const leadershipKits = await db.LeadershipKits.findAll({
    where: {
      Nik: nik,
    },
  });
  // Create a DTO instance
  return leadershipKits.map(
    (leadershipKit) =>
      new leadershipKitDTO(
        leadershipKit.Id,
        leadershipKit.Nik,
        leadershipKit.Name,
        leadershipKit.Email,
        leadershipKit.OldPosition,
        leadershipKit.NewPosition,
        leadershipKit.OldLevel,
        leadershipKit.NewLevel,
        leadershipKit.sendEmailDate,
        leadershipKit.sendEmailStatus,
      )
  );
}

async function getNotSentEmailStatus() {
  const leadershipKits = await db.LeadershipKits.findAll({
    where: {
      [Op.or]: [{ SendEmailStatus: EMAIL_STATUS.FAILED }, { SendEmailStatus: EMAIL_STATUS.PENDING }],
    },
  });
  // Create a DTO instance
  return leadershipKits.map(
    (leadershipKit) =>
      new leadershipKitDTO(
        leadershipKit.Id,
        leadershipKit.Nik,
        leadershipKit.Name,
        leadershipKit.Email,
        leadershipKit.OldPosition,
        leadershipKit.NewPosition,
        leadershipKit.OldLevel,
        leadershipKit.NewLevel,
        leadershipKit.sendEmailDate,
        leadershipKit.sendEmailStatus,
      )
  );
}

async function getPromotionEmployee() {
  const employees = await db.query(
    `SELECT * FROM hcis_comcar.esk_lists WHERE tipe LIKE "Promosi Mutasi Lokal" 
	      OR tipe LIKE "Promosi Mutasi Nasional" 
	      OR tipe LIKE "Promosi Rotasi Mutasi Lokal" 
	      OR tipe LIKE "Promosi Rotasi Mutasi Nasional"`,
    {
      type: queryType.SELECT,
    }
  );
  // Create a DTO instance
  return employees.map(
    (employee) =>
      new employeeDTO(
        employee.nik,
        employee.nama,
        employee.email,
        employee.tipe,
        employee.old_position,
        employee.New_position,
        employee.old_bp,
        employee.new_bp,
        employee.old_bi,
        employee.new_bi,
        employee.structural,
        employee.functional,
      )
  );
}

async function getLeadershipKitByEmployee(nik, level) {
  const leadershipKits = await db.LeadershipKits.findAll({
    where: {
      Nik: nik,
      OldLevel: level,
    },
  });
  // Create a DTO instance
  return leadershipKits.map(
    (leadershipKit) =>
      new leadershipKitDTO(
        leadershipKit.Id,
        leadershipKit.Nik,
        leadershipKit.Name,
        leadershipKit.Email,
        leadershipKit.OldPosition,
        leadershipKit.NewPosition,
        leadershipKit.OldLevel,
        leadershipKit.NewLevel,
        leadershipKit.sendEmailDate,
        leadershipKit.sendEmailStatus
      )
  );
}

async function createLeadershipKit(data) {
  const { nik, name, email, oldPosition, newPosition, oldLevel, newLevel, sendEmailStatus } = data;
  const leadershipKit = await db.LeadershipKits.create({
    Id: crypto.randomUUID(),
    Nik: nik,
    Name: name,
    Email: email,
    OldPosition: oldPosition,
    NewPosition: newPosition,
    OldLevel: oldLevel,
    NewLevel: newLevel,
    SendEmailDate: new Date(),
    SendEmailStatus: sendEmailStatus,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Create a DTO instance
  return new leadershipKitDTO(
    leadershipKit.Id,
    leadershipKit.Nik,
    leadershipKit.Name,
    leadershipKit.Email,
    leadershipKit.OldPosition,
    leadershipKit.NewPosition,
    leadershipKit.OldLevel,
    leadershipKit.NewLevel,
    leadershipKit.sendEmailDate,
    leadershipKit.sendEmailStatus
  );
}

async function updateSendEmailStatus(id, sendEmailStatus) {
  await db.LeadershipKits.update(
    {
      sendEmailDate: new Date(),
      sendEmailStatus: sendEmailStatus,
      updatedAt: new Date(),
    },
    {
      where: {
        Id: id,
      },
    }
  );

  return getUserById(id);
}

async function deleteLeadershipKit(id) {
  await db.LeadershipKits.destroy({
    where: { Id: id },
  });
}

async function sendEmailLeadershipKit(email) {
  const siteId = "YOUR_SITE_ID";
  const fileId = "YOUR_FILE_ID";
  try {
    const file = await getFileFromSharePoint(siteId, fileId);
    const attachmentPath = file.webUrl; // Use the web URL or download the file to a local path
    await sendEmail(
      email,
      "Subject Here",
      "Email body here",
      attachmentPath
    );
  } catch (error) {
    throw new Error("Error sending email: " + error.message);
  }
}

const getFileFromSharePoint = async (siteId, fileId) => {
  const client = getAuthenticatedClient();
  const file = await client.api(`/sites/${siteId}/drive/items/${fileId}`).get();
  return file;
};

module.exports = {
  getByNik,
  getAll,
  getById,
  getNotSentEmailStatus,
  getPromotionEmployee,
  getLeadershipKitByEmployee,
  createLeadershipKit,
  updateSendEmailStatus,
  deleteLeadershipKit,
  sendEmailLeadershipKit,
};
