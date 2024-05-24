const prisma = require("../../../../Prisma");

async function Add(req, res, next) {
  try {
    const { name, severity_id, diagnosis_date, treatment, notes, patient_id } =
      req.body;

    if (!patient_id) {
      throw { custom: true, message: "Patient id required" };
    }

    const patient = await prisma.patient.findUnique({
      where: {
        id: parseInt(patient_id),
      },
    });

    if (!patient) {
      throw { custom: true, message: "Patient not found" };
    }

    if (!name || !severity_id) {
      throw { custom: true, message: "Required fields missing" };
    }

    const data = {
      name,
      severity_id: parseInt(severity_id),

      treatment: treatment || null,
      notes: notes || null,
      patient_id: parseInt(patient_id),
    };

    if (diagnosis_date) {
      const date = new Date(diagnosis_date);
      const isoString = date.toISOString();
      data.diagnosis_date = isoString || null;
    }

    const allergie = await prisma.patient_allergie.create({
      data,
    });

    return res
      .status(200)
      .json({ ...allergie, server_message: "Allergie created" });
  } catch (e) {
    next(e);
  }
}

module.exports = Add;
