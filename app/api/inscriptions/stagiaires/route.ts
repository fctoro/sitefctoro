import { NextResponse } from 'next/server'
import path from 'path'
import { mkdir, writeFile } from 'fs/promises'
import { pool } from '@/lib/db'

export const runtime = 'nodejs'

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

function getText(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

function sanitizeFilename(value: string) {
  const clean = value.replace(/[^a-zA-Z0-9._-]+/g, '_')
  return clean.length > 0 ? clean : 'document'
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const stageId = getText(formData, 'stageId')
    const firstName = getText(formData, 'first_name')
    const lastName = getText(formData, 'last_name')
    const email = getText(formData, 'email')
    const phone = getText(formData, 'phone')
    const location = getText(formData, 'location')
    const motivationText = getText(formData, 'motivation_text')
    const availability = getText(formData, 'availability')
    const source = getText(formData, 'source')
    const referrerName = getText(formData, 'referrer_name')
    const levelCreole = getText(formData, 'level_creole')
    const levelFrench = getText(formData, 'level_french')
    const levelEnglish = getText(formData, 'level_english')
    const consent = formData.get('consent') === 'on'
    const fileValue = formData.get('cv')
    const motivationFileValue = formData.get('motivation')

    if (!stageId || !firstName || !lastName || !email || !location || !fileValue || typeof fileValue === 'string') {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires et joindre votre CV.' },
        { status: 400 }
      )
    }

    const file = fileValue as File
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'Le fichier CV doit faire moins de 10MB.' },
        { status: 400 }
      )
    }

    const client = await pool.connect()

    try {
      await client.query('begin')

      // Get stage details
      const stageRes = await client.query('SELECT title, slug FROM stages WHERE id = $1', [stageId])
      const stage = stageRes.rows[0]

      if (!stage) {
        throw new Error("Le recrutement spécifié n'existe pas.")
      }

      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'stagiaires')
      await mkdir(uploadDir, { recursive: true })

      const buffer = Buffer.from(await file.arrayBuffer())
      const safeName = sanitizeFilename(file.name || 'cv.pdf')
      const ext = path.extname(safeName)
      const base = ext ? safeName.slice(0, -ext.length) : safeName
      const uniqueName = `${stage.slug}-${Date.now()}-${base}${ext}`
      const filePath = path.join(uploadDir, uniqueName)
      await writeFile(filePath, buffer)

      const publicPath = `/uploads/stagiaires/${uniqueName}`

      let publicMotivationPath = ''
      if (motivationFileValue && motivationFileValue instanceof File && motivationFileValue.size > 0) {
        if (motivationFileValue.size > MAX_FILE_SIZE_BYTES) {
          throw new Error('Le fichier motivation doit faire moins de 10MB.')
        }
        const mBuffer = Buffer.from(await motivationFileValue.arrayBuffer())
        const mSafeName = sanitizeFilename(motivationFileValue.name || 'motivation.pdf')
        const mExt = path.extname(mSafeName)
        const mBase = mExt ? mSafeName.slice(0, -mExt.length) : mSafeName
        const mUniqueName = `${stage.slug}-motivation-${Date.now()}-${mBase}${mExt}`
        const mFilePath = path.join(uploadDir, mUniqueName)
        await writeFile(mFilePath, mBuffer)
        publicMotivationPath = `/uploads/stagiaires/${mUniqueName}`
      }

      // Insert into stage_applications
      await client.query(
        `
          INSERT INTO stage_applications (
            stage_id,
            full_name,
            first_name,
            last_name,
            email,
            phone,
            location,
            cv_url,
            motivation_url,
            motivation_text,
            availability,
            source,
            referrer_name,
            level_creole,
            level_french,
            level_english,
            consent
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        `,
        [
          stageId,
          `${firstName} ${lastName}`,
          firstName,
          lastName,
          email,
          phone,
          location,
          publicPath,
          publicMotivationPath,
          motivationText,
          availability,
          source,
          referrerName,
          levelCreole,
          levelFrench,
          levelEnglish,
          consent
        ]
      )

      // Increment stages applications count
      await client.query(
        `UPDATE stages SET applications = applications + 1 WHERE id = $1`,
        [stageId]
      )

      await client.query('commit')
    } catch (dbError) {
      await client.query('rollback')
      throw dbError
    } finally {
      client.release()
    }

    return NextResponse.json({
      message: 'Votre candidature a été envoyée avec succès !'
    })
  } catch (error: any) {
    console.error('Erreur inscription stagiaire:', error)
    return NextResponse.json(
      { error: error.message || "Impossible d'envoyer la candidature pour le moment." },
      { status: 500 }
    )
  }
}
