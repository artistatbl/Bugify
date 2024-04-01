'use client';	
import React, { useEffect } from 'react';
import { useSignInModal } from '@/components/layout/sign-in-modal';
import { Button } from '@radix-ui/themes'; // Ensure correct import path
import { useToast } from '@/lib/hooks/use-toast';

const Page = () => {
    const { SignInModal, setShowSignInModal } = useSignInModal();
    const toast = useToast();

   
    
 

    return (
        <>
         
            <SignInModal/>

		 
            <div className="flex items-center justify-center min-h-[400px] py-12">
                <div className="space-y-4 text-center">
                    <h1 className='text-3xl'>Not authorized. Please sign in to continue.</h1>
                    <Button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setShowSignInModal(true)}
                    >
                        Sign In
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Page;
