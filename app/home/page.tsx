import { useSearchParams } from 'next/navigation';
import AppDashboard from './dashboard/page';

interface SearchPageProps {
  searchParams: { query: string };
}

export default async function Home({
  searchParams: { query },
}: SearchPageProps) {
  return (
    <>
      <AppDashboard/>
    </>
  );
}
