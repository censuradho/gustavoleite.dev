/** Renders `**trecho**` in ink and leaves the rest of the sentence grey. */
export function RichText({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <span key={index} className="ink">
        {part.slice(2, -2)}
      </span>
    ) : (
      part
    )
  )
}
