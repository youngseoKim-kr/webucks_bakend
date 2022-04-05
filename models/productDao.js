const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categories = async () => {
  const selectcategories = await prisma.$queryRaw`
    SELECT *  FROM categories;`;

  return selectcategories;
};

const products = async (id) => {
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
      group by p.id
      having p.id = ${id};
      `;

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

const selectusertable = async (user_id) => {
  const selectusertable = await prisma.$queryRaw`
    select id 
    from users 
    where id = ${user_id};
   `;
  return selectusertable;
};

const selectproducttable = async (product_id) => {
  const selectproducttable = await prisma.$queryRaw`
    select id 
    from products 
    where id = ${product_id};
   `;
  return selectproducttable;
};

const selectuser = async (user_id, product_id) => {
  const selectuser = await prisma.$queryRaw`
    select * 
    from products_likes 
    where users_id = ${user_id} AND
    product_id = ${product_id}
    ;
   `;
  return selectuser;
};

const insertuser = async (user_id, product_id) => {
  const insertuser = await prisma.$queryRaw`
   insert into 
   products_likes (users_id, product_id)
   values (${user_id}, ${product_id});
   `;
  return insertuser;
};

const updateuser = async (user_id, product_id) => {
  const updateuser = await prisma.$queryRaw`
   update products_likes
   set Is_like = IF (Is_like = 0, 1, 0 )
   where users_id = ${user_id} AND
    product_id = ${product_id}
   `;
  return updateuser;
};

const commentInsert = async (product_id, content, id) => {
  const commentInsert = await prisma.$queryRaw`
   INSERT INTO products_P_comments (users_id, product_id, content)
   `;
  return commentInsert;
}

module.exports = {
  categories,
  products,
  detail,
  selectuser, 
  insertuser,
  updateuser,
  selectusertable,
  selectproducttable,
};
