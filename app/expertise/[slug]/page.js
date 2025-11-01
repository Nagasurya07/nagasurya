import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getExpertiseBySlug } from '../../../lib/expertiseData'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = getExpertiseBySlug(slug)
  const title = item ? `${item.data.title} · Expertise` : 'Expertise'
  const description = item?.data.summary ?? 'Details about expertise area.'
  return { title, description }
}

export default async function ExpertiseDetail({ params }) {
  const { slug } = await params
  const item = getExpertiseBySlug(slug)
  if (!item) return notFound()

  const { title, summary, points } = item.data

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 sm:mb-8">
          <Link href="#expertise" className="text-sm text-purple-700 hover:underline">← Back to Expertise</Link>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
          {summary}
        </p>

        {points?.length > 0 && (
          <ul className="space-y-3 sm:space-y-4">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-800">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-purple-600" />
                <span className="text-sm sm:text-base">{p}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10">
          <Link href="#projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-purple-600 text-purple-700 font-semibold hover:bg-purple-50">
            View Related Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
