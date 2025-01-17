export function refUrlGenerator(ref: string) {
  return `${process.env.SCHEMA_REF_URL}/#${ref}`;
}
