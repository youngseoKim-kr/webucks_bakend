const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// select A.name AS categories_name , B.korean_name , B.english_name , C.image_url ,D.name, E.caffein, E.fat, E.sugar,E.sodium
// FROM categories AS A
// LEFT JOIN products B ON A.id = B.category_id
// LEFT JOIN product_images C ON B.id = C.product_id
// LEFT JOIN products_allergies F ON F.product_id = B.id
// LEFT JOIN allergies D ON D.id = F.allergy_id
// LEFT JOIN nutritions E ON E.product_id = B.id

// SELECT
//     p.id AS id,
//     p.korean_name AS KoreanName,
//     p.english_name AS englishName,
//     c.name AS category,
//     c.id AS categoryId,
//     JSON_ARRAYAGG(image_url)  //배열 사용
//     from products p
//     join categories c on p.category_id = c.id
//     join product_images pi on pi.product_id = p.id
//     group by p.id

// SELECT
//     p.id AS id,
//     p.korean_name AS KoreanName,
//     p.english_name AS englishName,
//     pi.image_url AS imageURL,
//     // pa.id
//     // pa.product_id AS p_id,
//     // pa.allergt_id AS a_id,
//     pa.name
//     JSON_ARRAYAGG(a.name)
//     a.name
//     from products p
//     join product_images pi on product_id = p.id
//     left join proudct_allergies pa on pa.product_id = p.id
//     left join allergies a on pa.allergy_id = a.id
// group by p.id

const product_2 = async (req, res) => {
  const selectDetails = await prisma.$queryRaw`
    select A.name AS categories_name , B.korean_name , B.english_name , C.image_url ,
    CONCAT('[',
    GROUP_CONCAT(
      JSON_OBJECT('id', D.id, 'name' , D.name)
    ),
    ']') AS allergies,
    JSON_OBJECT('caffein : ' ,E.caffein, ' fat : ', E.fat, ' sugar : ', E.sugar,' sodium : ', E.sodium) AS Nutritions
    FROM categories AS A 
    LEFT JOIN products B ON A.id = B.category_id 
    LEFT JOIN product_images C ON B.id = C.product_id 
    LEFT JOIN products_allergies F ON F.product_id = B.id 
    LEFT JOIN allergies D ON D.id = F.allergy_id 
    RIGHT JOIN nutritions E ON E.product_id = B.id  
    GROUP BY A.name,  B.korean_name, C.image_url,E.caffein, E.fat, E.sugar, E.sodium ;
     `;
  res.json(selectDetails);
};

module.exports = { product_2 };
