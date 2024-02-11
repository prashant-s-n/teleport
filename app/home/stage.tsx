export default function Stage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='min-h-screen p-4 bg-zinc-100'>
      {children}
    </main>
  );
}
