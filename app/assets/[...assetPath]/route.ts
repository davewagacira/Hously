import { readFile } from "node:fs/promises"
import path from "node:path"

import type { NextRequest } from "next/server"

const publicDir = path.join(process.cwd(), "public")

const contentTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
}

function isLikelyBase64Png(buffer: Buffer) {
  const header = buffer.subarray(0, 32).toString("utf8").trim()
  return header.startsWith("iVBORw0KGgo")
}

export async function GET(_request: NextRequest, context: { params: Promise<{ assetPath: string[] }> }) {
  const { assetPath } = await context.params
  const requestedPath = path.join(publicDir, ...assetPath)
  const normalizedPath = path.normalize(requestedPath)

  if (!normalizedPath.startsWith(publicDir)) {
    return new Response("Not found", { status: 404 })
  }

  try {
    const fileBuffer = await readFile(normalizedPath)
    const extension = path.extname(normalizedPath).toLowerCase()
    const contentType = contentTypes[extension] ?? "application/octet-stream"
    const body =
      extension === ".png" && isLikelyBase64Png(fileBuffer)
        ? Buffer.from(fileBuffer.toString("utf8").trim(), "base64")
        : fileBuffer

    return new Response(body, {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Content-Type": contentType,
      },
    })
  } catch {
    return new Response("Not found", { status: 404 })
  }
}
