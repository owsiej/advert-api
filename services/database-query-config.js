function mapDatabaseFilter(key, val) {
  const filterMapper = {
    title: {
      title: {
        $regex: val,
        $options: "i",
      },
    },
    description: {
      description: {
        $regex: val,
        $options: "i",
      },
    },
    author: {
      author: {
        $regex: new RegExp(`^${val}$`),
        $options: "i",
      },
    },
    category: {
      category: {
        $regex: new RegExp(`^${val}$`),
        $options: "i",
      },
    },
    tags: {
      tags: {
        $elemMatch: {
          $in: val,
        },
      },
    },
    priceGte: {
      price: {
        $gte: val,
      },
    },
    priceLte: {
      price: {
        $lte: val,
      },
    },
    createdAfter: {
      creationTime: {
        $gte: val,
      },
    },
  };
  return filterMapper[key];
}

module.exports = mapDatabaseFilter;
