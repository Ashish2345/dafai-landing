import type { ReactNode } from 'react'

type JsonLdData = Record<string, unknown> | Record<string, unknown>[]

export function JsonLd({ data, id }: { data: JsonLdData; id?: string }): ReactNode {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
