const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categories = async () => {
  const selectcategories = await prisma.$queryRaw`
    SELECT *  FROM categories;`;

  return selectcategories;
};

const products = async () => {
  const selectproducts = await prisma.$queryRaw`
  SELECT
      p.id AS id,
      p.korean_name AS KoreanName,
      p.english_name AS englishName,
      c.name AS category,
      c.id AS categoryId,
      JSON_ARRAYAGG(image_url) 
      from products p
      join categories c on p.category_id = c.id
      join product_images pi on pi.product_id = p.id
      group by p.id;`;

  return selectproducts;
};

const detail = async () => {
  const selectDetails = await prisma.$queryRaw`
  SELECT
    p.id AS id,
    p.korean_name AS KoreanName,
    p.english_name AS englishName,
    pi.image_url AS imageURL,
    JSON_ARRAYAGG(a.name)
    from products p
    join product_images pi on pi.product_id = p.id
    left join products_allergies pa on pa.product_id = p.id
    left join allergies a on pa.allergy_id = a.id
    group by p.id;
   `;
  return selectDetails;
};

module.exports = { categories, products, detail };
