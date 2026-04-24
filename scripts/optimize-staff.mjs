import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const outputDir = 'public/staff-photos'
const sourceDirs = ['public/TEAMPICTURES', 'public/stafftoro']

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

function buildOutputName(file) {
  return file
    .replace('.jpg.jpeg', '.jpg')
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .toLowerCase()
}

for (const sourceDir of sourceDirs) {
  if (!fs.existsSync(sourceDir)) {
    console.warn(`skip ${sourceDir}: directory not found`)
    continue
  }

  const files = fs
    .readdirSync(sourceDir)
    .filter((file) => file.endsWith('.jpeg') || file.endsWith('.jpg'))

  for (const file of files) {
    const inputPath = path.join(sourceDir, file)
    const outputName = buildOutputName(file)
    const outputPath = path.join(outputDir, outputName)

    try {
      await sharp(inputPath)
        .resize(600, 800, { fit: 'cover', position: 'top' })
        .jpeg({ quality: 75 })
        .toFile(outputPath)

      console.log(
        `ok ${sourceDir}/${file} -> ${outputName} (${(fs.statSync(outputPath).size / 1024).toFixed(0)}KB)`,
      )
    } catch (error) {
      console.error(`fail ${sourceDir}/${file}: ${error.message}`)
    }
  }
}

console.log('Done!')
