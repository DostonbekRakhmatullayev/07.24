import { errorHandler } from "../errors/errorsHandler.js";
import { read, write } from "../utils/FS.js";
import { subCategoriesId, subCategoriesPost } from "../validate/validaye.js";

const SUBCATEGORIESGETID = async (req, res, next) => {
  const { error, value } = subCategoriesId.validate(req.params);

  if (error) {
    return next(new errorHandler(error.message, 400));
  }
  const { id } = value;

  const subCategories = await read("subCategories.model.json").catch((error) =>
    next(new errorHandler(error, 500))
  );
  const products = await read("products.model.json").catch((error) =>
    next(new errorHandler(error, 500))
  );

  const newsubCategories = subCategories.find((e) => e.sub_category_id == id);

  if (!newsubCategories) {
    return next(new errorHandler("Id is not found", 500));
  }
  const data = [newsubCategories].map((e) => {
    e.subCategoryId = e.sub_category_id;
    e.subCategoryName = e.sub_category_name;
    e.products = [];
    delete e.category_id;
    delete e.sub_category_id;
    delete e.sub_category_name;
    products.filter((m) => {
      m.productName = m.product_name;
      if (m.sub_category_id == e.subCategoryId) {
        delete m.product_name;
        delete m.sub_category_id;
        e.products.push(m);
      }
    });
    return e;
  });

  res.send(data);
};

const SUBCATEGORIESGET = async (req, res, next) => {

  const subCategories = await read("subCategories.model.json").catch((error) =>
    next(new errorHandler(error, 500))
  );
  const products = await read("products.model.json").catch((error) =>
    next(new errorHandler(error, 500))
  );
  const data = subCategories.map((e) => {
    e.subCategoryId = e.sub_category_id;
    e.subCategoryName = e.sub_category_name;
    e.products = [];
    delete e.category_id
    delete e.sub_category_id;
    delete e.sub_category_name;

    products.map((m) => {
      if (m.sub_category_id == e.subCategoryId && delete m.sub_category_id) {
        m.productName = m.product_name
        delete m.product_name;
        e.products.push(m);
      }
    });
    return e;
  });

  const { subCategoryId, subCategoryName } = req.query;

  const dataFilter = data.filter((e) => {
    const categoryid = subCategoryId ? e.subCategoryId == subCategoryId : true;
    const categoryname = subCategoryName
      ? e.subCategoryName.toLowerCase().includes(subCategoryName.toLowerCase())
      : true;

    return categoryid && categoryname;
  });

  res.send(dataFilter);
};

const SUBCATEGORIESPOST = async (req, res, next) => {
  const { error, value } = subCategoriesPost.validate(req.body);

  if (error) {
    return next(new errorHandler(error.message, 400));
  }
  const { category_id, sub_category_name } = value;

  const subCategories = await read("subCategories.model.json").catch((error) =>
    next(new errorHandler(error, 500))
  );

  subCategories.push({
    sub_category_id: subCategories.at(-1)?.sub_category_id + 1 || 1,
    category_id,
    sub_category_name,
  });

  const newsubCategories = await write(
    "subCategories.model.json",
    subCategories
  ).catch((error) => next(new errorHandler(error, 500)));

  if (newsubCategories) {
    return res.status(200).json({
      message: "Put subCategories name",
      status: 200,
    });
  }
};

const SUBCATEGORIESPUT = async (req, res, next) => {
  const { error, value } = subCategoriesId.validate(req.params);

  if (error) {
    return next(new errorHandler(error.message, 400));
  }
  const { id } = value;

  const { error: errors, value: values } = subCategoriesPost.validate(req.body);

  if (errors) {
    return next(new errorHandler(errors.message, 400));
  }
  const { category_id, sub_category_name } = values;

  const subCategories = await read("subCategories.model.json").catch((error) =>
    next(new errorHandler(error, 500))
  );

  const subCategoriesFind = subCategories.find((e) => e.sub_category_id == id);

  if (!subCategoriesFind) {
    return next(new errorHandler("Id is not found", 500));
  }

  subCategoriesFind.category_id = category_id || subCategoriesFind.category_id;
  subCategoriesFind.sub_category_name =
    sub_category_name || subCategoriesFind.sub_category_name;

  const newsubCategories = await write(
    "subCategories.model.json",
    subCategories
  ).catch((error) => next(new errorHandler(error, 500)));

  if (newsubCategories) {
    return res.status(200).json({
      message: "Put became",
    });
  }
};

const SUBCATEGORIESDELETE = async (req, res, next) => {
  const { error, value } = subCategoriesId.validate(req.params);

  if (error) {
    return next(new errorHandler(error.message, 400));
  }
  const { id } = value;

  const subCategories = await read("subCategories.model.json").catch((error) =>
    next(new errorHandler(error, 500))
  );
  const newsubCategoriesFind = subCategories.find(
    (e) => e.sub_category_id == id
  );

  if (!newsubCategoriesFind) {
    return next(new errorHandler("Id is not found", 500));
  }

  const subCategoriesFindIndex = subCategories.findIndex(
    (e) => e.sub_category_id == id
  );

  subCategories.splice(subCategoriesFindIndex, 1);

  const newsubCategories = await write(
    "subCategories.model.json",
    subCategories
  ).catch((error) => next(new errorHandler(error, 500)));

  if (newsubCategories) {
    return res.status(200).json({
      message: "Delete became",
    });
  }
};

export {
  SUBCATEGORIESGET,
  SUBCATEGORIESGETID,
  SUBCATEGORIESPOST,
  SUBCATEGORIESPUT,
  SUBCATEGORIESDELETE,
};
