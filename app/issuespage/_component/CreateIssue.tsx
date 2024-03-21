
'use client'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/components/ui/dialog'
import { useState } from 'react'
import { Button } from '@radix-ui/themes';
import Editor from '@/components/issues/Editor';




const CreateIssue = () => {



  // const [isDialogOpen, setIsDialogOpen] = useState(true); // Assuming dialog is open by default





  return (
	<Dialog  >
	<DialogTrigger asChild>
	  <Button variant="outline">Create aaaaaa Issue</Button>
	</DialogTrigger>
        <DialogContent className="max-w-[415px] sm:max-w-[450px] md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl min-h-[50vh] border-zinc-900 border-b-2">

  <DialogHeader>
    <DialogTitle className="text-2xl font-semibold border-b pl-6 border-stone-950 ">Create a Issue</DialogTitle>
    <DialogDescription>
      Issue names including capitalization cannot be changed.
    </DialogDescription>


  
    <Editor  />


  </DialogHeader>
 
  
  <DialogFooter>
    <button type='submit' className=' font-bold bg-black hover:bg-gray-300 text-white  py-2 px-4 rounded' form='issueform' > Post


    </button>

    {/* <button onClick={() => setIsDialogOpen(false)}>Close</button> */}

  </DialogFooter>
</DialogContent>

   </Dialog>
 )
}

export default CreateIssue