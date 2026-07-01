import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Categories ─────────────────────────────────────────────────────────────
  const categories = [
    { id: "cat-flower-pots",     name: "Flower Pots",       slug: "flower-pots" },
    { id: "cat-flower-bouquets", name: "Flower Bouquets",   slug: "flower-bouquets" },
    { id: "cat-sunflowers",      name: "Sunflowers",        slug: "sunflowers" },
    { id: "cat-teddy-bears",     name: "Teddy Bears",       slug: "teddy-bears" },
    { id: "cat-mini-plants",     name: "Mini Plants",       slug: "mini-plants" },
    { id: "cat-keychains",       name: "Keychains",         slug: "keychains" },
    { id: "cat-valentine",       name: "Valentine Gifts",   slug: "valentine-gifts" },
    { id: "cat-tulips",          name: "Tulips",            slug: "tulips" },
    { id: "cat-customized",      name: "Customized Gifts",  slug: "customized-gifts" },
    { id: "cat-birthday",        name: "Birthday Gifts",    slug: "birthday-gifts" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("✅ Categories seeded");

  // ── Products ────────────────────────────────────────────────────────────────
  const products = [
    {
      id: "prod-001",
      title: "Handmade Tulip Flower Pot",
      slug: "handmade-tulip-flower-pot",
      description: "A beautifully handcrafted pipe cleaner flower pot made using premium-quality fuzzy stems. This decorative item is ideal for birthdays, anniversaries, home decoration, office desks, and gifting purposes. Each petal is carefully shaped and colored to create a lifelike tulip arrangement that will brighten any space.",
      price: 499,
      discount: 29,
      stock: 25,
      estimatedDelivery: "3-5 business days",
      materials: "Premium Pipe Cleaner, Ceramic Pot",
      dimensions: "15 cm × 12 cm",
      isFeatured: true,
      categoryId: "cat-flower-pots",
      images: ["/images/products/tulip-flower-pot.png"],
      tags: ["tulips", "flower-pot", "desk-decor", "birthday-gift"],
    },
    {
      id: "prod-002",
      title: "Romantic Rose Bouquet",
      slug: "romantic-rose-bouquet",
      description: "A stunning arrangement of handcrafted pipe cleaner roses in shades of red, pink, and white. Wrapped in premium craft paper with a satin ribbon bow. This eternal bouquet never wilts and serves as a beautiful reminder of love. Perfect for Valentine's Day, anniversaries, and romantic gestures.",
      price: 799,
      discount: 20,
      stock: 18,
      estimatedDelivery: "3-5 business days",
      materials: "Premium Pipe Cleaner, Craft Paper, Satin Ribbon",
      dimensions: "25 cm × 20 cm",
      isFeatured: true,
      categoryId: "cat-flower-bouquets",
      images: ["/images/products/rose-bouquet.png"],
      tags: ["roses", "bouquet", "valentine", "romantic", "anniversary"],
    },
    {
      id: "prod-003",
      title: "Sunshine Sunflower Vase",
      slug: "sunshine-sunflower-vase",
      description: "Bring sunshine indoors with this cheerful sunflower arrangement. Three large sunflowers with green leaves and stems are placed in an elegant vase. Each sunflower head features realistic petal detail using premium yellow and brown pipe cleaners. A perfect gift for housewarming or to brighten someone's day.",
      price: 649,
      discount: 0,
      stock: 15,
      estimatedDelivery: "3-5 business days",
      materials: "Premium Pipe Cleaner, Glass Vase",
      dimensions: "22 cm × 14 cm",
      isFeatured: true,
      categoryId: "cat-sunflowers",
      images: ["/images/products/sunflower-arrangement.png"],
      tags: ["sunflower", "vase", "home-decor", "housewarming"],
    },
    {
      id: "prod-004",
      title: "Cuddly Pipe Cleaner Teddy",
      slug: "cuddly-pipe-cleaner-teddy",
      description: "An adorable teddy bear handcrafted entirely from premium pipe cleaners. This fuzzy friend sits at 12cm tall and features movable arms, a sweet embroidered face, and a tiny red heart. Perfect for kids, collectors, or as a unique desk companion. Each teddy is one-of-a-kind.",
      price: 399,
      discount: 20,
      stock: 30,
      estimatedDelivery: "3-5 business days",
      materials: "Premium Pipe Cleaner, Felt, Cotton",
      dimensions: "12 cm × 8 cm × 8 cm",
      isFeatured: true,
      categoryId: "cat-teddy-bears",
      images: ["/images/products/teddy-bear.png"],
      tags: ["teddy-bear", "kids", "cute", "desk-decor", "birthday-gift"],
    },
    {
      id: "prod-005",
      title: "Desert Cactus Mini Pot",
      slug: "desert-cactus-mini-pot",
      description: "A charming miniature cactus in a tiny terracotta-style pot. This pipe cleaner creation features realistic cactus shapes with tiny pink flowers on top. Never needs watering! Perfect for office desks, windowsills, and as a quirky gift for plant lovers who can't keep real plants alive.",
      price: 249,
      discount: 0,
      stock: 40,
      estimatedDelivery: "2-4 business days",
      materials: "Premium Pipe Cleaner, Mini Terracotta Pot",
      dimensions: "8 cm × 5 cm",
      isFeatured: true,
      categoryId: "cat-mini-plants",
      images: ["/images/products/mini-cactus.png"],
      tags: ["cactus", "mini-plant", "desk-decor", "plant-lover"],
    },
    {
      id: "prod-006",
      title: "Flower Charm Keychain Set",
      slug: "flower-charm-keychain-set",
      description: "A set of three adorable pipe cleaner keychains featuring a daisy, a heart, and a star design. Each keychain is attached to a sturdy metal keyring with a lobster clasp. Lightweight, colorful, and perfect for bags, keys, or backpacks. Makes a wonderful party favor or friendship gift set.",
      price: 199,
      discount: 33,
      stock: 50,
      estimatedDelivery: "2-4 business days",
      materials: "Premium Pipe Cleaner, Metal Keyring",
      dimensions: "5 cm × 3 cm each",
      isFeatured: false,
      categoryId: "cat-keychains",
      images: ["/images/products/keychain-set.png"],
      tags: ["keychain", "accessories", "friendship", "party-favor"],
    },
    {
      id: "prod-007",
      title: "Lavender Dream Bouquet",
      slug: "lavender-dream-bouquet",
      description: "A serene bouquet of lavender pipe cleaner flowers with delicate green foliage. This calming arrangement comes wrapped in white tissue paper with a lavender ribbon. Ideal for home decoration, spa rooms, bedrooms, and as a thoughtful 'thinking of you' gift.",
      price: 599,
      discount: 0,
      stock: 12,
      estimatedDelivery: "3-5 business days",
      materials: "Premium Pipe Cleaner, Tissue Paper, Ribbon",
      dimensions: "20 cm × 15 cm",
      isFeatured: true,
      categoryId: "cat-flower-bouquets",
      images: ["/images/products/sunflower-arrangement.png"],
      tags: ["lavender", "bouquet", "home-decor", "calming"],
    },
    {
      id: "prod-008",
      title: "Valentine's Heart Gift Box",
      slug: "valentines-heart-box",
      description: "A luxurious heart-shaped gift box filled with a mini rose bouquet, a tiny teddy bear, and heart-shaped chocolates placeholder. All pipe cleaner items are handcrafted with love. The perfect Valentine's Day gift that shows you care. Comes in a beautiful red gift box with a gold ribbon.",
      price: 1299,
      discount: 19,
      stock: 8,
      estimatedDelivery: "3-5 business days",
      materials: "Premium Pipe Cleaner, Gift Box, Satin Ribbon",
      dimensions: "20 cm × 18 cm × 10 cm",
      isFeatured: true,
      categoryId: "cat-valentine",
      images: ["/images/products/teddy-bear.png"],
      tags: ["valentine", "gift-box", "romantic", "luxury"],
    },
    {
      id: "prod-009",
      title: "Rainbow Tulip Arrangement",
      slug: "rainbow-tulip-arrangement",
      description: "A vibrant arrangement of six tulips in every color of the rainbow — red, orange, yellow, green, blue, and purple. Each tulip is meticulously crafted from premium pipe cleaners. Displayed in a white ceramic vase, this piece is a celebration of color and creativity.",
      price: 899,
      discount: 0,
      stock: 10,
      estimatedDelivery: "3-5 business days",
      materials: "Premium Pipe Cleaner, White Ceramic Vase",
      dimensions: "25 cm × 15 cm",
      isFeatured: false,
      categoryId: "cat-tulips",
      images: ["/images/products/tulip-flower-pot.png"],
      tags: ["tulips", "rainbow", "colorful", "home-decor"],
    },
    {
      id: "prod-010",
      title: "Custom Name Flower Pot",
      slug: "custom-name-flower-pot",
      description: "A personalized flower pot with the recipient's name spelled out in colorful pipe cleaner letters. Choose your preferred flowers (roses, tulips, or daisies) and color scheme. Each letter is carefully crafted and attached to a decorated pot. The ultimate personalized gift for any occasion.",
      price: 999,
      discount: 23,
      stock: 5,
      estimatedDelivery: "5-7 business days",
      materials: "Premium Pipe Cleaner, Decorated Ceramic Pot",
      dimensions: "Custom",
      isFeatured: true,
      categoryId: "cat-customized",
      images: ["/images/products/tulip-flower-pot.png"],
      tags: ["custom", "personalized", "name", "gift", "birthday"],
    },
    {
      id: "prod-011",
      title: "Succulent Garden Trio",
      slug: "succulent-garden-trio",
      description: "A set of three miniature succulent plants in matching pots. Features a pipe cleaner aloe vera, echeveria, and jade plant. Each succulent has incredibly realistic texture and coloring. These never-wilting desk companions are perfect for plant enthusiasts and make wonderful gifts.",
      price: 549,
      discount: 0,
      stock: 20,
      estimatedDelivery: "3-5 business days",
      materials: "Premium Pipe Cleaner, Mini Ceramic Pots",
      dimensions: "7 cm × 5 cm each",
      isFeatured: false,
      categoryId: "cat-mini-plants",
      images: ["/images/products/sunflower-arrangement.png"],
      tags: ["succulent", "mini-plant", "trio", "desk-decor", "plant-lover"],
    },
    {
      id: "prod-012",
      title: "Birthday Cake Topper Set",
      slug: "birthday-cake-decoration",
      description: "A delightful cake topper set made from colorful pipe cleaners. Includes a 'Happy Birthday' banner, balloon shapes, and a number (customizable). Adds a unique handmade touch to any birthday celebration. Reusable and makes for a lovely keepsake after the party.",
      price: 349,
      discount: 0,
      stock: 35,
      estimatedDelivery: "3-5 business days",
      materials: "Premium Pipe Cleaner, Wooden Picks",
      dimensions: "15 cm × 10 cm",
      isFeatured: false,
      categoryId: "cat-birthday",
      images: ["/images/products/teddy-bear.png"],
      tags: ["birthday", "cake-topper", "party", "celebration"],
    },
    {
      id: "prod-013",
      title: "Cherry Blossom Branch",
      slug: "cherry-blossom-branch",
      description: "An exquisite cherry blossom branch made entirely from pink and white pipe cleaners. This elegant piece features delicate blossoms along a natural-looking branch. Perfect as a standalone decoration or in a tall vase. Brings the beauty of spring indoors all year round.",
      price: 749,
      discount: 0,
      stock: 14,
      estimatedDelivery: "3-5 business days",
      materials: "Premium Pipe Cleaner, Wire Frame",
      dimensions: "35 cm × 20 cm",
      isFeatured: true,
      categoryId: "cat-flower-bouquets",
      images: ["/images/products/sunflower-arrangement.png"],
      tags: ["cherry-blossom", "elegant", "spring", "home-decor"],
    },
    {
      id: "prod-014",
      title: "Mini Teddy Keychain",
      slug: "mini-teddy-keychain",
      description: "An impossibly cute 3cm mini teddy bear keychain made from soft pipe cleaners. Available in brown, pink, and white. Each teddy has tiny button eyes and a micro bow tie. Perfect as a bag charm, car mirror hanger, or a thoughtful little gift for someone special.",
      price: 149,
      discount: 0,
      stock: 60,
      estimatedDelivery: "2-4 business days",
      materials: "Premium Pipe Cleaner, Metal Keyring, Buttons",
      dimensions: "3 cm × 2 cm",
      isFeatured: false,
      categoryId: "cat-keychains",
      images: ["/images/products/teddy-bear.png"],
      tags: ["keychain", "teddy", "cute", "bag-charm", "mini"],
    },
  ];

  for (const p of products) {
    const { images, tags, ...productData } = p;

    // Upsert the product (preserves any existing data)
    await prisma.product.upsert({
      where: { id: productData.id },
      update: {
        ...productData,
        slug: productData.slug, // ensure slug stays correct
      },
      create: productData,
    });

    // Upsert images
    for (const url of images) {
      const existing = await prisma.productImage.findFirst({
        where: { productId: productData.id, url },
      });
      if (!existing) {
        await prisma.productImage.create({
          data: { url, productId: productData.id },
        });
      }
    }

    // Upsert tags
    for (const tagName of tags) {
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });
      // Connect tag to product
      await prisma.product.update({
        where: { id: productData.id },
        data: { tags: { connect: { id: tag.id } } },
      });
    }
  }
  console.log(`✅ ${products.length} products seeded`);

  // ── Admin user ──────────────────────────────────────────────────────────────
  const hashedPassword1 = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@pipebloom.com" },
    update: { role: "ADMIN" },
    create: {
      email: "admin@pipebloom.com",
      name: "Admin",
      password: hashedPassword1,
      role: "ADMIN",
    },
  });
  
  const hashedPassword2 = await bcrypt.hash("Neshun123#", 10);
  await prisma.user.upsert({
    where: { email: "neshun7413@gmail.com" },
    update: { role: "ADMIN", password: hashedPassword2 },
    create: {
      email: "neshun7413@gmail.com",
      name: "Neshun Admin",
      password: hashedPassword2,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin users seeded");

  console.log("\n🎉 Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
