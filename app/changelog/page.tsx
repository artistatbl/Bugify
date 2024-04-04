
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/components/ui/dialog';
import { Code } from '@radix-ui/themes';
import { TracingBeamDemo } from "./_component/Log";
import { ScrollArea } from "@/components/components/ui/scroll-area"


const ChangelogPage = () => {


  return (
    <Dialog >
  <DialogTrigger asChild>
    <Code size='2'> v0.1.0</Code>
  </DialogTrigger>
  <DialogContent className="max-w-[450px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1400px] 3xl:max-w-[1400px] border-zinc-900 border-b-2">


    <DialogHeader>
      <DialogTitle className="text-lg sm:text-xl md:text-2xl font-semibold">Changelog</DialogTitle>
      <DialogDescription>
        Here's what's new.
      </DialogDescription>
    </DialogHeader>
    <div className="mt-4 px-4 py-2 overflow-y-auto overflow-x-hidden">
      <ScrollArea className="h-[600px]">
      <TracingBeamDemo />
      </ScrollArea>
    </div>
  </DialogContent>
</Dialog>
  );
};

export default ChangelogPage;
