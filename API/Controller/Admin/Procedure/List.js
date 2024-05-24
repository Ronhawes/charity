const prisma = require("../../../Prisma");

const {
  formatOrder,
  formatFilter,
  updateWhere,
  rangeFilter,
} = require("../../../Utils/list");

async function List(req, res, next) {
  try {
    const {
      page = 1,
      limit = 10,
      order = "id-desc",
      range,
      filter_method = "and",
    } = req.query;

    const orFilter = [];
    const andFilter = [];
    const orderBy = formatOrder(order);

    rangeFilter({ range, orFilter, andFilter });

    const where = updateWhere({ method: filter_method, andFilter, orFilter });

    const total = await prisma.procedure.count({ where });
    const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);
    const pageCount = Math.ceil(total / pageLimit);

    const offset = pageNumber > 1 ? pageNumber * pageLimit - pageLimit : 0;

    const items = await prisma.procedure.findMany({
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
