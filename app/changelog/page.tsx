import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import { CustomComponents } from "../changelog/linkProps";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/components/ui/dialog';
import { Button } from '@/components/components/ui/button';
import { Code } from '@radix-ui/themes';

const ChangelogPage = () => {
  let changelogContent = '';

  try {
    const filePath = path.join(process.cwd(), 'CHANGELOG.md');
    changelogContent = fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error('Error reading CHANGELOG.md:', error);
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {/* <Button variant="outline">View Changelog</Button> */}
          {/* <h1>View Changelog</h1> */}
          <Code size='7'> v1.0</Code>

        </DialogTrigger>
        <DialogContent className="max-w-[415px] sm:max-w-[450px] min-h-[50vh] md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl md:text-2xl font-semibold">Changelog</DialogTitle>
            <DialogDescription>
              Here's what's new.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 px-4 py-2 overflow-auto">
            <ReactMarkdown components={CustomComponents}>
              {changelogContent}
            </ReactMarkdown>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangelogPage;
