export const metadata = {
  title: 'SALTY Retreats — Content Studio',
  description: 'Sanity Studio for managing SALTY Retreats content',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
