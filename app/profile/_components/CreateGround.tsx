
"use client"
import { Button } from '@/components/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/components/ui/dialog'
import React, { useState } from 'react'
import { Input } from '@/components/components/ui/input'
import { Label } from '@/components/components/ui/label'

const CreateGround = () => {

 const [input, setInput] = useState<string>('')




  return (
	<Dialog>
	<DialogTrigger asChild>
	  <Button variant="outline">Create a Ground</Button>
	</DialogTrigger>
	<DialogContent className="max-w-[415px] sm:max-w-[450px]  md:max-w-2xl 2xl:max-w-3xl">
  <DialogHeader>
    <DialogTitle className="text-2xl font-semibold border-b pl-6 border-stone-950 mb-5">Create a Ground</DialogTitle>
    <DialogDescription>
      Ground names including capitalization cannot be changed.
    </DialogDescription>
  </DialogHeader>
  <div className="grid gap-4 py-4">
    <div className='relative'>
      <div className="grid grid-cols-4 items-center gap-4">
        <p className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400'>
          G/
        </p>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='pl-9 col-span-5'
        />
      </div>
    </div>
  </div>
  <DialogFooter>
    <Button variant="outline"  type="submit" className="bg-black hover:bg-gray-300 text-white font-bold py-2 px-4 rounded">Create Ground</Button>
  </DialogFooter>
</DialogContent>

   </Dialog>
 )
}

export default CreateGround