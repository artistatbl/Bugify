'use client'


import { Prisma, Issue } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { debounce } from 'lodash';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect, useState, useRef } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/components/ui/command';
import { useOnClickOutside } from '../../lib/hooks/use-on-click-outside';
import { TicketSlash } from 'lucide-react';
import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth/next';
import { useSession } from "next-auth/react"; // Import useSession from next-auth


const SearchBar:  FC<{}> = () => {
  const [input, setInput] = useState('');
  // const { data: session } = useSession();
   // Use the useSession hook to get session data

  const pathname = usePathname();
  const commandRef = useRef(null);
  const router = useRouter();

  useOnClickOutside(commandRef, () => setInput(''));

  useEffect(() => {
    setInput('');
  }, [pathname]);

  const fetchSearchResults = async () => {
    // const session = await getServerSession(authOptions);

    if (!input) return [];
    try {
      const response = await axios.get(`/api/search?q=${encodeURIComponent(input)}`);
     // const response = await axios.get(`/api/search?q=${encodeURIComponent(input)}&userId=${session.user.id}`);

      console.log('Fetched results:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    }
  };

  const { data: queryResults = [], refetch } = useQuery({
    queryKey: ['search', input],
    queryFn: fetchSearchResults,
    enabled: input.length > 0,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 min
  });

  // Debouncing input handling
  useEffect(() => {
    const handler = setTimeout(() => {
      if (input) {
        console.log('Refetching with input:', input);
        refetch();
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [input, refetch]);

  const renderResults = () => {
    if (!queryResults || queryResults.length === 0) {
      return <div className='text-center text-md text-gray-500  '>No results found.</div>;
    }

    return (
      <div>
        {queryResults.map((issue: Issue) => (
          <div
            onClick={() => {
              console.log('Navigating to:', issue.id);
              router.push(`/issues/${issue.id}`);
            }}
            key={issue.id}
          >
          
          <div className='flex items-center'>
          <TicketSlash className='mr-2 h-4 w-4 ' />

            <a href={`/issues/${issue.id}`}>r/{issue.title}</a>
          </div>
         
          </div>
        ))}
      </div>
    );
  };

  return (
    <div ref={commandRef} className='relative rounded-md  border-2 border-black dark:border-white max-w-lg z-50 overflow-visible w-full h-10'>
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        className='outline-none border-none text-md focus:border-none rounded-md focus:outline-none dark:text-black dark:bg-white ring-0 w-full h-full px-4'
        placeholder='Search Issues...'
      />
      {input.length > 0 && (
        <div className='absolute bg-gray-200 top-full p-2  text-md dark:text-black  inset-x-0 shadow rounded-b-md w-full px-4'>
          {renderResults()}
        </div>
      )}
    </div>
  );
};
export default SearchBar;