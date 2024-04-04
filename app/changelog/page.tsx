
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

  <DialogContent className="max-w-[415px] sm:max-w-[450px] min-h-[50vh] md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl ">
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
