const prisma = require("../../../Prisma");

const { formatOrder, inFilter, inRange } = require("./../../../Utils/list");

async function List(req, res, next) {
  try {
    const {
      page = 1,
      limit = 10,
      order = "id-desc",
      gender = "",
      dob_gte = "",
      dob_lte = "",
    } = req.query;

    const whereDoc = {};
    const orderBy = formatOrder(order);

    inFilter({ filter: gender, whereDoc, field: "gender_id" });
    inRange({
      rangeGte: dob_gte,
      rangeLte: dob_lte,
      whereDoc,
      field: "dob",
      type: "date",
    });

    const total = await prisma.patient.count({ where: whereDoc });
    const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);
    const pageCount = Math.ceil(total / pageLimit);

    const offset = pageNumber > 1 ? pageNumber * pageLimit - pageLimit : 0;

    const items = await prisma.patient.findMany({
      where: whereDoc,
      orderBy: orderBy,
      skip: offset,
      take: pageLimit,
      include: {
        gender: true,
        religion: true,
      },
    });

    return res.status(200).json({
      pagination: {
        total,
        total_docs: items.length,
        pages: pageCount,
        hasNextPage: pageCount > pageNumber,
        hasPrevPage: pageCount >= pageNumber && pageNumber > 1,
      },
      query: {
        where: whereDoc,
        orderBy: orderBy,
        skip: offset,
        take: pageLimit,
      },
      docs: items,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = List;
