export default function Stage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='p-4 overflow-y-scroll'>
      {children}
    </main>
  );
}
