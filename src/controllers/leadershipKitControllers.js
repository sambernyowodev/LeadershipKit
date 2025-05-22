const logger = require("../middleware/logger");
const leadershipKitService = require("../services/leadershipKitServices");
const EMAIL_STATUS = require("../utils/enum").EMAIL_STATUS;

async function leadershipKit(req, res) {
  try {
    // Check if email status
    const leadershipKits = await leadershipKitService.getNotSentEmailStatus();
    if (leadershipKits.length > 0) {
      for (const leadershipKit of leadershipKits) {
        // Send Email
        leadershipKitService.sendEmail(leadershipKit.Email);
        // Update Send Email Status
        await leadershipKitService.updateSendEmailStatus(leadershipKit.Id, EMAIL_STATUS.SENT);
        logger.info("Leadership Kit data update email status", {
          Id: leadershipKit.Id,
          Nik: leadershipKit.Nik,
          Name: leadershipKit.Name,
          SendEmailDate: leadershipKit.SendEmailDate,
          SendEmailStatus: leadershipKit.sendEmailStatus,
        });
      }
    }

    const employees = leadershipKitService.getPromotionEmployee();
    if (employees.length > 0) {
      for (const employee of employees) {
        // Check data in Leadership Kit Table
        const found = await leadershipKitService.getLeadershipKitByEmployee(employee.Nik,employee.oldBI);
        if (found.length > 0) {
          logger.info("Data Leadership Kit data already exists for employee ", { Nik: employee.Nik });
          continue;
        }

        // Check Position
        if ((employee.oldPosition === "Structural" && employee.newPosition === "Structural" && employee.newBI >= 3) ||
          (employee.oldPosition === "Functional" && employee.newPosition === "Structural" && employee.newBI >= 3)) 
        {
          //Send Email
          leadershipKitService.sendEmail(employee.Email);

          // Create Leadership Kit
          const leadershipKit = await leadershipKitService.createLeadershipKit({
            nik: employee.Nik,
            name: employee.Name,
            email: employee.Email,
            oldPosition: employee.oldPosition,
            newPosition: employee.newPosition,
            oldLevel: employee.oldBI,
            newLevel: employee.newBI,
            sendEmailStatus: EMAIL_STATUS.SENT,
          });

          logger.info("Leadership Kit data created", {
            Id: leadershipKit.Id,
            Nik: leadershipKit.Nik,
            Name: leadershipKit.Name,
            SendEmailDate: leadershipKit.SendEmailDate,
            SendEmailStatus: leadershipKit.sendEmailStatus,
          });
        }
      }
    }

    res.status(200).json({ message: "Email Leadership kit Sent Succesfully" });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  leadershipKit,
};
