import Script from 'next/script';

interface JsonLdSchemaProps {
  schema: Record<string, any>;
}

export default function JsonLdSchema({ schema }: JsonLdSchemaProps) {
  return (
    <Script
      id="json-ld-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
