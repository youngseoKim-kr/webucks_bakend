const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const heartColor = async (req, res) => {
  try {
    const { product_id } = req.body;

    const selectIslike = await prisma.$queryRaw`
        SELECT Is_Liked FROM products_like WHERE product_id = ${product_id}`;
    console.log(selectIslike);

    //빈하트일 경우
    if (selectIslike[0].Is_Liked === 0) {
      const updateButton = await prisma.$queryRaw`
            UPDATE products_like SET Is_Liked = 1
            WHERE product_id = ${product_id}
           `;
    }
    //
    else {
      const updateButton = await prisma.$queryRaw`
            UPDATE products_like SET Is_Liked = 0
            WHERE product_id = ${product_id}
           `;
    }
    return res.status(201).json({ message: "UPDATE" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { heartColor };
