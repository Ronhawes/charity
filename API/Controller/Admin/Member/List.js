const prisma = require("../../../Prisma");

const {
  formatOrder,
  formatFilter,
  updateWhere,
} = require("./../../../Utils/list");

async function List(req, res, next) {
  try {
    const {
      page = 1,
      limit = 10,
      order = "id-desc",
      gender,
      role,
      staff_type,
      filter_method = "and",
    } = req.query;

    const orFilter = [];
    const andFilter = [];
    const orderBy = formatOrder(order);

    //gender="1,2,3"

    formatFilter({ filter: gender, field: "gender_id", orFilter, andFilter });
    formatFilter({ filter: role, field: "role_id", orFilter, andFilter });
    formatFilter({
      filter: staff_type,
      field: "staff_type_id",
      orFilter,
      andFilter,
    });

    const where = updateWhere({ method: filter_method, andFilter, orFilter });

    const total = await prisma.member.count({ where });
    const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);
    const pageCount = Math.ceil(total / pageLimit);

    const offset = pageNumber > 1 ? pageNumber * pageLimit - pageLimit : 0;

    const items = await prisma.member.findMany({
      where: where,
      orderBy: orderBy,
      skip: offset,
      take: pageLimit,
    });

    return res.status(200).json({
      total,
      total_docs: items.length,
      pages: pageCount,
      hasNextPage: pageCount > pageNumber,
      hasPrevPage: pageCount >= pageNumber && pageNumber > 1,
      docs: items,
      query: {
        where: where,
        orderBy: orderBy,
        skip: offset,
        take: pageLimit,
      },
    });
  } catch (e) {
    next(e);
  }
}

module.exports = List;
