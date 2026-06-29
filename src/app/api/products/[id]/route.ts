import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
        tags: true,
        variants: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("Product GET Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // Find or create category
    let categoryConnect: { connect: { id: string } } | undefined = undefined;
    if (categorySlug) {
      let cat = await prisma.category.findUnique({ where: { slug: categorySlug } });
      if (!cat) {
        cat = await prisma.category.create({
          data: { name: categorySlug, slug: categorySlug },
        });
      }
      categoryConnect = { connect: { id: cat.id } };
    }

    // Delete old images & variants to replace
    await prisma.productImage.deleteMany({ where: { productId: id } });
    await prisma.productVariant.deleteMany({ where: { productId: id } });

    const product = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        price: parseFloat(price),
        discount: discount ? parseFloat(discount) : 0,
        stock: parseInt(stock),
        sku: sku || undefined,
        materials: materials || undefined,
        dimensions: dimensions || undefined,
        estimatedDelivery: estimatedDelivery || undefined,
        ...(categoryConnect ? { category: categoryConnect } : {}),
        images: {
          create: images.map((url: string) => ({ url })),
        },
        variants: {
          create: variants.map((color: string) => ({ color, stock: 0 })),
        },
        tags: {
          set: [],
          connectOrCreate: tags.map((name: string) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { category: true, images: true, tags: true, variants: true },
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("Product PUT Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Product DELETE Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
