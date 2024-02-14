import prisma from 'prisma/client';
import { notFound } from 'next/navigation';
import delay from 'delay';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/components/issues/IssuesStatusBadge';
import ReactMarkdown from 'react-markdown';



interface Props {
  params: {
    id: string;
  };
}

const IssueDetailPage = async ({ params }: Props) => {
  //if (typeof params.id !== 'number') notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  await delay(1000);
  console.log(issue);

  return (
    <main>
      
     
      <div className="max-w-5xl mx-auto px-4 py-5">
        <div className="mb-8">
          <div className="mb-5">
            <Heading as="h1" className="text-4xl font-bold">
              Issuesss Details
            </Heading>
          </div>
          <div className="flex flex-col space-y-2">
            <div>
              <Text className="font-bold m-5">Title:</Text>
              <Text>{issue.title}</Text>
            </div>
            <div>
              <Text className="font-bold">Status:</Text>
              <IssueStatusBadge status={issue.status} />
            </div>
            <div>
              <Text className="font-bold">Date Created:</Text>
              <Text>{new Date(issue.createdAt).toDateString()}</Text>
            </div>
          </div>
        </div>
        <Card className="prose">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </div>
      </main>
    
  );
};

export default IssueDetailPage;