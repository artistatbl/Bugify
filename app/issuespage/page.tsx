// app/dashboard/page.tsx
'use client';
import { Table } from '@radix-ui/themes';
import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import prisma from 'prisma/client';
import IssueStatusBadge from '@/components/issues/IssuesStatusBadge';
import IssuesRootLayout from '@/app/issuespage/IssuesRootLayout';

const IssuesPage = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('/issues/page');
        if (response.ok) {
          const data = await response.json();
          setIssues(data);
        } else {
          console.error('Failed to fetch issues:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <IssuesRootLayout>
      <main className="max-w-full mx-auto px-4 mt-40 py-6 border-t border-gray-900">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold tracking-tighter">Bug Logs</h1>
          <Link
            className="inline-flex items-center h-8 border  text-white rounded-md border-gray-200 bg-white px-3 
              text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900
               focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 
                dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50
               dark:focus-visible:ring-gray-300"
            href="#"
          >
            New Bug
          </Link>
        </div>
        <div className="">
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell text-center">Title</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell text-center">Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell text-end justify-center">Priority</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {issues.map((issue) => (
                <Table.Row key={issue.id}>
                  <Table.Cell className='text-center'>
                    <Link href={`/issues/${issue.id}`} legacyBehavior>
                      {issue.id}
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    {issue.title}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell text-center">
                    <IssueStatusBadge status={issue.status} />
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell text-end justify-center">
                    {issue.priority}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </main>
    </IssuesRootLayout>
  );
};

// export async function getStaticProps() {
//   const issues = await prisma.issue.findMany();
//   return {
//     props: {
//       issues,
//     },
//   };
// }

export default IssuesPage;
