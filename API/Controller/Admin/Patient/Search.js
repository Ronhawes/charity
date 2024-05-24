const prisma = require("../../../Prisma");

const Fuzzy = require("./../../../Utils/Fuzzy");

async function Search(req, res, next) {
  try {
    const { search, limit = 2000 } = req.query;
    if (!search) {
      return res.status(200).json({ docs: [] });
    }

    let pageNumber = 1;

    let docs = [];

    while (true) {
      const pageLimit = parseInt(limit);

      const offset = pageNumber > 1 ? pageNumber * pageLimit - pageLimit : 0;
      const items = await prisma.patient.findMany({
        skip: offset,
        take: pageLimit,
        include: {
          gender: true,
          religion: true,
        },
      });

      if (items.length == 0) {
        break;
      }

      const searchResult = Fuzzy({
        search,
        items: items,
        keys: ["full_name", "email", "phone"],
      });
      if (searchResult.length > 0) {
        docs = [...docs, ...searchResult];
      }

      pageNumber = pageNumber + 1;
    }

    const searchResult = Fuzzy({
      search,
      items: docs,
      keys: ["full_name", "email", "phone"],
    });

    return res
      .status(200)
      .json({ docs: searchResult, length: searchResult.length, pageNumber });
  } catch (e) {
    next(e);
  }
}

module.exports = Search;
