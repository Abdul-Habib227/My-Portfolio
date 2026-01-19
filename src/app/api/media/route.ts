import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import mime from "mime";

export async function GET(
    request: NextRequest
) {
    const searchParams = request.nextUrl.searchParams;
    const filename = searchParams.get("file");

    if (!filename) {
        return new NextResponse("Filename required", { status: 400 });
    }

    const filePath = path.join(process.cwd(), "portfolio projects", filename);

    if (!fs.existsSync(filePath)) {
        return new NextResponse("File not found", { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = request.headers.get("range");
    const contentType = mime.getType(filePath) || "application/octet-stream";

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });

        const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize.toString(),
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
        };

        // @ts-ignore - ReadableStream conversion
        return new NextResponse(file, {
            status: 206,
            headers: head,
        });
    } else {
        const head = {
            "Content-Length": fileSize.toString(),
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
        };
        const file = fs.createReadStream(filePath);
        // @ts-ignore - ReadableStream conversion
        return new NextResponse(file, {
            headers: head,
        });
    }
}
