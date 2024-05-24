const prisma = require("./../../../Prisma");

async function List(req, res, next) {
  try {
    const { page = 1, limit = 10, order } = req.query;

    const total = await prisma.role.count();

    let orderBy = {};
    if (order) {
      if (order.includes("-")) {
        let str = order.split("-");
        orderBy[str[0]] = str[1];
      }
    } else {
      orderBy = { id: "desc" };
    }
    const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);
    const pageCount = Math.ceil(total / pageLimit);

    const offset = pageNumber > 1 ? pageNumber * pageLimit - pageLimit : 0;

    let items = await prisma.role.findMany({
      orderBy: orderBy,
      skip: offset,
      take: pageLimit,
    });

    return res.status(200).json({
      total: total,
      total_docs: items.length,
      pages: pageCount,
      hasNextPage: pageCount > pageNumber,
      hasPrevPage: pageCount >= pageNumber && pageNumber > 1,
      docs: items,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = List;
