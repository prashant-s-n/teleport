import SideBar from './sidebar';
import Stage from './stage';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='flex'>

      <div className='grid grid-cols-12 min-w-full'>
        <div className='col-span-2'>
          <SideBar/>
        </div>
        <div className='col-span-10'>
          <Stage>
            {children}
          </Stage>
        </div>
      </div>
    </main>
  );
}
