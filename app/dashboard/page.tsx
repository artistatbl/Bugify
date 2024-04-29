import SideNav from "@/components/issues/SideNav"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/auth/authOptions"
import LatestIssues from "./_component/LastestIssues";
import { Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./_component/IssueSummary";  // Import the IssueSummary component
import IssueChart from "./_component/IssueChart";
import prisma from "prisma/client";

export default async function Page () {
  const session = await getServerSession(authOptions);

  // Assuming the user ID is part of the session object
  const userId = session?.user?.id;  // Adjust according to your session structure

  const open = await prisma.issue.count({
    where: { status: 'OPEN', userId: userId },  // Filter by userId
  });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS', userId: userId },  // Filter by userId
  });
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED', userId: userId },  // Filter by userId
  });

  return (
    <>
      <SideNav session={session}/>
      <div className="z-10 flex flex-col w-full pr-5 pl-5 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20 min-h-screen ">
  
          <Grid columns={{ initial: '1', md: '2',}} gap="9">
            <Flex direction="column" gap="5">
              <IssueSummary open={open} inProgress={inProgress} closed={closed} userId={userId || ''} />
              <IssueChart open={open} inProgress={inProgress} closed={closed} />
            </Flex>

          
            <LatestIssues />

   

            
          </Grid>
        </div>
   
    </>
  )
}