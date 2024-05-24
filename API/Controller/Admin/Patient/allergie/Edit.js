const prisma = require("./../../../../Prisma");

async function Edit(req, res, next) {
  try {
    const { id, name, severity_id, diagnosis_date, treatment, notes } =
      req.body;

    if (!id) {
      throw { custom: true, message: "Allergie id required" };
    }

    const allergie = await prisma.patient_allergie.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!allergie) {
      throw { custom: true, message: "Allergie not found" };
    }

    const data = {};

    if (name) {
      data.name = name;
    }

    if (severity_id) {
      data.severity_id = severity_id;
    }

    if (diagnosis_date) {
      const date = new Date(diagnosis_date);
      const isoString = date.toISOString();
      data.diagnosis_date = isoString || null;
    }

    if (treatment) {
      data.treatment;
    }

    if (notes) {
      data.notes;
    }

    let d = new Date(Date.now());
    data.updated_at = d.toISOString();

    const updatedAllergie = await prisma.patient_allergie.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    return res.status(200).json({
      ...updatedAllergie,
      server_message: "Allergie updated successfully",
    });
  } catch (e) {
    next(e);
  }
}

module.exports = Edit;
