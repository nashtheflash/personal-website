import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

const publicFolder = path.resolve('public')  //   /app/public (on docker)  and  ./public (on local)

export async function GET(req, { params }) {
  try {
    const slug = params.slug || []  // ["images", "avatar", "1234567.jpg"]
    const filePath = slug ? path.join(publicFolder, ...slug) : null  //  /public/images/avatar/1234567.jpg
    if (!filePath) throw new Error()




    const fileContent = await fs.readFile(filePath)
        // console.error('PATH:', fileContent)
    if (!fileContent) throw new Error()


    return new NextResponse(fileContent)
  } catch (err) {
    console.error(' GET Avatar | err: ', err)
    return new NextResponse(null)
  }
}
