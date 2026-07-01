import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Pagination params
    const limit = parseInt(searchParams.get("limit") || "12", 10);
    const cursor = searchParams.get("cursor");
    
    // Filtering params
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const tags = searchParams.getAll("tags[]"); // allow multiple tags
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    
    // Sorting params
    const sort = searchParams.get("sort") || "newest"; // "newest", "price_asc", "price_desc", "rating"

    // Construct Prisma where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } }
      ];
    }

    if (category) {
      where.category = { slug: category };
    }

    if (tags && tags.length > 0) {
      where.tags = {
        some: {
          name: { in: tags }
        }
      };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Construct Prisma orderBy clause
    let orderBy: any = {};
    if (sort === "newest") {
      orderBy = { createdAt: "desc" };
    } else if (sort === "price_asc") {
      orderBy = { price: "asc" };
    } else if (sort === "price_desc") {
      orderBy = { price: "desc" };
    } else if (sort === "rating") {
      // For rating we'd typically need an aggregation, but simple mock ordering for now
      orderBy = { reviews: { _count: "desc" } };
    }

    // Fetch products
    const products = await prisma.product.findMany({
      take: limit + 1, // take an extra item to determine if there's a next page
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      where,
      orderBy,
      include: {
        category: true,
        images: true,
        tags: true,
        variants: true,
        _count: {
          select: { reviews: true }
        }
      }
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (products.length > limit) {
      const nextItem = products.pop(); // remove the extra item
      nextCursor = nextItem!.id;
    }

    return NextResponse.json({
      items: products,
      nextCursor
    });

  } catch (error) {
    console.error("Products API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const {
      title,
      description,
      price,
      discount,
      stock,
      sku,
      materials,
      dimensions,
      estimatedDelivery,
      categorySlug,
      images = [],
      variants = [],
      tags = [],
    } = body;

    // Upsert the category
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");

    // Find or create category
    let catId: string | undefined = undefined;
    if (categorySlug) {
      let cat = await prisma.category.findUnique({ where: { slug: categorySlug } });
      if (!cat) {
        cat = await prisma.category.create({
          data: { name: categorySlug, slug: categorySlug },
        });
      }
      catId = cat.id;
    }

    const product = await prisma.product.create({
      data: {
        title,
        slug: `${slug}-${Date.now()}`,
        description,
        price: parseFloat(price),
        discount: discount ? parseFloat(discount) : 0,
        stock: parseInt(stock),
        sku: sku || undefined,
        materials: materials || undefined,
        dimensions: dimensions || undefined,
        estimatedDelivery: estimatedDelivery || undefined,
        categoryId: catId,
        images: {
          create: images.map((url: string) => ({ url })),
        },
        variants: {
          create: variants.map((color: string) => ({ color, stock: 0 })),
        },
        tags: {
          connectOrCreate: tags.map((name: string) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { category: true, images: true, tags: true, variants: true },
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    console.error("Create Product Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
