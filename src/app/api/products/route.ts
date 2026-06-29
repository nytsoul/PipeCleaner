import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
