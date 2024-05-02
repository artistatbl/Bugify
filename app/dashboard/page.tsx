import SideNav from "@/components/issues/SideNav"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/auth/authOptions"
import LatestIssues from "./_component/LastestIssues";
import { Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./_component/IssueSummary";  // Import the IssueSummary component
import IssueChart from "./_component/IssueChart";
import prisma from "prisma/client";
import { formatDistanceToNow } from 'date-fns';
import  delay from 'delay';

export default async function Page () {
  const session = await getServerSession(authOptions);

  // Assuming the user ID is part of the session object
  const userId = session?.user?.id;  // Adjust according to your session structure
  // console.log(userId)
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  const open = await prisma.issue.count({
    where: { status: 'OPEN', userId: userId },  // Filter by userId
  });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS', userId: userId },  // Filter by userId
  });
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED', userId: userId },  // Filter by userId
  });
  const completed = await prisma.issue.count({
    where: { status: 'COMPLETED', userId: userId },  // Filter by userId
  });
  const cancelled = await prisma.issue.count({
    where: { status: 'CANCELLED', userId: userId },  // Filter by userId
  })
  const reopened = await prisma.issue.count({
    where: { status: 'REOPENED', userId: userId },  // Filter by userId
  })
  const notStarted = await prisma.issue.count({
    where: { status: 'NOT_STARTED', userId: userId },  // Filter by userId
  })
  const overdue = await prisma.issue.count({
    where: { status: 'OVERDUE', userId: userId },  // Filter by userId
  })

  await delay(3000);


  return (
    <>
      <SideNav session={session}/>
      <div className="z-10 flex flex-col w-full pr-5 pl-5 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20 min-h-screen ">
      <h1 className="tracking-tighter mb-4 ">
        <span className="font-bold text-foreground tracking-tighter text-3xl">Welcome, {session?.user?.name || 'Guest'}!</span>
        <span className="font-extralight"> Last Login: {user?.lastLogin ? `${formatDistanceToNow(new Date(user.lastLogin), { addSuffix: true })}` : 'Never logged in'}</span>
      </h1>

  
  
          <Grid columns={{ initial: '1', md: '2',}} gap="9">
            <Flex direction="column" gap="5">
              <IssueSummary open={open} inProgress={inProgress} closed={closed} overdue={overdue} completed={completed} cancelled={cancelled} reopened={reopened} notStarted={notStarted} userId={userId || ''} />
              <IssueChart open={open} inProgress={inProgress} closed={closed} overdue={overdue} completed={completed} cancelled={cancelled} reopened={reopened} notStarted={notStarted}/>
            </Flex>

          
            <LatestIssues />

   

            
          </Grid>
        </div>
   
    </>
  )
}