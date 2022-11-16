import { errorHandler } from "../errors/errorsHandler.js";
import { read, write } from "../utils/FS.js";
import { catigoriesPost, catigoriesPut } from "../validate/validate.js";

const GET = async (req, res, next) => {
  const { error, value } = catigoriesPut.validate(req.params);

  if (error) {
    return next(new errorHandler(error.message, 400));
  }
  const { id } = value;

  const category = await read("categories.model.json").catch((error) =>
    next(new errorHandler(error, 500))
  );
  const subCategories = await read("subCategories.model.json").catch((error) =>
    next(new errorHandler(error, 500))
  );
  const categorys = category.find((e) => e.category_id == id);

  if (!categorys) {
    return next(new errorHandler("Id is not found", 500));
  }
  const data = [categorys].map((e) => {
    e.categoryId = e.category_id;
    e.categoryName = e.category_name;
    e.subCategories = e.subCategories;
    e.subCategories = [];
    delete e.category_id;
    delete e.category_name;
    subCategories.filter((m) => {
      m.subCategoryId = m.sub_category_id;
      m.subCategoryName = m.sub_category_name;
      delete m.sub_category_id;
      delete m.sub_category_name;
      if (m.category_id == e.categoryId && delete m.category_id) {
        e.subCategories.push(m);
      }
    });
    return e;
  });

  res.send(data);
};

const CATEGORIESGET = async (req, res, next) => {
  const category = await read("categories.model.json").catch((error) =>
    next(new errorHandler(error, 500))
  );
  const subCategories = await read("subCategories.model.json").catch((error) =>
    next(new errorHandler(error, 500))
  );
  const data = category.map((e) => {
    e.categoryId = e.category_id;
    e.categoryName = e.category_name;
    e.subCategories = e.subCategories;
    e.subCategories = [];
    delete e.category_id;
    delete e.category_name;

    subCategories.map((m) => {
      if (m.category_id == e.categoryId && delete m.category_id) {
        m.subCategoryId = m.sub_category_id;
        m.subCategoryName = m.sub_category_name;
        delete m.sub_category_id;
        delete m.sub_category_name;
        e.subCategories.push(m);
      }
    });
    return e;
  });

  const { categoryId, categoryName } = req.query;

  const dataFilter = data.filter((e) => {
    const categoryid = categoryId ? e.categoryId == categoryId : true;
    const categoryname = categoryName
      ? e.categoryName.toLowerCase().includes(categoryName.toLowerCase())
      : true;

    return categoryid && categoryname;
  });

  res.send(dataFilter);
};

const CATEGORIESPOST = async (req, res, next) => {
  const { error, value } = catigoriesPost.validate(req.body);

  if (error) {
    return next(new errorHandler(error.message, 400));
  }
  const { category_name } = value;

  const category = await read("categories.model.json").catch((error) =>
    next(new errorHandler(error, 500))
  );

  category.push({
    category_id: category.at(-1)?.category_id + 1 || 1,
    category_name,
  });

  const newCategort = await write("categories.model.json", category).catch(
    (error) => next(new errorHandler(error, 500))
  );

  if (newCategort) {
    return res.status(200).json({
      message: "Put categort name",
      status: 200,
    });
  }
};

const CATEGORIESPUT = async (req, res, next) => {
  const { error, value } = catigoriesPut.validate(req.params);

  if (error) {
    return next(new errorHandler(error.message, 400));
  }
  const { id } = value;

  const { error: errors, value: values } = catigoriesPost.validate(req.body);

  if (errors) {
    return next(new errorHandler(errors.message, 400));
  }
  const { category_name } = values;

  const category = await read("categories.model.json").catch((error) =>
    next(new errorHandler(error, 500))
  );

  const categoryFind = category.find((e) => e.category_id == id);

  if (!categoryFind) {
    return next(new errorHandler("Id is not found", 500));
  }

  categoryFind.category_name = category_name || categoryFind.category_name;

  console.log(category);
  const newcategory = await write("categories.model.json", category).catch(
    (error) => next(new errorHandler(error, 500))
  );

  if (newcategory) {
    return res.status(200).json({
      message: "Put became",
    });
  }
};

const CATEGORIESDELETE = async (req, res, next) => {
  const { error, value } = catigoriesPut.validate(req.params);

  if (error) {
    return next(new errorHandler(error.message, 400));
  }
  const { id } = value;

  const category = await read("categories.model.json").catch((error) =>
    next(new errorHandler(error, 500))
  );
  const newcategoryFind = category.find((e) => e.category_id == id);

  if (!newcategoryFind) {
    return next(new errorHandler("Id is not found", 500));
  }

  const categoryFind = category.findIndex((e) => e.category_id == id);

  category.splice(categoryFind, 1);

  const newcategory = await write("categories.model.json", category).catch(
    (error) => next(new errorHandler(error, 500))
  );

  if (newcategory) {
    return res.status(200).json({
      message: "Delete became",
    });
  }
};

export { CATEGORIESGET, GET, CATEGORIESPOST, CATEGORIESPUT, CATEGORIESDELETE };
