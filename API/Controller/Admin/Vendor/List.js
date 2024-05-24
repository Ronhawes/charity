const prisma = require("../../../Prisma");

const {
  formatOrder,
  formatFilter,
  updateWhere,
  rangeFilter,
} = require("./../../../Utils/list");

async function List(req, res, next) {
  const { page = 1, limit = 10, order, filter_method = "and" } = req.querry;

  const orFilter = [];
  const andFilter = [];
}

module.exports = List;
