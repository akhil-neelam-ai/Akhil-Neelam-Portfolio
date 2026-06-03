type ResponsiveImageProps = {
  basePath: string;
  widths: number[];
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
};

export function ResponsiveImage({
  basePath,
  widths,
  alt,
  className,
  width,
  height,
  loading = "lazy",
  fetchPriority,
  sizes,
}: ResponsiveImageProps) {
  const webpSrcSet = widths.map((w) => `${basePath}-${w}.webp ${w}w`).join(", ");
  const avifSrcSet = widths.map((w) => `${basePath}-${w}.avif ${w}w`).join(", ");
  const fallbackSrc = `${basePath}-${widths[widths.length - 1]}.webp`;

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        sizes={sizes}
      />
    </picture>
  );
}
