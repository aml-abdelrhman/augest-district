import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
 
// Image metadata
export const alt = 'Hemma'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image() {
  // Font loading, process.cwd() is Next.js project directory
  const geDinarTwo = await readFile(
    join(process.cwd(), '../fonts/ge-dinar-two/GE-Dinar-Two-Light.woff')
  )
 
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Hemma
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'geDinarTwo',
          data: geDinarTwo,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}