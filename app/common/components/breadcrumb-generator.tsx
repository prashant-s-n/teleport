'use client';

import Link from "next/link";

type BreadcrumbGeneratorProps = {
    name : string;
    href : string;
}

export default function BreadcrumbGenerator(prop: {
    cascadingLinks: BreadcrumbGeneratorProps[]
}) {
    return (
        <>
        
        <div className="text-sm breadcrumbs">
            <ul>
                {(prop.cascadingLinks).map((cascadeLink, index) => (
                    <li key={`cascading-link-${index}`}>
                        <Link href={cascadeLink?.href}>{cascadeLink?.name}</Link>
                    </li>
                ))}

            </ul>
        </div>
        </>
    )
}